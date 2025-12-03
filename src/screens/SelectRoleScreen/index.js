// import React from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ImageBackground,
//   SafeAreaView,
// } from "react-native";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import { useNavigation } from "@react-navigation/native";
// import styles from "./style";

// export default function SelectRoleScreen() {
//   const navigation = useNavigation();

//   return (
//     <SafeAreaView style={styles.container}>

//       {/* FIXED TOP HEADER */}
//       <View style={styles.topHeader}>
//         <TouchableOpacity
//           onPress={() => navigation.goBack()}
//           style={styles.backBtn}
//         >
//           <Ionicons name="chevron-back" size={28} color="#000" />
//         </TouchableOpacity>

//         <Text style={styles.headerTitle}>Sign up as</Text>
//       </View>

//       {/* Center Content */}
//       <View style={styles.centerWrapper}>

//         <Text style={styles.subtitle}>
//           Choose your role to create{"\n"}the right experience for you.
//         </Text>

//         <Text style={styles.subText}>Join as a User or Trainer.</Text>

//         {/* Cards - NOW FIXED, NOT CLICKABLE */}
//         <View style={styles.cardRow}>

//           {/* Trainer Card */}
//           <View style={styles.card}>
//             <ImageBackground
//               source={require("../../../assets/trainer.png")}
//               style={styles.cardImage}
//               imageStyle={styles.cardImageStyle}
//             >
//               <Text style={styles.cardLabel}>Trainer</Text>
//             </ImageBackground>
//           </View>

//           {/* User Card */}
//           <View style={styles.card}>
//             <ImageBackground
//               source={require("../../../assets/user2.png")}
//               style={styles.cardImage}
//               imageStyle={styles.cardImageStyle}
//             >
//               <Text style={styles.cardLabel}>User</Text>
//             </ImageBackground>
//           </View>

//         </View>

//       </View>

//       {/* Continue Button */}
//       <TouchableOpacity style={styles.continueBtn}>
//         <Text style={styles.continueText}>Continue</Text>
//       </TouchableOpacity>

//     </SafeAreaView>
//   );
// }
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Animated,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import styles from "./style";

export default function SelectRoleScreen() {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);

  return (
    <SafeAreaView style={styles.container}>

      {/* FIXED TOP HEADER */}
      <View style={styles.topHeader}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Ionicons name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Sign up as</Text>
      </View>

      {/* Center Content */}
      <View style={styles.centerWrapper}>

        <Text style={styles.subtitle}>
          Choose your role to create{"\n"}the right experience for you.
        </Text>

        <Text style={styles.subText}>Join as a User or Trainer.</Text>

        {/* Cards */}
        <View style={styles.cardRow}>

          {/* Trainer Card */}
          <Animated.View
            style={[
              styles.card,
              selected === "trainer" && styles.activeCard
            ]}
          >
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setSelected("trainer")}
              style={{ flex: 1 }}
            >
              <ImageBackground
                source={require("../../../assets/trainer.png")}
                style={styles.cardImage}
                imageStyle={styles.cardImageStyle}
              >
                <Text style={styles.cardLabel}>Trainer</Text>
              </ImageBackground>
            </TouchableOpacity>
          </Animated.View>

          {/* User Card */}
          <Animated.View
            style={[
              styles.card,
              selected === "user" && styles.activeCard
            ]}
          >
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setSelected("user")}
              style={{ flex: 1 }}
            >
              <ImageBackground
                source={require("../../../assets/user2.png")}
                style={styles.cardImage}
                imageStyle={styles.cardImageStyle}
              >
                <Text style={styles.cardLabel}>User</Text>
              </ImageBackground>
            </TouchableOpacity>
          </Animated.View>

        </View>

      </View>

      {/* Continue Button */}
      <TouchableOpacity style={styles.continueBtn}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}
