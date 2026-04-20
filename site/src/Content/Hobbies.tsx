import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import GridItem from "../UI/GridItem/GridItem";
import BookCard from "../UI/BookCard/BookCard";
import { useItems } from "../Services/hooks/useItems";
import { compareItemsByOrder } from "../Types/types";

const Hobbies = () => {
  const { data } = useItems("Hobbies");
  const [itemsBySubtype, setItemsBySubtype] = useState({});

  useEffect(() => {
    const subtypes = [
      ...new Set(data?.map((item: any) => item.subtype)),
    ] as string[];
    const itemsBySubtype = subtypes.reduce((acc: any, subtype: string) => {
      acc[subtype] = data?.filter((item: any) => item.subtype === subtype);
      return acc;
    }, {});
    setItemsBySubtype(itemsBySubtype);
  }, [data]);

  console.log(itemsBySubtype);
  return (
    <div>
      <h1>My Interests</h1>
      {Object.entries(itemsBySubtype).map(
        ([subtype, items]: [string, unknown]) => (
          <div key={subtype}>
            <h2>{subtype}</h2>
            <Grid
              container
              columnSpacing={1}
              direction="row"
              alignItems="left"
              justifyContent="left"
              sx={{ paddingRight: 6, paddingLeft: 6 }}
            >
              {(items as any[]).sort(compareItemsByOrder).map((item: any) =>
                subtype === "Books" ? (
                  <BookCard key={item.id} item={item} />
                ) : (
                  <GridItem key={item.id} item={item} />
                )
              )}
            </Grid>
          </div>
        )
      )}
    </div>
  );
};

export default Hobbies;
