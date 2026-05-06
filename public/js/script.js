//ham-menu
$(document).ready(function () {
  const $head = $(".head");
  const $menuList = $(".head__menu__list");

  const openMenu = () => {
    $("body").addClass("rm-scroll");
    $head.removeClass("closing-menu").addClass("close-menu");
    $menuList.addClass("animation");
    requestAnimationFrame(() => {
      $menuList.addClass("animated");
    });
  };

  const closeMenu = () => {
    if (!$head.hasClass("close-menu") || $head.hasClass("closing-menu")) {
      return;
    }

    $head.addClass("closing-menu");
    $("body").removeClass("rm-scroll");
    $menuList.removeClass("animated");

    setTimeout(() => {
      $head.removeClass("closing-menu close-menu");
      $menuList.removeClass("animation");
    }, 1600);
  };

  $head.show();
  $("#show-menu").click(function () {
    if ($head.hasClass("close-menu")) {
      closeMenu();
      return;
    }

    openMenu();
  });
  $(".head__menu__link").click(function () {
    if ($(this).hasClass("head__dropdown__toggle")) {
      return;
    }

    closeMenu();
  });
  $(".head__menu").on("click", ".head__dropdown__link", function () {
    closeMenu();
  });
  $(".p-home").addClass("p-home--animation");
});

var swiper = new Swiper(".swiper-container.box", {
  pagination: ".swiper-pagination",
  paginationClickable: true,
  effect: "coverflow",
  loop: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflow: {
    rotate: 0,
    stretch: 100,
    depth: 150,
    modifier: 1.2,
    slideShadows: true,
  },
});

//animasi scrool
document.body.classList.add("loading");

const getEstimatedLoadDuration = () => {
  const connection =
    navigator.connection ||
    navigator.mozConnection ||
    navigator.webkitConnection;

  if (!connection) {
    return 1800;
  }

  if (typeof connection.downlink === "number") {
    const downlink = connection.downlink;

    if (downlink >= 10) return 1200;
    if (downlink >= 5) return 1600;
    if (downlink >= 2) return 2200;
    if (downlink >= 1) return 3000;

    return 4200;
  }

  switch (connection.effectiveType) {
    case "slow-2g":
      return 6000;
    case "2g":
      return 4500;
    case "3g":
      return 3000;
    case "4g":
      return 1800;
    default:
      return 1800;
  }
};

const circle = document.querySelector(".progress");
const text = document.getElementById("percent");
const loading = document.getElementById("loading");
let percent = 0;

const radius = 70;
const circumference = 2 * Math.PI * radius;

if (circle) {
  circle.style.strokeDasharray = circumference;
}

const updateLoadingUI = () => {
  if (!circle || !text) {
    return;
  }

  const offset = circumference - (percent / 100) * circumference;
  circle.style.strokeDashoffset = offset;
  text.textContent = percent + "%";
};

const maxBeforeLoad = 92;
const softCap = 98;
const extraDuration = 6000;
const estimatedDuration = getEstimatedLoadDuration();
const startTime = performance.now();

const loadingInterval = setInterval(() => {
  const elapsed = performance.now() - startTime;
  const ratio = Math.min(elapsed / estimatedDuration, 1);
  const extraRatio = Math.min(
    Math.max((elapsed - estimatedDuration) / extraDuration, 0),
    1,
  );
  const target =
    ratio < 1
      ? Math.floor(ratio * maxBeforeLoad)
      : Math.floor(maxBeforeLoad + extraRatio * (softCap - maxBeforeLoad));

  if (target > percent) {
    percent = target;
    updateLoadingUI();
  }
}, 50);

let hasFinishedLoading = false;

const finishLoading = () => {
  if (hasFinishedLoading) {
    return;
  }

  hasFinishedLoading = true;
  clearInterval(loadingInterval);

  const finishInterval = setInterval(() => {
    percent = Math.min(percent + 3, 100);
    updateLoadingUI();

    if (percent >= 100) {
      clearInterval(finishInterval);

      if (loading) {
        loading.classList.add("hide");
      }

      document.body.classList.remove("loading");

      setTimeout(() => {
        if (loading) {
          loading.style.display = "none";
        }

        // 🔥 BARU AKTIFKAN ANIMASI SETELAH LOADING HILANG
        initScrollAnimation();
      }, 600);
    }
  }, 16);
};

