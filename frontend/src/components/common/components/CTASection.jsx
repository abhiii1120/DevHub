import React from "react";
import { Link } from "react-router";

const CTASection = ({
  title = "Ready to Scale?",
  description = "Join the elite circle of developers building the future of the web.",
  cardTitle = "Stop building in silence.",
  cardDescription = "Join 50,000+ developers who have accelerated their careers by sharing their journey on DevStack.",
  primaryButton = { text: "Get Started - It's Free", link: "/signup" },
  secondaryButton = { text: "Talk to Sales", onClick: null },
  background = "from-primary/10 to-purple-500/10",
  showSocialLinks = true,
  socialLinks = [
    { label: "GitHub", link: "#" },
    { label: "Twitter", link: "#" },
    { label: "LinkedIn", link: "#" }
  ]
}) => {
  return (
    <section className={`py-20 px-4 bg-gradient-to-r ${background}`}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          {description}
        </p>
        
        <div className="bg-white dark:bg-gray-950 rounded-2xl p-8 mb-8 shadow-xl">
          <h3 className="text-2xl font-bold mb-2">{cardTitle}</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {cardDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={primaryButton.link}
              className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all font-semibold"
            >
              {primaryButton.text}
            </Link>
            <button
              onClick={secondaryButton.onClick}
              className="px-8 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-lg hover:border-primary transition-all font-semibold"
            >
              {secondaryButton.text}
            </button>
          </div>
        </div>

        {showSocialLinks && (
          <div className="flex justify-center gap-6">
            {socialLinks.map((social, index) => (
              <a 
                key={index} 
                href={social.link} 
                className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CTASection;