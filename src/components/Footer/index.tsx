import React from 'react'
import {GiFrozenArrow} from "react-icons/gi"
import * as C from "./styles"


const Footer = () => {
  return (
    <C.Container>
      <a href="https://www.facebook.com/darlan.aguiar.165">
        <p className="textoRodape">
          Dr.Gelo <GiFrozenArrow /> Software
        </p>
      </a>
    </C.Container>
  );
};

export default Footer;

