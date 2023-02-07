import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import React from 'react';

const GitChapterBtn = ({item, onPress}) => {
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={onPress}>
      <Text style={styles.chapterNo}>{item.bookNo}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    width: 50,
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    margin: '3%',
  },
  chapterNo: {
    fontWeight: '300',
    fontSize: 13,
    color: '#fff',
  },
});

export default GitChapterBtn;
