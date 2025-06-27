# Windows PowerShell Python Installer Script
# Run this script as Administrator for best results

param(
    [string]$PythonVersion = "3.12.4",
    [switch]$Force,
    [switch]$Help
)

# Color definitions for output
$Colors = @{
    Red = "Red"
    Green = "Green"
    Yellow = "Yellow"
    Blue = "Cyan"
    White = "White"
}

function Write-Status {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor $Colors.Blue
}

function Write-Success {
    param([string]$Message)
    Write-Host "[SUCCESS] $Message" -ForegroundColor $Colors.Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor $Colors.Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor $Colors.Red
}

function Show-Help {
    Write-Host @"
Windows Python Installer Script

USAGE:
    .\install-python.ps1 [-PythonVersion <version>] [-Force] [-Help]

PARAMETERS:
    -PythonVersion    Specify Python version to install (default: 3.12.4)
    -Force           Force installation even if Python exists
    -Help            Show this help message

EXAMPLES:
    .\install-python.ps1
    .\install-python.ps1 -PythonVersion "3.11.9"
    .\install-python.ps1 -Force

REQUIREMENTS:
    - Run as Administrator for system-wide installation
    - Internet connection required
"@ -ForegroundColor $Colors.White
}

function Test-Administrator {
    $currentUser = [Security.Principal.WindowsIdentity]::GetCurrent()
    $principal = New-Object Security.Principal.WindowsPrincipal($currentUser)
    return $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
}

function Test-CommandExists {
    param([string]$Command)
    try {
        Get-Command $Command -ErrorAction Stop | Out-Null
        return $true
    }
    catch {
        return $false
    }
}

function Test-PythonInstalled {
    $pythonCommands = @("python", "python3", "py")

    foreach ($cmd in $pythonCommands) {
        if (Test-CommandExists $cmd) {
            try {
                $version = & $cmd --version 2>$null
                if ($version) {
                    Write-Warning "Python is already installed: $version"
                    return $true
                }
            }
            catch {
                continue
            }
        }
    }
    return $false
}

function Install-WithWinget {
    Write-Status "Attempting installation with winget..."

    if (-not (Test-CommandExists "winget")) {
        Write-Warning "winget not available"
        return $false
    }

    try {
        $result = winget install Python.Python.3.12 --silent --accept-source-agreements --accept-package-agreements
        if ($LASTEXITCODE -eq 0) {
            Write-Success "Python installed successfully with winget"
            return $true
        }
        else {
            Write-Warning "winget installation failed"
            return $false
        }
    }
    catch {
        Write-Warning "winget installation encountered an error: $($_.Exception.Message)"
        return $false
    }
}

