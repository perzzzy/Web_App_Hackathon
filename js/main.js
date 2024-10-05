document.addEventListener('DOMContentLoaded', () => {
    // Set up the menu button functionality
    const menuButton = document.querySelector('.menu-button');
    const menu = document.querySelector('.menu');
    const mainNavigation = document.querySelector('.main-navigation');

    if (menuButton && menu && mainNavigation) {
        menuButton.addEventListener('click', () => {
            // Check if the menu is currently expanded
            const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
            // Update the aria attribute and toggle the menu's visibility
            menuButton.setAttribute('aria-expanded', !isExpanded);
            menu.classList.toggle('open', !isExpanded);
            mainNavigation.classList.toggle('open', !isExpanded);
        });
    }

    // Set up the search button functionality
    const searchButton = document.querySelector('.search-button');
    const searchContainer = document.querySelector('.search-container');

    if (searchButton && searchContainer) {
        searchButton.addEventListener('click', () => {
            // Toggle the visibility of the search container
            searchContainer.classList.toggle('active');
            // If the container is active, focus on the search input
            if (searchContainer.classList.contains('active')) {
                document.getElementById('search').focus();
            }
        });
    }

    // Set up category toggle functionality
    document.querySelectorAll('.category-button').forEach(button => {
        button.addEventListener('click', () => {
            // Check if the category is currently expanded
            const expanded = button.getAttribute('aria-expanded') === 'true';
            // Update the aria attribute and toggle the visibility of the links
            button.setAttribute('aria-expanded', !expanded); // Update ARIA attribute
            const links = button.nextElementSibling;
            links.setAttribute('aria-hidden', expanded); // Update ARIA attribute
        });
    });

    // Fetch the product data from the JSON file
    let productData;
    fetch('data/json/data.json')
        .then(response => {
            // Check if the fetch was successful
            if (!response.ok) {
                throw new Error('Data is not being fetched');
            }
            return response.json();
        })
        .then(data => {
            productData = data; // Save the fetched data

            // Add event listeners to the color options
            document.querySelectorAll('.colour-options span').forEach(option => {
                option.addEventListener('click', () => {
                    // Get the selected product color
                    const selectedProduct = option.getAttribute('data-colour');
                    const productImage = productData[selectedProduct].photo;
                    const imageElement = document.getElementById('product-image');
                    // Update the image source to the new color
                    imageElement.src = `assets/images/${productImage}`;
                });
            });
        })
        .catch(error => {
            // Log any errors that occur during the fetch
            console.error('There was a problem with the fetch operation:', error);
        });

    // Set up Add to Cart functionality
    const addToCartButton = document.getElementById('addtocartbutton');
    const cartItemCount = document.getElementById('cartitemcount');

    // Initialize item count
    let itemCount = 0;

    if (addToCartButton && cartItemCount) {
        addToCartButton.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent default anchor behavior
            itemCount++; // Increment item count
            cartItemCount.textContent = itemCount; // Update the displayed count
        });
    }
});
