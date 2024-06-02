import ConditionalSplitLayout from '@/components/conditional-split-layout/ConditionalSplitLayout'
import PageLayout from '@/components/layout/page-layout/PageLayout'
import ClientForm from '@/components/saved-clients/ClientForm'
import InvoiceList from '@/features/invoicing-service/invoicing/InvoiceList'
import SavedClientsList from '@/features/invoicing-service/saved-clients/SavedClientsList'
import { InvoicingService } from '@/features/invoicing-service/utils/InvoicingService'
import {
  possibleInvoiceManagementServices,
  useInvoicing
} from '@/features/invoicing-service/utils/useInvoicing'
import { useState } from 'react'
import InvoiceManagementPageServiceSelector from './InvoiceManagementPageServiceSelector'

const InvoiceManagement = () => {
  const { isInvoiceForm, isClientForm } = useInvoicing()
  const [invoiceManagementService, setInvoiceManagementService] =
    useState<InvoicingService>('Invoice')

  const renderInvoicePageContent = (invoicingService: InvoicingService) => {
    switch (invoicingService) {
      case 'Invoice':
        return (
          <ConditionalSplitLayout
            mainComponentToRender={<InvoiceList />}
            splitCondition={isInvoiceForm}
            componentToRenderWhenSplit={<div> Invoice Form</div>}
          />
        )
      case 'Clients':
        return (
          <ConditionalSplitLayout
            mainComponentToRender={<SavedClientsList />}
            splitCondition={isClientForm}
            componentToRenderWhenSplit={<ClientForm />}
          />
        )

      default:
        return (
          <ConditionalSplitLayout
            mainComponentToRender={<InvoiceList />}
            splitCondition={isInvoiceForm}
            componentToRenderWhenSplit={<div> Invoice Form</div>}
          />
        )
    }
  }

  return (
    <PageLayout
      pageNavComponent={
        <InvoiceManagementPageServiceSelector
          selectedInvoiceManagementServices={possibleInvoiceManagementServices}
          selected='Invoice'
          onSelect={setInvoiceManagementService}
        />
      }
    >
      {renderInvoicePageContent(invoiceManagementService)}
    </PageLayout>
  )
}

export default InvoiceManagement
