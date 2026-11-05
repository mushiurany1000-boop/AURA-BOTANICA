Add-Type -AssemblyName System.Drawing
$bmp = [System.Drawing.Bitmap]::FromFile("docs\reference\home-reference.png")

Write-Output "Scanning FAQ grid from y=1160 to 1230:"
for ($y = 1160; $y -le 1225; $y++) {
    $c = $bmp.GetPixel(200, $y)
    # Check for border line (grayish darker line in white/cream background)
    if ($c.R -lt 210 -and $c.G -lt 205 -and $c.B -lt 200) {
        Write-Output ("Border/text at y={0}: #{1:X2}{2:X2}{3:X2}" -f $y, $c.R, $c.G, $c.B)
    }
}
$bmp.Dispose()
