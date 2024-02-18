import { Publicaties, getAllPublicaties } from '../../api/publicaties'
import { Lezingen, getAllLezingen } from '../../api/lezingen'
import { Container } from '../../../components/Container';
import Link from 'next/link';
import { useState } from 'react';
import { getDictionary } from '../../api/dictionary';
import FormatedDate from '../../../components/FormatedDate';
import PublicatieUitgelicht from '../../../components/PublicatieUitgelicht';

type ContentProps = {
  publicaties?: Publicaties[],
  lezingen?: Lezingen[],
  dictionary: any
}

type ContentType = 'publicaties' | 'lezingen';


function ArrowIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" {...props}>
      <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  )
}

function PublicatieCard(props: { titel: string, publicatie_url: string, zin_besc: string, datum: string }) {
  function Content() {
    return (
      <div className='w-full flex flex-row justify-between items-center gap-2 ring-1 ring-zinc-200 p-2 shadow-md rounded-lg '>
        <div className='flex flex-col gap-2'>
          <dt className='text-base font-semibold leading-7'>{props.titel}</dt>
          <dd className='text-base leading-7 text-zinc-600'>{props.zin_besc}</dd>
          <h1 className='text-zinc-400 font-semibold text-[8px] lg:text-sm'>
            <FormatedDate dateString={props.datum} />
          </h1>
        </div>
        {props.publicatie_url !== null ? 
          <ArrowIcon className='w-10 h-10 flex justify-center items-center' />
        : ''
        }
      </div>
    )
  }

  return (
    props.publicatie_url !== null ?
      <Link href={props.publicatie_url} target='__blank' passHref={true} className='cursor-pointer w-full transition ease-in-out hover:scale-[101%]'>
        <Content />
      </Link> : <Content />
  )
}

export default function index({ publicaties, lezingen, dictionary }: ContentProps) {
  const dict = dictionary.research;

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

    function renderLezingen(type: string, title: string) {
      return (
        <>
          <h2 className='text-5xl text-center font-bold p-20'>{title}</h2>
          <div className='w-full flex flex-col justify-center items-center gap-8'>
            {
              lezingen?.filter(lezing => lezing.type === type && lezing.uitgelicht === false).map((lezing, index) => (
                <PublicatieCard key={index} titel={lezing.titel} publicatie_url={lezing.url} zin_besc={lezing.beschrijving} datum={lezing.datum} />
              ))
            }
          </div>
        </>
      )
    }


    if (publicaties) {
      return (
        <div>
          <h1 className='text-4xl font-bold text-center p-10'>{dict.slug.headerpub}</h1>
          <h2 className='text-2xl font-bold py-5'>{dict.slug.uitgelichtpub}</h2>
          <div className='grid grid-cols-[150px_150px] md:grid-cols-[200px_200px] lg:grid-cols-1 gap-3 md:gap-20 lg:gap-3 justify-center lg:justify-start items-start transition ease-in-out'>
            {
              publicaties?.filter(publicatie => publicatie.uitgelicht === true).map((publicatie, index) => (
                <PublicatieUitgelicht key={index} open={index === open} toggle={() => toggle(index)} titel={publicatie.titel} image={publicatie.image} beschrijving={publicatie.zin_besc} datum={publicatie.datum} url={publicatie.publicatie_url} />
              ))
            }
          </div>
          {renderPublicaties('artikel', `${dict.slug.articles}`)}
          {renderPublicaties('recensie', `${dict.slug.recensies}`)}
          {renderPublicaties('thema', `${dict.slug.themas}`)}
        </div>
      )
    } else if (lezingen) {
      return (
        <div>
          <h1 className='text-4xl font-bold text-center p-10'>{dict.slug.headerlec}</h1>
          <h2 className='text-2xl font-bold py-5'>{dict.slug.uitgelichtlec}</h2>
          <div className='grid grid-cols-[150px_150px] md:grid-cols-[200px_200px] lg:grid-cols-1 gap-3 md:gap-20 lg:gap-3 justify-center lg:justify-start items-start transition ease-in-out'>
            {lezingen?.filter(lezing => lezing.uitgelicht === true).map((lezing, index) => (
              <PublicatieUitgelicht key={index} open={index === open} toggle={() => toggle(index)} titel={lezing.titel} image={lezing.image} beschrijving={lezing.beschrijving} datum={lezing.datum} url={lezing.url} />
            ))}
          </div>
          {renderLezingen('lezing', `${dict.slug.lec}`)}
          {renderLezingen('conferentie', `${dict.slug.conf}`)}
          {renderLezingen('panel', `${dict.slug.panel}`)}
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


export async function getServerSideProps({ params, locale }: any) {
  const content = params?.content;
  const dictionary = await getDictionary(locale);

  if (content === 'publicaties') {
    const publicaties = await getAllPublicaties();
    return { props: { publicaties: publicaties, dictionary } };
  } else if (content === 'lezingen') {
    const lezingen = await getAllLezingen();
    return { props: { lezingen, dictionary } };
  }

  return { notFound: true };
}
