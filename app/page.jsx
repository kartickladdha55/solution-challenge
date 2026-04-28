"use client";

import React, { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import StatCard from '@/components/StatCard';
import DistrictMap from '@/components/DistrictMap';
import ActivityFeed from '@/components/ActivityFeed';
import UrgencyBadge from '@/components/UrgencyBadge';
import { 
  AlertCircle, 
  Users, 
  CheckCircle2, 
  Zap,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const { needs, volunteers, matches } = useAppContext();
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const openNeeds = needs.filter(n => n.status === 'Open');
  const matchedNeeds = needs.filter(n => n.status === 'Matched');
  const resolvedNeeds = needs.filter(n => n.status === 'Resolved');
  const availableVolunteers = volunteers.filter(v => v.availability === 'Available');

  const filteredNeeds = selectedDistrict 
    ? openNeeds.filter(n => n.district === selectedDistrict)
    : openNeeds.slice(0, 10).sort((a, b) => b.urgencyScore - a.urgencyScore);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-stone-900 mb-2">Command Dashboard</h1>
        <p className="text-stone-500">Real-time overview of community needs and volunteer capacity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Open Needs" 
          value={openNeeds.length} 
          icon={AlertCircle} 
          trend="+12%" 
          color="primary"
        />
        <StatCard 
          title="Volunteers Available" 
          value={availableVolunteers.length} 
          icon={Users} 
          trend="-3%" 
          color="blue"
        />
        <StatCard 
          title="Matches Made" 
          value={matches.length} 
          icon={Zap} 
          trend="+24%" 
          color="accent"
        />
        <StatCard 
          title="Needs Resolved" 
          value={resolvedNeeds.length} 
          icon={CheckCircle2} 
          trend="+18%" 
          color="secondary"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <DistrictMap onDistrictClick={setSelectedDistrict} />
          
          <div className="bg-white rounded-xl shadow-md border border-stone-100 overflow-hidden">
            <div className="p-6 border-b border-stone-50 flex justify-between items-center">
              <h3 className="text-lg font-bold text-stone-900">
                {selectedDistrict ? `Needs in ${selectedDistrict}` : 'Top Urgent Needs'}
              </h3>
              {selectedDistrict && (
                <button 
                  onClick={() => setSelectedDistrict(null)}
                  className="text-xs font-bold text-[#e76f51] hover:underline"
                >
                  Clear Filter
                </button>
              )}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-stone-50 text-stone-500 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4 font-semibold">ID</th>
                    <th className="px-6 py-4 font-semibold">District</th>
                    <th className="px-6 py-4 font-semibold">Category</th>
                    <th className="px-6 py-4 font-semibold">Urgency</th>
                    <th className="px-6 py-4 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-50">
                  {filteredNeeds.length > 0 ? filteredNeeds.map((need) => (
                    <tr key={need.id} className="hover:bg-stone-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-stone-900">{need.id}</td>
                      <td className="px-6 py-4 text-sm text-stone-600">{need.district}</td>
                      <td className="px-6 py-4 text-sm text-stone-600">{need.category}</td>
                      <td className="px-6 py-4">
                        <UrgencyBadge urgency={need.urgency} />
                      </td>
                      <td className="px-6 py-4">
                        <Link 
                          href="/matching" 
                          className="text-[#e76f51] hover:text-[#d65d40] flex items-center gap-1 text-sm font-bold"
                        >
                          Find Match <ArrowRight size={14} />
                        </Link>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-8 text-center text-stone-400 text-sm italic">
                        No open needs found in this district.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-stone-50 border-t border-stone-100 text-center">
              <Link href="/needs" className="text-sm font-bold text-stone-500 hover:text-stone-700">
                View All Community Needs
              </Link>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}
