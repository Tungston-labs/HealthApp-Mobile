// components/RatingBar.js
import React from "react";
import { View, Text } from "react-native";

const RatingBar = ({ label, rating = 0 }) => {
  return (
    <View style={{ marginBottom: 10 }}>
      {label && (
        <Text style={{ fontSize: 13, fontFamily: "SegoeUI" }}>
          {label}
        </Text>
      )}

      <View
        style={{
          height: 6,
          backgroundColor: "#f0f0f0",
          borderRadius: 5,
          marginTop: 5,
        }}
      >
        <View
          style={{
            width: `${rating * 20}%`,
            height: 6,
            backgroundColor: "#FBC02D",
            borderRadius: 5,
          }}
        />
      </View>

      {rating !== undefined && rating !== null && (
        <Text
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            fontSize: 13,
            fontFamily: "SegoeUI",
          }}
        >
          {rating.toFixed(1)}
        </Text>
      )}
    </View>
  );
};


export default RatingBar;
