import React from "react";
import {StyleSheet, View, Button, TextInput,Text} from 'react-native';
import axios from 'axios';
import deviceStorage from "./jwt/services/deviceStorage";
import {NavigationActions,StackActions} from 'react-navigation';
import DeviceInfo from 'react-native-device-info';
// const xxxIP = DeviceInfo.getIPAddress()
// console.log(xxxIP)
// const getDeviceId = DeviceInfo.getDeviceId()
// const getUniqueID = DeviceInfo.getUniqueID()
// const isEmulator = DeviceInfo.isEmulator()
// console.log(getUniqueID)
// console.log(isEmulator)
// const resetAction = StackActions.reset({
//         index: 0,
//         actions: [NavigationActions.navigate({ routeName: 'TestMain' })],
//     });

class LoginTitle extends React.Component{
    render(){
        return(
            <Button 
                title="goBac1k"
                onPress={() => navigation.goBack()}/>
        )}}

class IndexTitle extends React.Component{
    render(){
        return(
            <Button 
                title="goBack"
                onPress={() => this.props.navigation.goBack()}/>
        )}}

class LoginScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            message: '',
            token: ''
        }
        // this.loginUser = this.loginUser.bind(this);
        this.loginUserNode = this.loginUserNode.bind(this);
        this.loginVerify=this.loginVerify.bind(this)
    };
    static navigationOptions={
        HeaderTitle:'注册页面',
        };
    //django restframework API
    loginUser() {
        const{ username, password, error} = this.state;
        this.setState({error:'', loading:true});


        axios.post("http://127.0.0.1:7001/login",{
        username: username,
        password: password
        })
        .then((response)=> {
            if (response.data.token) {
            deviceStorage.save('token', response.data.token);
            this.props.newJWT(response.data.token);
            } else {
               co
               console.log('response.data');

            }
        })
        .catch((error) => {
            console.log(error);
        })
            }
    //NodeJS API
    loginUserNode() {
        axios.post("http://127.0.0.1:7001/login",{
            username: this.state.username,
            password: this.state.password
        })
        .then((response) => {
          console.log(response.data.error)
          console.log(response.data)
          //deviceStorage.saveKey("token", response.data.token);
          //this.props.newJWT(response.data.token);
          //this.setState(token:response.data)
          this.props.navigation.dispatch(resetAction);
        })
        .catch((error) => {
          this.setState({message: '网络问题，重新提交'});
          this.onLoginFail();
        });        }

    loginVerify() {
        // if(this.state.username.length !== 11) {
        //     this.setState({message:'请输入正确的手机号'});
        //     return;
        // }
        if(this.state.password.length < 6) {
                this.setState({message:'密码大于5位'});
                return;
            }
        this.loginUserNode()
    }
    render(){
        return(
            <View style={styles.LoginPage}>
            <View style={styles.loginSection}>
                <Text style={styles.loginTitle}> 登录 </Text>

              <TextInput style={styles.textinput}
                label='username'
                keyboardType={'numeric'}
                placeholder="请输入手机号或账户"
                maxLength={11}
                value={this.state.username}
                onChangeText={username => this.setState({ username })}
              />
            <TextInput style={styles.textinput}
              placeholder="请输入密码"
              secureTextEntry={true}
              label='password'
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
            />

            <View style={styles.subButton}>
                <Button 
                    title='登陆'
                    onPress= {() => this.loginVerify()}
                    />
                <Button
                    color='#56688a'
                    title="手机登录"
                    onPress={() => this.props.navigation.navigate('Reg')}
                />
            </View>
                <Text style ={styles.message}>{this.state.message}</Text>
                </View>
            </View>

        )
    }
}


const styles = StyleSheet.create({
  LoginPage: {
    flex:1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 20,
  },
  loginSection: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 20
  },
  loginTitle: {
    color: '#DC3C78',
    fontSize: 38,
    fontWeight: '500',
    marginTop: 80,
    textAlign: 'center',
    marginBottom: 80,
  },
  subButton: {
    color: '#56688a',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15
  },
  login: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textinput:{
    marginBottom: 8
  },
    button: {
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  message:{
    marginTop: 16,
    color: '#56688a',
    fontSize: 16
    },
})

module.exports = LoginScreen;
