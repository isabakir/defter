
import React, { useState } from 'react';

import {

  Text,
  View,
  TextInput, 
  Button,
  StyleSheet,
 Alert
} from 'react-native';
import axios from 'axios';
export default function NewLogin(props) {
    const [state, setState] = useState({username:"",password:"",login:false,alert:false});

   
       const login= async ()=>{
           Alert("Giriş Yap tıklandı.");
            //console.log("login");
            try{
                Alert("istek yapıldı");
                console.log(state);
             await axios.post('http://hediyemola.com/defter/login.php',{
             
               
               key:'Login',
               type:props.route.params.type,
               username:state.username,
               password:state.password
            
           })
          
           .then((res)=>{ 
            Alert("Cevap Geldi");
               if(res.data.seller_id!=null){
                 
                 setState({...state,token:res.data.token});
                 setState({...state,seller_id:res.data.seller_id});
                 setState({...state,alert:false});
                 setState({...state,type:props.route.params.type});
                
                
                 setState({...state,login:true});
                 if(props.route.params.type=='musteri'){
                 
                   props.navigation.navigate('Satıcılarım',{token:res.data.token,seller_id:res.data.seller_id,refreshing:true});
                 }else{
                   props.navigation.navigate('Müşteri Listesi',{token:res.data.token,seller_id:res.data.seller_id,refreshing:true});
                 }
                  
               
                 
       
               }else{
                 setState({...state,alert:true});
               }
              
              // 
               
           });
            }catch(e){
            console.log(e.message);
            }
          
           
       
           
       
       }
      
  

    return(
           
        <View  style={styles.mainContainer}>
          
          <TextInput  onChangeText={(text)=>{ setState({...state,username:text}); }}  value={state.username}  placeholder="Kullanıcı Adı"/>
          <TextInput secureTextEntry={true}   onChangeText={(text)=>{ setState({...state,password:text});}}     placeholder="Şifre" />
          {state.login == true ? <Text>Giriş yapıldı </Text> : null}
          {state.alert==true ? <Text style={{color:'red'}}>Kullanıcı adı veya Şifre Hatalı</Text> : null}
          
          
           <Button onPress={login} title="Giriş"/> 
   
      
         
        </View>
           )
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
