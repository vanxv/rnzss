import React from 'react';
import {StyleSheet, View, Button, TextInput,Text} from 'react-native';
import {NavigationActions,StackActions} from 'react-navigation';
import DeviceInfo from 'react-native-device-info';
import axios from 'axios';

// const xxxIP = DeviceInfo.getIPAddress()
// console.log(xxxIP)
// const getDeviceId = DeviceInfo.getDeviceId()
// const getUniqueID = DeviceInfo.getUniqueID()
// const isEmulator = DeviceInfo.isEmulator()
// console.log(getUniqueID)
// console.log(isEmulator)
const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'TestMain' })],
    });

class RegScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            password1: '',
            message: '',
            token: ''
        }
        this.loginUserNode = this.loginUserNode.bind(this);
        this.loginVerify=this.loginVerify.bind(this)
  }
    //NodeJS API
    loginUserNode() {
        axios.post("http://127.0.0.1:7001/login",{
            username: this.state.username,
            password: this.state.password
        })
        .then((response) => {
          if (response.data.message==='no') {
            this.setState({message: '账号或密码错误,多次考虑「手机登录」'});
          }  else if (response.data.message==='yes') {
              deviceStorage.save('token', response.data.token);
              console.log('SaveToken:'+response.data.token);
              this.props.navigation.dispatch(resetAction);
            }

          //deviceStorage.saveKey("token", response.data.token);
          //this.props.newJWT(response.data.token);
          //this.setState(token:response.data)
        })
        .catch((error) => {
          this.setState({message: '网络问题，重新提交'});
          this.onLoginFail();
        });        }

    loginVerify() {
        if(this.state.username.length !== 11) {
            this.setState({message:'请输入正确的手机号'});
            return;
        }
        if(this.state.password.length < 6) {
                this.setState({message:'密码大于5位'});
                return;
            }
        if(this.state.password !==this.state.password1 ) {
                this.setState({message:'请输入2个相同的密码'});
                return;
            }
    var PATTERN_CHINATELECOM = /^1(3[0-9])|(8[019])\d{8}$/; //电信号
    if (PATTERN_CHINATELECOM.test(this.state.username) === false) {
                this.setState({message:'请输入正确的手机号'});
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
            <TextInput style={styles.textinput}
              placeholder="验证密码"
              secureTextEntry={true}
              label='password1'
              value={this.state.password1}
              onChangeText={password1 => this.setState({ password1 })}
            />
            <View style={styles.subButton}>
              <Button onPress={this.loginVerify}
                    title='登录'
                    />
                <Button
                    title="密码登录"
                    color='#56688a'
                    onPress={() => this.props.navigation.navigate('Login')}
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

module.exports = RegScreen;

