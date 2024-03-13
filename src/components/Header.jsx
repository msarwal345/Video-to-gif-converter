import React from "react";
import styled from "styled-components";
import logo from "../assets/vgif-logo.png";

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px 20px;
`;

const Image = styled.img`
  width: 70px;
  margin-right: 20px; 
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  outline: none;
  border: none;
  padding: 12px 22px;
  border-radius: 8px;
  background-color: #192033;
  color: #fff;
  white-space: nowrap;
  font-size: 15px;
  transition: all 0.2s ease;
  cursor: pointer;
  }
`;

export const Header = () => {
  return (
    <HeaderContainer>
      <Image src={logo} alt="Logo" />
      <div>
      <a href="https://github.com/msarwal345/Video-to-gif-converter" target="_blank"><Button >Repo</Button></a>
      </div>
    </HeaderContainer>
  );
};
