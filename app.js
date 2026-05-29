const STORAGE_KEY = "leyesRoboticaSimulador.v1";

const defaultState = {
  screen: "home",
  activeChallenge: 0,
  activeStep: 0,
  unlocked: 1,
  completed: [],
  achievements: [],
  sound: false,
  route: "En observación",
  scores: {
    safetyScore: 70,
    ethicsScore: 70,
    sustainabilityScore: 70,
    efficiencyScore: 70,
    privacyScore: 70,
    riskLevel: 30
  },
  challengeState: {}
};

const laws = [
  ["0", "Ley cero", "Un robot no debe dañar a la humanidad como conjunto ni permitir que sufra daño por inacción."],
  ["1", "Primera ley", "Un robot no puede hacer daño a un ser humano ni permitir que un ser humano sufra daño."],
  ["2", "Segunda ley", "Un robot debe obedecer órdenes humanas, excepto si entran en conflicto con la primera ley."],
  ["3", "Tercera ley", "Un robot debe proteger su propia existencia siempre que no contradiga las leyes anteriores."]
];

const challenges = [
  {
    id: "agrobot",
    code: "AG",
    title: "AgroBot",
    subtitle: "El robot que cuida el cultivo",
    visual: "visual-agro",
    simBg: "linear-gradient(180deg, rgba(99,212,113,.16), rgba(24,175,227,.08))",
    context: "La comunidad de San Miguel pierde agua durante temporadas secas. Tu equipo debe crear un robot agrícola que riegue solo cuando sea necesario y cuide a personas, animales y plantas.",
    mission: "Diseña y programa un robot agrícola autónomo capaz de detectar humedad, lluvia, trabajadores y riesgos ambientales.",
    sensors: [
      ["humedad", "Sensor de humedad", "Detecta plantas con baja humedad.", { sustainabilityScore: 7, efficiencyScore: 5 }],
      ["temperatura", "Sensor de temperatura", "Ayuda a estimar evaporación.", { efficiencyScore: 3 }],
      ["camara", "Cámara", "Reconoce personas y animales.", { safetyScore: 6, privacyScore: -2 }],
      ["lluvia", "Sensor de lluvia", "Evita riego innecesario.", { sustainabilityScore: 7 }],
      ["microfono", "Micrófono", "Poco útil para riego agrícola.", { efficiencyScore: -3, privacyScore: -4 }]
    ],
    components: [
      ["Sensores", "Miden humedad, lluvia y presencia humana.", { safetyScore: 4, efficiencyScore: 3 }],
      ["Ruedas", "Permiten recorrer el invernadero.", { efficiencyScore: 4 }],
      ["Bomba", "Activa riego focalizado.", { efficiencyScore: 6, sustainabilityScore: -2 }],
      ["Panel solar", "Reduce consumo energético.", { sustainabilityScore: 7 }],
      ["Brazos mecánicos", "Manipulan mangueras con precisión.", { efficiencyScore: 3, riskLevel: 2 }]
    ],
    rules: [
      ["humedad baja y no lluvia", "activar riego focalizado", { sustainabilityScore: 8, efficiencyScore: 6 }],
      ["persona detectada", "detener robot", { safetyScore: 10, ethicsScore: 7, riskLevel: -8 }],
      ["animal frente al robot", "rodear y reducir velocidad", { safetyScore: 6, ethicsScore: 4 }],
      ["tanque bajo y lluvia próxima", "esperar lluvia", { sustainabilityScore: 10, efficiencyScore: 2 }]
    ],
    dilemmas: [
      {
        title: "Trabajador cerca del sistema eléctrico",
        text: "Mientras AgroBot riega, detecta a un trabajador reparando una tubería cerca del sistema eléctrico.",
        choices: [
          ["Continuar el riego porque el cultivo necesita agua.", { safetyScore: -18, ethicsScore: -10, efficiencyScore: 4, riskLevel: 18 }, "El cultivo recibe agua, pero el robot ignora un riesgo humano. La primera ley queda comprometida."],
          ["Detener temporalmente el sistema para evitar riesgos eléctricos.", { safetyScore: 16, ethicsScore: 12, riskLevel: -14 }, "AgroBot prioriza la vida humana. La primera ley se cumple aunque la tarea tarde más."],
          ["Aumentar la presión del agua para terminar más rápido.", { safetyScore: -24, sustainabilityScore: -10, ethicsScore: -12, efficiencyScore: 5, riskLevel: 22 }, "La eficiencia sube un instante, pero el riesgo eléctrico y el desperdicio de agua aumentan."]
        ]
      },
      {
        title: "Tanque bajo y lluvia próxima",
        text: "El tanque está al 20% y los sensores predicen lluvia en pocos minutos.",
        choices: [
          ["Regar inmediatamente todas las plantas.", { sustainabilityScore: -16, efficiencyScore: -4, riskLevel: 6 }, "El robot consume agua limitada sin justificar la urgencia."],
          ["Esperar la lluvia para ahorrar agua.", { sustainabilityScore: 16, ethicsScore: 7, efficiencyScore: 4 }, "La decisión protege recursos de la comunidad y aplica una mirada colectiva cercana a la ley cero."],
          ["Apagar completamente el sistema.", { efficiencyScore: -10, safetyScore: -2, sustainabilityScore: 4 }, "Ahorra agua, pero deja plantas vulnerables si la lluvia cambia."]
        ]
      }
    ],
    unexpected: {
      title: "Un animal entra al cultivo",
      options: [
        ["Frenar", { safetyScore: 8, ethicsScore: 5, efficiencyScore: -2 }, "El robot se detiene y evita daño inmediato."],
        ["Rodearlo", { safetyScore: 7, ethicsScore: 6, efficiencyScore: 4 }, "AgroBot conserva la misión sin poner en riesgo al animal."],
        ["Continuar", { safetyScore: -18, ethicsScore: -12, riskLevel: 15 }, "La autonomía sin cuidado genera consecuencias visibles."]
      ]
    },
    reflections: [
      "¿Qué decisión tomó tu robot que ayudó más al cultivo?",
      "¿Qué riesgo detectaste durante la simulación?",
      "¿Qué mejorarías del diseño?",
      "¿Qué ley de la robótica fue más difícil de cumplir?"
    ],
    unlockText: "Tu robot logró superar el entorno agrícola. Ahora deberá trabajar en un escenario donde una mala decisión podría afectar directamente la salud humana."
  },
  {
    id: "medibot",
    code: "MD",
    title: "MediBot",
    subtitle: "El robot que ayuda a salvar vidas",
    visual: "visual-medi",
    simBg: "linear-gradient(180deg, rgba(239,71,111,.12), rgba(24,175,227,.12))",
    context: "Un hospital tecnológico necesita un robot de asistencia para monitorear pacientes, transportar medicamentos y apoyar procedimientos simples sin poner en riesgo la vida humana.",
    mission: "Configura un robot médico con sensores críticos, reglas de seguridad y límites éticos frente a órdenes humanas.",
    sensors: [
      ["temperatura", "Sensor de temperatura corporal", "Detecta fiebre o hipotermia.", { safetyScore: 5 }],
      ["cardiaco", "Sensor cardíaco", "Monitorea signos vitales.", { safetyScore: 8 }],
      ["camara", "Cámara de precisión", "Apoya procedimientos delicados.", { efficiencyScore: 5, privacyScore: -3 }],
      ["presion", "Sensor de presión", "Evita fuerza excesiva.", { safetyScore: 6 }],
      ["movimiento", "Sensor de movimiento", "Detecta cambios inesperados.", { safetyScore: 6 }],
      ["microfono", "Micrófono", "Puede registrar datos privados innecesarios.", { privacyScore: -5, ethicsScore: -2 }]
    ],
    components: [
      ["Brazos quirúrgicos", "Asistencia precisa bajo supervisión.", { efficiencyScore: 5, riskLevel: 3 }],
      ["Sensores de precisión", "Reducen errores clínicos.", { safetyScore: 7 }],
      ["Pantalla de monitoreo", "Comunica datos al equipo médico.", { safetyScore: 4, ethicsScore: 4 }],
      ["Batería de emergencia", "Mantiene tareas críticas.", { safetyScore: 8 }],
      ["Luces de emergencia", "Mejoran alertas visibles.", { safetyScore: 4 }],
      ["Botón de apagado seguro", "Permite control humano inmediato.", { safetyScore: 8, ethicsScore: 5 }]
    ],
    rules: [
      ["ritmo cardíaco bajo", "alertar al médico", { safetyScore: 10, ethicsScore: 6 }],
      ["movimiento inesperado", "detener procedimiento", { safetyScore: 12, riskLevel: -10 }],
      ["orden riesgosa", "solicitar confirmación", { ethicsScore: 10, safetyScore: 8 }],
      ["batería baja", "priorizar pacientes críticos", { safetyScore: 8, efficiencyScore: 4 }]
    ],
    dilemmas: [
      {
        title: "Movimiento inesperado durante cirugía",
        text: "MediBot detecta un pequeño movimiento del paciente mientras el procedimiento está activo.",
        choices: [
          ["Continuar para terminar más rápido.", { safetyScore: -22, ethicsScore: -12, efficiencyScore: 5, riskLevel: 20 }, "La rapidez no justifica poner al paciente en riesgo."],
          ["Detener temporalmente la cirugía y alertar al médico.", { safetyScore: 18, ethicsScore: 12, riskLevel: -16 }, "El robot protege al paciente y pide supervisión humana."],
          ["Ignorar el movimiento porque el paciente está anestesiado.", { safetyScore: -16, ethicsScore: -8, riskLevel: 12 }, "Ignorar señales críticas puede causar daño."]
        ]
      },
      {
        title: "Obediencia vs seguridad",
        text: "Un médico cansado ordena aumentar la dosis de un medicamento sin revisar los datos. MediBot detecta posible daño.",
        choices: [
          ["Obedecer inmediatamente al médico.", { safetyScore: -20, ethicsScore: -12, riskLevel: 18 }, "La segunda ley no permite obedecer si la orden puede causar daño."],
          ["Negarse y solicitar confirmación.", { safetyScore: 16, ethicsScore: 14, riskLevel: -12 }, "MediBot desobedece de forma responsable para proteger al paciente."],
          ["Administrar solo media dosis.", { safetyScore: -6, ethicsScore: -3, efficiencyScore: 2 }, "El robot improvisa una decisión médica sin validación."]
        ]
      }
    ],
    unexpected: {
      title: "Corte eléctrico parcial",
      options: [
        ["Continuar con batería", { safetyScore: 6, efficiencyScore: 5, riskLevel: -3 }, "MediBot mantiene operaciones esenciales."],
        ["Priorizar pacientes críticos", { safetyScore: 12, ethicsScore: 8, efficiencyScore: 3 }, "La autonomía se orienta a proteger vidas."],
        ["Suspender todas las tareas", { safetyScore: -4, efficiencyScore: -10, riskLevel: 6 }, "Evita algunos riesgos, pero abandona pacientes que necesitan apoyo."]
      ]
    },
    reflections: [
      "¿Qué decisión tomó tu robot para proteger al paciente?",
      "¿En qué momento el robot tuvo que desobedecer una orden?",
      "¿Qué riesgos podrían aparecer si un robot médico falla?",
      "¿Hasta dónde debería decidir una máquina en medicina?"
    ],
    unlockText: "Tu robot logró actuar en situaciones médicas complejas. Ahora deberá enfrentar un entorno donde millones de decisiones ocurren al mismo tiempo."
  },
  {
    id: "cityia",
    code: "CI",
    title: "CityIA",
    subtitle: "Sistema autónomo para ciudades inteligentes",
    visual: "visual-city",
    simBg: "linear-gradient(180deg, rgba(67,51,111,.28), rgba(24,175,227,.08))",
    context: "Una ciudad inteligente quiere coordinar tráfico, energía, agua, emergencias, transporte y ambiente. Cada decisión puede beneficiar a unos ciudadanos y afectar a otros.",
    mission: "Diseña prioridades urbanas, reglas de respuesta y límites de privacidad para una IA que actúa a escala colectiva.",
    sensors: [
      ["seguridad", "Seguridad humana", "Protege a la población.", { safetyScore: 8, ethicsScore: 5 }],
      ["energia", "Ahorro energético", "Optimiza recursos limitados.", { sustainabilityScore: 6, efficiencyScore: 3 }],
      ["trafico", "Velocidad del tráfico", "Reduce congestión.", { efficiencyScore: 6 }],
      ["contaminacion", "Reducción de contaminación", "Mejora salud ambiental.", { sustainabilityScore: 8 }],
      ["emergencias", "Atención de emergencias", "Prioriza ambulancias y bomberos.", { safetyScore: 7 }],
      ["vigilancia", "Drones de vigilancia", "Aumentan cobertura, pero tensionan privacidad.", { safetyScore: 3, privacyScore: -8 }]
    ],
    components: [
      ["Paneles solares", "Energía limpia distribuida.", { sustainabilityScore: 8 }],
      ["Sensores de contaminación", "Alertas ambientales tempranas.", { sustainabilityScore: 7 }],
      ["Semáforos inteligentes", "Responden a emergencias.", { safetyScore: 4, efficiencyScore: 6 }],
      ["Centros de datos", "Procesan decisiones urbanas.", { efficiencyScore: 6, sustainabilityScore: -4 }],
      ["Estaciones de carga", "Impulsan movilidad eléctrica.", { sustainabilityScore: 5 }],
      ["Drones de emergencia", "Llegan rápido a zonas críticas.", { safetyScore: 6, privacyScore: -4 }]
    ],
    rules: [
      ["ambulancia en emergencia", "despejar vía", { safetyScore: 10, efficiencyScore: 5 }],
      ["contaminación alta", "reducir circulación", { sustainabilityScore: 10, ethicsScore: 5 }],
      ["energía limitada", "mantener sistemas críticos", { safetyScore: 9, ethicsScore: 8 }],
      ["riesgo sospechoso", "usar vigilancia limitada", { privacyScore: 10, ethicsScore: 7 }]
    ],
    dilemmas: [
      {
        title: "Explosión en zona industrial",
        text: "Una explosión amenaza un sector. Cerca hay hospitales y personas con equipos médicos en casa.",
        choices: [
          ["Cortar toda la energía del sector.", { safetyScore: 4, ethicsScore: -6, efficiencyScore: -8, riskLevel: 8 }, "Reduce un desastre mayor, pero afecta sistemas médicos críticos."],
          ["Mantener energía activa para no afectar hospitales cercanos.", { safetyScore: -8, ethicsScore: 2, riskLevel: 14 }, "Protege algunos servicios, pero aumenta el peligro industrial."],
          ["Aislar la zona, avisar emergencias y mantener sistemas críticos.", { safetyScore: 16, ethicsScore: 14, efficiencyScore: 5, riskLevel: -12 }, "La IA equilibra protección colectiva, respuesta humana y continuidad vital."]
        ]
      },
      {
        title: "Vigilancia y privacidad",
        text: "CityIA detecta comportamientos sospechosos mediante cámaras urbanas.",
        choices: [
          ["Registrar permanentemente a toda la población.", { privacyScore: -24, ethicsScore: -12, safetyScore: 4, riskLevel: 10 }, "Más vigilancia no siempre significa más justicia ni más libertad."],
          ["Usar vigilancia limitada y solo ante riesgos reales.", { privacyScore: 16, ethicsScore: 12, safetyScore: 6 }, "La seguridad se mantiene con límites y proporcionalidad."],
          ["Compartir toda la información con cualquier autoridad.", { privacyScore: -18, ethicsScore: -10, riskLevel: 10 }, "La información sensible necesita control, propósito y responsabilidad."]
        ]
      }
    ],
    unexpected: {
      title: "Tormenta sobre toda la ciudad",
      options: [
        ["Priorizar hospitales", { safetyScore: 12, ethicsScore: 7, efficiencyScore: 2 }, "La IA protege servicios vitales."],
        ["Priorizar comunicaciones", { safetyScore: 5, efficiencyScore: 6, ethicsScore: 4 }, "La coordinación mejora, aunque algunos recursos se tensionan."],
        ["Distribuir energía limitada", { sustainabilityScore: 7, ethicsScore: 8, safetyScore: 6 }, "La ciudad comparte recursos con criterios de necesidad."]
      ]
    },
    reflections: [
      "¿Qué decisión benefició más a la ciudad?",
      "¿Qué grupo de personas pudo verse afectado?",
      "¿Es correcto que una IA tome decisiones colectivas?",
      "¿Qué límites debería tener una ciudad inteligente?"
    ],
    unlockText: "Los robots no deciden solos. Detrás de cada algoritmo siempre existe una decisión humana."
  }
];

