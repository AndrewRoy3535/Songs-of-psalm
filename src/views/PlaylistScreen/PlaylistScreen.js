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
import TrackPlayer from 'react-native-track-player';

const PlaylistScreen = ({navigation}) => {
  const context = useContext(Contextprovider);
  const {
    audio,
    currentTrack,
    togglePlaybtn,
    playbyId,
    audioFilter,
    setState,
    audioSearch,
  } = context;

  // console.log(audioFilter, 'audioFilter');

  // const renderItem = ({item, index}) => (
  //   <TouchableOpacity
  //     style={styles.playlist_listview}
  //     onPress={() => playbyId(item._id, index)}>
  //     <Ionicons
  //       name={
  //         item._id === currentTrack._id && togglePlaybtn
  //           ? 'ios-pause-circle'
  //           : 'ios-play-circle'
  //       }
  //       size={33}
  //       color={item._id === currentTrack._id ? '#5e8d6a' : '#d3d3d3'}
  //     />
  //     <View style={styles.palylist_title_container}>
  //       <Text style={styles.playlist_song_title}>{item.title}</Text>
  //       <Text style={styles.playlist_song_album}>
  //         নবী দাউদের গান | {item.songNo}
  //       </Text>
  //     </View>
  //   </TouchableOpacity>
  // );
  const renderItem = item => (
    <TouchableOpacity
      style={styles.playlist_listview}
      onPress={() => playAudioById(item)}>
      <Ionicons
        name={
          item.item._id === currentTrack._id && togglePlaybtn
            ? 'ios-pause-circle'
            : 'ios-play-circle'
        }
        size={33}
        color={item.item._id === currentTrack._id ? '#5e8d6a' : '#d3d3d3'}
      />
      <View style={styles.palylist_title_container}>
        <Text style={styles.playlist_song_title}>{item.item.title}</Text>
        <Text style={styles.playlist_song_album}>
          নবী দাউদের গান | {item.item.songNo}
        </Text>
      </View>
    </TouchableOpacity>
  );

  // const memoizedValue = useMemo(() => renderItem, [audio]);
  // const memoizedValue = useCallback(item => renderItem(item), [audioFilter]);

  const playAudioById = async item => {
    //check if the Track was added
    var list = await TrackPlayer.getQueue();
    let selectedIndex = 0;
    let selectedTrack = list.find((track, index) => {
      if (track._id == item.item._id) {
        selectedIndex = index;
        setState({...context, togglePlaybtn: true});
        return true;
      }
    });
    if (selectedTrack == undefined) {
      //not added then add to the queue
      await TrackPlayer.add({
        id: item.item._id,
        url: encodeURI(item.url),
        title: item.item.title,
      });
      list = await TrackPlayer.getQueue();
      selectedIndex = list.length - 1;
    }
    // skip to selected index then play
    await TrackPlayer.skip(selectedIndex);
    await TrackPlayer.play();
  };

  const onSearchEnter = async text => {
    if (text) {
      newData = audio.filter(item => {
        const itemData = item.songNo
          ? item.songNo.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
        // return itemData.includes(textData);
      });
      setState({...context, audioFilter: newData, audioSearch: text});
    } else {
      setState({...context, audioFilter: audio, audioSearch: text});
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
          <TextInput
            placeholder="Search"
            placeholderTextColor="#fff"
            style={{color: '#fff'}}
            value={audioSearch}
            onChangeText={text => onSearchEnter(text)}
          />
        </View>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        // data={audio}
        data={audioFilter}
        // renderItem={({item, index}) => renderItem({item, index})}
        renderItem={item => renderItem(item)}
        // renderItem={memoizedValue}
        removeClippedSubviews={true}
        maxToRenderPerBatch={15}
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
