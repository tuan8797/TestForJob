import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList,
} from 'react-native';

class FavouriteProfile extends React.PureComponent {
  _renderItem = ({item, index}) => {
    if (item) {
      const name = item.user.name;
      return (
        item && (
          <View style={styles.viewItem}>
            <Image source={{uri: item.user.picture}} style={styles.avatar} />
            <View style={styles.rightView}>
              <Text style={styles.txtName}>
                {`${name.first} ${name.last} ${name.title}`}
              </Text>
              <Text style={styles.txtPhone}>{`Phone: ${item.user.phone}`}</Text>
            </View>
          </View>
        )
      );
    }
  };

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
            <Text style={styles.title}>My Favourite</Text>
          </View>
          <View style={styles.btnBack} />
        </View>
        {data && data.length > 0 ? (
          <FlatList
            style={styles.flatList}
            contentContainerStyle={styles.innerFlatList}
            data={data}
            keyExtractor={(item, index) => `${index}`}
            renderItem={this._renderItem}
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
  container: {flex: 1, backgroundColor: '#fff'},
  topBar: {
    width: '100%',
    height: 50,
    // borderBottomWidth: 1,
    // borderColor: '#c4c4c270',
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
  flatList: {
    flex: 1,
    paddingTop: 20,
  },
  innerFlatList: {
    paddingBottom: 20,
  },
  viewItem: {
    width: '100%',
    paddingLeft: 10,
    flexDirection: 'row',
    paddingBottom: 10,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  rightView: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  txtName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  txtPhone: {
    fontSize: 16,
    color: 'gray',
  },
});

export default FavouriteProfile;
