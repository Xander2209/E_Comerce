// Variables globales
let products = [];
let categories = [];
let cart = [];
const TAX_RATE = 0.19; // 19% IVA en Colombia
let appliedCoupon = null;

// Función para cargar los productos (simulando una base de datos)
function loadProducts() {
    products = [
        { 
            id: 1, 
            name: "Parlante Bluetooth XYZ", 
            basePrice: 150000, 
            category: "Electrónica", 
            description: "Parlante portátil con excelente calidad de sonido.", 
            stock: 50, 
            sales: 60,
            images: [
                "/images/parlante1.jpeg",
                "/images/parlante2.jpeg",
                "/images/parlante3.jpeg"
            ],
            variants: {
                color: [
                    { name: "Negro", stock: 20 },
                    { name: "Blanco", stock: 15 },
                    { name: "Azul", stock: 15 }
                ]
            }
        },
        { 
            id: 2, 
            name: "Cámara DSLR Pro", 
            basePrice: 1200000, 
            category: "Electrónica", 
            description: "Cámara profesional con sensor de alta resolución.", 
            stock: 20, 
            sales: 45,
            images: [
                "/images/camara1.jpeg",
                "/images/camara2.jpeg",
                "/images/camara3.jpeg"
            ],
            variants: {
                lente: [
                    { type: "18-55mm", priceModifier: 0, stock: 10 },
                    { type: "24-70mm", priceModifier: 500000, stock: 10 }
                ]
            }
        },
        { 
            id: 3, 
            name: "Laptop ProBook", 
            basePrice: 2899000, 
            category: "Electrónica", 
            description: "Laptop potente para profesionales.", 
            stock: 50, 
            sales: 75,
            images: [
                "/images/laptop1.jpeg",
                "/images/laptop2.jpeg",
                "/images/laptop3.jpeg"
            ],
            variants: {
                processor: [
                    { type: "i5", priceModifier: 0, stock: 25 },
                    { type: "i7", priceModifier: 200000, stock: 25 }
                ],
                ram: [
                    { size: "8GB", priceModifier: 0, stock: 20 },
                    { size: "16GB", priceModifier: 200000, stock: 20 },
                    { size: "32GB", priceModifier: 350000, stock: 10 }
                ]
            }
        },
        { 
            id: 4, 
            name: "Smartphone UltraFast", 
            basePrice: 950000, 
            category: "Electrónica", 
            description: "Teléfono inteligente con procesador de última generación.", 
            stock: 50, 
            sales: 60,
            images: [
                "/images/smartphone1.jpeg",
                "/images/smartphone2.jpeg",
                "/images/smartphone3.jpeg"
            ],
            variants: {
                storage: [
                    { size: "64GB", priceModifier: 0, stock: 20 },
                    { size: "128GB", priceModifier: 100000, stock: 20 },
                    { size: "256GB", priceModifier: 200000, stock: 10 }
                ],
                color: [
                    { name: "Negro", stock: 20 },
                    { name: "Blanco", stock: 15 },
                    { name: "Azul", stock: 15 }
                ]
            }
        },
        { 
            id: 5, 
            name: "Sofá Moderno", 
            basePrice: 2000000, 
            category: "Muebles", 
            description: "Sofá cómodo y elegante para tu sala de estar.", 
            stock: 15, 
            sales: 30,
            images: [
                "/images/sofa1.jpeg",
                "/images/sofa2.jpeg",
                "/images/sofa3.jpeg"
            ],
            variants: {
                color: [
                    { name: "Gris", stock: 5 },
                    { name: "Beige", stock: 5 },
                    { name: "Azul", stock: 5 }
                ],
                material: [
                    { type: "Tela", stock: 8 },
                    { type: "Cuero", stock: 7 }
                ]
            }
        },
        { 
            id: 6, 
            name: "Lámpara de Mesa", 
            basePrice: 120000, 
            category: "Decoración", 
            description: "Lámpara decorativa con diseño moderno.", 
            stock: 30, 
            sales: 20,
            images: [
                "/images/lampara1.jpeg",
                "/images/lampara2.jpeg",
                "/images/lampara3.jpeg"
            ],
            variants: {
                color: [
                    { name: "Blanco", stock: 10 },
                    { name: "Negro", stock: 10 },
                    { name: "Dorado", stock: 10 }
                ]
            }
        },
        { 
            id: 7, 
            name: "Camiseta Casual", 
            basePrice: 50000, 
            category: "Ropa", 
            description: "Camiseta cómoda para uso diario.", 
            stock: 50, 
            sales: 30,
            images: [
                "/images/camiseta1.jpeg",
                "/images/camiseta2.jpeg",
                "/images/camiseta3.jpeg"
            ],
            variants: {
                size: [
                    { name: "S", stock: 15 },
                    { name: "M", stock: 15 },
                    { name: "L", stock: 10 },
                    { name: "XL", stock: 10 }
                ],
                color: [
                    { name: "Blanco", stock: 20 },
                    { name: "Negro", stock: 15 },
                    { name: "Gris", stock: 15 }
                ]
            }
        },
        { 
            id: 8, 
            name: "Reloj Elegante", 
            basePrice: 75000, 
            category: "Accesorios", 
            description: "Reloj de pulsera con estilo clásico.", 
            stock: 40, 
            sales: 60,
            images: [
                "/images/reloj1.jpeg",
                "/images/reloj2.jpeg",
                "/images/reloj3.jpeg"
            ],
            variants: {
                color: [
                    { name: "Plateado", stock: 15 },
                    { name: "Dorado", stock: 15 },
                    { name: "Negro", stock: 10 }
                ]
            }
        },
    ];

    // Extraer categorías únicas de los productos
    categories = [...new Set(products.map(product => product.category))];
}

