const NotFound = () => {
  return (
    <div className="container" style={{textAlign: 'center', marginTop: '5rem'}}>
      <div className="card" style={{maxWidth: '500px', margin: '0 auto'}}>
        <h1 style={{fontSize: '4rem', color: '#1e3c72', marginBottom: '1rem'}}>
          404
        </h1>
        <h2>Page Not Found</h2>
        <p style={{color: '#666', marginBottom: '2rem'}}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a href="/" className="btn" style={{fontSize: '1.1rem', padding: '15px 30px'}}>
          Go to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
