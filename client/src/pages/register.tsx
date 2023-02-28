import { Grid } from "@mui/material";
import React from "react";
import { withUrqlClient } from "next-urql";
import BaseLayout from "../components/layouts/Base";
import { SignupTemplate } from "../components/templates/Auth";
import { createUrqlClient } from "../utils/createUrqlClient";

const Register: React.FC<{}> = ({}) => {
  return (
    <BaseLayout>
      <SignupTemplate />
    </BaseLayout>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
