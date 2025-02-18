document.addEventListener('DOMContentLoaded', ()=>{
    const products = [
        {
            id: 1,
            name: 'product 1',
            price: 29.99,
        },
        {
            id: 2,
            name: 'product 2',
            price: 39.99,
        },
        {
            id: 3,
            name: 'product 3',
            price: 59.999,
        },
    ];

    const carts = JSON.parse(localStorage.getItem('carts')) || [];
    
    

    const productList = document.getElementById("product-list");
    const cartItemsDisplay = document.getElementById("cart-items");
    const emptyCartMessage = document.getElementById("empty-cart");
    const cartTotalDisplay = document.getElementById("cart-total");
    const totalPriceDisplay = document.getElementById("total-price");
    const checkoutBtn = document.getElementById("checkout-btn");

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
        <span>${product.name}</span> $${product.price.toFixed(2)}
        <button data-id="${product.id}">Add to cart</button>
        `
        productList.appendChild(productDiv);
    });

    productList.addEventListener('click', (e) =>{
        if (e.target.tagName === 'BUTTON') {
            const productId = parseInt(e.target.getAttribute('data-id'))
            const product = products.find(p => p.id === productId);
            addToCart(product);            
        }
    });

    function addToCart(product){
        const existingItem = carts.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity++
        } else{
            carts.push({...product, quantity: 1});
            
        }
        renderCart()
    };

    function renderCart(){
        cartItemsDisplay.innerHTML = '';
        let totalPrice = 0;
        if (carts.length > 0) {
            emptyCartMessage.classList.add('hidden');
            cartTotalDisplay.classList.remove('hidden');

            carts.forEach(item => {
                totalPrice += item.price * item.quantity
                const cartItem = document.createElement('div');
                cartItem.innerHTML = `
                ${item.name} $${item.price.toFixed(2)}
                - ${item.quantity}
                <button data-id="${item.id}" class="remove-item">Remove</button>
                `;
                cartItemsDisplay.appendChild(cartItem);
            });
            totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`
            saveCard()
            
        } else{
            emptyCartMessage.classList.remove('hidden');
            totalPriceDisplay.textContent = `$0.00`
            cartTotalDisplay.classList.add('hidden');

        }
    };

    cartItemsDisplay.addEventListener('click', (e) => {
        if (e.target.classList.contains("remove-item")) {
          const productId = parseInt(e.target.getAttribute("data-id"));
          removeProduct(productId);
        }
    })
    
    function removeProduct(productId){        
        const index = carts.findIndex(item => item.id === productId)

        if (index > -1) {
            if (carts[index].quantity > 1) {
                carts[index].quantity--;                
            } else{
                carts.splice(index, 1)
            }
            renderCart()
            saveCard()
        }
        
    }
    function saveCard(){
        localStorage.setItem('carts', JSON.stringify(carts))
    }

    checkoutBtn.addEventListener('click', () =>{
        carts.length = 0;
        localStorage.removeItem('carts');
        alert('Checkout Succesfully');
        renderCart()
    })
    renderCart()
})