import React, {useContext} from 'react';
import {Pressable, View} from 'react-native';
import PropTypes from 'prop-types';
import {
  Application,
  ContentLoader,
  Icon,
  Image,
  SizedBox,
  Text,
} from '@components';
import styles from './styles';
import {Styles} from '@configs';

const Index = props => {
  const {theme} = useContext(Application);
  const {style, user, onPress} = props;

  /**
   * render for content
   */
  const renderContent = () => {
    if (!user?.id) {
      return (
        <View style={[Styles.row, Styles.flex]} onPress={onPress}>
          <ContentLoader style={styles.image} />
          <SizedBox width={8} />
          <View style={Styles.flex}>
            <SizedBox height={10} width={100}>
              <ContentLoader />
            </SizedBox>
            <SizedBox height={4} />
            <SizedBox height={10} width={120}>
              <ContentLoader />
            </SizedBox>
            <SizedBox height={4} />
            <SizedBox height={10} width={150}>
              <ContentLoader />
            </SizedBox>
          </View>
        </View>
      );
    }

    return (
      <Pressable
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: 10,
          paddingBottom: 10,
        }}
        onPress={onPress}>
        <Image style={styles.image} source={{uri: user.image}} />
        <SizedBox width={8} />
        <View style={Styles.flex}>
          <Text style={{fontSize: 16}} typography="subtitle" weight="bold">
            {user.name}
          </Text>
          {user?.description && (
            <>
              <SizedBox height={4} />
            </>
          )}
          <SizedBox height={4} />
        </View>
        <Icon style={{marginRight: 10}} name="cog" />
      </Pressable>
    );
  };

  return (
    <View
      style={[
        Styles.card,
        styles.container,
        {backgroundColor: theme.colors.card},
        style,
      ]}>
      {renderContent()}
    </View>
  );
};

Index.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  user: PropTypes.object,
  onPress: PropTypes.func,
};

Index.defaultProps = {
  style: {},
  user: {},
  onPress: () => {},
};

export default Index;
