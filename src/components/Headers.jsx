import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const options = ["Trabajando", "Pausa corta", "Pausa larga"];

export default function Header({
  isActive,
  currentTime,
  setCurrentTime,
  setTime,
  tiempos,
}) {
  function handlePress(index) {
    if (isActive) {
      return 0;
    }
    setCurrentTime(index);
    setTime(tiempos[index]);
  }

  return (
    <View style={styles.header}>
      {options.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={[
              styles.headerItem,
              currentTime !== index && styles.headerNotSelected,
              currentTime === index && styles.headerSelected,
            ]}
            onPress={() => handlePress(index)}
          >
            <Text style={styles.textTab}>{item}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    borderBottomColor: "black",
    borderBottomWidth: 0,
    position: "relative",
    zIndex: 10,
  },
  headerItem: {
    borderWidth: 1,
    padding: 5,
    width: "33.33%",
    borderTopEndRadius: 5,
    borderTopStartRadius: 5,
    alignItems: "center",
    // paddingTop:7,
    // paddingBottom:7,
  },
  textTab: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop:7,
    marginBottom:7,
  },
  headerNotSelected: {
    borderColor: "transparent",
    backgroundColor: "transparent",
  },
  headerSelected: {
    backgroundColor: "#F2F2F2",
    marginBottom: -2,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F2",
  },
});
