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
      <View style={styles.topBackground} />

      <Text style={styles.header}>Your BMI Result</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <View style={styles.cardInner}>

            {/* ==== BMI CIRCLE ==== */}
            <View style={styles.circleContainer}>
              <Svg width="180" height="180" style={styles.svgRotate}>
                <Circle
                  cx="90"
                  cy="90"
                  r={radius}
                  stroke="#BDBDBD"
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

            <View style={[styles.chipWrapper]}>
              <View style={[styles.chip, { backgroundColor: bmiColor }]}>
                <Text style={styles.chipText}>{bmiText}</Text>
              </View>
              <View style={[styles.chipArrow, { borderTopColor: bmiColor }]} />
            </View>

            <View style={styles.scaleWrapper}>
              {[
                ...Array(10).fill("#84CDEE"),
                ...Array(15).fill("#78B060"),
                ...Array(15).fill("#FFDF32"),
                ...Array(15).fill("#F5554A"),
              ].map((c, i) => (
                <View key={i} style={[styles.scaleBar, { backgroundColor: c }]} />
              ))}
            </View>

            <View style={styles.divider} />

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

            <View style={styles.legendWrapper}>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: "#84CDEE" }]} />
                <Text style={styles.legendLabel}>Under Weight :</Text>
                <Text style={styles.legendValue}> 18.5</Text>
              </View>

              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: "#78B060" }]} />
                <Text style={styles.legendLabel}>Normal Weight :</Text>
                <Text style={styles.legendValue}>18.5 - 24.9</Text>
              </View>

              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: "#FFDF32" }]} />
                <Text style={styles.legendLabel}>Over Weight :</Text>
                <Text style={styles.legendValue}>25 - 29.9</Text>
              </View>

              <View style={styles.legendItem}>
                <View style={[styles.legendColor, { backgroundColor: "#F5554A" }]} />
                <Text style={styles.legendLabel}>Obesity :</Text>
                <Text style={styles.legendValue}>30 - 39.9</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate("MainApp")}
      >
        <Ionicons name="chevron-forward" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

