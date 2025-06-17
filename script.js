const products = document.querySelector('#products');
const mainElement = document.querySelector('#main');
const loadMore = document.querySelector('#loadMore');
const scrollToTop = document.querySelector('#scrollToTop');

// Track the current range
let startNumber = 1;
let endNumber = 8; // First load shows items 1-8 (8 items)

function loadProducts(start, end) {
    fetch("./public/data.json")
        .then((response) => response.json())
        .then((data) => {
            if(start >= data.products.length){
                loadMore.style.display = "none";
                return;
            }

            const filtered = data.products.filter(item => item.id >= start && item.id <= end);
            
            filtered.forEach((item) => {
                products.innerHTML += `
                <div id="item">
                    <h2 id="itemHead">${item.name}</h2>
                    <img src="${item.image}" width="200" height="200" alt="${item.name}" />
                    <p id="price">Price: ${item.price}</p>
                </div>
                `;
            });
            
            // Update the range for next load
            startNumber = end + 1;
            endNumber = startNumber + 8;
        })
        .catch((error) => {
            products.innerHTML = `<p>Error loading products: ${error}</p>`;
            loadMore.style.display = "none";
        });
}

// Initial load
loadProducts(startNumber, endNumber);

document.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    // If the user is near the bottom, load more products
    if (scrollTop + clientHeight + 3 >= scrollHeight) {
        loadProducts(startNumber, endNumber);
    } 
});

// Scroll to top functionality
scrollToTop.addEventListener('click', ()=> {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
})