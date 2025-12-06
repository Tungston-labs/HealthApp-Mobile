// screens/NotificationScreen.js
import React from 'react';
import { View, Text } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import HeaderWithBack from "../../components/HeaderWithBack";
import styles from './style';

const notifications = [
  {
    id: 1,
    title: "Reminder",
    text: "Your training will start in 1 hour, get ready to move.",
    time: "2 hours ago",
    icon: "time",
  },
  {
    id: 2,
    title: "Workout Alert",
    text: "It's time for your evening workout session.",
    time: "5 hours ago",
    icon: "time",
  },
  {
    id: 3,
    title: "Hydration",
    text: "Don't forget to drink water and stay hydrated.",
    time: "Yesterday",
    icon: "time",
  },
  {
    id: 4,
    title: "Diet Plan",
    text: "Your meal plan for today has been updated.",
    time: "Yesterday",
    icon: "time",
  },
];

export default function NotificationScreen() {
  return (
    <View style={styles.container}>
      <HeaderWithBack title="Notifications" />

      <Text style={styles.title}>Today</Text>

      {notifications.map((item) => (
        <View key={item.id} style={styles.card}>
          <Icon
            name={item.icon}
            size={32}
            color="#000"
            style={styles.icon}
          />

          <View style={styles.textContainer}>
            <Text style={styles.header}>{item.title}</Text>
            <Text style={styles.description}>{item.text}</Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}
