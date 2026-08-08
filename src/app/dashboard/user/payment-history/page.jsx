'use client';

import React, { useState } from 'react';
import {
  Receipt,
  Download,
  CreditCard,
  ArrowUpRight,
  ArrowDownLeft,
  Filter,
  Calendar,
  CheckCircle,
  Clock,
  RefreshCw,
  Search,
  X,
} from 'lucide-react';

const mockTransactions = [
  {
    id: 'TXN-984210',
    type: 'credits',
    description: 'Purchased 1,500 FP Credits',
    date: 'Aug 07, 2026',
    time: '02:32 PM',
    amount: '+$150.00',
    amountType: 'positive',
    status: 'Completed',
    paymentMethod: 'Visa ending in 4242',
    category: 'Credit Purchase',
  },
  {
    id: 'TXN-887321',
    type: 'contributions',
    description: 'Backed "EcoSmart Hub"',
    date: 'Aug 05, 2026',
    time: '09:15 AM',
    amount: '-$50.00',
    amountType: 'negative',
    status: 'Completed',
    paymentMethod: 'FP Credits Wallet',
    category: 'Pledge Contribution',
  },
  {
    id: 'TXN-761209',
    type: 'refunds',
    description: 'Refund from "CancelledProject"',
    date: 'Jul 29, 2026',
    time: '06:45 PM',
    amount: '+$75.00',
    amountType: 'positive',
    status: 'Refunded',
    paymentMethod: 'Original Payment Method',
    category: 'Refund',
  },
  {
    id: 'TXN-654982',
    type: 'contributions',
    description: 'Backed "Solar Clean Energy Pack"',
    date: 'Jul 22, 2026',
    time: '11:20 AM',
    amount: '-$100.00',
    amountType: 'negative',
    status: 'Completed',
    paymentMethod: 'FP Credits Wallet',
    category: 'Pledge Contribution',
  },
  {
    id: 'TXN-543127',
    type: 'credits',
    description: 'Purchased 5,000 FP Credits',
    date: 'Jul 15, 2026',
    time: '04:05 PM',
    amount: '+$500.00',
    amountType: 'positive',
    status: 'Completed',
    paymentMethod: 'Mastercard ending in 8812',
    category: 'Credit Purchase',
  },
  {
    id: 'TXN-432876',
    type: 'contributions',
    description: 'Backed "Ocean Cleanup Drone"',
    date: 'Jul 10, 2026',
    time: '08:50 AM',
    amount: '-$30.00',
    amountType: 'negative',
    status: 'Pending',
    paymentMethod: 'FP Credits Wallet',
    category: 'Pledge Contribution',
  },
  {
    id: 'TXN-321985',
    type: 'refunds',
    description: 'Refund from "VR Learning Glasses"',
    date: 'Jun 28, 2026',
    time: '01:10 PM',
    amount: '+$25.00',
    amountType: 'positive',
    status: 'Refunded',
    paymentMethod: 'Original Payment Method',
    category: 'Refund',
  },
  {
    id: 'TXN-210453',
    type: 'contributions',
    description: 'Backed "AI Health Monitor Ring"',
    date: 'Jun 14, 2026',
    time: '08:30 PM',
    amount: '-$200.00',
    amountType: 'negative',
    status: 'Completed',
    paymentMethod: 'FP Credits Wallet',
    category: 'Pledge Contribution',
  },
];

