import { type Metadata } from 'next'
import { SimpleLayout } from '@/components/SimpleLayout'
import { Container } from '@/components/Container'

export default function Speaking() {
  return (
    <div>
      <SimpleLayout
        title="I’ve spoken at events all around the world and been interviewed for many podcasts."
        intro=""
      >
      </SimpleLayout>
      <Container className=''>
        <div className='border-t-2 border-zinc-400'></div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">Publicaties</h1>
      </Container> 
    </div>

  )
}
