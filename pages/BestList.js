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
import { StackNavigator, withNavigation } from 'react-navigation';
import { Button } from 'native-base'
import Details from './Details'
import Helpers from '../lib/helpers'
import firebase from '@firebase/app'
type Props = {};
import '@firebase/auth'
import '@firebase/database'
import '@firebase/storage'
const {width, height} = Dimensions.get('window')
class Event extends Component<Props> {
    constructor(props){
        super(props)
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.state = {
            uid: '',
            dataSource: ds.cloneWithRows([]),
            rawEvent: ''
        }
    }

    componentWillMount() {
        try {
            let user = firebase.auth().currentUser
            this.setState({
                uid: user.uid
            })
            Helpers.getAllEvent((event) => {
                if(event){
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(event),
                        rawEvent: event
                    })
                }
            })
        } catch(error){
            console.log(error)
        }
    }
    closeView(){
        this.props.navigator.pop()
    }

    renderRow(rowData){
       const { navigate } = this.props.navigation;
        const img = rowData.image
        return(
            <TouchableHighlight style={styles.containerCell}>
                <View>
                    <Image
                        style={{width: width, height: 180}}
                        source={{uri: img}}
                    />
                    <View style={styles.footerContainer}>
                        <View style={styles.imageUser}>
                            <Image
                                style={styles.imageAvatar}
                                source={{uri: rowData.userPhoto}}
                            />
                        </View>
                        <View style={styles.footerTextContainer}>
                            <Text style={[styles.text, styles.textTitle]}>{rowData.title}</Text>
                            <Text style={styles.textCategory}>{rowData.kategori}</Text>
                            <Text style={[styles.text, styles.textBy]}>By {rowData.userName}</Text>
                        </View>
                        <Button onPress={() => navigate('Details', {harga: rowData.harga, foto: rowData.image, title: rowData.title, kategori: rowData.kategori, deskripsi: rowData.deskripsi,
                            kapasitas: rowData.kapasitas, lokasi: rowData.lokasi})} 
                        style={{backgroundColor: '#fff', paddingHorizontal: 30, marginHorizontal: 50, marginVertical: 10 }}>
                        <Text style={{ color: '#FF553F' }}> SHOW DETAIL </Text></Button>
                    </View>
                </View>
            </TouchableHighlight>

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
    textCategory: {
        color: '#fff',
        fontSize: 10
    },
    containerCell: {
        marginBottom: 10
    },
    textTitle: {
        fontSize: 13
    },
    textBy: {
        fontSize: 10
    },
    textMenu: {
        fontSize: 20,
        color: '#fff'
    }
})
export default withNavigation(Event);