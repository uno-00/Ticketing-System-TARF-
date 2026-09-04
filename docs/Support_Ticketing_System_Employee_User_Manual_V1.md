# NATIONAL MUSEUM OF THE PHILIPPINES

# Support Ticketing System

## Employee User Manual

**Version 2.0 (Detailed Edition)**  
**September 2026**

---

## Table of Contents

1. Introduction
2. General Information
3. Getting Started
4. Super Admin Portal
5. Admin Portal
6. Records Portal
7. Client Portal (Staff)
8. Shared Features (Messages, Notifications, Settings)
9. Status Reference and End-to-End Flows
10. Frequently Asked Questions
11. List of Figures

---

## 1. Introduction

### 1.1 Overview

The **Support Ticketing System** is a centralized platform of the National Museum of the Philippines (NMP) designed to streamline the **creation, review, publication, submission, approval, assignment, completion, feedback, and closure** of technical assistance (TA) requests.

It provides four portals:

- **Super Admin** — system overview, portal switching, Users / Roles / Permissions (RBAC), activity logs
- **Admin** — Form Builder, My Forms, Approvals, Request Management, My Assignments, My Requests, Reports, Messages
- **Records (Record Admin)** — Pending Forms, Published Forms, Activity Logs
- **Client (Staff)** — Submit Request, My Requests, Service Feedback, Messages

Requestor profile fields (Division/Section, First Name, Middle Name, Last Name, Email Address, Designation) are auto-filled from **PAMANA** employee records when the signed-in museum username is linked. **PAMANA is not the product name** of this application; it is the HR source used for autofill only.

This manual is written in the same style as the NMP Document Tracking System (DTS) Employee Manual: numbered steps, field-level instructions, notes, and a figure for each major screen.

### 1.2 Objectives

The Support Ticketing System aims to:

- Centralize TA form design and publishing
- Standardize staff request submission with accurate requestor details
- Improve accountability through approve → assign → complete → feedback → close
- Provide dashboards, notifications, messaging, and audit logs
- Restrict sensitive administration (RBAC) to Super Admin

### 1.3 User’s Role, Access and Permission

**1.3.1 Super Admin.** Highest access. Opens Admin, Records, and Staff/Client with one login. Manages Users, Roles, Permissions. Views system dashboard, reports, form management, activity logs, and system notifications. Uses **SWITCH PORTAL** when inside other portals.

**1.3.2 Admin.** Section Head (ODG Section and Regional Component Museum) and Division Head (All except ODG). Builds and submits forms to Records; approves/rejects client tickets; assigns personnel from the **form owner’s division**; tracks My Assignments; may submit personal TA requests; uses Reports and Messages. **Does not** manage RBAC in the Admin sidebar.

**1.3.3 Record Admin.** Reviews forms Pending Review; **Approve & publish** or **Disapprove** with remarks; monitors Published Forms and Activity Logs. Messaging is not available in Records.

**1.3.4 Staff (Client).** Submits TA requests, tracks My Requests, marks service complete, submits Client Satisfaction Survey feedback, closes or reopens requests, and uses Messages.

---

## 2. General Information

### 2.1 Objectives

The system makes receiving, reviewing, assigning, monitoring, and closing TA work easier and more organized. Users can check form and ticket status quickly, reduce delays, and keep a clear transaction history.

### 2.2 System Features

**2.2.1 Form Builder.** Guided wizard: General → Fields → Print Template → Procedure. Submit to Records or save as draft.

**2.2.2 Form Review and Publishing.** Records selects Approve & publish or Disapprove with remarks.

**2.2.3 Request Submission.** Staff and Admin (Submit TA Request) use published forms. PAMANA autofills requestor fields.

**2.2.4 Request Approval.** Admin Approvals: Approve sets status to **Open**; Reject requires a reason.

**2.2.5 Personnel Assignment.** On Request Management ticket detail, Admin assigns active Admins from the **same division as the form creator**. Assign sets status to **In Progress**.

**2.2.6 Ticket Status Tracking.** pending approval, open, in progress, pending, resolved, closed, rejected, reopened.

**2.2.7 Service Completion and Feedback.** Requestor marks service complete, completes survey confirmation, then Close ticket or Reopen request.

**2.2.8 Messaging.** Admin and Client portals: chats, New message, Poke, Request messages on tickets.

**2.2.9 Notifications.** Bell alerts for pending approvals, pending forms, messages/pokes, and actionable client updates.

**2.2.10 Role-Based Access Control.** Users / Roles / Permissions managed only in Super Admin.

**2.2.11 Dashboards and Reports.** Role-specific overview cards and Reports & Analytics.

**2.2.12 Audit / Activity Logs.** Records activity and Super Admin system-wide logs.

