/**
 * Builds TARF Employee User Manual (.docx) from docs/USER_MANUAL.md
 * DTS-style: Times New Roman, maroon headers, justified body.
 */
import fs from "fs";
import path from "path";
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
  convertInchesToTwip,
} from "docx";

const ROOT = "/home/ysa/dev/National-Museum-SupportTicketing-System";
const MD = path.join(ROOT, "docs/USER_MANUAL.md");
const OUT = path.join(ROOT, "docs/TARF_Employee_User_Manual_V1.docx");

const H = convertInchesToTwip;
const maroon = "7A1F2B";
const dark = "1A1A1A";
const gray = "555555";

function runsFromInline(text, base = {}) {
  // **bold** and `code`
  const parts = [];
  const re = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  let last = 0;
  let m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) {
      parts.push(new TextRun({ text: text.slice(last, m.index), font: "Times New Roman", size: 22, color: dark, ...base }));
    }
    const tok = m[0];
    if (tok.startsWith("**")) {
      parts.push(
        new TextRun({
          text: tok.slice(2, -2),
          font: "Times New Roman",
          size: 22,
          bold: true,
          color: dark,
          ...base,
        }),
      );
    } else {
      parts.push(
        new TextRun({
          text: tok.slice(1, -1),
          font: "Courier New",
          size: 20,
          color: dark,
          ...base,
        }),
      );
    }
    last = m.index + tok.length;
  }
  if (last < text.length) {
    parts.push(new TextRun({ text: text.slice(last), font: "Times New Roman", size: 22, color: dark, ...base }));
  }
  if (parts.length === 0) {
    parts.push(new TextRun({ text: "", font: "Times New Roman", size: 22, color: dark, ...base }));
  }
  return parts;
}

function para(text, opts = {}) {
  return new Paragraph({
    spacing: { after: opts.after ?? 140, before: opts.before ?? 0, line: 276 },
    alignment: opts.align ?? AlignmentType.JUSTIFIED,
    children: runsFromInline(text, { italics: opts.italics, bold: opts.bold }),
  });
}

function heading(level, text) {
  const size = level === 1 ? 28 : level === 2 ? 24 : 22;
  const color = level === 1 ? maroon : dark;
  return new Paragraph({
    spacing: { before: level === 1 ? 360 : 240, after: 140 },
    children: [
      new TextRun({
        text,
        font: "Times New Roman",
        size,
        bold: true,
        color,
      }),
    ],
  });
}

