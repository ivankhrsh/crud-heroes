import { useState } from "react";
import Image from "next/image";
import { Hero } from "@/types/hero";
import { FC } from "react";
import { HeroPayload } from "@/types/heroPayload";

interface Props {
  hero: Hero;
  toggleEditing: () => void;
}

export const EditHero: FC<Props> = ({ hero, toggleEditing }) => {
  const [editedHero, setEditedHero] = useState(hero);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedHero((prevHero) => ({
      ...prevHero,
      [name]: value,
    }));
  };

  async function updateHero(data: HeroPayload) {
    try {
      fetch("/api/update?" + new URLSearchParams({id: String(hero.id)}), {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      })
    } catch (error) {
      console.error('Error creating hero:', error);
    }
  }

  const handleEdit = async (editedHero: HeroPayload) => {
    if (editedHero !== hero) {
      try {
        const superpowers = Array.isArray(editedHero.superpowers) ? editedHero.superpowers : [editedHero.superpowers];
        const images = Array.isArray(editedHero.images) ? editedHero.images : [editedHero.images];
    
        const updatedHeroData = {
          ...editedHero,
          superpowers,
          images,
        };
        const response = await updateHero(updatedHeroData);
        console.log(response);
        toggleEditing();

      } catch (error) {
        console.error('Error creating hero:', error);
      }
    }
  };

  async function deleteHero(id: number) {
    try {
      fetch("/api/delete?" + new URLSearchParams({id: String(id)}), {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'DELETE'
      })
    } catch (error) {
      console.error('Error creating hero:', error);
    }
  }

  const handleDelete = async (id: number) => {
    try {
      const response = await deleteHero(id);
      console.log(response);
    } catch (error) {
      console.error('Error creating hero:', error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleEdit(editedHero);
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        {hero.images.map((image) => (
          <Image
            key={image}
            src={image}
            className="rounded-lg ring-1 mb-5 ring-gray-900/5"
            width={500}
            height={500}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt={hero.nickname}
            priority={true}
          />
        ))}
      </div>

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
          onClick={() => handleDelete(hero.id)}
          className="group mt-20 sm:mt-0 rounded-full flex w-fit space-x-5 mb-5 bg-red-300	 shadow-sm ring-1 ring-gray-900/5 text-gray-600 text-sm font-medium px-10 py-2 hover:shadow-lg active:shadow-sm transition-all"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
