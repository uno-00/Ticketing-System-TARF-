# TARF System  
# Employee User Manual V1.0

**National Museum of the Philippines**  
**Technical Assistance Request Form (TARF) Support Ticketing System**

Version 1.0 · September 2026

---

## Table of Contents

1. [Introduction](#1-introduction)  
   1.1 [Overview](#11-overview)  
   1.2 [Objectives](#12-objectives)  
   1.3 [User’s Role, Access and Permission](#13-users-role-access-and-permission)  
2. [General Information](#2-general-information)  
   2.1 [Objectives](#21-objectives)  
   2.2 [System Features](#22-system-features)  
   2.3 [System Users and Their Descriptions](#23-system-users-and-their-descriptions)  
3. [Getting Started](#3-getting-started)  
   3.1 [Log-in / Sign In](#31-log-in--sign-in)  
   3.2 [Dashboard](#32-dashboard)  
   3.3 [System Navigation](#33-system-navigation)  
4. [Admin Portal](#4-admin-portal)  
   4.1 [Form Builder](#41-form-builder)  
   4.2 [My Forms](#42-my-forms)  
   4.3 [Approvals](#43-approvals)  
   4.4 [Request Management](#44-request-management)  
   4.5 [My Assignments](#45-my-assignments)  
   4.6 [My Requests / Submit TA Request](#46-my-requests--submit-ta-request)  
   4.7 [Reports](#47-reports)  
   4.8 [RBAC (Users, Roles, Permissions)](#48-rbac-users-roles-permissions)  
5. [Records Portal](#5-records-portal)  
   5.1 [Pending Forms](#51-pending-forms)  
   5.2 [Published Forms](#52-published-forms)  
   5.3 [Activity Logs](#53-activity-logs)  
6. [Client Portal (Staff)](#6-client-portal-staff)  
   6.1 [Submit Request](#61-submit-request)  
   6.2 [My Requests](#62-my-requests)  
   6.3 [Service Feedback](#63-service-feedback)  
7. [Shared Features](#7-shared-features)  
   7.1 [Messages](#71-messages)  
   7.2 [Notifications](#72-notifications)  
   7.3 [Settings](#73-settings)  
8. [Status Reference](#8-status-reference)  
   8.1 [Form Statuses](#81-form-statuses)  
   8.2 [Ticket Statuses](#82-ticket-statuses)  
   8.3 [End-to-End Workflow Summary](#83-end-to-end-workflow-summary)  
9. [Frequently Asked Questions](#9-frequently-asked-questions)

---

## 1. Introduction

### 1.1 Overview

The **Technical Assistance Request Form (TARF) System** is the support ticketing platform of the National Museum of the Philippines (NMP). It streamlines the creation, review, submission, approval, assignment, and completion of technical assistance (TA) requests.

It provides administrators, records personnel, and staff with the tools needed to:

- build and publish TA forms,
- review and publish form templates,
- submit TA requests with requestor details auto-filled from the PAMANA employee directory,
- approve and assign work to ICT personnel, and
- track service completion, feedback, and closure.

This manual serves as a guide for authorized employees in using the TARF System. It covers logging in and navigating each portal (Admin, Records, and Client), managing forms and requests, messaging, notifications, and account settings.

The TARF System aims to improve efficiency, accountability, and transparency in technical assistance handling by reducing manual paperwork, ensuring requestor details are accurate through PAMANA integration, and providing a clear audit trail for every request processed within the system. This manual is intended for authorized NMP personnel responsible for operating or using the platform according to their assigned role.

### 1.2 Objectives

The Technical Assistance Request Form (TARF) System of the National Museum of the Philippines (NMP) aims to provide a centralized and efficient platform for monitoring, managing, and tracking technical assistance requests within the organization. The system will improve request visibility, accountability, processing efficiency, and timely action by authorized personnel and offices.

The TARF System aims to make the creation, review, submission, approval, assignment, and closure of technical assistance requests easier and more organized. It helps users quickly check the status of TA forms and tickets, reduce delays, and keep a clear record of transactions. The system also provides dashboards, notifications, messaging, and reports to help offices monitor pending and completed requests.

### 1.3 User’s Role, Access and Permission

1.3.1 **Super Admin** has the highest level of system access and is responsible for overall system administration, including managing roles, permissions, and related administrative functions. In the TARF portals, Super Admin uses the **Admin** portal after sign-in.

1.3.2 **Admin** covers Section Head (ODG Section and Regional Component Museum) and Division Head (All except ODG). Admin is responsible for Form Builder and My Forms, approving client TA requests, assigning ICT personnel, monitoring Request Management and My Assignments, submitting personal TA requests when needed, and managing RBAC Users, Roles, and Permissions.

1.3.3 **Record Management** (portal title: **Record Admin**) is responsible for reviewing forms pending publication, approving and publishing forms for client use, or disapproving forms with remarks, and monitoring Activity Logs.

1.3.4 **Staff** (portal role key: `user`, displayed as **Staff**) is responsible for submitting technical assistance requests, tracking My Requests, marking service complete, submitting feedback, closing or reopening requests, and using Messages.

---

## 2. General Information

The TARF System of the National Museum of the Philippines (NMP) aims to provide a centralized and efficient platform for monitoring, managing, and tracking technical assistance requests within the organization. The system will improve request visibility, accountability, processing efficiency, and timely action by authorized personnel and offices.

### 2.1 Objectives

The TARF System of the National Museum of the Philippines (NMP) aims to make receiving, reviewing, submitting, approving, assigning, and closing technical assistance requests easier and more organized. It helps users quickly check the status of forms and tickets, reduce delays and misplaced requests, and keep a clear record of transactions. The system also provides reports and updates to help offices monitor pending and completed requests.

### 2.2 System Features

2.2.1 **Form Builder.** The system allows authorized Admin users to create TA forms with fields, a print template, field placements, and a procedure section, then submit the form to Records for review.

2.2.2 **Form Review and Publishing.** The system allows Record Management users to review pending forms, approve and publish them for client use, or disapprove them with remarks for return to Admin.

2.2.3 **Request Submission.** The system allows Staff (Client Portal) and Admin users (Submit TA Request / My Requests) to submit technical assistance requests using published forms.

2.2.4 **PAMANA Requestor Autofill.** The system fills Division/Section, First Name, Middle initial, Last Name, Email, and Designation from PAMANA employee records linked to the signed-in museum username.

2.2.5 **Request Approval.** The system allows Admin users to approve or reject pending client requests on the Approvals page before assignment.

2.2.6 **Personnel Assignment.** The system allows Admin users to assign approved (Open) tickets to ICT personnel from Request Management ticket details. Assigned staff can track work under My Assignments.

2.2.7 **Status Tracking.** The system allows users to monitor ticket statuses such as Pending Approval, Open, Rejected, In Progress, Pending, Resolved, Closed, and Reopened.

2.2.8 **Service Completion and Feedback.** The system allows the requestor to mark service complete, open the Client Satisfaction Survey, confirm feedback, then close or reopen the request.

2.2.9 **Form Preview.** The system allows users to view the form template and how answers, including PAMANA fields, appear on the printable form.

2.2.10 **Notifications and Alerts.** The system notifies users of pending approvals, pending form reviews, and actionable request updates.

2.2.11 **Role-Based Access Control.** The system restricts access to functions according to the user’s assigned role and level of authority.

2.2.12 **Messaging.** The system supports chats, ticket-linked threads, pokes, and mentions for Admin and Client portals.

2.2.13 **Dashboard.** The system provides a centralized dashboard showing key counts and activities for each portal.

2.2.14 **Reports and Analytics.** The system generates reports on request volume, completion, and client feedback.

2.2.15 **System Administration.** The system provides administrators with tools to configure roles, permissions, and related RBAC settings.

### 2.3 System Users and Their Descriptions

2.3.1 **Super Admin** has the highest level of system access and is responsible for overall system administration, including managing user roles, permissions, and other administrative functions. After login, Super Admin uses the Admin portal.

2.3.2 **Admin** — Section Head (ODG Section and Regional Component Museum); Division Head (All except ODG). Manages forms, approvals, assignments, requests, reports, and RBAC.

2.3.3 **Record Management** (Record Admin portal) is responsible for managing and monitoring form review and publishing, including Pending Forms, Published Forms, and Activity Logs.

2.3.4 **Staff** is the employee / client requester responsible for submitting and tracking their own technical assistance requests.

---

## 3. Getting Started

### 3.1 Log-in / Sign In

3.1.1 To start using the web application, open any web browser and type the TARF System address in the address bar (for example, `http://on-prem.x-dcb.net:5173/login`). The TARF System log-in page will be displayed (**Figure 1**).

3.1.2 On the **Welcome Back** page, enter a valid **Username** (museum organization username; email is also accepted) and **Password**, then click **Sign In**.

3.1.3 Optional: select **Remember me** to save your username on this device for the next visit. Use **Forgot password?** to see the instruction to contact your system administrator.

3.1.4 After successful sign-in, the system redirects the user by role:

| Role | Landing page |
|------|----------------|
| Admin / Super Admin | Admin Dashboard (`/admin/dashboard`) |
| Record Management | Records Dashboard (`/records/dashboard`) |
| Staff | Client Dashboard (`/client/dashboard`) |

**Note:** Sign in with your museum organization username so PAMANA can match your employee record for requestor autofill. Legacy portal login URLs (`/admin/login`, `/client/login`, `/records/login`) redirect to the unified `/login` page.

**Figure 1 – TARF System log-in page**

*(Insert screenshot of the Welcome Back / Sign In screen.)*

### 3.2 Dashboard

Upon login, the user will be directed to the Dashboard. The Dashboard serves as the main landing page of the TARF System. It provides users with an overview of forms and request activities, statuses, and quick access to frequently used functions.

#### 3.2.1 Admin Dashboard

3.2.1.1 Displays a personalized greeting (for example, **Good day, {name}**).

3.2.1.2 Shows a snapshot of TA forms and pending client requests awaiting approval. Disapproved forms needing revision may also appear.

3.2.1.3 Provides navigation toward Approvals, Request Management, and Form Builder.

**Figure 2 – Admin Dashboard**

#### 3.2.2 Records Dashboard

3.2.2.1 Displays **Welcome, {firstName}** with the Records portal context (shell title: **Record Admin**).

3.2.2.2 Shows counts for pending forms and published forms.

3.2.2.3 Highlights items needing review under **Pending Forms**.

**Figure 3 – Records Dashboard**

#### 3.2.3 Client Dashboard

3.2.3.1 Displays **Welcome back, {name}** and an overview of **Your requests**.

3.2.3.2 Provides visibility of recent request statuses and links toward Submit Request and My Requests.

**Figure 4 – Client Dashboard**

### 3.3 System Navigation

3.3.1 The left-side menu provides access to the main features of the system. The sidebar brand shows **National Museum of the Philippines** / **TARF SYSTEM**.

3.3.2 The bottom of the sidebar provides **Settings** and **Logout**.

3.3.3 The header includes the notification bell and the current page title.

#### 3.3.4 Admin Navigation

| Section | Menu item | Purpose |
|---------|-----------|---------|
| MAIN | Dashboard | Overview |
| MAIN | Reports | Reports & Analytics |
| MAIN | Messages | Messaging |
| FORMS | Form Builder | Create / edit TA forms |
| FORMS | My Forms | Drafts, pending, published, disapproved forms |
| REQUESTS | Approvals | Pending client TA approvals |
| REQUESTS | Request Management | All client requests |
| REQUESTS | My Assignments | Tickets assigned to you (page title: My Assigned Requests) |
| REQUESTS | My Requests | Your own TA submissions |
| REQUESTS | Submit TA Request | Submit a TA request as requestor |
| RBAC | Users | Assign roles to employees |
| RBAC | Roles | Manage roles and permissions |
| RBAC | Permissions | Permission catalog |

#### 3.3.5 Records Navigation

| Section | Menu item | Purpose |
|---------|-----------|---------|
| MAIN | Dashboard | Overview |
| FORMS | Pending Forms | Forms awaiting recommendation |
| FORMS | Published Forms | Live forms for clients |
| SYSTEM | Activity Logs | Audit trail |

#### 3.3.6 Client Navigation

| Section | Menu item | Purpose |
|---------|-----------|---------|
| MAIN | Dashboard | Overview of your requests |
| MAIN | Messages | Messaging |
| REQUESTS | Submit Request | Submit a new TA request |
| REQUESTS | My Requests | Track and manage your tickets |
| REQUESTS | Service Feedback | Pending feedback actions |

**Figure 5 – Sample portal navigation (sidebar)**

---

## 4. Admin Portal

### 4.1 Form Builder

4.1.1 Open **Form Builder** from the FORMS section.

4.1.2 Complete the wizard in order:

| Step | Name | Description |
|------|------|-------------|
| 1 | **General** | Form title, reference details, and general settings |
| 2 | **Fields** | Define input fields for the client request |
| 3 | **Print Template** | Upload the printable template and place fields (including default PAMANA profile fields) |
| 4 | **Procedure** | Procedure / instructions content |

4.1.3 Use **Back** and **Continue** to move between steps.

4.1.4 On the Print Template step, place form fields on the template. Default **Requester profile** fields are always available:

| Field label (placement) | Variable | Shown on Submit as |
|-------------------------|----------|--------------------|
| Division/Section | `{{prof_division}}` | Division/Section |
| First Name | `{{prof_first}}` | First name |
| Middle Name | `{{prof_middle}}` | Middle initial |
| Last Name | `{{prof_last}}` | Last name |
| Email Address | `{{prof_email}}` | Email |
| Designation | `{{prof_designation}}` | Designation |

4.1.5 When ready for Records review, click **Submit to Records**. The wizard notes that this sends the form to Record Admin for review. To keep working later, click **Save as draft instead**.

**Figure 6 – Form Builder wizard**

### 4.2 My Forms

4.2.1 Open **My Forms** to view forms you created. The page header shows **My Forms Analytics**; the list section is titled **My Forms**.

4.2.2 Use **+ New Form** / **Create Form** to start a new form.

4.2.3 For a draft, use **Send to Records** when ready for review.

4.2.4 For a disapproved form, review remarks, edit in Form Builder, then **Resubmit**.

4.2.5 For other statuses, use **View** to open the form details.

**Figure 7 – My Forms**

### 4.3 Approvals

4.3.1 Open **Approvals** to see client TA requests with status **Pending Approval**.

4.3.2 Review the request details. Use **View file** to open the form preview when needed.

4.3.3 Click **Approve** to accept the request, or **Reject** to open the reject panel (**Reject request**).

4.3.4 When rejecting, enter a **Reason for rejection** and confirm with **Confirm reject** (or **Cancel**).

4.3.5 After approval, the ticket status becomes **Open** and leaves the Approvals list. Assignment is **not** done on Approvals.

**Figure 8 – Approvals**

### 4.4 Request Management

4.4.1 Open **Request Management** to view all client requests.

4.4.2 Typical list columns include Ticket, Client, Division, Status, and Action. Open a ticket with **Manage →**.

4.4.3 On the ticket detail page you may:

- **Approve or reject** (if still pending approval) using **Approve request** / **Reject request**,
- **Assign personnel** — choose from **ICT personnel (all divisions)**, then click **Assign**,
- **Update status** using **in progress** or **pending** when allowed,
- open **Request messages**.

4.4.4 Assigning ICT personnel moves the ticket to **In Progress** (unless it is already resolved or closed). Assignees are active Admin-role ICT users.

**Figure 9 – Request Management**

### 4.5 My Assignments

4.5.1 Open **My Assignments** from the menu. The page title is **My Assigned Requests**.

4.5.2 This list shows tickets assigned to you that are still active (Open, In Progress, Pending, or Reopened). Use **Open →** to view a ticket.

4.5.3 Track work until the requestor marks the service complete and closes the request. Resolved and closed tickets drop off this active list.

**Figure 10 – My Assigned Requests**

### 4.6 My Requests / Submit TA Request

Admin users may also act as requestors.

4.6.1 Open **Submit TA Request** to submit a personal TA request using a published form (same flow as Client Submit Request, including PAMANA autofill).

4.6.2 The ticket is created with status **Pending Approval** and appears on **Approvals** like any other client request.

4.6.3 Open **My Requests** to track your own submissions.

4.6.4 From a ticket detail page you may **Mark service complete**, complete the feedback steps, **Close ticket**, or reopen, as applicable. (Admin requestors do not have a Service Feedback menu item; use the ticket detail / feedback panel.)

**Figure 11 – Admin My Requests**

### 4.7 Reports

4.7.1 Open **Reports**, titled **Reports & Analytics**.

4.7.2 Review volume, completion, and client feedback summaries to monitor operational performance.

**Figure 12 – Reports & Analytics**

### 4.8 RBAC (Users, Roles, Permissions)

4.8.1 Open **Users** to search employees, filter by role or access, and use **Assign** or **Manage**.

4.8.2 Dialog titles are **Assign roles** / **Manage roles**. Save with **Save roles**. Use pagination **Prev** / **Next**.

4.8.3 Open **Roles** to review system roles (**Super Admin**, **Admin**, **Record Management**, **Staff**) and manage permissions. System roles cannot be deleted.

4.8.4 Open **Permissions** to browse the capability catalog by category.

**Figure 13 – RBAC Users**

---

## 5. Records Portal

### 5.1 Pending Forms

5.1.1 Open **Pending Forms** to see forms with status **Pending Review**.

5.1.2 Use Search / **Refresh** as needed. Open a form with **View file** or **Review**.

5.1.3 Open a form to review the **Form template** (view-only).

5.1.4 Under **Recommendation**, select:

- **Approve & publish**, or  
- **Disapprove** (provide remarks as required).

5.1.5 Click **Submit recommendation**.

5.1.6 Approved forms become **Published** and appear under Published Forms for clients. Disapproved forms return to Admin with remarks.

**Figure 14 – Pending Forms / Recommendation**

### 5.2 Published Forms

5.2.1 Open **Published Forms** to browse live TA forms available for client submission.

**Figure 15 – Published Forms**

### 5.3 Activity Logs

5.3.1 Open **Activity Logs** to review the audit trail of records-related actions. Ticket-related activity lines may appear in the feed, but Records cannot open or manage tickets.

**Note:** Messaging is not available in the Records portal. Records focuses on form review and publishing.

**Figure 16 – Activity Logs**

---

## 6. Client Portal (Staff)

### 6.1 Submit Request

6.1.1 Open **Submit Request**.

6.1.2 Under **Choose a form**, select a **Published form** (option text: **Select a form…**).

6.1.3 The system loads your requestor profile from PAMANA when your museum username is linked. Profile summary labels include Division/Section, Designation, First name, Middle initial, Last name, and Email.

6.1.4 Complete any remaining form fields required for the request. At least one field must be filled before submit.

6.1.5 Click **View form file** to preview how answers appear on the printable template.

6.1.6 Click **Submit request**. The ticket is created with status **Pending Approval** for Admin review.

**Figure 17 – Submit Request**

### 6.2 My Requests

6.2.1 Open **My Requests** to list tickets linked to your account. Use **New request** (or **Submit request** when empty) to start another submission.

6.2.2 Typical columns: Ticket, Form, Status, Assigned to, Submitted, Action.

6.2.3 Action links may show **View details**, **Mark complete →**, **Submit feedback →**, or **Close request →**, depending on status.

6.2.4 When ICT work is finished and the status allows it, click **Mark complete →** / mark service complete. The ticket becomes **Resolved**.

6.2.5 Complete the feedback step (see Service Feedback). Feedback must be recorded before you can close.

6.2.6 When ready, open the ticket and click **Close ticket**. To continue work, reopen as prompted when not satisfied.

**Figure 18 – My Requests / ticket detail**

### 6.3 Service Feedback

6.3.1 Open **Service Feedback**. The page description explains that after ICT completes your request, you complete the official satisfaction survey, then confirm here.

6.3.2 Under **Awaiting feedback**, for each ticket:

1. Click **Open Client Satisfaction Survey** (opens in a new tab; ticket number is included).  
2. Optionally enter **Notes for admin**.  
3. Click **I've submitted feedback**.

6.3.3 Under **Ready to close**, open each request with **Close request** and then click **Close ticket** on the detail page when you are satisfied.

6.3.4 If the feedback link is not configured, ask your administrator to set `VITE_CLIENT_FEEDBACK_URL` in the frontend environment.

**Figure 19 – Service Feedback**

---

## 7. Shared Features

### 7.1 Messages

7.1.1 Available in **Admin** and **Client** portals under **Messages**.

7.1.2 Use **Chats** to open existing conversations.

7.1.3 Click **New** to open **New message**, select recipients, compose, and **Send**.

7.1.4 Use **Poke** where available to nudge participants.

7.1.5 From a ticket detail page, open **Request messages** to join or continue the ticket-linked thread.

**Figure 20 – Messages**

### 7.2 Notifications

7.2.1 Click the notification bell in the header.

7.2.2 Typical destinations for “View all”:

| Portal | Notification focus | View all goes to |
|--------|--------------------|------------------|
| Admin | Pending client approvals | Approvals |
| Records | Pending forms | Pending Forms |
| Client | Actionable request updates | My Requests |

**Figure 21 – Notifications**

### 7.3 Settings

7.3.1 Open **Settings** from the sidebar footer.

7.3.2 Under **Account**, update **Display name**, **Division / office**, and **Designation** as allowed, then **Save profile**. **Email** and **Role** are shown for reference. Role labels in Settings may show **Admin**, **Records**, or **Staff**.

7.3.3 Under **Password**, enter **Current password**, **New password**, and **Confirm new password**, then **Change password**.

**Figure 22 – Settings**

---

## 8. Status Reference

### 8.1 Form Statuses

| Status | Meaning |
|--------|---------|
| **Draft** | Saved by Admin; not yet submitted to Records |
| **Pending Review** | Submitted to Records; awaiting recommendation |
| **Published** | Approved by Records; available for client submission |
| **Disapproved** | Returned to Admin with remarks |

### 8.2 Ticket Statuses

| Status | Meaning |
|--------|---------|
| **Pending Approval** | Awaiting Admin approve / reject on Approvals |
| **Open** | Approved; ready for assignment or processing |
| **Rejected** | Rejected with reason (terminal; submit a new request if needed) |
| **In Progress** | ICT personnel assigned; work ongoing |
| **Pending** | Holding status set by Admin after approval |
| **Resolved** | Requestor marked service complete; feedback / close next |
| **Closed** | Closed after feedback (requestor confirmed satisfied) |
| **Reopened** | Reopened by requestor for further action |

**Note:** Clicking **Approve** sets the ticket to **Open** (there is no separate live “Approved” ticket status). Assigning ICT personnel from Request Management then moves it to **In Progress**.

### 8.3 End-to-End Workflow Summary

**Phase 1 — Form publishing**

8.3.1 Admin builds the form in Form Builder.  
8.3.2 Admin clicks **Submit to Records** (or **Send to Records** / **Resubmit** from My Forms).  
8.3.3 Record Admin reviews and selects **Approve & publish** or **Disapprove**.

**Phase 2 — Technical assistance request**

8.3.4 Staff (or Admin as requestor) submits via Submit Request → **Pending Approval**.  
8.3.5 Admin approves on **Approvals** → **Open** (or rejects → **Rejected**).  
8.3.6 Admin opens the ticket in **Request Management**, assigns ICT personnel → **In Progress**.  
8.3.7 ICT performs the work under **My Assignments** (Admin may also set **pending** as a hold).  
8.3.8 Requestor marks service complete → **Resolved**, completes Service Feedback, then closes (**Closed**) or reopens (**Reopened**).

---

## 9. Frequently Asked Questions

**9.1 Why are my Division / Name / Email empty on the form preview?**  
Sign in with your museum username so PAMANA can match your employee record. If no PAMANA staff record is found, profile fields cannot auto-fill.

**9.2 Do client submissions go to Records?**  
No. Records reviews **forms** for publishing. Client TA tickets go to **Admin Approvals**.

**9.3 Can Admin submit a TA request?**  
Yes. Use **Submit TA Request** and track it under **My Requests**. It still goes through Approvals.

**9.4 Where do I assign ICT after I approve a request?**  
On **Request Management**, open the ticket (**Manage →**), then use **Assign personnel**.

**9.5 Why is Messages missing in Records?**  
Messaging is available in Admin and Client portals only.

**9.6 What are the current system roles?**  
Super Admin, Admin (Section Head / Division Head scope), Record Management, and Staff.

**9.7 Must I submit feedback before closing?**  
Yes. After marking service complete, complete the Client Satisfaction Survey steps and confirm **I've submitted feedback** before **Close ticket**.

---

## Appendix A — Portal URLs (typical)

| Portal | Path |
|--------|------|
| Login | `/login` |
| Admin | `/admin/dashboard` |
| Records | `/records/dashboard` |
| Client | `/client/dashboard` |

Exact hostnames depend on deployment (for example, `http://on-prem.x-dcb.net:5173`).

## Appendix B — PAMANA profile fields

| Placement label | Variable | Submit summary label |
|-----------------|----------|----------------------|
| Division/Section | `{{prof_division}}` | Division/Section |
| First Name | `{{prof_first}}` | First name |
| Middle Name | `{{prof_middle}}` | Middle initial |
| Last Name | `{{prof_last}}` | Last name |
| Email Address | `{{prof_email}}` | Email |
| Designation | `{{prof_designation}}` | Designation |

## Appendix C — Document control

| Item | Value |
|------|--------|
| Document title | TARF System Employee User Manual |
| Version | 1.0 |
| Date | September 2026 |
| Structure based on | NMP DTS Employee Manual format |
| System | National Museum TARF Support Ticketing System |

---

*End of Employee User Manual V1.0*
