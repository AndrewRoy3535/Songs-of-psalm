import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const FAB = ({goToNextBook, goToPreviousBook}) => {
  const size = 25;
  const color = '#171717';
  return (
    <View style={styles.container}>
      <Pressable style={styles.pressable}>
        <Ionicons
          name="chevron-back"
          color={color}
          size={size}
          onPress={goToPreviousBook}
        />
      </Pressable>
      <Pressable style={styles.pressable}>
        <Ionicons
          name="chevron-forward"
          color={color}
          size={size}
          onPress={goToNextBook}
        />
      </Pressable>
    </View>
  );
};

export default FAB;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
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
    paddingHorizontal: 7,
    marginHorizontal: 10,
    backgroundColor: '#a3a3a3',
    borderRadius: 100,
  },
});
