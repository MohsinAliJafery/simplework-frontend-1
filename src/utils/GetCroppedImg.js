export const getCroppedImg = async (imageSrc, crop, zoom = 1, rotation = 0) => {
    const createImage = (url) =>
      new Promise((resolve, reject) => {
        const image = new Image();
        image.setAttribute("crossOrigin", "anonymous"); 
        image.onload = () => resolve(image);
        image.onerror = (error) => reject(error);
        image.src = url;
      });
  
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
  
    const imageWidth = image.width * zoom;
    const imageHeight = image.height * zoom;
  
    canvas.width = imageWidth;
    canvas.height = imageHeight;
  
    // Rotate and scale the image if necessary
    ctx.translate(imageWidth / 2, imageHeight / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(zoom, zoom);
    ctx.drawImage(
      image,
      -image.width / 2,
      -image.height / 2,
      image.width,
      image.height
    );
  
    // Adjust the crop area to account for zoom and rotation
    const cropX = crop.x * zoom;
    const cropY = crop.y * zoom;
  
    // Extract the area to crop from the image
    const croppedImageData = ctx.getImageData(cropX, cropY, crop.width * zoom, crop.height * zoom);
  
    // Resize the canvas to match the cropped image dimensions
    canvas.width = crop.width;
    canvas.height = crop.height;
  
    // Put the cropped image data onto the canvas
    ctx.putImageData(croppedImageData, 0, 0);
  
    // Return the cropped image as a Blob
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve({ blob, url: URL.createObjectURL(blob) });
          } else {
            reject(new Error("Failed to create Blob from the cropped image."));
          }
        },
        "image/jpeg",
        1
      );
    });
  };
  