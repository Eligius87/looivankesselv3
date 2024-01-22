import { SimpleLayout } from '@/components/SimpleLayout'
import { Container } from '@/components/Container'
import Image from 'next/image'
import { getAllPublicaties, Publicaties } from '../api/publicaties'
import { Collapse } from 'react-collapse'
import { useState } from 'react'
import Link from 'next/link'
import { getAllPublicatiesUit, PublicatiesUit } from '../api/publicatiesuitgelicht'

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

function PlusIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" {...props}>
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
    )
}

function MinusIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" {...props}>
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15" />
        </svg>
    )
}

function ArrowIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" {...props}>
        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    )
}

function PublicatieCard({titel, publicatie_url, zin_besc, datum}: any) {
  return (
      <Link href={publicatie_url} target='__blank' passHref={true} className='cursor-pointer'>
        <div className='flex flex-row justify-between items-center gap-2 ring-1 ring-zinc-300 p-2 shadow-lg rounded-lg transition ease-in-out hover:scale-[101%]'>
          <div className='flex flex-col gap-2'>
            <h1 className='text-[10px] lg:text-md xl:text-xl font-bold'>{titel}</h1>
            <p className='text-[10px] lg:text-md xl:text-lg'>{zin_besc}</p>
            <h1 className='text-zinc-400 font-semibold text-[8px] lg:text-sm'>
              <FormatedDate dateString={datum} />
            </h1>
          </div>
            <ArrowIcon  className='w-10 h-10 flex justify-center items-center'/>
        </div>
      </Link>
  )
}

function PublicatieAccordion({open, toggle, titel, image, beschrijving, datum, url}: any) {

  return (
    <div className='rounded-md flex flex-col justify-center items-center ReactCollapse--collapse cursor-pointer'>
      {/* image titel and plus minus icon */}
      <div className='w-full flex flex-col lg:flex-row gap-2 justify-between' onClick={toggle}>
            <div className="relative aspect-square w-[150px] md:w-[200px] lg:w-[120px]">
              <Image src={image} fill alt="" className='rounded-md object-cover'/>
            </div>
            <div className='flex flex-col gap-2 items-between justify-start w-[150px] md:w-[200px] lg:w-full'>
              <Link className="" href={url} passHref={true} target='__blank'>
                <h1 className='font-bold text-[10px] md:text-xs lg:text-xl text-zinc-900 hover:text-zinc-600 transition ease-in-out'>{titel}</h1>
              </Link>
            </div>
          <div className={`flex justify-center items-center transition-transform ${open ? 'rotate-180' : ''}`}>
              {open ? <MinusIcon className="w-4 h-4 lg:w-8 lg:h-8"/> : <PlusIcon className="w-4 h-4 lg:w-8 lg:h-8"/> }
          </div>
      </div>
      {/* beschrijving */}
      <Collapse isOpened={open}>
        <div className='flex flex-col py-2 text-xs lg:text-lg w-[150px] md:w-[200px] lg:w-[800px]'>
          <p>{beschrijving}</p>
          <h2 className='text-zinc-400 font-semibold'>
            <FormatedDate dateString={datum} />
          </h2>
        </div>
      </Collapse>
    </div>
  )
}

