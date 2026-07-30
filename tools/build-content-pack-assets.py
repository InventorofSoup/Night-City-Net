from __future__ import annotations

import argparse
import textwrap
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFont, ImageOps
from reportlab.lib.colors import Color, HexColor
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas


def prepare_image(source: Path, destination: Path) -> Image.Image:
    image = Image.open(source).convert("RGB")
    image = ImageOps.fit(image, (1440, 960), method=Image.Resampling.LANCZOS)
    destination.parent.mkdir(parents=True, exist_ok=True)
    image.save(destination, "JPEG", quality=84, optimize=True, progressive=True)
    return image


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = [
        Path("C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf"),
        Path("C:/Windows/Fonts/segoeuib.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf"),
    ]
    for candidate in candidates:
        if candidate.exists():
            return ImageFont.truetype(str(candidate), size)
    return ImageFont.load_default()


def build_motion_loop(source: Image.Image, destination: Path) -> None:
    base = ImageOps.fit(source, (960, 640), method=Image.Resampling.LANCZOS)
    frames: list[Image.Image] = []
    for index in range(32):
        zoom = 1 + index * 0.0008
        enlarged = base.resize((round(960 * zoom), round(640 * zoom)), Image.Resampling.LANCZOS)
        left = min(enlarged.width - 960, round(index * 0.45))
        top = min(enlarged.height - 640, round(index * 0.18))
        frame = enlarged.crop((left, top, left + 960, top + 640))
        frame = ImageEnhance.Contrast(frame).enhance(1.05)

        if index in (11, 12, 25):
            band_y = 170 + (index % 3) * 80
            band = frame.crop((0, band_y, 960, band_y + 34))
            shifted = Image.new("RGB", (960, 34), "#111111")
            shifted.paste(band.crop((22, 0, 960, 34)), (0, 0))
            shifted.paste(band.crop((0, 0, 22, 34)), (938, 0))
            frame.paste(shifted, (0, band_y))

        overlay = Image.new("RGBA", frame.size, (0, 0, 0, 0))
        draw = ImageDraw.Draw(overlay)
        for y in range(0, 640, 5):
            draw.line((0, y, 960, y), fill=(0, 0, 0, 26), width=1)
        draw.rectangle((18, 16, 390, 54), fill=(0, 0, 0, 155))
        draw.text((30, 24), "CAM 04 // SOUTH LOOP // PUBLIC FEED", font=font(18, True), fill=(235, 245, 238, 255))
        draw.rectangle((718, 575, 942, 621), fill=(0, 0, 0, 165))
        seconds = 11 + index // 8
        draw.text((735, 586), f"23:14:{seconds:02d}  07.29.45", font=font(18, True), fill=(255, 214, 92, 255))
        if index % 16 < 8:
            draw.ellipse((24, 586, 38, 600), fill=(235, 52, 62, 255))
            draw.text((47, 579), "FIELD ARCHIVE", font=font(18, True), fill=(245, 245, 240, 255))
        frame = Image.alpha_composite(frame.convert("RGBA"), overlay).convert("RGB")
        frames.append(frame)

    destination.parent.mkdir(parents=True, exist_ok=True)
    frames[0].save(
        destination,
        "WEBP",
        save_all=True,
        append_images=frames[1:],
        duration=125,
        loop=0,
        quality=72,
        method=6,
    )


def wrapped_lines(text: str, width: int) -> list[str]:
    return textwrap.wrap(text, width=width, break_long_words=False, break_on_hyphens=False)


def draw_paragraph(pdf: canvas.Canvas, text: str, x: float, y: float, width: int = 86, leading: int = 14) -> float:
    pdf.setFont("Helvetica", 9.4)
    pdf.setFillColor(HexColor("#263038"))
    for line in wrapped_lines(text, width):
        pdf.drawString(x, y, line)
        y -= leading
    return y


def draw_bullets(pdf: canvas.Canvas, bullets: list[str], x: float, y: float) -> float:
    for item in bullets:
        lines = wrapped_lines(item, 77)
        pdf.setFillColor(HexColor("#172027"))
        pdf.setFont("Helvetica-Bold", 9.4)
        pdf.drawString(x, y, "-")
        pdf.setFont("Helvetica", 9.4)
        for offset, line in enumerate(lines):
            pdf.drawString(x + 13, y - offset * 13, line)
        y -= max(22, len(lines) * 13 + 7)
    return y


def draw_text(
    pdf: canvas.Canvas,
    text: str,
    x: float,
    y: float,
    width: int,
    font_name: str = "Helvetica",
    size: float = 9.2,
    leading: float = 13,
    color: str = "#172027",
) -> float:
    pdf.setFillColor(HexColor(color))
    pdf.setFont(font_name, size)
    for line in wrapped_lines(text, width):
        pdf.drawString(x, y, line)
        y -= leading
    return y


def draw_checklist(
    pdf: canvas.Canvas,
    bullets: list[str],
    x: float,
    y: float,
    width: int,
    text_color: str,
    marker_color: str,
    box: bool = False,
) -> float:
    for item in bullets:
        lines = wrapped_lines(item, width)
        pdf.setStrokeColor(HexColor(marker_color))
        pdf.setFillColor(HexColor(marker_color))
        if box:
            pdf.rect(x, y - 8, 9, 9, fill=0, stroke=1)
        else:
            pdf.circle(x + 4, y - 3, 2.2, fill=1, stroke=0)
        pdf.setFillColor(HexColor(text_color))
        pdf.setFont("Helvetica", 8.8)
        for offset, line in enumerate(lines):
            pdf.drawString(x + 18, y - offset * 12, line)
        y -= max(24, len(lines) * 12 + 9)
    return y


