"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
// Put your application javascript here
window.theme = window.theme || {};
(function ($) {
  'use strict';

  var config = {
    // apiUrl: 'https://staging-api-101397235630.australia-southeast1.run.app',
    apiUrl: 'https://production-api-2mvzuwrzca-ts.a.run.app',
    storefrontApiUrl: '/api/2021-07/graphql.json',
    storefrontAccessToken: '8417a9536e8d3d7e4eb45452250eed42',
    captcha_site_key: '6Lc-9YwoAAAAAJOchjaIt-c7CgwJslsEH5XS3IVI'
  };
  theme.ENV = $.extend(config);
  theme.utils = {
    uuid: function uuid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : r & 0x3 | 0x8;
        return v.toString(16);
      });
    },
    setCookie: function setCookie(cname, cvalue) {
      var d = new Date();
      d.setTime(d.getTime() + 60 * 60 * 1000); //1h
      var expires = 'expires=' + d.toUTCString();
      document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
    },
    getCookie: function getCookie(cname) {
      var name = cname + '=';
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return '';
    },
    fetch: function (_fetch) {
      function fetch(_x, _x2) {
        return _fetch.apply(this, arguments);
      }
      fetch.toString = function () {
        return _fetch.toString();
      };
      return fetch;
    }(function (url, options) {
      return new Promise(function (resolve, reject) {
        fetch(url, options).then(function (response) {
          console.log('application.js fetch', {
            response: response
          });
          response.json().then(function (data) {
            if (response.status >= 400) reject(data);else resolve(data);
          });
        })["catch"](function (error) {
          reject(error);
        });
      });
    }),
    debounce: function debounce(func) {
      var _this2 = this;
      var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;
      var timer;
      return function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        clearTimeout(timer);
        timer = setTimeout(function () {
          func.apply(_this2, args);
        }, timeout);
      };
    },
    replaceUrlParam: function replaceUrlParam(url, paramName, paramValue) {
      if (paramValue == null) {
        paramValue = '';
      }
      var pattern = new RegExp('\\b(' + paramName + '=).*?(&|#|$)');
      if (url.search(pattern) >= 0) {
        return url.replace(pattern, '$1' + paramValue + '$2');
      }
      url = url.replace(/[?#]$/, '');
      return url + (url.indexOf('?') > 0 ? '&' : '?') + paramName + '=' + paramValue;
    },
    updateBadge: function updateBadge() {
      var onCartPage = window.location.pathname == '/cart';
      var needReload = onCartPage && theme.utils.getCookie('cart_refreshed') != 1;
      fetch('/cart.js').then(function (response) {
        return response.json().then(function (data) {
          if (response.ok) return data;
          throw Error(data.description);
        });
      }).then(function (data) {
        var _data$items;
        if ((_data$items = data.items) !== null && _data$items !== void 0 && _data$items.find(function (item) {
          return !item.price;
        })) {
          theme.utils.setCookie('cart_refreshed', 0);
          $('.mini-cart__right').find('.loader-back').show();
          setTimeout(function () {
            theme.utils.updateBadge();
          }, 2000);
          return;
        }
        $('.mini-cart__right').find('.loader-back').hide();
        if (data && data.item_count > 0) {
          if (needReload) {
            theme.utils.setCookie('cart_refreshed', 1);
            window.location.reload();
            return;
          }
          if (onCartPage) {
            $('.cart__loader').hide();
          }
          $('.mini-cart__left__number').text(data.item_count);
          var price = data.total_price / 100.0;
          $('.mini-cart__right').find('.amount').text("$".concat(price.toFixed(2)));
          window.cart = data;
        } else {
          $('.mini-cart__left__number').text('0');
          $('.mini-cart__right').find('.amount').text('$0.00');
        }
      })["catch"](function (err) {
        console.error(err);
        $('.mini-cart__left__number').text('0');
        $('.mini-cart__right').find('.amount').text('$0.00');
      })["finally"](function () {});
    }
  };
  theme.a11y = {
    trapFocus: function trapFocus(options) {
      var element = typeof options.element === 'string' ? $(options.element) : options.element;
      var elementToFocus = typeof options.elementToFocus === 'string' ? $(options.elementToFocus) : options.elementToFocus;

      // Get every possible visible focusable element
      var focusableEls = element.find('button, [href], input, select, textarea, [tabindex]:not([tabindex^="-"])');
      var elArray = [].slice.call(focusableEls);
      var focusableElements = elArray.filter(function (el) {
        return el.offsetParent !== null;
      });
      var firstFocusable = focusableElements[0];
      var lastFocusable = focusableElements[focusableElements.length - 1];
      if (!elementToFocus) {
        elementToFocus = element;
      }
      element.attr('tabindex', '-1');
      elementToFocus.focus();
      var $document = $(document.documentElement);
      $document.off('focusin');
      $document.on('focusout', function () {
        $document.off('keydown.handleFocus');
      });
      $document.on('focusin', function (evt) {
        if (evt.target !== lastFocusable && evt.target !== firstFocusable) return;
        $document.on('keydown.handleFocus', function (evt) {
          _manageFocus(evt);
        });
      });
      function _manageFocus(evt) {
        if (evt.keyCode !== 9) return;
        /**
         * On the first focusable element and tab backward,
         * focus the last element
         */
        if (evt.target === firstFocusable && evt.shiftKey) {
          evt.preventDefault();
          lastFocusable.focus();
        }
      }
    },
    removeTrapFocus: function removeTrapFocus(element) {
      var el = element ? typeof element === 'string' ? $(element) : element : $(document.documentElement);
      el.removeAttr('tabindex');
      el.off('focusin');
    },
    lockScrolling: function lockScrolling(element) {
      var el = element ? typeof element === 'string' ? $(element) : element : $(document.documentElement);
      el.addClass('lock-scroll');
      el.on('touchmove', function () {
        return true;
      });
    },
    unlockScrolling: function unlockScrolling(element) {
      var el = element ? typeof element === 'string' ? $(element) : element : $(document.documentElement);
      el.removeClass('lock-scroll');
      el.off('touchmove');
    }
  };
  theme.Sections = function Sections() {
    this.constructors = {};
    this.instances = [];
    document.addEventListener('shopify:section:load', this._onSectionLoad.bind(this));
    document.addEventListener('shopify:section:unload', this._onSectionUnload.bind(this));
    document.addEventListener('shopify:section:select', this._onSelect.bind(this));
    document.addEventListener('shopify:section:deselect', this._onDeselect.bind(this));
    document.addEventListener('shopify:block:select', this._onBlockSelect.bind(this));
    document.addEventListener('shopify:block:deselect', this._onBlockDeselect.bind(this));
  };
  theme.Sections.prototype = Object.assign({}, theme.Sections.prototype, {
    _createInstance: function _createInstance(container, constructor) {
      var id = container.getAttribute('data-section-id');
      var type = container.getAttribute('data-section-type');
      constructor = constructor || this.constructors[type];
      if (typeof constructor === 'undefined') {
        return;
      }
      var instance = Object.assign(new constructor(container), {
        id: id,
        type: type,
        container: container
      });
      this.instances.push(instance);
    },
    _onSectionLoad: function _onSectionLoad(evt) {
      var container = document.querySelector('[data-section-id="' + evt.detail.sectionId + '"]');
      if (container) {
        this._createInstance(container);
      }
    },
    _onSectionUnload: function _onSectionUnload(evt) {
      this.instances = this.instances.filter(function (instance) {
        var isEventInstance = instance.id === evt.detail.sectionId;
        if (isEventInstance) {
          if (typeof instance.onUnload === 'function') {
            instance.onUnload(evt);
          }
        }
        return !isEventInstance;
      });
    },
    _onSelect: function _onSelect(evt) {
      var instance = this.instances.find(function (instance) {
        return instance.id === evt.detail.sectionId;
      });
      if (typeof instance !== 'undefined' && typeof instance.onSelect === 'function') {
        instance.onSelect(evt);
      }
    },
    _onDeselect: function _onDeselect(evt) {
      var instance = this.instances.find(function (instance) {
        return instance.id === evt.detail.sectionId;
      });
      if (typeof instance !== 'undefined' && typeof instance.onDeselect === 'function') {
        instance.onDeselect(evt);
      }
    },
    _onBlockSelect: function _onBlockSelect(evt) {
      var instance = this.instances.find(function (instance) {
        return instance.id === evt.detail.sectionId;
      });
      if (typeof instance !== 'undefined' && typeof instance.onBlockSelect === 'function') {
        instance.onBlockSelect(evt);
      }
    },
    _onBlockDeselect: function _onBlockDeselect(evt) {
      var instance = this.instances.find(function (instance) {
        return instance.id === evt.detail.sectionId;
      });
      if (typeof instance !== 'undefined' && typeof instance.onBlockDeselect === 'function') {
        instance.onBlockDeselect(evt);
      }
    },
    register: function register(type, constructor) {
      this.constructors[type] = constructor;
      document.querySelectorAll('[data-section-type="' + type + '"]').forEach(function (container) {
        this._createInstance(container, constructor);
      }.bind(this));
    }
  });
  theme.Toggle = function () {
    Toggle.prototype.el = null;
    Toggle.prototype.tabs = null;
    Toggle.prototype.panels = null;
    function Toggle(toggleClass) {
      this.el = $(toggleClass);
      this.tabs = this.el.find('.tab');
      this.panels = this.el.find('.panel');
      this.bind();
    }
    Toggle.prototype.show = function (index) {
      var activePanel, activeTab;
      this.tabs.removeClass('active');
      activeTab = this.tabs.get(index);
      $(activeTab).addClass('active');
      this.panels.hide();
      activePanel = this.panels.get(index);
      return $(activePanel).show();
    };
    Toggle.prototype.bind = function () {
      var _this = this;
      return this.tabs.unbind('click').bind('click', function (e) {
        return _this.show($(e.currentTarget).index());
      });
    };
    return Toggle;
  }();
  theme.Product = function () {
    function Product(container) {
      this.container = container;
      var sectionId = container.getAttribute('data-section-id');
      this.ajaxEnabled = container.getAttribute('data-ajax-enabled') === 'true';
      this.settings = {
        mediaQueryMediumUp: 'screen and (min-width: 750px)',
        mediaQuerySmall: 'screen and (max-width: 749px)',
        enableHistoryState: container.getAttribute('data-enable-history-state') === 'true',
        namespace: '.slideshow-' + sectionId,
        sectionId: sectionId,
        sliderActive: false,
        zoomEnabled: false
      };
      this.selectors = {
        addToCart: '[data-add-to-cart]',
        form: '#product_form_' + sectionId,
        loader: '[data-loader]',
        quantity: '[data-quantity-input]',
        productForm: '[data-product-form]',
        errorMessage: '[data-error-message]',
        errorMessageWrapper: '[data-error-message-wrapper]',
        shopifyPaymentButton: '.shopify-payment-button',
        addToWishlist: '[data-add-to-wishlist]'
      };
      this.classes = {
        cartPopupWrapperHidden: 'cart-popup-wrapper--hidden',
        hidden: 'hide',
        visibilityHidden: 'visibility-hidden',
        inputError: 'input--error',
        jsZoomEnabled: 'js-zoom-enabled',
        productOnSale: 'price--on-sale',
        productUnavailable: 'price--unavailable',
        productSoldOut: 'price--sold-out',
        cartImage: 'cart-popup-item__image',
        productFormErrorMessageWrapperHidden: 'product-form__error-message-wrapper--hidden',
        activeClass: 'active-thumb',
        variantSoldOut: 'product-form--variant-sold-out'
      };
      this.eventHandlers = {};
      this.quantityInput = container.querySelector(this.selectors.quantity);
      this.errorMessageWrapper = container.querySelector(this.selectors.errorMessageWrapper);
      this.productForm = container.querySelector(this.selectors.productForm);
      this.addToCart = container.querySelectorAll(this.selectors.addToCart);
      this.shopifyPaymentButton = container.querySelector(this.selectors.shopifyPaymentButton);
      var productJson = document.getElementById('ProductJson-' + sectionId);
      if (!productJson || !productJson.innerHTML.length) {
        return;
      }
      var productObj = JSON.parse(productJson.innerHTML);
      var variantsAll = _toConsumableArray(productObj.variants);
      $('[id*=variantObjJson-]').each(function (el) {
        var jsonObj = $(this).html();
        var variant = JSON.parse(jsonObj);
        variantsAll.push(variant);
      });
      productObj.variants = _toConsumableArray(variantsAll);
      this.productSingleObject = productObj;
      console.log('productSingleObject');
      console.log(this.productSingleObject);
      this.productState = {
        available: true,
        soldOut: false,
        onSale: false,
        poa: false
      };
      this._stringOverrides();
      this._initVariants();
      this._initForm();

      // update spec table to hide empty rows
      this.container.dispatchEvent(new CustomEvent('variantSpecChange', {
        detail: {
          variant: this.variants.currentVariant
        },
        bubbles: true,
        cancelable: true
      }));
    }
    Product.prototype = Object.assign({}, Product.prototype, {
      _stringOverrides: function _stringOverrides() {
        theme.productStrings = theme.productStrings || {};
        theme.strings = Object.assign({}, theme.strings, theme.productStrings);
      },
      _initForm: function _initForm() {
        this.container.querySelector(this.selectors.form).addEventListener('submit', this._handleAddToCart.bind(this));
      },
      _handleAddToCart: function _handleAddToCart(event) {
        var _window$customer, _ShopifyAnalytics;
        console.log('adding to cart');
        event.preventDefault();
        if (!window.customer.email && !theme.utils.getCookie('CONSENT_LOGIN')) {
          vex.dialog.open({
            message: 'Login before adding to cart for correct pricing.',
            buttons: [$.extend({}, vex.dialog.buttons.YES, {
              text: 'Login'
            }), $.extend({}, vex.dialog.buttons.NO, {
              text: 'Do no show this again'
            })],
            callback: function callback(value) {
              if (value) {
                location.href = 'https://shopify.com/79257534781/account';
              } else {
                theme.utils.setCookie('CONSENT_LOGIN', true);
              }
            }
          });
          return;
        }
        var self = this;
        self._disableAddToCart();
        var prm = $('#prm').val();
        var cart = window.cart;
        var formData = new FormData(document.querySelector('.product-form'));
        var line_to_delete = null;
        var data = [];
        var add = [];
        var update = [];
        formData.forEach(function (value, key) {
          if (key.includes('qty') && +value != 0) {
            var shouldUpdate = false;
            var id = +key.split('-')[1];
            var sku = $("#".concat(key)).data('product');
            var quantity = +value;
            if (cart && cart.items.length > 0) {
              var items_in_cart = cart.items.find(function (item) {
                return +item.sku == +sku;
              });
              var index = cart.items.map(function (item) {
                return +item.sku;
              }).indexOf(+sku);
              if (items_in_cart && items_in_cart.properties && items_in_cart.properties.qty) {
                quantity = quantity + +items_in_cart.properties.qty;
                id = items_in_cart.id;
                line_to_delete = items_in_cart.key;
                shouldUpdate = true;
                update.push({
                  index: index + 1,
                  id: id
                });
              }
            }
            if (!shouldUpdate) {
              add.push(id);
            }
            data.push({
              variantId: id,
              qty: quantity,
              material: sku,
              prm: prm
            });
          }
        });
        var customer = ((_window$customer = window.customer) === null || _window$customer === void 0 ? void 0 : _window$customer.sapId) || '143282';
        var session = (_ShopifyAnalytics = ShopifyAnalytics) === null || _ShopifyAnalytics === void 0 || (_ShopifyAnalytics = _ShopifyAnalytics.lib) === null || _ShopifyAnalytics === void 0 || (_ShopifyAnalytics = _ShopifyAnalytics.user()) === null || _ShopifyAnalytics === void 0 || (_ShopifyAnalytics = _ShopifyAnalytics.traits()) === null || _ShopifyAnalytics === void 0 ? void 0 : _ShopifyAnalytics.uniqToken;
        grecaptcha.ready(function () {
          grecaptcha.execute('6Lc-9YwoAAAAAJOchjaIt-c7CgwJslsEH5XS3IVI', {
            action: 'submit'
          }).then(function (token) {
            // const url = `${theme.ENV.apiUrl}/customers/create-cart-variants/${+prm}?session=${session}&token=${token}${(window.customer && !!sapId)? `&customer=${sapId}`: ''}`
            var url = "".concat(theme.ENV.apiUrl, "/cart?token=").concat(token);
            theme.utils.fetch(url, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': '1'
              },
              body: JSON.stringify({
                token: 'KIi16KkJ3HEjwydO7S582tKkESRZJsaJDlH2ckDXZ1OJjmHp6W',
                variants: data,
                session: session,
                customer: customer
              })
            }).then(function (result) {
              var items = result;
              var itemsToAdd = items.filter(function (i) {
                return add.includes(+i.id);
              });
              var itemsToChange = update.map(function (u) {
                var item = items.find(function (i) {
                  return i.id == u.id;
                });
                if (item) {
                  return {
                    line: u.index,
                    properties: _objectSpread(_objectSpread({}, item.properties), {}, {
                      _hmac: item.hmac
                    })
                  };
                } else {
                  return {
                    id: u.id,
                    quantity: 0
                  };
                }
              });
              var promises = [];
              if (itemsToAdd.length) {
                promises.push(fetch('/cart/add.js', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    items: itemsToAdd.map(function (i) {
                      return _objectSpread(_objectSpread({}, i), {}, {
                        properties: _objectSpread(_objectSpread({}, i.properties), {}, {
                          _hmac: i.hmac
                        })
                      });
                    })
                  })
                }));
              }
              var _iterator = _createForOfIteratorHelper(itemsToChange),
                _step;
              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  var item = _step.value;
                  promises.push(fetch("/cart/change.js", {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(item)
                  }));
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
              Promise.all(promises).then(function (data) {
                $('[id*=qty').val('');
                theme.utils.updateBadge();
                $('[data-success-message]').text('Item has been added/updated in cart').show();
                setTimeout(function () {
                  $('[data-success-message]').text('').hide();
                }, 2000);
                //self._enableAddToCart()
                $([document.documentElement, document.body]).animate({
                  scrollTop: $('[data-success-message]').offset().top - 50
                }, 1000);
              })["catch"](function handleError(error) {
                console.log('Error' + error);
                $('[data-error-message]').append(error.message).show();
                setTimeout(function () {
                  $('[data-error-message]').text('').hide();
                }, 3000);
              });
            })["catch"](function (err) {})["finally"](function () {
              $([document.documentElement, document.body]).animate({
                scrollTop: $('[data-error-message]').offset().top - 50
              }, 1000);
              self._enableAddToCart();
            });
          });
        });
      },
      _disableAddToCart: function _disableAddToCart() {
        this.container.querySelectorAll(this.selectors.addToCart).forEach(function (button) {
          button.classList.add('disabled');
        });
      },
      _enableAddToCart: function _enableAddToCart() {
        this.container.querySelectorAll(this.selectors.addToCart).forEach(function (button) {
          if (!button.classList.contains('out-of-stock')) button.classList.remove('disabled');
        });
      },
      _initVariants: function _initVariants() {
        var options = {
          container: this.container,
          enableHistoryState: this.container.getAttribute('data-enable-history-state') === 'true',
          product: this.productSingleObject,
          qtySelector: null,
          current_pdt: null,
          suggestQty: 0,
          modal_stock_warning: false,
          back_order_available: false,
          back_order_qty: 0,
          order_qty: 0,
          form: this.selectors.form
        };
        this.variants = new theme.Variants(options);
      },
      _showErrorMessage: function _showErrorMessage(errorMessage) {
        var errorMessageContainer = this.container.querySelector(this.selectors.errorMessage);
        errorMessageContainer.innerHTML = errorMessage;
        if (this.quantityInput) {
          this.quantityInput.classList.add(this.classes.inputError);
        }
        this.errorMessageWrapper.classList.remove(this.classes.productFormErrorMessageWrapperHidden);
        this.errorMessageWrapper.setAttribute('aria-hidden', true);
        this.errorMessageWrapper.removeAttribute('aria-hidden');
      },
      _hideErrorMessage: function _hideErrorMessage() {
        this.errorMessageWrapper.classList.add(this.classes.productFormErrorMessageWrapperHidden);
        if (this.quantityInput) {
          this.quantityInput.classList.remove(this.classes.inputError);
        }
      }
    });
    return Product;
  }();
  theme.Currency = function () {
    var moneyFormat = '${{amount}}'; // eslint-disable-line camelcase

    function formatMoney(cents, format) {
      if (typeof cents === 'string') {
        cents = cents.replace('.', '');
      }
      var value = '';
      var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
      var formatString = format || moneyFormat;
      function formatWithDelimiters(number, precision, thousands, decimal) {
        thousands = thousands || ',';
        decimal = decimal || '.';
        if (isNaN(number) || number === null) {
          return 0;
        }
        number = (number / 100.0).toFixed(precision);
        var parts = number.split('.');
        var dollarsAmount = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands);
        var centsAmount = parts[1] ? decimal + parts[1] : '';
        return dollarsAmount + centsAmount;
      }
      switch (formatString.match(placeholderRegex)[1]) {
        case 'amount':
          value = formatWithDelimiters(cents, 2);
          break;
        case 'amount_no_decimals':
          value = formatWithDelimiters(cents, 0);
          break;
        case 'amount_with_comma_separator':
          value = formatWithDelimiters(cents, 2, '.', ',');
          break;
        case 'amount_no_decimals_with_comma_separator':
          value = formatWithDelimiters(cents, 0, '.', ',');
          break;
        case 'amount_no_decimals_with_space_separator':
          value = formatWithDelimiters(cents, 0, ' ');
          break;
        case 'amount_with_apostrophe_separator':
          value = formatWithDelimiters(cents, 2, "'");
          break;
      }
      return formatString.replace(placeholderRegex, value);
    }
    return {
      formatMoney: formatMoney
    };
  }();
  theme.Variants = function () {
    /**
     * Variant constructor
     *
     * @param {object} options - Settings from `product.js`
     */
    function Variants(options) {
      this.container = options.container;
      this.product = options.product;
      this.qtySelector = options.qtySelector;
      this.current_pdt = options.current_pdt;
      this.suggestQty = options.suggestQty;
      this.modal_stock_warning = options.modal_stock_warning;
      this.back_order_available = options.back_order_available;
      this.back_order_qty = options.back_order_qty;
      this.order_qty = options.order_qty;
      this.enableHistoryState = options.enableHistoryState;
      this.form = options.form;
      var variants = [];
      var parent = this;
      var display_only = $('#display_only').length;
      this.product.variants.forEach(function (variant) {
        var qty = 1;
        var variantJson = document.getElementById('variantJson-' + variant.id);
        if (variantJson && variantJson.innerHTML.length) {
          variant.metafields = JSON.parse(variantJson.innerHTML);
          qty = +variant.metafields.order_multiple;
        }
        variants.push(_objectSpread({}, variant));
        if (!display_only) {
          parent._loadPrice(variant, qty, false, false);
          parent._loadStock(variant);
        }
      });
      this.variants = variants;
      console.log(this.variants);
      var attributes = {
        'sign-display-rigids': {
          color: "Manufacturer's Colour",
          thickness: 'Thickness (mm)',
          sheet_size: 'Sheet size (mm)',
          position: 0
        },
        'commercial-print': {
          color: "Manufacturer's Colour",
          finish: 'Finish',
          gsm: 'Grammage(GSM)',
          sheet_size: 'Sheet size (width x length)',
          position: 1
        },
        'digital-media': {
          color: "Manufacturer's Colour",
          finish: 'Finish',
          gsm: 'Grammage(GSM)',
          sheet_size: 'Sheet size (width x length)',
          position: 2
        },
        'label-packaging': {
          reel_width: 'Reel width (mm)',
          reel_length: 'Reel length (mm)',
          adhesive: 'Adhesive',
          position: 3
        },
        packaging: {
          color: "Manufacturer's Colour",
          gsm: 'Grammage/UM',
          sheet_size: 'Sheet size (mm)',
          position: 4
        },
        'sign-display-cut-coloured-vinyl': {
          color: "Manufacturer's Colour",
          position: 5
        },
        'print-media': {
          roll_width: 'Roll width (mm)',
          roll_length: 'Roll length (mm)',
          position: 6
        },
        'sign-display-finishing': {
          roll_width: 'Roll width (mm)',
          roll_length: 'Roll length (mm)',
          position: 7
        },
        'sign-display-reflectives': {
          roll_width: 'Roll width (mm)',
          roll_length: 'Roll length (mm)',
          position: 8
        },
        'sign-display-print-media-self-adhesive-window-graphics': {
          roll_width: 'Roll width (mm)',
          roll_length: 'Roll length (mm)',
          position: 9
        },
        'sign-display-automotive': {
          color: "Manufacturer's Colour",
          position: 10
        },
        'proofing-cad-photographic-and-fine-art': {
          gsm: 'Grammage(GSM)',
          reel_width: 'Reel width (mm)',
          sheet_size: 'Sheet size (per box)',
          position: 11
        },
        'architecture-interior-design-window-films': {
          roll_width: 'Roll width (mm)',
          roll_length: 'Roll length (mm)',
          position: 12
        },
        'sublimation-heat-transfer-transfer-papers': {
          roll_width: 'Roll width (mm)',
          roll_length: 'Roll length (mm)',
          position: 13
        },
        'sign-display': {
          color: "Manufacturer's Colour",
          position: 14
        },
        'sublimation-heat-transfer': {
          color: "Manufacturer's Colour",
          position: 15
        },
        "default": {
          color: "Manufacturer's Colour",
          finish: 'Finish',
          gsm: 'Grammage',
          sheet_size: 'Sheet size',
          position: 16
        }
      };
      var collections = [];
      var collectionsSelector = $('[id*=collectionJson]');
      collectionsSelector.each(function (index) {
        if ($(this)[0].innerHTML.length) {
          var collection = JSON.parse($(this)[0].innerHTML);
          collections.push(collection);
        }
      });
      this.collections = collections;
      var attributeSet = attributes['default'];
      this.collections.forEach(function (collection) {
        if (attributes[collection.handle] && attributes[collection.handle].position < attributeSet.position) {
          attributeSet = attributes[collection.handle];
        }
      });
      delete attributeSet.position;
      this.attributeSet = attributeSet;
      this.availableOptions = this._initFilter();
      var filters = {};
      $('.product__info__filters__select__option, .product__info__filters__swatch__option').click(function (e) {
        var value = $(this).data('value');
        filters[$(this).data('field')] = parent.availableOptions[$(this).data('field')][value];
        parent._updateTable(filters);
      });
      $('input[id*=qty-]').on('blur', function (e) {
        var inputQty = $(this);
        var lastInput = inputQty.data('lastInput');
        if (inputQty.val() !== '' && +inputQty.val() > 0 && inputQty.val() != lastInput) {
          var id = inputQty.data('variant');
          var is_submit_after = e.relatedTarget ? e.relatedTarget.classList.contains('tocart') : false;
          var qty = +inputQty.val();
          inputQty.data('lastInput', inputQty.val());
          var variant = parent.variants.find(function (v) {
            if (v.id == inputQty.data('variant')) return true;
          });
          $("#qty-".concat(variant.id)).data('can-submit', '0');
          var is_order_by_lm_available = inputQty.data('lm') != undefined;
          var stock = parseInt($('#stock-' + variant.id).data('stock'));
          var next_available_qty = qty;
          if (inputQty.data('restrict-qty') !== undefined || is_order_by_lm_available) {
            var multiplier = inputQty.data('restrict-qty') !== undefined ? parseInt(inputQty.data('multiplier')) : +inputQty.data('lm');
            if (multiplier != 0) {
              if (qty % multiplier !== 0 && !is_order_by_lm_available || is_order_by_lm_available && qty != ~~qty && qty % multiplier !== 0) {
                next_available_qty = Math.ceil(qty / multiplier) * multiplier;
                if (is_order_by_lm_available) next_available_qty = +next_available_qty.toFixed(2);
                vex.dialog.confirm({
                  message: (is_order_by_lm_available ? 'Decimal qty' : 'Order quantity') + ' must be in multiples of ' + multiplier + ' for this product - would you like to update order quantity to  ' + next_available_qty + '?',
                  callback: function callback(value) {
                    if (value) {
                      inputQty.val(next_available_qty);
                      parent._checkStockStatus(variant, next_available_qty, stock, is_submit_after);
                    } else {
                      inputQty.val('');
                    }
                  }
                });
                return;
              }
            }
          }
          parent._checkStockStatus(variant, qty, stock, is_submit_after);
        }
      });
    }
    Variants.prototype = Object.assign({}, Variants.prototype, {
      /**
       * Get the currently selected options from add-to-cart form. Works with all
       * form input elements.
       *
       * @return {array} options - Values of currently selected variants
       */
      _initFilter: function _initFilter() {
        var parent = this;
        var options = {};
        Object.keys(this.attributeSet).forEach(function (key) {
          options[key] = {};
          var isSwatchAvailable = false;
          var swatch = [];
          parent.variants.forEach(function (variant) {
            if (variant.metafields && variant.metafields[key] && variant.metafields[key] != '') {
              if (options[key][variant.metafields[key].replaceAll('.000', '')]) {
                options[key][variant.metafields[key].replaceAll('.000', '')].push(variant.id);
              } else {
                options[key][variant.metafields[key].replaceAll('.000', '')] = [variant.id];
              }
              if (variant.metafields.swatch_image_src || variant.metafields.swatch_hex) {
                isSwatchAvailable = true;
              }
              if (key == 'color') {
                if (!swatch.find(function (s) {
                  return s.value == variant.metafields[key];
                })) {
                  swatch.push({
                    value: variant.metafields[key],
                    type: variant.metafields.swatch_image_src ? 'image' : 'hex',
                    color: variant.metafields.swatch_image_src ? variant.metafields.swatch_image_src : variant.metafields.swatch_hex ? variant.metafields.swatch_hex : '#fff'
                  });
                }
              }
            }
          });
          if (Object.keys(options[key]).length > 0) {
            if (key != 'color' || !isSwatchAvailable) {
              var select = $('<div />', {
                  "class": "product__info__filters__select ".concat(key)
                }).appendTo($('#product-filter')),
                selectedValue = Object.keys(options[key]).length > 1 ? parent.attributeSet[key] : "".concat(parent.attributeSet[key], ": ").concat(Object.keys(options[key])[0]),
                selected = $('<div />', {
                  "class": 'select-selected',
                  text: selectedValue
                }).appendTo(select),
                list = $('<ul />', {
                  "class": 'product__info__filters__select__options'
                }).insertAfter(selected);
              Object.keys(options[key]).forEach(function (k) {
                var option = $('<li></li>').data('field', key).data('value', k).addClass('product__info__filters__select__option').text(k);
                if (k == selectedValue) option.addClass('active');
                option.appendTo(list);
              });
              select.click(function (e) {
                e.stopPropagation();
                $(this).find('ul').slideToggle(150);
              });
              var select_options = list.children('li');
              select_options.click(function (e) {
                e.stopPropagation();
                select_options.removeClass('active');
                $(this).addClass('active');
                selected.text("".concat(parent.attributeSet[key], ": ").concat($(this).text()));
                //to do: filter
                list.filter(':not(:animated)').slideUp(150);
              });
            } else {
              var select = $('<div />', {
                  "class": 'product__info__filters__swatch'
                }).appendTo($('#product-filter')),
                selectedValue = Object.keys(options[key]).length > 1 ? parent.attributeSet[key] : "".concat(parent.attributeSet[key], ": ").concat(Object.keys(options[key])[0]),
                selected = $('<div />', {
                  "class": 'select-selected',
                  text: selectedValue
                }).appendTo(select),
                list = $('<ul />', {
                  "class": 'product__info__filters__swatch__options'
                }).insertAfter(selected);
              swatch.forEach(function (color) {
                var option = $('<li></li>').data('field', key).data('value', color.value).data('color', color.color).addClass('product__info__filters__swatch__option');
                if (color.type == 'image') option.data('type', 'image').css('background', "url(\"https://storage.googleapis.com/spicers-product-images/".concat(color.color, "\") no-repeat center"));
                if (color.type == 'hex') option.data('type', 'hex').css('background-color', color.color);
                if (color.value == selectedValue) option.addClass('active');
                option.appendTo(list);
              });
              var select_options = list.children('li');
              select_options.click(function (e) {
                e.stopPropagation();
                select_options.removeClass('active');
                $(this).addClass('active');
                selected.text("".concat(parent.attributeSet[key], ": ").concat($(this).data('value')));
              });
              select_options.mouseover(function (e) {
                var zoom = $('<div />', {
                  "class": 'product__info__filters__swatch__option__zoom'
                }).appendTo($(this));
                var color = $('<div />', {
                  "class": 'product__info__filters__swatch__option__zoom__img'
                });
                if ($(this).data('type') == 'image') {
                  var url = 'https://storage.googleapis.com/spicers-product-images/' + $(this).data('color');
                  color.css('background', "url(\"".concat(url, "\") no-repeat center"));
                }
                if ($(this).data('type') == 'hex') color.css('background-color', $(this).data('color'));
                color.appendTo(zoom);
                $('<div />', {
                  "class": 'product__info__filters__swatch__option__zoom__title',
                  text: $(this).data('value')
                }).appendTo(zoom);
              });
              select_options.mouseout(function (e) {
                $(this).find('.product__info__filters__swatch__option__zoom').remove();
              });
            }
          }
        });
        return options;
      },
      _loadPrice: function _loadPrice(variant, qty) {
        var _window$customer2;
        var is_submit_after = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var updatePrice = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
        $("#td-price-".concat(variant.id, ", #td-price-").concat(variant.id, "-no-gst")).append("<span class='skeleton-box'></span>");
        var customerId = (_window$customer2 = window.customer) === null || _window$customer2 === void 0 ? void 0 : _window$customer2.sapId;
        var url = "".concat(theme.ENV.apiUrl, "/customers/pricing/").concat(+variant.metafields.prm, "?material=").concat(variant.sku, "&qty=").concat(qty).concat(!!customerId ? "&customer=".concat(customerId) : '');
        return fetch(url, {
          headers: {
            'ngrok-skip-browser-warning': '1'
          }
        }).then(function (response) {
          return response.json();
        }).then(function (result) {
          var price = result.price;
          if (result.updated) $("#qty-".concat(variant.id)).data('can-submit', '1');
          $("#price-".concat(variant.id)).html("$".concat((+price * variant.metafields.price_multiplier).toFixed(2)));
          var price_without_gst = +price / 1.1;
          $("#price-".concat(variant.id, "-no-gst")).html("$".concat((price_without_gst * variant.metafields.price_multiplier).toFixed(2)));
          $('.price-without-gst').show();
          if (is_submit_after && result.updated) $("#add-to-cart-".concat(variant.id)).click();
        })["catch"](function (err) {
          console.error(err);
        })["finally"](function () {
          $("#td-price-".concat(variant.id, " .skeleton-box, #td-price-").concat(variant.id, "-no-gst .skeleton-box")).remove('');
        });
      },
      _loadStock: function _loadStock(variant) {
        var state = theme.utils.getCookie('user-state') || 'NSW';
        var plant = window.customer ? window.customer.plant : '';
        var url = "".concat(theme.ENV.apiUrl, "/stock?materialNo=").concat(+variant.sku, "&state=").concat(state).concat(!!plant ? "&plant=".concat(plant) : ''); // to-do: change state and plant with customer login

        return fetch(url, {
          headers: {
            'ngrok-skip-browser-warning': '1'
          }
        }).then(function (response) {
          return response.json();
        }).then(function (result) {
          $("#stock-".concat(variant.id)).text("".concat(Math.round(+result))).data('stock', Math.round(+result));
          if (+result > +variant.metafields.order_multiple) {
            $("#stock-".concat(variant.id)).addClass('in-stock');
          } else {
            $("#stock-".concat(variant.id)).addClass('none-stock');
            $("#stock-".concat(variant.id)).siblings('.tooltip').show();
            $("#add-to-cart-".concat(variant.id)).addClass('disabled').addClass('backorder');
            $("#add-to-cart-".concat(variant.id, " .button-text")).text('Back Order');
          }
        })["catch"](function (err) {
          console.error(err);
        })["finally"](function () {
          $("#td-price-".concat(variant.id, " .skeleton-box, #td-price-").concat(variant.id, "-no-gst .skeleton-box")).remove('');
        });
      },
      _checkStockStatus: function _checkStockStatus(variant, qty, stock, is_submit_after) {
        var self = this;
        var state = theme.utils.getCookie('user-state') || 'NSW';
        var url = "".concat(theme.ENV.apiUrl, "/stock-status?materialNo=").concat(variant.sku, "&state=").concat(state, "&qty=").concat(qty); // to-do: change state and plant with customer login
        if (stock < qty) {
          return theme.utils.fetch(url, {
            headers: {
              'ngrok-skip-browser-warning': '1'
            }
          }).then(function (data) {
            if (data.length) {
              var backorder_date = "".concat(data[0].date.slice(6, 8), "/").concat(data[0].date.slice(4, 6), "/").concat(data[0].date.slice(0, 4));
              var order_multiplier = variant.metafields.order_multiple;
              var available_qty = order_multiplier != 1 ? Math.floor(stock / order_multiplier) * order_multiplier : stock;
              var back_order_available = true;
              var back_order_qty = qty;
              var message = stock == 0 ? 'item ' + parseInt(variant.sku) + ' is out of stock right now, If you are happy to wait for full delivery on ' + backorder_date + ', please continue to checkout' : 'We only have ' + available_qty + 'available for immediate delivery. If you want partial delivery please update your cart qty to ' + available_qty + '. If you are happy to wait for full delivery on ' + backorder_date + ', then continue to checkout';
              vex.dialog.confirm({
                message: message,
                callback: function callback(value) {
                  if (value) {
                    $('#qty-' + variant.id).val(back_order_qty);
                    self._loadPrice(variant, back_order_qty, is_submit_after);
                    if (!is_submit_after) {
                      $('#add-to-cart-' + variant.id).removeClass('disabled');
                    }
                  } else {
                    $('#qty-' + variant.id).val('');
                  }
                }
              });
            } else {
              vex.dialog.confirm({
                message: 'item ' + parseInt(variant.sku) + ' is low in, or out of stock at this stage, please contact a  sales representative for more information.',
                callback: function callback(value) {
                  $('#qty-' + variant.id).val('');
                }
              });
            }
          })["catch"](function (err) {
            console.error(err);
          })["finally"](function () {
            return;
          });
        } else {
          self._loadPrice(variant, qty, is_submit_after);
        }
      },
      _updateTable: function _updateTable(filters) {
        var valueArr = [];
        Object.keys(filters).forEach(function (k) {
          valueArr.push(filters[k]);
        });
        var result = valueArr.reduce(function (a, b) {
          return a.filter(function (c) {
            return b.includes(c);
          });
        });
        $('.product-table-row').addClass('hidden').removeClass('active');
        result.forEach(function (v) {
          $('#variant-' + v).addClass('active');
        });
      },
      _test: function _test() {
        console.log('test');
      }
    });
    return Variants;
  }();
  theme.Wishlist = function () {
    function Wishlist() {
      var self = this;
      this.addToWishlistButtons = $('[data-add-to-wishlist]');
      this.guestId = window.localStorage.getItem('WISHLIST_GUEST_ID');
      if (!(window.customer && window.customer.email) && (!this.guestId || this.guestId == 'undefined')) {
        this.guestId = theme.utils.uuid();
        window.localStorage.setItem('WISHLIST_GUEST_ID', this.guestId);
      }
      if (this.addToWishlistButtons) {
        window.wishlist = null;
        this.guestEmail = this.guestId + '@wishlist.' + window.location.hostname;
        this._fetchWishlist();
        this.addToWishlistButtons.on('click', function (evt) {
          evt.stopPropagation();
          evt.preventDefault();
          if (this.isFetching) return;
          self._addToWishlist(evt);
        });
      }
    }
    Wishlist.prototype = Object.assign({}, Wishlist.prototype, {
      _fetchWishlist: function _fetchWishlist() {
        var self = this;
        var email = window.customer && window.customer.email || this.guestEmail;
        var url = theme.ENV.apiUrl + '/wishlist?';
        if (this.guestId && this.guestEmail && window.customer && window.customer.email) {
          url += 'email=' + email + '&guestId=' + this.guestEmail;
          window.localStorage.removeItem('WISHLIST_GUEST_ID');
        } else {
          url += 'email=' + email;
        }
        return fetch(url).then(function (response) {
          return response.json();
        }).then(function (wishlist) {
          window.wishlist = wishlist;
          self._updateAddToWishlistButtons();
          if (wishlist && wishlist.products && $('#wishlist-items').length > 0) {
            var count = 0;
            wishlist.products.map(function (p) {
              if (count > 5) return;
              $('<a></a>').text(p.data.option1).attr('href', p.data.handle).appendTo('#wishlist-items');
              count++;
            });
            if (wishlist.products.length > 0) $('#wishlist-items').append("<a class='link' href='/pages/wishlist'>View All</a>");
          }
          if ($('#wishlist-table tbody').length > 0) {
            if (wishlist && wishlist.products.length) {
              wishlist.products.map(function (product, index) {
                var _product$data$metafie, _product$data$metafie2, _product$data$metafie3;
                var tr = $("<tr class='product-row'></tr>");
                var button = $("<a title=\"Add to Wish List\" href=\"#\"  data-add-to-wishlist  data-item-id=\"0\"  class=\"button towishlist active\" data-id=\"".concat(product.shopifyVariantId, "\"></a>"));
                $('<td></td>').append(button).appendTo(tr);
                tr.append("<td>".concat(product.data.sku.includes('000000') ? +product.data.sku : product.data.sku, "</td>"));
                tr.append("<td>".concat(product.data.option1, "</td>"));
                var min = ((_product$data$metafie = product.data.metafields.find(function (m) {
                  return m.key == 'order_multiple';
                })) === null || _product$data$metafie === void 0 ? void 0 : _product$data$metafie.value) || 1;
                var lm = (_product$data$metafie2 = product.data.metafields.find(function (m) {
                  return m.key == 'lineal_metres';
                })) === null || _product$data$metafie2 === void 0 ? void 0 : _product$data$metafie2.value;
                var restrict_qty = min != 1;
                var uom = (_product$data$metafie3 = product.data.metafields.find(function (m) {
                  return m.key == 'uom_name';
                })) === null || _product$data$metafie3 === void 0 ? void 0 : _product$data$metafie3.value;
                var qtyInput = $("<input class=\"grid-qty\" type=\"number\" min=\"".concat(min, "\" />")).data('sku', product.data.sku).data('uom', uom).data('variant', product.shopifyVariantId).data('last-input', '').data('prm', product.prm);
                if (lm != '') {
                  qtyInput.data('lm', lm).attr('step', '0.01');
                }
                if (restrict_qty) {
                  qtyInput.data('restrict-qty', 1);
                  qtyInput.data('multiplier', min);
                }
                var qtyTd = $('<td></td>').append(qtyInput);

                //  tr.append(qtyTd)

                //Fetch stock of product and determine if this will be back ordered or not
                var buttonText = 'Add to Cart';
                var btn = $("<button type=\"submit\" title=\"Add to cart\" class=\"button primary tocart\" id=\"product-addtocart-button-".concat(index, "\">").concat(buttonText, "</button>")).data('sku', product.data.sku).data('uom', uom).data('variant', product.shopifyVariantId).data('last-input', '').data('prm', product.prm).data('multiplier', min);
                $("<td></td>").append(btn).appendTo(tr);
                var state = theme.utils.getCookie('user-state') || 'NSW';
                var plant = window.customer ? window.customer.plant : '';
                var url = "".concat(theme.ENV.apiUrl, "/stock?materialNo=").concat(+product.data.sku, "&state=").concat(state).concat(!!plant ? "&plant=".concat(plant) : '');
                var stock = 0;
                theme.utils.fetch(url, {
                  headers: {
                    'ngrok-skip-browser-warning': '1'
                  }
                }).then(function (result) {
                  stock = Math.round(+result);
                  //If there's no stock of the product, this is a back order
                  if (stock < 1) {
                    btn.text('Back Order');
                  }
                });
                $('#wishlist-table tbody').append(tr);
              });
            } else {
              $('#wishlist-table tbody').append('<tr>You have no wished item yet</tr>');
            }
          }
        })["catch"](function (err) {
          console.error(err);
        });
      },
      _addToWishlist: function _addToWishlist(evt) {
        var self = this;
        var product = evt.currentTarget.dataset.id;
        var isRemove = evt.currentTarget.classList.contains('active');
        var isAddOnly = evt.currentTarget.classList.contains('add-only');
        var email = window.customer && window.customer.email || this.guestEmail;
        var data = {
          email: email,
          variantId: product
        };

        // if the button is add only, and isRemove is true, the item is already on the wishlist and doesnt need to be updated
        if (isRemove && isAddOnly) return;
        fetch(theme.ENV.apiUrl + '/wishlist', {
          method: isRemove ? 'DELETE' : 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }).then(function (response) {
          return response.json();
        }).then(function (wishlist) {
          window.wishlist = wishlist;
        })["catch"](function (err) {
          window.wishlist = null;
        })["finally"](function () {
          self._updateAddToWishlistButtons();
          self._updateWishlistButton();
        });
      },
      _updateAddToWishlistButtons: function _updateAddToWishlistButtons() {
        var self = this;
        if (!window.wishlist) {
          this._fetchWishlist().then(self._updateAddToWishlistButtons);
          return;
        }
        this.addToWishlistButtons.each(function (index, button) {
          var variantId = button.dataset.id;
          var isWishlist = window.wishlist && window.wishlist.products && window.wishlist.products.find(function (product) {
            if (product.shopifyVariantId == variantId) return true;
          });
          if (isWishlist) {
            button.classList.add('active');
          } else {
            button.classList.remove('active');
          }
        });
      }
    });
    return Wishlist;
  }();
  theme.Forms = function () {
    function Forms() {
      var self = this;
      this.sampleFormButton = $('#product-addtosample-button');
      if (this.sampleFormButton.length > 0) {
        this._fetchDealers();
      }
    }
    Forms.prototype = Object.assign({}, Forms.prototype, {
      _fetchDealers: function _fetchDealers() {
        var self = this;
        var url = theme.ENV.apiUrl + '/shopify/dealers';
        return theme.utils.fetch(url).then(function (data) {
          window.dealers = data;
        });
      }
    });
    return Forms;
  }();
  theme._initWishlist = function () {
    this.wishlist = new theme.Wishlist();
  };
  theme._initToggles = function () {
    if (document.querySelectorAll('.toggle').length > 0) return new theme.Toggle('.toggle');
  };
  theme._initForms = function () {
    this.forms = new theme.Forms();
  };
  $(function () {
    theme.sections = new theme.Sections();
    theme.sections.register('product', theme.Product);
    theme._initWishlist();
    theme._initForms();
    theme._initToggles();
  });
})(jQuery);

