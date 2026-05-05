(function () {
  const finePointerQuery = window.matchMedia(
    "(hover: hover) and (pointer: fine)",
  );
  const mobileWidthQuery = window.matchMedia("(max-width: 767.98px)");

  if (!finePointerQuery.matches || mobileWidthQuery.matches) {
    return;
  }

  const style = document.createElement("style");
  style.id = "custom-cursor-style";
  style.textContent = `
    @media (max-width: 767.98px), (hover: none), (pointer: coarse) {
      html,
      body,
      a,
      button,
      label,
      [role='button'],
      .hover,
      .btn,
      .certificates__content__card,
      iframe,
      input,
      textarea,
      select {
        cursor: auto !important;
      }

      a,
      button,
      label,
      [role='button'],
      .hover,
      .btn,
      .certificates__content__card {
        cursor: pointer !important;
      }

      .custom-cursor,
      .custom-cursor-dot {
        display: none !important;
      }
    }

    html,
    body {
      cursor: none !important;
    }

    a,
    button,
    label,
    [role='button'],
    .hover,
    .btn,
    .certificates__content__card {
      cursor: pointer !important;
    }

    .custom-cursor,
    .custom-cursor-dot {
      position: fixed;
      top: 0;
      left: 0;
      pointer-events: none;
      z-index: 99999;
      opacity: 0;
      transform: translate3d(-50%, -50%, 0);
      transition:
        opacity 180ms ease,
        width 180ms ease,
        height 180ms ease,
        border-color 180ms ease,
        background 180ms ease,
        box-shadow 180ms ease;
      will-change: transform, width, height;
    }

    .custom-cursor {
      width: 36px;
      height: 36px;
      border: 1.5px solid rgba(46, 174, 126, 0.8);
      border-radius: 999px;
      background:
        radial-gradient(circle, rgba(46, 174, 126, 0.18), transparent 58%),
        rgba(255, 255, 255, 0.04);
      box-shadow:
        0 0 18px rgba(46, 174, 126, 0.28),
        inset 0 0 14px rgba(255, 255, 255, 0.12);
      mix-blend-mode: difference;
    }

    .custom-cursor-dot {
      width: 7px;
      height: 7px;
      border-radius: 999px;
      background: #0069d9;
      box-shadow: 0 0 14px rgba(46, 174, 126, 0.9);
    }

    body.cursor-ready .custom-cursor,
    body.cursor-ready .custom-cursor-dot {
      opacity: 1;
    }

    body.cursor-hover .custom-cursor {
      width: 54px;
      height: 54px;
      border-color: rgba(0, 105, 217, 0.92);
      background:
        radial-gradient(circle, rgba(0, 105, 217, 0.24), transparent 62%),
        rgba(255, 255, 255, 0.06);
      box-shadow:
        0 0 24px rgba(0, 105, 217, 0.34),
        inset 0 0 16px rgba(255, 255, 255, 0.16);
    }

    body.cursor-hover .custom-cursor-dot {
      background: #0069d9;
      box-shadow: 0 0 16px rgba(0, 105, 217, 0.9);
    }

    body.cursor-down .custom-cursor {
      width: 28px;
      height: 28px;
      background: rgba(46, 174, 126, 0.22);
    }

    iframe,
    input,
    textarea,
    select {
      cursor: auto !important;
    }
  `;
  document.head.appendChild(style);

  const cursor = document.createElement("div");
  const dot = document.createElement("div");
  cursor.className = "custom-cursor";
  dot.className = "custom-cursor-dot";
  cursor.setAttribute("aria-hidden", "true");
  dot.setAttribute("aria-hidden", "true");
  document.body.append(cursor, dot);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  const interactiveSelector = [
    "a",
    "button",
    "input",
    "textarea",
    "select",
    "label",
    "[role='button']",
    ".hover",
    ".btn",
    ".certificates__content__card",
  ].join(",");

  function render() {
    ringX += (mouseX - ringX) * 0.2;
    ringY += (mouseY - ringY) * 0.2;

    cursor.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;

    requestAnimationFrame(render);
  }

  window.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    document.body.classList.add("cursor-ready");
    document.body.classList.toggle(
      "cursor-hover",
      Boolean(event.target.closest(interactiveSelector)),
    );
  });

  window.addEventListener("mousedown", () => {
    document.body.classList.add("cursor-down");
  });

  window.addEventListener("mouseup", () => {
    document.body.classList.remove("cursor-down");
  });

  window.addEventListener("mouseleave", () => {
    document.body.classList.remove(
      "cursor-ready",
      "cursor-hover",
      "cursor-down",
    );
  });

  window.addEventListener("mouseenter", () => {
    document.body.classList.add("cursor-ready");
  });

  function destroyCursorOnMobile() {
    if (!finePointerQuery.matches || mobileWidthQuery.matches) {
      cursor.remove();
      dot.remove();
      style.remove();
      document.body.classList.remove(
        "cursor-ready",
        "cursor-hover",
        "cursor-down",
      );
    }
  }

  mobileWidthQuery.addEventListener("change", destroyCursorOnMobile);
  finePointerQuery.addEventListener("change", destroyCursorOnMobile);

  render();
})();
