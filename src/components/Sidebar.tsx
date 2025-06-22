import React from 'react';
import { ChevronRight, Home, Book, Github } from 'lucide-react';
import { languages } from '../data/languages';

interface SidebarProps {
  currentLanguage?: string;
  onLanguageSelect: (languageId: string) => void;
  onHomeClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentLanguage, onLanguageSelect, onHomeClick }) => {
  const categories = Array.from(new Set(languages.map(lang => lang.category)));

  return (
    <div className="w-64 bg-gray-900/50 backdrop-blur-xl border-r border-gray-800 h-screen overflow-y-auto sticky top-0">
      <div className="p-6">
        {/* Logo */}
        <button 
          onClick={onHomeClick}
          className="flex items-center space-x-2 mb-8 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-yellow-400 rounded-lg flex items-center justify-center">
            <Home className="w-5 h-5 text-black" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-yellow-400 bg-clip-text text-transparent">
            LangDev
          </span>
        </button>

        {/* Navigation */}
        <nav className="space-y-6">
          {/* Home */}
          <div>
            <button
              onClick={onHomeClick}
              className={`flex items-center space-x-2 w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 ${
                !currentLanguage ? 'bg-blue-500/20 text-blue-400' : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>
          </div>

          {/* Documentation */}
          <div>
            <div className="flex items-center space-x-2 text-gray-400 text-sm font-medium mb-3">
              <Book className="w-4 h-4" />
              <span>Documentation</span>
            </div>
            
            {categories.map(category => (
              <div key={category} className="mb-4">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">
                  {category}
                </h3>
                <div className="space-y-1">
                  {languages
                    .filter(lang => lang.category === category)
                    .map(language => (
                      <button
                        key={language.id}
                        onClick={() => onLanguageSelect(language.id)}
                        className={`flex items-center justify-between w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 group ${
                          currentLanguage === language.id
                            ? 'bg-blue-500/20 text-blue-400 border-l-2 border-blue-400'
                            : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{language.icon}</span>
                          <span className="text-sm">{language.name}</span>
                        </div>
                        <ChevronRight className={`w-3 h-3 transition-transform duration-200 ${
                          currentLanguage === language.id ? 'rotate-90' : 'group-hover:translate-x-0.5'
                        }`} />
                      </button>
                    ))}
                </div>
              </div>
            ))}
          </div>

          {/* Links */}
          <div className="pt-6 border-t border-gray-800">
            <a
              href="#"
              className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors duration-200 px-3 py-2"
            >
              <Github className="w-4 h-4" />
              <span className="text-sm">GitHub</span>
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;