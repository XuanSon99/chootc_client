export default (context, inject) => {
    const image = (url) => {
        return "https://api.chootc.com/storage/" + url;
    }
    inject('image', image)
}