import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useHistory } from 'react-router-dom';

import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';

import Loading from '../../components/Loading';
import { loginRequest } from '../../services/ApiService';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = false;

    if (e.target.type === 'submit') {
      if (!isEmail(email)) {
        formErrors = true;
        toast.error('Invalid email');
      }
      if (password.length < 6 || password.length > 50) {
        formErrors = true;
        toast.error('Invalid password');
      }
      if (formErrors) return;
      // eslint-disable-next-line
      const payload = { "email": email, "password": password,};
      setIsLoading(true);
      const response = await loginRequest(payload);
      if (response) {
        toast('Login made successfully');
        setIsLoading(false);
        history.push('/musics');
      } else {
        toast.error('Email or password is incorrect');
      }
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <h1>Login</h1>

      <Form onClick={handleSubmit}>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Type your email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Type your password"
        />
        <button type="submit">Submit</button>
      </Form>
    </Container>
  );
}
