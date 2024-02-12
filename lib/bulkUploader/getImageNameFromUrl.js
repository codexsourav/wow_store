function getImageNameFromUrl(url) {
    try {
        console.log(url);
        let urlObject = new URL(url);
        let pathname = urlObject.pathname;
        let parts = pathname.split('/');
        let imageName = parts[parts.length - 1];
        if (imageName.length == 0) {
            return url;
        }
        return imageName;
    } catch (error) {
        return url;
    }
}

export default getImageNameFromUrl;