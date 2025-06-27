#!/bin/bash

# Cross-Platform Python Installer Script
# Supports Linux, and macOS

set -e  # Exit on any error

PYTHON_VERSION="3.12.4"  # Change this to desired Python version
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to detect operating system
detect_os() {
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        OS="linux"
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        OS="macos"
    elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]]; then
        OS="windows"
    else
        print_error "Unsupported operating system: $OSTYPE"
        exit 1
    fi
    print_status "Detected OS: $OS"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to install Python on Linux
install_python_linux() {
    print_status "Installing Python on Linux..."

    # Detect Linux distribution
    if command_exists apt-get; then
        # Debian/Ubuntu
        print_status "Detected Debian/Ubuntu system"
        sudo apt update
        sudo apt install -y software-properties-common
        sudo add-apt-repository -y ppa:deadsnakes/ppa
        sudo apt update
        sudo apt install -y python${PYTHON_VERSION%.*} python${PYTHON_VERSION%.*}-pip python${PYTHON_VERSION%.*}-venv
    elif command_exists yum; then
        # RHEL/CentOS/Fedora (older)
        print_status "Detected RHEL/CentOS system"
        sudo yum groupinstall -y "Development Tools"
        sudo yum install -y gcc openssl-devel bzip2-devel libffi-devel zlib-devel wget
        install_python_from_source
    elif command_exists dnf; then
        # Fedora (newer)
        print_status "Detected Fedora system"
        sudo dnf groupinstall -y "Development Tools"
        sudo dnf install -y gcc openssl-devel bzip2-devel libffi-devel zlib-devel wget
        sudo dnf install -y python3 python3-pip
    elif command_exists pacman; then
        # Arch Linux
        print_status "Detected Arch Linux system"
        sudo pacman -Syu --noconfirm python python-pip
    else
        print_warning "Unknown Linux distribution. Attempting to install from source..."
        install_python_from_source
    fi
}

# Function to install Python from source (Linux fallback)
install_python_from_source() {
    print_status "Installing Python ${PYTHON_VERSION} from source..."

    # Create temporary directory
    TEMP_DIR=$(mktemp -d)
    cd "$TEMP_DIR"

    # Download Python source
    wget "https://www.python.org/ftp/python/${PYTHON_VERSION}/Python-${PYTHON_VERSION}.tgz"
    tar -xzf "Python-${PYTHON_VERSION}.tgz"
    cd "Python-${PYTHON_VERSION}"

    # Configure and compile
    ./configure --enable-optimizations
    # shellcheck disable=SC2046
    make -j$(nproc)
    sudo make altinstall

    # Clean up
    cd /
    rm -rf "$TEMP_DIR"
}

# Function to install Python on macOS
install_python_macos() {
    print_status "Installing Python on macOS..."

    if command_exists brew; then
        print_status "Using Homebrew to install Python..."
        brew update
        brew install python@${PYTHON_VERSION%.*}
    else
        print_status "Homebrew not found. Installing Homebrew first..."
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

        # Add Homebrew to PATH for current session
        if [[ $(uname -m) == "arm64" ]]; then
            export PATH="/opt/homebrew/bin:$PATH"
        else
            export PATH="/usr/local/bin:$PATH"
        fi

        print_status "Installing Python with Homebrew..."
        brew install python@${PYTHON_VERSION%.*}
    fi
}

# Function to verify Python installation
verify_installation() {
    print_status "Verifying Python installation..."

    # Refresh PATH (for current session)
    if [[ "$OS" == "windows" ]]; then
        export PATH="/c/Users/$USERNAME/AppData/Local/Programs/Python/Python${PYTHON_VERSION%.*}/:/c/Users/$USERNAME/AppData/Local/Programs/Python/Python${PYTHON_VERSION%.*}/Scripts/:$PATH"
    fi

    sleep 2  # Give system time to update PATH

    if command_exists python3; then
        PYTHON_CMD="python3"
    elif command_exists python; then
        PYTHON_CMD="python"
    else
        print_error "Python installation verification failed!"
        print_warning "You may need to restart your terminal or add Python to your PATH manually"
        return 1
    fi

    INSTALLED_VERSION=$($PYTHON_CMD --version 2>&1)
    print_success "Python installed successfully: $INSTALLED_VERSION"

    # Check pip
    if command_exists pip3; then
        PIP_CMD="pip3"
    elif command_exists pip; then
        PIP_CMD="pip"
    else
        print_warning "pip not found, attempting to install..."
        $PYTHON_CMD -m ensurepip --upgrade
        PIP_CMD="pip"
    fi

    if command_exists $PIP_CMD; then
        PIP_VERSION=$($PIP_CMD --version 2>&1)
        print_success "pip is available: $PIP_VERSION"
    fi
}

# Main installation function
main() {
    print_status "Starting Python installation..."
    print_status "Target Python version: $PYTHON_VERSION"

    # Check if Python is already installed
    if command_exists python3; then
        CURRENT_VERSION=$(python3 --version 2>&1)
        print_warning "Python is already installed: $CURRENT_VERSION"
        read -p "Do you want to continue with installation? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            print_status "Installation cancelled"
            exit 0
        fi
    fi

    # Detect OS and install accordingly
    detect_os

    case $OS in
        "linux")
            install_python_linux
            ;;
        "macos")
            install_python_macos
            ;;
        *)
            print_error "Unsupported operating system"
            exit 1
            ;;
    esac

    # Verify installation
    verify_installation

    print_success "Python installation completed!"
    print_status "You can now use Python with: python3 or python"
    print_status "You can install packages with: pip3 install <package_name>"
}

# Run main function
main "$@"