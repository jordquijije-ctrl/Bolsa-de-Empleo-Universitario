/* --------------------------------------------------------------------------
   UGEMPLEOMODEL.JS - Capa del Modelo (MVC) para la Bolsa de Empleo UG
   Gestiona datos de ofertas, postulaciones y usuarios con localStorage y sessionStorage
   -------------------------------------------------------------------------- */

class UGEmpleoModel {
    constructor() {
        // Migración de datos anteriores en localStorage para asegurar consistencia inmediata
        if (localStorage.getItem("ug_users")) {
            try {
                let existingUsers = JSON.parse(localStorage.getItem("ug_users"));
                let migrated = false;
                existingUsers = existingUsers.map(u => {
                    if (u.role === "estudiante" && (u.avatar !== "img/jordy_camacho.jpg" || u.name !== "Jordy Camacho" || u.email !== "jordycamacho@ug.edu.ec")) {
                        migrated = true;
                        return {
                            ...u,
                            name: "Jordy Camacho",
                            email: "jordycamacho@ug.edu.ec",
                            avatar: "img/jordy_camacho.jpg",
                            bio: "Estudiante de últimos semestres con alto rendimiento en la Universidad de Guayaquil. Apasionado por el desarrollo Frontend, JavaScript, diseño UX y metodologías ágiles. Busco mi práctica pre-profesional obligatoria."
                        };
                    }
                    if (u.role === "empresa" && (u.name !== "UgTrabajos" || u.email !== "reclutador@reclutadores.com")) {
                        migrated = true;
                        return {
                            ...u,
                            name: "UgTrabajos",
                            email: "reclutador@reclutadores.com"
                        };
                    }
                    return u;
                });
                if (migrated) {
                    localStorage.setItem("ug_users", JSON.stringify(existingUsers));
                    const sessionUserStr = sessionStorage.getItem("ug_session_user");
                    if (sessionUserStr) {
                        const sessionUser = JSON.parse(sessionUserStr);
                        if (sessionUser.role === "estudiante" && (sessionUser.avatar !== "img/jordy_camacho.jpg" || sessionUser.name !== "Jordy Camacho" || sessionUser.email !== "jordycamacho@ug.edu.ec")) {
                            sessionUser.name = "Jordy Camacho";
                            sessionUser.email = "jordycamacho@ug.edu.ec";
                            sessionUser.avatar = "img/jordy_camacho.jpg";
                            sessionUser.bio = "Estudiante de últimos semestres con alto rendimiento en la Universidad de Guayaquil. Apasionado por el desarrollo Frontend, JavaScript, diseño UX y metodologías ágiles. Busco mi práctica pre-profesional obligatoria.";
                            sessionStorage.setItem("ug_session_user", JSON.stringify(sessionUser));
                        } else if (sessionUser.role === "empresa" && (sessionUser.name !== "UgTrabajos" || sessionUser.email !== "reclutador@reclutadores.com")) {
                            sessionUser.name = "UgTrabajos";
                            sessionUser.email = "reclutador@reclutadores.com";
                            sessionStorage.setItem("ug_session_user", JSON.stringify(sessionUser));
                        }
                    }
                }
            } catch (e) {
                console.error("Error al migrar localStorage:", e);
            }
        }

        // Migración de ofertas anteriores en localStorage para asegurar sincronización con el reclutador UgTrabajos
        if (localStorage.getItem("ug_jobs")) {
            try {
                let existingJobs = JSON.parse(localStorage.getItem("ug_jobs"));
                let migrated = false;
                existingJobs = existingJobs.map(j => {
                    if (j.company !== "UgTrabajos" || j.companyInitials !== "UG") {
                        migrated = true;
                        return {
                            ...j,
                            company: "UgTrabajos",
                            companyInitials: "UG"
                        };
                    }
                    return j;
                });
                if (migrated) {
                    localStorage.setItem("ug_jobs", JSON.stringify(existingJobs));
                }
            } catch (e) {
                console.error("Error al migrar ug_jobs:", e);
            }
        }

        // Cargar bases de datos persistentes desde localStorage o usar mockups iniciales
        this.jobs = JSON.parse(localStorage.getItem("ug_jobs")) || [...INITIAL_JOBS];
        this.applications = JSON.parse(localStorage.getItem("ug_applications")) || [...INITIAL_APPLICATIONS];
        this.users = JSON.parse(localStorage.getItem("ug_users")) || [...INITIAL_USERS];
        
        // Inicializar localStorage si es la primera vez que se ejecuta el sitio
        if (!localStorage.getItem("ug_jobs")) this.saveToStorage("jobs");
        if (!localStorage.getItem("ug_applications")) this.saveToStorage("applications");
        if (!localStorage.getItem("ug_users")) this.saveToStorage("users");

        // USO DE VARIABLES DE SESIÓN (sessionStorage)
        // Mantiene la sesión del usuario activa tras refrescar el navegador (F5)
        const sessionUser = sessionStorage.getItem("ug_session_user");
        this.currentUser = sessionUser ? JSON.parse(sessionUser) : null; 
    }

    // Guardar colecciones de datos en localStorage
    saveToStorage(type) {
        if (type === "jobs") localStorage.setItem("ug_jobs", JSON.stringify(this.jobs));
        if (type === "applications") localStorage.setItem("ug_applications", JSON.stringify(this.applications));
        if (type === "users") localStorage.setItem("ug_users", JSON.stringify(this.users));
    }

