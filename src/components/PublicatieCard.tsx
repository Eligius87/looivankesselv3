import FormatedDate from "./FormatedDate"
import Link from "next/link"

function ArrowIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" {...props}>
      <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  )
}

export default function PublicatieCard(props: { titel: string, publicatie_url: string, zin_besc: string, datum: string }) {
  function Content() {
    return (
      <div className='w-full flex flex-row justify-between items-center gap-2 ring-1 ring-zinc-200 p-2 shadow-md rounded-lg '>
        <div className='flex flex-col gap-2'>
          <h1 className='text-xs md:text-xl font-semibold leading-4'>{props.titel}</h1>
          <p className='text-[10px] md:text-lg leading-4 text-zinc-600'>{props.zin_besc}</p>
          <h2 className='text-zinc-400 font-semibold text-[8px] lg:text-sm'>
            <FormatedDate dateString={props.datum} />
          </h2>
        </div>
        {Boolean(props.publicatie_url) && 
          <ArrowIcon className='w-10 h-10 min-w-[2.5rem] min-h-[2.5rem]' />
        }
      </div>
    )
  }

  return (
    props.publicatie_url !== null && props.publicatie_url !== '' ?
      <Link href={props.publicatie_url} target='__blank' passHref={true} className='cursor-pointer w-full transition ease-in-out hover:scale-[101%]'>
        <Content />
      </Link> : <Content />
  )
}