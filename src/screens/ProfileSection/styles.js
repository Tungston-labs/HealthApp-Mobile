import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 16,
    },

    header: {
        marginTop: 40,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    title: {
        fontSize: 22,
        fontWeight: "700",
    },

    subtitle: {
        fontSize: 14,
        color: "#888",
        marginTop: 4,
    },

    callIcon: {
        backgroundColor: "#7774F4",
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: "center",
        alignItems: "center",
    },

    dayBar: {
        backgroundColor: "#7774F4",
        borderRadius: 10,
        padding: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
    },

    dayText: {
        color: "#fff",
        fontWeight: "600",
    },

    timeRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    timeText: {
        color: "#fff",
        marginRight: 6,
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginTop: 10,
    },

    slotsRow: {
        flexDirection: "row",
        marginTop: 10,
    },

    slotCard: {
        backgroundColor: "#DFDEF3",
        width: 50,
        height: 60,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 8,
    },

    activeSlot: {
        backgroundColor: "#7774F4",
    },

    slotDay: {
        fontWeight: "600",
        color: "#555",
    },

    slotWeek: {
        fontSize: 11,
        color: "#777",
    },

    activeSlotText: {
        color: "#fff",
    },

    divider: {
        height: 1,
        backgroundColor: "#E0E0E0",
        marginVertical: 16,
    },

    trainerCard: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        width: "100%",
    },
    infoRowWrapper: {
        flex: 1,
        marginLeft: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingRight: 15,
    },

    trainerImage: {
        width: 70,
        height: 70,
        borderRadius: 12,
    },



    ratingBox: {
        flexDirection: "row",
        alignItems: "center",
    },
    ratingText: {
        fontSize: 16,
        fontFamily: "SegoeUI",
        fontWeight: "600",
        marginLeft: 4,
        color: "#000",
    },



    noSession: {
        flexDirection: "column",
        alignItems: "center",
        marginTop: 6,
    },

    noSessionText: {
        fontSize: 12,
        marginLeft: 6,
    },
    sessionicon: {
        display: "flex",
        flexDirection: "row",

    },
    workoutText: {
        marginTop: 6,
        color: "#555",
    },

    notesTitle: {
        marginTop: 10,
        fontWeight: "600",
    },

    notesBox: {
        backgroundColor: "#EEF1FF",
        borderRadius: 10,
        padding: 12,
        marginTop: 6,
        minHeight: 120,
    },

    notesText: {
        fontSize: 13,
        color: "#444",
        lineHeight: 18,
    },

    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: 20,
    },

    primaryButton: {
        backgroundColor: "#7774F4",
        borderRadius: 30,
        paddingVertical: 12,
        paddingHorizontal: 60,
    },

    buttonText: {
        color: "#fff",
        fontWeight: "600",
    },

    cancelButton: {
        backgroundColor: "#F4511E",
        borderRadius: 30,
        paddingVertical: 12,
        paddingHorizontal: 40,
    },

    cancelText: {
        color: "#fff",
        fontWeight: "600",
    },

    changeTrainerButton: {
        backgroundColor: "#7774F4",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 30,
        paddingVertical: 14,
        marginTop: 14,
        marginBottom: 30,
    },

    changeTrainerText: {
        color: "#fff",
        fontWeight: "600",
    },
});
