import React, { useState } from 'react';

import { FaPlay } from 'react-icons/fa';
import { Container } from '../../styles/GlobalStyles';
import axios from '../../services/axios';
import { MusicContainer, Playlist } from './styled';

import Loading from '../../components/Loading';

export default function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [playlistClick, setPlaylistClick] = useState(false);
  const [musicPlaylist, setMusicPlaylist] = useState(false);
  const userId = sessionStorage.getItem('userId');

  React.useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const response = await axios.get(`/playlists/all/${userId}`);
      setPlaylists(response.data);
      console.log(response.data);
      setIsLoading(false);
    }
    getData();
  }, [userId]);
  const handleGetPlaylist = (id) => async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/playlists/${id}`);
      setPlaylistClick(true);
      setMusicPlaylist(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Playlists</h1>
      <Playlist to="/new-playlist">Create new playlist</Playlist>
      <MusicContainer>
        {playlistClick ? (
          <default>
            {musicPlaylist ? (
              <default>
                {musicPlaylist.map((music) => (
                  <div key={String(music.id)}>
                    <span>{music.name}</span>
                    <FaPlay />
                  </div>
                ))}
              </default>
            ) : null}
          </default>
        ) : (
          <default>
            {playlists.map((playlist) => (
              <div key={String(playlist.id)}>
                <span>{playlist.name}</span>
                <FaPlay onClick={handleGetPlaylist(playlist.id)} />
              </div>
            ))}
          </default>
        )}
      </MusicContainer>
    </Container>
  );
}
