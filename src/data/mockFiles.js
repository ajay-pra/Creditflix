// e-Daftar: Physical File & Document Movement Registry
// Tracks physical paper jackets, QR barcodes, desk dwell times, and chain of custody
// Built for Creditfix Group – Applied AI Engineer Assessment Task

export const INITIAL_PHYSICAL_FILES = [
  {
    id: "FILE-REV-2026-0891",
    qrCode: "QR-882190-REV",
    subject: "Land Title Mutation & Khatauni Boundary Demarcation (Vill. Raipur, Plot 412/1)",
    department: "Revenue & Land Records",
    tehsil: "Sadar Tehsil",
    currentDesk: "Desk #3: Naib Tehsildar Peshi Section",
    currentCustodian: "Shri Harish Chandra (Senior Clerk)",
    daysAtDesk: 3.6,
    hoursAtDesk: 86,
    dwellStatus: "critical", // normal (<48h), warning (48-72h), critical (>72h)
    priority: "High (Court Mandated)",
    totalPages: 148,
    lastScanned: "3 days ago (10:45 AM)",
    movementHistory: [
      { step: 1, desk: "Central Inward & Docketing Registry", officer: "Rameshwar Dayal", date: "4 days ago", action: "QR Barcode Stamped & Docketed" },
      { step: 2, desk: "Record Room Keeper (Bastabardar)", officer: "Sunil Kumar", date: "4 days ago", action: "Attached 1359 Fasli Land Record Maps" },
      { step: 3, desk: "Naib Tehsildar Peshi (Desk #3)", officer: "Harish Chandra", date: "3 days ago", action: "File Stalled - Awaiting Kanungo Field Report" }
    ],
    aiInsight: "File has exceeded 72h statutory dwell limit. Automated show-cause alert queued for Naib Tehsildar."
  },
  {
    id: "FILE-PWD-2026-0412",
    qrCode: "QR-331092-PWD",
    subject: "Sanction for Culvert Reconstruction & Drainage Channel Widening (Malihabad Road km 14)",
    department: "Public Works Department (PWD)",
    tehsil: "Gomati Rural Block",
    currentDesk: "Desk #1: Executive Engineer Technical Sanction Cell",
    currentCustodian: "Er. K.P. Sharma (Executive Engineer)",
    daysAtDesk: 2.2,
    hoursAtDesk: 52,
    dwellStatus: "warning",
    priority: "Urgent (Monsoon Flood Risk)",
    totalPages: 84,
    lastScanned: "2 days ago (02:15 PM)",
    movementHistory: [
      { step: 1, desk: "Assistant Engineer Camp Office", officer: "Er. R.N. Singh", date: "3 days ago", action: "Site Measurement Book (MB) verified" },
      { step: 2, desk: "Executive Engineer Desk", officer: "Er. K.P. Sharma", date: "2 days ago", action: "Financial Estimate under scrutiny" }
    ],
    aiInsight: "Awaiting administrative approval. Budget head #5054 verified available."
  },
  {
    id: "FILE-NOC-2026-1104",
    qrCode: "QR-774910-NOC",
    subject: "Commercial Fire Safety NOC & Building By-Law Regularization (Sadar Bazaar Multi-Storey Complex)",
    department: "Chief Fire Officer & Urban Development",
    tehsil: "Sadar Tehsil",
    currentDesk: "Desk #4: Chief Fire Officer Technical Inspection",
    currentCustodian: "Shri V.K. Shukla (Station Fire Officer)",
    daysAtDesk: 1.1,
    hoursAtDesk: 26,
    dwellStatus: "normal",
    priority: "Normal (30-day SLA)",
    totalPages: 62,
    lastScanned: "Yesterday (11:30 AM)",
    movementHistory: [
      { step: 1, desk: "Single Window Clearance Counter", officer: "Pooja Mishra", date: "2 days ago", action: "Application received with blueprint maps" },
      { step: 2, desk: "Fire Station HQ", officer: "Shri V.K. Shukla", date: "Yesterday", action: "Hydrant pressure test scheduled" }
    ],
    aiInsight: "Document OCR verified all 4 mandatory structural clearances."
  },
  {
    id: "FILE-AGR-2026-0319",
    qrCode: "QR-551982-AGR",
    subject: "PM Krishi Sinchayee Yojana Micro-Irrigation Drip Subsidy Allotment (Cluster B, 42 Farmers)",
    department: "Agriculture & Krishi Kalyan",
    tehsil: "Rural Agro Block",
    currentDesk: "Desk #2: Deputy Director Agriculture Subsidy Cell",
    currentCustodian: "Dr. Anand Swaroop",
    daysAtDesk: 0.8,
    hoursAtDesk: 19,
    dwellStatus: "normal",
    priority: "Normal",
    totalPages: 210,
    lastScanned: "Today (09:15 AM)",
    movementHistory: [
      { step: 1, desk: "Block Agriculture Officer (BAO)", officer: "M.L. Yadav", date: "Yesterday", action: "Farmer Aadhaar & Bank DBT seeding verified" },
      { step: 2, desk: "Deputy Director Desk", officer: "Dr. Anand Swaroop", date: "Today", action: "Final digital signature queue" }
    ],
    aiInsight: "DBT subsidy transfer ready for 42 bank accounts upon digital token release."
  },
  {
    id: "FILE-ARM-2026-0098",
    qrCode: "QR-990142-ARM",
    subject: "Application for Non-Prohibited Bore (NPB) Arms Licence Renewal & Police Verification",
    department: "Magistrate Arms Licensing Branch",
    tehsil: "Civil Lines & Collectorate",
    currentDesk: "Desk #1: Senior Superintendent of Police (SSP) Confidential Section",
    currentCustodian: "Inspector G.S. Rathore (LIU Branch)",
    daysAtDesk: 4.5,
    hoursAtDesk: 108,
    dwellStatus: "critical",
    priority: "Strict SLA (Magistrate Hearing)",
    totalPages: 36,
    lastScanned: "4 days ago (04:45 PM)",
    movementHistory: [
      { step: 1, desk: "Arms Licensing Counter, Collectorate", officer: "Dinesh Saxena", date: "5 days ago", action: "Original weapon inspection recorded" },
      { step: 2, desk: "Local Intelligence Unit (LIU)", officer: "Inspector G.S. Rathore", date: "4 days ago", action: "Criminal history check pending" }
    ],
    aiInsight: "CRITICAL BOTTLE-NECK: File overdue by 60 hours at LIU section. Automated escalation dispatched to SP (City)."
  }
];

