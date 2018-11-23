import { createBottomTabNavigator, createStackNavigator} from 'react-navigation'; // Version can be specified in package.json
import React from 'react';
import { Text, Button, View, AppRegistry} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import deviceStorage from "./Login/jwt/services/deviceStorage";

// const device = {};
// device.DeviceID = DeviceInfo.getUniqueID();

//** --- input class --- **//
let Home = require('./Home/Home');
let Share = require('./Share/Share');
let TaskView = require('./TaskView/TaskView');
let TaskDetailsScreen = require('./TaskDetails/Task');
let MeScreen = require('./Me/Me');
let addTbAccountScreen = require('./Me/AddTbAccount');
let ProductScreen = require('./Product/Product')
let OrderScreen = require('./Order/Order')
let MobileLoginScreen = require('./Login/MobileLogin')
let LoginScreen = require('./Login/Login')
let token = ''
deviceStorage.get('token').then((GetToken) => {
        token = GetToken
        });

const TabView = createBottomTabNavigator({
    试用: { screen: Home,
        navigationOptions: ({ navigation }) => ({
                tabBarOnPress: ({ navigation, defaultHandler }) => {
                    deviceStorage.get('token').then((GetToken) => {
                    token = GetToken
                    })
                    if (token === '' || token=== null) {navigation.navigate('Login')
                        }else {defaultHandler(); }}
                    })
    },
    分享: { screen: Share,
        navigationOptions: ({ navigation }) => ({
                tabBarOnPress: ({ navigation, defaultHandler }) => {
                    deviceStorage.get('token').then((GetToken) => {
                    token = GetToken
                    })
                    if (token === '' || token=== null) {navigation.navigate('Login')
                        }else {defaultHandler(); }}
                    })
    },
    订单: { screen: TaskView,
        navigationOptions: ({ navigation }) => ({
                tabBarOnPress: ({ navigation, defaultHandler }) => {
                    deviceStorage.get('token').then((GetToken) => {
                    token = GetToken
                    })
                    if (token === '' || token=== null) {navigation.navigate('Login')
                        }else {defaultHandler(); }}
                    })
    },
    我的: { screen: MeScreen,
        navigationOptions: ({ navigation }) => ({
                tabBarOnPress: ({ navigation, defaultHandler }) => {
                    deviceStorage.get('token').then((GetToken) => {
                    token = GetToken
                    })
                    if (token === '' || token=== null) {navigation.navigate('Login')
                        }else {defaultHandler(); }}
                    })
            }
        },
    
    {
        initialRouteName: '订单',
        lazy:true,
    },
)

const RootStack = createStackNavigator(
    {
        TestMain: {
            screen: TabView,
            navigationOptions: {
                headerTransparent: true,
            }
        },
        //产品页
        ProductScreen: {
            screen: ProductScreen,
            navigationOptions: {
                headerTransparent: true,
            }
        },
        //订单
        Order: {
            screen: OrderScreen,
            navigationOptions: {
                headerTransparent: true,
            }
        },
        //任务详情页
        TaskDetails: {
            screen: TaskDetailsScreen,
            navigationOptions: {
                headerTransparent: true,
            }

        },
        //手机号登录
        MobileLogin: {
            screen: MobileLoginScreen,
            navigationOptions: {
                headerTransparent: true,
            }
        },
        //密码登录
        Login: {
            screen: LoginScreen,
            navigationOptions: {
                headerTransparent: true,
            }
        },
        //绑定tb账号
        addTbAccount: {
            screen: addTbAccountScreen,
            navigationOptions: {
                headerTransparent: true,
            }
        },
     },
    {
        initialRouteName: 'TestMain',
    }
)

export default class shop extends React.Component {
    render() {
        return (
            <RootStack />
        )
    }
}

