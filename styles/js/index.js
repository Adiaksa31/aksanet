// Particle JS Configuration
document.addEventListener("DOMContentLoaded", function () {
  particlesJS("particles-js", {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: "#ffffff" },
      shape: {
        type: "circle",
        stroke: { width: 0, color: "#000000" },
      },
      opacity: {
        value: 0.5,
        random: false,
        anim: { enable: false },
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: false,
          speed: 40,
          size_min: 0.1,
          sync: false,
        },
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#ffffff",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 6,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "repulse" },
        onclick: { enable: true, mode: "push" },
        resize: true,
      },
      modes: {
        grab: { distance: 400, line_linked: { opacity: 1 } },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3,
        },
        repulse: { distance: 200, duration: 0.4 },
        push: { particles_nb: 4 },
        remove: { particles_nb: 2 },
      },
    },
    retina_detect: true,
  });

  // Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Scroll Animations with Smooth Effects
  const observerOptions = {
    root: null, // Observe viewport
    rootMargin: "0px 0px -50px 0px", // Trigger animation before the element is fully visible
    threshold: 0.1, // 10% visibility before triggering
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add animation classes smoothly
        entry.target.classList.add("animate__animated", "animate__fadeIn");
        // Stop observing the element if animation is one-time
        observer.unobserve(entry.target);
      } else {
        // Optionally, remove animation if out of viewport
        entry.target.classList.remove("animate__fadeIn");
      }
    });
  });

  // Select elements to observe
  const elementsToAnimate = document.querySelectorAll("section, header");

  // Ensure elements are only observed once
  elementsToAnimate.forEach((element) => {
    if (!element.classList.contains("animate__animated")) {
      observer.observe(element);
    }
  });

  const subtitleElement = document.querySelector("header p");
  if (subtitleElement) {
    const text =
      subtitleElement.getAttribute("data-text") || subtitleElement.textContent;
    subtitleElement.textContent = "";
    subtitleElement.setAttribute("data-text", text);

    function typeWriter(element, text, speed = 50) {
      // Reset element
      element.innerHTML = "";
      let index = 0;

      function type() {
        if (index < text.length) {
          const char = text.charAt(index);
          const span = document.createElement("span");
          span.textContent = char;
          const purpleShades = [
            "rgb(229, 217, 242)",
            "rgb(245, 239, 255)",
            "rgb(205, 193, 255)",
            "rgb(165, 148, 249)",
            "#3B82F6",  // Tailwind blue-500
            "#8B5CF6"   // Tailwind purple-500
          ];
          span.style.color = purpleShades[Math.floor(Math.random() * purpleShades.length)];
          span.style.transition = "all 0.3s ease";

          element.appendChild(span);

          index++;
          setTimeout(type, speed);
        } else {
          // Animasi berulang
          setTimeout(() => {
            typeWriter(element, text);
          }, 3000);
        }
      }

      type();
    }

    typeWriter(subtitleElement, text);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector("nav");

  // Fungsi untuk menambahkan/menghapus background saat scroll
  function handleScroll() {
    if (window.scrollY > 10) {
      // Tambahkan background dan shadow saat scroll
      navbar.classList.add("backdrop-blur-sm");
    } else {
      // Kembalikan ke keadaan awal saat di top
      navbar.classList.remove("backdrop-blur-sm");
    }
  }

  // Tambahkan event listener scroll
  window.addEventListener("scroll", handleScroll);

  // Pastikan state navbar benar saat reload/navigasi
  handleScroll();
});

