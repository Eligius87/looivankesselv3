import { Container } from "@/components/Container"
import banner from "@/images/Promotie Looi 1.png"
import Image from "next/image"
import { Collapse } from 'react-collapse'
import { useState } from "react"
import { Uitlichting, getUitlichting, getAllUitlichtings } from "../api/uitlichting"
import { Vakken, getVak, getAllVakken } from "../api/overzichtvakken"
import Link from "next/link"
import { useRouter } from "next/router"
import { getDictionary } from "../api/dictionary"

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


function VakkenCard({link, titel, traject, periode, color}: any) {
    return (
        <Link href={link}>
            <div className={`bg-background transition ease-in-out cursor-pointer hover:scale-105 grid grid-cols-4 shadow-md p-2 rounded-lg border-l-2 ${color} ring-1 ring-zinc-300 `}>
                {/* Vak naam */}
                <div className="col-span-1">
                    <h1 className="font-bold">Vak</h1>
                </div>
                <div className="col-span-3">{titel}</div>
                {/* traject */}
                <div className="col-span-1">
                    <h1 className="font-bold">Traject</h1>
                </div>
                <div className="col-span-3">{traject}</div>
                {/* jaren gegeven */}
                <div className="col-span-1">
                    <h1 className="font-bold">periode</h1>
                </div>
                <div className="col-span-3">{periode}</div>
            </div>
        </Link>
    )
}

function Accordionitem({open, toggle, title, desc}: any) {
    return (
        <div className={`shadow-md rounded-lg border-l-2 border-red-500 ReactCollapse--collapse ring-1 ring-zinc-300`}>
            <div className="py-[25px] px-[50px] flex justify-between items-center cursor-pointer" onClick={toggle}>
                <p className="text-[22px] font-semibold">{title}</p>
                <div className={`text-[30px] transition-transform ${open ? 'rotate-180' : ''}`}>
                    {open ? <MinusIcon className="w-5 h-5"/> : <PlusIcon className="w-5 h-5"/> }
                </div>
            </div>
            <Collapse isOpened={open}>
                <div className="px-[50px] pb-[20px]">{desc}</div>
            </Collapse>
        </div>
    )
}

type Props = {
    uitlichtings: Uitlichting[],
    vakken: Vakken[],
    dictionary: any,
}

export default function Onderwijs({uitlichtings, vakken, dictionary}: Props) {
    const dict = dictionary.education

    const [open, setopen] = useState<number | null>(null);

    const toggle = ((index: any) => {
        if (open === index) {
            return setopen(null);
        }
        setopen(index)
    })

    const colors = [
        'border-red-500',
        'border-blue-500',
        'border-green-500',
        'border-yellow-500',
        'border-purple-500',
        'border-pink-500',
        'border-indigo-500',
    ]

    return (
        <div className="">
            <Container className="mt-9">
                <h1 className="text-center p-10 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-8xl">
                    {dict.header}
                </h1>
            </Container>
            <div className='sm:px-8'>
                <div className='mx-auto max-w-7xl lg:px-8'>
                    <Image src={banner} alt="" className="rounded-2 w-full h-full object-cover" />
                </div>
            </div>
            <Container className="">
                {/* ONDERWIJS FILOSOFIE */}
                <div className="flex flex-col gap-2 border-b-2 border-zinc-400 py-8">
                        <h1 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
                          {dict.subheader1} 
                        </h1>
                    <div className="flex">
                        <p>Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
                    </div>
                </div>
                {/* INITIATIEVEN */}
                <div className="grid grid-cols-2 gap-2 border-b-2 border-zinc-400 py-8">
                    <div className="cols-span-1">
                        <h1 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
                          {dict.subheader2} 
                        </h1>
                    </div>
                    <div className="cols-span-1">
                        <p>Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
                    </div>
                </div>
                {/* UITLICHTING AANTAL VAKKEN */}
                <div className="flex flex-col gap-2 border-b-2 border-zinc-400 py-8">
                        <h1 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
                          {dict.subheader3} 
                        </h1>
                    <div className="flex flex-col gap-2">
                        {uitlichtings?.map((uitlichting, index) => (
                            <Accordionitem key={index} open={index === open} toggle={() => toggle(index)} title={uitlichting.titel} desc={uitlichting.beschrijving} />
                        ))}
                    </div>
                </div>
                {/* OVERZICHT VAKKEN */}
                <div className="flex flex-col gap-1">
                    <h1 className="py-4 text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
                          {dict.subheader4} 
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 border-b-2 border-zinc-400 py-8">
                        {vakken?.map((vak, index) => (
                            <VakkenCard link={vak.link} key={vak.titel} titel={vak.titel} traject={vak.traject} periode={vak.periode} color={colors[index % 7]}/>
                        ))}
                    </div>
                </div>
            </Container>
        </div>
    )
} 


export async function getServerSideProps({locale}: any) {
  const uitlichtings = await getAllUitlichtings();
  const vakken = await getAllVakken();
  const dictionary = await getDictionary(locale);
  return {
    props: {
      uitlichtings: uitlichtings,
      vakken: vakken,
        dictionary,
    },
    }
  }