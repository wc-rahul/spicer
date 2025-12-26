document.addEventListener('DOMContentLoaded', function() {
  // Desktop only
  if (window.innerWidth > 768) {
    document.querySelectorAll('.block-vertical-nav').forEach(nav => {
      const items = nav.querySelectorAll('[class*="block-vertical-nav__item-"]');
      if (!items.length) return;

      // Helper: remove .active from all, add to first
      function activateFirst() {
        items.forEach(i => i.classList.remove('active'));
        if (items[0]) items[0].classList.add('active');
      }

      // On mouseenter for each item: set .active
      items.forEach(item => {
        item.addEventListener('mouseenter', () => {
          items.forEach(i => i.classList.remove('active'));
          item.classList.add('active');
        });
      });

      // On mouseleave for the whole nav: restore .active to first item
      nav.addEventListener('mouseleave', () => {
        activateFirst();
      });

      // On load: ensure first item is active
      activateFirst();
    });
  }

  // Desktop positioning
  if (window.innerWidth > 768) {
    document.querySelectorAll('.block-vertical-nav').forEach(nav => {
      nav.querySelectorAll('[class*="block-vertical-nav__submenu"], [class*="block-vertical-nav__sub-submenu"]').forEach(submenu => {
        const parentItem = submenu.parentElement;
        if (parentItem) {
            parentItem.addEventListener('mouseenter', () => {
                if (submenu instanceof HTMLElement) {
                submenu.style.left = '100%';
                submenu.style.right = 'auto'; 
                // submenu.style.marginLeft = '8px';
                submenu.style.marginRight = '0';
                submenu.style.minHeight = '100%';
               
                }
            
            });
            parentItem.addEventListener('mouseleave', () => {
            if (submenu instanceof HTMLElement) {
                submenu.style.top = '0';
                submenu.style.left = '100%';
                submenu.style.right = 'auto';
                // submenu.style.marginLeft = '8px';
                submenu.style.marginRight = '0';
            }
            });
        }
    });
    });
  }

//   // Mobile interactions
//   if (window.innerWidth <= 768) {
//     document.querySelectorAll('.block-vertical-nav').forEach(nav => {
//       nav.querySelectorAll('[class*="block-vertical-nav__item"], [class*="block-vertical-nav__submenu-item"]').forEach(item => {
//         const link = item.querySelector('[class*="block-vertical-nav__link"], [class*="block-vertical-nav__submenu-link"]');
//         const submenu = item.querySelector('[class*="block-vertical-nav__submenu"], [class*="block-vertical-nav__sub-submenu"]');
//         if (submenu && link) {
//           link.addEventListener('click', (e) => {
//             e.preventDefault();
//             const isActive = item.classList.contains('active');
//             const parentLevel = item.parentElement;
//             parentLevel.querySelectorAll(':scope > li').forEach(siblingItem => {
//               if (siblingItem !== item) siblingItem.classList.remove('active');
//             });
//             if (isActive) {
//               item.classList.remove('active');
//             } else {
//               item.classList.add('active');
//             }
//           });
//         }
//       });
//     });
//   }
});
