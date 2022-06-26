import {Audio} from './audio';
import {Home} from './home';
import {User} from './user';

export type State = {
  Home: Home;
  User: User;
  Audio: Audio;
};
