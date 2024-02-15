import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import { getDictionary } from '../api/dictionary'
import { Gallerijen, getAllGallerijen, getGallerij } from '../api/gallerij'
import { Container } from '@/components/Container'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
} from '@/components/SocialIcons'


const BASE_FILE_STORAGE_URL = process.env.NEXT_PUBLIC_SUPABASE_BASE_FILE_URL;

function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}: {
  className?: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        target="__blank"
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function MailIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export const metadata: Metadata = {
  title: 'About',
  description:
    'Ik ben Looi van Kessel. Assistent Professor aan de Universteit van Leiden, waar ik me inzet voor inclusiviteit en gerechtigheid',
}

type Props = {
  gallerijen: Gallerijen[],
  dictionary: any
}


export default function About({gallerijen, dictionary}: Props) {
  const dict = dictionary.over
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <div className='relative w-[400px] h-[500px]'>
              <Image
                src={BASE_FILE_STORAGE_URL + '/images/Over/Foto Looi.jpg'}
                alt=""
                // sizes="(min-width: 1024px) 32rem, 20rem"
                fill
                className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
              />
            </div>
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            Ik ben Looi van Kessel. Assistent Professor aan de Universteit van Leiden, waar ik me inzet voor inclusiviteit en gerechtigheid.
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600">
            <p>
              Ik ben Looi van Kessel, universitair docent in de literatuurwetenschappen 
              en genderstudies aan de Universiteit Leiden. Mijn onderzoeksfocus ligt 
              bij Amerikaanse en Nederlandstalige LHBTI+ literatuur van de 20e eeuw. 
              In 2019 ben ik gepromoveerd op een proefschrift over de Amerikaanse 
              schrijver James Purdy.
            </p>
            <p>
              Deze wat vergeten schrijver zocht in de jaren 1960 naar een manier om 
              over seksualiteit te schrijven zonder zich te moeten conformeren aan 
              vaststaande en onveranderlijke ideeën over seksuele identiteit. Sinds 
              het afronden van mijn proefschrift, hebben mijn onderzoeksinteresses 
              zich op drie sporen verder ontwikkeld: gender en seksualiteit in het 
              werk van Louis Couperus, literatuur van en over de aidsepidemie, 
              en inclusief onderwijs.
            </p>
            <p>
              Naast mijn werk als universitair docent, ben ik de redactievoorzitter 
              van het Tijdschrift voor Genderstudies, een wetenschappelijk multidisciplinair 
              tijdschrift dat een platform biedt aan Nederlands- en Engelstalig genderonderzoek. 
              Daarnaast ben ik ook redacteur van het tijdschrift Arabesken, dat wordt 
              uitgegeven door het Louis Couperusgenootschap. Een belangrijke drijfveer 
              voor mijn onderzoek en onderwijs, is het streven naar inclusie en gerechtigheid. 
              Mijn onderzoek en onderwijs kan ik dan ook niet los zien van mijn sociale engagement.

            </p>
            <p>
              Als voorzitter van het Leiden University LGBT+ Network zet ik me in voor de 
              gelijkwaardige behandeling van LHBTI+ medewerkers en studenten. In mijn 
              onderwijspraktijk heb ik verschillende initiatieven ondernomen om het 
              universitair onderwijs inclusiever te maken. Tenslotte spreek ik regelmatig 
              over mijn onderzoek naar LHBTI+-cultuur en inclusief onderwijs tijdens 
              publiekslezingen of andere publieke optredens.
            </p>
          </div>
        </div>
        <div className="lg:pl-20">
          <ul role="list">
            <SocialLink
              href="mailto:l.van.kessel@hum.leidenuniv.nl"
              icon={MailIcon}
              className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
            >
              l.van.kessel@hum.leidenuniv.nl
            </SocialLink>
          </ul>
        </div>
      </div>
      {/* GALLERIJ */}
      <h1 className='text-5xl text-center font-bold tracking-tight text-zinc-800 my-20'>Gallerij</h1>
      <div className='grid grid-cols-2 lg:grid-cols-3 gap-4'>
        {gallerijen?.map((gallerij, index) => (
          <div className='col-span-1 w-[200px] lg:w-[300px] h-[200px] lg:h-[300px] relative'>
            <Image
              key={index}
              src={gallerij.images[0]}
              alt=""
              fill
              className="rounded-2xl object-cover"
            />
          </div>
        ))}

      </div>
    </Container>
  )
}



export async function getServerSideProps({locale}: any) {
  const gallerijen = await getAllGallerijen();
  const dictionary = await getDictionary(locale);
  return {
    props: {
      gallerijen: gallerijen,
      dictionary,
    },
    }
  }