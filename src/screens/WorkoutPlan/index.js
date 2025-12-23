import React, { useEffect, useState } from "react";
import { View, ScrollView, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import styles from "./style";
import FilterModal from "../../components/FIlterModal";
import PlanCard from "./PlanCard";
import { fetchPlansThunk } from "../../redux/slices/planSlice";
import { Text } from "react-native-svg";

const WorkoutPlan = ({ navigation }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const { plans, loading, error } = useSelector(state => state.planList);

  useEffect(() => {
    dispatch(fetchPlansThunk());
  }, []);

  return (
    <>
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <Header
          username="Ajay"
          subtitle="Your workout plans"
          onNotificationPress={() => navigation.navigate("Notifications")}
        />

        {loading && <ActivityIndicator size="large" />}
        {error && <Text>{JSON.stringify(error)}</Text>}

        <View style={styles.gridContainer}>
          {plans.map(item => (
            <PlanCard
              key={item.id}
              item={{
                ...item,
                image: { uri: item.upload_file }, 
              }}
              onPress={() => setShowModal(true)}
            />
          ))}
        </View>
      </ScrollView>

      <FilterModal visible={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};


export default WorkoutPlan;
