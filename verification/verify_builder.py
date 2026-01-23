from playwright.sync_api import sync_playwright, expect
import time

def verify_builder():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        # 1. Start fresh
        page.goto("http://localhost:5173")
        page.on("dialog", lambda dialog: dialog.accept("Builder Test Portfolio"))

        page.wait_for_selector(".create-card")
        page.click(".create-card")
        page.wait_for_url(r"**/dashboard/**")
        print("Created portfolio")

        # 2. Go to Page Builder
        page.click("text=Page Builder")
        print("Navigated to Page Builder")

        # 3. Add Blocks to Home
        page.click("text=Hero Section")
        page.click("text=Project Grid")
        print("Added Hero & Project Grid to Home")

        # Verify Home Preview
        expect(page.locator(".dashboard-content").get_by_role("heading", name="Welcome", exact=True)).to_be_visible()

        page.click("text=Save Page")

        # 4. Switch to Project Builder
        print("Switching to Project Builder...")
        select = page.locator("select")
        select.select_option(index=1) # Select first project

        # 5. Add Block to Project
        page.click("text=Text Block")
        print("Added Text Block to Project")

        # Edit Text
        # The new text block has label "Text Block".
        # Click it in structure list (Left Sidebar). Use first to avoid "Add Block" button.
        page.locator("text=Text Block").first.click()

        # Update text in properties (Right Sidebar)
        # Find the textarea that contains "Lorem ipsum"
        page.locator("textarea", has_text="Lorem ipsum").fill("Custom Project Details")

        page.click("text=Save Page")
        print("Saved Project Page")

        # 6. Activate Custom Theme
        page.click("text=Theme Gallery")
        page.click("text=Use Custom Layout")

        # 7. View Public Site
        view_site_btn = page.locator("a", has_text="View Site")
        with context.expect_page() as new_page_info:
            view_site_btn.click()

        public_page = new_page_info.value
        public_page.wait_for_load_state()

        # Verify Home
        expect(public_page.get_by_role("heading", name="Welcome", exact=True)).to_be_visible()

        # Verify Navigation to Project
        # Click "View Details" in the first project card
        public_page.locator("text=View Details").first.click()

        # Verify Project Page Content
        expect(public_page.get_by_text("Custom Project Details")).to_be_visible()
        print("Verified Project Page Custom Content")

        browser.close()

if __name__ == "__main__":
    verify_builder()
    print("Builder Verification Passed!")
