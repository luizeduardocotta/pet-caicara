// Mobile Menu Toggle
const menuToggle = document.getElementById("menuToggle")
const nav = document.getElementById("nav")
const navLinks = document.querySelectorAll(".nav-link")

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("active")
  menuToggle.classList.toggle("active")
})

// Close menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("active")
    menuToggle.classList.remove("active")
  })
})

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
    nav.classList.remove("active")
    menuToggle.classList.remove("active")
  }
})

// Header scroll effect
const header = document.getElementById("header")

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset

  if (currentScroll > 100) {
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }
})

const faqItems = document.querySelectorAll(".faq-item")

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question")

  question.addEventListener("click", () => {
    const isActive = item.classList.contains("active")

    // Close all other FAQ items
    faqItems.forEach((otherItem) => {
      if (otherItem !== item) {
        otherItem.classList.remove("active")
      }
    })

    // Toggle current item
    if (isActive) {
      item.classList.remove("active")
    } else {
      item.classList.add("active")
    }
  })
})

const scrollToTopBtn = document.getElementById("scrollToTop")

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.classList.add("visible")
  } else {
    scrollToTopBtn.classList.remove("visible")
  }
})

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

// Form Validation and WhatsApp Submission
const bookingForm = document.getElementById("bookingForm")
const formMessage = document.getElementById("formMessage")

bookingForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // Get form values
  const formData = {
    tutorName: document.getElementById("tutorName").value,
    petName: document.getElementById("petName").value,
    petAge: document.getElementById("petAge").value,
    petBreed: document.getElementById("petBreed").value,
    petWeight: document.getElementById("petWeight").value,
    service: document.getElementById("service").value,
    preferredDate: document.getElementById("preferredDate").value,
    preferredTime: document.getElementById("preferredTime").value,
    observations: document.getElementById("observations").value,
  }

  // Validate weight
  if (formData.petWeight <= 0) {
    showMessage("Por favor, insira um peso válido para o pet.", "error")
    return
  }

  // Validate date (should be today or in the future)
  const selectedDate = new Date(formData.preferredDate)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  if (selectedDate < today) {
    showMessage("Por favor, selecione uma data presente ou futura.", "error")
    return
  }

  // Get service name in Portuguese
  const serviceNames = {
    creche: "Creche / Day Care",
    hotel: "Hospedagem",
    "banho-tosa": "Banho & Tosa",
    banho: "Banho",
  }

  // Create WhatsApp message
  const message = `
*Novo Agendamento - Pet Pokka* 🐾

*Tutor:* ${formData.tutorName}
*Pet:* ${formData.petName}
*Idade:* ${formData.petAge}
*Raça:* ${formData.petBreed}
*Peso:* ${formData.petWeight}kg
*Serviço:* ${serviceNames[formData.service] || formData.service}
*Data preferida:* ${formatDate(formData.preferredDate)}
*Horário preferido:* ${formData.preferredTime}
${formData.observations ? `*Observações:* ${formData.observations}` : ""}

Aguardo confirmação! 😊
    `.trim()

  // WhatsApp link
  const whatsappNumber = "5531981142973"
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

  // Show success message
  showMessage("Redirecionando para WhatsApp...", "success")

  // Redirect to WhatsApp after a short delay
  setTimeout(() => {
    window.open(whatsappLink, "_blank")
    bookingForm.reset()
    formMessage.style.display = "none"
  }, 1500)
})

function showMessage(message, type) {
  formMessage.textContent = message
  formMessage.className = `form-message ${type}`
  formMessage.style.display = "block"

  // Scroll to message
  formMessage.scrollIntoView({ behavior: "smooth", block: "nearest" })
}

function formatDate(dateString) {
  const date = new Date(dateString + "T00:00:00")
  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const headerOffset = 80
      const elementPosition = target.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  })
})

const galleryItems = document.querySelectorAll(".gallery-item")

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    // Add a subtle animation effect on click
    item.style.transform = "scale(0.95)"
    setTimeout(() => {
      item.style.transform = ""
    }, 200)
  })
})

// Set minimum date for booking form to today
const dateInput = document.getElementById("preferredDate")
const today = new Date().toISOString().split("T")[0]
dateInput.setAttribute("min", today)

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe elements for animations
document.querySelectorAll(".service-item, .diferencial-item").forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(30px)"
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(el)
})

// Console log for development
console.log("[v0] Pet Pokka website loaded successfully")
console.log("[v0] Form validation and WhatsApp integration ready")
console.log("[v0] Mobile menu and smooth scrolling initialized")
console.log("[v0] FAQ accordion functionality active")
console.log("[v0] Scroll animations initialized")

function enviarReserva() {
  const servico = document.getElementById("servico").value
  const peso = document.getElementById("peso").value
  const checkin = document.getElementById("checkin").value
  const checkout = document.getElementById("checkout").value

  if (!servico || !peso || !checkin || !checkout) {
    alert("Por favor, preencha todos os campos para verificar a vaga.")
    return
  }

  const mensagem = `
*Novo Pedido de Verificação de Vaga* 🐾

*Serviço:* ${servico}
*Porte/Peso:* ${peso}
*Check-in:* ${formatDate(checkin)}
*Check-out:* ${formatDate(checkout)}

Aguardo confirmação 😊
  `.trim()

  const whatsappNumber = "5531981142973"
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensagem)}`

  window.open(whatsappLink, "_blank")
}

// ===============================
// CARROSSEL DEPOIMENTOS (SEM QUEBRAR NADA)
// ===============================

window.addEventListener("load", () => {
  const track = document.querySelector(".testimonials-track");
  if (!track) return;

  const items = Array.from(track.children);
  if (items.length === 0) return;

  // Clona os itens para criar o efeito infinito
  items.forEach((item) => {
    const clone = item.cloneNode(true);
    track.appendChild(clone);
  });
  
  // Opcional: Se tiver poucos depoimentos, clone uma segunda vez
  if (items.length < 5) {
      items.forEach((item) => {
        const clone = item.cloneNode(true);
        track.appendChild(clone);
      });
  }
});
