import { StyleSheet, Platform } from "react-native";
import { colors } from "../../theme";
import { scale } from "../../utils/responsive";

const styles = StyleSheet.create({
  header: {
    paddingVertical: 15,
    backgroundColor: colors.GRAY3,
  },
  xBtn: {
    marginLeft: 15,
  },
  rightHeader: {
    marginRight: 15,
  },
  searchBar: {
    paddingVertical: Platform.select({
      android: 0,
      ios: 7,
    }),
    marginTop: 15,
    paddingHorizontal: 15,
    borderBottomColor: colors.GRAY2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  searchInput: {
    fontSize: 16,
    width: "100%",
    marginLeft: 10,
  },
  content: {
    paddingHorizontal: scale(10),
  },
  pickerItem: {
    borderBottomColor: colors.GRAY2,
    borderBottomWidth: 2 * StyleSheet.hairlineWidth,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  values: {
    flexWrap: "wrap",
  },
  underline: {
    borderBottomColor: colors.GRAY2,
    borderBottomWidth: 2 * StyleSheet.hairlineWidth,
  },
  selectedItem: {
    backgroundColor: colors.SUCCESS,
    paddingHorizontal: 15,
    paddingVertical: 4,
    borderRadius: 20,
    marginRight: scale(10),
    marginTop: scale(5),
  },
  shadow: {
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  sectionTitle: {
    paddingTop: scale(10),
    backgroundColor: "white",
  },
  sectionText: {
    marginLeft: scale(5),
  },
  underline: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.GRAY2,
  },
});

export default styles;
