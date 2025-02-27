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
    <main>
      <div
      >
        {children}
      </div>
    </main>
  );
}
