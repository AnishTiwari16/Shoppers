import React, {useLayoutEffect, useReducer} from 'react'
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import * as productsActions from '../../store/actions/product';
import { AntDesign } from "@expo/vector-icons";

const FORM_INPUT_UPDATE = 'UPDATE'
const formReducer = (state,action) => {
    if(action.type === FORM_INPUT_UPDATE){
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidites = {
            ...state.inputValidites,
            [action.input]: action.isValid
        };
        let updatedFormIsValid = true;
        for(const key in updatedValidites){
            updatedFormIsValid = updatedFormIsValid && updatedValidites[key];
        }
        return {
            formisValid: updatedFormIsValid,
            inputValues: updatedValues,
            inputValidites: updatedValidites
        };
    }
    return state;
} 
const EditProductScreen = ({navigation, route}) => {
    const prodId = route.params?.productId;
    const editedProduct = useSelector(state => 
        state.products.userProducts.find(prod => prod.id === prodId));
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: editedProduct ? editedProduct.title : '',
            imageUrl: editedProduct ? editedProduct.imageUrl : '',
            description: editedProduct ? editedProduct.description : '',
            price: ''
        }, 
        inputValidites: {
            title: editedProduct ? true : false,
            imageUrl: editedProduct ? true : false,
            description: editedProduct ? true : false,
            price: editedProduct ? true : false,
        }, 
        formisValid: editedProduct ? true : false,
    });

    const submitHandler =()=> {
        if(!formState.formisValid){
            Alert.alert("Wrong input!, Please check the crendentials")
            return;
        }
        if(editedProduct){
            dispatch(
                productsActions.updateProduct(
                    prodId, 
                    formState.inputValues.title, 
                    formState.inputValues.description,
                    formState.inputValues.imageUrl
                    )
            );
            // navigation.replace('userProduct');
        }
        else{
            dispatch(
                productsActions.createProduct(
                    formState.inputValues.title, 
                    formState.inputValues.description,
                    formState.inputValues.imageUrl,
                    +formState.inputValues.price
                    )
            );
        }
        navigation.replace('userProduct');
    };

    const textChangeHandler = (inputIdentifier, text) => {
        let isValid = false;
        if(text.trim().length >0){
            isValid = true;
        }
     dispatchFormState({
        type: FORM_INPUT_UPDATE, 
        value: text,
        isValid: isValid,
        input: inputIdentifier
    });
    }
    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: "#F0851B",
            },
            headerRight: () => (
                <View style={{ marginLeft: 20 }}>
          <TouchableOpacity style={{ marginRight: 20 }} onPress={submitHandler}>
            <AntDesign name="save" size={30} color="black" />
          </TouchableOpacity>
        </View>
            )
        })
    })

    return (
        
        <ScrollView>
            <View style = {styles.form}>
        <View style = {styles.formControl}>
            <Text style = {styles.label}>Title</Text>
            <TextInput 
            style = {styles.input} 
            value={formState.inputValues.title} 
            onChangeText = {textChangeHandler.bind(this, 'title')}
            keyboardType='default'
            autoCapitalize='sentences'
            autoCorrect
            returnKeyType='next'

            />
            {!formState.inputValidites.title && <Text>Please enter a valid title!</Text>}
        </View>
        
        <View style = {styles.formControl}>
            <Text style = {styles.label}>Image Url</Text>
            <TextInput 
            style = {styles.input}
            value={formState.inputValues.imageUrl}   
            onChangeText = {textChangeHandler.bind(this, 'imageUrl')}
            />
        </View>

        {editedProduct ? null : (
        <View style = {styles.formControl}>
            <Text style = {styles.label}>Price</Text>
            <TextInput 
            style = {styles.input}
            value={formState.inputValues.price} 
            onChangeText = {textChangeHandler.bind(this, 'price')}
            />
        </View>
        )}
        <View style = {styles.formControl}>
            <Text style = {styles.label}>Description</Text>
            <TextInput 
            style = {styles.input}
            value={formState.inputValues.description} 
            onChangeText = {textChangeHandler.bind(this, 'description')}
            />
        </View>
        </View>
        </ScrollView>
    )
}

export default EditProductScreen;

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    formControl: {
        width: '100%'
    },
    label : {
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    }
})
