import os
import shutil
from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE

ref_path = '/Users/varunteja/Library/Containers/net.whatsapp.WhatsApp/Data/tmp/documents/6FF0D9A1-897F-4A49-A9E3-621CEA2445ED/KrishiYantra_Internship_Presentation_v2.pptx'
output_path = '/Users/varunteja/Downloads/buildtrack/Tirumala_Meadows_Internship_Presentation.pptx'

prs = Presentation(ref_path)

# Indices to remove in reverse order:
# 10: Thank you
# 8: Implementation screenshots
# 6: Agri pricing model
indices_to_remove = [10, 8, 6]
for idx in sorted(indices_to_remove, reverse=True):
    rId = prs.slides._sldIdLst[idx].rId
    prs.part.drop_rel(rId)
    del prs.slides._sldIdLst[idx]

print(f"Kept slides count: {len(prs.slides)}")

COLOR_GOLD = RGBColor(197, 160, 89)

# Standardize Footers: Slide number in footer is only the shape at bottom-right (left > 10,000,000)
for idx, slide in enumerate(prs.slides):
    slide_num_str = f"{idx+1:02d}"
    for shape in slide.shapes:
        if shape.has_text_frame and shape.left > 10000000 and shape.top > 6000000:
            for p in shape.text_frame.paragraphs:
                p.text = slide_num_str

# ==========================================
# SLIDE 1 (Index 0): TITLE SLIDE
# ==========================================
s1 = prs.slides[0]
for shape in s1.shapes:
    if shape.has_text_frame:
        for p in shape.text_frame.paragraphs:
            if "KrishiYantra" in p.text:
                p.text = "Tirumala Meadows: Next-Gen Luxury Real Estate Web Platform"
                p.font.bold = True
                p.font.size = Pt(28)
            elif "INDUSTRIAL INTERNSHIP PROJECT" in p.text:
                p.text = "INDUSTRIAL INTERNSHIP PROJECT · TIRUMALA MEADOWS PVT. LTD."
                p.font.size = Pt(11)
                p.font.color.rgb = COLOR_GOLD
    if shape.has_table:
        table = shape.table
        if len(table.rows) >= 2:
            table.cell(1, 0).text = "Varun Teja Cherukuthota"
            table.cell(1, 1).text = "VNR VJIET"
        if len(table.rows) >= 3:
            table.cell(2, 0).text = "Tirumala Meadows Project Team"
            table.cell(2, 1).text = "Jubilee Hills, Hyderabad"

# ==========================================
# SLIDE 2 (Index 1): ABSTRACT
# ==========================================
s2 = prs.slides[1]
for shape in s2.shapes:
    if shape.has_text_frame:
        for p in shape.text_frame.paragraphs:
            txt = p.text.strip()
            if txt == "Abstract":
                continue
            elif "Most farmers in India" in txt or len(txt) > 150:
                p.text = (
                    "Tirumala Meadows Private Limited is a 28-year-old premier luxury real estate enterprise headquartered in Jubilee Hills, Hyderabad, with 30+ completed ultra-luxury villas and over 3,000 acres facilitated across Western Telangana. Traditional luxury real estate websites suffer from static brochure downloads, lack of spatial comprehension, and opaque financial planning tools. "
                    "During this industrial internship, we engineered a high-performance, customer-mindset-driven corporate web application featuring an interactive 3D Architectural Studio (Isometric 3D Cutaway, CAD Blueprint Schema, and 360° Walkthrough), a real-time EMI & Loan Calculator, an Investor ROI Projection Engine, a Dynamic Daylight Simulator, and an In-House Ecosystem Showcase. The platform delivers seamless mobile-first responsiveness, Apple-inspired minimalist luxury aesthetics, and multi-vertical investor discovery."
                )
                p.font.size = Pt(13)
            elif "Web Development · Agri-Tech" in txt:
                p.text = "Web Engineering · Real Estate Tech · Interactive 3D"
                p.font.bold = True
            elif "Equipment Sharing · Farm" in txt:
                p.text = "React 19 · TypeScript · Vite · Tailwind CSS · 3D Architectural Studio · EMI Calculator · ROI Engine · Jubilee Hills Luxury"
                p.font.size = Pt(10)

