import { GetStaticPaths, GetStaticProps } from 'next'
import { Publicaties, getPublicatie, getAllPublicaties } from '../../api/publicaties'
import { Lezingen, getLezing, getAllLezingen } from '../../api/lezingen'
import { Container } from '../../../components/Container';
import Image from 'next/image';
import Link from 'next/link';
import { Collapse } from 'react-collapse'
import { useState } from 'react';
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import { Disclosure, Transition } from '@headlessui/react';

type ContentProps = {
  publicaties?: Publicaties[],
  lezingen?: Lezingen[]
}

type ContentType = 'publicaties' | 'lezingen';

function FormatedDate({ dateString }: any) {
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

function ArrowIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" {...props}>
      <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  )
}

function PublicatieAccordion({ titel, image, beschrijving, datum, url }: any) {

  return (
    <div className='rounded-md flex flex-col justify-center items-center transition ease-in-out'>
      {/* image titel and plus minus icon */}
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className='w-full flex flex-col lg:flex-row gap-2 justify-between items-center ring-1 ring-zinc-200 p-4 rounded-lg shadow-md'>
              <div className='flex flex-row gap-2'>
                <div className="relative aspect-square w-[50px] md:w-[100px] lg:w-[80px]">
                  <Image src={image} fill alt="" className='rounded-md object-cover' />
                </div>
                <div className='flex flex-col gap-2 items-start justify-center'>
                  <h1 className='font-bold text-[10px] md:text-xs lg:text-lg text-zinc-600 transition ease-in-out'>{titel}</h1>
                  <Link className="" href={url} passHref={true} target='__blank'>
                    <div className='text-left ring-1 ring-zinc-200 py-2 px-3 text-xs rounded-lg hover:ring-teal-400 hover:text-teal-400'>Lees volledig artikel</div>
                  </Link>
                </div>
              </div>
              <ChevronUpIcon className={`w-10 h-10 transform transition ease-in-out ${open ? 'rotate-180' : ''}`} />
            </Disclosure.Button>
            {/* beschrijving */}
            <Transition
              enter="transition duration-200 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-200 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Disclosure.Panel className='flex flex-col py-2 text-xs lg:text-lg w-[150px] md:w-[200px] lg:w-[800px]'>
                <p>{beschrijving}</p>
                <h2 className='text-zinc-400 font-semibold'>
                  <FormatedDate dateString={datum} />
                </h2>
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  )
}

function PublicatieCard({ titel, publicatie_url, zin_besc, datum }: any) {
  return (
    <Link href={publicatie_url} target='__blank' passHref={true} className='cursor-pointer w-full'>
      <div className=' flex flex-row justify-between items-center gap-2 ring-1 ring-zinc-200 p-2 shadow-md rounded-lg transition ease-in-out hover:scale-[101%]'>
        <div className='flex flex-col gap-2'>
          <dt className='text-base font-semibold leading-7'>{titel}</dt>
          <dd className='text-base leading-7 text-zinc-600'>{zin_besc}</dd>
          <h1 className='text-zinc-400 font-semibold text-[8px] lg:text-sm'>
            <FormatedDate dateString={datum} />
          </h1>
        </div>
        <ArrowIcon className='w-10 h-10 flex justify-center items-center' />
      </div>
    </Link>
  )
}

export default function index({ publicaties, lezingen }: ContentProps) {
  const [open, setOpen] = useState<number | null>(null);

  const toggle = (index: number) => {
    if (open === index) {
      setOpen(null);
    } else {
      setOpen(index);
    }
  };

  function renderContent() {
    function renderPublicaties(type: string, title: string) {
      return (
        <>
          <h2 className='text-5xl text-center font-bold p-20'>{title}</h2>
          <div className='w-full flex flex-col justify-center items-center gap-8'>
            {
              publicaties?.filter(publicatie => publicatie.type === type && publicatie.uitgelicht === false).map((publicatie, index) => (
                <PublicatieCard key={index} titel={publicatie.titel} publicatie_url={publicatie.publicatie_url} zin_besc={publicatie.zin_besc} datum={publicatie.datum} />
              ))
            }
          </div>
        </>
      );
    }


    if (publicaties) {
      return (
        <div>
          <h1 className='text-4xl font-bold text-center p-10'>Vind hier al mijn Publicaties</h1>
          <h2 className='text-2xl font-bold py-5'>Uitgelichte Publicaties</h2>
          <div className='grid grid-cols-[150px_150px] md:grid-cols-[200px_200px] lg:grid-cols-1 gap-3 md:gap-20 lg:gap-3 justify-center lg:justify-start items-start transition ease-in-out'>
            {
              publicaties?.filter(publicatie => publicatie.uitgelicht === true).map((publicatie, index) => (
                <PublicatieAccordion key={index} open={index === open} toggle={() => toggle(index)} titel={publicatie.titel} image={publicatie.image} beschrijving={publicatie.zin_besc} datum={publicatie.datum} url={publicatie.publicatie_url} />
              ))
            }
          </div>
          {renderPublicaties('artikel', 'Alle Artikelen')}
          {renderPublicaties('recensie', 'Alle Boek Recensies')}
          {renderPublicaties('thema', 'Alle Redactie themanummers')}
        </div>
      )
    } else if (lezingen) {
      return (
        <div>
          {lezingen?.map((lezing, index) => (
            <div key={index} className='flex flex-col gap-4 justify-center items-center'>
              {lezing.titel}
            </div>
          ))}
        </div>
      )
    }
  }

  return (
    <div>
      <Container>
        {renderContent()}
      </Container>
    </div>
  );
}


export const getStaticProps: GetStaticProps<ContentProps> = async ({ params }) => {
  const content = params?.content;


  if (content === 'publicaties') {
    const publicaties = await getAllPublicaties();
    return { props: { publicaties: publicaties } };
  } else if (content === 'lezingen') {
    const lezingen = await getAllLezingen();
    return { props: { lezingen } };
  }

  return { notFound: true };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [
    { params: { content: 'publicaties' } },
    { params: { content: 'lezingen' } },
  ];

  return { paths, fallback: false };
};