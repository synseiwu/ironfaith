document.getElementById('year').textContent = new Date().getFullYear();

function toggleMenu() {
  document.getElementById('mainNav').classList.toggle('open');
}

document.querySelectorAll('nav a').forEach((link) => {
  link.addEventListener('click', () => {
    document.getElementById('mainNav').classList.remove('open');
  });
});

const quoteForm = document.getElementById('quoteForm');
const formStatus = document.getElementById('formStatus');

quoteForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  formStatus.textContent = 'Sending your request...';
  formStatus.className = 'form-status';

  const formData = new FormData(quoteForm);
  const payload = Object.fromEntries(formData.entries());

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Something went wrong.');
    }

    formStatus.textContent = 'Thank you. Your request has been sent. Iron Faith Development Group will contact you soon.';
    formStatus.className = 'form-status success';
    quoteForm.reset();
  } catch (error) {
    formStatus.textContent = error.message || 'Unable to send right now. Please call or email Iron Faith Development Group directly.';
    formStatus.className = 'form-status error';
  }
});
