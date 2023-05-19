import AuthLayout from "@components/layouts/Auth";
import { LoginTemplate } from "@components/templates/Auth";
import { createUrqlClient } from "@utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import React from "react";

const Login: React.FC<{}> = ({}) => {
  return (
    <AuthLayout>
      <LoginTemplate />
    </AuthLayout>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
