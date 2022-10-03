import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { auth } from '../firebase'
import { StatusBar } from 'expo-status-bar'

const Splash = ({navigation}) => {

useEffect(() => {
 
const unsubscribe=auth.onAuthStateChanged((authUser)=>{
    if(authUser){
        navigation.replace('BottomStack')
    }
    else{
        navigation.replace('Login')
    }
})

return()=>{
    unsubscribe();
}
}, [])


  return (
    <>
    <StatusBar style='light'/>
    <View>
     
    </View>
    </>
  )

}

export default Splash

const styles = StyleSheet.create({
   
})