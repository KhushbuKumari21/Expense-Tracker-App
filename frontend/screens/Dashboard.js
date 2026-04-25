import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

export default function Dashboard({ token, navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        'http://10.59.28.109:5000/api/expenses',
        { headers: { Authorization: token } }
      );
      setData(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const deleteExpense = async (id) => {
    try {
      await axios.delete(
        `http://10.59.28.109:5000/api/expenses/${id}`,
        { headers: { Authorization: token } }
      );
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const total = data.reduce((sum, item) => sum + (item.amount || 0), 0);

  if (loading) {
    return (
      <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex:1, padding:20, backgroundColor:'#f5f5f5' }}>

      {/* HEADER */}
      <Text style={{
        fontSize:26,
        fontWeight:'bold',
        textAlign:'center',
        marginBottom:10
      }}>
        Dashboard
      </Text>

      {/* TOTAL CARD */}
      <View style={{
        backgroundColor:'#4CAF50',
        padding:15,
        borderRadius:10,
        marginBottom:15
      }}>
        <Text style={{ color:'#fff', fontSize:18 }}>Total Expense</Text>
        <Text style={{ color:'#fff', fontSize:24, fontWeight:'bold' }}>
          ₹{total}
        </Text>
      </View>

      {/* ADD BUTTON */}
      <TouchableOpacity
        onPress={() => navigation.navigate('AddExpense')}
        style={{
          backgroundColor:'#2196F3',
          padding:12,
          borderRadius:10,
          marginBottom:15,
          alignItems:'center'
        }}
      >
        <Text style={{ color:'#fff', fontWeight:'bold' }}>
          + Add Expense
        </Text>
      </TouchableOpacity>

      {/* EMPTY STATE */}
      {data.length === 0 && (
        <Text style={{ textAlign:'center', marginTop:20 }}>
          No expenses found
        </Text>
      )}

      {/* LIST */}
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={{
            backgroundColor:'#fff',
            padding:15,
            marginVertical:6,
            borderRadius:12,
            elevation:2
          }}>
            
            {/* CATEGORY */}
            <Text style={{ fontSize:16, fontWeight:'600' }}>
              {item.category}
            </Text>

            {/* AMOUNT */}
            <Text style={{ fontSize:18, fontWeight:'bold', marginVertical:5 }}>
              ₹{item.amount}
            </Text>

            {/* DATE */}
            <Text style={{ color:'#555' }}>
              📅 {item.date ? item.date.split('T')[0] : 'No date'}
            </Text>

            {/* NOTE */}
            {item.note ? (
              <Text style={{ color:'#777', marginTop:3 }}>
                📝 {item.note}
              </Text>
            ) : null}

            {/* BUTTON ROW */}
            <View style={{
              flexDirection:'row',
              justifyContent:'space-between',
              marginTop:10
            }}>

              {/* EDIT */}
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('AddExpense', { expense: item })
                }
                style={{
                  backgroundColor:'#FFC107',
                  padding:8,
                  borderRadius:6
                }}
              >
                <Text style={{ fontWeight:'bold' }}>Edit</Text>
              </TouchableOpacity>

              {/* DELETE */}
              <TouchableOpacity
                onPress={() => deleteExpense(item._id)}
                style={{
                  backgroundColor:'#F44336',
                  padding:8,
                  borderRadius:6
                }}
              >
                <Text style={{ color:'#fff', fontWeight:'bold' }}>Delete</Text>
              </TouchableOpacity>

            </View>

          </View>
        )}
      />
    </View>
  );
}