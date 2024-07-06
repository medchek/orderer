import Footer from "@/components/Footer";
import HomeHeader from "@/components/home/HomeHeader";
import SelectedProductDetails from "@/components/home/order-form/SelectedProductDetails";
import OrderInfoSegment from "@/features/orders/components/OrderInfoSegment";

import React, { Fragment } from "react";
import { prisma } from "../../../../prisma/db";

import { BsCartX } from "react-icons/bs";
import { IoMdArrowBack } from "react-icons/io";
import { addPartitive, discountedPrice, formatDate } from "@/lib/utils";
import Link from "next/link";
import DashboardOrdersStatusBadge from "@/features/orders/components/DashboardOrdersStatusBadge";
import Main from "@/components/Main";

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
    select: {
      // the shipping price includes an additional costs aswell
      shippingPrice: true,
      wilaya: true,
      isHome: true,
      address: true,
      code: true,
      createdAt: true,
      status: true,
      updatedAt: true,
      town: true,
      location: {
        select: {
          name: true,
          coordinates: true,
          town: {
            select: {
              name: true,
            },
          },
        },
      },
      orderProducts: {
        select: {
          price: true,
          discount: true,
          quantity: true,
          product: {
            select: {
              code: true,
              name: true,
              description: true,
              discount: true,
              price: true,
              images: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
      },
      user: true,
      phone: {
        select: {
          phone: true,
        },
      },
    },
  });

  // const shippingPrice = () => {
  //   const price =
  //     (data?.isHome ? data.wilaya.homePrice : data?.wilaya.officePrice) ?? 0;

  //   return price + (data?.location?.additionalCosts ?? 0);
  // };

  // const totalPrice = () => {
  //   if (!data || !shippingPrice) return;
  //   const allProductsPrice = data?.orderProducts.reduce(
  //     (prevPrice, { product: currentProduct }) => {
  //       return (
  //         discountedPrice(currentProduct.price, currentProduct.discount) +
  //         prevPrice
  //       );
  //     },
  //     0,
  //   );

  const productsPrice = () => {
    if (!data || !data.shippingPrice) return 0;

    const totalProductsPrices = data.orderProducts.reduce(
      (prev, currentProduct): number => {
        // get the price of each selected product, including the
        const currentProductPrice = discountedPrice(
          currentProduct.price,
          currentProduct.discount,
        );
        // get the quantity of each selected product
        const currentProductQuantity = currentProduct.quantity;
        // calulcate based on the quantity
        const quantifiedCurrentProductPrice =
          currentProductPrice * currentProductQuantity;
        return prev + quantifiedCurrentProductPrice;
      },
      0,
    );

    return totalProductsPrices + data.shippingPrice;
  };

  const displayAddress = () => {
    if (!data) return;
    if (data.isHome) {
      return data.address;
    } else {
      if (data.location) {
        const { name, town, coordinates } = data.location;
        return (
          <div className="flex gap-1 [&>span]:dark:text-neutral-600">
            <p>{name}</p>
            <span>&bull;</span>
            <span className="capitalize">{town.name}</span>
            {coordinates ? (
              <>
                <span>&bull;</span>
                <a
                  className="text-secondary hover:underline"
                  href={coordinates}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Maps
                </a>
              </>
            ) : null}
          </div>
        );
      } else {
        return `Bureau de livraison de la wilaya ${addPartitive(
          data.wilaya.name,
        )}`;
      }
    }
  };

  // const handleEmptyValue = (v: string | undefined | null) =>
  //   !v ? "Non mentioné" : v;

  const fullName = (name: StringOrEmpty, lastName: StringOrEmpty) => {
    if (!name && !lastName) return "Non mentioné";
    const fullName = `${lastName ?? ""} ${name ?? ""}`;
    return fullName.trim();
  };

  const totalProductsCount =
    data?.orderProducts.reduce((prev, current) => {
      return current.quantity + prev;
    }, 0) ?? 1;

  return (
    <Main>
      <HomeHeader />

      {!data ? (
        <div className="flex h-full w-full grow flex-col items-center justify-center gap-2 text-center text-neutral-500">
          <p>Aucune commande ne correspond au code fourni</p>
          <BsCartX className="h-16 w-16" />
        </div>
      ) : (
        <Fragment>
          <div className="flex h-11 items-center gap-2">
            <Link href="/." title="Acceuil">
              <IoMdArrowBack className="h-8 w-8" />
            </Link>
            <h1 className="text-lg font-semibold lg:text-xl">Votre commande</h1>
          </div>
          <div className="flex w-full grow flex-col gap-2 lg:flex-row lg:gap-4">
            <section className="flex w-auto grow flex-col gap-10 rounded-xl bg-neutral-200 p-4 dark:bg-neutral-950 lg:p-6">
              {/* {data.map(({ title, data }) => {
            return <OrderInfoSegment title={title} data={data} />;
          })} */}

              <OrderInfoSegment
                title="Informations personnelles"
                data={[
                  { label: "Téléphone", content: data.phone.phone },
                  {
                    label: "Nom",
                    content: fullName(data.user?.name, data.user?.lastName),
                    capitalize: true,
                  },
                ]}
              />
              <OrderInfoSegment
                title="Livraison"
                data={[
                  {
                    label: "Type de livraison",
                    content: data.isHome
                      ? "À domicile"
                      : "Au bureau de livraison",
                  },
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
                    content: displayAddress(),
                  },
                ]}
              />
              <OrderInfoSegment
                title="Informations commande"
                data={[
                  { label: "Code", content: data.code },
                  {
                    label: "Date de création",
                    content: formatDate(data.createdAt),
                  },
                  {
                    label: "Statut",
                    content: (
                      <DashboardOrdersStatusBadge status={data.status} />
                    ),
                  },
                  {
                    label: "Statut modifié le",
                    content:
                      data.createdAt.getTime() === data.updatedAt.getTime()
                        ? "Pas encore"
                        : formatDate(data.updatedAt),
                  },
                  {
                    label: "Nombre de produits",
                    content: totalProductsCount,
                  },
                ]}
              />
            </section>
            <section className="flex w-full flex-col overflow-hidden rounded-xl bg-neutral-200 pt-4 dark:bg-neutral-950 lg:w-[390px] lg:pt-6">
              <h3 className="pl-4 text-base font-bold text-neutral-900 dark:text-neutral-200 lg:text-lg">
                Produits
              </h3>
              <div className="mb-2 grow px-1 lg:mb-0 lg:px-2">
                {data.orderProducts.map(
                  ({ product, price, discount, quantity }) => (
                    <SelectedProductDetails
                      quantity={quantity}
                      key={product.code}
                      description={product.description}
                      disabledRemove
                      discount={discount}
                      name={product.name}
                      price={price}
                      code={product.code}
                      transparentBg
                      images={product.images}
                      small
                    />
                  ),
                )}
              </div>
              <div className="flex h-40 items-center bg-neutral-300 px-4 dark:bg-neutral-900">
                <OrderInfoSegment
                  justifyBetween
                  title="Prix"
                  data={[
                    {
                      label: "Prix livraison",
                      content: data.shippingPrice + "DA",
                    },
                    {
                      label: "Prix total à payer",
                      content: (
                        <span className="font-semibold text-secondary">
                          {productsPrice()}DA
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
    </Main>
  );
}
