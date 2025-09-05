@echo off
echo 🚀 Setting up SaaS Starter Template...

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ and try again.
    pause
    exit /b 1
)

echo ✅ Node.js detected

REM Install dependencies
echo 📦 Installing dependencies...
npm install

REM Copy environment file
if not exist .env.local (
    echo 📋 Creating .env.local from .env.example...
    copy .env.example .env.local
    echo ⚠️  Please update .env.local with your actual configuration values
) else (
    echo ⚠️  .env.local already exists, skipping...
)

echo.
echo 🎉 Setup complete!
echo.
echo Next steps:
echo 1. Update .env.local with your Firebase, Stripe, and MongoDB credentials
echo 2. Run 'npm run dev' to start the development server
echo 3. Visit http://localhost:3000 to see your application
echo.
echo 📖 For detailed setup instructions, see README.md
pause
