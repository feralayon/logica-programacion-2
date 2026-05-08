// Obtiene la referencia al campo input del HTML para leer la temperatura escrita por el usuario y también para actualizar su valor cuando se use prompt.
const campoTemperaturaCelsius = document.getElementById("temperaturaCelsius");

// Obtiene la referencia al botón principal del HTML que ejecuta la conversión usando el valor del input.
const botonConvertir = document.getElementById("botonConvertir");

// Obtiene la referencia al botón secundario del HTML que permite solicitar la temperatura usando prompt.
const botonSolicitarPrompt = document.getElementById("botonSolicitarPrompt");

// Obtiene la referencia al párrafo del HTML donde se mostrarán mensajes de error cuando la entrada no sea válida.
const mensajeError = document.getElementById("mensajeError");

// Obtiene la referencia al párrafo del HTML donde se imprimirá el resultado en grados Kelvin.
const resultadoKelvin = document.getElementById("resultadoKelvin");

// Obtiene la referencia al párrafo del HTML donde se imprimirá el resultado en grados Fahrenheit.
const resultadoFahrenheit = document.getElementById("resultadoFahrenheit");

// Crea una clase sencilla para organizar los datos y resultados de una conversión, siguiendo una lógica entendible para un nivel junior.
class ConversorDeTemperatura {
    // Define el método constructor que guarda la temperatura en Celsius recibida al crear un nuevo objeto conversor.
    constructor(temperaturaEnCelsius) {
        // Guarda en la propiedad del objeto el valor numérico validado que luego usarán los demás métodos de la clase.
        this.temperaturaEnCelsius = temperaturaEnCelsius;
    }

    // Crea un método que convierte la temperatura de Celsius a Kelvin usando la fórmula correspondiente.
    convertirAKelvin() {
        // Suma 273.15 al valor en Celsius para obtener la temperatura equivalente en Kelvin.
        return this.temperaturaEnCelsius + 273.15;
    }

    // Crea un método que convierte la temperatura de Celsius a Fahrenheit usando la fórmula correspondiente.
    convertirAFahrenheit() {
        // Multiplica los grados Celsius por 9/5 y luego suma 32 para obtener Fahrenheit.
        return (this.temperaturaEnCelsius * 9 / 5) + 32;
    }
}

// Declara una función que intenta transformar el texto ingresado por el usuario en un número real.
function convertirTextoANumero(textoIngresado) {
    // Elimina espacios vacíos al inicio y al final para evitar errores cuando el usuario escriba con espacios extras.
    const textoSinEspacios = textoIngresado.trim();

    // Verifica si después de limpiar el texto el resultado quedó vacío, lo cual significa que no hay un dato válido que procesar.
    if (textoSinEspacios === "") {
        // Devuelve NaN para indicar que no se pudo obtener un número válido a partir de la entrada del usuario.
        return NaN;
    }

    // Convierte el texto limpio en un número usando la función Number de JavaScript.
    return Number(textoSinEspacios);
}

// Declara una función que comprueba si el dato recibido es realmente un número válido y no un valor incorrecto como texto o NaN.
function esNumeroValido(valorAValidar) {
    // Retorna true solo si el tipo es number y además no representa el valor especial NaN.
    return typeof valorAValidar === "number" && !isNaN(valorAValidar);
}

// Declara una función para limpiar mensajes de error anteriores del DOM antes de mostrar nuevos resultados correctos.
function limpiarMensajeDeError() {
    // Vacía el contenido del párrafo de error en el HTML para dejar la interfaz limpia cuando la entrada sí es válida.
    mensajeError.textContent = "";
}

// Declara una función para mostrar un mensaje de error en el párrafo correspondiente del HTML.
function mostrarMensajeDeError(textoDelError) {
    // Asigna el mensaje recibido al elemento del DOM para informar al usuario qué salió mal.
    mensajeError.textContent = textoDelError;
}

// Declara una función que pinta los resultados de la conversión tanto en consola como en los elementos del HTML.
function mostrarResultadosEnPantalla(temperaturaConvertida) {
    // Llama al método de la clase para obtener el valor en Kelvin y lo guarda en una variable descriptiva.
    const gradosKelvinCalculados = temperaturaConvertida.convertirAKelvin();

    // Llama al método de la clase para obtener el valor en Fahrenheit y lo guarda en otra variable descriptiva.
    const gradosFahrenheitCalculados = temperaturaConvertida.convertirAFahrenheit();

    // Inserta el valor de Kelvin con dos decimales dentro del párrafo del HTML destinado a ese resultado.
    resultadoKelvin.textContent = `Grados Kelvin: ${gradosKelvinCalculados.toFixed(2)}`;

    // Inserta el valor de Fahrenheit con dos decimales dentro del párrafo del HTML destinado a ese resultado.
    resultadoFahrenheit.textContent = `Grados Fahrenheit: ${gradosFahrenheitCalculados.toFixed(2)}`;

    // Imprime en la consola del navegador el mismo valor de Kelvin para cumplir también con la salida por consola pedida en el reto.
    console.log(`Grados Kelvin: ${gradosKelvinCalculados.toFixed(2)}`);

    // Imprime en la consola del navegador el mismo valor de Fahrenheit para facilitar las pruebas del programa.
    console.log(`Grados Fahrenheit: ${gradosFahrenheitCalculados.toFixed(2)}`);
}

