/* --------------------------------------------------------------------------
   PERFILVIEW.JS - Vista para el Perfil del Estudiante y Candidaturas Activas
   -------------------------------------------------------------------------- */

class PerfilView {
    constructor() {
        this.profileAvatarImg = document.getElementById("profile-avatar-img");
        this.profileCardName = document.getElementById("profile-card-name");
        this.profileCardRole = document.getElementById("profile-card-role");
        this.profileCardSub = document.getElementById("profile-card-sub");
        this.profileCardBio = document.getElementById("profile-card-bio");
        this.profileCardEmail = document.getElementById("profile-card-email");
        this.profileCvRow = document.getElementById("profile-cv-row");
        this.profileSkillsBlock = document.getElementById("profile-skills-block");

        this.studentApplicationsList = document.getElementById("student-applications-list");
        this.profileApplicationsCount = document.getElementById("profile-applications-count");
    }

    render(user, applications, allJobs, onWithdraw) {
        if (!user) return;

        // Render card fields
        if (this.profileAvatarImg) this.profileAvatarImg.src = user.avatar;
        if (this.profileCardName) this.profileCardName.textContent = user.name;
        if (this.profileCardRole) this.profileCardRole.textContent = user.degreeOrCompany;
        if (this.profileCardSub) this.profileCardSub.textContent = user.facultyOrBrand;
        if (this.profileCardBio) this.profileCardBio.innerHTML = `<p>${user.bio}</p>`;
        if (this.profileCardEmail) this.profileCardEmail.textContent = user.email;

        // Hide CV/Skills if user is an employer (safety fallback)
        if (user.role === "empresa") {
            if (this.profileCvRow) this.profileCvRow.style.display = "none";
            if (this.profileSkillsBlock) this.profileSkillsBlock.style.display = "none";
        } else {
            if (this.profileCvRow) this.profileCvRow.style.display = "flex";
            if (this.profileSkillsBlock) this.profileSkillsBlock.style.display = "block";
        }

        // Render applications count
        if (this.profileApplicationsCount) this.profileApplicationsCount.textContent = applications.length;

        // Render applications list
        if (!this.studentApplicationsList) return;

        if (applications.length === 0) {
            this.studentApplicationsList.innerHTML = `
                <div class="empty-applications">
                    <i data-lucide="inbox"></i>
                    <p>Aún no te has postulado a ninguna vacante académica de la UG.</p>
                </div>
            `;
            lucide.createIcons();
            return;
        }

        this.studentApplicationsList.innerHTML = applications.map(app => {
            const job = allJobs.find(j => j.id === app.jobId);
            if (!job) return "";

            const steps = ["Postulado", "En Revisión", "Entrevista", "Aceptado"];
            const currentStepIndex = steps.indexOf(app.status);

            return `
                <div class="app-timeline-card" data-app-id="${app.id}">
                    <div class="app-card-header">
                        <div class="app-card-title-block">
                            <span class="app-company">${job.company}</span>
                            <h3>${job.title}</h3>
                            <p style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 4px;">
                                <i data-lucide="calendar" style="width:12px; display:inline-block; vertical-align:middle;"></i> Solicitud enviada: ${app.appliedDate}
                            </p>
                        </div>
                        <span class="status-pill ${app.status === 'Aceptado' ? 'active' : 'review'}">
                            ${app.status}
                        </span>
                    </div>
                    
                    <div class="app-flow-steps">
                        <div class="flow-step ${currentStepIndex >= 0 ? (app.status === 'Aceptado' && currentStepIndex === 0 ? 'success' : 'active') : ''}">
                            <div class="flow-step-dot">1</div>
                            <span class="flow-step-label">Postulado</span>
                        </div>
                        <div class="flow-step ${currentStepIndex >= 1 ? (app.status === 'Aceptado' && currentStepIndex === 1 ? 'success' : 'active') : ''}">
                            <div class="flow-step-dot">2</div>
                            <span class="flow-step-label">En Revisión</span>
                        </div>
                        <div class="flow-step ${currentStepIndex >= 2 ? (app.status === 'Aceptado' && currentStepIndex >= 2 ? 'success' : 'active') : ''}">
                            <div class="flow-step-dot">3</div>
                            <span class="flow-step-label">Entrevista</span>
                        </div>
                        <div class="flow-step ${currentStepIndex >= 3 ? 'success' : ''}">
                            <div class="flow-step-dot">4</div>
                            <span class="flow-step-label">Decisión</span>
                        </div>
                    </div>

                    <div style="margin-top: 16px; padding: 12px; background: var(--bg-primary); border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
                        <p style="font-size:0.8rem; color:var(--text-secondary); line-height: 1.4;">
                            <strong>Carta de Presentación:</strong> "${app.coverLetter}"
                        </p>
                    </div>

                    <!-- D: DELETE (RETIRAR POSTULACIÓN DEL ESTUDIANTE) -->
                    <div style="margin-top: 14px; text-align: right;">
                        <button class="btn btn-secondary-outline withdraw-app-trigger" data-app-id="${app.id}" style="padding: 6px 14px; font-size: 0.8rem; border-color: rgba(239, 68, 68, 0.4); color: var(--danger);">
                            <i data-lucide="trash-2" style="width: 14px; display:inline-block; vertical-align:middle;"></i> Retirar Postulación
                        </button>
                    </div>
                </div>
            `;
        }).join("");

        // Bind withdraw button trigger
        document.querySelectorAll(".withdraw-app-trigger").forEach(btn => {
            btn.addEventListener("click", () => {
                const appId = parseInt(btn.getAttribute("data-app-id"));
                onWithdraw(appId);
            });
        });

        lucide.createIcons();
    }
}
