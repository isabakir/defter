import React,{ useState,useEffect } from 'react';

import {
 
    StyleSheet,
    View,
    Text,
   
   
  } from 'react-native';
  import axios from 'axios';



  function Fatura(props){
    
    const [fatura,setFatura]=useState([]);
    useEffect(()=>{

        axios.post("http://hediyemola.com/defter/faturaBilgileri.php",{
            key:"faturaBilgileri",
            user_id:props.route.params.buyyer_id
        }).then((res)=>{
            //console.log(res.data);
            setFatura(res.data);
        })

    },[])

    return(
        <View style={styles.container}>
                <View style={styles.subContainer}>
                    <Text style={styles.title}>Ad: </Text>
                    <Text style={styles.text}>{fatura.ad}</Text>
                </View>
                <View style={styles.subContainer}>
                    <Text style={styles.title}>Telefon: </Text>
                    <Text style={styles.text}>{fatura.telefon}</Text>
                </View>
                <View style={styles.subContainer}>
                    <Text style={styles.title}>İşyeri Ünvanı: </Text>
                    <Text style={styles.text}>{fatura.unvan}</Text>
                </View>
                <View style={styles.subContainer}>
                    <Text style={styles.title}>Adres: </Text>
                    <Text style={styles.text}>{fatura.adres}</Text>
                </View>
                <View style={styles.subContainer}>
                    <Text style={styles.title}>Vergi No: </Text>
                    <Text style={styles.text}>{fatura.vergiNo}</Text>
                </View>
                <View style={styles.subContainer}>
                    <Text style={styles.title}>Vergi Dairesi: </Text>
                    <Text style={styles.text}>{fatura.vergiDairesi}</Text>
                </View>
        </View>
    )

  }
  const styles = StyleSheet.create({
 
    container: { 
      flex: 1,
      padding: 18,
      paddingTop: 35,
      backgroundColor: '#ffffff' 
    },
    subContainer:{
        
        marginBottom:20,
        padding:10,
       
        
    },
    title:{
        fontWeight:'bold',
        fontSize:18,
        height:25
    },
    text:{
        fontSize:14,
        borderBottomWidth:1,
        
        display:'flex',
        flexDirection:'column',
        flexWrap:'wrap'
        
    }
  });

  export default Fatura;