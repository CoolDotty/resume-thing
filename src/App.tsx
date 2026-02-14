import { useEffect, useMemo, useRef, useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { ResumePDF } from "components/Resume/ResumePDF";
import {
  useRegisterReactPDFFont,
  useRegisterReactPDFHyphenationCallback
} from "components/fonts/hooks";
import { initialResumeState } from "lib/redux/resumeDefaults";
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

const seedJson = JSON.stringify(initialResumeState, null, 2);

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

  const signatureImage = isRecord(value.signatureImage)
    ? asString(value.signatureImage.url)
    : asString(value.signatureImage);

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
