import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ShieldCheck, FileSearch, Camera, HardHat, AlertCircle, CheckCircle, Map } from 'lucide-react';

export default function VerificationLayer() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Verification Layer</h2>
          <p className="text-slate-500">Ground truth, legal compliance, and construction progress.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><FileSearch className="w-4 h-4 mr-2" /> Request Audit</Button>
          <Button><ShieldCheck className="w-4 h-4 mr-2" /> Generate Trust Report</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Legal & Compliance Checklist</CardTitle>
                <CardDescription>Project: The Horizon Residences</CardDescription>
              </div>
              <Badge variant="success" className="bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-100">92% Verified</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start justify-between p-3 border rounded-lg bg-emerald-50/50">
              <div className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">RERA Registration</h4>
                  <p className="text-xs text-slate-500">Verified on 12 Oct 2025. ID: RERA-UP-12345</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-xs h-7">View Doc</Button>
            </div>
            
            <div className="flex items-start justify-between p-3 border rounded-lg bg-emerald-50/50">
              <div className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Title Deed & Encumbrance</h4>
                  <p className="text-xs text-slate-500">Clear title. No pending litigation found.</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-xs h-7">View Doc</Button>
            </div>

            <div className="flex items-start justify-between p-3 border rounded-lg border-amber-200 bg-amber-50">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">Environmental Clearance</h4>
                  <p className="text-xs text-slate-500">Renewal pending. Expected by 25 Nov 2025.</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="text-xs h-7 bg-white">Follow Up</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Construction Progress Proof</CardTitle>
                <CardDescription>Visual ground truth updated weekly</CardDescription>
              </div>
              <HardHat className="w-5 h-5 text-slate-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative h-48 rounded-lg overflow-hidden bg-slate-100 border">
                <img 
                  src="https://picsum.photos/seed/construction/800/400" 
                  alt="Construction Site" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                  <Camera className="w-3 h-3" /> Taken: 2 days ago
                </div>
                <div className="absolute top-2 right-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded font-semibold shadow-sm">
                  Tower B: 8th Floor Slab Cast
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                <div className="p-2 border rounded text-center">
                  <div className="text-xs text-slate-500">Target</div>
                  <div className="font-semibold text-sm">Floor 10</div>
                </div>
                <div className="p-2 border rounded text-center bg-emerald-50">
                  <div className="text-xs text-emerald-600">Actual</div>
                  <div className="font-semibold text-sm text-emerald-700">Floor 8</div>
                </div>
                <div className="p-2 border rounded text-center">
                  <div className="text-xs text-slate-500">Status</div>
                  <div className="font-semibold text-sm text-emerald-600">On Track</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Map className="w-5 h-5 text-indigo-500" />
            <CardTitle>Neighborhood Truth Layer</CardTitle>
          </div>
          <CardDescription>AI-verified catchment and infrastructure claims.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-sm">Metro Connectivity</h4>
                <Badge variant="success" className="text-[10px]">Verified True</Badge>
              </div>
              <p className="text-xs text-slate-600">Builder claim: "5 mins to Metro". Ground truth confirms Sector 45 station is 1.2km away (4 min drive, 12 min walk).</p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-sm">School Proximity</h4>
                <Badge variant="success" className="text-[10px]">Verified True</Badge>
              </div>
              <p className="text-xs text-slate-600">DPS and Heritage schools are within a 3km radius. School bus routes cover the project gate.</p>
            </div>
            <div className="p-4 border rounded-lg bg-amber-50 border-amber-200">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-sm">Park Facing</h4>
                <Badge variant="warning" className="text-[10px] bg-amber-500">Partial Truth</Badge>
              </div>
              <p className="text-xs text-amber-800">Only Tower A units above 5th floor have unobstructed park views. Lower floors face the boundary wall.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