// Función para mostrar los productos destacados en la página de inicio
function displayFeaturedProducts() {
    const featuredProductsGrid = document.getElementById('featured-products-grid');
    if (!featuredProductsGrid) return;

    // Ordenar productos por ventas (de mayor a menor) y tomar los primeros 4
    const featuredProducts = products.sort((a, b) => b.sales - a.sales).slice(0, 4);

    featuredProductsGrid.innerHTML = '';
    featuredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.images[0]}" alt="Imagen principal de ${product.name}">
            <h3>${product.name}</h3>
            <p>Precio: $${product.basePrice.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Añadir al carrito</button>
            <a href="product-detail.html?id=${product.id}">Ver detalles</a>
        `;
        featuredProductsGrid.appendChild(productCard);
    });
}

// Función para mostrar los filtros de categoría
function displayCategoryFilters() {
    const categoryFilters = document.getElementById('category-filters');
    if (!categoryFilters) return;

    categoryFilters.innerHTML = categories.map(category => `
        <label>
            <input type="checkbox" name="category" value="${category}" checked>
            ${category}
        </label>
    `).join('');
}

// Función para mostrar todos los productos o productos filtrados
function displayProducts(filteredProducts = products) {
    const productGrid = document.getElementById('product-grid');
    if (!productGrid) return;

    productGrid.innerHTML = '';
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.images[0]}" alt="Imagen principal de ${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Precio: $${product.basePrice.toFixed(2)}</p>
            <p>Categoría: ${product.category}</p>
            <button onclick="addToCart(${product.id})">Añadir al carrito</button>
            <a href="product-detail.html?id=${product.id}">Ver detalles</a>
        `;
        productGrid.appendChild(productCard);
    });
}

// Función para mostrar los detalles de un producto
function displayProductDetail(productId) {
    const product = products.find(p => p.id === parseInt(productId));
    if (!product) return;

    const detailContainer = document.getElementById('product-detail');
    if (!detailContainer) return;

    const mainImage = product.images[0];
    const thumbnails = product.images.map((img, index) => 
        `<img src="${img}" alt="Imagen ${index + 1} de ${product.name}" class="thumbnail" onclick="changeMainImage(${index})">`
    ).join('');

    let variantOptions = '';
    if (product.variants) {
        for (const [key, values] of Object.entries(product.variants)) {
            variantOptions += `
                <div class="variant-option">
                    <label for="${key}">${key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                    <select id="${key}" onchange="updatePrice(${product.id})">
                        ${values.map(v => `<option value="${v.name || v.type || v.size}">${v.name || v.type || v.size}</option>`).join('')}
                    </select>
                </div>
            `;
        }
    }

    detailContainer.innerHTML = `
        <div class="product-images">
            <div class="main-image-container">
                <img src="${mainImage}" alt="${product.name}" id="main-image" class="main-image">
            </div>
            <div class="thumbnails-container">
                ${thumbnails}
            </div>
        </div>
        <div class="product-info">
            <h1>${product.name}</h1>
            <p class="price">Precio: $<span id="product-price">${product.basePrice.toFixed(2)}</span></p>
            <p class="description">${product.description}</p>
            ${variantOptions}
            <button id="add-to-cart-button" onclick="addToCartWithVariants(${product.id})">
            Añadir al carrito
        </button>
        </div>
    `;

    updatePrice(product.id);
    updateCart()
}

