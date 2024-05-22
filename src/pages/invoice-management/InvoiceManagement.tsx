import PageLayout from '@/components/layout/page-layout/PageLayout'
import ResizeablePageLayout from '@/components/resizeable-page-layout/ResizeablePageLayout'
import InvoiceList from '@/features/invoicing-service/invoicing/InvoiceList'
import SavedClientsList from '@/features/invoicing-service/saved-clients/SavedClientsList'
import { useInvoicing } from '@/features/invoicing-service/utils/useInvoicing'
import InvoicePageDisplayManager from '../../features/invoicing-service/invoicing/InvoicePageDisplayManager'

const InvoiceManagement = () => {
  const { isClientForm, isInvoiceForm } = useInvoicing()

  const RightSectionToRender = () => {
    if (isClientForm) {
      return <SavedClientsList />
    } else if (isInvoiceForm) {
      return <InvoiceList />
    } else {
      return <InvoiceList />
    }
  }
  return (
    <PageLayout>
      <ResizeablePageLayout
        leftSection={RightSectionToRender()}
        rightSection={<InvoicePageDisplayManager />}
      />
    </PageLayout>
  )
}

export default InvoiceManagement
