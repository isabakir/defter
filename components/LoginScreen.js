import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AsyncStore from '@react-native-async-storage/async-storage';
export default function LoginScreen(props) {

    
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.routerButton} onPress={()=>{props.navigation.navigate('Giriş',{type:'musteri'})}}>
                <Text style={styles.buttonTex}>Müşteri Girişi</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.routerButton} onPress={()=>{props.navigation.navigate('Giriş',{type:'satici'})}}>
                <Text style={styles.buttonTex}>Satıcı Girişi</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#264653',
        paddingTop:10,
    },
    routerButton:{
        borderWidth:1,
        borderColor:'white',
        padding:5,
        borderRadius:25,
        width:'50%',
        margin:5,
        justifyContent:'center',
        alignItems:'center'
    },
    buttonTex:{
        color:'white',
        fontSize:18
    }
})
