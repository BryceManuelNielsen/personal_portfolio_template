# Portfolio App & CMS

This is a React-based Portfolio Application that includes a **built-in Content Management System (CMS)**.

## Key Features

1.  **Multi-Template System**: Switch between different designs instantly.
2.  **Live Editor**: Edit your profile, skills, and projects directly in the browser via `/dashboard`.
3.  **Template Generator**: A tool to help you create new designs by generating boilerplate code.
4.  **Local Storage Persistence**: Your changes are saved to your browser's local storage, so they persist across refreshes (in this frontend-only demo).

## Getting Started

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Run Development Server**
    ```bash
    npm run dev
    ```

3.  **Access the Dashboard**
    *   Navigate to `http://localhost:5173/dashboard` to manage your content.

## Project Structure

*   `src/context`: State management using React Context.
*   `src/data`: Initial placeholder data.
*   `src/pages/Dashboard`: The CMS UI components.
*   `src/templates`: The directory where design templates live.
    *   `src/templates/registry.ts`: The central registry mapping IDs to components.

## Creating a New Template

1.  Go to **Dashboard > Template Generator**.
2.  Enter a name for your theme (e.g., "Cyberpunk").
3.  Copy the generated CSS and React code.
4.  Create the files in `src/templates/Cyberpunk/`.
5.  Register your new template in `src/templates/registry.ts`.
    ```typescript
    import CyberpunkHome from './Cyberpunk/Home';
    // ...
    export const templates = {
      // ...
      cyberpunk: {
        name: 'Cyberpunk 2077',
        Home: CyberpunkHome,
        // ...
      }
    }
    ```
