
Get-ChildItem -File | ForEach-Object {
    $newName = $_.Name.ToLower() -replace '\s+', '_' -replace '\.jpeg$', '.jpg' -replace '\.jpg$', '.jpg'
    Rename-Item $_.FullName $newName
}
