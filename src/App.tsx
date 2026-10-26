import { useMemo, useState } from "react"

type Role = "Employee" | "HR" | "Admin"
type Page = "Overview" | "Employee Directory" | "Employee Profile" | "Attendance" | "Leave Management" | "Timesheets" | "Payroll" | "Recruitment" | "Onboarding" | "Offboarding" | "Documents & E-signatures" | "Performance Reviews" | "Goals & OKRs" | "Learning & Development" | "HR Help Desk" | "Expenses & Reimbursements" | "Benefits" | "Assets & Equipment" | "Approval Centre" | "Reports & Analytics" | "Company Announcements" | "Company Settings" | string

type IconName = "home" | "users" | "clock" | "wallet" | "briefcase" | "trend" | "lifebuoy" | "chart" | "search" | "bell" | "plus" | "help" | "chevron" | "menu" | "spark" | "calendar" | "file" | "check" | "arrow" | "filter" | "more" | "download" | "close" | "send" | "lock" | "grid" | "settings"

const paths: Record<IconName, React.ReactNode> = {
  home: (
    <>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5M9 21v-7h6v7" />
    </>
  ),
  users: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  wallet: (
    <>
      <path d="M3 6.5h16a2 2 0 0 1 2 2v10H5a2 2 0 0 1-2-2z" />
      <path d="M3 8V5a2 2 0 0 1 2-2h12v3.5M16 12h5" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="6" width="18" height="14" rx="2" />
      <path d="M8 6V4h8v2M3 12h18M10 12v2h4v-2" />
    </>
  ),
  trend: (
    <>
      <path d="M3 20h18M5 17l4-5 4 3 6-9" />
      <path d="M15 6h4v4" />
    </>
  ),
  lifebuoy: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3" />
      <path d="m5.6 5.6 4.3 4.3M14.1 14.1l4.3 4.3M18.4 5.6l-4.3 4.3M9.9 14.1l-4.3 4.3" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </>
  ),
  bell: (
    <>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  help: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.7 9a2.5 2.5 0 1 1 3.2 2.4c-.9.3-.9 1-.9 1.6M12 17h.01" />
    </>
  ),
  chevron: <path d="m9 18 6-6-6-6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  spark: (
    <>
      <path d="m12 3 1.3 4.2L17 9l-3.7 1.8L12 15l-1.3-4.2L7 9l3.7-1.8z" />
      <path d="m18.5 15 .7 2.3 2.3.7-2.3.7-.7 2.3-.7-2.3-2.3-.7 2.3-.7z" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 10h18" />
    </>
  ),
  file: (
    <>
      <path d="M6 2h8l4 4v16H6z" />
      <path d="M14 2v5h5M9 13h6M9 17h6" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  arrow: (
    <>
      <path d="M5 12h14M14 7l5 5-5 5" />
    </>
  ),
  filter: <path d="M4 5h16l-6 7v6l-4 2v-8z" />,
  more: (
    <>
      <circle cx="5" cy="12" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
      <circle cx="19" cy="12" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  download: (
    <>
      <path d="M12 3v12M7 10l5 5 5-5" />
      <path d="M4 20h16" />
    </>
  ),
  close: <path d="M6 6l12 12M18 6 6 18" />,
  send: (
    <>
      <path d="m3 3 18 9-18 9 3-9z" />
      <path d="M6 12h15" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="10" width="14" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </>
  ),
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3A1.7 1.7 0 0 0 10 3v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1z" />
    </>
  ),
}

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  return (
    <svg
      className="icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

const groups = [
  {
    title: "Workspace",
    icon: "home" as IconName,
    items: ["Overview", "My Tasks", "Notifications"],
  },
  {
    title: "People",
    icon: "users" as IconName,
    items: [
      "Employee Directory",
      "Employee Profiles",
      "Organisation Chart",
      "Departments and Teams",
    ],
  },
  {
    title: "Time & Attendance",
    icon: "clock" as IconName,
    items: [
      "Attendance",
      "Leave Management",
      "Shifts & Rosters",
      "Timesheets",
      "Holidays & Calendar",
    ],
  },
  {
    title: "Pay & Benefits",
    icon: "wallet" as IconName,
    items: [
      "Payroll",
      "Payslips",
      "Tax & Investment Declarations",
      "Compensation",
      "Benefits",
      "Expenses & Reimbursements",
    ],
  },
  {
    title: "Employee Lifecycle",
    icon: "briefcase" as IconName,
    items: [
      "Recruitment",
      "Onboarding",
      "Offboarding",
      "Documents & E-signatures",
      "Assets & Equipment",
    ],
  },
  {
    title: "Growth & Engagement",
    icon: "trend" as IconName,
    items: [
      "Performance Reviews",
      "Goals & OKRs",
      "Learning & Development",
      "Employee Engagement",
      "Recognition",
    ],
  },
  {
    title: "Support & Operations",
    icon: "lifebuoy" as IconName,
    items: [
      "HR Help Desk",
      "Company Announcements",
      "Policies & Compliance",
      "Approval Centre",
      "Workflow Automation",
    ],
  },
  {
    title: "Insights & Admin",
    icon: "chart" as IconName,
    items: [
      "Reports & Analytics",
      "User Roles & Permissions",
      "Company Settings",
      "Integrations",
      "Audit Logs",
    ],
  },
]

const roleNavigation: Record<Role, Record<string, string[]>> = {
  Employee: {
    Workspace: ["Overview", "My Tasks", "Notifications"],
    People: ["Employee Profile", "Employee Directory"],
    "Time & Attendance": ["Attendance", "Leave Management", "Timesheets", "Holidays & Calendar"],
    "Pay & Benefits": ["Payslips", "Benefits", "Expenses & Reimbursements"],
    "Growth & Engagement": ["Performance Reviews", "Goals & OKRs", "Learning & Development"],
    "Support & Operations": ["HR Help Desk", "Company Announcements", "Documents & E-signatures", "Assets & Equipment"],
  },
  HR: {
    Workspace: ["Overview", "My Tasks", "Approval Centre"],
    People: ["Employee Directory", "Employee Profiles", "Organisation Chart", "Departments and Teams"],
    "Time & Attendance": ["Attendance", "Leave Management", "Timesheets", "Holidays & Calendar"],
    "Pay & Benefits": ["Payroll", "Compensation", "Benefits", "Expenses & Reimbursements"],
    "Employee Lifecycle": ["Recruitment", "Onboarding", "Offboarding", "Documents & E-signatures", "Assets & Equipment"],
    "Growth & Engagement": ["Performance Reviews", "Goals & OKRs", "Learning & Development", "Employee Engagement"],
    "Support & Operations": ["HR Help Desk", "Company Announcements", "Policies & Compliance"],
    "Insights & Admin": ["Reports & Analytics"],
  },
  Admin: {
    Workspace: ["Overview", "My Tasks", "Notifications"],
    People: ["Employee Directory", "Organisation Chart", "Departments and Teams"],
    "Support & Operations": ["Approval Centre", "Workflow Automation", "Policies & Compliance"],
    "Insights & Admin": ["Reports & Analytics", "User Roles & Permissions", "Company Settings", "Integrations", "Audit Logs"],
  },
}

const groupsForRole = (role: Role) =>
  groups
    .filter((group) => roleNavigation[role][group.title])
    .map((group) => ({ ...group, items: roleNavigation[role][group.title] }))

const employees = [
  {
    name: "Aarav Mehta",
    initials: "AM",
    role: "Senior Product Designer",
    department: "Product",
    location: "Toronto",
    status: "Active",
    tone: "lilac",
  },
  {
    name: "Sofia Chen",
    initials: "SC",
    role: "Engineering Manager",
    department: "Engineering",
    location: "Vancouver",
    status: "Active",
    tone: "mint",
  },
  {
    name: "Marcus Reid",
    initials: "MR",
    role: "People Operations Lead",
    department: "People",
    location: "Toronto",
    status: "On leave",
    tone: "sand",
  },
  {
    name: "Nadia Patel",
    initials: "NP",
    role: "Senior Software Engineer",
    department: "Engineering",
    location: "Remote",
    status: "Active",
    tone: "blue",
  },
  {
    name: "Ethan Brooks",
    initials: "EB",
    role: "Account Executive",
    department: "Sales",
    location: "New York",
    status: "Active",
    tone: "rose",
  },
]

const roleContent: Record<Role, {
  greeting: string
  subtitle: string
  primary: string
  metrics: [string, string, string][]
  tasks: [string, string, string][]
}> = {
  Employee: {
    greeting: "Your workday, at a glance",
    subtitle: "Everything you need to stay focused, informed, and moving forward.",
    primary: "Clock in",
    metrics: [
      ["Leave balance", "16.5 days", "2 days planned"],
      ["Hours this week", "24h 30m", "On track"],
      ["Next payday", "28 June", "11 days away"],
    ],
    tasks: [
      ["Submit weekly timesheet", "Due today", "Time"],
      ["Complete security training", "Due 21 Jun", "Learning"],
      ["Review updated travel policy", "Due 24 Jun", "Policy"],
    ],
  },
  HR: {
    greeting: "People operations overview",
    subtitle: "Workforce health and priority actions across MHK TECH INC.",
    primary: "Add employee",
    metrics: [
      ["Total headcount", "248", "+6 this month"],
      ["Open positions", "14", "5 final stage"],
      ["Onboarding", "8", "92% on track"],
    ],
    tasks: [
      ["Approve employee transfer", "Due today", "People"],
      ["Review expiring work permits", "Due 19 Jun", "Compliance"],
      ["Publish hybrid work policy", "Due 21 Jun", "Policy"],
    ],
  },
  Admin: {
    greeting: "System administration",
    subtitle: "Manage access, governance, integrations, and platform health.",
    primary: "Review access",
    metrics: [
      ["Active users", "248", "100% provisioned"],
      ["Pending access", "6", "3 require review"],
      ["System health", "99.9%", "All services operational"],
    ],
    tasks: [
      ["Review privileged access", "Due today", "Security"],
      ["Approve SSO group changes", "Due 18 Jun", "Identity"],
      ["Review audit exceptions", "Due 20 Jun", "Compliance"],
    ],
  },
}

function Button({
  children,
  variant = "secondary",
  icon,
  onClick,
  type = "button",
}: {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "ghost" | "danger"
  icon?: IconName
  onClick?: () => void
  type?: "button" | "submit"
}) {
  return (
    <button type={type} className={`button ${variant}`} onClick={onClick}>
      {icon && <Icon name={icon} size={16} />}
      <span>{children}</span>
    </button>
  )
}

function Badge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode
  tone?: "neutral" | "success" | "warning" | "purple" | "danger"
}) {
  return <span className={`badge ${tone}`}>{children}</span>
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`brand ${compact ? "compact" : ""}`}
      aria-label="MHK TECH INC"
    >
      <img src="/assets/mhk-logo.png" alt="MHK Software Private Limited" />
    </div>
  )
}

