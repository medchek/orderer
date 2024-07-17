import React, { useState } from "react";
import SelectInput from "../../../components/home/order-form/SelectInput";
import { Path, UseFormRegister } from "react-hook-form";

import { useGetCategories } from "../api/getCategories";
import { capitalizeFirst } from "@/lib/utils";
import { ProductCategoryPayload } from "@/features/products/types";
import { generateCategoryOptionValue } from "../utils/generateCategoryOptionValue";
import { parseCategoryOptionValue } from "../utils/parseCategoryOptionValue";
// import { ProductFormValues } from "@/features/products/types";

type CategorySelectElementProps = Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  "onChange"
>;
interface Props<T extends { category: string }>
  extends CategorySelectElementProps {
  /** Disable the label on top of the input */
  noLabel?: boolean;
  register?: UseFormRegister<T>;
  error?: string;
  /** Disable the prompt option */
  disablePrompt?: boolean;
  /** Text to display for option with an empty value. Default: "Aucune"*/
  emptyValueText?: string;
  /** Makes the chevron, loader, and text smaller */
  small?: boolean;
  defaultValue?: string;
  onChange?: (data: ProductCategoryPayload | null) => void;
}

export default function CategorySelect<T extends { category: string }>({
  error,
  noLabel,
  disablePrompt,
  emptyValueText,
  small,
  defaultValue,
  onChange,

  ...props
}: Props<T>) {
  // if the prompt is disabled, the default value is set to empty
  const [categoryCode, setCategoryCode] = useState<string>(
    defaultValue !== undefined ? defaultValue : disablePrompt ? "" : "prompt",
  );

  const { isFetching, data } = useGetCategories();

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const v = e.target.value;
    const parsedValue = parseCategoryOptionValue(v);

    if (onChange) onChange(parsedValue);
    setCategoryCode(v);
  };

  return (
    <SelectInput
      {...props}
      label={!noLabel ? "Catégorie" : undefined}
      removeErrorSpace={noLabel}
      name={"category" as Path<T>}
      id="category-select"
      // if the onChange is not provided, allow select to
      // react react-hook-form events
      // otherwise, the regular onChange is invoked
      registerRules={
        !onChange
          ? {
              onChange: handleOnChange,
            }
          : undefined
      }
      onChange={onChange ? handleOnChange : undefined}
      // placeholder="Categorie du produit"
      value={categoryCode}
      isLoading={isFetching}
      small={small}
      error={error}
    >
      <option disabled value="prompt" hidden>
        Selectionnez une catégorie
      </option>
      <option value="">{emptyValueText ?? "Aucune"}</option>
      {data &&
        data.map(({ name, code: categoryCode, subCategories }) => (
          <React.Fragment key={`Frag-${categoryCode}`}>
            <option
              className="first-letter:capitalize"
              value={generateCategoryOptionValue(categoryCode)}
              key={`cat-${categoryCode}`}
            >
              {capitalizeFirst(name)}
            </option>
            {subCategories &&
              subCategories.map((subcategory) => (
                <option
                  value={generateCategoryOptionValue(
                    categoryCode,
                    subcategory.code,
                  )}
                  key={`subcat-${subcategory.code}`}
                  className="pl-5 indent-10 first-letter:capitalize"
                >
                  &nbsp; {capitalizeFirst(subcategory.name)}
                </option>
              ))}
          </React.Fragment>
        ))}
    </SelectInput>
  );
}
