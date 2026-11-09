from pptx import Presentation
from pptx.util import Pt, Emu
from pptx.dml.color import RGBColor

ref_path = '/Users/varunteja/Library/Containers/net.whatsapp.WhatsApp/Data/tmp/documents/6FF0D9A1-897F-4A49-A9E3-621CEA2445ED/KrishiYantra_Internship_Presentation_v2.pptx'
output_path = '/Users/varunteja/Downloads/buildtrack/Tirumala_Meadows_Internship_Presentation.pptx'

prs = Presentation(ref_path)

# Remove slides 10 (Thank You), 8 (Implementation), 6 (Pricing/Insurance)
for idx in [10, 8, 6]:
    rId = prs.slides._sldIdLst[idx].rId
    prs.part.drop_rel(rId)
    del prs.slides._sldIdLst[idx]

print(f"Kept slides: {len(prs.slides)}")

COLOR_GOLD = RGBColor(197, 160, 89)

def set_run_text(shape, new_text):
    """Replace text in a shape's first paragraph, preserving run formatting."""
    para = shape.text_frame.paragraphs[0]
    if para.runs:
        para.runs[0].text = new_text
        # Clear other runs
        for r in para.runs[1:]:
            r.text = ""
    else:
        para.text = new_text

def set_para_texts(shape, texts):
    """Replace bullet list text in multi-paragraph shape, preserving run formatting per paragraph."""
    paras = shape.text_frame.paragraphs
    for i, txt in enumerate(texts):
        if i < len(paras):
            if paras[i].runs:
                paras[i].runs[0].text = txt
                for r in paras[i].runs[1:]:
                    r.text = ""
            else:
                paras[i].text = txt
    # Clear any leftover paragraphs
    for i in range(len(texts), len(paras)):
        if paras[i].runs:
            for r in paras[i].runs:
                r.text = ""
        else:
            paras[i].text = ""

# ── Fix footer slide numbers (bottom-right shape, left > 10M, top > 6M) ──
for idx, slide in enumerate(prs.slides):
    num = f"{idx+1:02d}"
    for shape in slide.shapes:
        if shape.has_text_frame and shape.left > 10000000 and shape.top > 6000000:
            set_run_text(shape, num)

# ══════════════════════════════════════
# SLIDE 1: TITLE
# ══════════════════════════════════════
s = prs.slides[0]
set_run_text(s.shapes[5], "Tirumala Meadows: Next-Gen Luxury Real Estate Web Platform")
set_run_text(s.shapes[9], "INDUSTRIAL INTERNSHIP PROJECT · TIRUMALA MEADOWS PVT. LTD.")
if s.shapes[7].has_table:
    t = s.shapes[7].table
    t.cell(1, 0).text = "Varun Teja Cherukuthota"
    t.cell(1, 1).text = "VNR VJIET"
    t.cell(2, 0).text = "Tirumala Meadows Project Team"
    t.cell(2, 1).text = "Jubilee Hills, Hyderabad"

# ══════════════════════════════════════
# SLIDE 2: ABSTRACT
# ══════════════════════════════════════
s = prs.slides[1]
# Long abstract text (shape 4, single run)
set_run_text(s.shapes[4],
    "Tirumala Meadows Private Limited is a 28-year-old luxury real estate enterprise in Jubilee Hills, Hyderabad, "
    "with 30+ completed ultra-luxury villas and 3,000+ acres across Western Telangana. "
    "We engineered a customer-mindset-driven corporate web platform featuring an interactive 3D Architectural Studio "
    "(Isometric, CAD Blueprint, Walkthrough), real-time EMI Calculator, Investor ROI Engine, Daylight Simulator, "
    "and In-House Ecosystem Showcase — delivering Apple-inspired minimalist luxury with full mobile responsiveness."
)
set_run_text(s.shapes[7], "Web Engineering · Real Estate Tech · Interactive 3D")
set_run_text(s.shapes[10], "React 19 · TypeScript · Vite · Tailwind CSS · 3D Studio · EMI Calculator · ROI Engine")

