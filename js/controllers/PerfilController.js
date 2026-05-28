/* --------------------------------------------------------------------------
   PERFILCONTROLLER.JS - Controlador para el Perfil del Estudiante (perfil.html)
   -------------------------------------------------------------------------- */

class PerfilController {
    constructor(model, view, shellView) {
        this.model = model;
        this.view = view;
        this.shellView = shellView;

        this.init();
    }

    init() {
        // Guard de seguridad: requiere inicio de sesión activa
        if (!this.model.currentUser) {
            window.location.href = "login.html";
            return;
        }

        // Guard de rol: requiere ser perfil Estudiante
        if (this.model.currentUser.role !== "estudiante") {
            alert("Acceso denegado: esta sección es para el perfil del estudiante.");
            window.location.href = "empresa.html";
            return;
        }

        // Renderizar cabecera y pie compartidos
        this.shellView.render(this.model.currentUser);
        this.shellView.bindLogout(() => this.logout());

        this.refreshProfileDashboard();
    }

    refreshProfileDashboard() {
        this.view.render(
            this.model.currentUser,
            this.model.applications,
            this.model.readJobs(),
            (appId) => this.withdrawApplication(appId)
        );
    }

    withdrawApplication(appId) {
        const app = this.model.applications.find(a => a.id === appId);
        if (!app) return;

        const job = this.model.readJobs().find(j => j.id === app.jobId);
        
        // ALERTA DE CONFIRMACIÓN NATIVA (Requisito de Mensajes de confirmación/alertas)
        const confirmWithdraw = confirm(`¿Estás seguro de que deseas retirar tu postulación para:\n\n"${job.title} en ${job.company}"?\n\nEsta acción eliminará de forma permanente tu postulación activa.`);

        if (confirmWithdraw) {
            this.model.deleteApplication(appId);
            this.shellView.showToast("Postulación Retirada", `Has cancelado tu postulación para '${job.title}' en ${job.company}.`, "danger");
            this.refreshProfileDashboard();
        }
    }

    logout() {
        this.model.logout();
        this.shellView.showToast("Sesión Cerrada", "Has salido del portal UG de forma segura.", "info");
        setTimeout(() => {
            window.location.href = "login.html";
        }, 800);
    }
}
