import React, { useState } from 'react';
import { Github, Terminal } from 'lucide-react';
import Sidebar from './components/Sidebar';
import HomePage from './components/HomePage';
import InstallationGuide from './components/InstallationGuide';
import { languages } from './data/languages';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'language'>('home');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');

  const handleLanguageSelect = (languageId: string) => {
    setSelectedLanguage(languageId);
    setCurrentView('language');
  };

  const handleHomeClick = () => {
    setCurrentView('home');
    setSelectedLanguage('');
  };

  const currentLanguageData = languages.find(lang => lang.id === selectedLanguage);

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <Sidebar
        currentLanguage={currentView === 'language' ? selectedLanguage : undefined}
        onLanguageSelect={handleLanguageSelect}
        onHomeClick={handleHomeClick}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Top Navigation */}
        <nav className="sticky top-0 z-40 backdrop-blur-xl bg-black/80 border-b border-gray-800">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {currentView === 'language' && currentLanguageData && (
                  <>
                    <button
                      onClick={handleHomeClick}
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                    >
                      Home
                    </button>
                    <span className="text-gray-600">/</span>
                    <span className="text-white font-medium">{currentLanguageData.name}</span>
                  </>
                )}
              </div>
              
              <div className="flex items-center space-x-4">
                <a
                  href="#"
                  className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors duration-200"
                >
                  <Github className="w-4 h-4" />
                  <span className="text-sm">GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <main className="p-6">
          {currentView === 'home' ? (
            <HomePage onLanguageSelect={handleLanguageSelect} />
          ) : (
            currentLanguageData && (
              <InstallationGuide language={currentLanguageData} />
            )
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-800 bg-gray-900/50 mt-16">
          <div className="px-6 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-yellow-400 rounded-lg flex items-center justify-center">
                  <Terminal className="w-5 h-5 text-black" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-yellow-400 bg-clip-text text-transparent">
                  LangDev
                </span>
              </div>
              
              <div className="flex items-center space-x-6">
                <a
                  href="#"
                  className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors duration-200"
                >
                  <Github className="w-5 h-5" />
                  <span>GitHub</span>
                </a>
                <span className="text-gray-500">•</span>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                  MIT License
                </a>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-800 text-center text-gray-500">
              <p>&copy; 2025 LangDev. Built for developers, by developers.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;