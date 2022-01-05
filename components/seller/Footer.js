
import React from 'react';
import {Image,View,TouchableOpacity,StyleSheet} from 'react-native'


function Footer(props){

console.log(props);
    return(
        <View style={styles.buttonContainer}>
        <TouchableOpacity  style={styles.adduserButton} onPress={()=>{props.navigation.navigate("Müşteri Listesi",{seller_id:props.route.params.seller_id,refreshing:true,is_grup:false,group_name:null})}}>
           <Image 
           style={styles.tinyLogo}
           source={require('../../list.png')}/>
           </TouchableOpacity>
    
    
           
         <TouchableOpacity  style={styles.adduserButton} onPress={()=>{props.navigation.navigate("Yeni Kullanıcı")}}>
           <Image
           style={styles.tinyLogo}
           source={require('../../addUser.png')}/>
           </TouchableOpacity>
           <TouchableOpacity  style={styles.adduserButton} onPress={()=>{props.navigation.navigate("Gruplar",{seller_id:props.route.params.seller_id})}}>
           <Image
           style={styles.tinyLogo}
           source={require('../../group.png')}/>
           </TouchableOpacity>
         
           <TouchableOpacity  style={styles.adduserButton} onPress={()=>{props.navigation.navigate("Yeni Grup",{seller_id:props.route.params.seller_id})}}>
           <Image
           style={styles.tinyLogo}
           source={require('../../addGroup.png')}/>
           </TouchableOpacity>
           
           </View>

    );
}

const styles = StyleSheet.create({
 
    container: { 
      flex: 1,
     
      paddingTop: 10,
      backgroundColor: '#efefef' 
    },
    tinyLogo: {
      width: 24,
      height: 24,
    },
    mainContainer:{
      flexDirection:'row'
    },
    groupName:{
      fontSize:18,
      padding:5,
      margin:5
      
    },
    adduserButton:{
      borderWidth:1,
      padding:10,
      margin:10,
      borderColor:'white',
      borderRadius:25,
      width:50,
      height:40,
      alignItems:'center'
    },
    buttonText:{
      color:'white',
      fontSize:16,
      fontWeight:'bold'
    },
    buttonContainer:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      backgroundColor:'#264653',
      padding:0,
      margin:0
    },
    userContainer:{
     flexDirection:'column',
     alignItems:'flex-start',
     borderWidth:1,
     borderRadius:15,
     flex:1,
     justifyContent:'flex-start',
     margin:5,
     padding:8,
     backgroundColor:'#ffffff'

     
     
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
    },
    nameUnvan:{
      fontSize:20,
      fontWeight:'bold'
    },
    searchContainer:{
      padding:10,
      
    },
    searchInput:{
      padding:10,
      backgroundColor:"#f9f9f9",
      fontSize:16
    }
  });
export default Footer;

