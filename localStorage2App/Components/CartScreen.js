import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CartScreen() {
    const [cartItems, setCartItems] = useState([]);

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

        loadCartItems();
    }, []);

    const removeFromCart = async (id) => {
        const updatedCartItems = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCartItems);
        try {
            await AsyncStorage.setItem('@cart_items', JSON.stringify(updatedCartItems));
            Alert.alert('Success', 'Item removed from cart');
        } catch (error) {
            console.error('Failed to save cart items', error);
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
    };

    const renderCartItem = ({ item }) => {
        let imageUri = item.image;
        if (typeof imageUri === 'number') {
            imageUri = Image.resolveAssetSource(imageUri).uri;
        } else if (typeof imageUri !== 'string') {
            Alert.alert('Error', 'Invalid image format');
            return null;
        }

        return (
            <View style={styles.cartItem}>
                <Image source={{ uri: imageUri }} style={styles.itemImage} />
                <View style={styles.itemDetails}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <Text style={styles.itemPrice}>{`$${item.price}`}</Text>
                    <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                        <Image source={require('../assets/remove.png')} style={styles.removeImage} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.cartHeader}>
                <Image source={require('../assets/Logo.png')} style={styles.logoStyle} />
                <Image source={require('../assets/Search.png')} style={styles.searchStyle} />
            </View>
            <View style={styles.headerTitle}>
                <Text style={styles.headerTitleText}>C H E C K O U T</Text>
                <View style={styles.lineContainer}>
                    <View style={styles.line} />
                    <View style={styles.diamond} />
                    <View style={styles.line} />
                </View>
            </View>
            <FlatList
                data={cartItems}
                keyExtractor={item => item.id.toString()}
                renderItem={renderCartItem}
            />
            <View style={styles.footerContent}>
                <View style={styles.totalContainer}>
                    <Text style={styles.totalContainerText}>EST. TOTAL</Text>
                    <Text style={styles.totalContainerTotal}>${calculateTotal()}</Text>
                </View>
                <View style={styles.checkoutFooter}>
                    <Image source={require('../assets/shoppingBag.png')} style={styles.shoppingBag} />
                    <Text style={styles.checkoutFooterText}>CHECKOUT</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor:'#fff'
    },
    cartHeader: {
        marginTop:20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    // logoStyle: {
    //     width: 50,
    //     height: 50,
    // },
    searchStyle: {
        left:90
    },
    headerTitle: {
        alignItems: 'center',
        marginVertical: 20,
    },
    headerTitleText: {
        fontSize: 24,
        fontWeight: '400',
    },
    lineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#ccc',
    },
    diamond: {
        width: 10,
        height: 10,
        backgroundColor: '#fff',
        transform: [{ rotate: '45deg' }],
        marginHorizontal: 10,
        borderColor:'#ccc',
        borderWidth:1
    },
    cartItem: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    itemImage: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
        marginRight: 20,
    },
    itemDetails: {
        flex: 1,
        justifyContent: 'center',
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemPrice: {
        fontSize: 16,
        color: 'red',
    },
    removeImage: {
        marginTop: 10,
        left:170
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
      },
      checkoutFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#000',
        borderRadius: 5,
      },
      shoppingBag: {
        width: 20,
        height: 20,
        marginRight: 10,
      },
      checkoutFooterText: {
        color: '#fff',
        fontSize: 22,
      },
      totalContainerText:{
        fontSize: 22,
        // color: '#A9A9A9',
        fontWeight:'300',
      },
      totalContainerTotal:{
        fontSize: 22,
        color:'red'
      },
});
