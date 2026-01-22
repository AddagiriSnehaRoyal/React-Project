const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div>
            <h4>Student Career Guidance</h4>
            <p>Your trusted partner for career success and academic excellence.</p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/career-paths">Career Paths</a></li>
              <li><a href="/study-tips">Study Tips</a></li>

              <li><a href="/">Home</a></li>
              <li><a href="/career-paths">Career Paths</a></li>
              <li><a href="/study-tips">Study Tips</a></li>
              <li><a href="/admission-process">Admission Process</a></li>

            </ul>
          </div>
          <div>
            <h4>Contact Info</h4>
            <p> info@careerguide.com</p>
            <p> +91 8639829311</p>
          </div>
        </div>
        <div style={{ textAlign: 'center', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <p>&copy; 2025 CareerGuide. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
