import 'react-native-gesture-handler';
import React,{ useState,useEffect } from 'react';


import {
  SafeAreaView,
  
  StyleSheet,
  Text,
  FlatList,
 
  View,
  Image,
  TouchableOpacity,
  Button,RefreshControl,
  Modal,
  ScrollView
} from 'react-native';
import axios from 'axios';


import { TextInput } from 'react-native-gesture-handler';
export default function MySellers(props) {
    
const[data,setData]=useState([]);
const[allData,setAllData]=useState([]);
const[refreshing,setRefreshing]=useState(false);
const[loading,setLoading]=useState(true);
const[modal,setModal]=useState(false);
const[search,setSearch]=useState();





useEffect(()=>{
  let url;
  
     url='http://hediyemola.com/defter/buyyer/getMySeller.php';

  let mounted=true;
   
   const loadData= async ()=>{
     await axios.post(url,{
     
        key:'allUser',
        user_id:props.route.params.seller_id,
        group_id:props.route.params.group_id
   
    })
    .then((response)=> {  
        if(mounted){
          setLoading(false);
          setData(response.data);
          setAllData(response.data);
        }
    })
    
    .done();
  }
  loadData();
    return function cleanup() {
      mounted = false
  }
},[props])


const _onRefresh = async () => {
  setRefreshing(true);
let url;
  if(props.route.params.is_grup){
    console.log("grup");
     url='http://hediyemola.com/defter/userWithGroup.php';
  }else{
     url='http://hediyemola.com/defter/userList.php';
  }
  await axios.post(url,{
  

      key:'allUser',
      user_id:props.route.params.seller_id,
      group_id:props.route.params.group_id
    
  })
 
  .then((res)=>{  setData(res.data);  setAllData(res.data);})
  .then(() => {
    setRefreshing(false);
  });
}
const deleteUser= async (delete_user_id)=>{
  
  await axios.post('http://hediyemola.com/defter/deleteUser.php',{
  

    key:'deleteUser',
    delete_user_id:delete_user_id
  
}).then((res)=>{
  console.log(res.data);
  if(res.data=="1"){
   _onRefresh();
   setModal(null);
  }
})
}
const _modalOpen=(buyyer_id,name)=>{
   
  console.log(buyyer_id);

  const modalContainer=<Modal visible={true} transparent={true} style={{justifyContent:'center',alignItems:'center'}} >
  
  <View style={{height:140,position:'absolute',display:'flex',flexDirection:'column',justifyContent:'space-between',alignItems:'stretch', bottom:0,left:0,right:0,borderWidth:1,backgroundColor:'#264653',borderTopLeftRadius:20,borderTopRightRadius:20}}>
    <View style={{right:0,display:'flex',justifyContent:'flex-end'}}>
      <TouchableOpacity  
        style={{width:40, height:40,display:'flex',alignItems:'center',justifyContent:'flex-end'}} 
        onPress={()=>{ setModal(null); }}>
          <Text style={{textAlign:'right',fontSize:18,fontWeight:'bold',color:'white'}}>x</Text>
        </TouchableOpacity>
    </View>
    <View>
    <TouchableOpacity onPress={()=>{deleteUser(buyyer_id)}}><Text style={{fontWeight:'bold',fontSize:20,margin:5,color:'white'}}>{name} adlı kullanıcıyı sil.</Text></TouchableOpacity> 
    <TouchableOpacity onPress={()=>{
      setModal(null);
      props.navigation.navigate('Fatura Bilgileri',{seller_id:props.route.params.seller_id,buyyer_id:buyyer_id})
      
      }}>
        <Text style={{fontWeight:'bold',fontSize:20,margin:5,color:'white'}}>{name}  Fatura Bilgileri.</Text></TouchableOpacity>
    </View>
  </View>
  
  </Modal>;
  setModal(modalContainer);
 
}

 

    const renderData=({item})=>{
      
     
        return(
          <View style={styles.mainContainer} >
          
            <TouchableOpacity style={styles.userContainer} onLongPress={()=>{ _modalOpen(item.buyyer_id,item.name);}} onPress={() =>   props.navigation.navigate('Siparişlerim',{userName:item.name,seller_id:props.route.params.seller_id,buyyer_id:item.buyyer_id})}>
           
            
            <Text style={styles.nameUnvan} >{item.unvan}</Text>
            <Text style={styles.nameText} >{item.name}</Text>
            </TouchableOpacity>
          </View>
        )
      
      }
      const searchFiler=(text)=>{

        const newData=allData.filter((item)=>{
            const listItem=item.name.toLowerCase()+item.unvan.toLowerCase();
            return listItem.indexOf(text.toLowerCase())> -1 
        });
       setData(newData);
      }
     

    return(

<View style={styles.container}>
 
     {/* <Order></Order> */}
     {/* <Text style={styles.titleText}>Kayıtlı Müşteri Listesi</Text> */}
     <View style={styles.searchContainer}>
       <TextInput style={styles.searchInput}  onChangeText={(text)=>{setSearch(text); searchFiler(text)}} placeholder="Ara..." value={search} />
     </View>
     {props.route.params.group_name ? (<Text style={styles.groupName}>Grup: {props.route.params.group_name}</Text>):null}
     {loading ?(<Text>Yükleniyor...</Text>):(
       

    <FlatList
   
    renderItem={renderData}
    keyExtractor={(item)=>item.buyyer_id}
    data={data}
    refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={_onRefresh}
      />}
  />
     )}

{/* 
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
           
           </View> */}
   
 
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