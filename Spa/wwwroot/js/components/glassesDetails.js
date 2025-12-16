import { fetchGlassesDetails } from '../api/glassesDetailsApi.js';

export async function renderGlassesDetails(sku) {
    const data = await fetchGlassesDetails(sku);
    const container = document.getElementById("glasses-details");
    container.innerHTML = `
            <div class="slideshow" id="slideshow">
                <div class="slides">
                    <div class="slide active">
                        <img src="/${data.imageUrl}" alt="${data.imageAlt}" class="responsiveImage" />
                    </div>
                </div>
                <div class="slideshow-nav">
                    <button type="button" class="prev" aria-label="Vorige" onclick="showSlideShow(-1)">&#10094;</button>
                    <button type="button" class="next" aria-label="Volgende" onclick="showSlideShow(1)">&#10095;</button>
                </div>
            </div>
            <h1>${data.name}</h1>
            <span class="price">Vanaf &euro;${data.price}</span>
            <p>Empori Harmani is een topmerk met zeer stijlvolle brillen. Er is veel aandacht voor draagcomfort en styling.</p>
     `;
}