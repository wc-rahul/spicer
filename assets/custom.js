if(document.querySelector('span.s-icon') && document.querySelector('.search-input-class-desk')) {
  var textSearch = document.querySelector('.search-input-class-desk');
  var swatchActiveClass = document.querySelectorAll(".product-single__meta .swatch input:checked + label");
  document.querySelector('span.s-icon').addEventListener('click', (ev) => {
    searchVariant(textSearch, swatchActiveClass);
  });
  document.querySelector('.search-input-class-desk').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      searchVariant(textSearch, swatchActiveClass);
    }
  });
}


function searchVariant(searchText, swatchActiveClass){

  if(document.querySelectorAll('.variant-wraper')) {
    [...document.querySelectorAll('.variant-wraper')].forEach(el => {
      // Convert each option to lowercase and check if they include the search text as a substring
      const option1Match = el.dataset.option1 && el.dataset.option1.toLowerCase().includes(searchText.value.toLowerCase());
      const option2Match = el.dataset.option2 && el.dataset.option2.toLowerCase().includes(searchText.value.toLowerCase());
      const option3Match = el.dataset.option3 && el.dataset.option3.toLowerCase().includes(searchText.value.toLowerCase());

    

      if(option1Match || option2Match || option3Match) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });
  }    
  
  for (var i = 0; i < swatchActiveClass.length; i++) {
    var backgroundimage = swatchActiveClass[i].style.backgroundImage;
    var backgroundColor = swatchActiveClass[i].style.backgroundColor;
    swatchActiveClass[i].setAttribute("style", `outline: none !important; background-image: ${backgroundimage} ; background-color: ${backgroundColor}`)
  }
}


!!document?.querySelectorAll('.product-with-colors .swatch-element label') && [...document?.querySelectorAll('.product-with-colors .swatch-element label')].forEach(em => {
  // console.log(el);
  em.addEventListener('click', function(ev){
    var search = em.getAttribute("title");
    var searchText = document.querySelector('.search-input-class-desk');
    searchText.value = search ;
    !!document?.querySelectorAll('.variant-wraper') && [...document?.querySelectorAll('.variant-wraper')].forEach(el => {
    //  if(search && (el.dataset.option1.toLowerCase().indexOf(search.toLowerCase()) > -1 || el.dataset.option2.toLowerCase().indexOf(search.toLowerCase()) > -1 || el.dataset.option3.toLowerCase().indexOf(search.toLowerCase()) > -1)){
      if(search && (el.dataset.option1.toLowerCase() == search.toLowerCase() || el.dataset.option2.toLowerCase() == search.toLowerCase() || el.dataset.option3.toLowerCase() == search.toLowerCase() )){
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });
  })
});


if (
  document.querySelector("span.s-icon-mob") &&
  document.querySelector(".search-input-class-mob")
) {
  var searchText = document.querySelector(".search-input-class-mob");//.value.toLowerCase();
  var swatchActiveClass = document.querySelectorAll(".product-with-colors .swatch_elements_wrapper .swatch-element label");
  document.querySelector("span.s-icon-mob").addEventListener("click", (ev) => {
    searchVariant(searchText, swatchActiveClass);
  });
  document.querySelector('.search-input-class-mob').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      searchVariant(searchText, swatchActiveClass);
    }
  });
}


var activeclass = document.querySelectorAll(".product-with-colors .swatch-element label");
for (var i = 0; i < activeclass.length; i++) {
  activeclass[i].addEventListener("click", activateClass);
}
function activateClass(e) {
  for (var i = 0; i < activeclass.length; i++) {
    activeclass[i].classList.remove("active-cell");
    var backgroundimage = activeclass[i].style.backgroundImage
    var backgroundColor = swatchActiveClass[i].style.backgroundColor;
    swatchActiveClass[i].setAttribute("style", `outline: none !important; background-image: ${backgroundimage} ; background-color: ${backgroundColor}`)
  }
  e.target.classList.add("active-cell");
    
  var backgroundimage = e.target.style.backgroundImage
  var backgroundColor = e.target.style.backgroundColor;
  e.target.setAttribute("style", `outline: 1px solid red !important; background-image: ${backgroundimage} ; background-color: ${backgroundColor}`)

}


!!document?.querySelectorAll(".product-with-colors .swatch-element label") &&
  [...document?.querySelectorAll(".product-with-colors .swatch-element label")].forEach((em) => {
    // console.log(el);
    em.addEventListener("click", function (ev) {
    
      var search = em.getAttribute("title");
      var searchText = document.querySelector(".search-input-class-mob");
      searchText.value = search;
      !!document?.querySelectorAll(".variant-wraper") &&
        [...document?.querySelectorAll(".variant-wraper")].forEach((el) => {
          //  if(search && (el.dataset.option1.toLowerCase().indexOf(search.toLowerCase()) > -1 || el.dataset.option2.toLowerCase().indexOf(search.toLowerCase()) > -1 || el.dataset.option3.toLowerCase().indexOf(search.toLowerCase()) > -1)){
          if (
            search &&
            (el.dataset.option1.toLowerCase() == search.toLowerCase() ||
              el.dataset.option2.toLowerCase() == search.toLowerCase() ||
              el.dataset.option3.toLowerCase() == search.toLowerCase())
          ) {
            el.classList.add("active");
          } else {
            el.classList.remove("active");
          }
        });
    });
  });



