/* --------------------------------------------------------------------------
   INITIAL_DATA.JS - Datos Mock Iniciales para UG Empleo (Universidad de Guayaquil)
   -------------------------------------------------------------------------- */

const INITIAL_USERS = [
    {
        id: 1,
        name: "Jordy Camacho",
        email: "jordycamacho@ug.edu.ec",
        password: "123456",
        role: "estudiante",
        avatar: "img/jordy_camacho.jpg",
        degreeOrCompany: "Ingeniería en Sistemas de Información",
        facultyOrBrand: "Facultad de Ciencias Matemáticas y Físicas",
        bio: "Estudiante de últimos semestres con alto rendimiento en la Universidad de Guayaquil. Apasionado por el desarrollo Frontend, JavaScript, diseño UX y metodologías ágiles. Busco mi práctica pre-profesional obligatoria."
    },
    {
        id: 2,
        name: "UgTrabajos",
        email: "reclutador@reclutadores.com",
        password: "123456",
        role: "empresa",
        avatar: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=200",
        degreeOrCompany: "Empresa de Telecomunicaciones y Tecnología",
        facultyOrBrand: "Guayaquil, Ecuador",
        bio: "Líderes en conectividad y Data Centers de alta disponibilidad en el Ecuador. Apoyamos firmemente la inserción laboral de los mejores talentos de la Universidad de Guayaquil."
    }
];

const INITIAL_APPLICATIONS = [
    {
        id: 101,
        jobId: 2, // Banco Pichincha - Asistente de Software
        appliedDate: "28 de Mayo, 2026",
        status: "Entrevista",
        coverLetter: "Como estudiante de la Universidad de Guayaquil, me interesa mucho aportar en la transformación digital bancaria del país con mis conocimientos en JS y bases de datos."
    },
    {
        id: 102,
        jobId: 1, // Telconet Latam - Practicante redes
        appliedDate: "27 de Mayo, 2026",
        status: "En Revisión",
        coverLetter: "Cuento con bases en CCNA 1 y Linux. Quiero realizar mis prácticas obligatorias en el Data Center de Telconet Guayaquil."
    }
];

