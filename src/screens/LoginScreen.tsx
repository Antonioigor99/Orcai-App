import { View, Text, TextInput, Button  } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase/firebaseConfig"

type FormData = {
    email: string;
    password: string;
}

function LoginScreen(){
  const { control, handleSubmit, formState:{errors}} = useForm<FormData>();
  const navigation = useNavigation();

  const onSubmit = async (data:FormData) =>{
    try{
        await signInWithEmailAndPassword(auth, data.email, data.password);
        navigation.navigate("Home" as never);
    }catch(error:any){
        alert('Erro ai fazer Login: ' + error.message);
    }
  }
  return(
    <View className="" >
      <Text className="text-center">Login</Text>
      <Controller control={control} name="email" rules={{required: "Email obrigatório"}} render={({field: {onChange, value}})=>(
        <TextInput className="" placeholder="E-mail" keyboardType="email-address" autoCapitalize="none" onChangeText={onChange} value={value} />
      )} />
      {errors.email && <Text>{errors.email.message}</Text>}
      <Controller control={control} name="password" rules={{required: "Senha Obrigatória"}} render={({field: {onChange, value}})=>(
        <TextInput className="" placeholder="Senha" secureTextEntry onChangeText={onChange} value={value} />
      )}/>
      {errors.password && <Text>{errors.password.message}</Text>}
      <Button title="Entrar" onPress={handleSubmit(onSubmit)} />
      <Text className="text-center">Teste</Text>
    </View>
  )
}
export default LoginScreen;