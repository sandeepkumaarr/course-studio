import React from 'react';

import Google from '../assets/images/svg/google.svg';
import Play from '../assets/images/svg/play.svg';
import Pause from '../assets/images/svg/pause.svg';
import Download from '../assets/images/svg/download.svg';
import Minimize from '../assets/images/svg/minimize.svg';
import Logo from '../assets/images/svg/logo.svg';
import Home from '../assets/images/svg/home.svg';

export declare type SVGTypes =
  | 'google'
  | 'play'
  | 'pause'
  | 'download'
  | 'minimize'
  | 'logo'
  | 'home';

type SVGprops = {
  type: SVGTypes;
  height: string;
  width: string;
  style?: object;
};

export const SVGIcon: React.FC<SVGprops> = ({type, height, width, style}) => {
  let Component: any;
  let props = {
    height: height,
    width: width,
    style: style,
  };

  switch (type) {
    case 'google':
      Component = Google;
      break;

    case 'play':
      Component = Play;
      break;

    case 'pause':
      Component = Pause;
      break;

    case 'download':
      Component = Download;
      break;

    case 'minimize':
      Component = Minimize;
      break;

    case 'logo':
      Component = Logo;
      break;

    case 'home':
      Component = Home;
      break;
  }

  return <Component {...props} />;
};
