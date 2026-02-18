'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Sparkles,
  Star,
  Flame,
  Droplets,
  Wind,
  Mountain,
  ChevronRight,
  BookOpen,
  Target,
  TrendingUp,
  Heart,
  Share2,
  Calendar,
  Award,
  Users,
  Briefcase,
  Check,
  X,
  ArrowRight,
  Globe,
  Sun,
  Moon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { zodiacSigns, getZodiacByDate, elementInsights, ZodiacSign } from '@/data/zodiac';

const zodiacQuickSelect = [
  { id: 'aries', symbol: '♈', name: 'Aries', dates: 'Mar 21 - Apr 19' },
  { id: 'taurus', symbol: '♉', name: 'Taurus', dates: 'Apr 20 - May 20' },
  { id: 'gemini', symbol: '♊', name: 'Gemini', dates: 'May 21 - Jun 20' },
  { id: 'cancer', symbol: '♋', name: 'Cancer', dates: 'Jun 21 - Jul 22' },
  { id: 'leo', symbol: '♌', name: 'Leo', dates: 'Jul 23 - Aug 22' },
  { id: 'virgo', symbol: '♍', name: 'Virgo', dates: 'Aug 23 - Sep 22' },
  { id: 'libra', symbol: '♎', name: 'Libra', dates: 'Sep 23 - Oct 22' },
  { id: 'scorpio', symbol: '♏', name: 'Scorpio', dates: 'Oct 23 - Nov 21' },
  { id: 'sagittarius', symbol: '♐', name: 'Sagittarius', dates: 'Nov 22 - Dec 21' },
  { id: 'capricorn', symbol: '♑', name: 'Capricorn', dates: 'Dec 22 - Jan 19' },
  { id: 'aquarius', symbol: '♒', name: 'Aquarius', dates: 'Jan 20 - Feb 18' },
  { id: 'pisces', symbol: '♓', name: 'Pisces', dates: 'Feb 19 - Mar 20' },
];

const elementColors = {
  Fire: { bg: 'bg-red-500/10', text: 'text-red-500', border: 'border-red-500/30', icon: Flame },
  Earth: { bg: 'bg-green-500/10', text: 'text-green-500', border: 'border-green-500/30', icon: Mountain },
  Air: { bg: 'bg-blue-500/10', text: 'text-blue-500', border: 'border-blue-500/30', icon: Wind },
  Water: { bg: 'bg-cyan-500/10', text: 'text-cyan-500', border: 'border-cyan-500/30', icon: Droplets },
};

