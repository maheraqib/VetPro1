import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Components/HomeScreen';
// import ProfileScreen from './Components/ProfileScreen';
// import LoginScreen from './Components/LoginForm';
import FormScreen from './Components/FormScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name='Profile' component={FormScreen}/>
        {/* <Stack.Screen name='Login' component={LoginScreen}/> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;


// {
//   "email": "eve.holt@reqres.in",
//   "password": "cityslicka"
// }