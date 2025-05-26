import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visiblePassword, setVissiblePassword] = useState (true)
  const navigation = useNavigation();

 const handleLogin = async () => {
  if (!email.trim() || !password.trim()) {
    Alert.alert('Error', 'Please fill in both fields');
    return;
  }

  try {
    const response = await fetch('https://reqres.in/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1',

      },    
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      Alert.alert('Success', 'Login successful!\nToken: ' + data.token);
      navigation.navigate('Home');
    } else {
      Alert.alert('Login Failed', data.error || 'Something went wrong');
    }
  } catch (error) {
    Alert.alert('Error', 'Network error or server issue');
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Form</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <View>
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        autoCapitalize="none"
        secureTextEntry = {visiblePassword}
      />
      <TouchableOpacity style = {{position: 'absolute', right: 10, top: 22}} onPress={() => setVissiblePassword(!visiblePassword)}>
            {
                !visiblePassword ? <Feather name="eye" color="#a855f7" size={24} /> : <Feather name="eye-off" color="#a855f7" size={24} />

            }
      </TouchableOpacity>
      </View>

      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#a855f7',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 20,
  },
});
