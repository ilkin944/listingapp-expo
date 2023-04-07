import React, {useContext, useState, useEffect} from 'react';
import {RefreshControl, useWindowDimensions, View} from 'react-native';
import Animated, {
  interpolate,
  log,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {
  Application,
  ImageSlider,
  SafeAreaView,
  SearchPicker,
  SizedBox,
} from '@components';
import {Styles} from '@configs';
import {Divider} from '@rneui/themed';

// import {homeSelect} from '@selectors';
import {homeActions} from '@actions';
import Categories from './components/category';
import FeaturedPlaces from './components/featuredPlaces';
import LastAdded from './components/lastAdded';
import styles from './styles';
// import Mekanlar from './components/mekanlar';
import NearMe from './components/nearMe';
import Story from '../Story';
import Recommended from './components/recommended';
import Events from './components/events';

export default function Home({navigation}) {
  const insets = useSafeAreaInsets();
  const {height: heightDevice} = useWindowDimensions();
  const bannerHeight = heightDevice * 0.3;
  const {theme} = useContext(Application);
  const {t} = useTranslation();

  const [poularLocations, setPoularLocations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [banner, setBanner] = useState([]);
  const [lastAdded, setLastAdded] = useState([]);
  const [nearMe, setNearMe] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [event, setEvent] = useState([]);

  useEffect(() => {
    // Fetch data from API
    const listings = fetch(
      'https://adminpanelback.onrender.com/api/listings',
    ).then(res => res.json());
    const categories = fetch(
      'https://adminpanelback.onrender.com/api/categories',
    ).then(res => res.json());
    const banners = fetch(
      'https://adminpanelback.onrender.com/api/banners',
    ).then(res => res.json());
    const lastAddeds = fetch(
      'https://adminpanelback.onrender.com/api/banners',
    ).then(res => res.json());
    const nearmes = fetch(
      'https://adminpanelback.onrender.com/api/banners',
    ).then(res => res.json());
    const recommendeds = fetch(
      'https://adminpanelback.onrender.com/api/banners',
    ).then(res => res.json());
    const events = fetch('https://adminpanelback.onrender.com/api/events').then(
      res => res.json(),
    );

    Promise.all([
      listings,
      categories,
      banners,
      lastAddeds,
      nearmes,
      recommendeds,
      events,
    ])
      .then(responses => {
        const [
          response1,
          response2,
          response3,
          response4,
          response5,
          response6,
          response7,
        ] = responses;
        setCategories(response2);
        setPoularLocations(response1);
        setBanner(response3);
        setLastAdded(response4);
        setNearMe(response5);
        setRecommended(response6);
        setEvent(response7);
      })

      .catch(error => {
        // Handle error here
        console.error(error);
      });
  }, []);

  const translationY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(
    ({layoutMeasurement, contentOffset, contentSize}) => {
      if (layoutMeasurement.height + contentOffset.y >= contentSize.height) {
        return;
      }
      translationY.value = contentOffset.y;
    },
  );
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  /**
   * on refresh
   */
  const onRefresh = async () => {
    setRefreshing(true);
    dispatch(
      homeActions.onLoad(() => {
        setRefreshing(false);
      }),
    );
  };

  const onSearch = () => {
    navigation.navigate('Search');
  };

  const onScan = () => {
    navigation.navigate('ScanQR');
  };

  const onCategory = item => {
    if (item?.category) {
      navigation.push('CategoryList', {item});
    } else {
      navigation.navigate('Listing', {item});
    }
  };
  /*
 @params item
 @return JSX Element
*/
  const onPressProduct = () => {
    navigation.navigate('Search');
  };

  const onCategoryList = () => {
    navigation.navigate('CategoryList', {item});
  };

  const actionStyle = useAnimatedStyle(() => {
    const minHeight = insets.top + 60;
    const height = withTiming(
      interpolate(
        translationY.value,
        [0, 0, bannerHeight, bannerHeight],
        [bannerHeight, bannerHeight, minHeight, minHeight],
      ),
      {duration: 0},
    );
    return {
      height,
      position: 'absolute',
      backgroundColor: theme.colors.background,
      zIndex: 1,
    };
  });

  return (
    <View style={Styles.flex}>
      <Animated.View style={actionStyle}>
        {banner.length > 0 && (
          <ImageSlider
            style={styles.slider}
            paginationStyle={styles.sliderDot}
            data={banner}
          />
        )}
        <SizedBox height={28} />
        <SafeAreaView edges={['left', 'right']} mode="margin">
          <SearchPicker
            style={styles.searchContainer}
            onSearch={onSearch}
            onScan={onScan}
          />
        </SafeAreaView>
      </Animated.View>
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            progressViewOffset={bannerHeight}
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.text}
            title={t('pull_to_reload')}
            titleColor={theme.colors.text}
            colors={[theme.colors.primary]}
            progressBackgroundColor={theme.colors.card}
          />
        }>
        <SafeAreaView edges={['left', 'right']} mode="margin">
          <SizedBox height={bannerHeight} />
          <SizedBox height={12} />
          <Story />
          {categories.length > 0 && (
            <Categories data={categories} onPress={onCategory} />
          )}
          <SizedBox height={12} />
          {poularLocations.length > 0 && (
            <FeaturedPlaces data={poularLocations} onPress={onSearch} />
          )}

          {lastAdded.length > 0 && (
            <LastAdded data={lastAdded} onPress={onPressProduct} />
          )}
          <SizedBox height={12} />

          {nearMe.length > 0 && (
            <NearMe data={nearMe} onPress={onPressProduct} />
          )}
          <SizedBox height={12} />

          {recommended.length > 0 && (
            <Recommended data={recommended} onPress={onPressProduct} />
          )}
          <SizedBox height={15} />

          {event.length > 0 && <Events data={event} onPress={onPressProduct} />}
        </SafeAreaView>
      </Animated.ScrollView>
    </View>
  );
}
