import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Building2, TrendingUp, AlertTriangle, CheckCircle2, Map, BarChart3, Users, Zap, IndianRupee, Trophy, Target, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area, Cell } from 'recharts';

const inventoryData = [
  { name: '1BHK', available: 45, sold: 120, hold: 10 },
  { name: '2BHK', available: 80, sold: 200, hold: 20 },
  { name: '3BHK', available: 30, sold: 90, hold: 15 },
  { name: 'Penthouse', available: 5, sold: 15, hold: 2 },
];

const revenueData = [
  { month: 'Jan', revenue: 12, projected: 10 },
  { month: 'Feb', revenue: 18, projected: 15 },
  { month: 'Mar', revenue: 25, projected: 20 },
  { month: 'Apr', revenue: 32, projected: 28 },
  { month: 'May', revenue: 45, projected: 35 },
  { month: 'Jun', revenue: 58, projected: 50 },
];

const brokerLeaderboard = [
  { id: 1, name: 'Vikram Singh', tier: 'Platinum', sales: '₹45Cr', conversions: '22%', trend: 'up' },
  { id: 2, name: 'Rohan Mehta', tier: 'Gold', sales: '₹38Cr', conversions: '18%', trend: 'up' },
  { id: 3, name: 'Aisha Khan', tier: 'Gold', sales: '₹32Cr', conversions: '24%', trend: 'down' },
  { id: 4, name: 'Dev Sharma', tier: 'Silver', sales: '₹28Cr', conversions: '15%', trend: 'up' },
];

const unitGrid = Array.from({ length: 40 }).map((_, i) => {
  const statusRand = Math.random();
  let status = 'available';
  if (statusRand > 0.7) status = 'sold';
  else if (statusRand > 0.5) status = 'hold';
  
  return {
    id: `U-${100 + i}`,
    type: ['1BHK', '2BHK', '3BHK'][Math.floor(Math.random() * 3)],
    status,
    price: Math.floor(Math.random() * 50 + 50) + 'L',
  };
});

const funnelData = [
  { name: 'Total Leads', value: 1200, fill: '#94a3b8' },
  { name: 'Site Visits', value: 450, fill: '#60a5fa' },
  { name: 'Negotiation', value: 180, fill: '#818cf8' },
  { name: 'Closed', value: 85, fill: '#34d399' },
];

