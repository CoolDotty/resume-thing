# resume-thing

Minimal Vite app that converts JSON Resume data into a downloadable PDF.

## Input JSON shape

Paste a JSON Resume object in the textarea (v1.0.0 structure):

```json
{
  "basics": {
    "name": "Jane Doe",
    "label": "Software Engineer",
    "email": "jane@example.com",
    "phone": "555-555-5555",
    "url": "https://example.com",
    "summary": "Short summary",
    "location": {
      "city": "New York",
      "region": "NY",
      "countryCode": "US"
    },
    "profiles": [
      {
        "network": "LinkedIn",
        "username": "janedoe",
        "url": "https://linkedin.com/in/janedoe"
      }
    ]
  },
  "work": [],
  "volunteer": [],
  "education": [],
  "awards": [],
  "certificates": [],
  "publications": [],
  "skills": [],
  "languages": [],
  "interests": [],
  "references": [],
  "projects": [],
  "meta": {
    "version": "v1.0.0"
  }
}
```

The app is lenient: missing fields are normalized with defaults.

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run preview
```

## Notes

- React is pinned to `18.2.0` for `@react-pdf/renderer@3.1.10` compatibility.
- Font files must exist in `public/fonts` for PDF rendering.
