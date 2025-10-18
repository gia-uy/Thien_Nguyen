// ========== Mobile menu toggle ==========
const mobileBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
mobileBtn?.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));

// ========== Back to top button ==========
const backTop = document.getElementById('backTop');
window.addEventListener('scroll', () => {
  backTop.classList.toggle('hidden', window.scrollY < 500);
});
backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ========== Copy bank info ==========
const copyBtn = document.getElementById('copyBank');
const copyMsg = document.getElementById('copyMsg');
copyBtn?.addEventListener('click', async () => {
  const text = `Chủ TK: Qũy Chung Tay Cứu Trợ\nSTK: 0123456789\nNH: ABC Bank – CN Hà Nội\nNội dung: UngHo_BaoLu_[HọTên]`;
  try {
    await navigator.clipboard.writeText(text);
    copyMsg.classList.remove('hidden');
    setTimeout(() => copyMsg.classList.add('hidden'), 2000);
  } catch (e) {
    alert('Không thể sao chép trên trình duyệt này.');
  }
});

// ========== Donate quick buttons & progress mock ==========
const donateInput = document.getElementById('donateInput');
const donateMsg = document.getElementById('donateMsg');
const progressBar = document.getElementById('progressBar');
const raisedLabel = document.getElementById('raisedLabel');
const progressText = document.getElementById('progressText');
let raised = 0; // demo only
const goal = 500_000_000;

document.querySelectorAll('.donate-quick').forEach(btn => {
  btn.addEventListener('click', () => {
    donateInput.value = btn.dataset.amount;
    donateInput.focus();
  });
});

function formatCurrency(v) {
  return new Intl.NumberFormat('vi-VN').format(v) + '₫';
}

function updateProgress() {
  const percent = Math.min(100, Math.round((raised / goal) * 100));
  progressBar.style.width = percent + '%';
  raisedLabel.textContent = 'Đã gây quỹ: ' + formatCurrency(raised);
  progressText.textContent = percent + '% mục tiêu';
}

document.getElementById('donateBtn')?.addEventListener('click', (e) => {
  e.preventDefault();
  const amount = parseInt(donateInput.value || '0', 10);
  if (!amount || amount < 10000) {
    alert('Vui lòng nhập số tiền hợp lệ (≥ 10.000₫).');
    return;
  }
  raised += amount;
  updateProgress();
  donateMsg.classList.remove('hidden');
  setTimeout(() => donateMsg.classList.add('hidden'), 1800);
  donateInput.value = '';
});

// ========== Donate modal ==========
const donateModal = document.getElementById('donateModal');
const openDonateModal = document.getElementById('openDonateModal');
const openDonateModal2 = document.getElementById('openDonateModal2');
const closeDonateModal = document.getElementById('closeDonateModal');
const modalDonateDone = document.getElementById('modalDonateDone');

function toggleModal(show) {
  donateModal.classList.toggle('hidden', !show);
  donateModal.classList.toggle('flex', show);
}
[openDonateModal, openDonateModal2].forEach(btn => btn?.addEventListener('click', () => toggleModal(true)));
closeDonateModal?.addEventListener('click', () => toggleModal(false));
donateModal?.addEventListener('click', (e) => { if (e.target === donateModal) toggleModal(false); });
modalDonateDone?.addEventListener('click', () => { toggleModal(false); alert('Cảm ơn bạn! (Demo)'); });

// ========== Volunteer form validate (simple) ==========
document.getElementById('volForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const agree = document.getElementById('agree');
  if (!agree.checked) {
    alert('Vui lòng đồng ý cho phép sử dụng thông tin để liên hệ.');
    return;
  }
  document.getElementById('volMsg').classList.remove('hidden');
  e.target.reset();
  document.getElementById('agree').checked = false;
  setTimeout(() => document.getElementById('volMsg').classList.add('hidden'), 2500);
});

// Initialize demo progress on load
updateProgress();
