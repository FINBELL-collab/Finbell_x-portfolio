from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

OUTPUT_DIR = Path(__file__).resolve().parent.parent / 'assets'
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

projects = [
    ('architect', 'Architect Studio', '#1e3c72', '#2a5298'),
    ('coffee', 'Coffee House', '#5c3d2e', '#a77650'),
    ('digitalhub', 'DigitalHub', '#1f2937', '#4f46e5'),
    ('salon', 'Hair Salon', '#6d2b63', '#c084fc'),
    ('tea', 'Tea Shop', '#1f4d3d', '#52b788'),
    ('studio', 'Photo Studio', '#111827', '#f8fafc'),
]

WIDTH = 1200
HEIGHT = 700
FONT_SIZE = 72
TITLE_SIZE = 48

try:
    font = ImageFont.truetype('arial.ttf', FONT_SIZE)
    title_font = ImageFont.truetype('arial.ttf', TITLE_SIZE)
except OSError:
    font = ImageFont.load_default()
    title_font = ImageFont.load_default()

for filename, title, color, accent in projects:
    img = Image.new('RGB', (WIDTH, HEIGHT), color=color)
    draw = ImageDraw.Draw(img)

    # Background accent shape
    draw.rectangle([WIDTH*0.05, HEIGHT*0.55, WIDTH*0.95, HEIGHT*0.85], fill=accent)

    text = title
    try:
        bbox = draw.textbbox((0, 0), text, font=font)
        w, h = bbox[2] - bbox[0], bbox[3] - bbox[1]
    except AttributeError:
        w, h = draw.textsize(text, font=font)
    draw.text(((WIDTH - w) / 2, (HEIGHT - h) / 3), text, fill='white', font=font)

    label = 'Local preview thumbnail'
    try:
        lbbox = draw.textbbox((0, 0), label, font=title_font)
        lw, lh = lbbox[2] - lbbox[0], lbbox[3] - lbbox[1]
    except AttributeError:
        lw, lh = draw.textsize(label, font=title_font)
    draw.text(((WIDTH - lw) / 2, (HEIGHT - lh) / 1.15), label, fill='white', font=title_font)

    out_path = OUTPUT_DIR / f'{filename}.png'
    img.save(out_path)
    print(f'Generated {out_path}')
