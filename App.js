import "react-native-gesture-handler";
import { RootSiblingParent } from "react-native-root-siblings";
import { NavigationContainer } from "@react-navigation/native";
import { LoadingOverlay } from "./src/components/LoadingOverlay";
import { CreateNotepadScreen } from "./src/screens/CreateNotepadScreen";
import { EditNotepadScreen } from "./src/screens/EditNotepadScreen";
import { HomeScreen } from "./src/screens/HomeScreen";
import { ListNotepadScreen } from "./src/screens/ListNotepadScreen";
import { ViewNotepadScreen } from "./src/screens/ViewNotepadScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  AntDesign,
  Foundation,
  MaterialCommunityIcons,
  Ionicons,
  Feather,
} from "@expo/vector-icons";
import screens from "./src/screens.json";

const texts = {
  homeLabel: "Home",
  viewNotepadLabel: "Ver notepads",
  createNotepadLabel: "Criar notepads",
  editNotepadLabel: "Editar notepads",
  listNotepadLabel: "Listar notepads",
};

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <RootSiblingParent>
      <LoadingOverlay />
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName={screens.home}
          backBehavior="history"
        >
          <Drawer.Screen
            name={screens.home}
            component={HomeScreen}
            options={{
              headerTitle: texts.homeLabel,
              drawerLabel: texts.homeLabel,
              drawerIcon({ size, color }) {
                return <AntDesign name="book" size={size} color={color} />;
              },
            }}
          />
          <Drawer.Screen
            name={screens.viewNotepad}
            component={ViewNotepadScreen}
            options={{
              headerTitle: texts.viewNotepadLabel,
              drawerLabel: texts.viewNotepadLabel,
              drawerItemStyle: {
                height: 0,
              },
              drawerIcon({ color, size }) {
                return (
                  <Foundation
                    name="clipboard-notes"
                    size={size}
                    color={color}
                  />
                );
              },
            }}
          />
          <Drawer.Screen
            name={screens.createNotepad}
            component={CreateNotepadScreen}
            options={{
              headerTitle: texts.createNotepadLabel,
              drawerLabel: texts.createNotepadLabel,
              drawerIcon({ size, color }) {
                return (
                  <MaterialCommunityIcons
                    name="typewriter"
                    size={size}
                    color={color}
                  />
                );
              },
            }}
          />
          <Drawer.Screen
            name={screens.editNotepad}
            component={EditNotepadScreen}
            options={{
              headerTitle: texts.editNotepadLabel,
              drawerLabel: texts.editNotepadLabel,
              drawerItemStyle: {
                height: 0,
              },
              drawerIcon({ size, color }) {
                return (
                  <Ionicons name="create-outline" size={size} color={color} />
                );
              },
            }}
          />
          <Drawer.Screen
            name={screens.listNotepad}
            component={ListNotepadScreen}
            options={{
              headerTitle: texts.listNotepadLabel,
              drawerLabel: texts.listNotepadLabel,
              drawerIcon({ size, color }) {
                return <Feather name="list" size={size} color={color} />;
              },
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </RootSiblingParent>
  );
}
