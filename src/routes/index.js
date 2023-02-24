import React from 'react';
import { Switch } from 'react-router-dom';

import MyRoute from './MyRoute';

import NewMusic from '../pages/NewMusic';
import Musics from '../pages/Musics';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Page404 from '../pages/Page404';
import Playlists from '../pages/Playlists';
import NewPlaylist from '../pages/NewPlaylist';

export default function Routes() {
  return (
    <Switch>
      <MyRoute exact path="/" component={Musics} isClosed={false} />
      <MyRoute exact path="/musics/" component={Musics} />
      <MyRoute exact path="/playlists/" component={Playlists} isClosed />
      <MyRoute exact path="/login/" component={Login} isClosed={false} />
      <MyRoute exact path="/new-music" component={NewMusic} isClosed />
      <MyRoute exact path="/register/" component={Register} isClosed={false} />
      <MyRoute exact path="/new-playlist" component={NewPlaylist} isClosed />
      <MyRoute path="*" component={Page404} />
    </Switch>
  );
}
