import React, { Component } from 'react';
import {Text, View, TouchableOpacity, Image, Platform, StatusBar, AppRegistry} from 'react-native';
import {NavigationActions} from 'react-navigation';
import {Button, SocialIcon, Divider} from 'react-native-elements'
import styles from "./styles2"
import Welcome from './Welcome'
import Home from './Home'
import firebase from '@firebase/app';
import '@firebase/auth';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
Platform.select({
    android: () => StatusBar.setBackgroundColor('#FF553F'),

})();
console.disableYellowBox = true;
class Splash extends React.Component {
componentDidMount() {
   firebase.auth().onAuthStateChanged(user => {
    this.props.navigation.navigate(user ? 'Home' : 'Welcome')
  })
}

  
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    
                    <Text style={styles.title}>Collaborate</Text>
                    <Bars size={10} color="#FF553F" />
                </View>
                </View>
        );
    }
}
export default Splash;