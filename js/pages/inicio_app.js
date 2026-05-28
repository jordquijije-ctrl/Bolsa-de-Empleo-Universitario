/* --------------------------------------------------------------------------
   INICIO_APP.JS - Inicializador de la Página de Inicio (index.html)
   -------------------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
    const model = new UGEmpleoModel();
    const view = new InicioView();
    const shellView = new HeaderFooterView();
    const controller = new InicioController(model, view, shellView);
});
