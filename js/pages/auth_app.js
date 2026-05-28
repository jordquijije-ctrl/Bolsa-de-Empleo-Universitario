/* --------------------------------------------------------------------------
   AUTH_APP.JS - Inicializador del Portal de Autenticación (login.html)
   -------------------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
    const model = new UGEmpleoModel();
    const view = new AuthView();
    const shellView = new HeaderFooterView();
    const controller = new AuthController(model, view, shellView);
});
