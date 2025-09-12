import { Button } from "@/components/ui/button"


const ImageUpload = ({ onUpload }) => {
    
const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET;
// console.log("Cloud Name:", CLOUD_NAME);
// console.log("Upload Preset:", UPLOAD_PRESET);
  const showWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloudName: CLOUD_NAME,
        uploadPreset: UPLOAD_PRESET,
        sources: ['local', 'url', 'google_drive', 'dropbox', 'camera', 'image_search', 'facebook', 'instagram'],
        multiple: false,
        cropping: false,
        defaultSource: 'local',
        styles: {
          palette: {
            window: "#FFFFFF",
            sourceBg: "#F4F4F5",
            windowBorder: "#90A0B3",
            tabIcon: "#0078FF",
            inactiveTabIcon: "#69778A",
            menuIcons: "#555A5F",
            link: "#0078FF",
            action: "#339933",
            inProgress: "#0078FF",
            complete: "#339933",
            error: "#cc0000",
            textDark: "#000000",
            textLight: "#FFFFFF"
          },
        },
      },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          console.log('Upload successful:', result.info);
          if (onUpload) onUpload(result.info.secure_url);
        } else if (error) {
          console.error('Upload Widget Error:', error);
        }
      }
    ).open();
  };

  return (
    <div>
      <Button onClick={showWidget} className="mt-2">Upload Image</Button>
    </div>
  );
};

export default ImageUpload;
