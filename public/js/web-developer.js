//ham-menu
$(document).ready(function () {
  $(".head").show();
  $("#show-menu").click(function () {
    if ($(".head").hasClass("close-menu")) {
      $(".head").removeClass("close-menu");
      $("body").removeClass("rm-scroll");
      $(".head__menu__list").addClass("animation");
    } else {
      $("body").addClass("rm-scroll");
      $(".head").addClass("close-menu");
      $(".head__menu__list").removeClass("animation");
      $(".head__menu__list").removeClass("animated");
    }
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

window.addEventListener("load", () => {
  let percent = 0;
  const circle = document.querySelector(".progress");
  const text = document.getElementById("percent");
  const loading = document.getElementById("loading");

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  circle.style.strokeDasharray = circumference;

  const interval = setInterval(() => {
    percent++;
    const offset = circumference - (percent / 100) * circumference;
    circle.style.strokeDashoffset = offset;
    text.textContent = percent + "%";

    if (percent >= 100) {
      clearInterval(interval);

      loading.classList.add("hide");
      document.body.classList.remove("loading");

      setTimeout(() => {
        loading.style.display = "none";

        initScrollAnimation();
      }, 600);
    }
  }, 25);
});

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

//caraousel skills
$(".skills__content__slider1, .projects__content__slider1").slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  dots: true,
});

$(".projects__content__slider2").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: true,
});

$(".skills__content__slider2").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: true,
});

//cursor
const custom_cursor = document.getElementById("cursor");
const pointer = document.getElementById("pointer");

const animateCursor = (event, interacting, interactable) => {
  let cursorX = `calc(${event.clientX}px - 1.125rem)`,
    cursorY = `calc(${event.clientY}px - 1.125rem)`;

  let pointerX = `calc(${event.clientX}px - 0.25rem)`,
    pointerY = `calc(${event.clientY}px - 0.25rem)`;

  pointer.style.transform = `translate(${pointerX}, ${pointerY})`;

  const dimensions = interacting ? interactable.getBoundingClientRect() : null;
  const radius = interacting ? "0px" : "50%";

  if (interacting) {
    cursorX = dimensions.x - 2 + "px";
    cursorY = dimensions.y - 2 + "px";
  }

  const cursor_keyframes = {
    transform: `translate(${cursorX}, ${cursorY})`,
    width: interacting ? `${dimensions.width}px` : "2rem",
    height: interacting ? `${dimensions.height}px` : "2rem",
    borderRadius: radius,
  };

  custom_cursor.animate(cursor_keyframes, {
    duration: 400,
    fill: "forwards",
  });
};

window.onmousemove = (event) => {
  const interactable = event.target.closest(".hover"),
    interacting = interactable !== null;

  animateCursor(event, interacting, interactable);
};

window.onmousedown = (event) => {
  cursor.style.backgroundColor = "transparent";
};

window.onmouseup = (event) => {
  cursor.style.backgroundColor = "#F5F74900";
};


const translateBtn = document.getElementById("translateBtn");
const modeBtn = document.getElementById("modeBtn");
let currentLang = "en"; 


