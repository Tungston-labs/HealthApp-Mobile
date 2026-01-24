// import React from "react";
// import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
// import Ionicons from "react-native-vector-icons/Ionicons";
// import styles from "./style";

// export default function MainLayout({ title, step, onBack, onNext, children }) {
//   return (
//     <SafeAreaView style={styles.container}>

//       <View style={styles.headerWrapper}>
//         <View style={styles.progressContainer}>
//           {[1, 2, 3, 4, 5, 6, 7].map((item) => (
//             <View
//               key={item}
//               style={[
//                 styles.progressBar,
//                 { backgroundColor: step >= item ? "#7774F4" : "#EFEFEF" }
//               ]}
//             />
//           ))}
//         </View>

//         <TouchableOpacity onPress={onBack} style={styles.backButton}>
//           <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
//         </TouchableOpacity>
//       </View>

//       <Text style={styles.headerTitle}>{title}</Text>

//       <View style={styles.centerContainer}>{children}</View>

//       <View style={styles.footer}>
//         {step !== 1 && (
//           <TouchableOpacity onPress={onNext} style={styles.nextButton}>
//             <Ionicons name="chevron-forward" size={24} color="#FFFFFF" />
//           </TouchableOpacity>
//         )}
//       </View>
//     </SafeAreaView>
//   );
// }

import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./style";

export default function MainLayout({
  title,
  step,
  onBack,
  onNext,
  children,
}) {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* CONTENT WRAPPER FOR HORIZONTAL SPACING */}
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.headerWrapper}>
          <View style={styles.progressContainer}>
            {[1, 2, 3, 4, 5, 6, 7].map((item) => (
              <View
                key={item}
                style={[
                  styles.progressBar,
                  step >= item && styles.progressActive,
                ]}
              />
            ))}
          </View>

          <TouchableOpacity
            onPress={onBack}
            style={styles.backButton}
            activeOpacity={0.8}
          >
            <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* TITLE */}
        <Text style={styles.headerTitle}>{title}</Text>

        {/* BODY */}
        <View style={styles.centerContainer}>{children}</View>

        {/* FOOTER */}
        <View style={styles.footer}>
          {step !== 1 && (
            <TouchableOpacity
              onPress={onNext}
              style={styles.nextButton}
              activeOpacity={0.8}
            >
              <Ionicons name="chevron-forward" size={22} color="#FFFFFF" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