// Función para aplicar los filtros seleccionados
function applyFilters(event) {
    event.preventDefault();
    const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(input => input.value);
    const minPrice = parseFloat(document.getElementById('min-price').value) || 0;
    const maxPrice = parseFloat(document.getElementById('max-price').value) || Infinity;

    const filteredProducts = products.filter(product => 
        selectedCategories.includes(product.category) &&
        product.basePrice >= minPrice &&
        product.basePrice <= maxPrice
    );

    displayProducts(filteredProducts);
}

// Función para mostrar notificaciones
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function changeMainImage(index) {
    const product = products.find(p => p.id === parseInt(new URLSearchParams(window.location.search).get('id')));
    if (product && product.images[index]) {
        document.getElementById('main-image').src = product.images[index];
    }
}

// Función para añadir un producto al carrito
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) {
        console.error('Producto no encontrado');
        return;
    }

    const cartItem = {
        id: product.id,
        name: product.name,
        price: parseFloat(product.basePrice || product.price), // Usar basePrice o price
        quantity: 1,
        images: product.images
    };


    // Buscar si el producto ya está en el carrito
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    // Guardar en localStorage y actualizar visualización
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
    showNotification('Producto añadido al carrito');
}

// Función para agregar las diferentes variantes de cada producto
function addToCartWithVariants(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) {
        console.error('Producto no encontrado');
        return;
    }

    let selectedVariants = {};
    let totalPriceModifier = 0;

    if (product.variants) {
        for (const [key, values] of Object.entries(product.variants)) {
            const selectElement = document.getElementById(key);
            if (selectElement) {
                const selectedValue = selectElement.value;
                selectedVariants[key] = selectedValue;
                const variant = values.find(v => (v.name || v.type || v.size) === selectedValue);
                if (variant) {
                    if (variant.priceModifier) {
                        totalPriceModifier += variant.priceModifier;
                    }
                    if (variant.stock <= 0) {
                        showNotification('Lo sentimos, este producto está agotado', 'error');
                        return;
                    }
                }
            }
        }
    }

    const finalPrice = product.basePrice + totalPriceModifier;

    const cartItem = {
        id: product.id,
        name: product.name,
        price: finalPrice,
        selectedVariants: selectedVariants,
        quantity: 1,
        images: product.images
    };

    const existingItemIndex = cart.findIndex(item => 
        item.id === cartItem.id && 
        JSON.stringify(item.selectedVariants) === JSON.stringify(cartItem.selectedVariants)
    );

    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += 1;
    } else {
        cart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
    showNotification('Producto añadido al carrito');
}

