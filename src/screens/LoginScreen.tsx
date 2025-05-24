import { View, Text, TextInput, Button  } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

type FormData = {
    email: string;
    password: string;
}

function LoginScreen(){
  const { control, handleSubmit, formState:{errors}} = useForm<FormData>();
  const navigation = useNavigation();
  const auth = getAuth()

  const onSubmit = async (data:FormData) =>{
    try{
        await signInWithEmailAndPassword(auth, data.email, data.password);
        navigation.navigate("Home" as never);
    }catch(error:any){
        
    }
  }
}
export default LoginScreen