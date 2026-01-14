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
              Aditya Nirvaan Ranganathan is currently an MBA student at the University of Chicago Booth School of Business. He is pursuing concentrations in Economics and Applied Artificial Intelligence, and is conducting independent research at the intersection of energy and AI infrastructure.
            </p>
            <br></br>
            <p>
              <a href="mailto:nirvaan.ranga@chicagobooth.edu" style={{ color: '#ffffff', textDecoration: 'underline' }}>nirvaan.ranga@chicagobooth.edu</a><br />
              <a href="https://www.linkedin.com/in/anranga95/" target="_blank" rel="noopener noreferrer" style={{ color: '#ffffff', textDecoration: 'underline' }}>LinkedIn</a>
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
        <p>Coming soon...</p>
      </div>
    </div>
  );
}

export default AboutPage;