document.addEventListener("DOMContentLoaded", function () {
  // Navbar Scroll Effect
  const navbar = document.querySelector("nav");

  function handleNavbarScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add("bg-black/30", "backdrop-blur-md", "shadow-lg");
    } else {
      navbar.classList.remove("bg-black/30", "backdrop-blur-md", "shadow-lg");
    }
  }
  window.addEventListener("scroll", handleNavbarScroll);

  // Active Section Tracking
  const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link");
  const sections = document.querySelectorAll("section, header");

  function updateActiveLink() {
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (
        window.scrollY >= sectionTop - 100 &&
        window.scrollY < sectionTop + sectionHeight - 100
      ) {
        currentSection = section.id;
      }
    });

    navLinks.forEach((link) => {
      // Reset all links
      link.classList.remove("text-blue-500", "font-bold");

      // Add active state to current section link
      if (link.getAttribute("data-section") === currentSection) {
        link.classList.add("text-blue-500", "font-bold");

        // Ensure border is full width for active link
        const borderSpan = link.querySelector("span");
        if (borderSpan) {
          borderSpan.classList.add("w-full");
        }
      } else {
        const borderSpan = link.querySelector("span");
        if (borderSpan) {
          borderSpan.classList.remove("w-full");
        }
      }
    });
  }

  // Run on scroll and initial load
  window.addEventListener("scroll", updateActiveLink);
  updateActiveLink();

  // Mobile Menu Toggle
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const hamburgerIcon = document.getElementById("hamburger-icon");
  const closeIcon = document.getElementById("close-icon");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

  mobileMenuToggle.addEventListener("click", function () {
    hamburgerIcon.classList.toggle("hidden");
    closeIcon.classList.toggle("hidden");
    mobileMenu.classList.toggle("-translate-x-full");
  });

  // Close mobile menu when a link is clicked
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", function () {
      mobileMenu.classList.add("-translate-x-full");
      hamburgerIcon.classList.remove("hidden");
      closeIcon.classList.add("hidden");
    });
  });

  // Close mobile menu if clicked outside
  document.addEventListener("click", function (event) {
    const isClickInsideMobileMenu = mobileMenu.contains(event.target);
    const isClickOnToggle = mobileMenuToggle.contains(event.target);

    if (
      !isClickInsideMobileMenu &&
      !isClickOnToggle &&
      !mobileMenu.classList.contains("-translate-x-full")
    ) {
      mobileMenu.classList.add("-translate-x-full");
      hamburgerIcon.classList.remove("hidden");
      closeIcon.classList.add("hidden");
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  // Interactive Tech Icons
  const techIcons = document.querySelectorAll(".tech-icon");

  techIcons.forEach((icon) => {
    icon.addEventListener("mouseenter", function () {
      this.classList.add("scale-125", "rotate-6");
    });

    icon.addEventListener("mouseleave", function () {
      this.classList.remove("scale-125", "rotate-6");
    });
  });

  // Skill Section Interaction
  const skillSections = document.querySelectorAll(".bg-gray-800");

  const skillSectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fadeIn");
          skillSectionObserver.unobserve(entry.target); // Stop observing after animation
        }
      });
    },
    { threshold: 0.1 }
  );

  skillSections.forEach((section) => {
    skillSectionObserver.observe(section);
  });
});
const ctx = document.getElementById("professionalSkillsChart").getContext("2d");
const data = {
  labels: ["Teamwork", "Leadership", "Communication", "Problem Solving"],
  datasets: [
    {
      data: [30, 25, 20, 25],
      backgroundColor: ["#3B82F6", "#22C55E", "#EAB308", "#EF4444"],
    },
  ],
};

