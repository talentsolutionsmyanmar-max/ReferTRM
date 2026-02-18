'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings,
  Building2,
  Users,
  Bell,
  Globe,
  Shield,
  CreditCard,
  Mail,
  Phone,
  MapPin,
  Globe2,
  Camera,
  Save,
  Plus,
  Trash2,
  Check,
  ChevronRight,
  Key,
  Link,
  FileText,
  Languages,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { useTranslation } from '@/contexts/TranslationContext';

// Company industries
const industries = [
  { value: 'technology', label: 'Technology / နည်းပညာ' },
  { value: 'finance', label: 'Finance & Banking / ငွေရေးကြေးရေး' },
  { value: 'manufacturing', label: 'Manufacturing / ထုတ်လုပ်မှု' },
  { value: 'retail', label: 'Retail / လက်လီရောင်းချမှု' },
  { value: 'healthcare', label: 'Healthcare / ကျန်းမာရေး' },
  { value: 'education', label: 'Education / ပညာရေး' },
  { value: 'construction', label: 'Construction / ဆောက်လုပ်ရေး' },
  { value: 'hospitality', label: 'Hospitality / ဧည့်ဝန်ဆောင်မှု' },
  { value: 'logistics', label: 'Logistics / ပို့ဆောင်ရေး' },
  { value: 'other', label: 'Other / အခြား' },
];

// Company sizes
const companySizes = [
  { value: '1-10', label: '1-10 employees' },
  { value: '11-50', label: '11-50 employees' },
  { value: '51-200', label: '51-200 employees' },
  { value: '201-500', label: '201-500 employees' },
  { value: '501-1000', label: '501-1000 employees' },
  { value: '1000+', label: '1000+ employees' },
];

// Mock team members
const mockTeamMembers = [
  { id: '1', name: 'Daw Mya Myint', email: 'mya.myint@company.com', role: 'Admin', avatar: 'M' },
  { id: '2', name: 'U Thura Aung', email: 'thura@company.com', role: 'HR Manager', avatar: 'T' },
  { id: '3', name: 'Daw Su Lwin', email: 'su@company.com', role: 'Recruiter', avatar: 'S' },
];

