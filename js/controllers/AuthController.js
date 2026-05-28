/* --------------------------------------------------------------------------
   AUTHCONTROLLER.JS - Controlador para el Inicio de Sesión y Registro (login.html)
   -------------------------------------------------------------------------- */

class AuthController {
    constructor(model, view, shellView) {
        this.model = model;
        this.view = view;
        this.shellView = shellView;

        this.init();
    }

    init() {
        // Guard de seguridad inverso: si ya está logueado, ingresa automáticamente
        if (this.model.currentUser) {
            this.redirectByUserRole(this.model.currentUser);
            return;
        }

        // Esconder cabecera y pie en la pantalla de login
        this.shellView.render(null);

        this.view.bindTabSwitch();
        this.bindEvents();
    }

    bindEvents() {
        // C de CRUD usuarios (Registro) e Inicio de Sesión
        this.view.bindLoginSubmit((data) => {
            const user = this.model.validateUser(data.email, data.password, data.role);
            if (user) {
                this.shellView.showToast("Sesión Iniciada", `¡Bienvenido al portal UG Empleo, ${user.name}!`, "success");
                setTimeout(() => {
                    this.redirectByUserRole(user);
                }, 1000);
            } else {
                this.shellView.showToast("Acceso Incorrecto", "Correo, contraseña o rol inválidos. Inténtalo de nuevo.", "danger");
            }
        });

        this.view.bindRegisterSubmit((data) => {
            const result = this.model.registerUser(data.name, data.email, data.password, data.role, data.avatarBase64);
            if (result.success) {
                // Alerta de confirmación de registro (Requisito de Mensajes de confirmación/alertas)
                alert(`¡Cuenta creada con éxito!\n\nUsuario: ${data.name}\nCorreo UG: ${data.email}\nRol: ${data.role.toUpperCase()}\n\nYa puedes iniciar sesión en el portal.`);
                
                this.shellView.showToast("Registro Exitoso", "Tu cuenta se ha guardado en la base de la UG.", "success");
                this.view.toggleTabs("login");
                this.view.prefillLogin(data.email, data.password);
            } else {
                this.shellView.showToast("Error de Registro", result.message, "danger");
            }
        });
    }

    redirectByUserRole(user) {
        if (user.role === "empresa") {
            window.location.href = "empresa.html";
        } else {
            window.location.href = "index.html"; // Redirige a inicio de estudiantes
        }
    }
}