    // --- CRUD USUARIOS (AUTENTICACIÓN Y REGISTRO) ---
    validateUser(email, password, role) {
        const user = this.users.find(u => 
            u.email.toLowerCase() === email.toLowerCase().trim() && 
            u.password === password && 
            u.role === role
        );
        if (user) {
            this.currentUser = user;
            // Guardar en la variable de sesión del navegador (sessionStorage)
            sessionStorage.setItem("ug_session_user", JSON.stringify(user));
            return user;
        }
        return null;
    }

    registerUser(name, email, password, role) {
        // Validar si el correo institucional ya existe
        if (this.users.some(u => u.email.toLowerCase() === email.toLowerCase().trim())) {
            return { success: false, message: "El correo ya está registrado en la base de la UG." };
        }

        const newUser = {
            id: this.users.length > 0 ? Math.max(...this.users.map(u => u.id)) + 1 : 1,
            name,
            email: email.toLowerCase().trim(),
            password,
            role,
            avatar: role === "estudiante" 
                ? "img/jordy_camacho.jpg"
                : "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=100",
            degreeOrCompany: role === "estudiante" ? "Ingeniería en Sistemas de Información" : name,
            facultyOrBrand: role === "estudiante" ? "Facultad de Ciencias Matemáticas y Físicas" : "Empresa Aliada UG",
            bio: role === "estudiante" 
                ? "Estudiante activo listo para aplicar mis conocimientos académicos en el sector corporativo."
                : `Empresa debidamente acreditada para vinculación laboral con la Universidad de Guayaquil.`
        };

        // Guardar en array y persistir en localStorage (C de CRUD de usuarios)
        this.users.push(newUser);
        this.saveToStorage("users");
        
        return { success: true, user: newUser };
    }

    logout() {
        this.currentUser = null;
        // Destruir la variable de sesión en sessionStorage al salir
        sessionStorage.removeItem("ug_session_user");
    }

    // --- CRUD OFERTAS DE EMPLEO (JOBS - FUNCIONAL Y PERSISTENTE) ---
    createJob(title, category, type, experience, location, salaryText, description, requirements, benefits) {
        let salaryVal = 0;
        const cleanSalary = salaryText.replace(/[^0-9]/g, "");
        if (cleanSalary) salaryVal = parseInt(cleanSalary);

        // Crear nueva vacante (C del CRUD de ofertas)
        const newJob = {
            id: this.jobs.length > 0 ? Math.max(...this.jobs.map(j => j.id)) + 1 : 1,
            title,
            company: this.currentUser.name, // Razón social de la empresa logueada
            category,
            type,
            experience,
            location,
            salary: salaryText || "A convenir",
            salaryVal,
            postedDate: "Recién publicado",
            companyInitials: this.currentUser.name.split(" ").map(w => w[0]).join("").substring(0,2).toUpperCase(),
            description,
            requirements,
            benefits
        };

        this.jobs.unshift(newJob);
        this.saveToStorage("jobs"); // Persistencia en localStorage
        return newJob;
    }

    readJobs() {
        return this.jobs; // R del CRUD de ofertas
    }

    updateJob(id, updatedFields) {
        const index = this.jobs.findIndex(j => j.id === id);
        if (index === -1) return null;

        let salaryVal = 0;
        const cleanSalary = updatedFields.salary.replace(/[^0-9]/g, "");
        if (cleanSalary) salaryVal = parseInt(cleanSalary);

        // Modificar registro (U del CRUD de ofertas)
        this.jobs[index] = {
            ...this.jobs[index],
            ...updatedFields,
            salaryVal
        };
        
        this.saveToStorage("jobs"); // Persistencia en localStorage
        return this.jobs[index];
    }

    deleteJob(id) {
        // Eliminar registro (D del CRUD de ofertas)
        this.jobs = this.jobs.filter(j => j.id !== id);
        
        // Cascading delete: eliminar postulaciones vinculadas a esta oferta eliminada
        this.applications = this.applications.filter(app => app.jobId !== id);

        this.saveToStorage("jobs");
        this.saveToStorage("applications"); // Persistencia en localStorage
    }

    // --- CRUD POSTULACIONES (APPLICATIONS - FUNCIONAL Y PERSISTENTE) ---
    createApplication(jobId, coverLetter) {
        // Validar duplicado
        if (this.applications.some(app => app.jobId === jobId)) return null;

        // Crear postulación (C del CRUD de postulaciones)
        const newApp = {
            id: this.applications.length > 0 ? Math.max(...this.applications.map(a => a.id)) + 1 : 101,
            jobId,
            appliedDate: this.getFormattedDate(),
            status: "Postulado",
            coverLetter: coverLetter || "Se adjuntó la hoja de vida UG."
        };

        this.applications.unshift(newApp);
        this.saveToStorage("applications"); // Persistencia en localStorage
        return newApp;
    }

    deleteApplication(appId) {
        // Eliminar postulación (D del CRUD de postulaciones)
        this.applications = this.applications.filter(app => app.id !== appId);
        this.saveToStorage("applications"); // Persistencia en localStorage
    }

    updateApplicationStatus(appId, newStatus) {
        const app = this.applications.find(a => a.id === appId);
        if (app) {
            // Actualizar estado de candidatura (U del CRUD de postulaciones)
            app.status = newStatus;
            this.saveToStorage("applications"); // Persistencia en localStorage
            return app;
        }
        return null;
    }

    // Auxiliar de Fecha
    getFormattedDate() {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Date().toLocaleDateString("es-ES", options);
    }
}
