import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <header className="mb-1">
        <Image
          className="relative"
          src="/trb-logo.png"
          alt="TRB Eshop Logo"
          width={100}
          height={100}
          priority
        />
        <p className="text-primary text-base font-semibold text-center">
          E-Shop
        </p>
      </header>
      <section className="w-[1150px]">
        <h1 className="text-2xl font-bold ">Votre Commande</h1>
        <div className="w-full bg-[#F4F4F4] h-44 my-2 rounded-2xl flex py-2 px-5">
          <Image
            className="relative rounded-xl"
            src="/apple-watch.jpg"
            alt="TRB Eshop Logo"
            width={150}
            height={150}
            priority
          />
          <div className="flex flex-col justify-between ml-7 w-full">
            <section className="space-y-0.5">
              <h2 className="font-semibold text-lg">
                Apple Watch Series 8 Gps + Cellular 45mm
              </h2>
              <p className="text-[#666666] text-sm">Couleur: Midnight</p>
              <p className="text-secondary text-sm font-semibold">
                En stock: 3
              </p>
              <p className=" text-sm">Prix: 5000 + 400 (livraison)</p>
            </section>

            <p className="font-semibold">Prix Total: 5400 DA</p>
          </div>
        </div>
      </section>
    </main>
  );
}
