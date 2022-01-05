import 'react-native-gesture-handler';
import React from 'react';
import {Component, Node} from 'react';
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
  FlatList,
KeyboardAvoidingView,
  Button
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Rows from './Rows';

class Order extends Component{

    constructor(props){
   
        super(props);
        
        this.state = {
         toplam:0.00,
          views:[],
          data:[],
          order:{},
          rows:{},
          tahsilat:0,
    
             
         
    }
    
      }
      
    obje=(obje,uniq)=>{
      let newO=this.state.rows;
      obje.order_group_id=uniq;
      newO[uniq]=obje;
    
      this.setState({rows:newO});
      console.log(this.state.rows);
    }
    
      total=(text,uniq)=>{
        let plus=parseFloat(text);
        let newArr=this.state.order;
        
        newArr[uniq]=plus;
       
      
       this.setState({order:newArr})
       let totals=0;
      for(const pro in newArr){
        totals+=newArr[pro];
       // console.log(totals);
      }
      this.setState({toplam:totals});
       
      }
    
    addRow=(key)=>{
      
    key=Math.floor(Math.random() * 100);
     let olds= this.state.views;
    let toplam=this.state.toplam;
     olds.push(
      <Rows   total={this.total} obje={this.obje} uniq={this.state.views.length+1} key={this.state.views.length+1}/>)
     
     
      
    this.setState({views:olds});
    }

    changeTahsilat=(text)=>{
      let tahsilat=parseFloat(text);
      this.setState({tahsilat});
    }
    addDatabase=()=>{
      console.log(this.props.route.params.buyyer_id);
      console.log(this.state.rows);
      console.log("rows");
      let order_group_id=Math.floor(Math.random() * 100000);
        fetch('http://hediyemola.com/defter/addOrder.php',{
          method:'POST',
          headers:{
            'accept':'application/json',
            'Content-Type': 'application/json',

          },
          body:JSON.stringify({
            key:'addOrder',
            user_id:"1",
            buyyer_id:this.props.route.params.buyyer_id,
            data:this.state.rows,
            tahsilat:this.state.tahsilat,
            order_group_id:order_group_id
          })
        })
        .then((response)=>response.json())
        .then((res)=>{console.log(res);
           this.props.route.params.changeRender();
           this.props.navigation.navigate('Tüm Siparişler',{buyyer_id:this.props.route.params.buyyer_id,userName:this.props.route.params.name,seller_id:this.props.route.params.seller_id})})
        .catch(e => console.log(e))
        .done();
        
    }
    random=()=>{
return Math.floor(Math.random() * 11000);
    }

   
    render(){
        return(
          <KeyboardAwareScrollView style={{flex:1}}   >
            <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{this.props.route.params.userName} Sipariş</Text>
      
     <View style={styles.mainContainer}>
       <Text style={styles.textInput}>Ürün Adı</Text>
       <Text style={styles.textInput}>Ölçü</Text>
       <Text style={styles.textInputAdet}>Adet</Text>
       <Text style={styles.textInputAdet}>Birim Fiyat</Text>
       <Text style={styles.textInput}>Toplam Fiyat</Text>
       
     </View>

  
     <Rows total={this.total} obje={this.obje} uniq={0}></Rows>
     {this.state.views.map((value) => {
          return value
        })}
    
     <Button onPress={this.addRow} title="Ekle"></Button>
     
     <Text style={styles.toplamText} >Toplam:{this.state.toplam} TL</Text>
     <Text style={styles.toplamText} >Eski Bakiye:{this.props.route.params.toplamBakiye} TL</Text>
     <Text style={styles.toplamText} >Genel Toplam:{(this.props.route.params.toplamBakiye+this.state.toplam)-this.state.tahsilat} TL</Text>
     
     <TextInput keyboardType="numeric"  onChangeText={this.changeTahsilat} placeholder="Tahsil Edilen Tutar" style={{ borderWidth: 0.8,marginBottom:4}}/>
     <Button onPress={this.addDatabase} style={{margin:50}} title="Kaydet"></Button>
    </SafeAreaView>
    </KeyboardAwareScrollView>
   


        )
    }
}

const styles = StyleSheet.create({
    mainContainer:{
      flex:12,
      flexDirection:'row',
      justifyContent:'space-evenly',
      maxHeight:40,
      
  
    },
    title:{
      fontSize:34,
      fontWeight:'bold',
      textAlign:'center',
      padding:12
    },
    toplamText:{
      textAlign:'right',
      flex:1,
      fontSize:22
    },  
    textInput:{
      borderWidth: 1,
      flex:3,
      textAlign:'center',
      padding:4
  
      
    },
    textInputAdet:{
      borderWidth: 1,
      flex:2.5,
      textAlign:'center',
      padding:4
  
      
    },
    onlyText:{
  
    
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
export default Order;