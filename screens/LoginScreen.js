import { StatusBar } from 'expo-status-bar'
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, Button, TextInput } from 'react-native'
import {auth} from '../firebase/firebase';

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, authUser => {
            if(authUser){
                navigation.replace('allproduct');
            }
          });
          return unsubscribe;
    },[])

    const signIn = () => {
        signInWithEmailAndPassword(auth, email,password)
        .then(() => {
            onAuthStateChanged(auth, authUser => {
                if(authUser){
                    navigation.replace('allproduct');
                }
            })
        })
        .catch(() => {
            alert("Invalid Credentials");
        })
    }
    return (
        <View style = {styles.container}>
            <StatusBar styel = 'light'/>
            <Text>Welcome</Text>
            <View style = {styles.inputContainer}> 
                <TextInput 
                    placeholder='Email'
                    autoFocus
                    type = 'email'
                    value = {email}
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput 
                    placeholder='Password'
                    secureTextEntry
                    type = 'password'
                    value = {password}
                    onChangeText={(text) => setPassword(text)}
                />
                <View style = {styles.change1}>
                <Button title = "Login" onPress={signIn}/>
                </View>
                <View style = {styles.change2}>
                <Button title = 'Register' onPress = {() => navigation.navigate('Register')} />
                </View>
                <View style = {{height: 100}}/>
            </View>
        </View> 
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white',
    },
    change1: {
        width: 200,
        marginTop: 10,
    },
    change2: {
        width: 200,
        marginTop: 10,
    },
})
