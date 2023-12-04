import Image, { type ImageProps } from 'next/image'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import logoAirbnb from '@/images/logos/airbnb.svg'
import logoFacebook from '@/images/logos/facebook.svg'
import logoPlanetaria from '@/images/logos/planetaria.svg'
import logoStarbucks from '@/images/logos/starbucks.svg'
import portrait from '@/images/bannerlooi.jpg'

import { Preview, getAllPreviews } from './api/landingpage'

function BriefcaseIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  )
}

function ArrowDownIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}


interface Role {
  company: string
  title: string
  logo: ImageProps['src']
  start: string | { label: string; dateTime: string }
  end: string | { label: string; dateTime: string }
}

function Role({ role }: { role: Role }) {
  let startLabel =
    typeof role.start === 'string' ? role.start : role.start.label
  let startDate =
    typeof role.start === 'string' ? role.start : role.start.dateTime

  let endLabel = typeof role.end === 'string' ? role.end : role.end.label
  let endDate = typeof role.end === 'string' ? role.end : role.end.dateTime

  return (
    <li className="flex gap-4">
      <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
        <Image src={role.logo} alt="" className="h-7 w-7" unoptimized />
      </div>
      <dl className="flex flex-auto flex-wrap gap-x-2">
        <dt className="sr-only">Company</dt>
        <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {role.company}
        </dd>
        <dt className="sr-only">Role</dt>
        <dd className="text-xs text-zinc-500 dark:text-zinc-400">
          {role.title}
        </dd>
        <dt className="sr-only">Date</dt>
        <dd
          className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
          aria-label={`${startLabel} until ${endLabel}`}
        >
          <time dateTime={startDate}>{startLabel}</time>{' '}
          <span aria-hidden="true">—</span>{' '}
          <time dateTime={endDate}>{endLabel}</time>
        </dd>
      </dl>
    </li>
  )
}

function Resume() {
  let resume: Array<Role> = [
    {
      company: 'Planetaria',
      title: 'CEO',
      logo: logoPlanetaria,
      start: '2019',
      end: {
        label: 'Present',
        dateTime: new Date().getFullYear().toString(),
      },
    },
    {
      company: 'Airbnb',
      title: 'Product Designer',
      logo: logoAirbnb,
      start: '2014',
      end: '2019',
    },
    {
      company: 'Facebook',
      title: 'iOS Software Engineer',
      logo: logoFacebook,
      start: '2011',
      end: '2014',
    },
    {
      company: 'Starbucks',
      title: 'Shift Supervisor',
      logo: logoStarbucks,
      start: '2008',
      end: '2011',
    },
  ]

  return (
    <div className="rounded-2xl p-6 row-span-3 shadow-lg">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Work</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {resume.map((role, roleIndex) => (
          <Role key={roleIndex} role={role} />
        ))}
      </ol>
      <Button href="#" variant="secondary" className="group mt-6 w-full">
        Download CV
        <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
      </Button>
    </div>
  )
}

function Agenda() {
  return(
    <div className='mt-9'>
      <h1 className="text-center text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-6xl">
        Agenda
      </h1>
      <div className=''>

      </div>
    </div>
  )
}

function PreviewCard(props: {beschrijving: string, date: string, image: string}) {
  return(
    <div className='flex flex-col gap-2'>
      <div className='relative w-[100px] h-[100px] md:w-[200px] md:h-[200px] lg:w-[300px] lg:h-[300px]'>
        <Image src={ props.image } fill alt="" className="rounded-2xl" />
      </div>
      <div className='text-[10px] md:text-md lg:text-lg font-bold py-2'>
        {props.beschrijving}
      </div>
      <div className='flex flex-row items-center justify-between '>
        <div className='text-red-600 font-bold text-[10px] md:text-xs lg:text-sm'>{props.date}</div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 md:w-5 md:h-5 lg:w-6 lg:h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
          </svg>
      </div>

    </div>
  )
}


export default function Home(props: {previews: Preview[]}) {
  const previews = props.previews;
  return (
    <div className=''>
      <Container className="mt-9 ">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-8xl">
            Looi van Kessel <br></br>Professor, Schrijver 
          </h1>
          <div className='w-full flex flex-row justify-between item-center my-5'>
            <h1 className='text-xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-xl'>Leiden, Universiteit</h1>
            <h1 className='text-xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-xl'>Scroll Naar Beneden</h1>
          </div>
        <div className='max-w-3xl'>  
        </div>
      </Container>
        <div className='sm:px-8'>
          <div className='mx-auto w-full max-w-7xl lg:px-8'>
            <Image src={portrait} alt="" className="rounded-2xl w-full h-full" />
          </div>
        </div>
      <Container className='mt-9'>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-4xl">
            painting and typesetting industry. Lorem Ipsum has  e a type.
          </h1>
          <Agenda />
      </Container>
      {/* photo */}
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto lg:max-w-none">
          <div className="space-y-10 "> 
            <div className='grid grid-cols-1 grid-flow-row gap-4 lg:grid-cols-3'>
              <div className='col-span-2 grid gap-4 grid-cols-2'>
                {previews?.map((preview) => (
                  <PreviewCard key={preview.id} beschrijving={preview.beschrijving} date={preview.datum} image={preview.images[0]} /> 
                ))}
              </div> 
              <Resume />
            </div> 
          </div>
        </div>
      </Container>
    </div>
  )
}

export async function getServerSideProps() {
  const previews = await getAllPreviews();
  return {
    props: {
      previews: previews,
    },
    }
  }