'use client'

import { Fragment, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Popover, Transition } from '@headlessui/react'
import clsx from 'clsx'
import {useRouter} from 'next/router'

import { Container } from '@/components/Container'

function CloseIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="m17.25 6.75-10.5 10.5M6.75 6.75l10.5 10.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function HomeIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}>
      <path stroke-linecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  )
}


function ChevronDownIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 8 6" aria-hidden="true" {...props}>
      <path
        d="M1.75 1.75 4 4.25l2.25-2.5"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function SunIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" {...props}>
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
  </svg>

  )
}

function ArrowDownIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" {...props}>
  <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
</svg>

  )
}

function MobileNavItem({
  href,
  children,
  hasDropdown,
}: {
  href: string
  children: React.ReactNode
  hasDropdown: boolean
}) {
  
  const [open, setOpen] = useState(false)
  
  function handleDropdown() {
    setOpen(!open)
  }
  
  function DropDownMenu() {
    return (
        <ul className='w-full flex justify-center items-center flex-col gap-2'>
          <Link href="/onderzoek/publicaties" className='hover:text-teal-500 transition ease-in-out'>Publicaties</Link>
          <Link href="/onderzoek/lezingen" className='hover:text-teal-500 transition ease-in-out'>Lezingen</Link>
        </ul>
    )
  }

  return (
    <div>
      <li className='flex flex-row justify-center items-center gap-2'>
        <Popover.Button as={Link} href={href} className="block py-2">
          {children}
        </Popover.Button>
        {hasDropdown ? <ArrowDownIcon onClick={handleDropdown} className='w-5 h-5 hover:text-teal-500 transition ease-in-out cursor-pointer stroke-2'/> : ''}
      </li>
        {open ? <DropDownMenu /> : ''}
    </div>
  )
}

function MobileNavigation(
  props: React.ComponentPropsWithoutRef<typeof Popover>,
) {
  return (
    <Popover {...props}>
      <Popover.Button className="group flex items-center rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20">
        Menu
        <ChevronDownIcon className="ml-3 h-auto w-2 stroke-zinc-500 group-hover:stroke-zinc-700 idark:group-hover:stroke-zinc-400" />
      </Popover.Button>
      <Transition.Root>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Popover.Overlay className="fixed inset-0 z-50 bg-zinc-800/40 backdrop-blur-sm dark:bg-black/80" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="fixed inset-x-4 top-8 z-50 origin-top rounded-3xl bg-white p-8 ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-zinc-800"
          >
            <div className="flex flex-row-reverse items-center justify-between">
              <Popover.Button aria-label="Close menu" className="-m-1 p-1">
                <CloseIcon className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
              </Popover.Button>
              <h2 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Navigation
              </h2>
            </div>
            <nav className="mt-6">
              <ul className="-my-2 divide-y divide-zinc-100 text-base text-zinc-800 dark:divide-zinc-100/5 dark:text-zinc-300">
                <MobileNavItem hasDropdown={false} href="/onderwijs">Onderwijs</MobileNavItem>
                <MobileNavItem hasDropdown={false} href="/contentEnMedia">Content & media</MobileNavItem>
                <MobileNavItem hasDropdown={true} href="/onderzoek">Onderzoek</MobileNavItem>
                <MobileNavItem hasDropdown={false} href="/over">Over</MobileNavItem>
              </ul>
            </nav>
          </Popover.Panel>
        </Transition.Child>
      </Transition.Root>
    </Popover>
  )
}

function NavItem({
  href,
  children,
  hasDropdown,
}: {
  href: string
  children: React.ReactNode
  hasDropdown: boolean

}) {
  let isActive = usePathname() === href
  const [open, setOpen] = useState(false)
  
  function handleDropdown() {
    setOpen(!open)
  }

  function DropDownMenu() {
    return (
        <ul className='absolute flex flex-col p-4 gap-2 bg-white/90 rounded-lg shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur'>
          <Link href="/onderzoek/publicaties" className='hover:text-teal-500 transition ease-in-out'>Publicaties</Link>
          <Link href="/onderzoek/lezingen" className='hover:text-teal-500 transition ease-in-out'>Lezingen</Link>
        </ul>
    )
  }

  return (
    <div>
      <li className='flex flex-row gap-1 justify-center items-center'>
        <Link
          href={href}
          className={clsx(
            'relative block py-2 transition',
            isActive
              ? 'text-teal-500'
              : 'hover:text-teal-500',
          )}
        >
          {children}
          {isActive && (
            <span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-teal-500/0 via-teal-500/40 to-teal-500/0" />
          )}
        </Link>
        {hasDropdown ? <ArrowDownIcon onClick={handleDropdown} className='w-5 h-5 hover:text-teal-500 transition ease-in-out cursor-pointer stroke-2'/> : ''}
      </li>
      {open ? <DropDownMenu /> : ''}
    </div>
  )
}

