/* --------------------------------------------------------------------------
   EMPRESA_APP.JS - Inicializador del Portal del Empleador (empresa.html)
   -------------------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
    const model = new UGEmpleoModel();
    const view = new EmpresaView();
    const shellView = new HeaderFooterView();
    const controller = new EmpresaController(model, view, shellView);
});
