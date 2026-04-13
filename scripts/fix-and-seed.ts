import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const BUCKET_NAME = "item-images";

const items = [
  { title: "Scientific Calculator TI-84 Plus", description: "TI-84 Plus graphing calculator in excellent condition. Perfect for calculus, statistics, and engineering courses.", category: "Electronics & Gadgets", price: 50, rental_period: "weekly", condition: "excellent", location: "Cairo University - Main Campus", deposit: 200, color: "#2563eb", label: "TI-84" },
  { title: "Organic Chemistry Textbook - 9th Edition", description: "McMurry Organic Chemistry textbook, 9th edition. Some highlighting but in great condition.", category: "Books & Textbooks", price: 30, rental_period: "semester", condition: "good", location: "Ain Shams University", deposit: 100, color: "#16a34a", label: "CHEM" },
  { title: "Canon EOS 2000D DSLR Camera Kit", description: "Canon EOS 2000D with 18-55mm lens. Great for photography courses and projects.", category: "Photography Equipment", price: 150, rental_period: "daily", condition: "like-new", location: "AUC - New Cairo Campus", deposit: 500, color: "#dc2626", label: "CANON" },
  { title: "Arduino Mega 2560 Starter Kit", description: "Complete Arduino Mega 2560 starter kit with sensors, LEDs, breadboard, jumper wires.", category: "Engineering Tools", price: 40, rental_period: "weekly", condition: "new", location: "GUC - New Cairo", deposit: 150, color: "#0891b2", label: "ARDUINO" },
  { title: "Mechanical Engineering Drawing Set", description: "Professional drawing set with compass, protractor, rulers, and technical pens.", category: "Engineering Tools", price: 25, rental_period: "monthly", condition: "good", location: "Cairo University - Engineering", deposit: 80, color: "#7c3aed", label: "DRAW" },
  { title: "Nikon Microscope - Lab Grade", description: "Nikon Eclipse E100 microscope, lab-grade quality. 4x, 10x, 40x, 100x objectives.", category: "Lab Equipment", price: 200, rental_period: "monthly", condition: "excellent", location: "Ain Shams - Faculty of Medicine", deposit: 1000, color: "#ca8a04", label: "MICRO" },
  { title: "Fender Acoustic Guitar", description: "Fender FA-115 acoustic guitar in great condition. Comes with a gig bag and tuner.", category: "Musical Instruments", price: 80, rental_period: "monthly", condition: "good", location: "Helwan University", deposit: 300, color: "#ea580c", label: "GUITAR" },
  { title: "iPad Air with Apple Pencil", description: "iPad Air M1 with Apple Pencil 2nd gen. Perfect for note-taking and design courses.", category: "Electronics & Gadgets", price: 120, rental_period: "weekly", condition: "like-new", location: "BUE - El Sherouk", deposit: 800, color: "#64748b", label: "iPAD" },
  { title: "Oil Painting Supply Set", description: "Complete oil painting set: 24 colors, brushes, palette, canvas boards, and easel.", category: "Art Supplies", price: 60, rental_period: "monthly", condition: "new", location: "Faculty of Fine Arts - Cairo", deposit: 150, color: "#e11d48", label: "ART" },
  { title: "Bosch Cordless Drill Set", description: "Bosch 18V cordless drill with battery, charger, and 20-piece bit set.", category: "Power Tools", price: 45, rental_period: "daily", condition: "excellent", location: "Nile University - Smart Village", deposit: 250, color: "#059669", label: "DRILL" },
  { title: "HP LaserJet Pro Printer", description: "HP LaserJet Pro M404dn printer. Fast black and white printing, duplex.", category: "Printers & Scanners", price: 35, rental_period: "weekly", condition: "good", location: "6th October City", deposit: 200, color: "#4f46e5", label: "PRINT" },
  { title: "PlayStation 5 with Extra Controller", description: "PS5 disc edition with two DualSense controllers. Available on weekends.", category: "Gaming Consoles", price: 100, rental_period: "daily", condition: "like-new", location: "Maadi, Cairo", deposit: 600, color: "#1d4ed8", label: "PS5" },
];

