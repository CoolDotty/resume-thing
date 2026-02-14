import { Page, View, Document } from "@react-pdf/renderer"
import { styles, spacing } from "components/Resume/ResumePDF/styles"
import { ResumePDFProfile } from "components/Resume/ResumePDF/ResumePDFProfile"
import { ResumePDFWorkExperience } from "components/Resume/ResumePDF/ResumePDFWorkExperience"
import { ResumePDFEducation } from "components/Resume/ResumePDF/ResumePDFEducation"
import { ResumePDFProject } from "components/Resume/ResumePDF/ResumePDFProject"
import { ResumePDFSkills } from "components/Resume/ResumePDF/ResumePDFSkills"
import { DEFAULT_FONT_COLOR } from "lib/redux/settingsSlice"
import type { Settings, ShowForm } from "lib/redux/settingsSlice"
import type { Resume } from "lib/redux/types"
import { SuppressResumePDFErrorMessage } from "components/Resume/ResumePDF/common/SuppressResumePDFErrorMessage"
import { ResumePDFAwards } from "components/Resume/ResumePDF/ResumePDFAwards"
import { ResumePDFCertificates } from "components/Resume/ResumePDF/ResumePDFCertificates"
import { ResumePDFInterests } from "components/Resume/ResumePDF/ResumePDFInterests"
import { ResumePDFLanguages } from "components/Resume/ResumePDF/ResumePDFLanguages"
import { ResumePDFPublications } from "components/Resume/ResumePDF/ResumePDFPublications"
import { ResumePDFReferences } from "components/Resume/ResumePDF/ResumePDFReferences"
import { ResumePDFVolunteer } from "components/Resume/ResumePDF/ResumePDFVolunteer"
import { ResumePDFSummary } from "components/Resume/ResumePDF/ResumePDFSummary"
import { ResumePDFText } from "components/Resume/ResumePDF/common"

