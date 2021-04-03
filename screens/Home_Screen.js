import React, {useLayoutEffect, useState , useEffect} from 'react'
import { StyleSheet, Text, View,ScrollView ,TouchableOpacity} from 'react-native'
import { Avatar } from 'react-native-elements'
import CustomListItem from './CustomListItem'
import  {auth ,db} from "../screens/Firebase"
import firebase from 'firebase' 
import { StatusBar } from 'react-native'
import { AntDesign ,SimpleLineIcons } from "@expo/vector-icons"

export default function Home_Screen({navigation}) {

    const [chats , setChats] = useState([]);

    const signOutUser = ()=> {
        const auth =  firebase.auth().signOut().then(() =>{
            navigation.replace("Login");
        });
    };


    useEffect(() => {
        const unsubscribe = db.collection('chats').onSnapshot(snapshot => (
            setChats(snapshot.docs.map(doc => ({
                id : doc.id,
                data : doc.data()
            })))
        )) 

        return unsubscribe
    }, [navigation])


    useLayoutEffect(() => {
        navigation.setOptions({
            title : "Signal",
            headerStyle : {backgroundColor : "#2C6BED"},
            headerTitleStyle : {color : "#000"},
            headerTintColor : {color : "#000"},
            headerLeft : ()=> (
                <View style={{marginLeft : 20}} >
                    <TouchableOpacity onPress = {signOutUser} activeOpacity = {0.5} >
                    <Avatar backgroundColor = "red" rounded source ={{ uri : auth?.currentUser?. photoURL || "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png" }} />
                    </TouchableOpacity>
                </View>

            ),
            headerRight : () => (
                <View style= {{flexDirection : "row", justifyContent : "space-between" , width : 80 , marginRight : 20}} >
                    <TouchableOpacity activeOpacity = {0.5} >
                        <AntDesign name = "camerao" size ={24} color = "black" />
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity = {0.5} onPress ={()=>{navigation.navigate("AddChat")}} >
                        <AntDesign name = "plus" size ={24} color = "black" />
                    </TouchableOpacity>
                </View>
            )



        })
        
    }, [navigation])

    const enterChat = (id , chatName) => {
        navigation.navigate("Chat",{
            id,
            chatName,
        });
    };

    return (
        <ScrollView style={styles.container}>
            <StatusBar style = "light" />
            {chats.map(({id , data : {chatName}})=>(
            <CustomListItem key={id} id={id} chatName ={chatName} enterChat ={enterChat}/>
                ))}
           
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    collection:{
        height:"100%",
    }
})
