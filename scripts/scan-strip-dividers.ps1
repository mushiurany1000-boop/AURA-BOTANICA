Add-Type -AssemblyName System.Drawing
$bmp = [System.Drawing.Bitmap]::FromFile("docs\reference\home-reference.png")

# Look for dividers at y=400 across x=0..820
Write-Output "Scanning Benefits Strip for dividers at y=400:"
for ($x = 100; $x -le 720; $x++) {
    $c = $bmp.GetPixel($x, 400)
    # Divider is lighter line in dark reddish bg
    if ($c.R -gt 150 -or $c.G -gt 90 -or $c.B -gt 80) {
        Write-Output ("Light pixel at x={0}: #{1:X2}{2:X2}{3:X2}" -f $x, $c.R, $c.G, $c.B)
    }
}

$bmp.Dispose()
