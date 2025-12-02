import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import logo from "./assets/logo.png";
import appStoreBadge from "./assets/applelogo.png";
import playstoreBadge from "./assets/playstorelogo.png";
import founderPhoto1 from "./assets/1st image.png";
import founderPhoto2 from "./assets/2nd image.png";
import screenshot1 from "./assets/screenshot1.png";
import screenshot2 from "./assets/screenshot2.png";
import screenshot3 from "./assets/screenshot3.png";
import screenshot4 from "./assets/screenshot4.png";
import screenshot5 from "./assets/screenshot5.png";
import screenshot6 from "./assets/screenshot6.png";
import screenshot7 from "./assets/screenshot7.png";

function App() {
  const [menuActive, setMenuActive] = useState(false);
  const [photoToggle, setPhotoToggle] = useState(false);
  const [currentScreenshotIndex, setCurrentScreenshotIndex] = useState(0);
  const [previousScreenshotIndex, setPreviousScreenshotIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideDirection, setSlideDirection] = useState('right');
  const [visibleScreenshots, setVisibleScreenshots] = useState(5);
  const screenshotsRef = useRef(null);

  // Detect screen size and set number of visible screenshots
  useEffect(() => {
    const updateVisibleScreenshots = () => {
      const width = window.innerWidth;
      if (width <= 600) {
        setVisibleScreenshots(1); // Show 1 on mobile
      } else if (width <= 768) {
        setVisibleScreenshots(2); // Show 2 on small tablet
      } else if (width <= 1024) {
        setVisibleScreenshots(3); // Show 3 on tablet
      } else if (width <= 1200) {
        setVisibleScreenshots(4); // Show 4 on small desktop
      } else {
        setVisibleScreenshots(5); // Show 5 on desktop
      }
    };

    updateVisibleScreenshots();
    window.addEventListener('resize', updateVisibleScreenshots);
    return () => window.removeEventListener('resize', updateVisibleScreenshots);
  }, []);

  // Intersection Observer for fade-in animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Smooth scroll handler
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    setMenuActive(false);
  };

  // Photo toggle handler
  const handlePhotoToggle = () => {
    setPhotoToggle(!photoToggle);
  };

  // Screenshot scroll handlers - Updated for responsive display
  const scrollScreenshots = (direction) => {
    if (isTransitioning) return; // Prevent multiple clicks during transition

    const totalScreenshots = 7;
    const maxIndex = totalScreenshots - visibleScreenshots;

    setPreviousScreenshotIndex(currentScreenshotIndex);
    setIsTransitioning(true);
    setSlideDirection(direction);

    if (direction === 'left') {
      // Move back by 1
      setCurrentScreenshotIndex(prev => Math.max(0, prev - 1));
    } else {
      // Move forward by 1
      setCurrentScreenshotIndex(prev => Math.min(maxIndex, prev + 1));
    }

    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.nav-content')) {
        setMenuActive(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const screenshots = [
    { src: screenshot1, alt: "Gamified Approach", label: "Gamified Approach" },
    { src: screenshot2, alt: "Dine Out / Cook In", label: "Dine Out / Cook In" },
    { src: screenshot3, alt: "Nearby Restaurants", label: "Nearby Restaurants" },
    { src: screenshot4, alt: "Live Calorie Guidance", label: "Live Calorie Guidance" },
    { src: screenshot5, alt: "Instant Calorie Info", label: "Instant Calorie Info" },
    { src: screenshot6, alt: "AI Recipe Generator", label: "AI Recipe Generator" },
    { src: screenshot7, alt: "Snap Calories", label: "Snap Calories" }
  ];

  // Calculate max index based on current visible screenshots
  const maxIndex = screenshots.length - visibleScreenshots;

  return (
    <div className="App">
      <a href="#main-content" className="skip-link">Skip to main content</a>

      {/* Navigation */}
      <nav className="nav" role="navigation" aria-label="Main navigation">
        <div className="container">
          <div className="nav-content">
            <a href="#" className="logo" aria-label="hungrX Home">
              <img src={logo} alt="hungrX logo" className="logo-icon" />
              <span className="logo-text">hungrX</span>
            </a>
            <ul className={`nav-menu ${menuActive ? 'active' : ''}`}>
              <li><a href="#features" className="nav-link" onClick={(e) => handleSmoothScroll(e, '#features')}>Features</a></li>
              <li><a href="blog.html" className="nav-link">Blog</a></li>
              <li><a href="#download" className="nav-link" onClick={(e) => handleSmoothScroll(e, '#download')}>Download</a></li>
              <li><a href="#introduction" className="nav-link" onClick={(e) => handleSmoothScroll(e, '#introduction')}>Mission</a></li>
              <li><a href="#contact" className="nav-link" onClick={(e) => handleSmoothScroll(e, '#contact')}>Support</a></li>
            </ul>
            <button
              className={`menu-toggle ${menuActive ? 'active' : ''}`}
              aria-label="Toggle menu"
              onClick={() => setMenuActive(!menuActive)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      <main id="main-content">
        {/* Hero Section */}
     <section className="hero" aria-labelledby="hero-title">
  <div className="container">
    <div className="hero-content">
      <span className="hero-badge">Revolutionary Nutrition App</span>

      <h1 id="hero-title" className="text-massive hero-title">
        <span className="hero-title-line">EAT</span>
        <span className="hero-title-line">ANYWHERE.</span>
        <span className="hero-title-line hero-title-nowrap">
          <span className="accent">LOSE WEIGHT</span>
        </span>
        <span className="hero-title-line">EVERYWHERE.</span>
      </h1>

      <p className="text-body hero-subtitle">
        Location-based nutrition app that turns restaurants into your personal weight loss ally. Never guess what to eat again.
      </p>

      <a href="#download" className="btn btn-primary" onClick={(e) => handleSmoothScroll(e, '#download')}>Download Free Now</a>
    </div>
  </div>
</section>
        {/* Scrolling Text */}
        <div className="scrolling-text" aria-hidden="true">
          <div className="scrolling-content">
            <span className="scrolling-item">Stop Guessing What To Eat</span>
            <span className="scrolling-item">Location-Based Nutrition</span>
            <span className="scrolling-item">Smart Meal Recommendations</span>
            <span className="scrolling-item">Effortless Weight Loss</span>
            <span className="scrolling-item">Never Diet Again</span>
            <span className="scrolling-item">Stop Guessing What To Eat</span>
            <span className="scrolling-item">Location-Based Nutrition</span>
            <span className="scrolling-item">Smart Meal Recommendations</span>
            <span className="scrolling-item">Effortless Weight Loss</span>
            <span className="scrolling-item">Never Diet Again</span>
          </div>
        </div>

        {/* Problem Section */}
        <section className="problem-section section" id="problem">
          <div className="container">
            <h2 className="text-huge fade-in">The Daily<br />Food Nightmare</h2>

            <div className="problem-grid">
              <article className="problem-card fade-in">
                <h3 className="problem-title">"What Can I Even Eat Here?"</h3>
                <p className="problem-text">Standing in restaurants, scanning menus like a detective, trying to guess which meal won't sabotage your progress. The mental exhaustion is real.</p>
              </article>

              <article className="problem-card fade-in">
                <h3 className="problem-title">"Another Useless Diet App?"</h3>
                <p className="problem-text">Download app after app, only to find they're either too complicated, missing restaurant data, or make you feel like a mathematician every meal.</p>
              </article>

              <article className="problem-card fade-in">
                <h3 className="problem-title">"I Was Doing So Well..."</h3>
                <p className="problem-text">Start strong, see some progress, then life happens. One bad meal choice spirals into giving up completely. The cycle repeats endlessly.</p>
              </article>
            </div>
          </div>
        </section>

        {/* Try It Free Section */}
        <section className="try-free-section section" id="try-free" aria-labelledby="try-free-title">
          <div className="container">
            <div className="try-free-content fade-in">
              <div className="try-free-header">
                <h2 id="try-free-title" className="text-huge">
                  Experience hungrX<br />
                  Try for free
                </h2>
                <p className="text-body try-free-subtitle">
                  See how hungrX transforms the way you eat. No credit card required. Start your journey to effortless weight loss today.
                </p>

                <a href="#download" className="btn btn-accent btn-large" onClick={(e) => handleSmoothScroll(e, '#download')}>Start Free Trial</a>
                <div className="trust-badges">
                  <span className="trust-item">✓ Free 7-day trial</span>
                  <span className="trust-item">✓ No credit card</span>
                  <span className="trust-item">✓ +7 days free per 4 referrals</span>
                </div>
              </div>

              {/* Screenshot Carousel with Navigation */}
              <div className="screenshots-carousel-wrapper">
                <button
                  className="carousel-arrow carousel-arrow-left"
                  onClick={() => scrollScreenshots('left')}
                  aria-label="Scroll screenshots left"
                  disabled={currentScreenshotIndex === 0}
                  style={{ opacity: currentScreenshotIndex === 0 ? 0.3 : 1, cursor: currentScreenshotIndex === 0 ? 'not-allowed' : 'pointer' }}
                >
                  ‹
                </button>

                <div className="app-screenshots-container">
                  {/* Previous screenshots - sliding out */}
                  {isTransitioning && (
                    <div className={`app-screenshots app-screenshots-old slide-out-${slideDirection}`}>
                      {screenshots.slice(previousScreenshotIndex, previousScreenshotIndex + visibleScreenshots).map((screenshot, index) => (
                        <div
                          className="screenshot-card"
                          key={`old-screenshot-${previousScreenshotIndex}-${index}`}
                        >
                          <div className="screenshot-frame">
                            <img src={screenshot.src} alt={screenshot.alt} className="screenshot-image" />
                          </div>
                          <p className="screenshot-label">{screenshot.label}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Current screenshots - sliding in */}
                  <div className={`app-screenshots ${isTransitioning ? `slide-in-${slideDirection}` : ''}`} ref={screenshotsRef}>
                    {screenshots.slice(currentScreenshotIndex, currentScreenshotIndex + visibleScreenshots).map((screenshot, index) => (
                      <div
                        className="screenshot-card"
                        key={`screenshot-${currentScreenshotIndex}-${index}`}
                      >
                        <div className="screenshot-frame">
                          <img src={screenshot.src} alt={screenshot.alt} className="screenshot-image" />
                        </div>
                        <p className="screenshot-label">{screenshot.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  className="carousel-arrow carousel-arrow-right"
                  onClick={() => scrollScreenshots('right')}
                  aria-label="Scroll screenshots right"
                  disabled={currentScreenshotIndex >= maxIndex}
                  style={{ opacity: currentScreenshotIndex >= maxIndex ? 0.3 : 1, cursor: currentScreenshotIndex >= maxIndex ? 'not-allowed' : 'pointer' }}
                >
                  ›
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section section" id="features" aria-labelledby="features-title">
          <div className="container">
            <div className="features-intro fade-in">
              <h2 id="features-title" className="text-huge">How hungrX<br />Solves Everything</h2>
              <p className="text-body">Revolutionary features that make weight loss inevitable, no matter where you eat.</p>
            </div>

            <div className="features-grid">
              <article className="feature-card fade-in">
                <div className="feature-number">01</div>
                <h3 className="feature-title">Smart Menu Discovery</h3>
                <p className="feature-text">Discover nearby restaurant menus that perfectly fit your calorie budget. Your location becomes your personal nutrition compass, showing only meals that align with your goals.</p>
              </article>

              <article className="feature-card fade-in">
                <div className="feature-number">02</div>
                <h3 className="feature-title">Instant Food Recognition</h3>
                <p className="feature-text">Simply snap any food and instantly get complete nutrition information. Revolutionary visual AI transforms your camera into a nutrition expert that knows every dish.</p>
              </article>

              <article className="feature-card fade-in">
                <div className="feature-number">03</div>
                <h3 className="feature-title">AI Kitchen Assistant</h3>
                <p className="feature-text">Your personal AI chef creates custom recipes from ingredients in your kitchen, perfectly calibrated to your calorie goals. Cooking made smart, simple, and goal-focused.</p>
              </article>

              <article className="feature-card fade-in">
                <div className="feature-number">04</div>
                <h3 className="feature-title">Progress Tracking Hub</h3>
                <p className="feature-text">Monitor your journey with intelligent insights and milestone celebrations. Every meal becomes a step forward in your transformation story.</p>
              </article>
            </div>
          </div>
        </section>

        {/* Introduction & Vision Section */}
        <section className="introduction-section section" id="introduction" aria-labelledby="introduction-title">
          <div className="container">
            <div className="introduction-content fade-in">
              <h2 id="introduction-title" className="text-huge introduction-title">INTRODUCTION<br />& VISION</h2>
              <div className="vision-divider"></div>
              <p className="text-body introduction-text">
                Indulge in flavor, not guilt. At hungrX, we believe in a world where food is freedom—not a restriction. Imagine savoring every bite, from your favorite comfort foods to adventurous new flavors, while staying in sync with your wellness goals. No compromises, no second-guessing. hungrX is crafted for food lovers who refuse to settle, who see food as an experience to be enjoyed, not avoided. Join us and unlock a lifestyle that embraces balance, satisfaction, and total freedom—because you deserve a life full of flavor without holding back. Your cravings, perfectly balanced.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="story-section section" aria-labelledby="story-title">
          <div className="container">
            <div className="story-content fade-in">
              <h2 id="story-title" className="story-title">Our Story</h2>

              <div className="story-text">
                <p className="story-paragraph">
                  At the heart of hungrX is a story of real transformation. Our founder's journey began at <span className="story-highlight">96 kg</span>, navigating diets, endless advice, and the frustration of mixed results. But one truth became clear: <span className="story-highlight">a calorie deficit is the path to lasting change.</span>
                </p>

                <p className="story-paragraph">
                  hungrX was created to simplify this journey for you. With geo-targeted food suggestions tailored to your daily calorie needs, we make each meal an empowering step toward your goals.
                </p>

                <p className="story-paragraph">
                  This is your moment to reclaim the life you deserve. Join hungrX, and let's walk this path together—one meal, one victory at a time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Founder Message Section */}
        <section className="founder-section section" aria-labelledby="founder-title">
          <div className="container">
            <div className="founder-content fade-in">
              <div className="founder-message">
                <h2 id="founder-title" className="founder-title-heading">Built by someone<br />who lived it</h2>

                <blockquote className="founder-quote">
                  As a Doctor of Medicine who's been through my own transformation, I created hungrX to make balanced eating easier. It blends practical knowledge with personal experience, helping you reach your goals without sacrificing the joy of food.
                </blockquote>

                <div className="founder-signature">
                  <div className="founder-name">Febbin Chacko</div>
                  <div className="founder-title-text">Founder of hungrX</div>
                </div>
              </div>

              <div className="transformation-showcase">
                <div className="photo-container" id="photo-container" onClick={handlePhotoToggle}>
                  <div className="photo-wrapper">
                    <img
                      src={photoToggle ? founderPhoto2 : founderPhoto1}
                      alt="Founder of hungrX - Febbin Chacko"
                      className="founder-photo"
                    />
                  </div>

                  {/* Weight overlay on photo */}
                  <div className="photo-weight-overlay">
                    <div className="photo-weight-display" id="weight-display">
                      <span className="photo-weight-label" id="weight-label">
                        {photoToggle ? 'BEFORE' : 'NOW'}
                      </span>
                      <div className="photo-weight-value">
                        <span className="photo-weight-number" id="weight-number">
                          {photoToggle ? '96' : '75'}
                        </span>
                        <span className="photo-weight-unit">kg</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="transformation-display">
                  <div
                    className={`slide-to-unlock ${photoToggle ? 'toggled' : ''}`}
                    id="slide-container"
                    onClick={handlePhotoToggle}
                  >
                    <input
                      type="checkbox"
                      id="photo-toggle"
                      className="switch-input"
                      aria-label="Toggle transformation photo"
                      checked={photoToggle}
                      onChange={handlePhotoToggle}
                    />
                    <div className="slide-track">
                      <span className="slide-text">slide to compare</span>
                    </div>
                    <div className="slide-button" id="slide-button"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Transformation Timeline */}
        <section className="transformation-section section" aria-labelledby="transformation-title">
          <div className="container">
            <div className="transformation-intro fade-in">
              <h2 id="transformation-title" className="text-huge">The hungrX<br />Transformation Effect</h2>
              <p className="text-body">See what happens when you finally have the right tool.</p>
            </div>

            <div className="transformation-grid">
              <article className="transformation-card fade-in">
                <div className="transformation-period">Week 1</div>
                <div className="transformation-weight">-3.2 lbs</div>
                <p className="transformation-quote">"I can't believe how easy this is!"</p>
              </article>

              <article className="transformation-card fade-in">
                <div className="transformation-period">Month 1</div>
                <div className="transformation-weight">-12.8 lbs</div>
                <p className="transformation-quote">"Friends asking what I'm doing differently"</p>
              </article>

              <article className="transformation-card fade-in">
                <div className="transformation-period">Month 3</div>
                <div className="transformation-weight">-28.5 lbs</div>
                <p className="transformation-quote">"Never felt more confident"</p>
              </article>

              <article className="transformation-card fade-in">
                <div className="transformation-period">Month 6</div>
                <div className="transformation-weight">-45+ lbs</div>
                <p className="transformation-quote">"hungrX changed everything"</p>
              </article>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="cta-section section" id="download" aria-labelledby="cta-title">
          <div className="container">
            <h2 id="cta-title" className="text-huge cta-title fade-in">
              Your New Life<br />Starts Right Now
            </h2>

            <p className="text-body cta-text fade-in">
              Discover the secret to effortless weight loss. Download hungrX and never struggle with food decisions again.
            </p>

            <div className="cta-buttons fade-in">
              <a
                href="https://apps.apple.com/in/app/hungrx/id6741845887"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-accent"
                aria-label="Download hungrX from the App Store"
              >
                Download hungrX Free
              </a>
            </div>

            <div className="app-store-grid fade-in">
              <a
                href="https://apps.apple.com/in/app/hungrx/id6741845887"
                target="_blank"
                rel="noopener noreferrer"
                className="app-store-btn"
              >
                <img
                  src={appStoreBadge}
                  alt="Download on the App Store"
                  className="app-store-img"
                />
              </a>

              <a
                href="https://play.google.com/store/apps/details?id=com.hungrx.hungrx_app"
                target="_blank"
                rel="noopener noreferrer"
                className="app-store-btn"
              >
                <img
                  src={playstoreBadge}
                  alt="Download on the Play Store"
                  className="app-store-img"
                />
              </a>
            </div>
          </div>
        </section>

        {/* Contact Us Section */}
        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div className="container">
            <div className="contact-content fade-in">
              <h2 id="contact-title" className="contact-title">Contact Us</h2>
              <p className="contact-subtitle">
                <span className="contact-highlight">Have questions?</span> Reach us at:
              </p>
              <a href="mailto:admin@hungrx.com" className="contact-email-btn">
                admin@hungrx.com
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer" role="contentinfo">
        <div className="container">
          <div className="footer-content">
            {/* Social Media Links */}
            <div className="footer-social">
              <a href="https://www.instagram.com/hungrx_app/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Follow us on Instagram">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://x.com/hungr_x" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Follow us on Twitter">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="https://linkedin.com/company/hungrx" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Follow us on LinkedIn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>

            {/* Navigation Links */}
            <nav className="footer-nav" aria-label="Footer navigation">
              <a href="#" className="footer-nav-link" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>HOME</a>
              <a href="#introduction" className="footer-nav-link" onClick={(e) => handleSmoothScroll(e, '#introduction')}>ABOUT US</a>
              <a href="#features" className="footer-nav-link" onClick={(e) => handleSmoothScroll(e, '#features')}>FEATURES</a>
            </nav>

            {/* Legal Links */}
            <div className="footer-legal">
              <a href="/privacy-policy" className="footer-legal-link">Privacy Policy</a>
              <span className="footer-divider">|</span>
              <a href="/terms-of-service" className="footer-legal-link">Terms of Service</a>
              <span className="footer-divider">|</span>
              <a href="/cookie-policy" className="footer-legal-link">Cookie Policy</a>
            </div>

            {/* Copyright */}
            <div className="footer-copyright">
              <span className="copyright-text">© 2024 hungrX LLC</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating CTA */}
      <a href="#download" className="floating-cta" aria-label="Download hungrX now" onClick={(e) => handleSmoothScroll(e, '#download')}>Download Now</a>
    </div>
  );
}

export default App;