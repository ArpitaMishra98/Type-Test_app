
import { useState, useEffect } from "react";
import Image from "next/image";
import { Box, Typography } from "@mui/material";
import { styled, keyframes } from "@mui/system";
import { headingAnimationColor, headingColor, primaryColor, success } from "@/constants/color";
import logo from "@/public/images/mg-typing-test-logo.png";

const Header = () => {

  return (
    <MainDiv style={{backgroundColor:"lightblue"}}>
      <Logo>
        <Image src={logo} alt="Mg-Typing-Test" width="60" height="60" />
        <Typography variant="h1" data-text="MY-Typing Test">MY-Typing Test</Typography>
      </Logo>

    </MainDiv>
  );
};

export default Header;

const MainDiv = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

const moveAndResize = keyframes`
  from{
    width: 10px;
    height: 10px;
    right: -10%;
    top: -50%;
    opacity: 0;
  }
  to{
    width: 400px;
    height: 350px;
    right: -10%;
    top: -50%;
    opacity: 1;
  }
`;

const Animation = styled(Box)`
  width: 10px;
  height: 10px;
  border-radius: 100%;
  background-color: #fff;
  position: absolute;
  top: 0%;
  transform: translateY(-55%);
  animation-name: ${moveAndResize};
  animation-iteration-count: 2;
  animation-duration: 1s;
  animation-fill-mode: forwards;
  z-index: -1;
`;

const Logo = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.8rem 0;

  h1 {
    margin-left: 1rem;
    color: ${headingColor};
    font-size: 1.5rem;
    position: relative;
    display: inline-block;
    white-space: nowrap;
    line-height: 2rem;

    ::before {
      content: attr(data-text);
      position: absolute;
      left: 0;
      top: 0;
      width: 0;
      border-right: 3px solid ${headingAnimationColor};
      color: ${headingAnimationColor};
      overflow: hidden;

      animation: animate 6s linear infinite alternate;
      --webkit-animation: animate 6s linear infinite alternate;

      @keyframes animate {
        0% {
          width: 0;
        }
        50% {
          width: 100%;
        }
        100% {
          width: 0;
        }
      }
    }

    @media (min-width: 768px) {
      font-size: 1.8rem;
      line-height: 2.3rem;
    }
  }
`;





