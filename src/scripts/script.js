console.log("widget generation script loaded");
const projectId = "34yWxG81gNefb2Vkj0rQ";
const current_url = window.location.href;
const client = "reddit_clone";
var info = "current_url=".concat(current_url, "&");
var w = document.createElement("iframe");
w.id = "botcart-iframe";
w.src = "http://"
  .concat("localhost:3000/?")
  .concat(info)
  .concat("client=", client)
  .concat("&")
  .concat("projectId=", projectId, "&");
w.allow = "autoplay";
w.allowFullscreen = !0;

let cookie_data = {};

console.log(
  document.cookie.split(";").map((element) => {
    const values = element.trim().split("=");
    cookie_data[values[0]] = values[1];
    return values;
  })
);

console.log(cookie_data);

document.head.insertAdjacentHTML(
  "beforeend",
  `<style>
#botcart-iframe
{border: none; 
  position: fixed; 
  bottom: 0;  
  right: 0; 
  z-index: 31415999;
  visibility: visible;
  width: 401px;
  height:570px;
</style>`
);

if ("user" in cookie_data && "user_id" in cookie_data) {
  console.log(cookie_data.user, cookie_data.user_id);

  const user_data = "user="
    .concat(cookie_data.user, "&")
    .concat("user_id=", cookie_data.user_id);
  w.src = w.src.concat(user_data);
  document.body.appendChild(w);
} else {
  console.log("In Else");
  fetch("https://api.ipify.org/?format=json")
    .then((resp) => resp.json())
    .then((ip) => {
      const simplifiedIP = ip.ip.split(".").join("");
      console.log("In fetch called", ip, simplifiedIP);
      w.src = w.src.concat("userIP=", simplifiedIP, "&");
      console.log("Source to be sent to widget", w.src);
      document.body.appendChild(w);
    });
}

function initMap() {
  var elements = document.querySelectorAll('.js-map');
  Array.prototype.forEach.call(elements, function(el) {
    var lat = +el.dataset.latitude,
        lng = +el.dataset.longitude,
        zoom = +el.dataset.zoom;
    if ((lat !== '') && (lng !== '') && (zoom > 0)) {
      var map = new google.maps.Map(el, {
        zoom: zoom,
        center: { lat: lat, lng: lng },
        disableDefaultUI: true
      });
      var marker = new google.maps.Marker({
        map: map,
        animation: google.maps.Animation.DROP,
        position: { lat: lat, lng: lng }
      });
    }
  });
}

// Change view

(function() {
  var container = document.getElementById('products');

  if(container) {
    var grid = container.querySelector('.js-products-grid'),
        viewClass = 'tm-products-',
        optionSwitch = Array.prototype.slice.call(container.querySelectorAll('.js-change-view a'));

    function init() {
      optionSwitch.forEach(function(el, i) {
        el.addEventListener('click', function(ev) {
          ev.preventDefault();
          _switch(this);
        }, false );
      });
    }

    function _switch(opt) {
      optionSwitch.forEach(function(el) {
        grid.classList.remove(viewClass + el.getAttribute('data-view'));
      });
      grid.classList.add(viewClass + opt.getAttribute('data-view'));
    }

    init();
  }
})();

// Increment

function increment(incrementor, target) {
  var value = parseInt(document.getElementById(target).value, 10);
  value = isNaN(value) ? 0 : value;
  if(incrementor < 0) {
    if(value > 1) {
      value+=incrementor;
    }
  } else {
    value+=incrementor;
  }
  document.getElementById(target).value = value;
}

// Scroll to description

(function() {
  UIkit.scroll('.js-scroll-to-description', {
    duration: 300,
    offset: 58
  });
})();

// Update sticky tabs

(function() {
  UIkit.util.on('.js-product-switcher', 'show', function() {
    UIkit.update();
  });
})();

// Add to cart

(function() {
  var addToCartButtons = document.querySelectorAll('.js-add-to-cart');

  Array.prototype.forEach.call(addToCartButtons, function(el) {
    el.onclick = function() {
      UIkit.offcanvas('#cart-offcanvas').show();
    };
  });
})();

// Action buttons

(function() {
  var addToButtons = document.querySelectorAll('.js-add-to');

  Array.prototype.forEach.call(addToButtons, function(el) {
    var link;
    var message = '<span class="uk-margin-small-right" uk-icon=\'check\'></span>Added to '  ;
    var links = {
      favorites: '<a href="/favorites">favorites</a>',
      compare: '<a href="/compare">compare</a>',
    };
    if(el.classList.contains('js-add-to-favorites')) {
      link = links.favorites;
    };
    if(el.classList.contains('js-add-to-compare')) {
      link = links.compare;
    }
    el.onclick = function() {
      if(!this.classList.contains('js-added-to')) {
        UIkit.notification({
          message: message + link,
          pos: 'bottom-right'
        });
      }
      this.classList.toggle('tm-action-button-active');
      this.classList.toggle('js-added-to');
    };
  });
})();


