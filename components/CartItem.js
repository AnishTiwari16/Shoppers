import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CartItem = (props) => {

    return (
        <View style = {styles.cartItem}>
            <Text style = {styles.itemData}>
                <Text style = {styles.quantity}>{props.quantity} </Text> 
                <Text style = {styles.mainText}>{props.title}</Text>
            </Text>
            <View style = {styles.itemData}>
                <Text style = {styles.mainText}>${props.amount}</Text>
                {props.deletable && (
                <TouchableOpacity onPress = {props.onRemove} style = {StyleSheet.deleteButton}>
                    <Ionicons 
                        name = 'md-trash'
                        size = {23}
                        color = 'red'
                    />
                </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cartItem: {
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    quantity: {
        color: '#888',
        fontSize: 16
    },
    mainText: {
        fontSize: 16
    },

    deleteButton: {
        marginLeft: 20
    }
});

export default CartItem;