export default function Publicatie(props: {publicaties: Publicaties[], publicatiesuit: PublicatiesUit[]}) {
  const publicaties = props.publicaties
  const publicatiesuit = props.publicatiesuit
  const [open, setOpen] = useState<number | null>(null);
  
  const toggle = (index: number) => {
    if (open === index) {
      setOpen(null);
    } else {
      setOpen(index);
    }
  };

  return (
    <div>
      <SimpleLayout 
        title="I’ve spoken at events all around the world and been interviewed for many podcasts."
        intro=""
      >
      </SimpleLayout>
      <Container className='mt-9'>
        <div className="border-b-2 border-zinc-500"></div>
        <h1 className='text-center text-4xl font-bold tracking-tight text-zinc-800 py-4'>Direct navigeren</h1>
        <div className='flex flex-row gap-10 w-full justify-center items-center p-10'>
            <Link href='onderzoek/publicaties' className='flex justify-center items-center p-8 rounded-xl ring-1 ring-zinc-400 shadow-xl hover:text-teal-400 hover:ring-teal-400 transition ease-in-out'>
                  <h1 className='text-xl'>Bekijk alle Publicaties</h1>
            </Link>
            <Link href='onderzoek/lezingen' className='flex justify-center items-center p-8 rounded-xl ring-1 ring-zinc-400 shadow-xl hover:text-teal-400 hover:ring-teal-400 transition ease-in-out'>
                  <h1 className='text-xl'>Bekijk alle Lezingen</h1>
            </Link>
        </div>
        {/* Onderzoek uitleg */}
        <h1 className='text-4xl font-bold tracking-tight text-zinc-800 py-4'>Onderzoeksthema's</h1>
        <h2 className='text-2xl font-bold tracking-tight text-zinc-800 py-1'>James purdy</h2>
        <p className='space-y-7 text-base text-zinc-600'>Ik schreef mijn proefschrift over de Amerikaanse auteur James Purdy. Deze was als schrijver actief vanaf de jaren 50 tot het begin van de 21e eeuw en werd vooral in de jaren 60 veel gelezen (en verscheen in de jaren 80 en 90 veel in Nederlandse vertaling), maar is sindsdien wat in de vergetelheid geraakt. 
          <br></br><br></br>Purdy’s literatuur is interessant omdat hij in de jaren 50 en 60 al expliciet over homoseksualiteit schrijft, dus terwijl de Amerikaanse homorechtenbeweging nog in haar kinderschoenen stond. Dit is extra opvallend omdat Purdy hierbij andere politieke keuzes maakt dat diezelfde homorechtenbeweging. Waar het voor activisten belangrijk was (en nog steeds is) om seksualiteit te zien als identiteit, dus als iets dat van binnenuit komt, stelt Purdy dat seksualiteit iets is dat je doet–de labels die we eraan geven komen niet van binnenuit, maar worden van buiten opgelegd. 
          <br></br><br></br>Deze positie maakte dat Purdy’s schrijven niet altijd even geliefd was bij homorechtenactivisten.Toch, zo beweer ik in mijn proefschrift, kunnen we nog steeds veel van zijn romans leren. In mijn proefschrift onderzoek ik hoe Purdy door middel van bepaalde narratieve ingrepen op zoek gaat naar een taal waarin seksualiteit een fenomeen is dat losstaat van het hokjesdenken dat samen gaat met het halstarrige geloof in een onveranderlijke en innerlijke identiteit. 
          <br></br><br></br>Tegenwoordig houd ik me nog steeds veel bezig met het werk van Purdy. Zo schreef ik recent een essay voor de bundel Hij/Hem: Een ABC van Regenboogboeken (zie publicaties) en fungeerde ik als adviseur bij de voorstelling Narrow Spaces van moON productions, die haar inspiratie haalde uit het werk van Purdy.</p>

        <h2 className='text-2xl font-bold tracking-tight text-zinc-800 py-4'>Louis Couperus</h2>
        <p className='space-y-7 text-base text-zinc-600'>
          Sinds 2014 ben ik redactielid van het tijdschrift Arabesken dat uitgegeven wordt door het Louis Couperusgenootschap. In deze tijd ben ik geïnteresseerd geraakt in de manier waarop Couperus in zijn literatuur reageert op de veranderende seksuele mores in Nederland en Nederlands Indië rond 1900. Er is al veel geschreven over de vooruitstrevende manier waarop hij over vrijgevochten vrouwen en homoseksualiteit schreef, maar in deze kritieken worden de verschillende literaire werelden van Couperus vaak gescheiden gehouden.
          <br></br><br></br>
          De werken die zich in de Oudheid afspelen worden bijvoorbeeld geprezen om hun expliciete behandeling van homoseksualiteit. Andere critici schrijven over hoe juist zijn Indische romans een mooie kijk geven in de manier waarop de veranderingen in het koloniale beleid van de 19e eeuw ook hun weerslag vinden in de manier waarop seksualiteit en genderverhoudingen beleefd worden in Nederland.
          <br></br><br></br>
          In mijn onderzoek koppel ik deze werelden aan elkaar en laat ik zien hoe ook Couperus’ romans over de antieke wereld gelezen kunnen worden als een reactie op de manier waarop door het kolonialisme de seksuele en genderverhoudingen in Nederland op scherp worden gezet.
        </p>

        <h2 className='text-2xl font-bold tracking-tight text-zinc-800 py-4'>Aids en promiscuïteit</h2>
        <p className='space-y-7 text-base text-zinc-600'>
        De gevolgen van de aidsepidemie van de jaren 80 zijn nog steeds te voelen in de LHBTQIA+-gemeenschap. Doordat het virus dat aids veroorzaakt zoveel slachtoffers heeft gemaakt, is voor veel personen in de queer gemeenschap moeilijker om intergenerationeel contact te maken. Ook de komst van geneesmiddelen die het syndroom behandelbaar maken en de introductie PrEP, een voorbehoedsmiddel dat de overdracht van HIV tegengaat, zorgen ervoor dat nieuwe generaties queer personen een andere verhouding krijgen met het virus, dan de generaties die direct door het virus zijn getroffen.
          <br></br><br></br>
          Hierdoor raken het activisme en de culturele productie tijdens de aidsepidemie ook verder uit het zicht–er bestaat veel wederzijds onbegrip tussen verschillende generaties LHBTQIA+’ers. Maar juist in een tijd dat wereldwijd homo- en transfobie weer de kop op steekt, is het nuttig om te kijken naar het activisme, literatuur en kunst ten tijde van de aidsepidemie. In mijn onderzoek kijk ik dan ook naar de manier waarop literatuur over aids gelezen kan worden als een pedagogie voor toekomstige generaties: wat kunnen we vandaag de dag leren over hoe we als queer gemeenschap samen kunnen strijden tegen een maatschappelijk onrecht, zonder daarbij onze verworven vrijheden los te hoeven laten.
          <br></br><br></br>
          Belangrijke schrijvers waar ik onderzoek naar doe zijn bijvoorbeeld Samuel Delany, Derek Jarman, en Alain Emmanuel Dreuihle. Een belangrijk thema in hun schrijven is promiscuïteit: vrije seks tussen mensen die elkaar niet kennen in bars of sauna’s. Deze vorm van seks stond onder druk tijdens de aidsepidemie. Deze auteurs laten echter zien dat promiscue seks ook een belangrijke manier was waarop queer personen coalities met elkaar konden aangaan. Vrije seks stelt hen in staat om relaties aan te gaan met mensen die ze vanwege sociale verschillen van klasse, ras, en leeftijd, anders niet tegen waren gekomen.
        </p>

        <h2 className='text-2xl font-bold tracking-tight text-zinc-800 py-4'>Aids en promiscuïteit</h2>
        <p className='space-y-7 text-base text-zinc-600'>
          Rond het thema diversiteit en inclusie komen mijn onderzoeksinteresses en onderwijsvisie het beste samen. Vanuit mijn onderwijspraktijk besteed ik veel aandacht aan inclusieve onderwijsvormen en dit vertaalt zich naar onderzoeksprojecten waarbij ik deze praktijkervaring probeer te vertalen naar methodes en inzichten waar andere wetenschappers en docenten mee verder kunnen. Een van deze projecten doe ik in samenwerking met mijn collega Liesbeth Minnaard.
          <br></br><br></br>
          In 2023 hebben we onderzoek gedaan naar de manieren waarop de opleiding Film- en Literatuurwetenschap haar curriculum inclusiever kan maken, niet alleen op het niveau van het cursusmateriaal, maar ook op het niveau van werkdruk, werkvormen en toetsvormen. Momenteel werken we aan een methode waarmee de bevindingen van ons onderzoek ook gedeeld kunnen worden met andere universitaire opleidingen.
        </p>
        {/* PUBLICATIES UITGELICHT */}  
        <h1 className="text-xl md:text-4xl font-bold tracking-tight text-zinc-800 py-4">Publicaties Uitgelicht</h1>
        <div className='grid grid-cols-[150px_150px] md:grid-cols-[200px_200px] lg:grid-cols-1 gap-3 md:gap-20 lg:gap-3 justify-center lg:justify-start items-start'>
          {publicatiesuit?.map((publicatieuit, index) => (
            <PublicatieAccordion key={index} open={index === open} toggle={() => toggle(index)} titel={publicatieuit.titel} image={publicatieuit.image} beschrijving={publicatieuit.beschrijving} datum={publicatieuit.datum} url={publicatieuit.pubuit_url}/>
          ))}
        </div>
      </Container> 
    </div>

  )
}


export async function getServerSideProps() {
  const publicaties = await getAllPublicaties();
  const publicatiesuit = await getAllPublicatiesUit();
  return {
    props: {
      publicaties: publicaties,
      publicatiesuit: publicatiesuit,
    },
    }
  }