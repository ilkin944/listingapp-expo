import React, {useContext, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {
  Application,
  Empty,
  Icon,
  ProductItem,
  SearchPicker,
  SizedBox,
  Text,
} from '@components';
import {ScrollView} from 'react-native';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import {Styles} from '@configs';
import {discoveryActions} from '@actions';
import {discoverySelect} from '@selectors';
import {convertIcon} from '@utils';
export default function Discovery({navigation}) {
  const {theme} = useContext(Application);
  const {t} = useTranslation();
  const [refreshing, setRefreshing] = useState(false);
  const [ready, setReady] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector(discoverySelect);

  useEffect(() => {
    setTimeout(() => setReady(true), 1);
  }, []);

  /**
   * on refresh
   */
  const onRefresh = () => {
    setRefreshing(true);
    dispatch(
      discoveryActions.onLoad(() => {
        setRefreshing(false);
      }),
    );
  };

  /**
   * on search
   */
  const onSearch = () => {
    navigation.navigate('Search');
  };

  /**
   * on scan qrcode
   */
  const onScan = () => {
    navigation.navigate('ScanQR');
  };

  /**
   * on press category
   */
  const onPressCategory = item => {
    navigation.navigate('Listing', {item: item.category});
  };

  /**
   * on press product
   */
  const onPressProduct = item => {
    navigation.navigate('ProductDetail', {item});
  };

  /**
   * render item
   * @param item
   * @returns {JSX.Element}
   */
  const renderItem = ({item}) => {
    return (
      <>
        <View style={styles.item}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{paddingLeft: 2}}>
              <Text style={{fontSize: 22}} typography="title" weight="bold">
                {item.category?.title}
              </Text>
              <SizedBox height={4} />
              <Text
                style={{fontSize: 14}}
                typography="caption"
                type="secondary">
                {item.category?.count} {t('location')}
              </Text>
              <TouchableOpacity onPress={() => onPressCategory(item)}>
                <Text
                  style={{
                    color: 'orange',
                    fontSize: 14,
                    borderWidth: 1,
                    padding: 4,
                    marginTop: 4,
                    marginBottom: 4,
                    borderColor: 'orange',
                    borderRadius: 5,
                  }}
                  typography="caption"
                  color="secondary">
                  {t('see_more')}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.iconContainer,
                {
                  backgroundColor: item.category?.color,
                },
              ]}>
              <Icon
                {...convertIcon(item.category?.icon)}
                size={18}
                color="white"
                type="FontAwesome5"
              />
            </View>
          </View>
        </View>
        <FlatList
          contentContainerStyle={Styles.padding8}
          data={item.list}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={renderProduct}
          keyExtractor={(i, index) => `${i?.id}${index}`}
        />
      </>
    );
  };

  /**
   * render product item
   * @param item
   * @returns {JSX.Element}
   */
  const renderProduct = ({item}) => {
    return (
      <ProductItem
        item={item}
        type="thumb"
        onPress={() => onPressProduct(item)}
      />
    );
  };

  const renderContent = () => {
    if (ready) {
      return (
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={theme.colors.text}
              title={t('pull_to_reload')}
              titleColor={theme.colors.text}
              colors={[theme.colors.primary]}
              progressBackgroundColor={theme.colors.card}
            />
          }
          data={data ?? []}
          renderItem={renderItem}
          ListEmptyComponent={
            <Empty
              loading={!data}
              style={Styles.flex}
              title={t('not_found_matching')}
              message={t('please_check_keyword_again')}
            />
          }
          keyExtractor={(item, index) => `${item?.id}${index}`}
          style={Styles.flex}
          contentContainerStyle={styles.listContainer}
        />
      );
    }
    return (
      <View style={Styles.flexCenter}>
        <ActivityIndicator color={theme.colors.primary} size="large" />
      </View>
    );
  };

  return (
    <>
      <View style={styles.searchContainer}>
        <SearchPicker
          style={styles.searchSelf}
          onSearch={onSearch}
          onScan={onScan}
        />
      </View>
      {renderContent()}
    </>
  );
}
