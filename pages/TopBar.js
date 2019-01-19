import React, {Component} from "react";
import {View, Text,StyleSheet} from "react-native";
import {Icon,Button} from "native-base";
import {withNavigation} from "react-navigation";
import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';
import Helpers from '../lib/helpers'
class TopBar extends Component{
    constructor(props){
        super(props)
        this.state = {
            text: '',
            avatarUrl: '',
            userName: '',
            name: '',
            url: '',
            phone: ''

        }
    }
    async componentWillMount(){
        try {
            let user = await firebase.auth().currentUser
            Helpers.getImageUrl(user.uid, (imageUrl) => {
                this.setState({
                    avatarUrl: imageUrl
                })
            })
            Helpers.getName(user.uid, (name) => {
                this.setState({
                    userName: name,
                    phone: phone
                })
            })
            Helpers.getUserEvent(user.uid, (event) => {
                if(event){
                    this.setState({
                        name: event.name,
                        url: event.url,
                        event: event.event,
                        dataSource: this.state.dataSource.cloneWithRows(event.event)
                    })
                }
            })
            this.setState({
                uid: user.uid
            })
        } catch(error){
            console.log(error)
        }
    }
    render(){
        return(
            <View style={styles.bar}>
            <Button transparent  iconRight
            >
            
                        <Text style={{fontWeight:'bold', fontSize:15, color: '#000'}}>Kategori</Text>
                        
            </Button>

            <View style={styles.bar}>
            <Button transparent  iconRight
            onPress={() => this.props.navigation.navigate('Register')}>
                <Text style={{paddingLeft:30, fontSize:14, color: '#FF553F'}}>Lihat Semua</Text>
                </Button> 
            </View>
        </View>
        )
    }
}
const styles = StyleSheet.create({
    bar:{ height: 31, paddingLeft:20, backgroundColor: '#fff', flexDirection: 'row', paddingHorizontal: 15, alignItems: 'center', justifyContent: 'space-between' 
}
})
export default  withNavigation(TopBar)