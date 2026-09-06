"""Create the public-only static artifact for Cloudflare. No dependencies."""
from pathlib import Path
import shutil

ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / "dist"
PAGES = (
    "index.html", "404.html", "privacy-policy.html", "cookies-policy.html",
    "terms-of-service.html", "favicon.ico", "robots.txt", "sitemap.xml",
    "service-worker.js", "_headers",
)


def build():
    # dist is disposable output, never source. Refuse an unexpected symlink.
    if OUTPUT.is_symlink():
        raise RuntimeError("Refusing to replace a symlink at dist")
    for name in PAGES:
        if not (ROOT / name).is_file():
            raise FileNotFoundError(name)
    if OUTPUT.exists():
        shutil.rmtree(OUTPUT)
    OUTPUT.mkdir()
    for name in PAGES:
        shutil.copy2(ROOT / name, OUTPUT / name)
    for name in ("css", "js", "img"):
        shutil.copytree(ROOT / name, OUTPUT / name,
                        ignore=shutil.ignore_patterns(".DS_Store", "~$*", "Thumbs.db"))
    files = [path for path in OUTPUT.rglob("*") if path.is_file()]
    print(f"Built {len(files)} public files in {OUTPUT}")


if __name__ == "__main__":
    build()
