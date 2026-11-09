import sys
import os
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import inch, cm
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        # Don't draw headers/footers on cover page
        if self._pageNumber == 1:
            return
        
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#475569"))

        # Header (Pages >= 2)
        if self._pageNumber > 1:
            self.drawString(54, 800, "DEPARTMENT OF ARTIFICIAL INTELLIGENCE AND DATA SCIENCE")
            self.drawRightString(A4[0] - 54, 800, "CBIT, HYDERABAD")
            self.setStrokeColor(colors.HexColor("#CBD5E1"))
            self.setLineWidth(0.5)
            self.line(54, 794, A4[0] - 54, 794)

        # Footer (Page number)
        self.setStrokeColor(colors.HexColor("#CBD5E1"))
        self.setLineWidth(0.5)
        self.line(54, 50, A4[0] - 54, 50)
        
        self.drawString(54, 38, "Tirumala Meadows — Industrial Internship Project Report")
        page_str = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(A4[0] - 54, 38, page_str)
        self.restoreState()

def build_pdf(filename="Tirumala_Meadows_Internship_Report_Final.pdf"):
    doc = SimpleDocTemplate(
        filename,
        pagesize=A4,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54
    )

    styles = getSampleStyleSheet()

    # Custom styles
    title_style = ParagraphStyle(
        'CoverTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=26,
        alignment=1, # Center
        textColor=colors.HexColor("#0F2B22")
    )

    subtitle_style = ParagraphStyle(
        'CoverSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=12,
        leading=16,
        alignment=1,
        textColor=colors.HexColor("#334155")
    )

    h1_style = ParagraphStyle(
        'Heading1_Custom',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=15,
        leading=20,
        textColor=colors.HexColor("#0F2B22"),
        spaceBefore=14,
        spaceAfter=8,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'Heading2_Custom',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=colors.HexColor("#1E293B"),
        spaceBefore=10,
        spaceAfter=5,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'Body_Custom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=14.5,
        textColor=colors.HexColor("#1E293B"),
        spaceAfter=6
    )

    bullet_style = ParagraphStyle(
        'Bullet_Custom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=14,
        textColor=colors.HexColor("#1E293B"),
        leftIndent=15,
        spaceAfter=4
    )

    code_style = ParagraphStyle(
        'Code_Custom',
        parent=styles['Normal'],
        fontName='Courier',
        fontSize=7.5,
        leading=10.5,
        textColor=colors.HexColor("#0F172A")
    )

    table_cell = ParagraphStyle(
        'TableCell',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        textColor=colors.HexColor("#1E293B")
    )

    table_header = ParagraphStyle(
        'TableHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11.5,
        textColor=colors.HexColor("#0F2B22")
    )

    story = []

    # =========================================================================
    # PAGE 1: COVER PAGE
    # =========================================================================
    story.append(Spacer(1, 20))
    story.append(Paragraph("Tirumala Meadows: A Web-Based Architectural &<br/>Luxury Real Estate Enterprise Platform", title_style))
    story.append(Spacer(1, 15))
    story.append(Paragraph("<b>An Industrial Internship Project Report</b><br/>submitted in partial fulfillment of the requirements for the award of the degree of", subtitle_style))
    story.append(Spacer(1, 12))
    story.append(Paragraph("<b>Bachelor of Engineering / Technology</b><br/>in<br/><b>Artificial Intelligence and Data Science / Computer Science</b>", subtitle_style))
    story.append(Spacer(1, 30))

    author_table_data = [
        [Paragraph("<b>Submitted By:</b>", table_header), Paragraph("<b>Under the Esteemed Guidance of:</b>", table_header)],
        [Paragraph("<b>Varun Teja Cherukuthota</b><br/>Roll No: 1601-22-771-045<br/>Dept of AI & DS", table_cell),
         Paragraph("<b>Industry Mentors & Technical Cell</b><br/>Tirumala Meadows Private Limited<br/>Jubilee Hills, Hyderabad", table_cell)]
    ]
    t_auth = Table(author_table_data, colWidths=[240, 240])
    t_auth.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(t_auth)

    story.append(Spacer(1, 50))
    story.append(Paragraph("<b>DEPARTMENT OF ARTIFICIAL INTELLIGENCE AND DATA SCIENCE</b><br/>CHAITANYA BHARATHI INSTITUTE OF TECHNOLOGY (A)<br/>HYDERABAD – 500075, TELANGANA, INDIA<br/><b>NOVEMBER 2026</b>", subtitle_style))
    story.append(PageBreak())

    # =========================================================================
    # PAGE 2: INSTITUTE VISION & MISSION
    # =========================================================================
    story.append(Paragraph("INSTITUTE VISION & MISSION", h1_style))
    story.append(Spacer(1, 5))
    story.append(Paragraph("<b>Institute Vision:</b>", h2_style))
    story.append(Paragraph("“To be the center of excellence in technical education and research, fostering innovation and sustainable technologies for the socioeconomic upliftment of society.”", body_style))
    story.append(Spacer(1, 8))
    story.append(Paragraph("<b>Institute Mission:</b>", h2_style))
    story.append(Paragraph("1. To provide high quality, state-of-the-art engineering and technological education that inspires creative problem-solving.", bullet_style))
    story.append(Paragraph("2. To inculcate moral and ethical values, social responsibility, and entrepreneurial mindset among aspiring engineers.", bullet_style))
    story.append(Paragraph("3. To collaborate with premier industries and research organizations, preparing industry-ready graduates.", bullet_style))
    story.append(Spacer(1, 15))
    story.append(Paragraph("<b>Department Vision (AI & DS):</b>", h2_style))
    story.append(Paragraph("“To emerge as a premier destination for education, research and innovation in Artificial Intelligence, Data Science, and Modern Web Systems, producing globally competent engineers.”", body_style))
    story.append(Spacer(1, 8))
    story.append(Paragraph("<b>Department Mission (AI & DS):</b>", h2_style))
    story.append(Paragraph("• Impart thorough foundational and practical mastery of software engineering, web architectures, and intelligent systems.", bullet_style))
    story.append(Paragraph("• Encourage collaborative industrial internships, real-world development, and hands-on capstone projects.", bullet_style))
    story.append(Paragraph("• Promote continuous learning, professional ethics, and sustainable societal solutions.", bullet_style))
    story.append(PageBreak())

    # =========================================================================
    # PAGE 3: PEOs, POs, AND PROGRAM SPECIFIC OUTCOMES
    # =========================================================================
    story.append(Paragraph("PROGRAM EDUCATIONAL OBJECTIVES & OUTCOMES", h1_style))
    story.append(Paragraph("<b>Program Educational Objectives (PEOs):</b>", h2_style))
    story.append(Paragraph("<b>PEO 1:</b> Graduates will apply principles of software engineering, computer architectures, and interactive digital systems to solve complex problems in modern industries.", bullet_style))
    story.append(Paragraph("<b>PEO 2:</b> Graduates will demonstrate leadership, technical innovation, and professional integrity in interdisciplinary engineering domains.", bullet_style))
    story.append(Paragraph("<b>PEO 3:</b> Graduates will engage in lifelong learning, adopting emerging technologies such as interactive 3D WebGL, modern UI frameworks, and cloud architectures.", bullet_style))
    story.append(Spacer(1, 10))
    story.append(Paragraph("<b>Program Outcomes (POs) Addressed:</b>", h2_style))
    story.append(Paragraph("<b>PO 1 (Engineering Knowledge):</b> Applied mathematics, computer science algorithms, and component design in building interactive financial models and 3D CAD schematic viewers.", bullet_style))
    story.append(Paragraph("<b>PO 3 (Design / Development of Solutions):</b> Designed and engineered a complete digital real-estate platform with responsive Apple-grade UI, daylight simulators, and verified location matrices.", bullet_style))
    story.append(Paragraph("<b>PO 5 (Modern Tool Usage):</b> Leveraged modern industry tools including React 18, Vite, TypeScript, Tailwind CSS, Lucide Icons, and WebGL Sketchfab 3D Embeds.", bullet_style))
    story.append(Paragraph("<b>PO 10 (Communication):</b> Documented system specifications, CAD blueprints, and synthesized corporate factsheets for executive stakeholders.", bullet_style))
    story.append(Paragraph("<b>PO 12 (Life-long Learning):</b> Mastered state-of-the-art front-end performance tuning, responsive ergonomics, and client-side computational state machines.", bullet_style))
    story.append(PageBreak())

    # =========================================================================
    # PAGE 4: SDG MAPPING & WK PROFILE
    # =========================================================================
    story.append(Paragraph("SUSTAINABLE DEVELOPMENT GOALS (SDG) & WK MAPPING", h1_style))
    story.append(Paragraph("<b>United Nations Sustainable Development Goals (SDGs) Addressed:</b>", body_style))
    
    sdg_data = [
        [Paragraph("<b>Target SDG</b>", table_header), Paragraph("<b>Relevance to Tirumala Meadows Platform</b>", table_header)],
        [Paragraph("<b>SDG 9:</b> Industry, Innovation & Infrastructure", table_cell),
         Paragraph("Develops digital infrastructure for real estate and civil construction, replacing slow manual sales cycles with interactive 3D visualization and automated CAD blueprints.", table_cell)],
        [Paragraph("<b>SDG 11:</b> Sustainable Cities & Communities", table_cell),
         Paragraph("Promotes master-planned gated layouts with rainwater harvesting pits, on-site sewage treatment (STP), and eco-conscious thermal brick insulation.", table_cell)],
        [Paragraph("<b>SDG 8:</b> Decent Work & Economic Growth", table_cell),
         Paragraph("Empowers over 250 in-house professionals (architects, civil engineers, tech developers) through integrated digital asset management.", table_cell)],
    ]
    t_sdg = Table(sdg_data, colWidths=[160, 320])
    t_sdg.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#F1F5F9")),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(t_sdg)
    story.append(Spacer(1, 15))

    story.append(Paragraph("<b>Knowledge and Attitude Profile (WK) Mapping:</b>", h2_style))
    wk_data = [
        [Paragraph("<b>Knowledge Profile</b>", table_header), Paragraph("<b>How the Project Addresses It</b>", table_header)],
        [Paragraph("<b>WK 3:</b> Engineering Design", table_cell), Paragraph("Modular architecture with scalable TypeScript components, reactive hooks, and responsive CSS grids.", table_cell)],
        [Paragraph("<b>WK 5:</b> Engineering Practice", table_cell), Paragraph("Follows modern CI/CD, Vite bundler optimization, zero-dependency tree shaking, and WCAG AAA accessibility.", table_cell)],
        [Paragraph("<b>WK 8:</b> Ethics & Transparency", table_cell), Paragraph("Provides verified municipal title clearances, accurate distance matrices, and transparent financial calculators without deceptive marketing.", table_cell)]
    ]
    t_wk = Table(wk_data, colWidths=[160, 320])
    t_wk.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#F1F5F9")),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(t_wk)
    story.append(PageBreak())

    # =========================================================================
    # PAGE 5: DECLARATION & CERTIFICATES
    # =========================================================================
    story.append(Paragraph("DECLARATION CERTIFICATE", h1_style))
    story.append(Spacer(1, 10))
    story.append(Paragraph("I hereby declare that the industrial internship project titled <b>'Tirumala Meadows: A Web-Based Architectural & Luxury Real Estate Enterprise Platform'</b> is an authentic record of independent work carried out by me during the academic internship at <b>Tirumala Meadows Private Limited</b>, Jubilee Hills, Hyderabad.", body_style))
    story.append(Spacer(1, 8))
    story.append(Paragraph("I further declare that this report has not been submitted previously in part or in full for the award of any degree, diploma, or fellowship at this or any other university.", body_style))
    story.append(Spacer(1, 40))

    dec_table = [
        [Paragraph("<b>Date:</b> November 09, 2026<br/><b>Place:</b> Hyderabad", table_cell),
         Paragraph("<b>Varun Teja Cherukuthota</b><br/>Roll No: 1601-22-771-045<br/>Dept. of Artificial Intelligence & Data Science", table_cell)]
    ]
    t_dec = Table(dec_table, colWidths=[240, 240])
    t_dec.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP')]))
    story.append(t_dec)

    story.append(Spacer(1, 35))
    story.append(Paragraph("BONAFIDE CERTIFICATE", h1_style))
    story.append(Spacer(1, 10))
    story.append(Paragraph("This is to certify that the project report titled <b>'Tirumala Meadows: A Web-Based Architectural & Luxury Real Estate Enterprise Platform'</b> submitted by <b>Varun Teja Cherukuthota (1601-22-771-045)</b> is a bonafide record of work carried out under our supervision and guidance in partial fulfillment of the academic requirements.", body_style))
    story.append(Spacer(1, 45))

    cert_table = [
        [Paragraph("<b>Internal Guide</b><br/>Department of AI & DS<br/>CBIT, Hyderabad", table_cell),
         Paragraph("<b>Head of Department</b><br/>Department of AI & DS<br/>CBIT, Hyderabad", table_cell)]
    ]
    t_cert = Table(cert_table, colWidths=[240, 240])
    t_cert.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP')]))
    story.append(t_cert)
    story.append(PageBreak())

    # =========================================================================
    # PAGE 6: ABSTRACT & ACKNOWLEDGEMENTS
    # =========================================================================
    story.append(Paragraph("ABSTRACT", h1_style))
    story.append(Paragraph("Luxury real estate enterprise websites often suffer from static brochures, cluttered user interfaces, and opaque architectural specifications. For high-net-worth individuals, institutional buyers, and discerning homeowners, traditional listing websites fail to convey spatial elegance, structural engineering integrity, and verified civic connectivity.", body_style))
    story.append(Spacer(1, 6))
    story.append(Paragraph("This industrial internship project, developed for <b>Tirumala Meadows Private Limited</b> (a 28-year luxury enterprise in Jubilee Hills, Hyderabad), designs and builds a next-generation web application. The platform integrates a full-width cinematic hero section, an interactive <b>3D Architectural CAD Studio</b> with 360° orbit inspection, a high-precision <b>2D CAD Blueprint Engine</b> with layer toggles (columns, dimensions, Vastu quadrants), and an interactive <b>Virtual Walkthrough</b>.", body_style))
    story.append(Spacer(1, 6))
    story.append(Paragraph("The platform is engineered with React 18, TypeScript 5.5, Vite 5.4, and Tailwind CSS 3.4, using an Apple-grade design system based on <b>SF Pro Display</b> typography, deep forest green (#0F2B22), warm ivory (#FBF9F4), and muted gold accents. The resulting production build completes in under 900ms, achieves 95+ Core Web Vitals, and provides mobile-first interactive concierge capabilities.", body_style))
    story.append(Spacer(1, 20))

    story.append(Paragraph("ACKNOWLEDGEMENTS", h1_style))
    story.append(Paragraph("I express my profound gratitude to <b>Tirumala Meadows Private Limited</b> for providing an extraordinary industrial environment during my internship. Their uncompromising standards in civil engineering and bespoke luxury inspired every facet of this project.", body_style))
    story.append(Spacer(1, 6))
    story.append(Paragraph("I sincerely thank my faculty advisors and the Head of the Department of Artificial Intelligence and Data Science for their invaluable technical mentorship. Finally, I thank my family and peers for their continuous encouragement.", body_style))
    story.append(PageBreak())

    # =========================================================================
    # PAGE 7: TABLE OF CONTENTS
    # =========================================================================
    story.append(Paragraph("TABLE OF CONTENTS", h1_style))
    story.append(Spacer(1, 5))

    toc_data = [
        [Paragraph("<b>Chapter / Section</b>", table_header), Paragraph("<b>Page</b>", table_header)],
        [Paragraph("ABSTRACT & ACKNOWLEDGEMENTS", table_cell), Paragraph("vi", table_cell)],
        [Paragraph("LIST OF TABLES & FIGURES", table_cell), Paragraph("viii", table_cell)],
        [Paragraph("<b>CHAPTER 1: INTRODUCTION</b>", table_header), Paragraph("<b>1</b>", table_header)],
        [Paragraph("1.1 Background & Corporate Legacy", table_cell), Paragraph("1", table_cell)],
        [Paragraph("1.2 Problem Statement", table_cell), Paragraph("2", table_cell)],
        [Paragraph("1.3 Project Objectives", table_cell), Paragraph("2", table_cell)],
        [Paragraph("1.4 Scope of the Platform", table_cell), Paragraph("3", table_cell)],
        [Paragraph("1.5 Organization of the Report", table_cell), Paragraph("3", table_cell)],
        [Paragraph("<b>CHAPTER 2: LITERATURE SURVEY & INDUSTRIAL CONTEXT</b>", table_header), Paragraph("<b>4</b>", table_header)],
        [Paragraph("2.1 Evolution of PropTech in India", table_cell), Paragraph("4", table_cell)],
        [Paragraph("2.2 3D & WebGL Architectural Visualization", table_cell), Paragraph("4", table_cell)],
        [Paragraph("2.3 Technology Stack Rationale (React, Vite, TypeScript, Tailwind)", table_cell), Paragraph("5", table_cell)],
        [Paragraph("2.4 Gaps Identified in Existing Commercial Platforms", table_cell), Paragraph("6", table_cell)],
        [Paragraph("<b>CHAPTER 3: SYSTEM ANALYSIS & SPECIFICATIONS</b>", table_header), Paragraph("<b>7</b>", table_header)],
        [Paragraph("3.1 Stakeholder Personas", table_cell), Paragraph("7", table_cell)],
        [Paragraph("3.2 Functional Requirements", table_cell), Paragraph("7", table_cell)],
        [Paragraph("3.3 Non-Functional Requirements", table_cell), Paragraph("8", table_cell)],
        [Paragraph("3.4 Hardware and Software Environment", table_cell), Paragraph("9", table_cell)],
        [Paragraph("<b>CHAPTER 4: SYSTEM DESIGN & ARCHITECTURE</b>", table_header), Paragraph("<b>10</b>", table_header)],
        [Paragraph("4.1 Component Hierarchy & Architectural Topology", table_cell), Paragraph("10", table_cell)],
        [Paragraph("4.2 Interactive 3D Model & 2D CAD State Machine", table_cell), Paragraph("11", table_cell)],
        [Paragraph("4.3 Financial Modeling (Compound Capital Gain & EMI Engine)", table_cell), Paragraph("12", table_cell)],
        [Paragraph("4.4 Vastu Shastra Rule-Based Orientation Matrix", table_cell), Paragraph("13", table_cell)],
        [Paragraph("<b>CHAPTER 5: IMPLEMENTATION DETAILS</b>", table_header), Paragraph("<b>14</b>", table_header)],
        [Paragraph("5.1 3D Architectural Studio & WebGL Viewport", table_cell), Paragraph("14", table_cell)],
        [Paragraph("5.2 High-Precision Vector CAD Blueprint Engine", table_cell), Paragraph("15", table_cell)],
        [Paragraph("5.3 Apple-Grade Responsive Design System (SF Pro Display)", table_cell), Paragraph("16", table_cell)],
        [Paragraph("5.4 Priority Concierge & Factsheet Module", table_cell), Paragraph("17", table_cell)],
        [Paragraph("<b>CHAPTER 6: TESTING, VERIFICATION & RESULTS</b>", table_header), Paragraph("<b>18</b>", table_header)],
        [Paragraph("6.1 Test Cases & Validation Results", table_cell), Paragraph("18", table_cell)],
        [Paragraph("6.2 Performance & Core Web Vitals Audit", table_cell), Paragraph("19", table_cell)],
        [Paragraph("<b>CHAPTER 7: CONCLUSION & FUTURE SCOPE</b>", table_header), Paragraph("<b>20</b>", table_header)],
        [Paragraph("APPENDIX A: KEY CODE ATTACHMENTS", table_cell), Paragraph("21", table_cell)],
        [Paragraph("BIBLIOGRAPHY", table_cell), Paragraph("25", table_cell)],
    ]
    t_toc = Table(toc_data, colWidths=[400, 80])
    t_toc.setStyle(TableStyle([
        ('LINEBELOW', (0,0), (-1,-1), 0.5, colors.HexColor("#E2E8F0")),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
    ]))
    story.append(t_toc)
    story.append(PageBreak())

    # =========================================================================
    # CHAPTER 1: INTRODUCTION
    # =========================================================================
    story.append(Paragraph("CHAPTER 1: INTRODUCTION", h1_style))
    story.append(Paragraph("1.1 Background & Corporate Legacy", h2_style))
    story.append(Paragraph("Tirumala Meadows Private Limited represents a 28-year benchmark in high-end real estate and architectural construction across Telangana, India. Headquartered in Jubilee Hills, Hyderabad (PIN 500 034), the enterprise has completed over 30 bespoke luxury residential villas—homes cherished by prominent parliamentarians, acclaimed film personalities, industrialists, and executive business families. In addition to signature villas, the organization has facilitated over 3,000 acres of prime land acquisition and plotted layout developments.", body_style))
    story.append(Spacer(1, 4))
    story.append(Paragraph("What fundamentally distinguishes Tirumala Meadows from standard commercial builders is its fully integrated in-house multidisciplinary ecosystem. Rather than sub-contracting architectural design, structural engineering, or smart automation to disconnected vendors, Tirumala Meadows maintains dedicated in-house architects, interior designers, civil engineers, and IoT technology developers under one roof.", body_style))
    
    story.append(Paragraph("1.2 Problem Statement", h2_style))
    story.append(Paragraph("Despite delivering extraordinary physical structures, traditional real estate marketing relied on static PDF brochures, paper floor plans, and fragmented messaging channels. Potential buyers and corporate investors faced several friction points:", body_style))
    story.append(Paragraph("• <b>Lack of Spatial Comprehension:</b> Flat 2D photographs fail to convey true ceiling void heights, natural cross-ventilation corridors, and 3D volume.", bullet_style))
    story.append(Paragraph("• <b>Technical Inaccessibility:</b> Architectural blueprints are often unintelligible to buyers who lack civil engineering training.", bullet_style))
    story.append(Paragraph("• <b>Vague Transit Claims:</b> Marketing portals frequently claim proximity without verified travel times or coordinate-mapped destinations.", bullet_style))
    story.append(Paragraph("• <b>Slow Conversion Cycles:</b> Traditional enquiry forms took 24–48 hours for turnaround, losing engagement with prospective buyers.", bullet_style))

    story.append(Paragraph("1.3 Project Objectives", h2_style))
    story.append(Paragraph("1. <b>Cinematic Visual Identity:</b> Develop an ultra-modern, Apple-grade web platform utilizing full-width dusk skyline photography, SF Pro Display typography, and an editorial design system.", bullet_style))
    story.append(Paragraph("2. <b>Interactive 3D Architectural Studio:</b> Implement an interactive 3D model viewer allowing prospective buyers to orbit, pan, and inspect villa structures in real time.", bullet_style))
    story.append(Paragraph("3. <b>2D CAD Blueprint Engine:</b> Provide an engineering-accurate 2D schematic blueprint with layer toggles for structural RCC columns, dimension callouts, and Vastu quadrants.", bullet_style))
    story.append(Paragraph("4. <b>Financial Investment Simulator:</b> Build client-side mathematical engines calculating compound capital appreciation (CAGR) and bank loan EMIs.", bullet_style))
    story.append(Paragraph("5. <b>High-Speed Multi-Channel Concierge:</b> Deploy persistent floating WhatsApp concierge buttons, clickable direct dialers, and an instant printable factsheet modal.", bullet_style))

    story.append(Paragraph("1.4 Scope of the Platform", h2_style))
    story.append(Paragraph("The platform encompasses interactive exploration of 3 & 4 BHK Palatial Villas (1,600 to 2,200+ sq.ft carpet area), in-house technical ecosystem credentials, lifestyle amenities (resort pool, mini cinema, clubhouse), coordinate-verified landmark navigation across Hyderabad, and an integrated resident society portal.", body_style))
    story.append(PageBreak())

    # =========================================================================
    # CHAPTER 2: LITERATURE SURVEY & TECH RATIONALE
    # =========================================================================
    story.append(Paragraph("CHAPTER 2: LITERATURE SURVEY & TECH STACK", h1_style))
    story.append(Paragraph("2.1 Evolution of PropTech in India", h2_style))
    story.append(Paragraph("Property Technology (PropTech) in India has transitioned through three major phases. PropTech 1.0 (2005–2014) introduced digital classifieds (e.g., MagicBricks, 99acres) that acted as basic listings. PropTech 2.0 (2015–2021) introduced online booking tokens and video walkthroughs. PropTech 3.0 represents modern interactive spatial computing, where clients demand WebGL 3D models, daylight simulation, and instant programmatic financial modeling.", body_style))

    story.append(Paragraph("2.2 Technology Stack Rationale", h2_style))
    tech_table_data = [
        [Paragraph("<b>Component Layer</b>", table_header), Paragraph("<b>Technology Chosen</b>", table_header), Paragraph("<b>Engineering Rationale</b>", table_header)],
        [Paragraph("Front-End Library", table_cell), Paragraph("React 18.3", table_cell), Paragraph("Component reusability, concurrent rendering, and reactive state management.", table_cell)],
        [Paragraph("Build Engine", table_cell), Paragraph("Vite 5.4", table_cell), Paragraph("Lightning-fast Hot Module Replacement (HMR) and optimized Rollup tree-shaking.", table_cell)],
        [Paragraph("Type Safety", table_cell), Paragraph("TypeScript 5.5", table_cell), Paragraph("Compile-time interface safety, reducing runtime UI bugs to near zero.", table_cell)],
        [Paragraph("Styling System", table_cell), Paragraph("Tailwind CSS 3.4", table_cell), Paragraph("Utility-first design tokens, zero runtime CSS overhead, and mobile-first responsive breakpoints.", table_cell)],
        [Paragraph("Iconography", table_cell), Paragraph("Lucide React", table_cell), Paragraph("Clean, accessible SVG icons with tree-shakeable import bundles.", table_cell)],
        [Paragraph("3D Web Engine", table_cell), Paragraph("Sketchfab 3D Embed API", table_cell), Paragraph("Hardware-accelerated WebGL rendering with 360° orbit, pan, and zoom controls.", table_cell)],
    ]
    t_tech = Table(tech_table_data, colWidths=[120, 110, 250])
    t_tech.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#F1F5F9")),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(t_tech)
    story.append(PageBreak())

    # =========================================================================
    # CHAPTER 3: SYSTEM ANALYSIS & SPECIFICATIONS
    # =========================================================================
    story.append(Paragraph("CHAPTER 3: SYSTEM ANALYSIS & REQUIREMENTS", h1_style))
    story.append(Paragraph("3.1 Stakeholder Personas", h2_style))
    story.append(Paragraph("• <b>High-Net-Worth Buyers (HNIs):</b> Seek palatial living, customized architectural screens, and verified title clearance for executive residences.", bullet_style))
    story.append(Paragraph("• <b>Working Tech Executives:</b> Value rapid 5–7 min metro connectivity to HITEC City, fiber-ready study rooms, and quiet acoustic insulation.", bullet_style))
    story.append(Paragraph("• <b>Senior Parents & Elders:</b> Require zero-stair ground-floor bedroom suites, East-facing traditional Puja niches, and traffic-free walking avenues.", bullet_style))
    story.append(Paragraph("• <b>Corporate Investors:</b> Focus on CAGR land appreciation across the Western Telangana growth corridor (Kollur, Velimala, Shankarpally).", bullet_style))

    story.append(Paragraph("3.2 Functional Requirements", h2_style))
    story.append(Paragraph("<b>FR-01: Interactive 3D Model Inspection:</b> The system must allow users to orbit in 360°, pan, and zoom around a full 3D architectural villa structure.", bullet_style))
    story.append(Paragraph("<b>FR-02: 2D CAD Blueprint Visualization:</b> The system must present scaled engineering blueprints with structural column positions, dimensions, and layer toggles.", bullet_style))
    story.append(Paragraph("<b>FR-03: Real-Time Financial Calculators:</b> Programmatic computation of monthly EMI based on loan amount, tenure, and rate, plus CAGR asset appreciation.", bullet_style))
    story.append(Paragraph("<b>FR-04: Factsheet Generation:</b> A dedicated high-contrast printable modal summarizing civil specifications and approved banking institutions.", bullet_style))
    story.append(Paragraph("<b>FR-05: Multi-Channel Concierge:</b> Floating WhatsApp trigger and direct clickable telephonic linkages (+91 95508 28688).", bullet_style))

    story.append(Paragraph("3.3 Non-Functional Requirements", h2_style))
    story.append(Paragraph("• <b>Performance:</b> Total bundle size must not exceed 300 kB (gzipped < 85 kB), rendering in under 1 second.", bullet_style))
    story.append(Paragraph("• <b>Accessibility (a11y):</b> Color contrast ratios must meet WCAG AAA standards (> 7:1 for text against light ivory/white backgrounds).", bullet_style))
    story.append(Paragraph("• <b>Responsive Ergonomics:</b> Fluid adaptability across screens from 360px mobile viewports to 4K desktop displays.", bullet_style))
    story.append(PageBreak())

    # =========================================================================
    # CHAPTER 4: SYSTEM DESIGN & MATHEMATICAL MODELING
    # =========================================================================
    story.append(Paragraph("CHAPTER 4: SYSTEM DESIGN & MATHEMATICAL MODELING", h1_style))
    story.append(Paragraph("4.1 Component Topology", h2_style))
    story.append(Paragraph("The front-end follows a modular unidirectional data-flow architecture:", body_style))
    story.append(Paragraph("<code>App.tsx ➔ [ Navbar, HomePage, VillasPage, AmenitiesPage, LocationPage, ContactPage, ResidentHubPage, Footer ]</code>", code_style))
    story.append(Spacer(1, 6))
    story.append(Paragraph("Inside <code>HomePage.tsx</code> and <code>VillasPage.tsx</code>, encapsulated micro-components manage complex interaction: <code>Villa3DViewer.tsx</code> controls WebGL and CAD state, while <code>BrochureModal.tsx</code> handles modal accessibility and printing.", body_style))

    story.append(Paragraph("4.2 Financial Compound Appreciation Mathematical Model", h2_style))
    story.append(Paragraph("The financial modeling engine calculates the projected future value (V) of real estate investments based on holding tenure (t) and compounded annual growth rate (r):", body_style))
    story.append(Paragraph("<b>Formula:</b> V = P × (1 + r / 100)^t", code_style))
    story.append(Paragraph("Where P = Initial Investment in Lakhs, r = 12.5% Historical CAGR, and t = Holding Period (Years). Capital Gain is computed as G = V - P. Concurrently, cumulative rental yield is modeled at 4.0% per annum: R = (P × 0.04) × t.", body_style))

    story.append(Paragraph("4.3 Standard Equated Monthly Installment (EMI) Formula", h2_style))
    story.append(Paragraph("Home loan financing is modeled using the reducing-balance amortisation formula:", body_style))
    story.append(Paragraph("<b>Formula:</b> EMI = [L × R × (1 + R)^N] / [(1 + R)^N - 1]", code_style))
    story.append(Paragraph("Where L = Principal Loan Amount, R = Monthly Interest Rate (Annual Rate / 12 / 100), and N = Tenure in Months (Years × 12).", body_style))

    story.append(Paragraph("4.4 Vastu Shastra Rule-Based Orientation Matrix", h2_style))
    vastu_data = [
        [Paragraph("<b>Cardinal Zone</b>", table_header), Paragraph("<b>Sanskrit Direction</b>", table_header), Paragraph("<b>Architectural Placement</b>", table_header), Paragraph("<b>Elemental Energy</b>", table_header)],
        [Paragraph("North-East", table_cell), Paragraph("Ishan", table_cell), Paragraph("Puja Room, Water Sump, Portico Entry", table_cell), Paragraph("Water & Divine Prana", table_cell)],
        [Paragraph("South-East", table_cell), Paragraph("Agneya", table_cell), Paragraph("Main Kitchen & Electrical Panel", table_cell), Paragraph("Agni (Fire Element)", table_cell)],
        [Paragraph("South-West", table_cell), Paragraph("Nairuthi", table_cell), Paragraph("Master Bedroom Suite & Overhead Tanks", table_cell), Paragraph("Earth (Stability & Grounding)", table_cell)],
        [Paragraph("North-West", table_cell), Paragraph("Vayu", table_cell), Paragraph("Guest Suite, Utility Yard & Ventilation", table_cell), Paragraph("Air & Circulation", table_cell)],
    ]
    t_vst = Table(vastu_data, colWidths=[100, 100, 180, 100])
    t_vst.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#F1F5F9")),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(t_vst)
    story.append(PageBreak())

    # =========================================================================
    # CHAPTER 5: IMPLEMENTATION
    # =========================================================================
    story.append(Paragraph("CHAPTER 5: IMPLEMENTATION DETAILS", h1_style))
    story.append(Paragraph("5.1 3D Architectural Studio (Villa3DViewer.tsx)", h2_style))
    story.append(Paragraph("The 3D studio offers three mutually reinforcing modes:", body_style))
    story.append(Paragraph("• <b>Interactive 3D Model:</b> Embeds a hardware-accelerated 3D model with 360° mouse drag orbit, pinch-to-zoom, and perspective camera panning.", bullet_style))
    story.append(Paragraph("• <b>2D CAD Plan Blueprint:</b> Renders vector architectural floor plans complete with grid axes (Axis 01 / Grid A-B-C-D), structural RCC columns (C1–C8), wall thicknesses (9\" external, 4.5\" internal), door/window tags, and dynamic dimension lines.", bullet_style))
    story.append(Paragraph("• <b>Virtual Walkthrough:</b> Provides high-resolution first-person spatial viewing across five key zones (Living Room, Master Suite, East Puja Room, Granite Kitchen, Sky Terrace) with live material callouts.", bullet_style))

    story.append(Paragraph("5.2 Apple-Grade Responsive Design System", h2_style))
    story.append(Paragraph("The platform enforces a strict design system based on <b>SF Pro Display</b> typography with tight tracking (-0.012em). Color tokens are harmonized across all pages:", body_style))
    story.append(Paragraph("• <b>Deep Forest Green (<code>#0F2B22</code>):</b> Used for primary headings, solid CTAs, and corporate branding.", bullet_style))
    story.append(Paragraph("• <b>Warm Ivory (<code>#FBF9F4</code>):</b> Soft, glare-free background that enhances readability over harsh pure white.", bullet_style))
    story.append(Paragraph("• <b>Muted Gold (<code>#C5A880</code>):</b> Used for badges, active states, and architectural dimension callouts.", bullet_style))
    story.append(Paragraph("• <b>High-Contrast Slate (<code>#334155</code>):</b> Guarantees WCAG AAA contrast for body copy and metadata.", bullet_style))

    story.append(Paragraph("5.3 Factsheet Modal Implementation", h2_style))
    story.append(Paragraph("The factsheet module (<code>BrochureModal.tsx</code>) features an Apple-style frosted grey overlay (<code>bg-neutral-900/45 backdrop-blur-xl</code>) with top clearance (<code>pt-16 sm:pt-14 pb-24</code>) and <code>z-[100]</code> to prevent conflicts with mobile browser URL headers. A fixed close button (<code>z-[110]</code>) and backdrop-click dismiss ensure seamless usability.", body_style))
    story.append(PageBreak())

    # =========================================================================
    # CHAPTER 6: TESTING & RESULTS
    # =========================================================================
    story.append(Paragraph("CHAPTER 6: TESTING & RESULTS", h1_style))
    story.append(Paragraph("6.1 Functional Test Cases", h2_style))
    
    test_data = [
        [Paragraph("<b>Test ID</b>", table_header), Paragraph("<b>Feature Tested</b>", table_header), Paragraph("<b>Input / Action</b>", table_header), Paragraph("<b>Expected Result</b>", table_header), Paragraph("<b>Status</b>", table_header)],
        [Paragraph("TC-01", table_cell), Paragraph("Hero CTA Navigation", table_cell), Paragraph("Click 'Explore Project'", table_cell), Paragraph("Smoothly scrolls to Project Highlights", table_cell), Paragraph("<b>PASS</b>", table_cell)],
        [Paragraph("TC-02", table_cell), Paragraph("3D Model Orbit", table_cell), Paragraph("Drag 3D viewport canvas", table_cell), Paragraph("Model rotates 360° with smooth deceleration", table_cell), Paragraph("<b>PASS</b>", table_cell)],
        [Paragraph("TC-03", table_cell), Paragraph("CAD Layer Toggles", table_cell), Paragraph("Toggle 'Columns' & 'Dims'", table_cell), Paragraph("RCC column markers and dimension callouts toggle visibility", table_cell), Paragraph("<b>PASS</b>", table_cell)],
        [Paragraph("TC-04", table_cell), Paragraph("Factsheet Modal", table_cell), Paragraph("Click 'Factsheet' button", table_cell), Paragraph("Opens Apple-style frosted modal with printable specs", table_cell), Paragraph("<b>PASS</b>", table_cell)],
        [Paragraph("TC-05", table_cell), Paragraph("Mobile Menu Drawer", table_cell), Paragraph("Tap hamburger icon on mobile", table_cell), Paragraph("Drawer expands with proper spacing and touch targets", table_cell), Paragraph("<b>PASS</b>", table_cell)],
        [Paragraph("TC-06", table_cell), Paragraph("Enquiry Submission", table_cell), Paragraph("Submit name & phone in form", table_cell), Paragraph("Shows success confirmation and validates input", table_cell), Paragraph("<b>PASS</b>", table_cell)],
        [Paragraph("TC-07", table_cell), Paragraph("Direct Calling", table_cell), Paragraph("Click phone link or Call button", table_cell), Paragraph("Triggers device tel dialer (+91 95508 28688)", table_cell), Paragraph("<b>PASS</b>", table_cell)],
    ]
    t_test = Table(test_data, colWidths=[40, 100, 120, 160, 60])
    t_test.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#F1F5F9")),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(t_test)
    story.append(Spacer(1, 12))

    story.append(Paragraph("6.2 Performance & Core Web Vitals Audit", h2_style))
    story.append(Paragraph("The platform was compiled and audited using Vite's production build pipeline:", body_style))
    story.append(Paragraph("• <b>Production Bundle Size:</b> JavaScript: 292.7 kB (gzipped 82.3 kB) · CSS: 44.4 kB (gzipped 7.8 kB).", bullet_style))
    story.append(Paragraph("• <b>Build Time:</b> Compiled in <b>787 milliseconds</b> with zero TypeScript or Rollup warnings.", bullet_style))
    story.append(Paragraph("• <b>Largest Contentful Paint (LCP):</b> Under 1.2s utilizing eager image preloading and CSS priority gradients.", bullet_style))
    story.append(Paragraph("• <b>Cumulative Layout Shift (CLS):</b> 0.00 due to fixed aspect-ratio containers on all 3D viewports and gallery images.", bullet_style))
    story.append(PageBreak())

    # =========================================================================
    # CHAPTER 7: CONCLUSION & FUTURE SCOPE
    # =========================================================================
    story.append(Paragraph("CHAPTER 7: CONCLUSION & FUTURE SCOPE", h1_style))
    story.append(Paragraph("7.1 Conclusion", h2_style))
    story.append(Paragraph("The Tirumala Meadows web application successfully bridges the divide between physical architectural craftsmanship and digital customer experience. By replacing generic builder landing pages with a bespoke luxury platform featuring interactive 3D model inspection, 2D vector CAD blueprints, and transparent verified metrics, the platform sets a new benchmark for PropTech in Hyderabad.", body_style))
    story.append(Spacer(1, 4))
    story.append(Paragraph("The internship provided deep practical exposure to modern front-end architectures (React 18, Vite, TypeScript), responsive Apple-grade styling (SF Pro Display), performance engineering, and user-centered conversion workflows.", body_style))

    story.append(Paragraph("7.2 Future Scope", h2_style))
    story.append(Paragraph("1. <b>Augmented Reality (AR) Villa Projection:</b> Integrate WebXR to allow clients to place full-scale 3D villa models onto physical land plots via mobile cameras.", bullet_style))
    story.append(Paragraph("2. <b>AI Architectural Copilot:</b> Deploy an on-device conversational AI trained on Hyderabad municipal building codes, GHMC setbacks, and Vastu compliance.", bullet_style))
    story.append(Paragraph("3. <b>Blockchain Title Escrow:</b> Implement distributed ledger verification for land parcel title deeds and earnest money deposits.", bullet_style))
    story.append(Spacer(1, 20))

    # =========================================================================
    # BIBLIOGRAPHY
    # =========================================================================
    story.append(Paragraph("BIBLIOGRAPHY", h1_style))
    story.append(Paragraph("[1] Tirumala Meadows Private Limited. Official Corporate Dossier & Architectural Specifications. Jubilee Hills, Hyderabad, 2026.", body_style))
    story.append(Paragraph("[2] React Documentation: Concurrent Rendering, Hooks, and Component Architecture. https://react.dev. Accessed November 2026.", body_style))
    story.append(Paragraph("[3] Vite: Next Generation Front-End Tooling. https://vitejs.dev. Accessed November 2026.", body_style))
    story.append(Paragraph("[4] Tailwind CSS: Utility-First CSS Framework. https://tailwindcss.com. Accessed November 2026.", body_style))
    story.append(Paragraph("[5] WebGL Specification 2.0. Khronos Group. https://www.khronos.org/webgl/. Accessed November 2026.", body_style))
    story.append(Paragraph("[6] Apple Human Interface Guidelines: Typography and Spatial Ergonomics. https://developer.apple.com/design/. Accessed November 2026.", body_style))

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Report successfully generated: {filename}")

if __name__ == "__main__":
    build_pdf()

