import { Grid } from "@mui/material";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Button from "../components/elements/Button";
import Input from "../components/elements/Input";
import BaseLayout from "../components/layouts/Base";
import Auth from "../components/templates/Auth";
import { useLoginMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const initialForm = {
  email: "",
  password: "",
};

const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation();
  const [formData, setFormData] = useState(initialForm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await login(formData);
    if (response.data?.login) {
      router.push("/cookbooks");
    } else {
      console.log("ERROR");
    }
  };

  return (
    <BaseLayout>
      <Auth title="Log In" onSubmit={handleSubmit}>
        <Grid container direction="column" spacing={2}>
          <Grid item xs>
            <Input
              type="email"
              name="email"
              label="Email"
              placeholder="Enter your email"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs>
            <Input
              type="password"
              name="password"
              label="Password"
              placeholder="Password"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs>
            <Button type="submit" pill={true}>
              Log In
            </Button>
          </Grid>
        </Grid>
      </Auth>
    </BaseLayout>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
