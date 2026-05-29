@echo off
REM Color codes not available in batch, so we'll use simple text output

echo ========================================
echo Event Invitations Platform - Setup
echo ========================================
echo.

REM Check Node.js version
echo Checking Node.js version...
for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo Node.js %NODE_VERSION% found

REM Check npm
echo Checking npm...
for /f "tokens=*" %%i in ('npm -v') do set NPM_VERSION=%%i
echo npm %NPM_VERSION% found

REM Install dependencies
echo.
echo Installing dependencies...
call npm install
if errorlevel 1 (
  echo Failed to install dependencies
  exit /b 1
)
echo Dependencies installed

REM Setup database
echo.
echo Setting up database...
call npx prisma db push --skip-generate
if errorlevel 1 (
  echo Failed to setup database
  exit /b 1
)
echo Database configured

REM Generate Prisma Client
echo.
echo Generating Prisma Client...
call npx prisma generate
echo Prisma Client generated

REM Success message
echo.
echo ========================================
echo Setup completed successfully!
echo ========================================
echo.
echo Next steps:
echo   1. Start the development server:
echo      npm run dev
echo.
echo   2. Open your browser:
echo      http://localhost:3000
echo.
echo Useful commands:
echo   npm run dev        - Start development server
echo   npm run build      - Build for production
echo   npm run lint       - Run ESLint
echo   npx prisma studio - Open database viewer
echo.
pause