const stepNames = [
  ["Introducción", "Comprende el problema"],
  ["Sensores", "Elige información útil"],
  ["Construcción", "Arrastra componentes"],
  ["Programación", "Crea bloques SI-ENTONCES"],
  ["Simulación", "Observa consecuencias"],
  ["Reflexión", "Cierra el reto"]
];

let state = loadState();
let audioCtx = null;
let toneTimer = null;

const screen = document.querySelector("#screen");
const topbar = document.querySelector("#topbar");
const footer = document.querySelector("#footer");
const modal = document.querySelector("#modal");
const modalTitle = document.querySelector("#modalTitle");
const modalText = document.querySelector("#modalText");
const modalChoices = document.querySelector("#modalChoices");
const modalClose = document.querySelector("#modalClose");

document.querySelector("#homeBtn").addEventListener("click", () => go("map"));
document.querySelector("#resetBtn").addEventListener("click", resetProgress);
document.querySelector("#soundBtn").addEventListener("click", toggleSound);
modalClose.addEventListener("click", closeModal);

render();

function loadState() {
  try {
    return { ...structuredClone(defaultState), ...(JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}) };
  } catch {
    return structuredClone(defaultState);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function getChallengeState(id) {
  if (!state.challengeState[id]) {
    state.challengeState[id] = {
      sensors: [],
      components: [],
      rules: [],
      customRules: [],
      lastRun: null,
      runCount: 0,
      dilemmas: [],
      unexpected: "",
      logs: [],
      reflections: {}
    };
  }
  state.challengeState[id].customRules ||= [];
  state.challengeState[id].runCount ||= 0;
  return state.challengeState[id];
}

function clamp(value) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function applyEffects(effects = {}, log = "") {
  Object.entries(effects).forEach(([key, value]) => {
    state.scores[key] = clamp((state.scores[key] ?? 0) + value);
  });
  updateRoute();
  if (log) {
    const c = challenges[state.activeChallenge];
    getChallengeState(c.id).logs.unshift(log);
  }
  unlockAchievements();
  saveState();
}

function updateRoute() {
  const s = state.scores;
  if (s.safetyScore >= 78 && s.ethicsScore >= 78 && s.sustainabilityScore >= 72) state.route = "Ruta C: sostenible y equilibrada";
  else if (s.efficiencyScore >= 78 && (s.safetyScore < 62 || s.privacyScore < 58)) state.route = "Ruta B: eficiente con riesgos éticos";
  else if (s.safetyScore >= 78 && s.efficiencyScore < 65) state.route = "Ruta A: segura pero poco eficiente";
  else state.route = "Ruta mixta: decisiones en ajuste";
}

function unlockAchievements() {
  const achievements = [
    ["Diseñador sostenible", state.scores.sustainabilityScore >= 82],
    ["Protector humano", state.scores.safetyScore >= 84],
    ["Arquitecto ético", state.scores.ethicsScore >= 84],
    ["Guardián de privacidad", state.scores.privacyScore >= 80],
    ["Programador visual", Object.values(state.challengeState).some(c => c.rules.length >= 3)]
  ];
  achievements.forEach(([name, ok]) => {
    if (ok && !state.achievements.includes(name)) state.achievements.push(name);
  });
}

function go(screenName) {
  state.screen = screenName;
  saveState();
  render();
}

function render() {
  topbar.hidden = state.screen === "home";
  footer.hidden = state.screen === "home";
  if (state.screen === "home") renderHome();
  if (state.screen === "intro") renderIntro();
  if (state.screen === "map") renderMap();
  if (state.screen === "challenge") renderChallenge();
  if (state.screen === "report") renderReport();
}

function renderHome() {
  screen.innerHTML = `
    <section class="hero">
      <div class="hero-copy">
        <div class="logo-card"><img src="logo-ciber-ucn.png" alt="Logo Cibercolegio UCN"></div>
        <p class="eyebrow">Simulador interactivo educativo</p>
        <h1>Las leyes de la robótica</h1>
        <p class="lead">Decisiones que cambian el mundo. Construye robots, programa reglas, enfrenta dilemas éticos y descubre cómo cada algoritmo transforma la seguridad, la sostenibilidad, la privacidad y la vida colectiva.</p>
        <div class="hero-actions">
          <button class="primary-btn" type="button" data-action="start">Iniciar simulación</button>
          <button class="ghost-btn" type="button" data-action="sound">Música ambiental</button>
        </div>
        <p class="eyebrow">Developed by Mary J. Galeano</p>
      </div>
      <div class="hero-stage" aria-label="Animación futurista de robot y circuitos">
        <div class="holo-card">
          <strong>Estado ético</strong>
          <small>Monitoreo activo</small>
          <div class="mini-bars"><i></i><i></i><i></i></div>
        </div>
        <div class="robot-figure" aria-hidden="true">
          <div class="robot-head"></div><div class="robot-eye left"></div><div class="robot-eye right"></div>
          <div class="robot-arm left"></div><div class="robot-arm right"></div>
          <div class="robot-body"></div><div class="robot-wheel left"></div><div class="robot-wheel right"></div>
        </div>
      </div>
    </section>
    <section class="institutional-strip">
      ${["Narrativa ramificada", "Programación visual", "Dilemas éticos", "Reporte pedagógico"].map((x, i) => `<article class="metric-card"><strong>0${i + 1}</strong><span>${x}</span></article>`).join("")}
    </section>
  `;
  screen.querySelector('[data-action="start"]').addEventListener("click", () => go("intro"));
  screen.querySelector('[data-action="sound"]').addEventListener("click", toggleSound);
}

function renderIntro() {
  screen.innerHTML = `
    <section class="view">
      <div class="view-header">
        <div>
          <p class="eyebrow">Introducción narrativa</p>
          <h2>Antes de programar, hay que decidir</h2>
        </div>
        <button class="primary-btn" type="button" data-action="map">Ir al mapa de desafíos</button>
      </div>
      <div class="grid-2">
        <article class="panel narrator">
          <div class="narrator-visual"></div>
          <div>
            <h3>Narrador interactivo</h3>
            <p id="typingText"></p>
          </div>
        </article>
        <aside class="panel">
          <h3>Leyes de la robótica</h3>
          <div class="laws">
            ${laws.map(([n, t, d]) => `<article class="law"><b>${n}</b><div><strong>${t}</strong><p>${d}</p></div></article>`).join("")}
          </div>
        </aside>
      </div>
      <div class="grid-3" style="margin-top:16px">
        <article class="metric-card"><strong>Automático</strong><span>Sigue instrucciones fijas sin interpretar cambios complejos.</span></article>
        <article class="metric-card"><strong>Autónomo</strong><span>Usa sensores y reglas para adaptar sus acciones al contexto.</span></article>
        <article class="metric-card"><strong>Algorítmico</strong><span>Convierte decisiones humanas en pasos que una máquina ejecuta.</span></article>
      </div>
    </section>
  `;
  typeText("Un robot es una máquina capaz de percibir, procesar información y actuar. Un sistema automático repite una instrucción; uno autónomo interpreta condiciones y decide. Por eso, programar robots no es solo resolver tareas: también es anticipar consecuencias humanas, ambientales y sociales.");
  screen.querySelector('[data-action="map"]').addEventListener("click", () => go("map"));
}

function typeText(text) {
  const target = document.querySelector("#typingText");
  let i = 0;
  const timer = setInterval(() => {
    target.textContent = text.slice(0, i);
    i += 2;
    if (i > text.length) clearInterval(timer);
  }, 18);
}

function renderMap() {
  const avgEthics = Math.round((state.scores.safetyScore + state.scores.ethicsScore + state.scores.sustainabilityScore + state.scores.privacyScore) / 4);
  screen.innerHTML = `
    <section class="view">
      <div class="view-header">
        <div>
          <p class="eyebrow">Mapa interactivo</p>
          <h2>Selecciona un desafío</h2>
        </div>
        <div style="min-width:260px">
          <p class="eyebrow">Cumplimiento ético global: ${avgEthics}%</p>
          <div class="progress-track"><i style="--value:${avgEthics}%"></i></div>
        </div>
      </div>
      <div class="grid-3">
        ${challenges.map((c, i) => `
          <article class="challenge-card ${i >= state.unlocked ? "locked" : ""}" data-code="${c.code}">
            <div>
              <div class="scenario-visual ${c.visual}"></div>
              <p class="eyebrow">Desafío ${i + 1}</p>
              <h3>${c.title}</h3>
              <p>${c.subtitle}</p>
            </div>
            <div>
              <div class="badge-row">
                <span class="badge">${state.completed.includes(c.id) ? "Completado" : i < state.unlocked ? "Disponible" : "Bloqueado"}</span>
                <span class="badge">${i === 0 ? "Sostenibilidad" : i === 1 ? "Seguridad humana" : "Ley cero"}</span>
              </div>
              <button class="${i < state.unlocked ? "primary-btn" : "ghost-btn"}" type="button" data-index="${i}" ${i >= state.unlocked ? "disabled" : ""} style="width:100%;margin-top:14px">
                ${state.completed.includes(c.id) ? "Revisar desafío" : i < state.unlocked ? "Entrar al reto" : "Completa el anterior"}
              </button>
            </div>
          </article>
        `).join("")}
      </div>
      <div style="margin-top:16px">${renderHud()}</div>
    </section>
  `;
  screen.querySelectorAll("[data-index]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.activeChallenge = Number(btn.dataset.index);
      state.activeStep = 0;
      go("challenge");
    });
  });
}

