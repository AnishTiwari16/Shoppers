import React,{useEffect, useState, useCallback, useLayoutEffect} from 'react';
import { FlatList, Button, ActivityIndicator,View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import * as productsActions from '../../store/actions/product';
import Colors from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';


const ProductsOverviewScreen = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRefresing, setIsRefresing] = useState(false);
    const [error, setError] = useState();
   
    useLayoutEffect(()=>{
        props.navigation.setOptions({
            headerRight: () => (
                <View style={{marginLeft:20}}>
                    <TouchableOpacity>
                        <Text>10</Text>
                    <Ionicons style = {{marginHorizontal: 10, overflow: 'hidden'}} 
                    name="md-cart" size={24} color= 'white'
                    onPress = {()=> {
                    props.navigation.navigate('cart')
                    }}
                    />
                   </TouchableOpacity> 
                </View>
               
            ),
        })
    })
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    const loadedProducts = useCallback(async() => {
        setError(null);
        setIsRefresing(true);
        try{
            await dispatch(productsActions.fetchProduct());
        }
        catch(err){
            setError(err.message);
        }
        setIsRefresing(false);
    },[dispatch, setIsLoading, setError]);

    useEffect(() => {   
        setIsLoading(true); 
        loadedProducts().then(() => {
            setIsLoading(false);
        });
    },[dispatch, loadedProducts]);

    const selectItemHandler = (id, title) => {
        props.navigation.navigate('productdetail', {
            productId: id,
            productTitle: title
        }); 
    }
    if(error){
        return(
            <View style = {styles.loader}>
                <Text>An Error Occured</Text>
                <Button title = 'Try Again' onPress = {loadedProducts} color = {Colors.primary}/>
            </View>
        )
    }
    if(isLoading){
        return(
        <View  style = {styles.loader}>
            <ActivityIndicator size = 'large' color = {Colors.primary}/>
        </View>
        )
    }
    if(!isLoading && products.length === 0){
        return(
        <View style = {styles.loader}>
            <Text>No Product found. Maybe start adding some!</Text>
        </View>
    );
    }
    return (
    <FlatList 
        onRefresh={loadedProducts}
        refreshing = {isRefresing}
        data = {products}
        renderItem = {itemData => 
        <ProductItem 
            image = {itemData.item.imageUrl}  //give the url to the image
            title = {itemData.item.title}
            price = {itemData.item.price}

            onSelect = {()=> {
                selectItemHandler(itemData.item.id, itemData.item.title);                    
            }}
        >
            <Button 
            color = {Colors.primary} 
            title="View Details" 
            onPress = {()=> {
                selectItemHandler(itemData.item.id, itemData.item.title);      
            }} />

            <Button 
            color = {Colors.primary} 
            title="To Cart" 
            onPress = {() => {
                dispatch(cartActions.addToCart(itemData.item));
            }} />

        </ProductItem>
    }
    />
    );
};
export default ProductsOverviewScreen;

const styles = StyleSheet.create({
    loader:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})