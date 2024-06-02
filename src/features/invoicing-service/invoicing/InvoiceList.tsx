import CreateInvoiceButton from '@/components/invoicing/CreateInvoiceButton'
import { Heading } from '@/components/ui/heading'
import { ScrollArea } from '@/components/ui/scroll-area'
import { AnimatePresence, Reorder } from 'framer-motion'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const InvoiceList = () => {
  const { t } = useTranslation()
  const [invoices, setInvoices] = useState([
    { id: 1, name: 'Abacus Media GmbH' },
    { id: 2, name: 'ByteWorks Ltd.' },
    { id: 3, name: 'CleverTech Inc.' },
    { id: 4, name: 'Delta Solutions' },
    { id: 5, name: 'Eclipse Innovations' },
    { id: 6, name: 'Fusion Enterprises' },
    { id: 7, name: 'Galaxy Networks' },
    { id: 8, name: 'Horizon Systems' },
    { id: 9, name: 'Infinity Labs' },
    { id: 10, name: 'Jupiter Dynamics' },
    { id: 11, name: 'Krypton Technologies' },
    { id: 12, name: 'Lumina Group' },
    { id: 13, name: 'Matrix Ventures' },
    { id: 14, name: 'Nebula Corp.' },
    { id: 15, name: 'Orion Industries' },
    { id: 16, name: 'Pinnacle Software' },
    { id: 17, name: 'Quantum Computing' },
    { id: 18, name: 'Radiant Solutions' },
    { id: 19, name: 'Stellar IT Services' },
    { id: 20, name: 'Titan Enterprises' },
    { id: 21, name: 'Umbra Holdings' },
    { id: 22, name: 'Vertex Solutions' },
    { id: 23, name: 'Wave Technologies' },
    { id: 24, name: 'Xenon Labs' },
    { id: 25, name: 'Yield Technologies' },
    { id: 26, name: 'Zenith Innovations' },
    { id: 27, name: 'Apex Analytics' },
    { id: 28, name: 'Blaze Software' },
    { id: 29, name: 'Cipher Systems' },
    { id: 30, name: 'DynamiTech' }
  ])
  return (
    <section className='flex h-full w-full flex-col items-start justify-start gap-4'>
      <div className='flex w-full items-center justify-between'>
        <Heading>{t('invoicingPage.title', 'Invoices')}</Heading>
        <CreateInvoiceButton />
      </div>
      <ScrollArea className='flex h-full w-full flex-col items-start justify-between gap-5 rounded-lg'>
        <Reorder.Group
          axis='y'
          values={invoices}
          onReorder={setInvoices}
          className='flex w-full flex-col gap-2'
        >
          <AnimatePresence>
            {invoices.map(invoice => {
              return (
                <Reorder.Item key={invoice.id} value={invoice}>
                  <div
                    key={invoice.id}
                    className='w-full cursor-grabbing rounded-md bg-primary p-3'
                  >
                    {invoice.id}. {invoice.name}
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

export default InvoiceList
