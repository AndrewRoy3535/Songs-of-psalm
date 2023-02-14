import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useContext} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Contextprovider} from '../../Context/Context';
import GitChapterBtn from '../../component/GitChapterBtn/GitChapterBtn';

const GitsonghitaScreen = ({navigation}) => {
  const context = useContext(Contextprovider);
  const {gitSonghita} = context;

  const Spacingbottom = () => {
    return <View style={{margin: 50}}></View>;
  };

  return (
    <SafeAreaView style={styles.booklistMainContainer}>
      <View style={styles.go_back_frm_books}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={styles.touchable_opacity_back}>
          <AntDesign name="left" size={25} color="#D3D3D3" />
        </TouchableOpacity>
        <Text style={styles.chapterNoHeader}>Home</Text>
      </View>
      <View style={{marginHorizontal: 4, marginVertical: 2}}>
        <Text
          style={{
            color: '#fff',
            textTransform: 'uppercase',
            fontSize: 15,
            fontWeight: 'bold',
          }}>
          Book Chapters
        </Text>
        <Text
          style={{
            color: 'gray',
            fontStyle: 'italic',
            fontSize: 11,
          }}>
          Select chapters
        </Text>
      </View>
      {gitSonghita.length <= 0 ? (
        <ActivityIndicator size="large" color="#d3d3d3" />
      ) : (
        <View style={styles.booklistContainer}>
          <FlatList
            data={gitSonghita}
            numColumns={5}
            renderItem={({item}) => {
              return (
                <GitChapterBtn
                  item={item}
                  onPress={() => navigation.navigate('GitDetails', {item})}
                />
              );
            }}
            keyExtractor={item => item._id}
            ListFooterComponent={<Spacingbottom />}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default GitsonghitaScreen;

const styles = StyleSheet.create({
  booklistMainContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  go_back_frm_books: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 7,
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
  },
  touchable_opacity_back: {
    width: '17%',
    padding: 7,
    borderRadius: 50,
  },
  booklistContainer: {
    alignSelf: 'center',
    width: '95%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chapterNoHeader: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