function coverLine(text, opts = {}) {
  return new Paragraph({
    spacing: { before: opts.before ?? 80, after: opts.after ?? 0 },
    alignment: AlignmentType.CENTER,
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

function figPlaceholder(caption) {
  return new Paragraph({
    spacing: { before: 160, after: 160 },
    alignment: AlignmentType.CENTER,
    border: {
      top: { style: BorderStyle.SINGLE, size: 4, color: "DDDDDD", space: 8 },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: "DDDDDD", space: 8 },
      left: { style: BorderStyle.SINGLE, size: 4, color: "DDDDDD", space: 8 },
      right: { style: BorderStyle.SINGLE, size: 4, color: "DDDDDD", space: 8 },
    },
    children: [
      new TextRun({
        text: `[Screenshot placeholder]\n${caption}`,
        font: "Times New Roman",
        size: 18,
        italics: true,
        color: gray,
      }),
    ],
  });
}

function parseTable(rows) {
  // Render markdown tables as plain aligned paragraphs (simple, reliable)
  const out = [];
  for (const row of rows) {
    if (/^\|?\s*-+/.test(row.replace(/\|/g, ""))) continue;
    const cells = row
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((c) => c.trim());
    if (cells.every((c) => /^-+$/.test(c))) continue;
    out.push(para(cells.join("  ·  "), { align: AlignmentType.LEFT, after: 60 }));
  }
  return out;
}

const md = fs.readFileSync(MD, "utf8");
const lines = md.split(/\r?\n/);

const children = [];
let i = 0;
let inToc = false;
let tableBuf = [];

function flushTable() {
  if (tableBuf.length) {
    children.push(...parseTable(tableBuf));
    tableBuf = [];
  }
}

// Cover
children.push(coverLine("NATIONAL MUSEUM OF THE PHILIPPINES", { before: 1000, size: 26, bold: true, color: maroon }));
children.push(coverLine("TARF System", { before: 200, size: 44, bold: true }));
children.push(
  coverLine("Technical Assistance Request Form Support Ticketing System", {
    before: 120,
    size: 22,
    italics: true,
    color: gray,
  }),
);
children.push(coverLine("Employee User Manual", { before: 500, size: 32, bold: true }));
children.push(coverLine("Version 1.0", { before: 100, size: 22 }));
children.push(coverLine("September 2026", { before: 60, size: 20, color: gray }));
children.push(
  new Paragraph({
    children: [],
    spacing: { before: 400 },
    pageBreakBefore: true,
  }),
);

// Skip MD title block until TOC or first ##
while (i < lines.length) {
  const line = lines[i];
  if (line.startsWith("## Table of Contents") || line.startsWith("## 1.")) break;
  i++;
}

while (i < lines.length) {
  const line = lines[i];

  if (line.startsWith("|")) {
    tableBuf.push(line);
    i++;
    continue;
  } else {
    flushTable();
  }

  if (line.startsWith("## Table of Contents")) {
    inToc = true;
    children.push(heading(1, "Table of Contents"));
    i++;
    continue;
  }

  if (inToc) {
    if (line.startsWith("---") || line.startsWith("## ")) {
      inToc = false;
      // fall through to handle ##
    } else {
      const toc = line.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/^#+\s*/, "").trim();
      if (toc) children.push(para(toc, { align: AlignmentType.LEFT, after: 40 }));
      i++;
      continue;
    }
  }

  if (line.startsWith("---")) {
    i++;
    continue;
  }

  if (line.startsWith("#### ")) {
    children.push(heading(3, line.slice(5).trim()));
    i++;
    continue;
  }
  if (line.startsWith("### ")) {
    children.push(heading(2, line.slice(4).trim()));
    i++;
    continue;
  }
  if (line.startsWith("## ")) {
    children.push(heading(1, line.slice(3).trim()));
    i++;
    continue;
  }
  if (line.startsWith("# ")) {
    // already used on cover
    i++;
    continue;
  }

  if (/^\*\*Figure \d+/.test(line) || /^Figure \d+/.test(line)) {
    const cap = line.replace(/\*\*/g, "").trim();
    children.push(figPlaceholder(cap));
    i++;
    continue;
  }

  if (line.startsWith("*(Insert") || line.startsWith("*End of")) {
    children.push(para(line.replace(/^\*|\*$/g, ""), { italics: true, align: AlignmentType.CENTER }));
    i++;
    continue;
  }

  if (line.trim() === "") {
    i++;
    continue;
  }

  // bullets
  if (line.trim().startsWith("- ")) {
    children.push(para("• " + line.trim().slice(2), { align: AlignmentType.LEFT }));
    i++;
    continue;
  }

  // numbered list like 1. text
  if (/^\d+\.\s+\*\*/.test(line.trim()) || /^\d+\.\s+[A-Z]/.test(line.trim())) {
    children.push(para(line.trim(), { align: AlignmentType.LEFT }));
    i++;
    continue;
  }

  children.push(para(line.trim()));
  i++;
}

flushTable();

const doc = new Document({
  sections: [
    {
      properties: {
        page: { margin: { top: H(1), bottom: H(1), left: H(1), right: H(1) } },
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

const buf = await Packer.toBuffer(doc);
fs.writeFileSync(OUT, buf);
console.log("wrote", OUT, buf.length, "from", MD);
