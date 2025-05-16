const lines = [
    "UEFI Interactive Shell u2.2",
    "EDK 11",
    "UEFI u2.70 (EDK II, 0x00010000)",
    "<span class='yellow'>Mapping table</span>",
    "    <span class='yellow'>FSO:</span> <span class='white'>Alias (s)</span> :HD0a0b: :BLK1:",
    "        Pcikoot (0x0) /Pci (0x1,0x0) /Рсі (0x1,0x0) /Рсі (0x5,0x0) /Scsi (0x0,0x0) /HD C",
    "1, GPT,859897CF-0B19-4F0D-8A39-9E335DC964AC,0x800,0x100000)",
    "    <span class='yellow'>BLKO:</span> <span class='white'>Alias (s)</span> :",
    "        PciRoot (0x0) /Pci (0x1Е,0x0) /Рсі (0x1,0x0) /Pci (0x5,0x0) /Scsi (0x0,0x0)",
    "    <span class='yellow'>BLK2:</span> <span class='white'>Alias (s)</span> :",
    "        PciRoot (0x0) /Pci (0x1Е,0x0) /Рсі (0x1,0x0) /Pci (0x5,0x0) /Scsi (0x0,0x0) /HD (",
    "2, GPT, 7996C9DA-1FF2-4860-8AD9-130200Е77ЕВ6,0x100800,0x7A000)",
    "    <span class='yellow'>BLK3:</span> <span class='white'>Alias (s)</span> :",
    "        Pcikoot (0x0) /Pci (0x1,0x0) /Pci (0x1,0x0) /Рсі (0x5,0x0) /Scsi (0x0,0x0) /HD C",
    "3, GPT, 76EE77B1-C029-41C6-890F-19EA1F478E92,0x17A800,0x2685000)",
    "Press <span class='white'>ESC</span> in 1 seconds to skip <span class='yellow'>startup.nsh</span> or any other key to continue.",
    "<span class='yellow'>Shell></span> <span class='cursor'>_</span>"
];
const shell = document.getElementById("shell");
let i = 0;
function showNextLine() {
    if (i < lines.length) {
        shell.innerHTML += lines[i] + "\n";
        i++;
        setTimeout(showNextLine, 300);
    }
}
showNextLine();