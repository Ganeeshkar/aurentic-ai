#!/usr/bin/env python3
"""Assemble Meridian Labs pages from _template.html + _bodies/*.html"""
import os, json, sys

ROOT = os.path.dirname(os.path.abspath(__file__))
META = json.load(open(os.path.join(ROOT, "_meta.json"), encoding="utf-8"))
TPL = open(os.path.join(ROOT, "_template.html"), encoding="utf-8").read()

for out, m in META.items():
    body_path = os.path.join(ROOT, "_bodies", m["body"])
    if not os.path.exists(body_path):
        print("SKIP (no body):", out); continue
    body = open(body_path, encoding="utf-8").read()
    prefix = m.get("prefix", "")
    html = (TPL.replace("{{TITLE}}", m["title"])
               .replace("{{DESC}}", m["desc"])
               .replace("{{PREFIX}}", prefix)
               .replace("{{BODY}}", body))
    dest = os.path.join(ROOT, out)
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    open(dest, "w", encoding="utf-8").write(html)
    print("built:", out)