export default function BuilderDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/builder/stats')
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch builder stats", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Builder Command Center</h2>
          <p className="text-slate-500">Project: The Horizon Residences • Sector 45, NCR</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Map className="w-4 h-4 mr-2" /> View 3D Map</Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700"><Zap className="w-4 h-4 mr-2" /> AI Strategy Sync</Button>
        </div>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Total Inventory</CardTitle>
            <Building2 className="w-4 h-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? '...' : stats?.totalInventory}</div>
            <p className="text-xs text-emerald-600 flex items-center mt-1">
              <CheckCircle2 className="w-3 h-3 mr-1" /> {loading ? '...' : `${stats?.totalInventory - stats?.availableUnits} Sold`}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Avg. Velocity</CardTitle>
            <TrendingUp className="w-4 h-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? '...' : stats?.avgVelocity}</div>
            <p className="text-xs text-emerald-600 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" /> +15% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Revenue Realized</CardTitle>
            <IndianRupee className="w-4 h-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? '...' : stats?.revenue}</div>
            <p className="text-xs text-emerald-600 flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" /> 12% ahead of target
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Active Brokers</CardTitle>
            <Users className="w-4 h-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? '...' : stats?.activeBrokers}</div>
            <p className="text-xs text-slate-500 mt-1">
              12 high-performing
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Map */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Live Inventory Map (Tower A)</CardTitle>
            <CardDescription>Real-time status of units. Click to manage release strategy.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {unitGrid.map((unit) => (
                <div
                  key={unit.id}
                  className={`
                    p-2 rounded-md border text-center cursor-pointer transition-all hover:scale-105
                    ${unit.status === 'available' ? 'bg-white border-slate-200 hover:border-slate-400' : ''}
                    ${unit.status === 'sold' ? 'bg-slate-100 border-slate-200 opacity-50' : ''}
                    ${unit.status === 'hold' ? 'bg-amber-50 border-amber-200 text-amber-700' : ''}
                  `}
                  title={`${unit.id} - ${unit.type} - ${unit.price}`}
                >
                  <div className="text-xs font-mono font-medium">{unit.id}</div>
                  <div className="text-[10px] text-slate-500">{unit.type}</div>
                  {unit.status === 'hold' && <div className="w-2 h-2 rounded-full bg-amber-500 mx-auto mt-1" />}
                  {unit.status === 'sold' && <div className="w-2 h-2 rounded-full bg-slate-400 mx-auto mt-1" />}
                  {unit.status === 'available' && <div className="w-2 h-2 rounded-full bg-emerald-500 mx-auto mt-1" />}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-6 text-sm text-slate-500">
              <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-emerald-500" /> Available</div>
              <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-slate-400" /> Sold</div>
              <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-amber-500" /> Strategic Hold</div>
            </div>
          </CardContent>
        </Card>

        {/* AI Strategy Agent */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-indigo-500" />
              <CardTitle>AI Strategy Agent</CardTitle>
            </div>
            <CardDescription>Recommendations based on market velocity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-100">
              <div className="flex items-start gap-2">
                <div className="mt-0.5"><AlertTriangle className="w-4 h-4 text-indigo-600" /></div>
                <div>
                  <h4 className="text-sm font-semibold text-indigo-900">Release Recommendation</h4>
                  <p className="text-xs text-indigo-700 mt-1">Hold back 3BHK units on floors 15-20. Demand is spiking, projected +8% price realization next month.</p>
                  <Button size="sm" variant="outline" className="mt-2 h-7 text-xs bg-white">Apply Hold</Button>
                </div>
              </div>
            </div>
            
            <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100">
              <div className="flex items-start gap-2">
                <div className="mt-0.5"><TrendingUp className="w-4 h-4 text-emerald-600" /></div>
                <div>
                  <h4 className="text-sm font-semibold text-emerald-900">Price Band Adjustment</h4>
                  <p className="text-xs text-emerald-700 mt-1">Increase 2BHK base price by ₹250/sqft. Sell-through velocity is 2x faster than market average.</p>
                  <Button size="sm" variant="outline" className="mt-2 h-7 text-xs bg-white">Update Pricing</Button>
                </div>
              </div>
            </div>

            <div className="p-3 bg-amber-50 rounded-lg border border-amber-100">
              <div className="flex items-start gap-2">
                <div className="mt-0.5"><Users className="w-4 h-4 text-amber-600" /></div>
                <div>
                  <h4 className="text-sm font-semibold text-amber-900">Channel Optimization</h4>
                  <p className="text-xs text-amber-700 mt-1">Re-route 1BHK leads to Broker Team Alpha. They have a 40% higher conversion rate for this typology.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Projection */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue Trajectory (Cr)</CardTitle>
            <CardDescription>Actual vs Projected Sales Revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip cursor={{fill: '#f1f5f9'}} />
                  <Area type="monotone" dataKey="revenue" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" name="Actual Revenue" />
                  <Area type="monotone" dataKey="projected" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" fillOpacity={0} name="Projected" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Broker Leaderboard */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              <CardTitle>Broker Leaderboard</CardTitle>
            </div>
            <CardDescription>Top performing channel partners</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {brokerLeaderboard.map((broker, idx) => (
                <div key={broker.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-sm border">
                      #{idx + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-slate-900">{broker.name}</h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Badge variant="secondary" className="text-[10px] h-4 px-1 bg-indigo-50 text-indigo-700 border-indigo-100">{broker.tier}</Badge>
                        <span className="text-xs text-slate-500">CVR: {broker.conversions}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-sm text-slate-900">{broker.sales}</div>
                    {broker.trend === 'up' ? (
                      <div className="flex items-center justify-end text-[10px] text-emerald-600 font-medium mt-0.5">
                        <ArrowUpRight className="w-3 h-3 mr-0.5" /> Trending
                      </div>
                    ) : (
                      <div className="flex items-center justify-end text-[10px] text-rose-500 font-medium mt-0.5">
                        <ArrowDownRight className="w-3 h-3 mr-0.5" /> Dropping
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full text-xs mt-2">View Full Leaderboard</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lead Funnel */}
        <Card>
          <CardHeader>
            <CardTitle>Lead Conversion Funnel</CardTitle>
            <CardDescription>Overall pipeline health</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={funnelData} layout="vertical" margin={{ top: 20, right: 30, left: 40, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                  <XAxis type="number" axisLine={false} tickLine={false} />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                  <Tooltip cursor={{fill: '#f1f5f9'}} />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {
                      funnelData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))
                    }
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Inventory Absorption */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Inventory Absorption by Typology</CardTitle>
            <CardDescription>Current stock status across all configurations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={inventoryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip cursor={{fill: '#f1f5f9'}} />
                  <Bar dataKey="sold" stackId="a" fill="#94a3b8" name="Sold" radius={[0, 0, 4, 4]} />
                  <Bar dataKey="available" stackId="a" fill="#10b981" name="Available" />
                  <Bar dataKey="hold" stackId="a" fill="#f59e0b" name="On Hold" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Gamification Engine Control */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-rose-500" />
              <CardTitle>Gamification Engine Control</CardTitle>
            </div>
            <CardDescription>Adjust point multipliers to drive broker behavior</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium text-slate-700">Site Visit Multiplier</span>
                  <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none">2.5x Active</Badge>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full w-[60%]" />
                </div>
                <p className="text-xs text-slate-500">Currently driving +45% more weekend visits.</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium text-slate-700">3BHK Sales Bonus</span>
                  <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100 border-none">1.5x Active</Badge>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full w-[40%]" />
                </div>
                <p className="text-xs text-slate-500">Incentivizing slow-moving 3BHK inventory.</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium text-slate-700">Fast Closure (Under 7 Days)</span>
                  <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-none">3.0x Active</Badge>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full w-[80%]" />
                </div>
                <p className="text-xs text-slate-500">Highest multiplier to improve cashflow velocity.</p>
              </div>

              <Button className="w-full mt-4 bg-slate-900 hover:bg-slate-800">Configure New Campaign</Button>
            </div>
          </CardContent>
        </Card>

        {/* Market Sentiment Analysis */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-500" />
              <CardTitle>Market Sentiment Analysis</CardTitle>
            </div>
            <CardDescription>AI-aggregated buyer feedback and macro trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
                <h4 className="text-sm font-semibold text-blue-900 mb-2">Buyer Objections (Top 3)</h4>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li className="flex justify-between"><span>Price too high</span> <span className="font-bold">42%</span></li>
                  <li className="flex justify-between"><span>Waiting for festive offers</span> <span className="font-bold">28%</span></li>
                  <li className="flex justify-between"><span>Prefer ready-to-move</span> <span className="font-bold">15%</span></li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-indigo-50 border border-indigo-100">
                <h4 className="text-sm font-semibold text-indigo-900 mb-2">Micro-Market Trends</h4>
                <ul className="space-y-2 text-sm text-indigo-800">
                  <li className="flex justify-between"><span>Avg. Price (Sector 45)</span> <span className="font-bold">₹12,500/sqft</span></li>
                  <li className="flex justify-between"><span>Rental Yield</span> <span className="font-bold">3.8%</span></li>
                  <li className="flex justify-between"><span>Demand vs Supply</span> <span className="font-bold text-emerald-600">High Demand</span></li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-3 bg-slate-50 border rounded-lg text-sm text-slate-600 flex items-start gap-2">
              <Zap className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <p><strong>AI Insight:</strong> 28% of buyers are holding out for festive offers. Releasing a "Pre-Festive Early Bird" scheme could unlock ₹45Cr in stalled pipeline revenue.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
