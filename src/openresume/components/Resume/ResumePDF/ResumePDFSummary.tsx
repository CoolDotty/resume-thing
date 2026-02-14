import { ResumePDFSection, ResumePDFText } from "components/Resume/ResumePDF/common"

export const ResumePDFSummary = ({
  summary,
  themeColor
}: {
  summary: string
  themeColor: string
}) => {
  return (
    <ResumePDFSection themeColor={themeColor} heading={"SUMMARY"}>
      <ResumePDFText>{summary}</ResumePDFText>
    </ResumePDFSection>
  )
}
