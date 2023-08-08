import React, { useState } from "react";
import SelectInput from "../home/order-form/SelectInput";
import {
  RegisterOptions,
  UseFormRegister,
  useFormState,
} from "react-hook-form";
import { getCategories } from "@/lib/clientApiHelpers";
import { useQuery } from "@tanstack/react-query";

interface Props {
  register: UseFormRegister<any>;
}

export default function ProductCategorySelect(props: Props) {
  const [categoryId, setCategoryId] = useState<string>("prompt");

  const { isFetching, data } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const v = e.target.value;
    setCategoryId(v);
  };

  return (
    <SelectInput
      label="Catégorie"
      name="category"
      {...props}
      registerRules={{
        onChange: handleOnChange,
      }}
      placeholder="Categorie du produit"
      value={categoryId}
      isLoading={isFetching}
    >
      <option disabled value="prompt" hidden>
        Selectionnez une catégorie
      </option>
      <option value="none">Aucune</option>
      {data &&
        data.map(({ name, id, subCategories }) => (
          <React.Fragment key={`Frag-${id}`}>
            <option
              value={JSON.stringify({ categoryId: id })}
              key={`cat-${id}`}
            >
              {name}
            </option>
            {subCategories &&
              subCategories.map((subcat) => (
                <option
                  value={JSON.stringify({
                    categoryId: id,
                    subCategoryId: subcat.id,
                  })}
                  key={`subcat-${subcat.id}`}
                  className="pl-5 indent-10"
                >
                  &nbsp; {subcat.name}
                </option>
              ))}
          </React.Fragment>
        ))}
    </SelectInput>
  );
}
