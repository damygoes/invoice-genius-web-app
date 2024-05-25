import { Heading } from '@/components/ui/heading'
import { ScrollArea } from '@/components/ui/scroll-area'
import { AnimatePresence, Reorder } from 'framer-motion'
import { useState } from 'react'

const SavedClientsList = () => {
  const [savedClients, setSavedClients] = useState([
    { id: 1, name: 'Sarah Williams' },
    { id: 2, name: 'Chris Davis' },
    { id: 3, name: 'Daniel Johnson' },
    { id: 4, name: 'Michael Brown' },
    { id: 5, name: 'Michael Hernandez' },
    { id: 6, name: 'Emily Martinez' },
    { id: 7, name: 'Jessica Davis' },
    { id: 8, name: 'Emily Hernandez' },
    { id: 9, name: 'Jessica Johnson' },
    { id: 10, name: 'Michelle Williams' },
    { id: 11, name: 'Jessica Miller' },
    { id: 12, name: 'Emily Miller' },
    { id: 13, name: 'Michelle Martinez' },
    { id: 14, name: 'Daniel Miller' },
    { id: 15, name: 'Chris Johnson' },
    { id: 16, name: 'Jane Williams' },
    { id: 17, name: 'Jessica Martinez' },
    { id: 18, name: 'Michelle Hernandez' },
    { id: 19, name: 'Michael Brown' },
    { id: 20, name: 'Emily Martinez' },
    { id: 21, name: 'Emily Jones' },
    { id: 22, name: 'Michael Brown' },
    { id: 23, name: 'Daniel Miller' },
    { id: 24, name: 'Michelle Garcia' },
    { id: 25, name: 'John Brown' },
    { id: 26, name: 'Emily Garcia' },
    { id: 27, name: 'Jessica Davis' },
    { id: 28, name: 'David Smith' },
    { id: 29, name: 'Daniel Martinez' },
    { id: 30, name: 'Sarah Smith' }
  ])
  return (
    <section className='flex h-full w-full flex-col items-start justify-start gap-4'>
      <Heading>Clients</Heading>
      <ScrollArea className='flex h-full w-full flex-col items-start justify-between gap-5 rounded-lg'>
        <Reorder.Group
          axis='y'
          values={savedClients}
          onReorder={setSavedClients}
          className='flex w-full flex-col gap-2'
        >
          <AnimatePresence>
            {savedClients.map(savedClient => {
              return (
                <Reorder.Item key={savedClient.id} value={savedClient}>
                  <div
                    key={savedClient.id}
                    className='w-full cursor-grab rounded-md bg-input p-3'
                  >
                    {savedClient.id}. {savedClient.name}
                  </div>
                </Reorder.Item>
              )
            })}
          </AnimatePresence>
        </Reorder.Group>
      </ScrollArea>
    </section>
  )
}

export default SavedClientsList
