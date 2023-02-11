import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useHistory } from 'react-router-dom';

import { Container } from '../../styles/GlobalStyles';
import { Form } from './styled';
import Loading from '../../components/Loading';
import { registerRequest } from '../../services/ApiService';

export default function Register() {
  const id = sessionStorage.getItem('userId');
  const nomeStored = sessionStorage.getItem('name');
  const emailStored = sessionStorage.getItem('email');
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  React.useEffect(() => {
    if (!id) return;
    setNome(nomeStored);
    setEmail(emailStored);
  }, [id, emailStored, nomeStored]);

  async function handleSubmit(e) {
    e.preventDefault();

    let formErrors = false;

    if (e.target.type === 'submit') {
      if (nome.length < 3 || nome.length > 255) {
        formErrors = true;
        toast.error('Name must be between 3 and 255 characters');
      }
      if (!isEmail(email)) {
        formErrors = true;
        toast.error('Invalid email');
      }
      if (!id && (password.length < 6 || password.length > 50)) {
        formErrors = true;
        toast.error('Password must be between 6 and 50 characters');
      }
      if (formErrors) return;
      // eslint-disable-next-line
      const payload = { "name": nome, "email": email, "password": password, }
      setIsLoading(true);
      const response = await registerRequest(payload);
      if (response) {
        toast('User registered successfully');
        setIsLoading(false);
        history.push('/login');
      } else {
        toast.error('Error registering user');
      }
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>{id ? 'Edit' : 'Create your account'}</h1>

      <Form onClick={handleSubmit}>
        <label htmlFor="nome">
          Name:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Your name"
          />
        </label>

        <label htmlFor="email">
          E-mail:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
          />
        </label>

        <label htmlFor="password">
          Password :
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
          />
        </label>

        <button type="submit">{id ? 'Save' : 'Create my account'}</button>
      </Form>
    </Container>
  );
}
