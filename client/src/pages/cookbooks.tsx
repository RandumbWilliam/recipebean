import { Grid } from "@mui/material";
import { withUrqlClient } from "next-urql";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import CookbookCard from "../components/elements/CookbookCard";
import BeanLayout from "../components/layouts/Bean";
import CookbooksTemplate from "../components/templates/Cookbooks";
import { useGetCookbooksQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Cookbooks = () => {
  const router = useRouter();
  const [{ data, fetching }, reexecuteQuery] = useGetCookbooksQuery();

  useEffect(() => {
    reexecuteQuery({ requestPolicy: "network-only" });
  }, [router]);

  let body = null;

  if (!fetching && data?.getCookbooks) {
    body = (
      <>
        {data.getCookbooks.map((cookbook) => {
          const sectionPath = cookbook.sections[0]
            ? `/${cookbook.sections[0].id}`
            : "";
          return (
            <Grid item md={3} sm={4} xs={6} key={cookbook.id}>
              <Link href={`/cookbook/${cookbook.id}${sectionPath}`}>
                <a>
                  <CookbookCard
                    cookbookName={cookbook.cookbookName}
                    recipeCount={cookbook.recipes.length}
                  />
                </a>
              </Link>
            </Grid>
          );
        })}
      </>
    );
  }

  return (
    <BeanLayout>
      <CookbooksTemplate header="Your Cookbooks">{body}</CookbooksTemplate>
    </BeanLayout>
  );
};

export default withUrqlClient(createUrqlClient)(Cookbooks);
