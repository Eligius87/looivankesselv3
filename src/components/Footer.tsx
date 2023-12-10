import Link from 'next/link'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
} from '@/components/SocialIcons'
import { ContainerInner, ContainerOuter } from '@/components/Container'

function SocialLink({
  icon: Icon,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <Link className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </Link>
  )
}

function NavLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="transition hover:text-teal-500 dark:hover:text-teal-400"
    >
      {children}
    </Link>
  )
}

export function Footer() {
  return (
    <footer className="mt-32 flex-none">
      <ContainerOuter>
        <div className="border-t border-zinc-100 pb-16 pt-10 dark:border-zinc-700/40">
          <ContainerInner>
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                <NavLink href="/over">Over</NavLink>
                <NavLink href="/onderwijs">Onderwijs</NavLink>
                <NavLink href="/contentEnMedia">Content & Media</NavLink>
                <NavLink href="/onderzoek">Onderzoek</NavLink>
                <NavLink href="/contact">contact</NavLink>
              </div>
              <p className="text-sm text-zinc-400 dark:text-zinc-500">
                &copy; {new Date().getFullYear()} Looi van Kessel. All rights
                reserved.
              </p>
            </div>
          <div className="mt-6 flex gap-6">  
            <SocialLink
              href="https://nl.linkedin.com/in/looi-van-kessel-a4095657"
              aria-label="Follow on LinkedIn"
              icon={LinkedInIcon}
            />
          </div>
          </ContainerInner>
        </div>
      </ContainerOuter>
    </footer>
  )
}
