class ColourSwatches_ProductCard extends HTMLElement {
    constructor() {
      super();
      this.preloadedSections = {};
    }
    connectedCallback() {
      this.container = this.querySelector('.colour-swatches__container fieldset');
     
      this.settings = this.setSettings();
      this.initPopStateListener(); 
       console.log("here swatches product card:", this.container, this.settings)
      if (!this.container || !this.settings) return;
    
      const hideIfEmpty = this.settings.hideIfEmpty;
    
      if (this.settings.groupTag) {
        fetch(`/collections/all/${encodeURIComponent(this.settings.groupTag)}?view=data`)
          .then((response) => response.json())
          .then((responseJson) => {
          
            this.initSwatches(responseJson);
            this.attachColorSwatchEventListeners();
            this.hideIfEmpty(hideIfEmpty);
           
    
            const placeholder = this.querySelector(`#placeholder_swatches_${this.settings.product_id}`);
            console.log("placeholder PRODUCT CARD", placeholder)
            if (placeholder) placeholder.classList.add("hidden");
          });
      } else {
        this.hideIfEmpty(hideIfEmpty);
      }
    }
    initPopStateListener() {
        window.addEventListener('popstate', (event) => this.handlePopState(event));
    }
    handlePopState(event) {
        if (event.state && event.state.path) {
            const url = event.state.path
            this.updateSection(url.replaceAll('/products/',''), event);
        }
    }
    hideIfEmpty(hideIfEmpty) {
      if (!hideIfEmpty) return;
  
      const swatches = this.querySelectorAll('.colour-swatches__container input');
      if (swatches.length > 0  ) return;
  
      this.classList.add("swatch-empty--hide"); 
    }
  
    setSettings() {
      const settingsRawJson = this.querySelector(".swatches-settings");
      if(!settingsRawJson) return {}
      return JSON.parse(settingsRawJson.innerHTML);
    }
  
    initSwatches(products) {
      var html = "";
      var html_colors = "";
      var image_swatch_metaobject = '';
      const self = this;
      products.forEach(product => {
        if (this.settings.image_type == true ){
              
                    const imgSrc = this.getProductImageSrc(product)
                    var el_swatch = `<label class="variant-option__button-label variant-option__button-label--has-swatch">
                                          <input id="swatch-input-${product.id}" 
                                          swatch-input  
                                          data-href="/products/${product.handle}" 
                                          data-handle="${product.handle}"  
                                          type="radio" 
                                          value="${product.id}" 
                                          aria-label="${product.handle}" 
                                          data-input-id="1-0" 
                                          data-option-value-id="${product.id}" 
                                          data-option-available="${product.available}" 
                                          data-connected-product-url="${product.handle}" 
                                          data-variant-id="${product.variants[0].id}"
                                          ${this.settings.product_handle==product.handle ? "checked" : ""}
                                          >
                                          <span class="swatch ${this.settings.stitching_context == 'product_page' ? 'swatch--unscaled' : ''}" style="--swatch-background: url(${imgSrc});"></span>
                                          ${!product.available ? `
                                            <svg
                                              width="100%"
                                              height="100%"
                                              viewBox="0 0 100 46"
                                              preserveAspectRatio="xMidYMid slice"
                                            >
                                              <line x1="100" y1="0" x2="0" y2="46" vector-effect="non-scaling-stroke" />
                                            </svg>
                                          ` : ''}
                                        </label>`
                    html += el_swatch
              
        } else { 
                  const imgSrc = this.getProductImageSrc(product)
                  const color_metafield = product.color_swatch_metafield; 
                   image_swatch_metaobject = product.image_swatch_metaobject;
                   var el_swatch = `<label class="variant-option__button-label variant-option__button-label--has-swatch">
                                          <input id="swatch-input-${product.id}" swatch-input  data-href="/products/${product.handle}" 
                                          data-handle="${product.handle}"  
                                          type="radio" value="${product.id}" aria-label="${product.handle}" 
                                          data-input-id="1-0" data-option-value-id="4635978924349" 
                                          data-option-available="${product.available}" 
                                          data-connected-product-url="${product.handle}" 
                                          data-variant-id="${product.variants[0].id}" 
                                          ${this.settings.product_handle==product.handle ? "checked" : ""}
                                          >
                                          <span class="swatch ${this.settings.stitching_context == 'product_page' ? 'swatch--unscaled' : ''}" 
                                          style="${image_swatch_metaobject && image_swatch_metaobject !== '' ? `--swatch-background: url(${image_swatch_metaobject})` : `--swatch-background: ${color_metafield}`}"></span>
                                          ${!product.available ? `
                                            <svg
                                              width="100%"
                                              height="100%"
                                              viewBox="0 0 100 46"
                                              preserveAspectRatio="xMidYMid slice"
                                            >
                                              <line x1="100" y1="0" x2="0" y2="46" vector-effect="non-scaling-stroke" />
                                            </svg>
                                          ` : ''}
                                        </label>`;
                    html += el_swatch
                }
      })

      if(html) {
       
        this.container.innerHTML = html
        const swatchInputs = this.container.querySelectorAll("[swatch-input]");
        const swatchInputsLength = swatchInputs.length;
      }
    }
  
