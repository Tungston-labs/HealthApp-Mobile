// screens/TrainerDetail/TrainerDetailScreen.js
import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./styles";
import RatingBar from "../../components/TrainerDetail/RatingCard";
import ReviewCard from "../../components/TrainerDetail/ReviewCard";
import TrainerInfoCard from "../../components/TrainerInfoCard";
import { useNavigation } from "@react-navigation/native";
const TrainerDetailScreen = (rating = 4.5) => {
    const navigation=useNavigation();
    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
            >

                <TouchableOpacity style={styles.closeBtn}>
                    <Icon name="close" size={28} color="#000" />
                </TouchableOpacity>

                <View style={styles.headerSection}>
                    <Image
                        source={require("../../../assets/trainer2.jpg")}
                        style={styles.profileImage}
                    />

                    <TrainerInfoCard    
                        name="Cristofer Bator"
                        experience="5 years"
                        sessionTiming="60 min"
                        numSessions="12"
                        workoutType="Yoga"
                    />


                </View>

                <TouchableOpacity style={styles.dropdownBtn}>
                    <Text style={styles.dropdownText}>Certificates</Text>
                    <Icon name="chevron-down" size={24} color="#000" />
                </TouchableOpacity>

                <Text style={styles.sectionTitle}>Rating and feedback</Text>
                <View style={styles.divider} />

                <View style={styles.ratingContainer}>
                    <View>
                        <Text style={styles.label}>Overall rating</Text>
                        <Text style={styles.overallRating}>4.5</Text>
                        <View style={{ flexDirection: "row" }}>
                            {[1, 2, 3, 4, 5].map((i) => (
                                <Icon
                                    key={i}
                                    name={i <= rating ? "star" : "star"}
                                    size={18}
                                    color="#FBC02D"
                                    style={{ marginLeft: 2 }}
                                />
                            ))}
                        </View>
                    </View>

                    <View style={styles.ratingDetails}>
                        <RatingBar label="Communication" rating={4.5} />
                        <RatingBar label="Punctuality" rating={4.0} />
                        <RatingBar label="Training Quality" rating={4.5} />
                        <RatingBar label="Results" rating={4.5} />
                    </View>
                </View>

                <ReviewCard
                    image={require("../../../assets/trainer4.jpg")}
                    name="Dummy dummy"
                    date="18 April 2025"
                    rating={4}
                    text="Lorem ipsum dolor sit amet consectetur. Tincidunt euismod iaculis vulputate 
          etiam purus arcu sollicitudin eleifend ipsum."
                />

                <ReviewCard
                    image={require("../../../assets/trainer3.jpg")}
                    name="Dummy dummy"
                    date="18 April 2025"
                    rating={4}
                    text="Lorem ipsum dolor sit amet consectetur. Tincidunt euismod iaculis vulputate 
          etiam purus arcu sollicitudin eleifend ipsum."
                />

                <View style={{ height: 90 }} />
            </ScrollView>
            <View style={styles.footer}>
              <TouchableOpacity 
                    style={styles.bookBtn} 
                    onPress={() => navigation.navigate("Payment")}  
                >
                    <Text style={styles.bookText}>Book Now</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default TrainerDetailScreen;