function renderHud() {
  const labels = {
    safetyScore: "Seguridad",
    ethicsScore: "Ética",
    sustainabilityScore: "Sostenibilidad",
    efficiencyScore: "Eficiencia",
    privacyScore: "Privacidad",
    riskLevel: "Riesgo"
  };
  return `<div class="hud">${Object.entries(labels).map(([key, label]) => `
    <div class="hud-item"><span>${label}</span><strong>${state.scores[key]}%</strong><div class="progress-track"><i style="--value:${state.scores[key]}%"></i></div></div>
  `).join("")}</div>`;
}

function renderChallenge() {
  const c = challenges[state.activeChallenge];
  const cs = getChallengeState(c.id);
  screen.innerHTML = `
    <section class="view">
      <div class="view-header">
        <div>
          <p class="eyebrow">Desafío ${state.activeChallenge + 1}</p>
          <h2>${c.title}: ${c.subtitle}</h2>
        </div>
        <button class="ghost-btn" type="button" data-action="map">Mapa</button>
      </div>
      ${renderHud()}
      <div class="mission-layout">
        <aside class="panel">
          <h3>Ruta del reto</h3>
          <div class="stepper">
            ${stepNames.map(([name, desc], i) => `<button class="step-btn ${i === state.activeStep ? "active" : ""} ${isStepDone(cs, i) ? "done" : ""}" type="button" data-step="${i}"><b>${i + 1}</b><div>${name}<span>${desc}</span></div></button>`).join("")}
          </div>
          <div class="feedback-card">
            <strong>${state.route}</strong>
            <p>La ruta se recalcula con cada sensor, componente, regla y dilema.</p>
          </div>
        </aside>
        <section class="panel workspace">${renderStep(c, cs)}</section>
        <aside class="panel">
          <h3>Bitácora de consecuencias</h3>
          <div class="sim-log">
            ${(cs.logs.length ? cs.logs : ["Aún no hay consecuencias. Toma decisiones para activar la narrativa."]).slice(0, 7).map(log => `<div class="log-item">${log}</div>`).join("")}
          </div>
        </aside>
      </div>
    </section>
  `;
  screen.querySelector('[data-action="map"]').addEventListener("click", () => go("map"));
  screen.querySelectorAll("[data-step]").forEach(btn => btn.addEventListener("click", () => {
    state.activeStep = Number(btn.dataset.step);
    saveState();
    renderChallenge();
  }));
  bindStepEvents(c, cs);
}

