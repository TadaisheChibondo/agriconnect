import React from 'react';
import { Users } from 'lucide-react';

const About = () => {
    return (
        <div className="min-h-screen bg-slate-50 p-8 flex items-center justify-center">
            <div className="max-w-2xl w-full bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="bg-slate-900 text-white p-8 text-center">
                    <Users size={48} className="mx-auto mb-4 text-emerald-400"/>
                    <h1 className="text-3xl font-bold">About Us</h1>
                    <p className="text-slate-400">The team behind AgriConnect</p>
                </div>
                <div className="p-8">
                    <p className="text-slate-600 mb-6 text-center">
                        This project was built for our University Module on AI in Business. 
                        Our goal is to solve the supply chain disconnect in Zimbabwe's agricultural sector.
                    </p>
                    
                    <h3 className="font-bold text-lg mb-4 text-slate-800 border-b pb-2">Group Members</h3>
                    <ul className="space-y-3">
                        {/* REPLACE WITH YOUR ACTUAL NAMES */}
                        <li className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">1</span>
                            <span className="font-medium text-slate-700">Tadaishe Chibondo (Lead Developer)</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">2</span>
                            <span className="font-medium text-slate-700">Member Name 2</span>
                        </li>
                         <li className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">3</span>
                            <span className="font-medium text-slate-700">Member Name 3</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default About;