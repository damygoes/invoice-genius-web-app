// import jsPDF from "jspdf";
// import React, { useRef, useState } from "react";
// import Tesseract from "tesseract.js";
// import { Button } from "../ui/button";

// const DocumentScanner: React.FC = () => {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [capturedImage, setCapturedImage] = useState<string | null>(null);
//   const [extractedText, setExtractedText] = useState<string>("");
//   const [cameraActive, setCameraActive] = useState<boolean>(false);

//   const openCamera = async () => {
//     setCameraActive(true);
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//       }
//     } catch (err) {
//       console.error("Error accessing camera: ", err);
//     }
//   };

//   const captureImage = () => {
//     if (videoRef.current && canvasRef.current) {
//       const context = canvasRef.current.getContext("2d");
//       if (context) {
//         context.drawImage(
//           videoRef.current,
//           0,
//           0,
//           canvasRef.current.width,
//           canvasRef.current.height,
//         );
//         const imageData = canvasRef.current.toDataURL("image/png");
//         setCapturedImage(imageData);
//         processImage(imageData);
//         setCameraActive(false);
//         if (videoRef.current.srcObject) {
//           (videoRef.current.srcObject as MediaStream)
//             .getTracks()
//             .forEach((track) => track.stop());
//         }
//       }
//     }
//   };

//   const processImage = (imageData: string) => {
//     Tesseract.recognize(imageData, "eng", {
//       logger: (m) => console.log(m),
//     })
//       .then(({ data }) => {
//         console.log("data: ", data);
//       })
//       // .then(({ data: { text } }) => {
//       //   setExtractedText(text);
//       // })
//       .catch((err) => {
//         console.error("OCR Error: ", err);
//       });
//   };

//   const saveAsPDF = () => {
//     if (capturedImage) {
//       const pdf = new jsPDF();
//       pdf.addImage(capturedImage, "PNG", 10, 10, 180, 160);
//       pdf.save("document.pdf");
//     }
//   };

//   const saveAsJPEG = () => {
//     if (capturedImage) {
//       const link = document.createElement("a");
//       link.href = capturedImage;
//       link.download = "document.jpeg";
//       link.click();
//     }
//   };

//   return (
//     <div>
//       <Button onClick={openCamera}>Scan Document</Button>
//       {cameraActive && (
//         <div>
//           <video ref={videoRef} autoPlay style={{ display: "block" }} />
//           <Button onClick={captureImage}>Capture Image</Button>
//         </div>
//       )}
//       <canvas
//         ref={canvasRef}
//         style={{ display: "none" }}
//         width={640}
//         height={480}
//       />
//       {capturedImage && (
//         <div>
//           <h3>Extracted Text:</h3>
//           <p>extractedText</p>
//           {/* <p>{extractedText}</p> */}
//           <button onClick={saveAsPDF}>Save as PDF</button>
//           <button onClick={saveAsJPEG}>Save as JPEG</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DocumentScanner;