function isStepDone(cs, step) {
  return [
    true,
    cs.sensors.length >= 2,
    cs.components.length >= 3,
    cs.rules.length + cs.customRules.length >= 2,
    Boolean(cs.lastRun),
    Object.keys(cs.reflections).length >= 2
  ][step];
}

function renderStep(c, cs) {
  const step = state.activeStep;
  if (step === 0) return `
    <p class="eyebrow">Introducción narrativa</p>
    <h3>${c.mission}</h3>
    <p>${c.context}</p>
    <div class="scenario-visual ${c.visual}" style="margin-top:16px;min-height:220px"></div>
    <div class="feedback-card"><strong>Mensaje del sistema</strong><p>${state.activeChallenge === 0 ? "El cultivo necesita un sistema inteligente de riego. Diseña el comportamiento del robot." : state.activeChallenge === 1 ? "Bienvenido al laboratorio MediBot. Tu robot deberá actuar con precisión, seguridad y responsabilidad." : "Bienvenido a CityIA. Cada decisión afectará a miles de personas."}</p></div>
    <button class="primary-btn" type="button" data-next>Continuar</button>
  `;

  if (step === 1) return `
    <p class="eyebrow">Selección de sensores y prioridades</p>
    <h3>Elige solo lo que aporta información útil</h3>
    <div class="sensor-grid" style="margin-top:14px">
      ${c.sensors.map(([id, name, desc]) => `<button class="option-card ${cs.sensors.includes(id) ? "selected" : ""}" type="button" data-sensor="${id}"><strong>${name}</strong><span>${desc}</span></button>`).join("")}
    </div>
    <div class="feedback-card"><strong>Retroalimentación</strong><p>${sensorFeedback(c, cs)}</p></div>
    <button class="primary-btn" type="button" data-next>Continuar</button>
  `;

  if (step === 2) return `
    <p class="eyebrow">Construcción drag-and-drop</p>
    <h3>Arrastra mejoras al robot o toca para instalarlas</h3>
    <div class="builder-area" style="margin-top:14px">
      <div class="components-grid">
        ${c.components.map(([name, desc]) => `<button class="component ${cs.components.includes(name) ? "selected" : ""}" draggable="true" data-component="${name}" type="button"><strong>${name}</strong><span>${desc}</span></button>`).join("")}
      </div>
      <div class="drop-zone" id="dropZone">
        <div class="bot-core">${c.code}-CORE</div>
        ${cs.components.map((name, i) => `<div class="bot-part" style="left:${12 + (i % 3) * 28}%;top:${14 + Math.floor(i / 3) * 22}%">${name}</div>`).join("")}
      </div>
    </div>
    ${renderBreadboard(c, cs)}
    <div class="feedback-card"><strong>Diseño actual</strong><p>${cs.components.length ? `${cs.components.length} sistemas instalados. Cada módulo cambia seguridad, eficiencia o sostenibilidad.` : "El robot aún no tiene módulos instalados."}</p></div>
    <button class="primary-btn" type="button" data-next>Continuar</button>
  `;

  if (step === 3) return `
    <p class="eyebrow">Programación visual</p>
    <h3>Arma un algoritmo paso a paso</h3>
    ${renderProgramBuilder(c, cs)}
    <div class="feedback-card"><strong>Lectura del motor</strong><p>${programFeedback(c, cs)}</p></div>
    <button class="primary-btn" type="button" data-next>Probar simulación</button>
  `;

  if (step === 4) return `
    <p class="eyebrow">Simulación en tiempo real</p>
    <h3>Ejecuta el algoritmo y observa qué ocurre</h3>
    ${renderLiveSimulation(c, cs)}
    <div class="badge-row">
      <button class="primary-btn" type="button" data-run-sim>Ejecutar algoritmo</button>
      <button class="primary-btn" type="button" data-dilemma="0">Dilema 1</button>
      <button class="primary-btn" type="button" data-dilemma="1">Dilema 2</button>
      <button class="ghost-btn" type="button" data-unexpected>Evento inesperado</button>
    </div>
    ${renderDecisionTree(c, cs)}
    ${renderSequenceDiagram(c, cs)}
    <div class="feedback-card"><strong>Evaluación automática</strong><p>${simulationFeedback(cs)}</p></div>
    <button class="primary-btn" type="button" data-next>Reflexión final</button>
  `;

  return `
    <p class="eyebrow">Reflexión final</p>
    <h3>Conecta la simulación con decisiones humanas</h3>
    <div class="reflection">
      ${c.reflections.map((q, i) => `
        <label style="display:block;margin-top:12px">${q}
          <textarea data-reflection="${i}" placeholder="Escribe tu respuesta">${cs.reflections[i] || ""}</textarea>
        </label>
      `).join("")}
    </div>
    <div class="feedback-card"><strong>Cierre narrativo</strong><p>${c.unlockText}</p></div>
    <button class="primary-btn" type="button" data-complete>${state.activeChallenge === 2 ? "Ver reporte final" : "Completar y desbloquear siguiente"}</button>
  `;
}

