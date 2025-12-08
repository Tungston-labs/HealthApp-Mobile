import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  progressCard: {
    backgroundColor: "#2F2F2F",
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 12,
    padding: 24,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  dayPill: {
    backgroundColor: "#6C63FF",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  dayText: {
    color: "#fff",
    fontSize: 12,
  },
  separator: {
    height: 1,
    backgroundColor: "#555",
    marginVertical: 10,
  },
  progressBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  startedText: {
    color: "#fff",
    fontSize: 12,
  },
  timerText: {
    color: "#fff",
    fontSize: 12,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 20,
    marginHorizontal: 16,
  },

  sessionCard: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#EEE",
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },

  sessionImage: {
    width: 50,
    height: 50,
    borderRadius: 12,
  },

  sessionInfo: {
    flex: 1,
    marginLeft: 12,
  },

  trainerName: {
    fontSize: 14,
    fontWeight: "600",
  },
  timeLabel: {
    color: "#999",
    fontSize: 11,
    marginTop: 4,
  },
  timeText: {
    fontSize: 13,
    fontWeight: "600",
  },

  dayButton: {
    backgroundColor: "#6C63FF",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  dayButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  progressContainer: {
  marginVertical: 12,
},

progressTrack: {
  height: 8,
  width: "100%",
  backgroundColor: "#E0E0E0",
  borderRadius: 10,
  overflow: "hidden",
},

progressFill: {
  height: "100%",
  width: "45%",  
  backgroundColor: "#7774F4",
},

});