const maxWait = Math.max(estimatedDuration + extraDuration + 1500, 8000);
const fallbackTimer = setTimeout(finishLoading, maxWait);

window.addEventListener("load", () => {
  clearTimeout(fallbackTimer);
  finishLoading();
});

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    if (!hasFinishedLoading) {
      finishLoading();
    }
  }, 1500);
});

if (document.readyState === "complete") {
  clearTimeout(fallbackTimer);
  finishLoading();
}

function initScrollAnimation() {
  const elementsHome = document.querySelectorAll(".animation");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated");
      }
    });
  });

  elementsHome.forEach((el) => observer.observe(el));
}

function startAnimationObserver() {
  const elementsHome = document.querySelectorAll(".animation");

  const options = {
    root: null,
  };

  const callbacks = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated");
      }
    });
  };

  const observerHome = new IntersectionObserver(callbacks, options);

  elementsHome.forEach((item) => {
    observerHome.observe(item);
  });
}
// const elementsHome = document.querySelectorAll(".animation");

// let options = {
//   root: null,
// };
// const callbacks = (entries) => {
//   entries.forEach((entry) => {
//     if (entry.isIntersecting) {
//       entry.target.classList.add("animated");
//     }
//   });
// };

// const observerHome = new IntersectionObserver(callbacks, options);
// elementsHome.forEach((item) => {
//   observerHome.observe(item);
// });

//pdf
const lihatBtn = document.getElementById("lihatBtn");
const pdfContainer = document.getElementById("pdfContainer");

lihatBtn.addEventListener("click", () => {
  pdfContainer.classList.toggle("hidden");

  if (!pdfContainer.classList.contains("hidden")) {
    lihatBtn.innerHTML = '<i class="fa fa-times"></i> CV';
  } else {
    lihatBtn.innerHTML = '<i class="fa fa-eye"></i> CV';
  }
});

// === ELEMENT ===
const translateBtn = document.getElementById("translateBtn");
const modeBtn = document.getElementById("modeBtn");
let currentLang = "en"; // Default bahasa Inggris