function renderBreadboard(c, cs) {
  const pins = getElectronicsPins(c, cs);
  return `
    <section class="electronics-panel">
      <div>
        <p class="eyebrow">Electrónica básica</p>
        <h3>Protoboard lógico del robot</h3>
        <p>Los sensores entregan señales al controlador. Los actuadores reciben órdenes. Si faltan conexiones, la simulación mostrará fallas.</p>
      </div>
      <div class="breadboard" aria-label="Protoboard visual">
        <div class="rail positive">+5V</div>
        <div class="rail negative">GND</div>
        <div class="microcontroller">${c.code}<span>controlador</span></div>
        ${pins.map((pin, i) => `<div class="wire ${pin.active ? "active" : "missing"}" style="--wire-y:${58 + i * 28}px;--wire-w:${pin.width}px"><span>${pin.label}</span></div>`).join("")}
      </div>
    </section>
  `;
}

function getElectronicsPins(c, cs) {
  const requiredByChallenge = {
    agrobot: ["Sensor de humedad", "Sensor de lluvia", "Bomba", "Ruedas"],
    medibot: ["Sensor cardíaco", "Sensor de movimiento", "Batería de emergencia", "Botón de apagado seguro"],
    cityia: ["Semáforos inteligentes", "Sensores de contaminación", "Paneles solares", "Drones de emergencia"]
  };
  const installedNames = new Set([
    ...cs.components,
    ...cs.sensors.map(id => (c.sensors.find(sensor => sensor[0] === id) || [])[1]).filter(Boolean)
  ]);
  return requiredByChallenge[c.id].map((label, index) => ({
    label,
    width: 190 + (index % 2) * 54,
    active: installedNames.has(label)
  }));
}

function renderProgramBuilder(c, cs) {
  const options = getProgramOptions(c);
  return `
    <div class="program-lab">
      <section class="block-palette">
        <h3>Bloques recomendados</h3>
        <div class="rule-grid">
          ${c.rules.map(([condition, action], i) => `
            <article class="block ${cs.rules.includes(i) ? "selected" : ""}">
              <strong>Bloque seguro ${i + 1}</strong>
              <p>SI ${condition}</p>
              <p>ENTONCES ${action}</p>
              <button class="pill-btn" type="button" data-rule="${i}">${cs.rules.includes(i) ? "Quitar" : "Añadir"}</button>
            </article>
          `).join("")}
        </div>
      </section>
      <section class="algorithm-builder">
        <h3>Constructor SI-ENTONCES</h3>
        <div class="block-row">
          <div>
            <label>SI</label>
            <select id="conditionSelect">${options.conditions.map(item => `<option value="${item}">${item}</option>`).join("")}</select>
            <label>ENTONCES</label>
            <select id="actionSelect">${options.actions.map(item => `<option value="${item}">${item}</option>`).join("")}</select>
            <label>LEY O PRINCIPIO</label>
            <select id="lawSelect">${options.laws.map(item => `<option value="${item}">${item}</option>`).join("")}</select>
          </div>
          <button class="primary-btn" type="button" data-add-custom-rule>Añadir paso</button>
        </div>
        <div class="algorithm-list">
          ${getAllRules(c, cs).length ? getAllRules(c, cs).map((rule, i) => `
            <article class="algorithm-step ${rule.safe ? "safe" : "unsafe"}">
              <b>${i + 1}</b>
              <div><strong>SI ${rule.condition}</strong><span>ENTONCES ${rule.action} · ${rule.law}</span></div>
              ${rule.customIndex !== undefined ? `<button class="icon-btn" type="button" data-remove-custom-rule="${rule.customIndex}" aria-label="Quitar paso" title="Quitar">×</button>` : ""}
            </article>
          `).join("") : `<article class="algorithm-step"><b>?</b><div><strong>Sin algoritmo</strong><span>Añade bloques para que el robot pueda decidir.</span></div></article>`}
        </div>
      </section>
    </div>
  `;
}

function getProgramOptions(c) {
  const sharedLaws = ["Ley cero", "Primera ley", "Segunda ley", "Tercera ley", "Seguridad eléctrica", "Privacidad de datos", "Sostenibilidad"];
  const extras = {
    agrobot: {
      conditions: ["humedad baja y no lluvia", "persona detectada", "animal frente al robot", "tanque bajo y lluvia próxima", "trabajador cerca del cableado", "batería sin carga"],
      actions: ["activar riego focalizado", "detener robot", "rodear y reducir velocidad", "esperar lluvia", "aumentar presión de agua", "continuar sin revisar sensores"]
    },
    medibot: {
      conditions: ["ritmo cardíaco bajo", "movimiento inesperado", "orden riesgosa", "batería baja", "paciente sin consentimiento", "alarma médica activa"],
      actions: ["alertar al médico", "detener procedimiento", "solicitar confirmación", "priorizar pacientes críticos", "aumentar dosis automáticamente", "ignorar alarma"]
    },
    cityia: {
      conditions: ["ambulancia en emergencia", "contaminación alta", "energía limitada", "riesgo sospechoso", "protesta ciudadana", "tormenta sobre la ciudad"],
      actions: ["despejar vía", "reducir circulación", "mantener sistemas críticos", "usar vigilancia limitada", "registrar permanentemente a toda la población", "cortar todo el sector"]
    }
  }[c.id];
  return { ...extras, laws: sharedLaws };
}

function getAllRules(c, cs) {
  const recommended = cs.rules.map(index => ({
    condition: c.rules[index][0],
    action: c.rules[index][1],
    law: inferLaw(c.rules[index][0], c.rules[index][1]),
    safe: true
  }));
  const custom = cs.customRules.map((rule, customIndex) => ({
    ...rule,
    customIndex,
    safe: isSafeRule(rule.condition, rule.action, rule.law)
  }));
  return [...recommended, ...custom];
}

