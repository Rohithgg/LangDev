import React, { useState } from 'react';
import { Copy, Check, Github, Code, Terminal, Users, ArrowRight } from 'lucide-react';
import { languages } from '../data/languages';

interface HomePageProps {
  onLanguageSelect: (languageId: string) => void;
}

type OSType = 'windows' | 'mac' | 'linux';

interface CodeBlock {
  [key: string]: string;
}

const codeBlocks: CodeBlock = {
  windows: `# PowerShell
iwr -useb https://get.lang.dev/install.ps1 | iex`,
  mac: `# Terminal
curl -fsSL https://get.lang.dev/install.sh | bash`,
  linux: `# Terminal
curl -fsSL https://get.lang.dev/install.sh | bash`
};

const HomePage: React.FC<HomePageProps> = ({ onLanguageSelect }) => {
  const [selectedOS, setSelectedOS] = useState<OSType>('mac');
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(codeBlocks[selectedOS]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const osOptions = [
    { id: 'windows' as OSType, label: 'Windows', icon: '🪟' },
    { id: 'mac' as OSType, label: 'macOS', icon: '🍎' },
    { id: 'linux' as OSType, label: 'Linux', icon: '🐧' }
  ];

  const popularLanguages = languages.slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-yellow-900/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-white to-yellow-400 bg-clip-text text-transparent leading-tight">
              Install Any Language
              <br />
              <span className="bg-gradient-to-r from-yellow-400 to-blue-400 bg-clip-text text-transparent">
                in One Line
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              The fastest way to install and manage programming languages across all platforms. 
              No more complex setup processes or dependency hell.
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-16">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">50+</div>
                <div className="text-gray-400">Languages</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">1M+</div>
                <div className="text-gray-400">Downloads</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">99.9%</div>
                <div className="text-gray-400">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Selection & Code Block */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
            Universal Installer
          </h2>
          <p className="text-gray-400 text-lg">
            Get started with a single command on your preferred operating system
          </p>
        </div>

        {/* OS Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-2 border border-gray-800">
            <div className="flex space-x-1">
              {osOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedOS(option.id)}
                  className={`
                    flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300
                    ${selectedOS === option.id
                      ? 'bg-gradient-to-r from-blue-500 to-yellow-500 text-black shadow-lg shadow-blue-500/25'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                    }
                  `}
                >
                  <span className="text-lg">{option.icon}</span>
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Code Block */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-yellow-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
          <div className="relative bg-gray-900/90 backdrop-blur-xl border border-gray-800 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
              <div className="flex items-center space-x-3">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-gray-400 text-sm font-mono">
                  {selectedOS === 'windows' ? 'PowerShell' : 'Terminal'}
                </span>
              </div>
              <button
                onClick={copyToClipboard}
                className="flex items-center space-x-2 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200 text-sm"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-green-400" />
                    <span className="text-green-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">Copy</span>
                  </>
                )}
              </button>
            </div>
            <div className="p-6">
              <pre className="font-mono text-lg leading-relaxed">
                <code className="text-gray-300">
                  <span className="text-gray-500">{codeBlocks[selectedOS].split('\n')[0]}</span>
                  {'\n'}
                  <span className="text-blue-400">{codeBlocks[selectedOS].split('\n')[1]}</span>
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Languages */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-800">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-yellow-400 bg-clip-text text-transparent">
            Popular Languages
          </h2>
          <p className="text-gray-400 text-lg">
            Quick access to the most commonly installed programming languages
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {popularLanguages.map((language) => (
            <button
              key={language.id}
              onClick={() => onLanguageSelect(language.id)}
              className="group relative cursor-pointer transform transition-all duration-300 hover:scale-105"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-yellow-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
              <div className="relative bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10">
                <div className="flex items-center space-x-4">
                  <span className="text-3xl">{language.icon}</span>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors duration-300">
                      {language.name}
                    </h3>
                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      {language.category}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300 ml-auto" />
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="text-center">
          <p className="text-gray-400 mb-4">
            Looking for more languages? Browse our complete documentation.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-800">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-2xl bg-gray-900/30 border border-gray-800 backdrop-blur-sm">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Terminal className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Universal Installer</h3>
            <p className="text-gray-400">Works across Windows, macOS, and Linux with intelligent detection</p>
          </div>
          
          <div className="text-center p-6 rounded-2xl bg-gray-900/30 border border-gray-800 backdrop-blur-sm">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Code className="w-6 h-6 text-yellow-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Version Management</h3>
            <p className="text-gray-400">Automatically handles version switching and environment setup</p>
          </div>
          
          <div className="text-center p-6 rounded-2xl bg-gray-900/30 border border-gray-800 backdrop-blur-sm">
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Community Driven</h3>
            <p className="text-gray-400">Open source with contributions from developers worldwide</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;