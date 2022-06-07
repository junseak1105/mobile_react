import React, {useState, useEffect} from 'react';
import RadioGroup from 'react-native-radio-buttons-group';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  TextInput,
  isSelectedBar,
  CheckBox,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import MyButton from '../components/MyButton';

const MatchScreen = () => {
  const [selectedId, setSelectedId] = useState(null);

  //db접속
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
    try {
      const response = await fetch('http://jhk.n-e.kr:8080/test.php');
      const json = await response.json();
      setData(json.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);
  //db접속끝

  //취미
  const Item_hobby = ({item, onPress, backgroundColor, textColor}) => (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.item_hobby, backgroundColor]}>
      <Text style={[styles.title, textColor]}>{item.title}</Text>
    </TouchableOpacity>
  );

  const renderItem_hobby = ({item}) => {
    var backgroundColor = '';
    var color = '';

    if (item.id == selectedId) {
      if (item.isSelected == 'false') {
        backgroundColor = 'green';
        color = '#FAFFFC';
        item.isSelected = 'true';
      } else if (item.isSelected == 'true') {
        backgroundColor = '#FAFFFC';
        color = 'black';
        item.isSelected = 'false';
      }
    } else {
      if (item.isSelected == 'false') {
        backgroundColor = '#FAFFFC';
        color = 'black';
      } else if (item.isSelected == 'true') {
        backgroundColor = 'green';
        color = '#FAFFFC';
      }
    }

    return (
      <Item_hobby
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{backgroundColor}}
        textColor={{color}}
      />
    );
  };

  //음식
  const Item_food = ({item, onPress, backgroundColor, textColor}) => (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.item_food, backgroundColor]}>
      <Text style={[styles.title, textColor]}>{item.title}</Text>
    </TouchableOpacity>
  );

  const renderItem_food = ({item}) => {
    const backgroundColor = item.isSelected === 'Y' ? 'green' : '#FAFFFC';
    const color = item.isSelected === 'Y' ? '#FAFFFC' : 'black';

    return (
      <Item_food
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{backgroundColor}}
        textColor={{color}}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <Text>{item.idx}, {item.userName}</Text>
          )}
        />
      )}
    </View> */}
      <View style={styles.container}>
        <View style={styles.container_sex}>
          <MyButton />
          <MyButton />
          <MyButton />
        </View>
        <View style={styles.selector_hobby_food}>
          <SafeAreaView style={styles.container_hobby}>
            <FlatList
              data={DATA_hobby}
              renderItem={renderItem_hobby}
              keyExtractor={item => item.id}
              extraData={selectedId}
            />
          </SafeAreaView>
          <SafeAreaView style={styles.container_food}>
            <FlatList
              data={DATA_food}
              renderItem={renderItem_food}
              keyExtractor={item => item.id}
              extraData={selectedId}
              horizontal={false}
              numColumns={3}
            />
          </SafeAreaView>
        </View>
        <View style={styles.set_match}>
          <MyButton />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item_hobby: {
    padding: 20,
  },
  item_food: {
    width: 20,
    height: 20,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 8,
  },
  title: {
    fontSize: 32,
  },
  selector_hobby_food: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 6,
  },
  container_food: {
    flex: 1,
  },
  container_hobby: {
    flex: 1,
  },
  container_sex: {
    flexDirection: 'row',
  },
  set_match: {
    width: 100,
    flex: 1,
  },
});

const DATA_hobby = [
  {
    id: '1',
    title: 'First Item',
    isSelected: 'false',
  },
  {
    id: '2',
    title: 'Second Item',
    isSelected: 'false',
  },
  {
    id: '3',
    title: 'Third Item',
    isSelected: 'false',
  },
];

const DATA_food = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: '1',
    isSelected: 'false',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: '2',
    isSelected: 'false',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: '3',
    isSelected: 'false',
  },
];

export default MatchScreen;