export default function ZodiacCareerPage() {
  const [selectedZodiac, setSelectedZodiac] = useState<ZodiacSign | null>(null);
  const [birthMonth, setBirthMonth] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [showFinder, setShowFinder] = useState(false);

  const handleFindZodiac = () => {
    const month = parseInt(birthMonth);
    const day = parseInt(birthDay);
    if (month && day) {
      const zodiac = getZodiacByDate(month, day);
      setSelectedZodiac(zodiac);
      setShowFinder(false);
    }
  };

  const handleSelectZodiac = (id: string) => {
    const zodiac = zodiacSigns.find(z => z.id === id);
    if (zodiac) {
      setSelectedZodiac(zodiac);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 mb-4">
          <Sparkles className="h-4 w-4 text-purple-400" />
          <span className="text-sm text-purple-400">Knowledge-tainment</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          Zodiac Career Insights ✨
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover your professional strengths, development areas, and ideal career paths based on your zodiac sign.
          Personalized career guidance through the wisdom of astrology!
        </p>
        <p className="text-sm text-muted-foreground mt-2 burmese-text">
          သင့်ရာသီခွင်အရ အလုပ်အကိုင်လမ်းကြောင်းများ၊ အားသာချက်များနှင့် တိုးတက်ရမည့်နေရာများကို ရှာဖွေပါ
        </p>
      </motion.div>

      {/* Zodiac Quick Select */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="bg-card border border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Star className="h-5 w-5 text-amber-500" />
                Select Your Zodiac Sign
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                className="border-border"
                onClick={() => setShowFinder(!showFinder)}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Find by Birthday
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Birthday Finder */}
            <AnimatePresence>
              {showFinder && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4 p-4 rounded-xl bg-gradient-to-r from-purple-500/5 to-pink-500/5 border border-purple-500/20"
                >
                  <p className="text-sm text-muted-foreground mb-3">Enter your birthday to find your zodiac sign:</p>
                  <div className="flex gap-3">
                    <select
                      value={birthMonth}
                      onChange={(e) => setBirthMonth(e.target.value)}
                      className="flex-1 px-4 py-2 bg-background border border-border rounded-xl text-foreground"
                    >
                      <option value="">Month</option>
                      {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((m, i) => (
                        <option key={m} value={i + 1}>{m}</option>
                      ))}
                    </select>
                    <select
                      value={birthDay}
                      onChange={(e) => setBirthDay(e.target.value)}
                      className="w-24 px-4 py-2 bg-background border border-border rounded-xl text-foreground"
                    >
                      <option value="">Day</option>
                      {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                    <Button className="btn-primary" onClick={handleFindZodiac}>
                      Find
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Zodiac Grid */}
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {zodiacQuickSelect.map((z) => (
                <button
                  key={z.id}
                  onClick={() => handleSelectZodiac(z.id)}
                  className={`p-3 rounded-xl text-center transition-all ${
                    selectedZodiac?.id === z.id
                      ? 'bg-gradient-to-br from-teal-500/20 to-cyan-500/20 border-2 border-teal-500/50'
                      : 'bg-background border border-border hover:border-teal-500/30'
                  }`}
                >
                  <div className="text-2xl mb-1">{z.symbol}</div>
                  <div className={`text-xs font-medium ${selectedZodiac?.id === z.id ? 'text-teal-400' : 'text-foreground'}`}>
                    {z.name}
                  </div>
                  <div className="text-[10px] text-muted-foreground">{z.dates.split(' - ')[0]}</div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Selected Zodiac Detail */}
      {selectedZodiac && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Zodiac Header Card */}
          <Card className="bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-amber-500/5 border border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                {/* Symbol & Name */}
                <div className="text-center lg:text-left">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 mb-3">
                    <span className="text-5xl">{selectedZodiac.symbol}</span>
                  </div>
                  <h2 className="text-3xl font-bold text-foreground">{selectedZodiac.name}</h2>
                  <p className="text-muted-foreground">{selectedZodiac.dates}</p>
                  <div className="flex items-center justify-center lg:justify-start gap-2 mt-2">
                    <Badge className={`${elementColors[selectedZodiac.element].bg} ${elementColors[selectedZodiac.element].text} ${elementColors[selectedZodiac.element].border}`}>
                      {selectedZodiac.element} Sign
                    </Badge>
                    <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/30">
                      {selectedZodiac.quality}
                    </Badge>
                    <Badge className="bg-purple-500/10 text-purple-500 border-purple-500/30">
                      {selectedZodiac.rulingPlanet}
                    </Badge>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="p-4 rounded-xl bg-background border border-border text-center">
                    <Briefcase className="h-6 w-6 text-teal-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground">{selectedZodiac.idealCareers.length}</div>
                    <div className="text-xs text-muted-foreground">Ideal Careers</div>
                  </div>
                  <div className="p-4 rounded-xl bg-background border border-border text-center">
                    <Star className="h-6 w-6 text-amber-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground">{selectedZodiac.career.strengths.length}</div>
                    <div className="text-xs text-muted-foreground">Strengths</div>
                  </div>
                  <div className="p-4 rounded-xl bg-background border border-border text-center">
                    <Target className="h-6 w-6 text-purple-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground">{selectedZodiac.career.developmentAreas.length}</div>
                    <div className="text-xs text-muted-foreground">To Develop</div>
                  </div>
                  <div className="p-4 rounded-xl bg-background border border-border text-center">
                    <BookOpen className="h-6 w-6 text-cyan-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground">{selectedZodiac.recommendedCourses.length}</div>
                    <div className="text-xs text-muted-foreground">Courses</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Career Strengths & Development */}
            <div className="lg:col-span-2 space-y-6">
              {/* Career Strengths */}
              <Card className="bg-card border border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-amber-500" />
                    Your Career Superpowers
                  </CardTitle>
                  <CardDescription>Natural strengths that give you an edge in your career</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedZodiac.career.strengths.map((strength, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 p-3 rounded-xl bg-green-500/5 border border-green-500/20"
                      >
                        <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="h-4 w-4 text-green-500" />
                        </div>
                        <p className="text-foreground">{strength}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Development Areas */}
              <Card className="bg-card border border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-purple-500" />
                    Areas for Development
                  </CardTitle>
                  <CardDescription>Focus areas to unlock your full potential</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedZodiac.career.developmentAreas.map((area, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 p-3 rounded-xl bg-amber-500/5 border border-amber-500/20"
                      >
                        <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                          <TrendingUp className="h-4 w-4 text-amber-500" />
                        </div>
                        <p className="text-foreground">{area}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Ideal Careers */}
              <Card className="bg-card border border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-teal-500" />
                    Ideal Career Paths
                  </CardTitle>
                  <CardDescription>Careers where your zodiac traits shine brightest</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {selectedZodiac.idealCareers.map((career, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="p-3 rounded-xl bg-teal-500/5 border border-teal-500/20 text-center"
                      >
                        <p className="text-foreground font-medium text-sm">{career}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Work & Leadership Style */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-card border border-border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-500" />
                      Work Style
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{selectedZodiac.career.workStyle}</p>
                  </CardContent>
                </Card>
                <Card className="bg-card border border-border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Award className="h-4 w-4 text-purple-500" />
                      Leadership Style
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{selectedZodiac.career.leadershipStyle}</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Recommended Courses */}
              <Card className="bg-gradient-to-br from-teal-500/5 to-cyan-500/5 border border-teal-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-teal-500" />
                    Recommended Courses
                  </CardTitle>
                  <CardDescription>Upskill based on your zodiac needs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {selectedZodiac.recommendedCourses.map((course, index) => (
                      <Link key={index} href="/dashboard/academy">
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="p-3 rounded-xl bg-background border border-border hover:border-teal-500/30 transition-colors cursor-pointer flex items-center justify-between"
                        >
                          <span className="text-foreground text-sm">{course}</span>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                  <Link href="/dashboard/academy">
                    <Button className="w-full mt-4 btn-primary">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Explore All Courses
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Monthly Horoscope */}
              <Card className="bg-gradient-to-br from-purple-500/5 to-pink-500/5 border border-purple-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Moon className="h-5 w-5 text-purple-500" />
                    Monthly Career Horoscope
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground text-sm mb-4">{selectedZodiac.monthlyHoroscope.career}</p>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-2 rounded-lg bg-background border border-border text-center">
                      <div className="text-xs text-muted-foreground">Lucky Number</div>
                      <div className="text-lg font-bold text-purple-500">{selectedZodiac.monthlyHoroscope.lucky.number}</div>
                    </div>
                    <div className="p-2 rounded-lg bg-background border border-border text-center">
                      <div className="text-xs text-muted-foreground">Lucky Color</div>
                      <div className="text-lg font-bold text-purple-500">{selectedZodiac.monthlyHoroscope.lucky.color}</div>
                    </div>
                    <div className="p-2 rounded-lg bg-background border border-border text-center">
                      <div className="text-xs text-muted-foreground">Lucky Day</div>
                      <div className="text-lg font-bold text-purple-500">{selectedZodiac.monthlyHoroscope.lucky.day}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Famous People */}
              <Card className="bg-card border border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Globe className="h-4 w-4 text-amber-500" />
                    Famous {selectedZodiac.name}s
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {selectedZodiac.famousPeople.map((person, index) => (
                      <Badge key={index} variant="outline" className="border-border">
                        {person}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Compatibility */}
              <Card className="bg-card border border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Heart className="h-4 w-4 text-red-500" />
                    Workplace Compatibility
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Best Matches</div>
                      <div className="flex gap-2">
                        {selectedZodiac.compatibility.best.map((sign) => (
                          <Badge key={sign} className="bg-green-500/10 text-green-500 border-green-500/30">
                            {sign}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Good Matches</div>
                      <div className="flex gap-2">
                        {selectedZodiac.compatibility.good.map((sign) => (
                          <Badge key={sign} className="bg-blue-500/10 text-blue-500 border-blue-500/30">
                            {sign}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Element Insights */}
          <Card className="bg-card border border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {(() => {
                  const ElementIcon = elementColors[selectedZodiac.element].icon;
                  return <ElementIcon className={`h-5 w-5 ${elementColors[selectedZodiac.element].text}`} />;
                })()}
                {selectedZodiac.element} Element Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-background border border-border">
                  <div className="text-xs text-muted-foreground mb-2">About {selectedZodiac.element} Signs</div>
                  <p className="text-sm text-foreground">{elementInsights[selectedZodiac.element].description}</p>
                </div>
                <div className="p-4 rounded-xl bg-background border border-border">
                  <div className="text-xs text-muted-foreground mb-2">Ideal Work Environment</div>
                  <p className="text-sm text-foreground">{elementInsights[selectedZodiac.element].workEnvironment}</p>
                </div>
                <div className="p-4 rounded-xl bg-background border border-border">
                  <div className="text-xs text-muted-foreground mb-2">Career Advice</div>
                  <p className="text-sm text-foreground">{elementInsights[selectedZodiac.element].careerAdvice}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* No Selection State */}
      {!selectedZodiac && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 mb-6">
            <Star className="h-16 w-16 text-purple-400" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-2">Select Your Zodiac Sign</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Choose your zodiac sign above to discover personalized career insights, strengths, development areas, and recommended courses.
          </p>
        </motion.div>
      )}
    </div>
  );
}
