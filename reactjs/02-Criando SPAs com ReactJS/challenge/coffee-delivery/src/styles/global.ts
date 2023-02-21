import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :focus {
    outline: 0;
    box-shadow: 0 0 0 2px ${(props) => props.theme["purple-dark"]};
  }

  :root {
    font-size: 62.5%;
  }

  body {
    background: ${(props) => props.theme.background};
    color: ${(props) => props.theme["base-text"]};
    -webkit-font-smoothing: antialiased;

    padding-block: .01%;
    
  }

  p, input, textarea, button, body, html {
    font-family: "Roboto", sans-serif;
    font-size: 1.6rem;
    font-weight: 400;
  }
`;
