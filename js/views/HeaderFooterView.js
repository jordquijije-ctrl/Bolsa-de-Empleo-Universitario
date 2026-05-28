/* --------------------------------------------------------------------------
   HEADERFOOTERVIEW.JS - Vista Compartida para la Cabecera, Pie de Página y Tema
   -------------------------------------------------------------------------- */

class HeaderFooterView {
    constructor() {
        this.html = document.documentElement;
        this.header = document.getElementById("main-header");
        this.footer = document.getElementById("main-footer");
        this.toastContainer = document.getElementById("toast-container");

        // Header dinámico
        this.headerAvatar = document.getElementById("header-avatar");
        this.headerUsername = document.getElementById("header-username");
        this.logoutBtn = document.getElementById("logout-btn");
        this.themeToggle = document.getElementById("theme-toggle");
        this.navLogo = document.getElementById("nav-logo");

        // Toggle menú móvil
        this.mobileToggle = document.getElementById("mobile-toggle");
        this.mobileNavPanel = document.getElementById("mobile-nav-panel");

        this.initTheme();
        this.initMobileMenu();
    }

    initTheme() {
        const savedTheme = localStorage.getItem("ugEmpleo-theme") || "light";
        this.html.setAttribute("data-theme", savedTheme);

        if (this.themeToggle) {
            this.themeToggle.addEventListener("click", () => {
                const currentTheme = this.html.getAttribute("data-theme");
                const nextTheme = currentTheme === "dark" ? "light" : "dark";
                this.html.setAttribute("data-theme", nextTheme);
                localStorage.setItem("ugEmpleo-theme", nextTheme);
                this.showToast("Diseño Visual", `Se configuró el tema ${nextTheme === 'dark' ? 'Oscuro' : 'Claro'}.`, "info");
            });
        }
    }

    initMobileMenu() {
        if (this.mobileToggle && this.mobileNavPanel) {
            this.mobileToggle.addEventListener("click", () => {
                this.mobileNavPanel.classList.toggle("open");
                const icon = this.mobileToggle.querySelector("i");
                if (icon) {
                    const isOpen = this.mobileNavPanel.classList.contains("open");
                    icon.setAttribute("data-lucide", isOpen ? "x" : "menu");
                    lucide.createIcons();
                }
            });
        }
    }

    render(user) {
        if (!user) {
            // Si no hay usuario y no estamos en login, redirigir a login
            if (!window.location.pathname.endsWith("login.html")) {
                window.location.href = "login.html";
            }
            if (this.header) this.header.style.display = "none";
            if (this.footer) this.footer.style.display = "none";
            return;
        }

        // Mostrar cabecera y pie
        if (this.header) this.header.style.display = "block";
        if (this.footer) this.footer.style.display = "block";

        // Actualizar datos del usuario
        if (this.headerUsername) this.headerUsername.textContent = user.name;
        if (this.headerAvatar) this.headerAvatar.src = user.avatar;

        // Ajustar la visibilidad de los links según el Rol
        const employerLinks = document.querySelectorAll('[data-target="employer-view"]');
        const profileLinks = document.querySelectorAll('[data-target="profile-view"]');

        if (user.role === "empresa") {
            employerLinks.forEach(el => el.style.display = "flex");
            profileLinks.forEach(el => el.style.display = "none");
        } else {
            employerLinks.forEach(el => el.style.display = "none");
            profileLinks.forEach(el => el.style.display = "flex");
        }

        // Resaltar link activo según la página actual
        const path = window.location.pathname;
        let activeTarget = "home-view";
        if (path.endsWith("empleos.html")) activeTarget = "jobs-view";
        else if (path.endsWith("empresa.html")) activeTarget = "employer-view";
        else if (path.endsWith("perfil.html")) activeTarget = "profile-view";

        document.querySelectorAll(".nav-link, .mobile-link").forEach(link => {
            const target = link.getAttribute("data-target");
            link.classList.toggle("active", target === activeTarget);
        });

        lucide.createIcons();
    }

    bindLogout(handler) {
        if (this.logoutBtn) {
            this.logoutBtn.addEventListener("click", (e) => {
                e.preventDefault();
                handler();
            });
        }
    }

    showToast(title, message, type = "success") {
        if (!this.toastContainer) return;
        const toast = document.createElement("div");
        toast.className = `toast toast-${type}`;

        let iconName = "check-circle-2";
        if (type === "warning") iconName = "alert-triangle";
        if (type === "danger") iconName = "x-circle";
        if (type === "info") iconName = "info";

        toast.innerHTML = `
            <div class="toast-icon">
                <i data-lucide="${iconName}"></i>
            </div>
            <div class="toast-content">
                <h5>${title}</h5>
                <p>${message}</p>
            </div>
        `;

        this.toastContainer.appendChild(toast);
        lucide.createIcons();

        setTimeout(() => {
            toast.style.animation = "fadeOut 0.4s ease forwards";
            toast.addEventListener("animationend", () => toast.remove());
        }, 3500);
    }
}
