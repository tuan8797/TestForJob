/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Animated,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';

const WIDTH_SCREEN = Dimensions.get('window').width;
const viewAvatar = 140;
const btn = {
  personal: 0,
  calender: 1,
  location: 2,
  phone: 3,
  lock: 4,
};

const ItemProfile = ({item, index, panResponder, position}) => {
  const [currentBtn, setBtnSelected] = useState(2);
  let rotation = null;
  if (position) {
    rotation = position.x.interpolate({
      inputRange: [-WIDTH_SCREEN / 2, 0, WIDTH_SCREEN / 2],
      outputRange: ['-10deg', '0deg', '10deg'],
      extrapolate: 'clamp',
    });
  }

  const onPressBtn = (value) => {
    const {personal, calender, location, phone, lock} = btn;
    switch (value) {
      case personal:
        setBtnSelected(personal);
        break;
      case calender:
        setBtnSelected(calender);
        break;
      case location:
        setBtnSelected(location);
        break;
      case phone:
        setBtnSelected(phone);
        break;
      case lock:
        setBtnSelected(lock);
        break;
      default:
        break;
    }
  };

  const renderBtn = () => {
    return (
      <View style={styles.tabBtn}>
        <TouchableOpacity
          style={currentBtn === btn.personal ? styles.btnSelected : styles.btn}
          onPress={() => onPressBtn(btn.personal)}>
          <Image
            source={require('../../icon/person.png')}
            style={{
              ...styles.iconBtn,
              tintColor: currentBtn === btn.personal ? 'green' : 'gray',
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={currentBtn === btn.calender ? styles.btnSelected : styles.btn}
          onPress={() => onPressBtn(btn.calender)}>
          <Image
            source={require('../../icon/calendar.png')}
            style={{
              ...styles.iconBtn,
              tintColor: currentBtn === btn.calender ? 'green' : 'gray',
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={currentBtn === btn.location ? styles.btnSelected : styles.btn}
          onPress={() => onPressBtn(btn.location)}>
          <Image
            source={require('../../icon/location.png')}
            style={{
              ...styles.iconBtn,
              tintColor: currentBtn === btn.location ? 'green' : 'gray',
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={currentBtn === btn.phone ? styles.btnSelected : styles.btn}
          onPress={() => onPressBtn(btn.phone)}>
          <Image
            source={require('../../icon/phone.png')}
            style={{
              ...styles.iconBtn,
              tintColor: currentBtn === btn.phone ? 'green' : 'gray',
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={currentBtn === btn.lock ? styles.btnSelected : styles.btn}
          onPress={() => onPressBtn(btn.lock)}>
          <Image
            source={require('../../icon/lock.png')}
            style={{
              ...styles.iconBtn,
              tintColor: currentBtn === btn.lock ? 'green' : 'gray',
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderContent = () => {
    const user = item.user;
    if (currentBtn === btn.personal) {
      return (
        <View>
          <Text style={styles.title}>{'My name is'}</Text>
          <Text style={styles.value}>
            {`${user.name.title}. ${user.name.first} ${user.name.last} `}
          </Text>
        </View>
      );
    } else if (currentBtn === btn.calender) {
      return (
        <View>
          <Text style={styles.title}>{'My Date of birh is'}</Text>
          <Text style={styles.value}>
            {`${moment.unix(user.dob).format('LL')}`}
          </Text>
        </View>
      );
    } else if (currentBtn === btn.location) {
      return (
        <View>
          <Text style={styles.title}>{'My address is'}</Text>
          <Text style={styles.value}>{user.location.street}</Text>
        </View>
      );
    } else if (currentBtn === btn.phone) {
      return (
        <View>
          <Text style={styles.title}>{'My phone number is'}</Text>
          <Text style={styles.value}>{user.phone}</Text>
        </View>
      );
    } else if (currentBtn === btn.lock) {
      return (
        <View>
          <Text style={styles.title}>{'My cell is'}</Text>
          <Text style={styles.value}>{user.cell}</Text>
        </View>
      );
    } else {
      return <></>;
    }
  };

  return panResponder ? (
    <View style={styles.container}>
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.inner,
          {
            transform: [
              {rotate: rotation},
              ...position.getTranslateTransform(),
            ],
          },
        ]}>
        <View style={styles.header} />
        <View style={styles.content}>
          {renderContent()}
          {renderBtn()}
        </View>
        <View style={styles.viewAvatar}>
          <Image source={{uri: item.user.picture}} style={styles.avatar} />
        </View>
      </Animated.View>
    </View>
  ) : (
    <View style={styles.container}>
      <Animated.View style={[styles.inner]}>
        <View style={styles.header} />
        <View style={styles.content}>
          {renderContent()}
          {renderBtn()}
        </View>
        <View style={styles.viewAvatar}>
          <Image source={{uri: item.user.picture}} style={styles.avatar} />
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: WIDTH_SCREEN,
    // height: '55%',
    position: 'absolute',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  inner: {
    width: '100%',
    height: '100%',
    backgroundColor: '#e3e3e3',
    borderRadius: 3,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    height: 120,
    borderBottomWidth: 2,
    borderBottomColor: '#a8a3a380',
  },
  viewAvatar: {
    width: viewAvatar,
    height: viewAvatar,
    borderRadius: viewAvatar / 2,
    borderWidth: 1,
    borderColor: 'gray',
    position: 'absolute',
    top: 30,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  avatar: {
    width: viewAvatar - 10,
    height: viewAvatar - 10,
    borderRadius: (viewAvatar - 10) / 2,
    resizeMode: 'contain',
  },
  content: {
    flex: 1,
    width: '100%',
    paddingTop: viewAvatar / 2,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    color: 'gray',
    fontSize: 20,
  },
  value: {
    fontSize: 25,
    textAlign: 'center',
  },
  tabBtn: {
    width: '100%',
    height: 50,
    // position: 'absolute',
    // bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    padding: 5,
  },
  btnSelected: {
    padding: 5,
    borderTopWidth: 1,
    borderColor: 'green',
  },
  iconBtn: {
    width: 35,
    height: 35,
    tintColor: 'gray',
  },
});

export default ItemProfile;
