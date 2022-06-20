import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Button,
  Animated,
} from 'react-native';
import React, {useContext} from 'react';
const BlockContent = require('@sanity/block-content-to-react');
import AntDesign from 'react-native-vector-icons/AntDesign';
import {PortableText} from '@portabletext/react';
import {Contextprovider} from '../../Context/Context';
import FAB from '../../component/Fab/Fab';

const BookDetail = ({route, navigation}) => {
  const {item} = route.params;
  const context = useContext(Contextprovider);
  const {book} = context;

  // Scrolling amimation when scroll down
  const srollHeightY = 100;
  const scrollY = new Animated.Value(0);
  const diffClampScrollY = Animated.diffClamp(scrollY, 0, srollHeightY);
  const translateY = diffClampScrollY.interpolate({
    inputRange: [0, srollHeightY],
    outputRange: [0, srollHeightY],
  });

  // go to the next book
  const goToNextBook = () => {
    const index = book.findIndex(book => book._id === item._id);
    const nextBook = book[index + 1];
    if (nextBook) {
      navigation.navigate('BookDetail', {item: nextBook});
    } else {
      navigation.navigate('BookDetail', {item: book[0]});
      // navigation.navigate('Books');
    }
  };

  // go to the previous book
  const goToPreviousBook = () => {
    const index = book.findIndex(book => book._id === item._id);
    const previousBook = book[index - 1];
    if (previousBook) {
      navigation.navigate('BookDetail', {item: previousBook});
    } else {
      navigation.navigate('BookDetail', {item: book[book.length - 1]});
      // navigation.navigate('Books');
    }
  };

  const BlockRenderer = props => {
    const {style = 'normal'} = props.node;

    if (style === 'normal') {
      return (
        <View>
          <Text style={{textAlign: 'justify', fontSize: 17}}>
            {props.children}
          </Text>
        </View>
      );
    }
  };

  return (
    <>
      <SafeAreaView>
        <View style={styles.go_back_frm_books}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Books')}
            style={styles.touchable_opacity_back}>
            <AntDesign name="left" size={25} color="#d3d3d3" />
          </TouchableOpacity>
          <View style={{width: '80%'}}>
            <Text style={styles.headerText}>{item.title}</Text>
          </View>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ScrollView
            style={{width: '95%'}}
            showsVerticalScrollIndicator={false}
            onScroll={e => {
              scrollY.setValue(e.nativeEvent.contentOffset.y);
            }}>
            <BlockContent
              blocks={item.bookDescription}
              serializers={{types: {block: BlockRenderer}}}
            />
          </ScrollView>
        </View>
      </SafeAreaView>
      <Animated.View
        style={{
          position: 'absolute',
          bottom: 10,
          left: 0,
          right: 0,
          transform: [{translateY}],
        }}>
        <FAB goToNextBook={goToNextBook} goToPreviousBook={goToPreviousBook} />
      </Animated.View>
    </>
  );
};

export default BookDetail;

// styles array of objects
const styles = StyleSheet.create({
  go_back_frm_books: {
    backgroundColor: '#171717',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 12,
    color: '#d3d3d3',
    alignSelf: 'center',
  },
  touchable_opacity_back: {
    // borderWidth: 1,
    width: '10%',
    padding: 7,
    borderRadius: 50,
  },
});
