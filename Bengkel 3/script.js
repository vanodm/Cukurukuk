document.addEventListener('DOMContentLoaded', function() {
    // Elemen form login/register
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const showRegister = document.getElementById('show-register');
    const showLogin = document.getElementById('show-login');
    const loginFormContainer = document.getElementById('login-form');
    const registerFormContainer = document.getElementById('register-form');
    
    // Elemen dashboard
    const dashboard = document.getElementById('dashboard');
    const loggedInUser = document.getElementById('logged-in-user');
    const logoutBtn = document.getElementById('logout-btn');
    const dashboardContent = document.getElementById('dashboard-content');
    const mainContent = document.querySelector('main');
    const header = document.querySelector('header');

    // Fungsi toggle password
    document.querySelectorAll('.toggle-password').forEach(function(icon) {
        icon.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const passwordInput = document.getElementById(targetId);
            const iconElement = this.querySelector('i');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                iconElement.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                iconElement.classList.replace('fa-eye-slash', 'fa-eye');
            }
        });
    });

    // Event listener untuk form login
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        
        if (loginUser(username, password)) {
            showDashboard(username);
        } else {
            alert('Username atau password salah!');
        }
    });

    // Event listener untuk form register
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        
        if (password !== confirmPassword) {
            alert('Password tidak cocok!');
            return;
        }
        
        if (registerUser(username, password)) {
            alert('Pendaftaran berhasil! Silakan login.');
            registerForm.reset();
            registerFormContainer.classList.add('hidden');
            loginFormContainer.classList.remove('hidden');
        } else {
            alert('Username sudah terdaftar!');
        }
    });

    // Fungsi untuk menampilkan dashboard
    function showDashboard(username) {
        mainContent.classList.add('hidden');
        header.classList.add('hidden');
        dashboard.classList.remove('hidden');
        loggedInUser.textContent = username;
        loadDashboardContent('consultation');
        localStorage.setItem('loggedInUser', username);
    }

    // Fungsi untuk memuat konten dashboard
    function loadDashboardContent(menu) {
        let content = '';
        switch(menu) {
            case 'consultation':
                content = `
                <div class="consultation-content">
                    <h3>Konsultasi Kerusakan</h3>
                    <form id="consultationForm">
                        <div class="form-group">
                            <label>Jenis Kendaraan</label>
                            <select required>
                                <option value="">Pilih Jenis</option>
                                <option value="motor">Motor</option>
                                <option value="mobil">Mobil</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Deskripsi Kerusakan</label>
                            <textarea placeholder="Jelaskan gejala kerusakan..." required></textarea>
                        </div>
                        <button type="submit">Kirim Konsultasi</button>
                    </form>
                </div>`;
                break;
            case 'booking':
                content = `
                <div class="booking-content">
                    <h3>Booking Service</h3>
                    <form id="bookingForm">
                        <div class="form-group">
                            <label>Jenis Service</label>
                            <select required>
                                <option value="">Pilih Service</option>
                                <option value="tune-up">Tune Up</option>
                                <option value="ganti-oli">Ganti Oli</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Tanggal Booking</label>
                            <input type="date" required>
                        </div>
                        <button type="submit">Booking Sekarang</button>
                    </form>
                </div>`;
                break;
            case 'status':
                content = `
                <div class="status-content">
                    <h3>Status Service</h3>
                    <p>Fitur ini sedang dalam pengembangan</p>
                </div>`;
                break;
            case 'payment':
                content = `
                <div class="payment-content">
                    <h3>Pembayaran</h3>
                    <p>Fitur ini sedang dalam pengembangan</p>
                </div>`;
                break;
        }
        dashboardContent.innerHTML = content;
    }

    // Event listener untuk menu dashboard
    document.querySelectorAll('.menu-card').forEach(card => {
        card.addEventListener('click', function() {
            loadDashboardContent(this.id);
        });
    });

    // Event listener untuk logout
    logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('loggedInUser');
        location.reload();
    });

    // Fungsi untuk login user
    function loginUser(username, password) {
        const users = getUsers();
        return users[username] && users[username] === password;
    }

    // Fungsi untuk register user
    function registerUser(username, password) {
        const users = getUsers();
        if (users[username]) return false;
        
        users[username] = password;
        localStorage.setItem('users', JSON.stringify(users));
        return true;
    }

    // Fungsi untuk mendapatkan data user
    function getUsers() {
        return JSON.parse(localStorage.getItem('users') || '{}');
    }

    // Cek status login saat halaman dimuat
    function checkLogin() {
        const user = localStorage.getItem('loggedInUser');
        if (user) showDashboard(user);
    }

    checkLogin();
});