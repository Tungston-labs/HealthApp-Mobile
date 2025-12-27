// components/ReviewCard.js
import React from 'react';
import { View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ReviewCard = ({ image, name, date, rating, text }) => {
  return (
    <View
      style={{
        backgroundColor: '#D9D9D9',
        padding: 14,
        borderRadius: 14,
        marginTop: 22,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={image}
          style={{ width: 50, height: 50, borderRadius: 30 }}
        />

        <View style={{ marginLeft: 10, flex: 1 }}>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'SegoeUI',
              fontWeight: '700',
            }}
          >
            {name}
          </Text>
          <Text style={{ fontSize: 12, color: '#666' }}>{date}</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          {[1, 2, 3, 4, 5].map(i => (
            <Icon
              key={i}
              name={i <= rating ? 'star' : 'star-outline'}
              size={18}
              color="#FBC02D"
              style={{ marginLeft: 2 }}
            />
          ))}
        </View>
      </View>

      <Text
        style={{
          marginTop: 10,
          fontSize: 14,
          fontFamily: 'SegoeUI',
          color: '#444',
          lineHeight: 20,
        }}
      >
        {text}
      </Text>
    </View>
  );
};

export default ReviewCard;
