import { TouchableOpacity, View } from "react-native";
import styles from "./styles";

const NewHeader = ({ navigation }) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backBtn}
      >
      </TouchableOpacity>
    </View>
  );
};

export default NewHeader;