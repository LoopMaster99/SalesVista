import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    Inbox,
    Book,
    FileText,
    ChevronDown,
    ChevronRight,
    PlayCircle,
    Activity,
    XCircle,
    CheckCircle,
    File,
    Menu
} from 'lucide-react';

const Sidebar = ({ isOpen = true, onToggle }) => {
    const [servicesOpen, setServicesOpen] = useState(true);
    const [invoicesOpen, setInvoicesOpen] = useState(true);

    return (
        <div className={`h-screen bg-[#F5F7FA] border-r border-gray-200 flex flex-col font-sans transition-all duration-300 ${isOpen ? 'w-48' : 'w-0 overflow-hidden'
            }`}>
            {/* Header / Profile */}
            <div className="p-4 border-b border-gray-200 flex items-center gap-3">
                <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center overflow-hidden">
                    <img src="/logo.jpg" alt="Vault Logo" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                    <h2 className="text-sm font-bold text-gray-900">Vault</h2>
                    <p className="text-xs text-gray-500">Anurag Yadav</p>
                </div>
                <button
                    onClick={onToggle}
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                    title="Toggle sidebar"
                >
                    <Menu className="w-4 h-4 text-gray-400" />
                </button>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto py-4">
                <nav className="px-2 space-y-1">

                    {/* Top Level Items: Same color as "Invoices" (text-gray-600) */}
                    <NavItem to="#" icon={<LayoutDashboard size={20} />} label="Dashboard" disabled />
                    <NavItem to="#" icon={<Users size={20} />} label="Nexus" disabled />
                    <NavItem to="#" icon={<Inbox size={20} />} label="Intake" disabled />

                    {/* Services Group */}
                    <div className="pt-2">
                        <button
                            onClick={() => setServicesOpen(!servicesOpen)}
                            className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md cursor-default"
                        >
                            <div className="flex items-center gap-3">
                                <Book size={20} />
                                <span>Services</span>
                            </div>
                            {servicesOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        </button>

                        {servicesOpen && (
                            <div className="pl-9 space-y-1 mt-1 cursor-default">
                                {/* Sub Items: Lighter color (text-gray-500) to match "Services" reference */}
                                <SubNavItem to="#" icon={<PlayCircle size={16} />} label="Pre-active" disabled />
                                <SubNavItem to="#" icon={<Activity size={16} />} label="Active" disabled />
                                <SubNavItem to="#" icon={<XCircle size={16} />} label="Blocked" disabled />
                                <SubNavItem to="#" icon={<CheckCircle size={16} />} label="Closed" disabled />
                            </div>
                        )}
                    </div>

                    {/* Invoices Group */}
                    <div className="pt-2">
                        <button
                            onClick={() => setInvoicesOpen(!invoicesOpen)}
                            className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md"
                        >
                            <div className="flex items-center gap-3">
                                <FileText size={20} />
                                <span>Invoices</span>
                            </div>
                            {invoicesOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        </button>

                        {invoicesOpen && (
                            <div className="pl-9 space-y-1 mt-1">
                                {/* Proforma Invoices linked to /sales (Sales Panel) */}
                                <SubNavItem to="/sales" icon={<File size={16} />} label="Proforma Invoices" />

                                <SubNavItem to="#" icon={<FileText size={16} />} label="Final Invoices" disabled />
                            </div>
                        )}
                    </div>

                </nav>
            </div>
        </div>
    );
};

const NavItem = ({ to, icon, label, disabled }) => {
    if (disabled) {
        return (
            <div className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-gray-600 cursor-default">
                {icon}
                <span>{label}</span>
            </div>
        );
    }
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`
            }
        >
            {icon}
            <span>{label}</span>
        </NavLink>
    );
};

const SubNavItem = ({ to, icon, label, disabled }) => {
    if (disabled) {
        return (
            <div className="flex items-center gap-3 px-3 py-2 text-sm rounded-md text-gray-500 cursor-default">
                {icon}
                <span>{label}</span>
            </div>
        );
    }
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors ${isActive
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                }`
            }
        >
            {icon}
            <span>{label}</span>
        </NavLink>
    );
};

export default Sidebar;