function Sidebar({
  page,
  setPage,
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
  role,
}: {
  page: Page
  setPage: (p: Page) => void
  collapsed: boolean
  setCollapsed: (v: boolean) => void
  mobileOpen: boolean
  setMobileOpen: (v: boolean) => void
  role: Role
}) {
  const [open, setOpen] = useState<string[]>(["Workspace"])
  const filteredGroups = groupsForRole(role)
  const toggleGroup = (title: string) =>
    setOpen((current) =>
      current.includes(title)
        ? current.filter((g) => g !== title)
        : [...current, title],
    )
  return (
    <>
      {mobileOpen && (
        <button
          className="mobile-scrim"
          aria-label="Close navigation"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <aside
        className={`sidebar ${collapsed ? "collapsed" : ""} ${
          mobileOpen ? "mobile-open" : ""
        }`}
      >
        <div className="sidebar-head">
          <Brand compact={collapsed} />
          <button
            className="collapse-button"
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <Icon name="chevron" />
          </button>
        </div>
        <nav className="navigation" aria-label="Primary navigation">
          {filteredGroups.map((group) => {
            const expanded = open.includes(group.title)
            return (
              <div className="nav-group" key={group.title}>
                <button
                  className={`nav-group-button ${expanded ? "expanded" : ""}`}
                  onClick={() =>
                    collapsed ? setCollapsed(false) : toggleGroup(group.title)
                  }
                  title={collapsed ? group.title : undefined}
                >
                  <Icon name={group.icon} size={18} />
                  {!collapsed && (
                    <>
                      <span>{group.title}</span>
                      <Icon name="chevron" size={14} />
                    </>
                  )}
                </button>
                {!collapsed && expanded && (
                  <div className="nav-items">
                    {group.items.map((item) => (
                      <button
                        key={item}
                        className={page === item ? "active" : ""}
                        onClick={() => {
                          setPage(item)
                          setMobileOpen(false)
                        }}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </nav>
        <div className="sidebar-foot">
          <div className="avatar small">AC</div>
          {!collapsed && (
            <div>
              <strong>Alex Carter</strong>
              <span>{role}</span>
            </div>
          )}
          {!collapsed && <Icon name="more" />}
        </div>
      </aside>
    </>
  )
}

function Topbar({
  page,
  role,
  setRole,
  onMobileMenu,
  onNotifications,
  onCreate,
  search,
  setSearch,
}: {
  page: Page
  role: Role
  setRole: (r: Role) => void
  onMobileMenu: () => void
  onNotifications: () => void
  onCreate: () => void
  search: string
  setSearch: (s: string) => void
}) {
  return (
    <header className="topbar">
      <div className="top-location">
        <button
          className="mobile-menu"
          onClick={onMobileMenu}
          aria-label="Open navigation"
        >
          <Icon name="menu" />
        </button>
        <span>MHK People</span>
        <Icon name="chevron" size={13} />
        <strong>{page}</strong>
      </div>
      <div className="top-actions">
        <label className="global-search">
          <Icon name="search" size={17} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search people, pages, or actions"
            aria-label="Global search"
          />
          <kbd>⌘ K</kbd>
        </label>
        <Button variant="primary" icon="plus" onClick={onCreate}>
          Create
        </Button>
        <button className="icon-button" aria-label="Help">
          <Icon name="help" />
        </button>
        <button
          className="icon-button notification-button"
          aria-label="Notifications"
          onClick={onNotifications}
        >
          <Icon name="bell" />
          <span />
        </button>
        <label className="role-picker">
          <span className="sr-only">Switch demo role</span>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
          >
            {Object.keys(roleContent).map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </label>
      </div>
    </header>
  )
}

function PageHeader({
  title,
  description,
  action,
  onAction,
  secondary,
}: {
  title: string
  description: string
  action?: string
  onAction?: () => void
  secondary?: string
}) {
  return (
    <div className="page-header">
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <div className="page-actions">
        {secondary && <Button icon="download">{secondary}</Button>}
        {action && (
          <Button variant="primary" icon="plus" onClick={onAction}>
            {action}
          </Button>
        )}
      </div>
    </div>
  )
}

function Overview({
  role,
  navigate,
  notify,
}: {
  role: Role
  navigate: (p: Page) => void
  notify: (m: string) => void
}) {
  const data = roleContent[role]
  return (
    <div className="page fade-in">
      <section className="welcome">
        <div className="welcome-copy">
          <div>
            <p className="eyebrow">{role} workspace · Monday, 17 June</p>
            <h1>{data.greeting}</h1>
            <p>{data.subtitle}</p>
          </div>
          <Button
            variant="primary"
            icon={role === "Employee" ? "clock" : "arrow"}
            onClick={() =>
              role === "Employee"
                ? notify("Clocked in at 9:02 AM · Demo action")
                : navigate(
                    role === "HR"
                      ? "Employee Directory"
                      : "User Roles & Permissions",
                  )
            }
          >
            {data.primary}
          </Button>
        </div>
        <figure className="welcome-image">
          <img src="/assets/mhk-team.jpg" alt="MHK team collaborating in a bright workspace" />
          <figcaption>
            <span className="live-dot" />
            <strong>{role === "HR" ? "8 people joining this month" : role === "Admin" ? "All systems operational" : "246 teammates connected"}</strong>
          </figcaption>
        </figure>
      </section>
      <section className="metrics" aria-label="Key metrics">
        {data.metrics.map(([label, value, note]) => (
          <article key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
            <small>{note}</small>
          </article>
        ))}
      </section>
      <section className="quick-actions" aria-label="Quick actions">
        {(role === "Employee"
          ? [["calendar", "Request time off", "Leave Management"], ["file", "View payslip", "Payslips"], ["trend", "Update goals", "Goals & OKRs"], ["lifebuoy", "Get HR help", "HR Help Desk"]]
          : role === "HR"
            ? [["users", "Add employee", "Employee Directory"], ["briefcase", "Start onboarding", "Onboarding"], ["check", "Review approvals", "Approval Centre"], ["chart", "Open analytics", "Reports & Analytics"]]
            : [["lock", "Manage access", "User Roles & Permissions"], ["settings", "Company settings", "Company Settings"], ["grid", "Integrations", "Integrations"], ["chart", "Audit activity", "Audit Logs"]]
        ).map(([icon, label, destination]) => (
          <button key={label} onClick={() => navigate(destination)}>
            <span><Icon name={icon as IconName} /></span>
            <strong>{label}</strong>
            <Icon name="arrow" size={15} />
          </button>
        ))}
      </section>
      <div className="dashboard-grid">
        <section className="panel task-panel">
          <div className="section-head">
            <div>
              <h2>Needs your attention</h2>
              <p>Prioritised for your role</p>
            </div>
            <Button variant="ghost" onClick={() => navigate("My Tasks")}>
              View all <Icon name="arrow" size={15} />
            </Button>
          </div>
          <div className="task-list">
            {data.tasks.map(([task, due, type], index) => (
              <button
                className="task-row"
                key={task}
                onClick={() => notify(`${task} opened · Demo action`)}
              >
                <span className="check-circle">
                  {index === 0 ? (
                    <Icon name="clock" size={15} />
                  ) : (
                    <Icon name="check" size={15} />
                  )}
                </span>
                <span className="task-copy">
                  <strong>{task}</strong>
                  <small>{type}</small>
                </span>
                <span className={index === 0 ? "due urgent" : "due"}>
                  {due}
                </span>
                <Icon name="chevron" size={15} />
              </button>
            ))}
          </div>
        </section>
        <section className="panel schedule-panel">
          <div className="section-head">
            <div>
              <h2>Today</h2>
              <p>Your schedule at a glance</p>
            </div>
            <button className="date-chip">
              <Icon name="calendar" size={15} />
              17 Jun
            </button>
          </div>
          <div className="timeline">
            <div>
              <time>09:30</time>
              <span />
              <article>
                <strong>Weekly team sync</strong>
                <small>Product · 30 min</small>
              </article>
            </div>
            <div>
              <time>11:00</time>
              <span />
              <article>
                <strong>Quarterly planning</strong>
                <small>Orion Room · 60 min</small>
              </article>
            </div>
            <div>
              <time>15:30</time>
              <span />
              <article>
                <strong>Focus time</strong>
                <small>Protected · 90 min</small>
              </article>
            </div>
          </div>
        </section>
        <section className="panel insight-panel">
          <div className="section-head">
            <div>
              <h2>
                {role === "HR"
                  ? "Workforce momentum"
                  : role === "Admin"
                    ? "Platform adoption"
                    : "Attendance overview"}
              </h2>
              <p>Last six weeks</p>
            </div>
            <button className="icon-button">
              <Icon name="more" />
            </button>
          </div>
          <div className="chart-area">
            {[42, 55, 49, 66, 63, 78, 74, 84, 76, 88, 85, 92].map((h, i) => (
              <span key={i} style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className="chart-caption">
            <strong>94.2%</strong>
            <span>Healthy trend</span>
            <small>+2.4% from last period</small>
          </div>
        </section>
        <section className="panel announcement-panel">
          <div className="section-head">
            <div>
              <h2>Company updates</h2>
              <p>From MHK TECH INC</p>
            </div>
            <Button
              variant="ghost"
              onClick={() => navigate("Company Announcements")}
            >
              View all
            </Button>
          </div>
          <div className="announcement">
            <span className="announcement-date">
              JUN
              <br />
              <strong>14</strong>
            </span>
            <div>
              <Badge tone="purple">Company</Badge>
              <h3>Summer all-hands and product showcase</h3>
              <p>
                Join us on 27 June for company updates, demos, and a team
                social.
              </p>
              <button
                onClick={() => notify("Announcement opened · Demo content")}
              >
                Read announcement <Icon name="arrow" size={14} />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

function Directory({ navigate }: { navigate: (p: Page) => void }) {
  const [query, setQuery] = useState("")
  const [department, setDepartment] = useState("All departments")
  const rows = employees.filter(
    (e) =>
      `${e.name} ${e.role} ${e.department}`
        .toLowerCase()
        .includes(query.toLowerCase()) &&
      (department === "All departments" || e.department === department),
  )
  return (
    <div className="page fade-in">
      <PageHeader
        title="Employee directory"
        description="Find people, understand teams, and access employee records."
        action="Add employee"
        secondary="Export"
      />
      <div className="toolbar">
        <label className="table-search">
          <Icon name="search" />
          <input
            placeholder="Search by name, role, or team"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <label className="select-control">
          <Icon name="filter" size={16} />
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          >
            <option>All departments</option>
            <option>Product</option>
            <option>Engineering</option>
            <option>People</option>
            <option>Sales</option>
          </select>
        </label>
        <button className="view-toggle active">
          <Icon name="menu" size={16} />
        </button>
        <button className="view-toggle">
          <Icon name="grid" size={16} />
        </button>
      </div>
      <section className="table-panel">
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Department</th>
              <th>Location</th>
              <th>Status</th>
              <th aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {rows.map((employee) => (
              <tr
                key={employee.name}
                onClick={() => navigate("Employee Profile")}
              >
                <td>
                  <div className="person">
                    <span className={`avatar ${employee.tone}`}>
                      {employee.initials}
                    </span>
                    <div>
                      <strong>{employee.name}</strong>
                      <small>{employee.role}</small>
                    </div>
                  </div>
                </td>
                <td>{employee.department}</td>
                <td>{employee.location}</td>
                <td>
                  <Badge
                    tone={employee.status === "Active" ? "success" : "warning"}
                  >
                    {employee.status}
                  </Badge>
                </td>
                <td>
                  <button
                    className="icon-button"
                    aria-label={`More actions for ${employee.name}`}
                  >
                    <Icon name="more" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <span>Showing 1–{rows.length} of 248 employees</span>
          <div>
            <Button variant="ghost">Previous</Button>
            <button className="page-number active">1</button>
            <button className="page-number">2</button>
            <button className="page-number">3</button>
            <Button variant="ghost">Next</Button>
          </div>
        </div>
      </section>
    </div>
  )
}

function EmployeeProfile({ notify }: { notify: (m: string) => void }) {
  const [tab, setTab] = useState("Overview")
  const tabs = [
    "Overview",
    "Employment",
    "Documents",
    "Attendance",
    "Leave",
    "Compensation",
    "Performance",
    "Activity",
  ]
  return (
    <div className="page fade-in">
      <div className="profile-hero">
        <div className="profile-person">
          <span className="avatar xlarge lilac">AM</span>
          <div>
            <div className="profile-title">
              <h1>Aarav Mehta</h1>
              <Badge tone="success">Active</Badge>
            </div>
            <p>Senior Product Designer · Product</p>
            <span>Employee ID MHK-1024 · Toronto, Canada</span>
          </div>
        </div>
        <div className="page-actions">
          <Button icon="more">More</Button>
          <Button
            variant="primary"
            onClick={() => notify("Edit profile opened · Demo action")}
          >
            Edit profile
          </Button>
        </div>
      </div>
      <div className="tabs">
        {tabs.map((t) => (
          <button
            className={tab === t ? "active" : ""}
            onClick={() => setTab(t)}
            key={t}
          >
            {t}
          </button>
        ))}
      </div>
      {tab === "Overview" ? (
        <div className="profile-grid">
          <section className="panel profile-about">
            <div className="section-head">
              <div>
                <h2>Personal information</h2>
                <p>Core contact and identity details</p>
              </div>
              <button
                className="text-button"
                onClick={() =>
                  notify("Edit personal information · Demo action")
                }
              >
                Edit
              </button>
            </div>
            <dl className="detail-grid">
              <div>
                <dt>Work email</dt>
                <dd>aarav.mehta@mhktech.example</dd>
              </div>
              <div>
                <dt>Phone</dt>
                <dd>+1 (416) 555-0147</dd>
              </div>
              <div>
                <dt>Preferred name</dt>
                <dd>Aarav</dd>
              </div>
              <div>
                <dt>Pronouns</dt>
                <dd>He / him</dd>
              </div>
              <div>
                <dt>Time zone</dt>
                <dd>Eastern Time (ET)</dd>
              </div>
              <div>
                <dt>Work arrangement</dt>
                <dd>Hybrid</dd>
              </div>
            </dl>
          </section>
          <section className="panel reporting-card">
            <h2>Reporting line</h2>
            <div className="manager-person">
              <span className="avatar mint">SC</span>
              <div>
                <strong>Sofia Chen</strong>
                <small>Engineering Manager</small>
              </div>
            </div>
            <div className="mini-org">
              <span>Aarav reports to Sofia</span>
              <button>
                View organisation chart <Icon name="arrow" size={14} />
              </button>
            </div>
          </section>
          <section className="panel employment-summary">
            <div className="section-head">
              <div>
                <h2>Employment summary</h2>
                <p>Current assignment</p>
              </div>
            </div>
            <dl className="detail-grid">
              <div>
                <dt>Job title</dt>
                <dd>Senior Product Designer</dd>
              </div>
              <div>
                <dt>Department</dt>
                <dd>Product</dd>
              </div>
              <div>
                <dt>Joining date</dt>
                <dd>12 September 2022</dd>
              </div>
              <div>
                <dt>Employment type</dt>
                <dd>Full-time</dd>
              </div>
              <div>
                <dt>Legal entity</dt>
                <dd>MHK TECH INC Canada</dd>
              </div>
              <div>
                <dt>Cost centre</dt>
                <dd>PRD-210</dd>
              </div>
            </dl>
          </section>
        </div>
      ) : (
        <section className="panel tab-placeholder">
          <Icon
            name={
              tab === "Documents"
                ? "file"
                : tab === "Compensation"
                  ? "lock"
                  : "chart"
            }
            size={28}
          />
          <h2>{tab}</h2>
          <p>
            This record is permission-aware. Detailed {tab.toLowerCase()}{" "}
            information would appear here for authorised roles.
          </p>
          <Button
            onClick={() => notify(`${tab} record opened · Simulated data`)}
          >
            View sample record
          </Button>
        </section>
      )}
    </div>
  )
}

function Leave({ notify }: { notify: (m: string) => void }) {
  const [modal, setModal] = useState(false)
  return (
    <div className="page fade-in">
      <PageHeader
        title="Leave management"
        description="Plan time away, review balances, and see team availability."
        action="Request leave"
        onAction={() => setModal(true)}
      />
      <section className="balance-strip">
        <article>
          <span>Annual leave</span>
          <strong>12.5</strong>
          <small>of 20 days available</small>
          <div>
            <i style={{ width: "63%" }} />
          </div>
        </article>
        <article>
          <span>Sick leave</span>
          <strong>4</strong>
          <small>of 8 days available</small>
          <div>
            <i style={{ width: "50%" }} />
          </div>
        </article>
        <article>
          <span>Personal leave</span>
          <strong>2</strong>
          <small>of 3 days available</small>
          <div>
            <i style={{ width: "66%" }} />
          </div>
        </article>
      </section>
      <div className="content-split">
        <section className="panel calendar-panel">
          <div className="section-head">
            <div>
              <h2>June 2025</h2>
              <p>Personal and team leave calendar</p>
            </div>
            <div className="calendar-controls">
              <Button variant="ghost">Today</Button>
              <button>
                <Icon name="chevron" />
              </button>
              <button>
                <Icon name="chevron" />
              </button>
            </div>
          </div>
          <div className="calendar-grid">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
              <b key={d}>{d}</b>
            ))}
            {Array.from({ length: 35 }, (_, i) => i - 1).map((d, i) => (
              <button
                key={i}
                className={`${d === 17 ? "today" : ""} ${
                  d < 1 || d > 30 ? "muted" : ""
                }`}
                onClick={() => d > 0 && d <= 30 && setModal(true)}
              >
                <span>{d < 1 ? 30 + d : d > 30 ? d - 30 : d}</span>
                {[5, 12, 19, 24].includes(d) && <i />}
              </button>
            ))}
          </div>
          <div className="calendar-legend">
            <span>
              <i className="mine" />
              My leave
            </span>
            <span>
              <i className="team" />
              Team away
            </span>
            <span>
              <i className="holiday" />
              Holiday
            </span>
          </div>
        </section>
        <section className="panel upcoming-panel">
          <div className="section-head">
            <div>
              <h2>Upcoming</h2>
              <p>Approved and pending requests</p>
            </div>
          </div>
          <div className="leave-item">
            <span className="leave-date">
              24<small>JUN</small>
            </span>
            <div>
              <strong>Annual leave</strong>
              <small>24–26 June · 3 days</small>
            </div>
            <Badge tone="success">Approved</Badge>
          </div>
          <div className="leave-item">
            <span className="leave-date">
              08<small>JUL</small>
            </span>
            <div>
              <strong>Personal leave</strong>
              <small>8 July · 1 day</small>
            </div>
            <Badge tone="warning">Pending</Badge>
          </div>
          <Button onClick={() => notify("Leave history opened · Demo data")}>
            View leave history
          </Button>
        </section>
      </div>
      {modal && (
        <div
          className="modal-wrap"
          role="dialog"
          aria-modal="true"
          aria-labelledby="leave-title"
        >
          <button
            className="modal-scrim"
            onClick={() => setModal(false)}
            aria-label="Close request"
          />
          <form
            className="modal"
            onSubmit={(e) => {
              e.preventDefault()
              setModal(false)
              notify("Leave request submitted for approval · Demo action")
            }}
          >
            <div className="modal-head">
              <div>
                <p className="eyebrow">New request</p>
                <h2 id="leave-title">Request leave</h2>
              </div>
              <button
                type="button"
                className="icon-button"
                onClick={() => setModal(false)}
              >
                <Icon name="close" />
              </button>
            </div>
            <label>
              Leave type
              <select required>
                <option>Annual leave</option>
                <option>Sick leave</option>
                <option>Personal leave</option>
                <option>Unpaid leave</option>
              </select>
            </label>
            <div className="form-row">
              <label>
                Start date
                <input type="date" defaultValue="2025-06-24" required />
              </label>
              <label>
                End date
                <input type="date" defaultValue="2025-06-26" required />
              </label>
            </div>
            <div className="duration-note">
              <Icon name="calendar" />
              <span>
                <strong>3 working days</strong>
                <small>Balance after request: 9.5 days</small>
              </span>
            </div>
            <label>
              Reason
              <textarea placeholder="Add context for your manager" rows={3} />
            </label>
            <label className="attachment">
              <Icon name="plus" />
              <span>
                <strong>Add attachment</strong>
                <small>PDF, PNG, or JPG up to 10 MB</small>
              </span>
            </label>
            <div className="modal-actions">
              <Button onClick={() => setModal(false)}>Cancel</Button>
              <Button type="submit" variant="primary">
                Submit request
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

function Payroll({ notify }: { notify: (m: string) => void }) {
  return (
    <div className="page fade-in">
      <PageHeader
        title="Payroll"
        description="Review the June payroll cycle, exceptions, and reconciliation."
        action="Continue payroll"
        onAction={() =>
          notify("Payroll review opened · Simulated financial data")
        }
        secondary="Export report"
      />
      <section className="payroll-status">
        <div>
          <span className="status-mark">
            <Icon name="clock" />
          </span>
          <div>
            <p className="eyebrow">June 2025 payroll</p>
            <h2>Review in progress</h2>
            <p>Inputs close 20 June at 5:00 PM ET</p>
          </div>
        </div>
        <div className="progress-block">
          <div>
            <span>Cycle completion</span>
            <strong>92%</strong>
          </div>
          <i>
            <b style={{ width: "92%" }} />
          </i>
        </div>
      </section>
      <section className="metrics four">
        <article>
          <span>Employees</span>
          <strong>246</strong>
          <small>2 records on hold</small>
        </article>
        <article>
          <span>Gross payroll</span>
          <strong>$2.84M</strong>
          <small>Simulated amount</small>
        </article>
        <article>
          <span>Deductions</span>
          <strong>$684K</strong>
          <small>Statutory and benefits</small>
        </article>
        <article>
          <span>Exceptions</span>
          <strong>7</strong>
          <small className="warning-text">Needs attention</small>
        </article>
      </section>
      <div className="content-split equal">
        <section className="panel">
          <div className="section-head">
            <div>
              <h2>Payroll checklist</h2>
              <p>Required before final approval</p>
            </div>
          </div>
          {[
            ["Attendance and leave inputs", "Complete"],
            ["Variable pay and bonuses", "Complete"],
            ["New joiners and exits", "In review"],
            ["Tax and deduction validation", "Needs review"],
            ["Final reconciliation", "Not started"],
          ].map(([item, status], i) => (
            <button
              className="checklist-row"
              key={item}
              onClick={() => notify(`${item} opened · Demo workflow`)}
            >
              <span className={i < 2 ? "done" : ""}>
                {i < 2 ? <Icon name="check" /> : i + 1}
              </span>
              <strong>{item}</strong>
              <Badge
                tone={
                  status === "Complete"
                    ? "success"
                    : status === "Needs review"
                      ? "warning"
                      : "neutral"
                }
              >
                {status}
              </Badge>
              <Icon name="chevron" />
            </button>
          ))}
        </section>
        <section className="panel">
          <div className="section-head">
            <div>
              <h2>Exceptions</h2>
              <p>Resolve before processing</p>
            </div>
            <Button variant="ghost">View all</Button>
          </div>
          {[
            ["Nadia Patel", "Missing attendance input", "High"],
            ["Ethan Brooks", "Bank detail changed", "Review"],
            ["Marcus Reid", "Unapproved expense batch", "Review"],
          ].map(([name, issue, priority]) => (
            <div className="exception-row" key={name}>
              <span className="avatar small lilac">
                {name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
              <div>
                <strong>{name}</strong>
                <small>{issue}</small>
              </div>
              <Badge tone={priority === "High" ? "danger" : "warning"}>
                {priority}
              </Badge>
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}

function Recruitment({ notify }: { notify: (m: string) => void }) {
  const columns = [
    ["Applied", "24", ["Maya Rodriguez", "Jordan Kim", "Leo Martin"]],
    ["Screening", "12", ["Amelia Scott", "Owen Walker"]],
    ["Interview", "8", ["Priya Nair", "Daniel Kim"]],
    ["Offer", "3", ["Emma Wilson"]],
    ["Hired", "5", ["Liam Nguyen"]],
  ] as const
  return (
    <div className="page fade-in">
      <PageHeader
        title="Recruitment pipeline"
        description="Track candidates from application through hiring and onboarding handover."
        action="Add candidate"
        secondary="Hiring report"
      />
      <div className="pipeline-toolbar">
        <label className="table-search">
          <Icon name="search" />
          <input placeholder="Search candidates" />
        </label>
        <label className="select-control">
          <select>
            <option>All open positions</option>
            <option>Senior Product Designer</option>
            <option>Software Engineer</option>
          </select>
        </label>
        <Button icon="filter">Filters</Button>
      </div>
      <div className="pipeline">
        {columns.map(([title, count, candidates]) => (
          <section className="pipeline-column" key={title}>
            <div className="pipeline-head">
              <h3>{title}</h3>
              <span>{count}</span>
              <button>
                <Icon name="more" />
              </button>
            </div>
            {candidates.map((candidate, i) => (
              <button
                className="candidate-card"
                key={candidate}
                onClick={() =>
                  notify(`${candidate}'s candidate profile opened · Demo data`)
                }
              >
                <div>
                  <span
                    className={`avatar small ${["lilac", "mint", "sand"][i % 3]}`}
                  >
                    {candidate
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                  <Badge tone={title === "Offer" ? "purple" : "neutral"}>
                    {i === 0 ? "Strong match" : "New"}
                  </Badge>
                </div>
                <strong>{candidate}</strong>
                <small>
                  {i % 2 ? "Software Engineer" : "Senior Product Designer"}
                </small>
                <footer>
                  <span>
                    {title === "Interview"
                      ? "Interview today"
                      : "Updated 2h ago"}
                  </span>
                  <span className="mini-avatars">SC</span>
                </footer>
              </button>
            ))}
          </section>
        ))}
      </div>
    </div>
  )
}

function HelpDesk({ notify }: { notify: (m: string) => void }) {
  const [create, setCreate] = useState(false)
  return (
    <div className="page fade-in">
      <PageHeader
        title="HR help desk"
        description="Get help, track requests, and find trusted answers."
        action="New HR request"
        onAction={() => setCreate(true)}
      />
      <div className="help-layout">
        <section className="panel">
          <div className="section-head">
            <div>
              <h2>Your requests</h2>
              <p>3 open · 12 resolved</p>
            </div>
            <label className="select-control">
              <select>
                <option>Open requests</option>
                <option>All requests</option>
                <option>Resolved</option>
              </select>
            </label>
          </div>
          {[
            [
              "MHK-1842",
              "Payroll",
              "Clarification on June payslip",
              "Waiting on HR",
              "2h ago",
            ],
            [
              "MHK-1819",
              "Documents",
              "Employment verification letter",
              "In progress",
              "Yesterday",
            ],
            [
              "MHK-1764",
              "IT Equipment",
              "Replacement keyboard request",
              "Resolved",
              "12 Jun",
            ],
          ].map(([id, cat, title, status, time]) => (
            <button
              className="ticket-row"
              key={id}
              onClick={() => notify(`Ticket ${id} opened · Demo conversation`)}
            >
              <span className="ticket-icon">
                <Icon
                  name={
                    cat === "Documents"
                      ? "file"
                      : cat === "IT Equipment"
                        ? "settings"
                        : "wallet"
                  }
                />
              </span>
              <div>
                <span>
                  {id} · {cat}
                </span>
                <strong>{title}</strong>
                <small>Updated {time}</small>
              </div>
              <Badge
                tone={
                  status === "Resolved"
                    ? "success"
                    : status === "Waiting on HR"
                      ? "warning"
                      : "purple"
                }
              >
                {status}
              </Badge>
              <Icon name="chevron" />
            </button>
          ))}
        </section>
        <aside className="panel knowledge-card">
          <div className="knowledge-head">
            <Icon name="spark" />
            <h2>Find an answer</h2>
            <p>
              Search policies and common HR questions before opening a request.
            </p>
          </div>
          <label className="table-search">
            <Icon name="search" />
            <input placeholder="Search the knowledge base" />
          </label>
          <div className="faq-list">
            {[
              "Understanding your leave balance",
              "Downloading payslips and tax forms",
              "Updating personal information",
              "Hybrid work guidelines",
            ].map((q) => (
              <button
                key={q}
                onClick={() => notify(`${q} opened · Demo article`)}
              >
                {q}
                <Icon name="arrow" size={14} />
              </button>
            ))}
          </div>
          <Button
            onClick={() => notify("Knowledge base opened · Demo content")}
          >
            Browse all articles
          </Button>
        </aside>
      </div>
      {create && (
        <div className="drawer-wrap">
          <button className="modal-scrim" onClick={() => setCreate(false)} />
          <form
            className="drawer"
            onSubmit={(e) => {
              e.preventDefault()
              setCreate(false)
              notify("HR request MHK-1851 created · Demo action")
            }}
          >
            <div className="modal-head">
              <div>
                <p className="eyebrow">Help desk</p>
                <h2>New HR request</h2>
              </div>
              <button
                type="button"
                className="icon-button"
                onClick={() => setCreate(false)}
              >
                <Icon name="close" />
              </button>
            </div>
            <label>
              Category
              <select>
                <option>Payroll</option>
                <option>Leave</option>
                <option>Attendance</option>
                <option>Documents</option>
                <option>Benefits</option>
                <option>IT Equipment</option>
                <option>Workplace Concerns</option>
                <option>Other</option>
              </select>
            </label>
            <label>
              Subject
              <input required placeholder="Briefly describe what you need" />
            </label>
            <label>
              Details
              <textarea
                required
                rows={6}
                placeholder="Share the details that will help HR resolve this request"
              />
            </label>
            <label className="checkbox-label">
              <input type="checkbox" /> Mark this request as confidential
            </label>
            <div className="privacy-note">
              <Icon name="lock" />
              <span>
                Confidential requests are visible only to authorised People team
                members.
              </span>
            </div>
            <div className="modal-actions">
              <Button onClick={() => setCreate(false)}>Cancel</Button>
              <Button variant="primary" type="submit">
                Create request
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

function Approvals({ notify }: { notify: (m: string) => void }) {
  const [items, setItems] = useState([
    {
      person: "Nadia Patel",
      type: "Annual leave",
      detail: "24–26 June · 3 days",
      date: "17 Jun",
      status: "Pending",
    },
    {
      person: "Marcus Reid",
      type: "Timesheet",
      detail: "Week of 10–16 June · 40h",
      date: "17 Jun",
      status: "Pending",
    },
    {
      person: "Ethan Brooks",
      type: "Expense claim",
      detail: "Client travel · $486.20",
      date: "16 Jun",
      status: "Pending",
    },
    {
      person: "Sofia Chen",
      type: "Profile change",
      detail: "Reporting manager update",
      date: "15 Jun",
      status: "Changes requested",
    },
  ])
  const action = (index: number, status: string) => {
    setItems((current) =>
      current.map((x, i) => (i === index ? { ...x, status } : x)),
    )
    notify(`Request ${status.toLowerCase()} · Demo action`)
  }
  return (
    <div className="page fade-in">
      <PageHeader
        title="Approval centre"
        description="Review requests across HR workflows in one place."
      />
      <div className="approval-summary">
        <button className="active">
          <strong>{items.filter((i) => i.status === "Pending").length}</strong>
          <span>Pending</span>
        </button>
        <button>
          <strong>4</strong>
          <span>Due soon</span>
        </button>
        <button>
          <strong>28</strong>
          <span>Completed this month</span>
        </button>
      </div>
      <section className="table-panel approval-table">
        <table>
          <thead>
            <tr>
              <th>Requester</th>
              <th>Request</th>
              <th>Submitted</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={item.person + item.type}>
                <td>
                  <div className="person">
                    <span className="avatar small lilac">
                      {item.person
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                    <strong>{item.person}</strong>
                  </div>
                </td>
                <td>
                  <strong>{item.type}</strong>
                  <small>{item.detail}</small>
                </td>
                <td>{item.date}</td>
                <td>
                  <Badge
                    tone={
                      item.status === "Pending"
                        ? "warning"
                        : item.status === "Approved"
                          ? "success"
                          : "neutral"
                    }
                  >
                    {item.status}
                  </Badge>
                </td>
                <td>
                  {item.status === "Pending" ? (
                    <div className="row-actions">
                      <Button
                        variant="ghost"
                        onClick={() => action(i, "Changes requested")}
                      >
                        Request changes
                      </Button>
                      <Button onClick={() => action(i, "Rejected")}>
                        Reject
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => action(i, "Approved")}
                      >
                        Approve
                      </Button>
                    </div>
                  ) : (
                    <Button variant="ghost">View details</Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}

function Reports() {
  return (
    <div className="page fade-in">
      <PageHeader
        title="Reports & analytics"
        description="Understand workforce trends with permission-aware, exportable insights."
        action="Create report"
        secondary="Export"
      />
      <section className="metrics four">
        <article>
          <span>Total headcount</span>
          <strong>248</strong>
          <small>+2.5% this quarter</small>
        </article>
        <article>
          <span>Voluntary attrition</span>
          <strong>6.8%</strong>
          <small>Down 1.2 points</small>
        </article>
        <article>
          <span>Open roles</span>
          <strong>14</strong>
          <small>Across 6 teams</small>
        </article>
        <article>
          <span>Average tenure</span>
          <strong>2.8y</strong>
          <small>Stable year over year</small>
        </article>
      </section>
      <div className="analytics-grid">
        <section className="panel headcount-chart">
          <div className="section-head">
            <div>
              <h2>Headcount trend</h2>
              <p>January–June 2025</p>
            </div>
            <label className="select-control">
              <select>
                <option>All departments</option>
                <option>Engineering</option>
                <option>Product</option>
              </select>
            </label>
          </div>
          <div className="line-chart">
            <div className="y-labels">
              <span>260</span>
              <span>240</span>
              <span>220</span>
              <span>200</span>
            </div>
            <svg viewBox="0 0 700 220" preserveAspectRatio="none">
              <defs>
                <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6554a4" stopOpacity=".18" />
                  <stop offset="100%" stopColor="#6554a4" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                className="grid-line"
                d="M0 30H700M0 90H700M0 150H700M0 210H700"
              />
              <path
                className="area"
                d="M0 170 C90 160 95 145 140 142 S220 130 280 118 S370 125 420 100 S520 92 560 70 S650 62 700 42 L700 220 L0 220Z"
              />
              <path
                className="line"
                d="M0 170 C90 160 95 145 140 142 S220 130 280 118 S370 125 420 100 S520 92 560 70 S650 62 700 42"
              />
            </svg>
            <div className="x-labels">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
            </div>
          </div>
        </section>
        <section className="panel report-list">
          <div className="section-head">
            <div>
              <h2>Saved reports</h2>
              <p>Recently viewed</p>
            </div>
          </div>
          {[
            "Monthly workforce summary",
            "Attendance exception report",
            "Hiring funnel by department",
            "Leave liability report",
          ].map((r, i) => (
            <button key={r}>
              <span className="report-icon">
                <Icon name="chart" />
              </span>
              <span>
                <strong>{r}</strong>
                <small>
                  {i % 2
                    ? "CSV · Updated yesterday"
                    : "Dashboard · Updated today"}
                </small>
              </span>
              <Icon name="chevron" />
            </button>
          ))}
        </section>
      </div>
    </div>
  )
}

const pageDescriptions: Record<string, {
  title: string
  description: string
  sections: string[]
}> = {
  Attendance: {
    title: "Attendance",
    description:
      "Track work hours, missed punches, overtime, and attendance corrections.",
    sections: ["Today’s attendance", "Weekly hours", "Attendance exceptions"],
  },
  Timesheets: {
    title: "Timesheets",
    description:
      "Log project time, compare scheduled and actual hours, and submit for approval.",
    sections: ["Current week", "Project time", "Submission history"],
  },
  Onboarding: {
    title: "Onboarding workspace",
    description:
      "Coordinate every new-joiner task from preboarding to probation.",
    sections: ["New joiners", "Task completion", "Provisioning status"],
  },
  Offboarding: {
    title: "Offboarding workspace",
    description:
      "Manage exits, clearances, assets, access revocation, and final settlement.",
    sections: ["Active exits", "Clearance progress", "Final documents"],
  },
  "Documents & E-signatures": {
    title: "Document repository",
    description:
      "Manage employee records, signatures, versions, and expiry reminders.",
    sections: ["Recent documents", "Awaiting signature", "Expiring soon"],
  },
  "Performance Reviews": {
    title: "Performance reviews",
    description:
      "Run fair, structured reviews with self, manager, and 360° feedback.",
    sections: ["Active review cycle", "Your reviews", "Team completion"],
  },
  "Goals & OKRs": {
    title: "Goals & OKRs",
    description: "Align individual and team outcomes with company priorities.",
    sections: ["Company objectives", "My goals", "Team progress"],
  },
  "Learning & Development": {
    title: "Learning catalogue",
    description:
      "Build skills through curated paths, courses, and compliance training.",
    sections: ["Recommended for you", "In progress", "Mandatory training"],
  },
  "Expenses & Reimbursements": {
    title: "Expenses & reimbursements",
    description:
      "Submit claims, attach receipts, and follow approval and payment status.",
    sections: ["Draft claims", "Awaiting approval", "Recent reimbursements"],
  },
  Benefits: {
    title: "Benefits",
    description:
      "Review eligibility, plan details, dependants, and enrolment windows.",
    sections: ["Your coverage", "Available plans", "Life events"],
  },
  "Assets & Equipment": {
    title: "Assets & equipment",
    description: "Track devices, assignments, service history, and returns.",
    sections: ["Assigned to you", "Service requests", "Asset history"],
  },
  "Company Announcements": {
    title: "Company announcements",
    description:
      "Stay informed with official company news, events, and updates.",
    sections: ["Latest updates", "Company events", "Archived announcements"],
  },
  "Company Settings": {
    title: "Company settings",
    description:
      "Configure locations, departments, policies, data privacy, and integrations.",
    sections: ["Organisation", "People policies", "Security & privacy"],
  },
}

function GenericPage({
  name,
  role,
  notify,
}: {
  name: string
  role: Role
  notify: (m: string) => void
}) {
  const config = pageDescriptions[name] || {
    title: name,
    description: `Manage ${name.toLowerCase()} with clear ownership, status, and audit history.`,
    sections: ["Overview", "Requires attention", "Recent activity"],
  }
  const moduleItems: Record<string, string[]> = {
    Onboarding: ["Maya Singh · Starts 24 Jun", "Noah Williams · IT setup pending", "Ava Patel · Documents complete"],
    Offboarding: ["Jordan Lee · Exit 28 Jun", "Sam Wilson · Asset return pending", "Taylor Kim · Clearance complete"],
    Payslips: ["June 2025 · Available", "May 2025 · Downloaded", "April 2025 · Available"],
    Attendance: ["Clocked in · 9:02 AM", "Weekly total · 24h 30m", "No attendance exceptions"],
    Timesheets: ["Product redesign · 18h", "Customer research · 6h 30m", "Weekly submission · Draft"],
    "User Roles & Permissions": ["HR administrators · 6 members", "Employees · 242 members", "Privileged access · 3 pending reviews"],
    "Company Settings": ["Organisation profile · Complete", "SSO and security · Active", "Data retention · 7 years"],
    "Audit Logs": ["Role updated · 12 min ago", "Employee exported · 1h ago", "SSO policy changed · Yesterday"],
    Benefits: ["Health and dental · Enrolled", "Retirement plan · 6% contribution", "Wellness allowance · $640 remaining"],
    "Goals & OKRs": ["Improve release quality · 72%", "Customer insight programme · 64%", "Team capability plan · 81%"],
    "Learning & Development": ["Security essentials · Due 21 Jun", "Leadership foundations · In progress", "Product strategy · Recommended"],
  }
  const items = moduleItems[name] || [
    `${config.sections[0]} · Active`,
    `${config.sections[1]} · 3 items`,
    `${config.sections[2]} · Updated today`,
  ]
  return (
    <div className="page fade-in">
      <PageHeader
        title={config.title}
        description={config.description}
        action={
          ["Notifications", "My Tasks", "Organisation Chart"].includes(name)
            ? undefined
            : `New ${name.replace(/s$/, "")}`
        }
        onAction={() => notify(`${name} creation flow opened · Demo action`)}
      />
      <div className="generic-hero">
        <div>
          <Badge tone="purple">Workspace</Badge>
          <h2>{config.sections[0]}</h2>
          <p>
            A focused {role.toLowerCase()} workspace with the records, actions,
            and controls required for this module.
          </p>
          <div className="generic-actions">
            <Button
              variant="primary"
              onClick={() => notify(`${config.sections[0]} opened · Demo data`)}
            >
              Open workspace
            </Button>
            <Button>View guidance</Button>
          </div>
        </div>
        <div className="orbital-stat">
          <span>On track</span>
          <strong>84%</strong>
          <small>Updated moments ago</small>
        </div>
      </div>
      <div className="generic-grid">
        {config.sections.map((section, index) => (
          <section className="panel" key={section}>
            <div className="section-head">
              <div>
                <h2>{section}</h2>
                <p>
                  {index === 0
                    ? "Current cycle"
                    : index === 1
                      ? "Prioritised items"
                      : "Latest updates"}
                </p>
              </div>
              <button className="icon-button">
                <Icon name="more" />
              </button>
            </div>
            <div className="placeholder-list">
              {items.map((item, row) => (
                <button
                  key={item}
                  onClick={() => notify(`${section} item opened · Demo data`)}
                >
                  <span className={`placeholder-icon tone-${index}`}>
                    <Icon
                      name={
                        index === 0 ? "check" : index === 1 ? "clock" : "file"
                      }
                    />
                  </span>
                  <span>
                    <strong>{item}</strong>
                    <small>
                      {row === 0 ? "Updated today" : `${row + 1} days ago`}
                    </small>
                  </span>
                  <Badge
                    tone={
                      row === 0 ? "warning" : row === 1 ? "purple" : "success"
                    }
                  >
                    {row === 0
                      ? "In progress"
                      : row === 1
                        ? "Review"
                        : "Complete"}
                  </Badge>
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

function Assistant({
  open,
  setOpen,
  navigate,
}: {
  open: boolean
  setOpen: (v: boolean) => void
  navigate: (p: Page) => void
}) {
  const [messages, setMessages] = useState<{
    from: "bot" | "user"
    text: string
  }[]>([
    {
      from: "bot",
      text: "Hello, Alex. I can help you find HR information and navigate MHK People. Responses in this demo are simulated.",
    },
  ])
  const [text, setText] = useState("")
  const ask = (question: string) => {
    const lower = question.toLowerCase()
    const answer = lower.includes("leave")
      ? "Your demo profile shows 16.5 available leave days. For verified information, open Leave Management."
      : lower.includes("payslip")
        ? "You can find payslips under Pay & Benefits → Payslips. Demo financial values are not verified."
        : lower.includes("timesheet")
          ? "Open Timesheets, add project hours for the week, then select Submit for approval."
          : lower.includes("request")
            ? "Open the HR Help Desk and choose New HR request. You can mark sensitive cases as confidential."
            : "I found a related knowledge-base article. For a verified answer about personal data, please contact the HR Help Desk."
    setMessages((m) => [
      ...m,
      { from: "user", text: question },
      { from: "bot", text: answer },
    ])
    setText("")
  }
  return (
    <>
      <button
        className={`assistant-trigger ${open ? "open" : ""}`}
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close HR assistant" : "Open HR assistant"}
      >
        {open ? <Icon name="close" /> : <Icon name="spark" />}
        <span>Ask MHK</span>
      </button>
      <aside
        className={`assistant ${open ? "open" : ""}`}
        aria-label="AI HR Assistant"
      >
        <div className="assistant-head">
          <span className="assistant-logo">
            <Icon name="spark" />
          </span>
          <div>
            <strong>MHK Assistant</strong>
            <small>
              <i /> Demo assistant
            </small>
          </div>
          <button className="icon-button" onClick={() => setOpen(false)}>
            <Icon name="close" />
          </button>
        </div>
        <div className="messages">
          {messages.map((m, i) => (
            <div className={`message ${m.from}`} key={i}>
              {m.text}
            </div>
          ))}
          {messages.length === 1 && (
            <div className="suggestions">
              <span>Suggested questions</span>
              {[
                "How many leave days do I have?",
                "Where can I download my payslip?",
                "How do I submit a timesheet?",
                "How can I raise an HR request?",
              ].map((q) => (
                <button key={q} onClick={() => ask(q)}>
                  {q}
                  <Icon name="arrow" size={13} />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="assistant-links">
          <button
            onClick={() => {
              navigate("HR Help Desk")
              setOpen(false)
            }}
          >
            <Icon name="lifebuoy" size={15} />
            Escalate to HR Help Desk
          </button>
        </div>
        <form
          className="assistant-input"
          onSubmit={(e) => {
            e.preventDefault()
            if (text.trim()) ask(text)
          }}
        >
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ask about HR policies or processes"
            aria-label="Message the HR assistant"
          />
          <button type="submit" aria-label="Send message">
            <Icon name="send" size={17} />
          </button>
        </form>
      </aside>
    </>
  )
}

function Notifications({ open, close }: { open: boolean; close: () => void }) {
  return (
    <aside className={`notification-panel ${open ? "open" : ""}`}>
      <div className="modal-head">
        <div>
          <p className="eyebrow">Inbox</p>
          <h2>Notifications</h2>
        </div>
        <button className="icon-button" onClick={close}>
          <Icon name="close" />
        </button>
      </div>
      {[
        ["Approval needed", "Nadia Patel requested annual leave.", "5 min"],
        ["Payslip available", "Your June payslip is ready to view.", "2h"],
        ["Policy update", "The hybrid work policy was updated.", "Yesterday"],
      ].map(([t, d, time], i) => (
        <button className="notification-item" key={t}>
          <span className={i === 0 ? "unread-dot" : ""} />
          <div>
            <strong>{t}</strong>
            <p>{d}</p>
            <small>{time}</small>
          </div>
        </button>
      ))}
    </aside>
  )
}

export default function App() {
  const [page, setPage] = useState<Page>("Overview")
  const [role, setRole] = useState<Role>("Employee")
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [assistantOpen, setAssistantOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [toast, setToast] = useState("")
  const [search, setSearch] = useState("")

  const notify = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(""), 3200)
  }
  const navigate = (next: Page) => {
    setPage(next)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  const searchResults = useMemo(
    () =>
      search.length > 1
        ? groupsForRole(role)
            .flatMap((g) => g.items)
            .filter((i) => i.toLowerCase().includes(search.toLowerCase()))
            .slice(0, 6)
        : [],
    [search, role],
  )

  let content: React.ReactNode
  if (page === "Overview")
    content = <Overview role={role} navigate={navigate} notify={notify} />
  else if (page === "Employee Directory")
    content = <Directory navigate={navigate} />
  else if (page === "Employee Profile" || page === "Employee Profiles")
    content = <EmployeeProfile notify={notify} />
  else if (page === "Leave Management") content = <Leave notify={notify} />
  else if (page === "Payroll") content = <Payroll notify={notify} />
  else if (page === "Recruitment") content = <Recruitment notify={notify} />
  else if (page === "HR Help Desk") content = <HelpDesk notify={notify} />
  else if (page === "Approval Centre") content = <Approvals notify={notify} />
  else if (page === "Reports & Analytics") content = <Reports />
  else content = <GenericPage name={page} role={role} notify={notify} />

  return (
    <div className="app">
      <Sidebar
        page={page}
        setPage={navigate}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        role={role}
      />
      <div className={`app-main ${collapsed ? "expanded" : ""}`}>
        <Topbar
          page={page}
          role={role}
          setRole={(r) => {
            setRole(r)
            setPage("Overview")
            notify(`Switched to ${r} demo view`)
          }}
          onMobileMenu={() => setMobileOpen(true)}
          onNotifications={() => setNotificationsOpen(!notificationsOpen)}
          onCreate={() =>
            notify(
              "Quick create menu opened · Choose a module from the sidebar",
            )
          }
          search={search}
          setSearch={setSearch}
        />
        {searchResults.length > 0 && (
          <div className="search-results">
            <span>Go to</span>
            {searchResults.map((result) => (
              <button
                key={result}
                onClick={() => {
                  navigate(result)
                  setSearch("")
                }}
              >
                <Icon name="search" size={15} />
                {result}
                <Icon name="arrow" size={14} />
              </button>
            ))}
          </div>
        )}
        <main>{content}</main>
      </div>
      <Assistant
        open={assistantOpen}
        setOpen={setAssistantOpen}
        navigate={navigate}
      />
      <Notifications
        open={notificationsOpen}
        close={() => setNotificationsOpen(false)}
      />
      {notificationsOpen && (
        <button
          className="panel-scrim"
          onClick={() => setNotificationsOpen(false)}
          aria-label="Close notifications"
        />
      )}
      {toast && (
        <div className="toast" role="status">
          <span>
            <Icon name="check" />
          </span>
          {toast}
        </div>
      )}
    </div>
  )
}
