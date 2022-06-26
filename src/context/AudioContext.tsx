import * as React from 'react';

import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';

export interface AudioContextInterface {
  PlayerModalRef: React.RefObject<BottomSheetModalMethods>;
  handlePlayerModalPress: () => void;
  handlePlayerModalClose: () => void;
}

export const AudioContext = React.createContext<AudioContextInterface | null>(
  null,
);

const AudioProvider: React.FC = props => {
  const PlayerModalRef = React.useRef<BottomSheetModal>(null);

  const handlePlayerModalPress = React.useCallback(() => {
    PlayerModalRef.current?.present();
  }, []);

  const handlePlayerModalClose = React.useCallback(() => {
    PlayerModalRef.current?.close();
  }, []);

  return (
    <AudioContext.Provider
      value={{
        PlayerModalRef,
        handlePlayerModalPress,
        handlePlayerModalClose,
      }}>
      {props.children}
    </AudioContext.Provider>
  );
};

export default AudioProvider;
