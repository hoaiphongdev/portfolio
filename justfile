# Portfolio project commands

# Dev/prod server port. Must match the --port flag in package.json's scripts.
port := "3008"

# Install dependencies (clean install)
install:
    @echo "\033[1;34m🗑️  Removing node_modules...\033[0m"
    rm -rf node_modules
    @echo "\033[1;32m📦 Installing dependencies...\033[0m"
    pnpm install
    @echo "\033[1;32m✅ Done!\033[0m"

# Run development server (clears .next, frees the port, then starts dev)
run:
    @echo "\033[1;34m🗑️  Cleaning .next folder...\033[0m"
    rm -rf .next
    @echo "\033[1;35m🔪 Freeing port {{port}}...\033[0m"
    -@lsof -ti:{{port}} | xargs kill -9 2>/dev/null
    @echo "\033[1;36m📋 Copying .env.dev to .env...\033[0m"
    @test -f .env.dev || (echo "\033[1;31m❌ .env.dev not found - copy .env.example to .env.dev first\033[0m" && exit 1)
    cp .env.dev .env
    @echo "\033[1;33m🚀 Starting dev server on port {{port}}...\033[0m"
    pnpm dev

# Build and run production server (frees the port just before serving)
prod:
    @echo "\033[1;34m🗑️  Cleaning .next folder...\033[0m"
    rm -rf .next
    @echo "\033[1;36m📋 Copying .env.prod to .env...\033[0m"
    @test -f .env.prod || (echo "\033[1;31m❌ .env.prod not found - copy .env.example to .env.prod first\033[0m" && exit 1)
    cp .env.prod .env
    @echo "\033[1;35m🔨 Building for production...\033[0m"
    pnpm build
    @echo "\033[1;35m🔪 Freeing port {{port}}...\033[0m"
    -@lsof -ti:{{port}} | xargs kill -9 2>/dev/null
    @echo "\033[1;32m🚀 Starting production server on port {{port}}...\033[0m"
    pnpm start
