Add-Type -AssemblyName System.Drawing
$bmp = [System.Drawing.Bitmap]::FromFile("docs\reference\product-reference.png")
for ($y = 0; $y -lt $bmp.Height; $y += 30) {
    $c = $bmp.GetPixel(280, $y)
    Write-Output ("y={0,4}: #{1:X2}{2:X2}{3:X2}" -f $y, $c.R, $c.G, $c.B)
}
$bmp.Dispose()
