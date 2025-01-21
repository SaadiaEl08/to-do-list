import { Camera, CameraOff, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const CameraCapture = ({image, setImage}) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [cameraStopped, setCameraStopped] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera(); // Cleanup on component unmount
    };
  }, []);

  const startCamera = async () => {
    setImage(null);
    setError("");
    setCameraStopped(false);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        videoRef.current.classList.remove("hidden");
      }
    } catch (err) {
      setError("Unable to access the camera. Please check permissions.");
      console.error("Camera error:", err);
    }
  };

  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video) {
      const context = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL("image/png");
      setImage(imageData);
      stopCamera(); 
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop()); // Stop all tracks
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
      videoRef.current.pause();
      videoRef.current.classList.add("hidden");
    }
    setCameraStopped(true);
  };

  return (
    <div className="camera-capture flex flex-col items-center justify-center h-full">
      <div className="flex flex-col items-center justify-center">
        {image ? (
          <div className="w-full flex flex-col items-center justify-center gap-3">
            <h1>Captured Photo:</h1>
            <img
              src={image}
              alt="Captured"
              className="rounded shadow-lg"
              style={{ maxWidth: "100%" ,transform: "scaleX(-1)" }
            }
            />
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <video ref={videoRef} className="w-full rounded shadow-md"   style={{ transform: "scaleX(-1)" }}
          />
        )}
        <div className="flex justify-center gap-4 flex-wrap mt-4">
          {image || cameraStopped ? (
            <button
              onClick={startCamera}
              className="camera-button rounded-md p-3 bg-green-700 text-white flex items-center gap-2"
            >
              <RotateCcw />
              Restart Camera
            </button>
          ) : (
            <>
              <button
                onClick={capturePhoto}
                className="camera-button rounded-md p-3 bg-blue-700 text-white flex items-center gap-2"
              >
                <Camera />
                Take Photo
              </button>
              <button
                onClick={stopCamera}
                className="camera-button rounded-md p-3 bg-red-700 text-white flex items-center gap-2"
              >
                <CameraOff />
                Stop Camera
              </button>
            </>
          )}
        </div>
      </div>
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default CameraCapture;
