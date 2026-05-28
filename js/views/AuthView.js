/* --------------------------------------------------------------------------
   AUTHVIEW.JS - Vista para el Portal de Autenticación (Login/Registro)
   -------------------------------------------------------------------------- */

class AuthView {
    constructor() {
        this.tabLogin = document.getElementById("tab-login");
        this.tabRegister = document.getElementById("tab-register");
        this.loginForm = document.getElementById("login-form");
        this.registerForm = document.getElementById("register-form");
    }

    toggleTabs(activeTab) {
        if (activeTab === "login") {
            if (this.tabLogin) this.tabLogin.classList.add("active");
            if (this.tabRegister) this.tabRegister.classList.remove("active");
            if (this.loginForm) this.loginForm.classList.add("active");
            if (this.registerForm) this.registerForm.classList.remove("active");
        } else {
            if (this.tabLogin) this.tabLogin.classList.remove("active");
            if (this.tabRegister) this.tabRegister.classList.add("active");
            if (this.loginForm) this.loginForm.classList.remove("active");
            if (this.registerForm) this.registerForm.classList.add("active");
        }
    }

    bindTabSwitch() {
        if (this.tabLogin && this.tabRegister) {
            this.tabLogin.addEventListener("click", () => this.toggleTabs("login"));
            this.tabRegister.addEventListener("click", () => this.toggleTabs("register"));
        }
    }

    bindLoginSubmit(handler) {
        if (this.loginForm) {
            this.loginForm.addEventListener("submit", (e) => {
                e.preventDefault();
                const email = document.getElementById("login-email").value;
                const password = document.getElementById("login-password").value;
                const role = document.querySelector('input[name="login-role"]:checked').value;
                handler({ email, password, role });
            });
        }
    }

    bindRegisterSubmit(handler) {
        if (this.registerForm) {
            this.registerForm.addEventListener("submit", (e) => {
                e.preventDefault();
                const name = document.getElementById("reg-name").value;
                const email = document.getElementById("reg-email").value;
                const password = document.getElementById("reg-password").value;
                const role = document.querySelector('input[name="reg-role"]:checked').value;
                
                const avatarFileEl = document.getElementById("reg-avatar");
                const file = avatarFileEl && avatarFileEl.files ? avatarFileEl.files[0] : null;

                if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        const avatarBase64 = event.target.result;
                        handler({ name, email, password, role, avatarBase64 });
                    };
                    reader.readAsDataURL(file);
                } else {
                    handler({ name, email, password, role, avatarBase64: null });
                }
            });
        }
    }

    prefillLogin(email, password) {
        const emailInput = document.getElementById("login-email");
        const passInput = document.getElementById("login-password");
        if (emailInput) emailInput.value = email;
        if (passInput) passInput.value = password;
    }
}
