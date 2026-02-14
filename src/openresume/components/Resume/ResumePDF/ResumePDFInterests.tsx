import { View } from "@react-pdf/renderer"
import {
  ResumePDFAtomBlock,
  ResumePDFBulletList,
  ResumePDFSection,
  ResumePDFSectionHeading,
  ResumePDFText
} from "components/Resume/ResumePDF/common"
import { styles, spacing } from "components/Resume/ResumePDF/styles"
import type { JsonResumeInterest } from "lib/redux/types"

export const ResumePDFInterests = ({
  heading,
  interests,
  themeColor,
  showBulletPoints
}: {
  heading: string
  interests: JsonResumeInterest[]
  themeColor: string
  showBulletPoints: boolean
}) => {
  return (
    <ResumePDFSection
      themeColor={themeColor}
      heading={heading}
      showHeading={false}
      style={{ gap: spacing[0] }}
    >
      <ResumePDFAtomBlock>
        <View style={{ ...styles.flexCol, gap: spacing["2"] }}>
          <ResumePDFSectionHeading themeColor={themeColor} heading={heading} />
          <View style={{ ...styles.flexRow, flexWrap: "wrap", marginHorizontal: "-3pt" }}>
            {interests.map((interest, idx) => (
              <View
                key={idx}
                style={{
                  width: "33.3333%",
                  paddingHorizontal: spacing["1"],
                  marginBottom: spacing["2"]
                }}
              >
                <View
                  style={{
                    ...styles.flexCol,
                    padding: spacing["2"],
                    gap: spacing["0.5"]
                  }}
                >
                  <ResumePDFText bold={true}>{interest.name}</ResumePDFText>
                  {interest.keywords.length > 0 && (
                    <View style={styles.flexCol}>
                      <ResumePDFBulletList
                        items={interest.keywords}
                        showBulletPoints={showBulletPoints}
                      />
                    </View>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>
      </ResumePDFAtomBlock>
    </ResumePDFSection>
  )
}
