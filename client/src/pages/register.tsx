import { Grid } from "@mui/material";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Button from "../components/elements/Button";
import Input from "../components/elements/Input";
import BaseLayout from "../components/layouts/Base";
import Auth from "../components/templates/Auth";
import { useRegisterMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const initialForm = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
};

const Register: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [, register] = useRegisterMutation();
  const [formData, setFormData] = useState(initialForm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await register({ input: formData });
    if (response.data?.register) {
      router.push("/");
    } else {
      console.log("ERROR");
    }
  };

  return (
    <BaseLayout>
      <Auth title="Sign Up" onSubmit={handleSubmit}>
        <Grid container direction="column" spacing={2}>
          <Grid item xs>
            <Grid container spacing={2}>
              <Grid item xs>
                <Input
                  type="text"
                  name="firstName"
                  label="First Name"
                  placeholder="First Name"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs>
                <Input
                  type="text"
                  name="lastName"
                  label="Last Name"
                  placeholder="Last Name"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs>
            <Input
              type="email"
              name="email"
              label="Email"
              placeholder="example@hotmail.com"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs>
            <Input
              type="password"
              name="password"
              label="Password"
              placeholder="at least 8 characters"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs>
            <Button type="submit" pill={true}>
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </Auth>
    </BaseLayout>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
