
document.addEventListener("DOMContentLoaded", function() {
    const alertBox = document.getElementById("alertBox");
    const closeAlert = document.getElementById("closeAlert");

    // Tombol untuk menutup alert
    closeAlert.addEventListener("click", function() {
        alertBox.classList.add("hidden");
    });
});


        document.addEventListener("DOMContentLoaded", () => {
        const gameBoard = document.getElementById("gameBoard");
        const scoreDisplay = document.getElementById("scoreDisplay");
        const movesDisplay = document.getElementById("movesDisplay");
        const restartButton = document.getElementById("restartGame");

        class MemoryGame {
            constructor(boardSize = 16) {
            this.boardSize = boardSize;
            this.cards = [];
            this.flippedCards = [];
            this.matchedPairs = 0;
            this.moves = 0;
            this.score = 0;
            this.init();
            }

            init() {
            // Generate unique pairs of cards
            const cardTypes = ["🚀", "💻", "🧠", "🎯", "📊", "🌟", "🔬", "🚀"];

            this.cards = [...cardTypes, ...cardTypes].sort(() => Math.random() - 0.5);

            this.renderBoard();
            this.attachEventListeners();
            }

            renderBoard() {
            gameBoard.innerHTML = "";
            this.cards.forEach((card, index) => {
                const cardElement = document.createElement("div");
                cardElement.classList.add(
                "game-card",
                "bg-gray-700",
                "rounded",
                "h-20",
                "flex",
                "items-center",
                "justify-center",
                "text-3xl",
                "cursor-pointer",
                "transition",
                "hover:bg-gray-600"
                );
                cardElement.dataset.index = index;
                cardElement.textContent = "?";
                gameBoard.appendChild(cardElement);
            });
            }

            attachEventListeners() {
            gameBoard.addEventListener("click", (e) => {
                const card = e.target.closest(".game-card");
                if (!card) return;

                this.flipCard(card);
            });

            restartButton.addEventListener("click", () => {
                this.resetGame();
            });
            }

            flipCard(cardElement) {
            const index = cardElement.dataset.index;

            // Prevent flipping matched or already flipped cards
            if (
                cardElement.classList.contains("matched") ||
                this.flippedCards.includes(cardElement)
            )
                return;

            cardElement.textContent = this.cards[index];
            this.flippedCards.push(cardElement);

            if (this.flippedCards.length === 2) {
                this.moves++;
                movesDisplay.textContent = this.moves;
                this.checkMatch();
            }
            }

            checkMatch() {
            const [card1, card2] = this.flippedCards;
            const index1 = card1.dataset.index;
            const index2 = card2.dataset.index;

            if (this.cards[index1] === this.cards[index2]) {
                // Match found
                card1.classList.add("matched");
                card2.classList.add("matched");
                this.matchedPairs++;
                this.score += 10;
                scoreDisplay.textContent = this.score;
            } else {
                // No match, flip back
                setTimeout(() => {
                card1.textContent = "?";
                card2.textContent = "?";
                }, 1000);
            }

            this.flippedCards = [];

            // Check game completion
            if (this.matchedPairs === this.boardSize / 2) {
                this.celebrateWin();
            }
            }

            celebrateWin() {
            Swal.fire({
                title: "Congratulations!",
                text: `You solved the puzzle in ${this.moves} moves!`,
                icon: "success",
                confirmButtonText: "Play Again",
            });
            }

            resetGame() {
            this.matchedPairs = 0;
            this.moves = 0;
            this.score = 0;
            this.flippedCards = [];

            scoreDisplay.textContent = this.score;
            movesDisplay.textContent = this.moves;

            this.init();
            }
        }

        // Inisialisasi game
        new MemoryGame();
        });


        document.addEventListener('DOMContentLoaded', () => {
            const chatContainer = document.getElementById('chatContainer');
            const userInput = document.getElementById('userInput');
            const sendButton = document.getElementById('sendButton');

            // Konfigurasi AI Assistant
            class AIAssistant {
                constructor() {
                    this.conversationHistory = [];
                    this.personalities = {
                        default: {
                            name: "Helpful Assistant",
                            avatar: "img/pc.png"
                        },
                        creative: {
                            name: "Creative Genius",
                            avatar: "img/pc.png"
                        },
                        technical: {
                            name: "Tech Expert",
                            avatar: "img/pc.png"
                        }
                    };
                    this.currentPersonality = this.personalities.default;

                    // Dataset pertanyaan dan jawaban
                    this.dataset = [
                        // Greeting & Perkenalan
                        { keyword: "hello", response: "Hai! Senang bertemu dengan Anda." },
                        { keyword: "hi", response: "Halo! Ada yang bisa saya bantu?" },
                        { keyword: "hey", response: "Hai there! Apa kabar hari ini?" },
                        { keyword: "selamat pagi", response: "Selamat pagi! Semoga harimu menyenangkan." },
                        { keyword: "selamat siang", response: "Selamat siang! Ada yang bisa saya bantu?" },
                        { keyword: "siapa kamu", response: "Saya adalah AI Assistant cerdas yang siap membantu Anda." },
                        { keyword: "apa kabar", response: "Saya baik, terima kasih! Bagaimana dengan Anda?" },
                    
                        // Pemrograman & Teknologi
                        { keyword: "programming", response: "Saya ahli dalam berbagai bahasa pemrograman. Ada pertanyaan spesifik?" },
                        { keyword: "javascript", response: "JavaScript adalah bahasa pemrograman yang hebat untuk aplikasi web, dengan kemampuan dinamis dan interaktif." },
                        { keyword: "python", response: "Python sering digunakan untuk AI, pembelajaran mesin, analitik data, dan pengembangan backend." },
                        { keyword: "php", response: "PHP adalah bahasa populer untuk pengembangan web server-side, terutama untuk membuat situs dinamis." },
                        { keyword: "laravel", response: "Laravel adalah framework PHP yang sangat kuat untuk membangun aplikasi web dengan arsitektur MVC." },
                        { keyword: "react", response: "React.js adalah library JavaScript untuk membangun antarmuka pengguna yang komponennya dapat digunakan kembali." },
                        { keyword: "nodejs", response: "Node.js memungkinkan Anda menjalankan JavaScript di sisi server dengan efisien." },
                        { keyword: "typescript", response: "TypeScript adalah superset JavaScript yang menambahkan typing statis untuk pengembangan skala besar." },
                        { keyword: "html", response: "HTML adalah fondasi dari semua halaman web, menentukan struktur konten." },
                        { keyword: "css", response: "CSS digunakan untuk mendesain dan mengatur tampilan halaman web dengan fleksibilitas tinggi." },
                        { keyword: "tailwind", response: "Tailwind CSS adalah framework CSS utility-first yang memudahkan desain responsif." },
                    
                        // Web & Digital
                        { keyword: "google", response: "Google adalah mesin pencari paling populer di dunia, menyediakan berbagai layanan digital." },
                        { keyword: "seo", response: "SEO (Search Engine Optimization) membantu meningkatkan peringkat situs Anda di mesin pencari." },
                        { keyword: "website", response: "Website adalah platform digital untuk berbagi informasi, berbisnis, dan berkomunikasi." },
                        { keyword: "hosting", response: "Hosting adalah layanan yang memungkinkan situs web dapat diakses melalui internet." },
                        { keyword: "domain", response: "Domain adalah alamat unik situs web di internet, seperti contoh.com." },
                    
                        // AI & Machine Learning
                        { keyword: "ai", response: "Kecerdasan Buatan (AI) adalah teknologi yang memungkinkan mesin berpikir dan belajar seperti manusia." },
                        { keyword: "machine learning", response: "Machine Learning adalah cabang AI yang fokus pada algoritma yang dapat belajar dari data." },
                        { keyword: "deep learning", response: "Deep Learning menggunakan jaringan saraf tiruan untuk memproses data kompleks." },
                        { keyword: "chatgpt", response: "ChatGPT adalah model bahasa AI canggih yang dikembangkan oleh OpenAI." },
                    
                        // Bisnis & Produktivitas
                        { keyword: "startup", response: "Startup adalah perusahaan rintisan yang fokus pada inovasi dan pertumbuhan cepat." },
                        { keyword: "produktivitas", response: "Produktivitas adalah kemampuan menghasilkan output maksimal dengan input minimal." },
                        { keyword: "manajemen", response: "Manajemen yang baik melibatkan perencanaan, pengorganisasian, kepemimpinan, dan pengendalian." },
                    
                        // Pertanyaan Umum
                        { keyword: "cuaca", response: "Maaf, saya tidak dapat memberikan informasi cuaca real-time. Silakan cek aplikasi atau situs cuaca." },
                        { keyword: "bantuan", response: "Saya siap membantu Anda! Silakan ajukan pertanyaan apa pun." },
                        
                        // Default Response
                        { keyword: "default", response: "Menarik! Bisa Anda jelaskan lebih detail? Saya siap mendengarkan." },
                        // Kategori Umum
                
                            { keyword: "bantuan", response: "Selamat datang di layanan pelanggan kami. Ada yang bisa saya bantu hari ini?" },
                            { keyword: "informasi", response: "Kami siap memberikan informasi lengkap seputar layanan kami." },
                            { keyword: "jam layanan", response: "Layanan pelanggan kami buka Senin-Jumat pukul 08.00-17.00 WIB." },
                

                            { keyword: "cara pesan", response: "Untuk melakukan pemesanan, Anda dapat:\n1. Kunjungi website kami\n2. Pilih produk\n3. Tambahkan ke keranjang\n4. Lakukan pembayaran" },
                            { keyword: "status pesanan", response: "Untuk mengetahui status pesanan, silakan masukkan nomor pesanan Anda di halaman pelacakan pesanan." },
                            { keyword: "batalkan pesanan", response: "Pesanan dapat dibatalkan maksimal 1 jam setelah pemesanan. Silakan hubungi tim kami untuk bantuan lebih lanjut." },
                
                    
                
                            { keyword: "metode bayar", response: "Kami menerima pembayaran melalui:\n- Transfer Bank\n- Kartu Kredit\n- E-Wallet\n- Pembayaran COD" },
                            { keyword: "konfirmasi transfer", response: "Untuk konfirmasi pembayaran, silakan unggah bukti transfer di halaman akun Anda atau hubungi tim support." },
                            { keyword: "refund", response: "Proses pengembalian dana memakan waktu 3-5 hari kerja setelah diverifikasi tim kami." },
                
                    
                
                            { keyword: "biaya kirim", response: "Biaya pengiriman dihitung berdasarkan berat, jarak, dan metode pengiriman yang dipilih." },
                            { keyword: "lacak paket", response: "Anda dapat melacak paket dengan memasukkan nomor resi di halaman pelacakan kami." },
                            { keyword: "estimasi sampai", response: "Estimasi pengiriman berkisar 2-5 hari kerja tergantung lokasi Anda." },
                
                
                            { keyword: "garansi", response: "Semua produk kami dilengkapi garansi resmi selama 1 tahun untuk kerusakan pabrikasi." },
                            { keyword: "stok", response: "Stok produk dapat Anda lihat secara real-time di halaman produk masing-masing." },
                            { keyword: "pertukaran", response: "Barang dapat ditukar dalam 7 hari setelah pembelian dengan kondisi barang masih original." },
            
                            { keyword: "komplain", response: "Kami sangat menyesalkan ketidaknyamanan Anda. Silakan jelaskan masalah secara detail." },
                            { keyword: "rusak", response: "Jika produk rusak, silakan kirimkan dokumentasi foto dan kami akan segera memproses penukaran." },
                            { keyword: "salah kirim", response: "Untuk kesalahan pengiriman, kami akan segera mengirimkan ulang produk yang benar." },
                    ];
                }

                // Fuzzy Matching untuk menemukan respons terbaik
                findBestMatch(userMessage) {
                    let bestMatch = { response: this.dataset.find(d => d.keyword === "default").response, score: 0 };
                    userMessage = userMessage.toLowerCase();

                    for (const entry of this.dataset) {
                        const keyword = entry.keyword.toLowerCase();
                        const score = this.calculateSimilarity(userMessage, keyword);

                        if (score > bestMatch.score) {
                            bestMatch = { response: entry.response, score };
                        }
                    }
                    return bestMatch.response;
                }

                // Algoritma menghitung kesamaan menggunakan panjang kata kunci dan pesan
                calculateSimilarity(message, keyword) {
                    const messageWords = message.split(" ");
                    const keywordWords = keyword.split(" ");
                    const intersection = messageWords.filter(word => keywordWords.includes(word));
                    return intersection.length / Math.max(messageWords.length, keywordWords.length);
                }

                async generateResponse(userMessage) {
                    const bestMatch = this.findBestMatch(userMessage);
                    
                    if (bestMatch === this.dataset.find(d => d.keyword === "default").response) {
                        // Jika tidak ada kecocokan, gunakan respons fallback
                        return `Maaf, saya tidak yakin. Bisakah Anda menjelaskan lebih detail tentang: \"${userMessage}\"?`;
                    }

                    return bestMatch;
                }

                async sendMessage(userMessage) {
                    this.addMessageToChat('user', userMessage);
                    const aiResponse = await this.generateResponse(userMessage);

                    setTimeout(() => {
                        this.addMessageToChat('ai', aiResponse);
                    }, 1000);
                }

                addMessageToChat(type, message) {
                    const messageElement = document.createElement('div');
                    messageElement.classList.add('flex', 'items-start', 'mb-4');

                    if (type === 'ai') {
                        messageElement.innerHTML = `
                            <img src="${this.currentPersonality.avatar}" class="w-10 h-10 rounded-full mr-3" alt="AI Avatar">
                            <div class="bg-gray-700 p-3 rounded-lg max-w-[80%]">
                                <p class="text-white">${message}</p>
                            </div>
                        `;
                    } else {
                        messageElement.innerHTML = `
                            <div class="bg-blue-600 ml-auto p-3 rounded-lg max-w-[80%] text-right">
                                <p class="text-white">${message}</p>
                            </div>
                        `;
                    }

                    chatContainer.appendChild(messageElement);
                    chatContainer.scrollTop = chatContainer.scrollHeight;
                }
            }

            // Inisialisasi AI Assistant
            const aiAssistant = new AIAssistant();

            // Event Listeners
            sendButton.addEventListener('click', () => sendMessage());
            userInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') sendMessage();
            });

            function sendMessage() {
                const message = userInput.value.trim();
                if (message) {
                    aiAssistant.sendMessage(message);
                    userInput.value = '';
                }
            }
        });
