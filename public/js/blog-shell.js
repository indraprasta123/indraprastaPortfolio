(function () {
  const shell = document.getElementById("blog-shell");

  if (!shell) {
    return;
  }

  shell.outerHTML = `
    <header class="head">
      <nav class="head__nav">
        <div class="head__logo">
          <a href="../index.html" class="head__logo__link">
            <img class="head__logo__icon" src="../public/images/indra_profile.png" alt="Indraprasta Dwinanda Fahreza" />
          </a>
        </div>
        <div class="head__menu">
          <ul class="head__menu__list animation">
            <li class="head__menu__item"><a href="../index.html#home" class="head__menu__link hover" data-lang="nav-home">HOME</a></li>
            <li class="head__menu__item"><a href="../index.html#p-about" class="head__menu__link hover" data-lang="nav-about">ABOUT</a></li>
            <li class="head__menu__item"><a href="../index.html#p-projects" class="head__menu__link hover" data-lang="nav-projects">PROJECTS</a></li>
            <li class="head__menu__item"><a href="../index.html#p-contact" class="head__menu__link hover" data-lang="nav-contact">CONTACT</a></li>
          </ul>
        </div>
        <div class="head__btn-group btn-group">
          <button class="btn translate-btn" id="translateBtn" type="button"><img src="../public/images/icon/indonesia.png" alt="Indonesia" /></button>
          <button id="modeButton" type="button"><i class="fa fa-moon-o"></i></button>
        </div>
        <div class="head__ham-menu">
          <button id="show-menu" class="head__button" type="button"><span class="head__button__bar"></span><span class="head__button__bar"></span><span class="head__button__bar"></span></button>
        </div>
      </nav>
    </header>
    <main class="blog-page">
      <section class="blog-hero">
        <div class="blog-hero__container animation">
          <a class="blog-hero__back hover" href="../index.html#p-projects" data-lang="blog-back"><i class="fa fa-arrow-left"></i> Back to portfolio</a>
          <p class="blog-hero__eyebrow" data-blog-field="category">Developer Notes</p>
          <h1 data-blog-field="title">Blog</h1>
          <p class="blog-hero__summary" data-blog-field="summary"></p>
          <div class="blog-hero__meta">
            <span><i class="fa fa-calendar"></i> <span data-blog-field="date"></span></span>
            <span><i class="fa fa-code"></i> <span data-blog-field="tag"></span></span>
            <span><i class="fa fa-clock-o"></i> <span data-blog-field="readTime"></span></span>
          </div>
        </div>
      </section>
      <section class="blog-layout">
        <article class="blog-article animation" data-blog-field="content"></article>
        <aside class="blog-sidebar animation">
          <div class="blog-sidebar__box"><h3 data-lang="blog-keypoints">Key Points</h3><ul data-blog-field="points"></ul></div>
          <div class="blog-sidebar__box"><h3 data-lang="blog-topics">Topics</h3><div class="blog-tags" data-blog-field="tags"></div></div>
        </aside>
      </section>
    </main>
    <footer class="footer">
      <div class="footer__container">
        <div class="footer__content">
          <div class="footer__left-side">
            <h3>INDRAPRASTA DWINANDA FAHREZA</h3>
            <div class="footer__left-side__contact">
              <div class="footer__left-side__phone"><i class="fa fa-phone"></i><p>+62 857 4052 9930</p></div>
              <div class="footer__left-side__email"><i class="fa fa-envelope"></i><p>indraprastadwinanda@gmail.com</p></div>
            </div>
            <p data-lang="txt-46">A Frontend focused Web Developer building the Frontend of Websites and Web Applications that leads to the success of the overall product</p>
          </div>
          <div class="footer__right-side">
            <div class="footer__right-side__address"><i class="fa fa-map-marker"></i><p data-lang="txt-47">Address: Pengadegan, South Jakarta City, Special Capital Region Jakarta</p></div>
            <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3966.103649970158!2d106.84591657499064!3d-6.2500711937383455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNsKwMTUnMDAuMyJTIDEwNsKwNTAnNTQuNiJF!5e0!3m2!1sid!2sid!4v1766757277231!5m2!1sid!2sid" width="600" height="450" style="border: 0" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
        <div class="footer__copyright"><p data-lang="txt-copyright">© Copyright 2025. Made by Indraprasta Dwinanda Fahreza</p></div>
      </div>
    </footer>
  `;
})();
