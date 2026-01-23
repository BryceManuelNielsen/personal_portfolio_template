import re

with open('src/templates/Classic/Classic.css', 'r') as f:
    css_content = f.read()

lines = css_content.split('\n')
new_lines = []
skip_next = False

for i, line in enumerate(lines):
    line = line.strip()
    if not line:
        new_lines.append(line)
        continue

    if line.startswith('/*') or line.startswith('@media'):
        new_lines.append(line)
        continue

    if line.startswith('}'):
        new_lines.append(line)
        continue

    # Simple heuristic: if it looks like a selector block start
    if '{' in line:
        selectors = line.split('{')[0].strip()
        rest = line[len(selectors):]

        parts = selectors.split(',')
        new_parts = []
        for part in parts:
            part = part.strip()
            if part == ':root':
                new_parts.append('.classic-template')
            elif part == 'body':
                new_parts.append('.classic-template')
            elif part == '*':
                new_parts.append('.classic-template *')
            elif part.startswith('@'):
                new_parts.append(part) # Leave @keyframes etc alone
            else:
                new_parts.append(f'.classic-template {part}')

        new_lines.append(', '.join(new_parts) + rest)
    else:
        new_lines.append(line)

# Handle media queries manually (this script is imperfect but sufficient for this file structure)
# The file has one @media block at the end.
# Actually, the media query logic above is wrong because it just appends the line.
# If I just use the script to prefix everything that looks like a selector...

# Let's try a regex approach on the whole file content.
# Replace "selector {" with ".classic-template selector {"
# But exclude @media, @keyframes
