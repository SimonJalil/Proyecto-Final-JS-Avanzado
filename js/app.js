// URL de la API para obtener productos (puedes cambiarla por la tuya)
const apiUrl = 'https://api.escuelajs.co/api/v1/products';
let products = [];
let carrito = [];

// Funcion para obtener los datos del API
const fetchProducts = async () => {
    try {
        const response = await fetch(apiUrl);
        products = await response.json();

        products.sort((a, b) => a.title.localeCompare(b.title));

        displayProducts(products);
    } catch (error) {
        console.error('Error:', error);
    }
};

// Función para crear tarjetas de productos
const displayProducts = (products) => {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Limpiar contenido previo

    products.forEach(product => {
        // Crear tarjeta de producto
        const productCard = document.createElement('div');
        productCard.classList.add('col-md-4', 'mb-4');
        productCard.innerHTML = `
            <div class="card product-card">
                <img src="${product.images[0]}" class="card-img-top" alt="${product.title}">
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">${product.description.substring(0, 100)}...</p>
                    <p class="card-text fw-bold">$${product.price}</p>
                    <button class="btn btn-primary" onclick="renderProductoPorId(${product.id})">Detalle del producto</button>
                </div>
            </div>
        `;
        productList.appendChild(productCard);
    });

};


// Función para obtener un producto por su ID
// Función para obtener un producto por su ID y mejorar el diseño
const renderProductoPorId = async (id) => {
    try {
        const response = await fetch(`${apiUrl}/${id}`);
        if (!response.ok) {
            throw new Error('Producto no encontrado');
        }

        const product = await response.json();

        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
            <div class="card product-card-detail shadow-lg p-3 m-5 bg-body-tertiary rounded">
                <div class="row g-0">
                    <!-- Carousel de Imágenes -->
                    <div class="col-md-6">
                        <div id="productCarousel" class="carousel slide" data-bs-ride="carousel">
                            <div class="carousel-inner">
                                ${product.images.map((img, index) => `
                                    <div class="carousel-item ${index === 0 ? 'active' : ''}">
                                        <img src="${img}" class="d-block w-100 rounded-start" alt="${product.title}">
                                    </div>
                                `).join('')}
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#productCarousel" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Anterior</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#productCarousel" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Siguiente</span>
                            </button>
                        </div>
                    </div>

                    <!-- Detalles del Producto -->
                    <div class="col-md-6">
                        <div class="card-body">
                            <h3 class="card-title">${product.title}</h3>
                            <h4 class="card-text text-success fw-bold">$${product.price}</h4>
                            <p class="card-text">${product.description}</p>
                            <p class="card-text"><span class="badge bg-info text-dark">${product.category.name}</span></p>
                            <div class="d-flex gap-3 mt-4">
                                <button class="btn btn-primary btn-lg" onclick="agregarAlCarrito(${product.id})">
                                    <i class="fas fa-cart-plus"></i> Agregar al carrito
                                </button>
                                <button class="btn btn-outline-secondary btn-lg" onclick="volverAlListado()">
                                    <i class="fas fa-arrow-left"></i> Volver al listado
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        document.getElementById('main-content').innerHTML = `
            <div class="alert alert-danger" role="alert">
                Producto no encontrado.
            </div>
        `;
    }
};


// Función para volver al listado de productos
const volverAlListado = () => {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = `
        <!-- Carousel -->
        <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"
                    aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                    aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                    aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="images/carusel_1.webp" class="d-block w-100" alt="Slide 1">
                    <div class="carousel-caption d-none d-md-block">
                        <h5>¡Oferta del día!</h5>
                    </div>
                </div>
                <div class="carousel-item">
                    <img src="images/carusel_2.webp" class="d-block w-100" alt="Slide 2">
                    <div class="carousel-caption d-none d-md-block">
                        <h5>Nuevos Lanzamientos</h5>
                    </div>
                </div>
                <div class="carousel-item">
                    <img src="images/carusel_3.webp" class="d-block w-100" alt="Slide 3">
                    <div class="carousel-caption d-none d-md-block">
                        <h5>Compra con Envío Gratis</h5>
                    </div>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Anterior</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Siguiente</span>
            </button>
        </div>

        <h1 class="text-center my-4">Nuestros productos</h1>
        <div class="row" id="product-list">
            <!-- Las tarjetas de productos se cargarán aquí -->
        </div>
    `;
    fetchProducts(); // Llamar a la función que renderiza la lista de productos
};

