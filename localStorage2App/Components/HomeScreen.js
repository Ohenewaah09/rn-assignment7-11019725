import { useState } from 'react';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, FlatList,TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const data =[
    {id:1, image: require('../assets/dress1.png'), title: 'Office Wear', type:'reversible angora cardigan', price: '$120' },
    {id:2, image: require('../assets/dress2.png'), title: 'Black', type:'reversible angora cardigan', price: '$120' },
    {id:3, image: require('../assets/dress3.png'), title: 'Church Wear', type:'reversible angora cardigan', price: '$120' },
    {id:4, image: require('../assets/dress4.png'), title: 'Lamerei', type:'reversible angora cardigan', price: '$120' },
    {id:5, image: require('../assets/dress5.png'), title: '21WN', type:'reversible angora cardigan', price: '$120' },
    {id:6, image: require('../assets/dress6.png'), title: 'Lopo', type:'reversible angora cardigan', price: '$120' },
    {id:7, image: require('../assets/dress7.png'), title: '21WN', type:'reversible angora cardigan', price: '$120' },
    {id:8, image: require('../assets/dress3.png'), title: 'Lamerei', type:'reversible angora cardigan', price: '$120' },
];


  
const ShopItem = ({ image, title, type, price, addToCart }) => (
    <View style={styles.ShoppingContainer}>
      <Image source={image} style={styles.itemImage} />
      <TouchableOpacity onPress={addToCart}>
        <Image source={require('../assets/add_circle.png')} style={styles.addCircle} />
      </TouchableOpacity>
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.typeText}>{type}</Text>
      <Text style={styles.priceText}>{price}</Text>
    </View>
  );
  
  export default function HomeScreen({ navigation }) {
    const openDrawer = () => {
      navigation.openDrawer();
    };
  
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
  
    const addToCart = async (item) => {
      const newCartItems = [...cartItems, item];
      setCartItems(newCartItems);
      try {
        await AsyncStorage.setItem('@cart_items', JSON.stringify(newCartItems));
      } catch (error) {
        console.error('Failed to save cart item', error);
      }
    };
  
    const navigateToCart = () => {
      navigation.navigate('CartScreen', { cartItems });
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
            <Text style={styles.headerText}>O U R S T O R Y</Text>
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
          data={data}
          renderItem={({ item }) => (
            <ShopItem
              image={item.image}
              title={item.title}
              type={item.type}
              price={item.price}
              addToCart={() => addToCart(item)}
            />
          )}
                keyExtractor={item => item.id}
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
    //   alignItems: 'center',
    //   justifyContent: 'center',
    },
    headerList:{
        flexDirection:'row',
        top:50,
        left:30
    },
    LogoImage:{
        left:80
    },
    Search_bagImage:{
        left:80,
        flexDirection:'row',  
    },
    SearchImage:{
        left:60
    },
    bagImage:{
        left:80
    },
    secondHeaderList:{
        marginTop:80,
        flexDirection:'row',
        justifyContent: 'space-between'
    },
    List_FilterImage:{
        flexDirection:'row',
        left:-50  
    },
    headerText:{
        left:30,
        fontSize:22,
        fontWeight:'400'
    },
    ListImage:{
        left:10,
        backgroundColor:'#f6f6f6',
        height:60,
        weight:60,
        borderRadius:30,
        padding:20
    },
    FilterImage:{
         left:20,
        backgroundColor:'#f6f6f6',
        height:60,
        weight:60,
        borderRadius:30,
        padding:20
    },
   
    columnWrapper: {
        justifyContent: 'space-evenly',
    },
    addCircle:{
        top:-30,
        left:130
    },
    titleText:{
        top:-20,
        fontSize: 22,
    },
    typeText:{
        top:-20,
        fontSize: 14,
        color: '#A9A9A9',
    },
    priceText:{
        top:-20,
        fontSize: 20,
        color: 'red',
    }
  });
  