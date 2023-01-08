import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import BeanLayout from "../../components/layouts/Bean";
import CookbookTemplate from "../../components/templates/Cookbook";
import {
  useGetCookbookQuery,
  useGetSectionQuery,
} from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";

const TestCookbook = () => {
  const router = useRouter();
  const { params = [] } = router.query;
  let cookbookId = "";
  let sectionId = "";

  if (params.length === 2 || params.length === 1) {
    cookbookId = params[0];
    sectionId = params.length === 2 ? params[1] : "";
  }

  const [{ data: cookbookData }] = useGetCookbookQuery({
    variables: {
      getCookbookId: cookbookId,
    },
  });

  const [{ data: sectionData }] = useGetSectionQuery({
    variables: {
      getSectionId: sectionId,
    },
  });

  return (
    <BeanLayout>
      {params.length === 0 ? (
        <div>Loading</div>
      ) : (
        <CookbookTemplate
          cookbookId={cookbookId}
          sectionId={sectionId}
          cookbookName={cookbookData?.getCookbook.cookbookName}
          sections={cookbookData?.getCookbook.sections}
          recipeCount={cookbookData?.getCookbook.recipes.length}
          recipes={sectionData?.getSection.recipes}
        />
      )}
    </BeanLayout>
  );
};

export default withUrqlClient(createUrqlClient)(TestCookbook);