# ==========================================
# SLIDE 3 (Index 2): PROBLEM STATEMENT (Clean, Balanced & Concise)
# ==========================================
s3 = prs.slides[2]
# Subtitle
s3.shapes[3].text_frame.paragraphs[0].text = "Luxury property buyers and investors lack interactive digital tools to evaluate spatial layouts and financial projections before physical site visits."
s3.shapes[3].text_frame.paragraphs[0].font.size = Pt(15)

# Current situation (3 punchy bullets)
p_curr = s3.shapes[6].text_frame.paragraphs
p_curr[0].text = "Static PDF brochures offer zero spatial or dimensional clarity"
p_curr[1].text = "Opaque financing with no interactive EMI & ROI calculators"
p_curr[2].text = "No multi-perspective architectural views (Isometric, CAD, 3D)"
if len(p_curr) > 3:
    p_curr[3].text = "Fragmented display of corporate legacy and credentials"

for p in p_curr:
    p.font.size = Pt(12)

# Why it matters (3 punchy bullets)
p_why = s3.shapes[10].text_frame.paragraphs
p_why[0].text = "Luxury villa buyers (HNIs) demand swift, elite digital experiences"
p_why[1].text = "Over 75% of prospective buyers research on mobile first"
p_why[2].text = "Outdated portals cause high bounce rates and low lead conversion"
if len(p_why) > 3:
    p_why[3].text = "Poor digital presentation reduces buyer trust in ₹10Cr+ assets"

for p in p_why:
    p.font.size = Pt(12)

# Gap we address (Concise & crisp)
s3.shapes[14].text_frame.paragraphs[0].text = "An integrated luxury web portal showcasing Tirumala Meadows' 28-year Jubilee Hills portfolio and in-house ecosystem."
s3.shapes[14].text_frame.paragraphs[0].font.size = Pt(12)
s3.shapes[15].text_frame.paragraphs[0].text = "Interactive 3D Architectural Studio with instant CAD blueprints, virtual walkthroughs, real-time EMI calculators, and strategic land insights."
s3.shapes[15].text_frame.paragraphs[0].font.size = Pt(12)

# ==========================================
# SLIDE 4 (Index 3): OBJECTIVES
# ==========================================
s4 = prs.slides[3]
obj_cards = [
    (4, 5, 6, "1", "Corporate Brand Elevation", "Build a high-performance platform reflecting 28 years of distinction, Jubilee Hills legacy, and 8 business verticals."),
    (8, 9, 10, "2", "3D Architectural Studio", "Engineer an interactive multi-mode viewer featuring Isometric 3D Cutaway, CAD Blueprint, and Walkthrough perspectives."),
    (12, 13, 14, "3", "Real-Time Financial Engines", "Develop interactive EMI mortgage calculators and investor ROI engines with instant down payment and tenure sliders."),
    (16, 17, 18, "4", "Customer Mindset UX", "Implement intuitive buyer persona navigation (Villa Enthusiasts, Real Estate Investors, Land Partners) and daylight simulation."),
    (20, 21, 22, "5", "Portfolio & Project Showcase", "Integrate verified Jubilee Hills completed villas and Western Telangana strategic land corridors (Kollur, Velimala, Shankarpally)."),
    (24, 25, 26, "6", "High-Performance Engineering", "Ensure sub-second page loads, responsive Apple-inspired minimalist design, strict TypeScript typing, and clean SEO routing.")
]

for num_idx, title_idx, desc_idx, num_str, title_str, desc_str in obj_cards:
    s4.shapes[num_idx].text_frame.paragraphs[0].text = num_str
    s4.shapes[title_idx].text_frame.paragraphs[0].text = title_str
    s4.shapes[title_idx].text_frame.paragraphs[0].font.bold = True
    s4.shapes[desc_idx].text_frame.paragraphs[0].text = desc_str
    s4.shapes[desc_idx].text_frame.paragraphs[0].font.size = Pt(11)

# ==========================================
# SLIDE 5 (Index 4): WORKFLOW & USER JOURNEY (Clean, Balanced & Legible)
# ==========================================
s5 = prs.slides[4]
s5.shapes[2].text_frame.paragraphs[0].text = "Platform Workflow & User Experience Journey"

