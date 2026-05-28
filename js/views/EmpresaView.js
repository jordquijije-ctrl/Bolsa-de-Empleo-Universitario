/* --------------------------------------------------------------------------
   EMPRESAVIEW.JS - Vista para el Portal del Empleador (CRUD de Vacantes)
   -------------------------------------------------------------------------- */

class EmpresaView {
    constructor() {
        this.employerJobsTbody = document.getElementById("employer-jobs-tbody");
        this.employerCompanyBadge = document.getElementById("employer-company-badge");
        this.openPostJobBtn = document.getElementById("open-post-job-btn");

        // Modales
        this.postJobModal = document.getElementById("post-job-modal");
        this.closePostJobModal = document.getElementById("close-post-job-modal");
        this.cancelPostBtn = document.getElementById("cancel-post-btn");
        this.postJobForm = document.getElementById("post-job-form");
        this.submitPostBtn = document.getElementById("submit-post-btn");
        this.modalJobTitleAction = document.getElementById("modal-job-title-action");
        this.jobEditId = document.getElementById("job-edit-id");

        // Modal Eliminación
        this.deleteConfirmModal = document.getElementById("delete-confirm-modal");
        this.closeDeleteModal = document.getElementById("close-delete-modal");
        this.cancelDeleteBtn = document.getElementById("cancel-delete-btn");
        this.confirmDeleteBtn = document.getElementById("confirm-delete-btn");
        this.deleteJobId = document.getElementById("delete-job-id");

        // Drawer candidatos (reutiliza drawer en index/jobs pero en empresa.html)
        this.jobDetailDrawer = document.getElementById("job-detail-drawer");
        this.drawerOverlay = document.getElementById("drawer-overlay");
        this.closeDrawerBtn = document.getElementById("close-drawer-btn");
        this.drawerContentBody = document.getElementById("drawer-content-body");

        this.initModalCloses();
    }

    initModalCloses() {
        if (this.closePostJobModal) this.closePostJobModal.addEventListener("click", () => this.postJobModal.classList.remove("open"));
        if (this.cancelPostBtn) this.cancelPostBtn.addEventListener("click", () => this.postJobModal.classList.remove("open"));

        if (this.closeDeleteModal) this.closeDeleteModal.addEventListener("click", () => this.closeDeleteConfirmModal());
        if (this.cancelDeleteBtn) this.cancelDeleteBtn.addEventListener("click", () => this.closeDeleteConfirmModal());

        if (this.closeDrawerBtn) this.closeDrawerBtn.addEventListener("click", () => this.closeJobDetails());
        if (this.drawerOverlay) this.drawerOverlay.addEventListener("click", () => this.closeJobDetails());
    }

    renderDashboard(companyName, myJobs, allApplications, onEdit, onDelete, onViewApplicants) {
        if (this.employerCompanyBadge) this.employerCompanyBadge.textContent = companyName;

        // Metricas
        const numPosted = myJobs.length;
        const myJobIds = myJobs.map(j => j.id);
        const candidatesCount = allApplications.filter(app => myJobIds.includes(app.jobId)).length;

        const metricCards = document.querySelectorAll(".employer-metrics-row .metric-card");
        if (metricCards.length >= 2) {
            metricCards[0].querySelector("h3").textContent = numPosted;
            metricCards[1].querySelector("h3").textContent = candidatesCount;
        }

        if (!this.employerJobsTbody) return;

        if (myJobs.length === 0) {
            this.employerJobsTbody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align: center; padding: 40px; color: var(--text-secondary);">
                        <i data-lucide="briefcase" style="width: 32px; height: 32px; display:block; margin:0 auto 10px; color:var(--text-tertiary);"></i>
                        No has creado ninguna oferta laboral en tu cuenta todavía.
                    </td>
                </tr>
            `;
            lucide.createIcons();
            return;
        }

        this.employerJobsTbody.innerHTML = myJobs.map(job => {
            const applicants = allApplications.filter(app => app.jobId === job.id).length;
            return `
                <tr>
                    <td><strong>${job.title}</strong></td>
                    <td><span class="job-tag tag-type">${job.type}</span></td>
                    <td>${job.location}</td>
                    <td>
                        <button class="text-btn view-applicants-trigger" data-job-id="${job.id}">
                            <i data-lucide="users" style="width:14px; display:inline-block; vertical-align:middle;"></i> Ver Candidatos (${applicants})
                        </button>
                    </td>
                    <td><strong>${job.salary}</strong></td>
                    <td>
                        <div class="crud-actions-wrapper">
                            <button class="crud-btn edit-btn edit-job-trigger" data-job-id="${job.id}" title="Editar Oferta (Update)">
                                <i data-lucide="pencil" style="width:14px;"></i>
                            </button>
                            <button class="crud-btn delete-btn delete-job-trigger" data-job-id="${job.id}" title="Eliminar Oferta (Delete)">
                                <i data-lucide="trash-2" style="width:14px;"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        }).join("");

