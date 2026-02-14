import { View } from "@react-pdf/renderer"
import {
  ResumePDFAtomBlock,
  ResumePDFSection,
  ResumePDFSectionHeading,
  ResumePDFText
} from "components/Resume/ResumePDF/common"
import { styles, spacing } from "components/Resume/ResumePDF/styles"
import { formatMonthYear } from "lib/redux/resumeFormatting"
import type { JsonResumeAward } from "lib/redux/types"

export const ResumePDFAwards = ({
  heading,
  awards,
  themeColor
}: {
  heading: string
  awards: JsonResumeAward[]
  themeColor: string
}) => {
  return (
    <ResumePDFSection
      themeColor={themeColor}
      heading={heading}
      showHeading={false}
      style={{ gap: spacing[0] }}
    >
      {awards.map((award, idx) => (
        <ResumePDFAtomBlock key={idx} style={idx !== 0 ? { marginTop: spacing["1.5"] } : {}}>
          <View style={{ ...styles.flexCol, gap: spacing["2"] }}>
            {idx === 0 && <ResumePDFSectionHeading themeColor={themeColor} heading={heading} />}
            <View>
              <View style={styles.flexRowBetween}>
                <ResumePDFText bold={true}>{award.title}</ResumePDFText>
                <ResumePDFText>{formatMonthYear(award.date)}</ResumePDFText>
              </View>
              {award.awarder && (
                <View style={{ marginTop: spacing["1"] }}>
                  <ResumePDFText>{award.awarder}</ResumePDFText>
                </View>
              )}
              {award.summary && (
                <View style={{ marginTop: spacing["1"] }}>
                  <ResumePDFText>{award.summary}</ResumePDFText>
                </View>
              )}
            </View>
          </View>
        </ResumePDFAtomBlock>
      ))}
    </ResumePDFSection>
  )
}
