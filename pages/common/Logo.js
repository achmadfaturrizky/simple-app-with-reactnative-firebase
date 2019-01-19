import React, {Component} from "react";
import {View,Text,Image} from "react-native";
import {CardItem} from "native-base";
import {withNavigation} from "react-navigation";

class Logo extends Component{
    render(){
        return(
            <View>
            <CardItem button style={{backgroundColor:'#fff'}}
            onPress={() => this.props.navigation.navigate('Home')}>
            <Image source={require("../../logo.png")}
            style={{width:120, height:120,}}/>
            </CardItem>
          </View>
        )
    }
}
export default withNavigation(Logo)