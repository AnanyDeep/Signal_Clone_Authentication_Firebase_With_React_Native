import React,{useLayoutEffect, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button , Icon, Input } from 'react-native-elements'
import  {db} from "../screens/Firebase"


// import firebase from 'react-native-firebase';
// firebase.firestore().collection("products")




export default function AddChatScreen({navigation}) {

    const [input ,setInput] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            title : "Add a new Chat",
            headerBackTitle : "Chats",
        });
        
    }, [navigation]);

    const createChat = async () => {
         await db.collection('chats').add({
         chatName : input
        }).then(()=>{
            navigation.goBack();
        }).catch((error)=> alert(error));
    };

    return (
        <View style={styles.container}>
            <Input placeholder = "Chat Name" value = {input} onChangeText = {(text)=>setInput(text) } onSubmitEditing ={createChat} leftIcon = {
                <Icon name = "wechat" type = "antdesign" size = {24} color ="black" />
            } />
            <Button disabled={! input} title = "Create new Chat" onPress = {createChat} />
        </View>
    )
}

const styles = StyleSheet.create({
    container : {

    }
})