function Install-WithChocolatey {
    Write-Status "Attempting installation with Chocolatey..."

    if (-not (Test-CommandExists "choco")) {
        Write-Status "Chocolatey not found. Installing Chocolatey first..."
        try {
            Set-ExecutionPolicy Bypass -Scope Process -Force
            [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
            Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

            # Refresh environment variables
            $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

            if (-not (Test-CommandExists "choco")) {
                Write-Warning "Chocolatey installation failed"
                return $false
            }
            Write-Success "Chocolatey installed successfully"
        }
        catch {
            Write-Warning "Failed to install Chocolatey: $($_.Exception.Message)"
            return $false
        }
    }

    try {
        choco install python --version=$PythonVersion -y
        if ($LASTEXITCODE -eq 0) {
            Write-Success "Python installed successfully with Chocolatey"
            return $true
        }
        else {
            Write-Warning "Chocolatey installation failed"
            return $false
        }
    }
    catch {
        Write-Warning "Chocolatey installation encountered an error: $($_.Exception.Message)"
        return $false
    }
}

function Install-FromWebsite {
    Write-Status "Downloading Python installer from official website..."

    # Determine architecture
    $arch = if ([Environment]::Is64BitOperatingSystem) { "amd64" } else { "win32" }
    $installerName = "python-$PythonVersion-$arch.exe"
    $downloadUrl = "https://www.python.org/ftp/python/$PythonVersion/$installerName"
    $installerPath = Join-Path $env:TEMP $installerName

    try {
        Write-Status "Downloading from: $downloadUrl"
        Invoke-WebRequest -Uri $downloadUrl -OutFile $installerPath -UseBasicParsing
        Write-Success "Download completed: $installerPath"

        # Install Python silently
        Write-Status "Installing Python..."
        $installArgs = @(
            "/quiet",
            "InstallAllUsers=1",
            "PrependPath=1",
            "Include_test=0",
            "Include_launcher=1"
        )

        $process = Start-Process -FilePath $installerPath -ArgumentList $installArgs -Wait -PassThru

        if ($process.ExitCode -eq 0) {
            Write-Success "Python installed successfully from web installer"

            # Clean up installer
            Remove-Item $installerPath -Force -ErrorAction SilentlyContinue
            return $true
        }
        else {
            Write-Error "Installation failed with exit code: $($process.ExitCode)"
            return $false
        }
    }
    catch {
        Write-Error "Failed to download or install Python: $($_.Exception.Message)"
        return $false
    }
}

function Update-EnvironmentPath {
    Write-Status "Refreshing environment variables..."

    # Refresh PATH for current session
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

    # Common Python installation paths
    $pythonPaths = @(
        "$env:LOCALAPPDATA\Programs\Python\Python$($PythonVersion.Replace('.','').Substring(0,3))",
        "$env:LOCALAPPDATA\Programs\Python\Python$($PythonVersion.Replace('.','').Substring(0,3))\Scripts",
        "$env:ProgramFiles\Python$($PythonVersion.Replace('.','').Substring(0,3))",
        "$env:ProgramFiles\Python$($PythonVersion.Replace('.','').Substring(0,3))\Scripts"
    )

    foreach ($path in $pythonPaths) {
        if (Test-Path $path) {
            if ($env:Path -notlike "*$path*") {
                $env:Path += ";$path"
            }
        }
    }
}

function Test-Installation {
    Write-Status "Verifying Python installation..."

    # Update PATH first
    Update-EnvironmentPath
    Start-Sleep -Seconds 2

    $pythonCommands = @("python", "python3", "py")
    $pythonFound = $false

    foreach ($cmd in $pythonCommands) {
        if (Test-CommandExists $cmd) {
            try {
                $version = & $cmd --version 2>$null
                if ($version) {
                    Write-Success "Python is working: $version"
                    $pythonFound = $true
                    break
                }
            }
            catch {
                continue
            }
        }
    }

    if (-not $pythonFound) {
        Write-Warning "Python command not found. You may need to restart your terminal."
        Write-Status "Try running: py --version"
        return $false
    }

    # Test pip
    $pipCommands = @("pip", "pip3", "py -m pip")
    $pipFound = $false

    foreach ($cmd in $pipCommands) {
        try {
            if ($cmd -like "py -m pip") {
                $version = py -m pip --version 2>$null
            }
            else {
                $version = & $cmd --version 2>$null
            }

            if ($version) {
                Write-Success "pip is working: $version"
                $pipFound = $true
                break
            }
        }
        catch {
            continue
        }
    }

    if (-not $pipFound) {
        Write-Warning "pip not found, attempting to bootstrap..."
        try {
            py -m ensurepip --upgrade
            Write-Success "pip bootstrapped successfully"
        }
        catch {
            Write-Warning "Could not bootstrap pip. Try: py -m ensurepip --upgrade"
        }
    }

    return $pythonFound
}

function Install-Python {
    Write-Status "Starting Python $PythonVersion installation for Windows..."

    # Check if running as administrator
    if (-not (Test-Administrator)) {
        Write-Warning "Not running as Administrator. Some installation methods may fail."
        Write-Status "For best results, run PowerShell as Administrator and try again."
    }

    # Check existing installation
    if ((Test-PythonInstalled) -and (-not $Force)) {
        $response = Read-Host "Python appears to be installed. Continue anyway? (y/N)"
        if ($response -notmatch '^[Yy]') {
            Write-Status "Installation cancelled."
            return
        }
    }

    # Try different installation methods
    $installationMethods = @(
        { Install-WithWinget },
        { Install-WithChocolatey },
        { Install-FromWebsite }
    )

    $success = $false
    foreach ($method in $installationMethods) {
        if (& $method) {
            $success = $true
            break
        }
        Write-Status "Trying next installation method..."
    }

    if (-not $success) {
        Write-Error "All installation methods failed!"
        Write-Status @"
Manual installation steps:
1. Visit https://www.python.org/downloads/
2. Download Python $PythonVersion for Windows
3. Run installer as Administrator
4. Check 'Add Python to PATH' during installation
"@
        return
    }

    # Verify installation
    if (Test-Installation) {
        Write-Success "Python installation completed successfully!"
        Write-Status ""
        Write-Status "You can now use Python with:"
        Write-Status "  python --version"
        Write-Status "  py --version"
        Write-Status ""
        Write-Status "Install packages with:"
        Write-Status "  pip install <package_name>"
        Write-Status "  py -m pip install <package_name>"
    }
    else {
        Write-Warning "Installation may have succeeded, but verification failed."
        Write-Status "Try restarting your terminal and running: py --version"
    }
}

# Main execution
if ($Help) {
    Show-Help
    exit 0
}

Write-Host "=== Windows Python Installer ===" -ForegroundColor $Colors.Blue
Write-Host ""

Install-Python