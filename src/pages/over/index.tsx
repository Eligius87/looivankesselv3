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

type Props = {
  gallerijen: Gallerijen[],
  dictionary: any
}


export default function About({ gallerijen, dictionary }: Props) {
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
          {dict.quote}
          </h1>
          <div className="mt-6 space-y-7 text-base text-zinc-600">
            <p>
            {dict.alinea1}
            </p>
            <p>
            {dict.alinea2}
            </p>
            <p>
            {dict.alinea3}
            </p>
            <p>
            {dict.alinea4}
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
      <h1 className='text-5xl text-center font-bold tracking-tight text-zinc-800 my-20'>{dict.gallerij}</h1>
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



export async function getServerSideProps({ locale }: any) {
  const gallerijen = await getAllGallerijen();
  const dictionary = await getDictionary(locale);
  return {
    props: {
      gallerijen: gallerijen,
      dictionary,
    },
  }
}