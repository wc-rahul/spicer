document.addEventListener('DOMContentLoaded', () => {
  const openButtons = document.querySelectorAll('.request-form, .enquire-form');
  const drawers = document.querySelectorAll('.request_drawer, .enquire_drawer');

  if (!openButtons.length || !drawers.length) return;

  openButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      drawers[index]?.classList.add('is_open');
    });
  });

  drawers.forEach(drawer => {
    const closeBtn = drawer.querySelector('.rd_close');

    closeBtn?.addEventListener('click', () => {
      drawer.classList.remove('is_open');
    });
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      drawers.forEach(drawer => drawer.classList.remove('is_open'));
    }
  });
});



document.addEventListener("DOMContentLoaded", function () {
  const headerTopMenu = document.querySelectorAll('.header_top .header_top_left .menu_item');
  const headerMainMenu = document.querySelectorAll('.header .header__column header-menu');
  headerTopMenu?.forEach((link) => link.classList.remove('is_active'));
  headerMainMenu?.forEach((mainmenu) => mainmenu.classList.remove('is_active'));
  headerTopMenu[0]?.classList.add('is_active');
  headerMainMenu[0]?.classList.add('is_active');
  const menuItems = document.querySelectorAll(".header_top_left .menu_item");
  menuItems.forEach(function (item) {
    item.addEventListener("click", function () {
      menuItems.forEach(function (el) {
        el.classList.remove("is_active");
      });
      const menuHandle = this.getAttribute('data-menu');
      headerMainMenu.forEach((mainmenu) => {
        mainmenu.classList.remove("is_active");
        const mainmenuHandle = mainmenu.getAttribute('data-getmenu');
        if(menuHandle.trim().toLowerCase() === mainmenuHandle?.trim().toLowerCase()){
          mainmenu.classList.add("is_active");;
        }
      });
      console.log(menuHandle);
      this.classList.add("is_active");
    });
  });
});


class HeaderSinglemenu extends HTMLElement {
  constructor() {
    super();
    this.menuHandle = this.closest('.mega-menu')?.getAttribute('data-parent-link');
    this.mainLink = this.closest('li.menu-list__list-item');
    this.mainHandle = this.mainLink?.querySelector('.menu-list__submenu')?.getAttribute('data-parent-link');
    if(this.menuHandle == this.mainHandle){
      this.mainLink?.classList.add('simple_menu_nav');
    }
  }
}
customElements.define('header-singlemenu', HeaderSinglemenu);