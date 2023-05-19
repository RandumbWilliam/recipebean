import AuthLayout from "@components/layouts/Auth";
import { SignupTemplate } from "@components/templates/Auth";
import { createUrqlClient } from "@utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import React from "react";

const Register: React.FC<{}> = ({}) => {
  return (
    <AuthLayout>
      <SignupTemplate />
    </AuthLayout>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
