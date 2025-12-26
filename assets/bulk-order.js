document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('variantSearch');
    const rows = document.querySelectorAll('.variant-row');

    function filterTable(value) {
        value = value.toLowerCase();
        rows.forEach(row => {
            row.style.display = row.dataset.search.includes(value) ? '' : 'none';
        });
    }
    searchInput.addEventListener('keyup', e => {
        filterTable(e.target.value);
    });

    document.querySelectorAll('.bo_swatch').forEach(swatch => {
        swatch.addEventListener('click', () => {
            const value = swatch.dataset.search;
            searchInput.value = value;
            filterTable(value);
        });
    });

    const clearBtn = document.getElementById('clearFilters');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            searchInput.value = '';
            rows.forEach(row => row.style.display = '');
        });
    }

    // Add to Cart buttons
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', async () => {
            const variantId = btn.dataset.id;
            const row = btn.closest('tr');
            const qtyInput = row.querySelector('input[type="number"]');
            const quantity = qtyInput ? parseInt(qtyInput.value) : 1;

            if (!variantId || quantity < 1) return;

            try {
                await fetch('/cart/add.js', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id: variantId,
                        quantity: quantity
                    })
                });

                // console.log('Product added to cart:', variantId, 'Qty:', quantity);
                refreshCartDrawer();

            } catch (err) {
                console.error('Add to cart failed', err);
            }
        });
    });


    async function refreshCartDrawer() {
        const currentTime = Date.now();

        import('@theme/events').then(({
            CartUpdateEvent
        }) => {
            const cartDrawer = document.querySelector('cart-drawer-component');

            fetch(`/cart.js?${currentTime}`)
                .then(res => res.json())
                .then(cart => {
                    const event = new CartUpdateEvent(cart, 'manual-trigger', {
                        itemCount: cart.item_count,
                        source: 'fad-refresh',
                        sections: {}
                    });
                    document.dispatchEvent(event);

                    setTimeout(() => {
                        closeModal?.();
                        cartDrawer?.open?.();
                        window.GTMEventBus?.publish?.('VIEW_CART', {
                            cart
                        });
                    }, 200);
                });
        });
    }
});