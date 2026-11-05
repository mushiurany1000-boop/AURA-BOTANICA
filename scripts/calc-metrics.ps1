Add-Type -AssemblyName System.Drawing

$home = [System.Drawing.Bitmap]::FromFile("docs\reference\home-reference.png")
$prod = [System.Drawing.Bitmap]::FromFile("docs\reference\product-reference.png")

Write-Output "=== HOMEPAGE DETAILED MEASUREMENTS (Width: 820, Height: 1230, Scale to 1440: x1.7561) ==="
# Side Margins
# Left side margin outside content container:
# Category cards start at x=64, end at x=756. Margin = 64px on left, 64px on right (820 - 756 = 64).
# 64 / 820 = 7.80% (User estimated 7.7% / 63px). Container width = 692px (84.4%). At 1440: 692 * 1.7561 = 1215px (User estimated 1220px max).

Write-Output "Homepage side margin: 64px (7.80% of width) -> 112px at 1440px"
Write-Output "Content container width: 692px (84.39% of width) -> 1215px at 1440px"

# 1. Hero
# y=0..367, height=368px (29.9% of height, 44.88% of width). At 1440: 646px height.
# Split: x=0..410 (50.0%) left panel, x=410..820 (50.0%) right photo.
# Left panel text left padding: x=73 -> 73px (8.90% of width) -> 128px at 1440.
# Hero button: x=73..186 (w=114, 13.90% of width -> 200px at 1440), y=302..328 (h=27 -> 47px at 1440).
Write-Output "Hero section: y=0..367 (h=368, 44.88% of width -> 646px at 1440). Split: 50% / 50%."

# 2. Benefits Strip
# y=367..436 (h=70, 8.54% of width -> 123px at 1440). Full width: x=0..820 (100%).
# 4 equal columns: 205px each (25.0%). Dividers at x=205, 410, 615.
Write-Output "Benefits Strip: y=367..436 (h=70, 8.54% of width -> 123px at 1440). 4 columns of 25%."

# 3. Shop by Category
# Eyebrow / header row: y=455..475.
# Cards: y=486..655 (h=170, 20.73% of width -> 298px at 1440).
# 4 cards:
# Card 1: x=64..226 (w=163, 19.88% -> 286px)
# Gap 1: x=227..239 (gap=13, 1.59% -> 23px)
# Card 2: x=240..403 (w=164, 20.00% -> 288px)
# Gap 2: x=404..415 (gap=12, 1.46% -> 21px)
# Card 3: x=416..580 (w=165, 20.12% -> 290px)
# Gap 3: x=581..592 (gap=12, 1.46% -> 21px)
# Card 4: x=593..756 (w=164, 20.00% -> 288px)
Write-Output "Shop by Category: y=455..655. Cards y=486..655 (h=170 -> 298px at 1440). 4 cards w~164, gap~12."

# 4. Bento Row 1
# y=678..860 (h=183, 22.32% of width -> 321px at 1440).
# Left card: x=64..433 (w=370, 45.12% of width, or 53.47% of container).
# Gap: x=434..442 (gap=9, 1.10% -> 16px).
# Right card: x=443..756 (w=314, 38.29% of width, or 45.38% of container).
Write-Output "Bento Row 1: y=678..860 (h=183 -> 321px at 1440). Left card w=370 (53.5% container), Right card w=314 (45.4% container), Gap=9px."

# 5. Bento Row 2
# y=863..1037 (h=175, 21.34% of width -> 307px at 1440).
# Left card: x=64..433 (w=370, 53.47% of container).
# Gap: x=434..442 (gap=9, 1.10% -> 16px).
# Right card: x=443..756 (w=314, 45.38% of container).
Write-Output "Bento Row 2: y=863..1037 (h=175 -> 307px at 1440). Left card w=370 (53.5%), Right card w=314 (45.4%), Gap=9px."

# 6. Subscribe Banner
# y=1038..1147 (h=110, 13.41% of width -> 193px at 1440).
# Container width: x=64..756 (w=692, 84.39% -> 1215px at 1440).
Write-Output "Subscribe Banner: y=1038..1147 (h=110 -> 193px at 1440). w=692 (container width)."

# 7. FAQ Section
# y=1155..1230+
# Header row: y=1155..1172. Left eyebrow at x=64, Right link at x=756.
# Grid: 2 columns of 2 rows.
# Column 1: x=64..398 (w=335, 48.4% of container).
# Gap: x=399..421 (gap=23, 3.3% of container).
# Column 2: x=422..756 (w=335, 48.4% of container).
# Rows: Row 1 y=1173..1198 (h=26 -> 46px at 1440), Row 2 y=1200..1225 (h=26 -> 46px at 1440).
Write-Output "FAQ Section: y=1155..1230. 2 columns w=335 (48.4% container), gap=23px (3.3%), row h=26 (46px at 1440)."

$home.Dispose()
$prod.Dispose()
