import BaseLayout from "@components/layouts/Base";
import HomeTemplate from "@components/templates/Home";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Home = () => {
  return (
    <BaseLayout>
      <HomeTemplate />
    </BaseLayout>
  );
};

export default withUrqlClient(createUrqlClient)(Home);
