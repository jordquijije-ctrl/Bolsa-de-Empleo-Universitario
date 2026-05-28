/* --------------------------------------------------------------------------
   EMPRESACONTROLLER.JS - Controlador para el Portal del Empleador (empresa.html)
   -------------------------------------------------------------------------- */

class EmpresaController {
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

        // Guard de rol: requiere ser perfil Empresa
        if (this.model.currentUser.role !== "empresa") {
            alert("Acceso denegado: esta sección es de uso exclusivo para empresas aliadas de la UG.");
            window.location.href = "index.html";
            return;
        }

        // Renderizar cabecera y pie compartidos
        this.shellView.render(this.model.currentUser);
        this.shellView.bindLogout(() => this.logout());

        // Escuchar eventos CRUD
        this.view.bindCreateClick(() => this.openCreateModal());
        this.view.bindSubmit((formData) => this.handleSubmit(formData));
        this.view.bindConfirmDelete((jobId) => this.handleConfirmDelete(jobId));

        this.refreshEmployerDashboard();
    }

    refreshEmployerDashboard() {
        const companyName = this.model.currentUser.name;
        const myJobs = this.model.readJobs().filter(j => j.company === companyName);

        this.view.renderDashboard(
            companyName,
            myJobs,
            this.model.applications,
            (id) => this.editJob(id),
            (id) => this.confirmDeleteJob(id),
            (id) => this.viewApplicants(id)
        );
    }

    openCreateModal() {
        this.view.openCreateModal(this.model.currentUser.name);
    }

    editJob(jobId) {
        const job = this.model.readJobs().find(j => j.id === jobId);
        if (job) {
            this.view.openEditModal(job);
        }
    }

    handleSubmit(formData) {
        if (formData.editId) {
            // OPERACIÓN: UPDATE (Actualizar registro existente)
            const updated = this.model.updateJob(parseInt(formData.editId), {
                title: formData.title,
                category: formData.category,
                type: formData.type,
                experience: formData.experience,
                location: formData.location,
                salary: formData.salary,
                description: formData.desc,
                requirements: formData.reqs,
                benefits: formData.bens
            });
            if (updated) {
                this.shellView.showToast("Vacante Actualizada", `Los cambios en '${formData.title}' fueron guardados con éxito.`, "success");
            }
        } else {
            // OPERACIÓN: CREATE (Añadir nuevo registro)
            const created = this.model.createJob(
                formData.title,
                formData.category,
                formData.type,
                formData.experience,
                formData.location,
                formData.salary,
                formData.desc,
                formData.reqs,
                formData.bens
            );
            if (created) {
                this.shellView.showToast("Oferta Creada", `La vacante '${formData.title}' se encuentra activa en el buscador.`, "success");
            }
        }

        if (this.view.postJobModal) this.view.postJobModal.classList.remove("open");
        this.refreshEmployerDashboard();
    }

    confirmDeleteJob(jobId) {
        this.view.openDeleteConfirmModal(jobId);
    }

    handleConfirmDelete(jobId) {
        const job = this.model.readJobs().find(j => j.id === jobId);
        if (job) {
            // ALERTA DE CONFIRMACIÓN NATIVA (Requisito de Mensajes de confirmación/alertas)
            const confirmDelete = confirm(`¿Estás completamente seguro de que deseas eliminar la oferta laboral de la UG:\n\n"${job.title} en ${job.company}"?\n\nEsta operación removerá permanentemente la vacante.`);
            
            if (confirmDelete) {
                this.model.deleteJob(jobId);
                this.shellView.showToast("Oferta Eliminada", "La oferta laboral se ha removido de la bolsa de la UG.", "danger");
                this.view.closeDeleteConfirmModal();
                this.refreshEmployerDashboard();
            } else {
                this.view.closeDeleteConfirmModal();
            }
        }
    }

    viewApplicants(jobId) {
        const job = this.model.readJobs().find(j => j.id === jobId);
        const applicants = this.model.applications.filter(app => app.jobId === jobId);

        this.view.renderApplicantsList(job.title, applicants, (appId) => {
            this.model.updateApplicationStatus(appId, "Entrevista");
            this.shellView.showToast("Candidato Aceptado", "Se ha agendado una entrevista con el estudiante UG.", "success");
            this.view.closeJobDetails();
            this.refreshEmployerDashboard();
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
