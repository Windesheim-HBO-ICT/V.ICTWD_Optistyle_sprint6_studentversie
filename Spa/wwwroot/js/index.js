import Home from "./views/home.js";
import Glasses from "./views/glasses.js";
import GlassesDetails from "./views/glasses-details.js";
import AboutUs from "./views/about-us.js";
import Appointment from "./views/appointment.js"
import Thanks from "./views/thanks.js"
import Review from "./views/review.js"

const navigateTo = url => {
    history.pushState(null, null, url);                // place every route thats is choosen on the history list
    router();
}

function matchRoute(route, pathname) {
  const routeParts = route.path.split("/").filter(Boolean);
  const pathParts = pathname.split("/").filter(Boolean);

  if (routeParts.length !== pathParts.length) return null;

  const params = {};

  for (let i = 0; i < routeParts.length; i++) {
    if (routeParts[i].startsWith(":")) {
      const paramName = routeParts[i].slice(1);
      params[paramName] = pathParts[i];
    } else if (routeParts[i] !== pathParts[i]) {
      return null;
    }
  }

  return params; // succes! return object met param values
}

const router = async () => {
    const routes = [
        { path: "/", view: Home },
        { path: "/home", view: Home },
        { path: "/glasses", view: Glasses },
        { path: "/glasses/details/:sku", view: GlassesDetails },
        { path: "/about-us", view: AboutUs },
        { path: "/appointment", view: Appointment },
        { path: "/thanks", view: Thanks },
        { path: "/review", view: Review },
    ];

    const currentPath = location.pathname === "/index.html" ? "/" : location.pathname;
    //let match = routes.find(r => r.path === currentPath) || routes[0];

    let match = null;
    let params = {};

    for (const route of routes) {
        const result = matchRoute(route, currentPath);
        if (result) {
            match = route;
            params = result;  // bevat bv. { sku: "ABC123" }
            break;
        }
    }

    if (!match) match = routes[0];

    const view = new match.view(params);
    document.querySelector("#app").innerHTML = await view.getHtml();

    if(typeof view.afterRenderer === "function") view.afterRenderer(); //if there's afterRenderer than run it
};

document.addEventListener("DOMContentLoaded", () => {   //listen to clicks in the body
    document.body.addEventListener("click", e => {      // if clicked inside the body and 
        const path = e.composedPath();                  // const link = e.target.closest("[data-link]"); will not work in web component!
        const link = path.find(el => el instanceof HTMLElement && el.matches && el.matches("[data-link]"));
        if (!link) return;                              // if it is not a datalink then do nothing
        e.preventDefault();                             // else do not refresh the page (preventDefault), 
        navigateTo(link.href);                          // but call our navigateTo function to load the right view        
    });

    router();
});

window.addEventListener("popstate", router);            // in order to let the navigation arrows of the browser work we call router on every pop state change (browsing the history list).

window.addEventListener("spa-navigation", e => {
  history.pushState(null, null, e.detail);              // e.detail contains href from nav-bar
  router();
});
