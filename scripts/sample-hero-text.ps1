Add-Type -AssemblyName System.Drawing
$bmp = [System.Drawing.Bitmap]::FromFile("docs\reference\home-reference.png")

# Sample Eyebrow text around y=80..90, x=73..200
Write-Output "Eyebrow sample:"
for ($y = 75; $y -le 95; $y++) {
    for ($x = 73; $x -le 160; $x++) {
        $c = $bmp.GetPixel($x, $y)
        # Eyebrow text is dark reddish-brown
        if ($c.R -lt 160 -and $c.G -lt 120 -and $c.B -lt 110) {
            Write-Output ("Eyebrow text at ({0},{1}): #{2:X2}{3:X2}{4:X2}" -f $x, $y, $c.R, $c.G, $c.B)
            break
        }
    }
}

# Sample H1 text around y=100..200
Write-Output "
H1 sample:"
for ($y = 105; $y -le 220; $y += 10) {
    for ($x = 73; $x -le 200; $x++) {
        $c = $bmp.GetPixel($x, $y)
        if ($c.R -lt 120 -and $c.G -lt 60 -and $c.B -lt 50) {
            Write-Output ("H1 text at ({0},{1}): #{2:X2}{3:X2}{4:X2}" -f $x, $y, $c.R, $c.G, $c.B)
            break
        }
    }
}

# Sample paragraph text around y=240..280
Write-Output "
Paragraph sample:"
for ($y = 250; $y -le 280; $y += 5) {
    for ($x = 73; $x -le 200; $x++) {
        $c = $bmp.GetPixel($x, $y)
        if ($c.R -gt 90 -and $c.R -lt 130 -and $c.G -gt 85 -and $c.G -lt 120) {
            Write-Output ("Paragraph text at ({0},{1}): #{2:X2}{3:X2}{4:X2}" -f $x, $y, $c.R, $c.G, $c.B)
            break
        }
    }
}

$bmp.Dispose()
