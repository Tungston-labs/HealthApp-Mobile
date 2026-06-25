import React, { useRef, useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import styles from "./style";
import { useDispatch, useSelector } from "react-redux";
import { updateRegistration } from "../../../redux/slices/registrationSlice";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function HeightPicker() {
  const dispatch = useDispatch();

  // Redux state
  const { height, heightUnit } = useSelector(
    (state) => state.registration
  );

  const MIN_CM = 120;
  const MAX_CM = 210;
  const ITEM_HEIGHT = 10;

  // 🔹 Defaults
  const initialCm = height ?? 165;

  const [unit, setUnit] = useState(heightUnit || "Cm");
  const [cmValue, setCmValue] = useState(initialCm);

  const scrollRef = useRef(null);

  const numbers = Array.from(
    { length: MAX_CM - MIN_CM + 1 },
    (_, i) => MIN_CM + i
  );

  const sidePadding = SCREEN_HEIGHT / 2 - ITEM_HEIGHT / 2;

  // 🔹 cm → ft/in
  const cmToFeetInches = (cm) => {
    const totalFeet = cm / 30.48;
    const feet = Math.floor(totalFeet);
    const inches = Math.round((totalFeet - feet) * 12);
    return inches === 12
      ? { feet: feet + 1, inches: 0 }
      : { feet, inches };
  };

  const formatDisplayed = () => {
    if (unit === "Cm") return cmValue;
    const { feet, inches } = cmToFeetInches(cmValue);
    return `${feet}' ${inches}"`;
  };

  const handleScroll = (e) => {
    const y = e.nativeEvent.contentOffset.y;
    const index = Math.round(y / ITEM_HEIGHT);
    const invertedIndex = numbers.length - 1 - index;

    const clamped = Math.max(
      0,
      Math.min(numbers.length - 1, invertedIndex)
    );

    const newCm = numbers[clamped];

    if (newCm !== cmValue) {
      setCmValue(newCm);
    }
  };
  const formatSideLabel = (cm) => {
    if (unit === "Cm") return cm;

    const { feet, inches } = cmToFeetInches(cm);
    return `${feet}'${inches}"`;
  };

  useEffect(() => {
    const index = initialCm - MIN_CM;

    scrollRef.current?.scrollTo({
      y: index * ITEM_HEIGHT,
      animated: false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (height == null) {
      dispatch(
        updateRegistration({
          height: cmValue,
          heightUnit: unit,
        })
      );
    }
  }, [dispatch, height, cmValue, unit]);

  //  Unit change handler
  const changeUnit = (newUnit) => {
    setUnit(newUnit);

    dispatch(
      updateRegistration({
        height: cmValue,
        heightUnit: newUnit,
      })
    );
  };

  const fixedLabels = useMemo(() => {
    let mid = Math.round(cmValue / 5) * 5;

    return [
      Math.min(MAX_CM, mid + 10),
      Math.min(MAX_CM, mid + 5),
      mid,
      Math.max(MIN_CM, mid - 5),
      Math.max(MIN_CM, mid - 10),
    ];
  }, [cmValue]);

  return (
    <View style={styles.container}>
      <View style={styles.toggleWrapper}>
        <TouchableOpacity
          style={[styles.toggleBtn, unit === "Cm" && styles.activeToggle]}
          onPress={() => changeUnit("Cm")}
        >
          <Text
            style={[
              styles.toggleText,
              unit === "Cm" && styles.activeToggleText,
            ]}
          >
            Cm
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.toggleBtn, unit === "Ft" && styles.activeToggle]}
          onPress={() => changeUnit("Ft")}
        >
          <Text
            style={[
              styles.toggleText,
              unit === "Ft" && styles.activeToggleText,
            ]}
          >
            Ft
          </Text>
        </TouchableOpacity>
      </View>

      {/* Big display */}
      <View style={styles.bigDisplayWrapper}>
        <Text style={styles.bigNumber}>{formatDisplayed()}</Text>
        <Text style={styles.bigUnit}>{unit}</Text>
      </View>

      <View style={styles.rulerRow}>
        <View style={styles.leftLabels}>
          {fixedLabels.map((lbl, i) => (
            <View
              key={i}
              style={{
                height: ITEM_HEIGHT * 5,
                justifyContent: "center",
              }}
            >
              <Text
                style={[
                  styles.leftLabelText,
                  i === 2 && styles.leftLabelActive,
                ]}
              >
                {formatSideLabel(lbl)}
              </Text>
            </View>
          ))}
        </View>

        {/* Ruler */}
        <View style={styles.rulerContainer}>
          <ScrollView
            ref={scrollRef}
            showsVerticalScrollIndicator={false}
            snapToInterval={ITEM_HEIGHT}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            onMomentumScrollEnd={() => {
              dispatch(
                updateRegistration({
                  height: cmValue,
                  heightUnit: unit,
                })
              );
            }}
            contentContainerStyle={{
              paddingTop: sidePadding,
              paddingBottom: sidePadding,
              alignItems: "center",
            }}
          >
            {numbers.map((num) => {
              const isBig = num % 5 === 0;
              return (
                <View
                  key={num}
                  style={{
                    height: ITEM_HEIGHT,
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={[
                      styles.tickLine,
                      isBig ? styles.bigTick : styles.smallTick,
                      num === cmValue && styles.activeTick,
                    ]}
                  />
                </View>
              );
            })}
          </ScrollView>

          <View style={styles.centerHighlight} />
        </View>

        {/* Pointer */}
        <View style={styles.pointerWrapper}>
          <View style={styles.greenPointer} />
        </View>
      </View>
    </View>
  );
}