### 2.3 System Users and Their Descriptions

| Role | Portal landing | Main responsibilities |
|------|----------------|----------------------|
| Super Admin | /super-admin/dashboard | System admin, RBAC, portal switch |
| Admin | /admin/dashboard | Forms, approvals, assignment, reports |
| Record Management | /records/dashboard | Form review and publishing |
| Staff (user) | /client/dashboard | Submit and close own TA requests |

---

## 3. Getting Started

### 3.1 Log-in / Sign In

**3.1.1** Open a web browser and enter the system address (example: `http://on-prem.x-dcb.net:5173/login` or `http://127.0.0.1:5173/login`). The log-in page appears.

*[Screenshot placeholder]*
**Figure 1 – Support Ticketing System log-in page (Welcome Back)**

**3.1.2** The page title shows **Welcome Back**. The subtitle reads: *Support Ticketing System — please log in to continue.*

**3.1.3** Enter **Username** (museum organization username) in the field with placeholder *Enter your username*.

**3.1.4** Enter **Password** in the field with placeholder *Enter your password*. Use the eye icon to show or hide the password.

**3.1.5** Optionally tick **Remember me** to save the username on this browser.

**3.1.6** Click **Sign In**. While processing, the button shows **Signing in…**.

**3.1.7** If credentials are wrong, the page shows: *Incorrect email or password.*

**3.1.8** If the API is down, a red alert shows: *API server is not running* with instruction to run `bun run start`.

**3.1.9** **Forgot password?** displays: *Contact your system administrator to reset your password.*

**Note:** Sign in with your museum username so PAMANA can match your employee record for requestor autofill.

**3.1.10** After successful login, you are redirected by role:

| Role | Landing page |
|------|----------------|
| Super Admin | /super-admin/dashboard |
| Admin | /admin/dashboard |
| Record Management | /records/dashboard |
| Staff | /client/dashboard |

### 3.2 Interface Elements (All Portals)

**3.2.1 Sidebar brand.** Top of sidebar: **National Museum of the Philippines** / **Support Ticketing System**.

**3.2.2 Navigation sections.** Grouped menus (MAIN, FORMS, REQUESTS, etc.) with icons and optional badges.

**3.2.3 Sidebar footer.** **Settings** and **Logout**.

**3.2.4 Header.** Current page title; notification bell; profile / Sign out.

*[Screenshot placeholder]*
**Figure 2 – Common portal chrome — sidebar brand, navigation, Settings, Logout, notification bell**

### 3.3 Dashboards Overview

Upon login, each role lands on its Dashboard.

**3.3.1 Super Admin Dashboard.** System-wide counts, portal access cards, recent activities.

*[Screenshot placeholder]*
**Figure 3 – Super Admin Dashboard**

**3.3.2 Admin Dashboard.** Greeting (*Good day, {FirstName}*), form and approval alerts, pending client requests list.

*[Screenshot placeholder]*
**Figure 4 – Admin Dashboard**

**3.3.3 Records Dashboard.** Welcome message; Pending review and Published forms counts; pending list.

*[Screenshot placeholder]*
**Figure 5 – Records Dashboard**

**3.3.4 Client Dashboard.** *Welcome back*; Active / Pending approval / Completed stats; Recent requests.

*[Screenshot placeholder]*
**Figure 6 – Client Dashboard**

### 3.4 System Navigation by Portal

**3.4.1 Super Admin Navigation**

- MAIN: Dashboard; Reports & Analytics
- PORTALS / ACCESS: Admin Portal; Records Portal; Staff/Client Portal
- USER & ACCESS MANAGEMENT: Users; Roles; Permissions
- SYSTEM MANAGEMENT: System Settings; Form Management; Activity Logs / Audit Logs; System Notifications
- ACCOUNT: My Profile; Settings

*[Screenshot placeholder]*
**Figure 7 – Super Admin sidebar navigation**

**3.4.2 Admin Navigation**

- MAIN: Dashboard; Reports; Messages
- FORMS: Form Builder; My Forms
- REQUESTS: Approvals (badge); Request Management; My Assignments; My Requests; Submit TA Request

*(No RBAC section under Admin.)*

*[Screenshot placeholder]*
**Figure 8 – Admin sidebar navigation**

**3.4.3 Records Navigation**

- MAIN: Dashboard
- FORMS: Pending Forms (badge); Published Forms
- SYSTEM: Activity Logs

*[Screenshot placeholder]*
**Figure 9 – Records sidebar navigation**

**3.4.4 Client Navigation**

- MAIN: Dashboard; Messages
- REQUESTS: Submit Request; My Requests (badge); Service Feedback (badge)

*[Screenshot placeholder]*
**Figure 10 – Client sidebar navigation**

