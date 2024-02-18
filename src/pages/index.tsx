import Image, { type ImageProps } from 'next/image'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import logoLucas from '@/images/logos/LUCAS.png'
import logoNog from '@/images/logos/nog icon.png'
import logoTijdschrift from '@/images/logos/TijdschriftGenderstudies.jpg'
import logoLGBT from '@/images/logos/lgbtqnetwork.png'
import portrait from '@/images/bannerlooi.jpg'
import couperus from '@/images/logos/couperus.png'
import { Preview, getAllPreviews } from './api/landingpage'
import { Agendas, getAllAgendas} from './api/agenda'
import { getDictionary } from './api/dictionary'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Agenda } from '@/components/Agenda'



const BASE_FILE_STORAGE_URL = process.env.NEXT_PUBLIC_SUPABASE_BASE_FILE_URL;

function FormatedDate({dateString}: any) {
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
      <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5">
        <Image src={role.logo} alt="" className="h-8 w-8 object-cover rounded-full" unoptimized />
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
  const router = useRouter();
  const lang = router.locale;
  const [dict, setDict] = useState<any>(null);

  useEffect(() => {
    getDictionary(lang)
      .then((dictionary) => {
        console.log("Dictionary:", dictionary.home);
        setDict(dictionary.home);
      })
      .catch((error) => {
        console.error('Error loading dictionary:', error);
      });
  }, [lang]);

  if (!dict) {
    return <div>Loading...</div>;
  }  

  let resume: Array<Role> =  [
    {
      company: dict.resume.one.company,
      title: dict.resume.one.title,
      logo: logoLucas,
      start: '2019',
      end: {
        label: dict.resume.present,
        dateTime: new Date().getFullYear().toString(),
      },
    },
    {
      company: dict.resume.two.company,
      title: dict.resume.two.title,
      logo: logoNog,
      start: '2021',
      end: {
        label: dict.resume.present,
        dateTime: new Date().getFullYear().toString(),
      },
    },
    {
      company: dict.resume.three.company,
      title: dict.resume.three.title,
      logo: logoTijdschrift,
      start: '2018',
      end: {
        label: dict.resume.present,
        dateTime: new Date().getFullYear().toString(),
      },
    },
    {
      company: dict.resume.four.company,
      title: dict.resume.four.title,
      logo: logoLGBT,
      start: '2017',
      end: {
        label: dict.resume.present,
        dateTime: new Date().getFullYear().toString(),
      },
    },
    {
      company: dict.resume.five.company,
      title: dict.resume.five.title,
      logo: couperus,
      start: '2014',
      end: {
        label: dict.resume.present,
        dateTime: new Date().getFullYear().toString(),
      },
    }
  ];

  return (
    <div className="rounded-2xl p-6 row-auto shadow-lg">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Werk</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {resume.map((role, roleIndex) => (
          <Role key={roleIndex} role={role} />
        ))}
      </ol>
      <Button target="_blank" href={BASE_FILE_STORAGE_URL + '/files/Looi%20van%20Kessel%20-%20Curriculum%20Vitae%20(2023).docx.pdf?t=2023-12-07T10%3A18%3A51.030Z'} variant="secondary" className="hover:text-teal-400 group mt-6 w-full">
        Download CV
        <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
      </Button>
    </div>
  )
}

function PreviewCard(props: {beschrijving: string, date: string, image: string, type: string, link: string}) {
    function podcastIcon() {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 md:w-5 md:h-5 lg:w-6 lg:h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
        </svg>
      )
    }
    function videoIcon() {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
          <path stroke-linecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
        </svg>
      )
    }

    function articleIcon() {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      )
    }
  
  return(
    <Link href={props.link}>
      <div className='grid grid-rows-auto gap-2 cursor-pointer'>
        <div className='relative max-w-full h-auto aspect-square row-span-2'>
          <Image src={ props.image } fill alt="" className="object-cover rounded-2xl" />
        </div>
        <div className='text-[10px] md:text-xl lg:text-lg font-bold py-2 row-span-1'>
          {props.beschrijving}
        </div>
        <div className='row-span-1 flex flex-row items-center justify-between '>
          <div className='text-red-600 font-bold text-[10px] md:text-xs lg:text-sm'><FormatedDate dateString={props.date} /></div>
          {props.type == 'podcast' ? podcastIcon() :
          props.type == 'video' ? videoIcon() :
          props.type == 'article' ? articleIcon() : null
          }
        </div>
      </div>
    </Link>
  )
}

type Props = {
  previews: Preview[],
  dictionary: any,
  agendas: Agendas[],
}

export default function Home({previews, dictionary, agendas} : Props) {
    const colors = [
        'border-red-500',
        'border-blue-500',
        'border-green-500',
        'border-yellow-500',
        'border-purple-500',
        'border-pink-500',
        'border-indigo-500',
    ]
  const dict = dictionary.home;
  return (
    <div className=''>
      <Container className="mt-9 ">
          <div className='flex flex-col gap-2'>
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-8xl">
              {dict.header.one} 
            </h1>
            <h1 className="text-4xl font-bold tracking-tight text-zinc-600 sm:text-4xl">
              {dict.header.two}
            </h1>
          </div>
          <div className='w-full flex flex-row justify-between item-center my-5'>
            <h1 className='text-xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-xl'>{dict.subheader}</h1>
            <h1 className='text-xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-xl'></h1>
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
            {dict.quote}
          </h1>
          <h1 className='py-8 text-5xl font-bold text-center w-full'>Agenda</h1>
          <Agenda 
            noActivity={dict.agenda.noActivity}
            items={agendas.map((agenda, i: number) => ({
              type: agenda.type,
              date: agenda.datum,
              time: agenda.tijd,
              titel: agenda.titel,
              image: agenda.image,
              desc: agenda.beschrijving,
              color: colors[i % colors.length],
            }))}
          />
      </Container>
      {/* photo */}
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto lg:max-w-none">
          <div className="space-y-10">
            <div className='grid grid-cols-1 lg:grid-cols-4 gap-10'>
              <div className='lg:col-span-2 grid gap-4 grid-cols-1 md:grid-cols-2'>
                {previews?.map((preview) => (
                  <PreviewCard key={preview.id} beschrijving={preview.beschrijving} date={preview.datum} image={preview.images[0]} type={preview.type} link={preview.link} />
                ))}
              </div>
              <div className='lg:col-span-2'>
                <Resume />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export async function getServerSideProps({locale}: any) {
  const previews = await getAllPreviews();
  const agendas = await getAllAgendas();
  const dictionary = await getDictionary(locale);
  return {
    props: {
      dictionary,
      previews: previews,
      agendas: agendas,
    },
    }
  }


