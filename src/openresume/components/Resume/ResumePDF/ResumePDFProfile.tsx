import { View } from "@react-pdf/renderer";
import {
  ResumePDFIcon,
  type IconType
} from "components/Resume/ResumePDF/common/ResumePDFIcon";
import { styles, spacing } from "components/Resume/ResumePDF/styles";
import {
  ResumePDFLink,
  ResumePDFSection,
  ResumePDFText
} from "components/Resume/ResumePDF/common";
import { formatDisplayUrl, joinNonEmpty } from "lib/redux/resumeFormatting";
import type { JsonResumeBasics } from "lib/redux/types";

export const ResumePDFProfile = ({
  basics,
  themeColor,
  isPDF
}: {
  basics: JsonResumeBasics;
  themeColor: string;
  isPDF: boolean;
}) => {
  const { name, label, email, phone, url, location, profiles } = basics;
  const locationText = joinNonEmpty([location.city, location.countryCode], ", ");

  const contactRows: Array<{
    key: string;
    value: string;
    iconType: IconType;
    src: string;
  }> = [];

  if (email) {
    contactRows.push({
      key: "email",
      value: email,
      iconType: "email",
      src: `mailto:${email}`
    });
  }

  if (phone) {
    contactRows.push({
      key: "phone",
      value: phone,
      iconType: "phone",
      src: `tel:${phone.replace(/[^\d+]/g, "")}`
    });
  }

  if (locationText) {
    contactRows.push({
      key: "location",
      value: locationText,
      iconType: "location",
      src: ""
    });
  }

  if (url) {
    contactRows.push({
      key: "url",
      value: formatDisplayUrl(url),
      iconType: "url",
      src: url.startsWith("http") ? url : `https://${url}`
    });
  }

  profiles.forEach((profile, idx) => {
    const profileUrl = profile.url || "";
    if (!profileUrl) {
      return;
    }

    const network = profile.network.toLowerCase();
    const iconType: IconType =
      network.includes("github")
        ? "url_github"
        : network.includes("linkedin")
          ? "url_linkedin"
          : "url";

    const text =
      joinNonEmpty([profile.network, profile.username], " - ") || formatDisplayUrl(profileUrl);
    contactRows.push({
      key: `profile-${idx}`,
      value: text,
      iconType,
      src: profileUrl.startsWith("http") ? profileUrl : `https://${profileUrl}`
    });
  });

  const contactRowChunks = contactRows.reduce<
    Array<Array<{ key: string; value: string; iconType: IconType; src: string }>>
  >((rows, contact, idx) => {
    const rowIndex = Math.floor(idx / 4);
    if (!rows[rowIndex]) {
      rows[rowIndex] = [];
    }
    rows[rowIndex].push(contact);
    return rows;
  }, []);

  return (
    <ResumePDFSection style={{ marginTop: spacing["4"], gap: spacing["1"] }}>
      <ResumePDFText
        bold={true}
        themeColor={themeColor}
        style={{ fontSize: "20pt" }}
      >
        {name}
      </ResumePDFText>
      {label && <ResumePDFText>{label}</ResumePDFText>}
      {contactRows.length > 0 && (
        <View
          style={{
            ...styles.flexCol,
            width: "100%",
            marginTop: spacing["0"]
          }}
        >
          {contactRowChunks.map((contactRow, rowIdx) => (
            <View
              key={`contact-row-${rowIdx}`}
              style={{
                ...styles.flexRow,
                width: "100%",
                marginTop: spacing["1"]
              }}
            >
              {contactRow.map(({ key, value, iconType, src }) => {
                const content = (
                  <View
                    style={{
                      ...styles.flexRow,
                      alignItems: "center",
                      gap: spacing["1"]
                    }}
                  >
                    <ResumePDFIcon type={iconType} isPDF={isPDF} />
                    <ResumePDFText>{value}</ResumePDFText>
                  </View>
                );

                return (
                  <View
                    key={key}
                    style={{
                      ...styles.flexRow,
                      width: "25%",
                      justifyContent: "center",
                      marginTop: spacing["2"]
                    }}
                  >
                    {src ? (
                      <ResumePDFLink src={src} isPDF={isPDF}>
                        {content}
                      </ResumePDFLink>
                    ) : (
                      content
                    )}
                  </View>
                );
              })}
            </View>
          ))}
        </View>
      )}
    </ResumePDFSection>
  );
};
