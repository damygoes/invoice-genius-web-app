import PageLayout from '@/components/layout/page-layout/PageLayout'
import ResizeablePageLayout from '@/components/resizeable-page-layout/ResizeablePageLayout'

const ReceiptManagement = () => {
  return (
    <PageLayout>
      <ResizeablePageLayout
        leftSection={
          <div className='h-full w-full bg-input'>
            <p>Scanner</p>
          </div>
        }
        rightSection={<div>Receipts</div>}
      />{' '}
    </PageLayout>
  )
}

export default ReceiptManagement
