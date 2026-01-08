import React from 'react';
import { View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './style';

const AssignedClientCard = ({ data }) => {
  return (
    <View style={styles.card}>
      {/* Avatar */}
      <Image source={{uri:data?.client_profile_pic}} style={styles.avatar} />

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.name}>{data?.client_name}</Text>

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Icon name="fitness-outline" size={14} color="#777" />
            <Text style={styles.metaText}>{data?.client_weight} KG</Text>
          </View>

          <View style={styles.metaItem}>
            <Icon name="flame-outline" size={14} color="#777" />
            <Text style={styles.metaText}>{data?.client_height}</Text>
          </View>

          <View style={styles.metaItem}>
            <Icon name="time-outline" size={14} color="#777" />
            <Text style={styles.metaText}>
              Session Time : {data?.session_time}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AssignedClientCard;
