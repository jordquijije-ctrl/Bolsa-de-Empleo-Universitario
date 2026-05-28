/* --------------------------------------------------------------------------
   EMPLEOSVIEW.JS - Vista para el Buscador de Ofertas de Empleo (Estudiantes)
   -------------------------------------------------------------------------- */

class EmpleosView {
    constructor() {
        this.jobsListContainer = document.getElementById("jobs-list-container");
        this.jobsCount = document.getElementById("jobs-count");

        // Drawer de Detalles
        this.jobDetailDrawer = document.getElementById("job-detail-drawer");
        this.drawerOverlay = document.getElementById("drawer-overlay");
        this.closeDrawerBtn = document.getElementById("close-drawer-btn");
        this.drawerContentBody = document.getElementById("drawer-content-body");

        // Modal de Postulación
        this.applyJobModal = document.getElementById("apply-job-modal");
        this.closeApplyJobModal = document.getElementById("close-apply-job-modal");
        this.cancelApplyBtn = document.getElementById("cancel-apply-btn");
        this.applyJobForm = document.getElementById("apply-job-form");
        this.applyJobId = document.getElementById("apply-job-id");
        this.applyJobPreview = document.getElementById("apply-job-preview");
        this.cvDropZone = document.getElementById("cv-drop-zone");
        this.cvFileInput = document.getElementById("cv-file-input");
        this.applyLetter = document.getElementById("apply-letter");
        this.applyCvLabel = document.getElementById("apply-cv-label");

        // Filtros
        this.searchInput = document.getElementById("jobs-search-input");
        this.categorySelect = document.getElementById("filter-category");
        this.clearFiltersBtn = document.getElementById("clear-filters-btn");
        this.sortSelect = document.getElementById("sort-select");

        this.initDrawerClose();
        this.initCvUploadZone();
    }

    initDrawerClose() {
        if (this.closeDrawerBtn) this.closeDrawerBtn.addEventListener("click", () => this.closeJobDetails());
        if (this.drawerOverlay) this.drawerOverlay.addEventListener("click", () => this.closeJobDetails());
    }

    initCvUploadZone() {
        if (this.cvDropZone && this.cvFileInput) {
            this.cvDropZone.addEventListener("click", () => this.cvFileInput.click());
            this.cvFileInput.addEventListener("change", (e) => {
                if (e.target.files.length > 0) {
                    this.applyCvLabel.textContent = e.target.files[0].name;
                }
            });
            
            // Drag and drop mock
            this.cvDropZone.addEventListener("dragover", (e) => { e.preventDefault(); this.cvDropZone.style.borderColor = "var(--primary)"; });
            this.cvDropZone.addEventListener("dragleave", () => { this.cvDropZone.style.borderColor = "var(--border-color)"; });
            this.cvDropZone.addEventListener("drop", (e) => {
                e.preventDefault();
                this.cvDropZone.style.borderColor = "var(--border-color)";
                if (e.dataTransfer.files.length > 0) {
                    this.applyCvLabel.textContent = e.dataTransfer.files[0].name;
                    this.cvFileInput.files = e.dataTransfer.files;
                }
            });
        }
    }

    // --- RENDER GRID DE VACANTES ---
    renderJobs(jobs, applications, onCardClick) {
        if (!this.jobsListContainer) return;
        if (this.jobsCount) this.jobsCount.textContent = jobs.length;

        if (jobs.length === 0) {
            this.jobsListContainer.innerHTML = `
                <div class="empty-state">
                    <i data-lucide="search"></i>
                    <h3>Sin vacantes coincidentes</h3>
                    <p>Intenta remover los filtros aplicados para cargar todas las ofertas UG.</p>
                </div>
            `;
            lucide.createIcons();
            return;
        }

        this.jobsListContainer.innerHTML = jobs.map(job => {
            const alreadyApplied = applications.some(app => app.jobId === job.id);
            return `
                <div class="job-card" data-job-id="${job.id}">
                    <div class="job-card-header">
                        <div class="job-card-title-block">
                            <span class="company-name">${job.company}</span>
                            <h3>${job.title}</h3>
                        </div>
                        <div class="company-logo-avatar">${job.companyInitials}</div>
                    </div>
                    
                    <div class="job-card-tags">
                        <span class="job-tag tag-type"><i data-lucide="calendar"></i> ${job.type}</span>
                        <span class="job-tag"><i data-lucide="map-pin"></i> ${job.location}</span>
                        <span class="job-tag tag-salary"><i data-lucide="dollar-sign"></i> ${job.salary}</span>
                        <span class="job-tag"><i data-lucide="award"></i> ${job.experience}</span>
                    </div>
                    
                    <p class="job-card-desc">${job.description}</p>
                    
                    <div class="job-card-footer">
                        <span class="job-post-date">${job.postedDate}</span>
                        ${alreadyApplied 
                            ? `<span class="status-pill active"><i data-lucide="check"></i> Postulado</span>`
                            : `<span class="text-btn">Ver Detalles <i data-lucide="chevron-right" style="width:14px; display:inline-block;"></i></span>`
                        }
                    </div>
                </div>
            `;
        }).join("");

        document.querySelectorAll(".job-card").forEach(card => {
            card.addEventListener("click", () => {
                const id = parseInt(card.getAttribute("data-job-id"));
                onCardClick(id);
            });
        });

        lucide.createIcons();
    }

