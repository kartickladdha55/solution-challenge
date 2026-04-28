"use client";

import React, { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import UrgencyBadge from '@/components/UrgencyBadge';
import Modal from '@/components/Modal';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export default function NeedsRegistry() {
  const { needs, addNeed, resolveNeed } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDistrict, setFilterDistrict] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Form state
  const [formData, setFormData] = useState({
    district: '',
    category: '',
    description: '',
    reportedBy: '',
    estimatedPeopleAffected: 1,
    urgency: 'Medium'
  });

  const districts = ['Riverside', 'North Ward', 'Market District', 'Old Town', 'West Side', 'South Port', 'Green Valley'];
  const categories = ['Food', 'Medical', 'Education', 'Shelter', 'Mental Health', 'Infrastructure', 'Elder Care', 'Child Care'];

  const filteredNeeds = needs.filter(need => {
    const matchesSearch = need.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         need.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDistrict = filterDistrict === 'All' || need.district === filterDistrict;
    const matchesCategory = filterCategory === 'All' || need.category === filterCategory;
    const matchesStatus = filterStatus === 'All' || need.status === filterStatus;
    
    return matchesSearch && matchesDistrict && matchesCategory && matchesStatus;
  });

  const totalPages = Math.ceil(filteredNeeds.length / itemsPerPage);
  const paginatedNeeds = filteredNeeds.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urgencyScores = { 'Low': 25, 'Medium': 50, 'High': 75, 'Critical': 95 };
    addNeed({
      ...formData,
      urgencyScore: urgencyScores[formData.urgency]
    });
    setIsModalOpen(false);
    setFormData({
      district: '',
      category: '',
      description: '',
      reportedBy: '',
      estimatedPeopleAffected: 1,
      urgency: 'Medium'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-stone-900 mb-2">Community Needs Registry</h1>
          <p className="text-stone-500">Full searchable list of all reported community needs.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#e76f51] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#d65d40] transition-colors shadow-lg shadow-[#e76f51]/20"
        >
          <Plus size={20} /> Report New Need
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-100 flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by ID or description..." 
            className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e76f51]/20"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select 
          className="bg-stone-50 border border-stone-100 rounded-lg px-4 py-2 text-sm focus:outline-none"
          value={filterDistrict}
          onChange={(e) => setFilterDistrict(e.target.value)}
        >
          <option value="All">All Districts</option>
          {districts.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        <select 
          className="bg-stone-50 border border-stone-100 rounded-lg px-4 py-2 text-sm focus:outline-none"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select 
          className="bg-stone-50 border border-stone-100 rounded-lg px-4 py-2 text-sm focus:outline-none"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Open">Open</option>
          <option value="Matched">Matched</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-md border border-stone-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-stone-50 text-stone-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">ID</th>
                <th className="px-6 py-4 font-semibold">District</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold">Description</th>
                <th className="px-6 py-4 font-semibold">Urgency</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {paginatedNeeds.map((need) => (
                <tr key={need.id} className="hover:bg-stone-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-stone-900">{need.id}</td>
                  <td className="px-6 py-4 text-sm text-stone-600">{need.district}</td>
                  <td className="px-6 py-4 text-sm text-stone-600">{need.category}</td>
                  <td className="px-6 py-4 text-sm text-stone-600 max-w-xs truncate">{need.description}</td>
                  <td className="px-6 py-4">
                    <UrgencyBadge urgency={need.urgency} />
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                      need.status === 'Resolved' ? 'bg-green-100 text-green-700' :
                      need.status === 'Matched' ? 'bg-blue-100 text-blue-700' :
                      'bg-stone-100 text-stone-600'
                    }`}>
                      {need.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      {need.status !== 'Resolved' && (
                        <button 
                          onClick={() => resolveNeed(need.id)}
                          className="text-xs font-bold text-[#2a9d8f] hover:underline"
                        >
                          Resolve
                        </button>
                      )}
                      <button className="text-stone-400 hover:text-stone-600">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 bg-stone-50 border-t border-stone-100 flex justify-between items-center">
          <p className="text-sm text-stone-500">
            Showing {Math.min(filteredNeeds.length, (currentPage - 1) * itemsPerPage + 1)} to {Math.min(filteredNeeds.length, currentPage * itemsPerPage)} of {filteredNeeds.length} results
          </p>
          <div className="flex gap-2">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="p-2 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="p-2 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Report New Community Need"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-500 uppercase">District</label>
              <select 
                required
                className="w-full bg-stone-50 border border-stone-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#e76f51]/20"
                value={formData.district}
                onChange={(e) => setFormData({...formData, district: e.target.value})}
              >
                <option value="">Select District</option>
                {districts.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-500 uppercase">Category</label>
              <select 
                required
                className="w-full bg-stone-50 border border-stone-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#e76f51]/20"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                <option value="">Select Category</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
          
          <div className="space-y-1">
            <label className="text-xs font-bold text-stone-500 uppercase">Description</label>
            <textarea 
              required
              rows="3"
              className="w-full bg-stone-50 border border-stone-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#e76f51]/20"
              placeholder="What is specifically needed?"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-stone-500 uppercase">Reported By</label>
            <input 
              required
              type="text"
              className="w-full bg-stone-50 border border-stone-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#e76f51]/20"
              placeholder="Your name or organization"
              value={formData.reportedBy}
              onChange={(e) => setFormData({...formData, reportedBy: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-500 uppercase">People Affected</label>
              <input 
                type="number"
                min="1"
                className="w-full bg-stone-50 border border-stone-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#e76f51]/20"
                value={formData.estimatedPeopleAffected}
                onChange={(e) => setFormData({...formData, estimatedPeopleAffected: parseInt(e.target.value)})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-500 uppercase">Urgency Level</label>
              <select 
                className="w-full bg-stone-50 border border-stone-100 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#e76f51]/20"
                value={formData.urgency}
                onChange={(e) => setFormData({...formData, urgency: e.target.value})}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-[#e76f51] text-white py-3 rounded-xl font-bold hover:bg-[#d65d40] transition-colors mt-4"
          >
            Submit Report
          </button>
        </form>
      </Modal>
    </div>
  );
}
