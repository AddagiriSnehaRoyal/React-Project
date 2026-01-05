const Contact = () => {
  return (
    <div className="container">
      <div className="card">
        <h1>Contact Us</h1>
        <p>Have questions? Get in touch with our team.</p>
        
        <div className="grid">
          <div>
            <h3>📧 Email</h3>
            <p>info@careerguide.com</p>
            <p>support@careerguide.com</p>
          </div>
          <div>
            <h3>📱 Phone</h3>
            <p>+91 98765 43210</p>
            <p>+91 87654 32109</p>
          </div>
          <div>
            <h3>📍 Address</h3>
            <p>CareerGuide Tower</p>
            <p>Bengaluru, Karnataka 560001</p>
          </div>
          <div>
            <h3>⏰ Hours</h3>
            <p>Mon - Sat: 9AM - 7PM</p>
            <p>Sunday: 10AM - 4PM</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
