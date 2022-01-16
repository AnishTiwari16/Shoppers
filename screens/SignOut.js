import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import Colors from '../constants/Colors'
import {auth} from '../firebase/firebase';

const SignOut = (props) => {
    const signOutFunc = () => {
        auth.signOut().then(() => {
            props.navigation.replace('login');
        })
    }
    return (
        <View>
            <Text>Thanks for Downloading</Text>
            <View style = {styles.btn}>
            <Button title = 'Sign Out' color = {Colors.primary} 
                onPress = {signOutFunc}
            />
            </View>
        </View>
    )
}

export default SignOut

const styles = StyleSheet.create({
    btn:{
        padding: 20,
        width: '70%',
        top: 100,
    }
})
