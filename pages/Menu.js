import React, { Component } from 'react';
import {NavigationActions} from 'react-navigation';
import { Text, View, StyleSheet, ImageBackground,SafeAreaView,ScrollView,Image,FlatList,Linking,ListView, AsyncStorage,
TouchableHighlight} from 'react-native'
import * as theme from './theme';
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;
import { Icon, Item } from 'native-base';
import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';
import '@firebase/storage';
import Helpers from '../lib/helpers'
import Login from './login'
import Profile from './Profile'
import AddEvent from './AddEvent'
import Info from './Info'
import Test from './test'
import {withNavigation} from 'react-navigation';
import { StackNavigator } from 'react-navigation';
class Menu extends Component {
    constructor(props){
        super(props)
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.state = {
            isLoaded: false,
            dataSource: ds.cloneWithRows([]),
            text: '',
            avatarUrl: '',
            userName: '',
            name: '',
            url: ''

        }
    }
async logout(){
        try{
            await firebase.auth().signOut()
            this.props.navigation.navigate("Home");
        } catch(error){
            console.log(error)
        }
    }
render(){
        return (
            <SafeAreaView style={{flex:1}} >
              <ScrollView>
            <View style={styles.head}>
           
                 <Info/>

            </View>
           
             <Text style={styles.link} 
                             onPress={() => this.props.navigation.navigate('Home')}>
                            <Icon type="AntDesign" name="home" style={styles.icon}/> Home
                            </Text>
                            <Text style={styles.link} 
                             onPress={() => this.props.navigation.navigate('AddEvent')}>
                            <Icon type="AntDesign" name="carryout" style={styles.icon}/> Add event
                            </Text>
                             <Text style={styles.link} 
                             onPress={() => this.props.navigation.navigate('Profile')}>
                            <Icon type="AntDesign" name="user" style={styles.icon}/> Profile
                            </Text>
                            <Text style={styles.link} 
                             onPress={() => this.props.navigation.navigate('Test')}>
                            <Icon type="AntDesign" name="user" style={styles.icon}/> test
                            </Text>
                             <TouchableHighlight
                        onPress={this.logout.bind(this)}
                             >
                           <Text style={styles.link} > <Icon type="AntDesign" name="export2" style={styles.icon}/> Logout</Text>
                            </TouchableHighlight>
                            


                            
                
            </ScrollView>
</SafeAreaView>
    
        )
    }
}

const styles = StyleSheet.create({
    link:{
        backgroundColor: color.white,
        fontSize: fontSize.regular+5,
        fontFamily: fontFamily.light,
        color: "#000",
        padding:10,
        margin:10,
        
    },
    head:{

        backgroundColor: '#FF553F',
        height: 170,
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon:{
        fontSize:25,
        color:'#000'
    }

});
export default withNavigation(Menu);