import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";
import axios from "axios";

export default function Register({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const register = async () => {
    try {
      if (!email || !password) {
        return setMessage("All fields required");
      }

      const res = await axios.post(
        "http://10.59.28.109:5000/api/auth/register",
        { email, password }
      );

      setMessage("Registered successfully");

      setTimeout(() => {
        navigation.navigate("Login");
      }, 1000);

    } catch (err) {
      const msg =
        err?.response?.data?.msg || "Registration failed";

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

      <Text style={{
        fontSize:28,
        fontWeight:"bold",
        textAlign:"center",
        marginBottom:20
      }}>
        Register
      </Text>

      {/* MESSAGE */}
      {message !== "" && (
        <Text style={{
          textAlign:"center",
          marginBottom:15,
          color: message.includes("❌") ? "red" : "green"
        }}>
          {message}
        </Text>
      )}

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{
          backgroundColor:"#fff",
          padding:12,
          borderRadius:10,
          marginBottom:10
        }}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{
          backgroundColor:"#fff",
          padding:12,
          borderRadius:10,
          marginBottom:20
        }}
      />

      <TouchableOpacity
        onPress={register}
        style={{
          backgroundColor:"#4CAF50",
          padding:14,
          borderRadius:10,
          alignItems:"center",
          marginBottom:15
        }}
      >
        <Text style={{ color:"#fff", fontWeight:"bold" }}>
          Register
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={{
          borderWidth:1,
          borderColor:"#2196F3",
          padding:12,
          borderRadius:10,
          alignItems:"center"
        }}
      >
        <Text style={{ color:"#2196F3" }}>
          Already have account? Login
        </Text>
      </TouchableOpacity>

    </View>
  );
}