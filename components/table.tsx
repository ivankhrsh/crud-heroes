import prisma from '@/lib/prisma'
import { timeAgo } from '@/lib/utils'
import Image from 'next/image'
import RefreshButton from './refresh-button'
import Link from 'next/link';

export default async function Table() {
  const startTime = Date.now();
  const heroes = await prisma.heroes.findMany({
    take: 5,
  });
  const duration = Date.now() - startTime;

  return (
    <div className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full">
      <div className="flex justify-between items-center mb-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Look!</h2>
          <p className="text-sm text-gray-500">
            Fetched {heroes.length} heroes in {duration}ms
          </p>
        </div>
        <RefreshButton />
      </div>
      <div className="divide-y divide-gray-900/5">
        {heroes.map((hero) => (
          <Link 
            key={hero.id}
            href={`/${hero.id}`}
            className="block px-2 hover:bg-gray-900/5 rounded-lg"
          >
            <div
              className="flex items-center justify-between py-3"
            >
              <div className="flex items-center space-x-4">
                <Image
                  src={hero.images[0]}
                  alt={hero.nickname}
                  width={48}
                  height={48}
                  className="rounded-lg ring-1 ring-gray-900/5"
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                />
                <div className="space-y-1">
                  <p className="font-medium leading-none">{hero.realName}</p>
                  <p className="text-sm text-gray-500">{hero.catchPhrase}</p>
                </div>
              </div>
              <p className="text-sm text-gray-500">{timeAgo(hero.createdAt)}</p>
          </div>
          </Link>

        ))}
      </div>
    </div>
  )
}
