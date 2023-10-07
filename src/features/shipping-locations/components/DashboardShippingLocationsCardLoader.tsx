import React from "react";
export default function DashboardShippingLocationsCardLoader() {
  return (
    // <div className="w-80 rounded-md bg-stone-900 p-2 px-4">
    <div className="w-auto rounded-md bg-stone-950 p-2 px-4 animate-pulse">
      <section className="flex h-10 items-center justify-between gap-10">
        <p className="h-5 w-10/12 rounded-md bg-stone-800"></p>
      </section>
      <hr className="border-stone-900" />
      <section className="flex w-full flex-col gap-1.5 py-2 [&>div>p]:h-4 [&>div>p]:rounded-sm [&>div>p]:bg-stone-800 [&>div]:flex [&>div]:w-full [&>div]:items-center [&>div]:justify-between">
        <div>
          <p className="w-24"></p>
          <p className=" w-36"></p>
        </div>
        <div>
          <p className=" w-28"></p>
          <p className=" w-44"></p>
        </div>
        <div>
          <p className=" w-24"></p>
          <p className=" w-36"></p>
        </div>
        <div>
          <p className="w-20"></p>
          <p className=" w-16"></p>
        </div>
      </section>
    </div>
  );
}
