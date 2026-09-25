// Base de datos de productos
const productos = [
    {
        id: 1,
        nombre: "Pantalón Cargo",
        categoria: "pantalon",
        precio: 35000,
        talles: ["38", "40", "42", "44", "46", "48", "50", "52"],
        imagen: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 2,
        nombre: "Calzado de Seguridad",
        categoria: "calzado",
        precio: 58000,
        talles: ["40", "41", "42", "43", "44", "45", "46"],
        imagen: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 3,
        nombre: "Camisa Gabardina",
        categoria: "camisa",
        precio: 28000,
        talles: ["S", "M", "L", "XL", "XXL"],
        imagen: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 4,
        nombre: "Campera Térmica Impermeable",
        categoria: "camisa",
        precio: 72000,
        talles: ["S", "M", "L", "XL", "XXL"],
        imagen: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 5,
        nombre: "Chomba Algodón Heavy Duty",
        categoria: "remera",
        precio: 22000,
        talles: ["S", "M", "L", "XL", "XXL"],
        imagen: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 6,
        nombre: "Remera Reflectiva Alta Visibilidad",
        categoria: "remera",
        precio: 19500,
        talles: ["M", "L", "XL", "XXL"],
        imagen: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=400&q=80"
    }
];

let carrito = [];

// Cargar productos en la pantalla con el selector de talle
function renderizarProductos(lista) {
    const contenedor = document.getElementById("product-grid");
    contenedor.innerHTML = "";

    lista.forEach(p => {
        let htmlTalles = "";
        if (p.talles && p.talles.length > 0) {
            let opciones = p.talles.map(t => `<option value="${t}">${t.includes('Único') ? 'Talle Único' : 'Talle ' + t}</option>`).join('');
            htmlTalles = `
                <div class="select-talle-container" style="margin: 8px 0;">
                    <label for="talle-${p.id}">Talle: </label>
                    <select id="talle-${p.id}" class="select-talle">
                        ${opciones}
                    </select>
                </div>
            `;
        } else {
            htmlTalles = `<input type="hidden" id="talle-${p.id}" value="Único">`;
        }

        contenedor.innerHTML += `
            <div class="product-card">
                <img src="${p.imagen}" alt="${p.nombre}">
                <h3>${p.nombre}</h3>
                <p class="price">$${p.precio.toLocaleString()}</p>
                
                ${htmlTalles}

                <button class="btn-primary" onclick="agregarAlCarrito(${p.id})">Agregar al Carrito</button>
            </div>
        `;
    });
}

// Filtrar productos por categoría
function filtrar(categoria) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    if (event && event.target) {
        event.target.classList.add('active');
    }

    if (categoria === 'todos') {
        renderizarProductos(productos);
    } else {
        const filtrados = productos.filter(p => p.categoria === categoria);
        renderizarProductos(filtrados);
    }
}

// Agregar al carrito capturando el talle seleccionado
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    const inputTalle = document.getElementById(`talle-${id}`);
    const talleSeleccionado = inputTalle ? inputTalle.value : "Único";

    carrito.push({
        ...producto,
        talleElegido: talleSeleccionado
    });

    actualizarCarrito();
}

// NUEVA FUNCIÓN: Eliminar un producto específico del carrito por su posición (index)
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

// Actualizar vista del modal del carrito con opción de eliminar
function actualizarCarrito() {
    document.getElementById("cart-count").innerText = carrito.length;
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";
    
    let total = 0;

    if (carrito.length === 0) {
        cartItems.innerHTML = `<p style="text-align:center; color:#6b7280; padding: 20px 0;">El carrito está vacío.</p>`;
    } else {
        carrito.forEach((p, index) => {
            total += p.precio;
            cartItems.innerHTML += `
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; border-bottom:1px solid #e5e7eb; padding-bottom:8px;">
                    <div>
                        <strong>${p.nombre}</strong><br>
                        <small style="color:#6b7280;">Talle: <strong>${p.talleElegido}</strong></small>
                    </div>
                    <div style="display:flex; align-items:center; gap: 12px;">
                        <span style="font-weight:600;">$${p.precio.toLocaleString()}</span>
                        <!-- Botón ✕ para borrar el ítem -->
                        <button 
                            onclick="eliminarDelCarrito(${index})" 
                            title="Eliminar producto"
                            style="background:none; border:none; color:#ef4444; font-size:18px; cursor:pointer; font-weight:bold; padding:2px 6px; border-radius:4px; transition: background 0.2s;"
                            onmouseover="this.style.background='#fee2e2'"
                            onmouseout="this.style.background='none'"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            `;
        });
    }

    document.getElementById("cart-total-price").innerText = `$${total.toLocaleString()}`;
}

// Abrir y cerrar el modal del carrito
function toggleCarrito() {
    const modal = document.getElementById("cart-modal");
    modal.style.display = modal.style.display === "flex" ? "none" : "flex";
}

// Lógica de la Calculadora de Presupuestos
function calcularPresupuesto() {
    const cantidadInput = document.getElementById("cantidad-empleados");
    const tipoKitInput = document.getElementById("tipo-kit");
    
    if (!cantidadInput || !tipoKitInput) return;

    const cantidad = parseInt(cantidadInput.value) || 0;
    const tipoKit = tipoKitInput.value;

    let precioBaseKit = 0;
    if (tipoKit === 'basico') precioBaseKit = 63000;
    if (tipoKit === 'completo') precioBaseKit = 121000;
    if (tipoKit === 'invierno') precioBaseKit = 165000;

    let descuento = 0;
    if (cantidad >= 10 && cantidad < 25) descuento = 0.05;
    else if (cantidad >= 25 && cantidad < 50) descuento = 0.10;
    else if (cantidad >= 50) descuento = 0.15;

    const precioConDescuento = precioBaseKit * (1 - descuento);
    const total = precioConDescuento * cantidad;

    document.getElementById("costo-unitario").innerText = `$${precioBaseKit.toLocaleString()}`;
    document.getElementById("descuento-aplicado").innerText = `${descuento * 100}%`;
    document.getElementById("presupuesto-total").innerText = `$${total.toLocaleString()}`;
}

// Enviar pedido por WhatsApp
function enviarPedidoWhatsApp() {
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }
    let mensaje = "Hola SBS, me gustaría encargar los siguientes productos:\n\n";
    
    carrito.forEach((p, index) => {
        mensaje += `${index + 1}. ${p.nombre} - Talle: ${p.talleElegido} ($${p.precio.toLocaleString()})\n`;
    });
    
    const telefono = "5491112345678"; // <--- Cambia esto por tu número real de WhatsApp
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
}

// Inicializar la página al cargar
renderizarProductos(productos);
calcularPresupuesto();