    getProductImageSrc(product) {
      var imageSrc = product.featured_image;
      switch (this.settings.image_type) {
        case "color_swatch":
          const colourTag = product.tags.find(tag => tag.indexOf(this.settings.colourTagPrefix) > -1);
          if(colourTag) {
            const colour = colourTag.replace(this.settings.colourTagPrefix, "").toLowerCase();
            imageSrc = colour;
          }
          break;
        case "first_variant_image":
        const firstVariantImage = product.variants[0].image;
          if(firstVariantImage) imageSrc = firstVariantImage;
          break;
        case "last_variant_image":
          const lastVariantImg = product.variants[product.variants.length - 1].image;
          if(lastVariantImg) imageSrc = lastVariantImg;
          break;
        default:
          break;
      }
      return imageSrc;
    }
  
    getProductImage(product) {
      const imageSrc = this.getProductImageSrc(product);
      const image = `<img src="${imageSrc}">`;
      return image;
    }
    updateSection(url, event) {
      
      const item = event.target.closest(".product-card");
      console.log("HERE URL: ", url ,"ITEM:", item)
   
      if (!item) return;
     
      const card = item.closest(".product-card-link");
      console.log("HERE CARD: ",card )
      if (!card || !url) return;
      fetch(window.Shopify.routes.root + `products/${url}?view=product_card_template`)
        .then((res) => res.text())
        .then((htmlString) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(htmlString, "text/html");
          const newCard = doc.querySelector("#MainContent .product-card-link");
  
          if (newCard) {
            card.replaceWith(newCard); 
          } else {
            console.warn("Updated product card not found");
          }
        })
        .catch((err) =>
          console.error("Error fetching stitched product card:", err)
        );

        
        this.attachColorSwatchEventListeners();
    }
    getProductPath(url) {
        const urlParts = url.split('?'); // Split the URL at the query string
        return urlParts[0]; // Return the part before the query string
    }
    attachColorSwatchEventListeners() {
        const self = this;
        const swatches = this.querySelectorAll('.colour-swatches__container input[type="radio"]');
        if (swatches.length > 0){
            swatches.forEach(item => {
                item.addEventListener("click", function(event) {
                    event.preventDefault();
                    swatches.forEach(input => {
                        input.checked = false;
                        input.removeAttribute('checked');
                    });

                    // Set checked on the clicked input
                    this.checked = true;
                    this.setAttribute('checked', 'checked');

                    const product_handle = this.getAttribute('data-handle');
                    const productUrl = this.getAttribute('data-href');
                    const urlParts = productUrl.split('?');
                    const productPath = urlParts[0];
                    if(self.settings.location == 'product'){
                      history.pushState({ path: productPath }, '', productPath);
                    }
                      console.log("attaching listeners:", product_handle)
                    self.updateSection(product_handle, event);
                  
                });
            });
        }
      
    }
    
    setCurrent() {
        const swatches = this.querySelectorAll('.colour-swatches__container input');
        if (swatches.length > 0){
        this.container.querySelector(`[data-handle="${window.current.product.handle}"]`).setAttribute("checked", "checked");
       
        }
    }
  }
  if (!customElements.get('colour-swatches-product-card')) {
    customElements.define('colour-swatches-product-card', ColourSwatches_ProductCard);
  }


