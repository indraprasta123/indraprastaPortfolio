(function () {
  const menuList = document.querySelector(".head__menu__list");

  if (!menuList || menuList.querySelector(".head__dropdown")) {
    return;
  }

  const isRootPage = !window.location.pathname.includes("/src/");
  const prefix = isRootPage ? "./src/" : "./";
  const blogs = [
    ["blog.html", "blog-cart-index", "Cart Quantity Bug"],
    ["blog-state-id.html", "blog-state-id", "State and Stable ID"],
    ["blog-api-error.html", "blog-api-error", "Reading API Errors"],
    ["blog-responsive.html", "blog-responsive", "Responsive UI Notes"],
    ["blog-dark-mode.html", "blog-dark-mode", "Dark Mode Details"],
    ["blog-clean-code.html", "blog-clean-code", "Clean Code Habits"],
    ["blog-auth.html", "blog-auth", "Authentication Flow"],
    ["blog-database.html", "blog-database", "Database Notes"],
    ["blog-deploy.html", "blog-deploy", "Deployment Checklist"],
    ["blog-debugging.html", "blog-debugging", "Debugging Mindset"],
  ];

  const item = document.createElement("li");
  item.className = "head__menu__item head__dropdown";
  item.innerHTML = `
    <button class="head__menu__link head__dropdown__toggle hover" type="button" data-lang="nav-blog">
      BLOG
      <i class="fa fa-angle-down"></i>
    </button>
    <ul class="head__dropdown__menu">
      ${blogs
        .map(
          ([href, key, label]) => `
            <li>
              <a class="head__dropdown__link hover" href="${prefix}${href}" data-lang="${key}">
                ${label}
              </a>
            </li>
          `,
        )
        .join("")}
    </ul>
  `;

  const contactItem = [...menuList.children].find((child) =>
    child.querySelector('[data-lang="nav-contact"]'),
  );

  if (contactItem) {
    menuList.insertBefore(item, contactItem);
  } else {
    menuList.appendChild(item);
  }

  const toggle = item.querySelector(".head__dropdown__toggle");
  toggle.addEventListener("click", () => {
    if (item.classList.contains("head__dropdown--open")) {
      item.classList.remove("head__dropdown--open");
      item.classList.add("head__dropdown--suppress");
      return;
    }

    item.classList.remove("head__dropdown--suppress");
    item.classList.add("head__dropdown--open");
  });

  item.addEventListener("mouseleave", () => {
    item.classList.remove("head__dropdown--open", "head__dropdown--suppress");
  });

  document.addEventListener("click", (event) => {
    if (!item.contains(event.target)) {
      item.classList.remove("head__dropdown--open", "head__dropdown--suppress");
    }
  });
})();
