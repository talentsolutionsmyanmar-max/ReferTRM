'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  AlertTriangle, Phone, BookOpen, Download, Bell, MapPin, Clock,
  ChevronRight, ChevronDown, ChevronUp, Check, Volume2, Share2,
  Shield, Heart, Users, Wifi, WifiOff, RefreshCw, ExternalLink,
  AlertCircle, Info, X, Plus, CheckCircle2, Copy, MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  alertTypeInfo,
  severityInfo,
  myanmarRegions,
  emergencyContacts,
  preparednessGuides,
  seasonalInfo,
  getContactsByCategory,
  getGuideByType,
  type AlertType,
  type AlertSeverity,
  type EmergencyContact,
  type PreparednessGuide,
} from '@/data/safety-alerts';

type TabType = 'alerts' | 'contacts' | 'guides' | 'settings';

export default function SafetyHubPage() {
  const { user, addPoints } = useAuth();
  const { toast } = useToast();
  
  // State
  const [activeTab, setActiveTab] = useState<TabType>('alerts');
  
  // State with lazy initialization from localStorage
  const [selectedRegion, setSelectedRegion] = useState<string>(() => {
    if (typeof window === 'undefined') return 'all';
    return localStorage.getItem('safety-region') || 'all';
  });
  
  const [subscribedRegions, setSubscribedRegions] = useState<Set<string>>(() => {
    if (typeof window === 'undefined') return new Set();
    const saved = localStorage.getItem('safety-subscribed');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  
  const [downloadedGuides, setDownloadedGuides] = useState<Set<string>>(() => {
    if (typeof window === 'undefined') return new Set();
    const saved = localStorage.getItem('safety-downloaded');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  
  const [selectedGuide, setSelectedGuide] = useState<PreparednessGuide | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [isOnline, setIsOnline] = useState(true);
  const [smsNumber, setSmsNumber] = useState('');
  const [showSmsModal, setShowSmsModal] = useState(false);

  // Check online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Save preferences
  useEffect(() => {
    localStorage.setItem('safety-region', selectedRegion);
  }, [selectedRegion]);

  useEffect(() => {
    localStorage.setItem('safety-subscribed', JSON.stringify([...subscribedRegions]));
  }, [subscribedRegions]);

  useEffect(() => {
    localStorage.setItem('safety-downloaded', JSON.stringify([...downloadedGuides]));
  }, [downloadedGuides]);

  // Toggle section expansion
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Download guide for offline
  const handleDownloadGuide = (guide: PreparednessGuide) => {
    setDownloadedGuides(prev => new Set([...prev, guide.id]));
    toast({
      title: 'Guide Downloaded!',
      description: `${guide.title} is now available offline`,
    });
  };

  // Subscribe to region alerts
  const handleSubscribeRegion = (regionId: string) => {
    if (subscribedRegions.has(regionId)) {
      setSubscribedRegions(prev => {
        const next = new Set(prev);
        next.delete(regionId);
        return next;
      });
      toast({ title: 'Unsubscribed', description: 'You will no longer receive alerts for this region' });
    } else {
      setSubscribedRegions(prev => new Set([...prev, regionId]));
      addPoints?.(5, `Subscribed to safety alerts for ${myanmarRegions.find(r => r.id === regionId)?.name}`);
      toast({ title: 'Subscribed!', description: 'You will receive alerts for this region' });
    }
  };

  // Copy phone number
  const handleCopyPhone = async (phone: string, name: string) => {
    await navigator.clipboard.writeText(phone);
    toast({ title: 'Copied!', description: `${name}: ${phone}` });
  };

  // Share alert
  const handleShare = async (title: string, content: string) => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text: content });
      } catch {}
    } else {
      await navigator.clipboard.writeText(`${title}\n\n${content}`);
      toast({ title: 'Copied to clipboard!' });
    }
  };

  // Get current season
  const getCurrentSeason = () => {
    const month = new Date().getMonth() + 1;
    if (month >= 4 && month <= 5) return 'cyclone-season';
    if (month >= 5 && month <= 10) return 'monsoon';
    if (month >= 3 && month <= 5) return 'summer';
    return 'winter';
  };

  const currentSeason = getCurrentSeason();
  const currentSeasonInfo = seasonalInfo[currentSeason as keyof typeof seasonalInfo];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white">Safety Hub</h1>
            <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
              <Shield className="h-3 w-3 mr-1" /> Life-Saving Info
            </Badge>
          </div>
          <p className="text-slate-400 burmese-text">ဘေးကင်းရေးဗဟိုဌာန - အသက်ကယ်သတင်းအချက်အလက်</p>
        </div>
        
        <div className="flex items-center gap-3">
          {isOnline ? (
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              <Wifi className="h-3 w-3 mr-1" /> Online
            </Badge>
          ) : (
            <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
              <WifiOff className="h-3 w-3 mr-1" /> Offline Mode
            </Badge>
          )}
          <Button
            variant="outline"
            size="sm"
            className="border-white/10"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="h-4 w-4 mr-1" /> Refresh
          </Button>
        </div>
      </div>

      {/* Current Season Alert */}
      <Card className="glass-card border-amber-500/20 bg-gradient-to-r from-amber-500/5 to-orange-500/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-white">{currentSeasonInfo?.label}</h3>
                <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-xs">
                  {currentSeasonInfo?.months}
                </Badge>
              </div>
              <p className="text-slate-300 text-sm">{currentSeasonInfo?.description}</p>
              <p className="text-amber-400/80 text-sm mt-1 burmese-text">{currentSeasonInfo?.descriptionMm}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tab Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          { id: 'alerts' as TabType, label: 'Alerts', labelMm: 'သတိပေးချက်များ', icon: AlertTriangle },
          { id: 'contacts' as TabType, label: 'Emergency Contacts', labelMm: 'အရေးပေါ်ဆက်သွယ်ရန်', icon: Phone },
          { id: 'guides' as TabType, label: 'Preparedness', labelMm: 'ပြင်ဆင်မှုလမ်းညွှန်', icon: BookOpen },
          { id: 'settings' as TabType, label: 'Alert Settings', labelMm: 'သတိပေးချက်ဆက်တင်', icon: Bell },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === tab.id 
                ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                : 'bg-slate-800/30 text-slate-400 hover:text-white'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {/* ALERTS TAB */}
        {activeTab === 'alerts' && (
          <motion.div
            key="alerts"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Region Selector */}
            <Card className="glass-card">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="h-5 w-5 text-teal-400" />
                  <span className="text-white font-medium">Select Your Region</span>
                  <span className="text-slate-500 text-sm burmese-text">သင့်ဒေသရွေးပါ</span>
                </div>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-teal-500/50"
                >
                  <option value="all">All Regions - ဒေသအားလုံး</option>
                  {myanmarRegions.map((region) => (
                    <option key={region.id} value={region.id}>
                      {region.name} - {region.nameMm}
                    </option>
                  ))}
                </select>
              </CardContent>
            </Card>

            {/* Active Alerts - Demo Data */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white">Active Alerts</h2>
              
              {/* Sample Alert Card */}
              <Card className={`glass-card border ${severityInfo.warning.borderColor}`}>
                <div className={`p-4 bg-gradient-to-r ${alertTypeInfo.cyclone.color}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{alertTypeInfo.cyclone.icon}</span>
                      <div>
                        <h3 className="font-bold text-white">{alertTypeInfo.cyclone.label}</h3>
                        <p className="text-white/80 text-sm">{alertTypeInfo.cyclone.labelMm}</p>
                      </div>
                    </div>
                    <Badge className={`${severityInfo.warning.bgColor} ${severityInfo.warning.color} border ${severityInfo.warning.borderColor}`}>
                      {severityInfo.warning.label}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4 space-y-4">
                  <div>
                    <p className="text-slate-300">Monitor weather conditions in Bay of Bengal. Cyclone formation possible in the coming days.</p>
                    <p className="text-slate-500 text-sm burmese-text mt-2">ဘင်္ဂလားပင်လယ်အော်တွင်မိုးလေဝသအခြေအနေစောင့်ကြည့်ပါ။ ရ comingရက်များအတွင်းမုန်တိုင်းဖြစ်ပေါ်နိုင်သည်။</p>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Clock className="h-4 w-4" />
                    <span>Issued: {new Date().toLocaleDateString()}</span>
                    <span className="mx-2">•</span>
                    <span>Source: WMO Regional Center</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-teal-400" />
                    <span className="text-slate-300">Regions: Rakhine, Ayeyarwady, Yangon</span>
                  </div>

                  <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                    <h4 className="font-medium text-amber-400 mb-2">Safety Tips:</h4>
                    <ul className="space-y-1 text-sm text-slate-300">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-teal-400 mt-0.5" />
                        <span>Prepare emergency kit with 3 days supply</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-teal-400 mt-0.5" />
                        <span>Know your nearest evacuation shelter</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-teal-400 mt-0.5" />
                        <span>Charge phones and power banks</span>
                      </li>
                    </ul>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="border-white/10 flex-1"
                      onClick={() => {
                        setSelectedGuide(getGuideByType('cyclone') || null);
                        setActiveTab('guides');
                      }}
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      Full Guide
                    </Button>
                    <Button
                      variant="outline"
                      className="border-white/10"
                      onClick={() => handleShare(
                        'Cyclone Warning - Myanmar',
                        'Monitor weather in Bay of Bengal. Prepare emergency kit and know evacuation routes.'
                      )}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* No Active Alerts Card */}
              <Card className="glass-card border-green-500/20 bg-green-500/5">
                <CardContent className="p-6 text-center">
                  <CheckCircle2 className="h-12 w-12 text-green-400 mx-auto mb-3" />
                  <h3 className="font-bold text-white mb-1">No Active Emergencies</h3>
                  <p className="text-slate-400 text-sm">Current status: Normal monitoring</p>
                  <p className="text-slate-500 text-sm mt-2 burmese-text">
                    လက်ရှိအခြေအနေ: ပုံမှန်စောင့်ကြည့်မှု
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Alerts */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white">Recent Weather Info</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="glass-card">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">🌡️</span>
                      <div>
                        <h4 className="font-medium text-white">Heat Advisory</h4>
                        <p className="text-slate-500 text-xs">Central Myanmar - April</p>
                      </div>
                    </div>
                    <p className="text-slate-400 text-sm">Temperatures may reach 40°C+ during peak hours. Stay hydrated and avoid midday sun.</p>
                  </CardContent>
                </Card>
                <Card className="glass-card">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">🌧️</span>
                      <div>
                        <h4 className="font-medium text-white">Monsoon Update</h4>
                        <p className="text-slate-500 text-xs">Nationwide - May-October</p>
                      </div>
                    </div>
                    <p className="text-slate-400 text-sm">Heavy rainfall expected. Watch for flooding in low-lying areas.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        )}

        {/* CONTACTS TAB */}
        {activeTab === 'contacts' && (
          <motion.div
            key="contacts"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Emergency Numbers */}
            <Card className="glass-card border-red-500/20 bg-red-500/5">
              <CardHeader>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                  Emergency Numbers - အရေးပေါ်နံပါတ်များ
                </h3>
              </CardHeader>
              <CardContent className="space-y-3">
                {getContactsByCategory('emergency').map((contact) => (
                  <div
                    key={contact.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-slate-800/50 border border-white/5"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-white">{contact.name}</h4>
                        {contact.available24h && (
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">24h</Badge>
                        )}
                      </div>
                      <p className="text-slate-500 text-sm burmese-text">{contact.nameMm}</p>
                      <p className="text-slate-400 text-xs mt-1">{contact.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={`tel:${contact.phone}`}
                        className="px-4 py-2 rounded-xl bg-teal-500/20 text-teal-400 font-mono font-bold hover:bg-teal-500/30 transition-colors"
                      >
                        {contact.phone}
                      </a>
                      <button
                        onClick={() => handleCopyPhone(contact.phone, contact.name)}
                        className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                      >
                        <Copy className="h-4 w-4 text-slate-400" />
                      </button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Medical Contacts */}
            <Card className="glass-card border-green-500/20">
              <CardHeader>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Heart className="h-5 w-5 text-green-400" />
                  Medical - ဆေးဘက်ဆိုင်ရာ
                </h3>
              </CardHeader>
              <CardContent className="space-y-3">
                {getContactsByCategory('medical').map((contact) => (
                  <div
                    key={contact.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-slate-800/50 border border-white/5"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-white">{contact.name}</h4>
                        {contact.available24h && (
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">24h</Badge>
                        )}
                      </div>
                      <p className="text-slate-500 text-sm burmese-text">{contact.nameMm}</p>
                    </div>
                    <a
                      href={`tel:${contact.phone}`}
                      className="px-4 py-2 rounded-xl bg-green-500/20 text-green-400 font-mono font-bold hover:bg-green-500/30 transition-colors"
                    >
                      {contact.phone}
                    </a>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Disaster Contacts */}
            <Card className="glass-card border-amber-500/20">
              <CardHeader>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Shield className="h-5 w-5 text-amber-400" />
                  Disaster Response - ဘေးအန္တရာယ်တုံ့ပြန်ရေး
                </h3>
              </CardHeader>
              <CardContent className="space-y-3">
                {getContactsByCategory('disaster').map((contact) => (
                  <div
                    key={contact.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-slate-800/50 border border-white/5"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-white">{contact.name}</h4>
                      <p className="text-slate-500 text-sm burmese-text">{contact.nameMm}</p>
                      <p className="text-slate-400 text-xs mt-1">{contact.description}</p>
                    </div>
                    <a
                      href={`tel:${contact.phone}`}
                      className="px-4 py-2 rounded-xl bg-amber-500/20 text-amber-400 font-mono font-bold hover:bg-amber-500/30 transition-colors"
                    >
                      {contact.phone}
                    </a>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* GUIDES TAB */}
        {activeTab === 'guides' && (
          <motion.div
            key="guides"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {selectedGuide ? (
              // Guide Detail View
              <div className="space-y-6">
                <button
                  onClick={() => setSelectedGuide(null)}
                  className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                >
                  <ChevronRight className="h-5 w-5 rotate-180" />
                  Back to Guides
                </button>

                <Card className="glass-card overflow-hidden">
                  <div className={`p-6 bg-gradient-to-r ${alertTypeInfo[selectedGuide.type].color}`}>
                    <div className="flex items-center gap-4">
                      <span className="text-4xl">{alertTypeInfo[selectedGuide.type].icon}</span>
                      <div>
                        <h2 className="text-2xl font-bold text-white">{selectedGuide.title}</h2>
                        <p className="text-white/80">{selectedGuide.titleMm}</p>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6 space-y-6">
                    {/* Before Section */}
                    <div className="space-y-3">
                      <button
                        onClick={() => toggleSection('before')}
                        className="flex items-center justify-between w-full p-4 rounded-xl bg-green-500/5 border border-green-500/20"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center text-green-400 font-bold">1</div>
                          <span className="font-bold text-white">BEFORE - မဖြစ်မီ</span>
                        </div>
                        {expandedSections['before'] ? <ChevronUp className="h-5 w-5 text-slate-400" /> : <ChevronDown className="h-5 w-5 text-slate-400" />}
                      </button>
                      {expandedSections['before'] && (
                        <div className="p-4 space-y-2">
                          {selectedGuide.content.before.map((tip, i) => (
                            <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/30">
                              <Check className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-slate-200">{tip}</p>
                                <p className="text-slate-500 text-sm burmese-text">{selectedGuide.content.beforeMm[i]}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* During Section */}
                    <div className="space-y-3">
                      <button
                        onClick={() => toggleSection('during')}
                        className="flex items-center justify-between w-full p-4 rounded-xl bg-amber-500/5 border border-amber-500/20"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold">2</div>
                          <span className="font-bold text-white">DURING - ဖြစ်နေစဉ်</span>
                        </div>
                        {expandedSections['during'] ? <ChevronUp className="h-5 w-5 text-slate-400" /> : <ChevronDown className="h-5 w-5 text-slate-400" />}
                      </button>
                      {expandedSections['during'] && (
                        <div className="p-4 space-y-2">
                          {selectedGuide.content.during.map((tip, i) => (
                            <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/30">
                              <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-slate-200">{tip}</p>
                                <p className="text-slate-500 text-sm burmese-text">{selectedGuide.content.duringMm[i]}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* After Section */}
                    <div className="space-y-3">
                      <button
                        onClick={() => toggleSection('after')}
                        className="flex items-center justify-between w-full p-4 rounded-xl bg-teal-500/5 border border-teal-500/20"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-teal-500/20 flex items-center justify-center text-teal-400 font-bold">3</div>
                          <span className="font-bold text-white">AFTER - ပြီးနောက်</span>
                        </div>
                        {expandedSections['after'] ? <ChevronUp className="h-5 w-5 text-slate-400" /> : <ChevronDown className="h-5 w-5 text-slate-400" />}
                      </button>
                      {expandedSections['after'] && (
                        <div className="p-4 space-y-2">
                          {selectedGuide.content.after.map((tip, i) => (
                            <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/30">
                              <CheckCircle2 className="h-5 w-5 text-teal-400 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-slate-200">{tip}</p>
                                <p className="text-slate-500 text-sm burmese-text">{selectedGuide.content.afterMm[i]}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Emergency Kit */}
                    <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/20">
                      <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                        <span className="text-xl">🎒</span>
                        Emergency Kit - အရေးပေါ်အထုပ်
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {selectedGuide.emergencyKit.map((item, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-slate-300">
                            <Plus className="h-4 w-4 text-purple-400" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Download Button */}
                    <Button
                      className="w-full"
                      onClick={() => handleDownloadGuide(selectedGuide)}
                      disabled={downloadedGuides.has(selectedGuide.id)}
                    >
                      {downloadedGuides.has(selectedGuide.id) ? (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          Downloaded for Offline
                        </>
                      ) : (
                        <>
                          <Download className="h-4 w-4 mr-2" />
                          Download for Offline Use
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ) : (
              // Guides List
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {preparednessGuides.map((guide) => {
                  const info = alertTypeInfo[guide.type];
                  return (
                    <motion.div
                      key={guide.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedGuide(guide)}
                      className="cursor-pointer"
                    >
                      <Card className={`glass-card overflow-hidden hover:border-teal-500/30 transition-all h-full ${
                        downloadedGuides.has(guide.id) ? 'border-green-500/30' : ''
                      }`}>
                        <div className={`p-4 bg-gradient-to-r ${info.color}`}>
                          <div className="flex items-center gap-3">
                            <span className="text-3xl">{info.icon}</span>
                            <div className="flex-1">
                              <h3 className="font-bold text-white">{guide.title}</h3>
                              <p className="text-white/70 text-sm">{guide.titleMm}</p>
                            </div>
                            {downloadedGuides.has(guide.id) && (
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                                <Download className="h-3 w-3 mr-1" /> Saved
                              </Badge>
                            )}
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <Badge className={`${info.bgColor} ${info.textColor} border ${info.borderColor}`}>
                              {seasonalInfo[guide.season]?.label}
                            </Badge>
                            <Badge className="bg-slate-700/50 text-slate-300">
                              {guide.checklist.length} items
                            </Badge>
                          </div>
                          <p className="text-slate-400 text-sm line-clamp-2">
                            {guide.content.before[0]}
                          </p>
                          <div className="flex items-center gap-2 mt-4 text-teal-400 text-sm">
                            <BookOpen className="h-4 w-4" />
                            <span>View Full Guide</span>
                            <ChevronRight className="h-4 w-4" />
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
          <motion.div
            key="settings"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* SMS Alert Subscription */}
            <Card className="glass-card">
              <CardHeader>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-amber-400" />
                  SMS Alerts (Coming Soon)
                </h3>
                <p className="text-slate-400 text-sm">
                  Get safety alerts via SMS - Works on any phone, no internet needed!
                </p>
                <p className="text-amber-400/80 text-sm burmese-text">
                  SMS သတိပေးချက်များရယူပါ - မည်သည့်ဖုန်းမဆိုအလုပ်လုပ်သည်၊ အင်တာနက်မလိုပါ!
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <input
                  type="tel"
                  value={smsNumber}
                  onChange={(e) => setSmsNumber(e.target.value)}
                  placeholder="Enter phone number (e.g., 09xxxxxxxxx)"
                  className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/50"
                />
                <Button
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                  disabled={!smsNumber || smsNumber.length < 9}
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Subscribe to SMS Alerts
                </Button>
              </CardContent>
            </Card>

            {/* Region Subscriptions */}
            <Card className="glass-card">
              <CardHeader>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-teal-400" />
                  Alert Regions
                </h3>
                <p className="text-slate-400 text-sm">
                  Select regions you want to receive alerts for
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {myanmarRegions.map((region) => {
                    const isSubscribed = subscribedRegions.has(region.id);
                    return (
                      <button
                        key={region.id}
                        onClick={() => handleSubscribeRegion(region.id)}
                        className={`p-3 rounded-xl text-left transition-all ${
                          isSubscribed 
                            ? 'bg-teal-500/20 border border-teal-500/30' 
                            : 'bg-slate-800/30 border border-white/5 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className={`text-sm font-medium ${isSubscribed ? 'text-teal-400' : 'text-white'}`}>
                              {region.name}
                            </p>
                            <p className="text-xs text-slate-500">{region.nameMm}</p>
                          </div>
                          {isSubscribed && <Check className="h-4 w-4 text-teal-400" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Offline Downloads */}
            <Card className="glass-card">
              <CardHeader>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Download className="h-5 w-5 text-purple-400" />
                  Offline Content
                </h3>
                <p className="text-slate-400 text-sm">
                  Downloaded guides available without internet
                </p>
              </CardHeader>
              <CardContent>
                {downloadedGuides.size > 0 ? (
                  <div className="space-y-2">
                    {Array.from(downloadedGuides).map((guideId) => {
                      const guide = preparednessGuides.find(g => g.id === guideId);
                      if (!guide) return null;
                      return (
                        <div key={guideId} className="flex items-center gap-3 p-3 rounded-xl bg-green-500/5 border border-green-500/20">
                          <span className="text-2xl">{alertTypeInfo[guide.type].icon}</span>
                          <div className="flex-1">
                            <p className="text-white font-medium">{guide.title}</p>
                            <p className="text-slate-500 text-xs">{guide.titleMm}</p>
                          </div>
                          <Check className="h-5 w-5 text-green-400" />
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-500">
                    <Download className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>No guides downloaded yet</p>
                    <p className="text-sm">Visit the Guides tab to download</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Trusted Sources */}
            <Card className="glass-card">
              <CardHeader>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-400" />
                  Trusted Sources
                </h3>
                <p className="text-slate-400 text-sm">
                  All alerts come from verified international sources
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { name: 'USGS', desc: 'Earthquakes', icon: '🌍' },
                    { name: 'WMO', desc: 'Weather', icon: '🌤️' },
                    { name: 'WHO', desc: 'Health', icon: '🏥' },
                    { name: 'Red Cross', desc: 'Humanitarian', icon: '➕' },
                  ].map((source) => (
                    <div key={source.name} className="p-4 rounded-xl bg-slate-800/30 text-center">
                      <span className="text-2xl">{source.icon}</span>
                      <p className="text-white font-medium mt-2">{source.name}</p>
                      <p className="text-slate-500 text-xs">{source.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-slate-500 text-xs mt-4 text-center">
                  We only use neutral, scientific, humanitarian sources. No political content.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Info */}
      <Card className="glass-card border-teal-500/20 bg-teal-500/5">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Heart className="h-6 w-6 text-red-400 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-white mb-2">Why This Feature Matters</h4>
              <p className="text-slate-300 text-sm">
                70% of Myanmar's population lives in rural areas with limited access to early warning systems.
                This Safety Hub provides life-saving information from trusted international sources to help
                communities prepare for and respond to natural disasters.
              </p>
              <p className="text-teal-400 text-sm mt-2 burmese-text">
                မြန်မာနိုင်ငံလူဦးရေ ၇၀% သည် ကျေးလက်ဒေသများတွင်နေထိုင်ပြီး အစောပိုင်းသတိပေးစနစ်များကို
                ကန့်သတ်ထားသည်။ ဤဘေးကင်းရေးဗဟိုဌာနသည် အသိုက်အဝိုင်းများအတွက်
                သဘာဝဘေးအန္တရာယ်များကို ပြင်ဆင်ရန်နှင့်တုံ့ပြန်ရန်အတွက် အသက်ကယ်သတင်းအချက်အလက်များ
                ယုံကြည်စိတ်ချရသောနိုင်ငံတကာရင်းမြစ်များမှ ပေးပို့သည်။
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
