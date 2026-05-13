'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white" style={{
      background: 'linear-gradient(160deg, #fdf8f0 0%, #fef6e8 40%, #fdf4e3 100%)',
      fontFamily: "'Cormorant Garamond', 'Georgia', serif",
    }}>
      {/* Warm grain texture overlay */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

        .about-page-wrap {
          background: linear-gradient(160deg, #fdf8f0 0%, #fef6e8 40%, #fdf4e3 100%);
          position: relative;
        }
        .about-page-wrap::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
          opacity: 0.4;
        }

        .gold-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 2.5rem 0 1.5rem;
        }
        .gold-divider::before,
        .gold-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, #c9a84c, transparent);
        }
        .gold-divider .diamond {
          width: 6px;
          height: 6px;
          background: #c9a84c;
          transform: rotate(45deg);
          flex-shrink: 0;
        }

        .about-h1 {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(2.6rem, 5vw, 4rem);
          font-weight: 300;
          letter-spacing: 0.08em;
          color: #2c1a0e;
          line-height: 1.15;
        }
        .about-h1 em {
          font-style: italic;
          color: #a0722a;
        }

        .about-h2 {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(1.3rem, 2.5vw, 1.75rem);
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #2c1a0e;
        }

        .about-p {
          font-family: 'Jost', sans-serif;
          font-size: 1.05rem;
          font-weight: 300;
          color: #5c3d1e;
          line-height: 1.9;
          letter-spacing: 0.02em;
        }

        .badge-row {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 2.5rem;
        }
        .badge {
          font-family: 'Jost', sans-serif;
          font-size: 0.72rem;
          font-weight: 400;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #a0722a;
          border: 1px solid #d4a84b66;
          padding: 5px 14px;
          border-radius: 2px;
          background: #fff9f0;
        }

        .ornament {
          text-align: center;
          color: #c9a84c;
          font-size: 1.5rem;
          letter-spacing: 0.3em;
          opacity: 0.6;
          margin: 3rem 0 1rem;
          font-family: serif;
        }

        .section-card {
          position: relative;
          padding: 2rem 2.5rem;
          border-left: 2px solid #d4a84b44;
          background: linear-gradient(135deg, #fffdf7 0%, #fdf7ec 100%);
          border-radius: 0 8px 8px 0;
          box-shadow: 4px 4px 24px #c9a84c0d, inset 0 0 0 1px #d4a84b1a;
        }
        .section-card::before {
          content: '';
          position: absolute;
          left: -2px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(180deg, transparent, #c9a84c, transparent);
        }
      `}</style>

      <Header />

      <div className="flex-1 w-full py-16 px-4 md:px-8 about-page-wrap">
        <div style={{ maxWidth: '820px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

          {/* Badge row */}
          <div className="badge-row">
            <span className="badge">Est. in Elegance</span>
            <span className="badge">Handcrafted</span>
            <span className="badge">Premium Materials</span>
          </div>

          {/* Title */}
          <h1 className="about-h1">
            About <em>Skasastudios</em>
          </h1>

          {/* Gold ornament divider */}
          <div className="gold-divider"><div className="diamond"></div></div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            <p className="about-p">
              Welcome to Skasastudios, your premier destination for exquisite jewelry that celebrates elegance, 
              craftsmanship, and timeless beauty. With years of experience in the jewelry industry, we pride 
              ourselves on delivering exceptional pieces that capture life's most precious moments.
            </p>

            {/* Our Mission */}
            <div>
              <div className="gold-divider"><div className="diamond"></div></div>
              <div className="section-card">
                <h2 className="about-h2" style={{ marginBottom: '1rem' }}>Our Mission</h2>
                <p className="about-p">
                  To create stunning, high-quality jewelry that brings joy and confidence to our customers. 
                  Every piece is crafted with meticulous attention to detail and a passion for perfection.
                </p>
              </div>
            </div>

            {/* Our Collections */}
            <div>
              <div className="gold-divider"><div className="diamond"></div></div>
              <div className="section-card">
                <h2 className="about-h2" style={{ marginBottom: '1rem' }}>Our Collections</h2>
                <p className="about-p">
                  From delicate engagement rings to statement necklaces, our diverse collections offer something 
                  for every occasion. Whether you're looking for classic elegance or contemporary designs, 
                  Skasastudios has the perfect piece for you.
                </p>
              </div>
            </div>

            {/* Quality & Craftsmanship */}
            <div>
              <div className="gold-divider"><div className="diamond"></div></div>
              <div className="section-card">
                <h2 className="about-h2" style={{ marginBottom: '1rem' }}>Quality &amp; Craftsmanship</h2>
                <p className="about-p">
                  Each piece in our collection is carefully handpicked and crafted by master artisans who are 
                  dedicated to creating jewelry of the highest quality. We use only premium materials and 
                  traditional techniques combined with modern innovation.
                </p>
              </div>
            </div>

            {/* Customer Service */}
            <div>
              <div className="gold-divider"><div className="diamond"></div></div>
              <div className="section-card">
                <h2 className="about-h2" style={{ marginBottom: '1rem' }}>Customer Service</h2>
                <p className="about-p">
                  Your satisfaction is our priority. We offer excellent customer service, secure shipping, 
                  and a hassle-free return policy. If you have any questions, feel free to reach out to our team.
                </p>
              </div>
            </div>

          </div>

          {/* Closing ornament */}
          <div className="ornament">✦ &nbsp; ✦ &nbsp; ✦</div>

        </div>
      </div>

      <Footer />
    </div>
  );
}