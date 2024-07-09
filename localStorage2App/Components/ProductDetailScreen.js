import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

export default function ProductDetailScreen({ route, navigation }) {
    const { product } = route.params;

    const openDrawer = () => {
        navigation.openDrawer();
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
        alignItems: 'center',
    },
    productImage: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        marginBottom: 20,
        marginTop:50
    },
    productTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    productCategory: {
        fontSize: 18,
        color: '#A9A9A9',
        marginBottom: 10,
    },
    productPrice: {
        fontSize: 22,
        color: 'red',
        marginBottom: 10,
    },
    productDescription: {
        fontSize: 16,
        color: '#000',
    },
});