# ══════════════════════════════════════
# SLIDE 3: PROBLEM STATEMENT
# ══════════════════════════════════════
s = prs.slides[2]
set_run_text(s.shapes[3],
    "Luxury property buyers lack interactive digital tools to evaluate spatial layouts and financial projections before site visits."
)
set_para_texts(s.shapes[6], [
    "Static PDF brochures offer no spatial or dimensional clarity",
    "No interactive EMI or ROI calculators for financial planning",
    "No multi-perspective architectural views (Isometric, CAD, 3D)",
    "Fragmented display of corporate legacy and credentials"
])
set_para_texts(s.shapes[10], [
    "HNI buyers demand swift, elite digital experiences",
    "75%+ buyers research on mobile before engaging sales teams",
    "Poor digital presence erodes trust in premium ₹10Cr+ assets",
    "Outdated portals cause high bounce rates and low conversion"
])
set_run_text(s.shapes[14], "Integrated luxury portal with in-house ecosystem showcase and real portfolio photography.")
set_run_text(s.shapes[15], "Interactive 3D Studio with CAD blueprints, walkthroughs, EMI calculators, and land insights.")

# ══════════════════════════════════════
# SLIDE 4: OBJECTIVES
# ══════════════════════════════════════
s = prs.slides[3]
objs = [
    (4, 5, 6, "1", "Corporate Brand Elevation", "Platform reflecting 28 years of distinction, Jubilee Hills legacy, and 8 business verticals."),
    (8, 9, 10, "2", "3D Architectural Studio", "Multi-mode viewer with Isometric 3D Cutaway, CAD Blueprint, and Walkthrough perspectives."),
    (12, 13, 14, "3", "Financial Simulation Engines", "Interactive EMI mortgage calculator and investor ROI engine with instant sliders."),
    (16, 17, 18, "4", "Customer Mindset UX", "Buyer persona navigation, daylight simulation, and direct WhatsApp concierge routing."),
    (20, 21, 22, "5", "Portfolio Showcase", "Verified Jubilee Hills completed villas and Western Telangana land corridors."),
    (24, 25, 26, "6", "Performance Engineering", "Sub-second loads, Apple-inspired design, strict TypeScript, and clean SEO routing.")
]
for ni, ti, di, num, title, desc in objs:
    set_run_text(s.shapes[ni], num)
    set_run_text(s.shapes[ti], title)
    set_run_text(s.shapes[di], desc)

# ══════════════════════════════════════
# SLIDE 5: PLATFORM WORKFLOW (Concise single-line cards)
# ══════════════════════════════════════
s = prs.slides[4]
set_run_text(s.shapes[2], "Platform Workflow & User Experience Journey")

workflow = [
    (4, 5, "1 · Discovery", "Explore 28-yr legacy, villas, and 8 verticals"),
    (8, 9, "2 · Persona", "Select Homebuyer, Investor, or Land Partner view"),
    (12, 13, "3 · 3D Studio", "Isometric, CAD Blueprint, and Walkthrough modes"),
    (16, 17, "4 · Daylight", "Simulate 6 AM–6 PM natural sunlight dynamically"),
    (19, 20, "5 · Finance", "Real-time EMI estimates and 5-yr ROI metrics"),
    (23, 24, "6 · Specs", "Digital factsheet and architectural specifications"),
    (27, 28, "7 · Connect", "Instant WhatsApp link to Jubilee Hills sales desk"),
    (31, 32, "8 · Land", "Joint development proposals across W. Telangana")
]
for ti, di, title, desc in workflow:
    set_run_text(s.shapes[ti], title)
    set_run_text(s.shapes[di], desc)

set_run_text(s.shapes[33], "Frictionless UX → architectural transparency → direct executive communication.")

# ══════════════════════════════════════
# SLIDE 6: MODULES & METHODOLOGY (3 balanced columns)
# ══════════════════════════════════════
s = prs.slides[5]
# Module 1
set_run_text(s.shapes[5], "Corporate Brand & Portfolio")
set_para_texts(s.shapes[6], [
    "28-Year Legacy & Corporate Footprint",
    "30+ Completed Jubilee Hills Villa Gallery",
    "In-House Architects, Designers & Engineers",
    "8 Business Verticals & Land Banks"
])
set_run_text(s.shapes[7], "Output: Verified brand authority & credibility")

