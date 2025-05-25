import React from "react"
import "./src/styles/global.css"
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import TestFirebase from "./src/screens/TestFirebase";

const Stack = createNativeStackNavigator();

function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
        {/* <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default App;
