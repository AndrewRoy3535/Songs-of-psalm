import React, {createContext, useState, useEffect} from 'react';
import sanity from '../lib/sanity';
import TrackPlayer, {
  State,
  Event,
  useTrackPlayerEvents,
  RepeatMode,
} from 'react-native-track-player';

export const Contextprovider = createContext();

export function Context({children}) {
  const [state, setState] = useState({
    audio: [],
    togglePlaybtn: false,
    currentTrack: {},
    isLoading: true,
    audioFilter: [],
    audioSearch: '',
    repeat: 'off',
    book: [],
  });

  const {
    audio,
    togglePlaybtn,
    currentTrack,
    isLoading,
    audioFilter,
    audioSearch,
    repeat,
    book,
  } = state;

  // async function fetchData() {
  //   const query = `*[_type == "song"] {title,songNo,filename,lyrics,_id,"url":song.asset->url}| order(songNo asc)`;
  //   const result = await sanity.fetch(query);
  //   setState({...state, audio: result, audioFilter: result});
  // }
  async function fetchData() {
    const query = `*[_type == "song"] {title,songNo,filename,lyrics,_id,"url":song.asset->url}| order(songNo asc)`;
    const query1 = `*[_type == "bookOfpsalm"] {_id, title, bookNo, bookDescription} | order(bookNo)`;
    const result = await sanity.fetch(query);
    const result1 = await sanity.fetch(query1);
    setState({...state, audio: result, audioFilter: result, book: result1});
  }

  useEffect(() => {
    fetchData();
    return () => fetchData();
  }, []);

  useEffect(() => {
    if (audio.length) {
      playerSetup();
      setState({...state, isLoading: false});
    }
  }, [audio]);

  // Setup player for the first time
  async function playerSetup() {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.add(audioFilter);
  }

  // Play or puse song by toggling...
  async function togglePlay() {
    const playingState = await TrackPlayer.getState();
    if (playingState !== State.Playing) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
    setState({...state, togglePlaybtn: !togglePlaybtn});
  }

  // state events listener
  useTrackPlayerEvents(
    [Event.PlaybackTrackChanged, Event.PlaybackQueueEnded],
    async event => {
      if (
        event.type === Event.PlaybackTrackChanged &&
        event.nextTrack != null
      ) {
        const track = await TrackPlayer.getTrack(event.nextTrack);
        const newTrack = track || {};
        setState({...state, currentTrack: newTrack});
      }

      if (event.type === Event.PlaybackQueueEnded) {
        await TrackPlayer.stop();
        setState({...state, togglePlaybtn: false});
      }
    },
  );

  async function playNext() {
    await TrackPlayer.skipToNext();
  }

  async function playPrevious() {
    await TrackPlayer.skipToPrevious();
  }

  async function onSliderComplete(value) {
    await TrackPlayer.seekTo(value);
  }

  // format time for audio
  function formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time - minutes * 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
  // total time count for audio
  function totalTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time - minutes * 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  // play by song by index
  async function playbyId(item) {
    //check if the Track was added
    var list = await TrackPlayer.getQueue();
    let selectedIndex = 0;
    list.find((track, index) => {
      if (track._id == item.item._id) {
        selectedIndex = index;
        setState({...state, togglePlaybtn: true});
        return true;
      }
    });
    // skip to selected index then play
    await TrackPlayer.skip(selectedIndex);
    await TrackPlayer.play();
  }

  // search audio
  async function onSearchEnter(text) {
    if (text) {
      newData = audio.filter(item => {
        const itemData = item.songNo
          ? item.songNo.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setState({...state, audioFilter: newData, audioSearch: text});
    } else {
      setState({...state, audioFilter: audio, audioSearch: text});
    }
  }

  function repeatMode() {
    if (repeat === 'off') {
      TrackPlayer.setRepeatMode(RepeatMode.Track);
      setState({...state, repeat: 'track'});
    }
    if (repeat === 'track') {
      TrackPlayer.setRepeatMode(RepeatMode.Queue);
      setState({...state, repeat: 'all'});
    }
    if (repeat === 'all') {
      TrackPlayer.setRepeatMode(RepeatMode.Off);
      setState({...state, repeat: 'off'});
    }
  }
  function shuffleIcon() {
    if (repeat == 'off') {
      return 'repeat-off';
    }
    if (repeat == 'track') {
      return 'repeat-once';
    }
    if (repeat == 'all') {
      return 'repeat';
    }
  }

  return (
    <Contextprovider.Provider
      value={{
        audio,
        togglePlaybtn,
        currentTrack,
        isLoading,
        audioFilter,
        audioSearch,
        repeat,
        book,
        setState,
        formatTime,
        totalTime,
        playerSetup,
        playNext,
        playPrevious,
        onSliderComplete,
        togglePlay,
        playbyId,
        repeatMode,
        shuffleIcon,
        onSearchEnter,
      }}>
      {children}
    </Contextprovider.Provider>
  );
}

export default Context;
