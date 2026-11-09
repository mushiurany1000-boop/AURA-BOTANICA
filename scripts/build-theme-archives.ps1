# scripts/build-theme-archives.ps1
param(
  [string]$SrcDir = "shopify-theme",
  [string]$DestZip = "kayra-beauty-shopify-theme.zip"
)

Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$src = (Resolve-Path $SrcDir).Path
$dest = (Join-Path (Get-Location) $DestZip)

if (Test-Path $dest) {
  Remove-Item -Force $dest
}

$zip = [System.IO.Compression.ZipFile]::Open($dest, [System.IO.Compression.ZipArchiveMode]::Create)
Get-ChildItem -Path $src -Recurse -File | ForEach-Object {
  $rel = $_.FullName.Substring($src.Length + 1).Replace('\', '/')
  [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $_.FullName, $rel, [System.IO.Compression.CompressionLevel]::Optimal) | Out-Null
}
$zip.Dispose()

$fi = Get-Item $dest
Write-Host "Created $DestZip ($([math]::Round($fi.Length / 1KB, 1)) KB, $($fi.Length) bytes)"
