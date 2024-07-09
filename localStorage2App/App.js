import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import HomeScreen from './Components/HomeScreen';
import CartScreen from './Components/CartScreen';
import ProductDetailScreen from './Components/ProductDetailScreen';
import CustomDrawerContent from './Components/CustomDrawerContent';


const Drawer = createDrawerNavigator();

function MyDrawer(){
  return(
    <Drawer.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }} drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name='Home' component={HomeScreen} />
      <Drawer.Screen name='Cart' component={CartScreen}/>
      <Drawer.Screen name='ProductDetail' component={ProductDetailScreen}/>
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyDrawer/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
});
