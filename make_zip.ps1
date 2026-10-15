Add-Type -AssemblyName System.IO.Compression.FileSystem

$websiteDir = "d:\VERCBD\website"
$websiteZip = "d:\VERCBD\website.zip"
$nextBuildZip = "d:\VERCBD\next_build.zip"

Write-Host "Creating website.zip..."
if (Test-Path $websiteZip) {
    Remove-Item $websiteZip -Force
}

# Create website.zip directly from d:\VERCBD\website
[System.IO.Compression.ZipFile]::CreateFromDirectory($websiteDir, $websiteZip, [System.IO.Compression.CompressionLevel]::Optimal, $false)

$websiteInfo = Get-Item $websiteZip
$websiteSizeMB = [math]::Round($websiteInfo.Length / 1MB, 2)
Write-Host "website.zip created successfully: $websiteSizeMB MB"

Write-Host "Creating next_build.zip (lightweight .next only patch)..."
if (Test-Path $nextBuildZip) {
    Remove-Item $nextBuildZip -Force
}

# For next_build.zip, we pack .next into an archive where top-level folder is .next
$tempDir = Join-Path $env:TEMP ("next_patch_" + [System.Guid]::NewGuid().ToString("N"))
New-Item -ItemType Directory -Path $tempDir -Force | Out-Null
$targetNext = Join-Path $tempDir ".next"
Copy-Item -Path (Join-Path $websiteDir ".next") -Destination $targetNext -Recurse -Force

[System.IO.Compression.ZipFile]::CreateFromDirectory($tempDir, $nextBuildZip, [System.IO.Compression.CompressionLevel]::Optimal, $false)
Remove-Item -Path $tempDir -Recurse -Force -ErrorAction SilentlyContinue

$nextInfo = Get-Item $nextBuildZip
$nextSizeMB = [math]::Round($nextInfo.Length / 1MB, 2)
Write-Host "next_build.zip created successfully: $nextSizeMB MB"

Write-Host "ALL CPANEL UPDATE PACKAGES CREATED SUCCESSFULLY!"
