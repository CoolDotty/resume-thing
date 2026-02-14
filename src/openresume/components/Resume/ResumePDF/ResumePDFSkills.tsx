import { View } from "@react-pdf/renderer"
import {
  ResumePDFAtomBlock,
  ResumePDFBulletList,
  ResumePDFSection,
  ResumePDFSectionHeading,
  ResumePDFText
} from "components/Resume/ResumePDF/common"
import { styles, spacing } from "components/Resume/ResumePDF/styles"
import { joinNonEmpty } from "lib/redux/resumeFormatting"
import type { JsonResumeSkill } from "lib/redux/types"

export const ResumePDFSkills = ({
  heading,
  skills,
  themeColor,
  showBulletPoints
}: {
  heading: string
  skills: JsonResumeSkill[]
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
            {skills.map((skill, idx) => {
              const label = joinNonEmpty([skill.name, skill.level], " - ")

              return (
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
                    <ResumePDFText bold={true}>{label || skill.name}</ResumePDFText>
                    {skill.keywords.length > 0 && (
                      <View style={styles.flexCol}>
                        <ResumePDFBulletList
                          items={skill.keywords}
                          showBulletPoints={showBulletPoints}
                        />
                      </View>
                    )}
                  </View>
                </View>
              )
            })}
          </View>
        </View>
      </ResumePDFAtomBlock>
    </ResumePDFSection>
  )
}
