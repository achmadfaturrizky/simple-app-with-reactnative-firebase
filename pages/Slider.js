import React, {Component} from "react";
import Swiper from "react-native-swiper";
import {ImageBackground,Text,View,StyleSheet} from "react-native";
export default class Slider extends Component{

render(){
    return(

      <Swiper autoplay={true}
      style={{width:'100%', height:150}}
      activeDot={<View style={{backgroundColor:'#fff', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 2}} />} >


<ImageBackground
        style={styles.bgimg}
        source={require('./slider/1.jpg')}>
      <View  style={{backgroundColor: 'rgba(0,0,0,0.4)', flex: 1}} >
        <Text style={styles.catText}>
         Kemah Kesatrian Muda
        </Text>
        </View>
      </ImageBackground>


<ImageBackground style={styles.bgimg} source={require('./slider/2.jpg')}>
      <View style={{backgroundColor: 'rgba(0,0,0,0.4)', flex: 1}} >
        <Text style={styles.catText}>
         Guitar Stand Making
        </Text>
        </View>
      </ImageBackground>


      </Swiper>
    )
}

}
const styles = StyleSheet.create({
 bgimg:{
  backgroundColor: '#fff',
  width: null,
  height: null,
  justifyContent: 'center',
  flex:1,
  resizeMode: 'cover'
 },
 catText:{
    textAlign: 'center',
    fontSize: 25,
    padding: 40,
    color:'#fff'
 },
});