/* Disclosure */
$(function () {
  var selectors = {
    openButton: '.disclosure__open-button',
    openButtonLink: '.disclosure__open-button a'
  };
  function init() {
    $(selectors.openButton).on('click', handleToggle);
  }
  function destroy() {
    $(selectors.openButton).off('click', handleToggle);
  }
  $(selectors.openButtonLink).on('click', handleChildClick);
  function handleToggle(event) {
    console.log('handleToggle');
    var ANIMATION_DURATION_MS = 200;
    var body = $(event.currentTarget).next();
    var isOpening = body.is(':hidden');
    body.slideToggle(ANIMATION_DURATION_MS);
    $(event.currentTarget).find('.icon').toggleClass('rotate-180');
    if (isOpening) {
      var isMobile = window.matchMedia('(max-width: 767px)').matches;

      /* Only control scroll if on mobile */
      if (!isMobile) return;

      /* Once the dropdown animation is finished, scroll what was just clicked into view. */
      setTimeout(function () {
        event.currentTarget.scrollIntoView({
          block: 'start',
          behavior: 'smooth'
        });
      }, ANIMATION_DURATION_MS);
    }
  }
  function handleChildClick(event) {
    /* prevent links inside the button from opening the disclosure */
    event.stopPropagation();
  }
  init();
  document.addEventListener('shopify:section:load', init);
  document.addEventListener('shopify:section:unload', destroy);
});