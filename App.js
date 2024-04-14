 
import {
  Button,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from "react-native";
import { useState, useEffect, useCallback } from "react";
import Header from "./src/components/Headers";
import Timer from "./src/components/Timer";
import { Audio } from "expo-av";
import Link from "./src/components/Link";

const colors = ["#446844", "#657f96", "#825e93"];
const tiempos = [1500, 300, 900];

export default function App() {
  const [isWorking, setIsWorking] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(tiempos[0]);
  const [currentTime, setCurrentTime] = useState("POMO" | "SHORT" | "BREACK");
  const wikiUrl = "https://es.wikipedia.org/wiki/T%C3%A9cnica_Pomodoro";
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTime(time - 1);
        if (time == 60) {
          playSoundOneMinute();
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    if (time === 0) {
      setIsActive(false);
      setIsWorking((prev) => !prev);
      setTime(tiempos[currentTime]);
      playSoundEnd();
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive, time]);

  function handleStartStop() {
    if (!isActive) {
      playSoundStart();
    }
    setIsActive(!isActive);
  }

  async function playSoundStart() {
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/sonidos/start.mp3")
    );
    await sound.playAsync();
  }

  async function playSoundOneMinute() {
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/sonidos/oneMinute.mp3")
    );
    await sound.playAsync();
  }

  async function playSoundEnd() {
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/sonidos/end.mp3")
    );
    await sound.playAsync();
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors[currentTime] }]}
    >
      <View style={styles.viewContainer}>
        <Text style={styles.titulo}>Pomodoro Tool</Text>
        <Header
          isActive={isActive}
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
          setTime={setTime}
          tiempos={tiempos}
        />
        <Timer time={time} />
        <TouchableOpacity onPress={handleStartStop} style={styles.button}>
          <Text style={styles.buttonText}>
            {isActive ? "DETENER" : "INICIAR"}
          </Text>
        </TouchableOpacity>
      </View>
      <Link url={wikiUrl}>Conoce la técnica pomodoro aquí</Link>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 32,
    fontWeight: "bold",
  },
  viewContainer: {
    paddingTop: Platform.OS === "android" && 45,
    flex: 1,
    borderWidth: 1,
    paddingHorizontal: 15,
  },
  button: {
    backgroundColor: "#333333",
    padding: 15,
    marginTop: 15,
    borderRadius: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
});
