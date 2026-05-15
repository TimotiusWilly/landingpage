// Navigation scroll smooth
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = this.getAttribute('href');
        if (target.startsWith('#')) {
            const element = document.querySelector(target);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Tombol "Laporkan Sekarang" di Hero
document.querySelector('.hero .btn-primary').addEventListener('click', function() {
    bukaFormLaporan();
});

// Tombol "Buka Form Laporan" di CTA
document.querySelector('.cta-section .btn-danger').addEventListener('click', function() {
    bukaFormLaporan();
});

// Function untuk buka form laporan
function bukaFormLaporan() {
    const form = document.createElement('div');
    form.innerHTML = `
        <div style="background: white; padding: 2rem; border-radius: 8px; max-width: 450px; box-shadow: 0 5px 20px rgba(0,0,0,0.3);">
            <h3 style="margin-top: 0; color: #01261f;">Form Laporan Penampakan</h3>
            <input type="text" id="lokasi" placeholder="Lokasi Penampakan" style="width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box;">
            <input type="text" id="deskripsi" placeholder="Deskripsi (Jumlah, Kondisi, dll)" style="width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box;">
            <input type="file" id="foto" accept="image/*" style="width: 100%; margin: 10px 0; padding: 5px;">
            <button id="submitLaporan" style="width: 100%; padding: 12px; background: #ba1a1a; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; margin-top: 10px;">Kirim Laporan</button>
            <button id="batalkan" style="width: 100%; padding: 12px; background: #ddd; color: #333; border: none; border-radius: 4px; cursor: pointer; margin-top: 8px;">Batal</button>
        </div>
    `;
    
    const modal = document.createElement('div');
    modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); display: flex; justify-content: center; align-items: center; z-index: 1000;';
    modal.appendChild(form);
    document.body.appendChild(modal);
    
    document.getElementById('submitLaporan').addEventListener('click', function() {
        const lokasi = document.getElementById('lokasi').value.trim();
        const deskripsi = document.getElementById('deskripsi').value.trim();
        const foto = document.getElementById('foto').files[0];
        
        if (!lokasi || !deskripsi || !foto) {
            alert('Mohon lengkapi semua data termasuk memilih foto!');
            return;
        }
        
        alert('✓ Terima kasih!\nLaporan dari ' + lokasi + ' telah kami catat.\nTim kami akan segera memverifikasinya.');
        simpanLaporan({lokasi, deskripsi, waktu: new Date().toLocaleString('id-ID')});
        modal.remove();
    });
    
    document.getElementById('batalkan').addEventListener('click', function() {
        modal.remove();
    });
}

// Simpan laporan ke localStorage
function simpanLaporan(data) {
    let laporan = JSON.parse(localStorage.getItem('laporan')) || [];
    laporan.push(data);
    localStorage.setItem('laporan', JSON.stringify(laporan));
    console.log('Laporan tersimpan:', data);
}
