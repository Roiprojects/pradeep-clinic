const fs = require('fs');

const desktopSearch = `                    <a href="newborn-care.html" class="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 text-slate-600 hover:text-primary transition-all group/item">
                        <div class="w-8 h-8 rounded-lg bg-blue-100/50 flex items-center justify-center text-primary group-hover/item:bg-primary group-hover/item:text-white transition-colors">
                            <span class="material-symbols-outlined text-xl">child_care</span>
                        </div>
                        <span class="text-sm font-semibold">Newborn Care</span>
                    </a>
                    <a href="child-healthcare.html" class="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 text-slate-600 hover:text-primary transition-all group/item">
                        <div class="w-8 h-8 rounded-lg bg-blue-100/50 flex items-center justify-center text-primary group-hover/item:bg-primary group-hover/item:text-white transition-colors">
                            <span class="material-symbols-outlined text-xl">medical_services</span>
                        </div>
                        <span class="text-sm font-semibold">Child Healthcare</span>
                    </a>
                    <a href="vaccination.html" class="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 text-slate-600 hover:text-primary transition-all group/item">
                        <div class="w-8 h-8 rounded-lg bg-blue-100/50 flex items-center justify-center text-primary group-hover/item:bg-primary group-hover/item:text-white transition-colors">
                            <span class="material-symbols-outlined text-xl">vaccines</span>
                        </div>
                        <span class="text-sm font-semibold">Vaccination</span>
                    </a>`;

const desktopReplace = `                    <a href="child-healthcare.html" class="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 text-slate-600 hover:text-primary transition-all group/item">
                        <div class="w-8 h-8 rounded-lg bg-blue-100/50 flex items-center justify-center text-primary group-hover/item:bg-primary group-hover/item:text-white transition-colors">
                            <span class="material-symbols-outlined text-xl">medical_services</span>
                        </div>
                        <span class="text-sm font-semibold">Child Healthcare</span>
                    </a>
                    <a href="vaccination.html" class="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 text-slate-600 hover:text-primary transition-all group/item">
                        <div class="w-8 h-8 rounded-lg bg-blue-100/50 flex items-center justify-center text-primary group-hover/item:bg-primary group-hover/item:text-white transition-colors">
                            <span class="material-symbols-outlined text-xl">vaccines</span>
                        </div>
                        <span class="text-sm font-semibold">Vaccination</span>
                    </a>
                    <a href="newborn-care.html" class="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 text-slate-600 hover:text-primary transition-all group/item">
                        <div class="w-8 h-8 rounded-lg bg-blue-100/50 flex items-center justify-center text-primary group-hover/item:bg-primary group-hover/item:text-white transition-colors">
                            <span class="material-symbols-outlined text-xl">child_care</span>
                        </div>
                        <span class="text-sm font-semibold">Newborn Care</span>
                    </a>`;

const mobileSearch = `                <a href="newborn-care.html" class="text-slate-600 font-medium">Newborn Care</a>
                <a href="child-healthcare.html" class="text-slate-600 font-medium">Child Healthcare</a>
                <a href="vaccination.html" class="text-slate-600 font-medium">Vaccination</a>`;

const mobileReplace = `                <a href="child-healthcare.html" class="text-slate-600 font-medium">Child Healthcare</a>
                <a href="vaccination.html" class="text-slate-600 font-medium">Vaccination</a>
                <a href="newborn-care.html" class="text-slate-600 font-medium">Newborn Care</a>`;

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
let successCount = 0;

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    let original = content;
    content = content.replace(desktopSearch, desktopReplace);
    content = content.replace(mobileSearch, mobileReplace);
    if(original !== content) {
        fs.writeFileSync(f, content);
        console.log('Fixed', f);
        successCount++;
    }
});
console.log('Done! Navbars fixed in ' + successCount + ' files.');
