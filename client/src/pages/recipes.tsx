import { withUrqlClient } from "next-urql";
import React, { useEffect } from "react";
import BeanLayout from "../components/layouts/Bean";
import { createUrqlClient } from "../utils/createUrqlClient";

const Recipes = () => {
  return <BeanLayout>Will be removed</BeanLayout>;
};

export default withUrqlClient(createUrqlClient)(Recipes);