var formsArr = document.querySelectorAll('.container-variant [action="/cart/add"]');
if(formsArr.length) {
  formsArr.forEach(function(form,index) {
    theme.AddItemToCart(form);
  });
}


document.querySelectorAll('.readmore-description').forEach(element => {
  element.addEventListener('click', function(event) {
    event.preventDefault();

    const previousElement = this.previousElementSibling;


    if (previousElement.style.overflowY !== 'unset') {
      // Show content if it's not already shown
      previousElement.style.overflowY = 'unset';
      previousElement.style.maxHeight = 'unset';
      this.textContent = "Read Less";
    } else {
      // Hide content if it's shown
      previousElement.style.overflowY = 'clip';
      previousElement.style.maxHeight = '100px'; 
      this.textContent = "Read More";
    }
  });
});

// initial selection
// window.onload = (event) => {
//   console.log("page is fully loaded");
//   var firstactiveclass = document.querySelector(".product-with-colors .swatch-element:nth-child(1) label");
//   var backgroundimage = firstactiveclass.style.backgroundImage
//   firstactiveclass.setAttribute("style", "outline: 1px solid red !important; outline-offset: 4px; background-image:"+backgroundimage);
//   var search = firstactiveclass.getAttribute("title");
//     var searchText = document.querySelector('.search-input-class-desk');
//     searchText.value = search ;
//     !!document?.querySelectorAll('.variant-wraper') && [...document?.querySelectorAll('.variant-wraper')].forEach(el => {
//     //  if(search && (el.dataset.option1.toLowerCase().indexOf(search.toLowerCase()) > -1 || el.dataset.option2.toLowerCase().indexOf(search.toLowerCase()) > -1 || el.dataset.option3.toLowerCase().indexOf(search.toLowerCase()) > -1)){
//       if(search && (el.dataset.option1.toLowerCase() == search.toLowerCase() || el.dataset.option2.toLowerCase() == search.toLowerCase() || el.dataset.option3.toLowerCase() == search.toLowerCase() )){
//         el.classList.add('active');
//       } else {
//         el.classList.remove('active');
//       }
//     });
// };


// if(document.querySelector('span.s-icon') && document.querySelector('.search-input-class')) {
//   document.querySelector('span.s-icon').addEventListener('click', (ev) => {
//   // document.querySelector('.search-input-class').addEventListener('input', (ev) => {
//     var searchText = document.querySelector('.search-input-class');
//     !!document?.querySelectorAll('.variant-wraper') && [...document?.querySelectorAll('.variant-wraper')].forEach(el => {
//        console.log(el);
//     //  if(ev.currentTarget.value && (el.dataset.option1.toLowerCase().indexOf(ev.currentTarget.value.toLowerCase()) > -1 || el.dataset.option2.toLowerCase().indexOf(ev.currentTarget.value.toLowerCase()) > -1 || el.dataset.option3.toLowerCase().indexOf(ev.currentTarget.value.toLowerCase()) > -1)){
//       if(searchText.value && (el.dataset.option1.toLowerCase() == searchText.value.toLowerCase() || el.dataset.option2.toLowerCase()== searchText.value.toLowerCase() || el.dataset.option3.toLowerCase() == searchText.value.toLowerCase())){
//         el.classList.add('active');
//       } else {
//         el.classList.remove('active');
//       }
//     });
//   });
// }

// var activeclass = document.querySelectorAll(".swatch-element label");
// for (var i = 0; i < activeclass.length; i++) {
//   activeclass[i].addEventListener("click", toggleBorder(activeclass);
// }
// function toggleBorder(element) {
//   const elements = document.querySelectorAll(".swatch-element label");
//   elements.forEach((el) => el.classList.remove("active-cell"));
//   element.target.classList.add("active-cell");
// }


// function searchVariantMob(searchText){
//   var searchText = document.querySelector(".search-input-class-mob");
//   !!document?.querySelectorAll(".variant-wraper") &&
//     [...document?.querySelectorAll(".variant-wraper")].forEach((el) => {
//       // console.log(el);
//       //  if(ev.currentTarget.value && (el.dataset.option1.toLowerCase().indexOf(ev.currentTarget.value.toLowerCase()) > -1 || el.dataset.option2.toLowerCase().indexOf(ev.currentTarget.value.toLowerCase()) > -1 || el.dataset.option3.toLowerCase().indexOf(ev.currentTarget.value.toLowerCase()) > -1)){
//       if (
//         searchText.value &&
//         (el.dataset.option1.toLowerCase() == searchText.value.toLowerCase() ||
//           el.dataset.option2.toLowerCase() ==
//             searchText.value.toLowerCase() ||
//           el.dataset.option3.toLowerCase() == searchText.value.toLowerCase())
//       ) {
//         el.classList.add("active");
//       } else {
//         el.classList.remove("active");
//       }
//     });
// }
// function searchVariantdesk(searchText, swatchActiveClass){
//   !!document?.querySelectorAll(".variant-wraper") &&
//      [...document?.querySelectorAll(".variant-wraper")].forEach((el) => {
//        //  if(search && (el.dataset.option1.toLowerCase().indexOf(search.toLowerCase()) > -1 || el.dataset.option2.toLowerCase().indexOf(search.toLowerCase()) > -1 || el.dataset.option3.toLowerCase().indexOf(search.toLowerCase()) > -1)){
//        if (
//          //search &&
//          (el.dataset.option1.toLowerCase() == searchText.value.toLowerCase() ||
//            el.dataset.option2.toLowerCase() == searchText.value.toLowerCase() ||
//            el.dataset.option3.toLowerCase() == searchText.value.toLowerCase())
//        ) {
//          el.classList.add("active");
//        } else {
//          el.classList.remove("active");
//        }
//      });
// }


