import { useState, useRef, useEffect } from 'react';
import { Calendar, X } from 'lucide-react';

export function DateRangePicker({ startDate, endDate, onChange, className = "" }) {
    const [isOpen, setIsOpen] = useState(false);
    const [localStartDate, setLocalStartDate] = useState(startDate || '');
    const [localEndDate, setLocalEndDate] = useState(endDate || '');
    const [alignRight, setAlignRight] = useState(false);
    const dropdownRef = useRef(null);
    const buttonRef = useRef(null);

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

    // Calculate dropdown position when opened
    useEffect(() => {
        if (isOpen && buttonRef.current) {
            const buttonRect = buttonRef.current.getBoundingClientRect();
            const dropdownWidth = 320; // w-80 = 320px
            const viewportWidth = window.innerWidth;
            const spaceOnRight = viewportWidth - buttonRect.right;
            const spaceOnLeft = buttonRect.left;

            // If not enough space on right, align to right
            // If not enough space on left, align to left
            if (spaceOnRight < dropdownWidth && spaceOnLeft > spaceOnRight) {
                setAlignRight(true);
            } else {
                setAlignRight(false);
            }
        }
    }, [isOpen]);

    // Update local state when props change
    useEffect(() => {
        setLocalStartDate(startDate || '');
        setLocalEndDate(endDate || '');
    }, [startDate, endDate]);

    const handleApply = () => {
        // Only apply if both dates are selected
        if (localStartDate && localEndDate) {
            onChange(localStartDate, localEndDate);
            setIsOpen(false);
        } else {
            // Show alert if only one date is selected
            alert('Please select both Start Date and End Date');
        }
    };

    const handleClear = () => {
        setLocalStartDate('');
        setLocalEndDate('');
        onChange('', '');
        setIsOpen(false);
    };

    const getDisplayText = () => {
        // Always show "Date Range" when dropdown is closed
        return 'Date Range';
    };

    const isActive = startDate || endDate;

    // Get max date (today) in YYYY-MM-DD format
    const getMaxDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            <button
                ref={buttonRef}
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 text-sm bg-muted/20 border-none rounded-md hover:bg-muted/30 transition-colors"
            >
                <span className={isActive ? 'text-foreground' : 'text-muted-foreground'}>
                    {getDisplayText()}
                </span>
                <Calendar className={`w-4 h-4 transition-colors ${isActive ? 'text-blue-600' : ''}`} />
            </button>

            {isOpen && (
                <div
                    className={`absolute z-50 mt-1 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg p-4 ${alignRight ? 'right-0' : 'left-0'
                        }`}
                >
                    <div className="space-y-4">
                        {/* Start Date */}
                        <div>
                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Start Date
                            </label>
                            <input
                                type="date"
                                value={localStartDate}
                                onChange={(e) => setLocalStartDate(e.target.value)}
                                max={localEndDate || getMaxDate()}
                                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            />
                        </div>

                        {/* End Date */}
                        <div>
                            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                End Date
                            </label>
                            <input
                                type="date"
                                value={localEndDate}
                                onChange={(e) => setLocalEndDate(e.target.value)}
                                min={localStartDate || undefined}
                                max={getMaxDate()}
                                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
                            <button
                                type="button"
                                onClick={handleClear}
                                className="text-xs text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 font-medium"
                            >
                                Clear
                            </button>
                            <button
                                type="button"
                                onClick={handleApply}
                                className="px-4 py-2 text-xs bg-blue-600 dark:bg-blue-500 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 font-medium"
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
