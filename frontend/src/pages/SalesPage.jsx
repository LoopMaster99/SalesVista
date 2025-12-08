import { useState, useEffect } from "react";
import { fetchSales } from "../services/api";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { NativeSelect } from "../components/ui/select-native";
import { MultiSelectDropdown } from "../components/ui/multi-select-dropdown";
import { DateRangePicker } from "../components/ui/date-range-picker";
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from "../components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Search, RotateCcw, Info, Copy } from "lucide-react";

export function SalesPage() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [stats, setStats] = useState({ totalAmount: 0, totalDiscount: 0 });

    // Filters State
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState({
        regions: [],
        genders: [],
        ageRanges: [],
        categories: [],
        tags: [],
        paymentMethods: [],
    });
    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
    const [sort, setSort] = useState({ sortBy: "date", sortOrder: "desc" });

    useEffect(() => {
        // Debounce search
        const timer = setTimeout(() => {
            loadData();
        }, 300);
        return () => clearTimeout(timer);
    }, [search, filters, sort, currentPage, dateRange]);

    const loadData = async () => {
        setLoading(true);
        try {
            // Age ranges are now sent as array to backend

            const params = {
                search,
                regions: filters.regions.length > 0 ? filters.regions : null,
                genders: filters.genders.length > 0 ? filters.genders : null,
                categories: filters.categories.length > 0 ? filters.categories : null,
                paymentMethods: filters.paymentMethods.length > 0 ? filters.paymentMethods : null,
                ageRanges: filters.ageRanges.length > 0 ? filters.ageRanges : null,
                tags: filters.tags.length > 0 ? filters.tags : null,
                startDate: dateRange.startDate || null,
                endDate: dateRange.endDate || null,
                sortBy: sort.sortBy,
                sortOrder: sort.sortOrder,
                page: currentPage,
                limit: 10,
            };

            console.log('API Request Params:', params);
            const result = await fetchSales(params);
            setData(result.data);
            setTotalItems(result.totalItems);
            setTotalPages(result.totalPages);
            setStats({
                totalAmount: result.totalAmount || 0,
                totalDiscount: result.totalDiscount || 0
            });
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
        setCurrentPage(1); // Reset to page 1 on filter change
    };

    const resetFilters = () => {
        setSearch("");
        setFilters({
            regions: [],
            genders: [],
            ageRanges: [],
            categories: [],
            tags: [],
            paymentMethods: [],
        });
        setDateRange({ startDate: '', endDate: '' });
        setCurrentPage(1);
    };

    return (
        <div className="min-h-screen bg-background px-3 py-4 space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h1 className="text-xl font-bold">Sales Management System</h1>
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Name, Phone no."
                        className="pl-9 bg-muted/20"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {/* Filters Row */}
            <div className="flex flex-wrap items-center gap-1">
                <Button variant="ghost" size="icon" onClick={resetFilters} title="Reset">
                    <RotateCcw className="h-4 w-4" />
                </Button>
                <MultiSelectDropdown
                    label="Customer Region"
                    options={[
                        { value: "North", label: "North" },
                        { value: "South", label: "South" },
                        { value: "East", label: "East" },
                        { value: "West", label: "West" },
                        { value: "Central", label: "Central" },
                    ]}
                    selectedValues={filters.regions}
                    onChange={(values) => setFilters(prev => ({ ...prev, regions: values }))}
                />

                <MultiSelectDropdown
                    label="Gender"
                    options={[
                        { value: "Male", label: "Male" },
                        { value: "Female", label: "Female" },
                    ]}
                    selectedValues={filters.genders}
                    onChange={(values) => setFilters(prev => ({ ...prev, genders: values }))}
                />

                <MultiSelectDropdown
                    label="Age Range"
                    options={[
                        { value: "0-18", label: "0-18" },
                        { value: "19-30", label: "19-30" },
                        { value: "31-50", label: "31-50" },
                        { value: "51-100", label: "51+" },
                    ]}
                    selectedValues={filters.ageRanges}
                    onChange={(values) => setFilters(prev => ({ ...prev, ageRanges: values }))}
                />

                <MultiSelectDropdown
                    label="Product Category"
                    options={[
                        { value: "Electronics", label: "Electronics" },
                        { value: "Clothing", label: "Clothing" },
                        { value: "Beauty", label: "Beauty" },
                    ]}
                    selectedValues={filters.categories}
                    onChange={(values) => setFilters(prev => ({ ...prev, categories: values }))}
                />

                <MultiSelectDropdown
                    label="Tags"
                    options={[
                        { value: "organic", label: "Organic" },
                        { value: "skincare", label: "Skincare" },
                        { value: "makeup", label: "Makeup" },
                        { value: "fragrance-free", label: "Fragrance-Free" },
                        { value: "beauty", label: "Beauty" },
                        { value: "casual", label: "Casual" },
                        { value: "fashion", label: "Fashion" },
                        { value: "unisex", label: "Unisex" },
                        { value: "cotton", label: "Cotton" },
                        { value: "portable", label: "Portable" },
                        { value: "accessories", label: "Accessories" },
                        { value: "gadgets", label: "Gadgets" },
                        { value: "smart", label: "Smart" },
                    ]}
                    selectedValues={filters.tags}
                    onChange={(values) => setFilters(prev => ({ ...prev, tags: values }))}
                />

                <MultiSelectDropdown
                    label="Payment Method"
                    options={[
                        { value: "Credit Card", label: "Credit Card" },
                        { value: "Debit Card", label: "Debit Card" },
                        { value: "UPI", label: "UPI" },
                        { value: "Cash", label: "Cash" },
                        { value: "Net Banking", label: "Net Banking" },
                        { value: "Wallet", label: "Wallet" },
                    ]}
                    selectedValues={filters.paymentMethods}
                    onChange={(values) => setFilters(prev => ({ ...prev, paymentMethods: values }))}
                />

                <DateRangePicker
                    startDate={dateRange.startDate}
                    endDate={dateRange.endDate}
                    onChange={(start, end) => setDateRange({ startDate: start, endDate: end })}
                />

                <div className="ml-auto">
                    <NativeSelect
                        value={`${sort.sortBy}-${sort.sortOrder}`}
                        onChange={(e) => {
                            const [sortBy, sortOrder] = e.target.value.split("-");
                            setSort({ sortBy, sortOrder });
                        }}
                        className="w-[200px] bg-muted/20 border-none"
                    >
                        <option value="customerName-asc">Sort by: Name (A-Z)</option>
                        <option value="customerName-desc">Sort by: Name (Z-A)</option>
                        <option value="date-desc">Sort by: Date (Newest)</option>
                        <option value="date-asc">Sort by: Date (Oldest)</option>
                        <option value="quantity-desc">Sort by: Quantity (High-Low)</option>
                    </NativeSelect>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardContent className="p-6 flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
                            Total units sold <Info className="w-4 h-4" />
                        </div>
                        <div className="text-2xl font-bold">{totalItems}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6 flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
                            Total Amount <Info className="w-4 h-4" />
                        </div>
                        <div className="text-2xl font-bold">
                            {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(stats.totalAmount)}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6 flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-muted-foreground text-sm font-medium">
                            Total Discount <Info className="w-4 h-4" />
                        </div>
                        <div className="text-2xl font-bold">
                            {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(stats.totalDiscount)}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Table */}
            <div className="rounded-md border bg-white shadow-sm overflow-x-auto -mt-6">
                <Table>
                    <TableHeader className="bg-muted/30">
                        <TableRow>
                            <TableHead className="whitespace-nowrap">Transaction ID</TableHead>
                            <TableHead className="whitespace-nowrap">Date</TableHead>
                            <TableHead className="whitespace-nowrap">Customer ID</TableHead>
                            <TableHead className="whitespace-nowrap">Customer Name</TableHead>
                            <TableHead className="whitespace-nowrap">Phone Number</TableHead>
                            <TableHead className="whitespace-nowrap">Gender</TableHead>
                            <TableHead className="whitespace-nowrap">Age</TableHead>
                            <TableHead className="whitespace-nowrap">Product Category</TableHead>
                            <TableHead className="whitespace-nowrap">Quantity</TableHead>
                            <TableHead className="whitespace-nowrap">Total Amount</TableHead>
                            <TableHead className="whitespace-nowrap">Customer Region</TableHead>
                            <TableHead className="whitespace-nowrap">Product ID</TableHead>
                            <TableHead className="whitespace-nowrap">Employee Name</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={13} className="h-24 text-center">
                                    Loading...
                                </TableCell>
                            </TableRow>
                        ) : data.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={13} className="h-24 text-center">
                                    No results found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((row) => (
                                <TableRow key={row["Transaction ID"] || Math.random()}>
                                    <TableCell className="font-medium text-muted-foreground">{row["Transaction ID"]}</TableCell>
                                    <TableCell className="whitespace-nowrap">{row["Date"]}</TableCell>
                                    <TableCell className="whitespace-nowrap">{row["Customer ID"]?.replace(/-/g, '')}</TableCell>
                                    <TableCell className="font-medium whitespace-nowrap">{row["Customer Name"]}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2 whitespace-nowrap">
                                            <span>+91 {row["Phone Number"]}</span>
                                            <button
                                                onClick={() => navigator.clipboard.writeText(`+91${row["Phone Number"]}`)}
                                                className="text-muted-foreground hover:text-foreground transition-colors"
                                                title="Copy phone number"
                                            >
                                                <Copy className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </TableCell>
                                    <TableCell>{row["Gender"]}</TableCell>
                                    <TableCell>{row["Age"]}</TableCell>
                                    <TableCell><span className="font-semibold">{row["Product Category"]}</span></TableCell>
                                    <TableCell className="font-bold">{String(row["Quantity"]).padStart(2, '0')}</TableCell>
                                    <TableCell className="font-semibold">
                                        {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(row["Final Amount"])}
                                    </TableCell>
                                    <TableCell>{row["Customer Region"]}</TableCell>
                                    <TableCell className="whitespace-nowrap">{row["Product ID"]?.replace(/-/g, '')}</TableCell>
                                    <TableCell className="whitespace-nowrap">{row["Employee Name"]}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </Button>
                <div className="flex items-center gap-1">
                    {(() => {
                        const windowSize = 5;
                        let startPage = Math.max(1, currentPage - Math.floor(windowSize / 2));
                        let endPage = Math.min(totalPages, startPage + windowSize - 1);

                        if (endPage - startPage + 1 < windowSize) {
                            startPage = Math.max(1, endPage - windowSize + 1);
                        }

                        return Array.from({ length: endPage - startPage + 1 }, (_, i) => {
                            const p = startPage + i;
                            return (
                                <Button
                                    key={p}
                                    variant={currentPage === p ? "default" : "secondary"}
                                    size="sm"
                                    className="w-8 h-8 p-0"
                                    onClick={() => setCurrentPage(p)}
                                >
                                    {p}
                                </Button>
                            );
                        });
                    })()}
                    {totalPages > 5 && currentPage < totalPages - 2 && <span className="text-muted-foreground">...</span>}
                </div>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                >
                    Next
                </Button>
            </div>
        </div>

    );
}
