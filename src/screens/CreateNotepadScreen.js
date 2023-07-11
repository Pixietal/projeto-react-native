import { useState, useEffect } from "react";
import Toast from "react-native-root-toast";
import { Button } from "../components/Button";
import { TextField } from "../components/TextField";
import { Container } from "../components/Container";
import { api } from "../api";
import screens from "../screens.json";
import { View, Text, ImageBackground } from "react-native";
import styled from "styled-components/native";
import { useGlobalStore } from "../useGlobalStore";

// @ts-ignore
const backgroundImage = require("../../assets/pawel.jpg");

const ImageBackgroundFullScreen = styled.ImageBackground`
  flex: 1;
`;

const texts = {
  titlePlaceholder: "Digite um título",
  subtitlePlaceholder: "Digite um subtítulo",
  contentPlaceholder: "Digite um conteúdo",
  submitSuccess: "Parabéns! O seu Notepad criado com sucesso! :)",
};

const initialValues = {
  title: "",
  subtitle: "",
  content: "",
};

export function CreateNotepadScreen({ navigation, route }) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");

  async function onSubmit() {
    const response = await api.post("/notepads", {
      title,
      subtitle,
      content,
    });

    Toast.show(texts.submitSuccess);
    navigation.navigate(screens.listNotepad);
  }

  return (
    <ImageBackgroundFullScreen source={backgroundImage} resizeMode="cover">
      <Container>
        <TextField
          placeholder={texts.titlePlaceholder}
          onChangeText={setTitle}
        />
        <TextField
          placeholder={texts.subtitlePlaceholder}
          onChangeText={setSubtitle}
        />
        <TextField
          placeholder={texts.contentPlaceholder}
          multiline
          numberOfLines={6}
          onChangeText={setContent}
        />

        <Button onPress={onSubmit}>Enviar</Button>
      </Container>
    </ImageBackgroundFullScreen>
  );
}
