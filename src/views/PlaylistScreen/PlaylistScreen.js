import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useContext} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Contextprovider} from '../../Context/Context';
import TrackPlayer, {State, Event} from 'react-native-track-player';

const PlaylistScreen = ({navigation}) => {
  const context = useContext(Contextprovider);
  const {audio, currentTrack, togglePlay, togglePlaybtn, setState} = context;

  const renderItem = ({item, index}) => (
    // console.log(el),
    <TouchableOpacity
      style={styles.playlist_listview}
      onPress={() => playbyId(item._id, index)}>
      <Ionicons
        name={
          item._id === currentTrack._id && togglePlaybtn
            ? 'ios-pause-circle'
            : 'ios-play-circle'
        }
        size={33}
        color="#5e8d6a"
      />
      <View style={styles.palylist_title_container}>
        <Text style={styles.playlist_song_title}>{item.title}</Text>
        <Text style={styles.playlist_song_album}>Songs of psalm</Text>
      </View>
    </TouchableOpacity>
  );

  // console.log(audio);

  const playbyId = async (id, index) => {
    if (id === currentTrack._id) {
      return togglePlay();
    }

    if (id !== currentTrack._id) {
      await TrackPlayer.stop();
      setState({...context, togglePlaybtn: true});
      await TrackPlayer.skip(index);
      return await TrackPlayer.play(index);
    }
  };

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
          <TextInput placeholder="Search" placeholderTextColor="#fff" />
        </View>
      </View>
      <FlatList
        data={audio}
        // renderItem={renderItem}
        renderItem={({item, index}) => renderItem({item, index})}
        keyExtractor={item => item._id}
      />
    </SafeAreaView>
  );
};

export default PlaylistScreen;

const styles = StyleSheet.create({
  playlist_container: {
    flex: 1,
    backgroundColor: '#171717',
  },
  playlist_header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  palylist_header_touchable_opacity: {
    // borderWidth: 1,
    width: '17%',
    padding: 7,
    borderRadius: 50,
  },
  playlist_search_container: {
    borderWidth: 1,
    borderRadius: 50,
    borderColor: 'grey',
    width: '70%',
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 3,
  },
  palylist_search_icon: {
    marginHorizontal: 10,
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
