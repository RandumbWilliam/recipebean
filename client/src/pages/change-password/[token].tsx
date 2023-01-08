import { useState } from "react";
import { NextPage } from "next";
import { useChangePasswordMutation } from "../../generated/graphql";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";

const initialForm = {
  newPassword: "",
};

const ChangePassword: NextPage<{ token: string }> = () => {
  const router = useRouter();
  const [, changePassword] = useChangePasswordMutation();
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState("");

  const handleChange = (e: any) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await changePassword({
      newPassword: formData.newPassword,
      token: typeof router.query.token === "string" ? router.query.token : "",
    });
    if (response.data?.changePassword.errors) {
      console.log(response.data.changePassword.errors);
      setErrors(response.data.changePassword.errors[0].message);
    } else if (response.data?.changePassword.user) {
      router.push("/");
    }
  };

  return (
    <div>
      <h1>Change Password</h1>
      <form onSubmit={handleSubmit}>
        <label>
          New Password:
          <input type="text" name="newPassword" onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default withUrqlClient(createUrqlClient)(ChangePassword);
