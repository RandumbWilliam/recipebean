import { withUrqlClient } from "next-urql";
import BaseLayout from "../components/layouts/Base";
import Hero from "../components/templates/Home/Hero";
import Sec from "../components/templates/Home/Sec";
import { createUrqlClient } from "../utils/createUrqlClient";
import { withAuth } from "../utils/auth_test";

const Home = () => {
  return (
    <BaseLayout>
      <Hero />
      <Sec
        align="right"
        backgroundColor="grey"
        title="Save all your recipes in one place"
        paragraph="Import and save recipes from any website to your cookbooks, making it easy to create, organize, and customize to your likings"
      />
      <Sec
        title="Organize your meals with a personal planner"
        paragraph="Schedule what you're cooking and when by dragging and dropping your recipes into your weekly meal planner."
      />
      <Sec
        align="right"
        backgroundColor="grey"
        title="Generate your grocery list from your recipes"
        paragraph="Easily import ingredients from your recipes to your grocery list with a click of a button. Edit and organize your list."
      />
    </BaseLayout>
  );
};

export default withUrqlClient(createUrqlClient)(withAuth(Home));
