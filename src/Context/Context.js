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
  });
  const fetchData = async () => {
    const query = `*[_type == "song"] {title,songNo,filename,lyrics,_id,"url":song.asset->url}| order(songNo asc)`;
    const result = await sanity.fetch(query);
    setState({...state, audio: result});
  };

  useEffect(() => {
    fetchData();
    playerSetup();
    return () => {
      fetchData();
    };
  }, []);

  const playerSetup = async () => {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.add(sounds);
  };

  const togglePlay = async () => {
    const playingState = await TrackPlayer.getState();
    if (playingState !== State.Playing) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
    setState({...state, togglePlaybtn: !togglePlaybtn});
  };

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

  const {audio, togglePlaybtn, currentTrack} = state;
  return (
    <Contextprovider.Provider
      value={{
        audio,
        togglePlaybtn,
        currentTrack,
        setState,
        formatTime,
        totalTime,
        playerSetup,
        playNext,
        playPrevious,
        onSliderComplete,
        togglePlay,
      }}>
      {children}
    </Contextprovider.Provider>
  );
}

export default Context;

const sounds = [
  {
    id: 1,
    url: 'https://cdn.pixabay.com/audio/2021/05/25/audio_83acc1c7f0.mp3',
    title: 'Song 1',
    artist: 'Artist 1',
    artwork:
      'https://i.scdn.co/image/ab67616d0000b2735c9b9b9b9b9b9b9b9b9b9b9b9',
  },
  {
    id: 2,
    url: 'https://cdn.pixabay.com/audio/2022/01/31/audio_1682adb609.mp3',
    title: 'Song 2',
    artist: 'Artist 2',
    artwork:
      'https://i.scdn.co/image/ab67616d0000b2735c9b9b9b9b9b9b9b9b9b9b9b9',
  },
  {
    id: 3,
    url: 'https://cdn.pixabay.com/audio/2022/05/10/audio_b92b719f0e.mp3',
    title: 'Song 3',
    artist: 'Artist 3',
    artwork:
      'https://i.scdn.co/image/ab67616d0000b2735c9b9b9b9b9b9b9b9b9b9b9bsdsd9',
  },
];
