import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Avatar from "@/components/atoms/Avatar";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";

const ContactTable = ({ contacts, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const [sortField, setSortField] = useState("lastName");
  const [sortDirection, setSortDirection] = useState("asc");

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedContacts = [...contacts].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];

    if (sortField === "lastContacted") {
      aVal = new Date(aVal);
      bVal = new Date(bVal);
    } else if (typeof aVal === "string") {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }

    if (sortDirection === "asc") {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });

  const SortIcon = ({ field }) => {
    if (sortField !== field) {
      return <ApperIcon name="ArrowUpDown" size={16} className="text-gray-500" />;
    }
    return sortDirection === "asc" 
      ? <ApperIcon name="ArrowUp" size={16} className="text-primary" />
      : <ApperIcon name="ArrowDown" size={16} className="text-primary" />;
  };

  return (
    <div className="space-y-4">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
<thead>
            <tr className="border-b border-white/10">
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort("lastName")}
                  className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
                >
                  Name
                  <SortIcon field="lastName" />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort("email")}
                  className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
                >
                  Email
                  <SortIcon field="email" />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort("createdAt")}
                  className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
                >
                  Created
                  <SortIcon field="createdAt" />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort("lastContacted")}
                  className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
                >
                  Last Contacted
                  <SortIcon field="lastContacted" />
                </button>
              </th>
              <th className="text-left p-4">
                <span className="text-sm font-medium text-gray-400">Enriched</span>
              </th>
              <th className="text-right p-4">
                <span className="text-sm font-medium text-gray-400">Actions</span>
              </th>
            </tr>
          </thead>
<tbody>
{sortedContacts.map((contact, index) => (
              <motion.tr
                key={contact.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => navigate(`/contacts/${contact.Id}`)}
                className="border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors group"
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar firstName={contact.firstName} lastName={contact.lastName} size="sm" />
                    <span className="font-medium text-white group-hover:text-primary transition-colors">
                      {contact.firstName} {contact.lastName}
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-gray-400">{contact.email}</span>
                </td>
                <td className="p-4">
                  <span className="text-gray-400 text-sm">
                    {format(new Date(contact.createdAt), 'MMM d, yyyy')}
                  </span>
                </td>
                <td className="p-4">
                  <span className="text-gray-400 text-sm">
                    {format(new Date(contact.lastContacted), "MMM d, yyyy")}
                  </span>
                </td>
                <td className="p-4">
                  {contact.isEnriched ? (
                    <Badge variant="success">
                      <ApperIcon name="Sparkles" size={12} />
                      Enriched
                    </Badge>
                  ) : (
                    <Badge variant="secondary">
                      <ApperIcon name="Circle" size={12} />
                      Basic
                    </Badge>
                  )}
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(contact)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ApperIcon name="Edit2" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(contact)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-300"
                    >
                      <ApperIcon name="Trash2" size={16} />
                    </Button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {sortedContacts.map((contact, index) => (
          <motion.div
            key={contact.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => navigate(`/contacts/${contact.Id}`)}
            className="glass-card rounded-xl p-4 space-y-3 hover:border-primary/40 transition-colors cursor-pointer"
          >
            <div className="flex items-start justify-between">
<div className="flex items-center gap-3 flex-1 min-w-0">
                <Avatar firstName={contact.firstName} lastName={contact.lastName} size="md" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white truncate">
                    {contact.firstName} {contact.lastName}
                  </h3>
                  <p className="text-sm text-gray-400 truncate">{contact.email}</p>
                </div>
              </div>
              <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => onEdit(contact)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <ApperIcon name="Edit2" size={16} className="text-gray-400" />
                </button>
                <button
                  onClick={() => onDelete(contact)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <ApperIcon name="Trash2" size={16} className="text-red-400" />
                </button>
              </div>
            </div>
            <div className="space-y-2">
<div className="flex items-center gap-2 text-sm">
                <ApperIcon name="Calendar" size={14} className="text-gray-500" />
                <span className="text-gray-400">{format(new Date(contact.createdAt), 'MMM d, yyyy')}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <ApperIcon name="Clock" size={14} className="text-gray-500" />
                <span className="text-gray-400">
                  {format(new Date(contact.lastContacted), "MMM d, yyyy")}
                </span>
              </div>
            </div>
            {contact.tags && contact.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {contact.tags.slice(0, 3).map((tag, i) => (
                  <Badge key={i} variant="default" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ContactTable;