import { StyleSheet, Text, TouchableOpacity, Linking} from "react-native";
import {useCallback } from "react";
export default function Link({ url, children }) {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return (
    <TouchableOpacity style={styles.buttonLink} onPress={handlePress}>
      <Text style={styles.buttonLinkText}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonLink: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#F2F2F2",
    padding: 5,
    marginTop: 15,
    borderRadius: 0,
    alignItems: "center",
  },
  buttonLinkText: {
    color: "blue",
    fontWeight: "bold",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});
