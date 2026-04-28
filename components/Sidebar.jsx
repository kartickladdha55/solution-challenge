"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  HandHelping, 
  Users, 
  Zap, 
  BarChart3,
  Heart
} from 'lucide-react';

const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Community Needs', href: '/needs', icon: HandHelping },
    { name: 'Volunteers', href: '/volunteers', icon: Users },
    { name: 'Smart Matching', href: '/matching', icon: Zap },
    { name: 'Impact Analytics', href: '/analytics', icon: BarChart3 },
  ];

  return (
    <div className="w-64 bg-[#1c1917] text-white h-screen fixed left-0 top-0 flex flex-col">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-[#e76f51] p-2 rounded-lg">
          <Heart size={24} fill="white" />
        </div>
        <h1 className="text-xl font-bold font-fraunces tracking-tight text-[#e76f51]">
          SmartResource
        </h1>
      </div>
      
      <nav className="flex-1 mt-6">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`flex items-center gap-4 px-6 py-4 transition-colors ${
                isActive 
                  ? 'bg-[#e76f51] text-white' 
                  : 'text-stone-400 hover:text-white hover:bg-stone-800'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium font-dm-sans">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="p-6 border-t border-stone-800">
        <div className="bg-stone-800 rounded-lg p-4">
          <p className="text-xs text-stone-400 uppercase tracking-wider mb-1">Status</p>
          <p className="text-sm font-semibold text-[#2a9d8f]">System Active</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
