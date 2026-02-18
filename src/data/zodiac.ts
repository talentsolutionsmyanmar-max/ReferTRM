// Zodiac Career Insights Data
// Connecting astrology to career development for Myanmar youth

export interface ZodiacSign {
  id: string;
  name: string;
  symbol: string;
  element: 'Fire' | 'Earth' | 'Air' | 'Water';
  quality: 'Cardinal' | 'Fixed' | 'Mutable';
  dates: string;
  rulingPlanet: string;
  traits: {
    positive: string[];
    negative: string[];
  };
  career: {
    strengths: string[];
    developmentAreas: string[];
    idealCareers: string[];
    workStyle: string;
    leadershipStyle: string;
  };
  softSkills: {
    natural: string[];
    toDevelop: string[];
  };
  recommendedCourses: string[];
  monthlyHoroscope: {
    career: string;
    love: string;
    health: string;
    lucky: {
      number: string;
      color: string;
      day: string;
    };
  };
  famousPeople: string[];
  compatibility: {
    best: string[];
    good: string[];
    challenging: string[];
  };
}

export const zodiacSigns: ZodiacSign[] = [
  {
    id: 'aries',
    name: 'Aries',
    symbol: '♈',
    element: 'Fire',
    quality: 'Cardinal',
    dates: 'Mar 21 - Apr 19',
    rulingPlanet: 'Mars',
    traits: {
      positive: ['Courageous', 'Determined', 'Confident', 'Enthusiastic', 'Passionate'],
      negative: ['Impatient', 'Short-tempered', 'Impulsive', 'Aggressive'],
    },
    career: {
      strengths: [
        'Natural born leader with pioneering spirit',
        'Thrives under pressure and tight deadlines',
        'Excellent at initiating new projects',
        'Decisive action-taker',
        'Inspiring motivator for teams',
      ],
      developmentAreas: [
        'Learning to listen before acting',
        'Developing patience with slower processes',
        'Following through on projects after the excitement fades',
        'Accepting constructive criticism gracefully',
        'Building long-term strategic thinking',
      ],
      idealCareers: [
        'Entrepreneur / Startup Founder',
        'Sales Director',
        'Marketing Manager',
        'Sports Professional',
        'Emergency Services (Firefighter, Paramedic)',
        'Military / Defense',
        'Project Manager',
        'Business Development',
      ],
      workStyle: 'Thrives in fast-paced, competitive environments. Prefers autonomy and dislikes micromanagement. Works best with clear goals and the freedom to achieve them independently.',
      leadershipStyle: 'Lead from the front. Inspiring and motivating, but may need to develop patience for team members who process differently.',
    },
    softSkills: {
      natural: ['Initiative', 'Confidence', 'Motivation', 'Decisiveness'],
      toDevelop: ['Active Listening', 'Patience', 'Diplomacy', 'Strategic Planning'],
    },
    recommendedCourses: ['Leadership & Management', 'Emotional Intelligence', 'Strategic Thinking', 'Communication Skills'],
    monthlyHoroscope: {
      career: 'This month brings exciting opportunities for career advancement. A new project or role may present itself around mid-month. Trust your instincts but take time to review details before signing contracts.',
      love: 'Passion runs high this month. Single Aries may encounter someone intriguing at a professional event. Committed Aries should prioritize quality time.',
      health: 'Energy levels are high, but avoid burnout. Incorporate stress-relief practices like meditation or yoga.',
      lucky: { number: '9', color: 'Red', day: 'Tuesday' },
    },
    famousPeople: ['Lady Gaga', 'Robert Downey Jr.', 'Mariah Carey', 'Elon Musk'],
    compatibility: { best: ['Leo', 'Sagittarius', 'Gemini'], good: ['Aquarius', 'Libra'], challenging: ['Cancer', 'Capricorn'] },
  },
  {
    id: 'taurus',
    name: 'Taurus',
    symbol: '♉',
    element: 'Earth',
    quality: 'Fixed',
    dates: 'Apr 20 - May 20',
    rulingPlanet: 'Venus',
    traits: {
      positive: ['Reliable', 'Patient', 'Practical', 'Devoted', 'Stable'],
      negative: ['Stubborn', 'Possessive', 'Inflexible', 'Materialistic'],
    },
    career: {
      strengths: [
        'Exceptional reliability and follow-through',
        'Strong financial and business acumen',
        'Patient with complex, long-term projects',
        'Creates stable, productive work environments',
        'Excellent at building lasting professional relationships',
      ],
      developmentAreas: [
        'Adapting to rapid change and uncertainty',
        'Being more open to new ideas and methods',
        'Avoiding excessive caution in decision-making',
        'Expressing emotions more openly',
        'Embracing innovation over tradition',
      ],
      idealCareers: [
        'Finance & Banking',
        'Real Estate',
        'Agriculture & Farming',
        'Chef / Culinary Arts',
        'Interior Design',
        'Human Resources',
        'Accounting',
        'Quality Assurance',
      ],
      workStyle: 'Prefers steady, predictable work environments. Excels at tasks requiring patience and attention to detail. Values job security and tangible results.',
      leadershipStyle: 'Steady and supportive. Creates stable environments but may resist necessary changes. Strong at building loyal, dedicated teams.',
    },
    softSkills: {
      natural: ['Reliability', 'Patience', 'Persistence', 'Practicality'],
      toDevelop: ['Adaptability', 'Open-mindedness', 'Delegation', 'Innovation'],
    },
    recommendedCourses: ['Financial Literacy', 'Change Management', 'Digital Skills', 'Creative Problem Solving'],
    monthlyHoroscope: {
      career: 'Financial opportunities abound this month. A raise, bonus, or new income stream may appear. Stay grounded and avoid impulsive spending. Your hard work is being noticed.',
      love: 'Romance blossoms in comfortable settings. Plan cozy dinners or nature outings. Stability in relationships brings deep satisfaction.',
      health: 'Focus on nutrition and routine. Your body responds well to consistent healthy habits.',
      lucky: { number: '6', color: 'Green', day: 'Friday' },
    },
    famousPeople: ['Adele', 'David Beckham', 'Dwayne Johnson', 'Queen Elizabeth II'],
    compatibility: { best: ['Virgo', 'Capricorn', 'Cancer'], good: ['Pisces', 'Scorpio'], challenging: ['Leo', 'Aquarius'] },
  },
  {
    id: 'gemini',
    name: 'Gemini',
    symbol: '♊',
    element: 'Air',
    quality: 'Mutable',
    dates: 'May 21 - Jun 20',
    rulingPlanet: 'Mercury',
    traits: {
      positive: ['Adaptable', 'Curious', 'Communicative', 'Witty', 'Versatile'],
      negative: ['Indecisive', 'Superficial', 'Nervous', 'Inconsistent'],
    },
    career: {
      strengths: [
        'Exceptional communication and presentation skills',
        'Quick learner who adapts to any situation',
        'Natural networker and relationship builder',
        'Creative problem-solver with multiple perspectives',
        'Excellent at multitasking and juggling projects',
      ],
      developmentAreas: [
        'Following through on projects to completion',
        'Developing deeper expertise rather than surface knowledge',
        'Staying focused on one task at a time',
        'Making decisions more confidently',
        'Building consistency in work output',
      ],
      idealCareers: [
        'Journalism & Media',
        'Public Relations',
        'Marketing & Advertising',
        'Sales',
        'Translation / Interpretation',
        'Social Media Manager',
        'Event Planning',
        'Teaching & Training',
      ],
      workStyle: 'Thrives in dynamic, varied environments. Gets bored with routine. Needs constant mental stimulation and opportunities to communicate.',
      leadershipStyle: 'Inspirational communicator who generates enthusiasm. May struggle with consistency but excellent at generating ideas and rallying teams.',
    },
    softSkills: {
      natural: ['Communication', 'Networking', 'Adaptability', 'Creativity'],
      toDevelop: ['Focus & Concentration', 'Decision Making', 'Deep Expertise', 'Commitment'],
    },
    recommendedCourses: ['Public Speaking', 'Content Writing', 'Time Management', 'Focus & Productivity'],
    monthlyHoroscope: {
      career: 'Communication is your superpower this month. Negotiations, presentations, and networking events will go exceptionally well. A collaboration may lead to unexpected opportunities.',
      love: 'Intellectual connection is key. Engage in stimulating conversations. Avoid gossip that could harm relationships.',
      health: 'Mental health is a priority. Practice mindfulness to calm an overactive mind.',
      lucky: { number: '5', color: 'Yellow', day: 'Wednesday' },
    },
    famousPeople: ['Marilyn Monroe', 'John F. Kennedy', 'Angelina Jolie', 'Kanye West'],
    compatibility: { best: ['Libra', 'Aquarius', 'Aries'], good: ['Leo', 'Sagittarius'], challenging: ['Virgo', 'Pisces'] },
  },
  {
    id: 'cancer',
    name: 'Cancer',
    symbol: '♋',
    element: 'Water',
    quality: 'Cardinal',
    dates: 'Jun 21 - Jul 22',
    rulingPlanet: 'Moon',
    traits: {
      positive: ['Loyal', 'Emotional', 'Nurturing', 'Intuitive', 'Protective'],
      negative: ['Moody', 'Clingy', 'Over-sensitive', 'Self-pitying'],
    },
    career: {
      strengths: [
        'Exceptional emotional intelligence and empathy',
        'Natural caregiver and team supporter',
        'Strong intuition for reading people and situations',
        'Creates warm, supportive work environments',
        'Highly protective of team and organizational culture',
      ],
      developmentAreas: [
        'Separating emotions from professional decisions',
        'Building resilience to criticism and rejection',
        'Setting healthy boundaries with colleagues',
        'Taking more initiative rather than waiting',
        'Managing stress and avoiding burnout',
      ],
      idealCareers: [
        'Healthcare & Nursing',
        'Human Resources',
        'Social Work',
        'Education & Childcare',
        'Psychology & Counseling',
        'Hospitality',
        'Non-profit & Charity Work',
        'Real Estate (Home-focused)',
      ],
      workStyle: 'Thrives in supportive, family-like work cultures. Values emotional connection with colleagues. Prefers stable environments over high-risk ventures.',
      leadershipStyle: 'Nurturing and protective. Creates psychologically safe environments. May struggle with tough decisions that affect people.',
    },
    softSkills: {
      natural: ['Empathy', 'Emotional Intelligence', 'Team Building', 'Intuition'],
      toDevelop: ['Boundary Setting', 'Objectivity', 'Resilience', 'Self-care'],
    },
    recommendedCourses: ['Emotional Intelligence', 'Stress Management', 'Leadership Skills', 'Conflict Resolution'],
    monthlyHoroscope: {
      career: 'Home and work-life balance is highlighted. Consider if your current career aligns with your emotional needs. A female colleague or mentor may offer valuable guidance.',
      love: 'Family matters take center stage. Nurture close relationships. Single Cancers may find love through family connections.',
      health: 'Pay attention to digestive health. Emotional well-being directly affects physical health.',
      lucky: { number: '2', color: 'Silver', day: 'Monday' },
    },
    famousPeople: ['Princess Diana', 'Tom Hanks', 'Elon Musk', 'Meryl Streep'],
    compatibility: { best: ['Scorpio', 'Pisces', 'Taurus'], good: ['Virgo', 'Capricorn'], challenging: ['Aries', 'Libra'] },
  },
  {
    id: 'leo',
    name: 'Leo',
    symbol: '♌',
    element: 'Fire',
    quality: 'Fixed',
    dates: 'Jul 23 - Aug 22',
    rulingPlanet: 'Sun',
    traits: {
      positive: ['Confident', 'Ambitious', 'Generous', 'Loyal', 'Encouraging'],
      negative: ['Arrogant', 'Stubborn', 'Self-centered', 'Inflexible'],
    },
    career: {
      strengths: [
        'Natural charisma and leadership presence',
        'Inspires and motivates teams effortlessly',
        'Excellent at public speaking and presentations',
        'Creative vision and ability to see the big picture',
        'Generous mentor who develops others',
      ],
      developmentAreas: [
        'Sharing the spotlight and credit with others',
        'Accepting feedback without taking it personally',
        'Delegating tasks instead of trying to do everything',
        'Being patient with those who process differently',
        'Balancing confidence with humility',
      ],
      idealCareers: [
        'CEO / Executive Leadership',
        'Entertainment & Performing Arts',
        'Public Relations',
        'Fashion & Design',
        'Politics',
        'Event Management',
        'Creative Director',
        'Sales Leadership',
      ],
      workStyle: 'Thrives in visible, high-impact roles. Needs recognition and appreciation. Performs best when given creative freedom and leadership opportunities.',
      leadershipStyle: 'Charismatic and inspiring. Naturally draws followers. May struggle with sharing credit and being open to others\' ideas.',
    },
    softSkills: {
      natural: ['Leadership', 'Confidence', 'Motivation', 'Public Speaking'],
      toDevelop: ['Humility', 'Active Listening', 'Delegation', 'Collaboration'],
    },
    recommendedCourses: ['Leadership & Management', 'Public Speaking', 'Team Building', 'Emotional Intelligence'],
    monthlyHoroscope: {
      career: 'Your star is rising! Recognition for past achievements arrives. New leadership opportunities present themselves. Stay humble and share credit with your team.',
      love: 'Romance is dramatic and passionate. Express your feelings boldly. Committed Leos should plan special surprises for partners.',
      health: 'Heart health is highlighted. Cardio exercise and stress management are essential.',
      lucky: { number: '1', color: 'Gold', day: 'Sunday' },
    },
    famousPeople: ['Barack Obama', 'Jennifer Lopez', 'Madonna', 'Chris Hemsworth'],
    compatibility: { best: ['Aries', 'Sagittarius', 'Gemini'], good: ['Libra', 'Aquarius'], challenging: ['Taurus', 'Scorpio'] },
  },
  {
    id: 'virgo',
    name: 'Virgo',
    symbol: '♍',
    element: 'Earth',
    quality: 'Mutable',
    dates: 'Aug 23 - Sep 22',
    rulingPlanet: 'Mercury',
    traits: {
      positive: ['Analytical', 'Practical', 'Hardworking', 'Kind', 'Reliable'],
      negative: ['Overcritical', 'Perfectionist', 'Worrier', 'Fussy'],
    },
    career: {
      strengths: [
        'Exceptional attention to detail and accuracy',
        'Strong analytical and problem-solving skills',
        'Highly organized and efficient',
        'Reliable and consistent performer',
        'Natural at improving systems and processes',
      ],
      developmentAreas: [
        'Accepting "good enough" rather than perfect',
        'Seeing the big picture beyond details',
        'Being less critical of self and others',
        'Embracing imperfection and learning from mistakes',
        'Taking time to celebrate achievements',
      ],
      idealCareers: [
        'Data Analysis',
        'Accounting & Finance',
        'Healthcare & Medicine',
        'Quality Assurance',
        'Research & Development',
        'Editing & Writing',
        'Project Management',
        'Administration',
      ],
      workStyle: 'Thrives in organized, structured environments. Values precision and efficiency. May struggle in chaotic or loosely structured settings.',
      leadershipStyle: 'Detail-oriented and supportive. Sets high standards. May need to balance criticism with encouragement.',
    },
    softSkills: {
      natural: ['Organization', 'Analysis', 'Problem Solving', 'Reliability'],
      toDevelop: ['Self-compassion', 'Big Picture Thinking', 'Delegation', 'Celebration'],
    },
    recommendedCourses: ['Project Management', 'Data Analysis', 'Stress Management', 'Leadership Skills'],
    monthlyHoroscope: {
      career: 'Your meticulous work is finally being recognized. A detail-oriented project yields impressive results. Avoid overthinking decisions - trust your analysis.',
      love: 'Practical expressions of love are valued. Acts of service and thoughtful gestures strengthen bonds.',
      health: 'Digestive health needs attention. Manage worry and anxiety through grounding practices.',
      lucky: { number: '3', color: 'Navy Blue', day: 'Wednesday' },
    },
    famousPeople: ['Beyoncé', 'Michael Jackson', 'Mother Teresa', 'Keanu Reeves'],
    compatibility: { best: ['Taurus', 'Capricorn', 'Cancer'], good: ['Scorpio', 'Pisces'], challenging: ['Gemini', 'Sagittarius'] },
  },
  {
    id: 'libra',
    name: 'Libra',
    symbol: '♎',
    element: 'Air',
    quality: 'Cardinal',
    dates: 'Sep 23 - Oct 22',
    rulingPlanet: 'Venus',
    traits: {
      positive: ['Diplomatic', 'Graceful', 'Fair-minded', 'Social', 'Cooperative'],
      negative: ['Indecisive', 'Avoids confrontation', 'Self-pitying', 'People-pleaser'],
    },
    career: {
      strengths: [
        'Exceptional at building harmony in teams',
        'Natural mediator and conflict resolver',
        'Strong aesthetic sense and appreciation for beauty',
        'Excellent at partnerships and collaborations',
        'Fair and balanced decision-making',
      ],
      developmentAreas: [
        'Making decisions more quickly and confidently',
        'Addressing conflict directly rather than avoiding',
        'Setting boundaries and saying no',
        'Taking a stand even when it may displease others',
        'Avoiding over-dependence on others\' opinions',
      ],
      idealCareers: [
        'Law & Mediation',
        'Human Resources',
        'Public Relations',
        'Design & Arts',
        'Counseling',
        'Event Planning',
        'Diplomacy / International Relations',
        'Fashion Industry',
      ],
      workStyle: 'Thrives in harmonious, collaborative environments. Values fairness and beauty in the workplace. Struggles in highly competitive or conflict-prone settings.',
      leadershipStyle: 'Democratic and inclusive. Seeks consensus. May struggle with making unpopular but necessary decisions.',
    },
    softSkills: {
      natural: ['Diplomacy', 'Collaboration', 'Mediation', 'Aesthetics'],
      toDevelop: ['Decision Making', 'Assertiveness', 'Conflict Resolution', 'Boundary Setting'],
    },
    recommendedCourses: ['Negotiation Skills', 'Conflict Resolution', 'Decision Making', 'Assertiveness Training'],
    monthlyHoroscope: {
      career: 'Partnerships are highlighted. A business collaboration or team project brings success. Balance work demands with personal needs.',
      love: 'Romance is in the air. Seek balance in relationships. Single Libras may find love through social gatherings.',
      health: 'Kidney health and lower back need attention. Maintain work-life balance.',
      lucky: { number: '7', color: 'Pink', day: 'Friday' },
    },
    famousPeople: ['Will Smith', 'Kim Kardashian', 'Gandhi', 'John Lennon'],
    compatibility: { best: ['Gemini', 'Aquarius', 'Leo'], good: ['Sagittarius', 'Aries'], challenging: ['Cancer', 'Capricorn'] },
  },
  {
    id: 'scorpio',
    name: 'Scorpio',
    symbol: '♏',
    element: 'Water',
    quality: 'Fixed',
    dates: 'Oct 23 - Nov 21',
    rulingPlanet: 'Pluto',
    traits: {
      positive: ['Passionate', 'Resourceful', 'Brave', 'Loyal', 'Determined'],
      negative: ['Jealous', 'Secretive', 'Manipulative', 'Obsessive'],
    },
    career: {
      strengths: [
        'Exceptional focus and determination',
        'Natural at uncovering hidden information',
        'Strong research and investigative abilities',
        'Deep commitment to goals and objectives',
        'Excellent at handling crisis situations',
      ],
      developmentAreas: [
        'Letting go of grudges and past hurts',
        'Being more open and transparent with colleagues',
        'Trusting others and delegating tasks',
        'Avoiding power struggles and manipulation',
        'Balancing intensity with relaxation',
      ],
      idealCareers: [
        'Research & Investigation',
        'Psychology & Therapy',
        'Law Enforcement / Detective',
        'Finance & Investment',
        'Surgery & Medicine',
        'Crisis Management',
        'Data Security',
        'Strategic Planning',
      ],
      workStyle: 'Thrives in roles requiring depth, research, and transformation. Values privacy and autonomy. Performs well under pressure and in crisis situations.',
      leadershipStyle: 'Intense and transformational. Drives deep change. May need to develop more transparency and trust in team members.',
    },
    softSkills: {
      natural: ['Focus', 'Determination', 'Investigation', 'Crisis Management'],
      toDevelop: ['Trust', 'Transparency', 'Delegation', 'Letting Go'],
    },
    recommendedCourses: ['Leadership Under Pressure', 'Emotional Intelligence', 'Team Trust Building', 'Stress Management'],
    monthlyHoroscope: {
      career: 'A transformation in your career path is possible. Research and investigation lead to breakthrough insights. Trust your intuition in professional matters.',
      love: 'Deep emotional connections intensify. Avoid jealousy and possessiveness. Vulnerability strengthens bonds.',
      health: 'Reproductive health and hormones need attention. Practice emotional release.',
      lucky: { number: '8', color: 'Black', day: 'Tuesday' },
    },
    famousPeople: ['Bill Gates', 'Leonardo DiCaprio', 'Katy Perry', 'Ryan Reynolds'],
    compatibility: { best: ['Cancer', 'Pisces', 'Virgo'], good: ['Capricorn', 'Taurus'], challenging: ['Leo', 'Aquarius'] },
  },
  {
    id: 'sagittarius',
    name: 'Sagittarius',
    symbol: '♐',
    element: 'Fire',
    quality: 'Mutable',
    dates: 'Nov 22 - Dec 21',
    rulingPlanet: 'Jupiter',
    traits: {
      positive: ['Optimistic', 'Adventurous', 'Honest', 'Philosophical', 'Freedom-loving'],
      negative: ['Tactless', 'Impatient', 'Commitment-phobic', 'Overconfident'],
    },
    career: {
      strengths: [
        'Natural optimist who inspires others',
        'Excellent at seeing the big picture',
        'Loves learning and sharing knowledge',
        'Adventurous approach to challenges',
        'Honest and direct communication',
      ],
      developmentAreas: [
        'Following through on commitments',
        'Being more tactful in communication',
        'Developing attention to detail',
        'Building deeper expertise rather than breadth',
        'Patience with routine tasks',
      ],
      idealCareers: [
        'Travel & Tourism',
        'Education & Teaching',
        'Philosophy & Religion',
        'International Business',
        'Publishing & Media',
        'Sports & Athletics',
        'Consulting',
        'Translation Services',
      ],
      workStyle: 'Thrives in roles offering variety, travel, and learning. Values freedom and autonomy. Struggles with routine, detail-oriented work.',
      leadershipStyle: 'Inspirational and visionary. Encourages growth and exploration. May need to develop follow-through and attention to operational details.',
    },
    softSkills: {
      natural: ['Optimism', 'Vision', 'Teaching', 'Adventure'],
      toDevelop: ['Follow-through', 'Tact', 'Detail Orientation', 'Commitment'],
    },
    recommendedCourses: ['Project Management', 'Cultural Communication', 'Public Speaking', 'Time Management'],
    monthlyHoroscope: {
      career: 'Expansion is your theme. New opportunities for growth, possibly involving travel or international connections. Avoid overcommitting to too many projects.',
      love: 'Adventure with loved ones strengthens bonds. Single Sagittarians may find romance while traveling or studying.',
      health: 'Hips and thighs need attention. Balance adventure with rest.',
      lucky: { number: '3', color: 'Purple', day: 'Thursday' },
    },
    famousPeople: ['Taylor Swift', 'Brad Pitt', 'Winston Churchill', 'Jay-Z'],
    compatibility: { best: ['Aries', 'Leo', 'Libra'], good: ['Aquarius', 'Gemini'], challenging: ['Virgo', 'Pisces'] },
  },
  {
    id: 'capricorn',
    name: 'Capricorn',
    symbol: '♑',
    element: 'Earth',
    quality: 'Cardinal',
    dates: 'Dec 22 - Jan 19',
    rulingPlanet: 'Saturn',
    traits: {
      positive: ['Responsible', 'Disciplined', 'Self-control', 'Ambitious', 'Patient'],
      negative: ['Pessimistic', 'Stubborn', 'Workaholic', 'Unforgiving'],
    },
    career: {
      strengths: [
        'Exceptional work ethic and discipline',
        'Natural at climbing career ladders',
        'Strong long-term planning abilities',
        'Reliable and responsible team member',
        'Excellent at building lasting professional structures',
      ],
      developmentAreas: [
        'Balancing work with personal life',
        'Being more open to new approaches',
        'Showing vulnerability and emotion',
        'Celebrating achievements along the way',
        'Avoiding excessive pessimism',
      ],
      idealCareers: [
        'Executive Leadership / CEO',
        'Finance & Banking',
        'Management Consulting',
        'Engineering',
        'Law',
        'Architecture',
        'Government & Public Service',
        'Operations Management',
      ],
      workStyle: 'Thrives in structured, hierarchical environments. Values tradition and proven methods. Patient builder of long-term success.',
      leadershipStyle: 'Authoritative and responsible. Builds lasting structures. May need to balance ambition with empathy and work-life balance.',
    },
    softSkills: {
      natural: ['Discipline', 'Planning', 'Responsibility', 'Persistence'],
      toDevelop: ['Work-Life Balance', 'Flexibility', 'Emotional Expression', 'Celebration'],
    },
    recommendedCourses: ['Work-Life Balance', 'Emotional Intelligence', 'Innovation Mindset', 'Team Motivation'],
    monthlyHoroscope: {
      career: 'Professional achievements are recognized. A promotion or new responsibility may arrive. Balance ambition with personal well-being.',
      love: 'Commitment and stability in relationships. Show your softer side to loved ones. Single Capricorns may find love through professional networks.',
      health: 'Bones, joints, and skin need attention. Avoid overwork and chronic stress.',
      lucky: { number: '4', color: 'Brown', day: 'Saturday' },
    },
    famousPeople: ['Michelle Obama', 'Elvis Presley', 'Martin Luther King Jr.', 'Denzel Washington'],
    compatibility: { best: ['Taurus', 'Virgo', 'Scorpio'], good: ['Pisces', 'Cancer'], challenging: ['Aries', 'Libra'] },
  },
  {
    id: 'aquarius',
    name: 'Aquarius',
    symbol: '♒',
    element: 'Air',
    quality: 'Fixed',
    dates: 'Jan 20 - Feb 18',
    rulingPlanet: 'Uranus',
    traits: {
      positive: ['Innovative', 'Humanitarian', 'Original', 'Independent', 'Intellectual'],
      negative: ['Aloof', 'Uncompromising', 'Detached', 'Rebellious'],
    },
    career: {
      strengths: [
        'Natural innovator and forward thinker',
        'Excellent at seeing future trends',
        'Strong problem-solving with unique approaches',
        'Humanitarian focus on making positive impact',
        'Independent worker who values autonomy',
      ],
      developmentAreas: [
        'Building deeper emotional connections',
        'Being more flexible with different viewpoints',
        'Following through on revolutionary ideas',
        'Collaborating effectively with diverse teams',
        'Balancing idealism with practical implementation',
      ],
      idealCareers: [
        'Technology & IT',
        'Science & Research',
        'Non-profit & Activism',
        'Innovation & R&D',
        'Aviation & Space',
        'Environmental Sciences',
        'Social Media & Digital Marketing',
        'Inventor / Entrepreneur',
      ],
      workStyle: 'Thrives in forward-thinking, innovative environments. Values intellectual freedom and humanitarian purpose. Struggles with rigid hierarchies and traditional approaches.',
      leadershipStyle: 'Visionary and unconventional. Inspires through ideas and ideals. May need to develop more personal connection with team members.',
    },
    softSkills: {
      natural: ['Innovation', 'Vision', 'Problem Solving', 'Independence'],
      toDevelop: ['Emotional Connection', 'Collaboration', 'Flexibility', 'Follow-through'],
    },
    recommendedCourses: ['Innovation & Creativity', 'Team Collaboration', 'Emotional Intelligence', 'Project Execution'],
    monthlyHoroscope: {
      career: 'Innovative ideas gain traction. A technology or social impact project shows promise. Network with like-minded visionaries.',
      love: 'Intellectual connection matters more than romance. Friendships may deepen into love. Avoid emotional detachment.',
      health: 'Circulation and ankles need attention. Balance mental activity with physical exercise.',
      lucky: { number: '11', color: 'Electric Blue', day: 'Saturday' },
    },
    famousPeople: ['Oprah Winfrey', 'Abraham Lincoln', 'Thomas Edison', 'Jennifer Aniston'],
    compatibility: { best: ['Gemini', 'Libra', 'Sagittarius'], good: ['Aries', 'Leo'], challenging: ['Taurus', 'Scorpio'] },
  },
  {
    id: 'pisces',
    name: 'Pisces',
    symbol: '♓',
    element: 'Water',
    quality: 'Mutable',
    dates: 'Feb 19 - Mar 20',
    rulingPlanet: 'Neptune',
    traits: {
      positive: ['Compassionate', 'Artistic', 'Intuitive', 'Gentle', 'Wise'],
      negative: ['Escapist', 'Overly trusting', 'Idealistic', 'Indecisive'],
    },
    career: {
      strengths: [
        'Exceptional creativity and imagination',
        'Strong intuition and empathy',
        'Natural at understanding others\' needs',
        'Artistic and musical abilities',
        'Compassionate approach to all work',
      ],
      developmentAreas: [
        'Setting clear boundaries',
        'Making decisions more confidently',
        'Staying grounded in practical realities',
        'Avoiding escapism in difficult situations',
        'Building structure and organization',
      ],
      idealCareers: [
        'Arts & Entertainment',
        'Music & Performance',
        'Psychology & Counseling',
        'Healthcare & Healing',
        'Non-profit & Charity',
        'Writing & Poetry',
        'Photography & Film',
        'Spiritual Services',
      ],
      workStyle: 'Thrives in creative, compassionate environments. Values emotional connection and artistic expression. Struggles with rigid structures and high-pressure competition.',
      leadershipStyle: 'Compassionate and intuitive. Leads through empathy. May need to develop more structure and boundary-setting.',
    },
    softSkills: {
      natural: ['Creativity', 'Empathy', 'Intuition', 'Compassion'],
      toDevelop: ['Boundary Setting', 'Decision Making', 'Organization', 'Grounding'],
    },
    recommendedCourses: ['Creative Writing', 'Emotional Intelligence', 'Time Management', 'Assertiveness'],
    monthlyHoroscope: {
      career: 'Creative projects flourish. Trust your intuition in professional decisions. A compassionate act at work leads to unexpected rewards.',
      love: 'Deep emotional connections strengthen. Express your feelings through art or poetry. Single Pisces may find love through creative pursuits.',
      health: 'Feet and immune system need attention. Ground yourself through nature and routine.',
      lucky: { number: '7', color: 'Sea Green', day: 'Thursday' },
    },
    famousPeople: ['Albert Einstein', 'Rihanna', 'Steve Jobs', 'Justin Bieber'],
    compatibility: { best: ['Cancer', 'Scorpio', 'Taurus'], good: ['Capricorn', 'Virgo'], challenging: ['Gemini', 'Sagittarius'] },
  },
];