export const ResumePDF = ({
  resume,
  settings,
  isPDF = false
}: {
  resume: Resume
  settings: Settings
  isPDF?: boolean
}) => {
  const {
    basics,
    work,
    volunteer,
    education,
    projects,
    awards,
    certificates,
    publications,
    skills,
    languages,
    interests,
    references
  } = resume

  const {
    fontFamily,
    fontSize,
    documentSize,
    formToHeading,
    formToShow,
    formsOrder,
    showBulletPoints
  } = settings

  const name = basics.name || "Resume"
  const label = basics.label.trim()
  const summary = basics.summary.trim()
  const themeColor = settings.themeColor || DEFAULT_FONT_COLOR
  const showFormsOrder = formsOrder.filter((form) => formToShow[form])
  const compactHeaderHeight = spacing[24]

  const formTypeToComponent: { [type in ShowForm]: () => JSX.Element | null } = {
    work: () =>
      work.length > 0 ? (
        <ResumePDFWorkExperience
          heading={formToHeading.work}
          work={work}
          themeColor={themeColor}
          showBulletPoints={showBulletPoints.work}
          isPDF={isPDF}
        />
      ) : null,
    volunteer: () =>
      volunteer.length > 0 ? (
        <ResumePDFVolunteer
          heading={formToHeading.volunteer}
          volunteer={volunteer}
          themeColor={themeColor}
          showBulletPoints={showBulletPoints.volunteer}
          isPDF={isPDF}
        />
      ) : null,
    education: () =>
      education.length > 0 ? (
        <ResumePDFEducation
          heading={formToHeading.education}
          education={education}
          themeColor={themeColor}
          showBulletPoints={showBulletPoints.education}
          isPDF={isPDF}
        />
      ) : null,
    projects: () =>
      projects.length > 0 ? (
        <ResumePDFProject
          heading={formToHeading.projects}
          projects={projects}
          themeColor={themeColor}
          showBulletPoints={showBulletPoints.projects}
          isPDF={isPDF}
        />
      ) : null,
    awards: () =>
      awards.length > 0 ? (
        <ResumePDFAwards heading={formToHeading.awards} awards={awards} themeColor={themeColor} />
      ) : null,
    certificates: () =>
      certificates.length > 0 ? (
        <ResumePDFCertificates
          heading={formToHeading.certificates}
          certificates={certificates}
          themeColor={themeColor}
          isPDF={isPDF}
        />
      ) : null,
    publications: () =>
      publications.length > 0 ? (
        <ResumePDFPublications
          heading={formToHeading.publications}
          publications={publications}
          themeColor={themeColor}
          isPDF={isPDF}
        />
      ) : null,
    skills: () =>
      skills.length > 0 ? (
        <ResumePDFSkills
          heading={formToHeading.skills}
          skills={skills}
          themeColor={themeColor}
          showBulletPoints={showBulletPoints.skills}
        />
      ) : null,
    languages: () =>
      languages.length > 0 ? (
        <ResumePDFLanguages
          heading={formToHeading.languages}
          languages={languages}
          themeColor={themeColor}
        />
      ) : null,
    interests: () =>
      interests.length > 0 ? (
        <ResumePDFInterests
          heading={formToHeading.interests}
          interests={interests}
          themeColor={themeColor}
          showBulletPoints={showBulletPoints.interests}
        />
      ) : null,
    references: () =>
      references.length > 0 ? (
        <ResumePDFReferences
          heading={formToHeading.references}
          references={references}
          themeColor={themeColor}
        />
      ) : null
  }

  return (
    <>
      <Document title={`${name} Resume`} author={name} producer={"OpenResume"}>
        <Page
          size={documentSize === "A4" ? "A4" : "LETTER"}
          style={{
            ...styles.flexCol,
            color: DEFAULT_FONT_COLOR,
            fontFamily,
            fontSize: fontSize + "pt",
            paddingTop: compactHeaderHeight
          }}
        >
          <View style={{ ...styles.flexCol, marginTop: `-${compactHeaderHeight}` }}>
            {Boolean(settings.themeColor) && (
              <View
                style={{
                  width: spacing.full,
                  height: spacing[3.5],
                  backgroundColor: themeColor
                }}
              />
            )}
            <View
              style={{
                ...styles.flexCol,
                padding: `${spacing[2]} ${spacing[16]}`,
                paddingBottom: spacing[3]
              }}
            >
              <ResumePDFProfile basics={basics} themeColor={themeColor} isPDF={isPDF} />
            </View>
          </View>
          <View
            fixed={true}
            style={{
              ...styles.flexCol,
              position: "absolute",
              top: spacing[0],
              left: spacing[0],
              right: spacing[0]
            }}
            render={({ pageNumber }) =>
              pageNumber > 1 ? (
                <>
                  {Boolean(settings.themeColor) && (
                    <View
                      style={{
                        width: spacing.full,
                        height: spacing[3.5],
                        backgroundColor: themeColor
                      }}
                    />
                  )}
                  <View
                    style={{
                      ...styles.flexCol,
                      padding: `${spacing[3]} ${spacing[16]}`,
                      paddingBottom: spacing[3]
                    }}
                  >
                    <ResumePDFText bold={true} themeColor={themeColor} style={{ fontSize: "16pt" }}>
                      {name}
                    </ResumePDFText>
                    {label && (
                      <ResumePDFText style={{ marginTop: spacing[0.5] }}>{label}</ResumePDFText>
                    )}
                  </View>
                </>
              ) : null
            }
          />
          <View
            style={{
              ...styles.flexCol,
              padding: `${spacing[0]} ${spacing[16]} ${spacing[0]} ${spacing[16]}`
            }}
          >
            {summary && <ResumePDFSummary summary={summary} themeColor={themeColor} />}
            {showFormsOrder.map((form) => {
              const Component = formTypeToComponent[form]
              return <Component key={form} />
            })}
          </View>
        </Page>
      </Document>
      <SuppressResumePDFErrorMessage />
    </>
  )
}
