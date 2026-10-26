
import RobotScene from './components/RobotScene';
import './App.css';

const projects = [
  {
    number: '01',
    category: 'DESARROLLO WEB',
    title: 'Modo oscuro',
    description:
      'Interfaz web con una experiencia visual adaptada al modo oscuro.',
    link: 'https://github.com/mafegiraldoduque/web-development-dark-mode',
    label: 'Ver proyecto',
  },
  {
    number: '02',
    category: 'DESARROLLO DE SOFTWARE',
    title: 'Biblioteca',
    description:
      'Proyecto de software enfocado en la organización y gestión de una biblioteca.',
    link: 'https://github.com/mafegiraldoduque/biblioteca',
    label: 'Ver proyecto',
  },
  {
    number: '03',
    category: 'APLICACIÓN WEB',
    title: 'Finanzas personales',
    description:
      'Proyecto orientado a la gestión y organización de información financiera.',
    link: 'https://github.com/jsav2003/rodando-seguro-web/tree/main/finanzas',
    label: 'Ver proyecto',
  },
  {
    number: '04',
    category: 'REACT',
    title: 'Tic tac toe',
    description:
      'Juego interactivo desarrollado para practicar programación con React.',
    link: 'https://github.com/mafegiraldoduque/Tic-tac-toe-react',
    label: 'Ver proyecto',
  },
];

function App() {
  return (
    <main className="portfolio" id="inicio">
      <nav className="navbar">
        <a className="brand" href="#inicio">
          MF<span>.</span>
        </a>

        <div className="nav-links">
          <a href="#inicio">Inicio</a>
          <a href="#sobre-mi">Sobre mí</a>
          <a href="#proyectos">Proyectos</a>
        </div>

        <a className="nav-cta" href="#proyectos">
          Ver proyectos <span>↗</span>
        </a>
      </nav>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="status-dot" />
            PORTAFOLIO PERSONAL · 2026
          </p>

          <h1>
            MARÍA
            <br />
            FERNANDA<span className="hero-period">.</span>
          </h1>

          <h2 className="hero-subtitle">
            Tecnología, creatividad e innovación.
          </h2>

          <p className="hero-description">
            Estudiante de Ingeniería de Sistemas, explorando nuevas formas
            de transformar ideas en soluciones digitales.
          </p>

          <div className="hero-actions">
            <a className="primary-button" href="#proyectos">
              Explorar proyectos <span>↗</span>
            </a>
            <a className="secondary-button" href="#sobre-mi">
              Conóceme
            </a>
          </div>

          <div className="hero-meta">
            <span>INGENIERÍA DE SISTEMAS</span>
            <span>DISEÑO · DESARROLLO · INNOVACIÓN</span>
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-top">
            <span>EXPERIENCIA INTERACTIVA</span>
            <span>01 / 03</span>
          </div>

          <div className="orb orb-one" />
          <div className="orb orb-two" />

          <RobotScene />

          <div className="visual-bottom">
            <span>OBJETO DIGITAL Nº 001</span>
            <span>ARRASTRA PARA EXPLORAR ↗</span>
          </div>
        </div>

        <div className="side-year">M · F — 2026</div>

        <div className="side-social">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
          </a>
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn ↗
          </a>
        </div>
      </section>

      <section className="about-section" id="sobre-mi">
        <p className="eyebrow">01 — SOBRE MÍ</p>

        <h2>
          Aprender, crear y convertir ideas en realidad.
        </h2>

        <div className="about-content">
          <p>
            Soy estudiante de Ingeniería de Sistemas, con interés en el
            desarrollo de software, la inteligencia artificial y la
            innovación tecnológica.
          </p>

          <p>
            Disfruto aprender nuevas tecnologías, resolver problemas y
            convertir ideas en proyectos funcionales. A través de mis
            proyectos académicos y personales, busco fortalecer mis
            habilidades en programación, explorar soluciones innovadoras
            y construir una base sólida para mi crecimiento profesional.
          </p>

          <p>
            Mi objetivo es seguir desarrollándome como profesional de la
            tecnología, participar en proyectos que generen valor y, en
            el futuro, crear soluciones y emprendimientos propios.
          </p>
        </div>
      </section>

      <section className="projects-section" id="proyectos">
        <div className="projects-heading">
          <div>
            <p className="eyebrow">02 — SELECCIÓN DE TRABAJO</p>
            <h2>Ideas que merecen tomar forma.</h2>
          </div>

          <span className="projects-count">04 PROYECTOS</span>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.number}>
              <div className="project-card-top">
                <span className="project-number">{project.number}</span>
                <span className="project-category">
                  {project.category}
                </span>
              </div>

              <h3>{project.title}</h3>
              <p className="project-description">
                {project.description}
              </p>

              <a
                className="project-link"
                href={project.link}
                target="_blank"
                rel="noreferrer"
              >
                {project.label} <span>↗</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      <footer className="site-footer">
        <a className="brand" href="#inicio">
          MF<span>.</span>
        </a>

        <span>Diseñado con intención · 2026</span>

        <a href="mailto:tu-correo@ejemplo.com">
          Hablemos ↗
        </a>
      </footer>
    </main>
  );
}

export default App;
