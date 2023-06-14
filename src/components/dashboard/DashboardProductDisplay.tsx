import Image from "next/image";
import React from "react";
import { MdDeleteOutline, MdEdit } from "react-icons/md";

type Props = {};

export default function DashboardProductDisplay({}: Props) {
  return (
    <div className="flex flex-col h-[450px] bg-white rounded-lg overflow-hidden">
      <div className="relative h-[210px] bg-stone-200">
        {/* bg-cover bg-center */}

        <Image
          src="https://scontent.falg6-2.fna.fbcdn.net/v/t45.5328-4/350058072_6619365291415410_3353060098354417131_n.jpg?stp=dst-jpg_p960x960&_nc_cat=107&ccb=1-7&_nc_sid=c48759&_nc_eui2=AeFaq8GFJOynTifnKQDYaH8sXI7Y4N6Fynxcjtjg3oXKfAJ8eqE31XSXmEQ_Lz-arJvfSJgKK0mi3aTZPyAu4jRN&_nc_ohc=BLd2ZpGo-C8AX_mcKUq&_nc_ht=scontent.falg6-2.fna&oh=00_AfADioqaDDdG_82yqV8DdccvyIcAI1gwG2ISiGlmcNLVYQ&oe=64875FA3"
          className="h-full object-cover object-center"
          alt="Product image"
          fill
          quality={50}
        />
      </div>

      <div className="flex flex-col justify-between p-2 grow">
        <div className="flex flex-col justify-between grow pb-2">
          <section className="space-y-1">
            <p className="font-semibold">
              Apple Watch Series 8 Gps + Cellular 45mm
            </p>
            <p className="text-[#979797] text-sm">Couleur: Midnight</p>
          </section>

          <section>
            <p className="text-secondary">Stock: 3</p>
            <p className="font-semibold">Prix: 5000DA</p>
          </section>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            type="button"
            className="flex items-center justify-center gap-1 font-semibold bg-[#E9E9E9] hover:bg-[#e0e0e0] focus:bg-[#cacaca] h-7 rounded-md grow text-sm"
          >
            <MdEdit className="w-5 h-5" /> Modifier
          </button>
          <button
            type="button"
            className="flex items-center justify-center w-7 h-7 rounded-md bg-[#E9E9E9] transition-colors hover:text-red-600 focus:bg-red-600 focus:text-white"
          >
            <MdDeleteOutline className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
