import React, { useState } from 'react';
import { get } from 'lodash';
import { FaRedo, FaPlay } from 'react-icons/fa';
import ReactH5AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

import { Avatar } from '@bigheads/core';
import { Container } from '../../styles/GlobalStyles';
import axios from '../../services/axios';
import {
  MusicContainer,
  NewMusic,
  MusicImage,
  ChangePlay,
  Play,
  MusicPLayerImage,
  Player,
  Login,
} from './styled';

import Loading from '../../components/Loading';

export default function Musics() {
  const [musics, setMusics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [urlPLay, setUrlPlay] = useState('');
  const [currentMusic, setCurrentMusic] = useState([]);
  const userId = sessionStorage.getItem('userId');
  const [show, setShow] = useState(true);
  const BASE_URL_PLAY = 'http://localhost:8081/music-streamer/v1/musics/play/';

  React.useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const response = await axios.get('/musics');
      setMusics(response.data);
      setIsLoading(false);
    }
    getData();
  }, []);
  const handleGetMusic = (e, music) => {
    e.preventDefault();
    setCurrentMusic(music);
    try {
      setUrlPlay(BASE_URL_PLAY + music.id);
    } catch (err) {
      console.log(err);
    }
  };

  const handleNextMusic = (e) => {
    e.preventDefault();
    try {
      const nextMusic = currentMusic.id + 1;
      handleGetMusic(e, nextMusic);
    } catch (err) {
      console.log(err);
    }
  };
  const handlePreviousMusic = (e) => {
    e.preventDefault();
    try {
      const nextMusic = currentMusic.id - 1;
      setUrlPlay(BASE_URL_PLAY + nextMusic);
    } catch (err) {
      console.log(err);
    }
  };
  const changePlayer = (e) => {
    e.preventDefault();
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
  };
  const HandleNewMusic = () => {
    sessionStorage.removeItem('savedMusicId');
    sessionStorage.removeItem('savedMusicImageId');
    sessionStorage.removeItem('savedMusicImageUrl');
    sessionStorage.removeItem('savedMusicName');
    sessionStorage.removeItem('savedMusicGenre');
    sessionStorage.removeItem('savedMusicArtist');
    sessionStorage.removeItem('savedMusicAlbum');
    sessionStorage.removeItem('savedMusicPath');
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Musics</h1>
      {userId ? (
        <NewMusic to="/new-music" onClick={HandleNewMusic}>
          Add new music
        </NewMusic>
      ) : (
        <Login to="/login">Login to add musics</Login>
      )}
      {urlPLay ? (
        <ChangePlay>
          <FaRedo onClick={(e) => changePlayer(e)} />
        </ChangePlay>
      ) : null}
      {show ? (
        <MusicContainer>
          {musics.map((music) => (
            <div key={String(music.id)}>
              <MusicImage>
                {get(music, 'image.url', '') ? (
                  <img src={music.image.url} alt="" />
                ) : (
                  <Avatar />
                )}
              </MusicImage>
              <span>{music.name}</span>
              <span>{music.artist}</span>
              <FaPlay onClick={(e) => handleGetMusic(e, music)} size={16} />
            </div>
          ))}
        </MusicContainer>
      ) : (
        <Play>
          <MusicPLayerImage>
            <img src={currentMusic.image.url} alt="" />
          </MusicPLayerImage>
          <h1>{currentMusic.name}</h1>
          <h2>{currentMusic.artist}</h2>
        </Play>
      )}
      <Player>
        <ReactH5AudioPlayer
          src={urlPLay}
          onClickNext={handleNextMusic}
          onEnded={handleNextMusic}
          onClickPrevious={handlePreviousMusic}
          ImageButton={FaPlay}
          autoPlayAfterSrcChange
          autoPlay
        />
      </Player>
    </Container>
  );
}
