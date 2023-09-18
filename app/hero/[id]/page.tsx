import { HeroPreview } from '@/components/hero-preview';
import prisma from '@/lib/prisma';

const HeroPage = async ({ params }: { params: { id: string } }) => {
  const hero = await prisma.heroes.findUnique({
    where: {
      id: Number(params?.id),
    },
  });

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center">
        <h1 className="pt-4 pb-8 bg-gradient-to-br from-black via-[#171717] to-[#575757] bg-clip-text text-center text-1xl font-medium tracking-tight text-transparent md:text-4xl">
          Hero Details: {hero?.nickname || 404}
        </h1>
        {hero ? (
          <HeroPreview hero={hero} />
        ) : (
          "No hero found"
        )}
    </div>
  );
};

export default HeroPage;
