import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as colors from '../../config/colors';

export const MusicContainer = styled.div`
  margin-top: 20px;
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 0;
  }

  div + div {
    height: 4em;
    border-top: 1px solid ${colors.primaryColor};
  }

  img {
    width: 50px;
    height: 50px;
  }
`;

export const MusicImage = styled.div`
  img {
    width: 55px;
    height: 55px;
    border-radius: 50%;
  }
`;

export const NewMusic = styled(Link)`
  border: 1px solid ${colors.primaryDarkColor};
  border-radius: 30px;
  margin-top: 20px;
  width: 150px;
  text-align: center;
  display: block;
  padding: 5px 5px 5px 5px;
`;

export const Playlist = styled(Link)`
  border: 1px solid ${colors.primaryDarkColor};
  border-radius: 30px;
  margin-top: 20px;
  width: 150px;
  text-align: center;
  display: block;
  padding: 5px 5px 5px 5px;
`;

export const Login = styled(Link)`
  border: 1px solid ${colors.primaryDarkColor};
  border-radius: 30px;
  margin-top: 20px;
  width: 200px;
  text-align: center;
  display: block;
  padding: 5px 5px 5px 5px;
`;

export const Play = styled(Link)`
  display: block;
  align-items: center;
  justify-content: center;
  padding: 15px 5px 5px 5px;
  h1 {
    padding: 15px 0 0 0;
    justify-content: center;
    display: flex;
    font-size: 2em;
    color: #000;
  }
  h2 {
    justify-content: center;
    display: flex;
    font-size: 1.3em;
    color: #808080;
  }
`;

export const MusicPLayerImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    box-shadow: 0 0 100px 0 rgba(0, 0, 0, 5.5);
    width: 25em;
    height: 25em;
  }
`;

export const ChangePlay = styled(Link)`
  text-align: right;
  display: block;
  padding: 5px 5px 5px 5px;
`;

export const Player = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 5px 5px 5px;
`;
