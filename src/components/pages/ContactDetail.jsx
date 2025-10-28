import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Avatar from "@/components/atoms/Avatar";
import Badge from "@/components/atoms/Badge";
import Modal from "@/components/molecules/Modal";
import ConfirmDialog from "@/components/molecules/ConfirmDialog";
import ContactForm from "@/components/organisms/ContactForm";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import contactService from "@/services/api/contactService";

const ContactDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEnriching, setIsEnriching] = useState(false);
  const [recentlyEnrichedFields, setRecentlyEnrichedFields] = useState([]);
  const [isContactEnriched, setIsContactEnriched] = useState(false);
  useEffect(() => {
loadContact();
  }, [id]);

  const loadContact = async () => {
    try {
      setLoading(true);
      setError("");
const data = await contactService.getById(id);
      setContact(data);
      setIsContactEnriched(contactService.isEnriched(parseInt(id)));
    } catch (err) {
      setError(err.message || "Failed to load contact");
    } finally {
      setLoading(false);
    }
  };

const handleEdit = async (formData) => {
    try {
      setIsSubmitting(true);
      await contactService.update(contact.Id, formData);
      toast.success("Contact updated successfully!");
      setIsEditOpen(false);
      loadContact();
    } catch (err) {
      toast.error(err.message || "Failed to update contact");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEnrichData = async () => {
    if (!contact || isEnriching) return;

    try {
      setIsEnriching(true);
      const result = await contactService.enrichData(contact.Id);
      
if (result.enrichmentCount > 0) {
        setContact(result.contact);
        setIsContactEnriched(true);
        setRecentlyEnrichedFields(result.enrichedFields);
        toast.success(`Enriched ${result.enrichmentCount} field(s) successfully!`);
        
        // Clear highlighting after 3 seconds
        setTimeout(() => {
          setRecentlyEnrichedFields([]);
        }, 3000);
      } else {
        toast.info("No new data found to enrich this contact");
      }
    } catch (err) {
      toast.error(err.message || "Failed to enrich contact data");
    } finally {
      setIsEnriching(false);
    }
  };

  const handleDelete = async () => {
    try {
      await contactService.delete(contact.Id);
      toast.success("Contact deleted successfully!");
      navigate("/contacts");
    } catch (err) {
      toast.error(err.message || "Failed to delete contact");
    }
  };

  if (loading) return <Loading type="detail" />;
  if (error) return <Error message={error} onRetry={loadContact} />;
  if (!contact) return <Error message="Contact not found" />;

  const tabs = [
    { id: "overview", label: "Overview", icon: "User" },
    { id: "activity", label: "Activity", icon: "Activity" },
    { id: "deals", label: "Deals", icon: "TrendingUp" },
    { id: "notes", label: "Notes", icon: "FileText" }
  ];

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        onClick={() => navigate("/contacts")}
        className="mb-4"
      >
        <ApperIcon name="ArrowLeft" size={20} />
        Back to Contacts
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-2xl overflow-hidden"
>
        <div className="p-8 border-b border-white/10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <Avatar
                firstName={contact.firstName}
                lastName={contact.lastName}
                size="xl"
              />
              <div>
                <h1 className="text-3xl font-bold gradient-text mb-1">
                  {contact.firstName} {contact.lastName}
                </h1>
{isContactEnriched && contact.jobTitle ? (
                  <p className={`text-xl text-gray-400 mb-2 ${recentlyEnrichedFields.includes('jobTitle') ? 'enriched-field' : ''}`}>
                    {contact.jobTitle}
                    {recentlyEnrichedFields.includes('jobTitle') && (
                      <span className="text-xs text-green-400 ml-2">
                        <ApperIcon name="Sparkles" size={12} className="inline" /> Enriched
                      </span>
                    )}
                  </p>
                ) : (
                  <p className="text-xl text-gray-500 mb-2">
                    Job title available after enrichment
                  </p>
                )}
{isContactEnriched && contact.company ? (
                  <div className={`flex items-center gap-2 text-gray-400 ${recentlyEnrichedFields.includes('company') ? 'enriched-field' : ''}`}>
                    <ApperIcon name="Building2" size={16} />
                    <span>{contact.company}</span>
                    {recentlyEnrichedFields.includes('company') && (
                      <span className="text-xs text-green-400 ml-2">
                        <ApperIcon name="Sparkles" size={12} className="inline" /> Enriched
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-gray-500">
                    <ApperIcon name="Building2" size={16} />
                    <span>Company available after enrichment</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="primary" 
                onClick={handleEnrichData}
                disabled={isEnriching}
              >
                {isEnriching ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Enriching...
                  </>
                ) : (
                  <>
                    <ApperIcon name="Sparkles" size={20} />
                    Enrich Data
                  </>
                )}
              </Button>
              <Button variant="secondary" onClick={() => setIsEditOpen(true)}>
                <ApperIcon name="Edit2" size={20} />
                Edit
              </Button>
              <Button variant="danger" onClick={() => setIsDeleteOpen(true)}>
                <ApperIcon name="Trash2" size={20} />
                Delete
              </Button>
            </div>
<div className="flex gap-3">
              <Button 
                variant="primary" 
                onClick={handleEnrichData}
                disabled={isEnriching}
              >
                {isEnriching ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Enriching...
                  </>
                ) : (
                  <>
                    <ApperIcon name="Sparkles" size={20} />
                    Enrich Data
                  </>
                )}
              </Button>
              <Button variant="secondary" onClick={() => setIsEditOpen(true)}>
                <ApperIcon name="Edit2" size={20} />
                Edit
              </Button>
              <Button variant="danger" onClick={() => setIsDeleteOpen(true)}>
                <ApperIcon name="Trash2" size={20} />
                Delete
              </Button>
            </div>
            
            {/* Enriched Data Section */}
            {contact?.isEnriched && (
              <div className="mt-8 space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <ApperIcon name="Sparkles" size={20} className="text-green-400" />
                  <h3 className="text-lg font-semibold text-white">Enriched Information</h3>
                  <Badge variant="success">Enriched</Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {contact.company && (
                    <div className="enriched-field">
                      <label className="text-sm text-gray-400 mb-2 block">Company</label>
                      <p className="text-white font-medium">{contact.company}</p>
                    </div>
                  )}
                  
                  {contact.jobTitle && (
                    <div className="enriched-field">
                      <label className="text-sm text-gray-400 mb-2 block">Job Title</label>
                      <p className="text-white font-medium">{contact.jobTitle}</p>
                    </div>
                  )}
                  
                  {contact.phone && (
                    <div className="enriched-field">
                      <label className="text-sm text-gray-400 mb-2 block">Phone</label>
                      <p className="text-white font-medium">{contact.phone}</p>
                    </div>
                  )}
                  
                  {contact.linkedin && (
                    <div className="enriched-field">
                      <label className="text-sm text-gray-400 mb-2 block">LinkedIn</label>
                      <a 
                        href={contact.linkedin}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 transition-colors"
                      >
                        {contact.linkedin}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {!contact?.isEnriched && (
              <div className="mt-8 p-6 border border-white/10 rounded-lg bg-white/5">
                <div className="flex items-center gap-2 mb-3">
                  <ApperIcon name="Info" size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-400">Additional information available</span>
                </div>
                <p className="text-sm text-gray-500 mb-4">
                  Click "Enrich Data" to reveal company, job title, phone, and LinkedIn information for this contact.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 border border-white/5 rounded-lg bg-white/5">
                    <label className="text-sm text-gray-500">Company</label>
                    <p className="text-gray-600 text-sm mt-1">Hidden until enriched</p>
                  </div>
                  <div className="p-3 border border-white/5 rounded-lg bg-white/5">
                    <label className="text-sm text-gray-500">Job Title</label>
                    <p className="text-gray-600 text-sm mt-1">Hidden until enriched</p>
                  </div>
                  <div className="p-3 border border-white/5 rounded-lg bg-white/5">
                    <label className="text-sm text-gray-500">Phone</label>
                    <p className="text-gray-600 text-sm mt-1">Hidden until enriched</p>
                  </div>
                  <div className="p-3 border border-white/5 rounded-lg bg-white/5">
                    <label className="text-sm text-gray-500">LinkedIn</label>
                    <p className="text-gray-600 text-sm mt-1">Hidden until enriched</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="border-b border-white/10">
          <div className="flex gap-4 px-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-4 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                <ApperIcon name={tab.icon} size={20} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-8">
          {activeTab === "overview" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
<div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Contact Information</h3>
                    {contact.lastEnriched && (
                      <div className="text-xs text-gray-400 flex items-center gap-1">
                        <ApperIcon name="Sparkles" size={12} />
                        Last enriched: {format(new Date(contact.lastEnriched), "MMM d, yyyy")}
                      </div>
                    )}
                  </div>
<div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-400 mb-1 block">Email</label>
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-white hover:text-primary transition-colors flex items-center gap-2"
                      >
                        <ApperIcon name="Mail" size={16} />
                        {contact.email}
                      </a>
                    </div>

{isContactEnriched && contact.phone ? (
                      <div className={recentlyEnrichedFields.includes('phone') ? 'enriched-field' : ''}>
                        <label className="text-sm text-gray-400 mb-1 block">Phone</label>
                        <a
                          href={`tel:${contact.phone}`}
                          className="text-white hover:text-primary transition-colors flex items-center gap-2"
                        >
                          <ApperIcon name="Phone" size={16} />
                          {contact.phone}
                          {recentlyEnrichedFields.includes('phone') && (
                            <span className="text-xs text-green-400 ml-2">
                              <ApperIcon name="Sparkles" size={12} className="inline" /> Enriched
                            </span>
                          )}
                        </a>
                      </div>
                    ) : (
                      <div className="text-gray-500 text-sm">
                        <ApperIcon name="Phone" size={16} className="inline mr-2" />
                        Phone available after enrichment - click Enrich Data
                      </div>
                    )}

{isContactEnriched && contact.linkedin ? (
                      <div className={recentlyEnrichedFields.includes('linkedin') ? 'enriched-field' : ''}>
                        <label className="text-sm text-gray-400 mb-1 block">LinkedIn</label>
                        <a
                          href={`https://${contact.linkedin}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:text-primary transition-colors flex items-center gap-2"
                        >
                          <ApperIcon name="Linkedin" size={16} />
                          View Profile
                          {recentlyEnrichedFields.includes('linkedin') && (
                            <span className="text-xs text-green-400 ml-2">
                              <ApperIcon name="Sparkles" size={12} className="inline" /> Enriched
                            </span>
                          )}
                        </a>
                      </div>
                    ) : (
                      <div className="text-gray-500 text-sm">
                        <ApperIcon name="Linkedin" size={16} className="inline mr-2" />
                        LinkedIn available after enrichment - click Enrich Data
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white mb-4">Additional Details</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-400 mb-1 block">Last Contacted</label>
                      <div className="text-white flex items-center gap-2">
                        <ApperIcon name="Clock" size={16} />
                        {format(new Date(contact.lastContacted), "MMMM d, yyyy")}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-gray-400 mb-1 block">Created</label>
                      <div className="text-white flex items-center gap-2">
                        <ApperIcon name="Calendar" size={16} />
                        {format(new Date(contact.createdAt), "MMMM d, yyyy")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {contact.tags && contact.tags.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {contact.tags.map((tag, index) => (
                      <Badge key={index}>{tag}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {contact.notes && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Notes</h3>
                  <div className="glass-card rounded-xl p-4">
                    <p className="text-gray-300 whitespace-pre-wrap">{contact.notes}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "activity" && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <ApperIcon name="Activity" size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Activity Timeline</h3>
              <p className="text-gray-400">Activity tracking coming soon</p>
            </div>
          )}

          {activeTab === "deals" && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500/20 to-teal-500/20 flex items-center justify-center">
                <ApperIcon name="TrendingUp" size={32} className="text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Associated Deals</h3>
              <p className="text-gray-400">Deal tracking coming soon</p>
            </div>
          )}

          {activeTab === "notes" && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                <ApperIcon name="FileText" size={32} className="text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Additional Notes</h3>
              <p className="text-gray-400">Enhanced note-taking coming soon</p>
            </div>
          )}
        </div>
      </motion.div>

      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Edit Contact"
        size="lg"
      >
        <ContactForm
          contact={contact}
          onSubmit={handleEdit}
          onCancel={() => setIsEditOpen(false)}
          isSubmitting={isSubmitting}
        />
      </Modal>

      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Delete Contact"
        message={`Are you sure you want to delete ${contact.firstName} ${contact.lastName}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
      />
    </div>
  );
};

export default ContactDetail;