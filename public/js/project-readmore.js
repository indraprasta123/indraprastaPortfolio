(function () {
  const descriptions = document.querySelectorAll(".projects__content__right-side > p");

  descriptions.forEach((description) => {
    description.classList.add("project-description", "project-description--collapsed");

    const button = document.createElement("button");
    button.type = "button";
    button.className = "project-read-more hover";
    button.setAttribute("data-lang", "project-read-more");
    button.textContent = "READ MORE";

    button.addEventListener("click", () => {
      const isExpanded = description.classList.toggle("project-description--expanded");
      description.classList.toggle("project-description--collapsed", !isExpanded);

      button.setAttribute(
        "data-lang",
        isExpanded ? "project-read-less" : "project-read-more",
      );

      const isIndonesian =
        document.querySelector(".translate-btn img")?.alt === "English";

      button.textContent = isExpanded
        ? isIndonesian
          ? "SEMBUNYIKAN"
          : "SHOW LESS"
        : isIndonesian
          ? "SELENGKAPNYA"
          : "READ MORE";
    });

    description.insertAdjacentElement("afterend", button);
  });
})();
