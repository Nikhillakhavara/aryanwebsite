"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit2, Trash2, ChevronLeft, Check, X } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { DEMO_TABLES, type Table } from "@/lib/demo";
import { tablesApi } from "@/lib/api";
import { formatCurrency, getStatusColor, getStatusDotColor } from "@/lib/utils";
import { cn } from "@/lib/utils";

type TableForm = Omit<Table, "_id">;

const DEFAULT_FORM: TableForm = {
  tableNumber: "",
  tableType: "pool",
  status: "available",
  ratePerHour: 150,
  description: "",
};

export default function AdminTablesPage() {
  const [tables, setTables] = useState<Table[]>(DEMO_TABLES);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<TableForm>(DEFAULT_FORM);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.tableNumber.trim()) {
      toast.error("Table number is required");
      return;
    }

    if (editingId) {
      try {
        await tablesApi.update(editingId, form);
        setTables((prev) =>
          prev.map((t) => (t._id === editingId ? { ...t, ...form } : t))
        );
        toast.success("Table updated");
      } catch {
        toast.error("Failed to update table");
      }
    } else {
      const newTable: Table = { ...form, _id: `table-${Date.now()}` };
      try {
        await tablesApi.create(form);
        setTables((prev) => [...prev, newTable]);
        toast.success("Table added");
      } catch {
        setTables((prev) => [...prev, newTable]);
        toast.success("Table added (demo)");
      }
    }

    setShowForm(false);
    setEditingId(null);
    setForm(DEFAULT_FORM);
  };

  const handleEdit = (table: Table) => {
    setEditingId(table._id);
    setForm({
      tableNumber: table.tableNumber,
      tableType: table.tableType,
      status: table.status,
      ratePerHour: table.ratePerHour,
      description: table.description || "",
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await tablesApi.delete(id);
      setTables((prev) => prev.filter((t) => t._id !== id));
      toast.success("Table deleted");
    } catch {
      setTables((prev) => prev.filter((t) => t._id !== id));
      toast.success("Table deleted (demo)");
    }
    setConfirmDelete(null);
  };

  const handleToggleStatus = async (table: Table) => {
    const newStatus = table.status === "available" ? "maintenance" : "available";
    try {
      await tablesApi.toggleStatus(table._id, newStatus);
      setTables((prev) =>
        prev.map((t) => (t._id === table._id ? { ...t, status: newStatus } : t))
      );
      toast.success(`Table ${newStatus === "available" ? "enabled" : "set to maintenance"}`);
    } catch {
      toast.error("Failed to update status");
    }
  };

  const poolTables = tables.filter((t) => t.tableType === "pool");
  const snookerTables = tables.filter((t) => t.tableType === "snooker");

  return (
    <div className="min-h-screen bg-dark-900 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin" className="p-2 rounded-xl glass hover:bg-white/10 transition-colors text-gray-400 hover:text-white">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-black text-white">Tables Management</h1>
            <p className="text-gray-500 text-sm">{tables.length} tables total</p>
          </div>
          <button
            onClick={() => { setShowForm(true); setEditingId(null); setForm(DEFAULT_FORM); }}
            className="ml-auto flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Table
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Available", count: tables.filter((t) => t.status === "available").length, color: "text-brand-500 bg-brand-500/10" },
            { label: "Occupied", count: tables.filter((t) => t.status === "occupied").length, color: "text-red-400 bg-red-400/10" },
            { label: "Maintenance", count: tables.filter((t) => t.status === "maintenance").length, color: "text-gray-400 bg-gray-400/10" },
          ].map((s, i) => (
            <div key={i} className="glass rounded-2xl p-4 text-center">
              <p className={`text-3xl font-black ${s.color.split(" ")[0]}`}>{s.count}</p>
              <p className="text-gray-500 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Pool Tables */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">
            Pool Tables
            <span className="ml-2 text-sm font-normal text-gray-500">({poolTables.length})</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {poolTables.map((table, i) => (
              <TableManagementCard
                key={table._id}
                table={table}
                index={i}
                onEdit={() => handleEdit(table)}
                onDelete={() => setConfirmDelete(table._id)}
                onToggle={() => handleToggleStatus(table)}
              />
            ))}
          </div>
        </div>

        {/* Snooker Tables */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">
            Snooker Tables
            <span className="ml-2 text-sm font-normal text-gray-500">({snookerTables.length})</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {snookerTables.map((table, i) => (
              <TableManagementCard
                key={table._id}
                table={table}
                index={i}
                onEdit={() => handleEdit(table)}
                onDelete={() => setConfirmDelete(table._id)}
                onToggle={() => handleToggleStatus(table)}
              />
            ))}
          </div>
        </div>

        {/* Form modal */}
        <AnimatePresence>
          {showForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-900/80 backdrop-blur-lg">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="glass rounded-3xl p-7 w-full max-w-md border border-white/10"
              >
                <h3 className="text-xl font-black text-white mb-5">
                  {editingId ? "Edit Table" : "Add New Table"}
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400 mb-1.5 block">Table Name/Number *</label>
                    <input
                      required
                      value={form.tableNumber}
                      onChange={(e) => setForm((p) => ({ ...p, tableNumber: e.target.value.toUpperCase() }))}
                      placeholder="e.g. ORION, TABLE-5"
                      className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-400 mb-1.5 block">Type</label>
                    <div className="flex gap-2">
                      {(["pool", "snooker"] as const).map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setForm((p) => ({
                            ...p,
                            tableType: type,
                            ratePerHour: type === "pool" ? 150 : 250,
                          }))}
                          className={cn(
                            "flex-1 py-2.5 rounded-xl text-sm font-medium capitalize transition-all",
                            form.tableType === type
                              ? "bg-brand-500 text-white"
                              : "bg-dark-700 text-gray-400 hover:bg-dark-600"
                          )}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-gray-400 mb-1.5 block">Rate per Hour (₹)</label>
                    <input
                      type="number"
                      min={50}
                      max={1000}
                      value={form.ratePerHour}
                      onChange={(e) => setForm((p) => ({ ...p, ratePerHour: Number(e.target.value) }))}
                      className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-400 mb-1.5 block">Status</label>
                    <select
                      value={form.status}
                      onChange={(e) => setForm((p) => ({ ...p, status: e.target.value as Table["status"] }))}
                      className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors"
                    >
                      <option value="available">Available</option>
                      <option value="occupied">Occupied</option>
                      <option value="reserved">Reserved</option>
                      <option value="maintenance">Maintenance</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm text-gray-400 mb-1.5 block">Description (optional)</label>
                    <input
                      value={form.description}
                      onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                      placeholder="Table description..."
                      className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-500 transition-colors"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => { setShowForm(false); setEditingId(null); setForm(DEFAULT_FORM); }}
                      className="flex-1 py-3 rounded-xl border border-white/10 text-gray-400 hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold transition-all"
                    >
                      <Check className="w-4 h-4" />
                      {editingId ? "Update" : "Add Table"}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Delete confirm */}
        <AnimatePresence>
          {confirmDelete && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-900/80 backdrop-blur-lg">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="glass rounded-2xl p-6 w-full max-w-sm border border-red-500/20"
              >
                <div className="text-center mb-5">
                  <div className="text-4xl mb-3">⚠️</div>
                  <h3 className="text-lg font-bold text-white">Delete Table?</h3>
                  <p className="text-gray-500 text-sm mt-1">This action cannot be undone.</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setConfirmDelete(null)}
                    className="flex-1 py-2.5 rounded-xl border border-white/10 text-gray-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => confirmDelete && handleDelete(confirmDelete)}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function TableManagementCard({
  table,
  index,
  onEdit,
  onDelete,
  onToggle,
}: {
  table: Table;
  index: number;
  onEdit: () => void;
  onDelete: () => void;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="glass rounded-2xl p-5"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-black text-white text-lg">{table.tableNumber}</h3>
        <span className={cn("px-2.5 py-1 rounded-full text-xs font-semibold border flex items-center gap-1", getStatusColor(table.status))}>
          <span className={cn("w-1.5 h-1.5 rounded-full", getStatusDotColor(table.status))} />
          {table.status}
        </span>
      </div>

      <div className="space-y-1 text-sm text-gray-500 mb-4">
        <div className="flex justify-between">
          <span>Type</span>
          <span className="text-gray-300 capitalize">{table.tableType}</span>
        </div>
        <div className="flex justify-between">
          <span>Rate</span>
          <span className="text-gray-300">{formatCurrency(table.ratePerHour)}/hr</span>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onToggle}
          className={cn(
            "flex-1 py-2 rounded-lg text-xs font-medium transition-all",
            table.status === "maintenance"
              ? "bg-brand-500/10 text-brand-500 hover:bg-brand-500/20"
              : "bg-yellow-400/10 text-yellow-400 hover:bg-yellow-400/20"
          )}
        >
          {table.status === "maintenance" ? "Enable" : "Maintenance"}
        </button>
        <button
          onClick={onEdit}
          className="p-2 rounded-lg bg-blue-400/10 text-blue-400 hover:bg-blue-400/20 transition-colors"
        >
          <Edit2 className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={onDelete}
          className="p-2 rounded-lg bg-red-400/10 text-red-400 hover:bg-red-400/20 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}
