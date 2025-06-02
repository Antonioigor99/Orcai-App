import React from "react"
import "./src/styles/global.css"
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import Toast from "react-native-toast-message";
import RegisterScreen from "./src/screens/RegisterScreen";
import ProfileScreen from "./src/screens/ProfileScreen";

const Stack = createNativeStackNavigator();
function App(){
  return(
    <>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
        {/* <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{ headerShown: false }} /> */}
        {/* <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} /> */}
      </Stack.Navigator>
    </NavigationContainer>
    <Toast />
    </>
  )
}
export default App;
