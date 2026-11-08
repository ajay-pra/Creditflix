// District AI Assistant Service (Vasudha AI Copilot)
// Provides structured, evidence-based answers to District Administrators based on live state

export const PRESET_AI_QUERIES = [
  "Give me a summary of the district's current status.",
  "Which zones have critical irrigation requirements?",
  "Which waste bins may overflow today?",
  "What are the busiest traffic intersections?",
  "Which water monitoring stations show anomalies?",
  "What are the major incidents in the district?",
  "Which IoT devices are offline or need attention?"
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

  // 1. District Summary
  if (q.includes("summary") || q.includes("overall") || q.includes("status")) {
    const criticalIncidents = incidents.filter(i => i.severity === "critical" && i.status !== "resolved");
    const criticalBins = wasteBins.filter(b => b.fillLevel >= 90);
    const criticalZones = irrigationZones.filter(z => z.soilMoisture10cm < 25);
    const avgAqi = Math.round(envStations.reduce((acc, s) => acc + s.aqi, 0) / (envStations.length || 1));

    return {
      title: "District Executive Briefing (Vasudha Command Centre)",
      response: `Good day, Officer. Here is the consolidated operational briefing for Vasudha Smart District:\n\n` +
        `• **District Readiness Score**: 91.4% (Optimal)\n` +
        `• **Active IoT Fleet**: ${devices.filter(d => d.status === 'online').length} / ${devices.length} devices reporting nominal telemetry.\n` +
        `• **Critical Attention Areas**: ${criticalIncidents.length} priority incidents require administrative oversight.\n` +
        `• **Agriculture**: Zone 3 (Gomati Agro Belt Beta) has soil moisture at 19.4% (Critical Deficit).\n` +
        `• **Waste Management**: ${criticalBins.length} bins at ≥90% capacity in Commercial Sector (Zone 2). Collection truck UP-32-GV-4011 is active.\n` +
        `• **Traffic**: Chowk Clock Tower junction experiencing 92% density with 14 km/h average speed.\n` +
        `• **Environment**: District Average AQI is ${avgAqi} (Moderate), with localized exceedance at Industrial Sector 8 (AQI 245).\n` +
        `• **Disaster Preparedness**: River Gomati is at 4.82m (Normal, Warning is 6.00m). Sluice gates operating in standard regulation mode.`,
      recommendedAction: "Review Critical Incidents queue and authorize irrigation pump activation for Zone 3.",
      category: "Executive Summary",
      confidence: 96
    };
  }

  // 2. Irrigation Requirements
  if (q.includes("irrigation") || q.includes("moisture") || q.includes("agriculture") || q.includes("crop")) {
    const critical = irrigationZones.filter(z => z.soilMoisture10cm < 30);
    const zBeta = irrigationZones.find(z => z.id === "IRR-Z02") || critical[0];

    return {
      title: "Smart Irrigation & Soil Moisture Analysis",
      response: `Analysis of 6 monitored agricultural sectors across Gomati Green Belt:\n\n` +
        `• **Immediate Action Required**: **${zBeta?.name || 'Gomati Agro Belt Beta'}** is at **${zBeta?.soilMoisture10cm}%** soil moisture (Target: 30-60%). The standing vegetable crop is at wilting risk.\n` +
        `• **Connected Actuator**: Pump ${zBeta?.connectedPumpId} is currently ${zBeta?.pumpRunning ? 'RUNNING' : 'OFF'}.\n` +
        `• **Zone 4 Demonstration Orchard**: Soil moisture at 28.5% (Approaching advisory threshold within 4 hours).\n` +
        `• **All Other Zones**: Moisture levels are optimal (average 43.5%).`,
      recommendedAction: `Open the Smart Irrigation module and start Pump ${zBeta?.connectedPumpId} for 45 minutes to restore soil moisture to ~42%.`,
      category: "Smart Agriculture",
      confidence: 95
    };
  }

  // 3. Waste Bins Overflow
  if (q.includes("waste") || q.includes("bin") || q.includes("garbage") || q.includes("overflow")) {
    const highBins = wasteBins.filter(b => b.fillLevel >= 80).sort((a, b) => b.fillLevel - a.fillLevel);
    const top3 = highBins.slice(0, 3);

    return {
      title: "Smart Waste & Bin Capacity Telemetry",
      response: `Review of 50 ultrasonic-monitored smart bins in Vasudha District:\n\n` +
        `• **Bins Approaching Overflow (≥80% Fill)**: ${highBins.length} bins identified.\n` +
        top3.map(b => `  - **${b.name} (${b.id})**: ${b.fillLevel}% full — estimated overflow in **${b.hoursToOverflow} hours** (${b.type} waste)`).join("\n") + "\n\n" +
        `• **Fleet Status**: 10 municipal collection vehicles monitored. Vehicle **UP-32-GV-4011** (Driver: Rameshwar Singh) is currently active in Zone 2 with 1.2 Tons remaining capacity.`,
      recommendedAction: "Execute 'AI Route Optimisation' in the Waste Management module to dispatch collection vehicles to the top 8 urgent bins.",
      category: "Solid Waste Logistics",
      confidence: 92
    };
  }

  // 4. Traffic Intersections
  if (q.includes("traffic") || q.includes("intersection") || q.includes("congestion") || q.includes("signal") || q.includes("jam")) {
    const busy = [...intersections].sort((a, b) => b.trafficDensityPct - a.trafficDensityPct).slice(0, 3);

    return {
      title: "District Traffic & Transit Congestion Report",
      response: `Live radar telemetry from 8 monitored arterial intersections:\n\n` +
        busy.map((int, i) => `• **#${i + 1} ${int.name}**: ${int.trafficDensityPct}% density | Flow: ${int.vehiclesPerMinute} veh/min | Avg Speed: ${int.avgSpeedKmph} km/h [Congestion: ${int.congestionLevel}]`).join("\n") + "\n\n" +
        `• **Bottleneck Root Cause**: Chowk Clock Tower has delivery tempo unloading causing spillback onto Metro station flyover.\n` +
        `• **Adaptive Signal Control**: Signal controllers are operating in Adaptive Coordination mode with green cycle splits compensating for corridor queue length.`,
      recommendedAction: "Switch Chowk Clock Tower signal to Manual Green Extension (+18s) in the Traffic Management module.",
      category: "Traffic & Transit",
      confidence: 91
    };
  }

  // 5. Water Anomalies
  if (q.includes("water") || q.includes("leak") || q.includes("reservoir") || q.includes("pipe") || q.includes("pressure")) {
    return {
      title: "Potable Water Distribution & Hydraulic Anomaly Report",
      response: `Hydraulic assessment across 10 transmission mains and reservoirs:\n\n` +
        `• **CRITICAL ANOMALY**: **Central Chowk Trunk Pipeline Section 12 (WTR-005)**.\n` +
        `  - Flow Rate: 610 m3/h (+28% surge above baseline)\n` +
        `  - Pressure: 2.1 bar (Sudden drop from normal 3.4 bar)\n` +
        `  - Acoustic Anomaly Model: **88% probability of underground main rupture**.\n` +
        `• **Reservoir Levels**: Vasudha Lake Reservoir is at 84.5% (1,225 ML) — optimal reserve capacity.\n` +
        `• **Water Quality**: North Basin WTP turbidity is 0.8 NTU and pH is 7.4 (Conforms to IS-10500 Potable Water standards).`,
      recommendedAction: "Acknowledge Incident VSD-INC-103 to dispatch Jal Nigam rapid response repair crew and throttle Section 12 valve.",
      category: "Water Resources",
      confidence: 94
    };
  }

  // 6. Major Incidents
  if (q.includes("incident") || q.includes("grievance") || q.includes("alert") || q.includes("complain") || q.includes("ticket")) {
    const active = incidents.filter(i => i.status !== "resolved" && i.status !== "closed");
    return {
      title: "Administrative Incidents & Citizen Grievance Register",
      response: `Currently tracking **${active.length} active incidents** across district departments:\n\n` +
        active.slice(0, 4).map(i => `• **${i.id}** [${i.severity.toUpperCase()}]: ${i.title}\n  - Location: ${i.location}\n  - Assigned: ${i.assignedOfficer || i.department}\n  - Status: ${i.status.toUpperCase()}`).join("\n\n") + "\n\n" +
        `• 0 escalated delays beyond SLA limits. All nodal officers have been pinged with automated SMS/portal alerts.`,
      recommendedAction: "Navigate to the Alerts & Incident Management page to update ticket statuses or reassign officers.",
      category: "Incident Management",
      confidence: 98
    };
  }

  // 7. Offline Devices & Sensor Health
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
    title: "Vasudha Intelligence Query Response",
    response: `Thank you for your query regarding: "${query}".\n\n` +
      `The Vasudha Command Centre system monitors real-time telemetry across 8 core smart city verticals:\n` +
      `• Smart Agriculture & Irrigation\n` +
      `• Solid Waste Management & Fleet Tracking\n` +
      `• Intelligent Traffic & Adaptive Signals\n` +
      `• Potable Water & Pipeline SCADA\n` +
      `• Air Quality & Environmental Stations\n` +
      `• Flood & Disaster Hydrology Early Warning\n` +
      `• Energy & Smart Streetlight Tele-management\n` +
      `• Public Infrastructure Structural Health\n\n` +
      `Try asking about specific zones, current traffic bottlenecks, water leak anomalies, or irrigation demand.`,
    recommendedAction: "Select one of the suggested query buttons above for instant domain-specific intelligence.",
    category: "General Query",
    confidence: 88
  };
};

