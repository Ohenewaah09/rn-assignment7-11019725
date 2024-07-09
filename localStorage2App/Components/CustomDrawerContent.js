import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
       <Text>Adaiah Tsorblewu</Text>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Help"
        onPress={() => alert('Link to help')}
      />
      <DrawerItem label="Store"/>
      <DrawerItem label="Locations"/>
      <DrawerItem label="Blog"/>
      <DrawerItem label="Jewelery"/>
      <DrawerItem label="Electronic"/>
      <DrawerItem label="Clothing"/>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f50057'
  },
 
  drawerHeaderText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default CustomDrawerContent;
