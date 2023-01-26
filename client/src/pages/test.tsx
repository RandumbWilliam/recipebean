import { withUrqlClient } from "next-urql";
import React, { useState, useEffect } from "react";
import Load from "../components/modules/Load";
import { withAuth } from "../utils/auth_test";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useIsAuth } from "../utils/useIsAuth";

const Test: React.FC<{}> = ({}) => {
  // const isAuthenticated = useIsAuth();

  // if (!isAuthenticated) {
  //   return <Load />;
  // }

  return (
    <div style={{ backgroundColor: "#ff0000", height: "100vh" }}>
      <div>Protected Profile Page</div>
    </div>
  );
};

export default withUrqlClient(createUrqlClient)(withAuth(Test));
