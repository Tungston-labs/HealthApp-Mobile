import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import styles from "./style";

export default function AgeScreen() {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const years = Array.from({ length: 50 }, (_, i) => 1980 + i);

  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedYear, setSelectedYear] = useState(years.length - 1);

  const ITEM_HEIGHT = 40;
  const VISIBLE_ITEMS = 5; 
  const PADDING = (VISIBLE_ITEMS - 1) / 2 * ITEM_HEIGHT; // top & bottom

  const [age, setAge] = useState(0);

  useEffect(() => {
    const birthday = new Date(years[selectedYear], selectedMonth, selectedDay + 1);
    const today = new Date();

    let diff = today.getFullYear() - birthday.getFullYear();
    const m = today.getMonth() - birthday.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) diff--;

    setAge(diff >= 0 ? diff : 0);
  }, [selectedDay, selectedMonth, selectedYear]);

  const onScrollEnd = (event, setItem, length) => {
    const index = Math.round(event.nativeEvent.contentOffset.y / ITEM_HEIGHT);
    if (index >= 0 && index < length) setItem(index);
  };

  const renderItem = (item, index, selectedIndex) => (
    <View style={{ height: ITEM_HEIGHT, justifyContent: "center" }}>
      <Text
        style={[
          styles.wheelText,
          selectedIndex === index && styles.wheelTextActive,
        ]}
      >
        {item}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.ageNumber}>{age}</Text>
      <Text style={styles.ageLabel}>Years</Text>

      <View style={styles.selectionOverlay} />

      <View style={styles.wheelWrapper}>

        <FlatList
          data={days}
          keyExtractor={(i) => i.toString()}
          style={styles.wheel}
          showsVerticalScrollIndicator={false}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate="fast"
          contentContainerStyle={{ paddingVertical: PADDING }}
          onMomentumScrollEnd={(e) =>
            onScrollEnd(e, setSelectedDay, days.length)
          }
          renderItem={({ item, index }) =>
            renderItem(item.toString().padStart(2, "0"), index, selectedDay)
          }
        />

        <FlatList
          data={months}
          keyExtractor={(i) => i}
          style={styles.wheel}
          showsVerticalScrollIndicator={false}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate="fast"
          contentContainerStyle={{ paddingVertical: PADDING }}
          onMomentumScrollEnd={(e) =>
            onScrollEnd(e, setSelectedMonth, months.length)
          }
          renderItem={({ item, index }) =>
            renderItem(item, index, selectedMonth)
          }
        />

        <FlatList
          data={years}
          keyExtractor={(i) => i.toString()}
          style={styles.wheel}
          showsVerticalScrollIndicator={false}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate="fast"
          contentContainerStyle={{ paddingVertical: PADDING }}
          onMomentumScrollEnd={(e) =>
            onScrollEnd(e, setSelectedYear, years.length)
          }
          renderItem={({ item, index }) =>
            renderItem(item, index, selectedYear)
          }
        />

      </View>
    </View>
  );
}
