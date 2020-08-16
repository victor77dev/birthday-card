const app = document.querySelector('#app');
export function goTo(page) {
    app.insertAdjacentHTML('afterbegin', page.element);
    page?.init();
}
