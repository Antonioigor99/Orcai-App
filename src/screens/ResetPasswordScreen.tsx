import { useNavigation } from "@react-navigation/native";
import { sendPasswordResetEmail } from "firebase/auth";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { auth } from "../firebase/firebaseConfig";

function ResetPasswordScreen() {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<any>();
  useEffect(() => {
    const showSubs = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });
    const hideSubs = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });
    return () => {
      showSubs.remove();
      hideSubs.remove();
    };
  }, []);
  async function handleResetPassword() {
    if (!email.trim()) {
      Toast.show({
        type: "error",
        text1: "Por Favor, insira seu e-mail",
      });
      return;
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      Toast.show({
        type: "error",
        text1: "Erro, E-mail invalido",
      });
      return;
    }
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      Toast.show({
        type: "success",
        text1: "Link enviado!",
        text2: `Verifique seu e-mail: ${email}`,
      });
      setTimeout(() => navigation.navigate("Login" as never), 1000);
    } catch (error: any) {
      let message = "Erro ao enviar e-mail.";
      if (error.code === "auth/user-not-found") {
        message = "Usuário não encontrado.";
      } else if (error.code === "auth/invalid-email") {
        message = "E-mail inválido.";
      }
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: message,
      });
    } finally {
      setLoading(false);
    }
  }
  return (
    <KeyboardAvoidingView
      className="flex-1 bg-gray-800 "
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex justify-center">
          <View
            className="flex items-center justify-center p-4 gap-4 h-[90%] "
            style={{
              justifyContent: keyboardVisible ? "flex-start" : "center",
            }}
          >
            <Image
              className="w-full max-w-md h-32"
              source={require("../../assets/Logo.png")}
              resizeMode="contain"
            />
            <Text className="text-white text-2xl font-bold">
              Redefinir senha
            </Text>
            <TextInput
              className="border-2 w-full max-w-md rounded-2xl bg-white border-yellow-300 text-black px-4 py-2"
              placeholder="Digite Seu E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              placeholderTextColor="#999"
            />
            <Pressable
              className="bg-yellow-300 px-6 py-2 rounded-xl"
              onPress={handleResetPassword}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#000" />
              ) : (
                <Text className="font-bold">Enviar link de recuperação</Text>
              )}
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Login" as never)}>
              <Text className="text-white">Já tem uma conta? Faça login</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
export default ResetPasswordScreen;
