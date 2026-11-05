Add-Type -AssemblyName System.Drawing

$bmp = [System.Drawing.Bitmap]::FromFile("docs\reference\home-reference.png")
Write-Output "Image size: $($bmp.Width) x $($bmp.Height)"

# Sample points in Hero left panel
Write-Output "Hero points:"
for ($y = 50; $y -le 350; $y += 30) {
    $c1 = $bmp.GetPixel(50, $y)
    $c2 = $bmp.GetPixel(150, $y)
    $c3 = $bmp.GetPixel(300, $y)
    $c4 = $bmp.GetPixel(410, $y)
    $c5 = $bmp.GetPixel(600, $y)
    Write-Output ("y={0,3}: x=50 -> #{1:X2}{2:X2}{3:X2} | x=150 -> #{4:X2}{5:X2}{6:X2} | x=300 -> #{7:X2}{8:X2}{9:X2} | x=410 -> #{10:X2}{11:X2}{12:X2} | x=600 -> #{13:X2}{14:X2}{15:X2}" -f $y, $c1.R, $c1.G, $c1.B, $c2.R, $c2.G, $c2.B, $c3.R, $c3.G, $c3.B, $c4.R, $c4.G, $c4.B, $c5.R, $c5.G, $c5.B)
}

$bmp.Dispose()
