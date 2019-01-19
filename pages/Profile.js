import React, {Component} from 'react'
import {
	Text,
	StyleSheet,
	View,
	TouchableHighlight,
	Image,
	TextInput,
	Platform
} from 'react-native'
import { StackNavigator } from 'react-navigation';
import ImagePicker from 'react-native-image-picker'
import Helpers from '../lib/helpers'
import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';
import '@firebase/storage';
import RNFetchBlob from 'react-native-fetch-blob'
import Home from './Home'
const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

const uploadImage = (uri, imageName, mime = 'image/jpg') => {
	return new Promise((resolve, reject) => {
		const uploadUri = Platform.OS === 'android' ? uri.replace('file://', '') : uri
		let uploadBlob = null
		const imageRef = firebase.storage().ref('images').child(imageName)
		fs.readFile(uploadUri, 'base64')
			.then((data) => {
				return Blob.build(data, {type: `${mime};BASE64`})
			})
			.then((blob) => {
				uploadBlob = blob
				return imageRef.put(blob, {contentType: mime})
			})
			.then(() => {
				uploadBlob.close()
				return imageRef.getDownloadURL()
			})
			.then((url) => {
				resolve(url)
			})
			.catch((error) => {
				reject(error)
			})
	})
}



export default class Profile extends Component {
	constructor(props){
		super(props)
		this.state = {
			imagePath: '',
			imageHeight: '',
			imageWidth: '',
			name: '',
			phone: '',
			place: '',
			uid: ''
		}
	}

	async componentWillMount () {
		try {
			let user = await firebase.auth().currentUser;
			this.setState({
				uid: user.uid
			})
		} catch(error){
			console.log(error)
		}
	}
	openImagePicker(){
		const options = {
			title: 'Select Avatar',
			storageOptions: {
				skipBackup: true,
				path: 'images'
			}
		}
		ImagePicker.showImagePicker(options, (response) => {
			if(response.didCancel){
				console.log('User Cancelled Image Picker')
			} else if (response.error){
				console.log('Error'+ response.error)
			} else if(response.customButton){
				console.log('User tapped custom button'+response.customButton)
			} else {
				this.setState({
					imagePath: response.uri,
					imageHeight: response.height,
					imageWidth: response.width
				})
			}
		})
	}
	saveForm(){
		if(this.state.uid){
			try {
				this.state.name ? Helpers.setUserName(this.state.uid, this.state.name) : null
				this.state.phone ? Helpers.setUserPhone(this.state.uid, this.state.phone) : null
				this.state.place ? Helpers.setUserPlace(this.state.uid, this.state.place) : null
				this.state.imagePath ?
					uploadImage(this.state.imagePath, `${this.state.uid}.jpg`)
						.then((responseData) => {
							Helpers.setImageUrl(this.state.uid, responseData)
						})
						.done()
					: null
				this.props.navigation.navigate("Home");
			} catch(error){
			  console.log(error)
			}
		}
	}
	
	render(){
		return (
			<View style={styles.container}>
				{this.state.imagePath ? <Image style={{width: 100, height: 100}} source={{uri: this.state.imagePath}} /> : null}
			<TouchableHighlight
				onPress={this.openImagePicker.bind(this)}
			>
				<Text>Open Camera</Text>
			</TouchableHighlight>
			 <View style={styles.inputContainer}>
			<TextInput
				style={styles.inputs}
				placeholder="Your Name"
				value={this.state.name}
				onChangeText={(name) => this.setState({name})}
			/>
			</View>
			 <View style={styles.inputContainer}>
			<TextInput
				style={styles.inputs}
				placeholder="Phone"
				value={this.state.phone}
				onChangeText={(phone) => this.setState({phone})}
			/>
			</View>
			 <View style={styles.inputContainer}>
			<TextInput
				style={styles.inputs}
				placeholder="Place"
				value={this.state.place}
				onChangeText={(place) => this.setState({place})}
			/>
			</View>
			<TouchableHighlight
				style={[styles.buttonContainer, styles.loginButton]}
				onPress={this.saveForm.bind(this)}
			>
				<Text style={styles.loginText}>Save</Text>
			</TouchableHighlight>
			</View>
		)
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  inputContainer: {
      borderBottomColor: '#FF553F',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  loginButton: {
    backgroundColor: "#FF553F",
  },
  loginText: {
    color: 'white',
  }
})
