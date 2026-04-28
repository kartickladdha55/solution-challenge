"use client";

import React, { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { getTopMatches } from '@/lib/matching';
import UrgencyBadge from '@/components/UrgencyBadge';
import { 
  Zap, 
  MapPin, 
  Target, 
  User, 
  History,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

export default function SmartMatching() {
  const { needs, volunteers, matches, assignMatch, autoMatch, toggleAutoMatch } = useAppContext();
  const [selectedNeedId, setSelectedNeedId] = useState(null);

  const openNeeds = needs
    .filter(n => n.status === 'Open')
    .sort((a, b) => b.urgencyScore - a.urgencyScore);

  const selectedNeed = needs.find(n => n.id === selectedNeedId);
  const candidates = selectedNeed ? getTopMatches(selectedNeed, volunteers) : [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-stone-900 mb-2">Smart Matching Center</h1>
          <p className="text-stone-500">Match open community needs with the best available volunteers.</p>
        </div>
        <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-xl border border-stone-100 shadow-sm">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${autoMatch ? 'bg-green-500 animate-pulse' : 'bg-stone-300'}`}></div>
            <span className="text-sm font-bold text-stone-700">Auto-Matching</span>
          </div>
          <button 
            onClick={toggleAutoMatch}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${autoMatch ? 'bg-[#e76f51]' : 'bg-stone-200'}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${autoMatch ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2 px-1">
            <History size={18} className="text-stone-400" /> Matching Queue
          </h3>
          <div className="space-y-3 max-h-[calc(100vh-250px)] overflow-y-auto pr-2 custom-scrollbar">
            {openNeeds.map((need) => (
              <div 
                key={need.id}
                onClick={() => setSelectedNeedId(need.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedNeedId === need.id 
                    ? 'bg-white border-[#e76f51] shadow-md ring-1 ring-[#e76f51]' 
                    : 'bg-white border-stone-100 hover:border-stone-300'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-stone-400">{need.id}</span>
                  <UrgencyBadge urgency={need.urgency} />
                </div>
                <h4 className="font-bold text-stone-900 text-sm mb-1">{need.category} Need</h4>
                <p className="text-xs text-stone-500 line-clamp-2 mb-3">{need.description}</p>
                <div className="flex items-center gap-1 text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                  <MapPin size={10} /> {need.district}
                </div>
              </div>
            ))}
            {openNeeds.length === 0 && (
              <div className="text-center py-12 bg-white rounded-xl border border-dashed border-stone-200">
                <CheckCircle2 size={32} className="text-green-500 mx-auto mb-2 opacity-20" />
                <p className="text-stone-400 text-sm italic">All needs matched!</p>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-2">
          {selectedNeed ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-[#e76f51]/10 text-[#e76f51] px-2 py-0.5 rounded text-xs font-bold">ACTIVE CASE</span>
                      <span className="text-stone-400 text-xs font-medium">{selectedNeed.id} • Reported {new Date(selectedNeed.reportedAt).toLocaleDateString()}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-stone-900 font-fraunces">{selectedNeed.category} in {selectedNeed.district}</h2>
                  </div>
                  <UrgencyBadge urgency={selectedNeed.urgency} />
                </div>
                <p className="mt-4 text-stone-600 bg-stone-50 p-4 rounded-lg italic">"{selectedNeed.description}"</p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2 px-1">
                  <Target size={18} className="text-[#e76f51]" /> Recommended Candidates
                </h3>
                
                <div className="grid gap-4">
                  {candidates.map((cand, index) => (
                    <div key={cand.volunteer.id} className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow flex flex-wrap items-center justify-between gap-6">
                      <div className="flex items-center gap-4 min-w-[200px]">
                        <div className="relative">
                          <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl ${
                            index === 0 ? 'bg-green-500' : 'bg-stone-300'
                          }`}>
                            {cand.volunteer.name[0]}
                          </div>
                          {index === 0 && (
                            <div className="absolute -top-1 -right-1 bg-yellow-400 text-white p-1 rounded-full shadow-sm">
                              <Zap size={10} fill="white" />
                            </div>
                          )}
                        </div>
                        <div>
                          <h4 className="font-bold text-stone-900">{cand.volunteer.name}</h4>
                          <div className="flex items-center gap-2 text-xs text-stone-500">
                            <MapPin size={12} /> {cand.volunteer.district}
                          </div>
                        </div>
                      </div>

                      <div className="flex-1 min-w-[150px]">
                        <div className="flex justify-between text-xs font-bold mb-1">
                          <span className="text-stone-400 uppercase tracking-wider">Match Score</span>
                          <span className={`${cand.score > 80 ? 'text-green-600' : 'text-stone-600'}`}>{cand.score}%</span>
                        </div>
                        <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-1000 ${cand.score > 80 ? 'bg-green-500' : 'bg-stone-400'}`}
                            style={{ width: `${cand.score}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 min-w-[200px]">
                        {cand.volunteer.skills.slice(0, 2).map(skill => (
                          <span key={skill} className="px-2 py-1 bg-stone-50 text-stone-500 rounded text-[10px] font-bold border border-stone-100">
                            {skill}
                          </span>
                        ))}
                      </div>

                      <button 
                        onClick={() => {
                          assignMatch(selectedNeed.id, cand.volunteer.id, cand.score);
                          setSelectedNeedId(null);
                        }}
                        className="bg-stone-900 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-stone-800 transition-colors flex items-center gap-2 ml-auto group"
                      >
                        Assign <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-stone-100 shadow-inner">
              <div className="bg-[#fdf6ee] p-6 rounded-full mb-6">
                <Zap size={48} className="text-[#e76f51] opacity-20" />
              </div>
              <h3 className="text-xl font-bold text-stone-900 font-fraunces mb-2">Ready to Match</h3>
              <p className="text-stone-400 text-center max-w-sm">
                Select a need from the queue to run the smart matching algorithm and find the best volunteer.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-12 bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-stone-50">
          <h3 className="text-lg font-bold text-stone-900">Recent Assignments</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-stone-50 text-stone-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Match ID</th>
                <th className="px-6 py-4 font-semibold">Need</th>
                <th className="px-6 py-4 font-semibold">Volunteer</th>
                <th className="px-6 py-4 font-semibold">Score</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Outcome</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {matches.slice(0, 5).map((match) => {
                const vol = volunteers.find(v => v.id === match.volunteerId);
                const nd = needs.find(n => n.id === match.needId);
                return (
                  <tr key={match.id} className="text-sm">
                    <td className="px-6 py-4 font-medium text-stone-900">{match.id}</td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-stone-700">{nd?.category}</p>
                      <p className="text-xs text-stone-400">{nd?.district}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-stone-200 flex items-center justify-center text-[10px] font-bold text-stone-600">
                          {vol?.name[0]}
                        </div>
                        <span className="font-medium text-stone-700">{vol?.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-stone-900">{match.matchScore}%</td>
                    <td className="px-6 py-4 text-stone-500">{new Date(match.matchedAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        match.outcome === 'Resolved' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {match.outcome}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