const INITIAL_JOBS = [
    {
        id: 1,
        title: "Practicante de Telecomunicaciones y Redes",
        company: "UgTrabajos",
        category: "Tecnología",
        type: "Prácticas",
        experience: "Sin Experiencia",
        location: "Guayaquil",
        salary: "$450",
        salaryVal: 450,
        postedDate: "Hace 1 día",
        companyInitials: "UG",
        description: "Buscamos estudiantes de últimos semestres de Ingeniería en Networking, Computación o Telecomunicaciones de la UG. Apoyarás al equipo de soporte de infraestructura y monitoreo de fibra óptica de alta disponibilidad de nuestro Data Center principal en Guayaquil.",
        requirements: [
            "Estudiante matriculado en 8° o 9° semestre de Ingeniería en la Universidad de Guayaquil.",
            "Conceptos básicos de redes (CCNA 1 o equivalente).",
            "Familiaridad con comandos básicos de Linux y direccionamiento IPv4/IPv6.",
            "Alta orientación al aprendizaje continuo y trabajo en equipo."
        ],
        benefits: [
            "Compensación económica de pasantía según ley de pasantías ($450 USD).",
            "Horario flexible (6 horas diarias acordadas según horarios de clase de la UG).",
            "Certificación de horas de prácticas pre-profesionales obligatorias.",
            "Posibilidad de contratación directa al graduarse."
        ]
    },
    {
        id: 2,
        title: "Asistente de Desarrollo de Software Junior",
        company: "UgTrabajos",
        category: "Tecnología",
        type: "Tiempo Completo",
        experience: "Junior",
        location: "Guayaquil / Híbrido",
        salary: "$900",
        salaryVal: 900,
        postedDate: "Hace 2 días",
        companyInitials: "UG",
        description: "Forma parte del equipo de transformación digital del banco más grande del Ecuador. Buscamos graduados recientes de la UG para construir y dar mantenimiento a nuestros canales web y móviles enfocados en la experiencia del cliente.",
        requirements: [
            "Egresado o Graduado en Ingeniería en Sistemas de Información de la Universidad de Guayaquil.",
            "Bases sólidas en algoritmos, estructuras de datos y JavaScript (ES6) o Python.",
            "Comprensión de servicios Web (REST APIs) y bases de datos relacionales SQL.",
            "Deseable conocimiento básico en React o Angular."
        ],
        benefits: [
            "Salario base de $900 USD mensuales con todas las prestaciones de ley.",
            "Medicina prepagada 100% cubierta por la institución.",
            "Acceso ilimitado a plataformas educativas corporativas de desarrollo.",
            "Esquema de trabajo híbrido (3 días oficina, 2 días teletrabajo)."
        ]
    },
    {
        id: 3,
        title: "Practicante de Diseño de Interfaces UX/UI",
        company: "UgTrabajos",
        category: "Diseño",
        type: "Prácticas",
        experience: "Sin Experiencia",
        location: "Guayaquil / Remoto",
        salary: "$425",
        salaryVal: 425,
        postedDate: "Hace 3 días",
        companyInitials: "UG",
        description: "Buscamos estudiantes creativos de Diseño Gráfico o Multimedia para integrarse al equipo de Canales Digitales. Colaborarás en el diseño de flujos de navegación, wireframes y prototipos funcionales para la app Mi Claro Ecuador.",
        requirements: [
            "Cursar últimos semestres de Diseño, Comunicación Visual o afines en la UG.",
            "Portafolio académico de proyectos digitales (diseño web/móvil).",
            "Manejo intermedio de Figma (auto-layouts y componentes).",
            "Conocimiento de metodologías ágiles y nociones de usabilidad UX."
        ],
        benefits: [
            "Compensación legal de pasantía mensual de $425 USD.",
            "Afiliación al IESS de pasantes desde el primer día.",
            "Tutoría directa de diseñadores UX Senior de la industria.",
            "Horario flexible adaptable al pensum académico."
        ]
    },
    {
        id: 4,
        title: "Analista de Inteligencia de Negocios (BI) Junior",
        company: "UgTrabajos",
        category: "Administración",
        type: "Tiempo Completo",
        experience: "Junior",
        location: "Quito",
        salary: "$1.100",
        salaryVal: 1100,
        postedDate: "Hace 5 días",
        companyInitials: "UG",
        description: "Buscamos un analista de BI Junior apasionado por los datos. Serás responsable de la recopilación de datos de ventas, creación de tableros de control interactivos en Power BI y desarrollo de informes de tendencias de mercado para la toma de decisiones comerciales.",
        requirements: [
            "Ingeniero Comercial, Estadístico o de Sistemas egresado de la UG.",
            "Manejo avanzado de Excel (tablas dinámicas, fórmulas complejas) y lenguaje SQL intermedio.",
            "Conocimientos en modelado de datos en Power BI o Tableau.",
            "Pensamiento analítico y capacidad para comunicar hallazgos."
        ],
        benefits: [
            "Salario competitivo de $1.100 USD más beneficios corporativos de ley.",
            "Descuentos preferenciales en supermercados de la corporación.",
            "Capacitación constante en Big Data y analítica en la nube.",
            "Estabilidad laboral y plan de carrera a largo plazo."
        ]
    },
    {
        id: 5,
        title: "Asistente de Marketing Digital y Redes",
        company: "UgTrabajos",
        category: "Diseño",
        type: "Medio Tiempo",
        experience: "Junior",
        location: "Guayaquil",
        salary: "$500",
        salaryVal: 500,
        postedDate: "Hace 6 días",
        companyInitials: "UG",
        description: "En Cervecería Nacional impulsamos el talento joven. Si te apasionan las redes sociales, la creación de contenido visual y quieres gestionar marcas de consumo masivo líderes en el país, este puesto de medio tiempo es para ti.",
        requirements: [
            "Estudiante de los últimos ciclos de Marketing, Comunicación o Diseño en la UG.",
            "Habilidades básicas de edición audiovisual (Photoshop, Illustrator, Premiere o Canva).",
            "Excelente redacción, ortografía y conocimiento de tendencias digitales en TikTok e Instagram.",
            "Disponibilidad horaria de 4 horas diarias."
        ],
        benefits: [
            "Salario mensual de $500 USD con prestaciones proporcionales por ley.",
            "Acceso a nuestro club social de colaboradores y eventos corporativos.",
            "Planes de mentoría en marketing y branding corporativo de clase mundial.",
            "Oportunidad de pasar a tiempo completo al finalizar tus estudios."
        ]
    },
    {
        id: 6,
        title: "Asistente de Gestión de Calidad y Procesos",
        company: "UgTrabajos",
        category: "Administración",
        type: "Tiempo Completo",
        experience: "Junior",
        location: "Quito / Remoto",
        salary: "$950",
        salaryVal: 950,
        postedDate: "Hace 1 semana",
        companyInitials: "UG",
        description: "Responsable de apoyar en el levantamiento de procesos internos, documentación de flujos de trabajo, auditoría de métricas de servicio y aseguramiento de políticas de satisfacción al cliente de acuerdo a normas ISO.",
        requirements: [
            "Graduado en Ingeniería Industrial, Ingeniería Química o Administración de la UG.",
            "Conocimiento teórico de metodologías Six Sigma o Normas ISO 9001.",
            "Dominio de herramientas de flujogramas como Bizagi o Microsoft Visio.",
            "Organizado, detallista y orientado a procesos óptimos."
        ],
        benefits: [
            "Remuneración de $950 USD mensuales con décimos y utilidades de ley.",
            "Seguro de vida y plan médico integral corporativo.",
            "Esquema de teletrabajo híbrido altamente flexible.",
            "Financiamiento preferencial para posgrados y cursos de especialización."
        ]
    },
    {
        id: 7,
        title: "Asistente Residente de Obra Civil",
        company: "UgTrabajos",
        category: "Ingeniería",
        type: "Tiempo Completo",
        experience: "Junior",
        location: "Guayaquil",
        salary: "$850",
        salaryVal: 850,
        postedDate: "Hace 1 semana",
        companyInitials: "UG",
        description: "Buscamos un Asistente de Ingeniería Civil para proyectos habitacionales en la Vía a la Costa. Colaborarás en la supervisión de avance de obra, control de inventario de materiales de construcción y elaboración de informes de fiscalización diaria.",
        requirements: [
            "Estudiante egresado o graduado reciente de Ingeniería Civil de la Universidad de Guayaquil.",
            "Manejo intermedio de AutoCAD y Microsoft Project.",
            "Conocimiento práctico de ensayos de laboratorio de suelos y hormigones.",
            "Disponibilidad de laborar de forma presencial en campamento de obra."
        ],
        benefits: [
            "Salario base de $850 USD con prestaciones de ley completas.",
            "Provisión de alimentación diaria en obra y transporte gratuito desde Guayaquil.",
            "Entrenamiento práctico riguroso en residencia y fiscalización de megaproyectos.",
            "Entrega de todo el equipo de protección personal (EPP) homologado."
        ]
    },
    {
        id: 8,
        title: "Practicante de Análisis de Laboratorio Químico",
        company: "UgTrabajos",
        category: "Ingeniería",
        type: "Prácticas",
        experience: "Sin Experiencia",
        location: "Guayaquil",
        salary: "$425",
        salaryVal: 425,
        postedDate: "Hace 2 semanas",
        companyInitials: "UG",
        description: "Buscamos estudiantes de Química para realizar sus pasantías en nuestra planta industrial de alimentos y bebidas en Guayaquil. Apoyarás los análisis de control de calidad físico-químico y microbiológico de materias primas y productos terminados.",
        requirements: [
            "Estudiante matriculado apto para pasantías en Ingeniería Química o de Alimentos en la UG.",
            "Conocimientos fundamentales de análisis químicos de laboratorio y normas de bioseguridad.",
            "Orientación estricta al cumplimiento de metodologías y atención al detalle.",
            "Disponibilidad horaria de 6 horas diarias."
        ],
        benefits: [
            "Apoyo legal de pasantía de $425 USD mensuales más afiliación al IESS.",
            "Almuerzo corporativo subsidiado en el comedor de la planta industrial.",
            "Certificación de horas de práctica válidas para el proceso de titulación de la UG.",
            "Equipamiento de laboratorio e inducción técnica integral."
        ]
    }
];
