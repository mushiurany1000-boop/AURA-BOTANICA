Add-Type -AssemblyName System.Drawing
$bmp = [System.Drawing.Bitmap]::FromFile("docs\reference\home-reference.png")
for ($x = 390; $x -le 420; $x++) {
    $c = $bmp.GetPixel($x, 100)
    Write-Output ("x={0}: #{1:X2}{2:X2}{3:X2}" -f $x, $c.R, $c.G, $c.B)
}
$bmp.Dispose()
