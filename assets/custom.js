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
    // console.log(form);
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


