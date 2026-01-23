# Portfolio Template Guide

This repository is designed to be a foundation for creating multiple portfolio templates.

## How to Edit Content

The content for the portfolio (Name, Bio, Projects, Skills) is separated from the design.
To update your information, edit the file:

`src/data/placeholderData.ts`

This file exports a `portfolioData` object that follows the strict type definition found in `src/types/Portfolio.ts`.

### Images
You can use any image URL (remote or local). If using local images, place them in the `public/` directory and reference them starting with `/` (e.g., `/photos/my-photo.jpg`).

## How to Add a New Template

This architecture allows for multiple "themes" or "templates" to coexist.

1.  **Create a Directory**: Create a new folder in `src/templates/`, e.g., `src/templates/Modern/`.
2.  **Create Components**:
    *   Create a `Home.tsx` (The landing page).
    *   Create a `ProjectDetail.tsx` (The single project view).
    *   Create a CSS file (e.g., `Modern.css`) or use Styled Components/Tailwind.
3.  **Accept Data Props**: Ensure your components accept the `PortfolioData` props.
    ```tsx
    interface Props {
      data: PortfolioData;
    }
    ```
4.  **Register the Template**:
    *   Currently, the `App.tsx` manually imports `ClassicHome` and `ClassicProjectDetail`.
    *   To switch templates, you can change the imports in `App.tsx`.
    *   *Future Goal*: Build a "Template Switcher" in the UI that lets users preview different templates dynamically.

## Data Structure

The `PortfolioData` interface (`src/types/Portfolio.ts`) enforces a consistent structure:

*   **Profile**: Personal info, social links.
*   **Skills**: List of technical skills with icons.
*   **Projects**: Array of project objects. Each project has:
    *   `id`: Unique slug for the URL.
    *   `content`: Structured fields like `overview`, `solution`, `results`.
    *   `galleryImages`: Array of images for the project.
