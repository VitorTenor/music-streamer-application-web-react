import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Container } from '../../styles/GlobalStyles';
import { Form, Title } from './styled';
import Loading from '../../components/Loading';
import { NewPlaylistRequest } from '../../services/ApiService';

export default function NewPlaylist() {
  const [name, setName] = useState('');
  const userId = sessionStorage.getItem('userId');
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // eslint-disable-next-line
    const payload = { "name": name, "userId": userId}
    const response = await NewPlaylistRequest(payload);
    if (response.status === 200) {
      toast.success('Playlist created successfully');
      setIsLoading(false);
      window.location.href = '/playlists';
    } else {
      toast.error(response.response.data.userMessage);
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Title>New Playlist</Title>
      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <button type="submit">Create Playlist</button>
      </Form>
    </Container>
  );
}
