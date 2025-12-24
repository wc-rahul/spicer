import { Component } from '@theme/component';
import { debounce, onDocumentReady } from '@theme/utilities';
import { MegaMenuHoverEvent } from '@theme/events';

const SHORT_ACTIVATE_DELAY = 0;
const LONG_ACTIVATE_DELAY = 250;
const DEACTIVATE_DELAY = 350;

/**
 * A custom element that manages a header menu.
 *
 * @typedef {Object} State
 * @property {HTMLElement | null} activeItem - The currently active menu item.
 *
 * @typedef {object} Refs
 * @property {HTMLElement} overflowMenu - The overflow menu.
 * @property {HTMLElement[]} [submenu] - The submenu in each respective menu item.
 *
 * @extends {Component<Refs>}
 */
class HeaderMenu extends Component {
  requiredRefs = ['overflowMenu'];

  #abortController = new AbortController();

  connectedCallback() {
    super.connectedCallback();

    this.overflowMenu?.addEventListener('pointerleave', () => this.#debouncedDeactivate(), {
      signal: this.#abortController.signal,
    });

    this.#setupHoverListeners();
    onDocumentReady(this.#preloadImages);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.#abortController.abort();
  }

  /**
   * @type {State}
   */
  #state = {
    activeItem: null,
  };

  /**
   * Time to allow for a closing animation between initiating a deactivation and actually deactivating the active item.
   * @returns {number}
   */
  get animationDelay() {
    const value = this.dataset.animationDelay;
    return value ? parseInt(value, 10) : 0;
  }

  /**
   * Get the overflow menu
   */
  get overflowMenu() {
    return /** @type {HTMLElement | null} */ (this.refs.overflowMenu?.shadowRoot?.querySelector('[part="overflow"]'));
  }

  /**
   * Whether the overflow menu is hovered
   * @returns {boolean}
   */
  get overflowHovered() {
    return this.refs.overflowMenu?.matches(':hover') ?? false;
  }

  /**
   * Activate the selected menu item immediately
   * @param {PointerEvent | FocusEvent} event
   */
  activate = (event) => {
    this.#debouncedDeactivate.cancel();
    this.#shortDebouncedActivateHandler.cancel();
    this.#longDebouncedActivateHandler.cancel();

    if (this.#state.activeItem) {
      this.#shortDebouncedActivateHandler(event);
    } else {
      this.#longDebouncedActivateHandler(event);
    }
  };

  /**
   * Activate the selected menu item with a delay
   * @param {PointerEvent | FocusEvent} event
   */
  #activateHandler = (event) => {
    console.log("here activate handler")
    this.#debouncedDeactivate.cancel();

    this.dispatchEvent(new MegaMenuHoverEvent());

    this.removeAttribute('data-animating');

    if (!(event.target instanceof Element)) return;

    let item = findMenuItem(event.target);

    if (!item || item == this.#state.activeItem) return;

    const isDefaultSlot = event.target.slot === '';
    const isMoreSlot = event.target.slot === 'more';
    console.log("isMoreSlot",isMoreSlot)
    this.dataset.overflowExpanded = (!isDefaultSlot).toString();

    const previouslyActiveItem = this.#state.activeItem;

    if (previouslyActiveItem) {
      previouslyActiveItem.ariaExpanded = 'false';
    }

    this.#state.activeItem = item;
    this.ariaExpanded = 'true';
    item.ariaExpanded = 'true';

    let submenu = findSubmenu(item);
    let overflowMenuHeight = this.overflowMenu?.offsetHeight ?? 0;

    if (!submenu && !isDefaultSlot) {
      submenu = this.overflowMenu;
    }

    const parentLink = item?.getAttribute('data-parent-link');
    let submenuInnerContent = null;
    if (parentLink) {
      submenuInnerContent = submenu?.querySelector(`.menu-list__submenu-inner[data-parent-link="${parentLink}"]`);
    }
    console.log("overflowMenuHeight",overflowMenuHeight)
    let contentHeight = 0;
    
    if (submenuInnerContent) {
      console.log("elsif submenuInnerContent",submenuInnerContent);
      const matchingChild = submenuInnerContent.querySelector(`div[data-parent-link="${parentLink}"]`);
      if (matchingChild && matchingChild instanceof HTMLElement) {
        contentHeight = matchingChild.offsetHeight;
      } else {
        contentHeight = 0;
      }
    } else {
      console.log("ELSE", submenuInnerContent);
      contentHeight = submenu?.offsetHeight ?? 0;
    }
    if (isMoreSlot) {
      contentHeight = overflowMenuHeight;
      console.log("contentHeight is more slot", contentHeight);
    } 

    requestAnimationFrame(() => {
      this.style.setProperty('--submenu-height', `${contentHeight}px`);
    });
  };

  #shortDebouncedActivateHandler = debounce(this.#activateHandler, SHORT_ACTIVATE_DELAY);
  #longDebouncedActivateHandler = debounce(this.#activateHandler, LONG_ACTIVATE_DELAY);

  /**
   * Deactivate the active item after a delay
   * @param {PointerEvent | FocusEvent} event
   */
  deactivate(event) {
    this.#shortDebouncedActivateHandler.cancel();
    this.#longDebouncedActivateHandler.cancel();

    if (!(event.target instanceof Element)) return;

    const item = findMenuItem(event.target);

    // Make sure the item to be deactivated is still the active one. Ideally
    // we cancelled the debounce before the item was changed, but just in case.
    if (item === this.#state.activeItem) {
      this.#debouncedDeactivate();
    }
  }

  /**
   * Deactivate the active item immediately
   * @param {HTMLElement | null} [item]
   */
  #deactivate = (item = this.#state.activeItem) => {
    if (!item || item != this.#state.activeItem) return;
    if (this.overflowHovered) return;

    this.style.setProperty('--submenu-height', '0px');
    this.dataset.overflowExpanded = 'false';

    this.#state.activeItem = null;
    this.ariaExpanded = 'false';
    item.ariaExpanded = 'false';
    item.setAttribute('data-animating', '');

    setTimeout(() => {
      item.removeAttribute('data-animating');
    }, this.animationDelay);
  };

  /**
   * Deactivate the active item after a delay
   * @param {PointerEvent | FocusEvent} event
   */
  #debouncedDeactivate = debounce(this.#deactivate, DEACTIVATE_DELAY);

  /**
   * Preload images that are set to load lazily.
   */
  #preloadImages = () => {
    const images = this.querySelectorAll('img[loading="lazy"]');
    images?.forEach((image) => image.removeAttribute('loading'));
  };

  /**
   * Sets up the event listeners for the mega menu hover functionality.
   */
  #setupHoverListeners() {
    const menuItems = this.querySelectorAll('.menu-list__list-item');
    menuItems.forEach((item) => {
      const anchor = item.querySelector('a[data-parent-link]');
      if (anchor) {
        item.addEventListener('mouseenter', this.#handleMouseEnter);
        item.addEventListener('mouseleave', this.#handleMouseLeave);
      }
    });
  }

  /**
   * Handles the mouseenter event on a menu item.
   * @param {MouseEvent} event - The mouse event.
   */
  #handleMouseEnter = (event) => {
    const listItem = event.currentTarget;
    console.log("listItem",listItem)
    if (!(listItem instanceof HTMLElement)) return;

    const anchor = listItem.querySelector('li[data-parent-link]');
    const parentLink = listItem?.getAttribute('data-parent-link');
    if (!parentLink) return;

    // Hide all other active submenus
    document.querySelectorAll('.mega-menu[data-parent-link].active').forEach((activeMenu) => {
      if (activeMenu instanceof HTMLElement) {
        activeMenu.classList.remove('active');
      }
    });

    // Show the matched submenu
    const matchedMenu = listItem.querySelector(`.mega-menu[data-parent-link="${parentLink}"]`);
    if (matchedMenu instanceof HTMLElement) {
      matchedMenu.classList.add('active');
     
    }
  };

  /**
   * Handles the mouseleave event on a menu item.
   */
  #handleMouseLeave = () => {
    // Use a small delay to allow the user to move the mouse into the submenu
    
      const activeMenus = document.querySelectorAll('.mega-menu[data-parent-link].active');
      activeMenus.forEach((activeMenu) => {
        // Only hide if the submenu itself is not being hovered
        if (activeMenu instanceof HTMLElement && !activeMenu.matches(':hover')) {
          activeMenu.classList.remove('active');
        }
      });
  };
}

if (!customElements.get('header-menu')) {
  customElements.define('header-menu', HeaderMenu);
}

/**
 * Find the closest menu item.
 * @param {Element | null | undefined} element
 * @returns {HTMLElement | null}
 */
function findMenuItem(element) {
  if (!(element instanceof Element)) return null;

  if (element?.matches('[slot="more"')) {
    // Select the first overflowing menu item when hovering over the "More" item
    return findMenuItem(element.parentElement?.querySelector('[slot="overflow"]'));
  }

  return element?.querySelector('[role="menuitem"]');
}

/**
 * Find the closest submenu.
 * @param {Element | null | undefined} element
 * @returns {HTMLElement | null}
 */
function findSubmenu(element) {
  const submenu = element?.parentElement?.querySelector('[ref="submenu[]"]');
 
  return submenu instanceof HTMLElement ? submenu : null;
}