**3.4.5 Switch Portal (Super Admin only).** When Super Admin opens Admin, Records, or Client, a **SWITCH PORTAL** block appears with: Super Admin | Admin | Records | Staff. Use it to jump without signing out. Logout as Super Admin clears all three portal sessions.

*[Screenshot placeholder]*
**Figure 11 – SWITCH PORTAL block while Super Admin is inside another portal**

---

## 4. Super Admin Portal

### 4.1 Dashboard

**4.1.1** Open **Dashboard** under MAIN (or land here after login).

**4.1.2** Page title: **Dashboard**. Description: *Overall status of the Support Ticketing System — users, forms, requests, and recent activity.*

**4.1.3** Review statistic cards:

- Total Users; Total Admins; Records Personnel; Staff
- Pending Forms; Published Forms; Pending Requests; In Progress
- Completed (Resolved); Closed Tickets; Reopened; Completed + Closed

**4.1.4** Under **Portal access**, click Admin Portal, Records Portal, or Staff / Client Portal.

*[Screenshot placeholder]*
**Figure 12 – Super Admin Dashboard — stats and portal access**

**4.1.5** Under **Recent activities**, review action summary, actor, time, and Form/Ticket type. Click **View all logs** for the full audit list.

*[Screenshot placeholder]*
**Figure 13 – Super Admin Recent activities feed**

**4.1.6** If loading fails: *Could not load overview*. If empty: *No recent activity*.

### 4.2 Reports & Analytics

**4.2.1** Open **Reports & Analytics**.

**4.2.2** Review Total requests, Pending approval, Closed, With feedback.

**4.2.3** Feedback table columns: Ticket | Client | Comment | Action (**View request**). Empty: *No feedback yet.*

*[Screenshot placeholder]*
**Figure 14 – Super Admin Reports & Analytics**

### 4.3 Users (RBAC)

**4.3.1** Open **Users** under USER & ACCESS MANAGEMENT.

**4.3.2** Breadcrumb: Home / RBAC / Users. Tabs: **Users | Roles | Permissions**.

**4.3.3** Title: **Users**. Description: *Assign roles to active employees and review access at a glance.*

**4.3.4** Summary cards: Active employees; With roles; Needs role assignment.

**4.3.5** In **Employee access**, use Search (*Search name, username, email, ID…*).

**4.3.6** Filter by role and access: All access | With roles | Needs assignment.

**4.3.7** Table columns: Employee | Account | Assigned roles | Action.

**4.3.8** Click **Assign** or **Manage**. Dialog title: **Assign roles** / **Manage roles**. Select role checkboxes, then **Save roles** (or **Cancel**).

**4.3.9** Use **Prev** / **Next** for pagination. Empty: *No employees found.* Empty roles cell: *No roles assigned.*

*[Screenshot placeholder]*
**Figure 15 – Super Admin Users list**

*[Screenshot placeholder]*
**Figure 16 – Assign / Manage roles dialog**

### 4.4 Roles (RBAC)

**4.4.1** Open **Roles**. Title: **Roles**. Description: *Manage system roles and the permissions granted to each role.*

**4.4.2** Click **New role**. Enter Name (*e.g. form_reviewer*) and optional Description. Click **Create** or **Cancel**.

**4.4.3** Table columns: Role | Permissions | Users | Action. Protected roles show **System role** and cannot be deleted (super_admin, admin, record_management, user).

**4.4.4** Click **Manage** to edit description and permissions (filter *Filter permissions…*), then **Save**.

**4.4.5** Delete custom roles with Trash and confirm *Delete role "…"?*

*[Screenshot placeholder]*
**Figure 17 – Super Admin Roles list**

*[Screenshot placeholder]*
**Figure 18 – Create role dialog**

*[Screenshot placeholder]*
**Figure 19 – Manage role permissions dialog**

### 4.5 Permissions (RBAC)

**4.5.1** Open **Permissions**. Title: **Permissions**. Description explains capabilities are assigned from the Roles page.

**4.5.2** Summary: Total permissions; Ticketing permissions; Categories.

**4.5.3** Search (*Search permissions…*). Tables per category: Permission | Key | Roles using. Empty: *No permissions found* with **Clear search**.

*[Screenshot placeholder]*
**Figure 20 – Super Admin Permissions catalog**

### 4.6 System Management Pages

**4.6.1 System Settings / My Profile.** Same Settings page as other portals (Account + Password). See Section 8.3.

*[Screenshot placeholder]*
**Figure 21 – Super Admin Settings / My Profile**

**4.6.2 Form Management.** Opens My Forms Analytics (same content as Admin My Forms) for Super Admin oversight.

*[Screenshot placeholder]*
**Figure 22 – Super Admin Form Management (My Forms Analytics)**

