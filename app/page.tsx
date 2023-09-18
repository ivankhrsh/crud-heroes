import { redirect } from 'next/navigation';

export const preferredRegion = 'home';
export const dynamic = 'force-dynamic';

export default function Home() {
  return redirect("/heroes/1" );
}