// Declara una función principal que reúne la validación, creación del objeto y visualización de resultados.
function procesarTemperaturaIngresada(textoDeEntrada) {
    // Convierte el texto recibido desde el input o desde prompt en un posible número.
    const temperaturaConvertidaANumero = convertirTextoANumero(textoDeEntrada);

    // Evalúa si la entrada procesada no es un número válido.
    if (!esNumeroValido(temperaturaConvertidaANumero)) {
        // Muestra un mensaje de error para informar que el usuario debe escribir un dato numérico correcto.
        mostrarMensajeDeError("Error: debes ingresar un valor numérico válido en grados Celsius.");

        // Regresa false para indicar a la parte que llamó la función que la validación falló.
        return false;
    }

    // Limpia cualquier error anterior porque en este punto la entrada ya fue validada correctamente.
    limpiarMensajeDeError();

    // Crea un nuevo objeto de la clase ConversorDeTemperatura con el valor numérico ya validado.
    const nuevoConversorDeTemperatura = new ConversorDeTemperatura(temperaturaConvertidaANumero);

    // Envía el objeto convertido a la función encargada de imprimir los resultados en consola y en el DOM del HTML.
    mostrarResultadosEnPantalla(nuevoConversorDeTemperatura);

    // Regresa true para indicar que la conversión se realizó con éxito.
    return true;
}

// Agrega un evento click al botón principal del HTML para capturar el valor escrito en el input y procesarlo.
botonConvertir.addEventListener("click", function () {
    // Lee el valor actual del input de Celsius escrito por el usuario en la interfaz HTML.
    const temperaturaEscritaPorElUsuario = campoTemperaturaCelsius.value;

    // Envía ese valor a la función principal para validarlo y convertirlo.
    procesarTemperaturaIngresada(temperaturaEscritaPorElUsuario);
});

// Agrega un evento click al botón secundario del HTML para solicitar la temperatura por medio de prompt.
botonSolicitarPrompt.addEventListener("click", function () {
    // Declara una variable de control para saber si el usuario ya ingresó un valor válido y así detener el ciclo de solicitud.
    let yaSeIngresoUnNumeroValido = false;

    // Inicia un ciclo que seguirá pidiendo la temperatura mientras no exista un dato numérico correcto.
    while (!yaSeIngresoUnNumeroValido) {
        // Solicita al usuario la temperatura en Celsius mediante una ventana emergente del navegador.
        const temperaturaIngresadaPorPrompt = prompt("Ingresa una temperatura en grados Celsius:");

        // Verifica si el usuario canceló el prompt para evitar un ciclo infinito cuando no desea continuar.
        if (temperaturaIngresadaPorPrompt === null) {
            // Muestra un mensaje indicando que el proceso fue cancelado por el usuario.
            mostrarMensajeDeError("Proceso cancelado. Debes ingresar un número si deseas convertir una temperatura.");

            // Usa break para salir del ciclo porque el usuario decidió cancelar la solicitud por prompt.
            break;
        }

        // Copia en el input del HTML el valor escrito en el prompt para mantener sincronizadas ambas formas de entrada.
        campoTemperaturaCelsius.value = temperaturaIngresadaPorPrompt;

        // Procesa el valor del prompt y guarda si fue válido o no para decidir si el ciclo continúa.
        yaSeIngresoUnNumeroValido = procesarTemperaturaIngresada(temperaturaIngresadaPorPrompt);
    }
});

// Agrega un evento al input del HTML para permitir convertir al presionar la tecla Enter y mejorar la experiencia del usuario.
campoTemperaturaCelsius.addEventListener("keydown", function (eventoDelTeclado) {
    // Comprueba si la tecla presionada fue Enter dentro del campo de texto del HTML.
    if (eventoDelTeclado.key === "Enter") {
        // Ejecuta la misma lógica del botón principal usando el valor actual del input.
        procesarTemperaturaIngresada(campoTemperaturaCelsius.value);
    }
});