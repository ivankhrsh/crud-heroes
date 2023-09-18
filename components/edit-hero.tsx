import Link from "next/link";
import { useState } from "react";
import ExpandingArrow from "./expanding-arrow";
import Image from "next/image";
import { Hero } from "@/types/hero";
import { FC } from "react";
import { HeroPayload } from "@/types/heroPayload";

interface Props {
  hero: Hero;
}

export const EditHero: FC<Props> = ({ hero}) => {
  const [editedHero, setEditedHero] = useState(hero);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedHero((prevHero) => ({
      ...prevHero,
      [name]: value,
    }));
  };

  const onEdit = (editedHero: HeroPayload) => (console.log(editedHero));
  const onDelete = (editedHero: HeroPayload) => (console.log(editedHero));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEdit(editedHero);
  };

  return (
    <div>
      <Image
        src={editedHero.images[0]}
        className="rounded-lg ring-1 mb-5 ring-gray-900/5"
        width={500}
        height={500}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        alt={editedHero.nickname}
        priority={true}
      />

      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className="text-xl font-bold">Nickname:</label>
          <input
            type="text"
            name="nickname"
            value={editedHero.nickname}
            onChange={handleChange}
            className="text-lg border p-2 rounded-lg w-full"
          />
        </div>

        <div className="mb-5">
          <label className="text-xl font-bold">Real name:</label>
          <input
            type="text"
            name="realName"
            value={editedHero.realName}
            onChange={handleChange}
            className="text-lg border p-2 rounded-lg w-full"
          />
        </div>

        <div className="mb-5">
          <label className="text-xl font-bold">Catch phrase:</label>
          <input
            type="text"
            name="catchPhrase"
            value={editedHero.catchPhrase}
            onChange={handleChange}
            className="text-lg border p-2 rounded-lg w-full"
          />
        </div>

      <div className="mb-5">
        <label className="text-xl font-bold">Description:</label>
        <textarea
          name="originDescription"
          value={editedHero.originDescription}
          onChange={handleChange}
          className="text-lg border p-2 rounded-lg w-full h-32"
        />
      </div>

      <div className="mb-5">
        <label className="text-xl font-bold">Superpowers:</label>
        <input
          type="text"
          name="superpowers"
          value={editedHero.superpowers.join(', ')}
          onChange={handleChange}
          className="text-lg border p-2 rounded-lg w-full"
        />
      </div>

      </form>
      <div className="flex justify-between items-center">
        <button
          onClick={handleSubmit}
          className="group mt-20 sm:mt-0 rounded-full flex w-fit space-x-5 mb-5 bg-lime-200 shadow-sm ring-1 ring-gray-900/5 text-gray-600 text-sm font-medium px-10 py-2 hover:shadow-lg active:shadow-sm transition-all"
        >
          Save Changes
        </button>

        <button
          onClick={onDelete}
          className="group mt-20 sm:mt-0 rounded-full flex w-fit space-x-5 mb-5 bg-red-300	 shadow-sm ring-1 ring-gray-900/5 text-gray-600 text-sm font-medium px-10 py-2 hover:shadow-lg active:shadow-sm transition-all"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