def build_civic_pdf(pdf: canvas.Canvas, spec: dict[str, object]) -> None:
    blue, pale, ink = "#173a59", "#edf1f2", "#23323b"
    pdf.setFillColor(HexColor(pale))
    pdf.rect(0, 0, 612, 792, fill=1, stroke=0)
    pdf.setFillColor(HexColor(blue))
    pdf.rect(0, 696, 612, 96, fill=1, stroke=0)
    pdf.setStrokeColor(HexColor("#ffffff"))
    pdf.setLineWidth(2)
    pdf.circle(62, 744, 28, fill=0, stroke=1)
    pdf.setFillColor(HexColor("#ffffff"))
    pdf.setFont("Times-Bold", 16)
    pdf.drawCentredString(62, 738, "NC")
    pdf.setFont("Helvetica-Bold", 8)
    pdf.drawString(106, 760, "NIGHT CITY CIVICNET // MUNICIPAL RECORD")
    pdf.setFont("Times-Bold", 23)
    pdf.drawString(106, 730, str(spec["title"]))
    pdf.setFont("Helvetica", 9)
    pdf.drawString(106, 712, str(spec["subtitle"]))
    pdf.setFillColor(HexColor("#ffffff"))
    pdf.rect(42, 636, 528, 42, fill=1, stroke=0)
    pdf.setFillColor(HexColor(ink))
    pdf.setFont("Helvetica-Bold", 7)
    for x, label, value in [(54, "RECORD", str(spec["code"])), (208, "STATUS", "ACTIVE"), (340, "ACCESS", "PUBLIC"), (460, "REVISION", "07.30.45")]:
        pdf.drawString(x, 661, label)
        pdf.setFont("Helvetica", 9)
        pdf.drawString(x, 646, value)
        pdf.setFont("Helvetica-Bold", 7)
    draw_text(pdf, str(spec["intro"]), 48, 610, 95, size=10, leading=15, color=ink)
    pdf.setFillColor(HexColor("#ffffff"))
    pdf.roundRect(42, 374, 528, 176, 3, fill=1, stroke=0)
    pdf.setFillColor(HexColor(blue))
    pdf.setFont("Helvetica-Bold", 8)
    pdf.drawString(58, 527, "PUBLISHED EVENT LOG")
    pdf.setStrokeColor(HexColor("#9eafb8"))
    pdf.line(111, 402, 111, 510)
    for index, event in enumerate(spec["timeline"]):  # type: ignore[index]
        y = 503 - index * 31
        pdf.setFillColor(HexColor(blue))
        pdf.circle(111, y + 2, 4, fill=1, stroke=0)
        pdf.setFont("Helvetica-Bold", 8)
        pdf.drawRightString(96, y, str(event["time"]))
        pdf.setFillColor(HexColor(ink))
        pdf.setFont("Helvetica", 8.8)
        pdf.drawString(128, y, str(event["event"]))
    pdf.setFillColor(HexColor("#d8e3e8"))
    pdf.rect(42, 327, 528, 31, fill=1, stroke=0)
    pdf.setFillColor(HexColor(blue))
    pdf.setFont("Helvetica-Bold", 8)
    pdf.drawString(58, 339, "CURRENT PUBLIC DIRECTION")
    draw_checklist(pdf, list(spec["instructions"]), 58, 300, 85, ink, blue, box=True)  # type: ignore[arg-type]
    pdf.setFillColor(HexColor("#dbe2e4"))
    pdf.rect(0, 0, 612, 54, fill=1, stroke=0)
    draw_text(pdf, str(spec["footer"]), 44, 35, 104, size=7.5, leading=10, color=ink)


