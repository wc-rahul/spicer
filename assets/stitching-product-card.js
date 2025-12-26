document.addEventListener("DOMContentLoaded", function () {
    document.body.addEventListener("click", function (event) {
      console.log("item product card clicking")
      const item = event.target.closest(".product_stitching_item_card");
     console.log("item product card",item)
      if (!item) return;
  
      event.preventDefault();
  
      const productHandle = item.dataset.productHandle;
      const card = item.closest(".product-card-link");
      const blockId = card?.dataset.blockId;
      if (!card || !productHandle) return;
      fetch(`${productHandle}?view=product_card_template`)
        .then((res) => res.text())
        .then((htmlString) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(htmlString, "text/html");
          const newCard = doc.querySelector(".product-card-link");
  
          if (newCard) {
            card.replaceWith(newCard); // replaces the full card (DOM node and all)
          } else {
            console.warn("Updated product card not found");
          }
        })
        .catch((err) =>
          console.error("Error fetching stitched product card:", err)
        );
    });
  });
  