// === DATA TERJEMAHAN ===
const translations = {
  id: {
    logo: "Indra Portfolio",
    "nav-home": "BERANDA",
    "nav-about": "TENTANG",
    "nav-career": "KARIR",
    "nav-projects": "PROYEK",
    "nav-contact": "KONTAK",
    "nav-blog": 'BLOG <i class="fa fa-angle-down"></i>',
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
    "home-info":
      "Seorang profesional di bidang administrasi dan informatika dengan pengalaman dalam manajemen data dan pengembangan situs web.",
    "home-btn": "HUBUNGI SAYA",
    "desc-about-title":
      "Di sini Anda akan menemukan informasi lebih lanjut tentang saya, apa yang saya lakukan, dan keterampilan saya saat ini, terutama dalam pemrograman dan administrasi.",
    "about-title": "TENTANG SAYA",
    "title-certificates": "SERTIFIKAT",
    "txt-75":
      "Kumpulan sertifikasi yang mencerminkan pembelajaran dan pengembangan saya yang berkelanjutan dalam pengembangan web dan IT.",
    "cert-view": "Lihat Sertifikat",
    "cert-hacktiv8-title":
      "Sertifikat Kelulusan — Fullstack JavaScript Immersive",
    "cert-hacktiv8-date": "Mei 2026",
    "cert-transcript-title": "Transkrip Akademik — Nilai Akhir 86% A",
    "cert-transcript-date": "Mei 2026",
    "cert-css-title": "Sertifikat CSS",
    "cert-css-date": "April 2026",
    "cert-js-title": "JavaScript Basic",
    "cert-js-date": "April 2026",
    "cert-problem-title": "Problem Solving Basic",
    "cert-problem-date": "April 2026",
    "cert-react-title": "React Basic",
    "cert-react-date": "April 2026",
    "cert-intern-title": "Software Engineer Intern",
    "cert-intern-date": "April 2026",
    "cert-mongo-title":
      "MongoDB Schema Design Patterns and Anti-patterns Skill Badge",
    "cert-mongo-date": "April 2026",
    "cert-linux-title": "Linux Fundamentals",
    "cert-linux-date": "June 2023",
    "cert-network-title": "Network Fundamentals",
    "cert-network-date": "June 2023",
    "cert-pnetlab-title": "Network Simulation with PNETLab",
    "cert-pnetlab-date": "June 2023",
    "cert-virtual-title": "Virtual Machine Fundamentals",
    "cert-virtual-date": "June 2023",
    "open-cv": "BUKA",
    "unduh-cv": "UNDUH",
    "txt-1": "Kenali saya!",

    "txt-2":
      "Saya adalah lulusan Diploma Teknik Informatika dari <strong>Politeknik Sawunggalih Aji Purworejo (2025)</strong>, serta lulusan bootcamp Fullstack Web Development dari <strong>Hacktiv8 (Mei 2026)</strong>.",

    "txt-6":
      "Saya berfokus pada pengembangan aplikasi web yang modern, responsif, dan mudah digunakan, dengan pengalaman membangun berbagai proyek seperti website bisnis, sistem restoran, dan portfolio pribadi.",

    "txt-9":
      "Saya terbiasa dalam problem solving, mengelola data dinamis, serta membangun solusi berbasis web yang efisien dan terstruktur. Saya juga terus meningkatkan kemampuan dengan mempelajari teknologi baru dan mengerjakan proyek nyata.",

    "txt-11":
      "Saya memiliki minat besar dalam mengembangkan produk digital yang scalable dan berdampak, serta terbuka terhadap peluang kerja untuk berkembang sebagai developer dan berkontribusi dalam proyek nyata.",
    "txt-14": "Keterampilan Saya",
    "txt-15": "Administrasi",
    "btn-contact": "KONTAK",
    "career-title": "KARIR",
    "txt-16": "Pengalaman kerja saya",
    "txt-17": "Pengembang Web Muda",
    "txt-18": "2024 hingga Saat ini",
    "txt-19":
      "Saya seorang Pengembang Web Junior yang ahli dalam mengembangkan situs web menggunakan HTML, CSS, SCSS, Bootstrap, JavaScript, PHP, CodeIgniter, Laravel, dan MySQL. Saya juga familiar dengan GitHub untuk kolaborasi dan manajemen versi kode. Fokus saya adalah menciptakan antarmuka web yang responsif, performa optimal, dan struktur kode yang bersih dan efisien.",
    "txt-20": "SELENGKAPNYA",
    "txt-21": "Adminitrasi",
    "txt-22": "2020 sampai 2023",
    "txt-23":
      "Saya berpengalaman sebagai Staf Administrasi di CV Wibawa Putra Utamajaya. Dalam posisi ini, saya bertanggung jawab mengelola pengiriman, mencatat dan mengelola keuangan perusahaan, serta memantau inventaris. Saya terbiasa bekerja dengan presisi dan tanggung jawab yang tinggi untuk memastikan kelancaran operasional perusahaan.",
    "txt-24": "SELENGKAPNYA",
    "txt-25": "Dukungan IT",
    "txt-26": "2023 sampai 2024",
    "txt-27":
      "Menangani instalasi, konfigurasi, dan pemeliharaan sistem komputer, jaringan, serta membantu pengguna dalam menyelesaikan masalah teknis secara efisien di Politeknik Sawunggalih Aji Kutoarjo.",
    "txt-28": "SELENGKAPNYA",
    "projects-title": "PROYEK",
    "cta-study": "STUDI KASUS",
    "project-read-more": "SELENGKAPNYA",
    "project-read-less": "SEMBUNYIKAN",
    "project-fayda-title": "FAYDA STORE",
    "project-fayda-desc":
      "Aplikasi e-commerce full-stack untuk produk makanan dan minuman dengan pencarian berbasis AI berupa teks dan gambar, manajemen keranjang, dan berbagai metode pembayaran. Fiturnya mencakup perhitungan ongkir real-time, autentikasi aman, dan notifikasi otomatis. Berperan sebagai Fullstack Developer dalam pengembangan end-to-end.",
    "project-ternaqku-title": "TERNAQKU",
    "project-ternaqku-desc":
      "Sistem manajemen peternakan berbasis web yang membantu peternak memantau dan mengelola ternak secara efisien. Fiturnya mencakup pencatatan data ternak seperti umur, ras, status kesehatan, pelacakan lokasi menggunakan geolocation, dan rekomendasi pakan berbasis AI berdasarkan kondisi cuaca. Berperan sebagai Fullstack Developer untuk pengembangan sisi client dan server.",
    "project-lazandra-title": "LAZANDRA",
    "project-lazandra-desc":
      "Aplikasi e-commerce full-stack dengan fitur penelusuran produk, pencarian, filter, wishlist, dan halaman detail produk. Dibuat dengan antarmuka responsif dan dioptimalkan untuk pengalaman pengguna yang nyaman. Berperan sebagai Fullstack Developer dalam pengembangan frontend dan backend.",
    "txt-29":
      "Di sini Anda akan menemukan beberapa proyek pribadi dan klien yang telah saya buat, masing-masing berisi studi kasusnya sendiri.",
    "txt-31": "BKK KARANGJATI",
    "txt-31":
      "Saya membuat website untuk BKK Karangjati, sebuah bengkel las yang bergerak di bidang pembuatan alat-alat konstruksi, dengan memanfaatkan teknologi frontend yang saya kuasai.",
    "txt-32": "RUMAH SAKIT UMUM AMBON",
    "txt-33":
      "Sistem ini merupakan web absensi karyawan Rumah Sakit Umum Ambon yang dilengkapi dengan verifikasi wajah dan pelacakan lokasi Google Map, dirancang untuk meningkatkan efisiensi dan keakuratan data kehadiran.",
    "txt-34": "DOKTER HEWAN",
    "desc-veterinary":
      "Website ini bertujuan untuk mempromosikan berbagai produk paket pernikahan milik Gambar Air. Proyek ini dikembangkan menggunakan keahlian frontend dengan tampilan yang elegan, responsif, dan mudah diakses oleh calon pelanggan.",
    "txt-35": "GAMBAR AIR",
    "txt-36":
      "Website ini bertujuan untuk mempromosikan berbagai produk paket pernikahan milik Water Picture. Proyek ini dikembangkan menggunakan keahlian frontend dengan tampilan yang elegan, responsif, dan mudah diakses oleh calon pelanggan.",
    "txt-37": "PORTFOLIO TEMPLATE",
    "txt-38":
      "Website ini merupakan hasil percobaan saya dalam meniru sebuah template website portfolio. Pengembangannya dilakukan menggunakan HTML, CSS, SCSS, dan JavaScript untuk mempelajari struktur dan gaya desain modern.",
    "txt-41": "MI IMAM PURO SUREN",
    "txt-42":
      "Website sekolah ini menyediakan berbagai informasi mengenai struktur organisasi MI Imam Puro Suren, mulai dari jajaran pimpinan hingga staf pendukung, sehingga memudahkan pengunjung dalam mengenal profil sekolah.",
    "txt-43": "RM BERSAMA",
    "txt-44":
      "Website ini dibuat untuk melayani pemesanan online produk olahan kambing dari RM Bersama, dengan tampilan informatif dan sistem terintegrasi berupa dashboard admin untuk mengelola pesanan dan dashboard kurir untuk memantau pengiriman.",
    "contact-title": "KONTAK",
    "txt-45":
      "Silakan hubungi saya dengan mengisi formulir di bawah ini dan saya akan menghubungi Anda sesegera mungkin.",
    "name-label": "Nama",
    "email-label": "Email",
    "message-label": "Pesan",
    "name-placeholder": "Masukkan Nama",
    "email-placeholder": "Masukkan Email",
    "message-placeholder": "Masukkan Pesan",
    "txt-46":
      "Seorang Pengembang Web yang berfokus pada Frontend, membangun Frontend Situs Web dan Aplikasi Web yang mengarah pada keberhasilan produk secara keseluruhan",
    "txt-47":
      "Alamat: Pengadegan, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta",
    "txt-copyright":
      "© Hak Cipta 2025. Dibuat oleh Indraprasta Dwinanda Fahreza",
    "administration.": "ADMINISTRASI",
    "accounting.": "AKUTANSI",
    "teknikal/software.": "TEKNIKAL/PERANGKAT LUNAK",
    "skill-network": "JARINGAN",
    "skill-operating": "OPERASI SISTEM",
    "skill-software-tools": "PERANGKAT LUNAK DAN ALAT",
    "other-s": "LAINNYA",
    "skill-admin": "Administrasi",
    "team-work": "Kerja Tim",
    "problem-solving": "Penyelesaian Masalah",
  },
  en: {
    logo: "Indra Portfolio",
    "nav-home": "HOME",
    "nav-about": "ABOUT",
    "nav-career": "CAREER",
    "nav-projects": "PROJECTS",
    "nav-contact": "CONTACT",
    "nav-blog": 'BLOG <i class="fa fa-angle-down"></i>',
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
    "home-info":
      "A professional in administration and informatics with experience in data management and website development.",
    "home-btn": "CONTACT ME",
    "desc-about-title":
      "Here you will find more information about me, what I do, and my current skills, especially in programming and administration.",
    "about-title": "ABOUT ME",
    "title-certificates": "CERTIFICATES",
    "txt-75":
      "A collection of certifications that reflect my continuous learning and development in web development and IT.",
    "cert-view": "View Certificate",
    "cert-hacktiv8-title":
      "Certificate of Graduation — Fullstack JavaScript Immersive",
    "cert-hacktiv8-date": "May 2026",
    "cert-transcript-title": "Academic Transcript — Final Grade 86% A",
    "cert-transcript-date": "May 2026",
    "cert-css-title": "CSS Certificate",
    "cert-css-date": "April 2026",
    "cert-js-title": "JavaScript Basic",
    "cert-js-date": "April 2026",
    "cert-problem-title": "Problem Solving Basic",
    "cert-problem-date": "April 2026",
    "cert-react-title": "React Basic",
    "cert-react-date": "April 2026",
    "cert-intern-title": "Software Engineer Intern",
    "cert-intern-date": "April 2026",
    "cert-mongo-title":
      "MongoDB Schema Design Patterns and Anti-patterns Skill Badge",
    "cert-mongo-date": "April 2026",
    "cert-linux-title": "Linux Fundamentals",
    "cert-linux-date": "June 2023",
    "cert-network-title": "Network Fundamentals",
    "cert-network-date": "June 2023",
    "cert-pnetlab-title": "Network Simulation with PNETLab",
    "cert-pnetlab-date": "June 2023",
    "cert-virtual-title": "Virtual Machine Fundamentals",
    "cert-virtual-date": "June 2023",
    "open-cv": "OPEN",
    "unduh-cv": "DOWNLOAD",
    "txt-1": "Get to know me!",

    "txt-2":
      "I am a graduate of Diploma in Informatics Engineering from <strong>Politeknik Sawunggalih Aji Purworejo (2025)</strong>, and a Fullstack Web Development bootcamp graduate from <strong>Hacktiv8 (May 2026)</strong>.",

    "txt-6":
      "I focus on building modern, responsive, and user-friendly web applications, with experience developing projects such as business websites, restaurant systems, and personal portfolios.",

    "txt-9":
      "I am familiar with problem-solving, working with dynamic data, and creating efficient and well-structured web-based solutions. I continuously improve my skills by learning new technologies and building real-world projects.",

    "txt-11":
      "I am passionate about creating scalable and impactful digital products, and I am open to opportunities where I can grow as a developer and contribute to meaningful projects.",
    "txt-14": "My Skill",
    "txt-15": "Administration",
    "btn-contact": "CONTACT",
    "career-title": "CAREER",
    "txt-16": "My work experience",
    "txt-17": "Junior Web Developer",
    "txt-18": "2024 to Current",
    "txt-19":
      "I am a Junior Web Developer skilled in developing websites using HTML, CSS, SCSS, Bootstrap, JavaScript, PHP, CodeIgniter, Laravel, and MySQL. I am also familiar with using GitHub for collaboration and code version management. I focus on creating responsive web interfaces, optimal performance, and a clean and efficient code structure.",
    "txt-20": "READ MORE",
    "txt-21": "Administration",
    "txt-22": "2020 to 2023",
    "txt-23":
      "I have experience as an Administrative Staff at CV Wibawa Putra Utamajaya. In this position, I was responsible for managing shipments, recording and managing the company's finances, and monitoring inventory. I am accustomed to working with precision and a high level of responsibility to ensure the smooth operation of the company.",
    "txt-24": "READ MORE",
    "txt-25": "IT Support",
    "txt-26": "2023 to 2024",
    "txt-27":
      "Handle the installation, configuration, and maintenance of computer systems, networks, and assist users in solving technical problems efficiently at the Sawunggalih Aji Kutoarjo Polytechnic.",
    "txt-28": "READ MORE",
    "projects-title": "PROJECTS",
    "cta-study": "CASE STUDY",
    "project-read-more": "READ MORE",
    "project-read-less": "SHOW LESS",
    "project-fayda-title": "FAYDA STORE",
    "project-fayda-desc":
      "A full-stack e-commerce web application for food and beverage products with AI-powered search for text and images, cart management, and multiple payment methods. Features include real-time shipping cost calculation, secure authentication, and automated notifications. Acted as a Fullstack Developer, handling end-to-end development.",
    "project-ternaqku-title": "TERNAQKU",
    "project-ternaqku-desc":
      "A web-based farm management system designed to help farmers monitor and manage livestock efficiently. Features include livestock data tracking such as age, breed, health status, location tracking using geolocation, and AI-based feed recommendations based on weather conditions. Acted as a Fullstack Developer, developing both client-side and server-side functionalities.",
    "project-lazandra-title": "LAZANDRA",
    "project-lazandra-desc":
      "A full-stack e-commerce web application featuring product browsing, search, filtering, wishlist, and detailed product views. Designed with a responsive user interface and optimized for seamless user experience. Acted as a Fullstack Developer, handling both frontend and backend development.",
    "txt-29":
      "Here you will find some personal and client projects I have created, each containing its own case study.",
    "txt-30": "BKK KARANGJATI",
    "txt-31":
      "I created a website for BKK Karangjati, a welding workshop specializing in the manufacture of construction equipment, using frontend technology that I have mastered.",
    "txt-32": "AMBON GENERAL HOSPITAL",
    "txt-33":
      "This system is an employee attendance website for Ambon General Hospital which is equipped with facial verification and Google Map location tracking, designed to increase the efficiency and accuracy of attendance data.",
    "txt-34": "VETERINARY",
    "desc-veterinary":
      "This website serves as an animal disease information platform aimed at veterinarians. Built with front-end expertise, the interface is modern, interactive, and easy to understand.",
    "txt-35": "WATER PICTURE",
    "txt-36":
      "This website aims to promote Water Picture's various wedding packages. The project was developed using front-end expertise, creating an elegant, responsive, and accessible design for potential customers.",
    "txt-37": "PORTFOLIO TEMPLATE",
    "txt-38":
      "This website is the result of my experiment in imitating a portfolio website template. It was developed using HTML, CSS, SCSS, and JavaScript to explore modern design structures and styles.",
    "txt-41": "MI IMAM PURO SUREN",
    "txt-42":
      "This school website provides various information regarding the organizational structure of MI Imam Puro Suren, starting from the leadership to the support staff, making it easier for visitors to get to know the school profile.",
    "txt-43": "RM BERSAMA",
    "txt-44":
      "This website was created to serve online orders for processed goat products from RM Bersama, with an informative display and an integrated system in the form of an admin dashboard to manage orders and a courier dashboard to monitor deliveries.",
    "contact-title": "CONTACT",
    "txt-45":
      "Feel free to Contact me by submitting the form below and I will get back to you as soon as possible",
    "name-label": "Name",
    "email-label": "Email",
    "message-label": "Message",
    "name-placeholder": "Enter Your Name",
    "email-placeholder": "Enter Your Email",
    "message-placeholder": "Enter Your Message",
    "txt-46":
      "A Frontend focused Web Developer building the Frontend of Websites and Web Applications that leads to the success of the overall product",
    "txt-47":
      "Address: Pengadegan, South Jakarta City, Special Capital Region Jakarta",
    "txt-copyright": "© Copyright 2025. Made by Indraprasta Dwinanda Fahreza",
    "administration.": "ADMINISTRATION",
    "accounting.": "ACCOUNTING",
    "teknikal/software.": "TECHNICAL/SOFTWARE",
    "skill-network": "NETWORK",
    "skill-operating": "OPERATING SYSTEM",
    "skill-software-tools": "SOFTWARE AND TOOLS",
    "other-s": "OTHER",
    "skill-admin": "Administration",
    "team-work": "Team Work",
    "problem-solving": "Problem Solving",
  },
};

