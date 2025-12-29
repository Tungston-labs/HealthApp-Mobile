import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  formWrapper: {
    paddingHorizontal: 22,
    paddingTop: 20,
  },

  label: {
    fontSize: 12,
    color: "#777",
    marginBottom: 6,
    marginTop: 14,
  },

  input: {
    borderBottomWidth: 1,
    borderColor: "#DADADA",
    paddingVertical: 8,
    fontSize: 15,
    color: "#000",
  },

  locationBtn: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 14,
    borderRadius: 30,
    borderColor: "#DADADA",
    alignItems: "center",
    marginTop: 26,
    borderWidth:1,
  },

  locationText: {
    color: "#505050",
    fontSize: 15,
    fontWeight: "600",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  col: {
    width: "48%",
  },
  
  chipInput: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#DADADA",
    paddingVertical: 10,
    justifyContent: "space-between",
  },
  
  chipText: {
    fontSize: 15,
    color: "#000",
  },
   
  saveBtn: {
    backgroundColor: "#6B4EFF",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginVertical: 40,
  },
  
  saveText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
  },

});
