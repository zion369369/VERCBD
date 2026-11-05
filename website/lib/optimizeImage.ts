// Bound raster uploads before persistence so large camera originals do not
// become multi-megabyte CMS payloads. SVG and animated GIF files stay intact.
export async function optimizeImage(file: File): Promise<File> {
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) return file;
  const url = URL.createObjectURL(file);
  try {
    const image = new window.Image();
    image.src = url;
    await image.decode();
    const scale = Math.min(1, 1920 / Math.max(image.naturalWidth, image.naturalHeight));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
    const context = canvas.getContext("2d");
    if (!context) return file;
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, "image/webp", 0.86));
    if (!blob || (blob.size >= file.size && scale === 1)) return file;
    return new File([blob], file.name.replace(/\.[^.]+$/, "") + ".webp", { type: "image/webp" });
  } finally {
    URL.revokeObjectURL(url);
  }
}
