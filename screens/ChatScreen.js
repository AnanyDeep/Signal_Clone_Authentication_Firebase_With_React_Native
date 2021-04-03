import React ,{useLayoutEffect, useState}from 'react'
import { StyleSheet, Text, View,TouchableOpacity,KeyboardAvoidingView,Platform, StatusBar,SafeAreaView , TouchableWithoutFeedback} from 'react-native'
import { Avatar } from 'react-native-elements'
import { AntDesign ,SimpleLineIcons } from "@expo/vector-icons"
import { ScrollView } from 'react-native'
import { TextInput } from 'react-native'
import { Keyboard } from 'react-native'
import  {auth ,db} from "../screens/Firebase"
import firebase from 'firebase'

// import LoginScreen from './screens/LoginScreen';
// import RegisterScreen from './screens/RegisterScreen';
// import Home_Screen from './screens/Home_Screen';
// import AddChatScreen from './screens/AddChatScreen';



export default function ChatScreen({navigation , route}) {

    const [input , setInput] = useState("");
    const [messages , setMessages] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title : "Chat",
            hederTitleAlign : "left",
            headerTitle : ()=>(
                <View style= {{flexDirection : "row" , alignItems : "center"}}>
                    <Avatar rounded  source ={{uri: "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png"}} />
                    <Text>
                        {route.params.chatName}
                    </Text>
                </View>
            ),
            headerLeft :  () => (
                <TouchableOpacity onPress ={()=>navigation.goBack()} >
                    <AntDesign name="arrowleft" size ={24} color ="#FFF" />
                </TouchableOpacity>
            ),

            headerRight : () => (
                <View style= {{flexDirection : "row", justifyContent : "space-between" , width : 80 , marginRight : 20}} >
                    <TouchableOpacity activeOpacity = {0.5} >
                        <AntDesign name = "videocamera" size ={24} color = "black" />
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity = {0.5} onPress ={()=>{navigation.navigate("AddChat")}} >
                        <AntDesign name = "phone" size ={24} color = "black" />
                    </TouchableOpacity>
                </View>
            )


        });
    }, [navigation,messages]);


    const sendMessage =() =>{
        Keyboard.dismiss();
        
        db.collection("chats").doc(route.params.id).collection("messages").add({
            timestamp : firebase.firestore.FieldValue.serverTimestamp(),
            message : input,
            displayName : firebase.auth().currentUser.displayName,
            email : firebase.auth().currentUser. email,
            photoURL : firebase.auth().currentUser.photoURL,
        });

        setInput("");

    };

    useLayoutEffect(()=>{
        const unsubscribe = db.collection('chats').doc(route.params.id).collection('messages').orderBy('timestamp', 'desc').onSnapshot((snapshot) => setMessages(
            snapshot.docs.map(doc=>({
                id : doc.id,
                data : doc.data()
            }))
        ));

        return unsubscribe;

    },[route]);

    return (
        <SafeAreaView style={{flex :1 , backgroundColor : "white"}}>
            <StatusBar style="light"/>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container} keyboardVerticalOffset= {90} >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} activeOpacity={0.5}>
            <>
            <ScrollView contentContainerStyle={{paddingTop : 15}}>
                   {messages.map(({id,data}) => (
                       data.email === firebase.auth().currentUser.email ? (
                           <View key={id} style={styles.reciever}>
                               <Avatar source={{uri: messages[0]?. data.photoURL  || "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png"}}
                               position = "absolute"
                               rounded
                               bottom={-15}
                               right={-5}
                               size={30}
                               />
                               <Text style={styles.recieverText}>{data.message}</Text>
                               {/* <Text style={styles.recieverName}>{data.displayName}</Text> */}
                           </View> 

                       ):(
                       <View key={id} style={styles.sender}>
                        <Avatar source={{uri: messages[0]?. data.photoURL  || "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png"}}
                               position = "absolute"
                               rounded
                               bottom={-15}
                               left={-5}
                               size={30}
                               />
                               <Text style={styles.senderText}>{data.message}</Text>
                               {/* <Text style={styles.senderName}>{data.displayName}</Text> */}
                       </View>
                        )
                   ))}
               </ScrollView>



               
               <View style={styles.footer}>
                   <TextInput value={input}  placeholder="Signal Message" style={styles.textInput} onChangeText={(text) =>setInput (text)}  onSubmitEditing={sendMessage}/>
                <TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
                <AntDesign name="Trophy" size={24} color ="#2B68E6" />
                </TouchableOpacity>
               </View>
               
               </>
               </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex :1,
    },
    footer:{
        flexDirection: "row",
        alignItems:"center",
        width: "100%",
        padding:15,
    },
    textInput:{
        bottom : 0,
        height: 40,
        flex:1,
        marginRight: 15,
        backgroundColor : "#ECECEC",
        padding:10,
        color: "grey",
        borderRadius:30,
    },
    reciever:{
       padding : 15,
       backgroundColor : "#ECECEC",
       alignSelf : "flex-end",
       borderRadius : 20,
       marginRight : 15,
       marginBottom : 20,
       maxWidth : "80%",
       position : "relative",

    },
    sender:{

        padding : 15,
       backgroundColor : "#2b68e6",
       alignSelf : "flex-start",
       borderRadius : 20,
       marginRight : 15,
       marginBottom : 20,
       maxWidth : "80%",
       position : "relative",
    },
    senderName:{
        left : 10,
        paddingRight:10,
        fontSize:10,
        color:"orange"
    },
    recieverName:{
        left : 10,
        paddingRight:10,
        fontSize:10,
        color:"orange"
    },
    senderText:{
        color:"#FFF",
        fontWeight:"500",
        marginLeft:10,
        marginBottom:15
    },
    recieverText:{
        color:"#2b68e6",
        fontWeight:"500",
        marginLeft:10,
        marginBottom:15
    }
})