export default function PaymentHistoryPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [downloadingId, setDownloadingId] = useState(null);

  // Filter transactions based on active filter and search query
  const filteredTransactions = mockTransactions.filter((tx) => {
    const matchesFilter =
      activeFilter === 'All'
        ? true
        : activeFilter === 'Credits'
        ? tx.type === 'credits'
        : activeFilter === 'Contributions'
        ? tx.type === 'contributions'
        : activeFilter === 'Refunds'
        ? tx.type === 'refunds'
        : true;

    const matchesSearch =
      tx.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.paymentMethod.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // Calculate counts for each filter
  const filterCounts = {
    All: mockTransactions.length,
    Credits: mockTransactions.filter((t) => t.type === 'credits').length,
    Contributions: mockTransactions.filter((t) => t.type === 'contributions').length,
    Refunds: mockTransactions.filter((t) => t.type === 'refunds').length,
  };

  const handleDownloadReceipt = (tx, e) => {
    e.stopPropagation();
    setDownloadingId(tx.id);
    setTimeout(() => {
      setDownloadingId(null);
      setSelectedReceipt(tx);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 lg:p-10 space-y-8">
      {/* ═══════════════════════════════════════════
          HEADER SECTION
      ═══════════════════════════════════════════ */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-500/20 via-indigo-500/20 to-emerald-400/10 border border-emerald-500/30 text-emerald-400 shadow-lg shadow-emerald-500/10">
              <Receipt className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-2">
                Payment History
              </h1>
              <p className="text-sm text-slate-400 mt-0.5">
                View all your transactions and receipts
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              const csvContent =
                'data:text/csv;charset=utf-8,' +
                'ID,Type,Description,Date,Time,Amount,Status\n' +
                mockTransactions
                  .map(
                    (t) =>
                      `"${t.id}","${t.type}","${t.description}","${t.date}","${t.time}","${t.amount}","${t.status}"`
                  )
                  .join('\n');
              const encodedUri = encodeURI(csvContent);
              const link = document.createElement('a');
              link.setAttribute('href', encodedUri);
              link.setAttribute('download', 'FundPulse_Payment_History.csv');
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-all cursor-pointer shadow-sm"
          >
            <Download className="h-4 w-4 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span>Export Statement</span>
          </button>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          SUMMARY STATS ROW (3 Cards)
      ═══════════════════════════════════════════ */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        {/* Card 1: Total Spent */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/50 p-5 md:p-6 backdrop-blur-sm shadow-xl shadow-black/20 group hover:border-slate-700/80 transition-all duration-300">
          <div className="absolute -right-6 -bottom-6 h-24 w-24 rounded-full bg-indigo-500/10 blur-xl group-hover:bg-indigo-500/20 transition-all"></div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
              Total Spent
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <CreditCard className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              $2,340.00
            </span>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
              <span className="text-indigo-400 font-medium">Lifetime</span> backing & purchases
            </p>
          </div>
        </div>

        {/* Card 2: Transactions */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/50 p-5 md:p-6 backdrop-blur-sm shadow-xl shadow-black/20 group hover:border-slate-700/80 transition-all duration-300">
          <div className="absolute -right-6 -bottom-6 h-24 w-24 rounded-full bg-emerald-500/10 blur-xl group-hover:bg-emerald-500/20 transition-all"></div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
              Transactions
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Receipt className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              24
            </span>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
              <span className="text-emerald-400 font-medium">Total activity</span> records
            </p>
          </div>
        </div>

        {/* Card 3: This Month */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/50 p-5 md:p-6 backdrop-blur-sm shadow-xl shadow-black/20 group hover:border-slate-700/80 transition-all duration-300">
          <div className="absolute -right-6 -bottom-6 h-24 w-24 rounded-full bg-purple-500/10 blur-xl group-hover:bg-purple-500/20 transition-all"></div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
              This Month
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <Calendar className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              $180.00
            </span>
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
              <span className="text-purple-400 font-medium">August 2026</span> activity
            </p>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          FILTER ROW & SEARCH BAR
      ═══════════════════════════════════════════ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-800/80 bg-slate-900/50 p-4 backdrop-blur-sm">
        {/* Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mr-1 hidden lg:flex">
            <Filter className="h-3.5 w-3.5" />
            <span>Filter:</span>
          </div>

          {['All', 'Credits', 'Contributions', 'Refunds'].map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-500/20 to-indigo-500/20 border border-emerald-500/40 text-emerald-300 font-semibold shadow-sm shadow-emerald-500/10'
                    : 'bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>{filter}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    isActive
                      ? 'bg-emerald-400/20 text-emerald-300'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {filterCounts[filter]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Quick Search Input */}
        <div className="relative min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs rounded-xl bg-slate-950/80 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          TRANSACTION LIST SECTION
      ═══════════════════════════════════════════ */}
      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/50 backdrop-blur-sm overflow-hidden shadow-xl shadow-black/20">
        <div className="px-6 py-4 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold text-white">Recent Transactions</h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-medium">
              {filteredTransactions.length} items
            </span>
          </div>
          <span className="text-xs text-slate-400 hidden sm:inline">
            Showing transactions for FundPulse account
          </span>
        </div>

        {filteredTransactions.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="mx-auto h-12 w-12 rounded-2xl bg-slate-800/50 flex items-center justify-center text-slate-500">
              <Receipt className="h-6 w-6" />
            </div>
            <p className="text-sm font-medium text-slate-300">No transactions found</p>
            <p className="text-xs text-slate-500">
              Try adjusting your filter or search query.
            </p>
            <button
              onClick={() => {
                setActiveFilter('All');
                setSearchQuery('');
              }}
              className="mt-2 text-xs text-emerald-400 hover:text-emerald-300 font-medium underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="divide-y divide-slate-800/60">
            {filteredTransactions.map((tx) => {
              const isPositive = tx.amountType === 'positive';
              const isDownloading = downloadingId === tx.id;

              // Choose Icon based on type
              const getIcon = () => {
                if (tx.type === 'credits') {
                  return (
                    <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                      <ArrowDownLeft className="h-5 w-5" />
                    </div>
                  );
                } else if (tx.type === 'refunds') {
                  return (
                    <div className="h-10 w-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 shrink-0">
                      <RefreshCw className="h-4 w-4" />
                    </div>
                  );
                } else {
                  return (
                    <div className="h-10 w-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                      <ArrowUpRight className="h-5 w-5" />
                    </div>
                  );
                }
              };

              // Status badge style
              const getStatusBadge = () => {
                if (tx.status === 'Completed') {
                  return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-semibold text-emerald-400">
                      <CheckCircle className="h-3 w-3" />
                      Completed
                    </span>
                  );
                } else if (tx.status === 'Pending') {
                  return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[11px] font-semibold text-amber-400">
                      <Clock className="h-3 w-3 animate-pulse" />
                      Pending
                    </span>
                  );
                } else {
                  return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[11px] font-semibold text-indigo-400">
                      <RefreshCw className="h-3 w-3" />
                      Refunded
                    </span>
                  );
                }
              };

              return (
                <div
                  key={tx.id}
                  onClick={() => setSelectedReceipt(tx)}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 md:px-6 hover:bg-slate-800/40 transition-colors duration-200 cursor-pointer gap-4"
                >
                  {/* Left Column: Icon + Description + Date */}
                  <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                    {getIcon()}

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors truncate">
                          {tx.description}
                        </p>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800 hidden md:inline-block">
                          {tx.id}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5 flex-wrap">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-slate-500" />
                          {tx.date} at {tx.time}
                        </span>
                        <span className="text-slate-600">•</span>
                        <span className="text-slate-400">{tx.paymentMethod}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Amount + Status + Actions */}
                  <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pl-13 sm:pl-0">
                    {/* Status Badge */}
                    <div className="hidden lg:block">{getStatusBadge()}</div>

                    {/* Amount */}
                    <div className="text-left sm:text-right min-w-[90px]">
                      <span
                        className={`text-sm md:text-base font-bold ${
                          isPositive ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                      >
                        {tx.amount}
                      </span>
                      <div className="lg:hidden text-[10px] mt-0.5">{getStatusBadge()}</div>
                    </div>

                    {/* Action Button (Download/Receipt) */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => handleDownloadReceipt(tx, e)}
                        title="Download / View Receipt"
                        disabled={isDownloading}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-950 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/40 hover:bg-slate-900 transition-all cursor-pointer disabled:opacity-50"
                      >
                        {isDownloading ? (
                          <RefreshCw className="h-3.5 w-3.5 animate-spin text-emerald-400" />
                        ) : (
                          <Download className="h-3.5 w-3.5" />
                        )}
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedReceipt(tx);
                        }}
                        title="View Details"
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-950 text-slate-400 hover:text-white hover:border-slate-700 hover:bg-slate-900 transition-all cursor-pointer"
                      >
                        <Receipt className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ═══════════════════════════════════════════
          RECEIPT MODAL DETAIL
      ═══════════════════════════════════════════ */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div
            className="relative w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <Receipt className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Transaction Receipt</h3>
                  <p className="text-xs text-slate-400">FundPulse Official Invoice</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedReceipt(null)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Receipt Summary Card */}
            <div className="rounded-xl border border-slate-800/80 bg-slate-950 p-4 text-center space-y-2">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-medium">
                Total Amount
              </span>
              <p
                className={`text-3xl font-extrabold ${
                  selectedReceipt.amountType === 'positive' ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {selectedReceipt.amount}
              </p>
              <div className="inline-block px-3 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300">
                Ref ID: {selectedReceipt.id}
              </div>
            </div>

            {/* Receipt Details Breakdown */}
            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-800/50 text-slate-400">
                <span>Description</span>
                <span className="font-semibold text-white text-right max-w-[200px] truncate">
                  {selectedReceipt.description}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/50 text-slate-400">
                <span>Category</span>
                <span className="font-medium text-slate-200">{selectedReceipt.category}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/50 text-slate-400">
                <span>Date & Time</span>
                <span className="font-medium text-slate-200">
                  {selectedReceipt.date} • {selectedReceipt.time}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800/50 text-slate-400">
                <span>Payment Method</span>
                <span className="font-medium text-slate-200">{selectedReceipt.paymentMethod}</span>
              </div>
              <div className="flex justify-between py-1.5 text-slate-400">
                <span>Status</span>
                <span className="font-semibold text-emerald-400">{selectedReceipt.status}</span>
              </div>
            </div>

            {/* Receipt Modal Footer Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  const receiptText = `FUNDPULSE TRANSACTION RECEIPT\n----------------------------------\nTransaction ID: ${selectedReceipt.id}\nDescription: ${selectedReceipt.description}\nCategory: ${selectedReceipt.category}\nDate: ${selectedReceipt.date} ${selectedReceipt.time}\nAmount: ${selectedReceipt.amount}\nPayment Method: ${selectedReceipt.paymentMethod}\nStatus: ${selectedReceipt.status}\n----------------------------------\nThank you for using FundPulse!`;
                  const blob = new Blob([receiptText], { type: 'text/plain;charset=utf-8' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `Receipt_${selectedReceipt.id}.txt`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-emerald-500 hover:from-indigo-500 hover:to-emerald-400 text-white text-xs font-semibold shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
              >
                <Download className="h-4 w-4" />
                Download PDF/Text
              </button>

              <button
                onClick={() => setSelectedReceipt(null)}
                className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