**4.6.3 Activity Logs / Audit Logs.** Title: **Activity Logs / Audit Logs**. Description: *System-wide audit trail of significant actions across portals.* Empty: *No activity yet.*

*[Screenshot placeholder]*
**Figure 23 – Super Admin Activity Logs**

**4.6.4 System Notifications.** Title: **System Notifications**. Shortcuts: Pending form reviews → Records Pending Forms; Pending client approvals → Admin Approvals; Audit trail → Activity Logs. Empty: *No alerts.*

*[Screenshot placeholder]*
**Figure 24 – Super Admin System Notifications**

---

## 5. Admin Portal

### 5.1 Admin Dashboard

**5.1.1** Open **Dashboard**. Eyebrow: **Admin**. Title: *Good day, {FirstName}* (or Dashboard).

**5.1.2** Description: *Manage TA forms and review incoming client requests.*

**5.1.3** Quick actions: **Form Builder**; **Approvals (N)**.

**5.1.4** Alerts may appear for forms needing revision (**Open My Forms**) or pending client requests (**Open Approvals**).

**5.1.5** Stats: Requests to approve; Pending review; Draft forms.

**5.1.6** Panel **Pending client requests** with **View all** and row action **Review**. Empty: *No pending approvals.*

*[Screenshot placeholder]*
**Figure 25 – Admin Dashboard with pending client requests**

### 5.2 Form Builder (Complete Wizard)

Open **Form Builder** from FORMS. Header shows form title (or *New request form*) and description: *Build fields and print layout, then submit to Records for review.* Meta shows reference number and version.

Wizard steps: **1 General → 2 Fields → 3 Print Template → 4 Procedure**. Use **Back** and **Continue**. On the last step: **Submit to Records** and **Save as draft instead**.

*[Screenshot placeholder]*
**Figure 26 – Form Builder — wizard step indicator**

#### Step 1 — General information

**5.2.1** Section title: **General information**. Subtitle: *The opening details that identify this form.*

**5.2.2** Complete:

- **Form title** — placeholder *e.g. Technical Assistance Request*
- **Reference number** — auto-generated, read-only
- **Date effectivity** — pick any date
- **Version number**

**5.2.3** Validation before Continue: *Enter a form title before continuing.*; *Choose a date effectivity before continuing.*

*[Screenshot placeholder]*
**Figure 27 – Form Builder Step 1 — General information**

#### Step 2 — Fields

**5.2.4** Left panel **Form elements:** Textbox, Textarea, Dropdown, Checkbox, Radio, Date Picker, File Upload, Email, Number, Signature.

**5.2.5** Center **Live preview.** Empty: *Click any element on the left to drop it here.* Drag rows to reorder.

**5.2.6** Right **Field settings:** Label; Placeholder; Options (comma-separated) with **Use TA service types (6 options)** for checkbox (Information System, Website Update, Event Assistance, Network/Hardware Troubleshooting, Software Troubleshooting, Others); Min/Max length; **Required field**; Variable (read-only).

**5.2.7** Validation: *Add at least one form field before continuing.*

*[Screenshot placeholder]*
**Figure 28 – Form Builder Step 2 — Fields, live preview, and field settings**

#### Step 3 — Print Template

**5.2.8** Substeps: Upload form → Place fields → Save layout.

**5.2.9** Upload image or PDF template (**Choose file** / **Replace**). Limits shown on screen (PNG/JPG/WebP/PDF).

**5.2.10** Place **Requester profile** variables (Division/Section, First/Middle/Last Name, Email, Designation) and form fields onto the template.

**5.2.11** Use Zoom, Field text size slider, **Reset**, **Clear all**, **Preview**, **Save layout**.

**5.2.12** Print preview dialog: *Sample data only…* with **Close**, **Copy**, **Print**.

*[Screenshot placeholder]*
**Figure 29 – Form Builder Step 3 — Print Template placement**

*[Screenshot placeholder]*
**Figure 30 – Print preview dialog**

#### Step 4 — Procedure

**5.2.13** Section **Work procedure**. Subtitle: *Upload the SOP that accompanies this form (PDF only).*

**5.2.14** Drop zone: *Drop a PDF or click to browse* (PDF only, max 15 MB). Success: *✓ {filename} ready for Records review.*

**5.2.15** Click **Submit to Records** to send for Records recommendation, or **Save as draft instead**.

*[Screenshot placeholder]*
**Figure 31 – Form Builder Step 4 — Work procedure upload and Submit to Records**

### 5.3 My Forms

**5.3.1** Open **My Forms**. Title: **My Forms Analytics**. Description: *Overview of form submissions and service requests.*

**5.3.2** Click **+ New Form** / **Create Form** to start Form Builder.