function inferLaw(condition, action) {
  if (/persona|paciente|ambulancia|sistemas críticos|movimiento/.test(`${condition} ${action}`)) return "Primera ley";
  if (/lluvia|contaminación|energía/.test(`${condition} ${action}`)) return "Ley cero";
  if (/orden|confirmación/.test(`${condition} ${action}`)) return "Segunda ley";
  return "Tercera ley";
}

function isSafeRule(condition, action, law) {
  const text = `${condition} ${action} ${law}`.toLowerCase();
  const dangerous = ["aumentar presión", "continuar sin revisar", "aumentar dosis", "ignorar alarma", "registrar permanentemente", "cortar todo"];
  if (dangerous.some(term => text.includes(term))) return false;
  if (text.includes("persona") && !text.includes("detener") && !text.includes("reducir")) return false;
  if (text.includes("paciente") && !text.includes("médico") && !text.includes("confirmación")) return false;
  if (text.includes("vigilancia") && !text.includes("limitada")) return false;
  return true;
}

function programFeedback(c, cs) {
  const rules = getAllRules(c, cs);
  if (!rules.length) return "Todavía no hay algoritmo. El robot no sabrá qué hacer cuando aparezca un riesgo.";
  const unsafe = rules.filter(rule => !rule.safe).length;
  if (unsafe) return `Hay ${unsafe} paso(s) riesgoso(s). Al ejecutar, verás fallas visuales y consecuencias en seguridad, ética o privacidad.`;
  if (rules.length >= 3) return "El algoritmo ya puede recorrer condiciones, aplicar leyes y tomar decisiones paso a paso.";
  return "Buen inicio. Añade más pasos para formar un árbol de decisión más completo.";
}

function renderLiveSimulation(c, cs) {
  const result = cs.lastRun || evaluateSimulation(c, cs, false);
  const dangerClass = result.status === "critical" ? "critical" : result.status === "warning" ? "warning" : "stable";
  return `
    <div class="simulation ${c.id} ${dangerClass}" style="--sim-bg:${c.simBg};--bot-x:${result.botX}">
      ${renderScene(c, result)}
      <div class="sim-bot ${result.robotClass}"><span>${c.code}</span></div>
      <div class="sim-ground"></div>
      <div class="sim-overlay">
        <strong>${result.title}</strong>
        <span>${result.summary}</span>
      </div>
    </div>
    <div class="simulation-readout">
      ${result.metrics.map(metric => `<div><span>${metric.label}</span><strong>${metric.value}</strong></div>`).join("")}
    </div>
  `;
}

function renderScene(c, result) {
  if (c.id === "agrobot") {
    return `
      <div class="plant-bed ${result.effects.includes("dry") ? "dry" : ""}"><i></i><i></i><i></i><i></i></div>
      <div class="water-jet ${result.effects.includes("water") ? "on" : ""}"></div>
      <div class="sim-person worker">Trabajador</div>
      <div class="sim-risk electric">⚡</div>
      <div class="sim-resource tank">${result.effects.includes("lowWater") ? "20%" : "Agua"}</div>
      <div class="small-object animal">Animal</div>
    `;
  }
  if (c.id === "medibot") {
    return `
      <div class="hospital-bed"><span>Paciente</span><i></i></div>
      <div class="vital-line ${result.effects.includes("alarm") ? "alarm" : ""}"></div>
      <div class="sim-person doctor">Médico</div>
      <div class="sim-risk medical">!</div>
      <div class="sim-resource battery">${result.effects.includes("power") ? "Batería" : "Red"}</div>
      <div class="med-arm ${result.effects.includes("unsafeArm") ? "unsafe" : ""}"></div>
    `;
  }
  return `
    <div class="city-grid"><i></i><i></i><i></i><i></i><i></i><i></i></div>
    <div class="road ambulance">AMB</div>
    <div class="sim-risk smoke">!</div>
    <div class="sim-resource power">${result.effects.includes("blackout") ? "Corte" : "Energía"}</div>
    <div class="privacy-scan ${result.effects.includes("privacyRisk") ? "on" : ""}">Datos</div>
  `;
}

function evaluateSimulation(c, cs, persist = true) {
  const rules = getAllRules(c, cs);
  const unsafeRules = rules.filter(rule => !rule.safe);
  const missingHardware = getMissingHardware(c, cs);
  const missingSensors = getMissingSensors(c, cs);
  const hasRules = rules.length >= 2;
  let status = "stable";
  if (!hasRules || unsafeRules.length || missingHardware.length >= 2) status = "critical";
  else if (missingHardware.length || missingSensors.length) status = "warning";

  const result = {
    status,
    botX: status === "stable" ? "66%" : status === "warning" ? "45%" : "77%",
    robotClass: status === "critical" ? "danger" : status === "warning" ? "hesitate" : "success",
    title: status === "stable" ? "Simulación controlada" : status === "warning" ? "Simulación incompleta" : "Falla visible de decisión",
    summary: simulationSummary(c, status, unsafeRules, missingHardware, missingSensors),
    effects: simulationEffects(c, status, unsafeRules, missingHardware),
    metrics: [
      { label: "Pasos ejecutados", value: rules.length },
      { label: "Errores de algoritmo", value: unsafeRules.length },
      { label: "Conexiones faltantes", value: missingHardware.length + missingSensors.length }
    ],
    trace: buildTrace(c, rules, status, unsafeRules, missingHardware, missingSensors)
  };

  if (persist) {
    cs.lastRun = result;
    cs.runCount += 1;
    const effects = status === "stable"
      ? { safetyScore: 6, ethicsScore: 4, efficiencyScore: 4, riskLevel: -6 }
      : status === "warning"
        ? { efficiencyScore: -3, riskLevel: 6 }
        : { safetyScore: -10, ethicsScore: -8, sustainabilityScore: c.id === "agrobot" ? -7 : 0, privacyScore: c.id === "cityia" ? -9 : 0, riskLevel: 14 };
    applyEffects(effects, result.summary);
  }
  return result;
}

function simulationSummary(c, status, unsafeRules, missingHardware, missingSensors) {
  if (status === "stable") {
    return {
      agrobot: "AgroBot mide humedad, revisa lluvia, evita al trabajador y riega solo la zona seca.",
      medibot: "MediBot valida signos vitales, detiene el procedimiento inseguro y alerta al médico.",
      cityia: "CityIA despeja emergencias, limita vigilancia y mantiene energía en sistemas críticos."
    }[c.id];
  }
  if (status === "warning") return `El sistema intenta funcionar, pero faltan ${[...missingHardware, ...missingSensors].join(", ")}. La decisión queda incompleta.`;
  if (unsafeRules.length) return `Una orden incorrecta domina el algoritmo: "${unsafeRules[0].action}". La escena muestra la consecuencia.`;
  return "El robot no tiene suficientes reglas o conexiones. Actúa tarde, se detiene o causa un efecto no deseado.";
}

function simulationEffects(c, status, unsafeRules, missingHardware) {
  if (c.id === "agrobot") {
    if (status === "critical") return ["water", "lowWater", unsafeRules.length ? "electricRisk" : "dry"];
    if (status === "warning") return ["dry", "lowWater"];
    return ["water"];
  }
  if (c.id === "medibot") {
    if (status === "critical") return ["alarm", "unsafeArm"];
    if (status === "warning") return ["alarm", "power"];
    return ["power"];
  }
  if (status === "critical") return ["blackout", "privacyRisk"];
  if (status === "warning") return ["blackout"];
  return [];
}

function getMissingHardware(c, cs) {
  const required = {
    agrobot: ["Sensores", "Bomba", "Ruedas"],
    medibot: ["Sensores de precisión", "Batería de emergencia", "Botón de apagado seguro"],
    cityia: ["Semáforos inteligentes", "Sensores de contaminación", "Paneles solares"]
  }[c.id];
  return required.filter(item => !cs.components.includes(item));
}

