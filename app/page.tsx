"use client";

import { useState } from "react";
import { experimental_useObject as useObject } from "ai/react";
import { VideoAnalysisSchema } from "../lib/rules";
import { Sparkles, Youtube, Zap, Mic, Hash, TrendingUp } from "lucide-react";

export default function Page() {
  const [url, setUrl] = useState("");
  const { object, submit, isLoading } = useObject({
    api: "/api/analyze",
    schema: VideoAnalysisSchema,
  });

  return (
    <div className="min-h-screen bg-[#0C0C0F] text-white font-sans p-4 md:p-8">
      <nav className="max-w-6xl mx-auto flex items-center justify-between mb-12">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Sparkles size={18} />
          </div>
          <span className="font-bold tracking-tight">Clipforge</span>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter">
          Turn any video into <span className="text-indigo-500">5 viral clips.</span>
        </h1>
        <p className="text-gray-400 mb-8">Paste a YouTube URL and let Gemini Pro do the work.</p>

        <div className="bg-[#111116] border border-white/5 p-2 rounded-2xl flex flex-col md:flex-row gap-2 shadow-2xl">
          <input 
            className="flex-1 bg-transparent p-4 outline-none text-sm font-mono"
            placeholder="https://youtube.com/watch?v=..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button 
            onClick={() => submit({ youtubeUrl: url })}
            disabled={isLoading}
            className="bg-indigo-600 hover:bg-indigo-500 px-8 py-4 rounded-xl font-bold transition-all disabled:opacity-50"
          >
            {isLoading ? "Analyzing..." : "Generate Clips"}
          </button>
        </div>

        {object?.scripts && (
          <div className="mt-16 text-left grid gap-6">
            {object.scripts.map((script, i) => (
              <div key={i} className="bg-[#111116] border border-white/5 p-6 rounded-2xl">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-indigo-500 font-mono text-xs uppercase tracking-widest">Script 0{i+1}</span>
                  <span className="bg-white/5 px-2 py-1 rounded text-[10px]">{script?.targetPlatform}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{script?.title}</h3>
                <div className="space-y-4">
                  <div className="bg-indigo-500/5 border border-indigo-500/10 p-3 rounded-xl">
                    <p className="text-indigo-400 text-[10px] font-bold uppercase mb-1">Hook</p>
                    <p className="text-sm italic">"{script?.hook?.spoken}"</p>
                  </div>
                  <div className="space-y-2">
                    {script?.body?.map((line, li) => (
                      <p key={li} className="text-sm text-gray-300">
                        <span className="text-white/20 mr-2">{li + 1}</span> {line.line}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
