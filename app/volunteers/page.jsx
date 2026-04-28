"use client";

import React, { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import Modal from '@/components/Modal';
import Drawer from '@/components/Drawer';
import { 
  UserPlus, 
  Search, 
  MapPin, 
  Clock, 
  Mail,
  Calendar,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function VolunteerRegistry() {
  const { volunteers, matches, addVolunteer } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSkill, setFilterSkill] = useState('All');
  const [filterAvailability, setFilterAvailability] = useState('All');

  const skills = ['Medical', 'Food', 'Education', 'Shelter', 'Mental Health', 'Infrastructure', 'Elder Care', 'Child Care', 'Logistics', 'IT Skills', 'Counseling'];
  const districts = ['Riverside', 'North Ward', 'Market District', 'Old Town', 'West Side', 'South Port', 'Green Valley'];

  const [formData, setFormData] = useState({
    name: '',
    district: '',
    skills: [],
    languages: ['English'],
    hoursPerWeek: 10
  });

  const filteredVolunteers = volunteers.filter(v => {
    const matchesSearch = v.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSkill = filterSkill === 'All' || v.skills.includes(filterSkill);
    const matchesAvailability = filterAvailability === 'All' || v.availability === filterAvailability;
    return matchesSearch && matchesSkill && matchesAvailability;
  });

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getAvatarColor = (name) => {
    const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500', 'bg-orange-500'];
    const charCode = name.charCodeAt(0);
    return colors[charCode % colors.length];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addVolunteer(formData);
    setIsModalOpen(false);
    setFormData({ name: '', district: '', skills: [], languages: ['English'], hoursPerWeek: 10 });
  };

  const toggleSkill = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill) 
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-stone-900 mb-2">Volunteer Registry</h1>
          <p className="text-stone-500">A roster of all registered volunteers and their availability.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#2a9d8f] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#238b7e] transition-colors shadow-lg shadow-[#2a9d8f]/20"
        >
          <UserPlus size={20} /> Register Volunteer
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-100 flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name..." 
            className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a9d8f]/20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select 
          className="bg-stone-50 border border-stone-100 rounded-lg px-4 py-2 text-sm focus:outline-none"
          value={filterSkill}
          onChange={(e) => setFilterSkill(e.target.value)}
        >
          <option value="All">All Skills</option>
          {skills.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select 
          className="bg-stone-50 border border-stone-100 rounded-lg px-4 py-2 text-sm focus:outline-none"
          value={filterAvailability}
          onChange={(e) => setFilterAvailability(e.target.value)}
        >
          <option value="All">All Availability</option>
          <option value="Available">Available</option>
          <option value="On Assignment">On Assignment</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVolunteers.map((volunteer) => (
          <div 
            key={volunteer.id}
            className="bg-white rounded-2xl shadow-md border border-stone-100 p-6 hover:shadow-lg transition-shadow cursor-pointer group"
            onClick={() => setSelectedVolunteer(volunteer)}
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 ${getAvatarColor(volunteer.name)} rounded-full flex items-center justify-center text-white font-bold text-lg`}>
                {getInitials(volunteer.name)}
              </div>
              <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                volunteer.availability === 'Available' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
              }`}>
                {volunteer.availability}
              </span>
            </div>
            <h3 className="text-lg font-bold text-stone-900 group-hover:text-[#e76f51] transition-colors">{volunteer.name}</h3>
            <div className="flex items-center gap-1 text-stone-500 text-sm mt-1">
              <MapPin size={14} /> {volunteer.district}
            </div>
            
            <div className="mt-4 flex flex-wrap gap-2">
              {volunteer.skills.map(skill => (
                <span key={skill} className="px-2 py-0.5 bg-stone-100 text-stone-600 rounded text-xs font-medium">
                  {skill}
                </span>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-stone-50 flex justify-between items-center text-xs">
              <div className="flex items-center gap-1 text-stone-400">
                <Clock size={14} /> {volunteer.hoursPerWeek}h / week
              </div>
              <button className="text-[#e76f51] font-bold">View Profile</button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Register New Volunteer">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-stone-500 uppercase">Full Name</label>
            <input 
              required
              type="text"
              className="w-full bg-stone-50 border border-stone-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2a9d8f]/20"
              placeholder="e.g. John Doe"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-stone-500 uppercase">District</label>
            <select 
              required
              className="w-full bg-stone-50 border border-stone-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2a9d8f]/20"
              value={formData.district}
              onChange={(e) => setFormData({...formData, district: e.target.value})}
            >
              <option value="">Select District</option>
              {districts.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-stone-500 uppercase">Skills (Select all that apply)</label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {skills.map(skill => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => toggleSkill(skill)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors text-left ${
                    formData.skills.includes(skill)
                      ? 'bg-[#2a9d8f] text-white border-[#2a9d8f]'
                      : 'bg-white text-stone-600 border-stone-200 hover:border-[#2a9d8f]'
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-stone-500 uppercase">Hours Available Per Week</label>
            <input 
              type="number"
              min="1"
              max="168"
              className="w-full bg-stone-50 border border-stone-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2a9d8f]/20"
              value={formData.hoursPerWeek}
              onChange={(e) => setFormData({...formData, hoursPerWeek: parseInt(e.target.value)})}
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-[#2a9d8f] text-white py-3 rounded-xl font-bold hover:bg-[#238b7e] transition-colors mt-4"
          >
            Register Volunteer
          </button>
        </form>
      </Modal>

      <Drawer 
        isOpen={!!selectedVolunteer} 
        onClose={() => setSelectedVolunteer(null)} 
        title="Volunteer Profile"
      >
        {selectedVolunteer && (
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className={`w-20 h-20 ${getAvatarColor(selectedVolunteer.name)} rounded-full flex items-center justify-center text-white font-bold text-3xl shadow-lg`}>
                {getInitials(selectedVolunteer.name)}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-stone-900">{selectedVolunteer.name}</h2>
                <div className="flex items-center gap-1 text-stone-500">
                  <MapPin size={14} /> {selectedVolunteer.district}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-stone-50 p-4 rounded-xl">
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">Availability</p>
                <div className="flex items-center gap-2">
                  {selectedVolunteer.availability === 'Available' ? (
                    <CheckCircle2 size={16} className="text-green-500" />
                  ) : (
                    <AlertCircle size={16} className="text-orange-500" />
                  )}
                  <span className="font-bold text-stone-700">{selectedVolunteer.availability}</span>
                </div>
              </div>
              <div className="bg-stone-50 p-4 rounded-xl">
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">Weekly Commitment</p>
                <div className="flex items-center gap-2 text-stone-700">
                  <Clock size={16} className="text-stone-400" />
                  <span className="font-bold">{selectedVolunteer.hoursPerWeek} Hours</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-stone-900 border-b border-stone-100 pb-2 flex items-center gap-2">
                Expertise & Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedVolunteer.skills.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-[#2a9d8f]/10 text-[#2a9d8f] rounded-full text-xs font-bold">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-stone-900 border-b border-stone-100 pb-2 flex items-center gap-2">
                Information
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Mail size={16} className="text-stone-400" />
                  <span className="text-stone-600">{selectedVolunteer.name.toLowerCase().replace(' ', '.')}@example.com</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar size={16} className="text-stone-400" />
                  <span className="text-stone-600">Joined {selectedVolunteer.joinedAt}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-stone-900 border-b border-stone-100 pb-2">
                Assignment History
              </h4>
              <div className="space-y-3">
                {matches.filter(m => m.volunteerId === selectedVolunteer.id).map(match => (
                  <div key={match.id} className="flex justify-between items-center text-sm p-3 bg-white border border-stone-100 rounded-lg shadow-sm">
                    <div>
                      <p className="font-bold text-stone-800">{match.needId}</p>
                      <p className="text-xs text-stone-400">{new Date(match.matchedAt).toLocaleDateString()}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      match.outcome === 'Resolved' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {match.outcome}
                    </span>
                  </div>
                ))}
                {matches.filter(m => m.volunteerId === selectedVolunteer.id).length === 0 && (
                  <p className="text-sm text-stone-400 italic">No historical assignments.</p>
                )}
              </div>
            </div>

            <button className="w-full bg-[#e76f51] text-white py-4 rounded-xl font-bold shadow-lg shadow-[#e76f51]/20 hover:bg-[#d65d40] transition-all">
              Assign to New Task
            </button>
          </div>
        )}
      </Drawer>
    </div>
  );
}
