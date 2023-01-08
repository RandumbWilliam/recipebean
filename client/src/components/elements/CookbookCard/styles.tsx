import styled, { keyframes } from "styled-components";

export const Card = styled.div`
  position: relative;
  min-width: 180px;
  width: 100%;
  min-height: 240px;
  height: 320px;
  border-radius: 16px;
  background-color: #f6e7d8;
  box-shadow: 6px 6px #ebcaa8;
  cursor: pointer;
  display: flex;
  word-wrap: break-word;
  transition: transform 0.1s cubic-bezier(0.5, 0, 0.5, 1);

  &:hover {
    transform: scale(1.01);
  }
`;

export const Spine = styled.div`
  display: flex;
  position: relative;
  height: 100%;
  background-color: #ff596d;
  width: 20px;
  margin-left: 20px;
`;

export const Cover = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 56px 0;
`;

export const Title = styled.h3`
  font-size: 24px;
  font-weight: 600;
  color: #000;
  hyphens: auto;
  display: flex;
  margin: 0;
`;

export const RecipeText = styled.span`
  color: #684018;
`;
