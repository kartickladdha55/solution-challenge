export function matchScore(need, volunteer) {
  let score = 0;
  
  // Skill match: +40 points if volunteer has a skill matching the need's category
  if (volunteer.skills.includes(need.category)) {
    score += 40;
  }
  
  // Proximity: +30 if same district, +15 if adjacent
  if (volunteer.district === need.district) {
    score += 30;
  } else {
    const adjacencies = {
      'Riverside': ['North Ward', 'Old Town'],
      'North Ward': ['Riverside', 'Market District', 'Green Valley'],
      'Market District': ['North Ward', 'West Side', 'South Port'],
      'Old Town': ['Riverside', 'West Side'],
      'West Side': ['Old Town', 'Market District', 'South Port'],
      'South Port': ['Market District', 'West Side', 'Green Valley'],
      'Green Valley': ['North Ward', 'South Port']
    };
    
    if (adjacencies[need.district]?.includes(volunteer.district)) {
      score += 15;
    }
  }
  
  // Availability: +30 if Available, 0 if On Assignment
  if (volunteer.availability === "Available") {
    score += 30;
  }
  
  return score;
}

export function getTopMatches(need, volunteers, limit = 3) {
  return volunteers
    .map(volunteer => ({
      volunteer,
      score: matchScore(need, volunteer)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
