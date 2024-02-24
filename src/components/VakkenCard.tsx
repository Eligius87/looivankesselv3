import Link from "next/link"

export default function VakkenCard(props: { link: string, titel: string, traject: string, periode: string, color: string, vaktext: string, trajecttext: string, periodetext: string }) {

    return (
        <Link href={props.link}>
            <div className={`bg-background transition ease-in-out cursor-pointer hover:scale-105 grid grid-cols-4 shadow-md p-2 rounded-lg ${props.color} border-l-2 ring-1 ring-zinc-300 `}>
                {/* Vak naam */}
                <div className="col-span-1">
                    <h1 className="font-bold text-xs md:text-md lg:text-lg">{props.vaktext}</h1>
                </div>
                <div className="col-span-3 text-xs md:text-md lg:text-lg">{props.titel}</div>
                {/* traject */}
                <div className="col-span-1">
                    <h1 className="font-bold text-xs md:text-md lg:text-lg">{props.trajecttext}</h1>
                </div>
                <div className="col-span-3 text-xs md:text-md lg:text-lg">{props.traject}</div>
                {/* jaren gegeven */}
                <div className="col-span-1">
                    <h1 className="font-bold text-xs md:text-md lg:text-lg">{props.periodetext}</h1>
                </div>
                <div className="col-span-3 text-xs md:text-md lg:text-lg">{props.periode}</div>
            </div>
        </Link>
    )
}
