"use client";

import React from 'react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  Legend
} from 'recharts';
import { useAppContext } from '@/context/AppContext';
import analyticsData from '@/data/mockAnalytics.json';
import StatCard from '@/components/StatCard';
import { 
  TrendingUp, 
  Target, 
  Clock, 
  Users,
  AlertTriangle
} from 'lucide-react';

export default function Analytics() {
  const { needs, volunteers } = useAppContext();

  const COLORS = ['#e76f51', '#2a9d8f', '#f4a261', '#264653', '#e9c46a', '#8ab17d', '#b5838d'];

  const coverageGap = analyticsData.needsByCategory.map(cat => {
    const availableVolunteers = volunteers.filter(v => v.skills.includes(cat.name)).length;
    return {
      category: cat.name,
      needs: cat.value,
      volunteers: availableVolunteers,
      gap: cat.value - availableVolunteers
    };
  }).sort((a, b) => b.gap - a.gap);

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-stone-900 mb-2">Impact Analytics</h1>
        <p className="text-stone-500">Visualizing our community reach and operational effectiveness.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Monthly Reports" 
          value={analyticsData.kpis.needsReportedThisMonth} 
          icon={TrendingUp} 
          color="primary"
        />
        <StatCard 
          title="Match Rate" 
          value={`${analyticsData.kpis.matchRate}%`} 
          icon={Target} 
          color="secondary"
        />
        <StatCard 
          title="Avg Match Time" 
          value={analyticsData.kpis.avgTimeToMatch} 
          icon={Clock} 
          color="accent"
        />
        <StatCard 
          title="Active Volunteers" 
          value={analyticsData.kpis.volunteersActive} 
          icon={Users} 
          color="blue"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm">
          <h3 className="text-lg font-bold text-stone-900 mb-8 font-fraunces">Needs Reported vs Resolved (8 Weeks)</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analyticsData.needsOverTime}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="week" stroke="#a8a29e" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#a8a29e" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1c1917', border: 'none', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ fontSize: '12px' }}
                />
                <Legend />
                <Line type="monotone" dataKey="reported" stroke="#e76f51" strokeWidth={3} dot={{ r: 4, fill: '#e76f51' }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="resolved" stroke="#2a9d8f" strokeWidth={3} dot={{ r: 4, fill: '#2a9d8f' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm">
          <h3 className="text-lg font-bold text-stone-900 mb-8 font-fraunces">Needs by Category</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData.needsByCategory}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#a8a29e" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#a8a29e" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: '#fdf6ee' }}
                  contentStyle={{ backgroundColor: '#1c1917', border: 'none', borderRadius: '8px', color: '#fff' }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {analyticsData.needsByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm">
          <h3 className="text-lg font-bold text-stone-900 mb-8 font-fraunces">Volunteer Skill Distribution</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analyticsData.volunteerSkills}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {analyticsData.volunteerSkills.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1c1917', border: 'none', borderRadius: '8px', color: '#fff' }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
          <h3 className="text-lg font-bold text-stone-900 mb-6 font-fraunces flex items-center gap-2">
            <AlertTriangle size={20} className="text-[#e76f51]" /> Coverage Gaps
          </h3>
          <div className="space-y-4">
            {coverageGap.slice(0, 5).map((item) => (
              <div key={item.category} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-bold text-stone-700">{item.category}</span>
                  <span className="text-stone-400 font-medium">Gap: {item.gap}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-stone-100 rounded-full overflow-hidden flex">
                    <div 
                      className="h-full bg-[#2a9d8f]" 
                      style={{ width: `${(item.volunteers / (item.needs + item.volunteers)) * 100}%` }}
                    />
                    <div 
                      className="h-full bg-[#e76f51]" 
                      style={{ width: `${(item.needs / (item.needs + item.volunteers)) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-[#e76f51] min-w-[30px]">{item.needs} needs</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 p-4 bg-[#fdf6ee] rounded-xl border border-[#f4a261]/20">
            <p className="text-xs text-[#e76f51] font-bold uppercase tracking-wider mb-1">Strategic Insight</p>
            <p className="text-sm text-stone-700 italic">
              "We have a significant volunteer shortage in <strong>{coverageGap[0].category}</strong>. Recommend targeted recruitment drive in <strong>Riverside</strong>."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
