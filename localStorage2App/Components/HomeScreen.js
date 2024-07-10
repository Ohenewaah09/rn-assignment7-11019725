import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ShopItem = ({ item, addToCart, navigateToProductDetail }) => {
    return (
        <View style={styles.shoppingContainer}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <TouchableOpacity onPress={() => addToCart(item)} style={styles.addCircleContainer}>
                <Image source={require('../assets/add_circle.png')} style={styles.addCircle} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateToProductDetail(item)}>
                <Text style={styles.titleText}>{item.title}</Text>
            </TouchableOpacity>
            <Text style={styles.typeText}>{item.category}</Text>
            <Text style={styles.priceText}>{`$${item.price}`}</Text>
        </View>
    );
};

export default function HomeScreen({ navigation }) {
    const openDrawer = () => {
        navigation.openDrawer();
    };

    const [cartItems, setCartItems] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const loadCartItems = async () => {
            try {
                const storedCartItems = await AsyncStorage.getItem('@cart_items');
                if (storedCartItems) {
                    setCartItems(JSON.parse(storedCartItems));
                }
            } catch (error) {
                console.error('Failed to load cart items', error);
            }
        };

        const fetchProducts = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Failed to fetch products', error);
            }
        };

        loadCartItems();
        fetchProducts();
    }, []);

    const addToCart = async (item) => {
        const newItem = { ...item, price: parseFloat(item.price) };
        const newCartItems = [...cartItems, newItem];
        setCartItems(newCartItems);
        try {
            await AsyncStorage.setItem('@cart_items', JSON.stringify(newCartItems));
        } catch (error) {
            console.error('Failed to save cart item', error);
        }
    };

    const navigateToProductDetail = (item) => {
        navigation.navigate('ProductDetail', { product: item });
    };

    const navigateToCart = () => {
        navigation.navigate('Cart');
    };

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.headerList}>
                    <TouchableOpacity onPress={openDrawer}>
                        <Image source={require('../assets/Menu.png')} />
                    </TouchableOpacity>
                    <View style={styles.LogoImage}>
                        <Image source={require('../assets/Logo.png')} />
                    </View>
                    <View style={styles.Search_bagImage}>
                        <Image source={require('../assets/Search.png')} style={styles.SearchImage} />
                        <TouchableOpacity onPress={navigateToCart}>
                            <Image source={require('../assets/shoppingBag.png')} style={styles.bagImage} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.secondHeaderList}>
                    <Text style={styles.headerText}>O U R  S T O R Y</Text>
                    <View style={styles.List_FilterImage}>
                        <View style={styles.ListImage}>
                            <Image source={require('../assets/Listview.png')} />
                        </View>
                        <View style={styles.FilterImage}>
                            <Image source={require('../assets/Filter.png')} />
                        </View>
                    </View>
                </View>
            </View>

            <FlatList
    data={products}
    renderItem={({ item }) => (
        <ShopItem
            item={item}
            addToCart={addToCart}
            navigateToProductDetail={navigateToProductDetail}
        />
    )}
    keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
    numColumns={2}
    contentContainerStyle={styles.flatListContainer}
    columnWrapperStyle={styles.columnWrapper}
/>


            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerList: {
        flexDirection: 'row',
        top: 50,
        left: 30,
    },
    LogoImage: {
        left: 80,
    },
    Search_bagImage: {
        left: 80,
        flexDirection: 'row',
    },
    SearchImage: {
        left: 60,
    },
    bagImage: {
        left: 80,
    },
    secondHeaderList: {
        marginTop: 80,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    List_FilterImage: {
        flexDirection: 'row',
        left: -50,
    },
    headerText: {
        left: 30,
        fontSize: 22,
        fontWeight: '400',
    },
    ListImage: {
        left: 10,
        backgroundColor: '#f6f6f6',
        height: 60,
        width: 60,
        borderRadius: 30,
        padding: 20,
    },
    FilterImage: {
        left: 20,
        backgroundColor: '#f6f6f6',
        height: 60,
        width: 60,
        borderRadius: 30,
        padding: 20,
    },
    flatListContainer: {
        paddingHorizontal: 10,
    },
    columnWrapper: {
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    shoppingContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
        marginHorizontal: 10,
        flex: 1,
        alignItems: 'center',
    },
    itemImage: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
    addCircleContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    addCircle: {
        top: 130,
    },
    titleText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    typeText: {
        fontSize: 14,
        color: '#A9A9A9',
        marginTop: 5,
    },
    priceText: {
        fontSize: 18,
        color: 'red',
        marginTop: 5,
    },
});
