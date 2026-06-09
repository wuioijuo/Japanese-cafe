document.addEventListener("DOMContentLoaded", function () {
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");

  if (burger && nav) {
    burger.addEventListener("click", function () {
      nav.classList.toggle("open");
    });
  }

  const datePlace = document.getElementById("current-date");

  if (datePlace) {
    const now = new Date();

    const formattedDate = now.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });

    datePlace.textContent = "Сегодня: " + formattedDate;
  }

  const slides = document.querySelectorAll(".slide");
  const prevButton = document.getElementById("prev-slide");
  const nextButton = document.getElementById("next-slide");

  let currentSlide = 0;

  function showSlide(index) {
    if (!slides.length) {
      return;
    }

    slides.forEach(function (slide) {
      slide.classList.remove("active");
    });

    slides[index].classList.add("active");
  }

  function nextSlide() {
    currentSlide = currentSlide + 1;

    if (currentSlide >= slides.length) {
      currentSlide = 0;
    }

    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = currentSlide - 1;

    if (currentSlide < 0) {
      currentSlide = slides.length - 1;
    }

    showSlide(currentSlide);
  }

  if (nextButton && prevButton && slides.length) {
    nextButton.addEventListener("click", nextSlide);
    prevButton.addEventListener("click", prevSlide);

    setInterval(nextSlide, 4000);
  }

  const newsCards = document.querySelectorAll(".news-card");
  const modal = document.getElementById("news-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalText = document.getElementById("modal-text");
  const modalClose = document.getElementById("modal-close");

  newsCards.forEach(function (card) {
    card.addEventListener("click", function () {
      const title = card.dataset.title;
      const text = card.dataset.text;

      modalTitle.textContent = title;
      modalText.textContent = text;

      modal.classList.add("show");
    });
  });

  if (modalClose) {
    modalClose.addEventListener("click", function () {
      modal.classList.remove("show");
    });
  }

  if (modal) {
    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        modal.classList.remove("show");
      }
    });
  }

  const orderForm = document.getElementById("order-form");
  const formResult = document.getElementById("form-result");

  if (orderForm && formResult) {
    orderForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const formData = new FormData(orderForm);

      const selectedProducts = [];

      document.querySelectorAll('input[name="products"]:checked').forEach(function (checkbox) {
        selectedProducts.push(checkbox.value);
      });

      if (selectedProducts.length === 0) {
        formResult.style.display = "block";
        formResult.innerHTML = "<p>Пожалуйста, выберите хотя бы одно блюдо.</p>";
        return;
      }

      const data = {
        name: formData.get("name"),
        phone: formData.get("phone"),
        email: formData.get("email"),
        products: selectedProducts,
        contact: formData.get("contact"),
        type: formData.get("type"),
        address: formData.get("address"),
        persons: formData.get("persons"),
        payment: formData.get("payment"),
        comment: formData.get("comment")
      };

      localStorage.setItem("sushiOrder", JSON.stringify(data));

      formResult.style.display = "block";

      formResult.innerHTML = `
        <h3>Ваш заказ принят</h3>
        <p><strong>Имя:</strong> ${data.name}</p>
        <p><strong>Телефон:</strong> ${data.phone}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Блюда:</strong> ${data.products.join(", ")}</p>
        <p><strong>Способ связи:</strong> ${data.contact}</p>
        <p><strong>Тип заказа:</strong> ${data.type}</p>
        <p><strong>Адрес:</strong> ${data.address}</p>
        <p><strong>Количество персон:</strong> ${data.persons}</p>
        <p><strong>Оплата:</strong> ${data.payment}</p>
        <p><strong>Доставка:</strong> 45-90 минут, в зависимости от вашего района.</p>
        <p><strong>Комментарий:</strong> ${data.comment}</p>
      `;

      orderForm.reset();
    });
  }

  const geoButton = document.getElementById("geo-button");
  const geoResult = document.getElementById("geo-result");

if (geoButton && geoResult) {
  geoButton.addEventListener("click", function () {
    if (!navigator.geolocation) {
      geoResult.textContent = "Геолокация не поддерживается браузером.";
      return;
    }

    navigator.geolocation.getCurrentPosition(
      function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        geoResult.innerHTML =
          "<strong>Ваше местоположение:</strong><br>" +
          '<a class="map-link" href="https://yandex.ru/maps/?ll=' +
          longitude +
          "%2C" +
          latitude +
          '&z=16" target="_blank">Открыть моё местоположение на карте</a>' +
          "<br><br>" +
          "<strong>Адрес ресторана:</strong><br>" +
          "Москва, Славянская площадь, 4с1";
      },

      function () {
        geoResult.textContent = "Не удалось получить геолокацию.";
      }
    );
  });
}

const productCards = document.querySelectorAll(".menu-product");
const productModal = document.getElementById("product-modal");
const productModalClose = document.getElementById("product-modal-close");
const productModalImage = document.getElementById("product-modal-image");
const productModalName = document.getElementById("product-modal-name");
const productModalJp = document.getElementById("product-modal-jp");
const productModalDesc = document.getElementById("product-modal-desc");
const productModalWeight = document.getElementById("product-modal-weight");
const productModalCalories = document.getElementById("product-modal-calories");
const productModalPrice = document.getElementById("product-modal-price");
const productOrderLink = document.getElementById("product-order-link");

productCards.forEach(function (card) {
  card.addEventListener("click", function () {
    const name = card.dataset.name;

    productModalImage.src = card.dataset.image;
    productModalName.textContent = name;
    productModalJp.textContent = card.dataset.jp;
    productModalDesc.textContent = card.dataset.desc;
    productModalWeight.textContent = card.dataset.weight;
    productModalCalories.textContent = card.dataset.calories;
    productModalPrice.textContent = card.dataset.price;

    productOrderLink.href = "booking.html?product=" + encodeURIComponent(name);

    productModal.classList.add("show");
  });
});

  if (productModalClose) {
    productModalClose.addEventListener("click", function () {
      productModal.classList.remove("show");
    });
  }

  if (productModal) {
    productModal.addEventListener("click", function (event) {
      if (event.target === productModal) {
        productModal.classList.remove("show");
      }
    });
  }

  const productParams = new URLSearchParams(window.location.search);
  const selectedProduct = productParams.get("product");

  if (selectedProduct) {
    const productCheckboxes = document.querySelectorAll('input[name="products"]');

    productCheckboxes.forEach(function (checkbox) {
      if (checkbox.value === selectedProduct) {
        checkbox.checked = true;
      }
    });
  }
});