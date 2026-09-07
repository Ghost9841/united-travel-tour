"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  Font,
} from "@react-pdf/renderer";

/* =========================================================
   NEPALI / DEVANAGARI FONT
   ========================================================= */

Font.register({
  family: "NotoDevanagari",
  fonts: [
    {
      src: "/fonts/NotoSansDevanagari-Regular.ttf",
      fontWeight: "normal",
    },
    {
      src: "/fonts/NotoSansDevanagari-Bold.ttf",
      fontWeight: "bold",
    },
  ],
});

/* =========================================================
   TYPES
   ========================================================= */

interface AgreementPDFProps {
  agreement: {
    id: number;

    name: string;
    phoneNumber: string;
    sectorRoute: string;

    airlineName?: string | null;

    journeyType: "ONE_WAY" | "TWO_WAY";

    departureDate: string | null;
    returnDate: string | null;

    customerSignature: string | null;
    date: string | null;

    acceptTerms: boolean;

    termsVersion?: {
      id?: number;
      version: string;
      title: string;
      englishText: string;
      nepaliText: string;
    } | null;

    /*
     * IMPORTANT:
     * These snapshots should contain exactly what
     * the customer agreed to.
     */
    englishSnapshot?: string | null;
    nepaliSnapshot?: string | null;

    createdAt?: string;
    updatedAt?: string;
  };
}

/* =========================================================
   COLORS
   ========================================================= */

const COLORS = {
  navy: "#0b3558",
  navyDark: "#092c4a",
  orange: "#f97316",
  green: "#15803d",
  greenLight: "#f0fdf4",
  gray900: "#111827",
  gray800: "#1f2937",
  gray700: "#374151",
  gray600: "#4b5563",
  gray500: "#6b7280",
  gray400: "#9ca3af",
  gray300: "#d1d5db",
  gray200: "#e5e7eb",
  gray100: "#f3f4f6",
  gray50: "#f9fafb",
  white: "#ffffff",
};

/* =========================================================
   PDF STYLES
   ========================================================= */

const styles = StyleSheet.create({
  /* -------------------------------------------------------
     PAGE
     ------------------------------------------------------- */

  page: {
    paddingTop: 38,
    paddingBottom: 45,
    paddingHorizontal: 40,

    fontFamily: "Helvetica",
    fontSize: 9,

    color: COLORS.gray900,

    backgroundColor: COLORS.white,
  },

  /* -------------------------------------------------------
     HEADER
     ------------------------------------------------------- */

  header: {
    backgroundColor: COLORS.navy,

    paddingHorizontal: 18,
    paddingVertical: 15,

    marginBottom: 18,

    borderRadius: 6,
  },

  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logo: {
    color: COLORS.white,
    fontSize: 21,
    fontWeight: "bold",
    letterSpacing: 1,
  },

  headerRight: {
    alignItems: "flex-end",
  },

  headerTitle: {
    color: COLORS.orange,
    fontSize: 8,
    fontWeight: "bold",
  },

  headerSubtitle: {
    color: "#dbe4ec",
    fontSize: 7,
    marginTop: 3,
  },

  /* -------------------------------------------------------
     DOCUMENT TITLE
     ------------------------------------------------------- */

  documentTitle: {
    fontSize: 17,
    fontWeight: "bold",

    color: COLORS.navy,

    marginBottom: 3,
  },

  agreementNumber: {
    fontSize: 9,
    color: COLORS.gray500,

    marginBottom: 18,
  },

  /* -------------------------------------------------------
     SECTION
     ------------------------------------------------------- */

  section: {
    marginBottom: 18,
  },

  sectionHeader: {
    backgroundColor: COLORS.navy,

    paddingHorizontal: 9,
    paddingVertical: 7,

    marginBottom: 11,

    borderRadius: 3,
  },

  sectionHeaderText: {
    color: COLORS.white,

    fontSize: 10,

    fontWeight: "bold",
  },

  /* -------------------------------------------------------
     GRID
     ------------------------------------------------------- */

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  field: {
    width: "50%",

    paddingRight: 15,

    marginBottom: 13,
  },

  fullField: {
    width: "100%",

    marginBottom: 13,
  },

  fieldLabel: {
    fontSize: 7,

    color: COLORS.gray500,

    marginBottom: 4,

    textTransform: "uppercase",
  },

  fieldValue: {
    fontSize: 9.5,

    color: COLORS.gray900,
  },

  /* -------------------------------------------------------
     TRAVEL DATES
     ------------------------------------------------------- */

  dateBox: {
    width: "50%",

    paddingRight: 15,
  },

  dateLabel: {
    fontSize: 7,

    color: COLORS.gray500,

    marginBottom: 4,
  },

  dateValue: {
    fontSize: 10,

    fontWeight: "bold",

    color: COLORS.navy,
  },

  /* -------------------------------------------------------
     TERMS
     ------------------------------------------------------- */

  termsVersion: {
    fontSize: 7,

    color: COLORS.gray500,

    marginBottom: 12,
  },

  languageBlock: {
    marginBottom: 18,
  },

  languageTitle: {
    fontSize: 10,

    fontWeight: "bold",

    color: COLORS.orange,

    marginBottom: 7,
  },

  termsText: {
    fontFamily: "Helvetica",

    fontSize: 8.5,

    lineHeight: 1.55,

    color: COLORS.gray700,
  },

  /*
   * Nepali MUST use a Devanagari font.
   */
  nepaliLanguageTitle: {
    fontFamily: "NotoDevanagari",

    fontSize: 10,

    fontWeight: "bold",

    color: COLORS.orange,

    marginBottom: 7,
  },

  nepaliTermsText: {
    fontFamily: "NotoDevanagari",

    fontSize: 8.5,

    lineHeight: 1.7,

    color: COLORS.gray700,
  },

  /* -------------------------------------------------------
     ACCEPTANCE
     ------------------------------------------------------- */

  acceptanceBox: {
    borderWidth: 1,

    borderColor: COLORS.gray200,

    borderRadius: 5,

    padding: 12,

    backgroundColor: COLORS.gray50,
  },

  acceptanceStatus: {
    fontSize: 11,

    fontWeight: "bold",

    marginBottom: 10,

    color: COLORS.green,
  },

  acceptanceRow: {
    flexDirection: "row",

    marginBottom: 7,
  },

  acceptanceLabel: {
    width: 110,

    fontSize: 8,

    color: COLORS.gray500,
  },

  acceptanceValue: {
    flex: 1,

    fontSize: 9,

    color: COLORS.gray900,
  },

  /* -------------------------------------------------------
     SIGNATURE
     ------------------------------------------------------- */

  signatureBox: {
    marginTop: 12,

    flexDirection: "row",

    justifyContent: "space-between",
  },

  signatureColumn: {
    width: "45%",
  },

  signatureLine: {
    borderBottomWidth: 1,

    borderBottomColor: COLORS.gray300,

    marginTop: 25,

    marginBottom: 5,
  },

  signatureLabel: {
    fontSize: 7,

    color: COLORS.gray500,
  },

  /* -------------------------------------------------------
     FOOTER
     ------------------------------------------------------- */

  footer: {
    position: "absolute",

    bottom: 18,

    left: 40,

    right: 40,

    paddingTop: 7,

    borderTopWidth: 1,

    borderTopColor: COLORS.gray200,

    flexDirection: "row",

    justifyContent: "space-between",
  },

  footerText: {
    fontSize: 7,

    color: COLORS.gray400,
  },

  pageNumber: {
    fontSize: 7,

    color: COLORS.gray400,
  },
});

