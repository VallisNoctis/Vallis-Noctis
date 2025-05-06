// Loader
document.addEventListener("DOMContentLoaded", () => {
  // Ocultar el loader después de 1.5 segundos
  setTimeout(() => {
    const loader = document.getElementById("loader")
    if (loader) {
      loader.style.opacity = "0"
      loader.style.visibility = "hidden"
      setTimeout(() => {
        loader.style.display = "none"
      }, 500)
    }
  }, 1500)
})

// Navegación
const menuToggle = document.querySelector(".menu-toggle")
const navLinks = document.querySelector(".nav-links")

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active")
  navLinks.classList.toggle("active")
})

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("active")
    navLinks.classList.remove("active")
  })
})

// Cambio de tema
const themeToggle = document.getElementById("themeToggle")
const body = document.body
const toggleIcon = document.querySelector(".toggle-icon")

// Verificar si hay una preferencia guardada
const savedTheme = localStorage.getItem("theme")
if (savedTheme === "light") {
  body.classList.add("light-mode")
  toggleIcon.textContent = "☀️"
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("light-mode")

  if (body.classList.contains("light-mode")) {
    localStorage.setItem("theme", "light")
    toggleIcon.textContent = "☀️"
  } else {
    localStorage.setItem("theme", "dark")
    toggleIcon.textContent = "🌙"
  }
})

// Efectos de las antorchas
const flames = document.querySelectorAll(".flame")
setInterval(() => {
  flames.forEach((flame) => {
    const randomScale = 0.95 + Math.random() * 0.1
    flame.style.transform = `scale(${randomScale})`
  })
}, 200)

// Gráfico de Tokenomics
document.addEventListener("DOMContentLoaded", () => {
  const ctx = document.getElementById("tokenomicsChart")
  if (ctx && window.Chart) {
    try {
      new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["Tesoro Real", "Ciudadanos", "Recompensas",],
          datasets: [
            {
              data: [5.55, 94.5,],
              backgroundColor: ["#d4af37", "#8b5a2b", "#5d3a1a",],
              borderColor: "rgba(26, 20, 15, 0.1)",
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                color: document.body.classList.contains("light-mode") ? "#3a2411" : "#e0c097",
                font: {
                  family: "'MedievalSharp', cursive",
                  size: 12,
                },
              },
            },
          },
        },
      })
    } catch (error) {
      console.error("Error al inicializar el gráfico:", error)
    }
  }
})

// Adivino (Chatbot)
const oracleResponses = [
  {
    keywords: ["precio", "valor", "costo"],
    response: "El valor de VLN se alzará como un dragón al amanecer... pero solo los pacientes serán recompensados.",
  },
  {
    keywords: ["futuro", "predicción", "predecir"],
    response: "Veo una gran batalla en el horizonte... y Vallis Noctis emergerá victorioso.",
  },
  {
    keywords: ["comprar", "exchange", "adquirir"],
    response: "Busca el mercado donde la luna brilla más fuerte. Allí hallarás VLN.",
  },
  {
    keywords: ["staking", "recompensas", "beneficios"],
    response: "Quienes guarden sus monedas en el gran salón obtendrán riquezas beyond measure.",
  },
  {
    keywords: ["quién", "quien", "creador"],
    response: "El oráculo no revela identidades, pero Vallis Noctis es obra de mentes tan sabias como antiguas.",
  },
  {
    keywords: ["proyecto", "roadmap", "futuro"],
    response: "El camino de Vallis Noctis está trazado en las estrellas. Grandes hazañas y conquistas se avecinan.",
  },
  {
    keywords: ["comunidad", "unirse", "telegram"],
    response: "Los guerreros se reúnen en las salas del castillo digital. Busca los enlaces sagrados en esta página.",
  },
  {
    keywords: ["default"],
    response:
      "El viento susurra tu pregunta, pero el oráculo necesita más claridad. Reformula tu consulta, noble viajero.",
  },
]

document.getElementById("openOracle").addEventListener("click", () => {
  document.getElementById("oracleModal").style.display = "block"
})

document.querySelector(".close-modal").addEventListener("click", () => {
  document.getElementById("oracleModal").style.display = "none"
})

document.getElementById("askOracle").addEventListener("click", sendQuestion)
document.getElementById("userQuestion").addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendQuestion()
})

function sendQuestion() {
  const userQuestion = document.getElementById("userQuestion").value
  if (!userQuestion.trim()) return

  displayMessage(userQuestion, "user-message")

  const response = getOracleResponse(userQuestion)
  setTimeout(() => {
    displayMessage(response, "oracle-message")
  }, 1000)

  document.getElementById("userQuestion").value = ""
}

function displayMessage(text, className) {
  const chatDisplay = document.getElementById("chatDisplay")
  const messageDiv = document.createElement("div")
  messageDiv.classList.add("message", className)
  messageDiv.textContent = text
  chatDisplay.appendChild(messageDiv)
  chatDisplay.scrollTop = chatDisplay.scrollHeight
}

function getOracleResponse(question) {
  const lowerQuestion = question.toLowerCase()
  for (const item of oracleResponses) {
    if (item.keywords.some((keyword) => lowerQuestion.includes(keyword))) {
      return item.response
    }
  }
  return oracleResponses.find((item) => item.keywords.includes("default")).response
}

// Animación al hacer scroll
const animateOnScroll = () => {
  const elements = document.querySelectorAll(".section-container, .feature-item, .tokenomics-item, .roadmap-item")

  elements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top
    const screenPosition = window.innerHeight / 1.3

    if (elementPosition < screenPosition) {
      element.style.opacity = "1"
      element.style.transform = "translateY(0)"
    }
  })
}

// Inicializar elementos con opacidad 0
document.querySelectorAll(".section-container, .feature-item, .tokenomics-item, .roadmap-item").forEach((element) => {
  element.style.opacity = "0"
  element.style.transform = "translateY(20px)"
  element.style.transition = "opacity 0.5s ease, transform 0.5s ease"
})

// Ejecutar animación al cargar y al hacer scroll
window.addEventListener("load", animateOnScroll)
window.addEventListener("scroll", animateOnScroll)

// Formulario de newsletter
const newsletterForm = document.querySelector(".newsletter-form")
if (newsletterForm) {
  newsletterForm.addEventListener("submit", function (e) {
    e.preventDefault()
    const email = this.querySelector('input[type="email"]').value
    if (email) {
      alert("¡Gracias por suscribirte al boletín de Vallis Noctis!")
      this.reset()
    }
  })
}

document.querySelector('.newsletter-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
  });
  
  if (response.ok) {
      alert('¡Las Crónicas Nocturnas llegarán a tu correo! 🔮');
      form.reset();
  } else {
      alert('El mensaje no pudo enviarse. Intenta nuevamente más tarde.');
  }
});