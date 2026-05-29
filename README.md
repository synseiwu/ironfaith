# Iron Faith Development Website

Static website prepared for GitHub + Vercel deployment.

## Files

- `index.html` — main site
- `style.css` — site styles
- `script.js` — mobile menu + quote form submit logic
- `api/contact.js` — Vercel serverless function that sends form submissions through Resend
- `assets/iron-faith-logo.jpeg` — logo asset

## Vercel setup

1. Upload this folder to a new GitHub repository.
2. Import the GitHub repo into Vercel.
3. Create a free Resend account and get an API key.
4. In Vercel, go to Project Settings → Environment Variables and add:

```txt
RESEND_API_KEY=your_resend_api_key
CONTACT_TO_EMAIL=IronFaithDevelopment@gmail.com
CONTACT_FROM_EMAIL=Iron Faith Website <onboarding@resend.dev>
```

5. Redeploy the project after adding environment variables.
6. Test the contact form.

## Important note

Using `onboarding@resend.dev` is fine for testing. For a polished client launch, verify the client domain in Resend and change `CONTACT_FROM_EMAIL` to something like:

```txt
CONTACT_FROM_EMAIL=Iron Faith Website <quotes@their-domain.com>
```

## Media update
This version includes one optimized branded construction/development video section using `assets/development-motion.mp4` with a lightweight poster image. The other supplied videos were intentionally not added to avoid overcrowding the page or weakening the existing premium black/gold aesthetic.
