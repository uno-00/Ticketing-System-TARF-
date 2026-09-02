# TARF System  
# Employee User Manual V1.0

**National Museum of the Philippines**  
**Technical Assistance Request Form (TARF) Support Ticketing System**

Version 1.0 · September 2026

---

## Table of Contents

1. [Introduction](#1-introduction)  
   1.1 [Overview](#11-overview)  
   1.2 [Purpose of this Manual](#12-purpose-of-this-manual)  
   1.3 [User Roles, Access, and Permissions](#13-user-roles-access-and-permissions)  
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

The **Technical Assistance Request Form (TARF) System** is the support ticketing platform of the National Museum of the Philippines (NMP). It supports the creation, review, submission, approval, assignment, and completion of technical assistance (TA) requests.

Through the Admin, Records, and Client portals, authorized users can build and publish TA forms, review form templates, submit TA requests with requestor details auto-filled from the PAMANA employee directory, approve and assign work to ICT personnel, and track service completion, feedback, and closure.

### 1.2 Purpose of this Manual

This manual guides authorized NMP employees in using the TARF System according to their assigned role. It covers signing in, navigating each portal, managing forms and requests, messaging, notifications, and account settings.

### 1.3 User Roles, Access, and Permissions

1.3.1 **Super Admin** has the highest level of system access and is responsible for overall system administration, including roles, permissions, and related administrative functions.

1.3.2 **Admin** covers Section Head (ODG Section and Regional Component Museum) and Division Head (All except ODG). Manages Form Builder and My Forms, approves client TA requests, assigns ICT personnel, monitors Request Management and My Assignments, may submit personal TA requests, and manages RBAC Users, Roles, and Permissions.

1.3.3 **Record Management** reviews forms pending publication, approves and publishes forms for client use, or disapproves forms with remarks, and monitors Activity Logs.

1.3.4 **Staff** submits technical assistance requests, tracks My Requests, marks service complete, submits feedback, closes or reopens requests, and uses Messages.

---

## 2. General Information

The TARF System provides a centralized platform for monitoring, managing, and tracking technical assistance requests within NMP. It improves request visibility, accountability, processing efficiency, and timely action by authorized personnel and offices.

### 2.1 Objectives

2.1.1 Make the creation, review, submission, approval, assignment, and closure of technical assistance requests easier and more organized.

2.1.2 Help users check the status of TA forms and tickets quickly, reduce delays, and keep a clear record of transactions.

2.1.3 Auto-fill requestor details (division, name, email, and designation) from PAMANA so staff do not re-encode profile data manually.

2.1.4 Provide dashboards, notifications, messaging, and reports so offices can monitor pending and completed requests.

### 2.2 System Features

2.2.1 **Form Builder.** Authorized Admin users can create TA forms with fields, a print template, field placements, and a procedure section, then submit the form to Records for review.

2.2.2 **Form Review and Publishing.** Record Management users can review pending forms, approve and publish them for client use, or disapprove them with remarks for return to Admin.

2.2.3 **Request Submission.** Staff (Client Portal) and Admin users (Submit TA Request / My Requests) can submit technical assistance requests using published forms.

2.2.4 **PAMANA Requestor Autofill.** The system fills Division/Section, First Name, Middle Name, Last Name, Email Address, and Designation from PAMANA employee records linked to the signed-in museum username.

2.2.5 **Request Approval.** Admin users can approve or reject pending client requests before assignment.

2.2.6 **Personnel Assignment.** Admin users can assign approved tickets to ICT personnel. Assigned staff can track work under My Assignments.

2.2.7 **Status Tracking.** Users can monitor ticket statuses such as Pending Approval, Open, Rejected, In Progress, Pending, Resolved, Closed, and Reopened.

2.2.8 **Service Completion and Feedback.** The requestor can mark service complete, submit client satisfaction feedback, then close or reopen the request.

2.2.9 **Form Preview.** Users can view the form template and how answers, including PAMANA fields, appear on the printable form.

2.2.10 **Messaging.** Admin and Client portals support chats, ticket-linked threads, pokes, and mentions.

2.2.11 **Notifications.** The system notifies users of pending approvals, pending form reviews, and actionable request updates.

2.2.12 **Role-Based Access Control (RBAC).** Access is restricted according to the user’s assigned role: Super Admin, Admin, Record Management, or Staff.

2.2.13 **Reports and Analytics.** Admin users can view request volume, completion, and client feedback summaries.

2.2.14 **Settings.** Users can update display profile details and change their password.

### 2.3 System Users and Their Descriptions

2.3.1 **Super Admin** has the highest level of system access and is responsible for overall system administration, including managing roles, permissions, and other administrative functions.

2.3.2 **Admin** — Section Head (ODG Section and Regional Component Museum); Division Head (All except ODG). Manages forms, approvals, assignments, requests, reports, and RBAC.

2.3.3 **Record Management** is responsible for form review and publishing, including Pending Forms, Published Forms, and Activity Logs.

2.3.4 **Staff** is the employee or client requester responsible for submitting and tracking their own technical assistance requests.

---

## 3. Getting Started

### 3.1 Log-in / Sign In

3.1.1 Open any web browser and enter the TARF System address in the address bar (for example, `http://on-prem.x-dcb.net:5173/login`). The TARF System log-in page will be displayed (**Figure 1**).

3.1.2 On the **Welcome Back** page, enter a valid **Username** (museum organization username) or email and **Password**, then click **Sign In**.

3.1.3 Optional: select **Remember me** to keep the session preference on the device.

3.1.4 After successful sign-in, the system redirects the user by role:

| Role | Landing page |
|------|----------------|
| Admin / Super Admin | Admin Dashboard (`/admin/dashboard`) |
| Record Management | Records Dashboard (`/records/dashboard`) |
| Staff | Client Dashboard (`/client/dashboard`) |

**Note:** Sign in with your museum organization username so PAMANA can match your employee record for requestor autofill. Legacy portal login URLs redirect to the unified `/login` page.

**Figure 1 – TARF System log-in page**

### 3.2 Dashboard

Upon login, the user is directed to the Dashboard for their portal. The Dashboard is the main landing page and provides an overview of key activities, counts, and shortcuts.

#### 3.2.1 Admin Dashboard

3.2.1.1 Displays a personalized greeting (for example, **Good day, {name}**).

3.2.1.2 Shows a snapshot of TA forms and pending client requests awaiting approval.

3.2.1.3 Provides quick access to Approvals, Request Management, and Form Builder through navigation.

**Figure 2 – Admin Dashboard**

#### 3.2.2 Records Dashboard

3.2.2.1 Displays a welcome message for Record Management.

3.2.2.2 Shows counts for pending forms and published forms.

3.2.2.3 Highlights items needing review under **Pending Forms**.

**Figure 3 – Records Dashboard**

#### 3.2.3 Client Dashboard

3.2.3.1 Displays **Welcome back, {name}** and an overview of **Your requests**.

3.2.3.2 Provides visibility of recent request statuses and links to Submit Request and My Requests.

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
| REQUESTS | My Assignments | Tickets assigned to you |
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
| 4 | **Procedure** | Procedure or instructions content |

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

4.1.5 When ready for Records review, click **Submit to Records**. To keep working later, click **Save as draft**.

**Figure 6 – Form Builder wizard**

### 4.2 My Forms

4.2.1 Open **My Forms** to view forms you created and their analytics.

4.2.2 Use **New Form** or **Create Form** to start a new form.

4.2.3 For a draft, use **Send to Records** when ready for review.

4.2.4 For a disapproved form, review remarks, edit in Form Builder, then **Resubmit**.

4.2.5 For other statuses, use **View** to open the form details.

**Figure 7 – My Forms**

### 4.3 Approvals

4.3.1 Open **Approvals** to see client TA requests with status **Pending Approval**.

4.3.2 Review the request details and form file.

4.3.3 Click **Approve** or **Approve request** to accept the request, or **Reject** or **Reject request**.

4.3.4 When rejecting, enter a reason and confirm with **Confirm reject**.

4.3.5 After approval, the ticket status becomes **Open**. Assign ICT personnel using **Assign personnel**, then click **Assign**. The ticket moves to **In Progress**.

**Figure 8 – Approvals**

### 4.4 Request Management

4.4.1 Open **Request Management** to view all client requests.

4.4.2 Typical list columns include Ticket, Client, Division, Status, and Action.

4.4.3 Open a ticket to view full details, update status where allowed (**In Progress** or **Pending**), assign personnel, and open **Request messages**.

**Figure 9 – Request Management**

### 4.5 My Assignments

4.5.1 Open **My Assignments** to see requests assigned to you as ICT personnel.

4.5.2 Use this list to track work until the client marks the service complete and closes the request.

**Figure 10 – My Assignments**

### 4.6 My Requests / Submit TA Request

Admin users may also act as requestors.

4.6.1 Open **Submit TA Request** to submit a personal TA request using a published form. The flow matches Client Submit Request, including PAMANA autofill.

4.6.2 Open **My Requests** to track your own submissions.

4.6.3 From a ticket detail page you may **Mark service complete**, submit feedback, **Close ticket**, or **Reopen request**, as applicable.

**Figure 11 – Admin My Requests**

### 4.7 Reports

4.7.1 Open **Reports**, titled **Reports & Analytics**.

4.7.2 Review volume, completion, and client feedback summaries to monitor operational performance.

**Figure 12 – Reports & Analytics**

### 4.8 RBAC (Users, Roles, Permissions)

4.8.1 Open **Users** to search employees, filter by role or access, and **Assign** or **Manage** roles.

4.8.2 Use pagination (**Prev** / **Next**) to move through employee pages.

4.8.3 Open **Roles** to review system roles (Super Admin, Admin, Record Management, Staff) and manage permissions. System roles cannot be deleted.

4.8.4 Open **Permissions** to browse the capability catalog by category.

**Figure 13 – RBAC Users**

---

## 5. Records Portal

### 5.1 Pending Forms

5.1.1 Open **Pending Forms** to see forms with status **Pending Review**.

5.1.2 Use Search to locate a form by title or reference when available.

5.1.3 Open a form to review the **Form template** (view-only).

5.1.4 Under **Recommendation**, select **Approve & publish** or **Disapprove**. Provide remarks when disapproving, as required.

5.1.5 Click **Submit recommendation**.

5.1.6 Approved forms become **Published** and appear under Published Forms for clients. Disapproved forms return to Admin with remarks.

**Figure 14 – Pending Forms / Recommendation**

### 5.2 Published Forms

5.2.1 Open **Published Forms** to browse live TA forms available for client submission.

**Figure 15 – Published Forms**

### 5.3 Activity Logs

5.3.1 Open **Activity Logs** to review the audit trail of records-related actions.

**Note:** Messaging is not available in the Records portal. Records focuses on form review and publishing.

**Figure 16 – Activity Logs**

---

## 6. Client Portal (Staff)

### 6.1 Submit Request

6.1.1 Open **Submit Request**.

6.1.2 Under **Published form**, select the TA form you need.

6.1.3 The system loads your requestor profile from PAMANA when your museum username is linked. You may see status messages such as loading profile, filled from PAMANA, or no PAMANA record found.

6.1.4 Complete any remaining form fields required for the request.

6.1.5 Click **View form file** to preview how answers appear on the printable template.

6.1.6 Click **Submit request**. The ticket is created with status **Pending Approval** for Admin review.

**Figure 17 – Submit Request**

### 6.2 My Requests

6.2.1 Open **My Requests** to list tickets linked to your account.

6.2.2 Typical columns include Ticket, Form, Status, Assigned to, Submitted, and Action.

6.2.3 Click **View details** or the actionable link shown to open the ticket.

6.2.4 When ICT work is finished and the status allows it, click **Mark service complete**.

6.2.5 Complete the **Client Satisfaction Survey** or feedback step.

6.2.6 When ready, click **Close ticket**. To continue work, click **Reopen request**.

**Figure 18 – My Requests / ticket detail**

### 6.3 Service Feedback

6.3.1 Open **Service Feedback** to see requests that still need feedback action.

6.3.2 Follow the on-screen survey and confirmation steps for each pending item.

**Figure 19 – Service Feedback**

---

## 7. Shared Features

### 7.1 Messages

7.1.1 Messages is available in the **Admin** and **Client** portals.

7.1.2 Use **Chats** to open existing conversations.

7.1.3 Click **New** to open **New message**, select recipients, compose, and **Send**.

7.1.4 Use **Poke** where available to nudge participants.

7.1.5 From a ticket detail page, open **Request messages** to join or continue the ticket-linked thread.

**Figure 20 – Messages**

### 7.2 Notifications

7.2.1 Click the notification bell in the header.

7.2.2 Notification focus by portal:

| Portal | Focus | View all goes to |
|--------|-------|------------------|
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
| **Pending Approval** | Awaiting Admin approve or reject |
| **Open** | Approved by Admin; ready for assignment or processing |
| **Rejected** | Rejected with reason (terminal; submit a new request if needed) |
| **In Progress** | ICT personnel assigned; work ongoing |
| **Pending** | Holding status set by Admin after approval |
| **Resolved** | Requestor marked service complete; feedback or close is next |
| **Closed** | Closed after feedback (requestor confirmed satisfied) |
| **Reopened** | Reopened by requestor (not satisfied / needs further action) |

**Note:** Clicking **Approve** on Approvals sets the ticket to **Open** (not a separate “Approved” status). Assigning ICT personnel then moves it to **In Progress**.

### 8.3 End-to-End Workflow Summary

**Phase 1 — Form publishing**

8.3.1 Admin builds the form in Form Builder.  
8.3.2 Admin clicks **Submit to Records** (or Send to Records / Resubmit from My Forms).  
8.3.3 Record Management reviews and selects **Approve & publish** or **Disapprove**.

**Phase 2 — Technical assistance request**

8.3.4 Staff (or Admin as requestor) submits via Submit Request → status **Pending Approval**.  
8.3.5 Admin approves on Approvals → status **Open** (or rejects → **Rejected**).  
8.3.6 Admin assigns ICT personnel → status **In Progress**.  
8.3.7 ICT performs the work under My Assignments (Admin may also set **Pending** as a hold).  
8.3.8 Requestor marks service complete → **Resolved**, submits feedback, then closes (**Closed**) or reopens (**Reopened**).

---

## 9. Frequently Asked Questions

**9.1 Why are my Division, Name, or Email empty on the form preview?**  
Sign in with your museum username so PAMANA can match your employee record. If no PAMANA staff record is found, profile fields cannot auto-fill.

**9.2 Do client submissions go to Records?**  
No. Records reviews **forms** for publishing. Client TA tickets go to **Admin Approvals**.

**9.3 Can Admin submit a TA request?**  
Yes. Use **Submit TA Request** and track it under **My Requests**.

**9.4 Why is Messages missing in Records?**  
Messaging is available in the Admin and Client portals only.

**9.5 What are the current system roles?**  
Super Admin, Admin (Section Head / Division Head scope), Record Management, and Staff.

---

*End of Employee User Manual V1.0*
