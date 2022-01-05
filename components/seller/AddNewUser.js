import 'react-native-gesture-handler';
import React from 'react';
import {Component, Node,useState,useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput, 
  TouchableOpacity,
  Button
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
class AddNewUser extends Component{
 
 constructor(props) {
    super(props);
    this.state = {
      userName: '',
      telefon:'',
      tax:'',
      taxAdminis:'',
      adress:'',
      password:'',
      repassword:'',
      unvan:''
    };
}

 
  changeName=(text)=>{
    this.setState({userName:text});
 }
  changeTelefon=(text)=>{
    this.setState({telefeon:text});
 }
  AddUser=()=>{
     
    fetch('http://hediyemola.com/defter/addNewUser.php',{
        method:'POST',
        headers:{
          'accept':'application/json',
          'Content-Type': 'application/json',
  
        },
        body:JSON.stringify({
          key:'addNewUser',
          seller_id:'1',
          newName:this.state.userName,
          telefon:this.state.telefon,
          password:this.state.password,
          tax:this.state.tax,
          taxAdminis:this.state.taxAdminis,
          adress:this.state.adress,
          unvan:this.state.unvan

        })
      })
      .then((response)=>response.json())
      .then((res)=>{ 
          console.log(res);
          this.props.navigation.navigate('Müşteri Listesi',{refreshing:true});
          
      })
      .done();
    

    

}
render(){
        return(
           
     <View  style={styles.mainContainer}>
       <TextInput  onChangeText={(text)=>{ this.setState({userName:text});}}  value={this.state.userName}  placeholder="Ad Soyad"/>
       <TextInput  onChangeText={(text)=>{ this.setState({unvan:text});}}  value={this.state.unvan}  placeholder="İşyeri Ünvanı"/>
       <TextInput onChangeText={(text)=>{ this.setState({telefon:text});}}  value={this.state.telefon}  placeholder="Telefon" />
       <TextInput onChangeText={(text)=>{ this.setState({tax:text});}}  value={this.state.tax}  placeholder="Vergi Numarası/TC" />
       <TextInput onChangeText={(text)=>{ this.setState({taxAdminis:text});}}  value={this.state.taxAdminis}  placeholder="Vergi Dairesi" />
       <TextInput onChangeText={(text)=>{ this.setState({adress:text});}}  value={this.state.adress}  placeholder="Adres" />
       <TextInput secureTextEntry={true} onChangeText={(text)=>{ this.setState({password:text});}}  value={this.state.password}  placeholder="Şifre" />
       <TextInput secureTextEntry={true} onChangeText={(text)=>{ this.setState({repassword:text});}}  value={this.state.repassword}  placeholder="Şifre Tekrar" />
       
       
        <Button disabled={this.state.password===this.state.repassword ? false :true } onPress={this.AddUser} title="Ekle"/>
      
     </View>
        );
        }
}


const styles = StyleSheet.create({
    mainContainer:{
      flex:1,
     
     
      
      
  
    },
    textInput:{
        borderWidth: 0.8,
        
      color:'black',
     

  
      
    },
    textInputAdet:{
        borderWidth: 0.8,
        flex:1,
      color:'black',
     

  
      
    },
   
    container: { 
      flex: 1,
      padding: 18,
      paddingTop: 35,
      backgroundColor: '#ffffff' 
    },
    HeadStyle: { 
      height: 50,
      alignContent: "center",
      backgroundColor: '#ffe0f0'
    },
    TableText: { 
      margin: 10
    }
  });
  export default AddNewUser;