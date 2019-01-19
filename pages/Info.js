import React, {Component} from 'react'
import {
    Text,
    View,
    StyleSheet,
    ListView,
    TouchableHighlight,
    Image,
    Dimensions
} from 'react-native'


import Helpers from '../lib/helpers'
import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/database'
import '@firebase/storage'
const {width, height} = Dimensions.get('window')
export default class Info extends Component {
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

     async componentWillMount(){
        try {
            let user = await firebase.auth().currentUser
            Helpers.getImageUrl(user.uid, (imageUrl) => {
                this.setState({
                    avatarUrl: imageUrl
                })
            })
            Helpers.getUserName(user.uid, (name) => {
                this.setState({
                    userName: name
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

    renderRow(rowData){
        const img = this.state.url
        return(
           
                <View>
                            <Image
                                style={styles.imageAvatar}
                                source={{uri: img}}
                            />
                        
                            <Text>{this.state.name}</Text>
                       
                    </View>
                
            
        )
    }

    render(){
        return (
            <View style={styles.container}>
                
                <ListView
                enableEmptySections={true}
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)}
                style={{flex: 1}}
                />
            </View>
            
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
    
    footerContainer: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#FF553F'
    },
    imageAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 5 
    },
    listContainer: {
        marginHorizontal: 10
    },
    text: {
        color: '#fff'
    },
    containerCell: {
        marginBottom: 10
    },
    textTitle: {
        fontSize: 13
    },
    textBy: {
        fontSize: 12
    },
    textMenu: {
        fontSize: 20,
        color: '#fff'
    }
})