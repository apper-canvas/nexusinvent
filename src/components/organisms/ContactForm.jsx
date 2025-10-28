import { useState, useEffect } from "react";
import Input from "@/components/atoms/Input";
import Textarea from "@/components/atoms/Textarea";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const ContactForm = ({ contact, onSubmit, onCancel, isSubmitting }) => {
const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    jobTitle: "",
    linkedin: "",
    notes: "",
    tags: []
  });

  // Enrichable fields that should show special placeholders when empty
  const enrichableFields = ['phone', 'company', 'jobTitle', 'linkedin'];

  const [errors, setErrors] = useState({});
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    if (contact) {
setFormData({
        firstName: contact.firstName || "",
        lastName: contact.lastName || "",
        email: contact.email || "",
        phone: contact.phone || "",
        company: contact.company || "",
        jobTitle: contact.jobTitle || "",
        linkedin: contact.linkedin || "",
        notes: contact.notes || "",
        tags: contact.tags || []
      });
    }
  }, [contact]);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="First Name"
          value={formData.firstName}
          onChange={(e) => handleChange("firstName", e.target.value)}
          error={errors.firstName}
          placeholder="John"
          required
        />
        <Input
          label="Last Name"
          value={formData.lastName}
          onChange={(e) => handleChange("lastName", e.target.value)}
          error={errors.lastName}
          placeholder="Doe"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          error={errors.email}
          placeholder="john@example.com"
          required
        />
        <Input
label="Phone"
          type="tel"
          isEnrichable={true}
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          placeholder="+1 (555) 123-4567"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<Input
          label="Company"
          isEnrichable={true}
          value={formData.company}
          onChange={(e) => handleChange("company", e.target.value)}
          placeholder="Acme Corp"
        />
        <Input
label="Job Title"
          value={formData.jobTitle}
          isEnrichable={true}
          onChange={(e) => handleChange("jobTitle", e.target.value)}
          placeholder="Sales Manager"
        />
      </div>

<Input
        label="LinkedIn"
        isEnrichable={true}
        value={formData.linkedin}
        onChange={(e) => handleChange("linkedin", e.target.value)}
        placeholder="linkedin.com/in/johndoe"
      />

      <Textarea
        label="Notes"
        value={formData.notes}
        onChange={(e) => handleChange("notes", e.target.value)}
        placeholder="Additional information about this contact..."
        rows={4}
      />

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">Tags</label>
        <div className="flex gap-2">
          <Input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add tag and press Enter"
            className="flex-1"
          />
          <Button type="button" variant="secondary" onClick={handleAddTag}>
            <ApperIcon name="Plus" size={20} />
          </Button>
        </div>
        {formData.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {formData.tags.map((tag, index) => (
              <Badge key={index} onRemove={() => handleRemoveTag(tag)}>
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 justify-end pt-4 border-t border-white/10">
        <Button type="button" variant="ghost" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <ApperIcon name="Save" size={20} />
              {contact ? "Update Contact" : "Create Contact"}
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;