        // Eventos CRUD en tabla
        document.querySelectorAll(".edit-job-trigger").forEach(btn => {
            btn.addEventListener("click", () => onEdit(parseInt(btn.getAttribute("data-job-id"))));
        });

        document.querySelectorAll(".delete-job-trigger").forEach(btn => {
            btn.addEventListener("click", () => onDelete(parseInt(btn.getAttribute("data-job-id"))));
        });

        document.querySelectorAll(".view-applicants-trigger").forEach(btn => {
            btn.addEventListener("click", () => onViewApplicants(parseInt(btn.getAttribute("data-job-id"))));
        });

        lucide.createIcons();
    }

    openCreateModal(companyName) {
        if (!this.postJobForm || !this.postJobModal) return;
        this.jobEditId.value = "";
        this.postJobForm.reset();
        
        const companyInput = document.getElementById("job-company");
        if (companyInput) companyInput.value = companyName;

        this.modalJobTitleAction.innerHTML = `<i data-lucide="plus-circle"></i> Crear Oferta Académica`;
        this.submitPostBtn.textContent = "Publicar Oferta";
        this.postJobModal.classList.add("open");
        lucide.createIcons();
    }

    openEditModal(job) {
        if (!this.postJobModal || !this.jobEditId) return;

        this.jobEditId.value = job.id;
        this.modalJobTitleAction.innerHTML = `<i data-lucide="edit-3"></i> Editar Vacante Académica (Update)`;
        this.submitPostBtn.textContent = "Guardar Cambios";

        document.getElementById("job-title").value = job.title;
        document.getElementById("job-company").value = job.company;
        document.getElementById("job-category").value = job.category;
        document.getElementById("job-type-post").value = job.type;
        document.getElementById("job-experience-post").value = job.experience;
        document.getElementById("job-location").value = job.location;
        document.getElementById("job-salary").value = job.salary;
        document.getElementById("job-desc").value = job.description;
        
        document.getElementById("job-req").value = job.requirements.join(", ");
        document.getElementById("job-benefits").value = job.benefits.join(", ");

        this.postJobModal.classList.add("open");
        lucide.createIcons();
    }

    openDeleteConfirmModal(jobId) {
        if (this.deleteJobId && this.deleteConfirmModal) {
            this.deleteJobId.value = jobId;
            this.deleteConfirmModal.classList.add("open");
            lucide.createIcons();
        }
    }

    closeDeleteConfirmModal() {
        if (this.deleteConfirmModal) this.deleteConfirmModal.classList.remove("open");
        if (this.deleteJobId) this.deleteJobId.value = "";
    }

    closeJobDetails() {
        if (this.jobDetailDrawer) this.jobDetailDrawer.classList.remove("open");
        if (this.drawerOverlay) this.drawerOverlay.classList.remove("active");
    }

    renderApplicantsList(jobTitle, applicants, onMoveToInterview) {
        if (!this.drawerContentBody) return;

        let html = `<p style='margin-bottom:16px;'>Candidatos de la Universidad de Guayaquil postulados:</p>`;

        if (applicants.length === 0) {
            html += `
                <div class="empty-state" style="padding: 30px 0;">
                    <i data-lucide="users" style="width:36px; height:36px; color:var(--text-tertiary); margin-bottom:8px;"></i>
                    <p>Aún no hay candidatos postulados a esta vacante.</p>
                </div>
            `;
        } else {
            html += applicants.map(app => {
                return `
                    <div style="background:var(--bg-primary); border:1px solid var(--border-color); border-radius:var(--radius-sm); padding:16px; margin-bottom:12px;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                            <strong>Jordy Camacho</strong>
                            <span class="status-pill review">${app.status}</span>
                        </div>
                        <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:6px;"><strong>Fecha:</strong> ${app.appliedDate}</p>
                        <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:8px;"><strong>Mensaje:</strong> "${app.coverLetter}"</p>
                        <div style="display:flex; gap:8px;">
                            <a href="#" class="btn btn-secondary-outline" style="padding:6px 12px; font-size:0.8rem; height:auto; gap:4px;" onclick="event.preventDefault(); alert('Visualizando CV oficial del estudiante UG');">
                                <i data-lucide="file-text" style="width:14px;"></i> Jordy_Camacho_CV_UG.pdf
                            </a>
                            ${app.status !== 'Entrevista' 
                                ? `<button class="btn btn-primary approve-candidate-btn" data-app-id="${app.id}" style="padding:6px 12px; font-size:0.8rem; height:auto;">Mover a Entrevista</button>`
                                : `<span style="font-size:0.8rem; color:var(--success); display:inline-flex; align-items:center; gap:4px; font-weight:600;"><i data-lucide="check"></i> En Entrevista</span>`
                            }
                        </div>
                    </div>
                `;
            }).join("");
        }

        this.drawerContentBody.innerHTML = `
            <div class="drawer-header">
                <h2>Candidatos Registrados</h2>
                <span class="company-link">${jobTitle}</span>
            </div>
            ${html}
        `;

        document.querySelectorAll(".approve-candidate-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                onMoveToInterview(parseInt(btn.getAttribute("data-app-id")));
            });
        });

        if (this.jobDetailDrawer) this.jobDetailDrawer.classList.add("open");
        if (this.drawerOverlay) this.drawerOverlay.classList.add("active");
        lucide.createIcons();
    }

    bindCreateClick(handler) {
        if (this.openPostJobBtn) {
            this.openPostJobBtn.addEventListener("click", () => handler());
        }
    }

    bindSubmit(handler) {
        if (this.postJobForm) {
            this.postJobForm.addEventListener("submit", (e) => {
                e.preventDefault();
                const editId = this.jobEditId.value;

                const title = document.getElementById("job-title").value;
                const category = document.getElementById("job-category").value;
                const type = document.getElementById("job-type-post").value;
                const experience = document.getElementById("job-experience-post").value;
                const location = document.getElementById("job-location").value;
                const salary = document.getElementById("job-salary").value || "A convenir";
                const desc = document.getElementById("job-desc").value;
                
                const reqs = document.getElementById("job-req").value.split(",").map(r => r.trim()).filter(r => r.length > 0);
                const bens = document.getElementById("job-benefits").value.split(",").map(b => b.trim()).filter(b => b.length > 0);

                handler({ editId, title, category, type, experience, location, salary, desc, reqs, bens });
            });
        }
    }

    bindConfirmDelete(handler) {
        if (this.confirmDeleteBtn) {
            this.confirmDeleteBtn.addEventListener("click", () => {
                const jobId = parseInt(this.deleteJobId.value);
                handler(jobId);
            });
        }
    }
}
