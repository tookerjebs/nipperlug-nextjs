# Contributing to Nipperlug

Contributions are welcome. Whether you're fixing bugs, optimizing code, improving responsiveness, adding features, correcting errors, enhancing documentation, or updating game data.

## Prerequisites

Before you start, make sure you have these installed:

- **Git** - [Download here](https://git-scm.com/downloads)
- **Node.js** (v18 or later) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **A code editor** - For example [VS Code](https://code.visualstudio.com/)

To verify your installations, run:
```bash
git --version
node --version
npm --version
```

## Getting Started

1. **Fork the repository** - Click the "Fork" button at the top right of the GitHub page
2. **Clone your fork** and install dependencies (see [README](README.md) for setup instructions)
3. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   # or for bug fixes:
   git checkout -b fix/bug-description
   ```
4. **Make your changes** and test locally with `npm run dev`
5. **Test the production build** with `npm run build` before submitting
6. **Commit your changes** with clear, descriptive messages:
   ```bash
   git add .
   git commit -m "Add: brief description of your changes"
   ```
7. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```
8. **Create a Pull Request** - Go to your fork on GitHub and click "Compare & pull request"

### Syncing Your Fork

Keep your fork up to date with the main repository:

```bash
# Add the original repository as upstream (one time only)
git remote add upstream https://github.com/tookerjebs/nipperlug-nextjs.git

# Fetch and merge updates
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

## Important Guidelines

**Intellectual Property**: Do not add copyrighted materials without permission. Cabal Online content is owned by ESTsoft Corp. Only use publicly available game data for informational purposes.