import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Image source={require('../assets/Close.png')} />
        <Text style={styles.drawerHeaderText}>Adaiah Tsorblewu</Text>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem label="Store"  />
      <DrawerItem label="Locations" />
      <DrawerItem label="Blog" />
      <DrawerItem label="Jewelry"  />
      <DrawerItem label="Electronic"  />
      <DrawerItem label="Clothing"  />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginTop:40,
  },
  drawerHeaderText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomDrawerContent;