// === FUNGSI GANTI BAHASA ===
translateBtn.addEventListener("click", () => {
  // Tambahkan animasi rotasi
  const img = translateBtn.querySelector("img");
  img.style.transform = "rotate(360deg)";

  // Tunggu sampai animasi selesai sebelum mengganti bendera
  setTimeout(() => {
    currentLang = currentLang === "id" ? "en" : "id";

    img.src =
      currentLang === "id"
        ? "./public/images/icon/english.png"
        : "./public/images/icon/indonesia.png";
    img.alt = currentLang === "id" ? "English" : "Indonesia";

    // Kembalikan rotasi ke posisi awal
    img.style.transform = "rotate(0deg)";

    // Update placeholder input & textarea
    document.querySelectorAll("[data-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-placeholder");
      if (translations[currentLang][key]) {
        el.placeholder = translations[currentLang][key];
      }
    });

    // Ganti teks sesuai bahasa
    document.querySelectorAll("[data-lang]").forEach((el) => {
      const key = el.getAttribute("data-lang");
      if (translations[currentLang][key]) {
        el.innerHTML = translations[currentLang][key];
      }
    });
  }, 800); // sesuai durasi animasi di CSS
});

const modeButton = document.getElementById("modeButton");
const body = document.body;
// const label = document.querySelector(".mode-label");

