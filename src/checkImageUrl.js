export function isValidImageUrl(url) {
    return new Promise((resolve) => {
        const img = new Image();

        img.onload = () => resolve(true); // Image loaded successfully
        img.onerror = () => resolve(false); // Error loading image

        img.src = url;
    });
}
