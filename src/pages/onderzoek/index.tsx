import { SimpleLayout } from '@/components/SimpleLayout'
import { Container } from '@/components/Container'
import Image from 'next/image'
import { getAllPublicaties, Publicaties } from '../api/publicaties'
import { useState } from 'react'
import Link from 'next/link'
import React from 'react'

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

const text = {
  titel1: 'James purdy',
  text1: `
    Ik schreef mijn proefschrift over de Amerikaanse auteur James Purdy. Deze was als schrijver actief vanaf de jaren 50 tot het begin van de 21e eeuw en werd vooral in de jaren 60 veel gelezen (en verscheen in de jaren 80 en 90 veel in Nederlandse vertaling), maar is sindsdien wat in de vergetelheid geraakt.
    Purdy’s literatuur is interessant omdat hij in de jaren 50 en 60 al expliciet over homoseksualiteit schrijft, dus terwijl de Amerikaanse homorechtenbeweging nog in haar kinderschoenen stond. Dit is extra opvallend omdat Purdy hierbij andere politieke keuzes maakt dat diezelfde homorechtenbeweging. Waar het voor activisten belangrijk was (en nog steeds is) om seksualiteit te zien als identiteit, dus als iets dat van binnenuit komt, stelt Purdy dat seksualiteit iets is dat je doet–de labels die we eraan geven komen niet van binnenuit, maar worden van buiten opgelegd.
    Deze positie maakte dat Purdy’s schrijven niet altijd even geliefd was bij homorechtenactivisten.Toch, zo beweer ik in mijn proefschrift, kunnen we nog steeds veel van zijn romans leren. In mijn proefschrift onderzoek ik hoe Purdy door middel van bepaalde narratieve ingrepen op zoek gaat naar een taal waarin seksualiteit een fenomeen is dat losstaat van het hokjesdenken dat samen gaat met het halstarrige geloof in een onveranderlijke en innerlijke identiteit. Tegenwoordig houd ik me nog steeds veel bezig met het werk van Purdy. Zo schreef ik recent een essay voor de bundel Hij/Hem: Een ABC van Regenboogboeken (zie publicaties) en fungeerde ik als adviseur bij de voorstelling Narrow Spaces van moON productions, die haar inspiratie haalde uit het werk van Purdy.
  `,
  titel2: 'Louis Couperus',
  text2: `
      Sinds 2014 ben ik redactielid van het tijdschrift Arabesken dat uitgegeven wordt door het Louis Couperusgenootschap. In deze tijd ben ik geïnteresseerd geraakt in de manier waarop Couperus in zijn literatuur reageert op de veranderende seksuele mores in Nederland en Nederlands Indië rond 1900. Er is al veel geschreven over de vooruitstrevende manier waarop hij over vrijgevochten vrouwen en homoseksualiteit schreef, maar in deze kritieken worden de verschillende literaire werelden van Couperus vaak gescheiden gehouden.
      De werken die zich in de Oudheid afspelen worden bijvoorbeeld geprezen om hun expliciete behandeling van homoseksualiteit. Andere critici schrijven over hoe juist zijn Indische romans een mooie kijk geven in de manier waarop de veranderingen in het koloniale beleid van de 19e eeuw ook hun weerslag vinden in de manier waarop seksualiteit en genderverhoudingen beleefd worden in Nederland.
      In mijn onderzoek koppel ik deze werelden aan elkaar en laat ik zien hoe ook Couperus’ romans over de antieke wereld gelezen kunnen worden als een reactie op de manier waarop door het kolonialisme de seksuele en genderverhoudingen in Nederland op scherp worden gezet.
  `,
  titel3: 'Aids en promiscuïteit',
  text3: `
      De gevolgen van de aidsepidemie van de jaren 80 zijn nog steeds te voelen in de LHBTQIA+-gemeenschap. Doordat het virus dat aids veroorzaakt zoveel slachtoffers heeft gemaakt, is voor veel personen in de queer gemeenschap moeilijker om intergenerationeel contact te maken. Ook de komst van geneesmiddelen die het syndroom behandelbaar maken en de introductie PrEP, een voorbehoedsmiddel dat de overdracht van HIV tegengaat, zorgen ervoor dat nieuwe generaties queer personen een andere verhouding krijgen met het virus, dan de generaties die direct door het virus zijn getroffen.
      Hierdoor raken het activisme en de culturele productie tijdens de aidsepidemie ook verder uit het zicht–er bestaat veel wederzijds onbegrip tussen verschillende generaties LHBTQIA+’ers. Maar juist in een tijd dat wereldwijd homo- en transfobie weer de kop op steekt, is het nuttig om te kijken naar het activisme, literatuur en kunst ten tijde van de aidsepidemie. In mijn onderzoek kijk ik dan ook naar de manier waarop literatuur over aids gelezen kan worden als een pedagogie voor toekomstige generaties: wat kunnen we vandaag de dag leren over hoe we als queer gemeenschap samen kunnen strijden tegen een maatschappelijk onrecht, zonder daarbij onze verworven vrijheden los te hoeven laten.
      Belangrijke schrijvers waar ik onderzoek naar doe zijn bijvoorbeeld Samuel Delany, Derek Jarman, en Alain Emmanuel Dreuihle. Een belangrijk thema in hun schrijven is promiscuïteit: vrije seks tussen mensen die elkaar niet kennen in bars of sauna’s. Deze vorm van seks stond onder druk tijdens de aidsepidemie. Deze auteurs laten echter zien dat promiscue seks ook een belangrijke manier was waarop queer personen coalities met elkaar konden aangaan. Vrije seks stelt hen in staat om relaties aan te gaan met mensen die ze vanwege sociale verschillen van klasse, ras, en leeftijd, anders niet tegen waren gekomen.
  `,
  titel4: 'Diversiteit en Inclusie',
  text4: `
      Rond het thema diversiteit en inclusie komen mijn onderzoeksinteresses en onderwijsvisie het beste samen. Vanuit mijn onderwijspraktijk besteed ik veel aandacht aan inclusieve onderwijsvormen en dit vertaalt zich naar onderzoeksprojecten waarbij ik deze praktijkervaring probeer te vertalen naar methodes en inzichten waar andere wetenschappers en docenten mee verder kunnen. Een van deze projecten doe ik in samenwerking met mijn collega Liesbeth Minnaard.
      In 2023 hebben we onderzoek gedaan naar de manieren waarop de opleiding Film- en Literatuurwetenschap haar curriculum inclusiever kan maken, niet alleen op het niveau van het cursusmateriaal, maar ook op het niveau van werkdruk, werkvormen en toetsvormen. Momenteel werken we aan een methode waarmee de bevindingen van ons onderzoek ook gedeeld kunnen worden met andere universitaire opleidingen.
  `,
}

