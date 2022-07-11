import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useContext} from 'react';
import {Contextprovider} from '../../Context/Context';
import AntDesign from 'react-native-vector-icons/AntDesign';
const BlockContent = require('@sanity/block-content-to-react');

const AboutScreen = ({navigation}) => {
  const {introduction} = useContext(Contextprovider);

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
          <Text style={{textAlign: 'justify', fontSize: 19, color: '#171717'}}>
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
    <SafeAreaView>
      <View style={styles.go_back_frm_books}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={styles.touchable_opacity_back}>
          <AntDesign name="left" size={25} color="#d3d3d3" />
        </TouchableOpacity>
        <View style={{width: '80%'}}>
          <Text style={styles.headerText}>পরিচিতি</Text>
        </View>
      </View>
      {introduction.length <= 0 ? (
        <ActivityIndicator
          size="large"
          color="#171717"
          style={{marginTop: '60%'}}
        />
      ) : (
        <View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={introduction}
            renderItem={item => (
              <BlockContent
                blocks={item.item.details}
                serializers={{types: {block: BlockRenderer}}}
              />
            )}
            keyExtractor={item => item._id}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default AboutScreen;

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
