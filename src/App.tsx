import { useEffect, useMemo, useRef, useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { ResumePDF } from "components/Resume/ResumePDF";
import {
  useRegisterReactPDFFont,
  useRegisterReactPDFHyphenationCallback
} from "components/fonts/hooks";
import { initialSettings } from "lib/redux/settingsSlice";
import type {
  JsonResumeAward,
  JsonResumeBasics,
  JsonResumeCertificate,
  JsonResumeCoverLetter,
  JsonResumeCoverLetterAddress,
  JsonResumeCoverLetterBodyBlock,
  JsonResumeEducation,
  JsonResumeInterest,
  JsonResumeLanguage,
  JsonResumeLocation,
  JsonResumeMeta,
  JsonResumeProfile,
  JsonResumeProject,
  JsonResumePublication,
  JsonResumeReference,
  JsonResumeSkill,
  JsonResumeVolunteer,
  JsonResumeWork,
  Resume
} from "lib/redux/types";
import "./App.css";

const seedJson = `{  "basics": {
    "name": "Alex Thompson",
    "label": "Senior Full-Stack Developer",
    "email": "alex.thompson@example.com",
    "phone": "(555) 555-5555",
    "url": "https://at.example.com",
    "summary": "Senior full-stack developer with 7+ years of experience building scalable web applications and self-hosted infrastructure. Passionate about open-source software, privacy-focused technologies, and backend architecture. Proven track record of leading technical initiatives and mentoring junior developers.",
    "location": {
      "city": "Vancouver",
      "countryCode": "CA"
    }
  },
  "work": [
    {
      "name": "TechCorp Solutions",
      "position": "Senior Full-Stack Developer",
      "url": "https://techcorpsolutions.com",
      "startDate": "2022-03",
      "endDate": "",
      "summary": "Leading development of enterprise SaaS platform serving 50K+ users",
      "highlights": [
        "Architected and deployed self-hosted backend infrastructure using Docker and PostgreSQL, reducing cloud costs by 40%",
        "Migrated frontend application from JavaScript to TypeScript, improving type safety and developer productivity",
        "Implemented CI/CD pipelines with GitHub Actions, reducing deployment time from hours to minutes",
        "Mentored 3 junior developers and conducted code reviews for team of 8 engineers"
      ]
    },
    {
      "name": "DataFlow Systems",
      "position": "Full-Stack Developer",
      "url": "https://dataflowsystems.io",
      "startDate": "2019-06",
      "endDate": "2022-02",
      "summary": "Built real-time data synchronization platform for enterprise clients",
      "highlights": [
        "Developed RESTful and GraphQL APIs handling 1M+ requests daily using Node.js and Express",
        "Created responsive web interfaces with React, Redux, and modern CSS frameworks",
        "Optimized database queries reducing average response time by 60%",
        "Implemented comprehensive test coverage increasing stability from 92% to 99.5% uptime"
      ]
    },
    {
      "name": "WebStart Agency",
      "position": "Junior Full-Stack Developer",
      "url": "https://webstartagency.com",
      "startDate": "2018-01",
      "endDate": "2019-05",
      "summary": "Developed custom web applications for small to medium-sized businesses",
      "highlights": [
        "Built 15+ client websites using modern JavaScript frameworks and CMS platforms",
        "Collaborated with designers and project managers to deliver projects on time and within budget",
        "Maintained and updated legacy codebases with bug fixes and feature enhancements"
      ]
    }
  ],
  "volunteer": [
    {
      "organization": "Open Source Collective",
      "position": "Contributor",
      "url": "https://opensource.org",
      "startDate": "2020-01",
      "endDate": "",
      "summary": "Active contributor to various open-source projects focused on privacy and self-hosting",
      "highlights": [
        "Contributed 200+ commits to self-hosting tools and backend frameworks",
        "Maintained documentation and onboarding guides for new contributors",
        "Provided code reviews and technical guidance to community members"
      ]
    }
  ],
  "education": [
    {
      "institution": "British Columbia Institute of Technology",
      "url": "https://bcit.ca",
      "area": "Computer Systems Technology",
      "studyType": "Diploma",
      "startDate": "2015-09",
      "endDate": "2017-12",
      "score": "3.8",
      "courses": [
        "Data Structures and Algorithms",
        "Database Systems",
        "Web Development",
        "Software Engineering Principles"
      ]
    }
  ],
  "awards": [
    {
      "title": "Employee of the Quarter",
      "date": "2023-09",
      "awarder": "TechCorp Solutions",
      "summary": "Recognized for leading successful migration of legacy systems to modern architecture"
    }
  ],
  "certificates": [
    {
      "name": "AWS Certified Solutions Architect - Associate",
      "date": "2023-05",
      "issuer": "Amazon Web Services",
      "url": "https://aws.amazon.com/certification/"
    },
    {
      "name": "Docker Certified Associate",
      "date": "2022-08",
      "issuer": "Docker Inc.",
      "url": "https://training.mirantis.com/certification/dca-certification-exam/"
    }
  ],
  "publications": [
    {
      "name": "Self-Hosting Best Practices for Small Teams",
      "publisher": "Dev.to",
      "releaseDate": "2024-11",
      "url": "https://dev.to/alexthompson/self-hosting-guide",
      "summary": "Comprehensive guide on setting up self-hosted infrastructure with Docker and privacy-focused tools"
    }
  ],
  "skills": [
    {
      "name": "Backend Development",
      "level": "Expert",
      "keywords": [
        "Node.js",
        "Express",
        "GraphQL",
        "REST APIs",
        "PostgreSQL",
        "MongoDB",
        "Redis"
      ]
    },
    {
      "name": "Frontend Development",
      "level": "Advanced",
      "keywords": [
        "React",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "HTML5",
        "CSS3",
        "Tailwind CSS"
      ]
    },
    {
      "name": "DevOps & Infrastructure",
      "level": "Advanced",
      "keywords": [
        "Docker",
        "Podman",
        "GitHub Actions",
        "CI/CD",
        "Linux",
        "Alpine",
        "Nginx",
        "Self-hosting"
      ]
    }
  ],
  "languages": [
    {
      "language": "English",
      "fluency": "Native speaker"
    },
    {
      "language": "French",
      "fluency": "Professional working proficiency"
    }
  ],
  "interests": [
    {
      "name": "Open Source",
      "keywords": [
        "Self-hosting",
        "Privacy tools",
        "Backend frameworks",
        "DevOps automation"
      ]
    },
    {
      "name": "Game Development",
      "keywords": [
        "Godot Engine",
        "Indie games",
        "Game design"
      ]
    },
    {
      "name": "Outdoor Activities",
      "keywords": [
        "Hiking",
        "Running",
        "Travel"
      ]
    }
  ],
  "references": [
    {
      "name": "Sarah Mitchell",
      "reference": "Alex is an exceptional developer who consistently delivers high-quality work. Their expertise in backend architecture and mentorship skills make them an invaluable team member."
    },
    {
      "name": "James Chen",
      "reference": "Working with Alex was a pleasure. They brought fresh ideas to our infrastructure and significantly improved our deployment processes. Highly recommend."
    }
  ],
  "projects": [
    {
      "name": "DevPortfolio",
      "description": "Modern portfolio template built with Next.js and TypeScript",
      "highlights": [
        "Built with Next.js 14, TypeScript, and Tailwind CSS",
        "Deployed on self-hosted infrastructure with Docker",
        "Optimized for performance and SEO"
      ],
      "keywords": [
        "Next.js",
        "TypeScript",
        "React",
        "Tailwind CSS"
      ],
      "startDate": "2024-01",
      "endDate": "2024-03",
      "url": "https://github.com/alexthompson/devportfolio",
      "roles": [
        "Creator",
        "Maintainer"
      ],
      "entity": "Personal Project",
      "type": "application"
    },
    {
      "name": "SelfHost Manager",
      "description": "CLI tool for managing self-hosted services with Docker Compose",
      "highlights": [
        "Simplifies deployment of common self-hosted applications",
        "Built with Node.js and includes automated backup functionality",
        "Used by 500+ self-hosters in the community"
      ],
      "keywords": [
        "Node.js",
        "Docker",
        "CLI",
        "Self-hosting"
      ],
      "startDate": "2023-06",
      "endDate": "",
      "url": "https://github.com/alexthompson/selfhost-manager",
      "roles": [
        "Lead Developer"
      ],
      "entity": "Open Source",
      "type": "tool"
    }
  ],
  "meta": {
    "canonical": "https://raw.githubusercontent.com/alexthompson/resume/main/resume.json",
    "version": "v1.0.0",
    "lastModified": "2026-02-13T22:46:00.000Z"
  },
  "x-coverLetter": {
    "companyName": "Innovative Tech Inc",
    "companyAddress": [
      "789 Technology Drive",
      "Floor 12",
      "Vancouver, BC V6B 4N8"
    ],
    "body": [
      "I am excited to apply for the Senior Full-Stack Developer position at Innovative Tech Inc. With over 7 years of experience building scalable web applications and a passion for self-hosted infrastructure, I am confident I can contribute significantly to your team.",
      [
        "Architected self-hosted backend systems reducing operational costs by 40%",
        "Led TypeScript migration improving code quality and developer productivity",
        "Implemented comprehensive CI/CD pipelines with GitHub Actions",
        "Mentored junior developers and fostered collaborative team culture"
      ],
      "I am particularly drawn to your company's commitment to open-source technologies and privacy-focused solutions. I would welcome the opportunity to discuss how my experience with modern web technologies and infrastructure can help drive your projects forward.",
      "Thank you for your time and consideration. I look forward to speaking with you."
    ],
    "signoff": "Sincerely,",
    "signatureName": "Alex Thompson",
    "signatureImage": "https://example.com/alexthompsonsignature.png"
  }
}`

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

const asString = (value: unknown, fallback = ""): string => {
  return typeof value === "string" ? value : fallback;
};

const asStringArray = (value: unknown): string[] => {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.filter((entry): entry is string => typeof entry === "string");
};

const isValidUrl = (value: string): boolean => {
  if (!value.trim()) {
    return false;
  }

  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

const asCoverLetterBody = (value: unknown): JsonResumeCoverLetterBodyBlock[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.reduce<JsonResumeCoverLetterBodyBlock[]>((blocks, entry) => {
    if (typeof entry === "string") {
      if (entry.trim()) {
        blocks.push(entry);
      }
      return blocks;
    }
    if (Array.isArray(entry)) {
      const points = entry.filter((point): point is string => typeof point === "string");
      if (points.length > 0) {
        blocks.push(points);
      }
      return blocks;
    }
    return blocks;
  }, []);
};

const normalizeCoverLetterAddress = (value: unknown): JsonResumeCoverLetterAddress => {
  if (Array.isArray(value)) {
    return value.filter((entry): entry is string => typeof entry === "string");
  }

  if (typeof value === "string") {
    return isValidUrl(value) ? { url: value, label: "" } : [value];
  }

  if (isRecord(value)) {
    return {
      url: asString(value.url),
      label: asString(value.label)
    };
  }

  return [];
};

const normalizeCoverLetter = (value: unknown): JsonResumeCoverLetter | null => {
  if (!isRecord(value)) {
    return null;
  }

  const rawSignatureImage = isRecord(value.signatureImage)
    ? asString(value.signatureImage.url)
    : asString(value.signatureImage);
  let signatureImage = rawSignatureImage;
  if (isValidUrl(rawSignatureImage)) {
    try {
      const url = new URL(rawSignatureImage);
      const hostname = url.hostname.toLowerCase();
      if (hostname === "example.com" || hostname.endsWith(".example.com")) {
        const fileName = url.pathname.split("/").filter(Boolean).at(-1) ?? "";
        signatureImage = fileName ? `./${fileName}` : "./";
      }
    } catch {
      // Ignore malformed URL and keep original value.
    }
  }

  return {
    companyName: asString(value.companyName),
    companyAddress: normalizeCoverLetterAddress(value.companyAddress),
    body: asCoverLetterBody(value.body),
    signoff: asString(value.signoff),
    signatureName: asString(value.signatureName),
    signatureImage
  };
};

const normalizeLocation = (value: unknown): JsonResumeLocation => {
  const input = isRecord(value) ? value : {};
  return {
    address: asString(input.address),
    postalCode: asString(input.postalCode),
    city: asString(input.city),
    countryCode: asString(input.countryCode),
    region: asString(input.region)
  };
};

const normalizeProfile = (value: unknown): JsonResumeProfile => {
  const input = isRecord(value) ? value : {};
  return {
    network: asString(input.network),
    username: asString(input.username),
    url: asString(input.url)
  };
};

const normalizeBasics = (value: unknown): JsonResumeBasics => {
  const input = isRecord(value) ? value : {};
  return {
    name: asString(input.name),
    label: asString(input.label),
    image: asString(input.image),
    email: asString(input.email),
    phone: asString(input.phone),
    url: asString(input.url),
    summary: asString(input.summary),
    location: normalizeLocation(input.location),
    profiles: Array.isArray(input.profiles)
      ? input.profiles.map(normalizeProfile)
      : []
  };
};

const normalizeWork = (value: unknown): JsonResumeWork => {
  const input = isRecord(value) ? value : {};
  return {
    name: asString(input.name),
    location: asString(input.location),
    description: asString(input.description),
    position: asString(input.position),
    url: asString(input.url),
    startDate: asString(input.startDate),
    endDate: asString(input.endDate),
    summary: asString(input.summary),
    highlights: asStringArray(input.highlights)
  };
};

const normalizeVolunteer = (value: unknown): JsonResumeVolunteer => {
  const input = isRecord(value) ? value : {};
  return {
    organization: asString(input.organization),
    position: asString(input.position),
    url: asString(input.url),
    startDate: asString(input.startDate),
    endDate: asString(input.endDate),
    summary: asString(input.summary),
    highlights: asStringArray(input.highlights)
  };
};

const normalizeEducation = (value: unknown): JsonResumeEducation => {
  const input = isRecord(value) ? value : {};
  return {
    institution: asString(input.institution),
    url: asString(input.url),
    area: asString(input.area),
    studyType: asString(input.studyType),
    startDate: asString(input.startDate),
    endDate: asString(input.endDate),
    score: asString(input.score),
    courses: asStringArray(input.courses)
  };
};

const normalizeAward = (value: unknown): JsonResumeAward => {
  const input = isRecord(value) ? value : {};
  return {
    title: asString(input.title),
    date: asString(input.date),
    awarder: asString(input.awarder),
    summary: asString(input.summary)
  };
};

const normalizeCertificate = (value: unknown): JsonResumeCertificate => {
  const input = isRecord(value) ? value : {};
  return {
    name: asString(input.name),
    date: asString(input.date),
    issuer: asString(input.issuer),
    url: asString(input.url)
  };
};

const normalizePublication = (value: unknown): JsonResumePublication => {
  const input = isRecord(value) ? value : {};
  return {
    name: asString(input.name),
    publisher: asString(input.publisher),
    releaseDate: asString(input.releaseDate),
    url: asString(input.url),
    summary: asString(input.summary)
  };
};

const normalizeSkill = (value: unknown): JsonResumeSkill => {
  const input = isRecord(value) ? value : {};
  return {
    name: asString(input.name),
    level: asString(input.level),
    keywords: asStringArray(input.keywords)
  };
};

const normalizeLanguage = (value: unknown): JsonResumeLanguage => {
  const input = isRecord(value) ? value : {};
  return {
    language: asString(input.language),
    fluency: asString(input.fluency)
  };
};

const normalizeInterest = (value: unknown): JsonResumeInterest => {
  const input = isRecord(value) ? value : {};
  return {
    name: asString(input.name),
    keywords: asStringArray(input.keywords)
  };
};

const normalizeReference = (value: unknown): JsonResumeReference => {
  const input = isRecord(value) ? value : {};
  return {
    name: asString(input.name),
    reference: asString(input.reference)
  };
};

const normalizeProject = (value: unknown): JsonResumeProject => {
  const input = isRecord(value) ? value : {};
  return {
    name: asString(input.name),
    description: asString(input.description),
    highlights: asStringArray(input.highlights),
    keywords: asStringArray(input.keywords),
    startDate: asString(input.startDate),
    endDate: asString(input.endDate),
    url: asString(input.url),
    roles: asStringArray(input.roles),
    entity: asString(input.entity),
    type: asString(input.type)
  };
};

const normalizeMeta = (value: unknown): JsonResumeMeta => {
  const input = isRecord(value) ? value : {};
  return {
    canonical: asString(input.canonical),
    version: asString(input.version, "v1.0.0"),
    lastModified: asString(input.lastModified)
  };
};

const normalizeResume = (value: unknown): Resume => {
  const input = isRecord(value) ? value : {};
  const coverLetter = normalizeCoverLetter(input["x-coverLetter"]);

  return {
    basics: normalizeBasics(input.basics),
    work: Array.isArray(input.work) ? input.work.map(normalizeWork) : [],
    volunteer: Array.isArray(input.volunteer)
      ? input.volunteer.map(normalizeVolunteer)
      : [],
    education: Array.isArray(input.education)
      ? input.education.map(normalizeEducation)
      : [],
    awards: Array.isArray(input.awards) ? input.awards.map(normalizeAward) : [],
    certificates: Array.isArray(input.certificates)
      ? input.certificates.map(normalizeCertificate)
      : [],
    publications: Array.isArray(input.publications)
      ? input.publications.map(normalizePublication)
      : [],
    skills: Array.isArray(input.skills) ? input.skills.map(normalizeSkill) : [],
    languages: Array.isArray(input.languages)
      ? input.languages.map(normalizeLanguage)
      : [],
    interests: Array.isArray(input.interests)
      ? input.interests.map(normalizeInterest)
      : [],
    references: Array.isArray(input.references)
      ? input.references.map(normalizeReference)
      : [],
    projects: Array.isArray(input.projects)
      ? input.projects.map(normalizeProject)
      : [],
    meta: normalizeMeta(input.meta),
    "x-coverLetter": coverLetter
  };
};

const parseResume = (raw: string): { value: Resume | null; error: string | null } => {
  try {
    const parsed = JSON.parse(raw) as unknown;
    return { value: normalizeResume(parsed), error: null };
  } catch {
    return { value: null, error: "Invalid JSON. Fix syntax before downloading." };
  }
};

function App() {
  const [rawJson, setRawJson] = useState(seedJson);
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadVariant, setDownloadVariant] = useState<"resume" | "cover-letter" | "combined" | null>(
    null
  );
  const [isPreviewGenerating, setIsPreviewGenerating] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewError, setPreviewError] = useState<string | null>(null);
  const previewUrlRef = useRef<string | null>(null);

  const parsed = useMemo(() => parseResume(rawJson), [rawJson]);

  useRegisterReactPDFFont();
  useRegisterReactPDFHyphenationCallback(initialSettings.fontFamily);

  const createPdfDocument = (
    resume: Resume,
    mode: "resume" | "cover-letter" | "combined"
  ) => (
    <ResumePDF
      resume={resume}
      settings={initialSettings}
      isPDF={true}
      mode={mode}
    />
  );

  const setNextPreviewUrl = (nextUrl: string | null) => {
    setPreviewUrl((previousUrl) => {
      if (previousUrl) {
        URL.revokeObjectURL(previousUrl);
      }
      previewUrlRef.current = nextUrl;
      return nextUrl;
    });
  };

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!parsed.value) {
      setIsPreviewGenerating(false);
      setPreviewError(parsed.error);
      setNextPreviewUrl(null);
      return;
    }

    const resume = parsed.value;
    let isCancelled = false;
    const timeoutId = window.setTimeout(async () => {
      setIsPreviewGenerating(true);
      setPreviewError(null);
      try {
        const blob = await pdf(createPdfDocument(resume, "combined")).toBlob();
        if (isCancelled) {
          return;
        }
        setNextPreviewUrl(URL.createObjectURL(blob));
      } catch {
        if (!isCancelled) {
          setPreviewError("Unable to generate preview.");
          setNextPreviewUrl(null);
        }
      } finally {
        if (!isCancelled) {
          setIsPreviewGenerating(false);
        }
      }
    }, 300);

    return () => {
      isCancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [parsed.value, parsed.error]);

  const hasCoverLetter = Boolean(parsed.value?.["x-coverLetter"]);

  const onDownload = async (mode: "resume" | "cover-letter" | "combined") => {
    if (!parsed.value || isGenerating) {
      return;
    }

    if (mode === "cover-letter" && !hasCoverLetter) {
      return;
    }

    setIsGenerating(true);
    setDownloadVariant(mode);
    try {
      const blob = await pdf(createPdfDocument(parsed.value, mode)).toBlob();
      const name = parsed.value.basics.name.trim() || "resume";
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      if (mode === "resume") {
        anchor.download = `${name}-resume.pdf`;
      } else if (mode === "cover-letter") {
        anchor.download = `${name}-cover-letter.pdf`;
      } else {
        anchor.download = `${name}-resume-cover-letter.pdf`;
      }
      anchor.click();
      URL.revokeObjectURL(url);
    } finally {
      setIsGenerating(false);
      setDownloadVariant(null);
    }
  };

  return (
    <main className="app-shell">
      <h1>JSON Resume to PDF</h1>
      <p className="helper-text">
        Paste a JSON Resume object using top-level keys like <code>basics</code>, <code>work</code>, and <code>education</code>.{" "}
        Add <code>x-coverLetter</code> to include a cover letter page.
      </p>
      <section className="editor-preview-grid">
        <div className="panel">
          <h2>Resume JSON</h2>
          <textarea
            className="json-input"
            value={rawJson}
            onChange={(event) => setRawJson(event.target.value)}
            spellCheck={false}
          />
        </div>
        <div className="panel">
          <h2>PDF Preview</h2>
          <div className="preview-shell">
            {previewUrl ? (
              <iframe
                className="preview-frame"
                src={previewUrl}
                title="Resume PDF preview"
              />
            ) : (
              <p className="preview-placeholder">
                {previewError ?? "Preview unavailable."}
              </p>
            )}
          </div>
          <p className="status">
            {isPreviewGenerating ? "Updating preview..." : "Preview is synced with valid JSON input."}
          </p>
        </div>
      </section>
      <p className={parsed.error ? "status error" : "status ok"}>
        {parsed.error ?? "JSON is valid. Ready to download."}
      </p>
      <div className="actions">
        <button
          type="button"
          disabled={Boolean(parsed.error) || isGenerating}
          onClick={() => onDownload("resume")}
        >
          {isGenerating && downloadVariant === "resume" ? "Generating Resume..." : "Download Resume"}
        </button>
        <button
          type="button"
          disabled={Boolean(parsed.error) || isGenerating || !hasCoverLetter}
          onClick={() => onDownload("cover-letter")}
        >
          {isGenerating && downloadVariant === "cover-letter"
            ? "Generating Cover Letter..."
            : "Download Cover Letter"}
        </button>
        <button
          type="button"
          disabled={Boolean(parsed.error) || isGenerating}
          onClick={() => onDownload("combined")}
        >
          {isGenerating && downloadVariant === "combined"
            ? "Generating Combined PDF..."
            : "Download Resume + Cover Letter"}
        </button>
      </div>
    </main>
  );
}

export default App;
