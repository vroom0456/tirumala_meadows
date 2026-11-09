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
# SLIDE 3 (Index 2): PROBLEM STATEMENT
# ==========================================
s3 = prs.slides[2]
for shape in s3.shapes:
    if shape.has_text_frame:
        for p in shape.text_frame.paragraphs:
            txt = p.text.strip()
            if "Small farmers have no simple" in txt:
                p.text = "High-net-worth buyers and investors lack interactive digital tools to evaluate spatial layouts, engineering transparency, and financial returns before physical site visits."
                p.font.size = Pt(15)
            # Current Situation
            elif "No single place to find machinery" in txt:
                p.text = "Static PDF brochures provide zero spatial or dimensional clarity"
            elif "Hiring is informal" in txt:
                p.text = "Opaque investment and financial projections with no instant calculators"
            elif "Hidden charges and unclear" in txt:
                p.text = "Lack of multi-angle architectural views (Isometric, CAD, Walkthrough)"
            elif "No standard inspection" in txt:
                p.text = "Fragmented display of company verticals and 28-year corporate credentials"
            # Why it matters
            elif "Small farmers cannot afford" in txt:
                p.text = "Luxury villa buyers (HNIs, industrialists) demand swift, elite digital experiences"
            elif "Privately owned machines" in txt:
                p.text = "Over 75% of buyers research on mobile before engaging sales directors"
            elif "Owners fear misuse" in txt:
                p.text = "Poor digital presentation erodes trust in premium ₹10Cr+ asset classes"
            elif "There is no record of borrower" in txt:
                p.text = "Traditional sites have high bounce rates and low lead conversion"
            # Gap we address
            elif "One platform where farmers list" in txt:
                p.text = "An integrated luxury portal featuring an In-House Architectural Ecosystem showcase with real portfolio photography."
            elif "Borrowers see rental" in txt:
                p.text = "Interactive 3D Architectural Studio with instant CAD blueprints, walkthroughs, EMI calculators, and Western Telangana land acquisition insights."

