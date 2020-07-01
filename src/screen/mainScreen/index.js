import React, {useState, useRef, useEffect} from 'react';
import {View, StyleSheet, PanResponder, Animated} from 'react-native';
import ItemProfile from '../itemProfile';
import {request} from '../../request/Request';
import AsyncStorage from '@react-native-community/async-storage';

const key = 'favourites';
const MainScreen = () => {
  const [data] = useState(['1', '2', '3', '4', '5']);
  const [profiles, setProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
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
            setCurrentIndex(currentIndex + 1);
            position.setValue({x: 0, y: 0});
          } else if (gestureState.dx < -180) {
            let favourites = [];
            const storage = await AsyncStorage.getItem(key);
            if (storage === null) {
              favourites.push(profiles[currentIndex]);
              console.log(JSON.stringify(favourites));
              await AsyncStorage.setItem(key, JSON.stringify(favourites));
            } else {
              favourites = JSON.parse(storage);
              favourites.push(profiles[currentIndex]);
              // console.log(favourites);
            }
            setCurrentIndex(currentIndex + 1);
            position.setValue({x: 0, y: 0});
          } else {
            position.setValue({x: 0, y: 0});
          }
        },
      }),
    [currentIndex, profiles],
  );

  const getRandomProfile = async () => {
    const res = await request.get('api/0.4/?randomapi');
    if (res) {
      setProfiles(res.results);
    }
  };

  useEffect(() => {
    getRandomProfile();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header} />
      {profiles
        .map((item, index) => {
          return index < currentIndex ? (
            <></>
          ) : index === currentIndex ? (
            <ItemProfile
              item={item}
              index={index}
              panResponder={panResponder}
              position={position}
            />
          ) : (
            <ItemProfile item={item} index={index} position={position} />
          );
        })
        .reverse()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {width: '100%', height: '100%', backgroundColor: '#e3e3e3'},
  header: {height: 100, backgroundColor: '#2e2b2b'},
});

export default MainScreen;
