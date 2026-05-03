(function () {
  const articleKey = document.documentElement.dataset.blogKey || "cart-index";
  let currentLang = "en";

  const labels = {
    en: {
      "nav-home": "HOME",
      "nav-about": "ABOUT",
      "nav-projects": "PROJECTS",
      "nav-contact": "CONTACT",
      "nav-blog": 'BLOG <i class="fa fa-angle-down"></i>',
      "blog-back": '<i class="fa fa-arrow-left"></i> Back to portfolio',
      "blog-keypoints": "Key Points",
      "blog-topics": "Topics",
      "txt-46":
        "A Frontend focused Web Developer building the Frontend of Websites and Web Applications that leads to the success of the overall product",
      "txt-47":
        "Address: Pengadegan, South Jakarta City, Special Capital Region Jakarta",
      "txt-copyright": "© Copyright 2025. Made by Indraprasta Dwinanda Fahreza",
      "blog-cart-index": "Cart Quantity Bug",
      "blog-state-id": "State and Stable ID",
      "blog-api-error": "Reading API Errors",
      "blog-responsive": "Responsive UI Notes",
      "blog-dark-mode": "Dark Mode Details",
      "blog-clean-code": "Clean Code Habits",
      "blog-auth": "Authentication Flow",
      "blog-database": "Database Notes",
      "blog-deploy": "Deployment Checklist",
      "blog-debugging": "Debugging Mindset",
    },
    id: {
      "nav-home": "BERANDA",
      "nav-about": "TENTANG",
      "nav-projects": "PROYEK",
      "nav-contact": "KONTAK",
      "nav-blog": 'BLOG <i class="fa fa-angle-down"></i>',
      "blog-back": '<i class="fa fa-arrow-left"></i> Kembali ke portfolio',
      "blog-keypoints": "Inti Catatan",
      "blog-topics": "Topik",
      "txt-46":
        "Seorang Pengembang Web yang berfokus pada Frontend, membangun Frontend Situs Web dan Aplikasi Web yang mengarah pada keberhasilan produk secara keseluruhan",
      "txt-47":
        "Alamat: Pengadegan, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta",
      "txt-copyright":
        "© Hak Cipta 2025. Dibuat oleh Indraprasta Dwinanda Fahreza",
      "blog-cart-index": "Bug Jumlah Keranjang",
      "blog-state-id": "State dan ID Stabil",
      "blog-api-error": "Membaca Error API",
      "blog-responsive": "Catatan UI Responsif",
      "blog-dark-mode": "Detail Dark Mode",
      "blog-clean-code": "Kebiasaan Clean Code",
      "blog-auth": "Alur Autentikasi",
      "blog-database": "Catatan Database",
      "blog-deploy": "Checklist Deployment",
      "blog-debugging": "Pola Pikir Debugging",
    },
  };

  const articles = {
    "cart-index": {
      en: {
        title: "Why Can the Cart Quantity Increase by Itself?",
        category: "Developer Notes",
        summary:
          "A small cart bug taught me why dynamic data should not depend on array indexes.",
        date: "April 22, 2026",
        tag: "JavaScript",
        readTime: "4 min read",
        points: [
          "Array indexes can shift when data changes.",
          "Cart updates should target a stable product ID.",
          "Silent data bugs are more dangerous than visible crashes.",
        ],
        tags: ["Debugging", "JavaScript", "Cart Logic"],
        content: `
          <div class="blog-article__intro"><p>The bug looked small at first. A user clicked product A, but product B sometimes changed instead. It did not crash the page, so it was easy to underestimate.</p><p>The real problem was that the cart logic used array position as the source of truth. That position changed after filtering, removing, or rendering data again.</p></div>
          <h2>The Main Mistake</h2><p>I was updating the cart with an index. It felt natural because arrays are ordered, but real application data is not always stable.</p>
          <div class="blog-code"><span>Problematic update</span><code>cart[index].qty += 1</code></div>
          <h2>The Fix</h2><p>The safer approach is to find the item by a unique identifier. The UI can move around, but the product ID remains the same.</p>
          <div class="blog-code blog-code--success"><span>Stable lookup</span><code>cart.find(item =&gt; item.id === product.id)</code></div>
          <h2>Reflection</h2><p>Debugging is not only about finding the line that fails. It is about understanding the data flow deeply enough to know why that line became dangerous.</p>
        `,
      },
      id: {
        title: "Kenapa Jumlah Keranjang Bisa Nambah Sendiri?",
        category: "Catatan Developer",
        summary:
          "Bug kecil di keranjang ngajarin kenapa data dinamis jangan bergantung pada index array.",
        date: "22 April 2026",
        tag: "JavaScript",
        readTime: "4 menit baca",
        points: [
          "Index array bisa bergeser saat data berubah.",
          "Update keranjang harus memakai ID produk yang stabil.",
          "Bug data diam-diam lebih bahaya daripada crash yang terlihat.",
        ],
        tags: ["Debugging", "JavaScript", "Logika Cart"],
        content: `
          <div class="blog-article__intro"><p>Bug ini awalnya kelihatan kecil. User klik produk A, tapi yang berubah kadang produk B. Halaman tidak crash, jadi masalahnya gampang diremehkan.</p><p>Masalah utamanya ada di logic keranjang yang memakai posisi array sebagai acuan. Posisi itu bisa berubah setelah filtering, hapus data, atau render ulang.</p></div>
          <h2>Kesalahan Utama</h2><p>Saya mengubah data keranjang memakai index. Kelihatannya wajar karena array punya urutan, tapi data aplikasi nyata tidak selalu stabil.</p>
          <div class="blog-code"><span>Update bermasalah</span><code>cart[index].qty += 1</code></div>
          <h2>Solusi</h2><p>Cara yang lebih aman adalah mencari item memakai identifier unik. Tampilan boleh berubah, tapi ID produk tetap sama.</p>
          <div class="blog-code blog-code--success"><span>Pencarian stabil</span><code>cart.find(item =&gt; item.id === product.id)</code></div>
          <h2>Refleksi</h2><p>Debugging bukan cuma menemukan baris yang salah. Debugging berarti memahami alur data sampai kita tahu kenapa baris itu menjadi berbahaya.</p>
        `,
      },
    },
    "state-id": makeArticle(
      "State Should Follow Stable IDs",
      "State UI often breaks when the component stores position instead of identity.",
      "State harus mengikuti ID stabil",
      "UI sering rusak saat component menyimpan posisi, bukan identitas data.",
      "State",
    ),
    "api-error": makeArticle(
      "Reading API Errors Without Panic",
      "A calm checklist for separating server errors, validation errors, and frontend assumptions.",
      "Membaca Error API Tanpa Panik",
      "Checklist sederhana untuk memisahkan error server, validasi, dan asumsi frontend.",
      "API",
    ),
    responsive: makeArticle(
      "Responsive UI Is More Than Media Queries",
      "Good responsive design starts from content, spacing, and predictable component behavior.",
      "UI Responsif Bukan Cuma Media Query",
      "Desain responsif yang baik dimulai dari konten, spacing, dan perilaku komponen yang stabil.",
      "Responsive",
    ),
    "dark-mode": makeArticle(
      "Small Details That Make Dark Mode Feel Better",
      "Dark mode needs contrast, surfaces, and interaction states, not only inverted colors.",
      "Detail Kecil yang Membuat Dark Mode Lebih Nyaman",
      "Dark mode butuh kontras, surface, dan state interaksi, bukan sekadar warna dibalik.",
      "UI",
    ),
    "clean-code": makeArticle(
      "Clean Code Starts From Naming",
      "Clear names reduce comments, shorten debugging time, and make future edits less risky.",
      "Clean Code Dimulai dari Penamaan",
      "Nama yang jelas mengurangi komentar, mempercepat debugging, dan membuat perubahan lebih aman.",
      "Clean Code",
    ),
    auth: makeArticle(
      "Thinking Through an Authentication Flow",
      "Login is not just a form; it is a flow of validation, sessions, errors, and recovery.",
      "Memikirkan Alur Autentikasi",
      "Login bukan cuma form; login adalah alur validasi, session, error, dan recovery.",
      "Auth",
    ),
    database: makeArticle(
      "Database Notes for Web Projects",
      "A small schema decision can affect filtering, reporting, and future features.",
      "Catatan Database untuk Project Web",
      "Keputusan schema kecil bisa memengaruhi filter, laporan, dan fitur berikutnya.",
      "Database",
    ),
    deploy: makeArticle(
      "My Simple Deployment Checklist",
      "Before deploy, I check environment variables, build output, routes, and production data.",
      "Checklist Deployment Sederhana",
      "Sebelum deploy, saya cek environment variable, hasil build, route, dan data production.",
      "Deploy",
    ),
    debugging: makeArticle(
      "Debugging Is a Thinking Habit",
      "The best debugging habit is writing down what changed, what is proven, and what is still a guess.",
      "Debugging Adalah Kebiasaan Berpikir",
      "Kebiasaan debugging terbaik adalah mencatat apa yang berubah, terbukti, dan masih dugaan.",
      "Debugging",
    ),
  };

  function makeArticle(enTitle, enSummary, idTitle, idSummary, tag) {
    return {
      en: {
        title: enTitle,
        category: "Developer Notes",
        summary: enSummary,
        date: "May 4, 2026",
        tag,
        readTime: "3 min read",
        points: [
          "Start by understanding the data flow.",
          "Keep the fix small and easy to verify.",
          "Write notes so the lesson is not lost.",
        ],
        tags: [tag, "Web Development", "Notes"],
        content: `<div class="blog-article__intro"><p>${enSummary}</p><p>This note is part of my learning archive while building portfolio projects, client-like interfaces, and small web systems.</p></div><h2>What I Learned</h2><p>The first lesson is to slow down before changing code. A clear mental model usually saves more time than a rushed patch.</p><h2>How I Handle It</h2><p>I reproduce the issue, inspect the data, then change the smallest piece that explains the behavior. After that, I test the main path and one edge case.</p><div class="blog-code blog-code--success"><span>Working habit</span><code>observe -&gt; isolate -&gt; fix -&gt; verify</code></div><h2>Takeaway</h2><p>Small technical notes become useful when they help the next project move with fewer repeated mistakes.</p>`,
      },
      id: {
        title: idTitle,
        category: "Catatan Developer",
        summary: idSummary,
        date: "4 Mei 2026",
        tag,
        readTime: "3 menit baca",
        points: [
          "Mulai dari memahami alur data.",
          "Buat perbaikan kecil dan mudah dicek.",
          "Catat pelajarannya supaya tidak hilang.",
        ],
        tags: [tag, "Web Development", "Catatan"],
        content: `<div class="blog-article__intro"><p>${idSummary}</p><p>Catatan ini bagian dari arsip belajar saya saat membuat project portfolio, interface seperti client project, dan sistem web kecil.</p></div><h2>Yang Saya Pelajari</h2><p>Pelajaran pertama adalah memperlambat langkah sebelum mengubah kode. Model berpikir yang jelas biasanya lebih menghemat waktu daripada patch yang terburu-buru.</p><h2>Cara Saya Menanganinya</h2><p>Saya reproduce masalahnya, cek data, lalu mengubah bagian terkecil yang menjelaskan perilaku tersebut. Setelah itu saya tes alur utama dan satu edge case.</p><div class="blog-code blog-code--success"><span>Kebiasaan kerja</span><code>amati -&gt; pisahkan -&gt; perbaiki -&gt; verifikasi</code></div><h2>Kesimpulan</h2><p>Catatan teknis kecil jadi berguna saat membantu project berikutnya berjalan dengan lebih sedikit kesalahan berulang.</p>`,
      },
    };
  }

  function renderStaticLabels() {
    document.querySelectorAll("[data-lang]").forEach((element) => {
      const key = element.getAttribute("data-lang");
      if (labels[currentLang][key]) {
        element.innerHTML = labels[currentLang][key];
      }
    });
  }

  function renderArticle() {
    const article = articles[articleKey]?.[currentLang] || articles["cart-index"][currentLang];
    document.title = `${article.title} - Indraprasta Portfolio`;
    document.querySelector('[data-blog-field="title"]').textContent = article.title;
    document.querySelector('[data-blog-field="category"]').textContent = article.category;
    document.querySelector('[data-blog-field="summary"]').textContent = article.summary;
    document.querySelector('[data-blog-field="date"]').textContent = article.date;
    document.querySelector('[data-blog-field="tag"]').textContent = article.tag;
    document.querySelector('[data-blog-field="readTime"]').textContent = article.readTime;
    document.querySelector('[data-blog-field="content"]').innerHTML = article.content;
    document.querySelector('[data-blog-field="points"]').innerHTML = article.points
      .map((point) => `<li>${point}</li>`)
      .join("");
    document.querySelector('[data-blog-field="tags"]').innerHTML = article.tags
      .map((tag) => `<span>${tag}</span>`)
      .join("");
  }

  const menuButton = document.getElementById("show-menu");
  const header = document.querySelector(".head");
  const menuList = document.querySelector(".head__menu__list");
  const modeButton = document.getElementById("modeButton");
  const translateButton = document.getElementById("translateBtn");

  if (menuButton && header && menuList) {
    menuButton.addEventListener("click", () => {
      const isOpen = header.classList.toggle("close-menu");
      document.body.classList.toggle("rm-scroll", isOpen);
      menuList.classList.toggle("animation", !isOpen);
      menuList.classList.toggle("animated", isOpen);
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated");
      }
    });
  });

  document.querySelectorAll(".animation").forEach((element) => {
    observer.observe(element);
  });

  if (modeButton) {
    modeButton.addEventListener("click", () => {
      const icon = modeButton.querySelector("i");
      document.body.classList.toggle("dark-mode");
      icon?.classList.toggle("fa-moon-o");
      icon?.classList.toggle("fa-sun-o");
    });
  }

  if (translateButton) {
    translateButton.addEventListener("click", () => {
      const image = translateButton.querySelector("img");
      image.style.transform = "rotate(360deg)";

      setTimeout(() => {
        currentLang = currentLang === "en" ? "id" : "en";
        image.src =
          currentLang === "id"
            ? "../public/images/icon/english.png"
            : "../public/images/icon/indonesia.png";
        image.alt = currentLang === "id" ? "English" : "Indonesia";
        image.style.transform = "rotate(0deg)";
        renderStaticLabels();
        renderArticle();
      }, 800);
    });
  }

  renderStaticLabels();
  renderArticle();
})();
