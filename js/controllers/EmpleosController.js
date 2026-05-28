/* --------------------------------------------------------------------------
   EMPLEOSCONTROLLER.JS - Controlador para el Buscador de Empleos (empleos.html)
   -------------------------------------------------------------------------- */

class EmpleosController {
    constructor(model, view, shellView) {
        this.model = model;
        this.view = view;
        this.shellView = shellView;

        this.currentFilters = {
            keyword: "",
            category: "",
            types: [],
            experienceLevels: []
        };
        this.currentSort = "recent";

        this.init();
    }

    init() {
        // Guard de seguridad: requiere inicio de sesión activa
        if (!this.model.currentUser) {
            window.location.href = "login.html";
            return;
        }

        // Renderizar cabecera y pie compartidos
        this.shellView.render(this.model.currentUser);
        this.shellView.bindLogout(() => this.logout());

        // Escuchar filtros y postulaciones
        this.view.bindFiltersChange((update) => this.handleFiltersUpdate(update));
        this.view.bindApplySubmit((appData) => this.handleApplySubmit(appData));

        // Cargar búsquedas pendientes originadas en index.html (Homepage)
        this.loadPendingFilters();

        this.refreshJobsBoard();
    }

    loadPendingFilters() {
        const pendingKeyword = sessionStorage.getItem("ug_pending_filter_keyword");
        const pendingCategory = sessionStorage.getItem("ug_pending_filter_category");
        const pendingType = sessionStorage.getItem("ug_pending_filter_type");

        if (pendingKeyword) {
            this.currentFilters.keyword = pendingKeyword;
            if (this.view.searchInput) this.view.searchInput.value = pendingKeyword;
            sessionStorage.removeItem("ug_pending_filter_keyword");
        }

        if (pendingCategory) {
            this.currentFilters.category = pendingCategory;
            if (this.view.categorySelect) this.view.categorySelect.value = pendingCategory;
            sessionStorage.removeItem("ug_pending_filter_category");
        }

        if (pendingType) {
            this.currentFilters.types.push(pendingType);
            const checkbox = document.querySelector(`input[name="job-type"][value="${pendingType}"]`);
            if (checkbox) checkbox.checked = true;
            sessionStorage.removeItem("ug_pending_filter_type");
        }
    }

    handleFiltersUpdate(update) {
        if (update.clear) {
            this.currentFilters = { keyword: "", category: "", types: [], experienceLevels: [] };
            this.currentSort = "recent";
        } else {
            this.currentFilters = { ...this.currentFilters, ...update };
            if (update.sort) this.currentSort = update.sort;
        }
        this.refreshJobsBoard();
    }

    refreshJobsBoard() {
        let list = this.model.readJobs();
        const filters = this.currentFilters;

        if (filters.keyword) {
            const query = filters.keyword.toLowerCase().trim();
            list = list.filter(j => 
                j.title.toLowerCase().includes(query) ||
                j.company.toLowerCase().includes(query) ||
                j.description.toLowerCase().includes(query) ||
                j.requirements.some(r => r.toLowerCase().includes(query))
            );
        }

        if (filters.category) {
            list = list.filter(j => j.category === filters.category);
        }

        if (filters.types && filters.types.length > 0) {
            list = list.filter(j => filters.types.includes(j.type));
        }

        if (filters.experienceLevels && filters.experienceLevels.length > 0) {
            list = list.filter(j => filters.experienceLevels.includes(j.experience));
        }

        // Ordenamiento
        if (this.currentSort === "recent") {
            list.sort((a, b) => b.id - a.id);
        } else if (this.currentSort === "salary-high") {
            list.sort((a, b) => b.salaryVal - a.salaryVal);
        } else if (this.currentSort === "salary-low") {
            list.sort((a, b) => a.salaryVal - b.salaryVal);
        }

        this.view.renderJobs(list, this.model.applications, (id) => this.openJobDetails(id));
    }

    openJobDetails(jobId) {
        const job = this.model.readJobs().find(j => j.id === jobId);
        if (!job) return;

        const alreadyApplied = this.model.applications.some(app => app.jobId === jobId);
        this.view.renderDrawerDetails(job, alreadyApplied, (j) => this.openApplyModal(j));
    }

    openApplyModal(job) {
        // Redirigir al inicio de sesión si por alguna razón no está autenticado
        if (this.model.currentUser.role === "empresa") {
            this.shellView.showToast("Acción Denegada", "Las empresas no pueden postularse a vacantes.", "warning");
            return;
        }
        this.view.openApplyModal(job);
    }

    handleApplySubmit(appData) {
        const result = this.model.createApplication(appData.jobId, appData.letter);

        if (result) {
            const job = this.model.readJobs().find(j => j.id === appData.jobId);
            this.shellView.showToast("¡Postulado!", `Tu carpeta académica ha sido enviada a ${job.company}.`, "success");
            this.view.closeApplyModal();
            this.view.closeJobDetails();
            this.refreshJobsBoard();
        } else {
            this.shellView.showToast("Ya postulado", "Ya cuentas con una candidatura activa en esta oferta.", "warning");
            this.view.closeApplyModal();
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
