import { Images } from '@configs';
import { I18nManager, LayoutAnimation, Platform, UIManager } from 'react-native';
import * as Location from 'expo-location';
import * as Updates from 'expo-updates';
import * as FileSystem from 'expo-file-system';

const trackTimeStore = {};

export function startTrackTime(key) {
  if (trackTimeStore[key]) {
    throw 'start track already start';
  }
  trackTimeStore[key] = Date.now();
}

export function validateTheme(data) {
  if (data && data?.id && data?.light && data?.dark) {
    return true;
  }
  return false;
}

export function getFileName(uri) {
  if (uri) {
    return uri.substring(uri.lastIndexOf('/') + 1);
  }
  return null;
}

export async function fileExists(uri) {
  const fileName = getFileName(uri);
  const path = `${FileSystem.documentDirectory}/${fileName}`;
  return (await FileSystem.getInfoAsync(path)).exists;
}

export function getFilePath(fileName) {
  return `${FileSystem.documentDirectory}/${fileName}`;
}

export const enableExperimental = () => {
  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental?.(true);
  }
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
};

export const getCurrentLocation = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync();
        resolve(location);
      } else {
        resolve();
      }
    } catch (error) {
      resolve();
    }
  });
};

export const convertIcon = name => {
  if (name.includes('far fa-')) {
    name = name?.replace('far fa-', '');
    return { name };
  }
  if (name.includes('fas fa-')) {
    name = name?.replace('fas fa-', '');
    return { name, solid: true };
  }
  if (name.includes('fab fa-')) {
    name = name?.replace('fab fa-', '');
    return { name, brand: true };
  }
  return { name };
};

export function stopTrackTime(key) {
  if (!trackTimeStore[key] || typeof trackTimeStore[key] !== 'number') {
    throw 'could not found start track';
  }
  console.log(`TRACK TIME ${key}`, Date.now() - trackTimeStore[key]);
  delete trackTimeStore[key];
}

export function validate(
  value,
  { empty = false, match, email = false, number = false },
) {
  if (!value && !empty) {
    return 'value_not_empty';
  }
  if (match && match !== value) {
    return 'value_not_match';
  }
  if (email) {
    const regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
    const valid = regex.test(value);
    if (!valid) {
      return 'not_an_email';
    }
  }
  if (number) {
    const regex = new RegExp('^[0-9]*$');
    const valid = regex.test(value);
    if (!valid) {
      return 'not_an_number';
    }
  }
}

export function delay(ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

export function getNational(code) {
  switch (code) {
    case 'ar':
      return {
        value: 'ar',
        title: 'Arabic',
        icon: Images.ar,
      };

    case 'ru':
      return {
        value: 'ru',
        title: 'Russian',
        icon: Images.ru,
      };

    case 'tr':
      return {
        value: 'tr',
        title: 'Türkçe',
        icon: Images.tr,
      };

    case 'az':
      return {
        value: 'az',
        title: 'Azərbaycanca',
        icon: Images.az,
      };

    default:
    case 'en':
      return {
        value: 'en',
        title: 'English',
        icon: Images.en,
      };
  }
}

export const handleRTL = language => {
  const isLanguageRTL = code => {
    switch (code) {
      case 'ar':
      case 'he':
        return true;
      default:
        return false;
    }
  };

  const isRTL = isLanguageRTL(language);
  if (isRTL !== I18nManager.isRTL) {
    I18nManager.forceRTL(isRTL);
    Updates.reloadAsync();
  }
};

export function getTitleDarkMode(value) {
  switch (value) {
    case true:
      return 'on';
    case false:
      return 'off';

    default:
      return 'auto_system';
  }
}

export function isValidURL(string) {
  const res = string.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
  );
  return res !== null;
}
