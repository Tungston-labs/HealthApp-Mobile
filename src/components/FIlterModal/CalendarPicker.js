import React, { useState, useEffect, useRef } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

export default function CalendarPicker({
  selectedDate,
  onSelect,
}) {
  const ITEM_HEIGHT = 40;
  const VISIBLE_ITEMS = 5;
  const PADDING =
    ((VISIBLE_ITEMS - 1) / 2) * ITEM_HEIGHT;

  const dayRef = useRef(null);
  const monthRef = useRef(null);
  const yearRef = useRef(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const years = Array.from(
    { length: 60 },
    (_, i) => 2020 + i
  );

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const parseDate = (dateString) => {
    if (!dateString) {
      return new Date(today);
    }

    const [year, month, day] = dateString
      .split("-")
      .map(Number);

    const date = new Date(
      year,
      month - 1,
      day
    );

    date.setHours(0, 0, 0, 0);

    return date;
  };

  let initialDate = parseDate(selectedDate);

  if (initialDate < today) {
    initialDate = new Date(today);
  }

  const [selectedDay, setSelectedDay] =
    useState(initialDate.getDate() - 1);

  const [selectedMonth, setSelectedMonth] =
    useState(initialDate.getMonth());

  const [selectedYear, setSelectedYear] =
    useState(
      years.indexOf(initialDate.getFullYear())
    );

  const daysInMonth = new Date(
    years[selectedYear],
    selectedMonth + 1,
    0
  ).getDate();

  const days = Array.from(
    { length: daysInMonth },
    (_, i) => i + 1
  );

  useEffect(() => {
    const day = days[selectedDay];

    if (!day) return;

    const year = years[selectedYear];
    const month = selectedMonth;

    const dateString = `${year}-${String(
      month + 1
    ).padStart(2, "0")}-${String(day).padStart(
      2,
      "0"
    )}`;

    onSelect(dateString);
  }, [
    selectedDay,
    selectedMonth,
    selectedYear,
  ]);

  useEffect(() => {
    if (selectedDay >= days.length) {
      setSelectedDay(days.length - 1);
    }
  }, [selectedMonth, selectedYear]);

  const onScrollEnd = (
    event,
    setter,
    length
  ) => {
    const index = Math.round(
      event.nativeEvent.contentOffset.y /
        ITEM_HEIGHT
    );

    if (index >= 0 && index < length) {
      setter(index);
    }
  };

  const renderItem = (
    item,
    index,
    selectedIndex
  ) => (
    <View
      style={{
        height: ITEM_HEIGHT,
        justifyContent: "center",
      }}
    >
      <Text
        style={[
          styles.wheelText,
          selectedIndex === index &&
            styles.wheelTextActive,
        ]}
      >
        {item}
      </Text>
    </View>
  );

  return (
    <View style={styles.wheelWrapper}>
      <View style={styles.selectionOverlay} />

      <FlatList
        ref={dayRef}
        data={days}
        keyExtractor={(i) => i.toString()}
        initialScrollIndex={selectedDay}
        getItemLayout={(data, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        style={styles.wheel}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        contentContainerStyle={{
          paddingVertical: PADDING,
        }}
        onMomentumScrollEnd={(e) =>
          onScrollEnd(
            e,
            setSelectedDay,
            days.length
          )
        }
        renderItem={({ item, index }) =>
          renderItem(
            String(item).padStart(2, "0"),
            index,
            selectedDay
          )
        }
      />

      <FlatList
        ref={monthRef}
        data={months}
        keyExtractor={(i) => i}
        initialScrollIndex={selectedMonth}
        getItemLayout={(data, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        style={styles.wheel}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        contentContainerStyle={{
          paddingVertical: PADDING,
        }}
        onMomentumScrollEnd={(e) =>
          onScrollEnd(
            e,
            setSelectedMonth,
            months.length
          )
        }
        renderItem={({ item, index }) =>
          renderItem(
            item,
            index,
            selectedMonth
          )
        }
      />

      <FlatList
        ref={yearRef}
        data={years}
        keyExtractor={(i) => i.toString()}
        initialScrollIndex={selectedYear}
        getItemLayout={(data, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        style={styles.wheel}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        contentContainerStyle={{
          paddingVertical: PADDING,
        }}
        onMomentumScrollEnd={(e) =>
          onScrollEnd(
            e,
            setSelectedYear,
            years.length
          )
        }
        renderItem={({ item, index }) =>
          renderItem(
            item.toString(),
            index,
            selectedYear
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wheelWrapper: {
    flexDirection: "row",
    width: "100%",
    height: 200,
    backgroundColor: "#EFEEE9",
    justifyContent: "space-between",
    position: "relative",
    marginTop: 10,
    borderRadius: 20,
    overflow: "hidden",
  },
  wheel: {
    flex: 1,
  },
  wheelText: {
    fontSize: 18,
    textAlign: "center",
    color: "#999",
    fontFamily: "SegoeUI",
  },
  wheelTextActive: {
    color: "#000",
    fontWeight: "700",
  },
  selectionOverlay: {
    position: "absolute",
    top: 80,
    left: 0,
    right: 0,
    height: 40,
    zIndex: 10,
    borderRadius: 6,
  },
});