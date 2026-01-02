function AboutPage() {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1>About</h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3rem',
          marginTop: '2rem',
          alignItems: 'start'
        }}>
          {/* Left Column - Text */}
          <div>
            <h2>Author</h2>
            <p>
              Aditya Nirvaan Ranganathan is currently a MBA student at the University of Chicago Booth School of Business. &lt;...&gt;
            </p>
          </div>

          {/* Right Column - Photo */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src="/images/about pic.JPG"
              alt="Aditya Nirvaan Ranganathan"
              style={{
                maxWidth: '100%',
                height: 'auto',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
            />
          </div>
        </div>

        <h2>Background on AI Infra</h2>
      </div>
    </div>
  );
}

export default AboutPage;
