import { SimpleLayout } from '@/components/SimpleLayout'
import { Container } from '@/components/Container'
import Image from 'next/image'
import { getAllPublicaties, Publicaties } from '../api/publicaties'
import { Collapse } from 'react-collapse'
import { useState } from 'react'
import Link from 'next/link'
import { getAllPublicatiesUit, PublicatiesUit } from '../api/publicatiesuitgelicht'

function FormatedDate({dateString}: any) {
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  const formatedDate = date.toLocaleDateString('nl-BE', options)
  return (
    <time dateTime={dateString}>{formatedDate}</time>
  )
}

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
      <Link href={publicatie_url} target='__blank' passHref={true} className='cursor-pointer'>
        <div className='flex flex-row justify-between items-center gap-2 ring-1 ring-zinc-300 p-2 shadow-lg rounded-lg transition ease-in-out hover:scale-[101%]'>
          <div className='flex flex-col gap-2'>
            <h1 className='text-[10px] lg:text-md xl:text-xl font-bold'>{titel}</h1>
            <p className='text-[10px] lg:text-md xl:text-lg'>{zin_besc}</p>
            <h2 className='text-zinc-400 font-semibold text-[8px] lg:text-sm'>
              <FormatedDate dateString={datum} />
            </h2>
          </div>
            <ArrowIcon  className='w-10 h-10 flex justify-center items-center'/>
        </div>
      </Link>
  )
}

function PublicatieAccordion({open, toggle, titel, image, beschrijving, datum, url}: any) {

  return (
    <div className='rounded-md flex flex-col justify-center items-center ReactCollapse--collapse cursor-pointer'>
      {/* image titel and plus minus icon */}
      <div className='w-full flex flex-col lg:flex-row gap-2 justify-between' onClick={toggle}>
            <div className="relative aspect-square w-[150px] md:w-[200px] lg:w-[120px]">
              <Image src={image} fill alt="" className='rounded-md object-cover'/>
            </div>
            <div className='flex flex-col gap-2 items-between justify-start w-[150px] md:w-[200px] lg:w-full'>
              <Link className="" href={url} passHref={true} target='__blank'>
                <h1 className='font-bold text-[10px] md:text-xs lg:text-xl text-zinc-900 hover:text-zinc-600 transition ease-in-out'>{titel}</h1>
              </Link>
            </div>
          <div className={`flex justify-center items-center transition-transform ${open ? 'rotate-180' : ''}`}>
              {open ? <MinusIcon className="w-4 h-4 lg:w-8 lg:h-8"/> : <PlusIcon className="w-4 h-4 lg:w-8 lg:h-8"/> }
          </div>
      </div>
      {/* beschrijving */}
      <Collapse isOpened={open}>
        <div className='flex flex-col py-2 text-xs lg:text-lg w-[150px] md:w-[200px] lg:w-[800px]'>
          <p>{beschrijving}</p>
          <h2 className='text-zinc-400 font-semibold'>
            <FormatedDate dateString={datum} />
          </h2>
        </div>
      </Collapse>
    </div>
  )
}

export default function Publicatie(props: {publicaties: Publicaties[], publicatiesuit: PublicatiesUit[]}) {
  const publicaties = props.publicaties
  const publicatiesuit = props.publicatiesuit
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
        <h1 className="text-xl md:text-4xl font-bold tracking-tight text-zinc-800 py-4">Publicaties Uitgelicht</h1>
        <div className='grid grid-cols-[150px_150px] md:grid-cols-[200px_200px] lg:grid-cols-1 gap-3 md:gap-20 lg:gap-3 justify-center lg:justify-start items-start'>
          {publicatiesuit?.map((publicatieuit, index) => (
            <PublicatieAccordion key={index} open={index === open} toggle={() => toggle(index)} titel={publicatieuit.titel} image={publicatieuit.image} beschrijving={publicatieuit.beschrijving} datum={publicatieuit.datum} url={publicatieuit.pubuit_url}/>
          ))}
        </div>
        {/* LEZINGEN */} 
        <div className="pt-10 border-b-2 border-zinc-500"></div>
        <h1 className="text-xl md:text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 py-4">Lezingen</h1>
        {/* ANDERE PUBLICATIES */} 
        <div className="pt-10 border-b-2 border-zinc-500"></div>
        <h1 className="text-xl md:text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 py-4">Andere Publicaties</h1>
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
  const publicatiesuit = await getAllPublicatiesUit();
  return {
    props: {
      publicaties: publicaties,
      publicatiesuit: publicatiesuit,
    },
    }
  }