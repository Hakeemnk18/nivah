export type ImageItem =
    | { type: "existing"; url: string; publicId: string }
    | { type: "new"; file: File; preview: string };