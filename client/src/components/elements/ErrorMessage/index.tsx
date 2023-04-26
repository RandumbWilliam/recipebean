import React from "react";
import { Message } from "./styles";
import Icon from "../Icon";

interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <Message>
      <Icon name="Error" color="#ff0033" />
      {message}
    </Message>
  );
};

export default ErrorMessage;
