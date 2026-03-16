#!/usr/bin/env python3
import argparse
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


def main() -> None:
    project_root = Path(__file__).resolve().parents[1]
    parser = argparse.ArgumentParser(
        description="Render plain-text console output into a PNG screenshot."
    )
    parser.add_argument(
        "--input",
        dest="input_path",
        default=str(project_root / "artifacts" / "console-output.txt"),
        help="Path to input text file.",
    )
    parser.add_argument(
        "--output",
        dest="output_path",
        default=str(project_root / "artifacts" / "console-screenshot.png"),
        help="Path to output PNG file.",
    )
    args = parser.parse_args()

    input_path = Path(args.input_path)
    output_path = Path(args.output_path)

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
