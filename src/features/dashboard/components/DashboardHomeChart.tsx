"use client";

import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
} from "recharts";
import { ChartData } from "../types";

interface Props {
  data: ChartData;
}

export default function DashboardHomeChart({ data }: Props) {
  return (
    <ResponsiveContainer className="h-full w-full">
      <AreaChart
        data={data}
        // margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient
            id="colorUv"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
            className="text-teal-500"
          >
            <stop offset="5%" stopColor="currentColor" stopOpacity={0.8} />
            <stop offset="95%" stopColor="currentColor" stopOpacity={0} />
          </linearGradient>
          <linearGradient
            id="colorPv"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
            className="text-sky-500"
          >
            <stop offset="5%" stopColor="currentColor" stopOpacity={0.8} />
            <stop offset="95%" stopColor="currentColor" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" className="text-sm" />
        <YAxis className="text-xs" />
        <CartesianGrid strokeDasharray="4 4" className="stroke-neutral-700" />
        <Tooltip wrapperClassName="rounded-xl" />
        <Area
          type="monotone"
          dataKey="sales"
          name="Produits vendus"
          stroke="#0d9488"
          className="stroke-2"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
        <Area
          type="monotone"
          dataKey="orders"
          name="Commandes"
          stroke="#0ea5e9"
          fillOpacity={1}
          className="stroke-2"
          fill="url(#colorPv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
