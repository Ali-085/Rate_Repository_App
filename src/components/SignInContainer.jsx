import React from 'react';
import { View, StyleSheet, TextInput, Button } from 'react-native';
import Text from './Text';
import * as yup from 'yup';
import { useFormik } from 'formik';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e1e4e8',
    flexGrow: 1,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 4,
    backgroundColor: '#fff',
    width: 250,
  },
  button: { marginTop: 10, width: 250 },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
  },
});

const SignInContainer = ({ onSubmit }) => {
  const validationSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        testID="usernameInput"
        style={[
          styles.input,
          formik.touched.username && formik.errors.username && styles.errorInput,
        ]}
        onChangeText={formik.handleChange('username')}
        value={formik.values.username}
        onBlur={formik.handleBlur('username')}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={styles.errorText}>{formik.errors.username}</Text>
      )}
      <TextInput
        placeholder="Password"
        secureTextEntry
        testID="passwordInput"
        style={[
          styles.input,
          formik.touched.password && formik.errors.password && styles.errorInput,
        ]}
        onChangeText={formik.handleChange('password')}
        value={formik.values.password}
        onBlur={formik.handleBlur('password')}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.errorText}>{formik.errors.password}</Text>
      )}
      <View style={styles.button}>
        <Button title="Sign In" onPress={formik.handleSubmit} testID="submitButton" />
      </View>
    </View>
  );
};

export default SignInContainer;
