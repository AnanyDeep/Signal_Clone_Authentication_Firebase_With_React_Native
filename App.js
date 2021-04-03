import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import Home_Screen from './screens/Home_Screen';
import AddChatScreen from './screens/AddChatScreen';
import ChatScreen from './screens/ChatScreen'

const Stack = createStackNavigator();

const globalScreenOptions = {
  headerStyle : {backgroundColor : "#2C6BED"},
  headerTitleStyle : {color : "#FFF"},
  headerTintColor : "#FFF",
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalScreenOptions} 
      initialRouteName = "AddChatScreen"
       >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={Home_Screen} />
        <Stack.Screen name="AddChat" component={AddChatScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;