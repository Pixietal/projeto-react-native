import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { useGlobalStore } from "../useGlobalStore";

const Overlay = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #227093aa;
  z-index: 1;
`;

export function LoadingOverlay() {
  const isLoading = useGlobalStore((state) => state.isLoading);

  if (!isLoading) {
    return null;
  }

  return (
    <Overlay>
      <ActivityIndicator size={64} color="black" />
    </Overlay>
  );
}
