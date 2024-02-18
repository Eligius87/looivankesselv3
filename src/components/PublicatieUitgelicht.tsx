import { Disclosure, Transition } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import FormatedDate from './FormatedDate';

function PublicatieUitgelicht(props: { titel: string, image: string, beschrijving: string, datum: string, url: string, buttontext: string }) {
  return (
    <div className='rounded-md flex flex-col justify-center items-center transition ease-in-out'>
      {/* image titel and plus minus icon */}
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className='w-full flex flex-col lg:flex-row gap-2 justify-between items-center ring-1 ring-zinc-200 p-4 rounded-lg shadow-md'>
              <div className='flex flex-col lg:flex-row  justify-center items-center gap-2'>
                <div className="relative aspect-square w-[50px] md:w-[100px] lg:w-[80px]">
                  <Image src={props.image} fill alt="" className='rounded-md object-cover' />
                </div>
                <div className='flex flex-col gap-2 items-start justify-center'>
                  <h1 className='font-bold text-[10px] md:text-xs lg:text-lg text-zinc-600 transition ease-in-out'>{props.titel}</h1>
                  <Link className="" href={props.url} passHref={true} target='__blank'>
                    <div className='text-left ring-1 ring-zinc-200 py-2 px-3 text-[10px] md:text-xs rounded-lg hover:ring-teal-400 hover:text-teal-400'>{props.buttontext}</div>
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
                <p>{props.beschrijving}</p>
                <h2 className='text-zinc-400 font-semibold'>
                  <FormatedDate dateString={props.datum} />
                </h2>
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  )
}

export default PublicatieUitgelicht;