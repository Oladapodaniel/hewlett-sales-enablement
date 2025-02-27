'use client';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // const router = useRouter();

//   const handlePresent = () => {
//     document.documentElement.requestFullscreen();
//     router.push('/present');
// }

  return (
    <main>
      <div
      >
        {children}
      </div>
    </main>
  );
}
