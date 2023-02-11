import React, { useState } from 'react';

import { toast } from 'react-toastify';
import ReactH5AudioPlayer from 'react-h5-audio-player';
import { Container } from '../../styles/GlobalStyles';
import { Form, MusicImage, Player, ProfilePicture, Title } from './styled';
import Loading from '../../components/Loading';
import { NewMusicRequest, UploadImage } from '../../services/ApiService';
import 'react-h5-audio-player/lib/styles.css';

export default function NewMusic() {
  const savedMusicId = sessionStorage.getItem('savedMusicId');
  const savedMusicImageId = sessionStorage.getItem('savedMusicImageId');

  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [file, setFile] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [urlPLay, setUrlPlay] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const BASE_URL_PLAY = 'http://localhost:8081/music-streamer/v1/musics/play/';

  React.useEffect(() => {
    if (savedMusicId) {
      setName(sessionStorage.getItem('savedMusicName'));
      setGenre(sessionStorage.getItem('savedMusicGenre'));
      setArtist(sessionStorage.getItem('savedMusicArtist'));
      setAlbum(sessionStorage.getItem('savedMusicAlbum'));
      if (savedMusicImageId) {
        setImageUrl(sessionStorage.getItem('savedMusicImageUrl'));
        setUrlPlay(BASE_URL_PLAY + savedMusicId);
      }
    }
  }, [
    savedMusicId,
    setName,
    setGenre,
    setArtist,
    setAlbum,
    setImageUrl,
    setUrlPlay,
    savedMusicImageId,
  ]);

  const veriryFields = () => {
    let status = true;
    if (name.length === 0 || name.length > 255) {
      toast.error('Music name must be between 1 and 255 characters');
      status = false;
    }
    if (genre.length === 0 || genre.length > 255) {
      toast.error('Music genre must be between 1 and 255 characters');
      status = false;
    }
    if (artist.length === 0 || artist.length > 255) {
      toast.error('Music artist must be between 1 and 255 characters');
      status = false;
    }
    if (album.length === 0 || album.length > 255) {
      toast.error('Music album must be between 1 and 255 characters');
      status = false;
    }
    if (file.length === 0) {
      toast.error('Music file must be selected');
      status = false;
    }
    if (file.type !== 'audio/mpeg') {
      toast.error('Music file must be mp3');
      status = false;
    }
    return status;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const verify = veriryFields();
    if (verify) {
      setIsLoading(true);
      const payload = new FormData();
      payload.append('name', name);
      payload.append('genre', genre);
      payload.append('artist', artist);
      payload.append('album', album);
      payload.append('music', file);
      console.log(file);
      const response = await NewMusicRequest(payload);
      console.log(response);
      setIsLoading(false);
    }
  };

  const handleMusicImageUpload = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const imageFile = e.target.files[0];
    if (imageFile.type !== 'image/jpeg' && imageFile.type !== 'image/png') {
      toast.error('Image file must be jpeg or png');
      setIsLoading(false);
      return;
    }
    const payload = new FormData();
    payload.append('image', imageFile);
    const response = await UploadImage(payload);
    console.log(response);
    setImageUrl(response.url);
    setIsLoading(false);
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      {!savedMusicId ? <Title>Add New Music</Title> : null}
      {savedMusicImageId ? (
        <MusicImage>
          <img src={imageUrl} alt="" />
        </MusicImage>
      ) : (
        <div>
          {savedMusicId ? (
            <ProfilePicture>
              <span>Add Image</span>
              <input type="file" id="foto" onChange={handleMusicImageUpload} />
            </ProfilePicture>
          ) : null}
        </div>
      )}
      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="text"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          placeholder="Artist"
        />
        <input
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          placeholder="Genre"
        />
        <input
          type="text"
          value={album}
          onChange={(e) => setAlbum(e.target.value)}
          placeholder="Album"
        />
        {!savedMusicId ? (
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        ) : null}
        {!savedMusicId ? <button type="submit">Add</button> : null}
      </Form>
      {savedMusicId && savedMusicImageId ? (
        <Player>
          <ReactH5AudioPlayer src={urlPLay} />
        </Player>
      ) : null}
    </Container>
  );
}
