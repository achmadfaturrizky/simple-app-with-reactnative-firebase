import React, {Component} from 'react'
import {
    Text,
    View,
    StyleSheet,
    ListView,
    TouchableHighlight,
    Image,
    Dimensions,
    ImageBackground,
    ScrollView
} from 'react-native'
import { Button, Left, Icon, Header, Title, Right, Card, CardItem, Body } from 'native-base'
import { StackNavigator, withNavigation } from 'react-navigation';
import Helpers from '../lib/helpers'
import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/database'
import '@firebase/storage'
import ReadMore from 'react-native-read-more-text';
import Buy from './Buy'
const {width, height} = Dimensions.get('window')
class Details extends Component {
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

    render(){
    const { navigate } = this.props.navigation;
    const { navigation } = this.props;
    const harga = navigation.getParam('harga', 'harga');
   
    const title = navigation.getParam('title', 'title');
    const kategori = navigation.getParam('kategori', 'kategori');
   
        return(
            
                <View>
                 <ScrollView 
                    vertical={true}
                    showsVerticalScrollIndicator={false}
                 >
                           
                    <Icon style={{color:'#FF553F', top: -300, marginHorizontal: 10}} name="arrow-back"
              onPress={() => this.props.navigation.goBack()}
                /><Card>
                             
                             
                             
                            <CardItem>
                            <Body>
                            <Text style={[styles.text, styles.textTitle]}>{title}</Text>
                            <Text style={styles.textBy}>{kategori}</Text>

                             
                            
                            <Text style={styles.right}><Icon type="AntDesign" style={{color:'#FF553F', fontSize:15}} name="wallet" />
                             Rp.{harga}</Text>
            <Right>
            <Button onPress={() => navigate('Buy', {harga: harga, title: title, kategori: kategori})}
            style={{backgroundColor: '#FF553F', marginHorizontal: 100, marginVertical: 10 }}>
                        <Text style={{ color: '#fff' }}> BELI SEKARANG </Text></Button>
                        </Right>
            </Body>
                           </CardItem>
                           </Card>
              </ScrollView>
                        </View>
        )
    }
}
 _handleTextReady = () => {
    console.log('ready!');
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
        color: '#000',
        fontWeight: 'bold',

    },
    containerCell: {
        marginBottom: 10
    },
    textTitle: {
        fontSize: 20,
        top: -60
    },
    textBy: {
        fontSize: 12,
        top: -60
    },
    right: {
        fontSize: 15,
        top: -50,
        flexDirection:'column',
        color:'#000'

    },
    isi: {
        fontSize: 18,
        marginHorizontal: 10,
        color:'#000'
    },
    textMenu: {
        fontSize: 20,
        color: '#000'
    },
    bgimg:{
  backgroundColor: '#fff',
  width: null,
  height: null,
  justifyContent: 'center',
  flex:1,
  resizeMode: 'cover'
 }
})
export default withNavigation(Details);