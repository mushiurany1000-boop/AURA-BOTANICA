Add-Type -AssemblyName System.Drawing
$bmp = [System.Drawing.Bitmap]::FromFile("docs\reference\home-reference.png")

for ($y = 850; $y -le 875; $y++) {
    $c = $bmp.GetPixel(100, $y)
    Write-Output ("y={0}: #{1:X2}{2:X2}{3:X2}" -f $y, $c.R, $c.G, $c.B)
}
$bmp.Dispose()
