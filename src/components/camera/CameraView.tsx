import { useCamera } from '@/hooks/useCamera'
import { CameraProps, defaultErrorMessages } from '@/types/Camera'
import { TriangleAlert, X } from 'lucide-react'
import React, { useEffect, useImperativeHandle, useState } from 'react'

export const CameraView = React.forwardRef<unknown, CameraProps>(
  (
    { errorMessages = defaultErrorMessages, videoReadyCallback = () => null },
    ref
  ) => {
    const {
      playerRef,
      canvasRef,
      containerRef,
      notSupported,
      permissionDenied,
      activeDeviceId,
      initCameraStream,
      takePhoto,
      stopStream
    } = useCamera()

    useImperativeHandle(ref, () => ({
      takePhoto,
      stopCamera: stopStream
    }))

    useEffect(() => {
      async function init() {
        await initCameraStream()
      }
      init()
    }, [activeDeviceId, initCameraStream])

    return (
      <div
        ref={containerRef}
        className='min-h-[calc(100vh_-_theme(spacing.16))] bg-muted'
      >
        <div className='absolute left-0 top-0 h-svh w-full'>
          <WarningMessage
            message={errorMessages.noCameraAccessible!}
            show={notSupported}
          />
          <WarningMessage
            message={errorMessages.permissionDenied!}
            show={permissionDenied}
          />
          <video
            className={'z-0 h-svh w-full transform object-cover'}
            ref={playerRef}
            id='video'
            muted={true}
            autoPlay={true}
            playsInline={true}
            onLoadedData={videoReadyCallback}
          ></video>
          <canvas className='hidden' ref={canvasRef} />
        </div>
      </div>
    )
  }
)

CameraView.displayName = 'CameraView'

function WarningMessage({ message, show }: { message: string; show: boolean }) {
  const [toShow, setShow] = useState(show)
  return toShow ? (
    <div className='bg-yellow-50 rounded-md p-4'>
      <div className='flex'>
        <div className='flex-shrink-0'>
          <TriangleAlert
            className='text-yellow-400 h-5 w-5'
            aria-hidden='true'
          />
        </div>
        <div className='ml-3'>
          <h3 className='text-yellow-800 text-sm font-medium'>
            Attention needed
          </h3>
          <div className='text-yellow-700 mt-2 text-sm'>
            <p>{message}</p>
          </div>
        </div>
        <div className='ml-auto pl-3'>
          <div className='-mx-1.5 -my-1.5'>
            <button
              type='button'
              className='bg-yellow-50 text-yellow-500 hover:bg-yellow-100 focus:ring-yellow-600 focus:ring-offset-yellow-50 inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2'
              onClick={() => setShow(false)}
            >
              <span className='sr-only'>Dismiss</span>
              <X className='h-5 w-5' aria-hidden='true' />
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null
}
