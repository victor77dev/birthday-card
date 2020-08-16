const app = document.querySelector('#app');
export function goTo(page) {
    const pages = document.querySelectorAll('.page');
    pages && pages.forEach((page) => page.remove());

    app.insertAdjacentHTML('afterbegin', page.element);
    page?.init();
}
