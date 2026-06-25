import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import styles from './style';
import { useDispatch, useSelector } from 'react-redux';
import { updateRegistration } from '../../../redux/slices/registrationSlice';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const MIN = 0;
const MAX = 200;
const ITEM_WIDTH = 8;
const numbers = Array.from({ length: MAX - MIN + 1 }, (_, i) => MIN + i);
const toLbs = kg => Math.round(kg * 2.20462);

export default function WeightScreen() {
  const dispatch = useDispatch();

  const { weight, weightUnit } = useSelector(state => state.registration);

  const scrollRef = useRef(null);

  const [unit, setUnit] = useState(weightUnit || 'KG');
  const [kgValue, setKgValue] = useState(() => {
    if (weight != null) {
      return weightUnit === 'LBS' ? Math.round(weight / 2.20462) : weight;
    }
    return 55;
  });

  const sidePadding = SCREEN_WIDTH / 2 - ITEM_WIDTH / 2;
  const displayedValue = unit === 'KG' ? kgValue : toLbs(kgValue);

  // 🔹 Scroll handler
  const onScroll = e => {
    const x = e.nativeEvent.contentOffset.x;
    const index = Math.round(x / ITEM_WIDTH);
    const clamped = Math.max(0, Math.min(numbers.length - 1, index));

    if (clamped !== kgValue) {
      setKgValue(clamped);

      const resolvedWeight = unit === 'KG' ? clamped : toLbs(clamped);
      dispatch(
        updateRegistration({
          weight: resolvedWeight,
          weightUnit: unit,
        }),
      );
    }
  };

  // Scroll to initial position once on mount
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        x: kgValue * ITEM_WIDTH,
        animated: false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Initialize weight in Redux if not already set
  useEffect(() => {
    if (weight == null) {
      const resolvedWeight = unit === 'KG' ? kgValue : toLbs(kgValue);
      dispatch(
        updateRegistration({
          weight: resolvedWeight,
          weightUnit: unit,
        }),
      );
    }
  }, [dispatch, weight, kgValue, unit]);

  const changeUnit = newUnit => {
    setUnit(newUnit);

    const resolvedWeight = newUnit === 'KG' ? kgValue : toLbs(kgValue);
    dispatch(
      updateRegistration({
        weight: resolvedWeight,
        weightUnit: newUnit,
      }),
    );
  };

  const leftValue = kgValue - 5 >= 0 ? kgValue - 5 : 0;
  const rightValue = kgValue + 5 <= 200 ? kgValue + 5 : 200;

  return (
    <View style={styles.container}>
      {/* Toggle */}
      <View style={styles.toggleWrapper}>
        <TouchableOpacity
          style={[styles.toggleBtn, unit === 'KG' && styles.activeToggle]}
          onPress={() => changeUnit('KG')}
        >
          <Text
            style={[
              styles.toggleText,
              unit === 'KG' && styles.activeToggleText,
            ]}
          >
            KG
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.toggleBtn, unit === 'LBS' && styles.activeToggle]}
          onPress={() => changeUnit('LBS')}
        >
          <Text
            style={[
              styles.toggleText,
              unit === 'LBS' && styles.activeToggleText,
            ]}
          >
            LBS
          </Text>
        </TouchableOpacity>
      </View>

      {/* Top numbers */}
      <View style={styles.topNumbersRow}>
        <Text style={styles.sideNumber}>{leftValue}</Text>
        <Text style={styles.centerNumber}>{kgValue}</Text>
        <Text style={styles.sideNumber}>{rightValue}</Text>
      </View>

      {/* Ruler */}
      <View style={styles.rulerWrapper}>
        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={ITEM_WIDTH}
          decelerationRate="fast"
          scrollEventThrottle={16}
          onScroll={onScroll}
          contentContainerStyle={{
            paddingLeft: sidePadding,
            paddingRight: sidePadding,
          }}
        >
          {numbers.map(num => {
            const isBig = num % 5 === 0;
            return (
              <View
                key={num}
                style={{
                  width: ITEM_WIDTH,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <View
                  style={[
                    styles.tick,
                    isBig ? styles.bigTick : styles.smallTick,
                  ]}
                />
              </View>
            );
          })}
        </ScrollView>

        <View style={styles.centerLine} pointerEvents="none" />
      </View>

      {/* Pointer */}
      <View style={styles.pointerWrapper}>
        <View style={styles.greenPointer} />
      </View>

      {/* Selected value */}
      <View style={styles.bigValueWrapper}>
        <Text style={styles.bigValue}>{displayedValue}</Text>
        <Text style={styles.bigUnit}>{unit}</Text>
      </View>
    </View>
  );
}