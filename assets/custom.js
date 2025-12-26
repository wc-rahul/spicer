
  document.addEventListener('DOMContentLoaded', function () {
    const triggerBtn = document.getElementById('cart-drawer-button-section');

    if (triggerBtn) {
      triggerBtn.addEventListener('click', function () {
        // Try to find the "real" open button inside the cart drawer component
        const cartDrawer = document.querySelector('cart-drawer-component');

        if (!cartDrawer) return;

        const openButton = cartDrawer.querySelector('button[on\\:click="/open"]');

        if (openButton) {
          openButton.click();
        } else {
          console.warn('Cart drawer open button not found');
        }
      });
    }

    function updateCallOuts() {
        const lastVariantAdded = window.localStorage.getItem('lastVariantAdded')
        const cartItemCallOut = document.querySelector(`[data-call-out="${lastVariantAdded}"]`)
        if (cartItemCallOut) cartItemCallOut.classList.remove('hidden')
    }
    document.addEventListener('cart:update', () => {
      updateCallOuts();
    });

    updateCallOuts();

  });

