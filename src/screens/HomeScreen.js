import { useEffect, useState } from "react";
import { View, Image } from "react-native";
import MapView, { PROVIDER_GOOGLE, MapMarker } from "react-native-maps";
import * as Location from "expo-location";
import Toast from "react-native-root-toast";
import { api } from "../api";
import screens from "../screens.json";
import { Container } from "../components/Container";
import { Text, ImageBackground } from "react-native";

const coordsDelta = 0.04;

const initialCoords = {
  latitude: 0,
  longitude: 0,
};

const initialNotepadList = {
  count: 0,
  notepads: [],
};

export function HomeScreen({ navigation }) {
  const [coords, setCoords] = useState(initialCoords);
  const [{ count, notepads }, setNotepadList] = useState(initialNotepadList);

  const region = {
    ...coords,
    latitudeDelta: coordsDelta,
    longitudeDelta: coordsDelta,
  };

  const notepadsInMap = notepads.filter(
    (notepad) =>
      notepad.latitude !== undefined && notepad.longitude !== undefined
  );

  async function loadNotepads() {
    const response = await api.get("/notepads", {
      params: {
        limit: Infinity,
      },
    });
    setNotepadList(response.data);
  }

  async function loadGeolocation() {
    const response = await Location.requestForegroundPermissionsAsync();
    const position = await Location.getCurrentPositionAsync();
    setCoords(position.coords);
  }

  function onMarkerPress(notepad) {
    navigation.navigate(screens.viewNotepad, { id: notepad.id });
  }

  useEffect(() => {
    loadGeolocation();
    const unsubscribe = navigation.addListener("focus", () => {
      loadNotepads();
    });

    return unsubscribe;
  }, []);

  const notepadsMarkers = notepadsInMap.map((notepad) => (
    <MapMarker
      key={notepad.id}
      coordinate={notepad}
      onPress={() => onMarkerPress(notepad)}
    />
  ));

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <Container>
        <Text>Olá! Seja bem-vindo(a) ao melhor aplicativo de notepads!</Text>
      </Container>
      <MapView
        region={region}
        showsUserLocation
        style={{ width: "100%", height: "88%" }}
        provider={PROVIDER_GOOGLE}
        onLongPress={(event) => {
          const coords = event.nativeEvent.coordinate;
          navigation.navigate(screens.createNotepad, { coords });
        }}
      >
        {notepadsMarkers}
      </MapView>
    </View>
  );
}
