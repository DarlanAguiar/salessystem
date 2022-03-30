import styled from "styled-components";

export const Container = styled.footer`
  position: fixed;
  bottom: 3px;
  right: 6px;
  padding: 2px 5px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.804);

  p {
    font-weight: bold;
    color: black;
    font-size: 0.8em;

    @media (max-width: 600px) {
      font-size: 0.7em;
    }
  }

  svg {
    color: darkblue;
  }

  a {
    text-decoration: none;
  }
`;
