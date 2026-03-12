import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Phone, MessageSquare, Calendar, MapPin, CheckCircle, Clock, AlertCircle, Zap, TrendingUp, IndianRupee, Users, Trophy, Medal, Star, ShieldCheck, UserCheck, X } from 'lucide-react';
import { io } from 'socket.io-client';

export default function BrokerDashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<any[]>([]);
  const socketRef = useRef<any>(null);

  useEffect(() => {
    // Initialize Socket
    socketRef.current = io();

    socketRef.current.on("new_lead_notification", (data: any) => {
      // In a real app, we'd check if data.brokerId matches this broker's ID
      setNotifications(prev => [data, ...prev]);
      
      // Also add to leads list dynamically
      setLeads(prev => [{
        id: Date.now(),
        name: data.buyerName,
        budget: 'TBD',
        intent: 'High',
        type: 'AI Match',
        lastContact: 'Just now',
        nextAction: 'Contact Immediately'
      }, ...prev]);
    });

    Promise.all([
      fetch('/api/broker/profile').then(res => res.json()),
      fetch('/api/broker/leads').then(res => res.json())
    ]).then(([profileData, leadsData]) => {
      setProfile(profileData);
      setLeads(leadsData);
      setLoading(false);
    }).catch(err => {
      console.error("Failed to fetch broker data", err);
      setLoading(false);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const removeNotification = (index: number) => {
    setNotifications(prev => prev.filter((_, i) => i !== index));
  };

  if (loading) return <div className="flex items-center justify-center h-64 text-slate-500">Loading Broker Copilot...</div>;
  if (!profile) return <div className="text-red-500">Failed to load data.</div>;

  const progressPercentage = (profile.points / profile.nextTierPoints) * 100;

  return (
    <div className="space-y-6 relative">
      {/* Floating Notifications */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {notifications.map((notif, idx) => (
          <div key={idx} className="bg-white border-l-4 border-indigo-500 shadow-xl p-4 rounded-md w-80 animate-in slide-in-from-bottom-5 fade-in duration-300">
            <div className="flex items-start justify-between gap-3">
              <div className="flex gap-3">
                <div className="bg-indigo-100 p-2 rounded-full shrink-0">
                  <UserCheck className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">New AI Match: {notif.buyerName}</h4>
                  <p className="text-xs text-slate-600 mt-1">{notif.message}</p>
                </div>
              </div>
              <button onClick={() => removeNotification(idx)} className="text-slate-400 hover:text-slate-600 shrink-0">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-3 flex gap-2">
              <Button size="sm" className="w-full text-xs h-7 bg-indigo-600 hover:bg-indigo-700">Accept Lead</Button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Broker OS Copilot</h2>
          <p className="text-slate-500">Welcome back, {profile.name}. You have 3 high-intent leads today.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Calendar className="w-4 h-4 mr-2" /> Schedule Visit</Button>
          <Button><Zap className="w-4 h-4 mr-2" /> AI Pitch Generator</Button>
        </div>
      </div>

      {/* Gamification & Rewards Section */}
      <Card className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white border-none shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-300 to-amber-600 flex items-center justify-center border-4 border-indigo-950 shadow-inner">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold">{profile.tier} Broker</h3>
                  <Badge className="bg-indigo-500/30 text-indigo-200 border-indigo-400/30 hover:bg-indigo-500/40">Top 5%</Badge>
                </div>
                <p className="text-indigo-200 text-sm mt-1">{profile.points.toLocaleString()} Points Total</p>
              </div>
            </div>
            
            <div className="flex-1 w-full max-w-md">
              <div className="flex justify-between text-xs text-indigo-200 mb-2">
                <span>Current: {profile.tier}</span>
                <span>Next: Diamond ({profile.nextTierPoints.toLocaleString()} pts)</span>
              </div>
              <div className="h-2 w-full bg-indigo-950 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-400 to-amber-200 rounded-full transition-all duration-1000"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <p className="text-xs text-indigo-300 mt-2 text-right">
                {(profile.nextTierPoints - profile.points).toLocaleString()} points to next tier
              </p>
            </div>

            <div className="flex gap-2">
              {profile.badges.map((badge: string, idx: number) => (
                <div key={idx} className="flex flex-col items-center justify-center bg-indigo-800/50 rounded-lg p-2 border border-indigo-700/50 w-20 text-center" title={badge}>
                  {idx === 0 ? <Medal className="w-5 h-5 text-amber-400 mb-1" /> : idx === 1 ? <Star className="w-5 h-5 text-emerald-400 mb-1" /> : <ShieldCheck className="w-5 h-5 text-blue-400 mb-1" />}
                  <span className="text-[9px] leading-tight font-medium text-indigo-100">{badge}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Active Leads</CardTitle>
            <Users className="w-4 h-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profile.activeLeads}</div>
            <p className="text-xs text-emerald-600 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" /> +3 this week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Site Visits (MTD)</CardTitle>
            <MapPin className="w-4 h-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profile.siteVisits}</div>
            <p className="text-xs text-emerald-600 flex items-center mt-1">
              <CheckCircle className="w-3 h-3 mr-1" /> 4 conversions
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Pending Payouts</CardTitle>
            <IndianRupee className="w-4 h-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profile.pendingPayouts}</div>
            <p className="text-xs text-slate-500 mt-1">
              Expected by 15th
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Conversion Rate</CardTitle>
            <TrendingUp className="w-4 h-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profile.conversionRate}</div>
            <p className="text-xs text-emerald-600 flex items-center mt-1">
              Top 10% in agency
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>AI-Ranked Leads</CardTitle>
            <CardDescription>Prioritized by conversion probability based on recent activity.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leads.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className={`w-2 h-2 mt-2 rounded-full ${lead.intent === 'High' ? 'bg-emerald-500' : lead.intent === 'Medium' ? 'bg-amber-500' : 'bg-slate-300'}`} />
                    <div>
                      <h4 className="font-semibold text-slate-900">{lead.name}</h4>
                      <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                        <Badge variant="secondary" className="font-normal">{lead.type}</Badge>
                        <span>•</span>
                        <span>Budget: {lead.budget}</span>
                        <span>•</span>
                        <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {lead.lastContact}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded">{lead.nextAction}</span>
                    <div className="flex gap-2">
                      <Button size="icon" variant="ghost" className="h-8 w-8"><Phone className="w-4 h-4" /></Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8"><MessageSquare className="w-4 h-4" /></Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-indigo-500" />
                <CardTitle>Copilot: Next Best Action</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                <h4 className="text-sm font-semibold text-indigo-900">Pitching Rahul Sharma</h4>
                <p className="text-xs text-indigo-700 mt-1 mb-3">
                  He is looking for a 3BHK end-user home. Focus on the proximity to DPS School and the upcoming metro station.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-xs">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="text-slate-700">Suggest Unit U-304 (Park facing, matches budget)</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs">
                    <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                    <span className="text-slate-700">Objection prep: "Price is too high" -&gt; Show 12% YoY appreciation in Sector 45.</span>
                  </div>
                </div>
                <Button size="sm" className="w-full mt-3 h-8 text-xs bg-indigo-600 hover:bg-indigo-700">Generate WhatsApp Pitch</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Inventory Match</CardTitle>
              <CardDescription>Hot units for your active leads</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2 rounded border border-slate-100 bg-slate-50">
                  <div>
                    <div className="text-sm font-semibold">Tower B - 1204</div>
                    <div className="text-xs text-slate-500">3BHK • 1850 sqft • ₹2.1Cr</div>
                  </div>
                  <Badge variant="outline" className="text-[10px] bg-emerald-50 text-emerald-700 border-emerald-200">92% Match (Amit)</Badge>
                </div>
                <div className="flex justify-between items-center p-2 rounded border border-slate-100 bg-slate-50">
                  <div>
                    <div className="text-sm font-semibold">Tower A - 502</div>
                    <div className="text-xs text-slate-500">2BHK • 1250 sqft • ₹1.1Cr</div>
                  </div>
                  <Badge variant="outline" className="text-[10px] bg-emerald-50 text-emerald-700 border-emerald-200">88% Match (Rahul)</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
