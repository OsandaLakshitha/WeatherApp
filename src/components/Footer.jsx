import React from "react";
import "./Footer.css"; // Import the CSS file
import { Github, Facebook, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="footer-container">
        {/* Footer Grid */}
        <div className="footer-grid">
          {/* Brand Section */}
          <div className="footer-column">
            <h2>Weather Garfield</h2>
            <p>
              Your trusted weather companion, bringing accurate forecasts to
              your fingertips.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-column">
            <h3>Our Other Projects</h3>
            <ul>
              <li>
                <a href="https://osandalakshitha.vercel.app/">My Portfolio</a>
              </li>
              <li>
                <a href="https://moodmusick.vercel.app/">Mood Musick</a>
              </li>
              <li>
                <a href="https://whatshouldieattonight.vercel.app/#">What should I eat tonight</a>
              </li>
              <li>
                <a href="https://osandalakshitha.github.io/OnlineSpareParts/">Spare Parts</a>
              </li>
            </ul>
          </div>

          {/* Connect With Us */}
          <div className="footer-column">
            <h3>Connect With Us</h3>
            <div className="social-icons">
              <a href="https://www.facebook.com/osandagg" aria-label="Twitter">
                <Facebook className="icon" />
              </a>
              <a href="https://github.com/osandalakshitha" aria-label="GitHub">
                <Github className="icon" />
              </a>
              <a href="https://www.linkedin.com/in/osandalakshitha" aria-label="LinkedIn">
                <Linkedin className="icon" />
              </a>
              <a href="https://www.instagram.com/osanda.exe" aria-label="Instagram">
                <Instagram className="icon" />
              </a>
            </div>
            <p>Email: garfieldsl01@gmail.com</p>
          </div>
        </div>

        {/* Divider */}
        <div className="divider"></div>

        {/* Bottom Footer */}
        <div className="text-center">
          <p>© {currentYear} Garfield Kammali Projects. All rights reserved.</p>
          <p className="text-sm">
            Designed and developed with ❤️ by Garfield Kammali Projects
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