function generateSVG(color: string, label: string, w: number, h: number): string {
  const r2 = Math.max(0, parseInt(color.slice(1, 3), 16) - 40);
  const g2 = Math.max(0, parseInt(color.slice(3, 5), 16) - 40);
  const b2 = Math.max(0, parseInt(color.slice(5, 7), 16) - 40);
  const dark = `#${r2.toString(16).padStart(2,"0")}${g2.toString(16).padStart(2,"0")}${b2.toString(16).padStart(2,"0")}`;
  
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs><linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" style="stop-color:${color}"/>
    <stop offset="100%" style="stop-color:${dark}"/>
  </linearGradient></defs>
  <rect width="${w}" height="${h}" fill="url(#bg)" rx="8"/>
  <rect x="${w*0.15}" y="${h*0.3}" width="${w*0.7}" height="${h*0.35}" rx="16" fill="white" fill-opacity="0.12"/>
  <text x="${w/2}" y="${h/2+10}" font-family="system-ui,-apple-system,sans-serif" font-size="48" font-weight="800" fill="white" text-anchor="middle">${label}</text>
  <text x="${w/2}" y="${h*0.8}" font-family="system-ui,sans-serif" font-size="16" fill="white" fill-opacity="0.6" text-anchor="middle">UniTool Marketplace</text>
</svg>`;
}

async function main() {
  console.log("=== UniTool Seed Script ===\n");

  console.log("1. Ensuring storage bucket exists...");
  const { error: bucketError } = await supabase.storage.createBucket(BUCKET_NAME, {
    public: true,
    fileSizeLimit: 10485760,
    allowedMimeTypes: ["image/png", "image/jpeg", "image/gif", "image/webp", "image/svg+xml"],
  });
  if (bucketError && !bucketError.message.includes("already exists")) {
    console.error("   Bucket error:", bucketError.message);
    return;
  }
  console.log("   Bucket ready!");

  console.log("\n2. Getting profiles...");
  const { data: profiles } = await supabase.from("profiles").select("id, full_name").limit(5);
  if (!profiles || profiles.length === 0) {
    console.error("   No profiles found! Sign up at least one user first.");
    return;
  }
  console.log(`   Found ${profiles.length} profiles`);

  console.log("\n3. Uploading images...");
  const imageUrls: string[] = [];
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const fileName = `seed/item-${i + 1}.svg`;
    const svgContent = generateSVG(item.color, item.label, 800, 600);

    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, Buffer.from(svgContent), { contentType: "image/svg+xml", upsert: true });

    if (uploadError) {
      console.error(`   Failed: ${fileName} - ${uploadError.message}`);
      imageUrls.push("");
      continue;
    }

    const { data: urlData } = supabase.storage.from(BUCKET_NAME).getPublicUrl(fileName);
    imageUrls.push(urlData.publicUrl);
    console.log(`   Uploaded: ${fileName}`);
  }

  console.log("\n4. Inserting items...");
  const insertData = items.map((item, i) => ({
    owner_id: profiles[i % profiles.length].id,
    title: item.title,
    description: item.description,
    category: item.category,
    price: item.price,
    rental_period: item.rental_period,
    condition: item.condition,
    location: item.location,
    deposit: item.deposit,
    available: true,
    image_paths: imageUrls[i] ? [imageUrls[i]] : [],
    availability_date: new Date().toISOString().split("T")[0],
  }));

  const { data: inserted, error: insertError } = await supabase
    .from("items")
    .insert(insertData)
    .select("id, title");

  if (insertError) {
    console.error("   Insert error:", insertError.message);
    return;
  }

  console.log(`   Inserted ${inserted?.length || 0} items:`);
  inserted?.forEach((item) => console.log(`   - ${item.title}`));

  console.log("\n=== Seed Complete! ===");
}

main().catch(console.error);
