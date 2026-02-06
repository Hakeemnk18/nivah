import { useState } from "react";
import Cropper from "react-easy-crop";

type Props = {
    file: File;
    aspect: number;
    onDone: (croppedFile: File) => void;
    onClose: () => void;
};

const ImageCropModal = ({ file, aspect, onDone, onClose }: Props) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

    const onCropComplete = (_: any, area: any) => {
        setCroppedAreaPixels(area);
    };

    const createCroppedImage = async () => {
        const image = document.createElement("img");
        image.src = URL.createObjectURL(file);
        await new Promise((res) => (image.onload = res));

        const canvas = document.createElement("canvas");
        canvas.width = croppedAreaPixels.width;
        canvas.height = croppedAreaPixels.height;

        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(
            image,
            croppedAreaPixels.x,
            croppedAreaPixels.y,
            croppedAreaPixels.width,
            croppedAreaPixels.height,
            0,
            0,
            croppedAreaPixels.width,
            croppedAreaPixels.height
        );

        canvas.toBlob((blob) => {
            if (!blob) return;
            onDone(new File([blob], file.name, { type: file.type }));
        }, file.type);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
            <div className="bg-[#1d1e33] w-full max-w-md rounded-xl p-4 text-white">
                <div className="relative h-64 bg-black rounded">
                    <Cropper
                        image={URL.createObjectURL(file)}
                        crop={crop}
                        zoom={zoom}
                        aspect={aspect}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropComplete}
                    />
                </div>

                <div className="flex justify-end gap-3 mt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-[#2c2e4a] rounded cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={createCroppedImage}
                        className="px-4 py-2 bg-blue-600 rounded cursor-pointer"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageCropModal;
