import { PlusIcon } from "@heroicons/react/20/solid"
import { MinusIcon } from "@heroicons/react/20/solid"
import { Collapse } from 'react-collapse'

export default function Accordionitem({ open, toggle, title, desc }: any) {
    return (
        <div className={`shadow-md rounded-lg border-l-2 border-zinc-400 ReactCollapse--collapse ring-zinc-300`}>
            <div className="py-[25px] px-5 lg:px-[50px] flex justify-between items-center cursor-pointer" onClick={toggle}>
                <h1 className="text-[10px] sm:text-sm md:text-md lg:text-xl font-semibold">{title}</h1>
                <div className={`text-[30px] transition-transform ${open ? 'rotate-180' : ''}`}>
                    {open ? <MinusIcon className="h-4 w-4 lg:w-10 lg:h-10" /> : <PlusIcon className="w-4 h-4 lg:w-10 lg:h-10" />}
                </div>
            </div>
            <Collapse isOpened={open}>
                <div className="px-5 lg:px-[50px] pb-[20px] text-zinc-600 text-[10px] sm:text-sm md:text-md lg:text-xl">{desc}</div>
            </Collapse>
        </div>
    )
}