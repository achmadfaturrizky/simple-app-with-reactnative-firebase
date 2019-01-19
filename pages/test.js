import React, {Component} from 'react'
import {
  Text,
  View,
  Platform,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Image,
  Dimensions,
  ScrollView,
  Picker
} from 'react-native'
import { StackNavigator } from 'react-navigation';
import Home from './Home'
import Helpers from '../lib/helpers'
import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';
import '@firebase/storage';
import Icon from 'react-native-vector-icons/FontAwesome'
import BestList from './BestList'
export default class AddEvent extends Component {
  constructor(props){
    super(props)
    this.state = {
      uid: '',
      title: '',
      kategori: '',
      harga: '',
      lokasi: '',
      kapasitas: '',
      deskripsi: '',
      imagePath: '',
      imageHeight: '',
      imageWidth: '',
      qty: 1,
      price: ''
  
    }
  }


  componentWillMount(){
    try {
      let user = firebase.auth().currentUser
      this.setState({
        uid: user.uid
      })
    } catch(error){
      console.log(error)
    }
  }
  closeView(){
    this.props.navigator.pop()
  }
  saveData(){
    if(this.state.uid){
      if(this.state.title &&
        this.state.kategori &&
        this.state.harga &&
        this.state.lokasi &&
        this.state.kapasitas &&
        this.state.deskripsi
        ){
          try {
            this.saveData()
              .then((responseData) => {
                const obj = {
                  title: this.state.title,
                  kategori: this.state.kategori,
                  harga: this.state.harga,
                  lokasi: this.state.lokasi,
                  kapasitas: this.state.kapasitas,
                  deskripsi: this.state.deskripsi
                }
                Helpers.createBuy(this.state.uid, obj)
              })
              .done()
              this.props.navigation.navigate("Home");
          } catch(error){
            console.log(error)
          }
      }
    }
  }
  render(){
    const { navigate } = this.props.navigation;
    const { navigation } = this.props;
    const harga = navigation.getParam('harga', 'harga');
   
    const title = navigation.getParam('title', 'title');
    const kategori = navigation.getParam('kategori', 'kategori');
    return (
      <ScrollView>
      <View style={styles.container}>
      <View style={styles.containerInput}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          placeholder="Title"
          placeholderTextColor="#FF553F"
          onChangeText={(title) => this.setState({title})}
         />
      </View>
      <View style={styles.containerInput}>
        <Text style={styles.label}>Kategori</Text>
        <TextInput
          style={styles.input}
          value={this.state.kategori}
          placeholder="Kategori"
          placeholderTextColor="#FF553F"
          onChangeText={(kategori) => this.setState({kategori})}
         />
      </View>
      <View style={styles.containerInput}>
      <Picker
                selectedValue={this.state.qty}
                style={{ height: 50, width: 100}}
                textStyle={{fontSize: 14}}
                onValueChange={(value)=> this.handlePrice(this.props.harga, value)}
              >
                <Picker.Item label="1" value="1" />
                <Picker.Item label="2" value="2" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="4" value="4" />
                <Picker.Item label="5" value="5" />
                <Picker.Item label="6" value="6" />
                <Picker.Item label="7" value="7" />
                <Picker.Item label="8" value="8" />
                <Picker.Item label="9" value="9" />
                <Picker.Item label="10" value="10" />
                <Picker.Item label="11" value="11" />
              </Picker>
              <Text style={{fontSize: 14, fontWeight: 'bold'}}>Rp{total}</Text>
       
      </View>
      <View style={styles.containerInput}>
        <Text style={styles.label}>Lokasi</Text>
        <TextInput
          style={styles.input}
          value={this.state.lokasi}
          placeholder="Lokasi"
          placeholderTextColor="#FF553F"
          onChangeText={(lokasi) => this.setState({lokasi})}
         />
      </View>
      <View style={styles.containerInput}>
        <Text style={styles.label}>Kapasitas</Text>
        <TextInput
          style={styles.input}
          value={this.state.kapasitas}
          placeholder="Kapasitas"
          placeholderTextColor="#FF553F"
          onChangeText={(kapasitas) => this.setState({kapasitas})}
         />
      </View>
      <View style={styles.containerInput}>
        <TextInput
          multiline
          style={styles.inputTextArea}
          value={this.state.deskripsi}
          placeholder="Deskripsi"
          placeholderTextColor="#FF553F"
          onChangeText={(deskripsi) => this.setState({deskripsi})}
         />
      </View>
    </View>
    <View>
      <TouchableHighlight
        onPress={this.saveData.bind(this)}
        style={[styles.button, {marginBottom: 10}]}
      >
        <Text style={styles.saveButtonText}>ADD</Text>
      </TouchableHighlight>
    </View>
</ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 10,
    justifyContent: 'space-between'
  },
  label: {
    flex: 1,
    fontSize: 18
  },
  input: {
    flex: 2,
    fontSize: 18,
    height: 40
  },
  inputTextArea: {
    height: 200,
    flex: 1,
    fontSize:18
  },
  containerInput: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#FF553F',
    alignItems: 'center',
    marginBottom: 10
  },
  button: {
    borderWidth: 1,
    borderColor: '#FF553F',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 3
  },
  saveButtonText: {
    color: '#FF553F'
  }
})