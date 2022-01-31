import styled from "styled-components";
import theme from "styled-theming";

const backgroundColor = theme("theme", {
  light: "#fff",
  dark: "#black",
});

const textColor = theme("theme", {
  light: "#000",
  dark: "#00f",
});

const Container = styled.div`
  display: "flex";
  flex-direction: "colomn";
  width: "100vw";
  heght: "100vh";
  align-items: "center";
  justify-content: "center";
  font-family: "sans-serif";
  backgroundcolor: ${backgroundColor};
  color: ${textColor};
`;

export default Container;
