import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';
import axios from 'axios';

export default function AddExpense({ navigation, route, token }) {

  const expense = route?.params?.expense;

  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    if (expense) {
      setAmount(String(expense.amount || ''));
      setCategory(expense.category || '');
      setDate(expense.date ? expense.date.split('T')[0] : '');
      setNote(expense.note || '');
    }
  }, [expense]);

  // VALIDATION HELPERS
  const isValidDate = (d) => /^\d{4}-\d{2}-\d{2}$/.test(d);
  const isNumber = (v) => /^[0-9]+$/.test(v);
  const isText = (v) => /^[A-Za-z ]+$/.test(v);

  const showAlert = (title, msg) => {
    Alert.alert(title, msg, [{ text: "OK" }]);
  };

  const saveExpense = async () => {
    try {

      // 🔴 EMPTY CHECK (MAIN FIX)
      if (!amount.trim() || !category.trim() || !date.trim()) {
        return showAlert(
          "⚠️ Missing Fields",
          "Please fill all required fields:\n\n• Amount\n• Category\n• Date"
        );
      }

      // 🔴 AMOUNT CHECK
      if (!isNumber(amount)) {
        return showAlert(
          "❌ Invalid Amount",
          "Amount must contain ONLY numbers.\nExample: 100"
        );
      }

      // 🔴 CATEGORY CHECK
      if (!isText(category)) {
        return showAlert(
          "❌ Invalid Category",
          "Category must contain ONLY letters.\nExample: Food, Travel"
        );
      }

      // 🔴 DATE CHECK
      if (!isValidDate(date)) {
        return showAlert(
          "❌ Invalid Date",
          "Date format must be:\nYYYY-MM-DD\nExample: 2026-04-25"
        );
      }

      const payload = {
        amount: Number(amount),
        category,
        date,
        note
      };

      if (expense) {
        await axios.put(
          `http://10.59.28.109:5000/api/expenses/${expense._id}`,
          payload,
          { headers: { Authorization: token } }
        );
      } else {
        await axios.post(
          'http://10.59.28.109:5000/api/expenses',
          payload,
          { headers: { Authorization: token } }
        );
      }

      Alert.alert("✅ Success", "Expense saved successfully");
      navigation.goBack();

    } catch (err) {
      console.log(err);

      Alert.alert(
        "❌ Server Error",
        "Something went wrong. Please try again."
      );
    }
  };

  return (
    <View style={{ flex:1, padding:20, backgroundColor:'#f5f5f5' }}>

      <Text style={{ fontSize:24, marginBottom:20, textAlign:'center' }}>
        {expense ? "Edit Expense" : "Add Expense"}
      </Text>

      <TextInput
        placeholder=" Enter Amount in Number only ."
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={{ backgroundColor:'#fff', padding:12, marginBottom:10 }}
      />

      <TextInput
        placeholder="Category(like food, Travelling)"
        value={category}
        onChangeText={setCategory}
        style={{ backgroundColor:'#fff', padding:12, marginBottom:10 }}
      />

      <TextInput
        placeholder="YYYY-MM-DD"
        value={date}
        onChangeText={setDate}
        style={{ backgroundColor:'#fff', padding:12, marginBottom:10 }}
      />

      <TextInput
        placeholder="Note (optional)"
        value={note}
        onChangeText={setNote}
        style={{ backgroundColor:'#fff', padding:12, marginBottom:20 }}
      />

      <TouchableOpacity
        onPress={saveExpense}
        style={{
          backgroundColor:'#2196F3',
          padding:15,
          borderRadius:10,
          alignItems:'center'
        }}
      >
        <Text style={{ color:'#fff', fontWeight:'bold' }}>
          {expense ? "Update Expense" : "Add Expense"}
        </Text>
      </TouchableOpacity>

    </View>
  );
}