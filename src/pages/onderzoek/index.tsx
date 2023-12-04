import { type Metadata } from 'next'
import { SimpleLayout } from '@/components/SimpleLayout'
import { Container } from '@/components/Container'
import Image from 'next/image'
import { getAllPublicaties, Publicaties } from '../api/publicaties'

function DateFormatter(props: {datum: string}) {
  const date = new Date(props.datum)
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDay()
  const dateString = `${day}-${month}-${year}`
  return (
    <p>{dateString}</p>
  )
}

function PublicatieCard(props: {titel: string, image: string, beschrijving: string, datum: string}) {
  return (
    <div className='flex flex-row gap-2'>
      <div className='w-[300px] h-[300px]'>
        <div className="relative aspect-square w-[120px]">
          <Image src={props.image} fill alt="" className='rounded-md object-cover'/>
        </div>
      </div>
      <div className='flex flex-col'>
        <h1 className='font-bold'>{props.titel}</h1>
        <p>{props.beschrijving}</p>
        <h2 className='text-red-500'></h2>
      </div>
    </div>
  )
}

export default function Publicatie(props: {publicaties: Publicaties[]}) {
  const publicaties = props.publicaties
  return (
    <div>
      <SimpleLayout
        title="I’ve spoken at events all around the world and been interviewed for many podcasts."
        intro=""
      >
      </SimpleLayout>
      <Container className='mt-9'>
        <div className='border-t-2 border-zinc-400'></div>
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 py-4">Publicaties</h1>
        {publicaties?.map((publicatie) => (
          <PublicatieCard titel={publicatie.titel} image={publicatie.images[0]} beschrijving={publicatie.beschrijving} datum={publicatie.datum}/>
        ))}
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