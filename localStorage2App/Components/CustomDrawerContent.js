import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Image source={require('../assets/Close.png')} />
        <Text style={styles.drawerHeaderText}>Adaiah Tsorblewu</Text>
        <View style={styles.lineContainer}>
                        <View style={styles.line} />
                    </View>
      </View>
      <DrawerItemList {...props} />
      {/* <DrawerItem label="Store" labelStyle={styles.drawerText} />
      <DrawerItem label="Locations" labelStyle={styles.drawerText} /> */}
      <DrawerItem label="Blog" labelStyle={styles.drawerText} />
      <DrawerItem label="Jewelry"  labelStyle={styles.drawerText} />
      <DrawerItem label="Electronic" labelStyle={styles.drawerText}  />
      <DrawerItem label="Clothing"  labelStyle={styles.drawerText} />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingVertical: 20,
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
    marginTop:40,
  },
  drawerHeaderText: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: '400',
    color: '#676767',
    marginTop: 20
    
  },
  drawerText:{
    fontSize: 20,
    fontWeight: '400',
   
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
},
line: {
    height: 1,
    backgroundColor: 'red',
    flex: 1,
},
});

export default CustomDrawerContent;
