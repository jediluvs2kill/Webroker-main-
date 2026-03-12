import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { FileText, CreditCard, CheckCircle2, Clock, Briefcase, ChevronRight, Download } from 'lucide-react';

const transactions = [
  { id: 'TRX-8921', unit: 'A-402', buyer: 'Rahul Sharma', broker: 'Vikram Singh', stage: 'Agreement', amount: '₹1.2Cr', nextMilestone: 'Sign Builder Buyer Agreement', status: 'pending' },
  { id: 'TRX-8922', unit: 'B-1105', buyer: 'Priya Patel', broker: 'Direct', stage: 'Booking', amount: '₹85L', nextMilestone: '10% Booking Amount Clearance', status: 'action_needed' },
  { id: 'TRX-8923', unit: 'C-201', buyer: 'Amit Singh', broker: 'Neha Gupta', stage: 'Handover', amount: '₹2.5Cr', nextMilestone: 'Final Possession Letter', status: 'completed' },
  { id: 'TRX-8924', unit: 'A-904', buyer: 'Karan Malhotra', broker: 'Vikram Singh', stage: 'Negotiation', amount: '₹1.15Cr', nextMilestone: 'Approve 2% Discount Request', status: 'action_needed' },
];

export default function TransactionEngine() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Transaction Engine</h2>
          <p className="text-slate-500">Deal flow, document vault, and milestone tracking.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Download className="w-4 h-4 mr-2" /> Export Pipeline</Button>
          <Button><Briefcase className="w-4 h-4 mr-2" /> New Booking</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Active Deals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-slate-500 mt-1">₹32.4Cr Pipeline</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Pending Signatures</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">8</div>
            <p className="text-xs text-slate-500 mt-1">Action required</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Broker Payouts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹12.5L</div>
            <p className="text-xs text-slate-500 mt-1">Due this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Avg. Time to Close</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">18 Days</div>
            <p className="text-xs text-slate-500 mt-1">-4 days vs last quarter</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Pipeline & Milestones</CardTitle>
          <CardDescription>Track deals from booking to handover.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b">
                <tr>
                  <th className="px-4 py-3 font-medium">Deal ID / Unit</th>
                  <th className="px-4 py-3 font-medium">Buyer & Broker</th>
                  <th className="px-4 py-3 font-medium">Stage</th>
                  <th className="px-4 py-3 font-medium">Next Milestone</th>
                  <th className="px-4 py-3 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((trx) => (
                  <tr key={trx.id} className="border-b hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-4">
                      <div className="font-semibold text-slate-900">{trx.id}</div>
                      <div className="text-xs text-slate-500">Unit: {trx.unit} • {trx.amount}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-medium">{trx.buyer}</div>
                      <div className="text-xs text-slate-500">Broker: {trx.broker}</div>
                    </td>
                    <td className="px-4 py-4">
                      <Badge variant={trx.stage === 'Handover' ? 'success' : trx.stage === 'Negotiation' ? 'warning' : 'secondary'}>
                        {trx.stage}
                      </Badge>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        {trx.status === 'completed' ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        ) : trx.status === 'action_needed' ? (
                          <Clock className="w-4 h-4 text-amber-500" />
                        ) : (
                          <FileText className="w-4 h-4 text-slate-400" />
                        )}
                        <span className={`text-xs ${trx.status === 'action_needed' ? 'font-semibold text-amber-700' : 'text-slate-600'}`}>
                          {trx.nextMilestone}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <Button variant="ghost" size="sm" className="h-8">
                        View <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
