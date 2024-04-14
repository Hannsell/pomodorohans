import { StyleSheet, Text, View } from "react-native";

export default function Timer({ time }) {
  const formatedTime = `${Math.floor(time / 60)
    .toString()
    .padStart(2, "0")}:${(time % 60).toString().padStart(2, "0")}`;
  return (
    <View style={[style.container, style.elevation]}>
      <Text style={style.timer}>{formatedTime}</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 0.3,
    backgroundColor: "#F2F2F2",
    marginTop: 0,
    padding: 15,
    borderRadius: 15,
    borderTopStartRadius: 0,
    borderTopEndRadius: 0,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#333333",
  },
  timer: {
    fontSize: 80,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333333",
    zIndex: 9,
  },
  elevation: {
    elevation: 20,
    shadowColor: "blak",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
});
