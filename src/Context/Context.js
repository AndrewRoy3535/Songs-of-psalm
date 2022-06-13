import React, {createContext, useState, useEffect} from 'react';
import sanity from '../lib/sanity';
import TrackPlayer, {
  State,
  Event,
  useTrackPlayerEvents,
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
  });

  const {
    audio,
    togglePlaybtn,
    currentTrack,
    isLoading,
    audioFilter,
    audioSearch,
  } = state;

  const fetchData = async () => {
    const query = `*[_type == "song"] {title,songNo,filename,lyrics,_id,"url":song.asset->url}| order(songNo asc)`;
    const result = await sanity.fetch(query);
    setState({...state, audio: result, audioFilter: result});
  };

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
  const playerSetup = async () => {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.add(audioFilter);
  };

  // Play or puse song by toggling...
  const togglePlay = async () => {
    const playingState = await TrackPlayer.getState();
    if (playingState !== State.Playing) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
    setState({...state, togglePlaybtn: !togglePlaybtn});
  };

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

  const playNext = async () => {
    await TrackPlayer.skipToNext();
  };

  const playPrevious = async () => {
    await TrackPlayer.skipToPrevious();
  };

  const onSliderComplete = async value => {
    await TrackPlayer.seekTo(value);
  };

  // format time for audio
  const formatTime = time => {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time - minutes * 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  // total time count for audio
  const totalTime = time => {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time - minutes * 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // play by song by index
  const playbyId = async (id, index) => {
    if (id === currentTrack._id) {
      return togglePlay();
    }

    if (id !== currentTrack._id) {
      await TrackPlayer.stop();
      setState({...state, togglePlaybtn: true});
      await TrackPlayer.skip(index);
      console.log(id);
      return await TrackPlayer.play(index);
    }
  };

  return (
    <Contextprovider.Provider
      value={{
        audio,
        togglePlaybtn,
        currentTrack,
        isLoading,
        audioFilter,
        audioSearch,
        setState,
        formatTime,
        totalTime,
        playerSetup,
        playNext,
        playPrevious,
        onSliderComplete,
        togglePlay,
        playbyId,
      }}>
      {children}
    </Contextprovider.Provider>
  );
}

export default Context;
