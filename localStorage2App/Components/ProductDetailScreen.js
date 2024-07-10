import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProductDetailScreen({ route, navigation }) {
    const { product } = route.params;

    const openDrawer = () => {
        navigation.openDrawer();
    };

    const addToCart = async (item) => {
        try {
            const existingCart = await AsyncStorage.getItem('@cart_items');
            let cartItems = existingCart ? JSON.parse(existingCart) : [];
            cartItems.push(item);
            await AsyncStorage.setItem('@cart_items', JSON.stringify(cartItems));
        } catch (error) {
            console.error('Failed to add item to cart', error);
        }
    };

    const handleAddToCart = () => {
        addToCart(product);
        navigation.navigate('Cart');
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerList}>
                <TouchableOpacity onPress={openDrawer}>
                    <Image source={require('../assets/Menu.png')} />
                </TouchableOpacity>
                <View style={styles.LogoImage}>
                    <Image source={require('../assets/Logo.png')} />
                </View>
                <View style={styles.Search_bagImage}>
                    <Image source={require('../assets/Search.png')} style={styles.SearchImage} />
                    <TouchableOpacity>
                        <Image source={require('../assets/shoppingBag.png')} style={styles.bagImage} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.productDetails}>
                <Image source={{ uri: product.image }} style={styles.productImage} />
                <Text style={styles.productTitle}>{product.title}</Text>
                <Text style={styles.productCategory}>{product.category}</Text>
                <Text style={styles.productPrice}>{`$${product.price}`}</Text>
                <Text style={styles.productDescription}>{product.description}</Text>

                <View style={styles.DescriptionInfo}>
                    <View style={styles.DescriptionInfo1}>
                        <Image source={require('../assets/Do Not Bleach.png')} style={styles.DescriptionImage} />
                        <Text style={styles.TEXTStyle}>Do Not Bleach</Text>
                    </View>
                    <View style={styles.DescriptionInfo2}>
                        <Image source={require('../assets/Do Not Tumble Dry.png')} style={styles.DescriptionImage} />
                        <Text style={styles.TEXTStyle}>Do Not Tumble Dry</Text>
                    </View>
                    <View style={styles.DescriptionInfo3}>
                        <Image source={require('../assets/Do Not Wash.png')} style={styles.DescriptionImage} />
                        <Text style={styles.TEXTStyle}>Dry clean with tetrachloroethylene</Text>
                    </View>
                    <View style={styles.DescriptionInfo4}>
                        <Image source={require('../assets/Iron Low Temperature.png')} style={styles.DescriptionImage} />
                        <Text style={styles.TEXTStyle}>Iron at a maximum of 110oC/230oF</Text>
                    </View>

                    <View style={styles.lineContainer}>
                        <View style={styles.line} />
                    </View>

                    <View style={styles.ShippingInfo}>
                        <Image source={require('../assets/Shipping.png')} />
                        <View>
                        <Text style={styles.TEXTStylez}>Free Flat Rate Shipping</Text>
                            <Text style={styles.TEXTStyle}>Estimated to be delivered on</Text>
                            <Text style={styles.TEXTStyle}>09/11/2021 - 12/11/2021.</Text>
                        </View>
                        <View>
                            <Image source={require('../assets/Up.png')} />
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.footerContent}>
                <TouchableOpacity style={styles.checkoutFooter} onPress={handleAddToCart}>
                    <Image source={require('../assets/icons8-plus-64.png')} style={styles.checkoutFooterImage} />
                    <Text style={styles.checkoutFooterText}>ADD TO BASKET</Text>
                    <Image source={require('../assets/icons8-heart-50.png')} style={styles.checkoutFooterImage} />
                </TouchableOpacity>
            </View>
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
    productDetails: {
        padding: 20,
    },
    productImage: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        marginBottom: 20,
        marginTop: 50,
        left: 90,
    },
    productTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    productCategory: {
        fontSize: 18,
        color: '#A9A9A9',
        marginBottom: 4,
    },
    productPrice: {
        fontSize: 22,
        color: 'red',
        marginBottom: 8,
    },
    productDescription: {
        fontSize: 16,
        color: '#A9A9A9',
    },
    DescriptionInfo1: {
        flexDirection: 'row',
        marginTop: 30,
        color: '#A9A9A9',
        fontSize:18
    },
    DescriptionInfo2: {
        flexDirection: 'row',
        color: '#A9A9A9',
    },
    DescriptionInfo3: {
        flexDirection: 'row',
        color: '#A9A9A9',
    },
    DescriptionInfo4: {
        flexDirection: 'row',
        color: '#A9A9A9',
    },
    lineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    line: {
        height: 1,
        backgroundColor: '#A9A9A9',
        flex: 1,
    },
    footerContent: {
        backgroundColor: '#fff',
        padding: 20,
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    checkoutFooter: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: '#000',
        borderRadius: 5,
        padding: 20,
    },
    checkoutFooterText: {
        color: '#fff',
        fontSize: 22,
    },
    ShippingInfo: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    DescriptionImage: {
        marginRight: 12,
    },
    checkoutFooterImage: {
        height: 30,
        width: 30,
    },
    TEXTStyle:{
        color:'#A9A9A9',
        fontSize:16
    },
    TEXTStylez:{
        fontSize:16,
        fontWeight:'400'
    }
});
