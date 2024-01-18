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

    spinner(); //spinner de carga

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            limpiarHTML(); //Limpiar el HTML previo
            if (datos.cod === '404') {
                mostrarError('No se pudo encontrar información de esta ciudad');
                return;
            }

            // imprime la respuesta en HTML
            mostrarClima(datos);

        })
};

function mostrarClima(datos) {
    const { name, main: { temp, temp_max, temp_min } } = datos;

    const centigrados = kelvinACentigrados(temp);
    const max = kelvinACentigrados(temp_max);
    const min = kelvinACentigrados(temp_min);

    const nombreCiudad = document.createElement('p');
    nombreCiudad.textContent = `Clima en ${name}`;
    nombreCiudad.classList.add('font-bold', 'text-2xl');

    const actual = document.createElement('p');
    actual.innerHTML = `${centigrados} &#8451;`;
    actual.classList.add('font-bold', 'text-6xl');

    const temperaturaMax = document.createElement('p');
    temperaturaMax.innerHTML = `Max: ${max} &#8451;`;
    temperaturaMax.classList.add('text-xl');

    const temperaturaMin = document.createElement('p');
    temperaturaMin.innerHTML = `Min: ${min} &#8451;`;
    temperaturaMin.classList.add('text-xl');

    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(temperaturaMax);
    resultadoDiv.appendChild(temperaturaMin);

    resultado.appendChild(resultadoDiv);
};

const kelvinACentigrados = (grados) => parseInt(grados - 273.15);

function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
};

function spinner() {
    limpiarHTML();
    const divSpinner = document.createElement('div');
    divSpinner.classList.add('spinner');
    divSpinner.innerHTML = `
            <div class="double-bounce1"></div>
            <div class="double-bounce2"></div>
    `;

    resultado.appendChild(divSpinner);
}