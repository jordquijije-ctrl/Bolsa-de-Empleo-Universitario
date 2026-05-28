/* --------------------------------------------------------------------------
   INICIOCONTROLLER.JS - Controlador para la Página de Inicio (index.html)
   -------------------------------------------------------------------------- */

class InicioController {
    constructor(model, view, shellView) {
        this.model = model;
        this.view = view;
        this.shellView = shellView;

        this.init();
    }

    init() {
        // Validación de sesión activa (Guard de Seguridad)
        if (!this.model.currentUser) {
            window.location.href = "login.html";
            return;
        }

        // Renderizar cabecera y pie de página compartidos
        this.shellView.render(this.model.currentUser);
        this.shellView.bindLogout(() => this.logout());

        this.bindEvents();
    }

    bindEvents() {
        // Redirección de búsqueda con filtros guardados en sessionStorage
        this.view.bindSearch((filters) => {
            sessionStorage.setItem("ug_pending_filter_keyword", filters.keyword);
            if (filters.location === "remoto") {
                sessionStorage.setItem("ug_pending_filter_type", "Remoto");
            } else if (filters.location) {
                sessionStorage.setItem("ug_pending_filter_keyword", `${filters.keyword} ${filters.location}`);
            }
            window.location.href = "empleos.html";
        });

        this.view.bindCategoryClick((category) => {
            sessionStorage.setItem("ug_pending_filter_category", category);
            window.location.href = "empleos.html";
        });

        this.view.bindPopularTagClick((search) => {
            sessionStorage.setItem("ug_pending_filter_keyword", search);
            window.location.href = "empleos.html";
        });
    }

    logout() {
        this.model.logout();
        this.shellView.showToast("Sesión Cerrada", "Has salido del portal UG de forma segura.", "info");
        setTimeout(() => {
            window.location.href = "login.html";
        }, 800);
    }
}
