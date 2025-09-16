import { View, StyleSheet, Text, Pressable } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import { ScrollView } from 'react-native-web';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
    paddingBottom: 10,
    paddingHorizontal: 15,
  },
  tab: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});


const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} >
      <Pressable>
        <Link to="/" underlayColor="#f0f4f7">
          <Text style={styles.tab}>Repositories</Text>
        </Link>
        <Link to="/signin" underlayColor="#f0f4f7">
          <Text style={styles.tab}>Sign In</Text>
        </Link>
      </Pressable>
    </ScrollView>
    </View>
  );
};

export default AppBar;