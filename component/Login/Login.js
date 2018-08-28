import React from "react";
import {StyleSheet, View, Button, TextInput} from 'react-native';

class LoginTitle extends React.Component{
    render(){
        return(
            <Button 
                title="MyModal"
                onPress={() => this.props.navigation.navigate('MyModal')}/>
        )}}

class IndexTitle extends React.Component{
    render(){
        return(
            <Button 
                title="MyModal"
                onPress={() => this.props.navigation.navigate('MyModal')}/>
        )}}

export default class LoginScreen extends React.Component{

    static navigationOptions =({
        mode: 'modal',
        headerMode: 'none',
        headerTitle: <LoginTitle/>,
        headerLeft:  <IndexTitle/>,
        headerStyle: {
            backgroundColor: '#DC3C78'}})
    render(){
        return(
            <View style={styles.login}>
              <TextInput style={styles.textinput}
                placeholder="请输入账号、手机号" />
            <TextInput
              password="flase"
              placeholder="请输入密码"
                 />
            <View style={styles.button}>
                <Button
                    title="登陆"
                    onPress={() => this.props.navigation.navigate('Details')}
                />
                <Button
                    title="注册"
                    onPress={() => this.props.navigation.navigate('Reg')}
                />
                <Button
                    title="登陆"
                    onPress={() => this.props.navigation.navigate('Login')}
                />
                <Button
                    title="订单"
                    onPress={() => this.props.navigation.navigate('订单')}
                />
                <Button
                    title="ModalScreen"
                    onPress={() => this.props.navigation.navigate('MyModal')}/>
            </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
  login: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textinput:{
    height:60,
    fontSize: 18
  },
    button: {
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

module.exports = LoginScreen;
