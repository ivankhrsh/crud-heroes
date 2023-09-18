"use client"

import Link from "next/link"
import ExpandingArrow from "./expanding-arrow"
import Image from "next/image"
import { Hero } from "@/types/hero"
import { FC, useState } from "react"

interface Props {
  hero: Hero
}

export const HeroView: FC<Props> = ({hero}) => {
  return (
    <>
      <Image
        src={hero.images[0]}
        className="rounded-lg ring-1 mb-5 ring-gray-900/5"
        width={500}
        height={500}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        alt={hero.nickname}
        priority={true}
      />

      <div className="mb-5">
        <p className="text-xl font-bold">Nickname:</p>
        <p className="text-lg">{hero.nickname}</p>
      </div>

      <div className="mb-5">
        <p className="text-xl font-bold">Real name:</p>
        <p className="text-lg">{hero.realName}</p>
      </div>

      <div className="mb-5">
        <p className="text-xl font-bold">Catch phrase:</p>
        <p className="text-lg">{hero.catchPhrase}</p>
      </div>

      <div className="mb-5">
        <p className="text-xl font-bold">Description:</p>
        <p className="text-lg">{hero.originDescription}</p>
      </div>

    <div className="mb-5">
      <p className="text-xl font-bold">Superpowers:</p>
      <ul className="list-disc ml-8">
        {hero.superpowers.map((power, index) => (
          <li key={index} className="text-lg">
            {power}
          </li>
        ))}
      </ul>
    </div>
    </>
  )
}