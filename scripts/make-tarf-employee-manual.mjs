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
        text: `${num}.\t${title}`,
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
        text: `${num} ${title}`,
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
        text: `${num} ${title}`,
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
        text: `[ Screenshot placeholder ]\n${caption}`,
        font: "Times New Roman",
        size: 20,
        italics: true,
        color: gray,
      }),
    ],
  });
}

function bulletItem(num, title, body) {
  return mixed(
    [
      { text: `${num} `, bold: true },
      { text: title ? `${title}. ` : "", bold: true },
      { text: body },
    ],
    { after: 120 },
  );
}

const tocLine = (text) => p(text, { align: AlignmentType.LEFT, after: 60 });

const children = [
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
        text: "PAMANA: TARF",
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
        text: "Technical Assistance Request Form System",
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
  tocLine("1 Introduction"),
  tocLine("    1.1 Overview"),
  tocLine("    1.2 Objectives"),
  tocLine("    1.3 User’s Role, Access and Permission"),
  tocLine("2 General Information"),
  tocLine("    2.1 Objectives"),
  tocLine("    2.2 System Features"),
  tocLine("    2.3 System Users and Their Descriptions"),
  tocLine("3 Getting Started"),
  tocLine("    3.1 Log-in / Sign In"),
  tocLine("    3.2 Dashboard"),
  tocLine("    3.3 System Navigation"),
  tocLine("4 Admin Portal"),
  tocLine("    4.1 Form Builder"),
  tocLine("    4.2 My Forms"),
  tocLine("    4.3 Approvals"),
  tocLine("    4.4 Request Management"),
  tocLine("    4.5 My Assignments"),
  tocLine("    4.6 My Requests / Submit TA Request"),
  tocLine("    4.7 Reports"),
  tocLine("    4.8 RBAC (Users, Roles, Permissions)"),
  tocLine("5 Records Portal"),
  tocLine("    5.1 Pending Forms"),
  tocLine("    5.2 Published Forms"),
  tocLine("    5.3 Activity Logs"),
  tocLine("6 Client Portal (Staff)"),
  tocLine("    6.1 Submit Request"),
  tocLine("    6.2 My Requests"),
  tocLine("    6.3 Service Feedback"),
  tocLine("7 Shared Features"),
  tocLine("8 Status Reference"),
  tocLine("9 Frequently Asked Questions"),
  new Paragraph({ children: [new PageBreak()] }),

  h1("1", "Introduction"),
  h2("1.1", "Overview"),
  p(
    "The Technical Assistance Request Form (TARF) System is a centralized platform designed to streamline the creation, review, submission, approval, assignment, and completion of technical assistance (TA) requests within the National Museum of the Philippines (NMP). It provides administrators, records personnel, and staff with the tools needed to build and publish TA forms, review form templates, submit TA requests with requestor details auto-filled from PAMANA, approve and assign work to ICT personnel, and track service completion, feedback, and closure.",
  ),
  p(
    "This manual serves as a guide for authorized employees in using the TARF System. It covers logging in and navigating each portal (Admin, Records, and Client), managing forms and requests, messaging, notifications, and account settings.",
  ),
  p(
    "The TARF System aims to improve efficiency, accountability, and transparency in technical assistance handling by reducing manual paperwork, ensuring requestor details are accurate through PAMANA integration, and providing a clear audit trail for every request processed within the system. This manual is intended for authorized NMP personnel responsible for operating or using the platform according to their assigned role.",
  ),

  h2("1.2", "Objectives"),
  p(
    "The Technical Assistance Request Form (TARF) System of the National Museum of the Philippines (NMP) aims to provide a centralized and efficient platform for monitoring, managing, and tracking technical assistance requests within the organization. The system will improve request visibility, accountability, processing efficiency, and timely action by authorized personnel and offices.",
  ),
  p(
    "The TARF System aims to make the creation, review, submission, approval, assignment, and closure of technical assistance requests easier and more organized. It helps users quickly check the status of TA forms and tickets, reduce delays, and keep a clear record of transactions. The system also provides dashboards, notifications, messaging, and reports to help offices monitor pending and completed requests.",
  ),

  h2("1.3", "User’s Role, Access and Permission"),
  mixed([
    { text: "1.3.1 Admin ", bold: true },
    {
      text: "is responsible for Form Builder and My Forms, approving client TA requests, assigning ICT personnel, monitoring Request Management and My Assignments, submitting personal TA requests when needed, and managing RBAC Users, Roles, and Permissions. Admin covers Section Head (ODG Section and Regional Component Museum) and Division Head (All except ODG).",
    },
  ]),
  mixed([
    { text: "1.3.2 Record Admin ", bold: true },
    {
      text: "is responsible for reviewing forms pending publication, approving and publishing forms for client use, or disapproving forms with remarks, and monitoring Activity Logs.",
    },
  ]),
  mixed([
    { text: "1.3.3 Staff ", bold: true },
    {
      text: "is responsible for submitting technical assistance requests, tracking My Requests, marking service complete, submitting feedback, closing or reopening requests, and using Messages.",
    },
  ]),
  mixed([
    { text: "1.3.4 Super Admin ", bold: true },
    {
      text: "has the highest level of system access and is responsible for overall system administration, including managing roles, permissions, and other administrative functions.",
    },
  ]),

  h1("2", "General Information"),
  p(
    "The TARF System of the National Museum of the Philippines (NMP) aims to provide a centralized and efficient platform for monitoring, managing, and tracking technical assistance requests within the organization. The system will improve request visibility, accountability, processing efficiency, and timely action by authorized personnel and offices.",
  ),

  h2("2.1", "Objectives"),
  p(
    "The TARF System of the National Museum of the Philippines (NMP) aims to make receiving, reviewing, submitting, approving, assigning, and closing technical assistance requests easier and more organized. It helps users quickly check the status of forms and tickets, reduce delays and misplaced requests, and keep a clear record of transactions. The system also provides reports and updates to help offices monitor pending and completed requests.",
  ),

  h2("2.2", "System Features"),
  bulletItem(
    "2.2.1",
    "Form Builder",
    "The system allows authorized Admin users to create TA forms with fields, a print template, field placements, and a procedure section, then submit the form to Records for review.",
  ),
  bulletItem(
    "2.2.2",
    "Form Review and Publishing",
    "The system allows Record Admin users to review pending forms, approve and publish them for client use, or disapprove them with remarks for return to Admin.",
  ),
  bulletItem(
    "2.2.3",
    "Request Submission",
    "The system allows Staff (Client Portal) and Admin users (My Requests / Submit TA Request) to submit technical assistance requests using published forms.",
  ),
  bulletItem(
    "2.2.4",
    "PAMANA Requestor Autofill",
    "The system fills Division/Section, First Name, Middle Name, Last Name, Email Address, and Designation from PAMANA employee records linked to the signed-in museum username.",
  ),
  bulletItem(
    "2.2.5",
    "Request Approval",
    "The system allows Admin users to approve or reject pending client requests before assignment.",
  ),
  bulletItem(
    "2.2.6",
    "Personnel Assignment",
    "The system allows Admin users to assign approved tickets to ICT personnel. Assigned staff can track work under My Assignments.",
  ),
  bulletItem(
    "2.2.7",
    "Document Status Tracking",
    "The system allows users to monitor the current status of each ticket, such as pending approval, approved, rejected, open, in progress, pending, resolved, closed, or reopened.",
  ),
  bulletItem(
    "2.2.8",
    "Service Completion and Feedback",
    "The system allows the requestor to mark service complete, submit client satisfaction feedback, then close or reopen the request.",
  ),
  bulletItem(
    "2.2.9",
    "Document Upload and Form Preview",
    "The system allows users to view the form template and how answers, including PAMANA fields, appear on the printable form.",
  ),
  bulletItem(
    "2.2.10",
    "Notifications and Alerts",
    "The system notifies users of pending approvals, pending form reviews, and actionable request updates.",
  ),
  bulletItem(
    "2.2.11",
    "Role-Based Access Control",
    "The system restricts access to functions according to the user’s assigned role and level of authority.",
  ),
  bulletItem(
    "2.2.12",
    "Messaging",
    "The system supports chats, ticket-linked threads, pokes, and mentions for Admin and Client portals.",
  ),
  bulletItem(
    "2.2.13",
    "Dashboard",
    "The system provides a centralized dashboard showing key counts and activities for each portal.",
  ),
  bulletItem(
    "2.2.14",
    "Reports and Analytics",
    "The system generates reports on request volume, completion, and client feedback.",
  ),
  bulletItem(
    "2.2.15",
    "System Administration",
    "The system provides administrators with tools to configure roles, permissions, and related RBAC settings.",
  ),

  h2("2.3", "System Users and Their Descriptions"),
  bulletItem(
    "2.3.1",
    "Super Admin",
    "Has the highest level of system access and is responsible for overall system administration, including managing user roles, permissions, and other administrative functions.",
  ),
  bulletItem(
    "2.3.2",
    "Admin",
    "Section Head (ODG Section and Regional Component Museum); Division Head (All except ODG). Manages forms, approvals, assignments, requests, reports, and RBAC.",
  ),
  bulletItem(
    "2.3.3",
    "Record Admin",
    "Responsible for managing and monitoring form review and publishing, including pending forms, published forms, and activity logs.",
  ),
  bulletItem(
    "2.3.4",
    "Staff",
    "Employee / client requester responsible for submitting and tracking their own technical assistance requests.",
  ),

  h1("3", "Getting Started"),
  h2("3.1", "Log-in / Sign In"),
  bulletItem(
    "3.1.1",
    "",
    "To start using the web application, you should log in first. Open any web browser and type the TARF System address in the address bar (for example, http://on-prem.x-dcb.net:5173/login). The PAMANA: TARF log-in page will be displayed (Figure 1).",
  ),
  bulletItem(
    "3.1.2",
    "",
    "To log in, enter a valid Username and Password and click on the Sign In button.",
  ),
  p(
    "Note: Sign in with your museum organization username so PAMANA can match your employee record for requestor autofill.",
    { italics: true, size: 20 },
  ),
  fig("Figure 1 – PAMANA: TARF log-in page"),

  h2("3.2", "Dashboard"),
  p(
    "Upon login, the user will be directed to the Dashboard. The Dashboard serves as the main landing page of the PAMANA Technical Assistance Request Form (TARF) System. It provides users with an overview of forms and request activities, statuses, and quick access to frequently used functions.",
  ),
  fig("Figure 2 – PAMANA: TARF Dashboard"),
  bulletItem(
    "3.2.1",
    "Admin Dashboard",
    "Displays a personalized greeting, a snapshot of TA forms, and pending client requests awaiting approval.",
  ),
  bulletItem(
    "3.2.2",
    "Records Dashboard",
    "Displays welcome information and counts for pending forms and published forms.",
  ),
  bulletItem(
    "3.2.3",
    "Client Dashboard",
    "Displays Welcome back and an overview of Your requests.",
  ),

  h2("3.3", "System Navigation"),
  p(
    "The left-side menu provides access to the main features of the system. The sidebar brand shows National Museum of the Philippines / TARF SYSTEM. The bottom of the sidebar provides Settings and Logout. The header includes the notification bell and the current page title.",
  ),
  h3("3.3.1", "Admin Navigation"),
  p(
    "MAIN: Dashboard, Reports, Messages. FORMS: Form Builder, My Forms. REQUESTS: Approvals, Request Management, My Assignments, My Requests, Submit TA Request. RBAC: Users, Roles, Permissions.",
  ),
  h3("3.3.2", "Records Navigation"),
  p("MAIN: Dashboard. FORMS: Pending Forms, Published Forms. SYSTEM: Activity Logs."),
  h3("3.3.3", "Client Navigation"),
  p("MAIN: Dashboard, Messages. REQUESTS: Submit Request, My Requests, Service Feedback."),
  fig("Figure 3 – System Navigation"),

  h1("4", "Admin Portal"),
  h2("4.1", "Form Builder"),
  p(
    "The Form Builder page allows Admin users to create a Technical Assistance request form through a guided wizard.",
  ),
  bulletItem("4.1.1", "", "Open Form Builder from the FORMS section."),
  bulletItem(
    "4.1.2",
    "",
    "Complete the wizard in order: General → Fields → Print Template → Procedure.",
  ),
  bulletItem("4.1.3", "", "Use Back and Continue to move between steps."),
  bulletItem(
    "4.1.4",
    "",
    "On the Print Template step, place form fields on the template. Default Requester profile fields are always available: Division/Section, First Name, Middle Name, Last Name, Email Address, and Designation.",
  ),
  bulletItem(
    "4.1.5",
    "",
    "When ready for Records review, click Submit to Records. To keep working later, use Save as draft instead.",
  ),
  fig("Figure 4 – Form Builder"),

  h2("4.2", "My Forms"),
  p(
    "The My Forms page displays forms created by the Admin user, including drafts, pending review, published, and disapproved forms.",
  ),
  bulletItem("4.2.1", "", "Open My Forms to view forms you created and related analytics."),
  bulletItem("4.2.2", "", "Use New Form / Create Form to start a new form."),
  bulletItem("4.2.3", "", "For a draft, use Send to Records when ready for review."),
  bulletItem(
    "4.2.4",
    "",
    "For a disapproved form, review remarks, edit in Form Builder, then Resubmit.",
  ),
  fig("Figure 5 – My Forms"),

  h2("4.3", "Approvals"),
  p("The Approvals page displays client TA requests with status pending approval."),
  bulletItem("4.3.1", "", "Open Approvals to review pending client requests."),
  bulletItem("4.3.2", "", "Review the request details and form file."),
  bulletItem(
    "4.3.3",
    "",
    "Click Approve / Approve request to accept the request, or Reject / Reject request.",
  ),
  bulletItem("4.3.4", "", "When rejecting, enter a reason and confirm with Confirm reject."),
  bulletItem(
    "4.3.5",
    "",
    "After approval, assign ICT personnel using Assign personnel, then click Assign.",
  ),
  fig("Figure 6 – Approvals"),

  h2("4.4", "Request Management"),
  p(
    "The Request Management page displays all client requests and allows Admin users to open ticket details, update status where allowed, assign personnel, and open Request messages.",
  ),
  fig("Figure 7 – Request Management"),

  h2("4.5", "My Assignments"),
  p(
    "The My Assignments page displays requests assigned to the signed-in Admin / ICT personnel for tracking until the client marks the service complete and closes the request.",
  ),
  fig("Figure 8 – My Assignments"),

  h2("4.6", "My Requests / Submit TA Request"),
  p("Admin users may also act as requestors."),
  bulletItem(
    "4.6.1",
    "",
    "Open Submit TA Request to submit a personal TA request using a published form.",
  ),
  bulletItem("4.6.2", "", "Open My Requests to track your own submissions."),
  bulletItem(
    "4.6.3",
    "",
    "From a ticket detail page you may Mark service complete, submit feedback, Close ticket, or Reopen request, as applicable.",
  ),
  fig("Figure 9 – Admin My Requests"),

  h2("4.7", "Reports"),
  p(
    "The Reports page, titled Reports & Analytics, provides summaries of request volume, completion, and client feedback.",
  ),
  fig("Figure 10 – Reports & Analytics"),

  h2("4.8", "RBAC (Users, Roles, Permissions)"),
  bulletItem(
    "4.8.1",
    "",
    "Open Users to search employees, filter by role or access, and Assign or Manage roles.",
  ),
  bulletItem("4.8.2", "", "Use pagination (Prev / Next) to move through employee pages."),
  bulletItem(
    "4.8.3",
    "",
    "Open Roles to review system roles (Super Admin, Admin, Record Management, Staff) and manage permissions. System roles cannot be deleted.",
  ),
  bulletItem("4.8.4", "", "Open Permissions to browse the capability catalog by category."),
  fig("Figure 11 – RBAC Users"),

  h1("5", "Records Portal"),
  h2("5.1", "Pending Forms"),
  p("The Pending Forms page displays forms with status Pending Review."),
  bulletItem("5.1.1", "", "Open Pending Forms to see forms awaiting recommendation."),
  bulletItem("5.1.2", "", "Open a form to review the Form template (view-only)."),
  bulletItem(
    "5.1.3",
    "",
    "Under Recommendation, select Approve & publish or Disapprove.",
  ),
  bulletItem("5.1.4", "", "Click Submit recommendation."),
  bulletItem(
    "5.1.5",
    "",
    "Approved forms become Published. Disapproved forms return to Admin with remarks.",
  ),
  fig("Figure 12 – Pending Forms / Recommendation"),

  h2("5.2", "Published Forms"),
  p("The Published Forms page displays live TA forms available for client submission."),
  fig("Figure 13 – Published Forms"),

  h2("5.3", "Activity Logs"),
  p("The Activity Logs page displays the audit trail of records-related actions."),
  p(
    "Note: Messaging is not available in the Records portal navigation. Records focuses on form review and publishing.",
    { italics: true, size: 20 },
  ),
  fig("Figure 14 – Activity Logs"),

  h1("6", "Client Portal (Staff)"),
  h2("6.1", "Submit Request"),
  bulletItem("6.1.1", "", "Open Submit Request."),
  bulletItem("6.1.2", "", "Under Published form, select the TA form you need."),
  bulletItem(
    "6.1.3",
    "",
    "The system loads your requestor profile from PAMANA when your museum username is linked.",
  ),
  bulletItem("6.1.4", "", "Complete any remaining required form fields."),
  bulletItem(
    "6.1.5",
    "",
    "Click View form file to preview how answers appear on the printable template.",
  ),
  bulletItem(
    "6.1.6",
    "",
    "Click Submit request. The ticket is created with status pending approval for Admin review.",
  ),
  fig("Figure 15 – Submit Request"),

  h2("6.2", "My Requests"),
  bulletItem("6.2.1", "", "Open My Requests to list tickets linked to your account."),
  bulletItem(
    "6.2.2",
    "",
    "Click View details or the actionable link shown to open the ticket.",
  ),
  bulletItem(
    "6.2.3",
    "",
    "When ICT work is finished and the status allows it, click Mark service complete.",
  ),
  bulletItem("6.2.4", "", "Complete the Client Satisfaction Survey / feedback step."),
  bulletItem(
    "6.2.5",
    "",
    "When ready, click Close ticket. To continue work, click Reopen request.",
  ),
  fig("Figure 16 – My Requests / ticket detail"),

  h2("6.3", "Service Feedback"),
  p(
    "The Service Feedback page displays requests that still need feedback action. Follow the on-screen survey and confirmation steps for each pending item.",
  ),
  fig("Figure 17 – Service Feedback"),

  h1("7", "Shared Features"),
  h2("7.1", "Messages"),
  p(
    "Available in Admin and Client portals under Messages. Users may open Chats, create a New message, Send messages, use Poke, and open Request messages from a ticket detail page.",
  ),
  fig("Figure 18 – Messages"),
  h2("7.2", "Notifications"),
  p(
    "Click the notification bell in the header. Admin notifications focus on pending approvals; Records on pending forms; Client on actionable request updates.",
  ),
  fig("Figure 19 – Notifications"),
  h2("7.3", "Settings"),
  p(
    "Open Settings from the sidebar footer. Under Account, update Display name, Division / office, and Designation as allowed, then Save profile. Under Password, enter the current and new password, then Change password.",
  ),
  fig("Figure 20 – Settings"),

  h1("8", "Status Reference"),
  h2("8.1", "Form Statuses"),
  bulletItem("8.1.1", "Draft", "Saved by Admin; not yet submitted to Records."),
  bulletItem("8.1.2", "Pending Review", "Submitted to Records; awaiting recommendation."),
  bulletItem("8.1.3", "Published", "Approved by Records; available for client submission."),
  bulletItem("8.1.4", "Disapproved", "Returned to Admin with remarks."),
  h2("8.2", "Ticket Statuses"),
  bulletItem("8.2.1", "pending approval", "Awaiting Admin approve/reject."),
  bulletItem("8.2.2", "approved", "Approved; ready for assignment / processing."),
  bulletItem("8.2.3", "rejected", "Rejected with reason."),
  bulletItem("8.2.4", "open", "Active / assignable."),
  bulletItem("8.2.5", "in progress", "ICT assigned / work ongoing."),
  bulletItem("8.2.6", "pending", "Holding status set by Admin."),
  bulletItem("8.2.7", "resolved", "Requestor marked service complete; feedback/close next."),
  bulletItem("8.2.8", "closed", "Closed after feedback."),
  bulletItem("8.2.9", "reopened", "Reopened by requestor for further action."),
  h2("8.3", "End-to-End Workflow Summary"),
  p(
    "Phase 1 — Form publishing: Admin builds form in Form Builder, clicks Submit to Records, then Record Admin reviews and Approve & publish or Disapprove.",
  ),
  p(
    "Phase 2 — Technical assistance request: Staff (or Admin as requestor) submits via Submit Request; Admin approves or rejects on Approvals; Admin assigns ICT personnel; ICT performs the work; requestor marks service complete, submits feedback, then closes or reopens the ticket.",
  ),

  h1("9", "Frequently Asked Questions"),
  mixed([
    { text: "9.1 Why are my Division / Name / Email empty on the form preview? ", bold: true },
    {
      text: "Sign in with your museum username so PAMANA can match your employee record. If no PAMANA staff record is found, profile fields cannot auto-fill.",
    },
  ]),
  mixed([
    { text: "9.2 Do client submissions go to Records? ", bold: true },
    {
      text: "No. Records reviews forms for publishing. Client TA tickets go to Admin Approvals.",
    },
  ]),
  mixed([
    { text: "9.3 Can Admin submit a TA request? ", bold: true },
    { text: "Yes. Use Submit TA Request and track it under My Requests." },
  ]),
  mixed([
    { text: "9.4 Why is Messages missing in Records? ", bold: true },
    { text: "Messaging is available in Admin and Client portals only." },
  ]),
  mixed([
    { text: "9.5 What are the current system roles? ", bold: true },
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
                  text: "PAMANA: TARF",
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

const buf = await Packer.toBuffer(doc);
const outDocx =
  "/home/ysa/dev/National-Museum-SupportTicketing-System/docs/PAMANA_TARF_Employee_User_Manual_V1.docx";
fs.writeFileSync(outDocx, buf);
fs.mkdirSync("/home/ysa/Downloads", { recursive: true });
fs.mkdirSync("/home/ysa/Desktop", { recursive: true });
fs.writeFileSync("/home/ysa/Downloads/PAMANA_TARF_Employee_User_Manual_V1.docx", buf);
fs.writeFileSync("/home/ysa/Desktop/PAMANA_TARF_Employee_User_Manual_V1.docx", buf);
console.log("wrote", outDocx, buf.length);
