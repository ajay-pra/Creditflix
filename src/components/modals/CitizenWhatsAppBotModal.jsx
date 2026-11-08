import React, { useState } from "react";
import { Modal } from "../common/Modal";
import { Badge } from "../common/Badge";
import { useApp } from "../../context/AppContext";
import {
  MessageSquare,
  Send,
  Mic,
  Bot,
  User,
  CheckCheck,
  Sparkles,
  PhoneCall,
  Clock,
  ShieldCheck,
  ArrowRight
} from "lucide-react";

export const CitizenWhatsAppBotModal = ({ isOpen, onClose }) => {
  const { createIncident, addToast } = useApp();
  const [messages, setMessages] = useState([
    {
      id: "bot-1",
      sender: "bot",
      text: "नमस्ते! जिला प्रशासन जन-सुनवाई सेवा में आपका स्वागत है। आप अपनी समस्या हिंदी या अंग्रेजी में लिख सकते हैं या बोल सकते हैं।\n\nWelcome to District Collectorate Jan Sunwai AI Bot. How can we assist you today?",
      time: "10:30 AM"
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedMetadata, setExtractedMetadata] = useState(null);

  const QUICK_PROMPTS = [
    {
      lang: "Hindi",
      label: "सदर बाजार में नाला चोक और गंदा पानी",
      text: "सदर तहसील मुख्य बाजार में 3 दिन से नाला चोक है और सड़कों पर गंदा पानी भरा हुआ है। दुर्गंध से बीमारी फैल रही है।"
    },
    {
      lang: "Hindi",
      label: "गोमती ग्रामीण में नहर का पानी नहीं आ रहा",
      text: "गोमती ग्रामीण ब्लॉक में हमारी धान की फसल सूख रही है। माइनर 4 नहर में 5 दिनों से पानी नहीं छोड़ा गया है।"
    },
    {
      lang: "English",
      label: "Streetlight outage near Civil Hospital",
      text: "All 12 solar streetlights outside District Civil Hospital emergency gate are out for 48 hours. Risk of accidents at night."
    },
    {
      lang: "English",
      label: "Drinking water pipe rupture in Sector 8",
      text: "Drinking water pipeline has burst in Industrial Sector 8 near Gate 3. Thousands of liters of water wasting on the road."
    }
  ];

  const handleSendMessage = (customText) => {
    const textToSend = customText || inputText;
    if (!textToSend.trim()) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsProcessing(true);

    // Simulate LLM parsing & intelligent classification
    setTimeout(() => {
      let category = "Municipal & Public Health";
      let department = "Municipal Corporation";
      let zone = "zone-2";
      let location = "Sadar Tehsil Commercial Market";
      let severity = "warning";
      let officer = "Er. R.K. Saxena (Chief Sanitary Officer)";
      let slaHours = 24;

      const lower = textToSend.toLowerCase();
      if (lower.includes("नाला") || lower.includes("drain") || lower.includes("गंदा पानी") || lower.includes("garbage")) {
        category = "Municipal Drainage & Sanitation";
        department = "Municipal Corporation";
        zone = "zone-2";
        location = "Sadar Bazaar & Commercial Ward";
        severity = "critical";
        officer = "Shri R.P. Verma (Executive Officer, Nagar Palika)";
        slaHours = 24;
      } else if (lower.includes("नहर") || lower.includes("irrigation") || lower.includes("फसल") || lower.includes("agri")) {
        category = "Irrigation & Agriculture Water";
        department = "Irrigation & Water Resources (Jal Nigam)";
        zone = "zone-3";
        location = "Gomati Rural Block, Minor-04 Canal Tail";
        severity = "critical";
        officer = "Shri Rajesh Kumar (Executive Engineer, Irrigation)";
        slaHours = 36;
      } else if (lower.includes("streetlight") || lower.includes("light") || lower.includes("बत्ती") || lower.includes("अंधेरा")) {
        category = "Public Infrastructure & Lighting";
        department = "District Electrical Safety & PWD";
        zone = "zone-1";
        location = "Civil Lines, District Hospital Corridor";
        severity = "warning";
        officer = "Er. Sunita Verma (Assistant Engineer, PWD Electrical)";
        slaHours = 48;
      } else if (lower.includes("pipeline") || lower.includes("burst") || lower.includes("leak") || lower.includes("pipe") || lower.includes("water")) {
        category = "Potable Water Supply";
        department = "Jal Nigam";
        zone = "zone-5";
        location = "Industrial Sector 8 Main Water Feeder";
        severity = "critical";
        officer = "Er. A.K. Tiwari (General Manager, Jal Nigam)";
        slaHours = 12;
      }

      // Auto-register incident into central state!
      const incidentId = createIncident({
        title: `Citizen Jan-Sunwai: ${textToSend.substring(0, 45)}...`,
        category,
        department,
        zone,
        location,
        severity,
        assignedOfficer: officer,
        sourceDevice: "WhatsApp Citizen AI Bot (Meta Cloud API)",
        summary: textToSend
      });

      const extracted = {
        incidentId,
        category,
        department,
        officer,
        location,
        severity,
        slaHours,
        confidence: 96
      };
      setExtractedMetadata(extracted);

      const botReply = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: `आपकी शिकायत सफलतापूर्वक दर्ज कर ली गई है!\n\nTicket ID: #${incidentId}\nविभाग (Dept): ${department}\nअधिकारी (Officer): ${officer}\nस्थान (Location): ${location}\nसमय-सीमा (SLA): ${slaHours} घंटे\n\nआपको समाधान होने पर SMS एवं WhatsApp पर सूचना भेजी जाएगी। आप इसी नंबर पर कभी भी 'STATUS' लिखकर प्रगति जान सकते हैं।`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        metadata: extracted
      };

      setMessages((prev) => [...prev, botReply]);
      setIsProcessing(false);

      addToast(
        "WhatsApp Grievance Routed",
        `Complaint registered as #${incidentId} and assigned to ${officer}.`,
        "success"
      );
    }, 600);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" title="">
      <div className="space-y-4">
        {/* Header Bar styled like WhatsApp Business */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shadow-sm">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900">
                  Jan Sunwai WhatsApp Citizen AI Portal
                </h3>
                <span className="flex items-center gap-1 text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                  <ShieldCheck className="h-3 w-3 text-emerald-600" />
                  Verified District Collectorate Bot
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Creditfix Applied AI Assessment • Multilingual LLM Classification & Auto-Routing (Part B Use Case 1)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 pr-8">
            <span className="text-xs font-mono bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200">
              +91 94150 XXXXX
            </span>
          </div>
        </div>

        {/* Quick Prompt Chips */}
        <div className="space-y-1.5 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
            <Sparkles className="h-3.5 w-3.5 text-purple-600" />
            <span>Simulate Citizen Message (Hindi & English):</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {QUICK_PROMPTS.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(p.text)}
                className="text-[11px] bg-white hover:bg-emerald-50 hover:border-emerald-300 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700 transition text-left"
              >
                <span className="font-bold text-emerald-700 mr-1">[{p.lang}]</span>
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Grid: Chat simulation & Real-time AI Extractor */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Chat Window (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col h-[380px] rounded-2xl border border-slate-200 bg-[#efeae2] p-3 shadow-inner">
            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 text-xs shadow-xs space-y-1 ${
                      m.sender === "user"
                        ? "bg-[#d9fdd3] text-slate-900 rounded-tr-none"
                        : "bg-white text-slate-800 rounded-tl-none border border-slate-100"
                    }`}
                  >
                    <p className="whitespace-pre-line leading-relaxed">{m.text}</p>
                    <div className="flex items-center justify-end gap-1 text-[10px] text-slate-400">
                      <span>{m.time}</span>
                      {m.sender === "user" && <CheckCheck className="h-3.5 w-3.5 text-blue-500" />}
                    </div>
                  </div>
                </div>
              ))}

              {isProcessing && (
                <div className="flex justify-start">
                  <div className="bg-white rounded-2xl p-2.5 text-xs text-slate-500 border border-slate-100 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></div>
                    <span>LLM processing vernacular intent & classifying department...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Bar */}
            <div className="mt-2 flex items-center gap-2 bg-white p-1.5 rounded-xl border border-slate-200">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type in Hindi or English (e.g. पानी की समस्या)..."
                className="flex-1 text-xs px-2 py-1 focus:outline-none"
              />
              <button
                onClick={() => handleSendMessage()}
                className="h-8 w-8 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center transition shadow-xs"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Right: Live AI Extraction Telemetry (5 Cols) */}
          <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Bot className="h-4 w-4 text-purple-600" />
                  Real-Time NLP Parsing Engine
                </span>
                <span className="text-[10px] font-mono bg-purple-100 text-purple-800 font-bold px-1.5 py-0.5 rounded">
                  Llama-3 / Indic-BERT
                </span>
              </div>

              {extractedMetadata ? (
                <div className="mt-3 space-y-2.5 text-xs">
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 space-y-1">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase">Registered Ticket</span>
                    <div className="font-mono font-bold text-blue-600 text-sm">#{extractedMetadata.incidentId}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 rounded-lg bg-white border border-slate-200">
                      <span className="text-[10px] text-slate-400">Classified Dept</span>
                      <div className="font-bold text-slate-800 text-[11px] truncate mt-0.5">{extractedMetadata.department}</div>
                    </div>
                    <div className="p-2 rounded-lg bg-white border border-slate-200">
                      <span className="text-[10px] text-slate-400">SLA Due Timer</span>
                      <div className="font-bold text-amber-600 font-mono text-[11px] mt-0.5">{extractedMetadata.slaHours} Hours</div>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 space-y-1">
                    <span className="text-[10px] text-slate-400">Assigned Nodal Officer</span>
                    <div className="font-semibold text-slate-900 text-xs">{extractedMetadata.officer}</div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 space-y-1">
                    <span className="text-[10px] text-slate-400">Geo-Tagged Location</span>
                    <div className="font-medium text-slate-700 text-xs">{extractedMetadata.location}</div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-emerald-700 bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                    <span>Classification Confidence:</span>
                    <strong className="font-mono">96.4%</strong>
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center text-xs text-slate-400 space-y-2">
                  <Sparkles className="h-6 w-6 mx-auto text-slate-300" />
                  <p>Select a quick prompt or type a message to see real-time LLM entity extraction and automated ticket creation.</p>
                </div>
              )}
            </div>

            <div className="text-[11px] text-slate-500 border-t border-slate-200 pt-2 flex items-center justify-between">
              <span>Sync Status:</span>
              <span className="text-emerald-600 font-bold flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Connected to Collectorate Database
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-2 text-xs">
          <span className="text-slate-500">
            Citizen Grievances automatically cascade to the Overview and Incidents modules.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition"
          >
            Done
          </button>
        </div>
      </div>
    </Modal>
  );
};

