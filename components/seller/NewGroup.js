import  React,{useState,useEffect} from 'react';
import axios from 'axios';
import {View,StyleSheet,Text,TextInput,TouchableOpacity, Button,SafeAreaView,ScrollView} from 'react-native';
import { color } from 'react-native-reanimated';





function NewGroup(props){

    const[grup,setGrup]=useState("");
    const[selected,setSelected]=useState([]);
    const[data,setData]=useState([]);
    const[count,setCount]=useState(0);


    useEffect(()=>{
   
        console.log("his");
         
        
           axios.post('http://hediyemola.com/defter/userList.php',{
           
              key:'allUser',
              user_id:props.route.params.seller_id
         
          })
          .then((response)=> {  
              
               
                setData(response.data);
               
          
          })
          
          .done();
      
        
      },[count])
    
      const color=(id)=>{
        if(selected.indexOf(id)!==-1){
            return styles.selected
        }else{
            return styles.unselected
        }
      }
      const changeSelected=(id)=>{
          setCount(count+1);
        if(selected.indexOf(id)!==-1){selected.splice(selected.indexOf(id),1); }else{
            selected.push(id);
            setSelected(selected);
            
        }
        console.log(selected);
        users(data);
      }
      const users= (data)=>{
          
        const listItem= data.map((item)=>{
            return(
             <TouchableOpacity style={[color(item.buyyer_id),styles.selectButton]} key={item.buyyer_id} onPress={()=>{ changeSelected(item.buyyer_id); }}>
                 <Text>{item.unvan}</Text>
                 
             </TouchableOpacity>
            )
    });
    return listItem;
}

const createGroup=()=>{
    axios.post('http://hediyemola.com/defter/addNewGroup.php',{
        key:'addGroup',
        seller_id:props.route.params.seller_id,
        grupName:grup,
        grupList:selected
    }).then((res)=>{
        console.log(res.data);
        if(res.data.id>0){
            props.navigation.navigate("Müşteri Listesi",{selled_id:props.route.params.seller_id, group_id:res.data.id,group_name:res.data.name,is_grup:true})
        }
    })
}
    return(

       <View style={styles.container}>
          <ScrollView>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Grup Adı:</Text>
                <TextInput placeholder="Grup Adı" style={styles.inputs} onChangeText={(text)=>{setGrup(text)}}/>

            </View>
            <View style={styles.inputContainer}>
                <Text>Ekli Kişi:{selected.length}</Text>
            </View>
          {
             users(data)
          }
          </ScrollView>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.adduserButton} onPress={createGroup}>
               <Text style={styles.buttonText}>Kaydet</Text>
            </TouchableOpacity>
            </View>
       </View>
    );

}
const styles=StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column'
    },
    label:{
        fontSize:16,
    },
    selected:{
        borderWidth:1,
        borderColor:'green'
    },
    unselected:{
        borderWidth:1,
        borderColor:'red',
    },
    inputContainer:{
        
        padding:5,
        marginBottom:5,
        marginTop:5,
        
    },
    inputs:{
        padding:5,
        fontSize:14,
        borderWidth:1,

    },
    selectButton:{
        padding:5,
        marginBottom:5,
        fontSize:16
    },
    buttonContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#264653',
        padding:0,
        margin:0
      },
      buttonText:{
        color:'white',
        fontSize:16,
        fontWeight:'bold'
      },
      adduserButton:{
        borderWidth:1,
        padding:10,
        margin:10,
        borderColor:'white',
        borderRadius:25,
        width:150,
        alignItems:'center'
      }
});
export default NewGroup;