const translations = {
  id: {
    logo: "Indra Portfolio",
    "nav-home": "BERANDA",
    "nav-about": "TENTANG",
    "nav-career": "KARIR",
    "nav-projects": "PROYEK",
    "nav-contact": "KONTAK",
    "home-info":
      "Seorang profesional di bidang administrasi dan informatika dengan pengalaman dalam manajemen data dan pengembangan situs web.",
    "home-btn": "HUBUNGI SAYA",
    "desc-about-title":
      "Di sini Anda akan menemukan informasi lebih lanjut tentang saya, apa yang saya lakukan, dan keterampilan saya saat ini, terutama dalam pemrograman dan administrasi.",
    "about-title": "TENTANG SAYA",
    "open-cv": "BUKA",
    "unduh-cv": "UNDUH",
    "txt-1": "Kenali saya!",
    "txt-2":
      "Saya lulusan Diploma Teknik Informatika dari <strong>Politeknik Sawunggalih Aji Purworejo (2025)</strong>, dengan pengalaman lebih dari tiga tahun sebagai <strong>Staf Administrasi</strong> di <strong>CV Wibawa Putra Utamajaya</strong>.",
    "txt-6":
      "Selama bekerja, saya bertanggung jawab dalam pengelolaan pengiriman barang, keuangan perusahaan, dan inventaris secara sistematis dan efisien. Selain memiliki kemampuan <strong>administratif</strong> yang kuat, saya juga memiliki keahlian teknis dalam <strong>pemrograman aplikasi web</strong>, termasuk penguasaan HTML, CSS, SCSS, JavaScript, dan PHP.",
    "txt-9":
      "Saya telah mengembangkan beberapa <strong>proyek web</strong>, termasuk situs sekolah, situs pribadi, situs bisnis, dan aplikasi restoran berbasis web, yang memperkuat kemampuan saya dalam merancang dan mengelola sistem berbasis web secara profesional.",
    "txt-11":
      "Saya terbuka untuk <strong>kesempatan kerja</strong> di mana saya dapat berkontribusi, belajar, dan berkembang. Jika Anda memiliki peluang menarik yang sesuai dengan keterampilan dan pengalaman saya, jangan ragu untuk <strong>menghubungi</strong> saya.",
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
    "nav-skills": "SKILL",
    "nav-projects": "PROYEK",
    "nav-certificates": "SERTIFIKAT",
    "txt-48":
      "Berikut beberapa keterampilan yang saya miliki sebagai Junior Web Developer untuk membangun situs web yang fungsional dan menarik.",
    "txt-49":
      "Bahasa markup dasar untuk membangun struktur dan konten halaman website secara terorganisir.",
    "txt-50":
      "Digunakan untuk mengatur tampilan visual website seperti warna, layout, dan responsivitas agar lebih menarik.",
    "txt-51":
      "Pengembangan dari CSS yang memungkinkan penggunaan variabel, nesting, dan struktur kode yang lebih rapi serta mudah dikelola.",
    "txt-52":
      "Framework CSS yang membantu mempercepat pembuatan tampilan website yang responsif dan konsisten di berbagai perangkat.",
    "txt-53":
      "Bahasa pemrograman yang membuat website menjadi interaktif, dinamis, dan responsif terhadap aksi pengguna.",
    "txt-54":
      "Bahasa pemrograman sisi server yang digunakan untuk mengelola logika aplikasi, proses data, dan koneksi ke database.",
    "txt-55":
      "Framework PHP yang ringan dan cepat, cocok untuk membangun aplikasi web dengan struktur yang sederhana dan efisien.",
    "txt-codeigniter": "PENYALA KODE",
    "txt-56":
      "Framework PHP modern dengan fitur lengkap seperti routing, ORM, dan keamanan untuk pengembangan aplikasi berskala besar.",
    "txt-57":
      "Sistem manajemen database relasional untuk menyimpan, mengelola, dan mengolah data aplikasi secara terstruktur.",
    "txt-58":
      "Platform kolaborasi untuk menyimpan, mengelola versi kode, serta memudahkan kerja tim dalam pengembangan software.",
    "txt-71":
      "Beberapa keterampilan IT Support yang saya miliki dan terus saya kembangkan melalui pembelajaran dan praktik.",
    "skill-network": "JARINGAN",
    "txt-72":
      "Memiliki pemahaman dasar dalam konfigurasi jaringan LAN dan Wi-Fi, pengaturan IP Address (DHCP dan Static IP), serta melakukan troubleshooting jaringan pada tingkat dasar.",
    "skill-operating": "OPERASI SISTEM",
    "txt-73":
      "Mampu melakukan instalasi dan konfigurasi sistem operasi Windows, memahami pengoperasian dasar macOS dan Linux, serta melakukan troubleshooting dan perawatan sistem.",
    "skill-software-tools": "PERANGKAT LUNAK DAN ALAT",
    "txt-74":
      "Mampu melakukan instalasi dan pembaruan perangkat lunak, memberikan dukungan penggunaan Microsoft Office, serta melakukan bantuan jarak jauh menggunakan tools seperti AnyDesk dan TeamViewer.",
    "title-certificates": "SERTIFIKAT",
    "txt-75":
      "Sertifikat Dukungan TI yang mencerminkan keterampilan serta pengalaman pembelajaran saya di Aguna Course.",
    "title-certificates": "SERTIFIKAT",
    "txt-75":
      "Sertifikat Dukungan TI yang mencerminkan keterampilan dan pengalaman belajar saya di Kursus Aguna.",
    "txt-linux": "Dasar Linux",
    "txt-network": "Dasar Jaringan",
    "txt-pnetlab": "Simulasi Jaringan dengan PNETLab",
    "txt-virtual": "Dasar-Dasar Mesin Virtual",
    "txt-copyright":
      "© Hak Cipta 2025. Dibuat oleh Indraprasta Dwinanda Fahreza",
  },
  en: {
    logo: "Indra Portfolio",
    "nav-home": "HOME",
    "nav-about": "ABOUT",
    "nav-career": "CAREER",
    "nav-projects": "PROJECTS",
    "nav-contact": "CONTACT",
    "home-info":
      "A professional in administration and informatics with experience in data management and website development.",
    "home-btn": "CONTACT ME",
    "desc-about-title":
      "Here you will find more information about me, what I do, and my current skills, especially in programming and administration.",
    "about-title": "ABOUT ME",
    "open-cv": "OPEN",
    "unduh-cv": "DOWNLOAD",
    "txt-1": "Get to know me!",
    "txt-2":
      "I am a graduate of the Diploma in Informatics Engineering from <strong>Politeknik Sawunggalih Aji Purworejo (2025)</strong>, with more than three years of experience as an <strong>Administrative Staff</strong> at <strong>CV Wibawa Putra Utamajaya</strong>.",
    "txt-6":
      "During my work, I was responsible for managing goods delivery, company finances, and inventory in a systematic and efficient manner. In addition to having strong <strong>administrative</strong> skills, I also possess technical expertise in <strong>web application programming</strong>, including proficiency in HTML, CSS, SCSS, JavaScript, and PHP.",
    "txt-9":
      "I have developed several <strong>web projects</strong>, including school websites, personal websites, business websites, and restaurant web applications, which have strengthened my ability to design and manage web-based systems professionally.",
    "txt-11":
      "I am open to <strong>job opportunities</strong> where I can contribute, learn, and grow. If you have a great opportunity that matches my skills and experience, please don’t hesitate to <strong>contact</strong> me.",
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
    "txt-48":
      "Here are some of the skills I have as a Junior Web Developer to build functional and attractive websites.",
    "txt-49":
      "A markup language used to build the structure and content of web pages in an organized way.",
    "txt-50":
      "Used to style and design the visual appearance of websites, including colors, layouts, and responsiveness.",
    "txt-51":
      "An extension of CSS that allows the use of variables, nesting, and cleaner code structure for easier maintenance.",
    "txt-52":
      "A CSS framework that helps speed up the development of responsive and consistent website layouts across devices.",
    "txt-53":
      "A programming language that makes websites interactive, dynamic, and responsive to user actions.",
    "txt-54":
      "A server-side programming language used to handle application logic, data processing, and database connections.",
    "txt-55":
      "A lightweight PHP framework designed for building web applications with a simple and efficient structure.",
    "txt-codeigniter": "CODEIGNITER",
    "txt-56":
      "A modern PHP framework with powerful features such as routing, ORM, and security for scalable web development.",
    "txt-57":
      "A relational database management system used to store, manage, and organize application data.",
    "txt-58":
      "A collaboration platform for storing, managing, and version-controlling code efficiently.",
    "nav-skills": "SKILLS",
    "nav-projects": "PROJECTS",
    "nav-certificates": "CERTIFICATES",
    "txt-71":
      "Some IT Support skills that I have and continue to develop through learning and practice.",
    "skill-network": "NETWORK",
    "txt-72":
      "Basic understanding of LAN and Wi-Fi configuration, IP addressing (DHCP and static IP), and basic network troubleshooting.",
    "skill-operating": "OPERATING SYSTEM",
    "txt-73":
      "Able to install and configure Windows operating systems, perform basic operations on macOS and Linux, and handle basic OS troubleshooting and system maintenance.",
    "skill-software-tools": "SOFTWARE AND TOOLS",
    "txt-74":
      "Capable of installing and updating software, providing Microsoft Office support, and delivering remote assistance using tools such as AnyDesk and TeamViewer.",
    "title-certificates": "CERTIFICATES",
    "txt-75":
      "IT Support Certificate that reflects my skills and learning experience at Aguna Course.",
    "title-certificates": "CERTIFICATES",
    "txt-75":
      "IT Support Certificate that reflects my skills and learning experience at Aguna Course.",
    "txt-linux": "Linux Fundamentals",
    "txt-network": "Network Fundamentals",
    "txt-pnetlab": "Network Simulation with PNETLab",
    "txt-virtual": "Virtual Machine Fundamentals",
    "txt-copyright": "© Copyright 2025. Made by Indraprasta Dwinanda Fahreza",
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
        ? "../public/images/icon/english.png"
        : "../public/images/icon/indonesia.png";
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

//open pdf certification
function openPDF(pdfUrl) {
  document.getElementById("modal").style.display = "flex";
  document.getElementById("pdfViewer").src = pdfUrl;
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
  document.getElementById("pdfViewer").src = "";
}
