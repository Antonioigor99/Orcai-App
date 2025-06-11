import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase/firebaseConfig";
import Toast from "react-native-toast-message";
import { Feather } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

type FormData = {
  email: string;
  password: string;
};
type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;
function LoginScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation<LoginScreenNavigationProp>();

  //Controlando estados para formulario de login
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  useEffect(() => {
    const showSubscripton = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });
    const hideSubscripton = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscripton.remove();
      hideSubscripton.remove();
    };
  }, []); //Controlando estados para formulario de login

  const onSubmit = async (data: FormData) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Client' }],
      })
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Erro ao fazer Login",
        text2:
          error.code === "auth/wrong-password" ||
            error.code === "auth/user-not-found"
            ? "E-mail ou senha incorretos."
            : "Tente novamente mais tarde.",
      });
    }
  };
  return (
    <KeyboardAvoidingView
      className="flex-1 bg-gray-800"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex justify-center">
          <View
            className="flex items-center justify-center p-4 gap-4 h-[90%]"
            style={{
              justifyContent: keyboardVisible ? "flex-start" : "center",
            }}
          >
            <Image
              className="w-96 h-32"
              source={require("../../assets/Logo.png")}
              resizeMode="contain"
            />
            <Text className="text-center text-4xl text-white font-bold">
              Login
            </Text>
            <Controller
              control={control}
              name="email"
              rules={{ required: "Email obrigatório" }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className="border-2 w-96 rounded-2xl bg-white border-yellow-300 text-black px-4 py-2"
                  placeholder="E-mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.email && (
              <Text className="text-white">{errors.email.message}</Text>
            )}
            <Controller
              control={control}
              name="password"
              rules={{ required: "Senha Obrigatória" }}
              render={({ field: { onChange, value } }) => (
                <View>
                  <TextInput
                    className="border-2 w-96 rounded-2xl bg-white border-yellow-300 text-black px-4 py-2"
                    placeholder="Senha"
                    secureTextEntry={!showPassword}
                    onChangeText={onChange}
                    value={value}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    onPress={() => setShowPassword((prev) => !prev)}
                  >
                    <Feather
                      name={showPassword ? "eye" : "eye-off"}
                      size={24}
                      color="gray"
                    />
                  </TouchableOpacity>
                </View>
              )}
            />
            {errors.password && (
              <Text className="text-white">{errors.password.message}</Text>
            )}
            <Pressable
              className="bg-yellow-300 px-6 py-2 rounded-xl"
              onPress={handleSubmit(onSubmit)}
              android_ripple={{ color: "#e0c900" }}
            >
              <Text className="font-bold">Entrar</Text>
            </Pressable>
            <View className="flex items-center justify-center gap-2 mt-4">
              <Pressable
                onPress={() => navigation.navigate("ResetPassword")}
              >
                <Text className="text-white">
                  Esqueceu a senha?
                  <Text className="text-yellow-300"> Clique Aqui!</Text>
                </Text>
              </Pressable>
              <Pressable
                onPress={() => navigation.navigate("Register")}
              >
                <Text className="text-white">
                  Não tem Conta?
                  <Text className="text-yellow-300"> Cadastre-se</Text>
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
export default LoginScreen;
