const getTextColorForBackground = (backgroundColor) => {
    const hexToRgb = (hex) => {
        const bigint = parseInt(hex.slice(1), 16);
        return [bigint >> 16, (bigint >> 8) & 255, bigint & 255];
    };

    const rgb = backgroundColor.startsWith("#")
        ? hexToRgb(backgroundColor)
        : backgroundColor.match(/\d+/g).map(Number);

    const luminance = 0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2];
    return luminance > 128 ? 'black' : 'white';
};

export default getTextColorForBackground;