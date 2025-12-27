import React, { useEffect, useState } from "react";
import { View, ScrollView, ActivityIndicator, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import styles from "./style";
import FilterModal from "../../components/FIlterModal";
import PlanCard from "./PlanCard";
import { fetchPlansThunk } from "../../redux/slices/planSlice";

const WorkoutPlan = ({ navigation }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const { plans, loading, error } = useSelector(
  state => state.planList
);

  const user = useSelector(state => state.auth?.user);

  useEffect(() => {
    dispatch(fetchPlansThunk());
  }, []);

  console.log("PLANS 👉", plans);

  return (
    <>
      <ScrollView style={styles.container}>
        <Header
          username={user?.name || "User"}
          subtitle="Your workout plans"
          onNotificationPress={() => navigation.navigate("Notifications")}
        />

        {loading && <ActivityIndicator size="large" />}
        {error && <Text>{JSON.stringify(error)}</Text>}

        <View style={styles.gridContainer}>
          {plans.length === 0 && !loading && (
            <Text>No plans available</Text>
          )}

          {plans.map(item => (
            <PlanCard
              key={item.id}
              item={{
                ...item,
                image: {
                  uri: item.upload_file.replace(
                    "127.0.0.1",
                    "10.0.2.2"
                  ),
                },
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
