(function (Drupal, once) {
  Drupal.behaviors.glideLast3 = {
    attach: function (context, settings) {
      once("glideInit", ".view-display-id-last_3 .glide", context).forEach(
        function (element) {
          const glidelast = new Glide(element, {
            type: "slider",
            startAt: 0,
            gap: 16,
            swipeThreshold: true,
            dragThreshold: true,
            arrows: false,
            breakpoints: {
              992: { perView: 2, gap: 16 },
              576: { perView: 1 },
            },
            rewind: false,
            bound: true,
          });

          function getPerView() {
            if (window.matchMedia("(max-width: 576px)").matches) return 1;
            if (window.matchMedia("(max-width: 992px)").matches) return 2;
            return 3;
          }

          function updateBullets() {
            const bulletContainer = element.querySelector(
              '.view-display-id-last_3 .glide__bullets[data-glide-el="controls[nav]"]'
            );

            const slideElements = element.querySelectorAll(
              ".view-display-id-last_3 .glide__slides .views-row"
            );

            if (!bulletContainer || !slideElements.length) return;

            bulletContainer.innerHTML = "";

            let perView = getPerView();
            const pages = Math.ceil(slideElements.length / perView);

            if (pages > 1) {
              for (let i = 0; i < pages; i++) {
                const bullet = document.createElement("button");
                bullet.className = "glide__bullet";
                bullet.setAttribute("data-glide-dir", `=${i * perView}`);
                bulletContainer.appendChild(bullet);
              }
            }

            glidelast.mount();
          }

          updateBullets();

          window
            .matchMedia("(max-width: 992px)")
            .addEventListener("change", updateBullets);
          window
            .matchMedia("(max-width: 576px)")
            .addEventListener("change", updateBullets);

          glidelast.mount();
        }
      );
    },
  };
})(Drupal, once);
