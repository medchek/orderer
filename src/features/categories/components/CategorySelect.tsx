import React, { useState } from "react";
import SelectInput from "../../../components/home/order-form/SelectInput";
import { UseFormRegister } from "react-hook-form";

import { useGetCategories } from "../api/getCategories";
import { AddProductFormValues } from "@/features/products/components/dashboard/DashboardAddProduct.copy";

interface Props {
  register: UseFormRegister<AddProductFormValues>;
  error?: string;
}

export default function CategorySelect(props: Props) {
  const [categoryId, setCategoryId] = useState<string>("prompt");

  const { isFetching, data } = useGetCategories();

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const v = e.target.value;
    setCategoryId(v);
  };

  return (
    <SelectInput
      label="Catégorie"
      name="category"
      id="category-select"
      {...props}
      registerRules={{
        onChange: handleOnChange,
      }}
      placeholder="Categorie du produit"
      value={categoryId}
      isLoading={isFetching}
      error={props.error}
    >
      <option disabled value="prompt" hidden>
        Selectionnez une catégorie
      </option>
      <option value="">Aucune</option>
      {data &&
        data.map(({ name, id, subCategories }) => (
          <React.Fragment key={`Frag-${id}`}>
            <option
              className="first-letter:capitalize"
              value={JSON.stringify({ categoryId: id })}
              key={`cat-${id}`}
            >
              {name}
            </option>
            {subCategories &&
              subCategories.map((subcat) => (
                <option
                  value={JSON.stringify(({
                    categoryId: id,
                    subcategoryId: subcat.id,
                  }))}
                  key={`subcat-${subcat.id}`}
                  className="pl-5 indent-10 first-letter:capitalize"
                >
                  &nbsp; {subcat.name}
                </option>
              ))}
          </React.Fragment>
        ))}
    </SelectInput>
  );
}
