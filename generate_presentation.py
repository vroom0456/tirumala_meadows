import os
import shutil
from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN
from pptx.enum.shapes import MSO_SHAPE

ref_path = '/Users/varunteja/Library/Containers/net.whatsapp.WhatsApp/Data/tmp/documents/6FF0D9A1-897F-4A49-A9E3-621CEA2445ED/KrishiYantra_Internship_Presentation_v2.pptx'
output_path = '/Users/varunteja/Downloads/buildtrack/Tirumala_Meadows_Internship_Presentation.pptx'

# We want 8 slides chosen from reference:
# 0: Title Slide
# 1: Abstract
# 2: Problem Statement
# 3: Objectives
# 4: Proposed System / Workflow
# 5: Modules & Methodology
# 7: Tech Stack & Requirements (ref index 7)
# 9: Conclusion & Future Scope (ref index 9)

# Indices to delete from reference (11 slides total: 0..10):
# We need to remove index 10 (Thank you), index 8 (Implementation screenshots), index 6 (Agri pricing model)
# Deleting in reverse order preserves indices: 10, 8, 6
prs = Presentation(ref_path)

indices_to_remove = [10, 8, 6]
for idx in sorted(indices_to_remove, reverse=True):
    rId = prs.slides._sldIdLst[idx].rId
    prs.part.drop_rel(rId)
    del prs.slides._sldIdLst[idx]

print(f"Kept slides count: {len(prs.slides)}")

COLOR_NAVY = RGBColor(15, 23, 42)
COLOR_GOLD = RGBColor(197, 160, 89)

# Update slide numbers 01 to 08 in the footer
for idx, slide in enumerate(prs.slides):
    slide_num_str = f"{idx+1:02d}"
    for shape in slide.shapes:
        if shape.has_text_frame:
            for p in shape.text_frame.paragraphs:
                # Update footer slide number
                txt = p.text.strip()
                if txt.isdigit() and len(txt) <= 2:
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
            table.cell(1, 1).text = "VNR VJIET / VLG"
        if len(table.rows) >= 3:
            table.cell(2, 0).text = "Tirumala Meadows Project Team"
            table.cell(2, 1).text = "Roll No. / ID"

# ==========================================
# SLIDE 2 (Index 1): ABSTRACT
# ==========================================
s2 = prs.slides[1]
for shape in s2.shapes:
    if shape.has_text_frame:
        for p in shape.text_frame.paragraphs:
            if "Abstract" in p.text and len(p.text.strip()) == 8:
                continue
            elif "Most farmers in India" in p.text or len(p.text.strip()) > 150:
                p.text = (
                    "Tirumala Meadows Private Limited is a 28-year-old premier luxury real estate enterprise headquartered in Jubilee Hills, Hyderabad, with 30+ completed ultra-luxury villas and over 3,000 acres facilitated across Western Telangana. Traditional luxury real estate websites suffer from static brochure downloads, lack of spatial comprehension, and opaque financial planning tools. "
                    "During this industrial internship, we engineered a high-performance, customer-mindset-driven corporate web application featuring an interactive 3D Architectural Studio (Isometric 3D Cutaway, CAD Blueprint Schema, and 360° Walkthrough), a real-time EMI & Loan Calculator, an Investor ROI Projection Engine, a Dynamic Daylight Simulator, and an In-House Ecosystem Showcase. The platform delivers seamless mobile-first responsiveness, Apple-inspired minimalist luxury aesthetics, and multi-vertical investor discovery."
                )
                p.font.size = Pt(13)
            elif "Web Development · Agri-Tech" in p.text:
                p.text = "Web Engineering · Real Estate Tech · Interactive 3D"
                p.font.bold = True
            elif "Equipment Sharing · Farm" in p.text:
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
obj_updates = [
    ("Corporate Brand Elevation", "Build a high-performance web platform reflecting 28 years of distinction, Jubilee Hills legacy, and 8 business verticals."),
    ("3D Architectural Studio", "Engineer an interactive multi-mode viewer featuring Isometric 3D Cutaway, CAD Blueprint, and Walkthrough perspectives."),
    ("Real-Time Financial Engines", "Develop interactive EMI mortgage calculators and investor ROI engines with instant down payment and tenure sliders."),
    ("Customer Mindset UX", "Implement intuitive buyer persona navigation (Villa Enthusiasts, Real Estate Investors, Land Partners) and daylight simulation."),
    ("Portfolio & Project Showcase", "Integrate verified Jubilee Hills completed villas and Western Telangana strategic land corridors (Kollur, Velimala, Shankarpally)."),
    ("High-Performance Engineering", "Ensure sub-second page loads, responsive Apple-inspired minimalist design, strict TypeScript typing, and clean SEO routing.")
]
obj_idx = 0
for shape in s4.shapes:
    if shape.has_text_frame:
        for p in shape.text_frame.paragraphs:
            txt = p.text.strip()
            if txt in ["Build the Platform", "List Equipment", "Inspect and Approve", "Search and Book", "Insure and Build Trust", "Secure the System"]:
                if obj_idx < len(obj_updates):
                    p.text = obj_updates[obj_idx][0]
                    p.font.bold = True
            elif "A web platform where" in txt or "Let owners list" in txt or "Place every new" in txt or "Search, filter and" in txt or "Subscription insurance" in txt or "Hashed passwords" in txt:
                if obj_idx < len(obj_updates):
                    p.text = obj_updates[obj_idx][1]
                    p.font.size = Pt(11)
                    obj_idx += 1

