import React from "react";
import { withUrqlClient } from "next-urql";
import BaseLayout from "@components/layouts/Base";
import { LoginTemplate } from "@components/templates/Auth";
import { createUrqlClient } from "../utils/createUrqlClient";

const Login: React.FC<{}> = ({}) => {
  return (
    <BaseLayout>
      <LoginTemplate />
    </BaseLayout>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
