import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Font, AppLoading} from 'react-native';
import {StackNavigator, createDrawerNavigator} from 'react-navigation';
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/Home';
import Welcome from './pages/Welcome';
import Profile from './pages/Profile';
import AddEvent from './pages/AddEvent';
import Splash from './pages/Splash';
import BestList from './pages/BestList';
import Info from './pages/Info';
type Props = {};
import Test from './pages/test'
import Buy from './pages/Buy'
import Menu from './pages/Menu';
import Details from './pages/Details'
import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';
import Firebase from './lib/firebase'

  function cacheFonts(fonts) {
    return fonts.map(font => Font.loadAsync(font));
}

export default class App extends Component<Props> {
    async _loadAssetsAsync() {
        const fontAssets = cacheFonts([
            {RobotoExtraBold: require('./assets/fonts/Roboto-Black.ttf')},
            {RobotoBold: require('./assets/fonts/Roboto-Bold.ttf')},
            {RobotoMedium: require('./assets/fonts/Roboto-Medium.ttf')},
            {RobotoRegular: require('./assets/fonts/Roboto-Regular.ttf')},
            {RobotoLight: require('./assets/fonts/Roboto-Light.ttf')},
            {AntDesign: require('./assets/fonts/AntDesign.ttf')},
            {Entypo: require('./assets/fonts/Entypo.ttf')},
            {Evillcons: require('./assets/fonts/EvilIcons.ttf')},
            {Feather: require('./assets/fonts/Feather.ttf')},
            {FontAwesome: require('./assets/fonts/FontAwesome.ttf')},
            {FontAwesome5_Brands: require('./assets/fonts/FontAwesome5_Brands.ttf')},
            {FontAwesome5_Reguler: require('./assets/fonts/FontAwesome5_Regular.ttf')},
            {FontAwesome5_Solid: require('./assets/fonts/FontAwesome5_Solid.ttf')},
            {Foundation: require('./assets/fonts/Foundation.ttf')},
            {Ionicons: require('./assets/fonts/Ionicons.ttf')},
            {MaterialCommunityIcons: require('./assets/fonts/MaterialCommunityIcons.ttf')},
            {MaterialIcons: require('./assets/fonts/MaterialIcons.ttf')},
            {Octicons: require('./assets/fonts/Octicons.ttf')},
            {SimpleLineIcons: require('./assets/fonts/SimpleLineIcons.ttf')},
            {Zocial: require('./assets/fonts/Zocial.ttf')},
        ]);

        await Promise.all([...fontAssets]);
    }
  render() {
    return (
      
     <Mypages/>
    );
  }
}

const Mypages = new createDrawerNavigator({
  Splash : { screen: Splash},
  Welcome: { screen:Welcome},
  Login: { screen:Login},
  Home:{screen:Home},
Register: {screen:Register},
Profile: {screen:Profile},
AddEvent: {screen:AddEvent},
BestList: {screen:BestList},
Info: {screen:Info},
Details: {screen:Details},
Test: {screen:Test},
Buy: {screen:Buy}
},
{
  contentComponent:Menu
});
const Collaborate = StackNavigator({
  Home: { screen: Mypages },

 });