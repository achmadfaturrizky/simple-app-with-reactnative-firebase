import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Button} from 'react-native';

import {withNavigation} from 'react-navigation';
import { Container, Left, Right,Header,Content,Icon, Body, Title } from 'native-base';
class Headers extends Component{

    render(){
        return(
           
            <Header style={{width:'100%', backgroundColor:'#fff'}}>
            <Left> 
              <Icon style={{color:'#FF553F'}} name="menu"
                 onPress={() => this.props.navigation.toggleDrawer()}/>
           </Left>
           <Body> 
             <Title style={{color:'#FF553F'}}>Collaborate</Title>
           </Body>
                <Right>  
                  <Icon name="ticket" 
                  onPress={() => this.props.navigation.navigate('Login')}
                  type="FontAwesome" style={{color:'#FF553F'}}/>
                   </Right>
                
                </Header>

                
        )
    }
}
export default withNavigation(Headers);