def build_danger_gal_pdf(pdf: canvas.Canvas, spec: dict[str, object]) -> None:
    red, ink, grey = "#c8202f", "#171717", "#efefec"
    pdf.setFillColor(HexColor("#faf9f6"))
    pdf.rect(0, 0, 612, 792, fill=1, stroke=0)
    pdf.setFillColor(HexColor(red))
    pdf.rect(0, 0, 28, 792, fill=1, stroke=0)
    pdf.setFillColor(HexColor(ink))
    pdf.rect(28, 658, 584, 134, fill=1, stroke=0)
    pdf.setFillColor(HexColor("#ffffff"))
    pdf.setFont("Helvetica-Bold", 8)
    pdf.drawString(54, 760, "DANGER GAL // SANITIZED PUBLIC RELEASE")
    pdf.drawRightString(570, 760, str(spec["code"]))
    pdf.setFont("Helvetica-Bold", 25)
    pdf.drawString(54, 716, str(spec["title"]))
    pdf.setFont("Helvetica", 10)
    pdf.drawString(54, 692, str(spec["subtitle"]))
    pdf.saveState()
    pdf.translate(586, 670)
    pdf.rotate(90)
    pdf.setFillColor(HexColor(red))
    pdf.setFont("Helvetica-Bold", 10.5)
    pdf.drawString(0, 0, "PUBLIC // WITHHELD")
    pdf.restoreState()
    pdf.setFillColor(HexColor(grey))
    pdf.roundRect(54, 571, 504, 62, 3, fill=1, stroke=0)
    pdf.setFillColor(HexColor(red))
    pdf.setFont("Helvetica-Bold", 8)
    pdf.drawString(68, 614, "ANALYST SUMMARY")
    draw_text(pdf, str(spec["intro"]), 68, 596, 91, size=9.2, leading=13, color=ink)
    pdf.setFillColor(HexColor(red))
    pdf.setFont("Helvetica-Bold", 8)
    pdf.drawString(54, 542, "VERIFICATION PATH // DO NOT SKIP STEPS")
    for index, step in enumerate(spec["steps"]):  # type: ignore[index]
        y = 502 - index * 63
        pdf.setStrokeColor(HexColor(red))
        pdf.setLineWidth(2)
        if index < len(spec["steps"]) - 1:  # type: ignore[arg-type]
            pdf.line(77, y - 34, 77, y - 58)
        pdf.setFillColor(HexColor(red if index < 3 else ink))
        pdf.circle(77, y, 18, fill=1, stroke=0)
        pdf.setFillColor(HexColor("#ffffff"))
        pdf.setFont("Helvetica-Bold", 11)
        pdf.drawCentredString(77, y - 4, str(index + 1))
        pdf.setFillColor(HexColor(ink))
        pdf.setFont("Helvetica-Bold", 11)
        pdf.drawString(110, y + 3, str(step["prompt"]))
        draw_text(pdf, str(step["action"]), 110, y - 13, 74, size=8.2, leading=10, color="#4a4a48")
    pdf.setFillColor(HexColor(grey))
    pdf.roundRect(355, 276, 203, 252, 3, fill=1, stroke=0)
    pdf.setFillColor(HexColor(red))
    pdf.setFont("Helvetica-Bold", 8)
    pdf.drawString(371, 505, "IF THE VISITOR LEAVES")
    draw_text(pdf, str(spec["departure_note"]), 371, 485, 31, size=8.3, leading=11, color=ink)
    pdf.setFont("Helvetica-Bold", 8)
    pdf.setFillColor(HexColor(red))
    pdf.drawString(371, 414, "PRESERVE")
    draw_checklist(pdf, list(spec["preserve"]), 371, 394, 25, ink, red)  # type: ignore[arg-type]
    pdf.setFillColor(HexColor(ink))
    pdf.rect(371, 303, 160, 8, fill=1, stroke=0)
    pdf.rect(403, 288, 128, 5, fill=1, stroke=0)
    pdf.setFillColor(HexColor(ink))
    pdf.rect(54, 42, 504, 47, fill=1, stroke=0)
    pdf.setFillColor(HexColor("#ffffff"))
    pdf.setFont("Helvetica-Bold", 7.5)
    pdf.drawString(68, 71, "DISCLOSURE LIMIT")
    draw_text(pdf, str(spec["footer"]), 68, 57, 90, size=7.2, leading=9, color="#ffffff")


