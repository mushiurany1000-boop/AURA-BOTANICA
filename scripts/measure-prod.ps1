Add-Type -AssemblyName System.Drawing
$bmp = [System.Drawing.Bitmap]::FromFile("docs\reference\product-reference.png")

Write-Output "Finding Top Bar (green #1D4025):"
$tbTop = -1; $tbBottom = -1
for ($y = 0; $y -le 100; $y++) {
    $c = $bmp.GetPixel(280, $y)
    # Check if green (R < 50, G > 50, B < 50)
    if ($c.R -lt 50 -and $c.G -gt 50 -and $c.B -lt 50) {
        if ($tbTop -eq -1) { $tbTop = $y }
        $tbBottom = $y
    }
}
Write-Output ("Top Bar bounds: y={0}..{1} (height: {2})" -f $tbTop, $tbBottom, ($tbBottom - $tbTop + 1))
$tbBg = $bmp.GetPixel(10, $tbTop + 5)
Write-Output ("Top Bar bg: #{0:X2}{1:X2}{2:X2}" -f $tbBg.R, $tbBg.G, $tbBg.B)

Write-Output "
Finding Header (white between Top Bar and Breadcrumb):"
$hdTop = $tbBottom + 1
$hdBottom = -1
for ($y = $hdTop; $y -le 150; $y++) {
    $c = $bmp.GetPixel(10, $y)
    # Breadcrumb band starts when color is #F5F5F5 (R < 250)
    if ($c.R -lt 250 -and $c.G -lt 250 -and $c.B -lt 250) {
        $hdBottom = $y - 1
        break
    }
}
Write-Output ("Header bounds: y={0}..{1} (height: {2})" -f $hdTop, $hdBottom, ($hdBottom - $hdTop + 1))

Write-Output "
Finding Breadcrumb Band (#F5F5F5):"
$bbTop = $hdBottom + 1
$bbBottom = -1
for ($y = $bbTop; $y -le 250; $y++) {
    $c = $bmp.GetPixel(10, $y)
    # Product area starts when color is white #FFFFFF (R > 252)
    if ($c.R -gt 252 -and $c.G -gt 252 -and $c.B -gt 252) {
        $bbBottom = $y - 1
        break
    }
}
Write-Output ("Breadcrumb Band bounds: y={0}..{1} (height: {2})" -f $bbTop, $bbBottom, ($bbBottom - $bbTop + 1))
$bbBg = $bmp.GetPixel(20, $bbTop + 10)
Write-Output ("Breadcrumb Band bg: #{0:X2}{1:X2}{2:X2}" -f $bbBg.R, $bbBg.G, $bbBg.B)

Write-Output "
Finding Gallery Main Image:"
$gTop = -1; $gBottom = -1; $gLeft = -1; $gRight = -1
for ($y = $bbBottom + 1; $y -le 500; $y++) {
    $c = $bmp.GetPixel(150, $y)
    # Inside gallery image vs white background outside
    if ($c.R -lt 250 -or $c.G -lt 250 -or $c.B -lt 250) {
        if ($gTop -eq -1) { $gTop = $y }
        $gBottom = $y
    }
}
# Find left/right edges of main gallery image
for ($x = 10; $x -le 200; $x++) {
    $c = $bmp.GetPixel($x, $gTop + 50)
    if ($c.R -lt 250 -or $c.G -lt 250 -or $c.B -lt 250) {
        $gLeft = $x
        break
    }
}
for ($x = 300; $x -ge 200; $x--) {
    $c = $bmp.GetPixel($x, $gTop + 50)
    if ($c.R -lt 250 -or $c.G -lt 250 -or $c.B -lt 250) {
        $gRight = $x
        break
    }
}
Write-Output ("Gallery Image bounds: x={0}..{1} (w={2}), y={3}..{4} (h={5})" -f $gLeft, $gRight, ($gRight - $gLeft + 1), $gTop, $gBottom, ($gBottom - $gTop + 1))

Write-Output "
Finding Thumbnails Row:"
# Thumbnails are below main gallery image
for ($y = $gBottom + 1; $y -le $gBottom + 80; $y++) {
    $c = $bmp.GetPixel(100, $y)
    if ($c.R -lt 250) {
        Write-Output ("Thumbnail content at y={0}: #{1:X2}{2:X2}{3:X2}" -f $y, $c.R, $c.G, $c.B)
    }
}

Write-Output "
Finding Tabs row (around y=540..580):"
for ($y = 540; $y -le 585; $y++) {
    $c = $bmp.GetPixel(280, $y)
    # Check border line
    if ($c.R -lt 230 -and $c.G -lt 230 -and $c.B -lt 230) {
        Write-Output ("Tabs border line at y={0}: #{1:X2}{2:X2}{3:X2}" -f $y, $c.R, $c.G, $c.B)
    }
}

Write-Output "
Finding Reviews breakdown and list:"
for ($y = 585; $y -le 660; $y += 5) {
    $c = $bmp.GetPixel(250, $y)
    Write-Output ("Reviews sample y={0}: #{1:X2}{2:X2}{3:X2}" -f $y, $c.R, $c.G, $c.B)
}

$bmp.Dispose()