# Module 2
set_run_text(s.shapes[10], "Interactive 3D & Financial Tools")
set_para_texts(s.shapes[11], [
    "3D Architectural Studio (3 viewing modes)",
    "Dynamic 24-Hour Daylight Simulator",
    "Interactive EMI Mortgage Calculator",
    "Investor ROI Projection Engine"
])
set_run_text(s.shapes[12], "Output: Buyer confidence & decision speed")

# Module 3
set_run_text(s.shapes[15], "Client Conversion & Technology")
set_para_texts(s.shapes[16], [
    "Buyer Persona Filter (3 segments)",
    "Interactive Factsheet & Brochure Modal",
    "Direct Executive WhatsApp Routing",
    "Resident Portal & Sustainability Standards"
])
set_run_text(s.shapes[17], "Output: Lead capture & VIP onboarding")

# ══════════════════════════════════════
# SLIDE 7: TECH STACK (Clean table + crisp side cards)
# ══════════════════════════════════════
s = prs.slides[6]
table = s.shapes[6].table
tech = [
    ("Frontend", "React 19, TypeScript, Vite 5"),
    ("Styling", "Tailwind CSS 4, Architectural Tokens"),
    ("Icons & UI", "Lucide React, Glassmorphism, CSS Grid"),
    ("Routing", "React Router DOM v6, Client-side SPA"),
    ("3D Studio", "Isometric, CAD Blueprint, Walkthrough"),
    ("Financial", "EMI Calculator, 5-Yr ROI Projector"),
    ("Build", "319 KB Production Bundle, GitHub CI/CD"),
    ("Design", "Apple-Inspired Minimalist, Mobile-First"),
    ("Language", "TypeScript 5.x, ES2024, HTML5, CSS3"),
    ("Platform", "Cross-platform (Desktop, Tablet, Mobile)")
]
for r_idx, (cat, t) in enumerate(tech):
    if r_idx + 1 < len(table.rows):
        table.cell(r_idx + 1, 0).text = cat
        table.cell(r_idx + 1, 1).text = t

# Right side cards
set_run_text(s.shapes[8], "PROJECT ASSETS")
set_run_text(s.shapes[9], "Curated Media & Data")
set_para_texts(s.shapes[10], [
    "Jubilee Hills Villa Photography",
    "3D Renderings & CAD Blueprints",
    "28-Year Corporate Profile & Metrics"
])
set_run_text(s.shapes[11], "SPECIFICATIONS")
set_para_texts(s.shapes[12], [
    "Cross-Platform: Desktop, Tablet, Mobile",
    "Browsers: Chrome, Safari, Edge, Firefox"
])
set_run_text(s.shapes[13], "Responsive: 320px to 4K displays")

# ══════════════════════════════════════
# SLIDE 8: CONCLUSION & FUTURE SCOPE (4+4 balanced bullets)
# ══════════════════════════════════════
s = prs.slides[7]
set_para_texts(s.shapes[5], [
    "Delivered elite corporate web platform for Tirumala Meadows' 28-year legacy",
    "Built interactive 3D Architectural Studio with Isometric, CAD & Walkthrough modes",
    "Engineered real-time EMI Calculator and Investor ROI Projection Engine",
    "Achieved production-ready TypeScript build with sub-second load performance",
    "Crafted customer-mindset UX with persona switching and daylight simulation"
])
set_para_texts(s.shapes[8], [
    "WebGL/Three.js VR walk-throughs with interior material customization",
    "EOI booking portal with integrated secure payment gateway",
    "Headless CMS for automated portfolio and construction progress updates",
    "AI-powered real estate assistant with Vastu layout scoring",
    "Resident & Investor mobile app with maintenance and dividend tracking"
])

prs.save(output_path)
print(f"Done — finalized presentation saved to: {output_path}")
