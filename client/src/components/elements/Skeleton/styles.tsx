import styled, { keyframes } from "styled-components";

const shine = keyframes`
    to {
    background-position-x: -200%;
  }
`;

export const SkeletonContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  background: #eee;
  background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
  background-size: 200% 100%;
  animation: ${shine} 1.5s linear infinite;
`;
