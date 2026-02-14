import { View } from "@react-pdf/renderer"
import {
  ResumePDFAtomBlock,
  ResumePDFBulletList,
  ResumePDFLink,
  ResumePDFSection,
  ResumePDFSectionHeading,
  ResumePDFText
} from "components/Resume/ResumePDF/common"
import { styles, spacing } from "components/Resume/ResumePDF/styles"
import { formatDateRange, joinNonEmpty } from "lib/redux/resumeFormatting"
import type { JsonResumeEducation } from "lib/redux/types"

export const ResumePDFEducation = ({
  heading,
  education,
  themeColor,
  showBulletPoints,
  isPDF
}: {
  heading: string
  education: JsonResumeEducation[]
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
      {education.map((entry, idx) => {
        const study = joinNonEmpty([entry.studyType, entry.area], " in ")
        const date = formatDateRange(entry.startDate, entry.endDate)

        return (
          <ResumePDFAtomBlock key={idx} style={idx !== 0 ? { marginTop: spacing["2"] } : {}}>
            <View style={{ ...styles.flexCol, gap: spacing["2"] }}>
              {idx === 0 && <ResumePDFSectionHeading themeColor={themeColor} heading={heading} />}
              <View>
                <View style={styles.flexRowBetween}>
                  {entry.url ? (
                    <ResumePDFLink
                      src={entry.url.startsWith("http") ? entry.url : `https://${entry.url}`}
                      isPDF={isPDF}
                    >
                      <ResumePDFText bold={true}>{entry.institution}</ResumePDFText>
                    </ResumePDFLink>
                  ) : (
                    <ResumePDFText bold={true}>{entry.institution}</ResumePDFText>
                  )}
                  <ResumePDFText>{date}</ResumePDFText>
                </View>
                <View style={{ ...styles.flexRowBetween, marginTop: spacing["1"] }}>
                  <ResumePDFText>{study}</ResumePDFText>
                  <ResumePDFText>{entry.score}</ResumePDFText>
                </View>
                {entry.courses.length > 0 && (
                  <View style={{ ...styles.flexCol, marginTop: spacing["1.5"] }}>
                    <ResumePDFBulletList
                      items={entry.courses}
                      showBulletPoints={showBulletPoints}
                    />
                  </View>
                )}
              </View>
            </View>
          </ResumePDFAtomBlock>
        )
      })}
    </ResumePDFSection>
  )
}