// Función para agregar un producto al carrito
const agregarAlCarrito = (id) => {
    fetch(`${apiUrl}/${id}`)
        .then(response => response.json())
        .then(product => {
            // Verificar si el producto ya está en el carrito
            const existeEnCarrito = carrito.find(item => item.id === product.id);

            if (existeEnCarrito) {
                // Mostrar alerta de que el producto ya está en el carrito
                Swal.fire({
                    title: '¡Producto ya en el carrito!',
                    text: `${product.title} ya se encuentra en el carrito.`,
                    icon: 'info',
                    confirmButtonText: 'Entendido'
                });
            } else {
                // Si no está, agregar producto al carrito
                carrito.push({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.images[0],
                    quantity: 1
                });

                // Guardar el carrito en LocalStorage
                localStorage.setItem('carrito', JSON.stringify(carrito));

                // Mostrar alerta de éxito con SweetAlert2
                Swal.fire({
                    title: '¡Producto agregado!',
                    text: `${product.title} se agregó al carrito.`,
                    imageUrl: product.images[0],
                    imageWidth: 100,
                    imageHeight: 100,
                    imageAlt: product.title,
                    icon: 'success',
                    confirmButtonText: 'Continuar'
                }).then((result) => {
                    // Verificar si el usuario hizo click en "Continuar"
                    if (result.isConfirmed) {
                        volverAlListado(); // Volver al listado de productos
                    }
                });

                // Ver el contenido del carrito en la consola (opcional)
                console.log('Carrito:', carrito);
            }
        })
        .catch(error => {
            console.error('Error al agregar al carrito:', error);
            Swal.fire({
                title: 'Error',
                text: 'Hubo un problema al agregar el producto al carrito.',
                icon: 'error',
                confirmButtonText: 'Intentar de nuevo'
            });
        });
};


// Función para renderizar el carrito en la pantalla
const renderCarrito = () => {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = `
        <h1 class="text-center my-4">Carrito de Compras</h1>
        <div class="container">
            <table class="table table-striped table-hover">
                <thead class="table-dark">
                    <tr>
                        <th scope="col">Producto</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Subtotal</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody id="carrito-list">
                    <!-- Los productos del carrito se cargarán aquí -->
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="3" class="text-end fw-bold">Total:</td>
                        <td class="fw-bold" id="total-carrito">$0</td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
            <div class="text-end">
                <button class="btn btn-success" onclick="finalizarCompra()">
                    <i class="fas fa-check"></i> Finalizar Compra
                </button>
                <button class="btn btn-secondary" onclick="volverAlListado()">
                    <i class="fas fa-arrow-left"></i> Volver a la tienda
                </button>
            </div>
        </div>
    `;

    // Obtener el carrito desde LocalStorage
    const carritoGuardado = localStorage.getItem('carrito');
    const carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];

    // Verificar si el carrito está vacío
    if (carrito.length === 0) {
        document.getElementById('carrito-list').innerHTML = `
            <tr>
                <td colspan="5" class="text-center">El carrito está vacío</td>
            </tr>
        `;
        return;
    }

    // Renderizar los productos del carrito en una tabla
    const carritoList = document.getElementById('carrito-list');
    let total = 0;
    carrito.forEach(product => {
        const subtotal = product.price * product.quantity;
        total += subtotal;

        const productoCarrito = document.createElement('tr');
        productoCarrito.innerHTML = `
            <td>
                <img src="${product.image}" alt="${product.title}" style="width: 50px; height: 50px; object-fit: cover;">
                ${product.title}
            </td>
            <td>$${product.price}</td>
            <td data-cantidad-id="${product.id}">${product.quantity}</td>
            <td class="subtotal" data-id="${product.id}">$${subtotal}</td>
            <td>
                <!-- Botones para modificar cantidad -->
                <button class="btn btn-outline-secondary btn-sm me-2" onclick="cambiarCantidad(${product.id}, -1)">
                    <i class="fas fa-minus"></i>
                </button>
                <button class="btn btn-outline-secondary btn-sm me-2" onclick="cambiarCantidad(${product.id}, 1)">
                    <i class="fas fa-plus"></i>
                </button>
                <!-- Botón para eliminar -->
                <button class="btn btn-danger btn-sm" onclick="eliminarDelCarrito(${product.id})">
                    <i class="fas fa-trash-alt"></i> Eliminar
                </button>
            </td>
        `;
        carritoList.appendChild(productoCarrito);
    });

    // Mostrar el total en el footer de la tabla
    document.getElementById('total-carrito').innerText = `$${total}`;
};

