import AuthLayout from "@components/layouts/Auth";
import ResetPasswordTemplate from "@components/templates/Auth/reset-password";
import { createUrqlClient } from "@utils/createUrqlClient";
import { withUrqlClient } from "next-urql";

const ResetPassword: React.FC<{}> = () => {
  return (
    <AuthLayout>
      <ResetPasswordTemplate />
    </AuthLayout>
  );
};

export default withUrqlClient(createUrqlClient)(ResetPassword);
