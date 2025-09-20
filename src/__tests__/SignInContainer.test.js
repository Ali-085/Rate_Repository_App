import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import SignInContainer from '../components/SignInContainer';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const onSubmit = jest.fn();
      render(<SignInContainer onSubmit={onSubmit} />);

      fireEvent.changeText(screen.getByTestId('usernameInput'), 'kalle');
      fireEvent.changeText(screen.getByTestId('passwordInput'), 'password');
      fireEvent.press(screen.getByTestId('submitButton'));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit).toHaveBeenCalledWith({ username: 'kalle', password: 'password' }, expect.anything());
      });
    });
  });
});
