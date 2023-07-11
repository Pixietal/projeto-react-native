import { View, TouchableOpacity, Alert } from "react-native";
import styled from "styled-components/native";
import { Title } from "./Title";
import { Subtitle } from "./Subtitle";

const Container = styled.View`
  padding-horizontal: 12px;
  padding-vertical: 8px;
  border-bottom-width: 1px;
  border-bottom-color: #444;
`;

export function NotepadItem({ title, subtitle, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Container>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
      </Container>
    </TouchableOpacity>
  );
}
