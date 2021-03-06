import React, {
    AsyncStorage
}from 'react-native';

class DeviceStorage {
    /**
     * 获取
     * @param key
     * @returns {Promise<T>|*|Promise.<TResult>}
     */

    static get(key) {
        return AsyncStorage.getItem(key).then((value) => {
            const jsonValue = JSON.parse(value);
            return jsonValue;
        });
    }


    /**
     * 保存
     * @param key
     * @param value
     * @returns {*}
     */
    static save(key, value) {
        return AsyncStorage.setItem(key, JSON.stringify(value));
    }


    /**
     * 更新
     * @param key
     * @param value
     * @returns {Promise<T>|Promise.<TResult>}
     */
    static update(key, value) {
        return DeviceStorage.get(key).then((item) => {
            value = typeof value === 'string' ? value : Object.assign({}, item, value);
            return AsyncStorage.setItem(key, JSON.stringify(value));
        });
    }


    /**
     * 更新
     * @param key
     * @returns {*}
     */
    static delete(key) {
        return AsyncStorage.removeItem(key);
    }
}

export default DeviceStorage;









// import React from 'react';
// import { Platform, StyleSheet, Text, View, Button, AsyncStorage, TouchableOpacity } from 'react-native';

// class AsyncStorage extends React.Component{
//     constructor(props){
//         super(props);
//         this.state = {
//             jwt: '',
//             email: '',
//             error: ''
//         }
//     }

//     _storeData = async () =>{
//         try {
//             await AsyncStorage.setItem('X1', 'I like save it.');
//             await AsyncStorage.setItem('X2', 'I like save it.');
//             console.log('_storeData')
//         } catch (error) {
//             //Error saving data
//         }
//     }
//     _retrieveDta = async () => {
//         try {
//             const value = await AsyncStorage.getItem('X1');
//             const value1 = await AsyncStorage.getItem("token");
//             if (value !== null) {
//             }
//         } catch (error) {
//             //ERROR RETRIVEING DATA
//         }
//     }

//     render() {
//         return(
//             <View>
//                 <Text>123123</Text>
//                 <TouchableOpacity style={{width: 100, height: 100, borderWidth: 1}} onPress={this._storeData}>
//                     <Text>_storeData</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={{width: 100, height: 100, borderWidth: 1}} onPress={this._retrieveDta}>
//                     <Text>_retrieveDta</Text>
//                 </TouchableOpacity>
//             </View>

//         )}
// }

// module.exports(AsyncStorage);





