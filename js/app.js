// URL de la API para obtener productos (puedes cambiarla por la tuya)
const apiUrl = 'https://api.escuelajs.co/api/v1/products';
let products = [];

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


// Cargar productos al cargar la página
document.addEventListener('DOMContentLoaded', fetchProducts);
