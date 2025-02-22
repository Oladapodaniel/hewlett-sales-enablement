'use client';

import { Button } from "@/components/ui/button";
import { logo } from "@/lib/images";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const router = useRouter();

  const handlePresent = () => {
    document.documentElement.requestFullscreen();
    router.push('/present');
}

  return (
    <main className="bg-[#e8eafc]">
      <div className="bg-white">
        <div className='container mx-auto flex justify-between py-5'>
          <Image
            src={logo}
            alt='logo'
          />
          <Button onClick={handlePresent} className="flex self-end rounded-[12px] bg-[#03A983] shadow-lg shadow-[rgba(3, 169, 131, 0.6)] hover:bg-[#04e1af] hover:shadow-[#04e1af] mb-5" type="submit">Present</Button>
        </div>
      </div>
      <div
      >
        {children}
      </div>
    </main>
  );
}
