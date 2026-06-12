import { StyleSheet } from "react-native";


export default StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    dayBar: {
        backgroundColor: "#000000",
        borderRadius: 10,
        padding: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    dayText: {
        color: "#fff",
        fontWeight: "700",
         fontSize: 16,
    },
    timeRow: {
        flexDirection: "row",
        alignItems: "center",
    },

  timeHeader: {
    fontSize: 16,
    // marginTop: 10,
    fontWeight: "700",
    color: "#000",
    fontFamily: "SegoeUI",
  },
    timeText: {
        color: "#fff",
        marginRight: 6,
    },
    slotCard: {
        backgroundColor: "#EFEEE9",
        width: 40,
        height: 60,
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 8,
    },
    activeSlot: {
        backgroundColor: "#000000",
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

    sliderWrapper: {
  marginTop: 6,
},

track: {
  height: 2,
  backgroundColor: "#000",
  marginTop: 6,
  position: "relative",
},

indicator: {
  position: "absolute",
  height: 2,
  width: 40,
  backgroundColor: "#000",
},

});

