import { ResumePDFSection, ResumePDFText } from "components/Resume/ResumePDF/common"
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
      style={{ marginTop: spacing["2"] }}
    >
      <ResumePDFText>{summary}</ResumePDFText>
    </ResumePDFSection>
  )
}
