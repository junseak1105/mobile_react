import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const MainScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>Screen 1</Text>
      <Button
        onPress={() => props.navigation.navigate('match')}
        title="Go to match"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MainScreen;