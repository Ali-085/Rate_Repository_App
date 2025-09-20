import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import SingleRepositoryView from './SingleRepositoryView';
import ReviewFormScreen from './ReviewFormScreen';
import SignUpFormScreen from './SignUpFormScreen';
import AppBar from './AppBar';
import SignIn from './SignIn';
import MyReviews from './MyReviews';
import { Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
  },
});



const Stack = Platform.OS === 'web'
  ? createStackNavigator()
  : createNativeStackNavigator();



function ScreenWithAppBar({ children }) {
  return (
    <View style={styles.container}>
      <AppBar />
      <View style={{ flex: 1 }}>{children}</View>
    </View>
  );
}

function RepositoriesScreen() {
  return (
    <ScreenWithAppBar>
      <RepositoryList />
    </ScreenWithAppBar>
  );
}

function SignInScreen() {
  return (
    <ScreenWithAppBar>
      <SignIn />
    </ScreenWithAppBar>
  );
}

function CreateReviewScreen() {
  return (
    <ScreenWithAppBar>
      <ReviewFormScreen />
    </ScreenWithAppBar>
  );
}

function MyReviewsScreen() {
  return (
    <ScreenWithAppBar>
      <MyReviews />
    </ScreenWithAppBar>
  );
}


export default function Main() {
  return (
    <Stack.Navigator initialRouteName="Repositories" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Repositories" component={RepositoriesScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SingleRepository" component={SingleRepositoryView} />
      <Stack.Screen name="CreateReview" component={CreateReviewScreen} />
      <Stack.Screen name="SignUp" component={SignUpFormScreen} />
      <Stack.Screen name="MyReviews" component={MyReviewsScreen} />
    </Stack.Navigator>
  );
}

