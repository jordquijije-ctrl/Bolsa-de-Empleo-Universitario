/* --------------------------------------------------------------------------
   INICIOVIEW.JS - Vista para la Página de Inicio (Landing Page)
   -------------------------------------------------------------------------- */

class InicioView {
    constructor() {
        this.heroSearchForm = document.getElementById("hero-search-form");
        this.heroSearchInput = document.getElementById("hero-search-input");
        this.heroLocationSelect = document.getElementById("hero-location-select");
        this.categoryCards = document.querySelectorAll(".category-card");
        this.popularTags = document.querySelectorAll(".popular-tags .tag-btn");
    }

    bindSearch(handler) {
        if (this.heroSearchForm) {
            this.heroSearchForm.addEventListener("submit", (e) => {
                e.preventDefault();
                const keyword = this.heroSearchInput ? this.heroSearchInput.value : "";
                const location = this.heroLocationSelect ? this.heroLocationSelect.value : "";
                handler({ keyword, location });
            });
        }
    }

    bindCategoryClick(handler) {
        this.categoryCards.forEach(card => {
            card.addEventListener("click", () => {
                const category = card.getAttribute("data-category");
                handler(category);
            });
        });
    }

    bindPopularTagClick(handler) {
        this.popularTags.forEach(tag => {
            tag.addEventListener("click", () => {
                const search = tag.getAttribute("data-search");
                handler(search);
            });
        });
    }
}
