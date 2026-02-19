'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart, Droplets, Phone, MapPin, Clock, AlertTriangle, Check, Plus, X,
  ChevronDown, ChevronUp, Users, Building, Calendar, Shield, Info,
  Bell, BellRing, CheckCircle2, AlertCircle, UserPlus, UserCheck,
  RefreshCw, Share2, Copy, ExternalLink, Filter, Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  bloodTypeInfo,
  urgencyInfo,
  myanmarHospitals,
  myanmarRegions,
  canDonateTo,
  getCompatibleDonors,
  donationEligibilityCriteria,
  sampleBloodRequests,
  type BloodType,
  type UrgencyLevel,
  type BloodRequest,
} from '@/data/blood-donor';

type TabType = 'requests' | 'donate' | 'register' | 'info';

export default function BloodDonorPage() {
  const { user, addPoints } = useAuth();
  const { toast } = useToast();
  
  // State
  const [activeTab, setActiveTab] = useState<TabType>('requests');
  const [selectedBloodType, setSelectedBloodType] = useState<BloodType | 'all'>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [userBloodType, setUserBloodType] = useState<BloodType | null>(null);
  const [isDonor, setIsDonor] = useState(false);
  const [expandedRequest, setExpandedRequest] = useState<string | null>(null);
  
  // Form state for blood request
  const [requestForm, setRequestForm] = useState({
    bloodType: 'O+' as BloodType,
    urgency: 'normal' as UrgencyLevel,
    hospital: '',
    region: 'yangon',
    phone: '',
    notes: '',
    requiredUnits: 1,
  });

  // Load saved blood type from localStorage
  useEffect(() => {
    const savedBloodType = localStorage.getItem('user-blood-type');
    if (savedBloodType) {
      setUserBloodType(savedBloodType as BloodType);
    }
    const savedIsDonor = localStorage.getItem('user-is-donor');
    if (savedIsDonor === 'true') {
      setIsDonor(true);
    }
  }, []);

  // Filter blood requests
  const filteredRequests = sampleBloodRequests.filter(req => {
    if (selectedBloodType !== 'all' && req.bloodType !== selectedBloodType) return false;
    if (selectedRegion !== 'all' && req.region !== selectedRegion) return false;
    return req.status === 'active';
  });

  // Check if user can donate to a blood type
  const userCanDonate = (requestType: BloodType): boolean => {
    if (!userBloodType || userBloodType === 'unknown') return false;
    return canDonateTo(userBloodType, requestType);
  };

  // Register as donor
  const handleRegisterDonor = () => {
    if (!userBloodType || userBloodType === 'unknown') {
      toast({
        title: 'Blood Type Required',
        description: 'Please select your blood type first',
        variant: 'destructive',
      });
      return;
    }
    
    setIsDonor(true);
    localStorage.setItem('user-is-donor', 'true');
    localStorage.setItem('user-blood-type', userBloodType);
    addPoints?.(50, 'Registered as blood donor');
    
    toast({
      title: 'Thank you for registering!',
      description: 'You will be notified when someone needs your blood type.',
    });
  };

  // Submit blood request
  const handleSubmitRequest = () => {
    if (!requestForm.phone || !requestForm.hospital) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }
    
    toast({
      title: 'Request Submitted!',
      description: 'Your blood request has been posted. Compatible donors will be notified.',
    });
    setShowRequestModal(false);
    addPoints?.(20, 'Posted blood request');
  };

  // Respond to blood request
  const handleRespondToRequest = (request: BloodRequest) => {
    toast({
      title: 'Thank you for responding!',
      description: `Please contact ${request.requesterName} at ${request.requesterPhone}`,
    });
    addPoints?.(100, 'Responded to blood request');
  };

  // Copy phone number
  const handleCopyPhone = async (phone: string) => {
    await navigator.clipboard.writeText(phone);
    toast({ title: 'Phone number copied!' });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 flex items-center justify-center shadow-lg shadow-red-500/20">
              <Droplets className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Blood Donor Network</h1>
              <p className="text-slate-400 text-sm">Save Lives - Donate Blood</p>
              <p className="text-red-400/60 text-xs burmese-text">အသက်ကယ် - သွေးလှူဒါန်းပါ</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {isDonor && (
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              <Heart className="h-3 w-3 mr-1" /> Registered Donor
            </Badge>
          )}
          {userBloodType && (
            <Badge className={`${bloodTypeInfo[userBloodType].bgColor} ${bloodTypeInfo[userBloodType].textColor} border ${bloodTypeInfo[userBloodType].borderColor}`}>
              Blood Type: {userBloodType}
            </Badge>
          )}
        </div>
      </div>

      {/* Mission Banner */}
      <Card className="glass-card border-red-500/20 bg-gradient-to-r from-red-500/5 to-rose-500/5">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 flex items-center justify-center flex-shrink-0">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Why This Matters</h3>
              <p className="text-slate-300 text-sm">
                In Myanmar, blood shortages are common, especially in rural areas. Every 2 seconds, someone needs blood.
                Your donation can save up to 3 lives. This platform connects donors with those in urgent need.
              </p>
              <p className="text-red-400/80 text-sm mt-2 burmese-text">
                မြန်မာနိုင်ငံတွင် သွေးငွေ့ပါးမှုများသည် အဖြစ်များပါသည်၊ အထူးသဖြင့် ကျေးလက်ဒေသများတွင်ဖြစ်သည်။
                သင့်သွေးလှူဒါန်းမှုသည် လူ၃ဦးအထိ အသက်ကယ်နိုင်သည်။
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="glass-card p-4 text-center"
        >
          <Droplets className="h-6 w-6 text-red-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-red-400">O-</div>
          <div className="text-slate-400 text-xs">Universal Donor</div>
          <div className="text-slate-500 text-xs burmese-text">Universal ပေးသူ</div>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="glass-card p-4 text-center"
        >
          <Users className="h-6 w-6 text-teal-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-teal-400">100+</div>
          <div className="text-slate-400 text-xs">Registered Donors</div>
          <div className="text-slate-500 text-xs burmese-text">မှတ်ပုံတင်ပြီး</div>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="glass-card p-4 text-center"
        >
          <Heart className="h-6 w-6 text-green-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-green-400">50+</div>
          <div className="text-slate-400 text-xs">Lives Saved</div>
          <div className="text-slate-500 text-xs burmese-text">အသက်ကယ်ပြီး</div>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="glass-card p-4 text-center"
        >
          <Building className="h-6 w-6 text-amber-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-amber-400">10+</div>
          <div className="text-slate-400 text-xs">Partner Hospitals</div>
          <div className="text-slate-500 text-xs burmese-text">ဆေးရုံများ</div>
        </motion.div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          { id: 'requests' as TabType, label: 'Blood Requests', labelMm: 'သွေးတောင်းချက်များ', icon: AlertTriangle },
          { id: 'donate' as TabType, label: 'Donate Blood', labelMm: 'သွေးလှူရန်', icon: Heart },
          { id: 'register' as TabType, label: 'Register as Donor', labelMm: 'ပေးသူမှတ်ပုံတင်ရန်', icon: UserPlus },
          { id: 'info' as TabType, label: 'Blood Type Info', labelMm: 'သွေးအမျိုးအစားသတင်းအချက်အလက်', icon: Info },
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
        {/* BLOOD REQUESTS TAB */}
        {activeTab === 'requests' && (
          <motion.div
            key="requests"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <select
                  value={selectedBloodType}
                  onChange={(e) => setSelectedBloodType(e.target.value as BloodType | 'all')}
                  className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500/50"
                >
                  <option value="all">All Blood Types - သွေးအမျိုးအစားအားလုံး</option>
                  {Object.keys(bloodTypeInfo).filter(t => t !== 'unknown').map((type) => (
                    <option key={type} value={type}>
                      {type} - {bloodTypeInfo[type as BloodType].percentage}% of population
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:w-48">
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500/50"
                >
                  <option value="all">All Regions</option>
                  {myanmarRegions.map((region) => (
                    <option key={region.id} value={region.id}>{region.name}</option>
                  ))}
                </select>
              </div>
              <Button
                onClick={() => setShowRequestModal(true)}
                className="bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600"
              >
                <Plus className="h-4 w-4 mr-2" />
                Request Blood
              </Button>
            </div>

            {/* Active Requests */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <BellRing className="h-5 w-5 text-red-400" />
                Active Blood Requests
              </h2>

              {filteredRequests.length > 0 ? (
                filteredRequests.map((request) => {
                  const urgency = urgencyInfo[request.urgency];
                  const bloodInfo = bloodTypeInfo[request.bloodType];
                  const canDonate = userCanDonate(request.bloodType);
                  const isExpanded = expandedRequest === request.id;

                  return (
                    <motion.div
                      key={request.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`glass-card overflow-hidden border ${
                        request.urgency === 'critical' ? 'border-red-500/30' : 'border-white/5'
                      }`}
                    >
                      {/* Header */}
                      <div className={`p-4 bg-gradient-to-r ${bloodInfo.color}`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="text-4xl font-bold text-white">{request.bloodType}</div>
                            <div>
                              <div className="flex items-center gap-2">
                                <Badge className={`${urgency.bgColor} ${urgency.color} border ${urgency.borderColor}`}>
                                  {urgency.icon} {urgency.label}
                                </Badge>
                                {bloodInfo.special && (
                                  <Badge className="bg-white/20 text-white border-white/30">
                                    {bloodInfo.special}
                                  </Badge>
                                )}
                              </div>
                              <p className="text-white/80 text-sm mt-1">{bloodInfo.specialMm}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-white font-bold">{request.requiredUnits} units needed</div>
                            <div className="text-white/70 text-sm">{request.fulfilledUnits} fulfilled</div>
                          </div>
                        </div>
                      </div>

                      <CardContent className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-slate-300">
                              <Building className="h-4 w-4 text-teal-400" />
                              <span>{request.hospital}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-300">
                              <MapPin className="h-4 w-4 text-teal-400" />
                              <span>{request.hospitalAddress}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-300">
                              <Clock className="h-4 w-4 text-amber-400" />
                              <span>Expires: {new Date(request.expiresAt).toLocaleString()}</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-slate-300">
                              <UserCheck className="h-4 w-4 text-purple-400" />
                              <span>Contact: {request.requesterName}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-green-400" />
                              <a href={`tel:${request.requesterPhone}`} className="text-green-400 hover:underline">
                                {request.requesterPhone}
                              </a>
                              <button
                                onClick={() => handleCopyPhone(request.requesterPhone)}
                                className="p-1 rounded hover:bg-white/5"
                              >
                                <Copy className="h-3 w-3 text-slate-400" />
                              </button>
                            </div>
                            {request.notes && (
                              <p className="text-slate-400 text-sm italic">"{request.notes}"</p>
                            )}
                          </div>
                        </div>

                        {/* Compatible Donors Info */}
                        <div className="mt-4 p-3 rounded-xl bg-slate-800/30">
                          <h4 className="text-sm font-medium text-white mb-2">Compatible Donors:</h4>
                          <div className="flex flex-wrap gap-2">
                            {getCompatibleDonors(request.bloodType).map((type) => (
                              <Badge 
                                key={type}
                                className={`${bloodTypeInfo[type].bgColor} ${bloodTypeInfo[type].textColor} border ${bloodTypeInfo[type].borderColor}`}
                              >
                                {type}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 mt-4">
                          {canDonate ? (
                            <Button
                              onClick={() => handleRespondToRequest(request)}
                              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                            >
                              <Heart className="h-4 w-4 mr-2" />
                              I Can Donate!
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              className="flex-1 border-white/10"
                              disabled
                            >
                              {userBloodType ? 'Not Compatible' : 'Register to Donate'}
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            className="border-white/10"
                            onClick={() => handleShare(request)}
                          >
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </motion.div>
                  );
                })
              ) : (
                <Card className="glass-card">
                  <CardContent className="p-12 text-center">
                    <CheckCircle2 className="h-16 w-16 text-green-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">No Active Requests</h3>
                    <p className="text-slate-400 mb-4">All blood requests have been fulfilled or expired.</p>
                    <p className="text-green-400/80 burmese-text">သွေးတောင်းချက်အားလုံး ပြီးမြောက်ပြီး သို့မဟုတ် သက်တမ်းကုန်သွားပြီ။</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </motion.div>
        )}

        {/* DONATE TAB */}
        {activeTab === 'donate' && (
          <motion.div
            key="donate"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <Card className="glass-card">
              <CardHeader>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-400" />
                  Donate Blood - Save Lives
                </h3>
                <p className="text-slate-400 text-sm">
                  {userBloodType 
                    ? `Your blood type: ${userBloodType} - You can donate to:` 
                    : 'Register your blood type to see compatible recipients'}
                </p>
              </CardHeader>
              <CardContent>
                {userBloodType ? (
                  <div className="space-y-4">
                    <h4 className="text-white font-medium">You can donate to these blood types:</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {bloodTypeInfo[userBloodType]?.special === 'Universal Donor' ? (
                        // O- can donate to all
                        Object.entries(bloodTypeInfo)
                          .filter(([key]) => key !== 'unknown')
                          .map(([type, info]) => (
                            <div
                              key={type}
                              className={`p-4 rounded-xl text-center ${info.bgColor} border ${info.borderColor}`}
                            >
                              <div className="text-2xl font-bold text-white">{type}</div>
                              <div className="text-xs text-slate-400">{info.percentage}% population</div>
                            </div>
                          ))
                      ) : (
                        bloodTypeInfo[userBloodType]?.canDonateTo?.map((type) => {
                          const info = bloodTypeInfo[type];
                          return (
                            <div
                              key={type}
                              className={`p-4 rounded-xl text-center ${info.bgColor} border ${info.borderColor}`}
                            >
                              <div className="text-2xl font-bold text-white">{type}</div>
                              <div className="text-xs text-slate-400">{info.percentage}% population</div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <AlertCircle className="h-12 w-12 text-amber-400 mx-auto mb-3" />
                    <p className="text-slate-300 mb-4">Please register your blood type first</p>
                    <Button onClick={() => setActiveTab('register')}>
                      Register Now
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* REGISTER TAB */}
        {activeTab === 'register' && (
          <motion.div
            key="register"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <Card className="glass-card">
              <CardHeader>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <UserPlus className="h-5 w-5 text-green-400" />
                  Register as Blood Donor
                </h3>
                <p className="text-slate-400 text-sm">
                  Join our life-saving network and help those in need
                </p>
                <p className="text-green-400/80 text-xs burmese-text">
                  ကျွန်ုပ်တို့၏အသက်ကယ်ကွန်ရက်တွင် ပါဝင်ပြီး လိုအပ်သူများကို ကူညီပါ
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Blood Type Selection */}
                <div>
                  <label className="block text-sm text-slate-400 mb-3">Select Your Blood Type</label>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                    {(Object.keys(bloodTypeInfo) as BloodType[]).filter(t => t !== 'unknown').map((type) => {
                      const info = bloodTypeInfo[type];
                      const isSelected = userBloodType === type;
                      
                      return (
                        <button
                          key={type}
                          onClick={() => {
                            setUserBloodType(type);
                            localStorage.setItem('user-blood-type', type);
                          }}
                          className={`p-4 rounded-xl text-center transition-all ${
                            isSelected 
                              ? `${info.bgColor} border-2 ${info.borderColor}` 
                              : 'bg-slate-800/30 border border-white/5 hover:border-white/20'
                          }`}
                        >
                          <div className={`text-2xl font-bold ${isSelected ? info.textColor : 'text-white'}`}>
                            {type}
                          </div>
                          <div className="text-xs text-slate-500 mt-1">{info.percentage}%</div>
                          {info.special && (
                            <div className="text-xs text-amber-400 mt-1">{info.special}</div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    Don't know your blood type? Visit a nearby hospital or clinic for a blood test.
                  </p>
                  <p className="text-xs text-amber-400/80 burmese-text mt-1">
                    သွေးအမျိုးအစားမသိပါက အနီးဆုံးဆေးရုံ သို့မဟုတ် ဆေးခန်းသို့သွားပါ။
                  </p>
                </div>

                {/* Eligibility Criteria */}
                <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/20">
                  <h4 className="font-medium text-green-400 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    Donation Eligibility
                  </h4>
                  <ul className="space-y-2">
                    {donationEligibilityCriteria.conditions.map((condition, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                        <Check className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <span>{condition}</span>
                          <p className="text-slate-500 text-xs burmese-text">{donationEligibilityCriteria.conditionsMm[i]}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Benefits */}
                <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                  <h4 className="font-medium text-amber-400 mb-3">Benefits of Donating</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { icon: Heart, text: 'Save up to 3 lives' },
                      { icon: Shield, text: 'Free health screening' },
                      { icon: Calendar, text: 'Priority blood access' },
                      { icon: Plus, text: '+100 points per donation' },
                    ].map((benefit, i) => (
                      <div key={i} className="flex items-center gap-2 text-slate-300 text-sm">
                        <benefit.icon className="h-4 w-4 text-amber-400" />
                        {benefit.text}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Register Button */}
                <Button
                  onClick={handleRegisterDonor}
                  disabled={!userBloodType || isDonor}
                  className="w-full bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 py-6 text-lg"
                >
                  {isDonor ? (
                    <>
                      <Check className="h-5 w-5 mr-2" />
                      Already Registered
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-5 w-5 mr-2" />
                      Register as Blood Donor
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* INFO TAB */}
        {activeTab === 'info' && (
          <motion.div
            key="info"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <Card className="glass-card">
              <CardHeader>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Info className="h-5 w-5 text-blue-400" />
                  Blood Type Information
                </h3>
                <p className="text-slate-400 text-sm">Learn about blood types and compatibility</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(Object.keys(bloodTypeInfo) as BloodType[]).filter(t => t !== 'unknown').map((type) => {
                    const info = bloodTypeInfo[type];
                    const compatibility = bloodTypeInfo[type];
                    
                    return (
                      <div
                        key={type}
                        className={`p-4 rounded-xl ${info.bgColor} border ${info.borderColor}`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="text-3xl font-bold text-white">{type}</div>
                          <div className="text-right">
                            <div className="text-sm text-slate-300">{info.percentage}% of population</div>
                            {info.special && (
                              <div className="text-xs text-amber-400">{info.special}</div>
                            )}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-slate-400">Can donate to:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {bloodTypeInfo[type]?.canDonateTo?.map(t => (
                                <Badge key={t} variant="outline" className="border-white/10 text-slate-300">{t}</Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <span className="text-slate-400">Can receive from:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {bloodTypeInfo[type]?.canReceiveFrom?.map(t => (
                                <Badge key={t} variant="outline" className="border-white/10 text-slate-300">{t}</Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Universal Donor/Recipient Info */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                    <div className="flex items-center gap-3 mb-2">
                      <Droplets className="h-6 w-6 text-green-400" />
                      <span className="font-bold text-white">Universal Donor: O-</span>
                    </div>
                    <p className="text-slate-300 text-sm">
                      O- blood can be given to anyone in emergencies. O- donors are heroes!
                    </p>
                    <p className="text-green-400/80 text-xs burmese-text mt-2">
                      O- သွေးကို အရေးပေါ်အခြေအနေတွင် မည်သူ့ကိုမဆို ပေးနိုင်သည်။ O- ပေးသူများသည် ဟီးရိုးများဖြစ်သည်!
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                    <div className="flex items-center gap-3 mb-2">
                      <Heart className="h-6 w-6 text-purple-400" />
                      <span className="font-bold text-white">Universal Recipient: AB+</span>
                    </div>
                    <p className="text-slate-300 text-sm">
                      AB+ individuals can receive blood from any type in emergencies.
                    </p>
                    <p className="text-purple-400/80 text-xs burmese-text mt-2">
                      AB+ လူများသည် အရေးပေါ်အခြေအနေတွင် မည်သည့်သွေးအမျိုးအစားကိုမဆို လက်ခံနိုင်သည်။
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Request Blood Modal */}
      <AnimatePresence>
        {showRequestModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowRequestModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto bg-slate-900"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Request Blood</h2>
                <button onClick={() => setShowRequestModal(false)} className="p-2 rounded-lg hover:bg-white/5">
                  <X className="h-5 w-5 text-slate-400" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Blood Type */}
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Blood Type Needed</label>
                  <select
                    value={requestForm.bloodType}
                    onChange={(e) => setRequestForm({ ...requestForm, bloodType: e.target.value as BloodType })}
                    className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 text-white"
                  >
                    {(Object.keys(bloodTypeInfo) as BloodType[]).filter(t => t !== 'unknown').map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Urgency */}
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Urgency Level</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(Object.keys(urgencyInfo) as UrgencyLevel[]).map((urgency) => {
                      const info = urgencyInfo[urgency];
                      return (
                        <button
                          key={urgency}
                          onClick={() => setRequestForm({ ...requestForm, urgency })}
                          className={`p-3 rounded-xl text-center transition-all ${
                            requestForm.urgency === urgency 
                              ? `${info.bgColor} border ${info.borderColor}` 
                              : 'bg-slate-800/30 border border-white/5'
                          }`}
                        >
                          <div className="text-xl mb-1">{info.icon}</div>
                          <div className={`text-sm font-medium ${requestForm.urgency === urgency ? info.color : 'text-white'}`}>
                            {info.label}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Hospital */}
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Hospital</label>
                  <select
                    value={requestForm.hospital}
                    onChange={(e) => setRequestForm({ ...requestForm, hospital: e.target.value })}
                    className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 text-white"
                  >
                    <option value="">Select Hospital</option>
                    {myanmarHospitals.map((hospital) => (
                      <option key={hospital.id} value={hospital.name}>{hospital.name}</option>
                    ))}
                  </select>
                </div>

                {/* Region */}
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Region</label>
                  <select
                    value={requestForm.region}
                    onChange={(e) => setRequestForm({ ...requestForm, region: e.target.value })}
                    className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 text-white"
                  >
                    {myanmarRegions.map((region) => (
                      <option key={region.id} value={region.id}>{region.name}</option>
                    ))}
                  </select>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Contact Phone</label>
                  <input
                    type="tel"
                    value={requestForm.phone}
                    onChange={(e) => setRequestForm({ ...requestForm, phone: e.target.value })}
                    placeholder="09xxxxxxxxx"
                    className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-red-500/50"
                  />
                </div>

                {/* Units Needed */}
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Units Needed</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={requestForm.requiredUnits}
                    onChange={(e) => setRequestForm({ ...requestForm, requiredUnits: parseInt(e.target.value) || 1 })}
                    className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500/50"
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Additional Notes (Optional)</label>
                  <textarea
                    value={requestForm.notes}
                    onChange={(e) => setRequestForm({ ...requestForm, notes: e.target.value })}
                    placeholder="Any additional information..."
                    rows={3}
                    className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-red-500/50 resize-none"
                  />
                </div>

                <Button
                  onClick={handleSubmitRequest}
                  className="w-full bg-gradient-to-r from-red-500 to-rose-500"
                >
                  Submit Blood Request
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  // Share function
  function handleShare(request: BloodRequest) {
    const text = `🩸 BLOOD REQUEST\nBlood Type: ${request.bloodType}\nUrgency: ${request.urgency.toUpperCase()}\nHospital: ${request.hospital}\nContact: ${request.requesterPhone}\n\nFrom ReferTRM Blood Network`;
    
    if (navigator.share) {
      navigator.share({ title: 'Blood Request', text });
    } else {
      navigator.clipboard.writeText(text);
      toast({ title: 'Request details copied!' });
    }
  }
}
