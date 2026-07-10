
import axios from 'axios';

interface CloudinaryResponse {
    secure_url: string;
    public_id: string;
}

export const uploadToCloudinary = async (file: File) => {

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
        throw new Error("Cloudinary configuration is missing (VITE_CLOUDINARY_CLOUD_NAME or VITE_CLOUDINARY_UPLOAD_PRESET)");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const response = await axios.post<CloudinaryResponse>(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
    );

    return {
        url: response.data.secure_url,
        publicId: response.data.public_id,
    };
};

/**
 * Injects Cloudinary delivery transformations (auto format/quality, fill crop,
 * device-pixel-ratio scaling) into a stored Cloudinary URL so images are served
 * at the size they're actually displayed at instead of full original resolution.
 */
export const getOptimizedImageUrl = (
    url: string | undefined,
    width: number,
    height: number = width
): string => {
    if (!url) return "";
    if (!url.includes("/upload/")) return url;

    const transformations = `f_auto,q_auto,c_fill,w_${width},h_${height},dpr_auto`;
    return url.replace("/upload/", `/upload/${transformations}/`);
};
