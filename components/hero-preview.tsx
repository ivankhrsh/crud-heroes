"use client"

import Link from "next/link"
import ExpandingArrow from "./expanding-arrow"
import Image from "next/image"
import { Hero } from "@/types/hero"
import { FC, useState } from "react"
import { EditHero } from "./edit-hero"
import { HeroView } from "./view-hero"

interface Props {
  hero: Hero
}

export const HeroPreview: FC<Props> = ({hero}) => {
  const [editing, setEditing] = useState(false);

  return (
    <div className="bg-white/30 p-12 py-6 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full">
      <div className="flex justify-between items-center">
        <Link
          href="/heroes"
          className="group mt-20 sm:mt-0 rounded-full flex w-fit space-x-5 mb-5 bg-white/30 shadow-sm ring-1 ring-gray-900/5 text-gray-600 text-sm font-medium px-10 py-2 hover:shadow-lg active:shadow-sm transition-all"
        >
          <ExpandingArrow/>
          <p>Back</p>
        </Link>

        <button 
          className="group mt-20 sm:mt-0 rounded-full flex w-fit space-x-5 mb-5 bg-white/30 shadow-sm ring-1 ring-gray-900/5 text-gray-600 text-sm font-medium px-10 py-2 hover:shadow-lg active:shadow-sm transition-all"
          onClick={() => setEditing(!editing)}
        >
          Edit
        </button>
      </div>
      {editing 
        ? (<EditHero hero={hero} />) 
        : (<HeroView hero={hero} />)
      }
    </div>
  )
}