// ===== Carga del header y footer desde la carpeta components =====
async function loadComponents() {
    try {
        const [headerRes, footerRes] = await Promise.all([
            fetch('components/header.html'),
            fetch('components/footer.html')
        ]);
        document.getElementById('header-placeholder').innerHTML = await headerRes.text();
        document.getElementById('footer-placeholder').innerHTML = await footerRes.text();
    } catch (err) {
        console.error('Error al cargar componentes:', err);
    }
    initScripts();
}

// ===== Scripts que dependen del header ya cargado =====
function initScripts() {
    // Efecto del navbar al hacer scroll
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // Menú hamburguesa en móviles
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }

    // Efecto de escritura en el hero
    const typingText = document.getElementById('typingText');
    if (typingText) {
        const frases = [
            'Creador de bots para Telegram',
            'Automatización 24/7 desde la nube',
            'Diseñador de invitaciones digitales',
            'Emprendedor digital venezolano'
        ];
        let indiceFrase = 0, indiceLetra = 0, borrando = false;
        function escribir() {
            const frase = frases[indiceFrase];
            typingText.textContent = frase.substring(0, indiceLetra);
            if (!borrando) {
                indiceLetra++;
                if (indiceLetra > frase.length) { borrando = true; setTimeout(escribir, 2000); return; }
            } else {
                indiceLetra--;
                if (indiceLetra < 0) {
                    borrando = false;
                    indiceLetra = 0;
                    indiceFrase = (indiceFrase + 1) % frases.length;
                }
            }
            setTimeout(escribir, borrando ? 40 : 90);
        }
        escribir();
    }

    // Contadores animados de estadísticas
    const contadores = document.querySelectorAll('.stat-number');
    const obsContador = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                const el = entrada.target;
                const meta = +el.getAttribute('data-target');
                let valor = 0;
                const paso = Math.max(1, Math.ceil(meta / 50));
                const timer = setInterval(() => {
                    valor += paso;
                    if (valor >= meta) { el.textContent = meta; clearInterval(timer); }
                    else { el.textContent = valor; }
                }, 30);
                obsContador.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    contadores.forEach(c => obsContador.observe(c));

    // Animaciones de aparición al hacer scroll
    const reveals = document.querySelectorAll('.reveal');
    const obsReveal = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('visible');
                obsReveal.unobserve(entrada.target);
            }
        });
    }, { threshold: 0.15 });
    reveals.forEach(r => obsReveal.observe(r));
}

document.addEventListener('DOMContentLoaded', loadComponents);
