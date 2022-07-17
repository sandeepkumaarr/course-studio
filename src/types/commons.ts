import {Audio} from './audio';
import {Home} from './home';
import {User} from './user';

export type State = {
  Home: Home;
  User: User;
  Audio: Audio;
};

export type ErrorHandler = {
  bgColor: '#fc4c4c' | '#13CE66' | '#FFCC3D';
  title: string;
  message: string;
};
