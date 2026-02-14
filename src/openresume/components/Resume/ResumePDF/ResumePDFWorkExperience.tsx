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
import { formatDateRange } from "lib/redux/resumeFormatting"
import type { JsonResumeWork } from "lib/redux/types"

export const ResumePDFWorkExperience = ({
  heading,
  work,
  themeColor,
  showBulletPoints,
  isPDF
}: {
  heading: string
  work: JsonResumeWork[]
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
      {work.map((entry, idx) => {
        const endDate = entry.endDate.trim() ? entry.endDate : "Present"
        const date = formatDateRange(entry.startDate, endDate)
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
            <View style={{ ...styles.flexRowBetween, marginTop: spacing["1"] }}>
              <ResumePDFText>{entry.position}</ResumePDFText>
              <ResumePDFText>{entry.location}</ResumePDFText>
            </View>
            {entry.summary && (
              <View style={{ marginTop: spacing["1"] }}>
                <ResumePDFText>{entry.summary}</ResumePDFText>
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
