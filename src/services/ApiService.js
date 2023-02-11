import { toast } from 'react-toastify';
import axios from './axios';

export async function loginRequest(payload) {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.post('/users/login', payload, config);
    if (response.status === 200) {
      sessionStorage.setItem('userId', response.data.id);
      sessionStorage.setItem('name', response.data.name);
      sessionStorage.setItem('email', response.data.email);
      sessionStorage.setItem('token', response.data.token);
      sessionStorage.setItem('isAuthenticated', true);
      return true;
    }
  } catch (err) {
    return false;
  }
  return false;
}

export async function registerRequest(payload) {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await axios.post('/users', payload, config);
    if (response.status === 200) {
      return true;
    }
  } catch (err) {
    return false;
  }
  return false;
}

export async function NewMusicRequest(payload) {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/form-data',
        Authentication: `Bearer ${sessionStorage.getItem('token')} `,
      },
    };
    const response = await axios.post('/musics', payload, config);
    if (response.status === 200) {
      sessionStorage.setItem('savedMusicId', response.data.id);
      sessionStorage.setItem('savedMusicName', response.data.name);
      sessionStorage.setItem('savedMusicGenre', response.data.genre);
      sessionStorage.setItem('savedMusicArtist', response.data.artist);
      sessionStorage.setItem('savedMusicAlbum', response.data.album);
      return response.data;
    }
  } catch (err) {
    toast.error('Erro ao cadastrar música');
    return false;
  }
  return false;
}

export async function UploadImage(payload) {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/form-data',
        Authentication: `Bearer ${sessionStorage.getItem('token')} `,
      },
    };
    const musicId = sessionStorage.getItem('savedMusicId');
    const response = await axios.post(`/images/${musicId}`, payload, config);
    if (response.status === 200) {
      sessionStorage.setItem('savedMusicImageId', response.data.id);
      sessionStorage.setItem('savedMusicImageUrl', response.data.url);
      return response.data;
    }
  } catch (err) {
    toast.error('Erro ao cadastrar música');
    return false;
  }
  return false;
}

export async function MusicById(id) {
  try {
    const config = {
      headers: {
        Authentication: `Bearer ${sessionStorage.getItem('token')} `,
      },
    };
    const response = await axios.get(`/musics/${id}`, config);
    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    toast.error('Error to find music');
    return err;
  }
}