// Helper functions
export const getZodiacByDate = (month: number, day: number): ZodiacSign => {
  const zodiacDates = [
    { sign: 'capricorn', start: [1, 1], end: [1, 19] },
    { sign: 'aquarius', start: [1, 20], end: [2, 18] },
    { sign: 'pisces', start: [2, 19], end: [3, 20] },
    { sign: 'aries', start: [3, 21], end: [4, 19] },
    { sign: 'taurus', start: [4, 20], end: [5, 20] },
    { sign: 'gemini', start: [5, 21], end: [6, 20] },
    { sign: 'cancer', start: [6, 21], end: [7, 22] },
    { sign: 'leo', start: [7, 23], end: [8, 22] },
    { sign: 'virgo', start: [8, 23], end: [9, 22] },
    { sign: 'libra', start: [9, 23], end: [10, 22] },
    { sign: 'scorpio', start: [10, 23], end: [11, 21] },
    { sign: 'sagittarius', start: [11, 22], end: [12, 21] },
    { sign: 'capricorn', start: [12, 22], end: [12, 31] },
  ];

  for (const z of zodiacDates) {
    const [startMonth, startDay] = z.start;
    const [endMonth, endDay] = z.end;
    
    if (month === startMonth && day >= startDay) {
      return zodiacSigns.find(s => s.id === z.sign)!;
    }
    if (month === endMonth && day <= endDay) {
      return zodiacSigns.find(s => s.id === z.sign)!;
    }
  }
  
  return zodiacSigns[0]; // Default to Aries
};