function Thema(props: { titel: string, beschrijving: string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className='rounded-lg w-full shadow-lg ring-1 ring-zinc-200 p-4 flex flex-col justify-center items-start'>
      <h2 className='text-2xl font-bold tracking-tight text-zinc-800 py-1'>{props.titel}</h2>
      <div className={`text-base text-zinc-600 ${open ? '' : 'line-clamp-4'}`}>
        {props.beschrijving.map((par, i) => (
          <React.Fragment key={i}>
            <p>{par}</p>
            {i < props.beschrijving.length - 1 && <br />}
          </React.Fragment>
        ))}
      </div>
      <button className='rounded-lg py-1 px-2 ring-1 ring-zinc-200 text-sm mt-4 hover:ring-teal-400 hover:text-teal-400 transition ease-in-out' onClick={() => setOpen(!open)}>Lees {open ? 'minder' : 'verder'}</button>
    </div>
  )
}

export default function Publicatie(props: { publicaties: Publicaties[] }) {
  const publicaties = props.publicaties

  return (
    <div>
      <Container className='mt-9'>
        <div className='w-full flex justify-center items-center flex-col'>
          <h1 className='text-center text-4xl font-bold tracking-tight text-zinc-800 py-4'>Direct navigeren Lorem ipsum, dolor sit amet consectetur</h1>
          <p className='text-sm text-zinc-400 w-1/2 text-center'>
            Hieronder leg ik een aantal van mijn onderzoeks themas uit en geef ik een overzicht van mijn publicaties en lezingen. Mocht je meer willen weten over mijn onderzoek, neem dan gerust contact met me op.
          </p>
        </div>
        <div className='flex flex-row gap-6 w-full justify-center items-center p-10'>
          <Link href='onderzoek/publicaties' className='flex justify-center items-center py-2 px-4 rounded-full ring-1 ring-zinc-200 bg-black hover:text-teal-400 hover:ring-teal-400 transition ease-in-out'>
            <h1 className='text-sm text-white text-semibold'>Bekijk alle Publicaties</h1>
          </Link>
          <Link href='onderzoek/lezingen' className='flex justify-center items-center py-2 px-4 rounded-full ring-1 ring-zinc-200 shadow-xl hover:text-teal-400 hover:ring-teal-400 transition ease-in-out'>
            <h1 className='text-sm text-semibold text-zinc-600'>Bekijk alle Lezingen</h1>
          </Link>
        </div>
        {/* Onderzoek uitleg */}
        <h1 className='text-4xl font-bold tracking-tight text-zinc-800 py-4'>Onderzoeksthema's</h1>
        <div className='flex flex-col gap-5'>
          <Thema titel={text.titel1} beschrijving={text.text1.split('\n')} />
          <Thema titel={text.titel2} beschrijving={text.text2.split('\n')} />
          <Thema titel={text.titel3} beschrijving={text.text3.split('\n')} />
          <Thema titel={text.titel4} beschrijving={text.text4.split('\n')} />
        </div>
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