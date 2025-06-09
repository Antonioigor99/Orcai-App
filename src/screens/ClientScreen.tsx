import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

function ClientScreen() {
  const navigation = useNavigation();
  const [page, setPages] = useState(1);
  const itemsPerPage = 5;

  const clientes = [
    { id: "1", name: "João da Silva", phone: "(54)9 9922-112" },
    {
      id: "2",
      name: "Jaqueline Teste Longo de Nome",
      phone: "(54)9 8844-2244",
    },
    { id: "3", name: "Carlos Alberto", phone: "(54)9 1234-5678" },
    { id: "4", name: "Maria Eduarda", phone: "(54)9 5678-4321" },
    { id: "7", name: "Fernanda Dias", phone: "(54)9 1122-3344" },
    { id: "5", name: "Joana Prado", phone: "(54)9 9988-7766" },
    { id: "6", name: "Luis Henrique", phone: "(54)9 2233-4455" },
    { id: "7", name: "Fernanda Dias", phone: "(54)9 1122-3344" },
    { id: "8", name: "Lucas Rocha", phone: "(54)9 3344-5566" },
    { id: "8", name: "Lucas Rocha", phone: "(54)9 3344-5566" },
    { id: "8", name: "Lucas Rocha", phone: "(54)9 3344-5566" },
    { id: "8", name: "Lucas Rocha", phone: "(54)9 3344-5566" },
    { id: "8", name: "Lucas Rocha", phone: "(54)9 3344-5566" },
    { id: "7", name: "Fernanda Dias", phone: "(54)9 1122-3344" },
  ];
  const displayedClients = clientes.slice(0, page * itemsPerPage);
  //paginação
  const handleLoadMore = () => {
    if (displayedClients.length < clientes.length) {
      setPages((prev) => prev + 1);
    }
  };
  const renderClient = ({ item }) =>  (
    <View className="flex-row items-center justify-between border-t-2 pl-2 pr-7 py-2 border-gray-300">
      <Text
        className="w-[40%] text-center font-bold"
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {item.name}
      </Text>
      <Text className="w-[40%] text-center font-bold">{item.phone}</Text>
      <Feather name="more-horizontal" size={28} color="gray" />
    </View>
  );
  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <View className="w-full border h-36"></View>
      <View className="flex">
        <View className="flex justify-start h-[90%] px-4 ">
          <View className="py-2">
            <Text className="text-2xl font-bold">Clientes</Text>
            <Text className="text-gray-500 text-lg">
              Gerencie seus clientes
            </Text>
          </View>
          <View className="flex-row items-center justify-between">
            <TextInput
              className="border px-2 text-black text-sm rounded-xl"
              placeholder="Buscar por nome ou telefone"
            />
            <Pressable className="rounded-2xl bg-yellow-300 flex-row items-center gap-2 px-2 py-3">
              <FontAwesome5 name="user-plus" size={24} color="black" />
              <Text className="text-black font-bold ">Novo Cliente</Text>
            </Pressable>
          </View>
          <View className="border-2 border-gray-400 rounded-2xl mt-4 ">
            <View className="flex-row justify-around rounded-t-lg">
              <Text className="text-lg font-bold">Nome</Text>
              <Text className="text-lg font-bold">Telefone</Text>
              <Text className=""></Text>
            </View>
            <FlatList
              data={displayedClients}
              keyExtractor={(item) => item.id}
              renderItem={renderClient}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.7}
              ListEmptyComponent={() => (
                <View className="py-6">
                  <Text className="text-center text-2xl text-gray-500">
                    Nenhum Cliente encontrado
                  </Text>
                </View>
              )}
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
export default ClientScreen;
