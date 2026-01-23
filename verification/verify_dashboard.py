from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    # 1. Check Dashboard
    print("Navigating to Dashboard...")
    page.goto("http://localhost:5173/dashboard")
    page.wait_for_selector("text=Welcome to your CMS")
    page.screenshot(path="verification/dashboard_welcome.png", full_page=True)

    # 2. Check Template Gallery
    print("Navigating to Template Gallery...")
    page.click("text=Template Gallery")
    page.wait_for_selector("text=Modern Minimalist")
    page.screenshot(path="verification/dashboard_gallery.png", full_page=True)

    # 3. Switch Template
    print("Switching to Modern Template...")
    # Find button for modern template (index 1 usually, or by name)
    # The modern template is the second one in the registry usually
    # We look for the "Select Theme" button inside the Modern card
    modern_card = page.locator(".dashboard-card").filter(has_text="Modern Minimalist")
    modern_card.get_by_role("button", name="Select Theme").click()

    # 4. Verify Home Page is now Modern
    print("Verifying Home Page...")
    page.goto("http://localhost:5173/")
    page.wait_for_selector(".modern-template") # Check for unique class
    page.screenshot(path="verification/home_modern.png", full_page=True)

    # 5. Edit Profile
    print("Editing Profile...")
    page.goto("http://localhost:5173/dashboard/profile")
    page.fill("input[name='name']", "Jules AI")

    # Handle alert before clicking save
    # In playwright for python sync, we set the handler before the action that triggers it
    page.on("dialog", lambda dialog: dialog.accept())
    page.click("text=Save Changes")

    # 6. Verify Profile Change on Home
    print("Verifying Profile Change...")
    page.goto("http://localhost:5173/")
    # Use first=True to avoid ambiguity error if name appears multiple times (header, footer, etc)
    expect(page.locator("text=Jules AI").first).to_be_visible()
    page.screenshot(path="verification/home_edited.png", full_page=True)

    print("All checks passed!")
    browser.close()

with sync_playwright() as playwright:
    run(playwright)