// Función para actualizar el carrito
function updateCart() {
    // Obtener el carrito del localStorage
    cart = JSON.parse(localStorage.getItem('cart')) || [];

    const cartItems = document.getElementById('cart-items');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartTax = document.getElementById('cart-tax');
    const cartDiscount = document.getElementById('cart-discount');
    const cartTotal = document.getElementById('cart-total');

    // Actualizar el contador del carrito
    updateCartCounter();

    // Si no encontramos el contenedor de items del carrito, salimos
    if (!cartItems) {
        console.log('Contenedor del carrito no encontrado');
        return;
    }

    // Limpiar el contenedor del carrito
    cartItems.innerHTML = '';

    // Si el carrito está vacío
    if (cart.length === 0) {
        cartItems.innerHTML = '<li class="list-group-item">El carrito está vacío</li>';
        if (cartSubtotal) cartSubtotal.textContent = '0.00';
        if (cartTax) cartTax.textContent = '0.00';
        if (cartDiscount) cartDiscount.textContent = '0.00';
        if (cartTotal) cartTotal.textContent = '0.00';
        return;
    }

    // Calcular subtotal y mostrar items
    let subtotal = 0;
    cart.forEach(item => {
        const itemPrice = parseFloat(item.price || item.basePrice);
        if (!isNaN(itemPrice) && typeof item.quantity === 'number') {
            const itemTotal = itemPrice * item.quantity;
            subtotal += itemTotal;

            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.innerHTML = `
                <div class="cart-item">
                    <img src="${item.images && item.images[0] ? item.images[0] : ''}" alt="${item.name}" style="width: 100px;">
                    <div class="cart-item-details">
                        <h5>${item.name}</h5>
                        <p>Precio: $${itemPrice.toFixed(2)}</p>
                        <div class="quantity-controls">
                            <button onclick="updateItemQuantity(${item.id}, ${item.quantity - 1})">-</button>
                            <span>${item.quantity}</span>
                            <button onclick="updateItemQuantity(${item.id}, ${item.quantity + 1})">+</button>
                        </div>
                        <p>Subtotal: $${itemTotal.toFixed(2)}</p>
                        <button class="remove-item" onclick="removeFromCart(${item.id})">Eliminar</button>
                    </div>
                </div>
            `;
            cartItems.appendChild(li);
        } else {
            console.error('Item inválido en el carrito:', item);
        }
    });

    // Actualizar totales
    const tax = subtotal * TAX_RATE;
    const discount = appliedCoupon ? (subtotal * appliedCoupon.discountPercentage) / 100 : 0;
    const total = subtotal + tax - discount;

    if (cartSubtotal) cartSubtotal.textContent = subtotal.toFixed(2);
    if (cartTax) cartTax.textContent = tax.toFixed(2);
    if (cartDiscount) cartDiscount.textContent = discount.toFixed(2);
    if (cartTotal) cartTotal.textContent = total.toFixed(2);

    // Guardar el carrito en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updatePrice(productId) {
    const product = products.find(p => p.id === productId);
    if (!product || !product.variants) return;

    let totalPriceModifier = 0;
    let isOutOfStock = false;

    for (const [key, values] of Object.entries(product.variants)) {
        const selectedValue = document.getElementById(key).value;
        const variant = values.find(v => (v.name || v.type || v.size) === selectedValue);
        if (variant) {
            if (variant.priceModifier) {
                totalPriceModifier += variant.priceModifier;
            }
            if (variant.stock <= 0) {
                isOutOfStock = true;
            }
        }
    }

    const newPrice = product.basePrice + totalPriceModifier;
    document.getElementById('product-price').textContent = newPrice.toFixed(2);

    const addToCartButton = document.getElementById('add-to-cart-button');
    if (addToCartButton) {
        addToCartButton.disabled = isOutOfStock;
        addToCartButton.textContent = isOutOfStock ? 'Agotado' : 'Añadir al carrito';
    }
}

// Función para actualizar las cantidades
function updateItemQuantity(productId, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(productId);
        return;
    }

    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    }
}

// Función para actualizar el contador del carrito en el header
function updateCartCounter() {
    const cartCounter = document.getElementById('cart-counter');
    if (cartCounter) {
        const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
        cartCounter.textContent = itemCount;
        cartCounter.style.display = itemCount > 0 ? 'inline-block' : 'none';
    }
}

// Función para eliminar un producto del carrito
function removeFromCart(productId) {
    
    const index = cart.findIndex(item => item.id === productId);
    if (index !== -1) {
        cart.splice(index, 1); // Eliminar producto del carrito

        // Guardar el carrito actualizado en localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        updateCart(); // Actualizar la visualización del carrito
        showNotification('Producto eliminado del carrito');
    }
    updateCart();
}

// Función para limpiar el carrito
function clearCart() {
    cart = [];
    localStorage.removeItem('cart');
    updateCart();
    resetCartCounter(); // Añade esta línea
    showNotification('El carrito ha sido limpiado.');
}

// Función para resetear el contador del carrito
function resetCartCounter() {
    const cartCounter = document.getElementById('cart-counter');
    if (cartCounter) {
        cartCounter.textContent = '0';
        cartCounter.style.display = 'none';
    }
}