// Inisialisasi Pie Chart
const professionalSkillsChart = new Chart(ctx, {
  type: "pie",
  data: data,
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "white",
        },
      },
    },
  },
});


 // Kompleks Chatbot Logic
 const chatbotTrigger = document.getElementById('chatbot-trigger');
 const chatbotContainer = document.getElementById('chatbot-container');
 const closeChatbot = document.getElementById('close-chatbot');
 const chatbotMessages = document.getElementById('chatbot-messages');
 const chatbotOptions = document.getElementById('chatbot-options');

 const conversationTree = {
  initial: {
      message: "Hello! How can I assist you today?",
      options: [
          { 
              text: 'Technical Support', 
              next: 'technical_main',
              icon: '🖥️'
          },
          { 
              text: 'Sales Inquiry', 
              next: 'sales_main',
              icon: '💼'
          },
          { 
              text: 'General Inquiry', 
              next: 'general_main',
              icon: '❓'
          }
      ]
  },
  technical_main: {
      message: "What type of technical support do you need?",
      options: [
          { 
              text: 'Software Issues', 
              next: 'technical_software',
              icon: '💻'
          },
          { 
              text: 'Hardware Problems', 
              next: 'technical_hardware',
              icon: '🔧'
          },
          { 
              text: 'Network Connectivity', 
              next: 'technical_network',
              icon: '🌐'
          },
          {
              text: 'Back to Main Menu',
              next: 'initial',
              icon: '🔙'
          }
      ]
  },
  technical_software: {
      message: "Please specify the software issue:",
      options: [
          { 
              text: 'Installation Problem', 
              response: "For installation issues, please ensure you have the latest version and meet system requirements. Would you like our step-by-step guide?",
              icon: '📦'
          },
          { 
              text: 'Performance Slowdown', 
              response: "Performance issues can be resolved by clearing cache, updating drivers, and checking system resources.",
              icon: '🐌'
          },
          { 
              text: 'Compatibility Error', 
              response: "Compatibility errors often require specific driver updates or system configuration changes.",
              icon: '🔌'
          },
          {
              text: 'Back to Technical Support',
              next: 'technical_main',
              icon: '🔙'
          }
      ]
  },
  sales_main: {
      message: "What information are you looking for?",
      options: [
          { 
              text: 'Product Pricing', 
              response: "Our pricing varies based on your specific needs. Would you like to schedule a consultation?",
              icon: '💰'
          },
          { 
              text: 'Custom Solutions', 
              response: "We offer tailored solutions for businesses of all sizes. Our sales team can provide a detailed quote.",
              icon: '🤝'
          },
          { 
              text: 'Current Promotions', 
              response: "We have ongoing promotions for new customers. Would you like to hear about our latest offers?",
              icon: '🎉'
          },
          {
              text: 'Back to Main Menu',
              next: 'initial',
              icon: '🔙'
          }
      ]
  }
};

class AdvancedChatbot {
  constructor() {
      this.currentState = 'initial';
      this.initEventListeners();
  }

  initEventListeners() {
      chatbotMessages.addEventListener('click', (e) => {
          const optionElement = e.target.closest('.dynamic-option');
          if (optionElement) {
              const option = optionElement.dataset.option;
              this.handleOptionSelection(option);
          }
      });
  }

  handleOptionSelection(option) {
      const currentConversation = conversationTree[this.currentState];
      const selectedOption = currentConversation.options.find(opt => opt.text === option);

      if (selectedOption) {
          // Hapus opsi sebelumnya
          this.removeLastOptions();

          // Tambahkan pesan user
          this.addMessage(option, 'user');

          // Proses opsi yang dipilih
          if (selectedOption.next) {
              this.currentState = selectedOption.next;
              const nextConversation = conversationTree[this.currentState];
              this.addMessageWithOptions(nextConversation.message, nextConversation.options);
          } else if (selectedOption.response) {
              this.addMessage(selectedOption.response, 'bot');
              
              // Kembali ke menu utama setelah beberapa saat
              setTimeout(() => {
                  this.currentState = 'initial';
                  const initialConversation = conversationTree[this.currentState];
                  this.addMessageWithOptions(initialConversation.message, initialConversation.options);
              }, 3000);
          }
      }
  }

  addMessageWithOptions(text, options) {
      const messageContainer = document.createElement('div');
      messageContainer.classList.add('flex', 'items-start', 'mb-4');
      
      // Buat opsi dalam format HTML
      const optionsHTML = options.map(option => `
          <div class="dynamic-option cursor-pointer bg-blue-100 text-blue-700 hover:bg-blue-200 transition p-2 rounded mb-2 flex justify-between items-center" 
               data-option="${option.text}">
              <span>${option.icon} ${option.text}</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
          </div>
      `).join('');

      messageContainer.innerHTML = `
          <img src="img/pc.png" class="w-8 h-8 rounded-full mr-3" alt="Bot Avatar">
          <div class="bg-blue-600 p-3 rounded-lg max-w-[70%]">
              <p class="mb-3">${text}</p>
              <div class="space-y-2">
                  ${optionsHTML}
              </div>
          </div>
      `;

      chatbotMessages.appendChild(messageContainer);
      this.scrollToBottom();
  }