// Función para actualizar la cantidad de un producto en el carrito
const actualizarCantidad = (id, nuevaCantidad) => {
    nuevaCantidad = parseInt(nuevaCantidad);

    // No permitir cantidades menores a 1
    if (nuevaCantidad < 1) {
        Swal.fire({
            title: 'Cantidad no válida',
            text: 'La cantidad mínima es 1.',
            icon: 'error',
            confirmButtonText: 'Entendido'
        });
        return;
    }

    // Buscar el producto en el carrito y actualizar la cantidad
    const producto = carrito.find(item => item.id === id);
    if (producto) {
        producto.quantity = nuevaCantidad;

        // Actualizar LocalStorage
        localStorage.setItem('carrito', JSON.stringify(carrito));

        // Actualizar el subtotal de este producto
        const subtotalElement = document.querySelector(`.subtotal[data-id="${id}"]`);
        const nuevoSubtotal = producto.price * producto.quantity;
        subtotalElement.innerText = `$${nuevoSubtotal}`;

        // Actualizar el total del carrito
        let nuevoTotal = 0;
        carrito.forEach(item => {
            nuevoTotal += item.price * item.quantity;
        });
        document.getElementById('total-carrito').innerText = `$${nuevoTotal}`;
    }
};

// Función para cambiar la cantidad de un producto en el carrito con animación
const cambiarCantidad = (id, cambio) => {
    // Buscar el producto en el carrito
    const producto = carrito.find(item => item.id === id);
    if (producto) {
        // Cambiar la cantidad
        producto.quantity += cambio;

        // No permitir cantidades menores a 1
        if (producto.quantity < 1) {
            producto.quantity = 1;
            Swal.fire({
                title: 'Cantidad no válida',
                text: 'La cantidad mínima es 1.',
                icon: 'error',
                confirmButtonText: 'Entendido'
            });
            return;
        }

        // Actualizar LocalStorage
        localStorage.setItem('carrito', JSON.stringify(carrito));

        // Actualizar la cantidad en el DOM con animación
        const cantidadElement = document.querySelector(`td[data-cantidad-id="${id}"]`);
        cantidadElement.classList.add('animate-change');
        setTimeout(() => {
            cantidadElement.innerText = producto.quantity;
            cantidadElement.classList.remove('animate-change');
        }, 300);

        // Actualizar el subtotal de este producto con animación
        const subtotalElement = document.querySelector(`.subtotal[data-id="${id}"]`);
        const nuevoSubtotal = producto.price * producto.quantity;
        subtotalElement.classList.add('animate-change');
        setTimeout(() => {
            subtotalElement.innerText = `$${nuevoSubtotal}`;
            subtotalElement.classList.remove('animate-change');
        }, 300);

        // Actualizar el total del carrito con animación
        let nuevoTotal = 0;
        carrito.forEach(item => {
            nuevoTotal += item.price * item.quantity;
        });

        const totalElement = document.getElementById('total-carrito');
        totalElement.classList.add('animate-change');
        setTimeout(() => {
            totalElement.innerText = `$${nuevoTotal}`;
            totalElement.classList.remove('animate-change');
        }, 300);
    }
};


