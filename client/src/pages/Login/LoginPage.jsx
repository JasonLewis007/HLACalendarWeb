import React from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Later: window.location.href = "/api/auth/login";
    navigate("/calendar");
  };

  

  return (
    <div style={styles.page}>
      <div style={styles.topRow}>
        <a href="https://www.harperlove.com" style={styles.harperLink}>
          HarperLove
        </a>

        <div style={styles.brandBlock}>
          <div style={styles.brandTitleRow}>
            <div style={styles.logoMark} aria-hidden="true">
              <div style={styles.logoBarLeft} />
              <div style={styles.logoBarRight} />
            </div>

            <div style={styles.brandText}>
              <div style={styles.brandName}>HARPERLOVE</div>
              <div style={styles.brandSub}>CALENDAR TRACKING</div>
            </div>

            <div style={styles.calendarIcon} aria-hidden="true">
              📅
            </div>
          </div>

          <div style={styles.brandDivider} />
        </div>

        <div style={{ width: 90 }} />
      </div>

      <div style={styles.card}>
        <button type="button" onClick={handleLogin} style={styles.msButton}>
          <span style={styles.msIcon} aria-hidden="true">
            ⊞
          </span>
          Login with Microsoft &amp; DUO MFA
        </button>

        <div style={styles.infoText}>Continue with your HarperLove Account</div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#ffffff",
    padding: "28px 16px",
    fontFamily: "Arial, Helvetica, sans-serif",
    boxSizing: "border-box",
  },

  topRow: {
    width: "100%",
    maxWidth: 1100,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1fr auto 1fr",
    alignItems: "end",
    gap: 12,
    boxSizing: "border-box",
  },

  harperLink: {
    color: "#3a3a3a",
    textDecoration: "underline",
    fontSize: 16,
    justifySelf: "start",
  },

  brandBlock: {
    justifySelf: "center",
    textAlign: "center",
  },

  brandTitleRow: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    justifyContent: "center",
  },

  logoMark: {
    width: 38,
    height: 38,
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 6,
  },

  logoBarLeft: {
    background: "#0b4e8a",
    borderRadius: 4,
  },

  logoBarRight: {
    background: "#8a1f2a",
    borderRadius: 4,
  },

  brandText: {
    lineHeight: 1.1,
  },

  brandName: {
    fontSize: 34,
    letterSpacing: 2,
    fontWeight: 800,
    color: "#1b1b1b",
  },

  brandSub: {
    marginTop: 6,
    fontSize: 18,
    fontWeight: 800,
    letterSpacing: 1,
    color: "#1b1b1b",
  },

  calendarIcon: {
    fontSize: 34,
    transform: "rotate(-10deg)",
  },

  brandDivider: {
    marginTop: 10,
    height: 6,
    width: 520,
    maxWidth: "90vw",
    background: "#0b4e8a",
    borderRadius: 999,
  },

  card: {
    width: "100%",
    maxWidth: 1100,
    margin: "38px auto 0",
    border: "1px solid #0099CC",
    backgroundColor: "#e8eefa",
    padding: "70px 16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
  },

  msButton: {
    backgroundColor: "#2F2F2F",
    color: "#fff",
    border: "none",
    padding: "14px 22px",
    borderRadius: 6,
    fontSize: 18,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: 12,
    boxShadow: "0 2px 0 rgba(0,0,0,0.15)",
  },

  msIcon: {
    fontSize: 20,
    lineHeight: 1,
  },

  infoText: {
    marginTop: 14,
    color: "#555",
    fontSize: 14,
  },
};

