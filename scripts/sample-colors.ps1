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

$home = [System.Drawing.Bitmap]::FromFile("docs\reference\home-reference.png")
Write-Output "=== HOMEPAGE COLOR SAMPLING (820x1230) ==="
Write-Output ("Page Background (x=20, y=500): " + (Sample-AverageHex $home 10 500 20 20))
Write-Output ("Hero Left Panel bg (x=100, y=150): " + (Sample-AverageHex $home 80 100 40 40))
Write-Output ("Hero Left Eyebrow text (x=100, y=70): " + (Get-HexColor $home 100 70))
Write-Output ("Hero Left H1 text (x=150, y=115): " + (Get-HexColor $home 150 115))
Write-Output ("Hero Left Button bg (x=140, y=256): " + (Sample-AverageHex $home 130 250 20 10))
Write-Output ("Benefits Strip bg (x=400, y=400): " + (Sample-AverageHex $home 390 395 20 20))
Write-Output ("Benefits Strip text/icon (x=200, y=390): " + (Get-HexColor $home 200 390))
Write-Output ("Category Card 1 bg (x=150, y=520): " + (Sample-AverageHex $home 140 515 20 20))
Write-Output ("Category Card 2 bg (x=350, y=520): " + (Sample-AverageHex $home 340 515 20 20))
Write-Output ("Category Card 3 bg (x=550, y=520): " + (Sample-AverageHex $home 540 515 20 20))
Write-Output ("Category Card 4 bg (x=730, y=520): " + (Sample-AverageHex $home 720 515 20 20))
Write-Output ("Bento 1 Left Card bg (x=150, y=720): " + (Sample-AverageHex $home 140 710 20 20))
Write-Output ("Bento 1 Right Card bg (x=600, y=720): " + (Sample-AverageHex $home 590 710 20 20))
Write-Output ("Bento 2 Left Card bg (x=150, y=920): " + (Sample-AverageHex $home 140 910 20 20))
Write-Output ("Bento 2 Right Card Text bg (x=700, y=920): " + (Sample-AverageHex $home 690 910 20 20))
Write-Output ("Subscribe Banner bg (x=550, y=1070): " + (Sample-AverageHex $home 540 1065 20 20))
Write-Output ("Subscribe Banner Button (x=520, y=1114): " + (Sample-AverageHex $home 515 1110 20 8))
Write-Output ("FAQ Row border (x=200, y=1173): " + (Get-HexColor $home 200 1173))
$home.Dispose()

$prod = [System.Drawing.Bitmap]::FromFile("docs\reference\product-reference.png")
Write-Output "
=== PRODUCT PAGE COLOR SAMPLING (564x1128) ==="
Write-Output ("Top Bar bg (x=280, y=15): " + (Sample-AverageHex $prod 270 10 20 10))
Write-Output ("Top Bar Gold link (x=360, y=15): " + (Get-HexColor $prod 360 15))
Write-Output ("Breadcrumb band bg (x=280, y=70): " + (Sample-AverageHex $prod 270 65 20 20))
Write-Output ("Breadcrumb title (x=280, y=65): " + (Get-HexColor $prod 280 65))
Write-Output ("Gallery Next Button green (x=252, y=348): " + (Sample-AverageHex $prod 250 345 6 6))
Write-Output ("In Stock Pill bg (x=400, y=273): " + (Sample-AverageHex $prod 398 271 8 6))
Write-Output ("In Stock Pill text (x=400, y=273): " + (Get-HexColor $prod 400 273))
Write-Output ("Star rating gold (x=320, y=290): " + (Get-HexColor $prod 320 290))
Write-Output ("Price Gold text (x=300, y=308): " + (Get-HexColor $prod 300 308))
Write-Output ("Compare At gray (x=350, y=308): " + (Get-HexColor $prod 350 308))
Write-Output ("Selected Pill 30ml fill (x=305, y=384): " + (Sample-AverageHex $prod 303 382 6 6))
Write-Output ("Add To Cart button bg (x=380, y=412): " + (Sample-AverageHex $prod 375 410 10 6))
Write-Output ("Buy Now button bg (x=460, y=412): " + (Sample-AverageHex $prod 455 410 10 6))
Write-Output ("Active Tab green line (x=390, y=575): " + (Get-HexColor $prod 390 575))
Write-Output ("Reviews big score text (x=100, y=615): " + (Get-HexColor $prod 100 615))
Write-Output ("Reviews gold bar fill (x=300, y=605): " + (Sample-AverageHex $prod 295 603 10 4))
Write-Output ("Reviews gray bar track (x=380, y=605): " + (Sample-AverageHex $prod 375 603 10 4))
$prod.Dispose()