// Función para buscar productos
function searchProducts(event) {
    event.preventDefault();
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const searchResults = document.getElementById('search-results');
    
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );

    if (searchResults) {
        searchResults.innerHTML = '';
        
        if (filteredProducts.length === 0) {
            searchResults.innerHTML = '<p>No se encontraron productos.</p>';
        } else {
            filteredProducts.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    <img src="${product.images[0]}" alt="Imagen principal de ${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p>Precio: $${product.basePrice.toFixed(2)}</p>
                    <button onclick="addToCart(${product.id})">Añadir al carrito</button>
                    <a href="product-detail.html?id=${product.id}">Ver detalles</a>
                `;
                searchResults.appendChild(productCard);
            });
        }
    }
}

// Función para aplicar un cupón de descuento
function applyCoupon(event) {
    event.preventDefault();
    const couponCode = document.getElementById('coupon-code').value.toUpperCase();
    const coupons = [
        { code: 'DESCUENTO10', discountPercentage: 10 },
        { code: 'PROMO20', discountPercentage: 20 },
        // Añadir más cupones aquí
    ];

    const coupon = coupons.find(c => c.code === couponCode);
    if (coupon) {
        appliedCoupon = coupon;
        updateCart();
        showNotification(`Cupón aplicado: ${coupon.discountPercentage}% de descuento`);
    } else {
        showNotification('Cupón inválido', 'error');
    }
}

// Función para realizar el checkout
function checkout() {
    if (cart.length === 0) {
        showNotification('El carrito está vacío', 'error');
        return;
    }
    
    let message = 'Nuevo pedido:\n\n';
    let subtotal = 0;
    
    cart.forEach(item => {
        message += `${item.name} - $${item.price.toFixed(2)} x ${item.quantity}\n`;
        if (item.selectedVariants) {
            for (const [key, value] of Object.entries(item.selectedVariants)) {
                message += `  ${key}: ${value}\n`;
            }
        }
        subtotal += item.price * item.quantity;
    });
    
    let tax = subtotal * TAX_RATE;
    let discount = appliedCoupon ? (subtotal * appliedCoupon.discountPercentage) / 100 : 0;
    let total = subtotal + tax - discount;
    
    message += `\nSubtotal: $${subtotal.toFixed(2)}`;
    message += `\nIVA (19%): $${tax.toFixed(2)}`;
    if (discount > 0) {
        message += `\nDescuento: $${discount.toFixed(2)}`;
    }
    message += `\nTotal: $${total.toFixed(2)}`;
    
    let encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/573235192203?text=${encodedMessage}`, '_blank');
    
    cart = [];
    appliedCoupon = null;
    localStorage.removeItem('cart');
    updateCart();
    showNotification('Pedido enviado. Gracias por tu compra!');
}

// Función para alternar el menú de navegación
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Función para alternar los filtros
function toggleFilters() {
    const filterForm = document.querySelector('.filters form');
    filterForm.classList.toggle('active');
}

// Función para notificaciones
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCart();
    updateCartCounter();


    const addToCartButton = document.getElementById('add-to-cart-button');
    if (addToCartButton) {
        addToCartButton.addEventListener('click', () => {
            const productId = new URLSearchParams(window.location.search).get('id');
            addToCartWithVariants(parseInt(productId));
        });
    }

    try {
        const savedCart = localStorage.getItem('cart');
        cart = savedCart ? JSON.parse(savedCart) : [];
    } catch (e) {
        console.error('Error al cargar el carrito:', e);
        cart = [];
    }

    if (document.getElementById('featured-products-grid')) {
        displayFeaturedProducts();
    }
    
    if (document.getElementById('product-grid')) {
        displayProducts();
        displayCategoryFilters();
    }

    const filterForm = document.getElementById('filter-form');
    if (filterForm) {
        filterForm.addEventListener('submit', applyFilters);
    }

    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', searchProducts);
    }

    const urlParams = new URLSearchParams(window.location.search);
    const productIdParam = urlParams.get('id');
    if (document.getElementById('product-detail') && productIdParam) {
        displayProductDetail(productIdParam);
    }

    const checkoutButton = document.getElementById('checkout-button');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', checkout);
    }

    const clearCartButton = document.getElementById('clear-cart-button');
    if (clearCartButton) {
        clearCartButton.addEventListener('click', clearCart);
    }

    const couponForm = document.getElementById('coupon-form');
    if (couponForm) {
        couponForm.addEventListener('submit', applyCoupon);
    }

    // Agregar event listeners para los botones de menú y filtros
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }

    const filterToggle = document.querySelector('.filter-toggle');
    if (filterToggle) {
        filterToggle.addEventListener('click', toggleFilters);
    }
});

// Manejo del formulario de contacto
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            
            fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    showNotification('Mensaje enviado con éxito. Gracias por contactarnos!', 'success');
                    form.reset();
                } else {
                    throw new Error('Error al enviar el formulario');
                }
            }).catch(error => {
                console.error('Error:', error);
                showNotification('Hubo un problema al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.', 'error');
            });
        });
    }
});
