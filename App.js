import Main from './src/components/Main';
import { ApolloProvider } from '@apollo/client/react';
import createApolloClient from './src/utils/makeApolloClient';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import AuthStorage from './src/utils/authStorage';
import AuthStorageContext from './src/context/AuthStorageContext';


const authStorage = new AuthStorage();
const client = createApolloClient(authStorage);

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AuthStorageContext.Provider value={authStorage}>
        <NavigationContainer>
          <Main />
          <StatusBar style="auto" />
        </NavigationContainer>
      </AuthStorageContext.Provider>
    </ApolloProvider>
  );
}
