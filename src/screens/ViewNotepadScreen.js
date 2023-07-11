import { useEffect, useState } from "react";
import styled from "styled-components/native";
import { View, Text, ImageBackground } from "react-native";
import Toast from "react-native-root-toast";
import { api } from "../api";
import { Card } from "../components/Card";
import { Title } from "../components/Title";
import { Subtitle } from "../components/Subtitle";
import { Button } from "../components/Button";
import screens from "../screens.json";
import { useGlobalStore } from "../useGlobalStore";

// @ts-ignore
const backgroundImage = require("../../assets/background.jpg");

const texts = {
  editButtonLabel: "Editar",
  deleteButtonLabel: "Deletar",
  deleteSuccessMessage: "O notepad foi deletado com sucesso!",
};

const initialNotepad = {
  id: 0,
  title: "",
  subtitle: "",
  content: "",
  created_at: "",
};

const DeleteButton = styled(Button)`
  background-color: #34ace0;
`;

const EditButton = styled(Button)`
  background-color: #227093;
`;

const Content = styled.Text`
  font-size: 18px;
  line-height: 27px;
`;

const ImageBackgroundFullScreen = styled.ImageBackground`
  flex: 1;
`;

const Container = styled.ScrollView`
  flex: 1;
`;

const ContainerCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export function ViewNotepadScreen({ navigation, route }) {
  const notepadId = route.params.id;
  const [notepad, setNotepad] = useState(initialNotepad);
  const notepadCreatedAt = new Date(notepad.created_at).toLocaleDateString();

  async function loadNotepad() {
    const response = await api.get(`/notepads/${notepadId}`);
    setNotepad(response.data);
  }

  async function onDelete() {
    const response = await api.delete(`/notepads/${notepadId}`);
    Toast.show(texts.deleteSuccessMessage);
    navigation.navigate(screens.listNotepad);
  }

  async function onEdit() {
    navigation.navigate(screens.editNotepad, {
      id: notepadId,
    });
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadNotepad();
    });
    return unsubscribe;
  }, [notepadId]);

  return (
    <ImageBackgroundFullScreen source={backgroundImage} resizeMode="cover">
      <Container>
        <ContainerCard>
          <Text>#{notepad.id}</Text>
          <Text>{notepadCreatedAt}</Text>
          <Title>{notepad.title}</Title>
          <Subtitle>{notepad.subtitle}</Subtitle>
          <Content>{notepad.content}</Content>

          <EditButton onPress={onEdit}>{texts.editButtonLabel}</EditButton>
          <DeleteButton onPress={onDelete}>
            {texts.deleteButtonLabel}
          </DeleteButton>
        </ContainerCard>
      </Container>
    </ImageBackgroundFullScreen>
  );
}
