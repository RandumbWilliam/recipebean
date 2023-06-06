import { PRIMARY_COLOUR } from "@styles/base/colours";
import styled from "styled-components";
import Button from "../Button";

export const CounterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 180px;
  margin-bottom: 12px;
`;

export const CounterDisplay = styled.p`
  display: flex;
  border-radius: 10px;
  background-color: #fff;
  align-items: center;
  justify-content: center;
  width: 100px;
`;

export const CounterButton = styled(Button)`
  border-radius: 50vh;
  padding: 0;
  width: 28px;
  height: 28px;
`;
