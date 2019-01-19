import React, {Component} from 'react';
import {Platform, StatusBar,StyleSheet,Image, ImageBackground, Text, View,TouchableOpacity,TextInput, ListView} from 'react-native';
import { Container, Left, Right,Header,Content,Icon, Card, CardItem, Thumbnail, Item,Input, Body, Title, Grid, Col,Button } from 'native-base';
import Headers from './common/headers';
import {withNavigation} from 'react-navigation';
import Swiper from 'react-native-swiper';
import Categories from './Categories';
import Slider from "./Slider";
import BestList from "./BestList";
import TopBar from "./TopBar";
import firebase from '@firebase/app';
import Welcome from './Welcome'
import '@firebase/auth';
import '@firebase/database';
import '@firebase/storage';
 class Home extends Component<Props> {
  componentDidMount() {
   firebase.auth().onAuthStateChanged(user => {
    this.props.navigation.navigate(user ? 'Home' : 'Welcome')
  })
}
  render() {
    return (
      
      <Container >
     <Headers/>
      
             
     <Content>
         <Slider/>
         <TopBar/>
         <Categories/>
         <BestList/>
         
    </Content>

     
    
      </Container>
    );
  }
}


export default withNavigation(Home);