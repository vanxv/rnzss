import React from "react";
import {StyleSheet,Dimensions,Text, View, ScrollView, Button,Image,ActivityIndicator,TouchableOpacity,Alert} from "react-native";
const window = Dimensions.get('window');
const imageWidth = (window.width/3)+30;
const imageHeight = window.height;
var CommonCell = require('./CommonCell');
const serverUrl = 'http://127.0.0.1:7001';
const productUrl = serverUrl+'/m/product';
const OrderUrl = serverUrl+'/m/genratetask';
const axios = require('axios');
import deviceStorage from "../Login/jwt/services/deviceStorage";
var ScreenWidth = Dimensions.get('window').width;
var boxWidth = Dimensions.get('window').height/2;
let token = ''
// 如果你想读取子项，

class ProductScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            PD:'',
            productDetail:'',
            currentPage: 0,
            ImageMain:[],
            ImageDetails:[],
            loading: false,
            taskId:this.props.navigation.getParam('taskId','NO-ID'),
            GenrateTasking:false,
        }
    }
    componentWillMount(){
        this.fetchData(this.state.taskId); //启动的时候载入数据
        // this.startTimer();
    }
    //取消定时器
    // componentWillUnmount(){
    //     clearInterval(this.timer);
    // }

    fetchData(posttaskid){
        console.log(posttaskid)
        deviceStorage.get('token').then((GetToken) => {
            token = GetToken
            console.log(this.props.navigation.getParam('taskId','NO-ID'))
            axios.get(productUrl, { headers: { Authorization: token, sort:0,version:'1.0',taskId:posttaskid}})
                .then(response => {
                    this.setState({productDetail:response.data})
                    this.setState({ImageMain:JSON.parse(this.state.productDetail['Details'])['mainImage']})
                    this.setState({ImageDetails:JSON.parse(this.state.productDetail['Details'])['DetailsImage']})
                    this.setState({loading:true})
                })
                .catch((error) => {
                    console.log('error 3 ' + error);
                });
        });
    }

    //渲染图
    renderChilds(){
        var N = 1
        return this.state.ImageMain.map((x)=>{
            N +=1
            return <Image key={N} source={{uri:x}} style={styles.imageStyle} />;
        })}
        // }


    //渲染图
    renderDeatlsImage(){
        var Y = 10
        return this.state.ImageDetails.map((x)=>{
            Y +=1
            console.log(x)
            return <Image key={Y} source={{uri:x}} style={styles.DeatlsImageStyle} />;
        })}

    //购物按钮
    genrateTask(){
        console.log(this.state.taskId)
        console.log(OrderUrl)
        deviceStorage.get('token').then((GetToken) => {
            token = GetToken
            console.log(this.state.taskId)
            axios.get(OrderUrl, { headers: { Authorization: token, version:'1.0',orderid:this.state.taskId}})
                .then(response => {
                    this.setState({productDetail:response.data})
                    //this.setState({ImageMain:JSON.parse(this.state.productDetail['Details'])['mainImage']})
                    //this.setState({ImageDetails:JSON.parse(this.state.productDetail['Details'])['DetailsImage']})
                    //this.setState({loading:true})
                })
                .catch((error) => {
                    console.log('error 3 ' + error);
                });
        });
    }

    render(){
        let productView;
        const taskId = this.props.navigation.getParam('taskId','NO-ID')
        const imageUrl = this.props.navigation.getParam('imageUrl','NO-ImageUrl')
        if(this.state.loading){

            productView = (

                <View style={{flex:1}}>
                <View style={styles.container}>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={true}>
                    {this.renderChilds()}
                </ScrollView>
                    <ScrollView>
                        <Button
                            title="Delete Record"
                            onPress={() => Alert.alert(
                                'Alert Title',
                                'alertMessage',
                                [
                                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
                                    {text: 'OK', onPress: this.onDeleteBTN},
                                ],
                                { cancelable: false }
                            )}
                        />
                        <Text>xxxx</Text>
                        {this.renderDeatlsImage()}
                        <Text>x</Text>
                        <Text>123213</Text>
                    </ScrollView>
                </View>

                <View style={styles.shopcart}>
                    <View style={styles.bottomItem}><Text>客服</Text></View>
                    <View style={styles.bottomItem}><Text>后仓</Text></View>
                    <View style={styles.bottomItem}><Text>购物车</Text></View>
                    <View style={[styles.bottomItem, {backgroundColor: 'red'}]}>
                        <Text>加入购物车</Text>
                    </View>

                    <View style={[styles.bottomItem, {backgroundColor: 'green'}]}>
                        <Button
                            onPress={this.genrateTask()}
                            title='now buy'
                            color='blue'
                            accessibilityLabel="Learn more about this purple button"
                        />
                        <Text>立即购买{'\n'}购物车</Text>
                    </View>
                    </View>
                </View>
            )
        }else{
            productView=(<ActivityIndicator color="#0000ff" style={{marginTop:50}} />)
        }
        return(
            <View style={{flex:1}}>{productView}</View>

        )
    }
}


const styles = StyleSheet.create({
    fatherview: {
        flexDirection: 'column',
        height: 150
    },
    HeaderTitle: {
        width: 250,
        height: 30,
        //backgroundColor:'white',
        justifyContent:'center',
        borderRadius: 18,
        alignItems: 'center',
        paddingLeft: 8,
    },
    HeaderScrollView:{
        flex:1,
        flexDirection:'column',
        flexWrap: 'wrap'
    },
    image:{
        width: imageWidth,
        height: imageHeight * 0.5
    },
    child:{
        width: window.width/2,
        alignItems: 'center',
        height: imageHeight+5,
        marginTop: 10,
    },
    comments:{
        height: imageHeight * 0.1,
    },
    bottomItem: {
        width:window.width/5,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1

    },
    shopcart: {
        flex:0.07,
        height: 50,
        flexDirection: 'row',
        //backgroundColor: 'red',
    },
    container:{
        flex: 0.93,
        flexDirection:'column'
    },
    contentContainer: {
        paddingVertical: 20
    },
    imageStyle:{
        width: ScreenWidth,
        height: boxWidth
    },
    DeatlsImageStyle:{
        width: ScreenWidth,
        height: boxWidth
    },
    circleWrapperStyle:{
        flexDirection: 'row',
        //absolute‘绝对定位’
        //relative'相对定位
        position:'absolute',
        bottom:0,
        left:10
    },
    circleStyle:{
        fontSize:25,
        color:'#FFF'}
});

module.exports = ProductScreen;