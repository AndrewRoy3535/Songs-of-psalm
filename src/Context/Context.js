import React, {createContext, useState, useEffect} from 'react';
import sanity from '../lib/sanity';
import TrackPlayer, {State, usePlaybackState} from 'react-native-track-player';

export const Contextprovider = createContext();

export function Context({children}) {
  const [state, setState] = useState({audio});
  // const palybackstate = usePlaybackState();

  // fetching data using usememo
  const fetchData = async () => {
    const query = `*[_type == "song"] {title,songNo,filename,lyrics,_id,"url":song.asset->url}| order(songNo asc)`;
    const result = await sanity.fetch(query);
    setState({...state, audio: result});
  };

  useEffect(() => {
    fetchData();
    return () => {
      fetchData();
    };
  }, []);

  // const setupaudio = async audio => {
  //   await TrackPlayer.setupPlayer();
  //   await TrackPlayer.add(audio);
  // };

  // const togglePlay = async palybackstate => {
  //   const currentTrack = await TrackPlayer.getCurrentTrack();
  //   if (currentTrack !== null) {
  //     if (palybackstate == State.Paused) {
  //       TrackPlayer.play();
  //     }
  //   } else {
  //     await TrackPlayer.paused();
  //   }
  // };

  const {audio} = state;
  return (
    <Contextprovider.Provider value={{audio}}>
      {children}
    </Contextprovider.Provider>
  );
}

export default Context;
