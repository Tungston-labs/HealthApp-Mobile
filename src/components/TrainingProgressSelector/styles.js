import { StyleSheet } from "react-native";


export default StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    dayBar: {
        backgroundColor: "#7774F4",
        borderRadius: 10,
        padding: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    dayText: {
        color: "#fff",
        fontWeight: "600",
    },
    timeRow: {
        flexDirection: "row",
        alignItems: "center",
    },

  timeHeader: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: "700",
    color: "#000",
    fontFamily: "SegoeUI",
  },
    timeText: {
        color: "#fff",
        marginRight: 6,
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
});