export const getZodiacById = (id: string): ZodiacSign | undefined => {
  return zodiacSigns.find(s => s.id === id);
};

// Element types
export type ZodiacElement = 'Fire' | 'Earth' | 'Air' | 'Water';

export interface ElementInsight {
  description: string;
  workEnvironment: string;
  careerAdvice: string;
}

// Element-based career insights
export const elementInsights: Record<ZodiacElement, ElementInsight> = {
  Fire: {
    description: 'Fire signs are passionate, dynamic, and temperamental. They bring energy and enthusiasm to everything they do.',
    workEnvironment: 'Thrives in fast-paced, competitive environments with visible results.',
    careerAdvice: 'Channel your passion into leadership roles. Balance intensity with patience.',
  },
  Earth: {
    description: 'Earth signs are grounded, practical, and reliable. They build lasting structures and value tangible results.',
    workEnvironment: 'Thrives in stable, structured environments with clear progression paths.',
    careerAdvice: 'Leverage your practicality for long-term success. Balance stability with openness to change.',
  },
  Air: {
    description: 'Air signs are intellectual, communicative, and analytical. They excel at ideas, communication, and relationships.',
    workEnvironment: 'Thrives in social, idea-driven environments with intellectual stimulation.',
    careerAdvice: 'Use your communication skills to build networks. Balance breadth with depth of expertise.',
  },
  Water: {
    description: 'Water signs are intuitive, emotional, and ultra-sensitive. They bring depth and compassion to all they do.',
    workEnvironment: 'Thrives in supportive, emotionally intelligent environments with meaningful work.',
    careerAdvice: 'Trust your intuition in career decisions. Balance emotions with practical considerations.',
  },
};

export default zodiacSigns;
