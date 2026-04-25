import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './screens/Login';
import Register from './screens/Register';
import Dashboard from './screens/Dashboard';
import AddExpense from './screens/AddExpense';

const Stack = createNativeStackNavigator();

export default function App() {
  const [token, setToken] = useState(null);

  return (
    <NavigationContainer>
      <Stack.Navigator>

        {!token ? (
          <>
            {/* Login Screen */}
            <Stack.Screen name="Login">
              {props => <Login {...props} setToken={setToken} />}
            </Stack.Screen>

            {/* Register Screen */}
            <Stack.Screen name="Register" component={Register} />
          </>
        ) : (
          <>
            {/* Dashboard */}
            <Stack.Screen name="Dashboard">
              {props => <Dashboard {...props} token={token} />}
            </Stack.Screen>

            {/* Add Expense */}
            <Stack.Screen name="AddExpense">
              {props => <AddExpense {...props} token={token} />}
            </Stack.Screen>
          </>
        )}

      </Stack.Navigator>
    </NavigationContainer>
  );
}