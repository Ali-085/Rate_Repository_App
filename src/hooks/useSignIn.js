import { useMutation, useApolloClient } from '@apollo/client';
import { LOGIN_USER } from '../GraphQl/mutation';
import useAuthStorage from '../hooks/useAuthStorage';

const useSignIn = () => {
  const [mutate, result] = useMutation(LOGIN_USER);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signIn = async (credentials) => {
    console.log('Credentials:', credentials);
    const { data } = await mutate({ variables: { credentials } });
    if (data?.authenticate?.accessToken) {
      await authStorage.setAccessToken(data.authenticate.accessToken);
      await apolloClient.resetStore();
      console.log('Token:', data.authenticate.accessToken);
    }
  };

  return { signIn, result };
};
export default useSignIn;