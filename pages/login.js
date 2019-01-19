import React, {Component} from 'react';
import {Platform, StyleSheet, Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image} from 'react-native';
  import {Navigation} from 'react-navigation';
import { Container, Form,Item as FormItem,Label, Input, CardItem} from 'native-base';

type Props = {};
import firebase from '@firebase/app';
import '@firebase/auth';
import Home from "./Home"
export default class login extends Component<Props> {
  constructor(props) {
    super(props);
  }
    state = {
    email: "",
    password: ""
  };

  componentDidMount() {
    this.watchAuthState(this.props.navigation)
  }

  watchAuthState(navigation) {
    firebase.auth().onAuthStateChanged(function(user) {
      console.log('onAuthStatheChanged: ', user)
      
      if (user) {
        navigation.navigate('Home');
      }
    });
  }

  login() {
    const{email, password} = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password)
  }
    
  render() {
    return (
     <Container style={{ backgroundColor:'#fff'}}>
       
       
       <View style={styles.container}>
    <Text style={{ color:'#FF553F', fontSize: 40, top: -20, fontWeight: 'bold'}}>Collaborate</Text>

        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={email => this.setState({email})}/>
        </View>
        
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={password => this.setState({password})}/>
        </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.login.bind(this)}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer} onPress={this.myfun}>
            <Text>Forgot your password?</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer} 
        onPress={() => this.props.navigation.navigate('Register')}>
            <Text>Register</Text>
        </TouchableHighlight>
      </View>

        </Container>
       
    );
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
