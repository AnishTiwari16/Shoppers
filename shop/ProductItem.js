import React from 'react';
import {StyleSheet, Text,
        View, Image, 
        TouchableNativeFeedback} from 'react-native';

const ProductItem = (props) => {
    let TouchableCmp = TouchableNativeFeedback;
    return (
        <View style = {styles.product}>
            <View style = {styles.touchable}>
        <TouchableCmp onPress = {props.onSelect} useForeground>
            <View>
        <View style = {styles.imageContainer}>
        <Image style = {styles.image} source = {{uri: props.image}} />
        </View>
        <View style = {styles.details}>
            <Text style = {styles.title}>{props.title}</Text>
            <Text style = {styles.price}>${props.price}</Text>
        </View>
            <View style = {styles.actions}>
                {props.children}
            </View>
            </View>
    </TouchableCmp>
    </View>
    </View>
    );
};

const styles = StyleSheet.create({
    product: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 300,
        margin: 20,
    },
    touchable: {
        overflow: 'hidden',
        borderRadius: 10
    },
    image: {
        width: '100%',
        height: '100%'
    },
    imageContainer: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    },

    title: {
        fontSize: 18,
        marginVertical: 4
    },
    price: {
        fontSize: 14,
        color: '#888'
    },
    details: {
        alignItems: 'center',
        height: '20%',
        padding: 10
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '15%',
        paddingHorizontal: 20,
    }
});

export default ProductItem;