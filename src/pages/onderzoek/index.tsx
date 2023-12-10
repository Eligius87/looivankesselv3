import { type Metadata } from 'next'
import { SimpleLayout } from '@/components/SimpleLayout'
import { Container } from '@/components/Container'
import Image from 'next/image'
import { getAllPublicaties, Publicaties } from '../api/publicaties'
import { Collapse } from 'react-collapse'
import { useState } from 'react'
import Link from 'next/link'

function PlusIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" {...props}>
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
    )
}

function MinusIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" {...props}>
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
        </svg>
    )
}

function ArrowIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" {...props}>
        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    )
}

function PublicatieCard({titel, publicatie_url, zin_besc, datum}: any) {
  return (
      <Link href={publicatie_url} className='cursor-pointer'>
        <div className='flex flex-row justify-between items-center gap-2 p-2 shadow-lg rounded-lg transition ease-in-out hover:scale-[101%]'>
          <div className='flex flex-col gap-2'>
            <h1 className='text-[10px] lg:text-md xl:text-xl font-bold'>{titel}</h1>
            <p className='text-[10px] lg:text-md xl:text-lg'>{zin_besc}</p>
            <h2 className='text-red-500 font-semibold text-[8px] lg:text-sm'>{datum}</h2>
          </div>
            <ArrowIcon  className='w-10 h-10 flex justify-center items-center'/>
        </div>
      </Link>
  )
}

function PublicatieAccordion({open, toggle, titel, image, beschrijving, datum}: any) {
  return (
    <div className='flex flex-col justify-center items-center ReactCollapse--collapse cursor-pointer'>
      {/* image titel and plus minus icon */}
      <div className='flex flex-col lg:flex-row gap-2 justify-between items-center' onClick={toggle}>
          <div className='flex flex-col lg:flex-row gap-2'>
            <div className="relative aspect-square w-[200px] lg:w-[120px]">
              <Image src={image} fill alt="" className='rounded-md object-cover'/>
            </div>
            <div className='flex flex-col gap-2 items-start w-[200px] lg:w-full'>
              <h1 className='font-bold text-xs lg:text-2xl'>{titel}</h1>
              <div className='flex flex-row justify-between w-[200px] lg:w-full'>
                <button className='bg-zinc-300 p-2 rounded-lg hover:bg-zinc-200 text-xs lg:text-md transition ease-in-out'>Lees volledig artikel</button>
                <div className={`lg:hidden flex justify-center items-center lg:text-[30px] transition-transform ${open ? 'rotate-180' : ''}`}>
                    {open ? <MinusIcon className="w-4 h-4"/> : <PlusIcon className="w-4 h-4"/> }
                </div>
              </div>
            </div>
          </div>
        <div className={`hidden lg:block flex justify-center items-center text-[30px] transition-transform ${open ? 'rotate-180' : ''}`}>
            {open ? <MinusIcon className="w-8 h-8"/> : <PlusIcon className="w-8 h-8"/> }
        </div>
      </div>
      {/* beschrijving */}
      <Collapse isOpened={open}>
        <div className='flex flex-col py-2 text-xs lg:text-lg w-[200px] lg:w-full'>
          <p>{beschrijving}</p>
          <h2 className='text-red-500'></h2>
        </div>
      </Collapse>
    </div>
  )
}

export default function Publicatie(props: {publicaties: Publicaties[]}) {
  const publicaties = props.publicaties
  const [open, setOpen] = useState<number | null>(null);
  
  const toggle = (index: number) => {
    if (open === index) {
      setOpen(null);
    } else {
      setOpen(index);
    }
  };

  return (
    <div>
      <SimpleLayout 
        title="I’ve spoken at events all around the world and been interviewed for many podcasts."
        intro=""
      >
      </SimpleLayout>
      <Container className='mt-9'>
        <div className="border-b-2 border-zinc-500"></div>
        {/* PUBLICATIES UITGELICHT */} 
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 py-4">Publicaties Uitgelicht</h1>
        <div className='flex flex-col gap-3'>
          {publicaties?.map((publicatie, index) => (
            <PublicatieAccordion key={index} open={index === open} toggle={() => toggle(index)} titel={publicatie.titel} image={publicatie.images[0]} beschrijving={publicatie.beschrijving} datum={publicatie.datum}/>
          ))}
        </div>
        {/* LEZINGEN */} 
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 py-4">Lezingen</h1>
        {/* ANDERE PUBLICATIES */} 
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 py-4">Andere Publicaties</h1>
        <div className='flex flex-col gap-3'>
          {publicaties?.map((publicatie, index) => (
            <PublicatieCard key={index} titel={publicatie.titel} publicatie_url={publicatie.publicatie_url} zin_besc={publicatie.zin_besc} datum={publicatie.datum}/>
          ))}
        </div>
      </Container> 
    </div>

  )
}


export async function getServerSideProps() {
  const publicaties = await getAllPublicaties();
  return {
    props: {
      publicaties: publicaties,
    },
    }
  }