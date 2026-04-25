import React, { useState } from "react";
import {
  View,
  Text,
 TextInput,
  TouchableOpacity
} from "react-native";
import axios from "axios";

export default function Login({ navigation, setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const login = async () => {
    try {
      if (!email || !password) {
        return setMessage("❌ Enter email & password");
      }

      const res = await axios.post(
        "http://10.59.28.109:5000/api/auth/login",
        { email, password }
      );

      setMessage("");
      setToken(res.data.token);

    } catch (err) {
      const msg =
        err?.response?.data?.msg || "Invalid credentials";

      setMessage("❌ " + msg);
    }
  };

  return (
    <View style={{
      flex:1,
      justifyContent:"center",
      padding:20,
      backgroundColor:"#f5f5f5"
    }}>

      {/* TITLE */}
      <Text style={{
        fontSize:30,
        fontWeight:"bold",
        textAlign:"center",
        marginBottom:25
      }}>
        Expense Tracker
      </Text>

      {/* ERROR MESSAGE */}
      {message !== "" && (
        <Text style={{
          textAlign:"center",
          marginBottom:15,
          color:"red",
          fontWeight:"500"
        }}>
          {message}
        </Text>
      )}

      {/* EMAIL */}
      <TextInput
        placeholder="Enter Email"
        value={email}
        onChangeText={setEmail}
        style={{
          backgroundColor:"#fff",
          padding:14,
          borderRadius:10,
          marginBottom:12,
          fontSize:16
        }}
      />

      {/* PASSWORD */}
      <TextInput
        placeholder="Enter Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{
          backgroundColor:"#fff",
          padding:14,
          borderRadius:10,
          marginBottom:20,
          fontSize:16
        }}
      />

      {/* LOGIN BUTTON */}
      <TouchableOpacity
        onPress={login}
        style={{
          backgroundColor:"#2196F3",
          padding:15,
          borderRadius:10,
          alignItems:"center",
          marginBottom:15
        }}
      >
        <Text style={{
          color:"#fff",
          fontSize:16,
          fontWeight:"bold"
        }}>
          Login
        </Text>
      </TouchableOpacity>

      {/* REGISTER BUTTON */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Register")}
        style={{
          borderWidth:1,
          borderColor:"#4CAF50",
          padding:12,
          borderRadius:10,
          alignItems:"center"
        }}
      >
        <Text style={{
          color:"#4CAF50",
          fontWeight:"bold"
        }}>
          Create New Account
        </Text>
      </TouchableOpacity>

    </View>
  );
}