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
import { AuthProvider, useAuth } from "./src/firebase/AuthContext";
import { ActivityIndicator, View } from "react-native";

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  ResetPassword: undefined;
  Client: undefined;
  Profile: undefined;
};
function Routes() {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#FFD700" />
      </View>
    )
  }
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
      {user ? (
        //se tiver logado
        <>
          <Stack.Screen name="Client" component={ClientScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          {/* Outras telas autenticadas */}
        </>
      ) : (
        //se nao tiver logado
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        </>
      )}
    </Stack.Navigator>
  )

}
function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
      <Toast />
    </AuthProvider>
  )
}
export default App;
