import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './style';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { format, parse } from 'date-fns';

const PersonalDetailsCard = ({ isOpen, onToggle, data, time, progress }) => {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Image source={data?.profile_pic_url} style={styles.avatar} />

        <View style={styles.info}>
          <Text style={styles.name}>{data?.name}</Text>
          <Text style={styles.time}>
            {time
              ? format(parse(time, 'HH:mm:ss', new Date()), 'HH:mm')
              : '00:00'}
          </Text>
        </View>

        <View style={styles.progressBadge}>
          <Text style={styles.progressText}>
            {progress.count}/{progress.total}
          </Text>
        </View>
      </View>
      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <Icon name="water-outline" size={16} />
          <Text style={styles.metaText}>{data?.blood_group}</Text>
        </View>

        <View style={styles.metaItem}>
          <Icon name="barbell-outline" size={16} />
          <Text style={styles.metaText}>{data?.weight} KG</Text>
        </View>

        <View style={styles.metaItem}>
          <MaterialIcons name="human-male-height" size={16} color="#666" />
          <Text style={styles.metaText}>{data?.height}</Text>
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.dateRow}>
        <View style={styles.dateBlock}>
          <Text style={styles.label}>Start date</Text>
          <Text style={styles.value}>need to change</Text>
        </View>

        <View style={styles.dateBlock}>
          <Text style={styles.label}>End date</Text>
          <Text style={styles.value}>need to change</Text>
        </View>
      </View>

      {isOpen && (
        <>
          <View style={styles.divider} />

          <View style={styles.section}>
            <Text style={styles.label}>Workout Goals</Text>
            <Text style={styles.value}>need to change</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.section}>
            <Text style={styles.label}>
              Have any (Health condition / injury)
            </Text>
            <Text style={styles.value}>{data?.health_issues}</Text>
          </View>

          <View style={styles.row}>
            <View style={styles.half}>
              <Text style={styles.label}>Pin code</Text>
              <Text style={styles.value}>need to change</Text>
            </View>
            <View style={styles.half}>
              <Text style={styles.label}>City / Town</Text>
              <Text style={styles.value}>need to change</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.section}>
            <Text style={styles.label}>Landmark</Text>
            <Text style={styles.value}>need to change</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.section}>
            <Text style={styles.label}>Address</Text>
            <Text style={styles.value}>{data?.address}</Text>
          </View>
          <View style={styles.divider} />
        </>
      )}

      <TouchableOpacity style={styles.arrow} onPress={onToggle}>
        <Icon
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          size={22}
          color="#FFF"
        />
      </TouchableOpacity>
    </View>
  );
};

export default PersonalDetailsCard;
