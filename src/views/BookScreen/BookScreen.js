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
import ButtonBook from '../../component/ButtonBook/ButtonBook';
import {Contextprovider} from '../../Context/Context';

const renderItem = ({item}) => {
  return (
    <View style={{marginVertical: 3, alignItems: 'center'}}>
      <Button
        title={item.title}
        btnDescripton="রাজা দাউদ নবীর জীবনী"
        IonicIconName="ios-book"
        IonicIconSize={29}
        onPress={() => navigation.navigate('BookDetail')}
      />
    </View>
  );
};

const BookScreen = ({navigation}) => {
  const context = useContext(Contextprovider);
  const {book} = context;

  return (
    <SafeAreaView style={styles.booklistMainContainer}>
      <View style={styles.go_back_frm_books}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={styles.touchable_opacity_back}>
          <AntDesign name="left" size={25} color="#D3D3D3" />
        </TouchableOpacity>
      </View>
      <View style={styles.booklistContainer}>
        {book.length <= 0 ? (
          <ActivityIndicator size="large" color="#d3d3d3" />
        ) : (
          <FlatList
            data={book}
            renderItem={({item}) => {
              return (
                <View style={{marginVertical: 3, alignItems: 'center'}}>
                  <ButtonBook
                    title={item.title}
                    btnDescripton="রাজা দাউদ নবীর জীবনী"
                    IonicIconName="ios-book"
                    IonicIconSize={29}
                    onPress={() => navigation.navigate('BookDetail', {item})}
                  />
                </View>
              );
            }}
            keyExtractor={item => item._id}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default BookScreen;

// styles array of objects
const styles = StyleSheet.create({
  booklistMainContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  go_back_frm_books: {
    // flex: 1,
    justifyContent: 'center',
    // backgroundColor: 'red',
    paddingVertical: 7,
  },
  touchable_opacity_back: {
    // borderWidth: 1,
    width: '17%',
    padding: 7,
    borderRadius: 50,
  },
  booklistContainer: {
    flex: 1,
    flexDirection: 'row',
    // backgroundColor: '#000',
    justifyContent: 'center',
  },
});
