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

export default function WeightScreen() {
  const dispatch = useDispatch();

  const { weight, weightUnit } = useSelector(state => state.registration);

  const MIN = 0;
  const MAX = 200;
  const ITEM_WIDTH = 8;
  const scrollRef = useRef(null);

  const [unit, setUnit] = useState(weightUnit || 'KG');
  const [kgValue, setKgValue] = useState(weight ?? 55);

  const numbers = Array.from({ length: MAX - MIN + 1 }, (_, i) => MIN + i);
  const sidePadding = SCREEN_WIDTH / 2 - ITEM_WIDTH / 2;

  const toLbs = kg => Math.round(kg * 2.20462);
  const displayedValue = unit === 'KG' ? kgValue : toLbs(kgValue);
  const onScroll = e => {
    const x = e.nativeEvent.contentOffset.x;
    const index = Math.round(x / ITEM_WIDTH);
    const clamped = Math.max(0, Math.min(numbers.length - 1, index));

    if (clamped !== kgValue) {
      setKgValue(clamped);

      dispatch(
        updateRegistration({
          weight: clamped,
          weightUnit: unit,
        }),
      );
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        x: kgValue * ITEM_WIDTH,
        animated: false,
      });
    }
  }, []);

  const changeUnit = newUnit => {
    setUnit(newUnit);

    dispatch(
      updateRegistration({
        weight: kgValue,
        weightUnit: newUnit,
      }),
    );
  };

  const leftValue = kgValue - 5 >= 0 ? kgValue - 5 : 0;
  const rightValue = kgValue + 5 <= 200 ? kgValue + 5 : 200;

  return (
    <View style={styles.container}>
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
      <View style={styles.topNumbersRow}>
        <Text style={styles.sideNumber}>{leftValue}</Text>
        <Text style={styles.centerNumber}>{kgValue}</Text>
        <Text style={styles.sideNumber}>{rightValue}</Text>
      </View>
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
      <View style={styles.pointerWrapper}>
        <View style={styles.greenPointer} />
      </View>
      <View style={styles.bigValueWrapper}>
        <Text style={styles.bigValue}>{displayedValue}</Text>
        <Text style={styles.bigUnit}>{unit}</Text>
      </View>
    </View>
  );
}