# ==========================================
# SLIDE 4 (Index 3): OBJECTIVES
# ==========================================
s4 = prs.slides[3]
obj_cards = [
    # (num_shape_idx, title_shape_idx, desc_shape_idx, title, desc)
    (4, 5, 6, "1", "Corporate Brand Elevation", "Build a high-performance web platform reflecting 28 years of distinction, Jubilee Hills legacy, and 8 business verticals."),
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
# SLIDE 5 (Index 4): WORKFLOW & USER JOURNEY
# ==========================================
s5 = prs.slides[4]
s5.shapes[2].text_frame.paragraphs[0].text = "Platform Workflow & User Experience Journey"

workflow_cards = [
    (4, 5, "1 · Discovery", "Explore 28-yr legacy, Jubilee Hills luxury villas, and 8 business verticals"),
    (8, 9, "2 · Persona Select", "Tailor view for Homebuyer, Commercial Investor, or Strategic Land Partner"),
    (12, 13, "3 · 3D Studio", "Switch seamlessly between Isometric 3D, CAD Blueprints, and Walkthrough"),
    (16, 17, "4 · Sunlight & Env", "Simulate natural daylight from 6 AM to 6 PM with interactive sun tracker"),
    (19, 20, "5 · Financial Plan", "Real-time EMI mortgage estimation and 5-yr ROI appreciation projections"),
    (23, 24, "6 · Specifications", "Access comprehensive corporate factsheet and project specifications modal"),
    (27, 28, "7 · VIP Concierge", "Direct high-priority VIP WhatsApp inquiry and Jubilee Hills sales routing"),
    (31, 32, "8 · Land Expansion", "Submit joint development and land bank proposals across Western Telangana")
]

for title_idx, desc_idx, title_str, desc_str in workflow_cards:
    s5.shapes[title_idx].text_frame.paragraphs[0].text = title_str
    s5.shapes[title_idx].text_frame.paragraphs[0].font.bold = True
    s5.shapes[desc_idx].text_frame.paragraphs[0].text = desc_str

s5.shapes[33].text_frame.paragraphs[0].text = "Conversion Optimization: Frictionless UX, architectural transparency, and direct executive communication."

# ==========================================
# SLIDE 6 (Index 5): MODULES & METHODOLOGY
# ==========================================
s6 = prs.slides[5]
for shape in s6.shapes:
    if shape.has_text_frame:
        for p in shape.text_frame.paragraphs:
            txt = p.text.strip()
            # Module 1
            if "Access & Listings" in txt:
                p.text = "Corporate Brand & Portfolio"
            elif "Farmer and admin login" in txt:
                p.text = "28-Year Legacy & Corporate Footprint Showcase"
            elif "bcrypt hashing" in txt:
                p.text = "30+ Completed Jubilee Hills Luxury Villa Gallery"
            elif "Equipment listing with" in txt:
                p.text = "In-House Ecosystem (Architects, Designers, Tech, Engineers)"
            elif "Admin inspection and" in txt:
                p.text = "8 Distinct Verticals & Western Telangana Land Banks"
            elif "Output: approved, bookable" in txt:
                p.text = "Output: Verified brand authority & project credibility"

            # Module 2
            elif "Booking & Pricing" in txt:
                p.text = "Interactive 3D & Financial Engines"
            elif "Search and filter by" in txt:
                p.text = "3D Architectural Studio (Isometric, CAD, Walkthrough)"
            elif "Calendar for start and" in txt:
                p.text = "Dynamic 24-Hour Daylight & Orientation Simulator"
            elif "Rental + deposit +" in txt:
                p.text = "Interactive EMI Mortgage Calculator with Loan Tenure"
            elif "Booking history with" in txt:
                p.text = "Investor ROI & Rental Yield Projection Calculator"
            elif "Output: price breakdown" in txt:
                p.text = "Output: High buyer confidence & decision acceleration"

            # Module 3
            elif "Insurance & Trust" in txt:
                p.text = "Client Conversion & In-House Tech"
            elif "Basic, Standard and" in txt:
                p.text = "Buyer Persona Filter (Villas, Investments, Land Partnerships)"
            elif "Dynamic monthly premium" in txt:
                p.text = "Interactive Factsheet & Corporate Brochure Engine"
            elif "Trust score from 0 to 100" in txt:
                p.text = "Jubilee Hills Direct Executive Concierge Routing"
            elif "Farmer and admin dashboards" in txt:
                p.text = "Resident Portal & Sustainable Architecture Standards"
            elif "Output: premium, trust score" in txt:
                p.text = "Output: Measurable lead capture & VIP client onboarding"

# ==========================================
# SLIDE 7 (Index 6): TECH STACK & REQUIREMENTS
# ==========================================
s7 = prs.slides[6]
# Update Table
for shape in s7.shapes:
    if shape.has_table:
        table = shape.table
        rows_data = [
            ("Languages", "TypeScript, Modern JavaScript (ES2024), HTML5, CSS3"),
            ("Frontend Framework", "React 19 (Hooks, Context, Functional Architecture)"),
            ("Build System & Tooling", "Vite 5 (Lightning HMR, Optimized Rollup Bundling)"),
            ("Styling & Design System", "Tailwind CSS 4, Custom Architectural Color Tokens"),
            ("UI Components & Icons", "Lucide React, Glassmorphism, Responsive CSS Grid"),
            ("Routing & Navigation", "React Router DOM v6, Single Page Application (SPA)"),
            ("Interactive 3D Studio", "Isometric 3D Cutaway, CAD Blueprint, Virtual Walkthrough"),
            ("Financial Simulators", "Dynamic Real-Time EMI Engine, 5-Yr Investor ROI Model"),
            ("Performance & CI/CD", "319 KB Optimized Production Bundle, Git & GitHub CI/CD"),
            ("Design Philosophy", "Apple-Inspired Minimalist Luxury, 100% Mobile Responsive")
        ]
        for r_idx, (cat, tech) in enumerate(rows_data):
            if r_idx + 1 < len(table.rows):
                table.cell(r_idx + 1, 0).text = cat
                table.cell(r_idx + 1, 1).text = tech

# Update Right Side Cards in Slide 7
# Card 1: Project Assets
s7.shapes[8].text_frame.paragraphs[0].text = "PROJECT ASSETS"
s7.shapes[9].text_frame.paragraphs[0].text = "Curated Media & Data"
p_assets = s7.shapes[10].text_frame.paragraphs
p_assets[0].text = "High-Res Jubilee Hills Villa Photography"
if len(p_assets) > 1:
    p_assets[1].text = "3D Architectural Renderings & CAD Blueprints"
if len(p_assets) > 2:
    p_assets[2].text = "Verified 28-Year Corporate Profile & Metrics"

# Card 2: System Specifications
s7.shapes[11].text_frame.paragraphs[0].text = "SPECIFICATIONS"
p_specs = s7.shapes[12].text_frame.paragraphs
p_specs[0].text = "Platform: Cross-platform web (Desktop, Tablet, Mobile)"
if len(p_specs) > 1:
    p_specs[1].text = "Browsers: Chrome, Safari, Edge, Firefox (Full Modern CSS)"
s7.shapes[13].text_frame.paragraphs[0].text = "Responsive: Fluid breakpoints from 320px to 4K displays"

# ==========================================
# SLIDE 8 (Index 7): CONCLUSION & FUTURE SCOPE
# ==========================================
s8 = prs.slides[7]
for shape in s8.shapes:
    if shape.has_text_frame:
        for p in shape.text_frame.paragraphs:
            txt = p.text.strip()
            # Conclusion points
            if "KrishiYantra gives farmers" in txt:
                p.text = "Delivered an elite, modern corporate web platform reflecting Tirumala Meadows' 28-year Jubilee Hills architectural legacy."
            elif "Admin-controlled inspection" in txt:
                p.text = "Engineered interactive 3D Architectural Studio with Isometric, CAD Blueprint, and Walkthrough visualization modes."
            elif "Insurance plans, premium" in txt:
                p.text = "Built real-time financial simulation tools (EMI Calculator & Investor ROI Engine) that empower buyer decision-making."
            elif "Hashed passwords, tokens" in txt:
                p.text = "Crafted customer-mindset UX with seamless persona switching, daylight simulation, and direct executive WhatsApp routing."
            elif "Limitation: bookings, claims" in txt:
                p.text = "Achieved production-ready build passing all TypeScript checks with zero bundle bloat and sub-second performance."
            
            # Future Scope points
            elif "Booking, claim and review" in txt:
                p.text = "Interactive WebGL/Three.js 3D Virtual Reality (VR) walk-throughs with custom interior material customization."
            elif "Online payment gateway" in txt:
                p.text = "Integrated EOI (Expression of Interest) and token booking portal with secure payment gateway."
            elif "SMS and e-mail notifications" in txt:
                p.text = "Headless CMS backend (Strapi/Node.js) for automated portfolio uploads and real-time construction progress updates."
            elif "Regional languages, voice" in txt:
                p.text = "AI-powered real estate assistant for automated customer query resolution and Vastu layout scoring."
            elif "Mobile app with offline" in txt:
                p.text = "Dedicated Resident & Investor Mobile Application with maintenance tracking and land appreciation reporting."

prs.save(output_path)
print(f"Successfully finalized 8-slide presentation at: {output_path}")
