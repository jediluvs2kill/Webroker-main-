import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Store, AlertTriangle, TrendingUp, MapPin, Percent, Zap } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const tenantMixData = [
  { name: 'Apparel & Fashion', value: 35, color: '#6366f1' },
  { name: 'Food & Beverage', value: 25, color: '#10b981' },
  { name: 'Entertainment', value: 15, color: '#f59e0b' },
  { name: 'Electronics', value: 10, color: '#3b82f6' },
  { name: 'Services & Beauty', value: 10, color: '#ec4899' },
  { name: 'Vacant', value: 5, color: '#cbd5e1' },
];

export default function CommercialIntelligence() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Commercial Intelligence</h2>
          <p className="text-slate-500">Project: Nexus Mall • Tenant Mix & Yield Optimization</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><MapPin className="w-4 h-4 mr-2" /> Catchment Map</Button>
          <Button><Zap className="w-4 h-4 mr-2" /> Run Simulator</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Tenant Mix Simulator</CardTitle>
            <CardDescription>Current vs. AI-Optimized allocation for maximum footfall retention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full flex items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={tenantMixData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={110}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {tenantMixData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <CardTitle>Category Saturation</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-amber-50 rounded-lg border border-amber-100">
                <h4 className="text-sm font-semibold text-amber-900">F&B Over-indexing in Zone B</h4>
                <p className="text-xs text-amber-700 mt-1">
                  Coffee shops are cannibalizing each other's footfall. Do not lease Unit B-12 to another cafe.
                </p>
                <div className="mt-2 flex gap-2">
                  <Badge variant="outline" className="text-[10px] bg-white text-amber-700">Reject Cafe Leads</Badge>
                  <Badge variant="outline" className="text-[10px] bg-emerald-50 text-emerald-700 border-emerald-200">Suggest: Electronics</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-500" />
                <CardTitle>Lease Yield Optimization</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2 rounded border border-slate-100 bg-slate-50">
                  <div>
                    <div className="text-sm font-semibold">Unit G-04 (Anchor)</div>
                    <div className="text-xs text-slate-500">Expiring in 4 months</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-emerald-600">+15%</div>
                    <div className="text-[10px] text-slate-500">Proj. Rent Bump</div>
                  </div>
                </div>
                <div className="flex justify-between items-center p-2 rounded border border-slate-100 bg-slate-50">
                  <div>
                    <div className="text-sm font-semibold">Unit F-12 (Vanilla)</div>
                    <div className="text-xs text-slate-500">Currently Vacant</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-indigo-600">Apparel</div>
                    <div className="text-[10px] text-slate-500">Best Catchment Fit</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Adjacency Intelligence</CardTitle>
          <CardDescription>AI recommendations for placing complementary categories next to each other to increase dwell time.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg flex flex-col items-center text-center">
              <div className="flex items-center gap-2 mb-2">
                <Store className="w-5 h-5 text-indigo-500" />
                <span className="text-slate-400 font-bold">+</span>
                <Store className="w-5 h-5 text-emerald-500" />
              </div>
              <h4 className="font-semibold text-sm">Kids Apparel + Toy Store</h4>
              <p className="text-xs text-slate-500 mt-1">Increases cross-spend by 22%. Recommend placing near Family Entertainment Center.</p>
            </div>
            <div className="p-4 border rounded-lg flex flex-col items-center text-center">
              <div className="flex items-center gap-2 mb-2">
                <Store className="w-5 h-5 text-blue-500" />
                <span className="text-slate-400 font-bold">+</span>
                <Store className="w-5 h-5 text-amber-500" />
              </div>
              <h4 className="font-semibold text-sm">Gym + Health Cafe</h4>
              <p className="text-xs text-slate-500 mt-1">High morning footfall synergy. Recommend Zone C placement.</p>
            </div>
            <div className="p-4 border rounded-lg flex flex-col items-center text-center">
              <div className="flex items-center gap-2 mb-2">
                <Store className="w-5 h-5 text-pink-500" />
                <span className="text-slate-400 font-bold">+</span>
                <Store className="w-5 h-5 text-purple-500" />
              </div>
              <h4 className="font-semibold text-sm">Salon + Cosmetics</h4>
              <p className="text-xs text-slate-500 mt-1">Strong appointment-driven footfall spillover. 15% higher lease yield potential.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