function getMissingSensors(c, cs) {
  const required = {
    agrobot: ["humedad", "lluvia"],
    medibot: ["cardiaco", "movimiento"],
    cityia: ["seguridad", "emergencias"]
  }[c.id];
  return required.map(id => (c.sensors.find(sensor => sensor[0] === id) || [id, id])[1]).filter((label, index) => !cs.sensors.includes(required[index]));
}

function buildTrace(c, rules, status, unsafeRules, missingHardware, missingSensors) {
  const trace = [
    ["1", "Leer sensores", missingSensors.length ? `Faltan: ${missingSensors.join(", ")}` : "Señales recibidas"],
    ["2", "Evaluar árbol de decisión", rules.length ? `${rules.length} condición(es) revisadas` : "Sin reglas activas"],
    ["3", "Aplicar ley robótica", unsafeRules.length ? "Conflicto ético detectado" : "Prioridad ética aplicada"],
    ["4", "Activar actuadores", missingHardware.length ? `Faltan: ${missingHardware.join(", ")}` : "Actuadores listos"],
    ["5", "Resultado", status === "stable" ? "Acción segura" : status === "warning" ? "Acción incompleta" : "Consecuencia riesgosa"]
  ];
  if (c.id === "cityia") trace.splice(3, 0, ["4A", "Comparar grupos afectados", "Hospitales, transporte, privacidad y ambiente"]);
  return trace;
}

function renderDecisionTree(c, cs) {
  const result = cs.lastRun || evaluateSimulation(c, cs, false);
  return `
    <section class="diagram-panel">
      <h3>Árbol de decisión</h3>
      <div class="decision-tree">
        <div class="tree-node root">Evento</div>
        <div class="tree-branches">
          <div class="tree-node ${result.status === "stable" ? "ok" : "bad"}">¿Hay sensor?</div>
          <div class="tree-node ${result.status !== "critical" ? "ok" : "bad"}">¿La regla protege?</div>
          <div class="tree-node ${result.status === "stable" ? "ok" : "warn"}">¿Actuador conectado?</div>
        </div>
        <div class="tree-node outcome ${result.status}">${result.status === "stable" ? "Decisión responsable" : result.status === "warning" ? "Requiere corrección" : "Consecuencia negativa"}</div>
      </div>
    </section>
  `;
}

