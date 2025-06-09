import React from "react"
import "./src/styles/global.css"
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/LoginScreen";
import Toast from "react-native-toast-message";
import RegisterScreen from "./src/screens/RegisterScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import ResetPasswordScreen from "./src/screens/ResetPasswordScreen";
import ClientScreen from "./src/screens/ClientScreen";

const Stack = createNativeStackNavigator();
function App(){
  return(
    <>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Client" screenOptions={{
        headerShown: false,
        animation: "fade"
      }}>
        {/* <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{ headerShown: false }} /> */}
        <Stack.Screen name="Client" component={ClientScreen} options={{ headerShown: false }} />
        
      </Stack.Navigator>
    </NavigationContainer>
    <Toast />
    </>
  )
}
export default App;
