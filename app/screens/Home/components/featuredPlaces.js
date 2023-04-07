import React from 'react';
import {FlatList, StyleSheet, View, ScrollView} from 'react-native';
import {CategoryItem, SizedBox, Text} from '@components';
import PropTypes from 'prop-types';
import {Styles} from '@configs';
import {useTranslation} from 'react-i18next';
import {Divider} from '@components';
import {Image} from 'react-native';

export default function Locations(props) {
  const {t} = useTranslation();
 const {data} = props

  const renderItem = ({item}) => (
    <View style={{display: 'flex', flexDirection: 'row'}}>
      <CategoryItem item={item} type="card" onPress={() => {
        navigator.navigate("ProductList")
      }} />
    </View>
  );

  return (
    <>
      <View style={styles.titleContainer}>
        <Text style={{fontSize: 22}} typography="h4" weight="bold">
          {t('featured_places')}
        </Text>
        <SizedBox height={2} />
      </View>

      <ScrollView
        contentContainerStyle={{
          display: 'flex',
          flexDirection: 'row',
          paddingLeft: 15,
        }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {data.length > 0 &&
          data.map(item => (
            <View
              onPress={() => {
                navigator.navigate("ProductList")
              }}
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginTop: 5,
                marginBottom: 15,
                flex: 1,
              }}
              key={item._id}>
              <View
                style={{
                  marginRight: 15,
                  borderWidth: 1,
                  borderRadius: 5,
                  width: 280,
                }}>
                <Image
                  source={{uri: `${item.image}`}}
                  style={{
                    width: '100%',
                    aspectRatio: 1,
                    borderRadius: 5,
                  }}
                />
                <Text style={{fontSize: 20}}>{item.listingTitle}</Text>
                <Text style={{fontSize: 15, color: 'grey'}}>
                  {item.category}
                </Text>
              </View>
            </View>
          ))}
        <Divider />
      </ScrollView>
    </>
  );
}

Locations.propTypes = {
  onPress: PropTypes.func,
};

Locations.defaultProps = {
  onPress: () => {

  },
};

const styles = StyleSheet.create({
  titleContainer: {
    paddingHorizontal: 16,
    marginTop: 5,
  },
  item: {width: 250, height: 160, paddingHorizontal: 8},
});