export default function CompanySettingsPage() {
  const { language, setLanguage } = useTranslation();
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);

  // Company profile state
  const [profile, setProfile] = useState({
    companyName: 'RK Yangon Steel',
    companyNameMm: 'RK ရန်ကုန်သံမဏိ',
    industry: 'manufacturing',
    size: '51-200',
    founded: '2015',
    website: 'www.rkyangonsteel.com',
    email: 'hr@rkyangonsteel.com',
    phone: '+95 1 234 567',
    address: 'No. 123, Industrial Zone, Hlaing Tharyar, Yangon',
    description: 'Leading steel manufacturer in Myanmar, providing quality steel products for construction and infrastructure projects.',
    descriptionMm: 'မြန်မာနိုင်ငံ၏ ထိပ်တန်းသံမဏိထုတ်လုပ်သူ၊ ဆောက်လုပ်ရေးနှင့် အခြေခံအဆောက်အဦစီမံကိန်းများအတွက် အရည်အသွေးမြင့်သံမဏိထုတ်ကုန်များ ပေးအပ်သည်။',
  });

  // Notification settings
  const [notifications, setNotifications] = useState({
    newApplicants: true,
    interviewReminders: true,
    referralUpdates: true,
    weeklyReports: true,
    marketingEmails: false,
  });

  // Integration settings
  const [integrations, setIntegrations] = useState({
    telegram: true,
    emailNotifications: true,
    smsAlerts: false,
  });

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Settings className="h-7 w-7 text-teal-400" />
            Company Settings
            <span className="text-lg text-slate-400 font-normal">/ ကုမ္ပဏီဆက်တင်များ</span>
          </h1>
          <p className="text-slate-400 mt-1">
            Manage your company profile, team, and preferences
          </p>
        </div>
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white"
        >
          {isSaving ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
              />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Changes / သိမ်းဆည်းပါ
            </>
          )}
        </Button>
      </div>

      {/* Settings Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="glass-card p-1 mb-6 flex flex-wrap">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            <span className="hidden md:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="team" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden md:inline">Team</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden md:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="language" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span className="hidden md:inline">Language</span>
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center gap-2">
            <Link className="h-4 w-4" />
            <span className="hidden md:inline">Integrations</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="glass-card border-white/5 lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-white">Company Information / ကုမ္ပဏီအချက်အလက်</CardTitle>
                <CardDescription>Update your company details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Logo Upload */}
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 flex items-center justify-center text-3xl font-bold text-amber-400">
                    R
                  </div>
                  <div>
                    <Button variant="outline" className="border-white/10 hover:bg-white/5">
                      <Camera className="h-4 w-4 mr-2" />
                      Change Logo
                    </Button>
                    <p className="text-xs text-slate-500 mt-2">JPG, PNG. Max 2MB</p>
                  </div>
                </div>

                {/* Company Names */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-slate-300">Company Name (English)</Label>
                    <Input
                      value={profile.companyName}
                      onChange={(e) => setProfile({ ...profile, companyName: e.target.value })}
                      className="bg-slate-800/50 border-white/10 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300">ကုမ္ပဏီအမည် (မြန်မာ)</Label>
                    <Input
                      value={profile.companyNameMm}
                      onChange={(e) => setProfile({ ...profile, companyNameMm: e.target.value })}
                      className="bg-slate-800/50 border-white/10 text-white font-padauk"
                    />
                  </div>
                </div>

                {/* Industry & Size */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-slate-300">Industry / စက်မှုလုပ်ငန်း</Label>
                    <Select value={profile.industry} onValueChange={(v) => setProfile({ ...profile, industry: v })}>
                      <SelectTrigger className="bg-slate-800/50 border-white/10 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-white/10">
                        {industries.map((ind) => (
                          <SelectItem key={ind.value} value={ind.value} className="text-white hover:bg-slate-800">
                            {ind.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300">Company Size / ကုမ္ပဏီအရွယ်အစား</Label>
                    <Select value={profile.size} onValueChange={(v) => setProfile({ ...profile, size: v })}>
                      <SelectTrigger className="bg-slate-800/50 border-white/10 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-white/10">
                        {companySizes.map((size) => (
                          <SelectItem key={size.value} value={size.value} className="text-white hover:bg-slate-800">
                            {size.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-slate-300 flex items-center gap-2">
                      <Mail className="h-4 w-4" /> Email
                    </Label>
                    <Input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="bg-slate-800/50 border-white/10 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300 flex items-center gap-2">
                      <Phone className="h-4 w-4" /> Phone
                    </Label>
                    <Input
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="bg-slate-800/50 border-white/10 text-white"
                    />
                  </div>
                </div>

                {/* Website & Founded */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-slate-300 flex items-center gap-2">
                      <Globe2 className="h-4 w-4" /> Website
                    </Label>
                    <Input
                      value={profile.website}
                      onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                      className="bg-slate-800/50 border-white/10 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300">Founded Year / စတင်ခုနှစ်</Label>
                    <Input
                      value={profile.founded}
                      onChange={(e) => setProfile({ ...profile, founded: e.target.value })}
                      className="bg-slate-800/50 border-white/10 text-white"
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <Label className="text-slate-300 flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> Address / လိပ်စာ
                  </Label>
                  <Input
                    value={profile.address}
                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                    className="bg-slate-800/50 border-white/10 text-white"
                  />
                </div>

                {/* Descriptions */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-slate-300">Description (English)</Label>
                    <Textarea
                      value={profile.description}
                      onChange={(e) => setProfile({ ...profile, description: e.target.value })}
                      className="bg-slate-800/50 border-white/10 text-white min-h-[100px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300">ဖော်ပြချက် (မြန်မာ)</Label>
                    <Textarea
                      value={profile.descriptionMm}
                      onChange={(e) => setProfile({ ...profile, descriptionMm: e.target.value })}
                      className="bg-slate-800/50 border-white/10 text-white min-h-[100px] font-padauk"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Info Card */}
            <div className="space-y-4">
              <Card className="glass-card border-white/5">
                <CardHeader>
                  <CardTitle className="text-white text-sm">Quick Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Plan</span>
                    <Badge className="bg-amber-500/20 text-amber-400">Bronze</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Job Posts</span>
                    <span className="text-sm text-white">8/10 used</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Team Members</span>
                    <span className="text-sm text-white">3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Member Since</span>
                    <span className="text-sm text-white">Jan 2024</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-white/5">
                <CardHeader>
                  <CardTitle className="text-white text-sm">Profile Completion</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">Complete</span>
                      <span className="text-sm font-medium text-teal-400">85%</span>
                    </div>
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-teal-500 rounded-full" style={{ width: '85%' }} />
                    </div>
                    <p className="text-xs text-slate-500">Add logo photo to complete</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Team Tab */}
        <TabsContent value="team">
          <Card className="glass-card border-white/5">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white">Team Members / အဖွဲ့ဝင်များ</CardTitle>
                  <CardDescription>Manage who has access to your company portal</CardDescription>
                </div>
                <Button className="bg-teal-500 hover:bg-teal-600 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Invite Member
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockTeamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-slate-800/30 border border-white/5"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-teal-500/20 to-cyan-500/20 flex items-center justify-center text-lg font-bold text-teal-400">
                        {member.avatar}
                      </div>
                      <div>
                        <p className="font-medium text-white">{member.name}</p>
                        <p className="text-sm text-slate-400">{member.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        variant="outline"
                        className={member.role === 'Admin' ? 'border-amber-500/50 text-amber-400' : 'border-slate-500/50 text-slate-400'}
                      >
                        {member.role}
                      </Badge>
                      <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card className="glass-card border-white/5">
            <CardHeader>
              <CardTitle className="text-white">Notification Preferences / အသိပေးချက်ဆက်တင်</CardTitle>
              <CardDescription>Choose what notifications you want to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { key: 'newApplicants', label: 'New Applicants', labelMm: 'လျှောက်လွှာတင်သူအသစ်', desc: 'Get notified when candidates apply' },
                { key: 'interviewReminders', label: 'Interview Reminders', labelMm: 'အင်တာဗျူးသတိပေးချက်', desc: 'Reminders 1 hour before interviews' },
                { key: 'referralUpdates', label: 'Referral Updates', labelMm: 'ရည်ညွှန်းမှုအပ်ဒိတ်', desc: 'Status changes for referred candidates' },
                { key: 'weeklyReports', label: 'Weekly Reports', labelMm: 'အပတ်စဉ်အစီရင်ချက်', desc: 'Summary of hiring activities' },
                { key: 'marketingEmails', label: 'Marketing Emails', labelMm: 'မာကတ်တင်းအီးမေးလ်', desc: 'Product updates and tips' },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 rounded-xl bg-slate-800/30 border border-white/5">
                  <div>
                    <p className="font-medium text-white">{item.label}</p>
                    <p className="text-xs text-slate-400">{item.labelMm}</p>
                    <p className="text-sm text-slate-500 mt-1">{item.desc}</p>
                  </div>
                  <Switch
                    checked={notifications[item.key as keyof typeof notifications]}
                    onCheckedChange={(checked) => 
                      setNotifications({ ...notifications, [item.key]: checked })
                    }
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Language Tab */}
        <TabsContent value="language">
          <Card className="glass-card border-white/5">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Languages className="h-5 w-5 text-teal-400" />
                Language Settings / ဘာသာစကားဆက်တင်
              </CardTitle>
              <CardDescription>
                Choose your preferred language for the company portal
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <LanguageToggle variant="dropdown" />

              <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                <h4 className="font-medium text-purple-300 mb-2">🌟 AI-Powered Translations</h4>
                <p className="text-sm text-slate-400">
                  Myanmar translations are powered by AI for natural, culturally-appropriate language.
                  Your job postings and communications will sound professional and local.
                </p>
                <p className="text-sm text-slate-400 mt-2">
                  မြန်မာဘာသာပြန်ဆိုမှုများသည် သဘာВтကျသော ယဉ်ကျေးမှုနှင့်ကိုက်ညီသော ဘာသာစကားအတွက် AI ဖြင့် စီမံခန့်ခွဲထားသည်။
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-800/30 border border-white/5">
                  <h4 className="font-medium text-white mb-2">Auto-Translate Job Posts</h4>
                  <p className="text-sm text-slate-400 mb-3">
                    Automatically generate Myanmar versions of your job descriptions
                  </p>
                  <Switch defaultChecked />
                </div>
                <div className="p-4 rounded-xl bg-slate-800/30 border border-white/5">
                  <h4 className="font-medium text-white mb-2">Bilingual Communications</h4>
                  <p className="text-sm text-slate-400 mb-3">
                    Send messages in both English and Myanmar
                  </p>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations">
          <Card className="glass-card border-white/5">
            <CardHeader>
              <CardTitle className="text-white">Integrations / ဆက်စပ်မှုများ</CardTitle>
              <CardDescription>Connect your tools and platforms</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { key: 'telegram', name: 'Telegram Bot', icon: '📱', desc: 'Send notifications to Telegram channels', connected: true },
                { key: 'emailNotifications', name: 'Email Notifications', icon: '📧', desc: 'Automated email alerts', connected: true },
                { key: 'smsAlerts', name: 'SMS Alerts', icon: '💬', desc: 'SMS notifications (Coming Soon)', connected: false, disabled: true },
              ].map((integration) => (
                <div
                  key={integration.key}
                  className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                    integration.disabled 
                      ? 'bg-slate-800/20 border-white/5 opacity-60' 
                      : 'bg-slate-800/30 border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{integration.icon}</span>
                    <div>
                      <p className="font-medium text-white">{integration.name}</p>
                      <p className="text-sm text-slate-400">{integration.desc}</p>
                    </div>
                  </div>
                  {integration.disabled ? (
                    <Badge variant="outline" className="border-slate-500/50 text-slate-500">
                      Coming Soon
                    </Badge>
                  ) : integration.connected ? (
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-400" />
                      <Badge className="bg-green-500/20 text-green-400">Connected</Badge>
                    </div>
                  ) : (
                    <Button size="sm" variant="outline" className="border-white/10 hover:bg-white/5">
                      Connect
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="glass-card border-white/5 mt-6">
            <CardHeader>
              <CardTitle className="text-white">API Access / API ခွင့်ပြုချက်</CardTitle>
              <CardDescription>For developers and custom integrations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-800/30 border border-white/5">
                <div className="flex items-center gap-4">
                  <Key className="h-6 w-6 text-slate-400" />
                  <div>
                    <p className="font-medium text-white">API Key</p>
                    <p className="text-sm text-slate-400 font-mono">rkys_****************************</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="border-white/10 hover:bg-white/5">
                  Regenerate
                </Button>
              </div>
              <p className="text-xs text-slate-500 mt-4">
                💡 API access is available on Silver and Gold plans. Upgrade to unlock full API capabilities.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button Fixed at Bottom */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white shadow-lg shadow-teal-500/25"
        >
          {isSaving ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
              />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save All Changes
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
