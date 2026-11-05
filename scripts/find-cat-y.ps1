Add-Type -AssemblyName System.Drawing
$bmp = [System.Drawing.Bitmap]::FromFile("docs\reference\home-reference.png")

$minY = 9999; $maxY = -1
for ($y = 470; $y -le 680; $y++) {
    $c = $bmp.GetPixel(150, $y)
    # Background outside cards is page bg (#FBF6F3), card bg is #F3E8E2
    if ($c.R -lt 248 -and $c.G -lt 238) {
        if ($y -lt $minY) { $minY = $y }
        if ($y -gt $maxY) { $maxY = $y }
    }
}
Write-Output ("Category Card Y bounds: {0}..{1} (height: {2})" -f $minY, $maxY, ($maxY - $minY + 1))
$bmp.Dispose()
