import React from 'react';
import './RDPageStyles.css';

const RDPage = () => {
    return (
        <div className="rd-page-container">
            <header className="rd-header">
                <h2>R&D at HOPT</h2>
                <p>Leading the future with research and development in innovative health solutions.</p>
            </header>
            
            <section className="rd-section">
                <h3>Our Mission</h3>
                <p>
                    Our R&D mission is to develop cutting-edge technologies to improve healthcare and promote wellness. We
                    aim to create innovative solutions that benefit both individuals and communities.
                </p>
            </section>

            <section className="rd-projects">
                <h3>Current Projects</h3>
                <ul>
                    <li><strong>Project Alpha:</strong> Developing AI-driven health monitoring systems.</li>
                    <li><strong>Project Beta:</strong> Researching sustainable materials for medical devices.</li>
                    <li><strong>Project Gamma:</strong> Innovating data-driven wellness programs.</li>
                </ul>
            </section>

            <section className="rd-future">
                <h3>Future Directions</h3>
                <p>
                    We’re continuously exploring new areas to push the boundaries of healthcare technology. Our focus
                    areas include telemedicine, wearable health technology, and personalized medicine.
                </p>
            </section>
        </div>
    );
};

export default RDPage;
