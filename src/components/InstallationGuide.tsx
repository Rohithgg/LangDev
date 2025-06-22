import React, { useState } from 'react';
import { Copy, Check, ExternalLink, AlertCircle, CheckCircle } from 'lucide-react';
import { Language, OSType } from '../types';

interface InstallationGuideProps {
  language: Language;
}

const InstallationGuide: React.FC<InstallationGuideProps> = ({ language }) => {
  const [selectedOS, setSelectedOS] = useState<OSType>('mac');
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
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

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <span className="text-4xl">{language.icon}</span>
          <div>
            <h1 className="text-3xl font-bold text-white">{language.name}</h1>
            <p className="text-gray-400 text-lg">{language.description}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium">
            {language.category}
          </span>
          <a
            href={language.officialDocs}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-gray-400 hover:text-blue-400 transition-colors duration-200"
          >
            <ExternalLink className="w-4 h-4" />
            <span className="text-sm">Official Documentation</span>
          </a>
        </div>
      </div>

      {/* Prerequisites */}
      {language.prerequisites && language.prerequisites.length > 0 && (
        <div className="mb-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
          <div className="flex items-center space-x-2 mb-2">
            <AlertCircle className="w-5 h-5 text-yellow-400" />
            <h3 className="text-lg font-semibold text-yellow-400">Prerequisites</h3>
          </div>
          <ul className="space-y-1">
            {language.prerequisites.map((prereq, index) => (
              <li key={index} className="text-gray-300 text-sm flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>
                <span>{prereq}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Installation */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-6">Installation</h2>
        
        {/* OS Selection */}
        <div className="flex justify-center mb-6">
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

        {/* Install Command */}
        <div className="relative group mb-6">
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
                onClick={() => copyToClipboard(language.installCommand[selectedOS])}
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
                <code className="text-blue-400">
                  {language.installCommand[selectedOS]}
                </code>
              </pre>
            </div>
          </div>
        </div>

        {/* Verification */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">Verify Installation</h3>
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm font-mono">Verification Command</span>
              <button
                onClick={() => copyToClipboard(language.verifyCommand)}
                className="text-gray-400 hover:text-white transition-colors duration-200"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
            <pre className="font-mono text-green-400">
              <code>{language.verifyCommand}</code>
            </pre>
          </div>
        </div>

        {/* Additional Steps */}
        {language.additionalSteps && language.additionalSteps.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">Additional Information</h3>
            <div className="space-y-3">
              {language.additionalSteps.map((step, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-900/30 border border-gray-800 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-blue-900/20 to-yellow-900/20 rounded-2xl p-6 border border-gray-800">
          <h3 className="text-xl font-semibold text-white mb-4">What's Next?</h3>
          <div className="space-y-3">
            <p className="text-gray-300">
              🎉 Congratulations! You've successfully installed {language.name}.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={language.officialDocs}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors duration-200"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Read Official Docs</span>
              </a>
              <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-700 text-gray-300 rounded-lg hover:border-gray-600 hover:text-white transition-colors duration-200">
                <span>View Examples</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstallationGuide;