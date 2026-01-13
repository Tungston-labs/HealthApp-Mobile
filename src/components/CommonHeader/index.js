import React from 'react';
import { View, Text } from 'react-native';
import styles from './style';

const CommonHeader = ({ greeting = 'Hi', name = '', subTitle = '' }) => {
  return (
    <View style={styles.headerCard}>
      <View>
        <Text style={styles.greeting}>
          {greeting}{name ? `, ${name}` : ''}
        </Text>
        {subTitle ? <Text style={styles.subTitle}>{subTitle}</Text> : null}
      </View>
    </View>
  );
};

export default CommonHeader;
