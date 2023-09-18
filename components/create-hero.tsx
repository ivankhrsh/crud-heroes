'use client';

import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import ExpandingArrow from './expanding-arrow';
import { HeroPayload } from '@/types/heroPayload';

export default function CreateHero() {
  const [heroData, setHeroData] = useState<HeroPayload>({
    nickname: '',
    realName: '',
    originDescription: '',
    superpowers: [],
    catchPhrase: '',
    images: [],
  });
  
  async function createNewHero(data: HeroPayload) {
    try {
      fetch('/api/create', {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      }).then(() => setHeroData({
        nickname: '',
        realName: '',
        originDescription: '',
        superpowers: [],
        catchPhrase: '',
        images: [],
      }))
    } catch (error) {
      console.error('Error creating hero:', error);
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'superpowers' || name === 'images') {
      const dataArray = value.split(',').map((item) => item.trim());
      setHeroData((prevData) => ({
        ...prevData,
        [name]: dataArray,
      }));
    } else {
      setHeroData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (data: HeroPayload) => {
    try {
      const superpowers = Array.isArray(data.superpowers) ? data.superpowers : [data.superpowers];
      const images = Array.isArray(data.images) ? data.images : [data.images];
  
      const updatedHeroData = {
        ...data,
        superpowers,
        images,
      };
  
      const response = await createNewHero(updatedHeroData);
      console.log(response);
    } catch (error) {
      console.error('Error creating hero:', error);
    }
  };

  return (
    <div className="bg-white p-6 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto mt-12">
      <Link
        href="/heroes"
        className="group mt-20 sm:mt-0 rounded-full flex w-fit space-x-5 mb-5 bg-white/30 shadow-sm ring-1 ring-gray-900/5 text-gray-600 text-sm font-medium px-10 py-2 hover:shadow-lg active:shadow-sm transition-all"
      >
        <ExpandingArrow/>
        <p>Back</p>
      </Link>
      <h2 className="text-xl font-semibold mb-4">Create a New Hero</h2>
      <form onSubmit={e => {
        e.preventDefault();
        handleSubmit(heroData);
      }}>
        <div className="mb-4">
          <label htmlFor="nickname" className="block text-gray-700 mb-2">
            Nickname
          </label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            value={heroData.nickname}
            onChange={handleChange}
            className="border p-2 rounded-lg w-full"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="realName" className="block text-gray-700 mb-2">
            Real Name
          </label>
          <input
            type="text"
            id="realName"
            name="realName"
            value={heroData.realName}
            onChange={handleChange}
            className="border p-2 rounded-lg w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="originDescription" className="block text-gray-700 mb-2">
            Origin Description
          </label>
          <textarea
            id="originDescription"
            name="originDescription"
            value={heroData.originDescription}
            onChange={handleChange}
            className="border p-2 rounded-lg w-full h-32"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="superpowers" className="block text-gray-700 mb-2">
            Superpowers (comma-separated)
          </label>
          <input
            type="text"
            id="superpowers"
            name="superpowers"
            value={heroData.superpowers}
            onChange={handleChange}
            className="border p-2 rounded-lg w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="catchPhrase" className="block text-gray-700 mb-2">
            Catchphrase
          </label>
          <input
            type="text"
            id="catchPhrase"
            name="catchPhrase"
            value={heroData.catchPhrase}
            onChange={handleChange}
            className="border p-2 rounded-lg w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="images" className="block text-gray-700 mb-2">
            Images (comma-separated URLs)
          </label>
          <input
            type="text"
            id="images"
            name="images"
            value={heroData.images}
            onChange={handleChange}
            className="border p-2 rounded-lg w-full"
            required
          />
        </div>
        
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg">
          Create Hero
        </button>
      </form>
    </div>
  );
}