workflow_cards = [
    (4, 5, "1 · Discovery", "Explore 28-yr legacy, Jubilee Hills villas, and 8 verticals"),
    (8, 9, "2 · Persona Select", "Tailor view for Homebuyer, Commercial, or Land Partner"),
    (12, 13, "3 · 3D Studio", "Switch between Isometric 3D, CAD Blueprints, and Walkthrough"),
    (16, 17, "4 · Daylight Sim", "Simulate natural daylight from 6 AM to 6 PM dynamically"),
    (19, 20, "5 · Financial Plan", "Calculate real-time EMI estimates and 5-yr ROI metrics"),
    (23, 24, "6 · Specifications", "Review complete architectural details and digital factsheet"),
    (27, 28, "7 · VIP Concierge", "Instant WhatsApp connect with Jubilee Hills sales desk"),
    (31, 32, "8 · Land Expansion", "Submit joint development proposals across Western Telangana")
]

for title_idx, desc_idx, title_str, desc_str in workflow_cards:
    s5.shapes[title_idx].text_frame.paragraphs[0].text = title_str
    s5.shapes[title_idx].text_frame.paragraphs[0].font.bold = True
    s5.shapes[desc_idx].text_frame.paragraphs[0].text = desc_str
    s5.shapes[desc_idx].text_frame.paragraphs[0].font.size = Pt(11)

s5.shapes[33].text_frame.paragraphs[0].text = "Conversion Optimization: Frictionless UX, architectural transparency, and direct executive communication."
s5.shapes[33].text_frame.paragraphs[0].font.size = Pt(12)

# ==========================================
# SLIDE 6 (Index 5): MODULES & METHODOLOGY (Clean 3-Column Architecture)
# ==========================================
s6 = prs.slides[5]

# Module 1
s6.shapes[5].text_frame.paragraphs[0].text = "Corporate Brand & Portfolio"
p_m1 = s6.shapes[6].text_frame.paragraphs
p_m1[0].text = "28-Year Legacy & Corporate Footprint Showcase"
p_m1[1].text = "30+ Completed Jubilee Hills Villa Gallery"
p_m1[2].text = "In-House Ecosystem (Architects, Tech, Engineers)"
p_m1[3].text = "8 Verticals & Western Telangana Land Banks"
for p in p_m1:
    p.font.size = Pt(11)
s6.shapes[7].text_frame.paragraphs[0].text = "Output: Verified brand authority & project credibility"
s6.shapes[7].text_frame.paragraphs[0].font.size = Pt(11)

# Module 2
s6.shapes[10].text_frame.paragraphs[0].text = "Interactive 3D & Financial Engines"
p_m2 = s6.shapes[11].text_frame.paragraphs
p_m2[0].text = "3D Architectural Studio (Isometric, CAD, Walkthrough)"
p_m2[1].text = "Dynamic 24-Hour Daylight Simulator"
p_m2[2].text = "Interactive EMI Mortgage Calculator"
p_m2[3].text = "Investor ROI & Rental Yield Projection Engine"
for p in p_m2:
    p.font.size = Pt(11)
s6.shapes[12].text_frame.paragraphs[0].text = "Output: High buyer confidence & decision acceleration"
s6.shapes[12].text_frame.paragraphs[0].font.size = Pt(11)

# Module 3
s6.shapes[15].text_frame.paragraphs[0].text = "Client Conversion & In-House Tech"
p_m3 = s6.shapes[16].text_frame.paragraphs
p_m3[0].text = "Buyer Persona Filter (Villas, Investments, Land)"
p_m3[1].text = "Interactive Digital Factsheet & Brochure"
p_m3[2].text = "Direct Jubilee Hills Executive WhatsApp Routing"
p_m3[3].text = "Resident Portal & Sustainable Design Standards"
for p in p_m3:
    p.font.size = Pt(11)
s6.shapes[17].text_frame.paragraphs[0].text = "Output: Measurable lead capture & VIP client onboarding"
s6.shapes[17].text_frame.paragraphs[0].font.size = Pt(11)

# ==========================================
# SLIDE 7 (Index 6): TECH STACK & REQUIREMENTS (Streamlined & Clean)
# ==========================================
s7 = prs.slides[6]
# Clean 7-row core table
table = s7.shapes[6].table
core_tech = [
    ("Frontend Framework", "React 19 (Hooks, Context, Functional Components)"),
    ("Language", "TypeScript 5.x & Modern ECMAScript (ES2024)"),
    ("Build System", "Vite 5 (Lightning HMR, Tree-Shaking, Rollup)"),
    ("Styling & Design", "Tailwind CSS 4, Custom Architectural Tokens"),
    ("Icons & UI", "Lucide React, Glassmorphism, CSS Grid"),
    ("Routing & State", "React Router DOM v6, Client-side Navigation"),
    ("Production Bundle", "319 KB Optimized Production Asset Delivery")
]