// Citizen Certificate & Licence Pipeline (e-Sathi Service Guarantee)
export const INITIAL_CERTIFICATES = [
  {
    id: "CRT-OBC-2026-4419",
    type: "OBC Caste Certificate",
    applicantName: "Ram Lal S/o Bhawani Deen",
    village: "Vill. Bakshi Ka Talab, Sadar",
    appliedDate: "3 days ago",
    statutorySlaDays: 15,
    daysElapsed: 3,
    status: "approved", // approved, in-verification, discrepancy, dispatched
    assignedOfficer: "Tehsildar Sadar (Revenue Court)",
    aiOcrCheck: "100% Match: Land Khatauni & Parivar Register OCR verified",
    whatsappDelivery: "Dispatched PDF to +91 94150 12891",
    slaStatus: "On Time (12 days remaining)"
  },
  {
    id: "CRT-INC-2026-8802",
    type: "Income Certificate (Pramaan Patra)",
    applicantName: "Smt. Shanti Devi W/o Late Rameshwar",
    village: "Ward 12, Commercial Chowk",
    appliedDate: "5 days ago",
    statutorySlaDays: 15,
    daysElapsed: 5,
    status: "in-verification",
    assignedOfficer: "Lekhpal Rajeshwar Tiwari",
    aiOcrCheck: "Discrepancy: Electricity bill address differs from Aadhaar. Field inspection assigned.",
    whatsappDelivery: "Pending Lekhpal mobile verification",
    slaStatus: "Normal (10 days remaining)"
  },
  {
    id: "CRT-DOM-2026-1294",
    type: "Domicile & Residence Certificate",
    applicantName: "Praveen Kumar Singh",
    village: "Civil Lines, Sector 4",
    appliedDate: "1 day ago",
    statutorySlaDays: 15,
    daysElapsed: 1,
    status: "approved",
    assignedOfficer: "Sub-Divisional Magistrate (SDM Sadar)",
    aiOcrCheck: "100% Match: High School Marksheet & Voter ID verified",
    whatsappDelivery: "Dispatched digitally signed e-Certificate",
    slaStatus: "On Time (14 days remaining)"
  },
  {
    id: "CRT-DIS-2026-0518",
    type: "Divyangjan (Disability Pension) Endorsement",
    applicantName: "Mohd. Aslam",
    village: "Gomati Rural, Block B",
    appliedDate: "8 days ago",
    statutorySlaDays: 15,
    daysElapsed: 8,
    status: "discrepancy",
    assignedOfficer: "Chief Medical Officer (CMO Disability Board)",
    aiOcrCheck: "Medical Board certificate requires physical seal verification.",
    whatsappDelivery: "SMS alert sent: Visit CMO Board this Wednesday",
    slaStatus: "Delayed at Medical Board"
  }
];