function DesktopNavigation(props: React.ComponentPropsWithoutRef<'nav'>) {
  return (
    <nav {...props}>
      <ul className="flex rounded-full gap-5 bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
        <NavItem hasDropdown={false} href="/onderwijs">Onderwijs</NavItem>
        <NavItem hasDropdown={false} href="/contentEnMedia">Content & media</NavItem>
        <NavItem hasDropdown={true} href="/onderzoek" >Onderzoek</NavItem>
        <NavItem hasDropdown={false} href="/over">Over</NavItem>
      </ul>
    </nav>
  )
}

function ThemeToggle() {
  let [mounted, setMounted] = useState(false)
  const router = useRouter()
  const isDutch = router.locale === 'nl'

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <button
      type="button"
      className="flex justify-center items-center group rounded-full bg-white/90 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition w-10 h-10"
      onClick={() => {
        setMounted(!mounted);
        var locale = isDutch ? 'en' : 'nl';
        router.push({
          pathname: router.pathname,
          query: router.query,
        },
        undefined, { locale: locale})
        }}>
      {mounted ? <SunIcon className="h-6 w-6 stroke-zinc-600 hover:stroke-teal-400 transition ease-in-out" /> : <h1 className='hover:text-teal-400 transition ease-in-out font-semibold text-[14px] rounded-full'>{router.locale?.toUpperCase()}</h1>}
    </button>
  )
}

function clamp(number: number, a: number, b: number) {
  let min = Math.min(a, b)
  let max = Math.max(a, b)
  return Math.min(Math.max(number, min), max)
}

function HomeButton() {
  return (
    <Link href='/'>
      <button type='button' className='cursor-pointer group rounded-full bg-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition'>
        <HomeIcon className='w-5 h-5 hover:text-teal-400 transition ease-in-out'/>
      </button>
    </Link>
  )
}

export function Header() {



  let isHomePage = usePathname() === '/'

  let headerRef = useRef<React.ElementRef<'div'>>(null)
  let avatarRef = useRef<React.ElementRef<'div'>>(null)
  let isInitial = useRef(true)

  useEffect(() => {
    let downDelay = avatarRef.current?.offsetTop ?? 0
    let upDelay = 64

    function setProperty(property: string, value: string) {
      document.documentElement.style.setProperty(property, value)
    }

    function removeProperty(property: string) {
      document.documentElement.style.removeProperty(property)
    }

    function updateHeaderStyles() {
      if (!headerRef.current) {
        return
      }

      let { top, height } = headerRef.current.getBoundingClientRect()
      let scrollY = clamp(
        window.scrollY,
        0,
        document.body.scrollHeight - window.innerHeight,
      )

      if (isInitial.current) {
        setProperty('--header-position', 'sticky')
      }

      setProperty('--content-offset', `${downDelay}px`)

      if (isInitial.current || scrollY < downDelay) {
        setProperty('--header-height', `${downDelay + height}px`)
        setProperty('--header-mb', `${-downDelay}px`)
      } else if (top + height < -upDelay) {
        let offset = Math.max(height, scrollY - upDelay)
        setProperty('--header-height', `${offset}px`)
        setProperty('--header-mb', `${height - offset}px`)
      } else if (top === 0) {
        setProperty('--header-height', `${scrollY + height}px`)
        setProperty('--header-mb', `${-scrollY}px`)
      }

      if (top === 0 && scrollY > 0 && scrollY >= downDelay) {
        setProperty('--header-inner-position', 'fixed')
        removeProperty('--header-top')
      } else {
        removeProperty('--header-inner-position')
        setProperty('--header-top', '0px')
      }
    }

    function updateStyles() {
      updateHeaderStyles()
      isInitial.current = false
    }

    updateStyles()
    window.addEventListener('scroll', updateStyles, { passive: true })
    window.addEventListener('resize', updateStyles)

    return () => {
      window.removeEventListener('scroll', updateStyles)
      window.removeEventListener('resize', updateStyles)
    }
  }, [isHomePage])


  return (
    <>
      <header
      className="pointer-events-none relative z-50 flex flex-none flex-col w-full"
        style={{
          height: 'var(--header-height)',
          marginBottom: 'var(--header-mb)',
        }}
      >
        <div
          ref={headerRef}
          className="top-0 z-10 h-16 pt-6"
          style={{
            position:
              'var(--header-position)' as React.CSSProperties['position'],
          }}
        >
          <Container
            className="top-[var(--header-top,theme(spacing.6))] w-full"
            style={{
              position:
                'var(--header-inner-position)' as React.CSSProperties['position'],
            }}
          >
            <div className="relative flex gap-4">
              <div className='flex justify-start items-center'>
                  <div className="pointer-events-auto">
                    <HomeButton />
                  </div>
              </div>
              <div className="flex flex-1 justify-end md:justify-center"> 
                <MobileNavigation className="pointer-events-auto md:hidden" />
                <DesktopNavigation className="pointer-events-auto hidden md:block" />
              </div>
              <div className="flex justify-end md:flex-1">
                <div className="pointer-events-auto">
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </Container>
        </div>
      </header>
      {isHomePage && (
        <div
          className="flex-none"
          style={{ height: 'var(--content-offset)' }}
        />
      )}
    </>
  )
}
