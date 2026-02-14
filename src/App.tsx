import { useMemo, useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { ResumePDF } from "components/Resume/ResumePDF";
import {
  useRegisterReactPDFFont,
  useRegisterReactPDFHyphenationCallback
} from "components/fonts/hooks";
import { initialAppState } from "lib/redux/resumeDefaults";
import { initialSettings, type Settings } from "lib/redux/settingsSlice";
import type {
  FeaturedSkill,
  Resume,
  ResumeEducation,
  ResumeProfile,
  ResumeProject,
  ResumeSkills,
  ResumeWorkExperience
} from "lib/redux/types";
import "./App.css";

interface NormalizedAppState {
  resume: Resume;
  settings: Settings;
}

const seedJson = JSON.stringify(initialAppState, null, 2);

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

const normalizeProfile = (value: unknown): ResumeProfile => {
  const input = isRecord(value) ? value : {};
  return {
    name: asString(input.name),
    email: asString(input.email),
    phone: asString(input.phone),
    url: asString(input.url),
    summary: asString(input.summary),
    location: asString(input.location)
  };
};

const normalizeWorkExperience = (value: unknown): ResumeWorkExperience => {
  const input = isRecord(value) ? value : {};
  return {
    company: asString(input.company),
    jobTitle: asString(input.jobTitle),
    date: asString(input.date),
    descriptions: asStringArray(input.descriptions)
  };
};

const normalizeEducation = (value: unknown): ResumeEducation => {
  const input = isRecord(value) ? value : {};
  return {
    school: asString(input.school),
    degree: asString(input.degree),
    date: asString(input.date),
    gpa: asString(input.gpa),
    descriptions: asStringArray(input.descriptions)
  };
};

const normalizeProject = (value: unknown): ResumeProject => {
  const input = isRecord(value) ? value : {};
  return {
    project: asString(input.project),
    date: asString(input.date),
    descriptions: asStringArray(input.descriptions)
  };
};

const normalizeFeaturedSkill = (value: unknown): FeaturedSkill => {
  const input = isRecord(value) ? value : {};
  return {
    skill: asString(input.skill),
    rating: typeof input.rating === "number" ? input.rating : 4
  };
};

const normalizeSkills = (value: unknown): ResumeSkills => {
  const input = isRecord(value) ? value : {};
  return {
    featuredSkills: Array.isArray(input.featuredSkills)
      ? input.featuredSkills.map(normalizeFeaturedSkill)
      : [...initialAppState.resume.skills.featuredSkills],
    descriptions: asStringArray(input.descriptions)
  };
};

const normalizeResume = (value: unknown): Resume => {
  const input = isRecord(value) ? value : {};
  const workExperiences = Array.isArray(input.workExperiences)
    ? input.workExperiences.map(normalizeWorkExperience)
    : [...initialAppState.resume.workExperiences];
  const educations = Array.isArray(input.educations)
    ? input.educations.map(normalizeEducation)
    : [...initialAppState.resume.educations];
  const projects = Array.isArray(input.projects)
    ? input.projects.map(normalizeProject)
    : [...initialAppState.resume.projects];

  return {
    profile: normalizeProfile(input.profile),
    workExperiences: workExperiences.length ? workExperiences : [...initialAppState.resume.workExperiences],
    educations: educations.length ? educations : [...initialAppState.resume.educations],
    projects: projects.length ? projects : [...initialAppState.resume.projects],
    skills: normalizeSkills(input.skills),
    custom: {
      descriptions: isRecord(input.custom) ? asStringArray(input.custom.descriptions) : []
    }
  };
};

const normalizeSettings = (value: unknown): Settings => {
  const input = isRecord(value) ? value : {};
  const formToShow = isRecord(input.formToShow) ? input.formToShow : {};
  const formToHeading = isRecord(input.formToHeading) ? input.formToHeading : {};
  const showBulletPoints = isRecord(input.showBulletPoints) ? input.showBulletPoints : {};
  const formsOrderInput = Array.isArray(input.formsOrder) ? input.formsOrder : [];
  const validForms = ["workExperiences", "educations", "projects", "skills", "custom"] as const;
  const formsOrder = formsOrderInput.filter(
    (entry): entry is Settings["formsOrder"][number] =>
      typeof entry === "string" && (validForms as readonly string[]).includes(entry)
  );

  return {
    themeColor: asString(input.themeColor, initialSettings.themeColor),
    fontFamily: asString(input.fontFamily, initialSettings.fontFamily),
    fontSize: asString(input.fontSize, initialSettings.fontSize),
    documentSize: asString(input.documentSize, initialSettings.documentSize),
    formToShow: {
      workExperiences:
        typeof formToShow.workExperiences === "boolean"
          ? formToShow.workExperiences
          : initialSettings.formToShow.workExperiences,
      educations:
        typeof formToShow.educations === "boolean"
          ? formToShow.educations
          : initialSettings.formToShow.educations,
      projects:
        typeof formToShow.projects === "boolean"
          ? formToShow.projects
          : initialSettings.formToShow.projects,
      skills:
        typeof formToShow.skills === "boolean"
          ? formToShow.skills
          : initialSettings.formToShow.skills,
      custom:
        typeof formToShow.custom === "boolean"
          ? formToShow.custom
          : initialSettings.formToShow.custom
    },
    formToHeading: {
      workExperiences: asString(
        formToHeading.workExperiences,
        initialSettings.formToHeading.workExperiences
      ),
      educations: asString(formToHeading.educations, initialSettings.formToHeading.educations),
      projects: asString(formToHeading.projects, initialSettings.formToHeading.projects),
      skills: asString(formToHeading.skills, initialSettings.formToHeading.skills),
      custom: asString(formToHeading.custom, initialSettings.formToHeading.custom)
    },
    formsOrder: formsOrder.length ? formsOrder : [...initialSettings.formsOrder],
    showBulletPoints: {
      educations:
        typeof showBulletPoints.educations === "boolean"
          ? showBulletPoints.educations
          : initialSettings.showBulletPoints.educations,
      projects:
        typeof showBulletPoints.projects === "boolean"
          ? showBulletPoints.projects
          : initialSettings.showBulletPoints.projects,
      skills:
        typeof showBulletPoints.skills === "boolean"
          ? showBulletPoints.skills
          : initialSettings.showBulletPoints.skills,
      custom:
        typeof showBulletPoints.custom === "boolean"
          ? showBulletPoints.custom
          : initialSettings.showBulletPoints.custom
    }
  };
};

const normalizeAppState = (value: unknown): NormalizedAppState => {
  const input = isRecord(value) ? value : {};
  return {
    resume: normalizeResume(input.resume),
    settings: normalizeSettings(input.settings)
  };
};

const parseAppState = (raw: string): { value: NormalizedAppState | null; error: string | null } => {
  try {
    const parsed = JSON.parse(raw) as unknown;
    return { value: normalizeAppState(parsed), error: null };
  } catch {
    return { value: null, error: "Invalid JSON. Fix syntax before downloading." };
  }
};

function App() {
  const [rawJson, setRawJson] = useState(seedJson);
  const [isGenerating, setIsGenerating] = useState(false);

  const parsed = useMemo(() => parseAppState(rawJson), [rawJson]);
  const normalized = parsed.value ?? initialAppState;

  useRegisterReactPDFFont();
  useRegisterReactPDFHyphenationCallback(normalized.settings.fontFamily);

  const onDownload = async () => {
    if (!parsed.value || isGenerating) {
      return;
    }

    setIsGenerating(true);
    try {
      const pdfDocument = (
        <ResumePDF
          resume={parsed.value.resume}
          settings={parsed.value.settings}
          isPDF={true}
        />
      );
      const blob = await pdf(pdfDocument).toBlob();
      const name = parsed.value.resume.profile.name.trim() || "resume";
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `${name}-resume.pdf`;
      anchor.click();
      URL.revokeObjectURL(url);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main className="app-shell">
      <h1>Resume JSON to PDF</h1>
      <p className="helper-text">
        Paste a full OpenResume state object with top-level <code>resume</code> and <code>settings</code>.
      </p>
      <textarea
        className="json-input"
        value={rawJson}
        onChange={(event) => setRawJson(event.target.value)}
        spellCheck={false}
      />
      <p className={parsed.error ? "status error" : "status ok"}>
        {parsed.error ?? "JSON is valid. Ready to download."}
      </p>
      <button
        type="button"
        disabled={Boolean(parsed.error) || isGenerating}
        onClick={onDownload}
      >
        {isGenerating ? "Generating PDF..." : "Download PDF"}
      </button>
    </main>
  );
}

export default App;
