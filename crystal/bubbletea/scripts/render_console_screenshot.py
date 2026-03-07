#!/usr/bin/env python3
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


def main() -> None:
    project_root = Path(__file__).resolve().parents[1]
    input_path = project_root / "artifacts" / "spec-run-output.txt"
    output_path = project_root / "artifacts" / "spec-run-screenshot.png"

    text = input_path.read_text(encoding="utf-8")
    lines = text.splitlines() or [""]

    try:
        font = ImageFont.truetype(
            "/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf", 20
        )
    except OSError:
        font = ImageFont.load_default()

    padding = 24
    line_height = 30
    max_chars = max(len(line) for line in lines)
    width = max(900, padding * 2 + max_chars * 12)
    height = padding * 2 + line_height * len(lines)

    image = Image.new("RGB", (width, height), color=(20, 20, 20))
    draw = ImageDraw.Draw(image)

    y = padding
    for line in lines:
        draw.text((padding, y), line, font=font, fill=(220, 220, 220))
        y += line_height

    image.save(output_path)
    print(f"Saved screenshot: {output_path}")


if __name__ == "__main__":
    main()
