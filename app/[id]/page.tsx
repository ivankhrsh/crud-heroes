import ExpandingArrow from '@/components/expanding-arrow';
import prisma from '@/lib/prisma';
import Image from 'next/image';
import Link from 'next/link';

const HeroPage = async ({ params }: { params: { id: string } }) => {
  const hero = await prisma.heroes.findUnique({
    where: {
      id: Number(params?.id),
    },
  });

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center">
        <h1 className="pt-4 pb-8 bg-gradient-to-br from-black via-[#171717] to-[#575757] bg-clip-text text-center text-1xl font-medium tracking-tight text-transparent md:text-4xl">
          Hero Details: {hero?.nickname}
        </h1>
        {hero ? (
          <div className="bg-white/30 p-12 py-6 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full">
            <Link
              href="/"
              className="group mt-20 sm:mt-0 rounded-full flex w-fit space-x-5 mb-5 bg-white/30 shadow-sm ring-1 ring-gray-900/5 text-gray-600 text-sm font-medium px-10 py-2 hover:shadow-lg active:shadow-sm transition-all"
            >
              <ExpandingArrow/>
              <p>Back</p>
            </Link>
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
        </div>
        ) : (
          "No hero found"
        )}
    </div>
  );
};

export default HeroPage;