  removeLastOptions() {
      // Hapus opsi dari pesan terakhir bot
      const lastBotMessage = chatbotMessages.lastElementChild;
      if (lastBotMessage) {
          const optionsContainer = lastBotMessage.querySelector('.dynamic-option-container');
          if (optionsContainer) {
              optionsContainer.remove();
          }
      }
  }

  addMessage(text, type) {
      const messageContainer = document.createElement('div');
      messageContainer.classList.add('flex', 'items-start', 'mb-4');
      
      if (type === 'bot') {
          messageContainer.innerHTML = `
              <img src="img/pc.png" class="w-8 h-8 rounded-full mr-3" alt="Bot Avatar">
              <div class="bg-blue-600 p-3 rounded-lg max-w-[70%]">
                  <p>${text}</p>
              </div>
          `;
      } else {
          messageContainer.innerHTML = `
              <div class="ml-auto bg-blue-500 text-white p-3 rounded-lg max-w-[70%] text-right">
                  <p>${text}</p>
              </div>
          `;
      }

      chatbotMessages.appendChild(messageContainer);
      this.scrollToBottom();
  }

  scrollToBottom() {
      chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }
}

// Inisialisasi Chatbot
const chatbot = new AdvancedChatbot();

// Event listener untuk membuka chatbot
chatbotTrigger.addEventListener('click', () => {
  chatbotContainer.classList.toggle('hidden');
  if (!chatbotContainer.classList.contains('hidden')) {
      // Bersihkan pesan sebelumnya
      chatbotMessages.innerHTML = '';
      
      // Set state awal
      chatbot.currentState = 'initial';
      const initialConversation = conversationTree[chatbot.currentState];
      chatbot.addMessageWithOptions(initialConversation.message, initialConversation.options);
  }
});

// Event listener untuk menutup chatbot
closeChatbot.addEventListener('click', () => {
  chatbotContainer.classList.add('hidden');
});


const scrollToTopBtn = document.getElementById("scrollToTop");
window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
        scrollToTopBtn.classList.remove("hidden");
    } else {
        scrollToTopBtn.classList.add("hidden");
    }
});

scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

const modal = document.getElementById('projectModal');
const closeModal = document.getElementById('closeModal');
let currentLanguage = getCookie('language') || 'en'; // Gunakan cookie jika ada, default 'en'

// Fungsi untuk membuka modal
function openModal(title, image, description, technology) {
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    const modalDescription = document.getElementById('modalDescription');
    const modalTechnology = document.getElementById('modalTechnology');

    if (!modal || !modalTitle || !modalImage || !modalDescription || !modalTechnology) {
        console.error("Elemen modal tidak ditemukan!");
        return;
    }

    modalTitle.textContent = title;
    modalImage.src = image;
    modalImage.alt = `Gambar untuk ${title}`;
    modalDescription.textContent = description;

    modalTechnology.innerHTML = `
        <h3 class="text-lg font-bold text-gray-700 mt-4 mb-2">Teknologi:</h3>
        <div class="flex flex-wrap justify-center gap-4">
            ${technology.map(tech => `
                <div class="flex flex-col items-center my-3">
                    <i class="${tech.icon} text-3xl mb-1"></i>
                    <span class="text-sm font-medium">${tech.name}</span>
                </div>
            `).join('')}
        </div>
    `;

    modal.classList.add('show');
}

// Fungsi untuk menutup modal
closeModal.addEventListener('click', () => {
    modal.classList.remove('show');
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
    }
});

