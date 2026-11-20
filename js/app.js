/**
 * iAssist — Design System & Interactive Prototype Application Logic
 * Directly mapped from Figma "Elements" Page (Artboard: iAssist — Design System)
 */

(function () {
  'use strict';

  // ==========================================================================
  // Mock Data & Initial State (Elements Page Specifications)
  // ==========================================================================
  const INITIAL_GUIDES = [
    {
      id: 'wifi-connect',
      category: 'internet',
      title: 'Cannot connect to campus Wi-Fi network',
      popular: true,
      stepsCount: 5,
      time: '3–5 mins',
      difficulty: 'Beginner',
      successRate: '94%',
      tags: ['wifi', 'network', 'campus-wifi', 'internet', 'connection', 'password'],
      prerequisites: [
        'Active student ID and enrolled semester status',
        'Wi-Fi adapter enabled on your laptop, phone, or tablet',
        'Within physical range of Campus-WiFi access points'
      ],
      steps: [
        {
          index: 1,
          title: 'Turn Wi-Fi off and wait 10 seconds',
          instruction: 'Toggling your device network adapter resets the local wireless cache and clears temporary IP conflicts. Turn it off, wait 10 seconds, then toggle it back on.',
          simType: 'wifi-toggle'
        },
        {
          index: 2,
          title: 'Forget the campus network and reconnect',
          instruction: 'Cached certificates often expire between terms. Removing Campus-WiFi from your saved networks forces your device to request a fresh authentication handshake.',
          simType: 'network-select'
        },
        {
          index: 3,
          title: 'Verify student login credentials',
          instruction: 'Ensure your username includes the full institutional domain (@student.edu). Passwords are case-sensitive. If you recently updated your portal password, use the new one.',
          simType: 'credentials-tip'
        },
        {
          index: 4,
          title: 'Renew DHCP lease / Flush DNS cache',
          instruction: 'If your device receives an invalid 169.254.x.x IP address, release and renew your DHCP configuration using your operating system network diagnostics.',
          simType: 'terminal-cmd'
        },
        {
          index: 5,
          title: 'Check device date and time synchronization',
          instruction: 'Enterprise 802.1X campus networks reject authentication if your system clock deviates by more than 3 minutes from the university domain controller.',
          simType: 'clock-check'
        }
      ]
    },
    {
      id: 'slow-internet',
      category: 'internet',
      title: 'Slow or unstable internet connection in lecture halls',
      popular: false,
      stepsCount: 4,
      time: '4 mins',
      difficulty: 'Beginner',
      successRate: '88%',
      tags: ['slow', 'speed', 'bandwidth', 'disconnect', 'lag'],
      prerequisites: [
        'Connected to Campus-WiFi',
        'Close peer-to-peer or high-bandwidth background sync tasks'
      ],
      steps: [
        { index: 1, title: 'Disconnect background sync apps', instruction: 'Pause cloud sync drives and operating system updates during class.' },
        { index: 2, title: 'Switch between 2.4GHz and 5GHz bands', instruction: 'In high-density lecture halls, 5GHz provides much higher throughput.' },
        { index: 3, title: 'Restart network stack', instruction: 'Flush DNS resolver cache and clear local browser sockets.' },
        { index: 4, title: 'Move closer to nearest access point', instruction: 'Concrete building partitions can degrade RSSI signal quality.' }
      ]
    },
    {
      id: 'portal-timeout',
      category: 'internet',
      title: 'Student Portal login timeout & DNS error',
      popular: true,
      stepsCount: 3,
      time: '2 mins',
      difficulty: 'Beginner',
      successRate: '92%',
      tags: ['portal', 'login', 'dns', 'timeout', 'grades', 'enrollment'],
      prerequisites: ['Browser updated to latest version', 'Clear old portal cookies'],
      steps: [
        { index: 1, title: 'Flush local DNS cache', instruction: 'Clear stale DNS records pointing to former server clusters.' },
        { index: 2, title: 'Try Incognito / Private window', instruction: 'Bypasses corrupt session cookies and local cache storage.' },
        { index: 3, title: 'Use campus recommended DNS resolver', instruction: 'Configure DNS to use Internal Gateway or 1.1.1.1.' }
      ]
    },
    {
      id: 'computer-freezing',
      category: 'devices',
      title: 'Computer freezing or extreme thermal throttling',
      popular: true,
      stepsCount: 4,
      time: '6 mins',
      difficulty: 'Intermediate',
      successRate: '85%',
      tags: ['freeze', 'slow', 'laptop', 'crash', 'overheating', 'ram'],
      prerequisites: ['Save any open coursework files before testing'],
      steps: [
        { index: 1, title: 'Open Task Manager and check CPU/RAM usage', instruction: 'Identify memory-hogging background tasks and terminate unresponsive processes.' },
        { index: 2, title: 'Inspect vents and thermal airflow', instruction: 'Ensure laptop cooling intakes are unobstructed by soft surfaces.' },
        { index: 3, title: 'Run System File Checker (SFC)', instruction: 'Execute sfc /scannow in elevated command prompt to repair corrupted system files.' },
        { index: 4, title: 'Perform a clean restart', instruction: 'Use restart rather than shutdown to trigger full kernel initialization.' }
      ]
    },
    {
      id: 'ms-office-install',
      category: 'software',
      title: 'Microsoft 365 student license activation & install',
      popular: true,
      stepsCount: 4,
      time: '8 mins',
      difficulty: 'Beginner',
      successRate: '96%',
      tags: ['word', 'excel', 'powerpoint', 'office', 'license', 'microsoft', 'software'],
      prerequisites: ['Student email address with active enrollment'],
      steps: [
        { index: 1, title: 'Log in to portal.office.com', instruction: 'Sign in using your institutional email (@student.edu).' },
        { index: 2, title: 'Click Install Office button', instruction: 'Download the official 64-bit deployment package.' },
        { index: 3, title: 'Run setup and authenticate license', instruction: 'Launch Word, click Sign In at top right, and complete 2FA.' },
        { index: 4, title: 'Verify active subscription status', instruction: 'Under File > Account, confirm Subscription Product for Students.' }
      ]
    },
    {
      id: 'password-reset',
      category: 'accounts',
      title: 'Student email & portal password reset',
      popular: true,
      stepsCount: 3,
      time: '3 mins',
      difficulty: 'Beginner',
      successRate: '98%',
      tags: ['password', 'account', 'reset', 'forgot', 'email', 'login', 'security'],
      prerequisites: ['Access to your registered recovery mobile phone number'],
      steps: [
        { index: 1, title: 'Access Self-Service Password Reset (SSPR)', instruction: 'Navigate to passwordreset.microsoftonline.com.' },
        { index: 2, title: 'Enter student ID email and CAPTCHA', instruction: 'Provide your alex.morgan@student.edu identifier.' },
        { index: 3, title: 'Verify SMS security code', instruction: 'Enter the 6-digit one-time PIN sent to your phone and establish a new 12-character passphrase.' }
      ]
    }
  ];

  const INITIAL_FAQS = [
    {
      id: 'faq-1',
      category: 'Using iAssist',
      question: 'How do I submit an ICT assistance request?',
      answer: 'You can submit a request anytime by tapping the <strong>Request ICT Assistance</strong> button on the Home screen or in the Requests tab. Fill in your problem title, select the relevant category and affected device, provide a brief description, and attach screenshots if applicable. Once submitted, our technical helpdesk will triage and assign a technician within regular operating hours.'
    },
    {
      id: 'faq-2',
      category: 'Using iAssist',
      question: 'How long does it take for a request to be resolved?',
      answer: 'Standard requests are triaged within <strong>2 to 4 hours</strong> on weekdays (8:00 AM – 5:00 PM). Minor issues (e.g. password resets, Wi-Fi driver configs) are usually solved within the same day. Complex hardware issues or laboratory system problems may take 24–48 hours.'
    },
    {
      id: 'faq-3',
      category: 'Using iAssist',
      question: 'Can I track the status of my submitted request?',
      answer: 'Yes! Navigate to the <strong>Requests</strong> tab at the bottom of the screen. You can tap on any ticket to view its interactive 4-stage progress tracker, assigned technician name, diagnostic notes, and send real-time follow-up messages.'
    },
    {
      id: 'faq-4',
      category: 'Internet & Connectivity',
      question: 'What should I do if my Wi-Fi keeps disconnecting in the Library?',
      answer: 'Library thick wall partitions can cause roaming conflicts between access points. Go to your Wi-Fi settings, select <em>Forget Network</em> on <strong>Campus-WiFi</strong>, restart your device, and reconnect. If the problem persists, try our step-by-step troubleshooting guide or visit the ICT Office at Rm 204.'
    },
    {
      id: 'faq-5',
      category: 'Using iAssist',
      question: 'Who can I contact for urgent ICT issues during midterms or finals?',
      answer: 'For emergency ICT issues during examinations or laboratory classes, please visit the <strong>ICT Support Department Office at Room 204</strong>, or have your proctor call local hotline <strong>ext. 105</strong> for priority on-site dispatch.'
    },
    {
      id: 'faq-6',
      category: 'Accounts & Security',
      question: 'How do I reset my student portal password?',
      answer: 'Use the Microsoft Self-Service Password Reset portal (SSPR) or follow our <em>Student Email & Portal Password Reset</em> guide in the Solutions tab. You will receive an SMS verification code to your enrolled phone number.'
    }
  ];

  const INITIAL_REQUESTS = [
    {
      id: 'ICT-2026-0148',
      title: 'Cannot connect to campus Wi-Fi in Library',
      category: 'Internet & Connectivity',
      device: 'Lenovo IdeaPad · Windows 11',
      location: 'Main Library 2nd Floor (Quiet Zone)',
      status: 'Assigned to Technician',
      statusCode: 'in_progress',
      date: '08 Nov 2026 · 9:42 AM',
      description: 'Whenever I open my laptop in the 2nd floor library reading area, Campus-WiFi shows "Can\'t connect to this network". My phone connects fine, but laptop fails authentication.',
      stepsTried: ['Turned Wi-Fi off and back on', 'Forgot campus network', 'Followed troubleshooting guide'],
      technician: 'Engr. R. Santos (ICT Support Team)',
      timeline: [
        { time: '08 Nov · 9:42 AM', title: 'Request Submitted', text: 'Assistance request logged by Alex Morgan.', isTech: false },
        { time: '08 Nov · 10:15 AM', title: 'Assigned to Technician', text: 'Assigned to Engr. R. Santos. Remote wireless log inspection queued.', isTech: true },
        { time: '08 Nov · 11:30 AM', title: 'Technician Note', text: 'AP 204-East showed multiple EAPoL handshake timeouts for your MAC address. Please bring your laptop to Rm 204 if updating the Intel wireless driver does not clear the error.', isTech: true }
      ]
    },
    {
      id: 'ICT-2026-0126',
      title: 'Coursework upload restored on Student Portal',
      category: 'Software & Applications',
      device: 'MacBook Air (macOS Sonoma)',
      location: 'Off-campus / Remote',
      status: 'Resolved',
      statusCode: 'resolved',
      date: '07 Nov 2026 · 3:15 PM',
      description: 'Could not upload PDF project submission for IS 201 due to HTTP 413 file size error.',
      stepsTried: ['Cleared browser cache', 'Compressed PDF'],
      technician: 'Ms. K. Del Rosario (MIS Support)',
      timeline: [
        { time: '07 Nov · 3:15 PM', title: 'Submitted', text: 'Ticket logged.', isTech: false },
        { time: '07 Nov · 4:20 PM', title: 'Resolved', text: 'Portal payload limit adjusted to 25MB. Upload verified successfully.', isTech: true }
      ]
    },
    {
      id: 'ICT-2026-0118',
      title: 'Student email password reset',
      category: 'Accounts & Security',
      device: 'iPhone 14',
      location: 'Campus Wide',
      status: 'Closed',
      statusCode: 'closed',
      date: '28 Oct 2026 · 10:20 AM',
      description: 'Forgot 2FA backup phone number after changing SIM card.',
      stepsTried: ['Tried SMS verification'],
      technician: 'Mr. A. Ramos (Security Admin)',
      timeline: [
        { time: '28 Oct · 10:20 AM', title: 'Submitted', text: 'Ticket submitted with Student ID verification.', isTech: false },
        { time: '28 Oct · 11:00 AM', title: 'Closed', text: 'Identity validated and recovery phone updated.', isTech: true }
      ]
    }
  ];

  const INITIAL_NOTIFICATIONS = [
    {
      id: 'notif-1',
      title: 'Your request has been submitted',
      desc: 'ICT-2026-0148 · Cannot connect to campus Wi-Fi in Library',
      timestamp: '08 Nov 2026 · 9:42 AM',
      unread: true,
      type: 'ticket',
      targetId: 'ICT-2026-0148'
    },
    {
      id: 'notif-2',
      title: 'Your file upload issue has been resolved',
      desc: 'ICT-2026-0126 · Coursework upload restored on Student Portal',
      timestamp: '07 Nov 2026 · 3:15 PM',
      unread: true,
      type: 'ticket',
      targetId: 'ICT-2026-0126'
    },
    {
      id: 'notif-3',
      title: 'New troubleshooting guide published',
      desc: 'Updated student guide for Microsoft 365 licensing & 2FA registration.',
      timestamp: '05 Nov 2026 · 11:08 AM',
      unread: false,
      type: 'guide',
      targetId: 'ms-office-install'
    },
    {
      id: 'notif-4',
      title: 'Support request closed',
      desc: 'ICT-2026-0118 · Student email password reset has been closed.',
      timestamp: '28 Oct 2026 · 10:20 AM',
      unread: false,
      type: 'ticket',
      targetId: 'ICT-2026-0118'
    }
  ];

  // ==========================================================================
  // App State Controller
  // ==========================================================================
  const State = {
    activeView: 'view-home',
    viewHistory: ['view-home'],
    guides: INITIAL_GUIDES,
    faqs: INITIAL_FAQS,
    requests: INITIAL_REQUESTS,
    notifications: INITIAL_NOTIFICATIONS,
    currentCategory: 'internet',
    currentGuide: INITIAL_GUIDES[0],
    wizardStepIndex: 0,
    currentTicket: INITIAL_REQUESTS[0],
    showEmptyRequestsDemo: false,
    uploadedFiles: [],
    theme: 'light',
    viewportMode: 'responsive',
    viewportWidth: 1440,
    viewportHeight: 900,

    init() {
      try {
        const storedRequests = localStorage.getItem('iassist_v2_requests');
        if (storedRequests) this.requests = JSON.parse(storedRequests);

        const storedNotifs = localStorage.getItem('iassist_v2_notifications');
        if (storedNotifs) this.notifications = JSON.parse(storedNotifs);

        const storedTheme = localStorage.getItem('iassist_theme');
        if (storedTheme) this.theme = storedTheme;

        const storedMode = localStorage.getItem('iassist_mode');
        if (storedMode) this.viewportMode = storedMode;

        const storedW = localStorage.getItem('iassist_viewport_w');
        if (storedW) this.viewportWidth = parseInt(storedW, 10);

        const storedH = localStorage.getItem('iassist_viewport_h');
        if (storedH) this.viewportHeight = parseInt(storedH, 10);
      } catch (e) {
        console.warn('LocalStorage error:', e);
      }
    },

    save() {
      try {
        localStorage.setItem('iassist_v2_requests', JSON.stringify(this.requests));
        localStorage.setItem('iassist_v2_notifications', JSON.stringify(this.notifications));
        localStorage.setItem('iassist_theme', this.theme);
        localStorage.setItem('iassist_mode', this.viewportMode);
        localStorage.setItem('iassist_viewport_w', this.viewportWidth);
        localStorage.setItem('iassist_viewport_h', this.viewportHeight);
      } catch (e) {}
    },

    resetData() {
      localStorage.removeItem('iassist_v2_requests');
      localStorage.removeItem('iassist_v2_notifications');
      this.requests = JSON.parse(JSON.stringify(INITIAL_REQUESTS));
      this.notifications = JSON.parse(JSON.stringify(INITIAL_NOTIFICATIONS));
      this.showEmptyRequestsDemo = false;
      this.save();
    }
  };

  // ==========================================================================
  // UI Controller & Renderers
  // ==========================================================================
  const UI = {
    elements: {
      viewportWrapper: document.getElementById('viewportWrapper'),
      appContainer: document.getElementById('appContainer'),
      appBody: document.getElementById('appContentBody'),
      searchBar: document.getElementById('mainSearchBar'),
      searchDropdown: document.getElementById('searchResultsDropdown'),
      searchClearBtn: document.getElementById('searchClearBtn'),
      notifCountBadges: document.querySelectorAll('.notif-badge-count'),
      activeRequestsCountBadge: document.getElementById('activeRequestsBadge'),
      toastContainer: document.getElementById('toastContainer')
    },

    init() {
      this.applyTheme(State.theme);
      this.applyViewportMode(State.viewportMode);
      this.updateBadges();
      this.renderHome();
      this.renderRequestsList();
      this.renderFAQs();
      this.renderNotifications();
      this.bindEvents();
    },

    // View Navigation
    navigateTo(viewId, pushHistory = true) {
      if (!viewId) return;
      const targetScreen = document.getElementById(viewId);
      if (!targetScreen) {
        console.error('View target not found:', viewId);
        return;
      }

      document.querySelectorAll('.view-screen').forEach(el => el.classList.remove('active'));
      targetScreen.classList.add('active');

      if (pushHistory && State.activeView !== viewId) {
        State.viewHistory.push(viewId);
      }
      State.activeView = viewId;

      if (this.elements.appBody) {
        this.elements.appBody.scrollTop = 0;
      }

      this.syncBottomNav(viewId);
      this.syncDesktopNav(viewId);
    },

    goBack() {
      if (State.viewHistory.length > 1) {
        State.viewHistory.pop();
        const prev = State.viewHistory[State.viewHistory.length - 1];
        this.navigateTo(prev, false);
      } else {
        this.navigateTo('view-home', false);
      }
    },

    syncBottomNav(viewId) {
      document.querySelectorAll('.nav-tab-btn').forEach(btn => btn.classList.remove('active'));
      let tabKey = 'home';
      if (viewId === 'view-home' || viewId === 'view-search-empty') tabKey = 'home';
      else if (viewId.startsWith('view-category') || viewId.startsWith('view-guide') || viewId === 'view-resolved') tabKey = 'solutions';
      else if (viewId.startsWith('view-request')) tabKey = 'requests';
      else if (viewId === 'view-faqs') tabKey = 'faqs';
      else if (viewId === 'view-profile' || viewId === 'view-notifications') tabKey = 'profile';

      const matchBtn = document.querySelector(`.nav-tab-btn[data-tab="${tabKey}"]`);
      if (matchBtn) matchBtn.classList.add('active');
    },

    syncDesktopNav(viewId) {
      document.querySelectorAll('.desktop-nav-link').forEach(btn => btn.classList.remove('active'));
      let tabKey = 'home';
      if (viewId === 'view-home' || viewId === 'view-search-empty') tabKey = 'home';
      else if (viewId.startsWith('view-category') || viewId.startsWith('view-guide') || viewId === 'view-resolved') tabKey = 'solutions';
      else if (viewId === 'view-request-form') tabKey = 'request-assistance';
      else if (viewId.startsWith('view-request')) tabKey = 'requests';
      else if (viewId === 'view-faqs') tabKey = 'faqs';
      else if (viewId === 'view-notifications') tabKey = 'notifications';
      else if (viewId === 'view-profile') tabKey = 'profile';

      const matchBtn = document.querySelector(`.desktop-nav-link[data-tab="${tabKey}"]`);
      if (matchBtn) matchBtn.classList.add('active');
    },

    updateBadges() {
      const unreadCount = State.notifications.filter(n => n.unread).length;
      this.elements.notifCountBadges.forEach(badge => {
        badge.textContent = unreadCount;
        badge.style.display = unreadCount > 0 ? 'flex' : 'none';
      });

      const activeReqs = State.requests.filter(r => r.statusCode === 'in_progress').length;
      if (this.elements.activeRequestsCountBadge) {
        this.elements.activeRequestsCountBadge.textContent = activeReqs;
        this.elements.activeRequestsCountBadge.style.display = activeReqs > 0 ? 'inline-block' : 'none';
      }

      const desktopBadge = document.getElementById('desktopRequestsBadge');
      if (desktopBadge) {
        desktopBadge.textContent = activeReqs;
        desktopBadge.style.display = activeReqs > 0 ? 'inline-block' : 'none';
      }
    },

    showToast(message, type = 'info') {
      if (!this.elements.toastContainer) return;
      const toast = document.createElement('div');
      toast.className = `toast-message ${type}`;
      toast.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
          ${type === 'success' 
            ? '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>'
            : '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>'}
        </svg>
        <span>${message}</span>
      `;
      this.elements.toastContainer.appendChild(toast);
      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        toast.style.transition = 'all 200ms ease';
        setTimeout(() => toast.remove(), 220);
      }, 3000);
    },

    applyTheme(theme) {
      State.theme = theme;
      document.documentElement.setAttribute('data-theme', theme);
      const themeBtn = document.getElementById('themeToggleBtn');
      if (themeBtn) {
        themeBtn.innerHTML = theme === 'dark' 
          ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg> Light Mode`
          : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg> Dark Mode`;
      }
      State.save();
    },

    applyViewportMode(mode) {
      State.viewportMode = mode;
      if (this.elements.viewportWrapper) {
        this.elements.viewportWrapper.setAttribute('data-mode', mode);
      }
      document.querySelectorAll('.view-mode-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mode === mode);
      });

      const dimToolbar = document.getElementById('responsiveDimensionToolbar');
      const appViewport = document.getElementById('appViewport');

      if (mode === 'responsive') {
        if (dimToolbar) dimToolbar.classList.add('visible');
        this.setViewportDimensions(State.viewportWidth || 1440, State.viewportHeight || 900, true);
      } else {
        if (dimToolbar) dimToolbar.classList.remove('visible');
        if (appViewport) {
          appViewport.style.width = '';
          appViewport.style.height = '';
          appViewport.classList.remove('is-desktop');
          if (mode === 'tablet') {
            appViewport.classList.add('is-tablet');
            appViewport.classList.remove('is-mobile');
            this.updateResponsiveDynamics(768);
          } else {
            appViewport.classList.add('is-mobile');
            appViewport.classList.remove('is-tablet');
            this.updateResponsiveDynamics(390);
          }
        }
      }
      State.save();
    },

    setViewportDimensions(width, height, updatePreset = true) {
      const minW = 360;
      const maxW = Math.min(1600, window.innerWidth - 32);
      const minH = 480;
      const maxH = Math.min(1200, window.innerHeight - 70);

      const finalW = Math.max(minW, Math.min(maxW, Math.round(width)));
      const finalH = Math.max(minH, Math.min(maxH, Math.round(height)));

      State.viewportWidth = finalW;
      State.viewportHeight = finalH;

      const appViewport = document.getElementById('appViewport');
      if (appViewport && State.viewportMode === 'responsive') {
        appViewport.style.width = `${finalW}px`;
        appViewport.style.height = `${finalH}px`;
        this.updateResponsiveDynamics(finalW);
      }

      const wInput = document.getElementById('dimWidthInput');
      const hInput = document.getElementById('dimHeightInput');
      const wSlider = document.getElementById('dimWidthSlider');
      const dimTag = document.getElementById('windowDimensionTag');

      if (wInput && document.activeElement !== wInput) wInput.value = finalW;
      if (hInput && document.activeElement !== hInput) hInput.value = finalH;
      if (wSlider && document.activeElement !== wSlider) wSlider.value = finalW;
      if (dimTag) dimTag.textContent = `${finalW} × ${finalH} px`;

      if (updatePreset) {
        document.querySelectorAll('.preset-pill-btn').forEach(btn => {
          const pw = parseInt(btn.dataset.w, 10);
          const ph = parseInt(btn.dataset.h, 10);
          btn.classList.toggle('active', Math.abs(pw - finalW) <= 24 && Math.abs(ph - finalH) <= 24);
        });
      }
    },

    updateResponsiveDynamics(width) {
      const appViewport = document.getElementById('appViewport');
      if (!appViewport) return;

      const isDesktop = width >= 860;
      const isTablet = width >= 600 && width < 860;
      const isMobile = width < 600;

      appViewport.classList.toggle('is-desktop', isDesktop);
      appViewport.classList.toggle('is-tablet', isTablet);
      appViewport.classList.toggle('is-mobile', isMobile);

      const bottomNav = document.querySelector('.app-bottom-nav');
      if (bottomNav) {
        if (isDesktop) {
          bottomNav.style.setProperty('display', 'none', 'important');
        } else {
          bottomNav.style.removeProperty('display');
        }
      }

      this.syncDesktopNav(State.activeView);
    },

    // ==========================================================================
    // Render Functions
    // ==========================================================================
    renderHome() {
      const bannerContainer = document.getElementById('homeActiveTicketSlot');
      const inProgressTicket = State.requests.find(r => r.statusCode === 'in_progress');
      if (bannerContainer) {
        if (inProgressTicket) {
          bannerContainer.innerHTML = `
            <div class="active-ticket-banner" id="homeActiveTicketBanner" data-id="${inProgressTicket.id}">
              <div class="ticket-banner-left">
                <span class="ticket-banner-badge">
                  <span class="pulse-dot"></span>
                  Active Request · ${inProgressTicket.id}
                </span>
                <span class="ticket-banner-title">${inProgressTicket.title}</span>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </div>
          `;
          document.getElementById('homeActiveTicketBanner').addEventListener('click', () => {
            this.openRequestTracker(inProgressTicket.id);
          });
        } else {
          bannerContainer.innerHTML = '';
        }
      }
    },

    renderCategoryView(categoryId) {
      State.currentCategory = categoryId;
      const categoryTitles = {
        internet: { name: 'Internet & Connectivity', desc: 'Troubleshooting guides for campus Wi-Fi, local network, and student portal connectivity.' },
        devices: { name: 'Devices & Performance', desc: 'Step-by-step solutions for hardware freezes, laptop diagnostics, and battery management.' },
        software: { name: 'Software & Applications', desc: 'Installation guides for Microsoft 365, laboratory software, and license activation.' },
        accounts: { name: 'Accounts & Security', desc: 'Student portal password recovery, Microsoft 2FA enrollment, and identity assistance.' }
      };

      const meta = categoryTitles[categoryId] || categoryTitles.internet;
      document.getElementById('categoryTitle').textContent = meta.name;
      document.getElementById('categoryDesc').textContent = meta.desc;

      const guides = State.guides.filter(g => g.category === categoryId);
      const listEl = document.getElementById('categoryGuidesList');
      if (listEl) {
        listEl.innerHTML = guides.map(g => `
          <div class="guide-card" data-guide-id="${g.id}">
            <div class="guide-content-col">
              <div class="guide-badge-row">
                ${g.popular ? '<span class="badge-pill badge-popular">★ Most Popular</span>' : ''}
                <span class="badge-pill badge-steps">${g.stepsCount}-step guide</span>
              </div>
              <div class="guide-card-title">${g.title}</div>
              <div class="guide-meta-row">
                <span>⏱ ${g.time}</span>
                <span>•</span>
                <span>📶 ${g.difficulty}</span>
                <span>•</span>
                <span>✓ ${g.successRate} solved</span>
              </div>
            </div>
            <svg class="guide-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
        `).join('');

        listEl.querySelectorAll('.guide-card').forEach(card => {
          card.addEventListener('click', () => {
            this.openGuidePreview(card.dataset.guideId);
          });
        });
      }

      this.navigateTo('view-category');
    },

    openGuidePreview(guideId) {
      const guide = State.guides.find(g => g.id === guideId) || State.guides[0];
      State.currentGuide = guide;

      document.getElementById('previewGuideTitle').textContent = guide.title;
      document.getElementById('previewMetaCategory').textContent = guide.category.toUpperCase();
      document.getElementById('previewMetaDifficulty').textContent = guide.difficulty;
      document.getElementById('previewMetaTime').textContent = guide.time;
      document.getElementById('previewMetaRate').textContent = `${guide.successRate} Solved`;

      const checklistEl = document.getElementById('previewPrerequisitesList');
      if (checklistEl) {
        checklistEl.innerHTML = (guide.prerequisites || []).map((p, i) => `
          <li class="checklist-item">
            <input type="checkbox" id="prereq_${i}" checked>
            <label for="prereq_${i}">${p}</label>
          </li>
        `).join('');
      }

      const stepsSummaryEl = document.getElementById('previewStepsSummaryList');
      if (stepsSummaryEl) {
        stepsSummaryEl.innerHTML = (guide.steps || []).map(s => `
          <li class="step-summary-item">
            <div class="step-index-circle">${s.index}</div>
            <div class="step-summary-text">${s.title}</div>
          </li>
        `).join('');
      }

      this.navigateTo('view-guide-preview');
    },

    startWizard(guideId) {
      const guide = State.guides.find(g => g.id === guideId) || State.currentGuide;
      State.currentGuide = guide;
      State.wizardStepIndex = 0;
      this.renderWizardStep();
      this.navigateTo('view-guide-wizard');
    },

    renderWizardStep() {
      const guide = State.currentGuide;
      const step = guide.steps[State.wizardStepIndex];
      const total = guide.steps.length;

      document.getElementById('wizardStepCounter').textContent = `Step ${step.index} of ${total}`;
      const percent = Math.round(((State.wizardStepIndex + 1) / total) * 100);
      document.getElementById('wizardProgressFill').style.width = `${percent}%`;

      document.getElementById('wizardStepBadge').textContent = `Step ${step.index}`;
      document.getElementById('wizardStepTitle').textContent = step.title;
      document.getElementById('wizardStepInstruction').textContent = step.instruction;

      const simSlot = document.getElementById('wizardSimSlot');
      if (simSlot) {
        if (step.simType === 'wifi-toggle') {
          simSlot.innerHTML = `
            <div class="simulator-box">
              <div class="simulator-header">
                <span class="sim-label">📶 Wi-Fi Adapter Switch</span>
                <div class="toggle-switch-wrapper">
                  <span class="switch-label" id="wifiSwitchStateLabel">Enabled</span>
                  <label class="ios-switch">
                    <input type="checkbox" id="simWifiToggle" checked>
                    <span class="ios-slider"></span>
                  </label>
                </div>
              </div>
              <div class="sim-status-feedback" id="wifiSimFeedback">
                <span>✓ Connected to Campus-WiFi (No internet access)</span>
              </div>
            </div>
          `;

          const toggleInput = document.getElementById('simWifiToggle');
          const feedback = document.getElementById('wifiSimFeedback');
          const label = document.getElementById('wifiSwitchStateLabel');
          toggleInput.addEventListener('change', () => {
            if (!toggleInput.checked) {
              label.textContent = 'Disabled';
              feedback.innerHTML = `<span>⏳ Wi-Fi adapter is OFF. Please wait 10 seconds before turning back on...</span>`;
              feedback.style.color = 'var(--status-warning-text)';
            } else {
              label.textContent = 'Enabled';
              feedback.innerHTML = `<span>✓ Adapter re-enabled. IP address re-negotiated successfully!</span>`;
              feedback.style.color = 'var(--status-success-text)';
              UI.showToast('Wi-Fi adapter reset successfully!', 'success');
            }
          });
        } else if (step.simType === 'network-select') {
          simSlot.innerHTML = `
            <div class="simulator-box">
              <div class="simulator-header">
                <span class="sim-label">📡 Campus Networks Detected</span>
                <span style="font-size:12px; color:var(--color-supporting-text)">Tap to test</span>
              </div>
              <div class="network-list-sim">
                <div class="network-sim-item selected" data-ssid="Campus-WiFi">
                  <div class="network-sim-name">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>
                    <span>Campus-WiFi</span>
                  </div>
                  <span class="network-sim-action">Forget & Reconnect</span>
                </div>
                <div class="network-sim-item" data-ssid="Campus-Faculty-Secure">
                  <div class="network-sim-name">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>
                    <span>Campus-Faculty-Secure</span>
                  </div>
                  <span class="network-sim-action">Restricted</span>
                </div>
                <div class="network-sim-item" data-ssid="eduroam">
                  <div class="network-sim-name">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>
                    <span>eduroam</span>
                  </div>
                  <span class="network-sim-action">Roaming</span>
                </div>
              </div>
            </div>
          `;

          simSlot.querySelectorAll('.network-sim-item').forEach(item => {
            item.addEventListener('click', () => {
              simSlot.querySelectorAll('.network-sim-item').forEach(i => i.classList.remove('selected'));
              item.classList.add('selected');
              UI.showToast(`Selected "${item.dataset.ssid}". Stored certificates flushed.`, 'info');
            });
          });
        } else if (step.simType === 'terminal-cmd') {
          simSlot.innerHTML = `
            <div class="terminal-box">
              <code>ipconfig /renew && ipconfig /flushdns</code>
              <button class="copy-cmd-btn" id="copyCmdBtn">Copy Command</button>
            </div>
            <p style="font-size:12px; color:var(--color-supporting-text); margin-bottom:12px;">Open Command Prompt (Windows) or Terminal (Mac) as administrator and paste.</p>
          `;
          document.getElementById('copyCmdBtn').addEventListener('click', () => {
            navigator.clipboard?.writeText('ipconfig /renew && ipconfig /flushdns');
            UI.showToast('Copied to clipboard: ipconfig /renew && ipconfig /flushdns', 'success');
          });
        } else {
          simSlot.innerHTML = '';
        }
      }

      const prevBtn = document.getElementById('wizardPrevBtn');
      const nextBtn = document.getElementById('wizardNextBtn');

      prevBtn.disabled = State.wizardStepIndex === 0;
      prevBtn.style.opacity = State.wizardStepIndex === 0 ? '0.5' : '1';

      if (State.wizardStepIndex === total - 1) {
        nextBtn.innerHTML = `Finish Guide <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
      } else {
        nextBtn.innerHTML = `Next Step <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><polyline points="9 18 15 12 9 6"></polyline></svg>`;
      }
    },

    populateRequestForm(prefillData = {}) {
      if (prefillData.title) {
        document.getElementById('formProblemTitle').value = prefillData.title;
      }
      if (prefillData.category) {
        document.getElementById('formCategorySelect').value = prefillData.category;
      }
      if (prefillData.description) {
        document.getElementById('formProblemDesc').value = prefillData.description;
      }
      this.navigateTo('view-request-form');
    },

    submitAssistanceRequest(formData) {
      const newIdNumber = 148 + State.requests.length + 1;
      const ticketId = `ICT-2026-0${newIdNumber}`;
      const now = new Date();
      const dateString = `${now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} · ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

      const newTicket = {
        id: ticketId,
        title: formData.title,
        category: formData.category,
        device: formData.device,
        location: formData.location || 'University Campus Network',
        status: 'Assigned to Technician',
        statusCode: 'in_progress',
        date: dateString,
        description: formData.description,
        stepsTried: formData.stepsTried || ['Followed step-by-step troubleshooter'],
        technician: 'Engr. R. Santos (ICT Support Team)',
        timeline: [
          { time: dateString, title: 'Request Submitted', text: 'Ticket successfully submitted by student Alex Morgan.', isTech: false },
          { time: 'Just now', title: 'Assigned to Helpdesk', text: 'Assigned to Technician Engr. R. Santos for diagnostics.', isTech: true }
        ]
      };

      State.requests.unshift(newTicket);

      State.notifications.unshift({
        id: `notif-${Date.now()}`,
        title: 'Your request has been submitted',
        desc: `${ticketId} · ${newTicket.title}`,
        timestamp: dateString,
        unread: true,
        type: 'ticket',
        targetId: ticketId
      });

      State.save();
      this.updateBadges();
      this.renderHome();
      this.renderRequestsList();
      this.renderNotifications();

      this.showToast(`Request ${ticketId} created successfully!`, 'success');
      this.openRequestTracker(ticketId);
    },

    openRequestTracker(ticketId) {
      const ticket = State.requests.find(r => r.id === ticketId) || State.requests[0];
      State.currentTicket = ticket;

      document.getElementById('trackerTicketRef').textContent = ticket.id;
      const statusBadge = document.getElementById('trackerStatusChip');
      statusBadge.textContent = ticket.status;
      statusBadge.className = `status-chip ${ticket.statusCode === 'resolved' ? 'resolved' : 'assigned'}`;

      document.getElementById('trackerDetailTitle').textContent = ticket.title;
      document.getElementById('trackerDetailCategory').textContent = ticket.category;
      document.getElementById('trackerDetailDevice').textContent = ticket.device;
      document.getElementById('trackerDetailLocation').textContent = ticket.location;
      document.getElementById('trackerDetailDesc').textContent = ticket.description;

      this.renderTrackerTimeline(ticket);
      this.navigateTo('view-request-tracker');
    },

    renderTrackerTimeline(ticket) {
      const timelineContainer = document.getElementById('trackerTimelineFeed');
      if (timelineContainer) {
        timelineContainer.innerHTML = (ticket.timeline || []).map(entry => `
          <div class="update-bubble ${entry.isTech ? 'from-tech' : ''}">
            <div class="update-header-line">
              <span>${entry.title}</span>
              <span style="font-weight:400; font-size:11px; color:var(--color-supporting-text);">${entry.time}</span>
            </div>
            <p>${entry.text}</p>
          </div>
        `).join('');
      }
    },

    renderRequestsList(filter = 'all') {
      const container = document.getElementById('requestsStackList');
      const emptyContainer = document.getElementById('requestsEmptyStateSlot');

      if (State.showEmptyRequestsDemo || State.requests.length === 0) {
        if (container) container.style.display = 'none';
        if (emptyContainer) emptyContainer.style.display = 'block';
        return;
      }

      if (container) container.style.display = 'flex';
      if (emptyContainer) emptyContainer.style.display = 'none';

      let filtered = State.requests;
      if (filter === 'in_progress') filtered = State.requests.filter(r => r.statusCode === 'in_progress');
      if (filter === 'resolved') filtered = State.requests.filter(r => r.statusCode === 'resolved' || r.statusCode === 'closed');

      if (container) {
        container.innerHTML = filtered.map(r => `
          <div class="request-card" data-ticket-id="${r.id}">
            <div class="request-card-header">
              <span class="request-ref">${r.id}</span>
              <span class="status-chip ${r.statusCode === 'resolved' ? 'resolved' : 'assigned'}">${r.status}</span>
            </div>
            <div class="request-card-title">${r.title}</div>
            <div style="font-size:13px; color:var(--color-supporting-text);">${r.category} · ${r.device}</div>
            <div class="request-card-footer">
              <span>📅 ${r.date}</span>
              <span style="color:var(--color-primary); font-weight:600;">Track Status →</span>
            </div>
          </div>
        `).join('');

        container.querySelectorAll('.request-card').forEach(card => {
          card.addEventListener('click', () => {
            this.openRequestTracker(card.dataset.ticketId);
          });
        });
      }
    },

    renderFAQs(searchQuery = '', filterCategory = 'all') {
      const listEl = document.getElementById('faqAccordionContainer');
      if (!listEl) return;

      let items = State.faqs;
      if (filterCategory !== 'all') {
        items = items.filter(f => f.category.toLowerCase().includes(filterCategory.toLowerCase()));
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        items = items.filter(f => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q));
      }

      if (items.length === 0) {
        listEl.innerHTML = `
          <div style="text-align:center; padding:32px 16px; color:var(--color-supporting-text); font-size:14px;">
            No FAQs matching your query. Need direct help? <button id="faqSubmitReqLink" style="color:var(--color-primary); text-decoration:underline; font-weight:600;">Submit a request</button>
          </div>
        `;
        document.getElementById('faqSubmitReqLink')?.addEventListener('click', () => {
          UI.navigateTo('view-request-form');
        });
        return;
      }

      listEl.innerHTML = items.map(f => `
        <div class="faq-accordion-item" data-faq-id="${f.id}">
          <button class="faq-trigger-btn" type="button">
            <span>${f.question}</span>
            <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          <div class="faq-content-drawer">
            <div class="faq-body-text">
              <p>${f.answer}</p>
            </div>
          </div>
        </div>
      `).join('');

      listEl.querySelectorAll('.faq-trigger-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const item = btn.closest('.faq-accordion-item');
          const isOpen = item.classList.contains('open');
          listEl.querySelectorAll('.faq-accordion-item').forEach(i => i.classList.remove('open'));
          if (!isOpen) item.classList.add('open');
        });
      });
    },

    renderNotifications(filter = 'all') {
      const listEl = document.getElementById('notificationsListStack');
      if (!listEl) return;

      let items = State.notifications;
      if (filter === 'unread') {
        items = items.filter(n => n.unread);
      }

      if (items.length === 0) {
        listEl.innerHTML = `
          <div style="text-align:center; padding:36px 16px; color:var(--color-supporting-text); font-size:14px;">
            No notifications in this folder.
          </div>
        `;
        return;
      }

      listEl.innerHTML = items.map(n => `
        <div class="notification-card ${n.unread ? 'unread' : ''}" data-id="${n.id}">
          <div class="notif-icon-box">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
          </div>
          <div class="notif-content">
            <div class="notif-title">${n.title}</div>
            <div class="notif-desc">${n.desc}</div>
            <div class="notif-timestamp">${n.timestamp}</div>
          </div>
        </div>
      `).join('');

      listEl.querySelectorAll('.notification-card').forEach(card => {
        card.addEventListener('click', () => {
          const notif = State.notifications.find(n => n.id === card.dataset.id);
          if (notif) {
            notif.unread = false;
            State.save();
            UI.updateBadges();
            card.classList.remove('unread');
            if (notif.type === 'ticket') {
              UI.openRequestTracker(notif.targetId);
            } else if (notif.type === 'guide') {
              UI.openGuidePreview(notif.targetId);
            }
          }
        });
      });
    },

    handleLiveSearch(query) {
      const q = query.trim().toLowerCase();
      const clearBtn = this.elements.searchClearBtn;
      if (clearBtn) clearBtn.style.display = q ? 'block' : 'none';

      if (!q) {
        this.elements.searchDropdown.classList.remove('visible');
        return;
      }

      const matches = [];
      State.guides.forEach(g => {
        const inTitle = g.title.toLowerCase().includes(q);
        const inTags = g.tags && g.tags.some(t => t.includes(q));
        if (inTitle || inTags) {
          matches.push({ type: 'guide', title: g.title, category: g.category.toUpperCase(), id: g.id });
        }
      });

      if (matches.length > 0) {
        this.elements.searchDropdown.innerHTML = matches.slice(0, 4).map(m => `
          <div class="search-result-item" data-id="${m.id}">
            <div>
              <div class="search-result-title">${m.title}</div>
              <div class="search-result-category">${m.category} GUIDE</div>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
        `).join('');

        this.elements.searchDropdown.querySelectorAll('.search-result-item').forEach(item => {
          item.addEventListener('click', () => {
            this.elements.searchDropdown.classList.remove('visible');
            this.openGuidePreview(item.dataset.id);
          });
        });

        this.elements.searchDropdown.classList.add('visible');
      } else {
        this.elements.searchDropdown.classList.remove('visible');
      }
    },

    executeSearch(query) {
      const q = query.trim();
      if (!q) return;
      this.elements.searchDropdown.classList.remove('visible');

      const match = State.guides.find(g => 
        g.title.toLowerCase().includes(q.toLowerCase()) || 
        (g.tags && g.tags.some(t => t.includes(q.toLowerCase())))
      );

      if (match) {
        this.openGuidePreview(match.id);
      } else {
        document.getElementById('emptySearchTermLabel').textContent = `"${q}"`;
        document.getElementById('emptySearchInput').value = q;
        this.navigateTo('view-search-empty');
      }
    },

    // ==========================================================================
    // Event Listeners Binding
    // ==========================================================================
    bindEvents() {
      // 1. Presentation Bar Controls
      document.querySelectorAll('.view-mode-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          this.applyViewportMode(btn.dataset.mode);
        });
      });

      document.getElementById('themeToggleBtn')?.addEventListener('click', () => {
        const nextTheme = State.theme === 'light' ? 'dark' : 'light';
        this.applyTheme(nextTheme);
      });

      document.getElementById('resetDemoBtn')?.addEventListener('click', () => {
        if (confirm('Reset prototype demo tickets and notifications back to initial state?')) {
          State.resetData();
          this.updateBadges();
          this.renderHome();
          this.renderRequestsList();
          this.renderNotifications();
          this.navigateTo('view-home');
          this.showToast('Demo data successfully reset', 'info');
        }
      });

      // 2. Header Brand click -> Return to Home
      document.getElementById('headerBrandLogo')?.addEventListener('click', () => {
        this.navigateTo('view-home');
      });

      // 3. Header Action Icons
      document.getElementById('headerNotifBtn')?.addEventListener('click', () => {
        this.navigateTo('view-notifications');
      });

      document.getElementById('headerProfilePill')?.addEventListener('click', () => {
        this.navigateTo('view-profile');
      });

      // 4. Back Buttons (Breadcrumb navigation)
      document.querySelectorAll('.back-button-link').forEach(btn => {
        btn.addEventListener('click', () => {
          const target = btn.dataset.target;
          if (target) {
            this.navigateTo(target);
          } else {
            this.goBack();
          }
        });
      });

      // 5. Bottom Navigation Bar Tabs
      document.querySelectorAll('.nav-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const tab = btn.dataset.tab;
          if (tab === 'home') this.navigateTo('view-home');
          else if (tab === 'solutions') this.renderCategoryView('internet');
          else if (tab === 'requests') {
            this.renderRequestsList();
            this.navigateTo('view-requests-list');
          }
          else if (tab === 'faqs') this.navigateTo('view-faqs');
          else if (tab === 'profile') this.navigateTo('view-profile');
        });
      });

      // 6. Home Category Cards
      document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
          const cat = card.dataset.cat;
          this.renderCategoryView(cat);
        });
      });

      // 7. Home Search Input
      const searchInput = this.elements.searchBar;
      if (searchInput) {
        searchInput.addEventListener('input', (e) => {
          this.handleLiveSearch(e.target.value);
        });
        searchInput.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            this.executeSearch(e.target.value);
          }
        });
      }

      this.elements.searchClearBtn?.addEventListener('click', () => {
        if (searchInput) {
          searchInput.value = '';
          this.handleLiveSearch('');
        }
      });

      document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
          this.elements.searchDropdown?.classList.remove('visible');
        }
      });

      // 8. Empty Search Screen Handlers
      document.getElementById('emptySearchInput')?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          this.executeSearch(e.target.value);
        }
      });

      document.getElementById('emptySearchRequestBtn')?.addEventListener('click', () => {
        const query = document.getElementById('emptySearchInput')?.value || '';
        this.populateRequestForm({
          title: query ? `Assistance request: ${query}` : '',
          description: query ? `I could not find a self-service solution for "${query}". Requesting assistance from the technical support team.` : ''
        });
      });

      // 9. Secondary Request Buttons
      document.getElementById('homeRequestCTABtn')?.addEventListener('click', () => {
        this.populateRequestForm();
      });
      document.getElementById('faqBottomRequestBtn')?.addEventListener('click', () => {
        this.populateRequestForm();
      });

      // 10. Guide Preview Start Button
      document.getElementById('startTroubleshootingBtn')?.addEventListener('click', () => {
        this.startWizard();
      });

      // 11. Wizard Navigation Stepper
      document.getElementById('wizardPrevBtn')?.addEventListener('click', () => {
        if (State.wizardStepIndex > 0) {
          State.wizardStepIndex--;
          this.renderWizardStep();
        }
      });

      document.getElementById('wizardNextBtn')?.addEventListener('click', () => {
        if (State.wizardStepIndex < State.currentGuide.steps.length - 1) {
          State.wizardStepIndex++;
          this.renderWizardStep();
        } else {
          document.querySelector('.resolution-feedback-card')?.scrollIntoView({ behavior: 'smooth' });
        }
      });

      // 12. Wizard Resolution Feedback Buttons
      document.getElementById('wizardResolvedYesBtn')?.addEventListener('click', () => {
        this.navigateTo('view-resolved');
      });

      document.getElementById('wizardResolvedNoBtn')?.addEventListener('click', () => {
        this.populateRequestForm({
          title: State.currentGuide.title,
          category: State.currentCategory === 'internet' ? 'Internet & Connectivity' : 'Devices & Performance',
          description: `I followed the step-by-step troubleshooting guide for "${State.currentGuide.title}" but the problem persists.`
        });
      });

      // 13. Problem Resolved Screen
      document.getElementById('resolvedBackHomeBtn')?.addEventListener('click', () => {
        this.navigateTo('view-home');
      });

      document.getElementById('resolvedBrowseMoreBtn')?.addEventListener('click', () => {
        this.renderCategoryView('internet');
      });

      document.querySelectorAll('.rating-star').forEach(star => {
        star.addEventListener('click', () => {
          const val = parseInt(star.dataset.val, 10);
          document.querySelectorAll('.rating-star').forEach((s, idx) => {
            s.classList.toggle('active', idx < val);
          });
          UI.showToast(`Thank you! Rated ${val} out of 5 stars.`, 'success');
        });
      });

      // 14. Request Form Character Counter & Submission
      const descInput = document.getElementById('formProblemDesc');
      const charCounter = document.getElementById('formCharCounter');
      descInput?.addEventListener('input', () => {
        if (charCounter) charCounter.textContent = `${descInput.value.length} / 500 characters`;
      });

      const dropzone = document.getElementById('formFileDropzone');
      const fileInput = document.getElementById('hiddenFileInput');
      const fileListSlot = document.getElementById('formUploadedFilesList');

      dropzone?.addEventListener('click', () => fileInput?.click());
      dropzone?.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.style.borderColor = 'var(--color-primary)';
      });
      dropzone?.addEventListener('dragleave', () => {
        dropzone.style.borderColor = 'var(--color-control-border)';
      });
      dropzone?.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.style.borderColor = 'var(--color-control-border)';
        if (e.dataTransfer?.files?.length) {
          handleFiles(e.dataTransfer.files);
        }
      });

      fileInput?.addEventListener('change', () => {
        if (fileInput.files?.length) handleFiles(fileInput.files);
      });

      function handleFiles(files) {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          State.uploadedFiles.push(file.name);
        }
        renderUploadedFiles();
        UI.showToast('Screenshot attached successfully', 'info');
      }

      function renderUploadedFiles() {
        if (!fileListSlot) return;
        fileListSlot.innerHTML = State.uploadedFiles.map((name, idx) => `
          <div class="uploaded-file-item">
            <span>📎 ${name}</span>
            <span class="file-remove-btn" data-idx="${idx}">✕</span>
          </div>
        `).join('');

        fileListSlot.querySelectorAll('.file-remove-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const index = parseInt(btn.dataset.idx, 10);
            State.uploadedFiles.splice(index, 1);
            renderUploadedFiles();
          });
        });
      }

      document.getElementById('assistanceForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('formProblemTitle').value.trim();
        const category = document.getElementById('formCategorySelect').value;
        const device = document.getElementById('formDeviceSelect').value;
        const location = document.getElementById('formLocationInput').value.trim();
        const description = document.getElementById('formProblemDesc').value.trim();

        if (!title || !description) {
          alert('Please fill in both the problem title and description.');
          return;
        }

        const stepsChecked = [];
        document.querySelectorAll('input[name="stepsTried"]:checked').forEach(c => stepsChecked.push(c.value));

        const submitBtn = document.getElementById('formSubmitBtn');
        submitBtn.disabled = true;
        submitBtn.innerHTML = `Submitting...`;

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `Submit Assistance Request`;
          UI.submitAssistanceRequest({
            title,
            category,
            device,
            location,
            description,
            stepsTried: stepsChecked
          });
        }, 500);
      });

      // 15. Student Message Reply to Technician in Status Tracker
      document.getElementById('ticketReplyBtn')?.addEventListener('click', () => {
        const input = document.getElementById('ticketReplyInput');
        const text = input.value.trim();
        if (!text) return;

        const ticket = State.currentTicket;
        if (!ticket) return;

        const now = new Date();
        const timeStr = `${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

        ticket.timeline.push({
          time: `Today · ${timeStr}`,
          title: 'Alex Morgan (Student)',
          text: text,
          isTech: false
        });

        input.value = '';
        UI.renderTrackerTimeline(ticket);
        UI.showToast('Message sent to technician', 'info');

        setTimeout(() => {
          ticket.timeline.push({
            time: 'Just now',
            title: 'Engr. R. Santos (ICT Support Team)',
            text: 'Message received Alex. I am monitoring the signal telemetry at AP 204 now. Will update your ticket shortly.',
            isTech: true
          });
          UI.renderTrackerTimeline(ticket);
          UI.showToast('New update from technician Engr. R. Santos', 'info');
          State.save();
        }, 1600);
      });

      // 16. Requests List Tabs & Empty State Toggle
      document.querySelectorAll('.requests-tab-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          document.querySelectorAll('.requests-tab-chip').forEach(c => c.classList.remove('active'));
          chip.classList.add('active');
          const filter = chip.dataset.filter;
          if (filter === 'empty_demo') {
            State.showEmptyRequestsDemo = true;
            this.renderRequestsList();
          } else {
            State.showEmptyRequestsDemo = false;
            this.renderRequestsList(filter);
          }
        });
      });

      document.getElementById('emptyStateCreateBtn')?.addEventListener('click', () => {
        State.showEmptyRequestsDemo = false;
        this.populateRequestForm();
      });

      // 17. FAQs Search & Filter Chips
      document.querySelectorAll('.faq-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          document.querySelectorAll('.faq-chip').forEach(c => c.classList.remove('active'));
          chip.classList.add('active');
          const cat = chip.dataset.category;
          const query = document.getElementById('faqsSearchInput')?.value || '';
          this.renderFAQs(query, cat);
        });
      });

      document.getElementById('faqsSearchInput')?.addEventListener('input', (e) => {
        const activeChip = document.querySelector('.faq-chip.active');
        const cat = activeChip ? activeChip.dataset.category : 'all';
        this.renderFAQs(e.target.value, cat);
      });

      // 18. Notifications Mark All as Read & Filter Tabs
      document.getElementById('markAllNotifsReadBtn')?.addEventListener('click', () => {
        State.notifications.forEach(n => n.unread = false);
        State.save();
        this.updateBadges();
        this.renderNotifications();
        this.showToast('All notifications marked as read', 'info');
      });

      document.querySelectorAll('.notif-filter-tab').forEach(tab => {
        tab.addEventListener('click', () => {
          document.querySelectorAll('.notif-filter-tab').forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          this.renderNotifications(tab.dataset.filter);
        });
      });

      // 19. Profile Settings Save
      document.getElementById('saveSettingsBtn')?.addEventListener('click', () => {
        this.showToast('Notification preferences saved successfully.', 'success');
      });

      document.getElementById('editProfileBtn')?.addEventListener('click', () => {
        document.getElementById('editProfileModal')?.classList.add('open');
      });
      document.getElementById('closeProfileModalBtn')?.addEventListener('click', () => {
        document.getElementById('editProfileModal')?.classList.remove('open');
      });
      document.getElementById('cancelProfileModalBtn')?.addEventListener('click', () => {
        document.getElementById('editProfileModal')?.classList.remove('open');
      });
      document.getElementById('saveProfileModalBtn')?.addEventListener('click', () => {
        const newPhone = document.getElementById('modalPhoneInput')?.value;
        if (newPhone) {
          document.getElementById('profilePhoneDisplay').textContent = newPhone;
        }
        document.getElementById('editProfileModal')?.classList.remove('open');
        this.showToast('Profile information updated.', 'success');
      });

      // 20. Responsive Desktop Drag-Resize & Dimensions Controller
      const appViewport = document.getElementById('appViewport');
      const handleRight = document.getElementById('resizeHandleRight');
      const handleBottom = document.getElementById('resizeHandleBottom');
      const handleCorner = document.getElementById('resizeHandleCorner');

      let isDragging = false;
      let dragHandle = null;
      let centerX = 0, topY = 0;

      const startResize = (e, handleType) => {
        if (State.viewportMode !== 'responsive' || !appViewport) return;
        e.preventDefault();
        isDragging = true;
        dragHandle = handleType;
        const rect = appViewport.getBoundingClientRect();
        centerX = rect.left + rect.width / 2;
        topY = rect.top;

        document.body.classList.add('is-resizing');
        window.addEventListener('mousemove', onResizeMove);
        window.addEventListener('mouseup', stopResize);
      };

      const onResizeMove = (e) => {
        if (!isDragging || !appViewport) return;
        let newW = State.viewportWidth;
        let newH = State.viewportHeight;

        if (dragHandle === 'right' || dragHandle === 'corner') {
          // Precise cursor tracking anchored around viewport center
          const distFromCenter = e.clientX - centerX;
          newW = distFromCenter * 2;
        }

        if (dragHandle === 'bottom' || dragHandle === 'corner') {
          // Precise cursor tracking anchored from viewport top
          newH = e.clientY - topY;
        }

        UI.setViewportDimensions(newW, newH, true);
      };

      const stopResize = () => {
        if (!isDragging) return;
        isDragging = false;
        dragHandle = null;
        document.body.classList.remove('is-resizing');
        window.removeEventListener('mousemove', onResizeMove);
        window.removeEventListener('mouseup', stopResize);
        State.save();
      };

      handleRight?.addEventListener('mousedown', (e) => startResize(e, 'right'));
      handleBottom?.addEventListener('mousedown', (e) => startResize(e, 'bottom'));
      handleCorner?.addEventListener('mousedown', (e) => startResize(e, 'corner'));

      // Dimension Toolbar Inputs & Slider
      const widthInput = document.getElementById('dimWidthInput');
      const heightInput = document.getElementById('dimHeightInput');
      const widthSlider = document.getElementById('dimWidthSlider');

      widthInput?.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        if (!isNaN(val)) UI.setViewportDimensions(val, State.viewportHeight, true);
      });
      widthInput?.addEventListener('change', () => State.save());

      heightInput?.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        if (!isNaN(val)) UI.setViewportDimensions(State.viewportWidth, val, true);
      });
      heightInput?.addEventListener('change', () => State.save());

      widthSlider?.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        if (!isNaN(val)) UI.setViewportDimensions(val, State.viewportHeight, true);
      });
      widthSlider?.addEventListener('change', () => State.save());

      // Preset Buttons (1440, 1024, 768, 390)
      document.querySelectorAll('.preset-pill-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const w = parseInt(btn.dataset.w, 10);
          const h = parseInt(btn.dataset.h, 10);
          if (w && h) {
            UI.setViewportDimensions(w, h, true);
            State.save();
            UI.showToast(`Switched window to ${w} × ${h} px`, 'info');
          }
        });
      });

      // Desktop Header Navigation Links (Exact 7 from Figma UI Masters)
      document.querySelectorAll('.desktop-nav-link').forEach(link => {
        link.addEventListener('click', () => {
          const tab = link.dataset.tab;
          if (tab === 'home') UI.navigateTo('view-home');
          else if (tab === 'solutions') UI.renderCategoryView('internet');
          else if (tab === 'request-assistance') UI.populateRequestForm();
          else if (tab === 'requests') {
            UI.renderRequestsList();
            UI.navigateTo('view-requests-list');
          }
          else if (tab === 'faqs') UI.navigateTo('view-faqs');
          else if (tab === 'notifications') UI.navigateTo('view-notifications');
          else if (tab === 'profile') UI.navigateTo('view-profile');
        });
      });

      // Desktop Search Submit Button in Main Search Bar
      document.getElementById('mainSearchSubmitBtn')?.addEventListener('click', () => {
        const val = document.getElementById('mainSearchBar')?.value || '';
        UI.executeSearch(val);
      });

      // Desktop "Submit New Request" in My Requests Header
      document.getElementById('headerNewRequestBtn')?.addEventListener('click', () => {
        UI.populateRequestForm();
      });

      // Desktop Header Center Global Search
      const desktopSearch = document.getElementById('desktopHeaderSearch');
      if (desktopSearch) {
        desktopSearch.addEventListener('input', (e) => {
          UI.handleLiveSearch(e.target.value);
        });
        desktopSearch.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            UI.executeSearch(e.target.value);
          }
        });
      }

      // Desktop Header Right Actions (Mobile & Responsive Fallbacks)
      document.getElementById('desktopNotifBtn')?.addEventListener('click', () => {
        UI.navigateTo('view-notifications');
      });
      document.getElementById('desktopProfilePill')?.addEventListener('click', () => {
        UI.navigateTo('view-profile');
      });

      // ResizeObserver for continuous responsive dynamics
      if (window.ResizeObserver && appViewport) {
        const ro = new ResizeObserver(entries => {
          for (let entry of entries) {
            const cr = entry.contentRect;
            if (cr.width > 0) {
              UI.updateResponsiveDynamics(cr.width);
              if (State.viewportMode === 'responsive') {
                const dimTag = document.getElementById('windowDimensionTag');
                if (dimTag) dimTag.textContent = `${Math.round(cr.width)} × ${Math.round(cr.height)} px`;
              }
            }
          }
        });
        ro.observe(appViewport);
      }
    }
  };

  // Boot Application
  document.addEventListener('DOMContentLoaded', () => {
    State.init();
    UI.init();
  });
})();
