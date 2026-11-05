Add-Type -AssemblyName System.Drawing
$bmp = [System.Drawing.Bitmap]::FromFile("docs\reference\home-reference.png")
$minX = 9999; $maxX = -1; $minY = 9999; $maxY = -1
for ($x = 50; $x -le 300; $x++) {
    for ($y = 290; $y -le 350; $y++) {
        $c = $bmp.GetPixel($x, $y)
        # Check rust button color (R > 120, G < 70, B < 60)
        if ($c.R -gt 120 -and $c.G -lt 70 -and $c.B -lt 60) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}
Write-Output ("Hero Button bounds: x={0}..{1} (w={2}), y={3}..{4} (h={5})" -f $minX, $maxX, ($maxX - $minX + 1), $minY, $maxY, ($maxY - $minY + 1))
$bmp.Dispose()
