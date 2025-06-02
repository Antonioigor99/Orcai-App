import React from "react";
import { useState } from "react";
import { ActivityIndicator } from "react-native";
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

type ProfileData = {
  companyName: string;
  userName: string;
  phoneNumber: string;
};

function formatPhoneNumber(value: string): string {
  const cleaned = value.replace(/\D/g, "");
  if (cleaned.length <= 2) return `(${cleaned})`;
  if (cleaned.length <= 7) return `(${cleaned.slice(0, 2)})${cleaned.slice(2)}`;
  if (cleaned.length <= 11)
    return `(${cleaned.slice(0, 2)})${cleaned.slice(2, 3)} ${cleaned.slice(
      3,
      7
    )}-${cleaned.slice(7)}`;

  return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 3)} ${cleaned.slice(
    3,
    7
  )}-${cleaned.slice(7, 11)}`;
}

function ProfileScreen() {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<any>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileData>();

  const onNext = (data: ProfileData) => {
    setLoading(true);
    const rawPhoneNumber = data.phoneNumber.replace(/\D/g, "");
    setTimeout(() => {
      navigation.navigate(
        "Register" as never,
        {
          companyName: data.companyName,
          userName: data.userName,
          phoneNumber: rawPhoneNumber,
        } as never
      );
      setLoading(false);
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-gray-800"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 items-center justify-center p-4 gap-4">
          <Image
            className="w-full max-w-md h-32"
            source={require("../../assets/Logo.png")}
            resizeMode="contain"
          />
          <Text className="text-white text-2xl font-bold">
            Dados do usuário
          </Text>
          {/* Nome do Usuário */}
          <Controller
            control={control}
            name="userName"
            rules={{ required: "Nome de usuário Obrigatório" }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="border-2 w-full max-w-md rounded-2xl bg-white border-yellow-300 text-black px-4 py-2"
                placeholder="Nome de usuário"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.userName && (
            <Text className="text-red-600 text-sm">
              {errors.userName.message}
            </Text>
          )}

          {/* Nome da Empresa */}
          <Controller
            control={control}
            name="companyName"
            rules={{ required: "Nome da Empresa obrigatório" }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="border-2 w-full max-w-md rounded-2xl bg-white border-yellow-300 text-black px-4 py-2"
                placeholder="Nome Fantasia da empresa"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.companyName && (
            <Text className="text-red-600 text-sm">
              {errors.companyName.message}
            </Text>
          )}

          {/* Numero aqui */}
          <Controller
            control={control}
            name="phoneNumber"
            rules={{
              validate: (value) =>
                value === "" ||
                value.replace(/\D/g, "").length >= 11 ||
                "Número muito curto",
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="border-2 w-full max-w-md rounded-2xl bg-white border-yellow-300 text-black px-4 py-2"
                placeholder="Numero de Telefone (Opcional)"
                onChangeText={(text) => onChange(formatPhoneNumber(text))}
                value={value}
                keyboardType="phone-pad"
              />
            )}
          />

          {/* avancar para proximo */}
          <Pressable
            onPress={handleSubmit(onNext)}
            className="bg-yellow-300 px-6 py-2 rounded-xl"
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#000" />
            ) : (
              <Text className="font-bold">Avançar</Text>
            )}
          </Pressable>
          {/* Já tem conta aqui */}
          <Pressable onPress={() => navigation.navigate("Login" as never)}>
            <Text className="text-white underline mt-4">
              Já tem uma conta? Faça login
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
export default ProfileScreen;
