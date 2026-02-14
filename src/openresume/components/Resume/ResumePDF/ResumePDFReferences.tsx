import { View } from "@react-pdf/renderer"
import {
  ResumePDFAtomBlock,
  ResumePDFSection,
  ResumePDFSectionHeading,
  ResumePDFText
} from "components/Resume/ResumePDF/common"
import { spacing } from "components/Resume/ResumePDF/styles"
import type { JsonResumeReference } from "lib/redux/types"

export const ResumePDFReferences = ({
  heading,
  references,
  themeColor
}: {
  heading: string
  references: JsonResumeReference[]
  themeColor: string
}) => {
  return (
    <ResumePDFSection
      themeColor={themeColor}
      heading={heading}
      showHeading={false}
      style={{ gap: spacing[0] }}
    >
      {references.map((reference, idx) => (
        <ResumePDFAtomBlock key={idx} style={idx !== 0 ? { marginTop: spacing["1.5"] } : {}}>
          <View style={{ gap: spacing["2"] }}>
            {idx === 0 && <ResumePDFSectionHeading themeColor={themeColor} heading={heading} />}
            <View>
              <ResumePDFText bold={true}>{reference.name}</ResumePDFText>
              {reference.reference && (
                <View style={{ marginTop: spacing["0.5"] }}>
                  <ResumePDFText>{reference.reference}</ResumePDFText>
                </View>
              )}
            </View>
          </View>
        </ResumePDFAtomBlock>
      ))}
    </ResumePDFSection>
  )
}
