import styled from "styled-components/native";

const ButtonContainer = styled.TouchableOpacity`
  background-color: #227093;
  border-radius: 20px;
  padding: 8px;
`;

const ButtonText = styled.Text`
  color: whitesmoke;
  text-transform: uppercase;
  font-size: 14px;
  text-align: center;
  font-weight: bold;
`;

export function Button({ children, onPress, style = {} }) {
  return (
    <ButtonContainer onPress={onPress} style={style}>
      <ButtonText>{children}</ButtonText>
    </ButtonContainer>
  );
}
