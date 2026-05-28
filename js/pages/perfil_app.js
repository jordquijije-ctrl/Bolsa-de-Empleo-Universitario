/* --------------------------------------------------------------------------
   PERFIL_APP.JS - Inicializador del Perfil y Candidaturas (perfil.html)
   -------------------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
    const model = new UGEmpleoModel();
    const view = new PerfilView();
    const shellView = new HeaderFooterView();
    const controller = new PerfilController(model, view, shellView);
});
