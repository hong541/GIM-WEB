const BLOG_ID = "8063053322915544144";
const API_KEY = "AIzaSyBeVkYPDBDgMk_vO3K06CEkMG3-Qchx86w";
const API_URL = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}&maxResults=5`;

async function fetchArticles() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    const articles = data.items.slice(0, 4);

    const container = document.getElementById("articles-container");
    container.innerHTML = articles
      .map((article) => {
        // Parsing content untuk mencari elemen <img>
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = article.content; // Masukkan konten artikel ke dalam elemen sementara
        const imgElement = tempDiv.querySelector("img");
        const imageUrl = imgElement ? imgElement.src : ""; // Dapatkan src dari <img>, jika ada

        return `
        <div class="col s12 m12">
              <div class="card article-card">
                <div class="card-image">
                  ${
                    imageUrl
                      ? `<img src="${imageUrl}" alt="${article.title}" />`
                      : ""
                  }
                </div>
                <div class="card-content">
                  <span class="card-title">${article.title}</span>
                  <p>${article.content
                    .replace(/<[^>]*>?/gm, "")
                    .substring(0, 100)}...</p>
                </div>
                <div class="card-action">
                  <a href="${
                    article.url
                  }" target="_blank" rel="noopener">Baca Selengkapnya</a>
                </div>
              </div>
            </div>
          `;
      })
      .join("");
  } catch (error) {
    console.error("Error fetching articles:", error);
  }
}

// Panggil fungsi fetch saat halaman dimuat
fetchArticles();

document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Mencegah form dari pengiriman default

    // Ambil nilai dari form
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const message = document.getElementById("message").value;

    // Validasi form (pastikan name dan email tidak kosong)
    if (name === "" || email === "") {
      alert("Name dan Email harus diisi!");
      return;
    }

    // Membuat objek untuk data form
    const formData = {
      name: name,
      email: email,
      phone: phone,
      message: message,
    };

    // Simulasi pengiriman form (misalnya, menggunakan fetch atau AJAX ke server)
    console.log("Form data:", formData);

    // Menampilkan konfirmasi pengiriman
    alert("Terima kasih, pesan Anda telah terkirim!");

    // Mengosongkan form setelah pengiriman
    document.getElementById("contactForm").reset();
  });

document.addEventListener("DOMContentLoaded", function () {
  // Inisialisasi modal
  const modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);

  // Menambahkan event listener untuk setiap service card
  const serviceCards = document.querySelectorAll(".service-card");
  serviceCards.forEach((card) => {
    card.addEventListener("click", function () {
      const serviceId = this.getAttribute("data-service");
      // Menampilkan modal yang sesuai dengan service yang diklik
      const modal = document.getElementById(`serviceModal${serviceId}`);
      const instance = M.Modal.getInstance(modal);
      instance.open();
    });
  });
});
