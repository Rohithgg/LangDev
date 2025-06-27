import { Language } from '../types';

export const languages: Language[] = [
  {
    id: 'javascript',
    name: 'JavaScript (Node.js)',
    description: 'JavaScript runtime built on Chrome\'s V8 JavaScript engine',
    category: 'Runtime',
    icon: '🟨',
    installCommand: {
      windows: 'curl -fsSL https://get.lang.dev/nodejs | powershell',
      mac: 'curl -fsSL https://get.lang.dev/nodejs | bash',
      linux: 'curl -fsSL https://get.lang.dev/nodejs | bash'
    },
    verifyCommand: 'node --version && npm --version',
    additionalSteps: [
      'Node.js includes npm (Node Package Manager) by default',
      'Consider using nvm for version management'
    ],
    officialDocs: 'https://nodejs.org/docs',
    prerequisites: ['curl or wget']
  },
  {
    id: 'python',
    name: 'Python',
    description: 'High-level programming language for general-purpose programming',
    category: 'Language',
    icon: '🐍',
    installCommand: {
      windows: 'powershell -Command "& { iwr https://raw.githubusercontent.com/Rohithgg/LangDev/main/scripts/python/install_python.ps1 -UseBasicParsing | iex }"',
      mac: 'curl -fsSL https://raw.githubusercontent.com/Rohithgg/LangDev/main/scripts/python/install_python.sh | bash',
      linux: 'curl -fsSL https://raw.githubusercontent.com/Rohithgg/LangDev/main/scripts/python/install_python.sh | bash'
    },
    verifyCommand: 'python --version && pip --version',
    additionalSteps: [
      'Python includes pip (Package Installer for Python) by default',
      'Virtual environments are recommended for project isolation'
    ],
    officialDocs: 'https://docs.python.org',
    prerequisites: ['curl or wget']
  },
  {
    id: 'rust',
    name: 'Rust',
    description: 'Systems programming language focused on safety, speed, and concurrency',
    category: 'Language',
    icon: '🦀',
    installCommand: {
      windows: 'curl -fsSL https://get.lang.dev/rust | powershell',
      mac: 'curl -fsSL https://get.lang.dev/rust | bash',
      linux: 'curl -fsSL https://get.lang.dev/rust | bash'
    },
    verifyCommand: 'rustc --version && cargo --version',
    additionalSteps: [
      'Rust includes Cargo (package manager and build system) by default',
      'Add ~/.cargo/bin to your PATH if not done automatically'
    ],
    officialDocs: 'https://doc.rust-lang.org',
    prerequisites: ['curl or wget', 'C++ build tools']
  },
  {
    id: 'go',
    name: 'Go',
    description: 'Open source programming language that makes it easy to build simple, reliable, and efficient software',
    category: 'Language',
    icon: '🐹',
    installCommand: {
      windows: 'curl -fsSL https://get.lang.dev/go | powershell',
      mac: 'curl -fsSL https://get.lang.dev/go | bash',
      linux: 'curl -fsSL https://get.lang.dev/go | bash'
    },
    verifyCommand: 'go version',
    additionalSteps: [
      'Set GOPATH environment variable if needed',
      'Go modules are enabled by default in Go 1.16+'
    ],
    officialDocs: 'https://golang.org/doc',
    prerequisites: ['curl or wget']
  },
  {
    id: 'java',
    name: 'Java',
    description: 'Object-oriented programming language and computing platform',
    category: 'Language',
    icon: '☕',
    installCommand: {
      windows: 'curl -fsSL https://get.lang.dev/java | powershell',
      mac: 'curl -fsSL https://get.lang.dev/java | bash',
      linux: 'curl -fsSL https://get.lang.dev/java | bash'
    },
    verifyCommand: 'java -version && javac -version',
    additionalSteps: [
      'JAVA_HOME environment variable will be set automatically',
      'Includes OpenJDK by default'
    ],
    officialDocs: 'https://docs.oracle.com/en/java',
    prerequisites: ['curl or wget']
  },
  {
    id: 'docker',
    name: 'Docker',
    description: 'Platform for developing, shipping, and running applications in containers',
    category: 'Tool',
    icon: '🐳',
    installCommand: {
      windows: 'curl -fsSL https://get.lang.dev/docker | powershell',
      mac: 'curl -fsSL https://get.lang.dev/docker | bash',
      linux: 'curl -fsSL https://get.lang.dev/docker | bash'
    },
    verifyCommand: 'docker --version && docker-compose --version',
    additionalSteps: [
      'Docker Desktop will be installed on Windows and macOS',
      'Docker daemon will be started automatically',
      'User will be added to docker group on Linux'
    ],
    officialDocs: 'https://docs.docker.com',
    prerequisites: ['curl or wget', 'Administrator/sudo privileges']
  }
];