/* --------------------------------------------------------------------------
   EMPLEOS_APP.JS - Inicializador del Buscador de Empleos (empleos.html)
   -------------------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
    const model = new UGEmpleoModel();
    const view = new EmpleosView();
    const shellView = new HeaderFooterView();
    const controller = new EmpleosController(model, view, shellView);
});
