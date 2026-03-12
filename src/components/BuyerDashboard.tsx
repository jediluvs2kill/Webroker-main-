import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { MessageSquare, Star, ShieldCheck, MapPin, Gift, ChevronRight, Award, TrendingUp, CheckCircle2, UserCheck, Send, Loader2 } from 'lucide-react';
import { GoogleGenAI, Type, FunctionDeclaration } from '@google/genai';
import { io } from 'socket.io-client';

export default function BuyerDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Chat State
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([
    { role: 'model', text: "Welcome to WeBroker! I'm your AI Butler for Delhi NCR. To find the perfect broker for you, could you tell me if you're looking for residential or commercial property, and in which area (e.g., Gurgaon, Noida, South Delhi)?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [matchedBrokers, setMatchedBrokers] = useState<any[] | null>(null);
  const [selectedBroker, setSelectedBroker] = useState<string | null>(null);
  const chatRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<any>(null);

  useEffect(() => {
    // Initialize Socket
    socketRef.current = io();

    fetch('/api/buyer/dashboard')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch buyer data", err);
        setLoading(false);
      });

    // Initialize Gemini Chat
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const recommendBrokersDeclaration: FunctionDeclaration = {
        name: "recommendBrokers",
        description: "Call this when you have gathered enough information (location, budget, propertyType, purpose) to recommend brokers.",
        parameters: {
          type: Type.OBJECT,
          properties: {
            location: { type: Type.STRING, description: "The specific micro-market in Delhi NCR (e.g., Dwarka Expressway, Golf Course Ext, Sector 150 Noida)" },
            budget: { type: Type.STRING, description: "The user's budget" },
            propertyType: { type: Type.STRING, description: "Residential or Commercial" },
            purpose: { type: Type.STRING, description: "Investment or End-use" }
          },
          required: ["location", "budget", "propertyType", "purpose"]
        }
      };

      chatRef.current = ai.chats.create({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: "You are the WeBroker AI Butler, an elite real estate concierge for Delhi NCR (Gurgaon, Noida, Delhi, Faridabad). Your goal is to find the perfect real estate broker for the user, NOT to recommend properties directly. Ask conversational questions to determine: 1. Location (e.g., Golf Course Ext, Dwarka Expressway, Noida Sector 150), 2. Budget, 3. Property Type (Residential/Commercial), 4. Purpose (Investment/End-use), 5. Timeline. Be polite, concise, and professional. Once you have gathered this information, call the `recommendBrokers` tool.",
          tools: [{ functionDeclarations: [recommendBrokersDeclaration] }],
        }
      });
    } catch (err) {
      console.error("Failed to initialize Gemini", err);
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || !chatRef.current) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const response = await chatRef.current.sendMessage({ message: userMsg });
      
      if (response.functionCalls && response.functionCalls.length > 0) {
        const call = response.functionCalls[0];
        if (call.name === 'recommendBrokers') {
          const args = call.args as any;
          
          // Generate tailored brokers based on AI extracted args
          const tailoredBrokers = [
            { id: "BRK-1", name: "Rohan Mehta", specialty: `${args.location || 'Delhi NCR'} Specialist`, dealsClosed: 74, negotiationWin: "5.2%", rating: 4.9, tags: ["Fast Closer", "Off-market Inventory"] },
            { id: "BRK-2", name: "Aisha Khan", specialty: "Luxury & High-Rise", dealsClosed: 42, negotiationWin: "4.1%", rating: 4.8, tags: ["High Client Satisfaction", "Vastu Expert"] },
            { id: "BRK-3", name: "Dev Sharma", specialty: `${args.propertyType || 'Investment'} Deals`, dealsClosed: 112, negotiationWin: "6.5%", rating: 4.7, tags: ["ROI Focused", "Commercial/Resi"] }
          ];
          
          setMatchedBrokers(tailoredBrokers);
          setMessages(prev => [...prev, { role: 'model', text: `Perfect! Based on your requirement for a ${args.propertyType} property in ${args.location} around ${args.budget}, I have analyzed our network. Here are the top 3 brokers most likely to close the right deal for you.` }]);
          
          // Send a tool response back to the model so it knows the function completed
          await chatRef.current.sendMessage({ 
            message: [{
              functionResponse: {
                name: 'recommendBrokers',
                response: { status: 'success', brokersFound: 3 }
              }
            }]
          });
        }
      } else if (response.text) {
        setMessages(prev => [...prev, { role: 'model', text: response.text }]);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "I'm sorry, I encountered an error connecting to my brain. Please try again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSelectBroker = (broker: any) => {
    setSelectedBroker(broker.id);
    if (socketRef.current) {
      socketRef.current.emit("select_broker", {
        brokerId: broker.id,
        brokerName: broker.name,
        buyerName: data.user.name,
        message: `AI Butler matched this buyer based on your expertise in ${broker.specialty}.`,
        timestamp: new Date().toISOString()
      });
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64 text-slate-500">Loading AI Butler...</div>;
  if (!data) return <div className="text-red-500">Failed to load data.</div>;

  const progressPercentage = (data.user.points / 500) * 100;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Your AI Broker Butler</h2>
          <p className="text-slate-500">Don't search properties. Find the right broker.</p>
        </div>
      </div>

      {/* Gamification & Rewards Section */}
      <Card className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white border-none shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-200 to-amber-500 flex items-center justify-center border-4 border-emerald-950 shadow-inner">
                <Award className="w-8 h-8 text-emerald-950" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold">{data.user.tier}</h3>
                  <Badge className="bg-emerald-500/30 text-emerald-100 border-emerald-400/30">Trust Score: High</Badge>
                </div>
                <p className="text-emerald-100 text-sm mt-1">{data.user.points} Trust Points Earned</p>
              </div>
            </div>
            
            <div className="flex-1 w-full max-w-md">
              <div className="flex justify-between text-xs text-emerald-200 mb-2">
                <span>Current Points: {data.user.points}</span>
                <span>Next Reward: {data.user.nextReward}</span>
              </div>
              <div className="h-2 w-full bg-emerald-950 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-amber-300 to-amber-100 rounded-full transition-all duration-1000"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <p className="text-xs text-emerald-300 mt-2 text-right">
                Earn points by reviewing brokers, reporting bad practices, or uploading site feedback.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: AI Butler Chat & Broker Matches */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* AI Butler Chat Interface */}
          <Card className="border-indigo-100 shadow-sm overflow-hidden flex flex-col h-[400px]">
            <div className="bg-indigo-50 p-3 border-b border-indigo-100 flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center shadow-sm">
                <ShieldCheck className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-indigo-900 text-sm">WeBroker AI Butler</h3>
                <p className="text-xs text-indigo-600">Delhi NCR Expert</p>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-indigo-600 text-white rounded-tr-sm' 
                      : 'bg-white border border-slate-200 text-slate-800 rounded-tl-sm shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-sm shadow-sm flex gap-1 items-center h-10">
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="p-3 bg-white border-t border-slate-100 flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                className="flex-1 bg-slate-100 border-transparent focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-full px-4 py-2 text-sm outline-none transition-all"
                disabled={isTyping}
              />
              <Button 
                onClick={handleSend} 
                disabled={!input.trim() || isTyping}
                className="rounded-full w-10 h-10 p-0 bg-indigo-600 hover:bg-indigo-700 shrink-0"
              >
                {isTyping ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </Button>
            </div>
          </Card>

          {/* Broker Matches (Appears after AI gathers info) */}
          {matchedBrokers && (
            <Card className="border-emerald-100 shadow-md animate-in fade-in slide-in-from-bottom-4 duration-500">
              <CardHeader className="bg-emerald-50/50 border-b border-emerald-100 pb-4">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-emerald-600" />
                  <CardTitle>Top Broker Matches</CardTitle>
                </div>
                <CardDescription>Ranked by closure rate, negotiation success, and verified client satisfaction.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                {matchedBrokers.map((broker: any, index: number) => (
                  <div key={broker.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-xl hover:shadow-md transition-all bg-white">
                    <div className="flex items-start gap-4 w-full sm:w-auto">
                      <div className="relative">
                        <div className="w-14 h-14 rounded-full bg-slate-200 overflow-hidden shrink-0 border-2 border-white shadow-sm">
                          <img src={`https://i.pravatar.cc/150?u=${broker.id}`} alt={broker.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-slate-900 text-white rounded-full flex items-center justify-center text-xs font-bold border-2 border-white">
                          #{index + 1}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-900 flex items-center gap-2">
                          {broker.name}
                          <Badge variant="secondary" className="text-[10px] bg-amber-100 text-amber-800 hover:bg-amber-100 border-none">
                            <Star className="w-3 h-3 mr-1 fill-amber-500 text-amber-500" /> {broker.rating}
                          </Badge>
                        </h4>
                        <p className="text-sm text-slate-500 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3" /> {broker.specialty}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {broker.tags.map((tag: string) => (
                            <span key={tag} className="text-[10px] px-2 py-1 bg-slate-100 text-slate-600 rounded-md font-medium">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 sm:mt-0 flex flex-row sm:flex-col justify-between sm:justify-end items-center sm:items-end w-full sm:w-auto gap-4 sm:gap-2 border-t sm:border-t-0 pt-4 sm:pt-0">
                      <div className="flex gap-4 sm:gap-6 text-center sm:text-right">
                        <div>
                          <div className="text-xs text-slate-500">Deals Closed</div>
                          <div className="font-bold text-slate-900">{broker.dealsClosed}</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500">Avg. Neg. Win</div>
                          <div className="font-bold text-emerald-600 flex items-center justify-end">
                            <TrendingUp className="w-3 h-3 mr-1" /> {broker.negotiationWin}
                          </div>
                        </div>
                      </div>
                      <Button 
                        onClick={() => handleSelectBroker(broker)}
                        disabled={selectedBroker === broker.id}
                        className={`w-full sm:w-auto ${selectedBroker === broker.id ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                      >
                        {selectedBroker === broker.id ? <><CheckCircle2 className="w-4 h-4 mr-2" /> Selected</> : 'Select Broker'}
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column: Journey & Trust */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Journey</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                {data.journey.stages.map((stage: string, idx: number) => {
                  // If matchedBrokers is set, we move to stage 1 (Broker Selection)
                  const currentStage = matchedBrokers ? 1 : 0;
                  const isCompleted = idx < currentStage;
                  const isCurrent = idx === currentStage;
                  return (
                    <div key={stage} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10 ${
                        isCompleted ? 'bg-emerald-500 border-emerald-500 text-white' : 
                        isCurrent ? 'bg-indigo-600 border-indigo-600 text-white ring-4 ring-indigo-100' : 
                        'bg-white border-slate-200 text-slate-400'
                      }`}>
                        {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <span className="text-sm font-bold">{idx + 1}</span>}
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-3 rounded-lg border border-slate-100 bg-white shadow-sm">
                        <div className={`font-semibold text-sm ${isCurrent ? 'text-indigo-600' : isCompleted ? 'text-slate-900' : 'text-slate-400'}`}>
                          {stage}
                        </div>
                        {isCurrent && idx === 0 && <div className="text-xs text-slate-500 mt-1">Chat with Butler to find your broker.</div>}
                        {isCurrent && idx === 1 && <div className="text-xs text-slate-500 mt-1">Review matches and select your representative.</div>}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-amber-500" />
                <CardTitle className="text-lg">Recent Rewards Activity</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {data.recentActivity.map((activity: any) => (
                <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg bg-slate-50">
                  <div>
                    <div className="text-sm font-medium text-slate-900">{activity.action}</div>
                    <div className="text-xs text-slate-500">{activity.date}</div>
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none">
                    {activity.points} pts
                  </Badge>
                </div>
              ))}
              <Button variant="outline" className="w-full text-xs mt-2">
                View All Ways to Earn <ChevronRight className="w-3 h-3 ml-1" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
