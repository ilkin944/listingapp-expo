import React, {useContext, useRef} from 'react';
import {
  Application,
  BottomSheetPicker,
  Button,
  Divider,
  Icon,
  ListItem,
  ScreenContainer,
  SizedBox,
  Text,
  TextInput,
  Toast,
} from '@components';
import {Setting, Styles} from '@configs';
import {useTranslation} from 'react-i18next';
import {ScrollView, View} from 'react-native';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {
  domainSelect,
  fontSelect,
  forceDarkSelect,
  languageSelect,
  listingStyleSelect,
} from '@selectors';
import {getNational, getTitleDarkMode, handleRTL} from '@utils';
import {applicationActions} from '@actions';
import Navigator from '@navigator';

export default function Index({navigation}) {
  const {t} = useTranslation();
  const {theme} = useContext(Application);
  const dispatch = useDispatch();
  const languageRef = useRef();
  const darkModeRef = useRef();
  const fontRef = useRef();
  const domainRef = useRef();
  const listingStyleRef = useRef();

  const languageStorage = useSelector(languageSelect);
  const darkModeStorage = useSelector(forceDarkSelect);
  const fontStorage = useSelector(fontSelect);
  const domainStorage = useSelector(domainSelect);
  const listingStyleStorage = useSelector(listingStyleSelect);

  /**
   * change language
   * @param item
   */
  const onChangeLanguage = item => {
    dispatch(applicationActions.changeLanguage(item.value));
    setTimeout(() => {
      handleRTL(item.value);
    }, 500);
  };

  /**
   * change theme
   */
  const onChangeTheme = () => {
    navigation.navigate('SettingTheme');
  };

  /**
   * change dark mode option
   * @param item
   */
  const onChangeDarkMode = item => {
    dispatch(applicationActions.changeDarkMode(item.data));
  };

  /**
   * change font style
   * @param item
   */
  const onChangeFont = item => {
    dispatch(applicationActions.changeFont(item.value));
  };

  /**
   * on change domain
   */
  const onChangeDomain = () => {
    navigation.goBack();
    setTimeout(() => {
      dispatch(
        applicationActions.changeDomain(
          domainRef.current ?? domainStorage,
          ({success, message}) => {
            if (success) {
              Navigator.popToTop();
              Navigator.navigate('Splash');
            }
            Toast.show(t(message));
          },
        ),
      );
    }, 450);
  };

  /**
   * change listing style
   * @param item
   */
  const onChangeListingStyle = item => {
    dispatch(applicationActions.changeListingStyle(item.value));
    dispatch(
      applicationActions.changeDomain(item.domain, ({success, message}) => {
        if (success) {
          Navigator.popToTop();
          Navigator.navigate('Splash');
        }
        Toast.show(t(message));
      }),
    );
  };

  /**
   * on popup change domain
   */
  const onDomain = () => {
    Navigator.showPopup({
      component: (
        <View
          style={[
            styles.popupContainer,
            {
              backgroundColor: theme.colors.card,
            },
          ]}>
          <Text typography="h4" weight="bold">
            {t('domain')}
          </Text>
          <SizedBox height={24} />
          <TextInput
            defaultValue={domainStorage}
            label={t('domain')}
            placeholder={t('input_domain')}
            onChangeText={value => {
              domainRef.current = value;
            }}
            size="small"
          />
          <SizedBox height={24} />
          <View style={Styles.rowCenter}>
            <Button
              style={Styles.flex}
              type="secondary"
              onPress={() => navigation.goBack()}>
              {t('cancel')}
            </Button>
            <SizedBox width={16} />
            <Button style={Styles.flex} onPress={onChangeDomain}>
              {t('ok')}
            </Button>
          </View>
        </View>
      ),
    });
  };

  const listingStyle = [
    {title: t('basic'), value: 'basic', domain: Setting.domain},
    {
      title: t('real_estate'),
      value: 'real_estate',
      domain: 'http://realestate.listarapp.com',
    },
    {
      title: t('food'),
      value: 'food',
      domain: 'http://food.listarapp.com',
    },
  ];

  return (
    <ScreenContainer navigation={navigation} enableKeyboardAvoidingView={true}>
      <BottomSheetPicker
        ref={languageRef}
        title={t('language')}
        onSelect={onChangeLanguage}
        selected={getNational(languageStorage)}
        data={Setting.languageSupport.map(item => {
          return getNational(item);
        })}
      />
      <BottomSheetPicker
        ref={darkModeRef}
        title={t('dark_mode')}
        onSelect={onChangeDarkMode}
        selected={{
          title: getTitleDarkMode(darkModeStorage),
          value: getTitleDarkMode(darkModeStorage),
        }}
        data={[
          {title: t('auto_system'), value: 'auto_system', data: null},
          {title: t('on'), value: 'on', data: true},
          {title: t('off'), value: 'off', data: false},
        ]}
      />
      <BottomSheetPicker
        ref={listingStyleRef}
        title={t('listing')}
        onSelect={onChangeListingStyle}
        selected={
          listingStyle.find(item => item.value === listingStyleStorage) ??
          listingStyle[0]
        }
        data={listingStyle}
      />
      <BottomSheetPicker
        ref={fontRef}
        title={t('font')}
        onSelect={onChangeFont}
        selected={{title: fontStorage, value: fontStorage}}
        data={Setting.fontSupport.map(item => {
          return {
            title: item,
            value: item,
          };
        })}
      />
      <ScrollView>
        <View style={[styles.container, {backgroundColor: theme.colors.card}]}>
          <ListItem
            title={t('language')}
            trailing={
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 18}} typography="subtitle">
                  {
                    getNational(languageStorage ?? Setting.defaultLanguage)
                      .title
                  }
                </Text>
                <Icon name="web" size={18} style={{marginLeft: 5}} />
              </View>
            }
            onPress={() => languageRef.current?.present()}
          />
          <Divider />
          <ListItem
            trailing={
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 18}} typography="subtitle">
                  {t(getTitleDarkMode(darkModeStorage))}
                </Text>
                <Icon
                  name="theme-light-dark"
                  size={18}
                  style={{marginLeft: 5}}
                />
              </View>
            }
            onPress={() => darkModeRef.current?.present()}
          />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
