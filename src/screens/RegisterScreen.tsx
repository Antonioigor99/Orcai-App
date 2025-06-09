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
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase/firebaseConfig";
import Toast from "react-native-toast-message";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import NetInfo from "@react-native-community/netinfo"

//tipando e-mail e password
type FormData = {
  company: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function RegisterScreen() {
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { userName, companyName, phoneNumber } = (route.params || {}) as {
    userName?: string;
    companyName?: string;
    phoneNumber?: string;
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormData>();

  //rota do profile
  const navigation = useNavigation();
  const [keyboardVisible, setKeyboardVisible] = useState(false);
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
  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const net = await NetInfo.fetch();
    if(!net.isConnected){
      Toast.show({
        type:'error',
        text1:'Sem conexão',
        text2:'Conecte-se à internet para continuar.'
      })
      setLoading(false);
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name: userName,
        company: companyName,
        phone: phoneNumber,
        email: data.email,
        createdAt: new Date(),
      });
      Toast.show({
        type: "success",
        text1: "Cadastro realizado com sucesso!",
      });
      navigation.navigate("Login" as never);
    } catch (error: any) {
      let message = "Erro ao criar conta.";
      if (error.code === "auth/email-already-in-use") {
        message = "E-mail já está em uso.";
      } else if (error.code === "auth/weak-password") {
        message = "Senha deve ter no minimo 6 caracteres.";
      }
      Toast.show({
        type: "error",
        text1: message,
      });
    } finally {
      setLoading(false);
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
            className="flex items-center gap-5 px-4 h-[90%]"
            style={{
              justifyContent: keyboardVisible ? "flex-start" : "center",
            }}
          >
            <Image
              className="w-full max-w-md h-32"
              source={require("../../assets/Logo.png")}
              resizeMode="contain"
            />
            <Text className="text-center text-4xl text-white font-bold">
              Cadastro
            </Text>

            {/* Email aqui */}
            <Controller
              control={control}
              name="email"
              rules={{
                required: "E-mail Obrigatório",
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "E-mail inválido",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className="border-2 w-full max-w-md rounded-2xl bg-white border-yellow-300 text-black px-4 py-2"
                  placeholder="E-mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.email && (
              <Text className="text-red-600 text-sm">
                {errors.email.message}
              </Text>
            )}

            {/* Senha aqui */}
            <Controller
              control={control}
              name="password"
              rules={{
                required: "Senha obrigatória",
                minLength: { value: 6, message: "Mínimo 6 caracteres" },
              }}
              render={({ field: { onChange, value } }) => (
                <View className="w-full max-w-md relative">
                  <TextInput
                    className="border-2 w-full max-w-md rounded-2xl bg-white border-yellow-300 text-black px-4 py-2"
                    placeholder="Senha"
                    secureTextEntry={!showPassword}
                    onChangeText={onChange}
                    autoCapitalize="none"
                    value={value}
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
              <Text className="text-red-600 text-sm">
                {errors.password.message}
              </Text>
            )}
            {/* Confirma senha aqui */}
            <Controller
              control={control}
              name="confirmPassword"
              rules={{
                required: "Confirme a senha",
                validate: (value) => {
                  const { password } = getValues();
                  return value === password || "As senhas não coincidem";
                },
              }}
              render={({ field: { onChange, value } }) => (
                <View className="w-full max-w-md relative">
                  <TextInput
                    className="border-2 w-full max-w-md rounded-2xl bg-white border-yellow-300 text-black px-4 py-2"
                    placeholder="Confirme a senha"
                    secureTextEntry={!showConfirmPassword}
                    onChangeText={onChange}
                    autoCapitalize="none"
                    value={value}
                  />
                   <TouchableOpacity
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    onPress={() => setShowConfirmPassword((prev) => !prev)}
                  >
                    <Feather
                      name={showConfirmPassword ? "eye" : "eye-off"}
                      size={24}
                      color="gray"
                    />
                  </TouchableOpacity>
                </View>
              )}
            />
            {errors.confirmPassword && (
              <Text className="text-red-600 text-sm">
                {errors.confirmPassword.message}
              </Text>
            )}
            {/* Cadastrar aqui */}
            <Pressable
              className="bg-yellow-300 px-6 py-2 rounded-xl"
              onPress={handleSubmit(onSubmit)}
              disabled={loading}
            >
              <Text className="font-bold">Cadastrar</Text>
            </Pressable>

            {/* Já tem conta aqui */}
            <Pressable onPress={() => navigation.navigate("Login" as never)}>
              <Text className="text-white underline mt-4">
                Já tem uma conta? Faça login
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
export default RegisterScreen;
