import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React, {useContext} from 'react';
import Button from '../../component/Button/Button';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Contextprovider} from '../../Context/Context';

function HomeScreen({navigation}) {
  const context = useContext(Contextprovider);
  const {isLoading} = context;

  const RenderLoader = () => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <ActivityIndicator size="small" color="#5e8d6a" />
        <Text style={styles.loadingText}>Wait while loading...</Text>
      </View>
    );
  };
  const iconSize = 37;

  return (
    <SafeAreaView style={styles.homeContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Welcome to</Text>
        <Text style={styles.headerText}>Book of Psalms,</Text>
        <Text style={styles.headerText}>life of King David & Songs</Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.btnContainer}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}>
        <View style={styles.loadingContainer}>
          {isLoading ? <RenderLoader /> : null}
        </View>
        <Button
          title="রাজা দাউদের জীবনী"
          IonicIconName="book-outline"
          IonicIconSize={iconSize}
          btnDescripton="Tap to read books"
          onPress={() => navigation.navigate('Books')}
        />
        <Button
          title="জবুর শরীফ (গীতসংহিতা)"
          IonicIconName="ios-book"
          IonicIconSize={iconSize}
          btnDescripton="গীতসংহিতা"
          onPress={() => navigation.navigate('Gitsonghita')}
        />
        <Button
          title="নবী দাউদের গীত"
          IonicIconName="musical-note-outline"
          IonicIconSize={iconSize}
          btnDescripton="Tap to listen songs"
          onPress={() => navigation.navigate('Songs')}
        />
        <Button
          title="পরিচিতি"
          IonicIconName="md-information-circle-outline"
          IonicIconSize={iconSize}
          btnDescripton="Tap to view about"
          onPress={() => navigation.navigate('About')}
        />
      </ScrollView>
      <View style={styles.rateContainer}>
        <TouchableOpacity style={styles.rateButton}>
          <Text style={styles.rateText}>Rate this app</Text>
          <AntDesign name="staro" size={35} color="#5e8d6a" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  headerContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  headerText: {
    fontSize: 25,
    fontFamily: 'DancingScript-Bold',
    color: '#5e8d6a',
  },
  btnContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rateContainer: {
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
    height: 33,
    padding: 10,
  },
  loadingText: {color: '#5e8d6a', fontSize: 11, marginLeft: 5},
});
