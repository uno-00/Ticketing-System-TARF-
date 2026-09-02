# PAMANA: TARF  
# Employee User Manual V1.0

**National Museum of the Philippines**  
**Technical Assistance Request Form (TARF) System**

Version 1.0 · September 2026

---

## Table of Contents

1. [Introduction](#1-introduction)  
   1.1 [Overview](#11-overview)  
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
9. [Frequently Asked Questions](#9-frequently-asked-questions)

---

## 1. Introduction

### 1.1 Overview

The **Technical Assistance Request Form (TARF) System** is a centralized platform designed to streamline the creation, review, submission, approval, assignment, and completion of technical assistance (TA) requests within the National Museum of the Philippines (NMP).

It provides administrators, records personnel, and staff with the tools needed to:

- build and publish TA forms,
- review and publish form templates,
- submit TA requests with requestor details auto-filled from PAMANA,
- approve and assign work to ICT personnel, and
- track service completion, feedback, and closure.

This manual serves as a guide for authorized employees in using the TARF System. It covers logging in, navigating each portal (Admin, Records, and Client), managing forms and requests, messaging, notifications, and account settings.

The TARF System aims to improve efficiency, accountability, and transparency in technical assistance handling by reducing manual paperwork, ensuring requestor details are accurate through PAMANA integration, and providing a clear audit trail for every request processed within the system.

This manual is intended for authorized NMP personnel responsible for operating or using the platform according to their assigned role.

---

## 2. General Information

The TARF System of the National Museum of the Philippines (NMP) aims to provide a centralized and efficient platform for monitoring, managing, and tracking technical assistance requests within the organization. The system improves request visibility, accountability, processing efficiency, and timely action by authorized personnel and offices.

### 2.1 Objectives

The TARF System aims to:

2.1.1 Make the creation, review, submission, approval, assignment, and closure of technical assistance requests easier and more organized.

2.1.2 Help users quickly check the status of TA forms and tickets, reduce delays, and keep a clear record of transactions.

2.1.3 Auto-fill requestor details (division, name, email, designation) from PAMANA so staff do not re-encode profile data manually.

2.1.4 Provide dashboards, notifications, messaging, and reports to help offices monitor pending and completed requests.

### 2.2 System Features

2.2.1 **Form Builder.** Authorized Admin users can create TA forms with fields, a print template, field placements, and a procedure section, then submit the form to Records for review.

2.2.2 **Form Review and Publishing.** Record Admin users review pending forms, approve and publish them for client use, or disapprove them with remarks for return to Admin.

2.2.3 **Request Submission.** Staff (Client Portal) and Admin users (My Requests / Submit TA Request) can submit technical assistance requests using published forms.

2.2.4 **PAMANA Requestor Autofill.** The system fills Division/Section, First Name, Middle Name, Last Name, Email Address, and Designation from PAMANA employee records linked to the signed-in museum username.

2.2.5 **Request Approval.** Admin users approve or reject pending client requests before assignment.

2.2.6 **Personnel Assignment.** Admin users assign approved tickets to ICT personnel. Assigned staff can track work under My Assignments.

2.2.7 **Status Tracking.** Users can monitor ticket statuses such as pending approval, approved, rejected, open, in progress, pending, resolved, closed, and reopened.

2.2.8 **Service Completion and Feedback.** The requestor marks service complete, submits client satisfaction feedback, then closes or reopens the request.

2.2.9 **Document / Form Preview.** Users can view the form template and how answers (including PAMANA fields) appear on the printable form.

2.2.10 **Messaging.** Admin and Client portals support chats, ticket-linked threads, pokes, and @mentions.

2.2.11 **Notifications.** The system notifies users of pending approvals, pending form reviews, and actionable request updates.

2.2.12 **Role-Based Access Control (RBAC).** Access is restricted according to the user’s assigned role (Super Admin, Admin, Record Management, Staff).

2.2.13 **Reports and Analytics.** Admin users can view request volume, completion, and client feedback summaries.

2.2.14 **Settings.** Users can update display profile details and change their password.

### 2.3 System Users and Their Descriptions

2.3.1 **Super Admin** has the highest level of system access and is responsible for overall system administration, including managing roles, permissions, and other administrative functions. In the TARF portals, Super Admin maps to the Admin portal.

2.3.2 **Admin** (Section Head — ODG Section and Regional Component Museum; Division Head — All except ODG) manages Form Builder and My Forms, approves client TA requests, assigns ICT personnel, monitors Request Management and My Assignments, may submit personal TA requests, and manages RBAC Users / Roles / Permissions.

2.3.3 **Record Management (Record Admin)** is responsible for reviewing forms pending publication, approving and publishing forms for client use, or disapproving forms with remarks, and monitoring Activity Logs.

2.3.4 **Staff** (Employee / Client requester) submits technical assistance requests, tracks My Requests, marks service complete, submits feedback, closes or reopens requests, and uses Messages. Staff is the merged Staff/User role in RBAC (system name `user`, displayed as **Staff**).

---

## 3. Getting Started

### 3.1 Log-in / Sign In

3.1.1 To start using the web application, open any web browser and enter the TARF System address in the address bar (for example, `http://on-prem.x-dcb.net:5173/login`). The **TARF SYSTEM** log-in page will be displayed (**Figure 1**).

3.1.2 On the **Welcome Back** page, enter a valid **Username** (museum org username) or email and **Password**, then click **Sign In**.

3.1.3 Optional: check **Remember me** to keep the session preference on the device.

3.1.4 After successful sign-in, the system redirects the user based on role:

| Role | Landing page |
|------|----------------|
| Admin / Super Admin | Admin Dashboard (`/admin/dashboard`) |
| Record Management | Records Dashboard (`/records/dashboard`) |
| Staff | Client Dashboard (`/client/dashboard`) |

**Note:** Legacy portal login URLs (`/admin/login`, `/client/login`, `/records/login`) redirect to the unified `/login` page.

**Figure 1 – TARF System log-in page**

*(Insert screenshot of the Welcome Back / Sign In screen.)*

### 3.2 Dashboard

Upon login, the user is directed to the Dashboard for their portal. The Dashboard is the main landing page and provides an overview of key activities, counts, and shortcuts.

#### 3.2.1 Admin Dashboard

3.2.1.1 Displays a personalized greeting (for example, **Good day, {name}**).

3.2.1.2 Shows a snapshot of TA forms and pending client requests awaiting approval.

3.2.1.3 Provides quick access toward Approvals, Request Management, and Form Builder via navigation.

**Figure 2 – Admin Dashboard**

#### 3.2.2 Records Dashboard

3.2.2.1 Displays a welcome message for the Record Admin.

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

#### 3.3.4 Admin navigation

| Section | Menu item | Purpose |
|---------|-----------|---------|
| MAIN | Dashboard | Overview |
| MAIN | Reports | Reports & Analytics |
| MAIN | Messages | Messaging |
| FORMS | Form Builder | Create / edit TA forms |
| FORMS | My Forms | Drafts, pending, published, disapproved forms |
| REQUESTS | Approvals | Pending client TA approvals |
| REQUESTS | Request Management | All client requests |
| REQUESTS | My Assignments | Tickets assigned to you |
| REQUESTS | My Requests | Your own TA submissions |
| REQUESTS | Submit TA Request | Submit a TA request as requestor |
| RBAC | Users | Assign roles to employees |
| RBAC | Roles | Manage roles and permissions |
| RBAC | Permissions | Permission catalog |

#### 3.3.5 Records navigation

| Section | Menu item | Purpose |
|---------|-----------|---------|
| MAIN | Dashboard | Overview |
| FORMS | Pending Forms | Forms awaiting recommendation |
| FORMS | Published Forms | Live forms for clients |
| SYSTEM | Activity Logs | Audit trail |

#### 3.3.6 Client navigation

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

4.1.1 Open **Form Builder** from the FORMS section (`/admin/forms`).

4.1.2 Complete the wizard in order:

| Step | Name | Description |
|------|------|-------------|
| 1 | **General** | Form title, reference details, and general settings |
| 2 | **Fields** | Define input fields for the client request |
| 3 | **Print Template** | Upload the printable template and place fields (including default PAMANA profile fields) |
| 4 | **Procedure** | Procedure / instructions content |

4.1.3 Use **Back** and **Continue** to move between steps.

4.1.4 On the Print Template step, place form fields on the template. Default **Requester profile** fields are always available:

| Field label | Variable |
|-------------|----------|
| Division/Section | `{{prof_division}}` |
| First Name | `{{prof_first}}` |
| Middle Name | `{{prof_middle}}` |
| Last Name | `{{prof_last}}` |
| Email Address | `{{prof_email}}` |
| Designation | `{{prof_designation}}` |

4.1.5 When ready for Records review, click **Submit to Records**. To keep working later, use **Save as draft instead**.

**Figure 6 – Form Builder wizard**

### 4.2 My Forms

4.2.1 Open **My Forms** (`/admin/my-forms`) to view forms you created and their analytics.

4.2.2 Use **+ New Form** / **Create Form** to start a new form.

4.2.3 For a draft, use **Send to Records** when ready for review.

4.2.4 For a disapproved form, review remarks, edit in Form Builder, then **Resubmit**.

4.2.5 For other statuses, use **View** to open the form details.

**Figure 7 – My Forms**

### 4.3 Approvals

4.3.1 Open **Approvals** (`/admin/approvals`) to see client TA requests with status **pending approval**.

4.3.2 Review the request details and form file (for example, **View file** / form preview).

4.3.3 Click **Approve** / **Approve request** to accept the request, or **Reject** / **Reject request**.

4.3.4 When rejecting, enter a reason and confirm with **Confirm reject**.

4.3.5 After approval, assign ICT personnel using **Assign personnel** (list of **ICT personnel**), then click **Assign**. The ticket moves to **In Progress** when assignment is completed as designed.

**Figure 8 – Approvals**

### 4.4 Request Management

4.4.1 Open **Request Management** (`/admin/requests`) to view all client requests.

4.4.2 Typical list columns include Ticket, Client, Division, Status, and Action.

4.4.3 Open a ticket to view full details, update status where allowed (**in progress** / **pending**), assign personnel, and open **Request messages**.

**Figure 9 – Request Management**

### 4.5 My Assignments

4.5.1 Open **My Assignments** (`/admin/assigned`) to see requests assigned to you as ICT personnel.

4.5.2 Use this list to track work until the client marks the service complete and closes the request.

**Figure 10 – My Assignments**

### 4.6 My Requests / Submit TA Request

Admin users may also act as requestors.

4.6.1 Open **Submit TA Request** (`/admin/submit-request`) to submit a personal TA request using a published form (same flow as Client Submit Request, including PAMANA autofill).

4.6.2 Open **My Requests** (`/admin/my-requests`) to track your own submissions.

4.6.3 From a ticket detail page you may **Mark service complete**, submit feedback, **Close ticket**, or **Reopen request**, as applicable.

**Figure 11 – Admin My Requests**

### 4.7 Reports

4.7.1 Open **Reports** (`/admin/reports`) titled **Reports & Analytics**.

4.7.2 Review volume, completion, and client feedback summaries to monitor operational performance.

**Figure 12 – Reports & Analytics**

### 4.8 RBAC (Users, Roles, Permissions)

4.8.1 Open **Users** (`/admin/rbac/users`) to search employees, filter by role/access, and **Assign** or **Manage** roles.

4.8.2 Use pagination (**Prev** / **Next**) to move through employee pages.

4.8.3 Open **Roles** to review system roles (Super Admin, Admin, Record Management, Staff) and manage permissions. System roles cannot be deleted.

4.8.4 Open **Permissions** to browse the capability catalog by category.

**Figure 13 – RBAC Users**

---

## 5. Records Portal

### 5.1 Pending Forms

5.1.1 Open **Pending Forms** (`/records/pending`) to see forms with status **Pending Review**.

5.1.2 Use Search to locate a form by title or reference when available.

5.1.3 Open a form to review the **Form template** (view-only).

5.1.4 Under **Recommendation**, select:

- **Approve & publish**, or  
- **Disapprove** (provide remarks as required).

5.1.5 Click **Submit recommendation**.

5.1.6 Approved forms become **Published** and appear under Published Forms for clients. Disapproved forms return to Admin with remarks.

**Figure 14 – Pending Forms / Recommendation**

### 5.2 Published Forms

5.2.1 Open **Published Forms** (`/records/published`) to browse live TA forms available for client submission.

**Figure 15 – Published Forms**

### 5.3 Activity Logs

5.3.1 Open **Activity Logs** (`/records/activity`) to review the audit trail of records-related actions.

**Figure 16 – Activity Logs**

**Note:** Messaging is not available in the Records portal navigation. Records focuses on form review and publishing.

---

## 6. Client Portal (Staff)

### 6.1 Submit Request

6.1.1 Open **Submit Request** (`/client/submit`).

6.1.2 Under **Published form**, select the TA form you need.

6.1.3 The system loads your requestor profile from PAMANA when your museum username is linked. You may see status messages such as loading profile, filled-from PAMANA, or no PAMANA record found.

6.1.4 Complete any remaining form fields required for the request.

6.1.5 Click **View form file** to preview how answers appear on the printable template.

6.1.6 Click **Submit request**. The ticket is created with status **pending approval** for Admin review.

**Figure 17 – Submit Request**

### 6.2 My Requests

6.2.1 Open **My Requests** (`/client/requests`) to list tickets linked to your account.

6.2.2 Typical columns: Ticket, Form, Status, Assigned to, Submitted, Action.

6.2.3 Click **View details** (or the actionable link shown) to open the ticket.

6.2.4 When ICT work is finished and the status allows it, click **Mark service complete**.

6.2.5 Complete the **Client Satisfaction Survey** / feedback step (**I've submitted feedback** or equivalent confirmation in the panel).

6.2.6 When ready, click **Close ticket**. To continue work, click **Reopen request**.

**Figure 18 – My Requests / ticket detail**

### 6.3 Service Feedback

6.3.1 Open **Service Feedback** (`/client/feedback`) to see requests that still need feedback action.

6.3.2 Follow the on-screen survey / confirmation steps for each pending item.

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

7.3.2 Under **Account**, update Display name, Division / office, and Designation as allowed, then **Save profile**. Email and Role are shown for reference according to policy.

7.3.3 Under **Password**, enter the current and new password, then **Change password**.

**Figure 22 – Settings**

---

## 8. Status Reference

### 8.1 Form statuses

| Status | Meaning |
|--------|---------|
| **Draft** | Saved by Admin; not yet submitted to Records |
| **Pending Review** | Submitted to Records; awaiting recommendation |
| **Published** | Approved by Records; available for client submission |
| **Disapproved** | Returned to Admin with remarks |

### 8.2 Ticket statuses

| Status | Meaning |
|--------|---------|
| **pending approval** | Awaiting Admin approve/reject |
| **approved** | Approved; ready for assignment / processing |
| **rejected** | Rejected with reason |
| **open** | Active / assignable |
| **in progress** | ICT assigned / work ongoing |
| **pending** | Holding status set by Admin |
| **resolved** | Requestor marked service complete; feedback/close next |
| **closed** | Closed after feedback |
| **reopened** | Reopened by requestor for further action |

### 8.3 End-to-end workflow summary

**Phase 1 — Form publishing**

1. Admin builds form in Form Builder.  
2. Admin clicks **Submit to Records** (or Send to Records / Resubmit from My Forms).  
3. Record Admin reviews and **Approve & publish** or **Disapprove**.  

**Phase 2 — Technical assistance request**

1. Staff (or Admin as requestor) submits via Submit Request.  
2. Admin approves (or rejects) on Approvals.  
3. Admin assigns ICT personnel.  
4. ICT performs the work (My Assignments).  
5. Requestor marks service complete → feedback → Close ticket (or Reopen).  

---

## 9. Frequently Asked Questions

**9.1 Why are my Division / Name / Email empty on the form preview?**  
Sign in with your museum username so PAMANA can match your employee record. If no PAMANA staff record is found, profile fields cannot auto-fill.

**9.2 Do client submissions go to Records?**  
No. Records reviews **forms** for publishing. Client TA tickets go to **Admin Approvals**.

**9.3 Can Admin submit a TA request?**  
Yes. Use **Submit TA Request** and track it under **My Requests**.

**9.4 Why is Messages missing in Records?**  
Messaging is available in Admin and Client portals only.

**9.5 What are the current system roles?**  
Super Admin, Admin (Section Head / Division Head scope), Record Management, and Staff.

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

| Placement label | Variable | Typical PAMANA source |
|-----------------|----------|------------------------|
| Division/Section | `{{prof_division}}` | Section |
| First Name | `{{prof_first}}` | First name |
| Middle Name | `{{prof_middle}}` | Middle name / initial |
| Last Name | `{{prof_last}}` | Last name |
| Email Address | `{{prof_email}}` | Secondary email or email |
| Designation | `{{prof_designation}}` | Position |

## Appendix C — Document control

| Item | Value |
|------|--------|
| Document title | PAMANA: TARF Employee User Manual |
| Version | 1.0 |
| Date | September 2026 |
| Based on | NMP Document Tracking System (DTS) Employee Manual structure |
| System | National Museum TARF Support Ticketing System |

---

*End of Employee User Manual V1.0*
