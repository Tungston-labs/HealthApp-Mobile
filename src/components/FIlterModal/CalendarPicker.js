import React, { useState, useEffect, useRef } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

export default function CalendarPicker({ selectedDate, onSelect }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const initialDate = selectedDate
    ? new Date(selectedDate)
    : new Date();

  const safeInitial =
    initialDate < today ? today : initialDate;

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const years = Array.from({ length: 60 }, (_, i) => 2020 + i);

  const ITEM_HEIGHT = 40;
  const VISIBLE_ITEMS = 5;
  const PADDING = ((VISIBLE_ITEMS - 1) / 2) * ITEM_HEIGHT;

  const dayRef = useRef(null);
  const monthRef = useRef(null);
  const yearRef = useRef(null);

  const [selectedDay, setSelectedDay] = useState(safeInitial.getDate() - 1);
  const [selectedMonth, setSelectedMonth] = useState(safeInitial.getMonth());
  const [selectedYear, setSelectedYear] = useState(
    years.indexOf(safeInitial.getFullYear())
  );

  // ✅ SEND DATE TO PARENT (PAST DATES BLOCKED)
  useEffect(() => {
    const day = String(days[selectedDay]).padStart(2, "0");
    const month = String(selectedMonth + 1).padStart(2, "0");
    const year = years[selectedYear];

    const composedDate = new Date(`${year}-${month}-${day}`);
    composedDate.setHours(0, 0, 0, 0);

    if (composedDate < today) {
      // 🔒 Auto-fix to today
      setSelectedDay(today.getDate() - 1);
      setSelectedMonth(today.getMonth());
      setSelectedYear(years.indexOf(today.getFullYear()));
      return;
    }

    onSelect(`${year}-${month}-${day}`);
  }, [selectedDay, selectedMonth, selectedYear]);

  const scrollToInitial = () => {
    dayRef.current?.scrollToOffset({
      offset: selectedDay * ITEM_HEIGHT,
      animated: false,
    });
    monthRef.current?.scrollToOffset({
      offset: selectedMonth * ITEM_HEIGHT,
      animated: false,
    });
    yearRef.current?.scrollToOffset({
      offset: selectedYear * ITEM_HEIGHT,
      animated: false,
    });
  };

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
    <View style={styles.wheelWrapper}>
      <View style={styles.selectionOverlay} />

      {/* DAY */}
      <FlatList
        ref={dayRef}
        data={days}
        keyExtractor={(i) => i.toString()}
        style={styles.wheel}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        onLayout={scrollToInitial}
        contentContainerStyle={{ paddingVertical: PADDING }}
        onMomentumScrollEnd={(e) =>
          onScrollEnd(e, setSelectedDay, days.length)
        }
        renderItem={({ item, index }) =>
          renderItem(item.toString().padStart(2, "0"), index, selectedDay)
        }
      />

      {/* MONTH */}
      <FlatList
        ref={monthRef}
        data={months}
        keyExtractor={(i) => i}
        style={styles.wheel}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        onLayout={scrollToInitial}
        contentContainerStyle={{ paddingVertical: PADDING }}
        onMomentumScrollEnd={(e) =>
          onScrollEnd(e, setSelectedMonth, months.length)
        }
        renderItem={({ item, index }) =>
          renderItem(item, index, selectedMonth)
        }
      />

      {/* YEAR */}
      <FlatList
        ref={yearRef}
        data={years}
        keyExtractor={(i) => i.toString()}
        style={styles.wheel}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        onLayout={scrollToInitial}
        contentContainerStyle={{ paddingVertical: PADDING }}
        onMomentumScrollEnd={(e) =>
          onScrollEnd(e, setSelectedYear, years.length)
        }
        renderItem={({ item, index }) =>
          renderItem(item.toString(), index, selectedYear)
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
