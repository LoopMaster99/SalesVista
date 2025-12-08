import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, X } from 'lucide-react';

export function MultiSelectDropdown({
    label,
    options,
    selectedValues = [],
    onChange,
    className = ""
}) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleToggle = (value) => {
        const newValues = selectedValues.includes(value)
            ? selectedValues.filter(v => v !== value)
            : [...selectedValues, value];
        onChange(newValues);
    };

    const handleSelectAll = () => {
        onChange(options.map(opt => opt.value));
    };

    const handleClearAll = () => {
        onChange([]);
    };

    const getDisplayText = () => {
        if (selectedValues.length === 0) return label;
        if (selectedValues.length === 1) {
            const selected = options.find(opt => opt.value === selectedValues[0]);
            return selected ? selected.label : label;
        }
        return `${selectedValues.length} selected`;
    };

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 text-sm bg-muted/20 border-none rounded-md hover:bg-muted/30 transition-colors"
            >
                <span className={`whitespace-nowrap ${selectedValues.length > 0 ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {getDisplayText()}
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute z-50 mt-1 min-w-[200px] bg-white border border-gray-200 rounded-md shadow-lg max-h-64 overflow-y-auto">
                    {/* Select All / Clear All */}
                    <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100 bg-gray-50">
                        <button
                            type="button"
                            onClick={handleSelectAll}
                            className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Select All
                        </button>
                        <button
                            type="button"
                            onClick={handleClearAll}
                            className="text-xs text-gray-600 hover:text-gray-700 font-medium"
                        >
                            Clear All
                        </button>
                    </div>

                    {/* Options */}
                    <div className="py-1">
                        {options.map((option) => (
                            <label
                                key={option.value}
                                className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedValues.includes(option.value)}
                                    onChange={() => handleToggle(option.value)}
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                            </label>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
