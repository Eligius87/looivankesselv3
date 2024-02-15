import { Container } from "@/components/Container"
import banner from "@/images/Promotie Looi1.jpg"
import Image from "next/image"
import { Collapse } from 'react-collapse'
import { useState } from "react"
import { Uitlichting, getAllUitlichtings } from "../api/uitlichting"
import { Vakken, getAllVakken } from "../api/overzichtvakken"
import Link from "next/link"
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


function VakkenCard(props: {link: string, titel: string, traject: string, periode: string, color: string}) {

    return (
        <Link href={props.link}>
            <div className={`bg-background transition ease-in-out cursor-pointer hover:scale-105 grid grid-cols-4 shadow-md p-2 rounded-lg ${props.color} border-l-2 ring-1 ring-zinc-300 `}>
                {/* Vak naam */}
                <div className="col-span-1">
                    <h1 className="font-bold">Vak</h1>
                </div>
                <div className="col-span-3">{props.titel}</div>
                {/* traject */}
                <div className="col-span-1">
                    <h1 className="font-bold">Traject</h1>
                </div>
                <div className="col-span-3">{props.traject}</div>
                {/* jaren gegeven */}
                <div className="col-span-1">
                    <h1 className="font-bold">periode</h1>
                </div>
                <div className="col-span-3">{props.periode}</div>
            </div>
        </Link>
    )
}

function Accordionitem({open, toggle, title, desc}: any) {
    return (
        <div className={`shadow-md rounded-lg border-l-2 border-zinc-400 ReactCollapse--collapse ring-zinc-300`}>
            <div className="py-[25px] px-[50px] flex justify-between items-center cursor-pointer" onClick={toggle}>
                <p className="text-[22px] font-semibold">{title}</p>
                <div className={`text-[30px] transition-transform ${open ? 'rotate-180' : ''}`}>
                    {open ? <MinusIcon className="w-10 h-10"/> : <PlusIcon className="w-10 h-10"/> }
                </div>
            </div>
            <Collapse isOpened={open}>
                <div className="px-[50px] pb-[20px] text-zinc-600">{desc}</div>
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

    var trajectArr: string[] = [];

    vakken?.map((vak) => {
        let trajects = vak.traject.split(', ')
        trajectArr = trajectArr.concat(trajects)
    })
    
    trajectArr = trajectArr.filter((item, index, inputArr) => {
        return inputArr.indexOf(item) == index;
    });
    return (
        <div className="">
            <Container className="mt-9">
                <h1 className="text-center p-10 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-8xl">
                    {dict.header}
                </h1>
            </Container>
            <div className='sm:px-8'>
                <div className='flex justify-center items-center mx-auto max-w-[1050px] lg:px-8'>
                    <Image src={banner} alt="" className="rounded-xl w-full h-full object-cover" />
                </div>
            </div>
            <Container className="">

                {/* ONDERWIJS FILOSOFIE */}
                <div className="flex flex-col gap-2 border-zinc-400 py-8">
                        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
                          {dict.subheader1} 
                        </h1>
                    <div className="flex flex-col mt-6 space-y-7 text-base text-zinc-600 w-[800px] text-lg">
                     <p>{dict.onderwijsfilosofie1}</p>
                     <p>{dict.onderwijsfilosofie2}</p>
                     <p>{dict.onderwijsfilosofie3}</p>
                     <p>{dict.onderwijsfilosofie4}</p>
                    </div>
                </div>
                {/* VAK INITIATIEVE */}
                <div className="flex flex-col gap-2 border-zinc-400 py-8">
                        <h1 className="text-4xl pb-4 font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
                          {dict.subheader2} 
                        </h1>
                    <div className="flex flex-col gap-2">
                        {uitlichtings?.map((uitlichting, index) => (
                            <Accordionitem key={index} open={index === open} toggle={() => toggle(index)} title={uitlichting.titel} desc={uitlichting.beschrijving} />
                        ))}
                    </div>
                </div>
                {/* OVERZICHT VAKKEN */}
                <div className="flex flex-col gap-1">
                    <h1 className="py-6 text-4xl py-4 font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
                        {dict.subheader3}
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 border-zinc-400">
                        {vakken?.sort((a, b) => b.periode.localeCompare(a.periode)).map((vak) => {
                            var color = '';
                            for (let i = 0; i < trajectArr.length; i++) {
                                if (trajectArr[i] === vak.traject) {
                                    color = colors[i]
                                }
                            }
                            return (
                                <VakkenCard
                                    link={vak.link}
                                    key={vak.titel}
                                    titel={vak.titel}
                                    traject={vak.traject}
                                    periode={vak.periode}
                                    color={color}
                                />
                            )
                        })}
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