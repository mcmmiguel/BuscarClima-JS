const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
});

function buscarClima(e) {
    e.preventDefault();


    // Validar
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if (ciudad === '' || pais === '') {
        // Hubo un error
        mostrarError('Ambos campos son obligatorios');

        return;
    }


    // Consultar API
    consultarAPI(ciudad, pais);
};

function mostrarError(mensaje) {
    const alerta = document.querySelector('.bg-red-100');

    if (!alerta) {
        const alerta = document.createElement('div');
        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');

        alerta.innerHTML = `
            <strong class="font-bold line-text">Error</strong>
            <span class"block">${mensaje}</span>
            `;

        container.appendChild(alerta);

        // eliminar alerta despues de 5s
        setTimeout(() => {
            alerta.remove();
        }, 5000);
    }
};

async function consultarAPI(ciudad, pais) {
    const apiKey = 'd08590422e6253bd0e931cc2b9133511';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiKey}`;

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            if (datos.cod === '404') {
                mostrarError('No se pudo encontrar información de esta ciudad')
            }
        })

}