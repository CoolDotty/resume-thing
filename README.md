# resume-thing

Minimal Vite app that converts OpenResume JSON state into a downloadable PDF.

## Input JSON shape

Paste a full app-state object in the textarea:

```json
{
  "resume": {
    "profile": {
      "name": "Jane Doe",
      "email": "jane@example.com",
      "phone": "555-555-5555",
      "url": "https://example.com",
      "summary": "Short summary",
      "location": "New York, NY"
    },
    "workExperiences": [],
    "educations": [],
    "projects": [],
    "skills": {
      "featuredSkills": [],
      "descriptions": []
    },
    "custom": {
      "descriptions": []
    }
  },
  "settings": {
    "themeColor": "#38bdf8",
    "fontFamily": "Roboto",
    "fontSize": "11",
    "documentSize": "Letter",
    "formToShow": {
      "workExperiences": true,
      "educations": true,
      "projects": true,
      "skills": true,
      "custom": false
    },
    "formToHeading": {
      "workExperiences": "WORK EXPERIENCE",
      "educations": "EDUCATION",
      "projects": "PROJECT",
      "skills": "SKILLS",
      "custom": "CUSTOM SECTION"
    },
    "formsOrder": ["workExperiences", "educations", "projects", "skills", "custom"],
    "showBulletPoints": {
      "educations": true,
      "projects": true,
      "skills": true,
      "custom": true
    }
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