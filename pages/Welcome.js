import React, { Component } from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {NavigationActions} from 'react-navigation';
import {Button, SocialIcon, Divider} from 'react-native-elements'
import styles from "./styles"
import Login from './login'
import Register from './register'
import firebase from '@firebase/app';
import '@firebase/auth';
console.disableYellowBox = true;
class Welcome extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <Image style={styles.image} source={{uri: ""}}/>
                    <Text style={styles.title}>Collaborate</Text>
                </View>

                <View style={styles.bottomContainer}>
                    <View style={[styles.buttonContainer]}>
                        <Button
                            raised
                            borderRadius={4}
                            title={'LOGIN'}
                            containerViewStyle={[styles.containerView]}
                            buttonStyle={[styles.button]}
                            textStyle={styles.buttonText}
                             onPress={() => this.props.navigation.navigate('Login')}/>

                        <View style={styles.orContainer}>
                            <Divider style={styles.divider}/>
                            <Text style={styles.orText}>
                                Or
                            </Text>
                        </View>

                        <Button
                            raised
                            borderRadius={4}
                            title={'REGISTER'}
                            containerViewStyle={[styles.containerView]}
                            buttonStyle={[styles.button]}
                            textStyle={styles.buttonText}
                             onPress={() => this.props.navigation.navigate('Register')}/>
                    </View>
                </View>

            </View>
        );
    }
}


export default Welcome;