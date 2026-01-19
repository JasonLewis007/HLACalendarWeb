import React, { useEffect, useMemo, useState } from "react";
import "./CalendarMenu.css";


// Helpers
const monthOptions = [
  { value: 1, label: "Jan" },
  { value: 2, label: "Feb" },
  { value: 3, label: "Mar" },
  { value: 4, label: "Apr" },
  { value: 5, label: "May" },
  { value: 6, label: "Jun" },
  { value: 7, label: "Jul" },
  { value: 8, label: "Aug" },
  { value: 9, label: "Sep" },
  { value: 10, label: "Oct" },
  { value: 11, label: "Nov" },
  { value: 12, label: "Dec" },
];

function getCurrentMonth() {
  return new Date().getMonth() + 1;
}
function getCurrentYear() {
  return new Date().getFullYear();
}
function ordinalSuffix(n) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export default function CalendarMenu() {
  // Replace this with your auth context/store
  // Example payload you’d set after MS login:
  // { displayName: "JASON LEWIS", groupName: "ADMIN", salesPerson: "JASON LEWIS" }
  const [user, setUser] = useState({
    displayName: "JASON LEWIS",
    groupName: "ADMIN",
    salesPerson: "JASON LEWIS",
  });

  // Data from API
  const [territories, setTerritories] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [years, setYears] = useState([]);

  // Form state
  const [monthlyMonth, setMonthlyMonth] = useState(getCurrentMonth());
  const [monthlyTerritoryId, setMonthlyTerritoryId] = useState("ALL");
  const [monthlyYear, setMonthlyYear] = useState(getCurrentYear());

  const [weeklyMonth, setWeeklyMonth] = useState(getCurrentMonth());
  const [weeklyWeek, setWeeklyWeek] = useState(ordinalSuffix(4)); // UI label only
  const [weeklyWeekValue, setWeeklyWeekValue] = useState(4); // actual value 1-5
  const [weeklyTerritoryId, setWeeklyTerritoryId] = useState("ALL");
  const [weeklyYear, setWeeklyYear] = useState(getCurrentYear());

  const [editEmployee, setEditEmployee] = useState("Select an Employee");
  const [editMonth, setEditMonth] = useState(getCurrentMonth());
  const [editYear, setEditYear] = useState(getCurrentYear());

  const isAdminOrOffice = useMemo(() => {
    const g = (user.groupName || "").trim().toUpperCase();
    return g === "ADMIN" || g === "OFFICE";
  }, [user.groupName]);

  const isAdmin = useMemo(() => {
    return (user.groupName || "").trim().toUpperCase() === "ADMIN";
  }, [user.groupName]);

  // Load dropdown data
  useEffect(() => {
    // Replace these with your real endpoints
    // (I’m using fetch here — swap to axios if you want)
    async function load() {
      try {
        const [tRes, eRes, yRes] = await Promise.all([
          fetch("/api/territories"),
          fetch("/api/salespeople"),
          fetch("/api/calendar/years"),
        ]);

        if (tRes.ok) setTerritories(await tRes.json());
        if (eRes.ok) setEmployees(await eRes.json());
        if (yRes.ok) setYears(await yRes.json());
      } catch (err) {
        console.error("Menu dropdown load failed:", err);
      }
    }
    load();
  }, []);

  // Submit handlers (replace with your own routes / downloads)
  async function submitMonthly(e) {
    e.preventDefault();
    // Example: open report in new tab
    const payload = { month: monthlyMonth, year: monthlyYear, territoryId: monthlyTerritoryId };
    // If your API returns a PDF/Excel, you may want window.open with querystring
    window.open(
      `/reports/monthly?month=${payload.month}&year=${payload.year}&territoryId=${encodeURIComponent(payload.territoryId)}`,
      "_blank"
    );
  }

  async function submitWeekly(e) {
    e.preventDefault();
    const payload = { month: weeklyMonth, year: weeklyYear, week: weeklyWeekValue, territoryId: weeklyTerritoryId };
    window.open(
      `/reports/weekly?month=${payload.month}&year=${payload.year}&week=${payload.week}&territoryId=${encodeURIComponent(
        payload.territoryId
      )}`,
      "_blank"
    );
  }

  async function submitEdit(e) {
    e.preventDefault();
    // Navigate to your edit screen with state/query params
    const qs = new URLSearchParams({
      month: String(editMonth),
      year: String(editYear),
      employee: editEmployee,
    }).toString();

    window.location.href = `/edit?${qs}`;
  }

  function goEmployeeInfo() {
    window.location.href = "/employee-info";
  }

  function goSearchMenu() {
    window.location.href = "/search";
  }

  async function submitCreateYear(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const yearToCreate = form.get("createYear");
    if (!yearToCreate) return;

    const res = await fetch("/api/calendar/create-year", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ year: Number(yearToCreate) }),
    });

    if (res.ok) alert("Year created.");
    else alert("Create year failed.");
  }

  function logout() {
    // Your logout flow: clear token, redirect
    window.location.href = "/login";
  }

  return (
    <div className="menuPage">
      {/* Header */}
      <div className="topHeader">
        <div className="topRow">
          <div />
          <div className="logoWrap">
            <img src="/images/Harperlovepng.jpg" alt="HarperLove" className="logoImg" />
          </div>
          <div className="logoutWrap">
            <button className="linkBtn" onClick={logout}>Signout</button>
          </div>
        </div>

        <div className="secondRow">
          <div className="leftLink">
            <a href="https://www.harperlove.com" target="_blank" rel="noreferrer">HarperLove</a>
          </div>

          <div className="welcomeBar">
            <div className="welcomeText">
              <div className="welcomeMain">Welcome {user.salesPerson || user.displayName}</div>
              {isAdmin && <div className="welcomeSub">You are part of the ADMIN Group</div>}
            </div>
          </div>

          <div className="rightLink">
            <a href="https://workforcenow.adp.com" target="_blank" rel="noreferrer">HR Documents on ADP.com</a>
          </div>
        </div>
      </div>

      {/* Main tiles */}
      <div className="grid">
        {/* Monthly */}
        <div className="card">
          <div className="cardTitle">Preview Monthly Report</div>

          <form onSubmit={submitMonthly} className="cardBody">
            <label>
              Select a month:
              <select value={monthlyMonth} onChange={(e) => setMonthlyMonth(Number(e.target.value))}>
                {monthOptions.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
              </select>
            </label>

            <label>
              Select a Territory Group:
              <select value={monthlyTerritoryId} onChange={(e) => setMonthlyTerritoryId(e.target.value)}>
                <option value="ALL">ALL</option>
                {territories.map(t => (
                  <option key={t.territoryID ?? t.TerritoryID} value={t.territoryID ?? t.TerritoryID}>
                    {t.territory ?? t.Territory}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Select a Year:
              <select value={monthlyYear} onChange={(e) => setMonthlyYear(Number(e.target.value))}>
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </label>

            <button type="submit" className="primaryBtn">Create</button>
          </form>
        </div>

        {/* Weekly */}
        <div className="card">
          <div className="cardTitle">Preview Weekly Report</div>

          <form onSubmit={submitWeekly} className="cardBody">
            <label>
              Select a month:
              <select value={weeklyMonth} onChange={(e) => setWeeklyMonth(Number(e.target.value))}>
                {monthOptions.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
              </select>
            </label>

            <label>
              Select a week:
              <select
                value={weeklyWeekValue}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  setWeeklyWeekValue(v);
                  setWeeklyWeek(ordinalSuffix(v));
                }}
              >
                {[1, 2, 3, 4, 5].map(w => (
                  <option key={w} value={w}>{ordinalSuffix(w)}</option>
                ))}
              </select>
            </label>

            <label>
              Select a Territory Group:
              <select value={weeklyTerritoryId} onChange={(e) => setWeeklyTerritoryId(e.target.value)}>
                <option value="ALL">ALL</option>
                {territories.map(t => (
                  <option key={t.territoryID ?? t.TerritoryID} value={t.territoryID ?? t.TerritoryID}>
                    {t.territory ?? t.Territory}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Select a Year:
              <select value={weeklyYear} onChange={(e) => setWeeklyYear(Number(e.target.value))}>
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </label>

            <button type="submit" className="primaryBtn">Create</button>
          </form>
        </div>

        {/* Edit */}
        <div className="card">
          <div className="cardTitle">Edit Record</div>

          <form onSubmit={submitEdit} className="cardBody">
            {isAdminOrOffice && (
              <label>
                Select an Employee:
                <select value={editEmployee} onChange={(e) => setEditEmployee(e.target.value)}>
                  <option value="Select an Employee">Select an Employee</option>
                  {employees.map(s => (
                    <option key={s.salesPerson ?? s.SalesPerson} value={s.salesPerson ?? s.SalesPerson}>
                      {s.salesPerson ?? s.SalesPerson}
                    </option>
                  ))}
                </select>
              </label>
            )}

            <label>
              Select a month:
              <select value={editMonth} onChange={(e) => setEditMonth(Number(e.target.value))}>
                {monthOptions.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
              </select>
            </label>

            <label>
              Select a year:
              <select value={editYear} onChange={(e) => setEditYear(Number(e.target.value))}>
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </label>

            <button type="submit" className="primaryBtn">Edit</button>
          </form>
        </div>

        {/* Employee Info */}
        <div className="card">
          <div className="cardTitle">Employee Information</div>
          <div className="cardBody">
            <button className="primaryBtn" onClick={goEmployeeInfo} disabled={!isAdminOrOffice}>
              Enter to Screen
            </button>
          </div>
        </div>

        {/* Search Calendar */}
        <div className="card">
          <div className="cardTitle">Search Calendar</div>
          <div className="cardBody">
            <button className="primaryBtn" onClick={goSearchMenu}>
              Enter to Screen
            </button>
          </div>
        </div>

        {/* Emergency + Create Year */}
        <div className="card">
          <div className="cardTitle"> </div>
          <div className="cardBody">
            <a
              href="/documents/Emergency%20Contacts%20and%20Home%20Information.xlsx"
              className="emergencyLink"
              target="_blank"
              rel="noreferrer"
            >
              Emergency Contact Information
              <br />
              Manager Accessible Only
              <br />
              Contact HR for password
            </a>

            {isAdmin && (
              <form onSubmit={submitCreateYear} style={{ marginTop: 16 }}>
                <label>
                  Select a Year:
                  <select name="createYear" defaultValue="">
                    <option value=""> </option>
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </label>
                <button type="submit" className="primaryBtn" style={{ marginTop: 10 }}>
                  Create
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
