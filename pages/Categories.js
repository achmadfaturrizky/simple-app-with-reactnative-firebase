import React, {Component} from 'react';
import {Platform, StatusBar,StyleSheet,Image, ImageBackground, Text, View,TouchableOpacity,TextInput, ScrollView} from 'react-native';
import { Container, Left, Right,Header,Content,Icon, Card, CardItem, Thumbnail, Item,Input, Body, Title, Grid, Col,Button } from 'native-base';
import {withNavigation} from 'react-navigation';
import TopBar from './TopBar'
class Categories extends Component{


render() {
    return(
      
            

      <ScrollView 
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      >

        
          <CardItem button transparent >
          <ImageBackground
          source={require('./category/seminar.jpg')}
          resizeMode='cover'
          style={styles.bgimg} >
    <View style={{backgroundColor: 'rgba(0,0,0,0.4)', flex:1, borderWidth: 1}} >
          <Text style={styles.catText}>Seminar</Text>
          </View>
          </ImageBackground>
          </CardItem>
          
         <CardItem button transparent >
          <ImageBackground
          source={require('./category/workshop.jpg')}
          resizeMode='cover'
          style={styles.bgimg}>
  <View style={{backgroundColor: 'rgba(0,0,0,0.4)', flex:1, borderWidth: 1}} >
          <Text style={styles.catText}>Workshop </Text>
          </View>
          </ImageBackground>
          </CardItem>
          
         <CardItem button transparent >
          <ImageBackground
          source={require('./category/konser.jpg')}
          resizeMode='cover'
          style={styles.bgimg}>
  <View style={{backgroundColor: 'rgba(0,0,0,0.4)', flex:1, borderWidth: 1}} >
          <Text style={styles.catText}>Konser </Text>
          </View>
          </ImageBackground>
          </CardItem>

         <CardItem button transparent >
          <ImageBackground
          source={require('./category/collaborate.jpg')}
          resizeMode='cover'
          style={styles.bgimg}>
  <View style={{backgroundColor: 'rgba(0,0,0,0.4)', flex:1, borderWidth: 1}} >
          <Text style={styles.catText}>Kolaborasi </Text>
          </View>
          </ImageBackground>
          </CardItem>
        </ScrollView>

    )
        }
    }
    const styles = StyleSheet.create({
bgimg:{
        backgroundColor: '#fff',
        width: null,
        height: null,
        justifyContent: 'center',
        borderRadius: 1,
        borderWidth: 2

       
},
catText:{

    textAlign: 'center',
    fontSize: 24,
    padding: 25,
    color:'#fff',
    
}
    })
export default withNavigation(Categories);