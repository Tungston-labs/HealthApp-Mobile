// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ImageBackground,
//   SafeAreaView,
//   Animated,
//   Alert,
// } from "react-native";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import { useNavigation } from "@react-navigation/native";
// import styles from "./style";

// export default function SelectRoleScreen() {
//   const navigation = useNavigation();
//   const [selected, setSelected] = useState(null);

//   const handleContinue = () => {
//     if (!selected) {
//       Alert.alert("Select a role", "Please choose a role before continuing.");
//       return;
//     }
//     if (selected === "user") {
//       navigation.navigate("SignupDetailsScreenUser");
//     } else if (selected === "trainer") {
//       navigation.navigate("SignupDetailsScreenTrainer");
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>

//       <View style={styles.topHeader}>
//         <TouchableOpacity
//           onPress={() => navigation.goBack()}
//           style={styles.backBtn}
//         >
//           <Ionicons name="chevron-back" size={28} color="#000" />
//         </TouchableOpacity>

//         <Text style={styles.headerTitle}>Sign up as</Text>
//       </View>

//       <View style={styles.centerWrapper}>

//         <Text style={styles.subtitle}>
//           Choose your role to create{"\n"}the right experience for you.
//         </Text>

//         <Text style={styles.subText}>Join as a User or Trainer.</Text>

//         <View style={styles.cardRow}>

//           <Animated.View
//             style={[
//               styles.card,
//               selected === "trainer" && styles.activeCard
//             ]}
//           >
//             <TouchableOpacity
//               activeOpacity={0.9}
//               onPress={() => setSelected("trainer")}
//               style={{ flex: 1 }}
//             >
//               <ImageBackground
//                 source={require("../../../assets/trainer.png")}
//                 style={styles.cardImage}
//                 imageStyle={styles.cardImageStyle}
//               >
//                 <Text style={styles.cardLabel}>Trainer</Text>
//               </ImageBackground>
//             </TouchableOpacity>
//           </Animated.View>

//           <Animated.View
//             style={[
//               styles.card,
//               selected === "user" && styles.activeCard
//             ]}
//           >
//             <TouchableOpacity
//               activeOpacity={0.9}
//               onPress={() => setSelected("user")}
//               style={{ flex: 1 }}
//             >
//               <ImageBackground
//                 source={require("../../../assets/user2.png")}
//                 style={styles.cardImage}
//                 imageStyle={styles.cardImageStyle}
//               >
//                 <Text style={styles.cardLabel}>User</Text>
//               </ImageBackground>
//             </TouchableOpacity>
//           </Animated.View>
//         </View>
//       </View>
//       <View style={styles.continueFixed}>
//         <TouchableOpacity
//           style={styles.continueBtn}
//           onPress={() => navigation.navigate("SignupDetailsScreenUser")}   // 👈 ADDED
//         >
//           <Text style={styles.continueText}>Continue</Text>
//           <Ionicons
//             name="chevron-forward"
//             size={20}
//             color="#fff"
//             style={styles.arrowIcon}
//           />
//         </TouchableOpacity>
//       </View>
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
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import styles from "./style";

export default function SelectRoleScreen() {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);

  const handleContinue = () => {
    if (!selected) {
      Alert.alert("Select a role", "Please choose a role before continuing.");
      return;
    }

    if (selected === "trainer") {
      navigation.navigate("CreateAccount");   //  Trainer → CreateAccount
    } else if (selected === "user") {
      navigation.navigate("SignupDetailsScreenUser"); //  User → User Signup
    }
  };

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.topHeader}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Ionicons name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Sign up as</Text>
      </View>

      <View style={styles.centerWrapper}>

        <Text style={styles.subtitle}>
          Choose your role to create{"\n"}the right experience for you.
        </Text>

        <Text style={styles.subText}>Join as a User or Trainer.</Text>

        <View style={styles.cardRow}>

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

      <View style={styles.continueFixed}>
        <TouchableOpacity
          style={styles.continueBtn}
          onPress={handleContinue}  
        >
          <Text style={styles.continueText}>Continue</Text>
          <Ionicons
            name="chevron-forward"
            size={20}
            color="#fff"
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
