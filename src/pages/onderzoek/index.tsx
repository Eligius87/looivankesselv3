import { SimpleLayout } from '@/components/SimpleLayout'
import { Container } from '@/components/Container'
import Image from 'next/image'
import { useState } from 'react'
import Link from 'next/link'
import React from 'react'
import { getDictionary } from '../api/dictionary'

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

function Thema(props: { titel: string, beschrijving: string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className='rounded-lg w-full shadow-lg ring-1 ring-zinc-200 p-4 flex flex-col justify-center items-start'>
      <h2 className='text-2xl font-bold tracking-tight text-zinc-800 py-1'>{props.titel}</h2>
      <div className={`text-base text-zinc-600 ${open ? '' : 'line-clamp-4'}`}>
      </div>
      <button className='rounded-lg py-1 px-2 ring-1 ring-zinc-200 text-sm mt-4 hover:ring-teal-400 hover:text-teal-400 transition ease-in-out' onClick={() => setOpen(!open)}>Lees {open ? 'minder' : 'verder'}</button>
    </div>
  )
}

type Props = {
  dictionary: any
}

export default function Publicatie({ dictionary }: Props) {
  const dict = dictionary.research;

  const texten = [
    {
      text1: {
        header1: `${dict.themas.titel1}`,
        alinea1: `${dict.themas.text1.alinea1}`,
        alinea2: `${dict.themas.text1.alinea1}`,
        alinea3: `${dict.themas.text1.alinea1}`
      }
    },
    {
      text2: {
        header2: `${dict.themas.titel2}`,
        alinea1: `${dict.themas.text2.alinea1}`,
        alinea2: `${dict.themas.text2.alinea1}`,
        alinea3: `${dict.themas.text2.alinea1}`,
      }
    },
    {
      text3: {
        header3: `${dict.themas.titel3}`,
        alinea1: `${dict.themas.text3.alinea1}`,
        alinea2: `${dict.themas.text3.alinea1}`,
        alinea3: `${dict.themas.text3.alinea1}`,
      }
    },
    {
      text4: {
        header4: `${dict.themas.titel4}`,
        alinea1: `${dict.themas.text4.alinea1}`,
        alinea2: `${dict.themas.text4.alinea1}`,
      }
    }

  ]


  return (
    <div>
      <Container className='mt-9'>
        <div className='w-full flex justify-center items-center flex-col'>
          <h1 className='text-center text-4xl font-bold tracking-tight text-zinc-800 py-4'>{dict.quote}</h1>
          <p className='text-sm text-zinc-400 w-1/2 text-center'>
            {dict.subquote}
          </p>
        </div>
        <div className='flex flex-row gap-6 w-full justify-center items-center p-10'>
          <Link href='onderzoek/publicaties' className='flex justify-center items-center py-2 px-4 rounded-full ring-1 ring-zinc-200 bg-black hover:text-teal-400 hover:ring-teal-400 transition ease-in-out'>
            <h1 className='text-sm text-white text-semibold'>{dict.button1}</h1>
          </Link>
          <Link href='onderzoek/lezingen' className='flex justify-center items-center py-2 px-4 rounded-full ring-1 ring-zinc-200 shadow-xl hover:text-teal-400 hover:ring-teal-400 transition ease-in-out'>
            <h1 className='text-sm text-semibold text-zinc-600'>{dict.button2}</h1>
          </Link>
        </div>
        {/* Onderzoek uitleg */}
        <h1 className='text-4xl font-bold tracking-tight text-zinc-800 py-4'>{dict.header1}</h1>
        <div className='flex flex-col gap-5'>

          {texten.map((textObject, index) => {
            const [open, setOpen] = useState(false);
            const text = Object.values(textObject)[0];
            return (
              <div key={index} className='rounded-lg w-full shadow-lg ring-1 ring-zinc-200 p-4 flex flex-col justify-center items-start'>
                <h2 className='text-2xl font-bold tracking-tight text-zinc-800 py-1'>{text.header1 || text.header2 || text.header3 || text.header4}</h2>
                <div className={`flex flex-col gap-2 text-base text-zinc-600 ${open ? '' : 'line-clamp-4'}`}>
                  <p>{text.alinea1}</p>
                  {open ?
                    <div className='flex flex-col gap-2'>
                      <p>{text.alinea2}</p>
                      <p>{text.alinea3}</p>
                    </div> : ''}
                </div>
                <button className='rounded-lg py-1 px-2 ring-1 ring-zinc-200 text-sm mt-4 hover:ring-teal-400 hover:text-teal-400 transition ease-in-out' onClick={() => {
                  setOpen(!open)               
                }}>{open ? `${dict.button4}` : `${dict.button3}`}</button>
              </div>
            )
          }
          )}

        </div>





        {/* // <div className='rounded-lg w-full shadow-lg ring-1 ring-zinc-200 p-4 flex flex-col justify-center items-start'>
          //   <h2 className='text-2xl font-bold tracking-tight text-zinc-800 py-1'>{dict.themas.titel1}</h2>
          //   <div className={`flex flex-col gap-2 text-base text-zinc-600 ${open ? '' : 'line-clamp-4'}`}>
          //     <p>{dict.themas.text1.alinea1}</p>
          //     {open ?
          //       <div className='flex flex-col gap-2'>
          //         <p>{dict.themas.text1.alinea2}</p>
          //         <p>{dict.themas.text1.alinea3}</p>
          //       </div> : ''}
          //   </div>
          //   <button className='rounded-lg py-1 px-2 ring-1 ring-zinc-200 text-sm mt-4 hover:ring-teal-400 hover:text-teal-400 transition ease-in-out' onClick={() => setOpen(!open)}>{open ? `${dict.button4}` : `${dict.button3}`}</button>
          // </div> */}


      </Container>
    </div>

  )
}


export async function getServerSideProps({ locale }: any) {
  const dictionary = await getDictionary(locale);
  return {
    props: {
      dictionary,
    },
  }
}