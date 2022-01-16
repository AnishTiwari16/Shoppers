import { StatusBar } from 'expo-status-bar'
import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from 'firebase/auth';
import React, {useState, useEffect} from 'react'
import { StyleSheet, Text,View,TextInput, Button, KeyboardAvoidingView} from 'react-native'
import {auth} from '../firebase/firebase';

const RegisterScreen = ({navigation}) => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
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
    const register = () => {
        createUserWithEmailAndPassword(auth, email,password)
        .then(() => {
            updateProfile(auth.currentUser, {
                displayName: name,
                number: phone,
            })
        }).catch((err) => {
            alert('Invalid Credentials');
            console.log(err);
        })
    }

    return (
        <KeyboardAvoidingView behavior='padding' style = {styles.container}>
            <StatusBar stype = 'light'/>
            <View style = {styles.inputContainer}>
                <TextInput 
                placeholder='Full Name'
                autoFocus
                type = 'text'
                keyboardType='default'
                value = {name}
                onChangeText={(text) => setName(text)}
                />
                <TextInput 
                placeholder='Phone Number'
                type = 'number'
                keyboardType='numeric'
                value = {phone}
                onChangeText={(text) => setPhone(text)}
                />
                <TextInput 
                placeholder='Email'
                type = 'email'
                value = {email}
                onChangeText={(text) => setEmail(text)}
                />
                <TextInput 
                placeholder='Password'
                type = 'password'
                secureTextEntry
                value = {password}
                onChangeText={(text) => setPassword(text)}
                />
                <View style = {styles.button}>
                    <Button title = 'Register' onPress={register}/>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white',
    },
    inputContainer: {
        width: 300,
    },
    button: {
        width: 200,
        marginTop: 20,
    }
})
