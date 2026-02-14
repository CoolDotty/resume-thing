import { View } from "@react-pdf/renderer"
import {
  ResumePDFAtomBlock,
  ResumePDFSection,
  ResumePDFSectionHeading,
  ResumePDFText
} from "components/Resume/ResumePDF/common"
import { styles } from "components/Resume/ResumePDF/styles"
import { spacing } from "components/Resume/ResumePDF/styles"

export const ResumePDFSummary = ({
  summary,
  themeColor
}: {
  summary: string
  themeColor: string
}) => {
  return (
    <ResumePDFSection
      themeColor={themeColor}
      heading={"SUMMARY"}
      showHeading={false}
      style={{ marginTop: spacing["2"] }}
    >
      <ResumePDFAtomBlock>
        <View style={{ ...styles.flexCol, gap: spacing["2"] }}>
          <ResumePDFSectionHeading themeColor={themeColor} heading={"SUMMARY"} />
          <ResumePDFText>{summary}</ResumePDFText>
        </View>
      </ResumePDFAtomBlock>
    </ResumePDFSection>
  )
}
