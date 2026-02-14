import { View } from "@react-pdf/renderer"
import {
  ResumePDFAtomBlock,
  ResumePDFSection,
  ResumePDFSectionHeading,
  ResumePDFText
} from "components/Resume/ResumePDF/common"
import { styles, spacing } from "components/Resume/ResumePDF/styles"
import { joinNonEmpty } from "lib/redux/resumeFormatting"
import type { JsonResumeLanguage } from "lib/redux/types"

export const ResumePDFLanguages = ({
  heading,
  languages,
  themeColor
}: {
  heading: string
  languages: JsonResumeLanguage[]
  themeColor: string
}) => {
  return (
    <ResumePDFSection
      themeColor={themeColor}
      heading={heading}
      showHeading={false}
      style={{ gap: spacing[0] }}
    >
      {languages.map((language, idx) => {
        const text = joinNonEmpty([language.language, language.fluency], " - ")
        return (
          <ResumePDFAtomBlock key={idx} style={idx !== 0 ? { marginTop: spacing["1"] } : {}}>
            <View style={{ ...styles.flexCol, gap: spacing["2"] }}>
              {idx === 0 && <ResumePDFSectionHeading themeColor={themeColor} heading={heading} />}
              <View style={styles.flexCol}>
                <ResumePDFText>{text || language.language}</ResumePDFText>
              </View>
            </View>
          </ResumePDFAtomBlock>
        )
      })}
    </ResumePDFSection>
  )
}
