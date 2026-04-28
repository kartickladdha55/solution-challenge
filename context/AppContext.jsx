"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import initialNeeds from '@/data/mockNeeds.json';
import initialVolunteers from '@/data/mockVolunteers.json';
import initialMatches from '@/data/mockMatches.json';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [needs, setNeeds] = useState(initialNeeds);
  const [volunteers, setVolunteers] = useState(initialVolunteers);
  const [matches, setMatches] = useState(initialMatches);
  const [activityFeed, setActivityFeed] = useState([
    { id: 1, type: 'need', message: 'New medical need reported in Riverside', time: new Date() },
    { id: 2, type: 'match', message: 'Arun Mehta matched to NEED-001', time: new Date(Date.now() - 1000 * 60 * 60) },
  ]);
  const [autoMatch, setAutoMatch] = useState(false);

  const logActivity = (type, message) => {
    setActivityFeed(prev => [
      { id: Date.now(), type, message, time: new Date() },
      ...prev.slice(0, 19) // Keep last 20
    ]);
  };

  const addNeed = (need) => {
    const newNeed = {
      ...need,
      id: `NEED-${String(needs.length + 1).padStart(3, '0')}`,
      reportedAt: new Date().toISOString(),
      status: 'Open'
    };
    setNeeds(prev => [newNeed, ...prev]);
    logActivity('need', `New ${need.category} need reported in ${need.district}`);
    
    if (autoMatch) {
      // Basic auto-match logic could go here or be triggered by an effect
    }
  };

  const resolveNeed = (needId) => {
    setNeeds(prev => prev.map(n => n.id === needId ? { ...n, status: 'Resolved' } : n));
    logActivity('resolved', `Need ${needId} has been resolved`);
  };

  const addVolunteer = (volunteer) => {
    const newVolunteer = {
      ...volunteer,
      id: `VOL-${String(volunteers.length + 1).padStart(3, '0')}`,
      joinedAt: new Date().toISOString().split('T')[0],
      availability: 'Available',
      assignedNeedId: null
    };
    setVolunteers(prev => [newVolunteer, ...prev]);
    logActivity('volunteer', `New volunteer registered: ${volunteer.name}`);
  };

  const assignMatch = (needId, volunteerId, score) => {
    const matchId = `MATCH-${String(matches.length + 1).padStart(3, '0')}`;
    const newMatch = {
      id: matchId,
      needId,
      volunteerId,
      matchScore: score,
      matchedAt: new Date().toISOString(),
      outcome: 'In Progress'
    };

    setMatches(prev => [newMatch, ...prev]);
    setNeeds(prev => prev.map(n => n.id === needId ? { ...n, status: 'Matched' } : n));
    setVolunteers(prev => prev.map(v => v.id === volunteerId ? { ...v, availability: 'On Assignment', assignedNeedId: needId } : v));
    
    const volunteerName = volunteers.find(v => v.id === volunteerId)?.name;
    logActivity('match', `${volunteerName} assigned to ${needId}`);
  };

  const toggleAutoMatch = () => setAutoMatch(prev => !prev);

  return (
    <AppContext.Provider value={{
      needs,
      volunteers,
      matches,
      activityFeed,
      autoMatch,
      addNeed,
      resolveNeed,
      addVolunteer,
      assignMatch,
      toggleAutoMatch,
      logActivity
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