    // --- RENDER DRAWER DETALLES ---
    renderDrawerDetails(job, alreadyApplied, onApplyClick) {
        if (!this.drawerContentBody) return;
        this.drawerContentBody.innerHTML = `
            <div class="drawer-header">
                <div class="company-logo-avatar">${job.companyInitials}</div>
                <h2>${job.title}</h2>
                <span class="company-link">${job.company}</span>
                
                <div class="job-card-tags" style="margin-top: 12px;">
                    <span class="job-tag tag-type">${job.type}</span>
                    <span class="job-tag tag-salary">${job.salary}</span>
                </div>
            </div>

            <div class="drawer-quick-specs">
                <div class="spec-item">
                    <i data-lucide="map-pin"></i>
                    <span><strong>Ubicación:</strong> ${job.location}</span>
                </div>
                <div class="spec-item">
                    <i data-lucide="award"></i>
                    <span><strong>Experiencia:</strong> ${job.experience}</span>
                </div>
                <div class="spec-item">
                    <i data-lucide="briefcase"></i>
                    <span><strong>Área Académica:</strong> ${job.category}</span>
                </div>
                <div class="spec-item">
                    <i data-lucide="calendar"></i>
                    <span><strong>Publicado:</strong> ${job.postedDate}</span>
                </div>
            </div>

            <div class="drawer-actions-fixed">
                ${alreadyApplied 
                    ? `<button class="btn btn-secondary-outline" disabled style="width: 100%; cursor: not-allowed; opacity: 0.7;">
                        <i data-lucide="check-circle-2"></i> Ya te has postulado
                       </button>`
                    : `<button class="btn btn-primary" id="drawer-apply-now-btn" style="width: 100%;">
                        Postularse Ahora <i data-lucide="arrow-right"></i>
                       </button>`
                }
            </div>

            <div class="drawer-section">
                <h4>Descripción de la Vacante</h4>
                <p>${job.description}</p>
            </div>

            <div class="drawer-section">
                <h4>Requisitos Clave</h4>
                <ul class="drawer-list">
                    ${job.requirements.map(req => `<li class="drawer-list-item">${req}</li>`).join("")}
                </ul>
            </div>

            <div class="drawer-section">
                <h4>Beneficios del Cargo</h4>
                <ul class="drawer-list">
                    ${job.benefits.map(ben => `<li class="drawer-list-item">${ben}</li>`).join("")}
                </ul>
            </div>
        `;

        const applyBtn = document.getElementById("drawer-apply-now-btn");
        if (applyBtn) {
            applyBtn.addEventListener("click", () => onApplyClick(job));
        }

        if (this.jobDetailDrawer) this.jobDetailDrawer.classList.add("open");
        if (this.drawerOverlay) this.drawerOverlay.classList.add("active");
        lucide.createIcons();
    }

    openApplyModal(job) {
        if (!this.applyJobId || !this.applyJobPreview || !this.applyJobModal) return;

        this.applyJobId.value = job.id;
        this.applyJobPreview.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                <div class="company-logo-avatar">${job.companyInitials}</div>
                <div>
                    <h4 style="margin: 0; font-family: 'Outfit', sans-serif; color: var(--text-primary); font-size: 1rem;">${job.title}</h4>
                    <span style="color: var(--text-secondary); font-size: 0.85rem;">${job.company}</span>
                </div>
            </div>
            <div class="job-card-tags" style="margin-top: 4px;">
                <span class="job-tag tag-type">${job.type}</span>
                <span class="job-tag tag-salary">${job.salary}</span>
            </div>
        `;
        if (this.applyLetter) this.applyLetter.value = "";
        this.applyCvLabel.textContent = `Jordy_Camacho_CV_UG.pdf`;
        this.applyJobModal.classList.add("open");
    }

    closeApplyModal() {
        if (this.applyJobModal) this.applyJobModal.classList.remove("open");
    }

    closeJobDetails() {
        if (this.jobDetailDrawer) this.jobDetailDrawer.classList.remove("open");
        if (this.drawerOverlay) this.drawerOverlay.classList.remove("active");
    }

    bindApplySubmit(handler) {
        if (this.applyJobForm) {
            this.applyJobForm.addEventListener("submit", (e) => {
                e.preventDefault();
                const jobId = parseInt(this.applyJobId.value);
                const letter = this.applyLetter.value;
                handler({ jobId, letter });
            });
        }

        if (this.closeApplyJobModal) this.closeApplyJobModal.addEventListener("click", () => this.closeApplyModal());
        if (this.cancelApplyBtn) this.cancelApplyBtn.addEventListener("click", () => this.closeApplyModal());
    }

    bindFiltersChange(onFilterChange) {
        if (this.searchInput) {
            this.searchInput.addEventListener("input", (e) => onFilterChange({ keyword: e.target.value }));
        }

        if (this.categorySelect) {
            this.categorySelect.addEventListener("change", (e) => onFilterChange({ category: e.target.value }));
        }

        document.querySelectorAll('input[name="job-type"]').forEach(chk => {
            chk.addEventListener("change", () => {
                const types = [];
                document.querySelectorAll('input[name="job-type"]:checked').forEach(c => types.push(c.value));
                onFilterChange({ types });
            });
        });

        document.querySelectorAll('input[name="experience-level"]').forEach(chk => {
            chk.addEventListener("change", () => {
                const levels = [];
                document.querySelectorAll('input[name="experience-level"]:checked').forEach(c => levels.push(c.value));
                onFilterChange({ experienceLevels: levels });
            });
        });

        if (this.sortSelect) {
            this.sortSelect.addEventListener("change", (e) => onFilterChange({ sort: e.target.value }));
        }

        if (this.clearFiltersBtn) {
            this.clearFiltersBtn.addEventListener("click", () => {
                if (this.searchInput) this.searchInput.value = "";
                if (this.categorySelect) this.categorySelect.value = "";
                document.querySelectorAll('.checkbox-group input[type="checkbox"]').forEach(c => c.checked = false);
                if (this.sortSelect) this.sortSelect.value = "recent";
                onFilterChange({ clear: true });
            });
        }
    }
}
