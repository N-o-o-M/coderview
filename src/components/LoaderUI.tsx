import React from "react";
import styled from "styled-components";

interface LoaderUIProps {
  size?: number;
  color?: string;
  overlayColor?: string;
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${(props) =>
    props.theme.overlayColor || "rgba(0, 0, 0, 0.3)"};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Spinner = styled.div<{ size: number; color: string }>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border: ${(props) => Math.floor(props.size / 10)}px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: ${(props) => props.color};
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoaderUI: React.FC<LoaderUIProps> = ({
  size = 50,
  color = "#3498db",
  overlayColor = "rgba(0, 0, 0, 0.3)",
}) => {
  return (
    <Overlay theme={{ overlayColor }}>
      <Spinner size={size} color={color} />
    </Overlay>
  );
};

export default LoaderUI;
