Add-Type -AssemblyName System.Drawing

function Get-HexColor([System.Drawing.Bitmap]$bmp, [int]$x, [int]$y) {
    if ($x -lt 0 -or $x -ge $bmp.Width -or $y -lt 0 -or $y -ge $bmp.Height) { return "OUT_OF_BOUNDS" }
    $c = $bmp.GetPixel($x, $y)
    return ('#{0:X2}{1:X2}{2:X2}' -f $c.R, $c.G, $c.B)
}

function Sample-AverageHex([System.Drawing.Bitmap]$bmp, [int]$startX, [int]$startY, [int]$w, [int]$h) {
    [long]$r = 0; [long]$g = 0; [long]$b = 0; [int]$count = 0
    for ($x = $startX; $x -lt ($startX + $w); $x++) {
        for ($y = $startY; $y -lt ($startY + $h); $y++) {
            if ($x -ge 0 -and $x -lt $bmp.Width -and $y -ge 0 -and $y -lt $bmp.Height) {
                $c = $bmp.GetPixel($x, $y)
                $r += $c.R; $g += $c.G; $b += $c.B; $count++
            }
        }
    }
    if ($count -eq 0) { return "#000000" }
    return ('#{0:X2}{1:X2}{2:X2}' -f [int]($r / $count), [int]($g / $count), [int]($b / $count))
}

$bmpH = [System.Drawing.Bitmap]::FromFile("docs\reference\home-reference.png")
Write-Output "=== HOMEPAGE COLOR & BOUNDARY SAMPLING (820x1230) ==="
Write-Output ("Page Background (x=20, y=500): " + (Sample-AverageHex $bmpH 10 500 20 20))
Write-Output ("Hero Left Panel bg (x=100, y=150): " + (Sample-AverageHex $bmpH 80 100 40 40))
Write-Output ("Hero Left Eyebrow text (x=100, y=70): " + (Get-HexColor $bmpH 100 70))
Write-Output ("Hero Left H1 text (x=150, y=115): " + (Get-HexColor $bmpH 150 115))
Write-Output ("Hero Left Button bg (x=140, y=256): " + (Sample-AverageHex $bmpH 130 250 20 10))
Write-Output ("Hero Left Button text (x=140, y=256): " + (Get-HexColor $bmpH 140 256))

# Measure Benefits Strip Y bounds
$stripTop = -1
$stripBottom = -1
for ($y = 350; $y -lt 460; $y++) {
    $c = $bmpH.GetPixel(410, $y)
    # Check if reddish strip color (R > 100, G < 60, B < 50)
    if ($c.R -gt 100 -and $c.G -lt 60 -and $c.B -lt 50) {
        if ($stripTop -eq -1) { $stripTop = $y }
        $stripBottom = $y
    }
}
Write-Output ("Benefits Strip Y bounds: " + $stripTop + " to " + $stripBottom + " (height: " + ($stripBottom - $stripTop + 1) + ")")
Write-Output ("Benefits Strip bg: " + (Sample-AverageHex $bmpH 390 395 20 20))

Write-Output ("Category Card 1 bg (x=150, y=520): " + (Sample-AverageHex $bmpH 140 515 20 20))
Write-Output ("Category Card 2 bg (x=350, y=520): " + (Sample-AverageHex $bmpH 340 515 20 20))
Write-Output ("Category Card 3 bg (x=550, y=520): " + (Sample-AverageHex $bmpH 540 515 20 20))
Write-Output ("Category Card 4 bg (x=730, y=520): " + (Sample-AverageHex $bmpH 720 515 20 20))
Write-Output ("Bento 1 Left Card bg (x=150, y=720): " + (Sample-AverageHex $bmpH 140 710 20 20))
Write-Output ("Bento 1 Right Card bg (x=600, y=720): " + (Sample-AverageHex $bmpH 590 710 20 20))
Write-Output ("Bento 2 Left Card bg (x=150, y=920): " + (Sample-AverageHex $bmpH 140 910 20 20))
Write-Output ("Bento 2 Right Card Text bg (x=700, y=920): " + (Sample-AverageHex $bmpH 690 910 20 20))
Write-Output ("Subscribe Banner bg (x=550, y=1070): " + (Sample-AverageHex $bmpH 540 1065 20 20))
Write-Output ("Subscribe Banner Button (x=520, y=1114): " + (Sample-AverageHex $bmpH 515 1110 20 8))

# Check Category Cards X bounds
Write-Output "Scanning Category Cards row at y=550:"
$inCard = $false
$cardStarts = @()
$cardEnds = @()
for ($x = 0; $x -lt 820; $x++) {
    $c = $bmpH.GetPixel($x, 550)
    # Background outside cards is page bg (~ #FCF7F4, R>245, G>240, B>235)
    # Card bg is ~ #F3E8E2 (R~243, G~232, B~226)
    $isCard = ($c.R -lt 248 -and $c.G -lt 238)
    if ($isCard -and -not $inCard) {
        $inCard = $true
        $cardStarts += $x
    } elseif (-not $isCard -and $inCard) {
        $inCard = $false
        $cardEnds += ($x - 1)
    }
}
for ($i = 0; $i -lt $cardStarts.Count; $i++) {
    Write-Output ("Card " + ($i+1) + ": X=" + $cardStarts[$i] + " to " + $cardEnds[$i] + " (width: " + ($cardEnds[$i] - $cardStarts[$i] + 1) + ")")
}

$bmpH.Dispose()
