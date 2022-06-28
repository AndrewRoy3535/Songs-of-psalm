import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const FAB = ({goToNextBook, goToPreviousBook}) => {
  const size = 25;
  const color = '#171717';
  return (
    <View style={styles.container}>
      <Pressable style={styles.pressable} onPress={goToPreviousBook}>
        <Ionicons name="chevron-back" color={color} size={size} />
      </Pressable>
      <Pressable style={styles.pressable} onPress={goToNextBook}>
        <Ionicons name="chevron-forward" color={color} size={size} />
      </Pressable>
    </View>
  );
};

export default FAB;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '80%',
    // backgroundColor: 'red',
    height: 45,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pressable: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    backgroundColor: '#a3a3a3',
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOpacity: 0.36,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 10,
    elevation: 10,
  },
});