# Restore number headers (1..6) if any were overwritten
num_counter = 1
for shape in s4.shapes:
    if shape.has_text_frame and shape.left < 10000000:
        for p in shape.text_frame.paragraphs:
            if p.text.strip() == "04":
                p.text = str(num_counter)
                num_counter += 1

# ==========================================
# SLIDE 5 (Index 4): PROPOSED SYSTEM (WORKFLOW)
# ==========================================
s5 = prs.slides[4]
for shape in s5.shapes:
    if shape.has_text_frame:
        for p in shape.text_frame.paragraphs:
            if "Proposed System" in p.text:
                p.text = "Platform Workflow & User Experience Journey"
            elif "1 · Register" in p.text:
                p.text = "1 · Discovery"
            elif "Farmer registers and logs in" in p.text:
                p.text = "Explore 28-yr legacy, Jubilee Hills luxury villas, and 8 business verticals"
            elif "2 · List" in p.text:
                p.text = "2 · Persona Select"
            elif "Owner lists" in p.text:
                p.text = "Tailor view for Homebuyer, Commercial Investor, or Land Partner"
            elif "3 · Inspect" in p.text:
                p.text = "3 · 3D Studio"
            elif "Admin inspects" in p.text:
                p.text = "Switch between Isometric 3D, CAD Blueprints, and Virtual Walkthrough"
            elif "4 · Search" in p.text:
                p.text = "4 · Sunlight & Env"
            elif "Filter by name" in p.text:
                p.text = "Simulate natural daylight from 6 AM to 6 PM with interactive sun tracker"
            elif "5 · Book" in p.text:
                p.text = "5 · Financial Plan"
            elif "Farmer selects" in p.text:
                p.text = "Real-time EMI mortgage estimates and 5-yr ROI appreciation metrics"
            elif "6 · Insure" in p.text:
                p.text = "6 · Factsheet Download"
            elif "Farmer chooses" in p.text:
                p.text = "Access comprehensive corporate factsheet and project specifications modal"
            elif "7 · Inspect on Delivery" in p.text:
                p.text = "7 · Direct Connect"
            elif "Owner and borrower" in p.text:
                p.text = "Instant VIP WhatsApp inquiry and direct Jubilee Hills sales desk line"
            elif "8 · Return & Review" in p.text:
                p.text = "8 · Land Acquisition"
            elif "Owner verifies" in p.text:
                p.text = "Submit joint development and land bank proposals across Western Telangana"
            elif "Price shown before booking" in p.text:
                p.text = "Conversion Optimization: Frictionless UX, clear technical transparency, and immediate direct executive communication."

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
for shape in s7.shapes:
    if shape.has_table:
        table = shape.table
        rows_data = [
            ("Languages", "TypeScript, Modern JavaScript (ES2024), HTML5, CSS3"),
            ("Frontend Framework", "React 19 (Hooks, Context, Functional Architecture)"),
            ("Build System & Tooling", "Vite 5 (Lightning HMR, Optimized Rollup Bundling)"),
            ("Styling & Design System", "Tailwind CSS 4, Custom Architectural Color Tokens"),
            ("UI Components & Icons", "Lucide React, Glassmorphism, Responsive CSS Grid"),
            ("Routing & State", "React Router DOM v6, Local Component State"),
            ("Performance & CI/CD", "319 KB Optimized Production Bundle, Git & GitHub CI/CD")
        ]
        for r_idx, (cat, tech) in enumerate(rows_data):
            if r_idx + 1 < len(table.rows):
                table.cell(r_idx + 1, 0).text = cat
                table.cell(r_idx + 1, 1).text = tech
    if shape.has_text_frame:
        for p in shape.text_frame.paragraphs:
            txt = p.text.strip()
            if "SEED DATA" in txt:
                p.text = "PROJECT ASSETS"
            elif "Seeded demo data" in txt:
                p.text = "Curated Media & Data"
            elif "6 sample machines" in txt:
                p.text = "High-Res Villa Photography"
            elif "Tractors, harvester" in txt:
                p.text = "3D Architectural Renderings & CAD Blueprints"
            elif "Default administrator" in txt:
                p.text = "Verified Corporate Entity Profile & Metrics"
            elif "HARDWARE" in txt:
                p.text = "SPECIFICATIONS"
            elif "Computer: Any PC" in txt:
                p.text = "Platform: Cross-platform web (Desktop, Tablet, Mobile)"
            elif "Browser: Modern" in txt:
                p.text = "Browsers: Chrome, Safari, Edge, Firefox (Full Modern CSS)"
            elif "Operating System: Windows" in txt:
                p.text = "Responsive: Fluid breakpoints from 320px to 4K monitors"

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

# Save updated presentation
prs.save(output_path)
print(f"Successfully generated 8-slide presentation at: {output_path}")
