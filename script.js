const risks = {
  1: { type: 'Riesgo de Seguridad', title: 'Electrico', text: 'Dejar un cable electrico por fuera de un tubo o sin proteccion en la pared representa un riesgo de seguridad. El cable puede sufrir danos mecanicos o contacto con humedad y provocar cortocircuitos, descargas electricas o incendios. Debe canalizarse y protegerse mediante una instalacion electrica segura y certificada.', level: 'Alto', lc: 'high' },
  2: { type: 'Riesgo Biomecanico', title: 'Manipulacion manual de cargas', text: 'Este riesgo aplica al personal que organiza mancuernas y discos, y tambien a quienes levantan pesos durante los ejercicios. Una mala postura, una carga excesiva o un movimiento brusco puede causar lesiones musculoesqueleticas graves. Se recomienda levantar con tecnica correcta, flexionar las rodillas y pedir ayuda cuando sea necesario.', level: 'Alto', lc: 'high' },
  3: { type: 'Riesgo Psicosocial', title: 'Organizacion del trabajo', text: 'Una sola persona puede estar encargada de atender la recepcion, instruir a los usuarios sobre rutinas y ejercicios y atender la tienda de snacks. Esta sobrecarga de funciones puede generar estres cronico, fatiga mental y errores en la atencion. Conviene distribuir las funciones claramente y establecer pausas activas y apoyos durante la jornada.', level: 'Medio', lc: 'medium' },
  4: { type: 'Riesgo Quimico', title: 'Polvos organicos e inorganicos', text: 'El extintor por si mismo no representa un riesgo en condiciones normales; sin embargo, su uso inadecuado o accidental puede liberar polvo quimico seco que causa irritacion en ojos, piel o vias respiratorias. Debe utilizarse unicamente en caso de emergencia real, siguiendo las instrucciones del fabricante y garantizando ventilacion posterior del area.', level: 'Bajo', lc: 'low' },
  5: { type: 'Riesgo Biologico', title: 'Hongos, virus y bacterias', text: 'El sudor y el contacto directo que quedan en bancos, mancuernas y superficies puede facilitar la transmision de hongos, virus y bacterias entre los usuarios. Es fundamental limpiar y desinfectar los equipos despues de cada uso, mantener una buena higiene de manos y cubrir heridas abiertas durante el entrenamiento.', level: 'Alto', lc: 'high' },
  6: { type: 'Riesgo Fisico', title: 'Ruido', text: 'El volumen elevado de musica durante las clases grupales (spinning, aerobicos) puede producir fatiga auditiva, dolor de cabeza o perdida gradual de la audicion a largo plazo. Se debe controlar el nivel sonoro por debajo de 85 dB, hacer pausas regulares y evitar la exposicion prolongada a ruido intenso sin proteccion auditiva adecuada.', level: 'Medio', lc: 'medium' },
  7: { type: 'Fenomenos Naturales', title: 'Sismos', text: 'En caso de sismo pueden caer objetos, desplazarse maquinas pesadas o bloquearse las rutas de evacuacion dentro del gimnasio. Es necesario mantener permanentemente despejadas las salidas de emergencia, asegurar los equipos al suelo o a las paredes, senalizar los puntos de encuentro y asegurarse de que todo el personal conozca el protocolo de emergencia.', level: 'Alto', lc: 'high' }
};

const modal = document.getElementById('modal');

function openModal(id) {
  const r = risks[id];
  if (!r) return;
  document.getElementById('modal-num').textContent = id;
  document.getElementById('modal-type').textContent = r.type;
  document.getElementById('modal-title').textContent = r.title;
  document.getElementById('modal-text').textContent = r.text;
  const b = document.getElementById('modal-badge');
  b.textContent = '\u26a0 Nivel: ' + r.level;
  b.className = 'rbadge ' + r.lc;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.marker').forEach(b => b.addEventListener('click', () => openModal(+b.dataset.risk)));
document.querySelectorAll('.legend-card').forEach(c => c.addEventListener('click', () => openModal(+c.dataset.risk)));
document.getElementById('modal-close').addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

document.getElementById('navbar') && window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

document.getElementById('cta-btn')?.addEventListener('click', e => {
  e.preventDefault();
  document.getElementById('riesgos').scrollIntoView({ behavior: 'smooth' });
});

const revEls = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver(entries => {
  entries.forEach((en, i) => {
    if (en.isIntersecting) {
      setTimeout(() => en.target.classList.add('visible'), i * 80);
      obs.unobserve(en.target);
    }
  });
}, { threshold: 0.1 });
revEls.forEach(el => obs.observe(el));