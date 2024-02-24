import { Publicaties, getAllPublicaties } from '../../api/publicaties'
import { Lezingen, getAllLezingen } from '../../api/lezingen'
import { Container } from '../../../components/Container';
import { useState } from 'react';
import { getDictionary } from '../../api/dictionary';
import PublicatieUitgelicht from '../../../components/PublicatieUitgelicht';
import { NextSeo } from 'next-seo';
import PublicatieCard from '../../../components/PublicatieCard';

type ContentProps = {
  publicaties?: Publicaties[],
  lezingen?: Lezingen[],
  dictionary: any
}

type ContentType = 'publicaties' | 'lezingen';



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
          <h2 className='text-xl md:text-5xl text-center font-bold p-20'>{title}</h2>
          <div className='w-full flex flex-col justify-center items-center gap-8'>
            {
              publicaties?.filter(publicatie => publicatie.type === type).map((publicatie, index) => (
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
          <h2 className='text-xl md:text-5xl text-center font-bold p-20'>{title}</h2>
          <div className='w-full flex flex-col justify-center items-center gap-8'>
            {
              lezingen?.filter(lezing => lezing.type === type).map((lezing, index) => (
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
          <h1 className='text-xl md:text-4xl font-bold text-center p-10'>{dict.slug.headerpub}</h1>
          <h2 className='text-lg md:text-2xl font-bold py-5'>{dict.slug.uitgelichtpub}</h2>
          <div className='grid grid-cols-[150px_150px] md:grid-cols-[200px_200px] lg:grid-cols-1 gap-3 md:gap-20 lg:gap-3 justify-center lg:justify-start items-start transition ease-in-out'>
            {
              publicaties?.filter(publicatie => publicatie.uitgelicht === true).map((publicatie, index) => (
                <PublicatieUitgelicht key={index} buttontext={dict.buttonpub} titel={publicatie.titel} image={publicatie.image} beschrijving={publicatie.zin_besc} datum={publicatie.datum} url={publicatie.publicatie_url} />
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
              <PublicatieUitgelicht key={index} buttontext={dict.buttonlec} titel={lezing.titel} image={lezing.image} beschrijving={lezing.beschrijving} datum={lezing.datum} url={lezing.url} />
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
    <>
    <NextSeo
      title={dict.slug.title}
      description={dict.slug.description}
    />
    <div>
      <Container>
        {renderContent()}
      </Container>
    </div>
    </>
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
