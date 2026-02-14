import { View } from "@react-pdf/renderer"
import {
  ResumePDFAtomBlock,
  ResumePDFBulletList,
  ResumePDFLink,
  ResumePDFSection,
  ResumePDFSectionHeading,
  ResumePDFText
} from "components/Resume/ResumePDF/common"
import { buildEntryAtoms } from "components/Resume/ResumePDF/common/paginationAtoms"
import { styles, spacing } from "components/Resume/ResumePDF/styles"
import { formatDateRange, joinNonEmpty } from "lib/redux/resumeFormatting"
import type { JsonResumeProject } from "lib/redux/types"

export const ResumePDFProject = ({
  heading,
  projects,
  themeColor,
  showBulletPoints,
  isPDF
}: {
  heading: string
  projects: JsonResumeProject[]
  themeColor: string
  showBulletPoints: boolean
  isPDF: boolean
}) => {
  return (
    <ResumePDFSection
      themeColor={themeColor}
      heading={heading}
      showHeading={false}
      style={{ gap: spacing[0] }}
    >
      {projects.map((entry, idx) => {
        const date = formatDateRange(entry.startDate, entry.endDate)
        const meta = joinNonEmpty([entry.entity, entry.type], " - ")
        const atoms = buildEntryAtoms({
          entryIndex: idx,
          highlights: entry.highlights
        })
        const entryCore = (
          <View>
            <View style={styles.flexRowBetween}>
              {entry.url ? (
                <ResumePDFLink
                  src={entry.url.startsWith("http") ? entry.url : `https://${entry.url}`}
                  isPDF={isPDF}
                >
                  <ResumePDFText bold={true}>{entry.name}</ResumePDFText>
                </ResumePDFLink>
              ) : (
                <ResumePDFText bold={true}>{entry.name}</ResumePDFText>
              )}
              <ResumePDFText>{date}</ResumePDFText>
            </View>
            {meta && (
              <View style={{ marginTop: spacing["1"] }}>
                <ResumePDFText>{meta}</ResumePDFText>
              </View>
            )}
            {entry.description && (
              <View style={{ marginTop: spacing["1"] }}>
                <ResumePDFText>{entry.description}</ResumePDFText>
              </View>
            )}
            {atoms[0].highlights.length > 0 && (
              <View style={{ ...styles.flexCol, marginTop: spacing["1.5"] }}>
                <ResumePDFBulletList
                  items={atoms[0].highlights}
                  showBulletPoints={showBulletPoints}
                />
              </View>
            )}
          </View>
        )

        return atoms.map((atom) => (
          <ResumePDFAtomBlock
            key={atom.key}
            style={atom.type === "entryCore" ? (idx !== 0 ? { marginTop: spacing["2"] } : {}) : {}}
          >
            {atom.type === "entryCore" && atom.includeHeading && (
              <View style={{ ...styles.flexCol, gap: spacing["2"] }}>
                <ResumePDFSectionHeading themeColor={themeColor} heading={heading} />
                {entryCore}
              </View>
            )}
            {atom.type === "entryCore" && !atom.includeHeading && entryCore}
            {atom.type === "highlightSingle" && (
              <View style={styles.flexCol}>
                <ResumePDFBulletList items={atom.highlights} showBulletPoints={showBulletPoints} />
              </View>
            )}
          </ResumePDFAtomBlock>
        ))
      })}
    </ResumePDFSection>
  )
}