modeButton.onclick = function () {
  const isDark = body.classList.contains("dark-mode");
  const icon = modeButton.querySelector("i");

  if (isDark) {
    body.classList.remove("dark-mode");
    icon.classList.remove("fa-sun-o");
    icon.classList.add("fa-moon-o");
    // label.textContent = "Dark Mode";
  } else {
    body.classList.add("dark-mode");
    icon.classList.remove("fa-moon-o");
    icon.classList.add("fa-sun-o");
    // label.textContent = "Light Mode";
  }
};

//Kirim pesan ke whatsapp

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const button = document.getElementById("submitBtn");

function checkForm() {
  if (
    nameInput.value.trim() !== "" &&
    emailInput.value.trim() !== "" &&
    messageInput.value.trim() !== ""
  ) {
    button.disabled = false;
    button.classList.add("active");
  } else {
    button.disabled = true;
    button.classList.remove("active");
  }
}

nameInput.addEventListener("input", checkForm);
emailInput.addEventListener("input", checkForm);
messageInput.addEventListener("input", checkForm);

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const phone = "6285740529930";

  const text =
    "Halo, saya ingin menghubungi Anda.%0A%0A" +
    "Nama: " +
    nameInput.value +
    "%0A" +
    "Email: " +
    emailInput.value +
    "%0A" +
    "Pesan: " +
    messageInput.value;

  const url = "https://api.whatsapp.com/send?phone=" + phone + "&text=" + text;

  window.location.href = url;
});

//caraousel projects
$(".projects__content__slider1").slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  adaptiveHeight: false,
  dots: true,
});

//caraousel with slick dots responsive mobile
$(".projects__content__slider2").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: true,
});

// Certificate modal handlers (used by index.html)
function openPDF(pdfUrl) {
  const modal = document.getElementById("modal");
  const viewer = document.getElementById("pdfViewer");

  if (!modal || !viewer) {
    return;
  }

  modal.style.display = "flex";
  viewer.src = pdfUrl;
}

function closeModal() {
  const modal = document.getElementById("modal");
  const viewer = document.getElementById("pdfViewer");

  if (!modal || !viewer) {
    return;
  }

  modal.style.display = "none";
  viewer.src = "";
}
