import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useContext, useMemo, useCallback} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Contextprovider} from '../../Context/Context';

function PlaylistScreen({navigation}) {
  const context = useContext(Contextprovider);
  const {
    audio,
    currentTrack,
    togglePlaybtn,
    playbyId,
    audioFilter,
    setState,
    audioSearch,
    onSearchEnter,
  } = context;

  function renderItem(item) {
    return (
      <TouchableOpacity
        style={styles.playlist_listview}
        onPress={() => playbyId(item)}>
        <Ionicons
          name={
            item.item._id === currentTrack._id && togglePlaybtn
              ? 'ios-pause-circle'
              : 'ios-play-circle'
          }
          size={33}
          color={item.item._id === currentTrack._id ? '#1db954' : '#d3d3d3'}
        />
        <View style={styles.palylist_title_container}>
          <Text style={styles.playlist_song_title}>{item.item.title}</Text>
          <Text style={styles.playlist_song_album}>
            নবী দাউদের গান | {item.item.songNo}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  // const memoizedValue = useMemo(() => renderItem, [audio]);
  // const memoizedValue = useCallback(item => renderItem(item), [audioFilter]);

  function keyExtractor(item) {
    return item._id;
  }

  return (
    <SafeAreaView style={styles.playlist_container}>
      <View style={styles.playlist_header}>
        <TouchableOpacity
          style={styles.palylist_header_touchable_opacity}
          onPress={() => navigation.navigate('Songs')}>
          <AntDesign name="left" size={25} color="#D3D3D3" />
        </TouchableOpacity>
        <View style={styles.playlist_search_container}>
          <AntDesign
            name="search1"
            size={20}
            color="#fff"
            style={styles.palylist_search_icon}
          />
          <TextInput
            placeholder="Search"
            placeholderTextColor="#fff"
            style={{color: '#fff', width: '85%'}}
            value={audioSearch}
            onChangeText={text => onSearchEnter(text)}
          />
        </View>
        <View style={styles.emptyContainer}></View>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={audioFilter}
        renderItem={item => renderItem(item)}
        removeClippedSubviews={true}
        keyExtractor={keyExtractor}
      />
    </SafeAreaView>
  );
}

export default PlaylistScreen;

const styles = StyleSheet.create({
  playlist_container: {
    flex: 1,
    backgroundColor: '#171717',
  },
  playlist_header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  palylist_header_touchable_opacity: {
    // borderWidth: 1,
    width: '17%',
    padding: 7,
    borderRadius: 50,
  },
  emptyContainer: {
    width: '17%',
    height: '100%',
    // backgroundColor: '#fff',
  },
  playlist_search_container: {
    width: '55%',
    height: 40,
    backgroundColor: '#1db954',
    justifyContent: 'center',
    borderRadius: 50,
    borderColor: 'grey',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 3,
  },
  palylist_search_icon: {
    marginHorizontal: 5,
  },
  playlist_body: {
    flex: 10,
    width: '100%',
    // borderWidth: 1,
    padding: 10,
  },
  playlist_listview: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#bbbbbb',
    padding: 5,
  },
  palylist_title_container: {
    marginLeft: 10,
  },
  playlist_song_title: {
    fontSize: 15,
    color: '#d3d3d3',
  },
  playlist_song_album: {
    fontSize: 12,
    color: '#d3d3d3',
  },
});
