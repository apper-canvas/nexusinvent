import mockContacts from "@/services/mockData/contacts.json";

// Mock delay to simulate API calls
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to generate enrichment data
const generateEnrichmentData = (email) => {
  const domain = email.split('@')[1] || 'example.com';
  const companyName = domain.split('.')[0];
  
  return {
    company: `${companyName.charAt(0).toUpperCase() + companyName.slice(1)} Corp`,
    jobTitle: ['Senior Manager', 'Director', 'Team Lead', 'Specialist'][Math.floor(Math.random() * 4)],
    phone: `+1 (555) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
    linkedin: `https://linkedin.com/in/${email.split('@')[0]}`
  };
};

const contactService = {
  async getAll() {
    await delay(800)
    return mockContacts.map(contact => ({ ...contact }))
  },

  async getById(id) {
    await delay(500)
    const contact = mockContacts.find(c => c.Id === id)
    if (!contact) {
      throw new Error('Contact not found')
    }
    return { ...contact }
  },

  async create(contactData) {
    await delay(1000)
    const newContact = {
      Id: Math.max(...mockContacts.map(c => c.Id)) + 1,
      ...contactData,
      createdAt: new Date().toISOString(),
      lastContacted: new Date().toISOString(),
      avatar: '',
      isEnriched: false
    }
    mockContacts.push(newContact)
    return { ...newContact }
  },

  async update(id, contactData) {
    await delay(800)
    const index = mockContacts.findIndex(c => c.Id === id)
    if (index === -1) {
      throw new Error('Contact not found')
    }
    mockContacts[index] = { ...mockContacts[index], ...contactData }
    return { ...mockContacts[index] }
  },

  async enrich(id) {
    await delay(2000) // Longer delay to simulate enrichment process
    const index = mockContacts.findIndex(c => c.Id === id)
    if (index === -1) {
      throw new Error('Contact not found')
    }
    
    // Simulate enriched data
    const enrichedData = {
      company: `${mockContacts[index].firstName}'s Company Inc.`,
      jobTitle: 'Senior Manager',
      phone: '+1 (555) 123-4567',
      linkedin: `https://linkedin.com/in/${mockContacts[index].firstName.toLowerCase()}-${mockContacts[index].lastName.toLowerCase()}`,
      isEnriched: true
    }
    
    mockContacts[index] = { ...mockContacts[index], ...enrichedData }
    return { ...mockContacts[index] }
  },

async delete(id) {
    await delay(600);
    const index = mockContacts.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Contact not found');
    }
    mockContacts.splice(index, 1);
    return { success: true };
  },

// Track which contacts have been enriched
enrichedContacts: new Set(),

// Helper method to check if contact has been enriched
isEnriched: (contactId) => {
  return contactService.enrichedContacts.has(contactId);
},

// Helper method to check if specific fields are available for display
getVisibleFields: (contact) => {
  const isEnriched = contactService.isEnriched(contact.Id);
  return {
    company: isEnriched && contact.company,
    jobTitle: isEnriched && contact.jobTitle, 
    phone: isEnriched && contact.phone,
    linkedin: isEnriched && contact.linkedin
  };
},

enrichData: async (contactId) => {
    await delay(2000); // Simulate API call delay
    
    const contact = mockContacts.find(c => c.Id === parseInt(contactId));
    if (!contact) {
      throw new Error('Contact not found');
    }

    // 80% success rate, 20% failure
    if (Math.random() < 0.2) {
      throw new Error('No enrichment data found for this contact');
    }

    const enrichmentData = generateEnrichmentData(contact.email);
    const enrichedFields = [];

    // Only enrich fields that are completely empty or null (preserve manually entered data)
    const fieldsToEnrich = {
      company: !contact.company || contact.company.trim() === '',
      jobTitle: !contact.jobTitle || contact.jobTitle.trim() === '',
      phone: !contact.phone || contact.phone.trim() === '',
      linkedin: !contact.linkedin || contact.linkedin.trim() === ''
    };

    const updatedContact = { ...contact };
    
    // Only populate empty fields, preserving any manually entered data
    if (fieldsToEnrich.company) {
      updatedContact.company = enrichmentData.company;
      enrichedFields.push('company');
    }
    if (fieldsToEnrich.jobTitle) {
      updatedContact.jobTitle = enrichmentData.jobTitle;
      enrichedFields.push('jobTitle');
    }
    if (fieldsToEnrich.phone) {
      updatedContact.phone = enrichmentData.phone;
      enrichedFields.push('phone');
    }
    if (fieldsToEnrich.linkedin) {
      updatedContact.linkedin = enrichmentData.linkedin;
      enrichedFields.push('linkedin');
    }

    // Add enrichment metadata
    updatedContact.lastEnriched = new Date().toISOString();
    updatedContact.enrichedFields = enrichedFields;

    // Track that this contact has been enriched
    contactService.enrichedContacts.add(contactId);

    // Update the contact in our mock data
    const index = mockContacts.findIndex(c => c.Id === parseInt(contactId));
    if (index !== -1) {
      mockContacts[index] = updatedContact;
    }

    return {
      contact: updatedContact,
      enrichedFields,
      enrichmentCount: enrichedFields.length
    };
  }
};

export default contactService;