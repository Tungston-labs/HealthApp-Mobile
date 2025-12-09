import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Svg, { Circle } from "react-native-svg";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./style";

export default function BMIResultScreen({ navigation }) {
  const weight = 65;
  const height = 170;
  const age = 26;
  const gender = "Male";

  const bmi = (weight / ((height / 100) * (height / 100))).toFixed(1);
  const bmiValue = parseFloat(bmi);

  const progress = Math.min((bmiValue / 40) * 100, 100);

  const radius = 70;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * progress) / 100;

  let bmiText = "";
  let bmiColor = "";

  if (bmiValue < 18.5) {
    bmiText = "Underweight";
    bmiColor = "#84CDEE";
  } else if (bmiValue < 24.9) {
    bmiText = "Normal";
    bmiColor = "#78B060";
  } else if (bmiValue < 29.9) {
    bmiText = "Overweight";
    bmiColor = "#FFDF32";
  } else {
    bmiText = "Obesity";
    bmiColor = "#F5554A";
  }

  return (
    <View style={styles.container}>

      {/* TOP PURPLE BACKGROUND LAYER */}
      <View style={styles.topBackground} />

      {/* HEADER */}
      <Text style={styles.header}>Your BMI Result</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* PURE WHITE CARD */}
        <View style={styles.card}>
          <View style={styles.cardInnerContent}>
            
            {/* CIRCLE CHART */}
            <View style={styles.circleContainer}>
              <Svg width="180" height="180" style={{ transform: [{ rotate: "-90deg" }] }}>
                <Circle
                  cx="90"
                  cy="90"
                  r={radius}
                  stroke="#D9D9D9"
                  strokeWidth={strokeWidth}
                  fill="none"
                />

                <Circle
                  cx="90"
                  cy="90"
                  r={radius}
                  stroke={bmiColor}
                  strokeWidth={strokeWidth}
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                />
              </Svg>

              <Text style={styles.bmiValue}>{bmi}</Text>
            </View>

            <Text style={styles.bmiMessage}>You have {bmiText} Body Weight!</Text>

            <View style={[styles.chip, { backgroundColor: bmiColor }]}>
              <Text style={styles.chipText}>{bmiText}</Text>
            </View>

            {/* SCALE */}
            <View style={styles.scaleWrapper}>
              <View style={[styles.scaleBlock, { backgroundColor: "#4DB5FF" }]} />
              <View style={[styles.scaleBlock, { backgroundColor: "#50C878" }]} />
              <View style={[styles.scaleBlock, { backgroundColor: "#FFD93D" }]} />
              <View style={[styles.scaleBlock, { backgroundColor: "#FF6B6B" }]} />
            </View>

            {/* INFO ROW */}
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Text style={styles.infoValue}>{weight} kg</Text>
                <Text style={styles.infoLabel}>Weight</Text>
              </View>

              <View style={styles.infoItem}>
                <Text style={styles.infoValue}>{height} cm</Text>
                <Text style={styles.infoLabel}>Height</Text>
              </View>

              <View style={styles.infoItem}>
                <Text style={styles.infoValue}>{age}</Text>
                <Text style={styles.infoLabel}>Age</Text>
              </View>

              <View style={styles.infoItem}>
                <Text style={styles.infoValue}>{gender}</Text>
                <Text style={styles.infoLabel}>Gender</Text>
              </View>
            </View>

            {/* LEGEND */}
            <View style={styles.legendWrapper}>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: "#4DB5FF" }]} />
                <Text style={styles.legendText}>Under Weight :  &lt; 18.5</Text>
              </View>

              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: "#50C878" }]} />
                <Text style={styles.legendText}>Normal Weight :  18.5 - 24.9</Text>
              </View>

              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: "#FFD93D" }]} />
                <Text style={styles.legendText}>Over Weight :  25 - 29.9</Text>
              </View>

              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: "#FF6B6B" }]} />
                <Text style={styles.legendText}>Obesity :  30 - 39.9</Text>
              </View>
            </View>

          </View>
        </View>
      </ScrollView>

      {/* FLOATING BUTTON */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate("MainApp")}
      >
        <Ionicons name="chevron-forward" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
