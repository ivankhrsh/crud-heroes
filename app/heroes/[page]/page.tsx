import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import Table from '@/components/table';
import TablePlaceholder from '@/components/table-placeholder';
import { redirect } from 'next/navigation';

export const preferredRegion = 'home';
export const dynamic = 'force-dynamic';

export default function Heroes({ params }: { params?: { page?: string } }) {
  const currentPage = params?.page || '1';
  const parsedPage = parseInt(currentPage);

  // Redirect to page 1 if params are empty or if page is not a valid number
  // if (!currentPage || isNaN(parsedPage) || parsedPage < 1) {
  //   return redirect("/?page=1" );
  // }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <h1 className="pt-4 pb-8 bg-gradient-to-br from-black via-[#171717] to-[#575757] bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl">
        Heroes
      </h1>
      <Suspense fallback={<TablePlaceholder />}>
        <Table page={parsedPage} />
      </Suspense>

      <div className="sm:absolute sm:bottom-0 w-full px-20 py-10 flex justify-end">
        <Link href="https://github.com/ivankhrsh" className="flex items-center space-x-2">
          <Image src="/github.svg" alt="GitHub Logo" width={24} height={24} priority />
          <p className="font-light">Github</p>
        </Link>
      </div>
    </main>
  );
}
