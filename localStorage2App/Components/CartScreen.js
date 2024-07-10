import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
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
        } catch (error) {
            console.error('Failed to save cart items', error);
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={cartItems}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.cartItem}>
                        <Image source={{ uri: item.image }} style={styles.itemImage} />
                        <View style={styles.itemDetails}>
                            <Text style={styles.itemTitle}>{item.title}</Text>
                            <Text style={styles.itemPrice}>{`$${item.price}`}</Text>
                            <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                                <Image source={require('../assets/remove.png')} style={styles.removeImage} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
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
        width: 24,
        height: 24,
        marginTop: 10,
    },
});
