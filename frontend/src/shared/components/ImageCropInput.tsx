import { useEffect, useRef, useState } from "react";
import ImageCropModal from "./ImageCroppedModal";
import type { ImageItem } from "../types/image.type";



type Props = {
    max: number;
    aspect: number;
    value: ImageItem[];
    onChange: (images: ImageItem[]) => void;
    error?: string;
};

const ImageCropInput = ({ max, aspect, onChange, error, value }: Props) => {
    const [images, setImages] = useState<ImageItem[]>(value);
    useEffect(() => {
        setImages(value);
    }, [value]);
    const [currentFile, setCurrentFile] = useState<File | null>(null);
    const [editIndex, setEditIndex] = useState<number | null>(null);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    /* revoke old image urls */
    useEffect(() => {
        return () => {
            images.forEach(img => {
                if (img.type === "new") {
                    URL.revokeObjectURL(img.preview);
                }
            });
        };
    }, []);

    /* ---------- after crop ---------- */
    const handleDone = (croppedFile: File) => {
        const preview = URL.createObjectURL(croppedFile);
        const newItem: ImageItem = {
            type: "new",
            file: croppedFile,
            preview,
        };
        let updated = [...images];


        if (editIndex !== null) {
            if (images[editIndex].type === "new") {
                URL.revokeObjectURL(images[editIndex].preview);
            }
            updated[editIndex] = newItem;
        } else {
            updated.push(newItem);
        }

        setImages(updated);
        onChange(updated.map(i => i));

        setCurrentFile(null);
        setEditIndex(null);
    };

    /* ---------- remove ---------- */
    const handleRemove = (index: number) => {
        if (images[index].type === "new") {
            URL.revokeObjectURL(images[index].preview);
        }
        const updated = images.filter((_, i) => i !== index);
        setImages(updated);
        onChange(updated.map(i => i));
    };

    /* ---------- add ---------- */
    const handleAddClick = () => {
        setEditIndex(null);
        fileInputRef.current?.click();
    };

    /* ---------- edit (FIXED) ---------- */
    const handleEditClick = (index: number) => {
        setEditIndex(index);
        fileInputRef.current?.click();
    };

    return (
        <div>
            <p className="mb-2">Product Images</p>

            {/* Preview Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {images.map((img, i) => (
                    <div
                        key={i}
                        className="relative rounded-lg overflow-hidden bg-[#232447]"
                    >
                        <img
                            src={img.type === "new" ? img.preview : img.url}
                            className="w-full h-32 object-cover"
                            alt={`product-${i}`}
                        />

                        <div className="absolute top-1 right-1 flex gap-1">
                            <button
                                type="button"
                                onClick={() => handleEditClick(i)}
                                className="bg-black/60 px-2 py-1 text-xs rounded"
                            >
                                Edit
                            </button>
                            <button
                                type="button"
                                onClick={() => handleRemove(i)}
                                className="bg-black/60 px-2 py-1 text-xs rounded"
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Hidden File Input (shared for add & edit) */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                    if (e.target.files?.[0]) {
                        setCurrentFile(e.target.files[0]);
                        e.target.value = "";
                    }
                }}
            />

            {/* Add Button */}
            {images.length < max && (
                <button
                    type="button"
                    onClick={handleAddClick}
                    className="mt-3 w-full text-center py-2 bg-[#2c2e4a] rounded-lg"
                >
                    Add Image
                </button>
            )}

            {error && <p className="text-red-400 text-sm mt-1">{error}</p>}

            {/* Crop Modal */}
            {currentFile && (
                <ImageCropModal
                    file={currentFile}
                    aspect={aspect}
                    onDone={handleDone}
                    onClose={() => {
                        setCurrentFile(null);
                        setEditIndex(null);
                    }}
                />
            )}
        </div>
    );
};

export default ImageCropInput;
