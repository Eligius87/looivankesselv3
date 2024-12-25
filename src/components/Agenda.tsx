import React from 'react'
import Image from 'next/image'
import { ClockIcon, ArrowLeftCircleIcon, ArrowRightCircleIcon, MapPinIcon, LinkIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/router'
import Link from 'next/link'

const MonthDict: string[][] = [
    ['Jan', 'Feb', 'Maa', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'],
    ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
]


function AgendaItem({ type, date, time, titel, image, desc, color, locatie, link }: any) {
    return (
        <div className={`flex flex-col w-[200px] sm:w-full sm:flex-row border-b-2 sm:border-l-2 sm:border-b-0 ${color} p-0 sm:p-2 shadow-lg rounded-lg ring-1 ring-zinc-300`}>
            <div className='flex flex-col gap-2 px-4 w-auto justify-between'>
                <div className='flex flex-col w-[120px]'>
                    <h1 className='font-bold sm:text-md'>{type}</h1>
                    <h1 className='font-bold text-zinc-400 text-xs'>{date}</h1>
                </div>
                <div className='flex flex-col gap-2 justify-center'>
                    <div className='flex flex-row gap-2 items-center'>
                        <span><MapPinIcon className='w-3 h-3 md:w-5 md:h-5' /></span>
                        <h1 className='font-bold text-[10px] md:text-xs text-zinc-400'>{locatie}</h1>
                    </div>
                    <div className='flex flex-row gap-2 items-center'>
                        <span><ClockIcon className='w-3 h-3 md:w-5 md:h-5' /></span>
                        <h1 className='font-bold text-[10px] md:text-xs text-zinc-400'>{time}</h1>
                    </div>
                    <div className='flex flex-row gap-2 items-center'>
                        <span><LinkIcon className='w-3 h-3 md:w-5 md:h-5' /></span>
                        <Link className='font-bold text-[10px] md:text-xs text-zinc-400' href={link} target='_blank'>Link</Link>
                    </div>
                </div>
            </div>
            <div className='relative w-[200px] h-auto aspect-square'>
                <Image src={image} alt="" fill className='object-cover' />
            </div>
            <div className='flex flex-col gap-2 p-2 sm:px-2'>
                <h1 className='text-sm md:text-lg'>{titel}</h1>
                <p className='text-xs md:text-md'>{desc}</p>
            </div>
        </div>
    )
}

type AgendaItemsProps = {
    type: string;
    date: string;
    time: string;
    titel: string;
    image: string;
    desc: string;
    color: string;
}

type AgendaProps = {
    items: AgendaItemsProps[];
    noActivity: string;
}

export function Agenda({ items, noActivity }: AgendaProps) {
    const router = useRouter()
    const isDutch = router.locale === 'nl'
    const langInt = isDutch ? 0 : 1

    const months = MonthDict[langInt]
    const currentDate = new Date();
    const [month, setMonth] = React.useState(currentDate.getMonth())
    const [year, setYear] = React.useState(currentDate.getFullYear())

    const handleMonth = (direction: string) => {
        if (direction === 'left') {
            if (month === 0) {
                setMonth(11)
                setYear(year - 1)
            } else {
                setMonth(month - 1)
            }
        } else if (direction === 'right') {
            if (month === 11) {
                setMonth(0)
                setYear(year + 1)
            } else {
                setMonth(month + 1)
            }
        }
    }

    const filteredItems = items.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate.getMonth() === month && itemDate.getFullYear() === year;
    });

    return (
        <div className='flex flex-col'>
            <div className='py-2 flex flex-row gap-2 items-center'>
                <div className='flex-start font-bold text-xl'>{months[month]} {year}</div>
                <ArrowLeftCircleIcon className='w-10 h-10 cursor-pointer hover:text-zinc-400 transition ease-in-out' onClick={() => handleMonth('left')} />
                <ArrowRightCircleIcon className='w-10 h-10 cursor-pointer hover:text-zinc-400 transition ease-in-out' onClick={() => handleMonth('right')} />
            </div>
            <div className='flex flex-row flex-wrap md:flex-col gap-2 justify-center items-center'>
                {filteredItems.length > 0 ? (
                    filteredItems.map((item: any, index: number) => (
                        <AgendaItem key={index} {...item} />
                    ))) : (
                    <div className='flex justify-center items-center h-[100px] text-zinc-400'>
                        {noActivity}
                    </div>
                )}
            </div>
        </div>
    )
}