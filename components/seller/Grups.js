import axios from 'axios';
import React,{useState,useEffect} from 'react';
import {View,Text, TouchableOpacity,StyleSheet,FlatList} from 'react-native';

function Grups(props){
const[data, setData]=useState([]);


useEffect(()=>{

    
    axios.post('http://hediyemola.com/defter/getGrups.php',{
        seller_id:props.route.params.seller_id,
       
    }).then((res)=>{
      //  console.log(res.data);
        setData(res.data);
    })
   

},[props])



    const list=({item})=>{
        return(
            <View style={styles.mainContainer}>
                <TouchableOpacity style={styles.userContainer} onPress={()=>{ props.navigation.navigate("Müşteri Listesi",{seller_id:props.route.params.seller_id,is_grup:true,group_id:item.id,group_name:item.name})}} key={item.id}>
                    <Text >{item.name}</Text>
                    <Text >Kişi Sayısı: {item.memberCount}</Text>
                </TouchableOpacity>
            </View>
        )
    }
   


    return(
        <View>
            <FlatList
   
   renderItem={list}
   keyExtractor={(item)=>item.id}
   data={data}/>
        </View>
    )
}
const styles = StyleSheet.create({
 
    container: { 
      flex: 1,
     
      paddingTop: 10,
      backgroundColor: '#efefef' 
    },
    mainContainer:{
      flexDirection:'row'
    },
    adduserButton:{
      borderWidth:1,
      padding:10,
      margin:10,
      borderColor:'white',
      borderRadius:25,
      width:150,
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

export default Grups;