/* =========================================================
   DATE FORMATTER
   ========================================================= */

function formatDate(date: string | null | undefined) {
  if (!date) {
    return "Not set";
  }

  try {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "Not set";
  }
}

/* =========================================================
   PDF DOCUMENT
   ========================================================= */

export function TermsAgreementPDF({
  agreement,
}: AgreementPDFProps) {
  /*
   * IMPORTANT:
   *
   * Prefer snapshots because they represent the exact
   * terms that were saved with this agreement.
   *
   * Only fall back to the current terms version if
   * snapshots don't exist.
   */

  const englishText =
    agreement.englishSnapshot ||
    agreement.termsVersion?.englishText ||
    "No English terms available";

  const nepaliText =
    agreement.nepaliSnapshot ||
    agreement.termsVersion?.nepaliText ||
    "No Nepali terms available";

  const versionNumber =
    agreement.termsVersion?.version || "N/A";

  const versionTitle =
    agreement.termsVersion?.title ||
    "Terms & Conditions";

  const journeyType =
    agreement.journeyType === "TWO_WAY"
      ? "Return / Two Way"
      : "One Way";

  return (
    <Document
      title={`Terms Agreement #${agreement.id}`}
      author="UNITED"
      subject="Terms & Conditions Agreement"
      creator="UNITED"
    >
      <Page
        size="A4"
        style={styles.page}
        wrap
      >
        {/* =================================================
            HEADER
            ================================================= */}

        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.logo}>
              UNITED
            </Text>

            <View style={styles.headerRight}>
              <Text style={styles.headerTitle}>
                TERMS & CONDITIONS AGREEMENT
              </Text>

              <Text style={styles.headerSubtitle}>
                CUSTOMER DOCUMENT
              </Text>
            </View>
          </View>
        </View>

        {/* =================================================
            DOCUMENT TITLE
            ================================================= */}

        <Text style={styles.documentTitle}>
          Terms & Conditions Agreement
        </Text>

        <Text style={styles.agreementNumber}>
          Agreement #{agreement.id}
        </Text>

        {/* =================================================
            PASSENGER / BOOKING DETAILS
            ================================================= */}

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>
              Passenger / Booking Details
            </Text>
          </View>

          <View style={styles.grid}>
            {/* Passenger */}
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>
                Passenger Name
              </Text>

              <Text style={styles.fieldValue}>
                {agreement.name || "—"}
              </Text>
            </View>

            {/* Phone */}
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>
                Phone Number
              </Text>

              <Text style={styles.fieldValue}>
                {agreement.phoneNumber || "—"}
              </Text>
            </View>

            {/* Route */}
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>
                Sector / Route
              </Text>

              <Text style={styles.fieldValue}>
                {agreement.sectorRoute || "—"}
              </Text>
            </View>

            {/* Airline */}
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>
                Airline
              </Text>

              <Text style={styles.fieldValue}>
                {agreement.airlineName || "—"}
              </Text>
            </View>

            {/* Journey */}
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>
                Journey Type
              </Text>

              <Text style={styles.fieldValue}>
                {journeyType}
              </Text>
            </View>
          </View>
        </View>

        {/* =================================================
            TRAVEL DATES
            ================================================= */}

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>
              Travel Dates
            </Text>
          </View>

          <View style={styles.grid}>
            <View style={styles.dateBox}>
              <Text style={styles.dateLabel}>
                Departure Date
              </Text>

              <Text style={styles.dateValue}>
                {formatDate(agreement.departureDate)}
              </Text>
            </View>

            <View style={styles.dateBox}>
              <Text style={styles.dateLabel}>
                Return Date
              </Text>

              <Text style={styles.dateValue}>
                {agreement.journeyType === "TWO_WAY"
                  ? formatDate(agreement.returnDate)
                  : "N/A (One Way)"}
              </Text>
            </View>
          </View>
        </View>

        {/* =================================================
            TERMS & CONDITIONS
            ================================================= */}

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>
              {versionTitle}
            </Text>
          </View>

          <Text style={styles.termsVersion}>
            Terms Version: {versionNumber}
          </Text>

          {/* English */}
          <View style={styles.languageBlock}>
            <Text style={styles.languageTitle}>
              ENGLISH
            </Text>

            <Text style={styles.termsText}>
              {englishText}
            </Text>
          </View>

          {/* Nepali */}
          <View style={styles.languageBlock}>
            <Text style={styles.nepaliLanguageTitle}>
              नेपाली
            </Text>

            <Text style={styles.nepaliTermsText}>
              {nepaliText}
            </Text>
          </View>
        </View>

        {/* =================================================
            CUSTOMER ACCEPTANCE
            ================================================= */}

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>
              Customer Acceptance
            </Text>
          </View>

          <View style={styles.acceptanceBox}>
            <Text style={styles.acceptanceStatus}>
              {agreement.acceptTerms
                ? "✓ TERMS ACCEPTED"
                : "TERMS NOT ACCEPTED"}
            </Text>

            <View style={styles.acceptanceRow}>
              <Text style={styles.acceptanceLabel}>
                Customer Signature
              </Text>

              <Text style={styles.acceptanceValue}>
                {agreement.customerSignature ||
                  "Not submitted"}
              </Text>
            </View>

            <View style={styles.acceptanceRow}>
              <Text style={styles.acceptanceLabel}>
                Acceptance Date
              </Text>

              <Text style={styles.acceptanceValue}>
                {formatDate(agreement.date)}
              </Text>
            </View>

            <View style={styles.acceptanceRow}>
              <Text style={styles.acceptanceLabel}>
                Acceptance Status
              </Text>

              <Text style={styles.acceptanceValue}>
                {agreement.acceptTerms
                  ? "Accepted"
                  : "Not accepted"}
              </Text>
            </View>
          </View>

          {/* Signature lines */}
          <View style={styles.signatureBox}>
            <View style={styles.signatureColumn}>
              <View style={styles.signatureLine} />

              <Text style={styles.signatureLabel}>
                Customer Signature
              </Text>
            </View>

            <View style={styles.signatureColumn}>
              <View style={styles.signatureLine} />

              <Text style={styles.signatureLabel}>
                Date
              </Text>
            </View>
          </View>
        </View>

        {/* =================================================
            FOOTER
            ================================================= */}

        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>
            Agreement #{agreement.id} • UNITED
          </Text>

          <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) =>
              `Page ${pageNumber} of ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  );
}

/* =========================================================
   DOWNLOAD BUTTON
   ========================================================= */

export function DownloadAgreementPDF({
  agreement,
}: AgreementPDFProps) {
  return (
    <PDFDownloadLink
      document={
        <TermsAgreementPDF
          agreement={agreement}
        />
      }
      fileName={`terms-agreement-${agreement.id}.pdf`}
      style={{
        color: "#ffffff",
        textDecoration: "none",
        fontSize: 14,
        fontWeight: 700,
      }}
    >
      {({ loading }) =>
        loading
          ? "Preparing PDF..."
          : "Download PDF"
      }
    </PDFDownloadLink>
  );
}
