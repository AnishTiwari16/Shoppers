import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import CartScreen from '../screens/shop/CartScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SignOut from '../screens/SignOut';
import { Feather } from '@expo/vector-icons';


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();   


function StackScreen() {
  
    return (
        <NavigationContainer>
      <Stack.Navigator 
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTintColor: 'white',
      }}>
        
        <Stack.Screen 
            name = 'login'
            component = {LoginScreen}
            options = {{title: 'Login Screen'}}
        />
        <Stack.Screen 
            name = 'Register'
            component = {RegisterScreen}
            options = {{title: 'User Register'}}
        />
        
        <Stack.Screen
          name="allproduct"
          component={myDrawer}
          options={() => ({
            headerShown:false
          })}
        />
        <Stack.Screen 
          name = 'productdetail'   //route name
          component = {ProductDetailScreen}
          options = {({route}) => ({
            title: route.params.productTitle
          })}
        />
        <Stack.Screen 
          name = 'cart'
          component = {CartScreen}
          options = {{title: "Your Cart"}}
        />
        <Stack.Screen 
          name = 'edit'
          component = {EditProductScreen}
          options = {({navigation, route}) => ({
            headerTitle: route.params?.productId?
            'Edit Product':'Add Product',
            })}
        />
        <Stack.Screen 
          name = 'userProduct'
          component = {UserProductsScreen}
          options = {{title : "User Products"}}
        />
      </Stack.Navigator>
      </NavigationContainer>
    );
  }

  function myDrawer() {
    return (
      <Drawer.Navigator 
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTintColor: 'white',
      }}>
        <Drawer.Screen 
          name = 'Products'
          component = {ProductsOverviewScreen}
          options = {({navigation}) => ({
            headerTitle: "All Products",
            })}
          />
        <Drawer.Screen 
          name = 'Orders'
          component = {OrdersScreen}
          options = {({navigation}) => ({
            headerTitle: "Your Orders",
            drawerIcon:({}) => (
              <Ionicons 
              name="md-list"
              size={24}
              color='white'
              />
            )
          })}
        />
        <Drawer.Screen 
          name = 'Admin'
          component = {UserProductsScreen}
          options = {({navigation}) => ({
            headerTitle: "Your Products",
            drawerIcon:({}) => (
              <Ionicons 
              name="md-create"
              size={24}
              color='white'
              />
            ),
            headerRight: ()=> (
              <Ionicons style = {{marginHorizontal: 10, overflow: 'hidden'}} 
              name="md-create" 
              size={24} 
              color= 'white'
              onPress = {()=> {
                navigation.navigate('edit')
              }}
              />
              
            )
          })}
        />
        <Drawer.Screen 
          name = 'Settings'
          component = {SignOut}
          options = {() => ({
            headerTitle: "Settings",
            drawerIcon:({}) => (
              <Feather name="settings" size={24} color="black" />
            ),
          })}
        />
        
      </Drawer.Navigator>
    )
  }
  export default StackScreen;

  
 