// Fungsi untuk memuat data proyek sesuai bahasa yang dipilih
function loadProjects() {
    fetch('files/projects.json')
        .then(response => response.json())
        .then(data => {
            const projectCards = document.getElementById('projectCards');
            projectCards.innerHTML = ''; // Hapus konten sebelumnya

            data.forEach((project) => {
                const card = document.createElement('div');
                card.className = "project-card group relative overflow-hidden rounded-2xl shadow-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-4xl";
                card.innerHTML = `
                    <div class="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-purple-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                    <div class="relative overflow-hidden">
                        <img src="${project.image}" class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110" alt="Project Thumbnail">
                        <div class="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-20">
                            <div class="text-center text-white p-6 transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                                <h3 class="text-2xl font-bold mb-2">${project.title[currentLanguage]}</h3>
                                <p class="text-gray-200">${project.description[currentLanguage]}</p>
                                <div class="mt-4">
                                    <a href="#" class="bg-white text-black px-4 py-2 rounded-full inline-block hover:bg-gray-200 transition view-project">View Project</a>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                const viewProjectButton = card.querySelector('.view-project');
                viewProjectButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    openModal(project.title[currentLanguage], project.image, project.description[currentLanguage], project.technology);
                });

                projectCards.appendChild(card);
            });
        })
        .catch(error => console.error('Error loading JSON data:', error));
}

// Fungsi untuk mengambil data bahasa dari JSON
async function fetchLanguageData(lang) {
  const response = await fetch(`lang/${lang}.json`);
  return await response.json();
}

// Fungsi untuk memperbarui konten bahasa di halaman
async function updateContent(lang) {
    let languageData = await fetchLanguageData(lang);
    const elements = document.querySelectorAll('[data-translate]');
    const specialKeys = ["about_me", "my_skills", "my_portofolio"];

    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        const text = languageData[key];

        if (text) {
            const words = text.split(" ");
            if (specialKeys.includes(key)) {
                element.innerHTML = `<span class="text-white">${words[0]}</span> <span class="text-blue-500">${words.slice(1).join(" ")}</span>`;
            } else if (element.firstChild.nodeType === Node.TEXT_NODE) {
                element.firstChild.nodeValue = text + " ";
            }
        }
    });

    loadProjects(); // Refresh proyek agar sesuai dengan bahasa baru
}

// Fungsi untuk mengatur cookie
function setCookie(name, value, hours) {
  const expires = new Date(Date.now() + hours * 3600 * 1000).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

// Fungsi untuk mendapatkan cookie
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

// Fungsi untuk memperbarui dropdown bahasa
function updateDropdownButton(lang) {
    const selectedFlag = document.getElementById('selectedFlag');
    const selectedLanguage = document.getElementById('selectedLanguage');

    if (lang === 'en') {
        selectedFlag.src = 'https://flagcdn.com/w40/us.png';
        selectedLanguage.textContent = 'English';
    } else if (lang === 'id') {
        selectedFlag.src = 'https://flagcdn.com/w40/id.png';
        selectedLanguage.textContent = 'Indonesia';
    }
}

// Event Listener untuk Dropdown Bahasa
document.addEventListener('DOMContentLoaded', async function() {
    const dropdownButton = document.getElementById('dropdownButton');
    const dropdownMenu = document.getElementById('dropdownMenu');

    updateDropdownButton(currentLanguage);
    await updateContent(currentLanguage); // Load konten sesuai bahasa yang tersimpan di cookie

    document.querySelectorAll('.language-option').forEach(option => {
        option.addEventListener('click', async function() {
            const lang = this.getAttribute('data-lang');
            currentLanguage = lang;
            setCookie('language', lang, 1);
            updateDropdownButton(lang);
            await updateContent(lang);
            dropdownMenu.classList.add('hidden');
        });
    });

    // Toggle dropdown
    dropdownButton.addEventListener('click', function() {
        dropdownMenu.classList.toggle('hidden');
    });

    document.addEventListener('click', function(event) {
        if (!dropdownButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.add('hidden');
        }
    });
});

// Panggil `loadProjects()` pertama kali
loadProjects();
