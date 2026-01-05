import { useState, useEffect } from 'react';

const CounselingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    message: '',
    class10: '',
    class12: '',
    currentClass: '',
    board: '',
    location: '',
    budget: '',
    entranceExam: '',
    stream: '',
    counselingPreference: '',
    parentName: '',
    parentPhone: ''
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  
  // New state for file uploads
  const [documents, setDocuments] = useState([]);
  const [documentErrors, setDocumentErrors] = useState('');

  useEffect(() => {
    document.title = 'Counseling - CareerGuide';
  }, []);

  const API_BASE_URL = 'http://localhost:3000/api'; 

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone must be 10 digits';
    if (!formData.course) newErrors.course = 'Please select a course';
    if (!formData.currentClass) newErrors.currentClass = 'Current class is required';
    if (!formData.parentPhone.trim()) newErrors.parentPhone = 'Parent phone is required';
    else if (!/^\d{10}$/.test(formData.parentPhone)) newErrors.parentPhone = 'Parent phone must be 10 digits';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    const maxSize = 2 * 1024 * 1024; 
    const currentFiles = documents.length;
    
    let newFiles = [];
    let errorMsg = '';

    files.forEach((file) => {
      // Check file type
      if (!allowedTypes.includes(file.type)) {
        errorMsg += `${file.name} - Invalid format. Only PDF, JPG, PNG allowed.\n`;
        return;
      }
      
      // Check file size
      if (file.size > maxSize) {
        errorMsg += `${file.name} - File too large (max 2MB).\n`;
        return;
      }
      
      // Check total limit
      if (currentFiles + newFiles.length >= 8) {
        errorMsg += 'Maximum 8 files allowed.\n';
        return;
      }
      
      newFiles.push(file);
    });

    if (errorMsg) {
      setDocumentErrors(errorMsg);
      return;
    }

    setDocuments(prev => [...prev, ...newFiles]);
    setDocumentErrors('');
    // Clear input
    e.target.value = '';
  };

  const removeDocument = (index) => {
    setDocuments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setApiError('');
    setSuccess(false);

    try {
      const formDataToSend = new FormData();
      
      // Append all form fields
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });
      
      // Append files
      documents.forEach((file, index) => {
        formDataToSend.append(`documents`, file);
      });

      const response = await fetch(`${API_BASE_URL}/counseling`, {
        method: 'POST',
        body: formDataToSend
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSuccess(true);
        // Reset form
        setFormData({
          name: '', email: '', phone: '', course: '', message: '', class10: '', class12: '',
          currentClass: '', board: '', location: '', budget: '', entranceExam: '',
          stream: '', counselingPreference: '', parentName: '', parentPhone: ''
        });
        setErrors({});
        setDocuments([]);
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (error) {
      setApiError(error.message || 'Network error. Please try again.');
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(false), 5000);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear specific error when user types
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      });
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Counseling Request Form</h1>
        
        {success && (
          <div style={{
            background: '#10b981',
            color: 'white',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            Counseling request submitted successfully! We'll contact you within 24 hours.
          </div>
        )}

        {apiError && (
          <div style={{
            background: '#ef4444',
            color: 'white',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
             {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Personal Details */}
          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{borderColor: errors.name ? '#ef4444' : ''}}
            />
            {errors.name && <span style={{color: '#ef4444', fontSize: '0.9rem'}}>{errors.name}</span>}
          </div>

          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{borderColor: errors.email ? '#ef4444' : ''}}
            />
            {errors.email && <span style={{color: '#ef4444', fontSize: '0.9rem'}}>{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Phone *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              style={{borderColor: errors.phone ? '#ef4444' : ''}}
            />
            {errors.phone && <span style={{color: '#ef4444', fontSize: '0.9rem'}}>{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label>Current Class/Grade *</label>
            <select name="currentClass" value={formData.currentClass} onChange={handleChange} style={{borderColor: errors.currentClass ? '#ef4444' : ''}}>
              <option value="">Select Class</option>
              <option value="10th">Class 10th</option>
              <option value="11th">Class 11th</option>
              <option value="12th">Class 12th</option>
              <option value="Graduation">Graduation 1st Year</option>
              <option value="Post-Graduation">Post-Graduation</option>
            </select>
            {errors.currentClass && <span style={{color: '#ef4444', fontSize: '0.9rem'}}>{errors.currentClass}</span>}
          </div>

          {/* Course Selection - Required field */}
          <div className="form-group">
            <label>Interested Course *</label>
            <select name="course" value={formData.course} onChange={handleChange} style={{borderColor: errors.course ? '#ef4444' : ''}}>
              <option value="">Select Course</option>
              <option value="Engineering">Engineering (JEE/NEET)</option>
              <option value="Medical">Medical (NEET)</option>
              <option value="Commerce">Commerce (CA/CS/CMA)</option>
              <option value="Law">Law (CLAT)</option>
              <option value="Design">Design (NID/UCEED)</option>
              <option value="Management">Management (CAT)</option>
              <option value="Other">Other</option>
            </select>
            {errors.course && <span style={{color: '#ef4444', fontSize: '0.9rem'}}>{errors.course}</span>}
          </div>

          <div className="form-group">
            <label>Class 10th %</label>
            <input type="text" name="class10" value={formData.class10} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Class 12th %</label>
            <input type="text" name="class12" value={formData.class12} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Board</label>
            <input type="text" name="board" value={formData.board} onChange={handleChange} />
          </div>

          {/* NEW DOCUMENT UPLOAD SECTION */}
          <div className="form-group">
            <label>Upload Documents (10th, 12th Marksheets - Optional)</label>
            <input
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              style={{borderColor: documentErrors ? '#ef4444' : ''}}
            />
            <small style={{color: '#6b7280', display: 'block', marginTop: '0.5rem'}}>
              Max 8 files | PDF, JPG, PNG only | 2MB per file
            </small>
            {documentErrors && (
              <span style={{color: '#ef4444', fontSize: '0.9rem', display: 'block', marginTop: '0.5rem'}}>
                {documentErrors}
              </span>
            )}
            
            {documents.length > 0 && (
              <div style={{marginTop: '1rem'}}>
                <small style={{color: '#6b7280', fontWeight: 'bold'}}>Selected files ({documents.length}/8):</small>
                <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem'}}>
                  {documents.map((file, index) => (
                    <div
                      key={index}
                      style={{
                        background: '#f3f4f6',
                        padding: '0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        maxWidth: '200px'
                      }}
                    >
                      <span style={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1}}>
                        {file.name}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeDocument(index)}
                        style={{
                          background: '#ef4444',
                          color: 'white',
                          border: 'none',
                          borderRadius: '3px',
                          padding: '0.2rem 0.5rem',
                          fontSize: '0.7rem',
                          cursor: 'pointer'
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Location Preference</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Budget Range</label>
            <select name="budget" value={formData.budget} onChange={handleChange}>
              <option value="">Select Budget</option>
              <option value="Under 5L">Under ₹5 Lakhs</option>
              <option value="5-10L">₹5-10 Lakhs</option>
              <option value="10-20L">₹10-20 Lakhs</option>
              <option value="Above 20L">Above ₹20 Lakhs</option>
            </select>
          </div>

          <div className="form-group">
            <label>Entrance Exam</label>
            <input type="text" name="entranceExam" value={formData.entranceExam} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Stream</label>
            <input type="text" name="stream" value={formData.stream} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Counseling Preference</label>
            <input type="text" name="counselingPreference" value={formData.counselingPreference} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Parent/Guardian Name</label>
            <input type="text" name="parentName" value={formData.parentName} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Parent/Guardian Phone *</label>
            <input
              type="tel"
              name="parentPhone"
              value={formData.parentPhone}
              onChange={handleChange}
              style={{borderColor: errors.parentPhone ? '#ef4444' : ''}}
            />
            {errors.parentPhone && <span style={{color: '#ef4444', fontSize: '0.9rem'}}>{errors.parentPhone}</span>}
          </div>

          <div className="form-group">
            <label>Additional Message (Optional)</label>
            <textarea
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your career goals, concerns, or specific questions..."
            />
          </div>

          <button type="submit" className="btn" disabled={loading} style={{width: '100%', padding: '16px'}}>
            {loading ? (
              <>
                <span className="spinner" style={{display: 'inline-block', width: '20px', height: '20px', marginRight: '10px', borderWidth: '2px'}}></span>
                Submitting to Database...
              </>
            ) : (
              'Submit Counseling Request'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CounselingForm;
