import { Container } from "@/components/Container"
import banner from "@/images/Promotie Looi1.jpg"
import Image from "next/image"
import { useState } from "react"
import { Uitlichting, getAllUitlichtings } from "../api/uitlichting"
import { Vakken, getAllVakken } from "../api/overzichtvakken"
import Link from "next/link"
import { NextSeo } from "next-seo"
import { getDictionary } from "../api/dictionary"
import VakkenCard from "@/components/VakkenCard"
import Accordionitem from "@/components/AccordionItem"


type Props = {
    uitlichtings: Uitlichting[],
    vakken: Vakken[],
    dictionary: any,
}

export default function Onderwijs({ uitlichtings, vakken, dictionary }: Props) {
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
    const currentYear = new Date().getFullYear().toString();

    var trajectArr: string[] = [];

    vakken?.map((vak) => {
        let trajects = vak.traject.split(', ')
        trajectArr = trajectArr.concat(trajects)
    })

    trajectArr = trajectArr.filter((item, index, inputArr) => {
        return inputArr.indexOf(item) == index;
    });
    return (
        <>
            <NextSeo
                title={dict.header}
                description={dict.subheader1}
            />
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
                    <div className="flex flex-col gap-2 border-zinc-400 py-8 w-full">
                        <h1 className="text-lg md:text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
                            {dict.subheader1}
                        </h1>
                        <div className="flex flex-col mt-6 space-y-7 text-base text-zinc-600 text-xs sm:text-sm md:text-lg">
                            <p>{dict.onderwijsfilosofie1}</p>
                            <p>{dict.onderwijsfilosofie2}</p>
                            <p>{dict.onderwijsfilosofie3}</p>
                        </div>
                    </div>
                    {/* VAK INITIATIEVE */}
                    <div className="flex flex-col gap-2 border-zinc-400 py-8">
                        <h1 className="text-lg md:text-4xl pb-4 font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
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
                        <h1 className="py-6 text-lg md:text-4xl py-4 font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
                            {dict.subheader3}
                        </h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 border-zinc-400">
                            {vakken?.sort((a, b) => {
                                if (a.periode.includes(currentYear) && !b.periode.includes(currentYear)) {
                                    return -1;
                                }
                                if (!a.periode.includes(currentYear) && b.periode.includes(currentYear)) {
                                    return 1;
                                }
                                return 0;
                            }).map((vak) => {
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
                                        vaktext={dict.Course}
                                        trajecttext={dict.Trajectory}
                                        periodetext={dict.Period}
                                    />
                                )
                            })}
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}


export async function getServerSideProps({ locale }: any) {
    const uitlichtings = await getAllUitlichtings(locale);
    const vakken = await getAllVakken(locale);
    const dictionary = await getDictionary(locale);
    return {
        props: {
            uitlichtings: uitlichtings,
            vakken: vakken,
            dictionary,
        },
    }
}