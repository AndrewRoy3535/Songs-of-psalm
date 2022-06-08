import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useContext} from 'react';
import Button from '../../component/Button/Button';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Contextprovider} from '../../Context/Context';

const HomeScreen = ({navigation}) => {
  const context = useContext(Contextprovider);
  const {isLoading, currentTrack} = context;

  const RenderLoader = () => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <ActivityIndicator size="small" color="#5e8d6a" />
        <Text style={styles.loadingText}>Wait while loading...</Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.homeContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Wellcome to songs of psalm</Text>
      </View>
      <View style={styles.btnContainer}>
        <View style={styles.loadingContainer}>
          {isLoading ? <RenderLoader /> : <Text> </Text>}
        </View>
        <Button
          title="Songs of psalm"
          IonicIconName="musical-note-outline"
          IonicIconSize={35}
          btnDescripton="Tap to view songs"
          onPress={() => navigation.navigate('Songs')}
          Disable={isLoading ? true : false}
        />
        <Button
          title="Book of Psalm"
          IonicIconName="book-outline"
          IonicIconSize={35}
          btnDescripton="Tap to view books"
          onPress={() => navigation.navigate('Books')}
        />
        <Button
          title="About"
          IonicIconName="md-information-circle-outline"
          IonicIconSize={35}
          btnDescripton="Tap to view about"
          onPress={() => navigation.navigate('About')}
        />
      </View>
      <View style={styles.rateContainer}>
        <TouchableOpacity style={styles.rateButton}>
          <Text style={styles.rateText}>Rate this app</Text>
          <AntDesign name="staro" size={35} color="#5e8d6a" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  headerContainer: {
    width: '90%',
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  headerText: {
    fontSize: 33,
    fontFamily: 'DancingScript-Bold',
    color: '#5e8d6a',
  },
  btnContainer: {
    width: '100%',
    flex: 4,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '90%',
    flexDirection: 'row',
  },
  rateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '35%',
  },
  rateText: {color: 'grey', fontSize: 13},
  loadingContainer: {
    width: '90%',
    height: 25,
    padding: 5,
  },
  loadingText: {color: '#5e8d6a', fontSize: 11, marginLeft: 5},
});
