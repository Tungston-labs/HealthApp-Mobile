import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import styles from "./style";
import { useDispatch, useSelector } from "react-redux";
import { updateRegistration } from "../../../redux/slices/registrationSlice";
import { validateUserStep2 } from "../../../utils/Validators";
import { showError } from "../../../utils/toast";
import { useNavigation } from "@react-navigation/native";

const days = Array.from({ length: 31 }, (_, i) => i + 1);
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 1950 + 1 }, (_, i) => 1950 + i);

export default function AgeScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const registration = useSelector(state => state.registration);

  const ITEM_HEIGHT = 40;
  const VISIBLE_ITEMS = 5;
  const PADDING = ((VISIBLE_ITEMS - 1) / 2) * ITEM_HEIGHT;

  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [age, setAge] = useState(0);
  const [touched, setTouched] = useState(false);

  // Restore prefilled selection if registration.dob exists in Redux
  useEffect(() => {
    if (registration.dob && selectedDay === null) {
      const parts = registration.dob.split('-');
      if (parts.length === 3) {
        const yVal = parseInt(parts[0], 10);
        const mVal = parseInt(parts[1], 10) - 1;
        const dVal = parseInt(parts[2], 10);

        const dIdx = days.indexOf(dVal);
        const yIdx = years.indexOf(yVal);

        if (dIdx !== -1) setSelectedDay(dIdx);
        if (mVal >= 0 && mVal < 12) setSelectedMonth(mVal);
        if (yIdx !== -1) setSelectedYear(yIdx);
        if (registration.age) setAge(registration.age);
        setTouched(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registration.dob]);


  useEffect(() => {
    if (
      selectedDay === null ||
      selectedMonth === null ||
      selectedYear === null
    )
      return;

    const birthday = new Date(
      years[selectedYear],
      selectedMonth,
      days[selectedDay]
    );

    const today = new Date();
    let diff = today.getFullYear() - birthday.getFullYear();
    const m = today.getMonth() - birthday.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) diff--;

    const finalAge = diff >= 0 ? diff : 0;
    setAge(finalAge);

    dispatch(
      updateRegistration({
        dob: birthday.toISOString().split("T")[0],
        age: finalAge,
      })
    );
  }, [selectedDay, selectedMonth, selectedYear, dispatch]);

  const onScrollEnd = (event, setItem, length) => {
    const index = Math.round(event.nativeEvent.contentOffset.y / ITEM_HEIGHT);
    if (index >= 0 && index < length) {
      setTouched(true);
      setItem(index);
    }
  };

  const handleContinue = () => {
    if (!touched) {
      showError("Please select your Date of Birth");
      return;
    }

    const result = validateUserStep2(registration);
    if (!result.ok) {
      showError(result.msg);
      return;
    }

    navigation.navigate("NextUserScreen");
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
          style={styles.wheel}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate="fast"
          contentContainerStyle={{ paddingVertical: PADDING }}
          showsVerticalScrollIndicator={false}
          initialScrollIndex={selectedDay !== null ? selectedDay : 0}
          getItemLayout={(_, index) => ({ length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index })}
          onMomentumScrollEnd={(e) =>
            onScrollEnd(e, setSelectedDay, days.length)
          }
          renderItem={({ item, index }) =>
            renderItem(item.toString().padStart(2, "0"), index, selectedDay)
          }
        />

        <FlatList
          data={months}
          style={styles.wheel}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate="fast"
          contentContainerStyle={{ paddingVertical: PADDING }}
          showsVerticalScrollIndicator={false}
          initialScrollIndex={selectedMonth !== null ? selectedMonth : 0}
          getItemLayout={(_, index) => ({ length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index })}
          onMomentumScrollEnd={(e) =>
            onScrollEnd(e, setSelectedMonth, months.length)
          }
          renderItem={({ item, index }) =>
            renderItem(item, index, selectedMonth)
          }
        />

        <FlatList
          data={years}
          style={styles.wheel}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate="fast"
          contentContainerStyle={{ paddingVertical: PADDING }}
          showsVerticalScrollIndicator={false}
          initialScrollIndex={selectedYear !== null ? selectedYear : 0}
          getItemLayout={(_, index) => ({ length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index })}
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