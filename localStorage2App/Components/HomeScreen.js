import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, FlatList,TouchableOpacity } from 'react-native';

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

const ShopItem = ({ image, title, type, price }) => (
    <View style={styles.ShoppingContainer}>
        <Image source={image} />
        <Image source={require('../assets/add_circle.png')} />
        <Text>{title}</Text>
        <Text>{type}</Text>
        <Text>{price}</Text>
    </View>
);

export default function HomeScreen({navigation}) {
    const openDrawer = () => {
        navigation.openDrawer();
    };
    return (
      <View style={styles.container}>   
        <View>
            <View style={styles.headerList}>
            <TouchableOpacity onPress={openDrawer}>
                        <Image source={require('../assets/Menu.png')} />
                    </TouchableOpacity>
                <View style={styles.LogoImage}>
                <Image source={require('../assets/Logo.png')}/>
                </View>
                <View style={styles.Search_bagImage}>
                    <Image source={require('../assets/Search.png')} style={styles.SearchImage}/>
                    <Image source={require('../assets/shoppingBag.png')} style={styles.bagImage}/> 
                </View>
            </View>

            <View style={styles.secondHeaderList}>
                <Text style={styles.headerText}>O U R  S T O R Y</Text>
                <View style={styles.List_FilterImage}>
                    <View style={styles.ListImage}>
                    <Image source={require('../assets/Listview.png')}/>
                    </View>
                    <View style={styles.FilterImage}>
                    <Image source={require('../assets/Filter.png')}/>
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
  });
  