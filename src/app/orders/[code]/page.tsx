import Footer from "@/components/Footer";
import HomeHeader from "@/components/home/HomeHeader";
import SelectedProductDetails from "@/components/home/order-form/SelectedProductDetails";
import OrderInfoSegment from "@/components/orders/OrderInfoSegment";
import OrderStatusBadge from "@/components/orders/OrderStatusBadge";
import React, { Fragment } from "react";
import { prisma } from "../../../../prisma/db";

import { BsCartX } from "react-icons/bs";
import { IoMdArrowBack } from "react-icons/io";
import { addPartitive, discountedPrice, formatDate } from "@/lib/utils";
import Link from "next/link";

type StringOrEmpty = string | null | undefined;

interface Props {
  params: { code: string };
}

export const metadata = {
  title: "Votre Commande - TRB Eshop",
  description: "Consulter votre commande",
};

export default async function Orders({ params }: Props) {
  const { code } = params;

  //TGDGAUZFJRD7L6
  const data = await prisma.order.findUnique({
    where: {
      code,
    },
    include: {
      wilaya: true,
      town: true,
      orderProducts: {
        select: {
          product: {
            include: { images: true },
          },
        },
      },
      user: true,
    },
  });

  const shippingPrice = data?.isHome
    ? data.wilaya.homePrice
    : data?.wilaya.officePrice;

  const totalPrice = () => {
    if (!data || !shippingPrice) return;
    const allProductsPrice = data?.orderProducts.reduce(
      (prevPrice, { product: currentProduct }) => {
        return (
          discountedPrice(currentProduct.price, currentProduct.discount) +
          prevPrice
        );
      },
      0
    );

    return allProductsPrice + shippingPrice;
  };

  const handleEmptyValue = (v: string | undefined | null) =>
    !v ? "Non mentioné" : v;

  const fullName = (name: StringOrEmpty, lastName: StringOrEmpty) => {
    if (!name && !lastName) return "Non mentioné";
    const fullName = `${lastName} ${name}`;
    return fullName.trim();
  };

  return (
    <main className="flex min-h-screen flex-col px-10 2xl:px-56 dark:text-stone-50">
      <HomeHeader />

      {!data ? (
        <div className="w-full h-full flex flex-col justify-center items-center grow text-stone-500 gap-2">
          <p>Aucune commande ne correspond au code fourni</p>
          <BsCartX className="w-16 h-16" />
        </div>
      ) : (
        <Fragment>
          <div className="h-11 flex items-center gap-2">
            <Link href="/." title="Acceuil">
              <IoMdArrowBack className="w-8 h-8" />
            </Link>
            <h1 className="text-xl font-semibold">Votre commande</h1>
          </div>
          <div className="flex w-full grow gap-4">
            <section className="flex flex-col gap-10 grow w-auto bg-stone-950 rounded-xl py-6 px-6">
              {/* {data.map(({ title, data }) => {
            return <OrderInfoSegment title={title} data={data} />;
          })} */}

              <OrderInfoSegment
                title="Information personnelles"
                data={[
                  { label: "Téléphone", content: data.user.phone },
                  {
                    label: "Nom",
                    content: fullName(data.user.name, data.user.lastName),
                  },
                ]}
              />
              <OrderInfoSegment
                title="Livraison"
                data={[
                  { label: "Type de livraison", content: "À domicile" },
                  {
                    label: "Wilaya",
                    content: `${data.wilaya.code} - ${data.wilaya.name}`,
                  },
                  {
                    label: "Commune",
                    content: data.town.name,
                    capitalize: true,
                  },
                  {
                    label: "Adresse",
                    content: data.isHome
                      ? data.address
                      : `Bureau de livraison de la wilaya ${addPartitive(
                          data.wilaya.name
                        )}`,
                  },
                ]}
              />
              <OrderInfoSegment
                title="Information commande"
                data={[
                  { label: "Code", content: data.code },
                  {
                    label: "Date de création",
                    content: formatDate(data.createdAt),
                  },
                  {
                    label: "Statut",
                    content: <OrderStatusBadge text="Non confirmé" />,
                  },
                  {
                    label: "Nombre de produits",
                    content: data.orderProducts.length,
                  },
                ]}
              />
            </section>
            <section className="flex flex-col w-[390px] bg-stone-950 rounded-xl pt-6 overflow-hidden">
              <h3 className="font-bold text-lg text-stone-200 pl-4">
                Produits
              </h3>
              <div className="px-2 grow">
                {data.orderProducts.map(({ product }) => (
                  <SelectedProductDetails
                    key={product.code}
                    description={product.description}
                    disabledRemove
                    discount={product.discount}
                    name={product.name}
                    price={product.price}
                    productCount={0}
                    onClear={() => {}}
                    transparentBg
                    images={product.images}
                    small
                  />
                ))}
              </div>
              <div className="flex items-center bg-stone-900 h-40 px-4">
                <OrderInfoSegment
                  justifyBetween
                  title="Prix"
                  data={[
                    {
                      label: "Prix livraison",
                      content:
                        (data.isHome
                          ? data.wilaya.homePrice
                          : data.wilaya.officePrice) + "DA",
                    },
                    {
                      label: "Prix total à payer",
                      content: (
                        <span className="text-secondary font-semibold">
                          {totalPrice()}DA
                        </span>
                      ),
                    },
                  ]}
                />
              </div>
            </section>
          </div>
        </Fragment>
      )}

      <Footer />
    </main>
  );
}
