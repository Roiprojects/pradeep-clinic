const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
let successCount = 0;

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    let original = content;

    // Desktop Menu
    const newbornDesktopStart = content.indexOf('<a href="newborn-care.html" class="flex items-center gap-3 p-3');
    const childDesktopStart = content.indexOf('<a href="child-healthcare.html" class="flex items-center gap-3 p-3');
    const vaxDesktopStart = content.indexOf('<a href="vaccination.html" class="flex items-center gap-3 p-3');
    const growthDesktopStart = content.indexOf('<a href="growth-monitoring.html" class="flex items-center gap-3 p-3');

    // Only proceed if ALL 4 sections exist in the original order (newborn < child < vax < growth)
    if (newbornDesktopStart !== -1 && childDesktopStart !== -1 && vaxDesktopStart !== -1 && growthDesktopStart !== -1 &&
        newbornDesktopStart < childDesktopStart && childDesktopStart < vaxDesktopStart && vaxDesktopStart < growthDesktopStart) {
        
        const newbornBlock = content.substring(newbornDesktopStart, childDesktopStart);
        const childBlock = content.substring(childDesktopStart, vaxDesktopStart);
        const vaxBlock = content.substring(vaxDesktopStart, growthDesktopStart);

        const oldBlock = newbornBlock + childBlock + vaxBlock;
        const newBlock = childBlock + vaxBlock + newbornBlock;

        content = content.replace(oldBlock, newBlock);
    }

    // Mobile Menu
    const newbornMobileStart = content.indexOf('<a href="newborn-care.html" class="text-slate-600 font-medium">');
    const childMobileStart = content.indexOf('<a href="child-healthcare.html" class="text-slate-600 font-medium">');
    const vaxMobileStart = content.indexOf('<a href="vaccination.html" class="text-slate-600 font-medium">');
    const growthMobileStart = content.indexOf('<a href="growth-monitoring.html" class="text-slate-600 font-medium">');

    if (newbornMobileStart !== -1 && childMobileStart !== -1 && vaxMobileStart !== -1 && growthMobileStart !== -1 && 
        newbornMobileStart < childMobileStart && childMobileStart < vaxMobileStart && vaxMobileStart < growthMobileStart) {
        
        const newbornBlockM = content.substring(newbornMobileStart, childMobileStart);
        const childBlockM = content.substring(childMobileStart, vaxMobileStart);
        const vaxBlockM = content.substring(vaxMobileStart, growthMobileStart);

        const oldBlockM = newbornBlockM + childBlockM + vaxBlockM;
        const newBlockM = childBlockM + vaxBlockM + newbornBlockM;

        content = content.replace(oldBlockM, newBlockM);
    }

    if(original !== content) {
        fs.writeFileSync(f, content);
        successCount++;
    }
});
console.log('Fixed Navbars in ' + successCount + ' files.');
