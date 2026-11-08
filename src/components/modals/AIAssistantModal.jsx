import React, { useState } from "react";
import { Modal } from "../common/Modal";
import { Bot, Send, Sparkles, HelpCircle, CheckCircle, ArrowRight, ShieldCheck } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { PRESET_AI_QUERIES, processAIQuery } from "../../services/mockAIService";
import { useNavigate } from "react-router-dom";

export const AIAssistantModal = ({ isOpen, onClose }) => {
  const appState = useApp();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      sender: "ai",
      title: "Creditfix Collectorate AI Copilot Online",
      content:
        "Welcome, Officer. I am your operational AI decision assistant for Creditfix District Administration (Collectorate HQ). I monitor citizen grievances, file movements, review meeting agendas, and cross-vertical IoT telemetry across agriculture, waste, traffic, water, flood, and environment. How may I assist your administration today?",
      confidence: 100,
      timestamp: "Just now"
    }
  ]);
  const [inputQuery, setInputQuery] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSend = (queryText) => {
    const text = queryText || inputQuery;
    if (!text.trim()) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: "user",
      content: text,
      timestamp: "Just now"
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery("");
    setIsProcessing(true);

    setTimeout(() => {
      const aiResult = processAIQuery(text, appState);
      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        title: aiResult.title,
        content: aiResult.response,
        recommendedAction: aiResult.recommendedAction,
        category: aiResult.category,
        confidence: aiResult.confidence,
        timestamp: "Just now"
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsProcessing(false);
    }, 400);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Creditfix Collectorate AI Copilot • District Administration"
      maxWidth="max-w-3xl"
    >
      <div className="flex flex-col h-[560px]">
        {/* Banner with Simulation note */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
              <Bot className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-900 flex items-center gap-1.5">
                Creditfix Collectorate AI Copilot <span className="text-[10px] bg-purple-100 text-purple-800 font-mono px-1.5 py-0.5 rounded">v2.4-Simulated</span>
              </div>
              <div className="text-[11px] text-slate-500">Autonomous Edge Heuristics & Local Telemetry Ingestion</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            Human-in-the-Loop Architecture
          </div>
        </div>

        {/* Preset Query Chips */}
        <div className="mb-3">
          <div className="text-[11px] font-medium text-slate-500 mb-1.5 flex items-center gap-1">
            <Sparkles className="h-3 w-3 text-purple-600" />
            Suggested Executive Queries:
          </div>
          <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto pr-1">
            {PRESET_AI_QUERIES.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="rounded-full bg-slate-100 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200 border border-slate-200 px-2.5 py-1 text-[11px] font-medium text-slate-700 transition text-left"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 mb-3">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {m.sender === "user" ? (
                <div className="max-w-[80%] rounded-2xl bg-blue-600 text-white p-3 text-xs shadow-sm">
                  {m.content}
                </div>
              ) : (
                <div className="max-w-[92%] rounded-2xl bg-slate-50 border border-slate-200 p-4 text-xs text-slate-800 shadow-sm space-y-2.5">
                  <div className="flex items-center justify-between border-b border-slate-200/80 pb-1.5">
                    <span className="font-semibold text-slate-900 flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-purple-600" />
                      {m.title || "District Intelligence Response"}
                    </span>
                    {m.confidence && (
                      <span className="text-[10px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                        {m.confidence}% Confidence
                      </span>
                    )}
                  </div>
                  <div className="whitespace-pre-line leading-relaxed text-slate-700 font-sans">
                    {m.content}
                  </div>
                  {m.recommendedAction && (
                    <div className="mt-2.5 rounded-lg bg-purple-50/70 border border-purple-200/80 p-2.5 text-purple-900">
                      <div className="font-semibold text-[11px] uppercase tracking-wider mb-1 flex items-center gap-1 text-purple-800">
                        <CheckCircle className="h-3 w-3 text-purple-700" />
                        Executive Recommendation:
                      </div>
                      <div className="text-xs">{m.recommendedAction}</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
          {isProcessing && (
            <div className="flex items-center gap-2 text-xs text-slate-500 italic p-2">
              <Bot className="h-4 w-4 animate-spin text-purple-600" />
              Synthesizing cross-domain IoT readings...
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2 border-t border-slate-100 pt-3"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask about irrigation, traffic jams, bin overflow, water pressure, incidents..."
            className="flex-1 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || isProcessing}
            className="rounded-xl bg-purple-600 hover:bg-purple-700 text-white px-4 py-2.5 text-xs font-semibold shadow transition flex items-center gap-1.5 disabled:opacity-50"
          >
            <span>Send</span>
            <Send className="h-3.5 w-3.5" />
          </button>
        </form>
      </div>
    </Modal>
  );
};