for r_idx, (cat, tech) in enumerate(core_tech):
    if r_idx + 1 < len(table.rows):
        table.cell(r_idx + 1, 0).text = cat
        table.cell(r_idx + 1, 1).text = tech

# Clean remaining rows if table had 11 rows
extra_rows = [
    ("Interactive Studio", "Isometric 3D Cutaway, CAD Blueprint, Walkthrough"),
    ("Financial Engines", "Real-Time EMI Calculator & 5-Yr ROI Projector"),
    ("Design Philosophy", "Apple-Inspired Minimalist Luxury, 100% Mobile Ready")
]
for r_offset, (cat, tech) in enumerate(extra_rows):
    row_i = len(core_tech) + 1 + r_offset
    if row_i < len(table.rows):
        table.cell(row_i, 0).text = cat
        table.cell(row_i, 1).text = tech

# Right Side Card 1: Project Assets (Clean & crisp)
s7.shapes[8].text_frame.paragraphs[0].text = "PROJECT ASSETS"
s7.shapes[9].text_frame.paragraphs[0].text = "Curated Media & Data"
p_assets = s7.shapes[10].text_frame.paragraphs
p_assets[0].text = "High-Res Jubilee Hills Villa Photography"
if len(p_assets) > 1:
    p_assets[1].text = "3D Architectural Renderings & CAD Blueprints"
if len(p_assets) > 2:
    p_assets[2].text = "Verified 28-Year Corporate Profile & Metrics"
for p in p_assets:
    p.font.size = Pt(11)

# Right Side Card 2: System Specifications (Clean & crisp)
s7.shapes[11].text_frame.paragraphs[0].text = "SPECIFICATIONS"
p_specs = s7.shapes[12].text_frame.paragraphs
p_specs[0].text = "Platform: Cross-Platform Web (Mobile, Tablet, Desktop)"
if len(p_specs) > 1:
    p_specs[1].text = "Browsers: Chrome, Safari, Edge, Firefox"
for p in p_specs:
    p.font.size = Pt(11)
s7.shapes[13].text_frame.paragraphs[0].text = "Responsive: Fluid breakpoints from 320px to 4K displays"
s7.shapes[13].text_frame.paragraphs[0].font.size = Pt(11)

# ==========================================
# SLIDE 8 (Index 7): CONCLUSION & FUTURE SCOPE (Clean, Balanced 4x4 Bullet Points)
# ==========================================
s8 = prs.slides[7]

# 4 balanced conclusion points
p_concl = s8.shapes[5].text_frame.paragraphs
p_concl[0].text = "Delivered an elite corporate web platform reflecting Tirumala Meadows' 28-year Jubilee Hills architectural legacy."
p_concl[1].text = "Engineered interactive 3D Architectural Studio with Isometric, CAD Blueprint, and Walkthrough visualization modes."
p_concl[2].text = "Built real-time financial simulation engines (EMI Mortgage Calculator & Investor ROI Projections)."
p_concl[3].text = "Achieved production-ready build passing all TypeScript checks with zero bundle bloat and sub-second load times."
if len(p_concl) > 4:
    p_concl[4].text = "Implemented customer-mindset UX with persona switching, daylight simulation, and direct WhatsApp routing."

for p in p_concl:
    p.font.size = Pt(12)

# 4 balanced future scope points
p_fut = s8.shapes[8].text_frame.paragraphs
p_fut[0].text = "Interactive WebGL/Three.js 3D Virtual Reality (VR) walk-throughs with custom interior material personalization."
p_fut[1].text = "Integrated EOI (Expression of Interest) and token booking portal with secure payment gateway."
p_fut[2].text = "Headless CMS backend (Node.js) for automated portfolio uploads and real-time site construction updates."
p_fut[3].text = "AI-powered real estate assistant for instant customer query resolution and Vastu layout scoring."
if len(p_fut) > 4:
    p_fut[4].text = "Dedicated Resident & Investor Mobile Application with maintenance requests and dividend tracking."

for p in p_fut:
    p.font.size = Pt(12)

prs.save(output_path)
print(f"Successfully balanced and formatted presentation at: {output_path}")
