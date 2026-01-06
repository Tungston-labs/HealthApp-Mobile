import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 12,
  },

  listWrapper: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    gap: 12,
  },
   headerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    paddingHorizontal: 20,
    paddingTop: 41,

borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,

    elevation: 6,
    marginBottom: 15,
  },
  bodyContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  greeting: {
    fontSize: 20,
    fontWeight: '900',
  },

  subTitle: {
    color: '#777',
    marginTop: 2,
  },

});
