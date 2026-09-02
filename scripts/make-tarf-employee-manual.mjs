import fs from "fs";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  Header,
  Footer,
  PageNumber,
  BorderStyle,
  PageBreak,
  convertInchesToTwip,
} from "docx";

const H = convertInchesToTwip;
const maroon = "7A1F2B";
const dark = "1A1A1A";
const gray = "555555";

function p(text, opts = {}) {
  return new Paragraph({
    spacing: { after: opts.after ?? 160, before: opts.before ?? 0, line: 276 },
    alignment: opts.align ?? AlignmentType.JUSTIFIED,
    children: [
      new TextRun({
        text,
        font: "Times New Roman",
        size: opts.size ?? 22,
        bold: opts.bold,
        italics: opts.italics,
        color: opts.color ?? dark,
      }),
    ],
  });
}

function mixed(runs, opts = {}) {
  return new Paragraph({
    spacing: { after: opts.after ?? 160, before: opts.before ?? 0, line: 276 },
    alignment: opts.align ?? AlignmentType.JUSTIFIED,
    children: runs.map(
      (r) =>
        new TextRun({
          text: r.text,
          font: "Times New Roman",
          size: r.size ?? opts.size ?? 22,
          bold: r.bold,
          italics: r.italics,
          color: r.color ?? dark,
        }),
    ),
  });
}

function h1(num, title) {
  return new Paragraph({
    spacing: { before: 360, after: 200 },
    children: [
      new TextRun({
        text: `${num}.  ${title}`,
        font: "Times New Roman",
        size: 28,
        bold: true,
        color: maroon,
      }),
    ],
  });
}

function h2(num, title) {
  return new Paragraph({
    spacing: { before: 280, after: 140 },
    children: [
      new TextRun({
        text: `${num}  ${title}`,
        font: "Times New Roman",
        size: 24,
        bold: true,
        color: dark,
      }),
    ],
  });
}

function h3(num, title) {
  return new Paragraph({
    spacing: { before: 200, after: 100 },
    children: [
      new TextRun({
        text: `${num}  ${title}`,
        font: "Times New Roman",
        size: 22,
        bold: true,
        color: dark,
      }),
    ],
  });
}

function fig(caption) {
  return new Paragraph({
    spacing: { before: 200, after: 200 },
    alignment: AlignmentType.CENTER,
    border: {
      top: { style: BorderStyle.SINGLE, size: 4, color: "DDDDDD", space: 10 },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: "DDDDDD", space: 10 },
      left: { style: BorderStyle.SINGLE, size: 4, color: "DDDDDD", space: 10 },
      right: { style: BorderStyle.SINGLE, size: 4, color: "DDDDDD", space: 10 },
    },
    children: [
      new TextRun({
        text: `[Screenshot placeholder]`,
        font: "Times New Roman",
        size: 20,
        italics: true,
        color: gray,
      }),
      new TextRun({
        text: `\n${caption}`,
        font: "Times New Roman",
        size: 20,
        italics: true,
        color: gray,
      }),
    ],
  });
}

/** Numbered procedure/feature line: "2.2.1  Title. Body" */
function item(num, title, body) {
  const runs = [{ text: `${num}  `, bold: true }];
  if (title) {
    runs.push({ text: `${title}. `, bold: true });
  }
  runs.push({ text: body });
  return mixed(runs, { after: 120 });
}

const tocLine = (text) => p(text, { align: AlignmentType.LEFT, after: 60 });

