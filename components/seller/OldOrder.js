import 'react-native-gesture-handler';
import React from 'react';
import {Component, Node} from 'react';
import {
  SafeAreaView,
 
  StyleSheet,
  Text,
 
  View,
  TextInput, 
 
  Button
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Rows from './Rows';

class OldOrder extends Component{

    constructor(props){
   
        super(props);
        
        this.state = {
         toplam:0.00,
          views:{},
          data:[],
          order:{},
          rows:{},
          newRow:[],
          tahsilat:0,
    
             
         
    }
  
    fetch('http://hediyemola.com/defter/getOrder.php',{
        method:'POST',
        headers:{
          'accept':'application/json',
          'Content-Type': 'application/json',

        },
        body:JSON.stringify({
          key:'oldOrders',
          group_order_id:this.props.route.params.group_order_id
        })
      })
      .then((response)=>response.json())
      .then((res)=>{
          
            if(!res.tahsilat){
                this.setState({tahsilat:0});
            }else{
                this.setState({tahsilat:res.tahsilat});
            }
            this.state.views=res.order;
            let totals=0;
            
              this.setState({toplam:res.total});
              
              this.setState({rows:res.order});
          
        this.setState({views: this.state.views})
            
        let z={};
        z['1']=res.total;

       this.setState({order:z});
      })
      

       
      .catch(e => console.log(e))
      .done();
    
      }
      
    obje=(obje,uniq)=>{
      let newO=this.state.rows;
      obje.order_group_id=uniq;
      newO[uniq]=obje;
    
      this.setState({rows:newO});
     
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
     let olds= this.state.newRow;
   
     olds.push(   <Rows   total={this.total} obje={this.obje} uniq={this.state.newRow.length+2} key={this.state.newRow.length+2}/>);
     
     
     
    this.setState({newRow:olds});
    }

    changeTahsilat=(text)=>{
      let tahsilat=parseFloat(text);
      this.setState({tahsilat});
    }
  

    changeAdet=(text,key)=>{
        // console.log(key);
         this.state.views[key].piece=text;
      
        this.state.views[key].total=(this.state.views[key].unit_price*text).toString();
        let obj=this.state.views;
        this.setState({views:obj});
        this.topla();
    }
    Change=(text,key)=>{
      // console.log(key);
       this.state.views[key].unit_price=text;
     
      this.state.views[key].total=(this.state.views[key].piece*text).toString();
      let obj=this.state.views;
      this.setState({views:obj});
      this.topla();
  }
    

    addDatabase=()=>{
      console.log(this.props.route.params.buyyer_id);
      let order_group_id=Math.floor(Math.random() * 100000);
        fetch('http://hediyemola.com/defter/updateOrder.php',{
          method:'POST',
          headers:{
            'accept':'application/json',
            'Content-Type': 'application/json',

          },
          body:JSON.stringify({
            key:'updateOrder',
            user_id:"1",
            buyyer_id:this.props.route.params.buyyer_id,
            data:this.state.rows,
            tahsilat:this.state.tahsilat,
            order_group_id:this.props.route.params.group_order_id,
            total:this.state.toplam
          })
        })
        .then((response)=>response.json())
        .then((res)=>{ 
          this.props.route.params.changeRender();
            this.props.navigation.navigate('Tüm Siparişler',{buyyer_id:this.props.route.params.buyyer_id,userName:this.props.route.params.name,seller_id:this.props.route.params.seller_id,reRender:1})
      
      
      })
        .catch(e => console.log(e))
        .done();
        
    }
    random=()=>{
return Math.floor(Math.random() * 11000);
    }
    topla=()=>{
      const newTotals=Object.entries(this.state.views).map(([key,value])=>{
      
        let total=0
          if(value.pro_name){
            total+=parseFloat(value.total);
          }
          return total;
    })
    
    this.setState({toplam:newTotals.toString()})
  }
   
    render(){
    
  

     //console.log(this.state.views);
       
            const orderList=Object.entries(this.state.views).map(([key,value])=>{
               
                  if(value.pro_name){

                 
                    return(
                        <View  style={styles.mainContainer} key={key}>
                        <TextInput   onChangeText={this.ChangeName}  value={value.pro_name}  style={styles.textInput}/>
                        <TextInput   onChangeText={this.ChangeSize}  value={value.pro_size}  style={styles.textInput}/>
                        <TextInput   keyboardType="numeric"  style={styles.textInputAdet}  value={value.piece}  onChangeText={(text,key)=>{ this.changeAdet(text,value.id)}}/>
                        <TextInput   keyboardType="numeric" style={styles.textInputAdet}  value={value.unit_price} onChangeText={(text,key)=>{ this.Change(text,value.id) }}/>
                        
                        <TextInput editable={false} style={styles.textInput} placeholder="Toplam" value={value.total} />
                       
                      </View>
                     )
                    }
                }
                
                
                )

                const  newRows=this.state.newRow.map((value)=>{
                        if(value){
                          return(
                            value
                        )
                        }
                   
                });
            
       let de="";
              if(this.props.route.params.update!=0){ 
               de= <Text>{this.props.route.params.update} Tarihinde Güncellendi</Text>
              }else{
                de=null;
              }
                
        return(
      
            <SafeAreaView style={styles.container}>
            
              <KeyboardAwareScrollView style={styles.container,{position:'absolute',left:5,top:10,bottom:10,right:5}}>
                <View>
                <Text style={styles.title}>{this.props.route.params.userName} Sipariş</Text>
                {
                    de
                }
               
                </View>
    
      
     <View style={styles.mainContainer}>
       <Text style={styles.textInput}>Ürün Adı</Text>
       <Text style={styles.textInput}>Ölçü</Text>
       <Text style={styles.textInputAdet}>Adet</Text>
       <Text style={styles.textInputAdet}>Birim Fiyat</Text>
       <Text style={styles.textInput}>Toplam Fiyat</Text>
       
     </View>

 
     
     {
     
     /*
     this.state.views.map((value,item) => {
         console.log(value);
         return(
            <View  style={styles.mainContainer} key={value['order'].id}>
            <TextInput   onChangeText={this.ChangeName}  value={value[item].pro_name}  style={styles.textInput}/>
            <TextInput   keyboardType="numeric"  style={styles.textInputAdet}  value={value[item].piece}  onChangeText={this.ChangeAdet}/>
            <TextInput   keyboardType="numeric" style={styles.textInputAdet}  value={value[item].unit_price}onChangeText={this.Change}/>
            
            <TextInput editable={false} style={styles.textInput} placeholder="Toplam" value={value[item].total} />
           
          </View>
         )
        })
        
        */
        }
        {orderList}
        {newRows}
    
      <Button onPress={this.addRow}  title="Ekle"></Button> 
     
     <Text style={styles.toplamText} >Toplam:{this.state.toplam} TL</Text>
     
     <TextInput keyboardType="numeric"  onChangeText={this.changeTahsilat} value={this.state.tahsilat.toString()} placeholder="Tahsil Edilen Tutar" style={{ borderWidth: 0.8,marginBottom:4}}/>
     <Button onPress={this.addDatabase} style={{margin:50}} title="Kaydet"></Button>
     </KeyboardAwareScrollView>
    </SafeAreaView>
  


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
     flex:1,
      padding: 18,
      paddingTop: 35,
      backgroundColor: '#ffffff',
    
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
export default OldOrder;