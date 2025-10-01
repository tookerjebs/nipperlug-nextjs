'use client';

export default function LegalPage() {
  return (
    <div className="text-gray-200">
      <div className="container mx-auto max-w-6xl p-2 sm:p-4 md:p-5 lg:p-6">
        {/* Header Section */}
        <div className="component-bg-dark mb-3 sm:mb-4 lg:mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-2">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-game-gold glow-text-lg">
                Legal
              </h1>
            </div>
          </div>
          <div className="text-right mt-4">
            <p className="text-sm text-gray-400 italic">
              Last updated: December 2024
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Website Information */}
          <section className="glass-panel-dark p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-game-gold mb-4">
              1. Website Information
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              This website provides information and tools related to the game Cabal Online. This is an independent 
              fan-made project and is not officially affiliated with, endorsed by, or connected to ESTsoft or any 
              of its subsidiaries. This legal notice applies to nipperlug.com and all its subdomains.
            </p>
            
            <div className="glass-panel p-4 border-l-4 border-stat-defensive">
              <h3 className="font-semibold text-white mb-2">Contact Information:</h3>
              <p className="text-gray-300">Email: contact@nipperlug.com</p>
            </div>
          </section>

          {/* Disclaimer & Intellectual Property */}
          <section className="glass-panel-dark p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-game-gold mb-4">
              2. Disclaimer & Intellectual Property
            </h2>
            
            <div className="glass-panel p-4 border-l-4 border-game-gold bg-yellow-900/10 mb-4">
              <p className="text-yellow-200">
                <strong>Important:</strong> This website is an independent fan project. Cabal Online and all 
                game-related content (names, data, mechanics, graphics, etc.) are the intellectual property of 
                ESTsoft and are used under fair use principles for informational and educational purposes only.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-200 mb-2">2.1 Ownership & Usage Rights</h3>
                <p className="text-gray-300 leading-relaxed">
                  Cabal Online is a trademark and copyrighted property of ESTsoft. All game content, including 
                  graphics, character data, monster statistics, items, skills, and related materials remain 
                  the property of their respective owners. This website's original design and code are owned 
                  by nipperlug.com, but all game data is used under fair use for community benefit.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-200 mb-2">2.2 Data Sources & Accuracy</h3>
                <p className="text-gray-300 leading-relaxed">
                  All game data is derived from publicly available sources and community research. While we 
                  strive for accuracy, we make no warranties about completeness or reliability. Game data may 
                  change with updates, and information may become outdated.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-200 mb-2">2.3 Liability Limitation</h3>
                <p className="text-gray-300 leading-relaxed">
                  The website owner shall not be liable for any damages arising from your use of this website. 
                  Trademark usage is purely for identification and does not imply official endorsement or affiliation.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-200 mb-2">2.4 Intellectual Property Respect</h3>
                <p className="text-gray-300 leading-relaxed">
                  We respect all intellectual property rights. If you believe any content infringes upon your 
                  rights, please contact us immediately at contact@nipperlug.com with detailed information 
                  about the alleged infringement.
                </p>
              </div>
            </div>
          </section>

          {/* Privacy Policy */}
          <section className="glass-panel-dark p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-game-gold mb-4">
              3. Privacy Policy
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-200 mb-2">3.1 What We Collect</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                  <li>Calculator prices (stored locally)</li>
                  <li>Contact info (only if you email us)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-200 mb-2">3.2 What We Don't Collect</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                  <li>Personal information</li>
                  <li>Tracking or analytics</li>
                  <li>Advertising data</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-200 mb-2">3.3 Cookies</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                  <li>Google Fonts (typography)</li>
                  <li>No tracking or advertising cookies</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-200 mb-2">3.4 Contact</h3>
                <p className="text-gray-300">
                  Questions: contact@nipperlug.com
                </p>
              </div>
            </div>
          </section>

          {/* Terms of Use */}
          <section className="glass-panel-dark p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-game-gold mb-4">
              4. Terms of Use
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-200 mb-2">4.1 Acceptance of Terms</h3>
                <p className="text-gray-300 leading-relaxed">
                  By accessing and using this website, you accept and agree to be bound by the terms and 
                  provision of this agreement.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-200 mb-2">4.2 Permitted Use</h3>
                <p className="text-gray-300 leading-relaxed mb-2">
                  This website is provided for informational and educational purposes related to Cabal Online. You may:
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                  <li>View and use the information for personal, non-commercial purposes</li>
                  <li>Share links to this website</li>
                  <li>Contact us with questions or feedback</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-200 mb-2">4.3 Prohibited Use</h3>
                <p className="text-gray-300 leading-relaxed mb-2">You may not:</p>
                <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                  <li>Use this website for any unlawful purpose</li>
                  <li>Attempt to gain unauthorized access to any part of the website</li>
                  <li>Reproduce, distribute, or create derivative works without permission</li>
                  <li>Use automated systems to access the website excessively</li>
                  <li>Interfere with the website's operation or security</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-200 mb-2">4.4 Intellectual Property</h3>
                <p className="text-gray-300 leading-relaxed">
                  The design, layout, and original content of this website are protected by copyright. 
                  Game-related content belongs to their respective owners and is used under fair use principles 
                  for informational purposes.
                </p>
              </div>
            </div>
          </section>

          {/* Changes to Policy */}
          <section className="glass-panel-dark p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-game-gold mb-4">
              5. Changes to This Policy
            </h2>
            <p className="text-gray-300 leading-relaxed">
              We reserve the right to update this document at any time. Changes will be posted 
              on this page with an updated revision date. Continued use of the website after changes 
              constitutes acceptance of the new terms.
            </p>
          </section>

          {/* Contact Information */}
          <section className="glass-panel-dark p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-game-gold mb-4">
              6. Contact Information
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              If you have any questions about this document, privacy policy, or terms of use, 
              please contact us:
            </p>
            
            <div className="glass-panel p-4 border-l-4 border-stat-defensive">
              <p className="text-gray-300">
                <strong className="text-white">Email:</strong> contact@nipperlug.com<br />
                <strong className="text-white">Subject Line:</strong> Please include "Legal Inquiry" in your subject line
              </p>
            </div>
          </section>

          {/* Data Protection Authority */}
          <section className="glass-panel-dark p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-game-gold mb-4">
              7. Data Protection Authority
            </h2>
            <p className="text-gray-300 leading-relaxed">
              If you believe your data protection rights have been violated, you may have the right to lodge 
              a complaint with your local data protection authority, where applicable.
            </p>
          </section>

          {/* Document Info */}
          <div className="text-center text-sm text-gray-400 italic pt-6 border-t border-border-dark">
            Document created: December 2024
          </div>
        </div>
      </div>
    </div>
  );
}