import React, { useEffect, useRef, useState } from "react";
import { View, Text, Modal, Animated, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./styles";

const { width } = Dimensions.get("window");

const COLORS = ["#FF6B6B", "#4ECDC4", "#FFD93D", "#6C5CE7", "#A8E6CF"];
const CONFETTI_COUNT = 10;
const AUTO_CLOSE_TIME = 2500;

const PaymentSuccessModal = ({ visible, onClose }) => {
    const scaleAnim = useRef(new Animated.Value(0)).current;
    const floatAnim = useRef(new Animated.Value(0)).current;
    const timeoutRef = useRef(null);

    const [confettiPositions, setConfettiPositions] = useState([]);

    useEffect(() => {
        if (visible) {
            const positions = Array.from({ length: CONFETTI_COUNT }).map(() => ({
                top: Math.random() * 180,
                left: Math.random() * (width * 0.65),
                rotate: `${Math.random() * 360}deg`,
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
            }));
            setConfettiPositions(positions);

            Animated.spring(scaleAnim, {
                toValue: 1,
                useNativeDriver: true,
            }).start();

            Animated.loop(
                Animated.sequence([
                    Animated.timing(floatAnim, {
                        toValue: 1,
                        duration: 800,
                        useNativeDriver: true,
                    }),
                    Animated.timing(floatAnim, {
                        toValue: 0,
                        duration: 800,
                        useNativeDriver: true,
                    }),
                ])
            ).start();

            timeoutRef.current = setTimeout(() => {
                onClose && onClose();
            }, AUTO_CLOSE_TIME);
        }

        return () => {
            clearTimeout(timeoutRef.current);
            scaleAnim.setValue(0);
            floatAnim.setValue(0);
        };
    }, [visible]);

    const floatY = floatAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [-3, 3],
    });

    return (
        <Modal transparent visible={visible} animationType="fade">
            <View style={styles.overlay}>
                <Animated.View
                    style={[
                        styles.card,
                        { transform: [{ scale: scaleAnim }] },
                    ]}
                >
                    {/* Confetti Ribbons */}
                    {confettiPositions.map((item, index) => (
                        <Animated.View
                            key={index}
                            style={[
                                styles.confetti,
                                {
                                    backgroundColor: item.color,
                                    top: item.top,
                                    left: item.left,
                                    transform: [
                                        { rotate: item.rotate },
                                        { translateY: floatY },
                                    ],
                                },
                            ]}
                        />
                    ))}

                    <View style={styles.tickOuterCircle}>
                        <View style={styles.tickInnerCircle}>
                            <Icon name="checkmark-outline" size={80} color="#fff" />
                        </View>
                    </View>



                    {/* Text */}
                    <Text style={styles.successText}>Payment Successful</Text>
                    <Text style={styles.subText}>
                        Your payment has been completed successfully
                    </Text>
                </Animated.View>
            </View>
        </Modal>
    );
};

export default PaymentSuccessModal;
