import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Button,
  Animated,
  FlatList,
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
  const {book, goToNextBook, goToPreviousBook} = context;

  // Scrolling amimation when scroll down
  const srollHeightY = 100;
  const scrollY = new Animated.Value(0);
  const diffClampScrollY = Animated.diffClamp(scrollY, 0, srollHeightY);
  const translateY = diffClampScrollY.interpolate({
    inputRange: [0, srollHeightY],
    outputRange: [0, srollHeightY],
  });

  const BlockRenderer = props => {
    const {style = 'normal'} = props.node;

    if (style === 'normal') {
      return (
        <View style={{backgroundColor: '#d3d3d3', padding: 15}}>
          <Text style={{textAlign: 'justify', fontSize: 19, color: '#171717'}}>
            {props.children}
          </Text>
        </View>
      );
    }
    if (style === 'h3') {
      return (
        <View style={{backgroundColor: '#d3d3d3', padding: 15}}>
          <Text style={{textAlign: 'center', fontSize: 19, color: '#171717'}}>
            {props.children}
          </Text>
        </View>
      );
    }
    if (style === 'h1') {
      return (
        <View style={{backgroundColor: '#d3d3d3', padding: 15}}>
          <Text style={{textAlign: 'center', fontSize: 19, color: '#171717'}}>
            {props.children}
          </Text>
        </View>
      );
    }
    if (style === 'h2') {
      return (
        <View style={{backgroundColor: '#d3d3d3', padding: 15}}>
          <Text style={{textAlign: 'center', fontSize: 19, color: '#171717'}}>
            {props.children}
          </Text>
        </View>
      );
    }
    if (style === 'h4') {
      return (
        <View style={{backgroundColor: '#d3d3d3', padding: 15}}>
          <Text style={{textAlign: 'center', fontSize: 19, color: '#171717'}}>
            {props.children}
          </Text>
        </View>
      );
    }
    if (style === 'h5') {
      return (
        <View style={{backgroundColor: '#d3d3d3', padding: 15}}>
          <Text style={{textAlign: 'center', fontSize: 19, color: '#171717'}}>
            {props.children}
          </Text>
        </View>
      );
    }
    if (style === 'h6') {
      return (
        <View style={{backgroundColor: '#d3d3d3', padding: 15}}>
          <Text style={{textAlign: 'center', fontSize: 19, color: '#171717'}}>
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
        <View>
          <FlatList
            onScroll={e => {
              scrollY.setValue(e.nativeEvent.contentOffset.y);
            }}
            showsVerticalScrollIndicator={false}
            data={item.bookDescription}
            renderItem={item => (
              <BlockContent
                blocks={item.item}
                serializers={{types: {block: BlockRenderer}}}
              />
            )}
            keyExtractor={item => item._key}
          />
        </View>
      </SafeAreaView>
      <Animated.View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 27,
          alignItems: 'center',
          transform: [{translateY}],
        }}>
        <FAB
          goToNextBook={() =>
            goToNextBook(book, item, 'BookDetail', navigation)
          }
          goToPreviousBook={() =>
            goToPreviousBook(book, item, 'BookDetail', navigation)
          }
        />
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
