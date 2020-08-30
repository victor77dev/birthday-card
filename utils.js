const app = document.querySelector('#app');
export function goTo(page) {
    const pages = document.querySelectorAll('.page');
    pages && pages.forEach((page) => page.remove());

    page.element && app.insertAdjacentHTML('afterbegin', page.element);
    page.init && page.init();
}

export function preloadImages(urls) {
    urls.forEach((url) => {
        new Image().src = url;
    });
}
