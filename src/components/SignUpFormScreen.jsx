import React from 'react';
import { View, Alert } from 'react-native';
import { useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import SignUpForm from './SignUpForm';
import { CREATE_USER } from '../GraphQl/mutation';
import useSignIn from '../hooks/useSignIn';

const SignUpFormScreen = () => {
  const navigation = useNavigation();
  const [createUser] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();

  const onSubmit = async (values, { resetForm }) => {
    const { username, password } = values;
    try {
      await createUser({
        variables: {
          user: {
            username,
            password,
          },
        },
      });
      await signIn({ username, password });
      resetForm();
      navigation.navigate('Repositories');
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  };

  return (
    <View>
      <SignUpForm onSubmit={onSubmit} />
    </View>
  );
};

export default SignUpFormScreen;
