const specialItems = [
    { id: 11, name: 'Special Sushi Roll', price: 3.50, image: '../images/rMDishT1.png' },
    { id: 12, name: 'Chef’s Testing Menu', price: 4.99, image: '../images/rMDishT2.jpg' },
    { id: 13, name: 'Dragon Roll Tiramisu', price: 6.50, image: '../images/rMDishT3.jpg' },
    { id: 14, name: 'Chef’s Special Tempura', price: 4.25, image: '../images/rMDishT4.jpg' }
];

const menuItems = [
    { id: 1, name: 'SWEET TOMATO SUSAKI', price: 1.25, category: 'Single Shashami' },
    { id: 2, name: 'MISO-GLAZED SLAMON', price: 6.99, category: 'Single Shashami' },
    { id: 3, name: 'SPCIY TUNA ROLL', price: 1.99, category: 'Double Shashami' },
    { id: 4, name: 'SPICY SALMON TERIYAKI', price: 4.25, category: 'Double Shashami' },
    { id: 5, name: 'VEGETABLE TEMPURA BENTO', price: 3.99, category: 'Double Shashami' },
    { id: 6, name: 'TERIYAKI CHICKEN BENTO', price: 6.25, category: 'Double Shashami' },
    { id: 7, name: 'GRILLED YELLOWTAIL COLLAR', price: 1.99, category: 'Single Shashami' },
    { id: 8, name: 'TOFU STAKE WITH GINGER ', price: 1.25, category: 'Single Shashami' },
    { id: 9, name: 'SPIDER ROLL NIGIRI', price: 8.25, category: 'Single Shashami' },
    { id: 10, name: 'SWEET SOFU SUSAKI', price: 11.99, category: 'Single Shashami' },
    
];

let selectedItems = []; 


function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');

    const header = document.getElementById('headerSection');
    header.style.display = pageId === 'menuPage' ? 'block' : 'none';
}


function updateProgressBar(percentage) {
    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = `${percentage}%`;
}


function toggleItemSelection(item) {
    const index = selectedItems.findIndex(i => i.id === item.id);
    if (index === -1) {
        selectedItems.push(item);
    } else {
        selectedItems.splice(index, 1);
    }
    updateUI();
    if (selectedItems.length > 0) {
        updateProgressBar(33); 
    }
}


function updateUI() {
    const checkoutBtn = document.getElementById('checkoutBtn');
    const itemCount = document.getElementById('itemCount');
    itemCount.textContent = selectedItems.length;
    checkoutBtn.classList.toggle('visible', selectedItems.length > 0);

    document.querySelectorAll('.menu-item, .special-item').forEach(el => {
        const itemId = parseInt(el.dataset.id);
        el.classList.toggle('selected', selectedItems.some(item => item.id === itemId));
    });


    if (selectedItems.length === 0) {
        updateProgressBar(0); 
    }
}



function renderSpecialItems() {
    const specialsContainer = document.getElementById('specialItems');
    specialsContainer.innerHTML = specialItems.map(item => `
        <div class="special-item" data-id="${item.id}">
            <img src="${item.image}" alt="${item.name}">
            <div class="special-item-overlay">${item.name} - $${item.price.toFixed(2)}</div>
        </div>
    `).join('');
}

function renderMenuItems() {
    const container = document.getElementById('menuItems');
    const categories = ['Single Shashami', 'Double Shashami'];

    categories.forEach(category => {
        const categoryItems = menuItems.filter(item => item.category === category);
        const categorySection = document.createElement('div');
        categorySection.innerHTML = `
            <h3 class="h3_">${category}</h3>
            ${categoryItems.map(item => `
                <div class="menu-item" data-id="${item.id}">
                    <span class="product-name">${item.name}</span>
                    <span class="product-price">$${item.price.toFixed(2)}</span>
                </div>
            `).join('')}
        `;
        container.appendChild(categorySection);
    });
}


function renderSelectedItems() {
    const container = document.getElementById('selectedItems');
    const total = selectedItems.reduce((sum, item) => sum + item.price, 0);
    container.innerHTML = `
        <div style="background-color: #f9fafb; padding: 1rem; border-radius: 0.5rem; margin-bottom: 1rem;">
            <h3 style="margin-bottom: 0.5rem;">Selected Items:</h3>
            ${selectedItems.map(item => `
                <div style="display: flex; justify-content: space-between; padding: 0.5rem 0;">
                    <span>${item.name}</span>
                    <span>$${item.price.toFixed(2)}</span>
                </div>
            `).join('')}
            <div style="border-top: 1px solid #ddd; margin-top: 0.5rem; padding-top: 0.5rem; font-weight: bold; display: flex; justify-content: space-between;">
                <span>Total:</span>
                <span>$${total.toFixed(2)}</span>
            </div>
        </div>
    `;
}


function returnToMenu() {
    selectedItems = [];
    showPage('menuPage');
    updateUI();
    updateProgressBar(0); 
    document.getElementById('checkoutForm').reset();
}


document.getElementById('menuItems').addEventListener('click', (e) => {
    const menuItem = e.target.closest('.menu-item');
    if (menuItem) {
        const itemId = parseInt(menuItem.dataset.id);
        const item = menuItems.find(i => i.id === itemId);
        if (item) toggleItemSelection(item);
    }
});

document.getElementById('specialItems').addEventListener('click', (e) => {
    const specialItem = e.target.closest('.special-item');
    if (specialItem) {
        const itemId = parseInt(specialItem.dataset.id);
        const item = specialItems.find(i => i.id === itemId);
        if (item) toggleItemSelection(item);
    }
});

document.getElementById('checkoutBtn').addEventListener('click', () => {
    showPage('checkoutPage');
    renderSelectedItems();
    updateProgressBar(66); 
});

document.getElementById('checkoutForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    document.getElementById('customerName').textContent = formData.get('name');
    document.getElementById('confirmationOverlay').style.display = 'flex';

    setTimeout(() => {
        document.getElementById('confirmationOverlay').style.display = 'none';
        showPage('confirmationPage');
        updateProgressBar(100); 
    }, 1000);
});

document.querySelector('.confbtn').addEventListener('click', returnToMenu);


renderSpecialItems();
renderMenuItems();