const children = [
  // ——— Cover ———
  new Paragraph({
    spacing: { before: 1200 },
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({
        text: "NATIONAL MUSEUM OF THE PHILIPPINES",
        font: "Times New Roman",
        size: 28,
        bold: true,
        color: maroon,
      }),
    ],
  }),
  new Paragraph({
    spacing: { before: 200 },
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({
        text: "TARF System",
        font: "Times New Roman",
        size: 44,
        bold: true,
        color: dark,
      }),
    ],
  }),
  new Paragraph({
    spacing: { before: 120 },
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({
        text: "Technical Assistance Request Form Support Ticketing System",
        font: "Times New Roman",
        size: 24,
        italics: true,
        color: gray,
      }),
    ],
  }),
  new Paragraph({
    spacing: { before: 600 },
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({
        text: "Employee User Manual",
        font: "Times New Roman",
        size: 32,
        bold: true,
      }),
    ],
  }),
  new Paragraph({
    spacing: { before: 100 },
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: "Version 1.0", font: "Times New Roman", size: 22 })],
  }),
  new Paragraph({
    spacing: { before: 80 },
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({
        text: "September 2026",
        font: "Times New Roman",
        size: 20,
        color: gray,
      }),
    ],
  }),
  new Paragraph({ children: [new PageBreak()] }),

  // ——— Table of Contents ———
  new Paragraph({
    spacing: { after: 300 },
    children: [
      new TextRun({
        text: "Table of Contents",
        font: "Times New Roman",
        size: 28,
        bold: true,
        color: maroon,
      }),
    ],
  }),
  tocLine("1  Introduction"),
  tocLine("     1.1  Overview"),
  tocLine("     1.2  Purpose of this Manual"),
  tocLine("     1.3  User Roles, Access, and Permissions"),
  tocLine("2  General Information"),
  tocLine("     2.1  Objectives"),
  tocLine("     2.2  System Features"),
  tocLine("     2.3  System Users and Their Descriptions"),
  tocLine("3  Getting Started"),
  tocLine("     3.1  Log-in / Sign In"),
  tocLine("     3.2  Dashboard"),
  tocLine("     3.3  System Navigation"),
  tocLine("4  Admin Portal"),
  tocLine("     4.1  Form Builder"),
  tocLine("     4.2  My Forms"),
  tocLine("     4.3  Approvals"),
  tocLine("     4.4  Request Management"),
  tocLine("     4.5  My Assignments"),
  tocLine("     4.6  My Requests / Submit TA Request"),
  tocLine("     4.7  Reports"),
  tocLine("     4.8  RBAC (Users, Roles, Permissions)"),
  tocLine("5  Records Portal"),
  tocLine("     5.1  Pending Forms"),
  tocLine("     5.2  Published Forms"),
  tocLine("     5.3  Activity Logs"),
  tocLine("6  Client Portal (Staff)"),
  tocLine("     6.1  Submit Request"),
  tocLine("     6.2  My Requests"),
  tocLine("     6.3  Service Feedback"),
  tocLine("7  Shared Features"),
  tocLine("     7.1  Messages"),
  tocLine("     7.2  Notifications"),
  tocLine("     7.3  Settings"),
  tocLine("8  Status Reference"),
  tocLine("     8.1  Form Statuses"),
  tocLine("     8.2  Ticket Statuses"),
  tocLine("     8.3  End-to-End Workflow Summary"),
  tocLine("9  Frequently Asked Questions"),
  new Paragraph({ children: [new PageBreak()] }),

  // ——— 1 Introduction ———
  h1("1", "Introduction"),
  h2("1.1", "Overview"),
  p(
    "The Technical Assistance Request Form (TARF) System is the support ticketing platform of the National Museum of the Philippines (NMP). It supports the creation, review, submission, approval, assignment, and completion of technical assistance (TA) requests.",
  ),
  p(
    "Through the Admin, Records, and Client portals, authorized users can build and publish TA forms, review form templates, submit TA requests with requestor details auto-filled from the PAMANA employee directory, approve and assign work to ICT personnel, and track service completion, feedback, and closure.",
  ),

  h2("1.2", "Purpose of this Manual"),
  p(
    "This manual guides authorized NMP employees in using the TARF System according to their assigned role. It covers signing in, navigating each portal, managing forms and requests, messaging, notifications, and account settings.",
  ),

  h2("1.3", "User Roles, Access, and Permissions"),
  item(
    "1.3.1",
    "Super Admin",
    "Has the highest level of system access and is responsible for overall system administration, including roles, permissions, and related administrative functions.",
  ),
  item(
    "1.3.2",
    "Admin",
    "Covers Section Head (ODG Section and Regional Component Museum) and Division Head (All except ODG). Manages Form Builder and My Forms, approves client TA requests, assigns ICT personnel, monitors Request Management and My Assignments, may submit personal TA requests, and manages RBAC Users, Roles, and Permissions.",
  ),
  item(
    "1.3.3",
    "Record Management",
    "Reviews forms pending publication, approves and publishes forms for client use, or disapproves forms with remarks, and monitors Activity Logs.",
  ),
  item(
    "1.3.4",
    "Staff",
    "Submits technical assistance requests, tracks My Requests, marks service complete, submits feedback, closes or reopens requests, and uses Messages.",
  ),

  // ——— 2 General Information ———
  h1("2", "General Information"),
  p(
    "The TARF System provides a centralized platform for monitoring, managing, and tracking technical assistance requests within NMP. It improves request visibility, accountability, processing efficiency, and timely action by authorized personnel and offices.",
  ),

  h2("2.1", "Objectives"),
  item(
    "2.1.1",
    "",
    "Make the creation, review, submission, approval, assignment, and closure of technical assistance requests easier and more organized.",
  ),
  item(
    "2.1.2",
    "",
    "Help users check the status of TA forms and tickets quickly, reduce delays, and keep a clear record of transactions.",
  ),
  item(
    "2.1.3",
    "",
    "Auto-fill requestor details (division, name, email, and designation) from PAMANA so staff do not re-encode profile data manually.",
  ),
  item(
    "2.1.4",
    "",
    "Provide dashboards, notifications, messaging, and reports so offices can monitor pending and completed requests.",
  ),

  h2("2.2", "System Features"),
  item(
    "2.2.1",
    "Form Builder",
    "Authorized Admin users can create TA forms with fields, a print template, field placements, and a procedure section, then submit the form to Records for review.",
  ),
  item(
    "2.2.2",
    "Form Review and Publishing",
    "Record Management users can review pending forms, approve and publish them for client use, or disapprove them with remarks for return to Admin.",
  ),
  item(
    "2.2.3",
    "Request Submission",
    "Staff (Client Portal) and Admin users (Submit TA Request / My Requests) can submit technical assistance requests using published forms.",
  ),
  item(
    "2.2.4",
    "PAMANA Requestor Autofill",
    "The system fills Division/Section, First Name, Middle Name, Last Name, Email Address, and Designation from PAMANA employee records linked to the signed-in museum username.",
  ),
  item(
    "2.2.5",
    "Request Approval",
    "Admin users can approve or reject pending client requests before assignment.",
  ),
  item(
    "2.2.6",
    "Personnel Assignment",
    "Admin users can assign approved tickets to ICT personnel. Assigned staff can track work under My Assignments.",
  ),
  item(
    "2.2.7",
    "Status Tracking",
    "Users can monitor ticket statuses such as Pending Approval, Approved, Rejected, Open, In Progress, Pending, Resolved, Closed, and Reopened.",
  ),
  item(
    "2.2.8",
    "Service Completion and Feedback",
    "The requestor can mark service complete, submit client satisfaction feedback, then close or reopen the request.",
  ),
  item(
    "2.2.9",
    "Form Preview",
    "Users can view the form template and how answers, including PAMANA fields, appear on the printable form.",
  ),
  item(
    "2.2.10",
    "Messaging",
    "Admin and Client portals support chats, ticket-linked threads, pokes, and mentions.",
  ),
  item(
    "2.2.11",
    "Notifications",
    "The system notifies users of pending approvals, pending form reviews, and actionable request updates.",
  ),
  item(
    "2.2.12",
    "Role-Based Access Control (RBAC)",
    "Access is restricted according to the user’s assigned role: Super Admin, Admin, Record Management, or Staff.",
  ),
  item(
    "2.2.13",
    "Reports and Analytics",
    "Admin users can view request volume, completion, and client feedback summaries.",
  ),
  item(
    "2.2.14",
    "Settings",
    "Users can update display profile details and change their password.",
  ),

  h2("2.3", "System Users and Their Descriptions"),
  item(
    "2.3.1",
    "Super Admin",
    "Has the highest level of system access and is responsible for overall system administration, including managing roles, permissions, and other administrative functions.",
  ),
  item(
    "2.3.2",
    "Admin",
    "Section Head (ODG Section and Regional Component Museum); Division Head (All except ODG). Manages forms, approvals, assignments, requests, reports, and RBAC.",
  ),
  item(
    "2.3.3",
    "Record Management",
    "Responsible for form review and publishing, including Pending Forms, Published Forms, and Activity Logs.",
  ),
  item(
    "2.3.4",
    "Staff",
    "Employee or client requester responsible for submitting and tracking their own technical assistance requests.",
  ),

  // ——— 3 Getting Started ———
  h1("3", "Getting Started"),
  h2("3.1", "Log-in / Sign In"),
  item(
    "3.1.1",
    "",
    "Open any web browser and enter the TARF System address in the address bar (for example, http://on-prem.x-dcb.net:5173/login). The TARF System log-in page will be displayed (Figure 1).",
  ),
  item(
    "3.1.2",
    "",
    "On the Welcome Back page, enter a valid Username (museum organization username) or email and Password, then click Sign In.",
  ),
  item(
    "3.1.3",
    "",
    "Optional: select Remember me to keep the session preference on the device.",
  ),
  item(
    "3.1.4",
    "",
    "After successful sign-in, the system redirects the user by role: Admin or Super Admin to the Admin Dashboard; Record Management to the Records Dashboard; and Staff to the Client Dashboard.",
  ),
  p(
    "Note: Sign in with your museum organization username so PAMANA can match your employee record for requestor autofill. Legacy portal login URLs redirect to the unified /login page.",
    { italics: true, size: 20 },
  ),
  fig("Figure 1 – TARF System log-in page"),

  h2("3.2", "Dashboard"),
  p(
    "Upon login, the user is directed to the Dashboard for their portal. The Dashboard is the main landing page and provides an overview of key activities, counts, and shortcuts.",
  ),
  h3("3.2.1", "Admin Dashboard"),
  item("3.2.1.1", "", "Displays a personalized greeting (for example, Good day, {name})."),
  item(
    "3.2.1.2",
    "",
    "Shows a snapshot of TA forms and pending client requests awaiting approval.",
  ),
  item(
    "3.2.1.3",
    "",
    "Provides quick access to Approvals, Request Management, and Form Builder through navigation.",
  ),
  fig("Figure 2 – Admin Dashboard"),

  h3("3.2.2", "Records Dashboard"),
  item("3.2.2.1", "", "Displays a welcome message for Record Management."),
  item("3.2.2.2", "", "Shows counts for pending forms and published forms."),
  item("3.2.2.3", "", "Highlights items needing review under Pending Forms."),
  fig("Figure 3 – Records Dashboard"),

  h3("3.2.3", "Client Dashboard"),
  item(
    "3.2.3.1",
    "",
    "Displays Welcome back, {name} and an overview of Your requests.",
  ),
  item(
    "3.2.3.2",
    "",
    "Provides visibility of recent request statuses and links to Submit Request and My Requests.",
  ),
  fig("Figure 4 – Client Dashboard"),

  h2("3.3", "System Navigation"),
  item(
    "3.3.1",
    "",
    "The left-side menu provides access to the main features of the system. The sidebar brand shows National Museum of the Philippines / TARF SYSTEM.",
  ),
  item("3.3.2", "", "The bottom of the sidebar provides Settings and Logout."),
  item(
    "3.3.3",
    "",
    "The header includes the notification bell and the current page title.",
  ),
  h3("3.3.4", "Admin Navigation"),
  p(
    "MAIN: Dashboard, Reports, Messages. FORMS: Form Builder, My Forms. REQUESTS: Approvals, Request Management, My Assignments, My Requests, Submit TA Request. RBAC: Users, Roles, Permissions.",
  ),
  h3("3.3.5", "Records Navigation"),
  p("MAIN: Dashboard. FORMS: Pending Forms, Published Forms. SYSTEM: Activity Logs."),
  h3("3.3.6", "Client Navigation"),
  p("MAIN: Dashboard, Messages. REQUESTS: Submit Request, My Requests, Service Feedback."),
  fig("Figure 5 – Sample portal navigation (sidebar)"),

  // ——— 4 Admin Portal ———
  h1("4", "Admin Portal"),
  h2("4.1", "Form Builder"),
  item("4.1.1", "", "Open Form Builder from the FORMS section."),
  item(
    "4.1.2",
    "",
    "Complete the wizard in order: (1) General — form title, reference details, and general settings; (2) Fields — define input fields for the client request; (3) Print Template — upload the printable template and place fields, including default PAMANA profile fields; (4) Procedure — procedure or instructions content.",
  ),
  item("4.1.3", "", "Use Back and Continue to move between steps."),
  item(
    "4.1.4",
    "",
    "On the Print Template step, place form fields on the template. Default Requester profile fields are always available: Division/Section, First Name, Middle Name, Last Name, Email Address, and Designation.",
  ),
  item(
    "4.1.5",
    "",
    "When ready for Records review, click Submit to Records. To keep working later, click Save as draft.",
  ),
  fig("Figure 6 – Form Builder wizard"),

  h2("4.2", "My Forms"),
  item(
    "4.2.1",
    "",
    "Open My Forms to view forms you created and their analytics.",
  ),
  item("4.2.2", "", "Use New Form or Create Form to start a new form."),
  item("4.2.3", "", "For a draft, use Send to Records when ready for review."),
  item(
    "4.2.4",
    "",
    "For a disapproved form, review remarks, edit in Form Builder, then Resubmit.",
  ),
  item("4.2.5", "", "For other statuses, use View to open the form details."),
  fig("Figure 7 – My Forms"),

  h2("4.3", "Approvals"),
  item(
    "4.3.1",
    "",
    "Open Approvals to see client TA requests with status Pending Approval.",
  ),
  item("4.3.2", "", "Review the request details and form file."),
  item(
    "4.3.3",
    "",
    "Click Approve or Approve request to accept the request, or Reject or Reject request.",
  ),
  item(
    "4.3.4",
    "",
    "When rejecting, enter a reason and confirm with Confirm reject.",
  ),
  item(
    "4.3.5",
    "",
    "After approval, assign ICT personnel using Assign personnel, then click Assign. The ticket moves to In Progress when assignment is completed as designed.",
  ),
  fig("Figure 8 – Approvals"),

  h2("4.4", "Request Management"),
  item("4.4.1", "", "Open Request Management to view all client requests."),
  item(
    "4.4.2",
    "",
    "Typical list columns include Ticket, Client, Division, Status, and Action.",
  ),
  item(
    "4.4.3",
    "",
    "Open a ticket to view full details, update status where allowed (In Progress or Pending), assign personnel, and open Request messages.",
  ),
  fig("Figure 9 – Request Management"),

  h2("4.5", "My Assignments"),
  item(
    "4.5.1",
    "",
    "Open My Assignments to see requests assigned to you as ICT personnel.",
  ),
  item(
    "4.5.2",
    "",
    "Use this list to track work until the client marks the service complete and closes the request.",
  ),
  fig("Figure 10 – My Assignments"),

  h2("4.6", "My Requests / Submit TA Request"),
  p("Admin users may also act as requestors."),
  item(
    "4.6.1",
    "",
    "Open Submit TA Request to submit a personal TA request using a published form. The flow matches Client Submit Request, including PAMANA autofill.",
  ),
  item("4.6.2", "", "Open My Requests to track your own submissions."),
  item(
    "4.6.3",
    "",
    "From a ticket detail page you may Mark service complete, submit feedback, Close ticket, or Reopen request, as applicable.",
  ),
  fig("Figure 11 – Admin My Requests"),

  h2("4.7", "Reports"),
  item("4.7.1", "", "Open Reports, titled Reports & Analytics."),
  item(
    "4.7.2",
    "",
    "Review volume, completion, and client feedback summaries to monitor operational performance.",
  ),
  fig("Figure 12 – Reports & Analytics"),

  h2("4.8", "RBAC (Users, Roles, Permissions)"),
  item(
    "4.8.1",
    "",
    "Open Users to search employees, filter by role or access, and Assign or Manage roles.",
  ),
  item("4.8.2", "", "Use pagination (Prev / Next) to move through employee pages."),
  item(
    "4.8.3",
    "",
    "Open Roles to review system roles (Super Admin, Admin, Record Management, Staff) and manage permissions. System roles cannot be deleted.",
  ),
  item("4.8.4", "", "Open Permissions to browse the capability catalog by category."),
  fig("Figure 13 – RBAC Users"),

  // ——— 5 Records Portal ———
  h1("5", "Records Portal"),
  h2("5.1", "Pending Forms"),
  item(
    "5.1.1",
    "",
    "Open Pending Forms to see forms with status Pending Review.",
  ),
  item(
    "5.1.2",
    "",
    "Use Search to locate a form by title or reference when available.",
  ),
  item("5.1.3", "", "Open a form to review the Form template (view-only)."),
  item(
    "5.1.4",
    "",
    "Under Recommendation, select Approve & publish or Disapprove. Provide remarks when disapproving, as required.",
  ),
  item("5.1.5", "", "Click Submit recommendation."),
  item(
    "5.1.6",
    "",
    "Approved forms become Published and appear under Published Forms for clients. Disapproved forms return to Admin with remarks.",
  ),
  fig("Figure 14 – Pending Forms / Recommendation"),

  h2("5.2", "Published Forms"),
  item(
    "5.2.1",
    "",
    "Open Published Forms to browse live TA forms available for client submission.",
  ),
  fig("Figure 15 – Published Forms"),

  h2("5.3", "Activity Logs"),
  item(
    "5.3.1",
    "",
    "Open Activity Logs to review the audit trail of records-related actions.",
  ),
  p(
    "Note: Messaging is not available in the Records portal. Records focuses on form review and publishing.",
    { italics: true, size: 20 },
  ),
  fig("Figure 16 – Activity Logs"),

  // ——— 6 Client Portal ———
  h1("6", "Client Portal (Staff)"),
  h2("6.1", "Submit Request"),
  item("6.1.1", "", "Open Submit Request."),
  item("6.1.2", "", "Under Published form, select the TA form you need."),
  item(
    "6.1.3",
    "",
    "The system loads your requestor profile from PAMANA when your museum username is linked. You may see status messages such as loading profile, filled from PAMANA, or no PAMANA record found.",
  ),
  item("6.1.4", "", "Complete any remaining form fields required for the request."),
  item(
    "6.1.5",
    "",
    "Click View form file to preview how answers appear on the printable template.",
  ),
  item(
    "6.1.6",
    "",
    "Click Submit request. The ticket is created with status Pending Approval for Admin review.",
  ),
  fig("Figure 17 – Submit Request"),

  h2("6.2", "My Requests"),
  item("6.2.1", "", "Open My Requests to list tickets linked to your account."),
  item(
    "6.2.2",
    "",
    "Typical columns include Ticket, Form, Status, Assigned to, Submitted, and Action.",
  ),
  item(
    "6.2.3",
    "",
    "Click View details or the actionable link shown to open the ticket.",
  ),
  item(
    "6.2.4",
    "",
    "When ICT work is finished and the status allows it, click Mark service complete.",
  ),
  item(
    "6.2.5",
    "",
    "Complete the Client Satisfaction Survey or feedback step.",
  ),
  item(
    "6.2.6",
    "",
    "When ready, click Close ticket. To continue work, click Reopen request.",
  ),
  fig("Figure 18 – My Requests / ticket detail"),

  h2("6.3", "Service Feedback"),
  item(
    "6.3.1",
    "",
    "Open Service Feedback to see requests that still need feedback action.",
  ),
  item(
    "6.3.2",
    "",
    "Follow the on-screen survey and confirmation steps for each pending item.",
  ),
  fig("Figure 19 – Service Feedback"),

  // ——— 7 Shared Features ———
  h1("7", "Shared Features"),
  h2("7.1", "Messages"),
  item("7.1.1", "", "Messages is available in the Admin and Client portals."),
  item("7.1.2", "", "Use Chats to open existing conversations."),
  item(
    "7.1.3",
    "",
    "Click New to open New message, select recipients, compose, and Send.",
  ),
  item("7.1.4", "", "Use Poke where available to nudge participants."),
  item(
    "7.1.5",
    "",
    "From a ticket detail page, open Request messages to join or continue the ticket-linked thread.",
  ),
  fig("Figure 20 – Messages"),

  h2("7.2", "Notifications"),
  item("7.2.1", "", "Click the notification bell in the header."),
  item(
    "7.2.2",
    "",
    "Admin notifications focus on pending client approvals (View all goes to Approvals). Records notifications focus on pending forms (View all goes to Pending Forms). Client notifications focus on actionable request updates (View all goes to My Requests).",
  ),
  fig("Figure 21 – Notifications"),

  h2("7.3", "Settings"),
  item("7.3.1", "", "Open Settings from the sidebar footer."),
  item(
    "7.3.2",
    "",
    "Under Account, update Display name, Division / office, and Designation as allowed, then Save profile. Email and Role are shown for reference according to policy.",
  ),
  item(
    "7.3.3",
    "",
    "Under Password, enter the current and new password, then Change password.",
  ),
  fig("Figure 22 – Settings"),

  // ——— 8 Status Reference ———
  h1("8", "Status Reference"),
  h2("8.1", "Form Statuses"),
  item("8.1.1", "Draft", "Saved by Admin; not yet submitted to Records."),
  item(
    "8.1.2",
    "Pending Review",
    "Submitted to Records; awaiting recommendation.",
  ),
  item(
    "8.1.3",
    "Published",
    "Approved by Records; available for client submission.",
  ),
  item("8.1.4", "Disapproved", "Returned to Admin with remarks."),

  h2("8.2", "Ticket Statuses"),
  item("8.2.1", "Pending Approval", "Awaiting Admin approve or reject."),
  item("8.2.2", "Approved", "Approved; ready for assignment or processing."),
  item("8.2.3", "Rejected", "Rejected with reason."),
  item("8.2.4", "Open", "Active or assignable."),
  item("8.2.5", "In Progress", "ICT assigned; work ongoing."),
  item("8.2.6", "Pending", "Holding status set by Admin."),
  item(
    "8.2.7",
    "Resolved",
    "Requestor marked service complete; feedback or close is next.",
  ),
  item("8.2.8", "Closed", "Closed after feedback."),
  item("8.2.9", "Reopened", "Reopened by requestor for further action."),

  h2("8.3", "End-to-End Workflow Summary"),
  p("Phase 1 — Form publishing:", { bold: true, after: 80 }),
  item("8.3.1", "", "Admin builds the form in Form Builder."),
  item(
    "8.3.2",
    "",
    "Admin clicks Submit to Records (or Send to Records / Resubmit from My Forms).",
  ),
  item(
    "8.3.3",
    "",
    "Record Management reviews and selects Approve & publish or Disapprove.",
  ),
  p("Phase 2 — Technical assistance request:", { bold: true, after: 80, before: 120 }),
  item(
    "8.3.4",
    "",
    "Staff (or Admin as requestor) submits via Submit Request.",
  ),
  item("8.3.5", "", "Admin approves or rejects the request on Approvals."),
  item("8.3.6", "", "Admin assigns ICT personnel."),
  item("8.3.7", "", "ICT performs the work under My Assignments."),
  item(
    "8.3.8",
    "",
    "Requestor marks service complete, submits feedback, then closes the ticket (or reopens it).",
  ),

  // ——— 9 FAQ ———
  h1("9", "Frequently Asked Questions"),
  mixed([
    {
      text: "9.1  Why are my Division, Name, or Email empty on the form preview? ",
      bold: true,
    },
    {
      text: "Sign in with your museum username so PAMANA can match your employee record. If no PAMANA staff record is found, profile fields cannot auto-fill.",
    },
  ]),
  mixed([
    { text: "9.2  Do client submissions go to Records? ", bold: true },
    {
      text: "No. Records reviews forms for publishing. Client TA tickets go to Admin Approvals.",
    },
  ]),
  mixed([
    { text: "9.3  Can Admin submit a TA request? ", bold: true },
    {
      text: "Yes. Use Submit TA Request and track it under My Requests.",
    },
  ]),
  mixed([
    { text: "9.4  Why is Messages missing in Records? ", bold: true },
    {
      text: "Messaging is available in the Admin and Client portals only.",
    },
  ]),
  mixed([
    { text: "9.5  What are the current system roles? ", bold: true },
    {
      text: "Super Admin, Admin (Section Head / Division Head scope), Record Management, and Staff.",
    },
  ]),

  new Paragraph({
    spacing: { before: 400 },
    alignment: AlignmentType.CENTER,
    children: [
      new TextRun({
        text: "— End of Employee User Manual V1.0 —",
        font: "Times New Roman",
        size: 20,
        italics: true,
        color: gray,
      }),
    ],
  }),
];