**5.3.3** Review summary cards and charts (Total Requests; Divisions; Most Requested Service; Monthly trends; Top requesting divisions table: # | Division / Section | Requests | %).

**5.3.4** Under **My Forms**, each card shows status badge (Draft | Pending Review | Published | Disapproved).

**5.3.5** Actions by status:

- Draft → **Send to Records**
- Disapproved → edit then **Resubmit**
- Published / others → **View**

*[Screenshot placeholder]*
**Figure 32 – My Forms Analytics overview**

*[Screenshot placeholder]*
**Figure 33 – My Forms cards with status actions**

### 5.4 Approvals

**5.4.1** Open **Approvals**. Title: **Approvals**. Description: *Review client technical assistance requests before assignment and processing.*

**5.4.2** Click **Refresh** if needed.

**5.4.3** Table columns: Ticket | Client | Division | Status | Action.

**5.4.4** Row actions: **View file**; **Approve**; **Reject**.

**5.4.5** Reject panel: title **Reject request**; placeholder *Reason for rejection*; **Confirm reject** / **Cancel**.

**5.4.6** Toasts: *Request approved* / *Request rejected*.

**Important:** Approving sets ticket status to **Open** (not “Approved”). Next assign personnel in Request Management.

*[Screenshot placeholder]*
**Figure 34 – Approvals list**

*[Screenshot placeholder]*
**Figure 35 – Reject request panel with reason**

### 5.5 Request Management and Ticket Detail

**5.5.1** Open **Request Management**. Columns: Ticket | Client | Division | Status | Action (**Manage →**). Empty: *No requests yet.*

*[Screenshot placeholder]*
**Figure 36 – Request Management list**

**5.5.2** Open a ticket. Header shows ticket number, title, Status badge, Client, Division. Action: **Request messages** (if not closed). Back: Back to approvals / Back to requests.

*[Screenshot placeholder]*
**Figure 37 – Admin ticket detail header**

**5.5.3 Main column panels:**

1. **Uploaded file** — form with submitted answers (view/zoom)
2. **Submitted answers** — label/value rows
3. **Client feedback** — when applicable
4. **Request details** — Form; Submitted by; Division; Created; Assigned personnel; Rejected block if any

*[Screenshot placeholder]*
**Figure 38 – Admin ticket detail — uploaded file and submitted answers**

**5.5.4 Sidebar — pending approval:** Panel **Approve or reject** with **Approve request** and Rejection reason + **Reject request**.

*[Screenshot placeholder]*
**Figure 39 – Approve or reject sidebar**

**5.5.5 Sidebar — Assign personnel (after Open):** Notice that only personnel from the **form creator’s division** are listed. Select checkboxes, click **Assign** (**Assigning…**). Toast: *Personnel assigned — status set to In Progress.*

*[Screenshot placeholder]*
**Figure 40 – Assign personnel sidebar filtered by form owner division**

**5.5.6 Sidebar — Update status** (when allowed): buttons **in progress**, **pending**.

**5.5.7** When resolved: FlowNotice **Waiting for client** (requestor must complete feedback/close).

*[Screenshot placeholder]*
**Figure 41 – Update status and Waiting for client notices**

### 5.6 My Assignments

**5.6.1** Open **My Assignments**. Title: **My Assigned Requests**.

**5.6.2** Columns: Ticket | Client | Client division | Status | Action (**Open →**). Empty: *No assigned requests.*

**5.6.3** Perform the TA work; use Request messages / Messages to coordinate until the requestor marks complete.

*[Screenshot placeholder]*
**Figure 42 – My Assignments list**

### 5.7 My Requests / Submit TA Request (Admin as requestor)

**5.7.1** Open **Submit TA Request** (or My Requests → **New request**). Same form UI as Client Submit Request (Section 7.1). Success redirects to My Requests.

*[Screenshot placeholder]*
**Figure 43 – Admin Submit TA Request**

**5.7.2** Open **My Requests**. Title: **My Requests**. Description: *Your own TA submissions…*

**5.7.3** Columns: Ticket | Form | Status | Assigned to | Submitted | Action (Mark complete → / Submit feedback → / Close request → / **View details**).

*[Screenshot placeholder]*
**Figure 44 – Admin My Requests list**

**5.7.4** Ticket detail uses the same requestor sidebar as Client: Mark service complete → feedback → Close ticket / Reopen request (see Section 7.2).

*[Screenshot placeholder]*
**Figure 45 – Admin My Request ticket detail — requestor actions**

### 5.8 Reports

**5.8.1** Open **Reports**. Title: **Reports & Analytics**.

**5.8.2** Stats: Total requests; Pending approval; Closed; With feedback.

**5.8.3** Feedback table: Ticket | Client | Comment | Action (**View request**). Empty: *No feedback yet.*

*[Screenshot placeholder]*
**Figure 46 – Admin Reports & Analytics**

---

## 6. Records Portal

### 6.1 Records Dashboard

**6.1.1** Open **Dashboard**. Eyebrow: **Records**. Title: *Welcome, {FirstName}*.

**6.1.2** Description: *Review admin-submitted forms and publish approved TA forms for client use.*

**6.1.3** Actions: **Review pending (N)** or **Published forms**. Stats: Pending review; Published forms.

**6.1.4** Panel **Pending forms** with **View file** and **Review**. Empty: *No pending forms.*

*[Screenshot placeholder]*
**Figure 47 – Records Dashboard**

### 6.2 Pending Forms

**6.2.1** Open **Pending Forms**. Description: *Forms submitted by Admin with status Pending Review — approve or disapprove before publishing.*

**6.2.2** Use **Refresh** and Search (*Search form…*).

**6.2.3** Columns: Form | Submitted by | Submitted | Ref | Action (**View file**, **Review**).

*[Screenshot placeholder]*
**Figure 48 – Pending Forms list**

### 6.3 Form Recommendation (Review)

**6.3.1** Open a form via **Review**. Title shows form title; meta includes ref, version, Submitted by; Form status badge.

**6.3.2** Panel **Form template** — view only; zoom and scroll the Admin-uploaded template.

*[Screenshot placeholder]*
**Figure 49 – Form review — Form template (view only)**

**6.3.3** Panel **Recommendation**:

- Select **Approve & publish** OR **Disapprove**
- If Disapprove, enter remarks (*Remarks (e.g. Please add required fields)*) — required
- Click **Submit recommendation** (**Submitting…** / **Submitted — redirecting…**)

**6.3.4** Toasts: *Form published* / *Form returned to admin*.

**Note:** Records reviews **forms**. Client TA **tickets** go to Admin Approvals, not Records.

*[Screenshot placeholder]*
**Figure 50 – Recommendation panel — Approve & publish / Disapprove**

### 6.4 Published Forms

**6.4.1** Open **Published Forms**. Columns: Form | Ref | Effectivity | Version. Empty: *No published forms.*

*[Screenshot placeholder]*
**Figure 51 – Published Forms list**

### 6.5 Activity Logs

**6.5.1** Open **Activity Logs**. Columns: When | Actor | Action | Summary. Empty: *No activity yet.*

**Note:** Messaging is not available in Records.

*[Screenshot placeholder]*
**Figure 52 – Records Activity Logs**

---

## 7. Client Portal (Staff)

### 7.1 Submit Request

**7.1.1** Open **Submit Request**. Title: **Submit Request**. Description: *Submitting as {name}. This request will appear in your list only.*

*[Screenshot placeholder]*
**Figure 53 – Submit Request page**

**7.1.2** Panel **Choose a form**. Label **Published form**. Select from dropdown (*Select a form…*).

**7.1.3** Click **View form file** to preview the printable template.

**7.1.4** Review **Your requestor details (auto-filled)** from PAMANA: Division/Section, Designation, First/Middle/Last Name, Email.

*[Screenshot placeholder]*
**Figure 54 – Published form selection and PAMANA autofill block**

**7.1.5** Complete remaining dynamic form fields required by the selected form.

**7.1.6** Click **Submit request**. Toast: *Request submitted — Ticket … is pending admin approval.* Status starts as **pending approval**.

**7.1.7** Validation examples: *Fill in at least one field…*; PAMANA required errors if museum username is not linked. Empty published forms: *No forms available.*

*[Screenshot placeholder]*
**Figure 55 – Submit Request — filled fields ready to submit**

### 7.2 My Requests and Ticket Detail

**7.2.1** Open **My Requests**. Description: *All tickets linked to your account…* Columns and actions similar to Admin My Requests.

*[Screenshot placeholder]*
**Figure 56 – Client My Requests list**

**7.2.2** Open **View details**. Main column: Uploaded file; Submitted answers; Request details.

*[Screenshot placeholder]*
**Figure 57 – Client ticket detail — main content**

**7.2.3 Sidebar — Assigned personnel.** Shows who was assigned after Admin assignment.

*[Screenshot placeholder]*
**Figure 58 – Assigned personnel sidebar**

**7.2.4 Sidebar — Complete service.** When status is open / in progress / pending / reopened, click **Mark service complete**. Status becomes **resolved**.

*[Screenshot placeholder]*
**Figure 59 – Mark service complete**

**7.2.5 Client Feedback panel (after resolved):**

1. Click **Open Client Satisfaction Survey** (requires survey URL configuration)
2. Optionally enter Notes for admin
3. Click **I've submitted feedback**

*[Screenshot placeholder]*
**Figure 60 – Client Satisfaction Survey / feedback confirmation**

**7.2.6 Close request panel:** Click **Close ticket** (status **closed**) or **Reopen request** (status **reopened**).

**7.2.7** When closed: notice **Request closed** — *Thank you for your feedback.*

**7.2.8** Header may show **Request messages** for ticket-linked chat.

*[Screenshot placeholder]*
**Figure 61 – Close ticket / Reopen request**

### 7.3 Service Feedback

**7.3.1** Open **Service Feedback**. Sections: **Awaiting feedback**; **Ready to close (N)** with **Close request**.

**7.3.2** Empty: *No feedback pending.* Warning appears if the survey URL is not configured.

*[Screenshot placeholder]*
**Figure 62 – Service Feedback page**

### 7.4 Client Dashboard Details

**7.4.1** Alerts may prompt: Submit feedback; Mark service complete; requests rejected.

**7.4.2** Stats: Active requests; Pending approval; Completed. Recent requests with **View** / **Feedback**.

*[Screenshot placeholder]*
**Figure 63 – Client Dashboard alerts and recent requests**

---

## 8. Shared Features

### 8.1 Messages (Admin and Client only)

**8.1.1** Open **Messages**. Title: **Messages**. Description: *Real-time group chat and direct messages with admin, records, and clients.*

*[Screenshot placeholder]*
**Figure 64 – Messages — chat list**

**8.1.2** Sidebar **Chats** with **New**. Empty: *No chats yet.* / *Select a chat…*

**8.1.3** Open a thread. Use composer and **Send**. Use **Poke** to nudge.

**8.1.4** Dialog **New message**: Search (*Search by name, email, or division…*); sections Admin / Clients; Message or **Poke**.

*[Screenshot placeholder]*
**Figure 65 – New message dialog**

*[Screenshot placeholder]*
**Figure 66 – Active chat thread with Send and Poke**

**8.1.5** From a ticket detail page, open **Request messages** for a ticket-linked conversation.

*[Screenshot placeholder]*
**Figure 67 – Request messages from ticket detail**

### 8.2 Notifications

**8.2.1** Click the bell in the header.

*[Screenshot placeholder]*
**Figure 68 – Notification bell dropdown**

**8.2.2** Typical focus by portal:

- Admin — pending approvals, messages, pokes (View all → Approvals)
- Records — pending forms (empty message: *No forms waiting for review*)
- Client — actionable request updates (*No updates on your requests*)
- Super Admin — system alerts (*No system alerts*)

### 8.3 Settings

**8.3.1** Open **Settings** (sidebar footer) or Super Admin **My Profile / Settings**.

**8.3.2** Title: **Settings**. Description: *Manage your account details and password for this portal.*

*[Screenshot placeholder]*
**Figure 69 – Settings — Account panel**

**8.3.3 Account panel:**

- Email (disabled)
- Role (disabled: Super Admin / Admin / Records / Staff)
- **Display name** (*Your name*)
- **Division / office** (*e.g. ICT*)
- **Designation** (*e.g. Museum Researcher*)
- **Save profile** / **Saving…** → toast *Profile updated*

**8.3.4 Password panel:** Current / New / Confirm → **Change password** / **Updating…** → toast *Password changed*

**8.3.5 Validation toasts:** *Name and division are required*; *New password must be at least 6 characters*; *New password and confirmation do not match*

*[Screenshot placeholder]*
**Figure 70 – Settings — Password panel**

---

## 9. Status Reference and End-to-End Flows

### 9.1 Form Statuses

| Status | Meaning |
|--------|---------|
| Draft | Saved by Admin; not yet submitted to Records |
| Pending Review | Submitted to Records; awaiting recommendation |
| Published | Approve & publish completed; available for Submit Request |
| Disapproved | Returned to Admin with remarks |

### 9.2 Ticket Statuses

| Status | Meaning |
|--------|---------|
| pending approval | Awaiting Admin approve/reject |
| open | Set when Admin **Approves** the request |
| rejected | Rejected with reason |
| in progress | Set when personnel are **Assigned** |
| pending | Holding status set by Admin when allowed |
| resolved | Requestor clicked **Mark service complete** |
| closed | Requestor clicked **Close ticket** after feedback |
| reopened | Requestor clicked **Reopen request** |

**Important:** Approve does **not** leave the ticket as “Approved”. The system sets **Open**.

### 9.3 End-to-End Flow A — Publish a Form

1. Admin → Form Builder → complete Steps 1–4
2. Click **Submit to Records** (or draft then **Send to Records** / **Resubmit**)
3. Form status → Pending Review
4. Records → Pending Forms → Review
5. **Approve & publish** → Published OR **Disapprove** + remarks → Disapproved

*[Screenshot placeholder]*
**Figure 71 – Flow A summary — Form publishing lifecycle**

### 9.4 End-to-End Flow B — Staff TA Request Lifecycle

1. Staff → Submit Request → select published form → autofill → Submit request → **pending approval**
2. Admin → Approvals → Approve → status **Open**
3. Admin → Request Management → Assign personnel (form owner division) → **In Progress**
4. Assignee works under My Assignments; may Update status (in progress / pending)
5. Staff → Mark service complete → **resolved**
6. Staff → Open Client Satisfaction Survey → I've submitted feedback
7. Staff → Close ticket → **closed** (or Reopen request)

*[Screenshot placeholder]*
**Figure 72 – Flow B summary — Ticket lifecycle from submit to close**

### 9.5 End-to-End Flow C — Admin as Requestor

1. Admin → Submit TA Request / My Requests → New request
2. Same submission UX as Staff
3. Ticket appears under Admin My Requests
4. Another Admin may Approve/Assign via Approvals / Request Management
5. Requestor completes Mark service complete → feedback → Close on My Requests detail

*[Screenshot placeholder]*
**Figure 73 – Flow C summary — Admin personal TA request**

### 9.6 End-to-End Flow D — Super Admin Portal Switch + RBAC

1. Login as Super Admin → Super Admin Dashboard
2. Open Admin / Records / Staff via PORTALS / ACCESS or dashboard cards
3. Use SWITCH PORTAL to return or change portal
4. Manage Users / Roles / Permissions only under Super Admin
5. Logout clears all portal sessions

*[Screenshot placeholder]*
**Figure 74 – Flow D summary — Super Admin multi-portal and RBAC**

---

## 10. Frequently Asked Questions

**10.1 Why are Division / Name / Email empty?** Sign in with museum username linked in PAMANA.

**10.2 Do client tickets go to Records?** No. Records reviews forms. Tickets go to Admin Approvals.

**10.3 Can Admin submit a TA request?** Yes — Submit TA Request / My Requests.

**10.4 Why is Messages missing in Records?** Messaging is Admin and Client only.

**10.5 Where is RBAC?** Super Admin → Users / Roles / Permissions only.

**10.6 After Approve, why is status Open?** Correct. Approve sets **Open**; then assign in Request Management.

**10.7 Why is the assignee list limited?** Only active Admins in the **form creator’s division**.

**10.8 What does Mark service complete do?** Sets **resolved** and starts feedback/close steps.

**10.9 Survey link missing?** Service Feedback warns if the Client Satisfaction Survey URL is not configured.

**10.10 What are system roles?** Super Admin, Admin, Record Management, Staff (user).

---

## 11. List of Figures

1. Log-in page (Welcome Back)
2. Common portal chrome
3. Super Admin Dashboard
4. Admin Dashboard
5. Records Dashboard
6. Client Dashboard
7. Super Admin sidebar
8. Admin sidebar
9. Records sidebar
10. Client sidebar
11. SWITCH PORTAL block
12. Super Admin stats and portal access
13. Recent activities feed
14. Super Admin Reports
15. Users list
16. Assign / Manage roles dialog
17. Roles list
18. Create role dialog
19. Manage role permissions
20. Permissions catalog
21. Super Admin Settings
22. Form Management
23. Activity Logs
24. System Notifications
25. Admin Dashboard pending requests
26. Form Builder step indicator
27. Form Builder Step 1 General
28. Form Builder Step 2 Fields
29. Form Builder Step 3 Print Template
30. Print preview dialog
31. Form Builder Step 4 Procedure / Submit
32. My Forms Analytics
33. My Forms cards
34. Approvals list
35. Reject request panel
36. Request Management list
37. Admin ticket header
38. Uploaded file and answers
39. Approve or reject sidebar
40. Assign personnel sidebar
41. Update status / Waiting for client
42. My Assignments
43. Admin Submit TA Request
44. Admin My Requests
45. Admin My Request detail
46. Admin Reports
47. Records Dashboard
48. Pending Forms list
49. Form template view-only
50. Recommendation panel
51. Published Forms
52. Records Activity Logs
53. Submit Request page
54. Form selection and PAMANA autofill
55. Submit Request filled form
56. Client My Requests
57. Client ticket main content
58. Assigned personnel
59. Mark service complete
60. Feedback / survey confirmation
61. Close / Reopen
62. Service Feedback page
63. Client Dashboard alerts
64. Messages chat list
65. New message dialog
66. Active chat thread
67. Request messages
68. Notification bell
69. Settings Account
70. Settings Password
71. Flow A — Form publishing
72. Flow B — Ticket lifecycle
73. Flow C — Admin as requestor
74. Flow D — Super Admin RBAC / portals

---

*— End of Employee User Manual V2.0 (Detailed Edition) —*
