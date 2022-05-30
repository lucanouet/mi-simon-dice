let secuenciaMaquina = []
let secuenciaUsuario = []
let ronda = 0

document.querySelector('#jugar').onclick = manejarRonda

actualizarEstado('Toca el boton Jugar !')

function manejarRonda() {
    reiniciarJuego()
    comenzarJuego()
}

function comenzarJuego() {
    bloquearInputUsuario()
    secuenciaUsuario = []
    actualizarEstado('Turno de la maquina')

    const $cuadro = obtenerCuadroAleatorio()
    secuenciaMaquina.push($cuadro)

    secuenciaMaquina.forEach(function($cuadro, index) {
        const RETRASO = (index + 1) * 1000
        setTimeout(function() {
            resaltar($cuadro)
        }, RETRASO)
    })

    const RETRASO_JUGADOR = (secuenciaMaquina.length + 1) * 1000
    setTimeout(function() {
        actualizarEstado('Turno del jugador')
        desbloquearInputUsuario()
    }, RETRASO_JUGADOR)

}

function bloquearInputUsuario() {
    document.querySelectorAll('.cuadro').forEach(function($cuadro) {
        $cuadro.onclick = () => {}
    })
}

function desbloquearInputUsuario() {
    document.querySelectorAll('.cuadro').forEach(function($cuadro) {
        $cuadro.onclick = manejarInputUsuario
    })
}

function manejarInputUsuario(e) {
    const $cuadro = e.target
    resaltar($cuadro)
    secuenciaUsuario.push($cuadro)

    const $cuadroMaquina = secuenciaMaquina[secuenciaUsuario.length - 1]
    if ($cuadroMaquina.id != $cuadro.id) {
        actualizarEstado('Perdiste! tocar jugar, para jugar de nuevo!')

        return
    }
    if (secuenciaMaquina.length === secuenciaUsuario.length) {
        setTimeout(comenzarJuego, 1000)
    }

}

function actualizarEstado(estado) {
    const $estado = document.querySelector('#estado')
    $estado.textContent = estado
}

function obtenerCuadroAleatorio() {
    const $cuadros = document.querySelectorAll('.cuadro')
    const indice = Math.floor(Math.random() * $cuadros.length)
    return $cuadros[indice]
}

function resaltar($cuadro) {
    $cuadro.style.opacity = 1
    setTimeout(function() {
        $cuadro.style.opacity = 0.5
    }, 500)
}

function reiniciarJuego() {
    secuenciaMaquina = []
    secuenciaUsuario = []
    ronda = 0
}