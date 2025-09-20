import { View, StyleSheet, Text, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';
import { useApolloClient, useQuery } from '@apollo/client';
import { ME } from '../GraphQl/queries';
import useAuthStorage from '../hooks/useAuthStorage';

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
    marginRight: 15,
  },
});



const AppBar = () => {
  const navigation = useNavigation();
  const { data } = useQuery(ME);
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    navigation.navigate('SignIn');
  };

  const isAuthenticated = !!data?.me;

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Pressable onPress={() => navigation.navigate('Repositories')}>
          <Text style={styles.tab}>Repositories</Text>
        </Pressable>
        {isAuthenticated && (
          <>
            <Pressable onPress={() => navigation.navigate('CreateReview')}>
              <Text style={styles.tab}>Create a review</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('MyReviews')}>
              <Text style={styles.tab}>My reviews</Text>
            </Pressable>
          </>
        )}
        {isAuthenticated ? (
          <Pressable onPress={handleSignOut}>
            <Text style={styles.tab}>Sign Out</Text>
          </Pressable>
        ) : (
          <>
            <Pressable onPress={() => navigation.navigate('SignIn')}>
              <Text style={styles.tab}>Sign In</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.tab}>Sign up</Text>
            </Pressable>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;