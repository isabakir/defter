import 'react-native-gesture-handler';
import React from 'react';
import {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput, 
  Button,
  Alert
} from 'react-native';

import AsyncStore from '@react-native-async-storage/async-storage';
import axios from 'axios';
class LoginArea extends Component{
 
 constructor(props) {
   
    super(props);
    this.state = {
      username: '',
      password:'',
      token:'',
      seller_id:'',
      alert:false,
      login:false,
      type:this.props.route.params.type
    };

   
}

 
 
  changeName=(text)=>{
    this.setState({username:text});
 }
  changeTelefon=(text)=>{
    this.setState({password:text});
 }


  login= async ()=>{
     //console.log("login");
     try{
      await axios.post('http://hediyemola.com/defter/login.php',{
      
        
        key:'Login',
        type:this.props.route.params.type,
        username:this.state.username,
        password:this.state.password
     
    })
   
    .then((res)=>{ 
     
        if(res.data.seller_id!=null){
          
          this.setState({token:res.data.token});
          this.setState({seller_id:res.data.seller_id});
          this.setState({alert:false});
          this.setState({type:this.props.route.params.type});
          this.storeData();
         
          this.setState({login:true});
          if(this.props.route.params.type=='musteri'){
          
            this.props.navigation.navigate('Satıcılarım',{token:res.data.token,seller_id:res.data.seller_id,refreshing:true});
          }else{
            this.props.navigation.navigate('Müşteri Listesi',{token:res.data.token,seller_id:res.data.seller_id,refreshing:true});
          }
           
        
          

        }else{
          this.setState({alert:true});
        }
       
       // 
        
    });
     }catch(e){
      Alert(e.message);
     }
   
    

    

}

   



storeData = async () => {
    
    const token = this.state.token;
    const seller_id=this.state.seller_id;
    const username=this.state.username;
    const pass=this.state.password;
    const userTyper=this.state.type;
  
  
  
    try {
        await AsyncStore.setItem("seller_id",JSON.stringify(seller_id));
        await AsyncStore.setItem('token', JSON.stringify(token));
        await AsyncStore.setItem('username', JSON.stringify(username));
        await AsyncStore.setItem('password', JSON.stringify(pass));
        await AsyncStore.setItem("userType",JSON.stringify(userTyper));
    } catch (e) {
       Alert(e.message);
    }
}
readStore = async () => {
    try {
        const value = await AsyncStore.getItem('token');
        const valueSeller = await AsyncStore.getItem('seller_id');
        const username = await AsyncStore.getItem('username');
        const password = await AsyncStore.getItem('password');
        const type=await AsyncStore.getItem('userType');
        const parsedValue = JSON.parse(value);
        const parsedSeller = JSON.parse(valueSeller);
        const parsedUser = JSON.parse(username);
        const parsedPass = JSON.parse(password);
        const typeParser = JSON.parse(type);
        
        
        if (parsedUser != "" && parsedPass!="") {
          console.log(parsedValue);

          this.setState({token:parsedValue});
          this.setState({seller_id:valueSeller});
          this.setState({username:parsedUser,password:parsedPass});
          console.log(type+ " parser");
          if(typeParser==='satici'){
            this.props.navigation.navigate('Müşteri Listesi',{token:parsedValue,seller_id:parsedSeller});
            this.login();
          }
          if(typeParser==='musteri'){
          
            this.props.navigation.navigate('Satıcılarım',{token:parsedValue,seller_id:parsedSeller});
            this.login();
          }
          
           
         //   console.log("readstore çalıştı içerde");
        }else{
          
        }
    } catch (e) {
       Alert(e.message);
    }
  }
 
  componentDidMount() {
    this.readStore();
  }
render(){
 
 
  
        return(
           
     <View  style={styles.mainContainer}>
       
       <TextInput  onChangeText={(text)=>{ this.setState({username:text});}}  value={this.state.username}  placeholder="Kullanıcı Adı"/>
       <TextInput secureTextEntry={true}   onChangeText={(text)=>{ this.setState({password:text});}}     placeholder="Şifre" />
       {this.state.login == true ? <Text>Giriş yapıldı </Text> : null}
       {this.state.alert==true ? <Text style={{color:'red'}}>Kullanıcı adı veya Şifre Hatalı</Text> : null}
       
       
        <Button onPress={this.login} title="Giriş"/> 

   
      
     </View>
        )
      
      
}
}


const styles = StyleSheet.create({
    mainContainer:{
      flex:1,
     
     
      
      
  
    },
    loading:{
      fontSize:24,
      color:'blue',
      flex:1,
      display:'flex',
      justifyContent:'center',
      alignItems:'center'
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
  export default LoginArea;