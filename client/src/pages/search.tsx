import BaseLayout from "@components/layouts/Base";
import SearchTemplate from "@components/templates/Search";
import { createUrqlClient } from "@utils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import React from "react";

const Search = () => {
  return (
    <BaseLayout>
      <SearchTemplate />
    </BaseLayout>
  );
};

export default withUrqlClient(createUrqlClient)(Search);