// Función para eliminar un producto del carrito con confirmación
const eliminarDelCarrito = (id) => {
    // Mostrar confirmación con SweetAlert2
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Este producto se eliminará del carrito.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Filtrar el carrito para eliminar el producto
            carrito = carrito.filter(product => product.id !== id);

            // Actualizar el carrito en LocalStorage
            localStorage.setItem('carrito', JSON.stringify(carrito));

            // Mostrar alerta de éxito
            Swal.fire({
                title: 'Eliminado',
                text: 'El producto se ha eliminado del carrito.',
                icon: 'success',
                confirmButtonText: 'Entendido'
            }).then(() => {
                renderCarrito(); // Volver a renderizar el carrito
            });
        }
    });
};

// Función para finalizar la compra
const finalizarCompra = () => {
    // Usar la variable global carrito
    carrito = localStorage.getItem('carrito') ? JSON.parse(localStorage.getItem('carrito')) : [];

    if (carrito.length === 0) {
        // Si no hay productos, mostrar alerta
        Swal.fire({
            title: 'Carrito vacío',
            text: 'No hay productos en el carrito.',
            icon: 'info',
            confirmButtonText: 'Entendido'
        });
        return;
    }

    // Si hay productos, mostrar modal para solicitar celular y email
    Swal.fire({
        title: 'Finalizar Compra',
        html: `
            <div class="mb-3">
                <label for="celular" class="form-label">Número de Celular:</label>
                <input type="text" id="celular" class="form-control" placeholder="Ej: 1123456789" autocomplete="off">
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email:</label>
                <input type="email" id="email" class="form-control" placeholder="Ej: correo@example.com">
            </div>
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: 'Confirmar Compra',
        cancelButtonText: 'Cancelar',
        preConfirm: () => {
            const celular = document.getElementById('celular').value;
            const email = document.getElementById('email').value;

            // Validación de celular (número y mínimo 10 dígitos)
            const regexCelular = /^[0-9]{10,}$/;
            if (!regexCelular.test(celular)) {
                Swal.showValidationMessage('El número de celular no es válido. Debe contener al menos 10 dígitos.');
                return false;
            }

            // Validación de email (formato válido)
            const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!regexEmail.test(email)) {
                Swal.showValidationMessage('El correo electrónico no es válido.');
                return false;
            }

            // Si ambos son válidos, devolver datos
            return { celular, email };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            // Si se confirmó y los datos son válidos
            const { celular, email } = result.value;
            console.log('Celular:', celular, 'Email:', email);

            // Mostrar mensaje de compra finalizada
            Swal.fire({
                title: '¡Compra Finalizada!',
                text: 'Te enviaremos los detalles por correo.',
                icon: 'success',
                confirmButtonText: 'Entendido'
            }).then(() => {
                // Borrar el carrito en el arreglo global y LocalStorage
                carrito.length = 0; // Vaciar el arreglo global
                localStorage.removeItem('carrito'); // Borrar LocalStorage

                // Volver al listado de productos
                volverAlListado();
            });
        }
    });
};


// Función para recargar la página y volver al inicio
const recargarInicio = () => {
    // Volver al inicio (scroll hacia arriba)
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Recargar el contenido inicial de la SPA
    volverAlListado();
};


// Cargar productos al cargar la página
document.addEventListener('DOMContentLoaded', fetchProducts);
