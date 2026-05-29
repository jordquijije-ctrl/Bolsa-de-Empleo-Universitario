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

        this.profileCardPhone = document.getElementById("profile-card-phone");
        this.profileCardLocation = document.getElementById("profile-card-location");
        this.profileCardCv = document.getElementById("profile-card-cv");
        this.profileCardSkills = document.getElementById("profile-card-skills");

        // Elementos del Modal de Edición de Perfil
        this.editProfileBtn = document.getElementById("edit-profile-btn");
        this.editProfileModal = document.getElementById("edit-profile-modal");
        this.closeEditProfileModal = document.getElementById("close-edit-profile-modal");
        this.cancelEditProfileBtn = document.getElementById("cancel-edit-profile-btn");
        this.editProfileForm = document.getElementById("edit-profile-form");
        this.editProfileName = document.getElementById("edit-profile-name");
        this.editProfileDegree = document.getElementById("edit-profile-degree");
        this.editProfileFaculty = document.getElementById("edit-profile-faculty");
        this.editProfilePhone = document.getElementById("edit-profile-phone");
        this.editProfileLocation = document.getElementById("edit-profile-location");
        this.editProfileCv = document.getElementById("edit-profile-cv");
        this.editProfileSkills = document.getElementById("edit-profile-skills");
        this.editProfileBio = document.getElementById("edit-profile-bio");
        this.editProfileAvatarFile = document.getElementById("edit-profile-avatar-file");
        this.editProfileAvatarPreview = document.getElementById("edit-profile-avatar-preview");

        this.profileAlertsContainer = document.getElementById("profile-alerts-container");

        this.studentApplicationsList = document.getElementById("student-applications-list");
        this.profileApplicationsCount = document.getElementById("profile-applications-count");

        this.currentUserData = null;

        this.initEditProfileEvents();
    }

    initEditProfileEvents() {
        if (this.closeEditProfileModal) {
            this.closeEditProfileModal.addEventListener("click", () => this.editProfileModal.classList.remove("open"));
        }
        if (this.cancelEditProfileBtn) {
            this.cancelEditProfileBtn.addEventListener("click", () => this.editProfileModal.classList.remove("open"));
        }
        if (this.editProfileAvatarFile && this.editProfileAvatarPreview) {
            this.editProfileAvatarFile.addEventListener("change", (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        this.editProfileAvatarPreview.src = event.target.result;
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
    }

    render(user, applications, allJobs, onWithdraw) {
        if (!user) return;

        this.currentUserData = user;

        // Render card fields
        if (this.profileAvatarImg) this.profileAvatarImg.src = user.avatar;
        if (this.profileCardName) this.profileCardName.textContent = user.name;
        if (this.profileCardRole) this.profileCardRole.textContent = user.degreeOrCompany;
        if (this.profileCardSub) this.profileCardSub.textContent = user.facultyOrBrand;
        if (this.profileCardBio) this.profileCardBio.innerHTML = `<p>${user.bio}</p>`;
        if (this.profileCardEmail) this.profileCardEmail.textContent = user.email;

        if (this.profileCardPhone) this.profileCardPhone.textContent = user.phone || "+593 98 765 4321";
        if (this.profileCardLocation) this.profileCardLocation.textContent = user.location || "Guayaquil, Ecuador";
        if (this.profileCardCv) this.profileCardCv.textContent = user.cvFile || "Jordy_Camacho_CV_UG.pdf";

        if (this.profileCardSkills) {
            const skillsStr = user.skills || "HTML5 & CSS3, JavaScript (ES6), React.js, Bases de Datos, Trabajo en Equipo, Inglés B2";
            const skillsArr = skillsStr.split(",").map(s => s.trim()).filter(s => s.length > 0);
            this.profileCardSkills.innerHTML = skillsArr.map(s => `<span class="skill-tag">${s}</span>`).join("");
        }

        // Renderizar banners de alerta dinámicos si el perfil del estudiante está incompleto
        if (this.profileAlertsContainer) {
            this.profileAlertsContainer.innerHTML = "";
            if (user.role === "estudiante") {
                let alertHtml = "";
                
                // Alerta 1: Información de contacto incompleta (teléfono o ubicación vacíos)
                const isContactIncomplete = !user.phone || !user.location || user.phone === "" || user.location === "";
                if (isContactIncomplete) {
                    alertHtml += `
                        <div class="profile-alert-banner alert-warning" style="background: var(--warning-soft); border: 1px solid rgba(245, 158, 11, 0.2); border-left: 4px solid var(--warning); padding: 16px; border-radius: var(--radius-md); margin-bottom: 20px; display: flex; gap: 14px; align-items: flex-start; text-align: left;">
                            <div class="alert-icon" style="color: var(--warning); font-size: 1.25rem;"><i data-lucide="alert-triangle" style="width: 20px; height: 20px;"></i></div>
                            <div class="alert-content" style="flex: 1;">
                                <h4 style="font-family: var(--font-heading); font-size: 0.9rem; font-weight: 700; color: var(--text-primary); margin-bottom: 4px;">Información Necesaria Pendiente</h4>
                                <p style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.4; margin-bottom: 10px;">Tu perfil aún no cuenta con información de contacto completa (teléfono o ubicación). Para poder postular a las vacantes académicas, las empresas de la UG necesitan estos datos para contactarte directamente.</p>
                                <button class="btn btn-secondary-outline trigger-edit-profile-alert" style="padding: 4px 10px; font-size: 0.75rem; border-color: rgba(245, 158, 11, 0.4); color: var(--warning); background: transparent;">Completar Información de Contacto <i data-lucide="arrow-right" style="width:12px; display:inline-block; vertical-align:middle;"></i></button>
                            </div>
                        </div>
                    `;
                }

                // Alerta 2: CV o habilidades técnicas incompletas
                const isCvOrSkillsIncomplete = !user.cvFile || !user.skills || user.cvFile === "" || user.skills === "";
                if (isCvOrSkillsIncomplete) {
                    alertHtml += `
                        <div class="profile-alert-banner alert-info" style="background: var(--secondary-glow); border: 1px solid rgba(0, 102, 153, 0.2); border-left: 4px solid var(--secondary); padding: 16px; border-radius: var(--radius-md); margin-bottom: 20px; display: flex; gap: 14px; align-items: flex-start; text-align: left;">
                            <div class="alert-icon" style="color: var(--secondary); font-size: 1.25rem;"><i data-lucide="info" style="width: 20px; height: 20px;"></i></div>
                            <div class="alert-content" style="flex: 1;">
                                <h4 style="font-family: var(--font-heading); font-size: 0.9rem; font-weight: 700; color: var(--text-primary); margin-bottom: 4px;">¡Actualiza tu CV y Habilidades Técnicas!</h4>
                                <p style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.4; margin-bottom: 10px;">Sube tu hoja de vida oficial de la UG y detalla tus lenguajes de programación, herramientas o tecnologías (React, Node.js, Python, bases de datos). Un perfil profesional enriquecido incrementa exponencialmente tus posibilidades de selección.</p>
                                <button class="btn btn-secondary-outline trigger-edit-profile-alert" style="padding: 4px 10px; font-size: 0.75rem; border-color: rgba(0, 102, 153, 0.4); color: var(--secondary); background: transparent;">Actualizar CV y Habilidades <i data-lucide="arrow-right" style="width:12px; display:inline-block; vertical-align:middle;"></i></button>
                            </div>
                        </div>
                    `;
                }

                this.profileAlertsContainer.innerHTML = alertHtml;

                // Vincular clics de los botones de los banners para abrir la modal de edición
                this.profileAlertsContainer.querySelectorAll(".trigger-edit-profile-alert").forEach(btn => {
                    btn.addEventListener("click", () => {
                        if (this.editProfileBtn) this.editProfileBtn.click();
                    });
                });
            }
        }

        // Hide CV/Skills if user is an employer (safety fallback)
        if (user.role === "empresa") {
            if (this.profileCvRow) this.profileCvRow.style.display = "none";
            if (this.profileSkillsBlock) this.profileSkillsBlock.style.display = "none";
            if (this.editProfileBtn) this.editProfileBtn.style.display = "none";
        } else {
            if (this.profileCvRow) this.profileCvRow.style.display = "flex";
            if (this.profileSkillsBlock) this.profileSkillsBlock.style.display = "block";
            if (this.editProfileBtn) this.editProfileBtn.style.display = "flex";
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

    bindEditProfileSubmit(handler) {
        if (this.editProfileBtn) {
            this.editProfileBtn.addEventListener("click", () => {
                // Rellenar formulario con los datos actuales cargados en la sesión
                if (this.currentUserData) {
                    const u = this.currentUserData;
                    if (this.editProfileName) this.editProfileName.value = u.name || "";
                    if (this.editProfileDegree) this.editProfileDegree.value = u.degreeOrCompany || "";
                    if (this.editProfileFaculty) this.editProfileFaculty.value = u.facultyOrBrand || "";
                    if (this.editProfilePhone) this.editProfilePhone.value = u.phone || "+593 98 765 4321";
                    if (this.editProfileLocation) this.editProfileLocation.value = u.location || "Guayaquil, Ecuador";
                    if (this.editProfileCv) this.editProfileCv.value = u.cvFile || "Jordy_Camacho_CV_UG.pdf";
                    if (this.editProfileSkills) this.editProfileSkills.value = u.skills || "HTML5 & CSS3, JavaScript (ES6), React.js, Bases de Datos, Trabajo en Equipo, Inglés B2";
                    if (this.editProfileBio) this.editProfileBio.value = u.bio || "";
                    if (this.editProfileAvatarPreview) this.editProfileAvatarPreview.src = u.avatar || "";
                }
                this.editProfileModal.classList.add("open");
            });
        }

        if (this.editProfileForm) {
            this.editProfileForm.addEventListener("submit", (e) => {
                e.preventDefault();
                const name = this.editProfileName.value;
                const degreeOrCompany = this.editProfileDegree.value;
                const facultyOrBrand = this.editProfileFaculty.value;
                const phone = this.editProfilePhone.value;
                const location = this.editProfileLocation.value;
                const cvFile = this.editProfileCv.value;
                const skills = this.editProfileSkills.value;
                const bio = this.editProfileBio.value;
                const avatarFile = this.editProfileAvatarFile.files[0];

                if (avatarFile) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        const avatarBase64 = event.target.result;
                        handler({ name, degreeOrCompany, facultyOrBrand, phone, location, cvFile, skills, bio, avatar: avatarBase64 });
                        this.editProfileModal.classList.remove("open");
                    };
                    reader.readAsDataURL(avatarFile);
                } else {
                    handler({ name, degreeOrCompany, facultyOrBrand, phone, location, cvFile, skills, bio });
                    this.editProfileModal.classList.remove("open");
                }
            });
        }
    }
}
