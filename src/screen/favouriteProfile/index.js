import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import ItemProfile from '../itemProfile';

const SCREEN_WIDTH = Dimensions.get('window').width;

class FavouriteProfile extends React.PureComponent {
  render() {
    const {onPressBack, data} = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.btnBack} onPress={onPressBack}>
            <Image
              source={require('../../icon/back.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
          <View style={styles.viewTitle}>
            <Text style={styles.title}>Favourite profile</Text>
          </View>
          <View style={styles.btnBack} />
        </View>
        {data && data.length > 0 ? (
          <Carousel
            data={this.props.data}
            renderItem={({item, index}) => (
              <ItemProfile item={item} index={index} />
            )}
            sliderWidth={SCREEN_WIDTH}
            itemWidth={SCREEN_WIDTH}
          />
        ) : (
          <View style={styles.viewEmpty}>
            <Image source={require('../../icon/empty.png')} />
            <Text style={styles.txtEmpty}>Your favourite is empty !!</Text>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#e3e3e390'},
  topBar: {
    width: '100%',
    height: 50,
    borderBottomWidth: 1,
    borderColor: '#c4c4c270',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  btnBack: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  viewTitle: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
  },
  viewEmpty: {
    width: '100%',
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtEmpty: {
    fontSize: 18,
    marginTop: 10,
  },
});

export default FavouriteProfile;
