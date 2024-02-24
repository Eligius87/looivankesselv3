import Link from "next/link"

export default function BlogCard(props: { titel: string, url: string, beschrijving: string, datum: string }) {
  return (
    <Link href={props.url} className='cursor-pointer'>
      <div className='h-[200px] flex flex-col p-4 rounded-lg ring-1 ring-zinc-200 shadow-lg w-[200px] sm:w-[400px] hover:scale-[101%] transition ease-in-out'>
        <h1 className='font-semibold text-md lg:text-lg'>{props.titel}</h1>
        <p className='text-zinc-600 text-md'>{props.beschrijving}</p>
        <h2 className='text-zinc-400 text-sm pt-2'>{props.datum}</h2>
      </div>
    </Link>
  )
}