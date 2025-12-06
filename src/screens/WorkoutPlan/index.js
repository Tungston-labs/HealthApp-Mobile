import React, { useState } from 'react';
import { View, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import styles from './style';
import FilterModal from '../../components/FIlterModal/index';

const WorkoutPlan = ({ navigation }) => {

    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <ScrollView style={styles.container}>

                {/* Header */}
                <Header
                    username="Ajay"
                    subtitle="Choose your board"
                    onNotificationPress={() => navigation.navigate("Notifications")}
                />

                {/* Image Grid */}
                <View style={styles.gridContainer}>

                    <TouchableOpacity onPress={() => setShowModal(true)}>
                        <Image
                            source={require("../../../assets/swimming.png")}
                            style={styles.imageBox}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setShowModal(true)}>
                        <Image
                            source={require("../../../assets/gym.png")}
                            style={styles.imageBox}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setShowModal(true)}>
                        <Image
                            source={require("../../../assets/cycling.png")}
                            style={styles.imageBox}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setShowModal(true)}>
                        <Image
                            source={require("../../../assets/zumba.png")}
                            style={styles.imageBox}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setShowModal(true)}>
                        <Image
                            source={require("../../../assets/boxing.png")}
                            style={styles.imageBox}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>

                </View>
            </ScrollView>

            {/* Filter Modal */}
            <FilterModal
                visible={showModal}
                onClose={() => setShowModal(false)}
            />
        </>
    );
};

export default WorkoutPlan;
