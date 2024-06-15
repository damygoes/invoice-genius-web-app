import Camera from "@/components/camera/Camera";
import { CameraProvider } from "@/components/camera/CameraProvider";
import PageLayout from "@/components/layout/page-layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CameraIcon } from "lucide-react";
import { useState } from "react";

const ReceiptManagement = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  return (
    <PageLayout>
      <CameraProvider>
        <Dialog open={showDialog} onOpenChange={(open) => setShowDialog(open)}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <CameraIcon className="w-5 h-5 mr-2" />
              Capture Photo
              <span className="sr-only">Capture</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-full p-0 h-svh w-svw">
            <Camera
              onClosed={() => {
                setShowDialog(false);
              }}
              onCapturedImages={(images) => {
                setCapturedImages(images);
                setShowDialog(false);
              }}
            />
          </DialogContent>
        </Dialog>
        <div>
          {capturedImages.map((image, index) => (
            <img key={index} src={image} alt={`Captured Image ${index}`} />
          ))}
        </div>
      </CameraProvider>
    </PageLayout>
  );
};

export default ReceiptManagement;
