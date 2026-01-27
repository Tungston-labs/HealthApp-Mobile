import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "../../screens/ProfileScreen/styles";

const ProfileHeader = ({
  image,
  name,
  showBack = false,
  onBack,
  showEdit = true,
  onEdit,
}) => {
  return (
    <View style={styles.headerWrapper}>
      <View style={styles.topGradientSmall} />

      {showBack && (
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Icon name="chevron-back" size={28} color="#111" />
        </TouchableOpacity>
      )}

      <View style={styles.imageContainer}>
        <View style={styles.imageBorder}>
          <Image
            source={
              typeof image === "string"
                ? { uri: image }    
                : image              
            }
            style={styles.profileImg}
            resizeMode="cover"
          />

        </View>

        {showEdit && (
          <TouchableOpacity style={styles.editIconWrapper} onPress={onEdit}>
            <Icon name="create-outline" size={18} color="#4A6CF7" />
          </TouchableOpacity>
        )}
      </View>

      {name && <Text style={styles.profileName}>{name}</Text>}
    </View>
  );
};

export default ProfileHeader;
