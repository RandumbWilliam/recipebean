import BaseLayout from "@components/layouts/Base";
import Load from "@components/modules/Load";
import AccountTemplate from "@components/templates/Account";
import { useMyUserQuery } from "@generated/graphql";
import { createUrqlClient } from "@utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Account = () => {
  const router = useRouter();
  const [{ data, fetching }, reexecuteQuery] = useMyUserQuery();

  useEffect(() => {
    reexecuteQuery({ requestPolicy: "network-only" });
  }, [router, reexecuteQuery]);

  if (fetching) {
    return <Load />;
  }

  if (!data?.myUser) {
    return <div>Error</div>;
  }

  return (
    <BaseLayout>
      <AccountTemplate user={data.myUser} />
    </BaseLayout>
  );
};

export default withUrqlClient(createUrqlClient)(Account);
