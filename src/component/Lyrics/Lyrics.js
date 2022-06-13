import React, {useContext} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Contextprovider} from '../../Context/Context';
import AntDesign from 'react-native-vector-icons/AntDesign';
const BlockContent = require('@sanity/block-content-to-react');
import {PortableText} from '@portabletext/react';

const Lyrics = ({navigation}) => {
  const context = useContext(Contextprovider);
  const {currentTrack} = context;
  // console.log('currentTrack', currentTrack);

  return (
    <View style={styles.lyricsMainContainer}>
      <View style={styles.go_back_frm_lyrics}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Songs')}
          style={styles.touchable_opacity_back_lyrics}>
          <AntDesign name="left" size={25} color="#D3D3D3" />
        </TouchableOpacity>
      </View>
      <View style={styles.lyricsContainer}>
        <ScrollView
          style={{width: '90%'}}
          showsVerticalScrollIndicator={false}
          overScrollMode="never">
          {currentTrack.lyrics.map(({children}) =>
            children.map(({text, _key}) => (
              <View style={styles.textContainer} key={_key}>
                <Text style={styles.text_style}>{text}</Text>
              </View>
            )),
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default Lyrics;

const styles = StyleSheet.create({
  lyricsMainContainer: {
    flex: 1,
    backgroundColor: '#171717',
  },
  go_back_frm_lyrics: {
    justifyContent: 'center',
    // backgroundColor: 'red',
    paddingVertical: 7,
    // borderBottomWidth: 1,
  },
  touchable_opacity_back_lyrics: {
    // borderWidth: 1,
    width: '17%',
    padding: 7,
    borderRadius: 50,
  },
  lyricsContainer: {
    flex: 1,
    alignItems: 'center',
    // borderWidth: 1,
    // margin: '3%',
  },
  textContainer: {},
  text_style: {textAlign: 'justify', color: '#d3d3d3', fontSize: 15},
});
