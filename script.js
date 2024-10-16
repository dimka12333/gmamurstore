// Отримуємо модальні вікна і кнопки закриття
const modal = document.getElementById('product-modal');
const closeModal = document.getElementsByClassName('close')[0];
const cartModal = document.getElementById('cart-modal');
const closeCart = document.getElementsByClassName('close-cart')[0];
const checkoutModal = document.getElementById('checkout-modal');
const closeCheckout = document.getElementsByClassName('close-checkout')[0];
const modalInfo = document.getElementById('modal-info');
const cartIcon = document.getElementById('cart-icon');
const cartCount = document.getElementById('cart-count');
const cartItemsContainer = document.getElementById('cart-items');
const checkoutButton = document.getElementById('checkout-button');
const checkoutForm = document.getElementById('checkout-form');
const emailInput = document.getElementById('email');

// Дані про товари (розширено для нових товарів)
const products = {
    1: {
        name: "Туш для вій",
        price: "100.00 грн",
        description: "Туш для вій забезпечує максимальний об'єм, подовження та виразний вигин, надаючи вашим віям глибокого чорного кольору для бездоганного вигляду."
    },
    2: {
        name: "Чоловічий шампунь",
        price: "400.00 грн",
        description: "Твердий Чугун — це інноваційний засіб 100 в 1, який можна використовувати як зубну пасту, гель для душу, бритвений крем і навіть миючий засіб, забезпечуючи універсальний догляд для всього тіла."
    },
    3: {
        name: "Помада",
        price: "50.00 грн",
        description: "Помада надає губам насичений колір і зволоження, забезпечуючи тривале та комфортне носіння протягом дня."
    },
    4: {  // Новий товар
        name: "Парфум чоловічий",
        price: "900.00 грн",
        description: "Чоловічий парфум з інтенсивним, стійким ароматом, що підкреслює елегантність та впевненість протягом дня."
    },
    5: {  // Новий товар
        name: "Палетка тіней",
        price: "150.00 грн",
        description: "Палетка тіней з багатою кольоровою гамою, яка дозволяє створювати різноманітні образи від природних до яскравих і драматичних."    
    },
    6: {  // Новий товар для другої сторінки
        name: "Парфум жіночий",
        price: "1000.00 грн",
        description: "Жіночий парфум з витонченим ароматом, що поєднує ніжні квіткові ноти з чуттєвим шлейфом, підкреслюючи вашу елегантність і чарівність."
    },
    7: {  // Новий товар для другої сторінки
        name: "Піна для гоління",
        price: "110.00 грн",
        description: "Піна для гоління, що забезпечує гладке ковзання леза, зволожуючи шкіру та запобігаючи подразненню."
    },
    8: {  // Новий товар для другої сторінки
        name: "Дезодорант (спрей)",
        price: "60.00 грн",
        description: "Дезодорант-спрей забезпечує свіжість і захист від запаху на весь день, залишаючи легкий аромат."
    },
    9: {  // Новий товар для другої сторінки
        name: "Дезодорант (кульковий)",
        price: "100.00 грн",
        description: "Роликовий дезодорант надає тривалий захист від запаху та потовиділення, даруючи комфорт і свіжість протягом дня."
    },
    10: {  // Новий товар для другої сторінки
        name: "Олівець для брів",
        price: "150.00 грн",
        description: "Олівець для брів забезпечує точне підкреслення форми та природний вигляд брів, додаючи виразності обличчю."
    }
};
// Отримуємо кошик з LocalStorage або створюємо новий
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Функція для оновлення LocalStorage після змін у кошику
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Функція для відкриття модального вікна з інформацією про товар
function openModal(productId) {
    const product = products[productId];
    modalInfo.innerHTML = `
        <h2>${product.name}</h2>
        <p>Price: ${product.price}</p>
        <p>${product.description}</p>
    `;
    modal.style.display = 'block';
}

// Закриваємо модальне вікно товару
closeModal.onclick = function() {
    modal.style.display = 'none';
}

// Додаємо товар до кошика
function addToCart(productId) {
    cart.push(products[productId]);
    updateCart();
    saveCart(); // Зберігаємо кошик після додавання товару
}

// Оновлюємо кількість товарів у кошику
function updateCart() {
    cartCount.textContent = cart.length;
}

// Відображаємо кошик
cartIcon.onclick = function() {
    cartItemsContainer.innerHTML = cart.map(item => `<p>${item.name} - ${item.price}</p>`).join('');
    cartModal.style.display = 'block';
}

// Закриваємо модальне вікно кошика
closeCart.onclick = function() {
    cartModal.style.display = 'none';
}

// Відображаємо вікно оформлення замовлення
checkoutButton.onclick = function() {
    cartModal.style.display = 'none';
    checkoutModal.style.display = 'block';
}

// Закриваємо вікно оформлення замовлення
closeCheckout.onclick = function() {
    checkoutModal.style.display = 'none';
}

// Відправляємо форму оформлення замовлення
checkoutForm.onsubmit = function(e) {
    e.preventDefault();
    const email = emailInput.value;
    alert(`Order placed! Confirmation will be sent to ${email}`);
    cart = [];
    updateCart();
    saveCart(); // Очищаємо кошик у LocalStorage після замовлення
    checkoutModal.style.display = 'none';
}

// Обробляємо клік на кнопку "View Details"
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.view-details').forEach(button => {
        button.onclick = function() {
            openModal(this.dataset.id);
        };
    });

    // Обробляємо клік на кнопку "Add to Cart"
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.onclick = function() {
            addToCart(this.dataset.id);
        };
    });

    // Оновлюємо кошик на сторінці при завантаженні (якщо є дані)
    updateCart();
});