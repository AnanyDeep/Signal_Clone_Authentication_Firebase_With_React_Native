import React from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Button , Input ,Image } from "react-native-elements"
import { StatusBar } from 'expo-status-bar'
import { useState, useEffect } from 'react';
import { auth } from './Firebase';
import firebase from 'firebase' 


export default function LoginScreen({ navigation }) {


     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");

     useEffect(() => {
         const unSubscribe = firebase.auth().onAuthStateChanged((authUser) => {
             if (authUser){
                 navigation.replace("Home");
             }
         });
         return unSubscribe;
     }, []);

     const signIn = ()=> {
        const auth =  firebase.auth()
        .signInWithEmailAndPassword(email , password)
        .catch((error)=>alert(error));
     };

     const signUp = () => {
         navigation.navigate("Register")
     }


    return (
    // <ScrollView>
      <KeyboardAvoidingView behavior = "padding" style={styles.container}>
        <StatusBar style="light"/>
        <Image style={styles.logo} source={require("../assets/signal.png")}/>
        <View style={styles.inputContainer}>
            <Input style={styles.imputContainer} placeholder = "Email" autoFocus type="email" value={email} onChangeText={(text)=>setEmail(text)} />
            <Input style={styles.imputContainer} placeholder = "Password" secureTextEntry type="password" value ={password} onChangeText ={(text)=>setPassword(text)} onSubmitEditing = {signIn} />

        </View>
        <View style={styles.btnContainer}>
            <Button containerStyle={styles.button} onPress = {signIn} title ="Login" />
            <Button containerStyle={styles.button} onPress = {signUp} type = "outline" title ="Register" />
        </View>
        <View style={{height : 100}} />

      </KeyboardAvoidingView>
    //   </ScrollView> 
    ); 
  }
  
const styles = StyleSheet.create({
    container:{
        flex : 1,
        alignItems : "center",
        justifyContent : "center",
        backgroundColor : "#FFF",
        padding : 10,
    },
    logo :{
        height : 200,
        width : 200,
        borderRadius : 20,
        marginBottom: 10
    },
    inputContainer:{
        width : 300,
        marginTop : 10,

    },
    button:{
        marginBottom: 10,
        // marginTop : 30

    },
    btnContainer:{
        width: 300,
        // marginTop: 20
    }
})
