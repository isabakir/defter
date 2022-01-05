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
  Button,
  
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
class Rows extends Component {

    constructor(props){
        super(props);
        this.state = {
          table:{},
         
    
             
         
    }
      }

    ChangeAdet=(text)=>{
        let adet=parseFloat(text);
        let newObject=this.state.table;
        newObject['adet']=adet;
        if(newObject.birimFiyat>0 && newObject.birimFiyat!=null){
          newObject['toplamFiyat']=(newObject.birimFiyat*newObject.adet).toString();
          this.props.total(parseFloat(this.state.table.toplamFiyat),this.props.uniq);
          
        }
        this.setState({table:newObject});
      }
      ChangeName=(text)=>{
        let names=text;
        let newObject=this.state.table;
        newObject['name']=names;
        this.setState({table:newObject});
      }
      ChangeSize=(text)=>{
        let names=text;
        let newObject=this.state.table;
        newObject['olcu']=names;
        this.setState({table:newObject});
      }
      Change=(text,key)=>{
        let birimFiyat=parseFloat(text);
       // console.log(this.props);
       // console.log(key);
        let newObject=this.state.table;
       
        newObject['birimFiyat']=birimFiyat;
        newObject['toplamFiyat']=(newObject.birimFiyat*newObject.adet).toString();
        this.setState({table:newObject});
     // console.log(this.state.table);
       this.props.total(parseFloat(this.state.table.toplamFiyat),this.props.uniq);
       this.props.obje(this.state.table,this.props.uniq);
      
       
       // console.log(this.state.table);
      }
      
    render(){
       let value=this.state.table.toplamFiyat;
        return(
          
     <View  style={styles.mainContainer}>
       
       <TextInput   onChangeText={this.ChangeName} style={styles.textInput}/>
       <TextInput   onChangeText={this.ChangeSize} style={styles.textInput}/>
       <TextInput   keyboardType="numeric"  style={styles.textInputAdet}  onChangeText={this.ChangeAdet}/>
       <TextInput   keyboardType="numeric" style={styles.textInputAdet} onChangeText={this.Change}/>
       
       <TextInput editable={false} style={styles.textInput} placeholder="Toplam" value={value}/>
      
     </View>
    
    
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
    textInput:{
        borderWidth: 0.8,
        flex:1,
      color:'black',
     

  
      
    },
    textInputAdet:{
        borderWidth: 0.8,
        flex:.8,
      color:'black',
     

  
      
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
  export default Rows;