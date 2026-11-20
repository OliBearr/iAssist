# iAssist · Interactive Prototype (UI - HTML, CSS & JS)
**ICT Assistance & Self-Service Support Platform**  
*Directly mapped from Figma "Elements" Page (`iAssist — Design System & Design Rationale`)*

---

## 📌 Overview
This prototype is an interactive, responsive, and dynamic web application built strictly in **HTML5, CSS3, and modern Vanilla JavaScript**, directly implementing the exact design system tokens, components, typography scale, and color palette from the **Elements Page** of the Figma design file (`Low-Fidelity Prototype`).

---

## 🎨 Elements Page Specifications Implemented

### 1. Logo & Branding
* **Asset Used:** `assets/iAssist - Transparent Background.png` placed in the `40px × 40px` logo badge (`border-radius: 10px`, background: `#303D82`).
* **Wordmark:** `Inter 20px Semi Bold (600)` with tracking `-0.02em` (`i` in `#303D82`, `Assist` in `#202B41`).
* **Subtitle:** `ICT Assistance & Self-Service Support` in `Inter 11px Medium (500) #66718A`.

### 2. Exact 13 Color Tokens
* **Primary:** `#303D82` (interactive actions, active tabs, buttons)
* **Primary Text:** `#202B41` (titles, body content)
* **Header Background:** `#202B60` (structural dark surfaces)
* **Supporting Text:** `#66718A` (placeholders, hints, captions)
* **Accent Tint:** `#EDF0FB` (selected pills, unread card bg)
* **Control Borders:** `#D6DCF1` (inputs, chip outlines)
* **Page Background:** `#F5F7FB` (main canvas background)
* **Card Borders & Dividers:** `#DFE4EE` (card strokes, dividers)
* **Surface:** `#FFFFFF` (cards, modals, inputs)
* **Header Supporting Text:** `#C2CAE8`
* **Semantic Status Colors:**
  * **Success:** Text/Border `#14796E` on `#EBFBF2` background
  * **Warning:** Text/Border `#966218` on `#FFF5E3` background
  * **Informational:** Text/Border `#1B5EAA` on `#EBF3FB` background

### 3. Typography Scale (Inter Font Family)
* **Display / Hero Title:** `28px Bold (700)`, line-height `36px`, tracking `-0.02em`
* **Screen / Page Title:** `22px Semi Bold (600)`, line-height `30px`, tracking `-0.01em`
* **Section Header:** `18px Semi Bold (600)`, line-height `26px`, tracking `-0.01em`
* **Card / Group Header:** `16px Semi Bold (600)`, line-height `22px`
* **Body / Reading Text:** `14px Regular (400)`, line-height `21px`
* **Form Field Value:** `14px Medium (500)`, line-height `20px`
* **Support Hint / Helper:** `12px Regular (400)`, line-height `17px`
* **Caption / Metadata:** `11px Medium (500)`, line-height `16px`, tracking `+0.01em`
* **Action / Button Label:** `14px Semi Bold (600)`, line-height `20px`
* **Navigation & Microcopy:** `12px Medium (500)`, line-height `16px`, tracking `+0.01em`

---

## 🚀 Key Features & Interactive Screens

1. **Top Presentation Controls**:
   * **Device Viewport Switcher**: Toggle between **📱 Mobile (Figma 390px × 844px frame)**, **📲 Tablet (768px frame)**, and **💻 Responsive Desktop (fluid web app view)**.
   * **Theme Switcher**: Instant toggle between **Light Mode** and **Dark Mode**.
   * **Reset Demo Data**: Restores sample tickets, notifications, and states to pristine default.

2. **Screen 1: Home / Find ICT Solutions (Node 19:20105)**:
   * Greeting: *"Troubleshoot with Confidence. Find clear, step-by-step solutions to everyday ICT problems, explore helpful guides, and request assistance whenever you need it."*
   * Live search input with exact placeholder: `"Search troubleshooting guides, topics, error codes..."`
   * 2x2 Category Cards (*Internet & Connectivity*, *Devices & Performance*, *Software & Applications*, *Accounts & Security*).
   * Active Ticket banner (`ICT-2026-0148`).
   * Secondary CTA card: *"Request ICT Assistance"*.

3. **Screen 2: Solutions Category Detail**:
   * Category filter chips with exact active/inactive states.
   * Guide cards with difficulty badges, estimated read time, and success rate tags.

4. **Screen 3: Guide Preview Screen**:
   * Metadata chips (Category, Difficulty, Time, 94% Solved).
   * Prerequisite checklist with interactive checkboxes.
   * Overview of steps summary list.
   * *"Start Troubleshooting Guide"* CTA button.

5. **Screen 4: Step-by-Step Troubleshooting Wizard**:
   * Progress stepper bar with percentage fill.
   * **Interactive Wi-Fi toggle simulator** in Step 1.
   * **Campus SSID selector** in Step 2 (`Campus-WiFi`, `Campus-Faculty-Secure`, `eduroam`).
   * **Terminal command copy box** in Step 4 (`ipconfig /renew && ipconfig /flushdns`).
   * **Resolution feedback card**:
     * *"Yes, Problem Solved"* → Opens Problem Resolved Screen.
     * *"No, I Still Need Help"* → Pre-fills Request Form!

6. **Screen 5: Problem Resolved Screen (Node 43:539)**:
   * Success card with green checkmark, rating stars (1 to 5), and navigation buttons.

7. **Screen 6: No Matching Solutions Found (Node 43:597)**:
   * Empty state card with search term retention and direct escalation button to request form.

8. **Screen 7: Request ICT Assistance Form (Node 19:20627 & Elements Page)**:
   * Problem Title, Category dropdown, Device/Equipment input (`Lenovo IdeaPad · Windows 11`), Contact Information (`alex.morgan@student.edu`), Problem Description with char counter, Steps Tried checklist, and file upload dropzone.
   * Dynamic ticket generator (`ICT-2026-0149`).

9. **Screen 8: Request Status Tracker / Confirmation**:
   * Ticket ID header, status chip (`Assigned to Technician`), 4-stage stepper timeline, and interactive student reply chat box with automated technician reply.

10. **Screen 9: My Support Requests (Node 43:1394)**:
    * Filter tabs (*All Requests, In Progress, Resolved, Empty State Demo*).
    * Clickable ticket cards leading to status trackers.
    * Empty state card matching Node 43:1394.

11. **Screen 10: Frequently Asked Questions (Node 19:20987)**:
    * Live FAQ search filter and category chips.
    * Accordion expand/collapse with chevron animations.

12. **Screen 11: Notifications Center**:
    * Unread/All tabs, live unread counter badges, and "Mark All as Read".

13. **Screen 12: Student Profile & Settings**:
    * Student profile card, interactive Edit Profile modal, and notification preferences.

---

## 💻 How to Run & Live Demo

### 🌐 Live Demo on GitHub Pages
* **URL:** [https://olibearr.github.io/iAssist/](https://olibearr.github.io/iAssist/)
* **GitHub Pages Configuration:**
  1. Go to repository **Settings** > **Pages**
  2. Under **Build and deployment** > **Source**, choose **Deploy from a branch**
  3. Under **Branch**, select `main` and folder `/(root)`
  4. Click **Save**. The live prototype will be published automatically.

### 🖥️ Local Execution
Simply open `index.html` in any modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari):
* **Double click `index.html`** or right click → **Open with > Chrome**.
* Completely self-contained: no server, bundler, or Node.js runtime required.
