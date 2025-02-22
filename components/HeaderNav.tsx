import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import { logo } from '@/lib/images'

const HeaderNav = () => {
  return (
    <div className="border">
      <div className='container mx-auto flex justify-between py-5'>
        <Image
          src={logo}
          alt='logo'
        />
        <Button className="rounded-[12px] bg-[#03A983]" type="submit">Log In</Button>
      </div>
    </div>
  )
}

export default HeaderNav