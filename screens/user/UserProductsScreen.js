import React from 'react'
import { StyleSheet,Button ,FlatList } from 'react-native'
import ProductItem from '../../shop/ProductItem';
import {useSelector, useDispatch} from 'react-redux';
import Colors from '../../constants/Colors';
import * as productsActions from '../../store/actions/product';

const UserProductsScreen = ({navigation}) => {
const dispatch = useDispatch();
const userProducts = useSelector(state => state.products.userProducts);

    const editProductHandler = (id) => {
        navigation.navigate('edit', {productId: id});   //route name , params
    }
    return (
        <FlatList data = {userProducts}
        keyExtractor={item => item.id}
        renderItem = {itemData => (
            <ProductItem 
                image = {itemData.item.imageUrl}
                title = {itemData.item.title}
                price = {itemData.item.price}
                onSelect = {() => {
                    editProductHandler(itemData.item.id);
                }}
            >
                <Button 
            color = {Colors.primary} 
            title="Edit" 
            onPress = {()=> {
                editProductHandler(itemData.item.id);
            }} />

            <Button 
            color = {Colors.primary} 
            title="Delete" 
            onPress = {() => {
                dispatch(productsActions.deleteProduct(itemData.item.id));
            }} />

            </ProductItem>
        )}
        
        />
    )
}

export default UserProductsScreen

const styles = StyleSheet.create({})
