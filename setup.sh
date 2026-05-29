#!/bin/bash

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🎉 Event Invitations Platform - Setup Script${NC}"
echo -e "${YELLOW}========================================${NC}"
echo ""

# Check Node.js version
echo -e "${YELLOW}Checking Node.js version...${NC}"
node_version=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)

if [ "$node_version" -lt 18 ]; then
  echo -e "${RED}❌ Node.js 18.17.0 or higher is required${NC}"
  echo "   Current version: $(node -v)"
  echo "   Download from: https://nodejs.org/"
  exit 1
fi
echo -e "${GREEN}✓ Node.js $(node -v)${NC}"

# Check npm
echo -e "${YELLOW}Checking npm...${NC}"
echo -e "${GREEN}✓ npm $(npm -v)${NC}"

# Install dependencies
echo ""
echo -e "${YELLOW}Installing dependencies...${NC}"
npm install

if [ $? -ne 0 ]; then
  echo -e "${RED}❌ Failed to install dependencies${NC}"
  exit 1
fi
echo -e "${GREEN}✓ Dependencies installed${NC}"

# Setup database
echo ""
echo -e "${YELLOW}Setting up database...${NC}"
npx prisma db push --skip-generate

if [ $? -ne 0 ]; then
  echo -e "${RED}❌ Failed to setup database${NC}"
  exit 1
fi
echo -e "${GREEN}✓ Database configured${NC}"

# Generate Prisma Client
echo ""
echo -e "${YELLOW}Generating Prisma Client...${NC}"
npx prisma generate
echo -e "${GREEN}✓ Prisma Client generated${NC}"

# Success message
echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}✅ Setup completed successfully!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "  1. Start the development server:"
echo -e "     ${GREEN}npm run dev${NC}"
echo ""
echo "  2. Open your browser:"
echo -e "     ${GREEN}http://localhost:3000${NC}"
echo ""
echo -e "${YELLOW}Useful commands:${NC}"
echo -e "  ${GREEN}npm run dev${NC}        - Start development server"
echo -e "  ${GREEN}npm run build${NC}      - Build for production"
echo -e "  ${GREEN}npm run lint${NC}       - Run ESLint"
echo -e "  ${GREEN}npx prisma studio${NC} - Open database viewer"
echo ""
