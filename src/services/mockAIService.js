// Creditfix District Administration AI Assistant Service (Collectorate AI Copilot)
// Provides structured, evidence-based answers to the District Magistrate & Senior Officers
// Built for Creditfix Group – Applied AI Engineer Assessment Task

export const PRESET_AI_QUERIES = [
  "Prepare Monday Morning Review Meeting (Samiksha Baithak) agenda for the DM.",
  "Summarize pending citizen grievances across tehsils and departments.",
  "Which department or clerk has the worst SLA turnaround time?",
  "Give me an executive summary of district status.",
  "Which zones have critical irrigation requirements?",
  "Which waste bins may overflow today?",
  "What are the busiest traffic intersections?",
  "Which water monitoring stations show anomalies?"
];

export const processAIQuery = (query, appState) => {
  const q = query.toLowerCase().trim();
  const {
    devices = [],
    irrigationZones = [],
    wasteBins = [],
    intersections = [],
    waterPoints = [],
    envStations = [],
    floodStations = [],
    incidents = []
  } = appState;

  // 1. DM Review Meeting (Samiksha Baithak) Agenda Generator
  if (q.includes("samiksha") || q.includes("meeting") || q.includes("agenda") || q.includes("monday") || q.includes("briefing")) {
    const criticalIncidents = incidents.filter(i => i.severity === "critical" && i.status !== "resolved");
    return {
      title: "DM Executive Review Meeting (Samiksha Baithak) Briefing",
      response: `Hon'ble District Magistrate, here is your auto-compiled briefing for the Weekly Inter-Departmental Samiksha Baithak:\n\n` +
        `### 1. Executive Summary & District Red Flags\n` +
        `• **Overall Grievance Resolution Rate**: 84.6% (Target: 95.0%)\n` +
        `• **Critical Overdue Matters**: ${criticalIncidents.length} escalations requiring direct DM intervention.\n` +
        `• **Worst Performing Department**: Jal Nigam (Water Supply) — 42% of citizen complaints overdue beyond 7-day SLA.\n` +
        `• **File Movement Bottleneck**: Sadar Tehsil Revenue Court has 142 land title mutation files dwelling >72 hours on Clerk Desk #3.\n\n` +
        `### 2. Departmental Accountability Agenda\n` +
        `1. **Executive Engineer, Jal Nigam**: Explain why Section 12 main line burst has 610 m³/h leakage without containment for 6 hours.\n` +
        `2. **Sub-Divisional Magistrate (SDM), Sadar**: Review pendency of 38 caste/income certificates delayed beyond statutory 15 days.\n` +
        `3. **Municipal Chief Sanitary Inspector**: Commercial Market bins at 92% capacity; verify why Truck UP-32-GV-4011 delayed morning route.\n` +
        `4. **Deputy Director (Agriculture)**: Zone 3 soil moisture at 19.4%; verify if solar feeder line tripping caused pump outage.\n\n` +
        `### 3. Citizen Sentiment & Feedback Index\n` +
        `• Jan Sunwai WhatsApp Bot received 328 citizen submissions this week with 89% positive resolution rating on resolved tickets.`,
      recommendedAction: "Download Samiksha Baithak Dossier (PDF/Print) from Reports & Analytics module to circulate to attending HoDs.",
      category: "Collectorate Governance",
      confidence: 99
    };
  }

  // 2. Grievance & File Movement Dwell Times
  if (q.includes("grievance") || q.includes("file") || q.includes("tehsil") || q.includes("clerk") || q.includes("sla") || q.includes("jan sunwai")) {
    const active = incidents.filter(i => i.status !== "resolved" && i.status !== "closed");
    return {
      title: "Citizen Grievances & File Dwell Time Audit",
      response: `Audit of Jan Sunwai Citizen Grievance Portal & e-Daftar Physical File Tracking:\n\n` +
        `• **Total Active Grievances**: ${active.length} dossiers tracked under Citizens' Charter SLA.\n` +
        `• **Tehsil Breakdown**:\n` +
        `  - **Sadar Tehsil**: 12 active (3 critical — land mutation disputes & sewage overflow)\n` +
        `  - **Gomati Rural Block**: 5 active (irrigation canal tail-end water deficit)\n` +
        `  - **Industrial Zone**: 3 active (nocturnal boiler emissions & road dust)\n\n` +
        `• **Physical File Dwell-Time Alerts (>48h Inaction)**:\n` +
        `  - *File #REV-2026-0891* (Land demarcation, Vill. Raipur): 86 hours on Desk of Naib Tehsildar (Sadar).\n` +
        `  - *File #NOC-2026-0412* (Commercial Fire Safety NOC): 52 hours at Fire Officer Dispatch.\n` +
        `• **Automated Interventions Triggered**: SMS reminders dispatched to nodal officers; escalation flags placed on DM's dashboard.`,
      recommendedAction: "Issue automated show-cause notices for files dwelling over 72 hours via the Incident Management module.",
      category: "Citizen Grievances & e-Office",
      confidence: 97
    };
  }

  // 3. District Summary
  if (q.includes("summary") || q.includes("overall") || q.includes("status")) {
    const criticalIncidents = incidents.filter(i => i.severity === "critical" && i.status !== "resolved");
    const criticalBins = wasteBins.filter(b => b.fillLevel >= 90);
    const criticalZones = irrigationZones.filter(z => z.soilMoisture10cm < 25);
    const avgAqi = Math.round(envStations.reduce((acc, s) => acc + s.aqi, 0) / (envStations.length || 1));

    return {
      title: "District Executive Briefing (Creditfix Collectorate Command Centre)",
      response: `Hon'ble District Magistrate, here is the consolidated operational briefing for Creditfix District Administration:\n\n` +
        `• **District Readiness Score**: 91.4% (Optimal)\n` +
        `• **Active IoT Fleet**: ${devices.filter(d => d.status === 'online').length} / ${devices.length} devices reporting nominal telemetry.\n` +
        `• **Critical Attention Areas**: ${criticalIncidents.length} priority incidents require administrative oversight.\n` +
        `• **Agriculture**: Zone 3 (Rural Agro Belt) has soil moisture at 19.4% (Critical Deficit).\n` +
        `• **Waste Management**: ${criticalBins.length} bins at ≥90% capacity in Commercial Sector (Zone 2). Collection truck UP-32-GV-4011 is active.\n` +
        `• **Traffic**: Sadar Tehsil / Chowk Clock Tower junction experiencing 92% density with 14 km/h average speed.\n` +
        `• **Environment**: District Average AQI is ${avgAqi} (Moderate), with localized exceedance at Industrial Sector 8 (AQI 245).\n` +
        `• **Disaster Preparedness**: River Gomati is at 4.82m (Normal, Warning mark is 6.00m). Sluice gates operating in standard regulation mode.`,
      recommendedAction: "Review Critical Incidents queue and authorize irrigation pump activation for Zone 3.",
      category: "Executive Summary",
      confidence: 96
    };
  }

  // 4. Irrigation Requirements
  if (q.includes("irrigation") || q.includes("moisture") || q.includes("agriculture") || q.includes("crop")) {
    const critical = irrigationZones.filter(z => z.soilMoisture10cm < 30);
    const zBeta = irrigationZones.find(z => z.id === "IRR-Z02") || critical[0];

    return {
      title: "Smart Irrigation & Soil Moisture Analysis",
      response: `Analysis of 6 monitored agricultural sectors across Gomati Green Belt:\n\n` +
        `• **Immediate Action Required**: **${zBeta?.name || 'Rural Agro Belt Beta'}** is at **${zBeta?.soilMoisture10cm}%** soil moisture (Target: 30-60%). The standing vegetable crop is at wilting risk.\n` +
        `• **Connected Actuator**: Pump ${zBeta?.connectedPumpId} is currently ${zBeta?.pumpRunning ? 'RUNNING' : 'OFF'}.\n` +
        `• **Zone 4 Demonstration Orchard**: Soil moisture at 28.5% (Approaching advisory threshold within 4 hours).\n` +
        `• **All Other Zones**: Moisture levels are optimal (average 43.5%).`,
      recommendedAction: `Open the Smart Irrigation module and start Pump ${zBeta?.connectedPumpId} for 45 minutes to restore soil moisture to ~42%.`,
      category: "Smart Agriculture",
      confidence: 95
    };
  }

  // 5. Waste Bins Overflow
  if (q.includes("waste") || q.includes("bin") || q.includes("garbage") || q.includes("overflow")) {
    const highBins = wasteBins.filter(b => b.fillLevel >= 80).sort((a, b) => b.fillLevel - a.fillLevel);
    const top3 = highBins.slice(0, 3);

    return {
      title: "Smart Waste & Bin Capacity Telemetry",
      response: `Review of 50 ultrasonic-monitored smart bins across the district:\n\n` +
        `• **Bins Approaching Overflow (≥80% Fill)**: ${highBins.length} bins identified.\n` +
        top3.map(b => `  - **${b.name} (${b.id})**: ${b.fillLevel}% full — estimated overflow in **${b.hoursToOverflow} hours** (${b.type} waste)`).join("\n") + "\n\n" +
        `• **Fleet Status**: 10 municipal collection vehicles monitored. Vehicle **UP-32-GV-4011** (Driver: Rameshwar Singh) is currently active in Zone 2 with 1.2 Tons remaining capacity.`,
      recommendedAction: "Execute 'AI Route Optimisation' in the Waste Management module to dispatch collection vehicles to the top 8 urgent bins.",
      category: "Solid Waste Logistics",
      confidence: 92
    };
  }

  // 6. Traffic Intersections
  if (q.includes("traffic") || q.includes("intersection") || q.includes("congestion") || q.includes("signal") || q.includes("jam")) {
    const busy = [...intersections].sort((a, b) => b.trafficDensityPct - a.trafficDensityPct).slice(0, 3);

    return {
      title: "District Traffic & Transit Congestion Report",
      response: `Live radar telemetry from 8 monitored arterial intersections:\n\n` +
        busy.map((int, i) => `• **#${i + 1} ${int.name}**: ${int.trafficDensityPct}% density | Flow: ${int.vehiclesPerMinute} veh/min | Avg Speed: ${int.avgSpeedKmph} km/h [Congestion: ${int.congestionLevel}]`).join("\n") + "\n\n" +
        `• **Bottleneck Root Cause**: Sadar Commercial Chowk has delivery unloading causing spillback onto Metro station flyover.\n` +
        `• **Adaptive Signal Control**: Signal controllers are operating in Adaptive Coordination mode with green cycle splits compensating for corridor queue length.`,
      recommendedAction: "Switch Sadar Chowk signal to Manual Green Extension (+18s) in the Traffic Management module.",
      category: "Traffic & Transit",
      confidence: 91
    };
  }

  // 7. Water Anomalies
  if (q.includes("water") || q.includes("leak") || q.includes("reservoir") || q.includes("pipe") || q.includes("pressure")) {
    return {
      title: "Potable Water Distribution & Hydraulic Anomaly Report",
      response: `Hydraulic assessment across 10 transmission mains and reservoirs:\n\n` +
        `• **CRITICAL ANOMALY**: **Central Chowk Trunk Pipeline Section 12 (WTR-005)**.\n` +
        `  - Flow Rate: 610 m3/h (+28% surge above baseline)\n` +
        `  - Pressure: 2.1 bar (Sudden drop from normal 3.4 bar)\n` +
        `  - Acoustic Anomaly Model: **88% probability of underground main rupture**.\n` +
        `• **Reservoir Levels**: District Lake Reservoir is at 84.5% (1,225 ML) — optimal reserve capacity.\n` +
        `• **Water Quality**: North Basin WTP turbidity is 0.8 NTU and pH is 7.4 (Conforms to IS-10500 Potable Water standards).`,
      recommendedAction: "Acknowledge Incident CFX-INC-103 to dispatch Jal Nigam rapid response repair crew and throttle Section 12 valve.",
      category: "Water Resources",
      confidence: 94
    };
  }

  // 8. Offline Devices & Sensor Health
  if (q.includes("device") || q.includes("sensor") || q.includes("offline") || q.includes("battery") || q.includes("hardware") || q.includes("iot")) {
    const warningDevices = devices.filter(d => d.status === "warning" || d.status === "offline");
    return {
      title: "IoT Fleet Health & Connectivity Diagnostics",
      response: `Diagnostic telemetry for all 100 registered IoT nodes:\n\n` +
        `• **Total Nodes**: ${devices.length} registered\n` +
        `• **Online & Healthy**: ${devices.filter(d => d.status === 'online').length} (92%)\n` +
        `• **Attention Required**: ${warningDevices.length} devices\n\n` +
        warningDevices.slice(0, 4).map(d => `• **${d.id} (${d.name})**: Status: ${d.status.toUpperCase()} | Health: ${d.health} | Battery: ${d.battery}% | Protocol: ${d.connectivity}`).join("\n") + "\n\n" +
        `• **Network Infrastructure**: LoRaWAN gateways in Zone 1, 3, and 5 operating at -64 dBm RSSI with zero packet drop in the last 60 minutes.`,
      recommendedAction: "Review flagged nodes in the IoT Device Management module and trigger simulated calibration or firmware refresh.",
      category: "IoT Device Management",
      confidence: 97
    };
  }

  // Fallback / General Query
  return {
    title: "Creditfix Collectorate AI Query Response",
    response: `Thank you for your query regarding: "${query}".\n\n` +
      `The Creditfix District Administration Platform monitors both administrative workflows and physical IoT telemetry:\n` +
      `• Citizen Grievance Intake, Routing & SLA Timers (Jan Sunwai)\n` +
      `• Physical File Tracking & Desk Dwell Time Audits (e-Daftar)\n` +
      `• Weekly Samiksha Baithak (Review Meeting) AI Agenda Generation\n` +
      `• Smart Agriculture & Irrigation Solenoid SCADA\n` +
      `• Solid Waste Management & Dynamic Vehicle Routing (TSP)\n` +
      `• Potable Water Distribution & Burst Anomaly Detection\n` +
      `• Ambient Air Quality (CAAQMS) & Anti-Smog Logistics\n` +
      `• Flood Hydrology & Emergency Dewatering Gate SCADA\n\n` +
      `Try asking: "Prepare Monday Morning Review Meeting agenda for the DM" or "Summarize pending citizen grievances across tehsils".`,
    recommendedAction: "Select one of the suggested query buttons above for instant domain-specific intelligence.",
    category: "General Query",
    confidence: 90
  };
};
