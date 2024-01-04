import React from 'react'
import Image from 'next/image'

function ArrowRightIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" {...props}>
            <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    )
}

function ArrowleftIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" {...props}>
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    )
}

function ClockIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" {...props}>
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>

    )
}

function AgendaItem({type, date, time, titel, image, desc, color}: any) {
    return (
        <div className={`flex flex-row border-l-2 ${color} p-2 shadow-lg rounded-lg ring-1 ring-zinc-300`}>
            <div className='flex flex-col gap-2 px-4 w-auto justify-between'>
                <div className='flex flex-col w-[120px]'>
                    <h1 className='font-bold'>{type}</h1>
                    <h1 className='font-bold text-zinc-400'>{date}</h1>
                </div>
                <div className='flex flex-row gap-2'>
                <span><ClockIcon className='w-5 h-5'/></span>
                <h1 className='font-bold text-xs text-zinc-400'>{time}</h1>
                </div>
            </div>
            <div className='relative w-[200px] h-auto aspect-square'>
                <Image src={image} alt="" fill className='object-cover'/>
            </div>
            <div className='flex flex-col gap-2 px-2'>
                <h1>{titel}</h1>
                <p>{desc}</p>
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
    items:  AgendaItemsProps[];
}

export function Agenda({ items }: AgendaProps) {
  return (
    <div className='flex flex-col'>
        <div className='flex flex-row gap-2'>
            <div className='flex-start'>Mei 2023</div>
            <ArrowleftIcon className='w-5 h-5'/>
            <ArrowRightIcon className='w-5 h-5'/>
        </div>
        <div className='flex flex-col gap-2'>
            {items.map((item:any, index: number) => (
                <AgendaItem key={index} {...item}/>
            ))}
        </div>
    </div>
  )
}
