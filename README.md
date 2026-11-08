# Creditfix District Administration | AI Command Centre
## Applied AI Engineer Assessment Task (LLM, Automation and Full-Stack)

A government-grade, unified command-and-control platform for monitoring, analyzing, and managing district administration workflows, citizen grievance pipelines, file movements, IoT sensor networks, and civic infrastructure.

Built as the practical working proof for the **Creditfix Group – Applied AI Engineer Assessment Task (Take-Home Project & Live Technical Presentation)**.

---

## 📑 Assessment Deliverables Matrix

| Deliverable | File / Location | Description |
| :--- | :--- | :--- |
| **Comprehensive Proposal Document** | [`CREDITFIX_DISTRICT_ADMINISTRATION_AI_PROPOSAL.md`](./CREDITFIX_DISTRICT_ADMINISTRATION_AI_PROPOSAL.md) | 6-part proposal answering Parts A to F of the brief (Discovery, Solution Design, 12-Month Roadmap, Security & MeghRaj Compliance, Executive Pitch to DM, and Objection Handling). |
| **Executive Presentation Slide Deck** | [`CREDITFIX_PRESENTATION_SLIDES_DECK.md`](./CREDITFIX_PRESENTATION_SLIDES_DECK.md) | 20-slide presentation deck with word-for-word speaker notes, slide layouts, 5-minute live demo script, and 30-minute Q&A defense. |
| **Interactive Working Proof Prototype** | Running on `http://localhost:3000` | Full-stack interactive web application with WhatsApp AI citizen intake simulator, file tracking, 15 modules, and live telemetry simulation. |

---

## 🏛️ Project Overview

This platform simulates an end-to-end digital twin of a forward-looking Indian district administration (Office of the District Magistrate / Collectorate & Municipal Headquarters).

It answers the core assessment brief:
> *"A District Administration office (the office of the District Magistrate / Collectorate) in a large Indian district handles a high volume of citizen work. This includes grievance applications, certificate and licence requests, file movement between departments, field reports, review meetings and follow-ups with officers... How would you take this office from zero to a fully working, AI-enabled workflow, and how would you convince them to adopt it?"*

### 1. Collectorate Administrative Core (Part B Use Cases):
1. **Multilingual WhatsApp Citizen AI Bot (Samadhan AI):**
   - Click the **"Citizen WhatsApp"** button in the header.
   - Type or select colloquial Hindi or English citizen grievances (e.g. *"सदर बाजार में नाला चोक और गंदा पानी"*, *"Drinking water pipeline burst in Sector 8"*).
   - Real-time NLP parsing extracts language, category, department, assigned nodal officer, and SLA timer.
   - Instantly creates a live ticket `#CFX-INC-XXX` in the central state and provides simulated WhatsApp/SMS confirmation!
2. **Physical File & Document Tracking (e-Daftar):**
   - Barcode/QR jacket tracking monitoring desk-to-desk custody and flagging files dwelling >48 hours without action.
3. **DM's Review Meeting Copilot (Samiksha AI):**
   - Click the **"AI Copilot"** button in the header and choose *"Prepare Monday Morning Review Meeting (Samiksha Baithak) agenda for the DM"*.
   - Auto-compiles departmental SLA compliance, highlights lagging tehsils (Jal Nigam water leaks, Sadar Tehsil certificates), and formulates actionable agenda directives.

### 2. Physical District & IoT Infrastructure (8 Verticals):
1. **Smart Agriculture & Irrigation**: Multi-depth soil moisture probes (10cm/30cm), motorized solar pumps, solenoid valves, evapotranspiration analytics.
2. **Solid Waste Logistics & Fleet Tracking**: 50 ultrasonic sensor-enabled smart bins, 10 municipal compactor trucks with live GPS, and in-browser Traveling Salesperson (TSP) route optimization.
3. **Adaptive Traffic & Transit Management**: 8 arterial intersections with 77GHz FMCW radar sensors, vehicle flow telemetry, congestion heatmaps, and SCATS adaptive signal control.
4. **Potable Water Supply & SCADA**: Primary reservoirs, water treatment plants (WTPs), elevated storage reservoirs (OHTs), acoustic leak detection (Section 12 rupture anomaly), and motorized pressure regulating valves.
5. **Continuous Ambient Air Quality (CAAQMS)**: 8 environmental observatories measuring AQI, PM2.5, PM10, gaseous pollutants, ambient noise, and mobile anti-smog cannon logistics.
6. **Disaster Hydrology & Flood Early Warning**: Gomati River hydro gauging pylons, storm drain basins, sluice gate actuators, and high-capacity submersible dewatering pumps.
7. **Energy & Smart Street Lighting**: 1,450 LED luminaires managed across 30 feeder panels with DALI 0-10V dimmers, astronomical clock automation, and energy saving meters.
8. **Public Infrastructure Structural Health (SHM)**: Triaxial MEMS accelerometers, vibrating wire strain gauges, and crack displacement sensors on cable-stayed bridges, elevated viaducts, and government buildings.

---

## 🧠 Core System Philosophy

$$\text{Citizen Intake} \longrightarrow \text{Automated NLP Triage} \longrightarrow \text{Desk Dwell Tracking} \longrightarrow \text{Human SCADA Action} \longrightarrow \text{Closed-Loop Verification}$$

* **Intake:** Vernacular voice notes and WhatsApp text in colloquial Hindi and English.
* **Triage:** Fine-tuned Indic LLMs classify intent, category, and urgency with >95% accuracy.
* **Tracking:** Deterministic audit logging and desk dwell timers ensure accountability.
* **Human Action:** Mandatory SCADA confirmation modal—an AI recommendation **NEVER** automatically activates high-power municipal hardware without human authorization.
* **Verification:** A ticket is only permanently closed after the citizen verifies satisfaction via WhatsApp.

---

## 🚀 Quick Start Guide

### Prerequisites
* **Node.js**: v18.x or v20+ (developed on v22.x)
* **npm**: v9+ or v10+

### Installation & Run

```bash
# 1. Navigate to project root
cd e:/smartCity

# 2. Install dependencies (React 18, Vite 5, Tailwind CSS, Leaflet, Recharts, Lucide React)
npm install

# 3. Start local development server
npm run dev
```

The application will launch locally at `http://localhost:3000` (or `http://localhost:5173`).

### Production Build

```bash
# Verify production compilation
npm run build
```

---

## 🧪 Live Demo Walkthrough (5-Minute Assessment Tour)

To run through the exact assessment evaluation scenario during the live interview:

1. Click **"Assessment Demo"** in the top navigation bar to open the guided walkthrough modal.
2. Click **"Citizen WhatsApp"** in the top navigation bar to simulate citizen grievance filing in Hindi.
3. Click **"AI Copilot"** to generate the DM's Monday *Samiksha Baithak* executive briefing.
4. Open the **Smart Irrigation** module (`/irrigation`) and activate pump `PMP-04` to see the mandatory SCADA safety confirmation dialog.
5. Open **Waste Management** (`/waste`) and click **"Optimize Collection Route"** to run the live Traveling Salesperson route solver.
6. Open **Reports & Analytics** (`/reports`) to export CSV records or open the printable Collectorate briefing pack.

---

## 🛡️ Architecture & Sovereign Compliance
* **Sovereign Cloud Deployment:** Architecture engineered for deployment on **NIC Cloud (MeghRaj)** or MeitY-empaneled Indian data centers.
* **Aadhaar / PII Redaction:** Automated regex pipeline strips citizen identification numbers before LLM ingestion.
* **Deterministic Fallback:** Strict JSON schema enforcement and confidence gating (<82% routed to human triage clerk).
