"use client";

import React, { useState, useMemo } from 'react';
import { useAppContext } from '@/context/AppContext';

const DistrictMap = ({ onDistrictClick }) => {
  const { needs } = useAppContext();
  const [hoveredDistrict, setHoveredDistrict] = useState(null);

  const districts = [
    { id: 'north', name: 'North Ward', x: 100, y: 50, w: 150, h: 80 },
    { id: 'riverside', name: 'Riverside', x: 50, y: 130, w: 120, h: 100 },
    { id: 'market', name: 'Market District', x: 170, y: 130, w: 130, h: 100 },
    { id: 'old-town', name: 'Old Town', x: 50, y: 230, w: 100, h: 120 },
    { id: 'west', name: 'West Side', x: 150, y: 230, w: 100, h: 120 },
    { id: 'south', name: 'South Port', x: 250, y: 230, w: 150, h: 120 },
    { id: 'green', name: 'Green Valley', x: 300, y: 130, w: 100, h: 100 },
  ];

  const districtData = useMemo(() => {
    const data = {};
    districts.forEach(d => {
      const districtNeeds = needs.filter(n => n.district === d.name && n.status === 'Open');
      const avgUrgency = districtNeeds.length > 0 
        ? districtNeeds.reduce((sum, n) => sum + n.urgencyScore, 0) / districtNeeds.length 
        : 0;
      data[d.name] = {
        count: districtNeeds.length,
        avgUrgency,
        topCategory: districtNeeds.length > 0 
          ? [...districtNeeds].sort((a,b) => b.urgencyScore - a.urgencyScore)[0].category 
          : 'None'
      };
    });
    return data;
  }, [needs]);

  const getColor = (urgency) => {
    if (urgency === 0) return '#f3f4f6';
    if (urgency < 30) return '#fde68a'; // Low
    if (urgency < 60) return '#fbbf24'; // Medium
    if (urgency < 85) return '#ea580c'; // High
    return '#dc2626'; // Critical
  };

  return (
    <div className="relative bg-white rounded-xl shadow-md p-6 border border-stone-100 overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-stone-900">District Urgency Heatmap</h3>
        <div className="flex gap-4 text-xs font-medium">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-[#fde68a] rounded-sm"></div>
            <span>Low</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-[#dc2626] rounded-sm"></div>
            <span>Critical</span>
          </div>
        </div>
      </div>

      <div className="relative aspect-[4/3] w-full">
        <svg viewBox="0 0 450 400" className="w-full h-full">
          {districts.map((d) => {
            const data = districtData[d.name];
            return (
              <g 
                key={d.id} 
                className="cursor-pointer transition-opacity hover:opacity-80"
                onMouseEnter={() => setHoveredDistrict(d.name)}
                onMouseLeave={() => setHoveredDistrict(null)}
                onClick={() => onDistrictClick && onDistrictClick(d.name)}
              >
                <rect 
                  x={d.x} 
                  y={d.y} 
                  width={d.w} 
                  height={d.h} 
                  fill={getColor(data.avgUrgency)} 
                  stroke="#fff" 
                  strokeWidth="2"
                  rx="4"
                />
                <text 
                  x={d.x + d.w / 2} 
                  y={d.y + d.h / 2} 
                  textAnchor="middle" 
                  className="text-[10px] font-bold fill-stone-900 pointer-events-none"
                >
                  {d.name}
                </text>
                {data.count > 0 && (
                  <circle 
                    cx={d.x + d.w - 15} 
                    cy={d.y + 15} 
                    r="8" 
                    fill="#1c1917" 
                  />
                )}
                {data.count > 0 && (
                  <text 
                    x={d.x + d.w - 15} 
                    y={d.y + 19} 
                    textAnchor="middle" 
                    className="text-[8px] font-bold fill-white pointer-events-none"
                  >
                    {data.count}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {hoveredDistrict && districtData[hoveredDistrict] && (
          <div className="absolute top-4 right-4 bg-stone-900 text-white p-3 rounded-lg shadow-xl text-xs z-10 w-48 pointer-events-none animate-in fade-in zoom-in duration-200">
            <p className="font-bold border-b border-stone-700 pb-1 mb-2 text-[#f4a261]">{hoveredDistrict}</p>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Open Needs:</span>
                <span className="font-bold">{districtData[hoveredDistrict].count}</span>
              </div>
              <div className="flex justify-between">
                <span>Avg Urgency:</span>
                <span className="font-bold">{Math.round(districtData[hoveredDistrict].avgUrgency)}</span>
              </div>
              <div className="flex justify-between">
                <span>Top Category:</span>
                <span className="font-bold">{districtData[hoveredDistrict].topCategory}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DistrictMap;
