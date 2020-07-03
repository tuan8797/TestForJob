/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  PanResponder,
  Animated,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import ItemProfile from '../itemProfile';
import {request} from '../../request/Request';
import AsyncStorage from '@react-native-community/async-storage';
import FavouriteProfile from '../favouriteProfile';

const key = 'favourites';
let storage = null;
const MainScreen = () => {
  const [profiles, setProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFavourite, setShowFavourite] = useState(false);
  const position = useRef(new Animated.ValueXY()).current;
  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onPanResponderMove: (evt, gestureState) => {
          position.setValue({x: gestureState.dx, y: gestureState.dy});
        },
        onPanResponderRelease: async (evt, gestureState) => {
          if (gestureState.dx > 180) {
            let favourites = [];
            if (storage === null) {
              favourites.push(profiles[currentIndex]);
              await AsyncStorage.setItem(key, JSON.stringify(favourites));
            } else {
              favourites = JSON.parse(storage);
              favourites.push(profiles[currentIndex]);
              await AsyncStorage.setItem(key, JSON.stringify(favourites));
            }
            storage = JSON.stringify(favourites);
            setCurrentIndex(currentIndex + 1);
            position.setValue({x: 0, y: 0});
          } else if (gestureState.dx < -180) {
            setCurrentIndex(currentIndex + 1);
            position.setValue({x: 0, y: 0});
          } else {
            position.setValue({x: 0, y: 0});
          }
        },
      }),
    [currentIndex, profiles],
  );

  const onPressFavourite = () => {
    setShowFavourite(!showFavourite);
  };

  const loadmore = async () => {
    const data = profiles;
    const res = await request.get('api/0.4/?randomapi');
    if (res) {
      data.push(res.results[0]);
      const res2 = await request.get('api/0.4/?randomapi');
      if (res2) {
        data.push(res2.results[0]);
        setProfiles(data);
      }
    }
  };

  const getRandomProfile = async () => {
    const data = [];
    const res = await request.get('api/0.4/?randomapi');
    if (res) {
      data.push(res.results[0]);
      const res2 = await request.get('api/0.4/?randomapi');
      data.push(res2.results[0]);
      const res3 = await request.get('api/0.4/?randomapi');
      data.push(res3.results[0]);
      setProfiles(data);
    }
  };

  const getFavourite = async () => {
    storage = await AsyncStorage.getItem(key);
  };

  useEffect(() => {
    getRandomProfile();
    getFavourite();
  }, []);

  useEffect(() => {
    loadmore();
  }, [currentIndex]);

  return (
    <View style={styles.container}>
      <View style={styles.header} />
      {profiles
        .map((item, index) => {
          return index < currentIndex ? null : index === currentIndex ? (
            <ItemProfile
              key={`${index}`}
              item={item}
              index={index}
              panResponder={panResponder}
              position={position}
            />
          ) : (
            <ItemProfile key={`${index}`} item={item} index={index} />
          );
        })
        .reverse()}
      <TouchableOpacity style={styles.tnFavourite} onPress={onPressFavourite}>
        <Image source={require('../../icon/heart.png')} />
      </TouchableOpacity>
      <Modal visible={showFavourite} animationType="slide">
        {showFavourite && (
          <FavouriteProfile
            onPressBack={onPressFavourite}
            data={JSON.parse(storage)}
          />
        )}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {width: '100%', height: '100%', backgroundColor: '#e3e3e3'},
  header: {height: 100, backgroundColor: '#2e2b2b'},
  tnFavourite: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0223380',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 50,
    right: 20,
  },
});

export default MainScreen;
