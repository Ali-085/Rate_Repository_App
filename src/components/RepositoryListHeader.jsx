import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
    fontSize: 16,
  },
});

const RepositoryListHeader = ({ sort, setSort, searchKeyword, setSearchKeyword }) => (
  <View style={styles.container}>
    <TextInput
      style={styles.input}
      placeholder="Search repositories"
      value={searchKeyword}
      onChangeText={setSearchKeyword}
      testID="searchInput"
    />
    <Picker
      selectedValue={sort}
      onValueChange={value => setSort(value)}
      testID="sortPicker"
    >
      <Picker.Item label="Latest repositories" value="latest" />
      <Picker.Item label="Highest rated repositories" value="highest" />
      <Picker.Item label="Lowest rated repositories" value="lowest" />
    </Picker>
  </View>
);

export default RepositoryListHeader;
