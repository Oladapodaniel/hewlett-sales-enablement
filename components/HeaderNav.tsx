'use client';

import React from 'react'
import Image from 'next/image'
import { logo } from '@/lib/images'
import { useRouter } from 'next/navigation'

const HeaderNav = () => {
  const router = useRouter();
  return (
    <div className="border">
      <div className='container mx-auto flex justify-between py-5 cursor-pointer' onClick={() => router.push('/')}>
        <Image
          src={logo}
          alt='logo'
        />
        {/* <Button className="rounded-[12px] bg-[#03A983]" type="submit">Log In</Button> */}
      </div>
    </div>
  )
}

export default HeaderNav