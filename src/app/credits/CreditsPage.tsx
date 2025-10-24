'use client';

export default function CreditsPage() {
  return (
    <div className="text-gray-200">
      <div className="container mx-auto max-w-6xl p-2 sm:p-4 md:p-5 lg:p-6">
        {/* Header Section */}
        <div className="component-bg-dark mb-3 sm:mb-4 lg:mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-2">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-game-gold glow-text-lg">
                About & Credits
              </h1>
            </div>
          </div>
          <p className="text-foreground/80 leading-relaxed">
            Information about this project, contributors, data sources, and acknowledgments.
          </p>
          <div className="text-right mt-4">
            <p className="text-sm text-gray-400 italic">
              Last updated: January 2025
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Credits & Acknowledgments */}
          <section className="glass-panel-dark p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-game-gold mb-4">
              1. Credits & Acknowledgments
            </h2>
            
            <div className="space-y-4">
              {/* Data Sources */}
              <div className="glass-panel p-4 border-l-4 border-stat-offensive">
                <p className="text-gray-300 leading-relaxed">
                  <a href="https://mrwormy.com/" target="_blank" rel="noopener noreferrer" 
                     className="text-game-gold hover:text-yellow-300 transition-colors">
                    MrWormy.com ↗
                  </a> - Source for many tools on this site that require detailed game information. 
                  MrWormy's site and the structured, 
                  easy to access information and all the collected Patch Notes made it an invaluable resource and saved many hours
                  of gathering data manually.
                </p>
              </div>

              <div className="glass-panel p-4 border-l-4 border-stat-defensive">
                <p className="text-gray-300 leading-relaxed">
                  ESTsoft for creating and maintaining Cabal Online. Game data, official documentation, and publicly available information from ESTsoft 
                  and official Cabal Online sources. All intellectual property remains with ESTsoft.
                </p>
              </div>

              <div className="glass-panel p-4 border-l-4 border-stat-utility">
                <p className="text-gray-300 leading-relaxed mb-3">
                  <span className="text-purple-300">osaka [Discord contribution] </span> - Shared a detailed damage calculation that covers all aspects from start to finish. It helped
                  understand how the game calculates damage and how different factors affect it.
                </p>
                
                <div className="glass-panel p-3 border-l-2 border-yellow-500 bg-yellow-900/10">
                  <p className="text-yellow-200 text-sm">
                    Project still in active development, any errors or inaccuracies in damage calculations on this site do not reflect
                    on the quality or accuracy of the original formulas.
                  </p>
                </div>
              </div>

              <div className="glass-panel p-4 border-l-4 border-stat-utility">
                <p className="text-gray-300 leading-relaxed">
                  All the <span className="text-emerald-300">content creators, theorycrafters, and data miners </span> 
                  in the community who share their knowledge.
                </p>
              </div>

              <div className="glass-panel p-4 border-l-4 border-stat-utility">
                <p className="text-gray-300 leading-relaxed">
                  And finally the people who provide feedback, testing, 
                  and suggestions to help improve this site.
                </p>
              </div>
            </div>
          </section>

          {/* Technical Stack */}
          <section className="glass-panel-dark p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-game-gold mb-4">
              2. Technical Stack
            </h2>

            <div className="glass-panel p-4 border-l-4 border-stat-defensive">
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Vercel - Hosting platform</li>
                <li>• Next.js 15 - React framework</li>
                <li>• Tailwind CSS - Styling framework</li>
                <li>• Github gists - Database storage (builds)</li>
              </ul>
            </div>
          </section>

          {/* Project Status */}
          <section className="glass-panel-dark p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-game-gold mb-4">
              3. Project Status & Contributions
            </h2>
            
            <div className="glass-panel p-4 border-l-4 border-game-gold bg-green-900/10 mb-4">
              <h3 className="text-lg font-semibold text-green-200 mb-2">🚧 Active Development</h3>
              <p className="text-gray-300 leading-relaxed">
                This project is open source and actively maintained. You can contribute on{' '}
                <a href="https://github.com/tookerjebs/nipperlug-nextjs" target="_blank" rel="noopener noreferrer" 
                   className="text-game-gold hover:text-yellow-300 transition-colors">
                  GitHub ↗
                </a>
              </p>
            </div>

            <div className="glass-panel p-4 border-l-4 border-stat-utility">
              <h3 className="text-lg font-semibold text-foreground mb-2"> Open to Contributions</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-1 ml-4">
                <li>Game data corrections and updates</li>
                <li>Bug reports and feature suggestions</li>
                <li>Testing and feedback on new features</li>
                <li>Community knowledge sharing</li>
              </ul>
            </div>
          </section>

          {/* Contact Information */}
          <section className="glass-panel-dark p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-game-gold mb-4">
              4. Contact & Corrections
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              If you notice any errors in our acknowledgments, have additional information to share, 
              or would like to be credited for contributions, please let us know:
            </p>
            
            <div className="glass-panel p-4 border-l-4 border-stat-defensive">
              <p className="text-gray-300">
                <span className="text-blue-300">Email:</span> contact@nipperlug.com<br />
              </p>
            </div>
          </section>

          {/* Document Info */}
          <div className="text-center text-sm text-gray-400 italic pt-6 border-t border-border-dark">
            Page created: January 2025 • This page will be updated as the project grows
          </div>
        </div>
      </div>
    </div>
  );
}
