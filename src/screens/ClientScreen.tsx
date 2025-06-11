import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Keyboard, Modal } from "react-native";
import {
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
import Fontisto from "@expo/vector-icons/Fontisto";
import AntDesign from '@expo/vector-icons/AntDesign';
import Toast from "react-native-toast-message";
import { getAuth } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

function ClientScreen() {
  const navigation = useNavigation();
  const [page, setPage] = useState(1);
  const itemsPerPage = 7;



  //clients
  const clientes = [
    { id: "1", name: "João da Silva", phone: "(54)9 9922-112" },
    {
      id: "2",
      name: "Jaqueline Teste Longo de Nome",
      phone: "(54)9 8844-2244",
    },
  ];

  //Search
  const [search, setSearch] = useState("");
  const filterCliets = clientes.filter(
    (cliente) =>
      cliente.name.toLowerCase().includes(search.toLowerCase()) ||
      cliente.phone.includes(search)
  );
  const totalPages = Math.ceil(filterCliets.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const displayedClients = filterCliets.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('')



  const handleAdd = async () => {
    if (!newName || !newEmail || !newPhone) {
      Toast.show({
        type: "error",
        text1: "Preencha todos os campos",
      });
      return
    }

    // authcation
    const auth = getAuth();
    const user = auth.currentUser;
    try {
      const user = auth.currentUser;
      if (!user) {
        Toast.show({
          type: 'error',
          text1: 'Usuário não autenticado'

        })
        return;
      }
      await addDoc(collection(db, 'clients'), {
        name: newName,
        email: newEmail,
        phone: newPhone,
        userId: user.uid,
        createdAt: new Date()
      });
      Toast.show({
        type: 'success',
        text1: 'Cliente adicionado com sucesso'
      });
    } catch (error) {
      console.log('Erro ao adicinar cliente:', error);
      Toast.show({
        type: 'error',
        text1: 'Erro ao adicionar Cliente',
      })
    }
  }
  //Controlando estados para formulario
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
  }, []); //Controlando estados para formulario
  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        className="flex-1 px-4 pt-4"
      >
        {/* Modal */}
        <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)} style={{
          justifyContent: keyboardVisible ? "flex-start" : "center",
        }} >
          <View className="flex-1 justify-center items-center bg-black/50 px-4">
            <View className="bg-white w-full rounded-2xl p-6 space-y-4 gap-4">
              <Pressable className="self-end" onPress={() => setModalVisible(false)} >
                <AntDesign name="closecircle" size={24} color="red" />
              </Pressable>
              <Text className="text-center text-xl font-bold">Novo Cliente</Text>
              <TextInput className="border border-gray-300 rounded-xl p-3" placeholder="Digite o Nome Completo" value={newName} onChangeText={setNewName} />
              <TextInput className="border border-gray-300 rounded-xl p-3" placeholder="Digite o E-mail" value={newEmail} onChangeText={setNewEmail} />
              <TextInput className="border border-gray-300 rounded-xl p-3" placeholder="Digite o Telefone" value={newPhone} onChangeText={setNewPhone} />
              <View className="flex items-center mt-5 ">
                <Pressable className="bg-yellow-300 px-6 py-2 rounded-xl"
                  android_ripple={{ color: "#e0c900" }} onPress={handleAdd}>
                  <Text className="font-bold text-xl ">Adicionar</Text>
                </Pressable>
              </View>
            </View>
          </View>
          <Toast />
        </Modal>
        {/* Modal */}
        <View className="py-2">
          <Text className="text-2xl font-bold">Clientes</Text>
          <Text className="text-gray-500 text-lg">Gerencie seus clientes</Text>
        </View>

        <View className="flex-row items-center justify-between w-full mt-2">
          <View className="flex flex-row items-center border justify-between px-1 py-1 mr-1  rounded-xl">
            <TextInput
              className="text-black w-56 text-sm"
              placeholder="Buscar por nome ou Telefone"
              value={search}
              onChangeText={(text) => setSearch(text)}
              onSubmitEditing={() => setPage(1)}
              returnKeyType="search"
            />
            <Pressable>
              <Fontisto
                name="search"
                size={18}
                color="gray"
                className="mr-3 p-1"
              />
            </Pressable>

          </View>

          <Pressable
            className="rounded-2xl bg-yellow-300 flex-row items-center gap-2 px-3 py-3"
            onPress={() => setModalVisible(true)}
          >
            <FontAwesome5 name="user-plus" size={20} color="black" />
            <Text className="text-black font-bold">Novo</Text>
          </Pressable>
        </View>

        <View className="border-2 border-gray-400 rounded-2xl mt-4">
          <View className="flex-row justify-around py-2 bg-gray-100 rounded-t-2xl">
            <Text className="text-lg font-bold w-[40%] text-center">Nome</Text>
            <Text className="text-lg font-bold w-[40%] text-center">
              Telefone
            </Text>
            <Text className="w-[20%]"></Text>
          </View>

          {displayedClients.length > 0 ? (
            displayedClients.map((item) => (
              <View
                key={item.id}
                className="flex-row items-center justify-between border-t-2 pl-2 pr-7 py-2 border-gray-300"
              >
                <Text
                  className="w-[40%] text-center font-bold"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.name}
                </Text>
                <Text className="w-[40%] text-center font-bold">
                  {item.phone}
                </Text>
                <Feather name="more-horizontal" size={28} color="gray" />
              </View>
            ))
          ) : (
            <View className="py-6">
              <Text className="text-center text-2xl text-gray-500">
                Nenhum Cliente encontrado
              </Text>
            </View>
          )}
        </View>

        {/* Paginação */}
        <View className="flex-row justify-center gap-2 mt-4 flex-wrap">
          {[...Array(totalPages)].map((_, i) => (
            <Pressable
              key={i}
              onPress={() => setPage(i + 1)}
              className={`px-4 py-2 border rounded-lg ${page === i + 1 ? "bg-yellow-300" : "bg-gray-200"
                }`}
            >
              <Text className="font-bold">{i + 1}</Text>
            </Pressable>
          ))}

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default ClientScreen;
