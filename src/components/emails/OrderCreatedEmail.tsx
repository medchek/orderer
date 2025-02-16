import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Section,
  Text,
  Heading,
  ButtonProps,
} from "jsx-email";

import React from "react";

type Props = {
  createdAt: string;
  phone: string;
  wilaya: string;
  town: string;
  orderCode: string;
  products: string[];
};

export default function OrderCreated({
  createdAt,
  orderCode,
  phone,
  town,
  wilaya,
  products,
}: Props) {
  const main = {
    backgroundColor: "#f6f9fc",
    margin: "20px",
    padding: "30px 0",
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  };

  const container = { backgroundColor: "#ffffff", margin: "0 auto" };

  const box = { padding: "0 48px" };

  const button: ButtonProps["style"] = {
    backgroundColor: "#3b82f6",
    borderRadius: "5px",
    color: "#fff",
    display: "block",
    fontSize: "16px",
    fontWeight: "bold",
    padding: "10px",
    textAlign: "center" as const,
    width: "100%",
    margin: "0 auto",
  };

  const bold = { fontWeight: "bold" };
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Section style={box}>
            <Heading as="h1">Nouvelle Commande</Heading>
            <Text style={{ fontSize: "0.9rem" }}>
              Une nouvelle commande a été créée le
              <span style={bold}> {createdAt ?? "20/10/2023 à 19:23"}</span> par
              le numero
              <span style={bold}> {phone ?? "0550011336"}</span> depuis
              <span style={bold}> {wilaya ?? "Alger"}</span> -
              <span style={bold}> {town ?? "Kouba"}</span> contenant le ou les
              produits suivants:
              <ul>
                {products.map((productName, i) => (
                  <li key={i}>{productName}</li>
                ))}
              </ul>
              <Button
                href={`${process.env.APP_HOST ?? "http://localhost:3000"}/orders/${orderCode}`}
                style={button}
                height={20}
                width={100}
              >
                Voir la commande
              </Button>
            </Text>
            <Hr style={{ borderColor: "#e6ebf1", marginTop: "20px" }} />
            <Text
              style={{
                color: "#a3a3a3",
                textAlign: "center",
                fontSize: "0.7rem",
              }}
            >
              TRB Eshop © {new Date().getFullYear()}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
