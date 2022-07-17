import {Platform} from 'react-native';
import RNFetchBlob, {RNFetchBlobConfig} from 'rn-fetch-blob';
import {File} from '../types/audio';
import {showErrorMessage} from './ErrorHandler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AudioFileInfo, EpisodeItems} from '../types/home';

const saveAudioFileInfo = async (value: AudioFileInfo) => {
  try {
    await AsyncStorage.setItem(value.name, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};

export const downloadFile = async (file: File) => {
  const {title, ext, downloadUrl, created_at, id, index} = file;

  try {
    const {
      dirs: {DownloadDir, DocumentDir},
    } = RNFetchBlob.fs;

    const directoryPath = Platform.select({
      ios: DocumentDir,
      android: DownloadDir,
    });

    const fileName = title?.replace(/[^A-Z0-9]/gi, '') + '.mp3';
    const filePath = `${directoryPath}/${fileName}`;

    console.log(fileName);

    const configOptions = Platform.select({
      ios: {
        fileCache: true,
        path: filePath,
        appendExt: ext,
        notification: true,
      },
      android: {
        fileCache: true,
        appendExt: ext,
        addAndroidDownloads: {
          useDownloadManager: true,
          title: fileName,
          mediaScannable: true,
          notification: true,
          path: filePath,
        },
      },
    });

    RNFetchBlob.fs.exists(filePath).then(exist => {
      if (exist) {
        showErrorMessage({
          bgColor: '#FFCC3D',
          title: 'Already exist',
          message: 'The audio is already available on the downloads screen.',
        });
        return;
      } else {
        RNFetchBlob.config(configOptions as RNFetchBlobConfig)
          .fetch('GET', downloadUrl)
          .then(res => {
            showErrorMessage({
              bgColor: '#13CE66',
              title: 'Success',
              message:
                'The audio has been successfully downloaded, and you can listen to it locally in the downloads screen.',
            });

            saveAudioFileInfo({
              created_at: created_at,
              id: id,
              name: title,
              url: downloadUrl,
              index: index,
              localFilePath: res.path(),
            });
          })
          .catch(e => {
            showErrorMessage({
              bgColor: '#fc4c4c',
              title: 'Failed',
              message:
                "Please try again if you're having trouble downloading this audio right now.",
            });
            console.log('fetch error: ', e);
          });
      }
    });
  } catch (error) {
    console.log('general error: ', error);
  }
};
