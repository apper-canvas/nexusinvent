import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import Modal from "@/components/molecules/Modal";
import ConfirmDialog from "@/components/molecules/ConfirmDialog";
import ContactTable from "@/components/organisms/ContactTable";
import ContactForm from "@/components/organisms/ContactForm";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import contactService from "@/services/api/contactService";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      setLoading(true);
      setError("");
const data = await contactService.getAll();
      setContacts(data);
    } catch (err) {
      setError(err.message || "Failed to load contacts");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setSelectedContact(null);
    setIsFormOpen(true);
  };

  const handleEdit = (contact) => {
    setSelectedContact(contact);
    setIsFormOpen(true);
  };

  const handleDelete = (contact) => {
    setSelectedContact(contact);
    setIsDeleteOpen(true);
  };

  const handleSubmit = async (formData) => {
    try {
      setIsSubmitting(true);
      if (selectedContact) {
        await contactService.update(selectedContact.Id, formData);
        toast.success("Contact updated successfully!");
      } else {
        await contactService.create(formData);
        toast.success("Contact created successfully!");
      }
      setIsFormOpen(false);
      loadContacts();
    } catch (err) {
      toast.error(err.message || "Failed to save contact");
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    try {
      await contactService.delete(selectedContact.Id);
      toast.success("Contact deleted successfully!");
      setIsDeleteOpen(false);
      loadContacts();
    } catch (err) {
      toast.error(err.message || "Failed to delete contact");
    }
  };

const filteredContacts = contacts.filter(contact => {
    const query = searchQuery.toLowerCase();
    return (
      contact.firstName.toLowerCase().includes(query) ||
      contact.lastName.toLowerCase().includes(query) ||
      contact.email.toLowerCase().includes(query)
    );
  });

  if (loading) return <Loading type="table" />;
  if (error) return <Error message={error} onRetry={loadContacts} />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold gradient-text mb-2">Contacts</h1>
          <p className="text-gray-400">Manage your customer relationships</p>
        </div>
        <Button onClick={handleAdd} className="w-full sm:w-auto">
          <ApperIcon name="UserPlus" size={20} />
          Add Contact
        </Button>
      </div>

<SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search contacts by name or email..."
      />

      {filteredContacts.length === 0 ? (
        searchQuery ? (
          <Empty
            title="No matches found"
            message={`No contacts match "${searchQuery}". Try a different search term.`}
            icon="Search"
          />
        ) : (
          <Empty
            title="No contacts yet"
            message="Start building your network by adding your first contact"
            actionLabel="Add Contact"
            onAction={handleAdd}
            icon="Users"
          />
        )
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-card rounded-2xl p-6"
        >
<ContactTable
            contacts={filteredContacts}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </motion.div>
      )}

      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={selectedContact ? "Edit Contact" : "Add New Contact"}
        size="lg"
      >
        <ContactForm
          contact={selectedContact}
          onSubmit={handleSubmit}
          onCancel={() => setIsFormOpen(false)}
          isSubmitting={isSubmitting}
        />
      </Modal>

      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Contact"
        message={`Are you sure you want to delete ${selectedContact?.firstName} ${selectedContact?.lastName}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
      />
    </div>
  );
};

export default Contacts;