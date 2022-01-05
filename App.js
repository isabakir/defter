/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
 import 'react-native-gesture-handler';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
 
  StyleSheet,
 
} from 'react-native';



import Order from './components/seller/Order';
import UserList from './components/seller/UserList';

import Rows from './components/seller/Rows';
import AllOrder from './components/seller/AllOrder';
import AddNewUser from './components/seller/AddNewUser';
import OldOrder from './components/seller/OldOrder';
import  LastUpdate from './components/seller/LastUpdate';
import LoginArea from './components/Login';
import Fatura from './components/seller/Fatura';
import NewGroup from './components/seller/NewGroup';
import Grups from './components/seller/Grups';
import Footer from './components/seller/Footer';
import LoginScreen from './components/LoginScreen';

import MySellers from './components/buyyer/MySellers';
import MyOrders from './components/buyyer/MyOrders';
import MyOldOrder from './components/buyyer/MyOldOrder';
import NewLogin from './components/NewLogin';

const Stack = createStackNavigator();
function App (){
 
  return (

   
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Giriş Ekranı">
        <Stack.Screen name="Giriş Ekranı" component={LoginScreen} /> 
         <Stack.Screen name="Giriş" component={NewLogin} /> 
            <Stack.Screen name="Müşteri Listesi" component={UserList} />
            <Stack.Screen name="Sipariş" component={Order} />
            <Stack.Screen name="Müşterirrr" component={Rows} />
            <Stack.Screen name="Tüm Siparişler" component={AllOrder} />
            <Stack.Screen name="Yeni Kullanıcı" component={AddNewUser} />
            <Stack.Screen name="Eski Sipariş" component={OldOrder} />
            <Stack.Screen name="Güncellenen Sipariş" component={LastUpdate} />
            <Stack.Screen name="Fatura Bilgileri" component={Fatura} />
            <Stack.Screen name="Yeni Grup" component={NewGroup} />
            <Stack.Screen name="Gruplar" component={Grups} />
            <Stack.Screen name="Footer" component={Footer} />
            <Stack.Screen name="Satıcılarım" component={MySellers} />
            <Stack.Screen name="Siparişlerim" component={MyOrders} />
            <Stack.Screen name="Eski Siparişim" component={MyOldOrder} />
        </Stack.Navigator>
    </NavigationContainer>
  
   
  );



 
};
const styles = StyleSheet.create({
 
  container: { 
    flex: 1,
    padding: 18,
    paddingTop: 35,
    backgroundColor: '#ffffff' 
  },
  userContainer:{
   flexDirection:'row',
   alignItems:'center',

    padding:3
  },
  avatar:{
    width:44,
    height:44,
    borderRadius:20
  },
  nameText:{
    marginLeft:12,
    fontSize:14
  },
  titleText:{
    fontSize:24,
    textAlign:'center'
  }
});

export default App;
