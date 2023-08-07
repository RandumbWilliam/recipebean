import AuthLayout from "@components/layouts/Auth";
import ForgotPasswordTemplate from "@components/templates/Auth/forgot-password";
import ResetPasswordTemplate from "@components/templates/Auth/reset-password";
import { createUrqlClient } from "@utils/createUrqlClient";
import { withUrqlClient } from "next-urql";

const ResetPassword: React.FC<{}> = () => {
  return (
    <AuthLayout>
      <ForgotPasswordTemplate />
    </AuthLayout>
  );
};

export default withUrqlClient(createUrqlClient)(ResetPassword);