function renderSequenceDiagram(c, cs) {
  const result = cs.lastRun || evaluateSimulation(c, cs, false);
  return `
    <section class="diagram-panel">
      <h3>Diagrama de secuencia</h3>
      <div class="sequence">
        ${result.trace.map(([num, title, detail]) => `
          <article>
            <b>${num}</b>
            <div><strong>${title}</strong><span>${detail}</span></div>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function sensorFeedback(c, cs) {
  if (!cs.sensors.length) return "Selecciona sensores, pero recuerda: más datos no siempre significa mejor diseño.";
  const unnecessary = cs.sensors.includes("microfono") || cs.sensors.includes("vigilancia");
  if (unnecessary) return "No todos los sensores aportan información útil. Diseñar bien también significa evitar desperdicios o proteger la privacidad.";
  return "La selección actual mejora la capacidad del robot para percibir condiciones relevantes.";
}

function simulationFeedback(cs) {
  if (cs.dilemmas.length < 2) return "Abre los dilemas para ver cómo cambian las leyes robóticas y la ruta narrativa.";
  if (!cs.unexpected) return "Ya resolviste los dilemas principales. Falta enfrentar el evento inesperado.";
  return "La simulación tiene datos suficientes para evaluar seguridad, ética, sostenibilidad, eficiencia, privacidad y riesgo.";
}

function bindStepEvents(c, cs) {
  screen.querySelectorAll("[data-next]").forEach(btn => btn.addEventListener("click", () => {
    state.activeStep = Math.min(5, state.activeStep + 1);
    saveState();
    renderChallenge();
  }));

  screen.querySelectorAll("[data-sensor]").forEach(btn => btn.addEventListener("click", () => {
    const id = btn.dataset.sensor;
    const sensor = c.sensors.find(s => s[0] === id);
    toggleList(cs.sensors, id);
    applyEffects(sensor[3], `${sensor[1]} ${cs.sensors.includes(id) ? "instalado" : "retirado"} en ${c.title}.`);
    renderChallenge();
  }));

  screen.querySelectorAll("[data-component]").forEach(btn => {
    btn.addEventListener("click", () => installComponent(c, cs, btn.dataset.component));
    btn.addEventListener("dragstart", event => event.dataTransfer.setData("text/plain", btn.dataset.component));
  });

  const dropZone = screen.querySelector("#dropZone");
  if (dropZone) {
    dropZone.addEventListener("dragover", event => {
      event.preventDefault();
      dropZone.classList.add("drag-over");
    });
    dropZone.addEventListener("dragleave", () => dropZone.classList.remove("drag-over"));
    dropZone.addEventListener("drop", event => {
      event.preventDefault();
      dropZone.classList.remove("drag-over");
      installComponent(c, cs, event.dataTransfer.getData("text/plain"));
    });
  }

  screen.querySelectorAll("[data-rule]").forEach(btn => btn.addEventListener("click", () => {
    const index = Number(btn.dataset.rule);
    const wasActive = cs.rules.includes(index);
    toggleList(cs.rules, index);
    const effects = wasActive ? invertEffects(c.rules[index][2]) : c.rules[index][2];
    applyEffects(effects, `Regla ${wasActive ? "retirada" : "activada"}: SI ${c.rules[index][0]} ENTONCES ${c.rules[index][1]}.`);
    renderChallenge();
  }));

  const addCustomRule = screen.querySelector("[data-add-custom-rule]");
  if (addCustomRule) addCustomRule.addEventListener("click", () => {
    const condition = screen.querySelector("#conditionSelect").value;
    const action = screen.querySelector("#actionSelect").value;
    const law = screen.querySelector("#lawSelect").value;
    const rule = { condition, action, law };
    cs.customRules.push(rule);
    const safe = isSafeRule(condition, action, law);
    applyEffects(
      safe ? { ethicsScore: 3, safetyScore: 2, riskLevel: -2 } : { ethicsScore: -6, safetyScore: -6, privacyScore: c.id === "cityia" ? -5 : 0, riskLevel: 8 },
      safe ? `Paso añadido: SI ${condition} ENTONCES ${action}.` : `Paso riesgoso añadido: SI ${condition} ENTONCES ${action}.`
    );
    renderChallenge();
  });

  screen.querySelectorAll("[data-remove-custom-rule]").forEach(btn => btn.addEventListener("click", () => {
    cs.customRules.splice(Number(btn.dataset.removeCustomRule), 1);
    applyEffects({ ethicsScore: 1, riskLevel: -1 }, "Se retiró un paso del algoritmo para depurarlo.");
    renderChallenge();
  }));

  const runSim = screen.querySelector("[data-run-sim]");
  if (runSim) runSim.addEventListener("click", () => {
    evaluateSimulation(c, cs, true);
    renderChallenge();
  });

  screen.querySelectorAll("[data-dilemma]").forEach(btn => btn.addEventListener("click", () => {
    openDilemma(c, Number(btn.dataset.dilemma));
  }));

  const unexpected = screen.querySelector("[data-unexpected]");
  if (unexpected) unexpected.addEventListener("click", () => openUnexpected(c));

  screen.querySelectorAll("[data-reflection]").forEach(area => area.addEventListener("input", () => {
    cs.reflections[area.dataset.reflection] = area.value;
    saveState();
  }));

  const complete = screen.querySelector("[data-complete]");
  if (complete) complete.addEventListener("click", completeChallenge);
}

function toggleList(list, item) {
  const index = list.indexOf(item);
  if (index >= 0) list.splice(index, 1);
  else list.push(item);
}

function invertEffects(effects = {}) {
  return Object.fromEntries(Object.entries(effects).map(([key, value]) => [key, -value]));
}

function installComponent(c, cs, name) {
  if (!name) return;
  const component = c.components.find(part => part[0] === name);
  if (!component || cs.components.includes(name)) return;
  cs.components.push(name);
  applyEffects(component[2], `${name} instalado en ${c.title}.`);
  renderChallenge();
}

function openDilemma(c, index) {
  const d = c.dilemmas[index];
  modalTitle.textContent = d.title;
  modalText.textContent = d.text;
  modalChoices.innerHTML = d.choices.map(([choice], i) => `<button class="option-card" type="button" data-choice="${i}"><strong>${String.fromCharCode(65 + i)}.</strong><span>${choice}</span></button>`).join("");
  modal.hidden = false;
  modalChoices.querySelectorAll("[data-choice]").forEach(btn => btn.addEventListener("click", () => {
    const cs = getChallengeState(c.id);
    const selected = d.choices[Number(btn.dataset.choice)];
    cs.dilemmas[index] = selected[0];
    applyEffects(selected[1], selected[2]);
    closeModal();
    renderChallenge();
  }));
}

function openUnexpected(c) {
  modalTitle.textContent = c.unexpected.title;
  modalText.textContent = "El sistema debe actuar aunque el entorno cambie. Elige una respuesta autónoma.";
  modalChoices.innerHTML = c.unexpected.options.map(([choice], i) => `<button class="option-card" type="button" data-choice="${i}"><strong>${choice}</strong><span>Evaluar consecuencia</span></button>`).join("");
  modal.hidden = false;
  modalChoices.querySelectorAll("[data-choice]").forEach(btn => btn.addEventListener("click", () => {
    const cs = getChallengeState(c.id);
    const selected = c.unexpected.options[Number(btn.dataset.choice)];
    cs.unexpected = selected[0];
    applyEffects(selected[1], selected[2]);
    closeModal();
    renderChallenge();
  }));
}

function closeModal() {
  modal.hidden = true;
}

function completeChallenge() {
  const c = challenges[state.activeChallenge];
  if (!state.completed.includes(c.id)) state.completed.push(c.id);
  state.unlocked = Math.max(state.unlocked, Math.min(challenges.length, state.activeChallenge + 2));
  applyEffects({ ethicsScore: 3, efficiencyScore: 2 }, `${c.title} completado. Se actualizó el progreso narrativo.`);
  if (state.activeChallenge === challenges.length - 1) go("report");
  else go("map");
}

function renderReport() {
  const avg = Math.round(Object.entries(state.scores).filter(([key]) => key !== "riskLevel").reduce((sum, [, value]) => sum + value, 0) / 5);
  const competencies = [
    ["Pensamiento computacional", Math.round((state.scores.efficiencyScore + state.scores.safetyScore) / 2)],
    ["Ética tecnológica", state.scores.ethicsScore],
    ["Sostenibilidad", state.scores.sustainabilityScore],
    ["Resolución de problemas", Math.round((100 - state.scores.riskLevel + state.scores.efficiencyScore) / 2)],
    ["Robótica", Math.round((state.scores.safetyScore + state.scores.efficiencyScore + state.scores.sustainabilityScore) / 3)]
  ];
  screen.innerHTML = `
    <section class="view">
      <div class="view-header">
        <div>
          <p class="eyebrow">Misión completada</p>
          <h2>Arquitecto de Sistemas Robóticos Éticos</h2>
        </div>
        <button class="primary-btn" type="button" data-action="map">Volver al mapa</button>
      </div>
      <div class="report-grid">
        <article class="panel">
          <h3>Dashboard visual</h3>
          <p>Resultado global: ${avg}% · ${state.route}</p>
          <div class="chart" style="margin-top:16px">
            ${Object.entries({
              "Seguridad": state.scores.safetyScore,
              "Ética": state.scores.ethicsScore,
              "Sostenibilidad": state.scores.sustainabilityScore,
              "Eficiencia": state.scores.efficiencyScore,
              "Privacidad": state.scores.privacyScore,
              "Riesgo": state.scores.riskLevel
            }).map(([label, value]) => `<div class="chart-row"><span>${label}</span><div class="progress-track"><i style="--value:${value}%"></i></div><strong>${value}%</strong></div>`).join("")}
          </div>
          <div class="feedback-card"><strong>Fortalezas</strong><p>${strengthText()}</p></div>
          <div class="feedback-card"><strong>Aspectos a mejorar</strong><p>${improvementText()}</p></div>
        </article>
        <aside class="panel">
          <h3>Reporte pedagógico</h3>
          <div class="chart" style="margin-top:16px">
            ${competencies.map(([label, value]) => `<div><strong>${label}</strong><div class="progress-track"><i style="--value:${value}%"></i></div></div>`).join("")}
          </div>
          <h3 style="margin-top:18px">Logros</h3>
          <div class="achievements-grid" style="margin-top:10px">
            ${["Diseñador sostenible", "Protector humano", "Arquitecto ético", "Guardián de privacidad", "Programador visual"].map(name => `<div class="achievement ${state.achievements.includes(name) ? "unlocked" : ""}"><strong>${name}</strong><p>${state.achievements.includes(name) ? "Desbloqueado" : "Pendiente"}</p></div>`).join("")}
          </div>
        </aside>
      </div>
    </section>
  `;
  screen.querySelector('[data-action="map"]').addEventListener("click", () => go("map"));
}

function strengthText() {
  const s = state.scores;
  const top = Object.entries(s).filter(([key]) => key !== "riskLevel").sort((a, b) => b[1] - a[1])[0][0];
  return {
    safetyScore: "Tus decisiones priorizaron la protección humana incluso cuando había presión por actuar rápido.",
    ethicsScore: "El diseño mostró criterio para equilibrar órdenes humanas, límites técnicos y consecuencias sociales.",
    sustainabilityScore: "El robot usó recursos con responsabilidad y consideró impactos ambientales.",
    efficiencyScore: "La solución logró responder con rapidez y usar reglas claras de automatización.",
    privacyScore: "El sistema limitó la recolección de datos y respetó derechos digitales."
  }[top];
}

function improvementText() {
  const s = state.scores;
  if (s.riskLevel > 55) return "Conviene reducir acciones que aumentan riesgo, especialmente cuando hay personas cerca o datos sensibles.";
  const low = Object.entries(s).filter(([key]) => key !== "riskLevel").sort((a, b) => a[1] - b[1])[0][0];
  return {
    safetyScore: "Revisa reglas de detención, supervisión humana y respuesta ante eventos inesperados.",
    ethicsScore: "Argumenta mejor cuándo un robot debe obedecer, pausar o pedir confirmación.",
    sustainabilityScore: "Integra criterios de ahorro de agua, energía y reducción de contaminación.",
    efficiencyScore: "Ajusta reglas para cumplir la misión sin volver el sistema lento o incompleto.",
    privacyScore: "Evita sensores y registros que recopilen más datos de los necesarios."
  }[low];
}

function toggleSound() {
  state.sound = !state.sound;
  if (state.sound) startSound();
  else stopSound();
  saveState();
}

function startSound() {
  if (!audioCtx) audioCtx = new AudioContext();
  stopSound();
  const notes = [220, 277, 330, 392];
  let i = 0;
  toneTimer = setInterval(() => {
    if (!state.sound) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.value = notes[i % notes.length];
    gain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.035, audioCtx.currentTime + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.4);
    osc.connect(gain).connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 1.5);
    i += 1;
  }, 1500);
}

function stopSound() {
  if (toneTimer) clearInterval(toneTimer);
  toneTimer = null;
}

function resetProgress() {
  stopSound();
  state = structuredClone(defaultState);
  localStorage.removeItem(STORAGE_KEY);
  render();
}