const doc = new Document({
  sections: [
    {
      properties: {
        page: {
          margin: { top: H(1), bottom: H(1), left: H(1), right: H(1) },
        },
      },
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              border: {
                bottom: { style: BorderStyle.SINGLE, size: 6, color: "AAAAAA", space: 8 },
              },
              spacing: { after: 120 },
              tabStops: [{ type: "right", position: H(6.5) }],
              children: [
                new TextRun({
                  text: "TARF System",
                  font: "Times New Roman",
                  size: 18,
                  bold: true,
                  color: maroon,
                }),
                new TextRun({ text: "\t", font: "Times New Roman", size: 18 }),
                new TextRun({
                  text: "Employee Manual V1.0",
                  font: "Times New Roman",
                  size: 18,
                  color: gray,
                }),
              ],
            }),
          ],
        }),
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  children: [PageNumber.CURRENT],
                  font: "Times New Roman",
                  size: 18,
                  color: gray,
                }),
              ],
            }),
          ],
        }),
      },
      children,
    },
  ],
});

const outDocx =
  "/home/ysa/dev/National-Museum-SupportTicketing-System/docs/TARF_Employee_User_Manual_V1.docx";

const buf = await Packer.toBuffer(doc);
fs.writeFileSync(outDocx, buf);
console.log("wrote", outDocx, buf.length);
