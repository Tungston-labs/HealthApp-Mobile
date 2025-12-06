// screens/styles/NotificationScreenStyles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    title: {
        fontFamily: "Segoe UI",
        fontSize: 18,
        marginTop: 10,
        color: '#000',
    },
    card: {
        width: "100%",
        height: 93,
        backgroundColor: "#EEEEFF",
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: "#ccc",
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        marginTop: 16,
    },

    icon: {
        marginRight: 12,
    },

    textContainer: {
        flex: 1,
    },

    header: {
        fontFamily: "Segoe UI",
        fontSize: 16,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 4,
    },

    description: {
        fontFamily: "Segoe UI",
        fontSize: 14,
        color: "#333",
        marginBottom: 6,
    },

    time: {
        fontFamily: "Segoe UI",
        fontSize: 12,
        color: "#666",
    },
});

export default styles;