def build_rook_pdf(pdf: canvas.Canvas, spec: dict[str, object]) -> None:
    dark, panel, orange = "#0d0f10", "#1c2124", "#e89518"
    pdf.setFillColor(HexColor(dark))
    pdf.rect(0, 0, 612, 792, fill=1, stroke=0)
    for x in range(-30, 650, 34):
        pdf.setFillColor(HexColor(orange if (x // 34) % 2 == 0 else dark))
        pdf.saveState()
        pdf.translate(x, 760)
        pdf.rotate(45)
        pdf.rect(0, 0, 18, 62, fill=1, stroke=0)
        pdf.restoreState()
    pdf.setFillColor(HexColor(orange))
    pdf.setFont("Helvetica-Bold", 8)
    pdf.drawString(42, 730, "ROOK'S BOARD // STREET FILE 09")
    pdf.setFont("Helvetica-Bold", 31)
    pdf.drawString(42, 685, str(spec["title"]).upper())
    pdf.setFillColor(HexColor("#f4eee1"))
    pdf.setFont("Helvetica", 11)
    pdf.drawString(42, 660, str(spec["subtitle"]))
    pdf.setFillColor(HexColor(panel))
    pdf.roundRect(42, 566, 528, 64, 4, fill=1, stroke=0)
    draw_text(pdf, str(spec["intro"]), 58, 606, 86, font_name="Helvetica-Bold", size=9.5, leading=14, color="#f4eee1")
    pdf.setFillColor(HexColor(orange))
    pdf.setFont("Helvetica-Bold", 9)
    pdf.drawString(42, 548, "SIX QUESTIONS BEFORE YOU ACCEPT")
    for index, question in enumerate(spec["questions"]):  # type: ignore[index]
        col, row = index % 2, index // 2
        x = 42 + col * 266
        y = 450 - row * 100
        pdf.setFillColor(HexColor(panel))
        pdf.roundRect(x, y, 250, 82, 4, fill=1, stroke=0)
        pdf.setFillColor(HexColor(orange))
        pdf.rect(x, y, 42, 82, fill=1, stroke=0)
        pdf.setFillColor(HexColor(dark))
        pdf.setFont("Helvetica-Bold", 18)
        pdf.drawCentredString(x + 21, y + 48, f"0{index + 1}")
        pdf.setFillColor(HexColor("#f4eee1"))
        pdf.setFont("Helvetica-Bold", 10)
        pdf.drawString(x + 55, y + 55, str(question["label"]).upper())
        draw_text(pdf, str(question["prompt"]), x + 55, y + 36, 29, size=8.2, leading=10, color="#cbd0d1")
    pdf.setFillColor(HexColor("#351719"))
    pdf.setStrokeColor(HexColor(orange))
    pdf.rect(42, 132, 528, 80, fill=1, stroke=1)
    pdf.setFillColor(HexColor(orange))
    pdf.setFont("Helvetica-Bold", 10)
    pdf.drawString(58, 190, "WALK-AWAY CONDITION")
    draw_text(pdf, str(spec["walk_away"]), 58, 170, 84, size=8.8, leading=12, color="#f4eee1")
    pdf.setStrokeColor(HexColor(orange))
    pdf.setDash(4, 4)
    pdf.line(42, 118, 570, 118)
    pdf.setDash()
    pdf.setFillColor(HexColor(orange))
    pdf.rect(42, 42, 528, 58, fill=1, stroke=0)
    pdf.setFillColor(HexColor(dark))
    pdf.setFont("Helvetica-Bold", 12)
    pdf.drawCentredString(306, 75, "VERIFY FIRST // BRAG LATER")
    pdf.setFont("Helvetica", 7)
    pdf.drawCentredString(306, 58, str(spec["footer"]))


def build_trauma_pdf(pdf: canvas.Canvas, spec: dict[str, object]) -> None:
    red, ink, pale = "#db272c", "#14201b", "#f0f5f2"
    pdf.setFillColor(HexColor("#ffffff"))
    pdf.rect(0, 0, 612, 792, fill=1, stroke=0)
    pdf.setFillColor(HexColor(red))
    pdf.rect(0, 0, 16, 792, fill=1, stroke=0)
    pdf.setFillColor(HexColor(ink))
    pdf.setFont("Helvetica-Bold", 12)
    pdf.drawString(44, 754, "|||  TRAUMA")
    pdf.setFillColor(HexColor(red))
    pdf.drawString(131, 754, "TEAM")
    pdf.setFillColor(HexColor(ink))
    pdf.setFont("Helvetica", 7)
    pdf.drawRightString(566, 754, "NIGHT CITY REGIONAL DIVISION // MEMBER OPERATIONS")
    pdf.setFont("Helvetica-Bold", 28)
    pdf.drawString(44, 704, str(spec["title"]))
    pdf.setFont("Helvetica", 11)
    pdf.drawString(44, 681, str(spec["subtitle"]))
    pdf.setFillColor(HexColor(red))
    pdf.roundRect(44, 610, 524, 42, 3, fill=1, stroke=0)
    pdf.setFillColor(HexColor("#ffffff"))
    pdf.setFont("Helvetica-Bold", 9)
    pdf.drawString(60, 626, "MEMBER REVIEW WINDOW // OPEN")
    pdf.drawRightString(552, 626, str(spec["code"]))
    draw_text(pdf, str(spec["intro"]), 44, 580, 94, size=10, leading=15, color=ink)
    pdf.setFillColor(HexColor(pale))
    pdf.roundRect(44, 316, 524, 215, 5, fill=1, stroke=0)
    phases = list(spec["phases"])  # type: ignore[arg-type]
    for index, phase in enumerate(phases):
        x = 60 + index * 169
        pdf.setFillColor(HexColor(red))
        pdf.circle(x + 15, 493, 15, fill=1, stroke=0)
        pdf.setFillColor(HexColor("#ffffff"))
        pdf.setFont("Helvetica-Bold", 10)
        pdf.drawCentredString(x + 15, 489, str(index + 1))
        pdf.setFillColor(HexColor(ink))
        pdf.setFont("Helvetica-Bold", 12)
        pdf.drawString(x, 460, str(phase["heading"]))
        draw_checklist(pdf, list(phase["items"]), x, 434, 21, ink, red, box=True)
        if index < 2:
            pdf.setStrokeColor(HexColor("#bdc8c2"))
            pdf.line(x + 155, 337, x + 155, 505)
    pdf.setFillColor(HexColor(ink))
    pdf.roundRect(44, 196, 328, 90, 4, fill=1, stroke=0)
    pdf.setFillColor(HexColor("#ffffff"))
    pdf.setFont("Helvetica-Bold", 9)
    pdf.drawString(60, 260, "PROTECTED ACCESS FIELD")
    draw_text(pdf, str(spec["protected"]), 60, 240, 50, size=8.5, leading=11, color="#dbe5df")
    pdf.setFillColor(HexColor("#fff1f1"))
    pdf.setStrokeColor(HexColor(red))
    pdf.roundRect(390, 196, 178, 90, 4, fill=1, stroke=1)
    pdf.setFillColor(HexColor(red))
    pdf.setFont("Helvetica-Bold", 9)
    pdf.drawString(406, 260, "NEVER STORE")
    draw_text(pdf, str(spec["never_store"]), 406, 240, 24, size=8.4, leading=11, color=ink)
    pdf.setStrokeColor(HexColor(red))
    pdf.setLineWidth(2)
    points = [(44, 99), (88, 99), (98, 115), (108, 83), (118, 99), (172, 99), (182, 109), (192, 89), (202, 99), (568, 99)]
    path = pdf.beginPath()
    path.moveTo(*points[0])
    for point in points[1:]:
        path.lineTo(*point)
    pdf.drawPath(path, fill=0, stroke=1)
    draw_text(pdf, str(spec["footer"]), 44, 72, 103, size=7.5, leading=10, color=ink)


def build_militech_pdf(pdf: canvas.Canvas, spec: dict[str, object]) -> None:
    dark, olive, gold, text = "#0e1410", "#1e2920", "#bda55e", "#ecebe2"
    pdf.setFillColor(HexColor(dark))
    pdf.rect(0, 0, 612, 792, fill=1, stroke=0)
    pdf.setStrokeColor(HexColor("#2c392f"))
    for x in range(36, 612, 72):
        pdf.line(x, 0, x, 792)
    for y in range(0, 792, 72):
        pdf.line(0, y, 612, y)
    pdf.setFillColor(HexColor(gold))
    pdf.rect(0, 772, 612, 20, fill=1, stroke=0)
    pdf.setFillColor(HexColor(text))
    pdf.setFont("Helvetica-Bold", 8)
    pdf.drawString(42, 744, "MILITECH SECURITY SOLUTIONS")
    pdf.drawRightString(570, 744, str(spec["code"]))
    pdf.setFont("Times-Bold", 30)
    pdf.drawString(42, 692, str(spec["title"]))
    pdf.setFillColor(HexColor(gold))
    pdf.setFont("Helvetica-Bold", 10)
    pdf.drawString(42, 668, str(spec["subtitle"]).upper())
    pdf.setFillColor(HexColor(olive))
    pdf.rect(42, 568, 528, 70, fill=1, stroke=0)
    pdf.setFillColor(HexColor(gold))
    pdf.setFont("Helvetica-Bold", 8)
    pdf.drawString(58, 617, "EXECUTIVE SUMMARY")
    draw_text(pdf, str(spec["intro"]), 58, 598, 87, size=9.2, leading=13, color=text)
    pdf.setFillColor(HexColor(gold))
    pdf.setFont("Helvetica-Bold", 8)
    pdf.drawString(42, 538, "CONTROL MATRIX // PUBLIC BASELINE")
    columns = [42, 166, 300, 570]
    headers = ["FAILURE VECTOR", "VISIBLE INDICATOR", "MINIMUM CONTROL"]
    pdf.setFillColor(HexColor(gold))
    pdf.rect(42, 498, 528, 28, fill=1, stroke=0)
    pdf.setFillColor(HexColor(dark))
    pdf.setFont("Helvetica-Bold", 7)
    for index, label in enumerate(headers):
        pdf.drawString(columns[index] + 9, 509, label)
    for row_index, row in enumerate(spec["matrix"]):  # type: ignore[index]
        y_top = 498 - row_index * 73
        pdf.setFillColor(HexColor(olive if row_index % 2 == 0 else "#151d17"))
        pdf.rect(42, y_top - 73, 528, 73, fill=1, stroke=0)
        pdf.setStrokeColor(HexColor("#435043"))
        pdf.line(166, y_top - 73, 166, y_top)
        pdf.line(300, y_top - 73, 300, y_top)
        pdf.setFillColor(HexColor(gold))
        pdf.setFont("Times-Bold", 11)
        pdf.drawString(51, y_top - 24, str(row["vector"]))
        draw_text(pdf, str(row["indicator"]), 175, y_top - 22, 19, size=7.8, leading=10, color=text)
        draw_text(pdf, str(row["control"]), 309, y_top - 22, 40, size=7.8, leading=10, color=text)
    pdf.setStrokeColor(HexColor(gold))
    pdf.rect(42, 152, 528, 46, fill=0, stroke=1)
    pdf.setFillColor(HexColor(gold))
    pdf.setFont("Helvetica-Bold", 8)
    pdf.drawString(56, 180, "DECISION AUTHORITY")
    draw_text(pdf, str(spec["authority"]), 170, 180, 61, size=8.1, leading=10, color=text)
    pdf.setFillColor(HexColor(gold))
    pdf.setFont("Helvetica-Bold", 7.5)
    pdf.drawString(42, 72, "PUBLIC DISTRIBUTION // NO CLIENT OPERATIONS DISCLOSED")
    draw_text(pdf, str(spec["footer"]), 42, 55, 100, size=7.2, leading=9, color="#aeb5ae")


def build_market_pdf(pdf: canvas.Canvas, spec: dict[str, object]) -> None:
    paper, brown, orange, ink = "#efe1bd", "#674421", "#b96724", "#332718"
    pdf.setFillColor(HexColor(paper))
    pdf.rect(0, 0, 612, 792, fill=1, stroke=0)
    pdf.setStrokeColor(HexColor("#c7ad78"))
    pdf.setDash(3, 4)
    pdf.line(204, 38, 204, 754)
    pdf.line(408, 38, 408, 754)
    pdf.setDash()
    pdf.setFillColor(HexColor(brown))
    pdf.rect(28, 686, 556, 70, fill=1, stroke=0)
    pdf.setFillColor(HexColor("#fff4d6"))
    pdf.setFont("Helvetica-Bold", 8)
    pdf.drawString(44, 734, "TEMPORARY COMMERCE DESK // POCKET CARD")
    pdf.setFont("Helvetica-Bold", 23)
    pdf.drawString(44, 704, str(spec["title"]))
    pdf.setFillColor(HexColor(orange))
    pdf.roundRect(442, 710, 120, 28, 4, fill=1, stroke=0)
    pdf.setFillColor(HexColor("#ffffff"))
    pdf.setFont("Helvetica-Bold", 8)
    pdf.drawCentredString(502, 721, "NOT A PERMIT")
    draw_text(pdf, str(spec["intro"]), 44, 656, 99, font_name="Helvetica-Bold", size=9.5, leading=14, color=ink)
    phases = list(spec["phases"])  # type: ignore[arg-type]
    columns = [(44, phases[0]), (224, phases[1]), (424, phases[2])]
    for index, (x, phase) in enumerate(columns):
        pdf.setFillColor(HexColor(orange if index == 1 else brown))
        pdf.setFont("Helvetica-Bold", 11)
        pdf.drawString(x, 576, f"{index + 1} // {str(phase['heading']).upper()}")
        draw_checklist(pdf, list(phase["items"]), x, 548, 22, ink, brown, box=True)
    pdf.setFillColor(HexColor("#fff4d6"))
    pdf.roundRect(44, 242, 524, 148, 8, fill=1, stroke=0)
    pdf.setFillColor(HexColor(brown))
    pdf.setFont("Helvetica-Bold", 10)
    pdf.drawString(60, 365, "ORGANIZER HANDOFF")
    fields = ["SITE AUTHORITY", "STOP-OPERATIONS LEAD", "FIRST-AID POINT", "CLEANUP LEAD"]
    for index, label in enumerate(fields):
        x = 60 + (index % 2) * 252
        y = 329 - (index // 2) * 52
        pdf.setFont("Helvetica", 7)
        pdf.drawString(x, y + 12, label)
        pdf.setStrokeColor(HexColor(brown))
        pdf.line(x, y, x + 210, y)
    pdf.setFillColor(HexColor(brown))
    pdf.rect(28, 54, 556, 66, fill=1, stroke=0)
    draw_text(pdf, str(spec["footer"]), 44, 94, 99, size=7.6, leading=10, color="#fff4d6")
    pdf.setFillColor(HexColor(orange))
    pdf.setFont("Helvetica-Bold", 8)
    pdf.drawRightString(566, 66, str(spec["code"]))


def build_elflines_pdf(pdf: canvas.Canvas, spec: dict[str, object]) -> None:
    parchment, green, dark_green, brown = "#f3e8c9", "#3f7d4a", "#213c26", "#5f4b2f"
    pdf.setFillColor(HexColor(parchment))
    pdf.rect(0, 0, 612, 792, fill=1, stroke=0)
    pdf.setStrokeColor(HexColor(brown))
    pdf.setLineWidth(4)
    pdf.rect(22, 22, 568, 748, fill=0, stroke=1)
    pdf.setLineWidth(1)
    pdf.rect(29, 29, 554, 734, fill=0, stroke=1)
    pdf.setFillColor(HexColor(dark_green))
    pdf.rect(30, 652, 552, 108, fill=1, stroke=0)
    pdf.setFillColor(HexColor("#f8efd3"))
    pdf.setFont("Times-Bold", 9)
    pdf.drawString(48, 734, "ELFLINES ONLINE // COMMUNITY FORUM")
    pdf.setFont("Times-Bold", 27)
    pdf.drawString(48, 694, str(spec["title"]))
    pdf.setFont("Times-Italic", 11)
    pdf.drawString(48, 672, str(spec["subtitle"]))
    pdf.setFillColor(HexColor("#d8c184"))
    pdf.roundRect(462, 714, 98, 26, 5, fill=1, stroke=0)
    pdf.setFillColor(HexColor(dark_green))
    pdf.setFont("Helvetica-Bold", 8)
    pdf.drawCentredString(511, 724, "PINNED THREAD")
    draw_text(pdf, str(spec["intro"]), 48, 624, 92, font_name="Times-Roman", size=10, leading=15, color=brown)
    post = spec["original_post"]  # type: ignore[assignment]
    pdf.setFillColor(HexColor("#fff8e5"))
    pdf.roundRect(46, 410, 520, 165, 6, fill=1, stroke=0)
    pdf.setFillColor(HexColor(green))
    pdf.roundRect(58, 505, 62, 42, 6, fill=1, stroke=0)
    pdf.setFillColor(HexColor("#ffffff"))
    pdf.setFont("Times-Bold", 12)
    pdf.drawCentredString(89, 522, "MB")
    pdf.setFillColor(HexColor(dark_green))
    pdf.setFont("Times-Bold", 14)
    pdf.drawString(138, 535, str(post["heading"]))  # type: ignore[index]
    pdf.setFont("Times-Italic", 8)
    pdf.drawString(138, 520, "MossyBoots // original poster")
    draw_text(pdf, str(post["body"]), 138, 495, 62, font_name="Times-Roman", size=9, leading=13, color=brown)  # type: ignore[index]
    pdf.setFillColor(HexColor(dark_green))
    pdf.setFont("Helvetica-Bold", 8)
    pdf.drawString(138, 430, str(post["tag"]))  # type: ignore[index]
    for index, reply in enumerate(spec["replies"]):  # type: ignore[index]
        y = 378 - index * 88
        pdf.setFillColor(HexColor("#fff8e5" if index % 2 == 0 else "#e8dfc4"))
        pdf.roundRect(70, y - 70, 496, 64, 5, fill=1, stroke=0)
        pdf.setFillColor(HexColor(dark_green))
        pdf.setFont("Times-Bold", 9)
        pdf.drawString(84, y - 24, str(reply["user"]))
        pdf.setFillColor(HexColor(brown))
        draw_text(pdf, str(reply["body"]), 180, y - 22, 53, font_name="Times-Roman", size=8.2, leading=11, color=brown)
    pdf.setFillColor(HexColor(dark_green))
    pdf.rect(30, 34, 552, 54, fill=1, stroke=0)
    draw_text(pdf, str(spec["footer"]), 48, 68, 98, font_name="Times-Roman", size=7.8, leading=10, color="#f8efd3")


def build_pdf(destination: Path, spec: dict[str, object]) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    pdf = canvas.Canvas(str(destination), pagesize=letter, pageCompression=1)
    builders = {
        "nc-civicnet-utility-advisory.pdf": build_civic_pdf,
        "danger-gal-credential-checklist.pdf": build_danger_gal_pdf,
        "rook-contract-safety-card.pdf": build_rook_pdf,
        "trauma-team-response-notice.pdf": build_trauma_pdf,
        "militech-access-control-brief.pdf": build_militech_pdf,
        "night-market-vendor-card.pdf": build_market_pdf,
        "elflines-community-meetup-card.pdf": build_elflines_pdf,
    }
    builders[str(spec["filename"])](pdf, spec)
    pdf.save()


PDF_SPECS = [
    {
        "filename": "nc-civicnet-utility-advisory.pdf",
        "organization": "Night City CivicNet",
        "code": "45-0730-UC",
        "title": "Utility Corridor Advisory",
        "subtitle": "South Loop temporary pedestrian diversion",
        "label": "Current public notice",
        "accent": "#175c7a",
        "intro": "A pressure-control component beneath the east sidewalk has been isolated after visible vapor and intermittent signal disruption. No evacuation order is active.",
        "timeline": [
            {"time": "22:51", "event": "First public report of visible vapor received."},
            {"time": "23:06", "event": "Intermittent local signal disruption confirmed."},
            {"time": "23:33", "event": "Pressure-control component isolated by repair crew."},
            {"time": "23:47", "event": "Air reading returned to published neighborhood baseline."},
        ],
        "instructions": [
            "Use the marked west-side crossing and remain outside contractor barriers.",
            "Report persistent odor, vapor outside the marked area, or medical symptoms.",
            "Water, power, and transit remain available under temporary controls.",
        ],
        "footer": "Publication does not guarantee continuing accuracy, contractor availability, or district enforcement. Superseded notices may contain an incorrect neighboring district code.",
    },
    {
        "filename": "danger-gal-credential-checklist.pdf",
        "organization": "Danger Gal",
        "code": "DG-45-0730",
        "title": "Visitor Verification Checklist",
        "subtitle": "Residential contractor and auditor impersonation",
        "label": "Public safety release",
        "accent": "#c8202f",
        "intro": "A uniform, badge, scanner, or accurate description of a local service problem does not independently establish a visitor's identity or authority.",
        "steps": [
            {"prompt": "Keep the barrier closed", "action": "Request a name, organization, and work-order number."},
            {"prompt": "Find an independent contact", "action": "Use a trusted public record, not information supplied at the door."},
            {"prompt": "Confirm both records", "action": "A known dispatcher must verify the visitor and exact service order."},
            {"prompt": "Refuse unconfirmed access", "action": "Do not surrender credentials, tokens, fobs, or resident information."},
            {"prompt": "Record the outcome", "action": "Preserve original footage and the claimed details offline."},
        ],
        "departure_note": "Leaving after verification is requested does not prove criminal intent. It does end the immediate access request.",
        "preserve": ["Arrival time and clothing", "Vehicle and claimed organization", "Unmodified hallway footage"],
        "footer": "This checklist is general public guidance. It does not establish representation, prove criminal intent, or guarantee an individual response.",
    },
    {
        "filename": "rook-contract-safety-card.pdf",
        "organization": "Rent-A-Samurai // Rook's Board",
        "code": "BOARD FILE 09",
        "title": "Safe Contracting Card",
        "subtitle": "Questions to answer before the meetup",
        "label": "Independent board guidance",
        "accent": "#d8891e",
        "intro": "A public brief is an invitation to verify the work. It is not proof that the client, objective, payment, or stated danger is real.",
        "questions": [
            {"label": "Client", "prompt": "Can the client be confirmed through an independent channel?"},
            {"label": "Objective", "prompt": "What exact condition completes the work?"},
            {"label": "Site", "prompt": "Who controls it, and who may oppose entry?"},
            {"label": "Pay", "prompt": "Are total, shares, expenses, and escrow recorded?"},
            {"label": "Support", "prompt": "Who owns transport, medical, and communications?"},
            {"label": "Exit", "prompt": "What discovery ends the contract immediately?"},
        ],
        "walk_away": "Undisclosed corporate interest, civilian harm, a material change in danger, or a client who will not define completion.",
        "footer": "Board screening catches known patterns; it does not certify legality, solvency, accuracy, or survival.",
    },
    {
        "filename": "trauma-team-response-notice.pdf",
        "organization": "Trauma Team International",
        "code": "NC-RD-0730",
        "title": "Member Readiness Review",
        "subtitle": "Quarterly identity, medical, and access check",
        "label": "Night City regional division",
        "accent": "#db272c",
        "intro": "Five minutes spent reviewing member information can prevent avoidable verification and access delays during a future response.",
        "phases": [
            {"heading": "Identity", "items": ["Primary address", "Emergency contacts", "Employer sponsor"]},
            {"heading": "Medical", "items": ["Implanted devices", "Major allergies", "Receiving facility"]},
            {"heading": "Access", "items": ["Frequent locations", "Property liaison", "Current entry notes"]},
        ],
        "protected": "Use this field for supported access arrangements and approved building-liaison details.",
        "never_store": "Live door codes, credentials, or unrelated resident records.",
        "footer": "Updating member information does not change plan terms, service tier, response guarantees, billing, or regional availability.",
    },
    {
        "filename": "militech-access-control-brief.pdf",
        "organization": "Militech Security Solutions",
        "code": "PUBLIC NOTE 07",
        "title": "Access-Control Brief",
        "subtitle": "Verify the work order, not the uniform",
        "label": "Public intelligence note",
        "accent": "#9c8138",
        "intro": "Commercial clothing, badges, scanners, and service language can reproduce the appearance of legitimate authority. Presented credentials should support trust, not create it.",
        "matrix": [
            {"vector": "False work order", "indicator": "Record exists only on visitor device.", "control": "Generate and verify the order inside the property system."},
            {"vector": "Borrowed identity", "indicator": "Badge data cannot be confirmed by known dispatch.", "control": "Confirm vendor and individual through an independent contact."},
            {"vector": "Urgency pressure", "indicator": "Visitor discourages calls or demands immediate entry.", "control": "Provide a refusal path and escalate without confrontation."},
            {"vector": "Venue ambiguity", "indicator": "No single authority owns exits, vendors, and shutdown.", "control": "Name one stop-operations lead before public opening."},
        ],
        "authority": "One named person must be able to deny entry or stop operations without seeking approval from the visitor.",
        "footer": "This note is public educational material and does not disclose client operations, active deployments, or a contracted security assessment.",
    },
    {
        "filename": "night-market-vendor-card.pdf",
        "organization": "Night City Temporary Commerce Desk",
        "code": "VND-TEMP-4",
        "title": "Temporary Market Safety Card",
        "subtitle": "A small checklist for rotating venues",
        "label": "Informational copy // Not a permit",
        "accent": "#8b5b24",
        "intro": "A moving market still needs clear exits, safe power, sanitation, medical access, and a person who can stop operations.",
        "phases": [
            {"heading": "Open", "items": ["Clear fire lanes and exits.", "Separate heat, fuel, and batteries.", "Mark first aid and lost-person points."]},
            {"heading": "Operate", "items": ["Keep aisles and access routes open.", "Route power away from wet paths.", "Give every vendor the stop signal."]},
            {"heading": "Close", "items": ["Remove waste, tape, wire, and signs.", "Photograph damage or hazards.", "Confirm the next host before posting."]},
        ],
        "footer": "Submitting or carrying this card does not create a permit, reserve an inspection, authorize property use, or prevent district enforcement.",
    },
    {
        "filename": "elflines-community-meetup-card.pdf",
        "organization": "Elflines Online Unofficial Hub",
        "code": "COMMUNITY SCROLL 3",
        "title": "Offline Meetup Card",
        "subtitle": "Bring your build, not your login",
        "label": "Player-run community guidance",
        "accent": "#3f7d4a",
        "intro": "Offline gatherings can be excellent. Account theft, untested mods, inaccessible venues, and unidentified food should remain online-only problems.",
        "original_post": {
            "heading": "What should the guild bring offline?",
            "body": "Bring builds, painted tokens, controllers, dice, and food labels. Leave account credentials, live access shards, and unverified mods at home. The venue has step-free access from the west transit stop.",
            "tag": "EDIT: visible volunteers will wear green guild ribbons.",
        },
        "replies": [
            {"user": "Mod_Windkin", "body": "Pinned reminder: all game-market exchanges stay inside official systems."},
            {"user": "DiceGoblin77", "body": "I will run the lost-party meeting point beside the tea table."},
            {"user": "HexAndSnacks", "body": "Food cards will list ingredients; ask before photographing community art."},
        ],
        "footer": "This hub is unofficial and cannot restore accounts, items, rankings, currency, dignity, or the six hours lost to an avoidable raid argument.",
    },
]


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", type=Path, required=True)
    parser.add_argument("--utility", type=Path, required=True)
    parser.add_argument("--credential", type=Path, required=True)
    parser.add_argument("--market", type=Path, required=True)
    args = parser.parse_args()

    media = args.root / "shared-media"
    downloads = args.root / "downloads"
    utility = prepare_image(args.utility, media / "utility-corridor.jpg")
    prepare_image(args.credential, media / "credential-impersonation.jpg")
    prepare_image(args.market, media / "night-market.jpg")
    build_motion_loop(utility, media / "utility-corridor-loop.webp")

    for spec in PDF_SPECS:
        build_pdf(downloads / str(spec["filename"]), spec)

    notes = (
        "FEEDFRENZY FIELD NOTES // SOUTH LOOP UTILITY CORRIDOR\n"
        "ARCHIVE COPY // 07.29.2045\n\n"
        "22:51 - First reader report references visible yellow vapor.\n"
        "22:58 - CivicNet notice appears with neighboring district code.\n"
        "23:06 - Local Agent signal interruptions reported by four unrelated users.\n"
        "23:14 - Staff field loop begins. Three contractor vehicles visible.\n"
        "23:19 - Municipal observer declines comment and requests barrier clearance.\n"
        "23:33 - Pressure-control line reported isolated by repair technician.\n"
        "23:47 - Air reading returns to published neighborhood baseline.\n"
        "00:12 - CivicNet replaces original notice. Archive copies retained.\n\n"
        "EDITORIAL NOTE\n"
        "No evidence presently supports claims of deliberate chemical release. Missing notices and signal loss remain unexplained in the public record. Reader submissions are preserved with identifying information removed from this copy.\n"
    )
    downloads.mkdir(parents=True, exist_ok=True)
    (downloads / "feedfrenzy-utility-source-notes.txt").write_text(notes, encoding="utf-8")


if __name__ == "__main__":
    main()
