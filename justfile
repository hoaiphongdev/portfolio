# Portfolio project commands

# Install dependencies (clean install)
install:
    @echo "\033[1;34m🗑️  Removing node_modules...\033[0m"
    rm -rf node_modules
    @echo "\033[1;32m📦 Installing dependencies...\033[0m"
    pnpm install
    @echo "\033[1;32m✅ Done!\033[0m"

# Run development server
dev:
    @echo "\033[1;34m🗑️  Cleaning .next folder...\033[0m"
    rm -rf .next
    @echo "\033[1;36m📋 Copying env.dev to .env...\033[0m"
    cp env.dev .env
    @echo "\033[1;33m🚀 Starting dev server on port 3008...\033[0m"
    pnpm dev

# Build and run production server
prod:
    @echo "\033[1;34m🗑️  Cleaning .next folder...\033[0m"
    rm -rf .next
    @echo "\033[1;36m📋 Copying env.prod to .env...\033[0m"
    cp env.prod .env
    @echo "\033[1;35m🔨 Building for production...\033[0m"
    pnpm build
    @echo "\033[1;32m🚀 Starting production server...\033[0m"
    pnpm start