// var click_swatch = document.querySelector('.swatch-click + label');
// window.onload = (event) => {
//   click_swatch?.click();
// };

// if(document.querySelector('.template-product .readmore')) {
//   document.querySelector('.readmore').addEventListener('click', (ev) => {

//     var navTabs  = document.querySelectorAll('ul.nav-tabs li');
//     var tabContent  = document.querySelectorAll('.tab-content div');
//     for(i=0; i<navTabs.length; i++){
//       navTabs[i].classList.remove('active');
//       tabContent[i].classList.remove('active');
//     }
//     if(navTabs.length == 3){
//       navTabs[1].classList.add('active');
//       tabContent[1].classList.add('active');
//     } else {
//       navTabs[0].classList.add('active');
//       tabContent[0].classList.add('active');
//     }

//   }) 

// }


window.navigation.addEventListener("navigate", (event) => {
      setTimeout(() => {
          const url = window.location.href;
          const urlObject = new URL(url);
          const queryParams = new URLSearchParams(urlObject.search);
          const variantIdFromURL = queryParams.get('variant');

          const variantsList = document.querySelector('.variant-loop');
          const variants = variantsList.querySelectorAll('li');
          let quantity = 0;

        
          variants.forEach(variant => {
              const id = variant.querySelector('.variantid').textContent;
              if (id === variantIdFromURL) {
                  quantity = parseInt(variant.querySelector('.variantQuantity').textContent);
              }
          });

          const stockContainer = document.querySelector('.stock-avl');

          while (stockContainer.firstChild) {
              stockContainer.removeChild(stockContainer.firstChild);
          }

          const p = document.createElement('p');
          const span = document.createElement('span');
          span.className = 'sa-svg';

          if (quantity > 5) {
              p.textContent = "In Stock";
              p.style.color = '#68C090'; 
              span.innerHTML = createSvg('#68C090'); 
          } else {
              p.textContent = "Limited Stock";
              p.style.color = 'orange'; 
              span.innerHTML = createSvg('orange'); 
          } 

          stockContainer.appendChild(span);
          stockContainer.appendChild(p);

          console.log("Quantity for Variant ID", variantIdFromURL, "is:", quantity);
      }, 0);
});

function createSvg(fillColor) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M17.4163 9.5C17.4163 13.8723 13.8719 17.4167 9.49967 17.4167C5.12742 17.4167 1.58301 13.8723 1.58301 9.5C1.58301 5.12775 5.12742 1.58334 9.49967 1.58334C13.8719 1.58334 17.4163 5.12775 17.4163 9.5ZM7.42741 8.7629C7.524 8.80439 7.61135 8.8647 7.68438 8.94031L8.70801 9.96394L11.315 7.35698C11.388 7.28136 11.4753 7.22105 11.5719 7.17956C11.6685 7.13807 11.7724 7.11623 11.8775 7.11532C11.9826 7.11441 12.0869 7.13444 12.1842 7.17424C12.2815 7.21405 12.3699 7.27283 12.4442 7.34716C12.5185 7.4215 12.5773 7.50989 12.6171 7.60718C12.6569 7.70447 12.677 7.80872 12.676 7.91384C12.6751 8.01895 12.6533 8.12284 12.6118 8.21942C12.5703 8.31601 12.51 8.40336 12.4344 8.47639L9.26771 11.6431C9.11925 11.7915 8.91793 11.8748 8.70801 11.8748C8.49808 11.8748 8.29676 11.7915 8.1483 11.6431L6.56496 10.0597C6.48935 9.9867 6.42904 9.89934 6.38755 9.80276C6.34606 9.70617 6.32422 9.60229 6.32331 9.49717C6.32239 9.39205 6.34242 9.28781 6.38223 9.19051C6.42204 9.09322 6.48082 9.00483 6.55515 8.9305C6.62948 8.85617 6.71787 8.79738 6.81517 8.75758C6.91246 8.71777 7.01671 8.69774 7.12182 8.69865C7.22694 8.69957 7.33082 8.72141 7.42741 8.7629Z" fill="${fillColor}"/>
          </svg>`;
}

