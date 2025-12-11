import { fetchGlasses } from '../api/glassesApi.js';

export async function renderGlassesList() {
    const data = await fetchGlasses();
    const container = document.getElementById("glasses-list");
    container.innerHTML = "";
    data.forEach(item => {
        const product = document.createElement("div");
        product.className = "product";
        product.innerHTML = `
                     <a href="/glasses/details/${encodeURIComponent(item.sku)}" data-link>  
                        <img src="${item.imageUrl}" alt="${item.imageAlt}" class="responsiveImage" />
                        <h2>${item.name}</h2>
                        <p>vanaf &euro;${item.price}</p>
                     </div>
                `;
        container.appendChild(product);
    });
}