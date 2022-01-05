import 'react-native-gesture-handler';
import React,{useState,useEffect} from 'react';
import {Component, Node} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
  Image,
  
} from 'react-native';
import {Picker} from '@react-native-picker/picker';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Rows from '../seller/Rows';
import axios from 'axios';

export default function MyOrders(props) {
    const[data,setData]=useState([]);
    const[allTotal,setAllTotal]=useState([]);
    const[allTahsilat,setAllTahsilat]=useState([]);
    const[reRender,setRerender]=useState(0);
    const[gt,setGt]=useState([]);
    const[year]=useState(2020);
    const[openSelect,setOpenSelect]=useState(false);
    const[selectYear,setSelectYear]=useState(new Date().getFullYear());
    const[pickers,setPickers]=useState([]);
    const[t,setT]=useState(0);
    
    
     console.log(props.route.params);
  
  useEffect(()=>{
    
    const loadData=async ()=>{ await axios.post('http://hediyemola.com/defter/allOrder.php',{
      
     
        key:'allOrders',
        user_id:"1",
        buyyer_id:props.route.params.buyyer_id,
        year:selectYear
    
    })
   
    .then((res)=>{
   
  console.log(res.data);
   
      setData(res.data);
    
    })
    .done();
    }
  loadData();
    
  },[reRender,props])
  const changeRender=()=>{
    setRerender(1);
  }
  let tahsilats=0;
  let toto=0;
  
  const changeYear=(i)=>{
    setSelectYear(i);
    
  
    setOpenSelect(false);
    console.log(openSelect)
  }
  
  
  useState(()=>{
    let nowYear=new Date().getFullYear();
  if(nowYear>=year ){
  
    for(let i = year;i<=nowYear;i++){
     
     pickers.push(<Text key={i} style={{width:"45%"}}><Button    uppercase={false}   title={i.toString()+" SİPARİŞLERİ"} onPress={()=>{changeYear(i); }}/> </Text>)
    
    }
  
   
  }
  },[])
  const renderData=({item,index})=>{
    let total=0
   
    let tahsilat=0;
    
    data.forEach((item)=>{
       total+=parseFloat(item.total);
       tahsilat=parseFloat(item.tahsilat);
       setAllTahsilat(tahsilat);
      setAllTotal(total);
    })
    let viewDate=item.date.split(" ")[0];
    let newView=viewDate.split("-");
    let views=newView[2]+"-"+newView[1];
    
    setGt(toto);
    toto+=parseFloat(item.allTotal);
    tahsilats+=parseFloat(item.tahsilat);
    data[index]['oldKalan']=parseFloat(toto-tahsilats);
    if(index>0){
      console.log(data[index-1].oldKalan);
    }
    setT(toto-tahsilats);
  
    let star = item.update_date!==0 ? <Image style={{width:16,height:16,marginBottom:15}} source={require("../../star.png")}/>:"";
    return(
     
     
      <View style={styles.userContainer}>
            
        <TouchableOpacity style={styles.touchAble}  onPress={() =>{  props.navigation.navigate('Eski Siparişim',{buyyer_id:props.route.params.buyyer_id,userName:props.route.params.name,seller_id:props.route.params.seller_id,group_order_id:item.order_group_id,update:item.update_date,changeRender,toplamBakiye:t})}}>
       
        <View style={{flexDirection:'row'}}>
            <Text style={styles.borderLine }> {views}{star} </Text>
            
            <Text style={styles.borderLine}> {item.allTotal} </Text>
            <Text style={styles.borderLine}> {index == 0 ? 0 :(parseFloat(item.allTotal)+parseFloat(data[index-1].oldKalan))} </Text>
            <Text style={styles.borderLine}> {item.tahsilat} </Text>
           
            <Text style={styles.borderLine}> {(toto-tahsilats).toFixed(2)} </Text>
         </View>
        </TouchableOpacity>
      </View>
    )
    
  }
  
      
          return(
              <SafeAreaView style={styles.container}>
  
       
       <Text style={styles.mainTitle}> {selectYear} {props.route.params.userName}   Siparişler</Text>
       <View style={{borderBottomWidth:1}}>
       <Text style={{fontSize:16,fontWeight:'bold',borderColor:'black',borderWidth:1,width:'15%',padding:5}}>Yıl:
          <TouchableOpacity  onPress={()=>{setOpenSelect(!openSelect)}}><Text style={{fontSize:16}}>{selectYear} > </Text></TouchableOpacity></Text>
       <View style={{ paddingVertical: 8,display:'flex',justifyContent:'space-between',alignItems:'center',flexDirection:'row'}}>
          {openSelect===true ?  pickers.map(item=>{return item;}): null}
          </View>
           
       </View>
       <View style={{flexDirection:'row'}}>
            
            <Text style={styles.borderLine}> Tarih </Text>
            
            <Text style={styles.borderLine}> Toplam </Text>
            <Text style={styles.borderLine}> Kalan </Text>
            <Text style={styles.borderLine}> Tahsil Edilen </Text>
           
            
            <Text style={styles.borderLine}> Genel  Toplam </Text>
        </View>
        <FlatList
        renderItem={renderData}
        keyExtractor={(item)=>item.id}
        data={data}
      />
  
    
      <Text style={{textAlign:'right'}}>{ t.toFixed(2)} TL Toplam Kalan</Text>
      
      </SafeAreaView>
          );
      
  }
  
  const styles = StyleSheet.create({
   
    container: { 
      flex: 1,
      padding: 18,
      paddingTop: 35,
      backgroundColor: '#ffffff' 
    },
    borderLine:{
      borderBottomWidth:1,
      flex:4
    },
    borderLineColor:{
      borderBottomWidth:1,
      flex:4,
      color:'red'
    },
    touchAble:{
      flexDirection:'row',
    
    },
    touchAbleHidden:{
      
    },
    userContainer:{
     flexDirection:'row',
     alignItems:'center',
     flex:1,
  
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
    mainTitle:{
      fontSize:24,
      fontWeight:'bold',
      borderBottomWidth:1,
      marginBottom:12
    }
  });