'use client'
import { useState } from 'react';
import logo from '../../public/logo.png'
import Image from "next/image";
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function FrontPage() {


  return (
    <div className="flex flex-col gap-5 items-center justify-center min-h-screen">
      <div className="w-full max-w-[550px] grid gap-2 flex flex-col items-center justify-center"
        style={{
          height: '260px',
          width: '360px',
          backgroundColor: 'black',
          borderRadius: '10px',

          transform: 'translateY(-150px)'
        }}
      >
        <div className="w-full max-w-[500px] grid gap-2 flex flex-col items-center justify-center"
          style={{
            height: '250px',
            width: '350px',
            backgroundColor: '#E9CF4B',
            borderRadius: '10px',
            paddingBottom: '25px',

          }}
        >
          <div className="flex h-[60px] items-center  px-6 bg-[#E9CF4B]">
            <Image alt="logo " src={logo} height={50} style={{ marginRight: 10 }} />
            <span className="flex items-center" style={{ fontSize: 36 }}>|</span>
            <span className="flex items-center font-semibold">OS Final Exam</span>

          </div>
          <div className="flex flex-col items-center justify-center flex-grow">

            <Link href={"/banker"}>
              <Button>Bankers Algorithm</Button>
            </Link>

            <Link href={'/disk'}>
              <Button>Disk Allocation Algorithm</Button>
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
