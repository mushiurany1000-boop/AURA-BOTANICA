Add-Type -AssemblyName System.Drawing
$bmp = [System.Drawing.Bitmap]::FromFile("docs\reference\product-reference.png")
Write-Output "Product Reference Size: $($bmp.Width) x $($bmp.Height)"

# 1. Top bar Y bounds
$topBarBg = $bmp.GetPixel(200, 10)
Write-Output ("Top Bar (y=10): #{0:X2}{1:X2}{2:X2}" -f $topBarBg.R, $topBarBg.G, $topBarBg.B)
$topBarBottom = -1
for ($y = 0; $y -le 50; $y++) {
    $c = $bmp.GetPixel(10, $y)
    if ($c.R -gt 200 -and $c.G -gt 200 -and $c.B -gt 200) {
        $topBarBottom = $y - 1
        break
    }
}
Write-Output ("Top Bar bounds: y=0..{0} (height: {1})" -f $topBarBottom, ($topBarBottom + 1))

# 2. Header Y bounds
$headerBottom = -1
for ($y = $topBarBottom + 1; $y -le 150; $y++) {
    $c = $bmp.GetPixel(10, $y)
    # Header is white, breadcrumb band below is #F5F5F5 (R~245, G~245, B~245)
    if ($c.R -lt 250 -and $c.G -lt 250 -and $c.B -lt 250) {
        $headerBottom = $y - 1
        break
    }
}
Write-Output ("Header bounds: y={0}..{1} (height: {2})" -f ($topBarBottom + 1), $headerBottom, ($headerBottom - $topBarBottom))

# 3. Breadcrumb Band Y bounds
$breadBottom = -1
for ($y = $headerBottom + 1; $y -le 250; $y++) {
    $c = $bmp.GetPixel(10, $y)
    # Product area below is pure white #FFFFFF
    if ($c.R -gt 252 -and $c.G -gt 252 -and $c.B -gt 252) {
        $breadBottom = $y - 1
        break
    }
}
Write-Output ("Breadcrumb Band bounds: y={0}..{1} (height: {2})" -f ($headerBottom + 1), $breadBottom, ($breadBottom - $headerBottom))
$breadBg = $bmp.GetPixel(280, $headerBottom + 20)
Write-Output ("Breadcrumb Band bg: #{0:X2}{1:X2}{2:X2}" -f $breadBg.R, $breadBg.G, $breadBg.B)

# 4. Product Gallery Bounds
# Let's find the left image bounds (around y=200..450, x=30..280)
$galLeft = -1; $galRight = -1; $galTop = -1; $galBottom = -1
# Find the large image
for ($x = 10; $x -le 200; $x++) {
    $c = $bmp.GetPixel($x, 280)
    if ($c.R -lt 250 -or $c.G -lt 250 -or $c.B -lt 250) {
        $galLeft = $x
        break
    }
}
for ($x = 280; $x -ge 200; $x--) {
    $c = $bmp.GetPixel($x, 280)
    if ($c.R -lt 250 -or $c.G -lt 250 -or $c.B -lt 250) {
        $galRight = $x
        break
    }
}
for ($y = $breadBottom + 1; $y -le 350; $y++) {
    $c = $bmp.GetPixel(100, $y)
    if ($c.R -lt 250 -or $c.G -lt 250 -or $c.B -lt 250) {
        $galTop = $y
        break
    }
}
for ($y = 450; $y -ge 300; $y--) {
    $c = $bmp.GetPixel(100, $y)
    if ($c.R -lt 250 -or $c.G -lt 250 -or $c.B -lt 250) {
        $galBottom = $y
        break
    }
}
Write-Output ("Main Gallery Image: x={0}..{1} (w={2}), y={3}..{4} (h={5})" -f $galLeft, $galRight, ($galRight - $galLeft + 1), $galTop, $galBottom, ($galBottom - $galTop + 1))

# 5. Product Tabs Y bounds
# Tabs row is around y=540..580
Write-Output "
Scanning Tabs area (y=530..590):"
for ($y = 540; $y -le 585; $y++) {
    $c = $bmp.GetPixel(390, $y) # Active tab green underline or text
    if ($c.G -gt 60 -and $c.R -lt 50 -and $c.B -lt 50) {
        Write-Output ("Active tab underline at y={0}: #{1:X2}{2:X2}{3:X2}" -f $y, $c.R, $c.G, $c.B)
    }
}

# 6. Reviews Section Y bounds
# Score is around y=600..660
Write-Output "
Scanning Reviews area:"
$scoreColor = $bmp.GetPixel(95, 620)
Write-Output ("Score text color: #{0:X2}{1:X2}{2:X2}" -f $scoreColor.R, $scoreColor.G, $scoreColor.B)

$bmp.Dispose()
