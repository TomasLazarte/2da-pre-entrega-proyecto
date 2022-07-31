class Persona {
    constructor(nombre, telefono, direccion, cantidad, gustoUno, gustoDos, gustoTres) {
        this.nombre = nombre
        this.telefono = telefono
        this.direccion = direccion
        this.cantidad = cantidad
        this.gustoUno = gustoUno
        this.gustoDos = gustoDos
        this.gustoTres = gustoTres
    }
}

const formPedido = document.getElementById("formPedido")

// Creo el array de personas
let personas = []

if(localStorage.getItem('personas')){ // Consulto si ya existe un local storage
    personas = JSON.parse(localStorage.getItem("personas"))
} else { // Si no existe lo creo
    localStorage.setItem('personas', JSON.stringify(personas))
}


formPedido.addEventListener('submit', (e) => {
    e.preventDefault()
    const nombre = document.getElementById("nombre").value
    const telefono = document.getElementById("telefono").value
    const direccion = document.getElementById("direccion").value
    const cantidad = document.getElementById("cantidad").value
    const gustoUno = document.getElementById("gustoUno").value
    const gustoDos = document.getElementById("gustoDos").value
    const gustoTres = document.getElementById("gustoTres").value
    
    const persona = new Persona(nombre, telefono, direccion, cantidad, gustoUno, gustoDos, gustoTres)
    
    personas.push(persona)

    localStorage.setItem('personas', JSON.stringify(personas))
    formPedido.reset()

    verPedido(persona)
})

const infoPedido = document.getElementById("infoPedido")

// Creo funcion para ver la confirmacion del pedido
const verPedido = (persona) => {
    let info = ""
    info += `
    <div class="card text-white bg-secondary mb-3" style="max-width: 20rem;">
        <div class="card-header"><h4>Hola ${persona.nombre}</h4></div>
        <div class="card-body">
            <h5 class="card-title">Este es su pedido:</h5>
            <h6 class="card-text">${persona.cantidad}</h6>
            <h6 class="card-text">${persona.gustoUno}</h6>
            <h6 class="card-text">${persona.gustoDos}</h6>
            <h6 class="card-text">${persona.gustoTres}</h6>
        </div>
        <button type="submit" class="btn btn-primary btn-secondary">Confirmar Compra</button>
    </div>
    `
    infoPedido.innerHTML = info
}

const verPedidos = document.getElementById("verPedidos")
const listaPedidos = document.getElementById("listaPedidos")


// Muestro lista de personas con sus pedidos y direcciones
verPedidos.addEventListener("click", () => {
    const personas = JSON.parse(localStorage.getItem("personas"))
    let info = 
    `<thead>
        <tr>
            <th id="name" scope="col">Nombre</th>
            <th id="address" scope="col">Dirección</th>
            <th id="amount" scope="col">Cantidad</th>
            <th id="taste" scope="col">Gustos</th>
        </tr>
    </thead>`
    personas.forEach(persona => {
        info += 
        `
        <tbody>
            <tr class="table-secondary">
                <th scope="row">${persona.nombre}</th>
                <td>${persona.direccion}</td>
                <td>${persona.cantidad}</td>
                <td>${persona.gustoUno}, ${persona.gustoDos}, ${persona.gustoTres}</td>
            </tr>
        </tbody>     
        `
    })
    listaPedidos.innerHTML = info
})