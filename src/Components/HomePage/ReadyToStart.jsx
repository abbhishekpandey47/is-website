import React from 'react'
import {useRouter} from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
const ReadyToStart = () => {
    const router = useRouter()
    return (
        <div className='py-12 rounded-lg max-xs:mx-4 max-sm:max-8 mx-12 my-12 gap-12 readytostart'>
            <div className='flex flex-col justify-center items-center gap-2'>
                <div>
                    <Image width={100} height={100} loading='lazy' src="/logodata/infra_logo_only.png" className='w-auto h-auto' alt="Infrasity_Logo" />
                </div>
                <div className='flex flex-col items-center'>
                    <h2 className='text-2xl md:text-3xl lg:text-4xl text-white tracking-tight quicksand-bold'>Get started with Infrasity</h2>
                    <p className="w-2/3 text-center pt-2 text-[wheat]">Infrasity is the only platform which provides you with developer focused content for your products or services</p>
                </div>
                <div className='flex gap-5 pt-5'>
                    <Link target='_blank' href="https://content.infrasity.com/"  className='btn bg-white text-gray-800 font-semibold py-2 px-4 rounded shadow hover:bg-gray-100 quicksand-semibold'>Outline Generator</Link>
                    <button onClick={(()=>{router.push("/contact")})} className='btn bg-black text-white font-semibold py-2 px-4 rounded shadow hover:bg-gray-900 quicksand-semibold'>Talk to Us</button>
                </div>
            </div>
        </div>
    )
}

export default ReadyToStart
