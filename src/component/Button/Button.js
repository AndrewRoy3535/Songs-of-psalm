import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Button = ({
  title,
  onPress,
  IonicIconName,
  IonicIconSize,
  btnDescripton,
}) => {
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={onPress}>
      <View style={styles.btnIconView}>
        <Ionicons
          name={IonicIconName}
          size={IonicIconSize}
          color="#c9c9c9"
          style={styles.btnIcon}
        />
      </View>
      <View style={styles.btnTextView}>
        <Text style={styles.btnText}>{title}</Text>
        <Text style={styles.btnTextDes}>{btnDescripton}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
    width: '90%',
    backgroundColor: '#171717',
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    paddingVertical: 25,
  },
  btnIconView: {width: '30%', alignItems: 'center'},
  btnIcon: {padding: 9},
  btnTextView: {width: '70%'},
  btnText: {
    fontSize: 17,
    color: '#D3D3D3',
    textTransform: 'uppercase',
  },
  btnTextDes: {color: '#7e5261', fontSize: 12},
});
