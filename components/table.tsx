import prisma from '@/lib/prisma';
import { timeAgo } from '@/lib/utils';
import Image from 'next/image';
import RefreshButton from './refresh-button';
import Link from 'next/link';

const ITEMS_PER_PAGE = 5;

export default async function Table({ page = 1 }) {
  const startTime = Date.now();
  const heroes = await prisma.heroes.findMany();
  const duration = Date.now() - startTime;

  const totalItems = heroes.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentHeroes = heroes.slice(startIndex, endIndex);

  return (
    <div className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Look!</h2>
          <p className="text-sm text-gray-500">
            Fetched {currentHeroes.length} heroes in {duration}ms 
          </p>
        </div>
        <RefreshButton />
      </div>
      <div className="divide-y divide-gray-900/5">
        {currentHeroes.map((hero) => (
          <Link key={hero.id} href={`/hero/${hero.id}`} className="block px-2 hover:bg-gray-900/5 rounded-lg">
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center space-x-4">
                <Image 
                  src={hero.images[0]} 
                  alt={hero.nickname} 
                  width={48} 
                  height={48} 
                  className="rounded-lg ring-1 ring-gray-900/5" 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  
                />
                <div className="space-y-1">
                  <p className="font-medium leading-none">{hero.nickname}</p>
                  <p className="text-sm text-gray-500">{hero.realName}</p>
                </div>
              </div>
              <p className="text-sm text-gray-500">{timeAgo(hero.createdAt)}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <Link href={`/heroes/${Math.max(page - 1, 1)}`}>
          <button className="bg-gray-900/10 hover:bg-gray-900/20 px-3 py-1 rounded-lg" disabled={page === 1}>
            Prev
          </button>
        </Link>
        <Link href={`/heroes/${Math.min(page + 1, totalPages)}`}>
          <button className="bg-gray-900/10 hover:bg-gray-900/20 px-3 py-1 rounded-lg" disabled={page === totalPages}>
            Next
          </button>
        </Link>
      </div>
      <div className="text-center mt-4">
        <Link 
          href='/create' 
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg">
          Add Hero
        </Link>
      </div>
    </div>
  );
}
