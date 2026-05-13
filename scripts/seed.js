const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

function loadDotenv(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const contents = fs.readFileSync(filePath, "utf8");
  contents.split(/\r?\n/).forEach((line) => {
    const match = line.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*)$/);
    if (match) {
      let [, key, value] = match;
      value = value.trim();
      if (value.startsWith("\"") && value.endsWith("\"")) {
        value = value.slice(1, -1);
      }
      if (value.startsWith("'") && value.endsWith("'")) {
        value = value.slice(1, -1);
      }
      process.env[key] = value;
    }
  });
}

loadDotenv(path.join(__dirname, "..", ".env.local"));

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ITEM_BUCKET = process.env.SUPABASE_ITEM_IMAGES_BUCKET;
const AVATAR_BUCKET = process.env.SUPABASE_AVATARS_BUCKET;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing required Supabase environment variables in .env.local");
  process.exit(1);
}

if (!ITEM_BUCKET) {
  console.error("Missing SUPABASE_ITEM_IMAGES_BUCKET in .env.local");
  process.exit(1);
}

async function ensureBucket(bucketName) {
  const { data: buckets, error: listError } = await supabaseAdmin.storage.listBuckets();
  if (listError) {
    throw listError;
  }

  const exists = buckets.some((bucket) => bucket.name === bucketName);
  if (!exists) {
    console.log(`Creating storage bucket: ${bucketName}`);
    const { error: createError } = await supabaseAdmin.storage.createBucket(bucketName, {
      public: true,
    });
    if (createError) {
      throw createError;
    }
  }
}

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    persistSession: false,
  },
});

const users = [
  {
    email: "mariam.fathy@student.example",
    password: "Password123!",
    fullName: "Mariam Fathy",
    university: "Cairo University",
    faculty: "Engineering",
    role: "lender",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
  },
  {
    email: "omar.youssef@student.example",
    password: "Password123!",
    fullName: "Omar Youssef",
    university: "Ain Shams University",
    faculty: "Business",
    role: "renter",
    avatarUrl: "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?w=200&h=200&fit=crop",
  },
  {
    email: "nada.ibrahim@student.example",
    password: "Password123!",
    fullName: "Nada Ibrahim",
    university: "Alexandria University",
    faculty: "Pharmacy",
    role: "lender",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
  },
  {
    email: "karim.mostafa@student.example",
    password: "Password123!",
    fullName: "Karim Mostafa",
    university: "German University in Cairo",
    faculty: "Computer Science",
    role: "renter",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
  },
];

const itemImages = [
  {
    path: "item-images/ti84.jpg",
    url: "https://picsum.photos/id/1025/800/600",
  },
  {
    path: "item-images/camera.jpg",
    url: "https://picsum.photos/id/180/800/600",
  },
  {
    path: "item-images/drawing-set.jpg",
    url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
  },
  {
    path: "item-images/macbook.jpg",
    url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop",
  },
  {
    path: "item-images/chemistry-book.jpg",
    url: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=800&h=600&fit=crop",
  },
  {
    path: "item-images/arduino.jpg",
    url: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=800&h=600&fit=crop",
  },
];

const items = [
  {
    title: "TI-84 Plus Graphing Calculator",
    description:
      "Perfect condition calculator for STEM students. Includes batteries and protective cover.",
    category: "Electronics",
    condition: "Excellent",
    price: 50,
    rental_period: "week",
    availability_date: "2026-05-01",
    location: "Cairo University",
    deposit: 150,
    image_paths: ["item-images/ti84.jpg"],
    available: true,
  },
  {
    title: "Canon EOS M50 Digital Camera",
    description:
      "Lightweight mirrorless camera ideal for content creation and university projects.",
    category: "Photography",
    condition: "Like New",
    price: 200,
    rental_period: "day",
    availability_date: "2026-04-18",
    location: "Arts Building",
    deposit: 400,
    image_paths: ["item-images/camera.jpg"],
    available: true,
  },
  {
    title: "Engineering Drawing Set",
    description:
      "Complete drawing set with compass, protractor, ruler, and mechanical pencils.",
    category: "Tools",
    condition: "Good",
    price: 30,
    rental_period: "week",
    availability_date: "2026-04-20",
    location: "Engineering Block",
    deposit: 80,
    image_paths: ["item-images/drawing-set.jpg"],
    available: true,
  },
  {
    title: "MacBook Pro 2020 M1",
    description:
      "Reliable Apple laptop for coding, design, and coursework. Includes charger.",
    category: "Electronics",
    condition: "Excellent",
    price: 500,
    rental_period: "week",
    availability_date: "2026-05-03",
    location: "Library",
    deposit: 1200,
    image_paths: ["item-images/macbook.jpg"],
    available: false,
  },
  {
    title: "Organic Chemistry Textbook",
    description:
      "Comprehensive organic chemistry textbook with annotations and practice problems.",
    category: "Books",
    condition: "Good",
    price: 40,
    rental_period: "month",
    availability_date: "2026-04-22",
    location: "Science Building",
    deposit: 100,
    image_paths: ["item-images/chemistry-book.jpg"],
    available: true,
  },
  {
    title: "Arduino Starter Kit",
    description:
      "Beginner-friendly electronics kit for building circuits and programming microcontrollers.",
    category: "Lab Equipment",
    condition: "Excellent",
    price: 80,
    rental_period: "week",
    availability_date: "2026-04-25",
    location: "Lab Building",
    deposit: 200,
    image_paths: ["item-images/arduino.jpg"],
    available: true,
  },
];

async function uploadImages() {
  await ensureBucket(ITEM_BUCKET);
  if (AVATAR_BUCKET) {
    await ensureBucket(AVATAR_BUCKET);
  }

  for (const image of itemImages) {
    console.log(`Uploading ${image.path}...`);
    const response = await fetch(image.url);
    if (!response.ok) {
      throw new Error(`Failed to fetch image ${image.url}: ${response.status}`);
    }
    const buffer = Buffer.from(await response.arrayBuffer());
    const { error } = await supabaseAdmin.storage
      .from(ITEM_BUCKET)
      .upload(image.path, buffer, {
        contentType: "image/jpeg",
        upsert: true,
      });

    if (error) {
      throw error;
    }
    console.log(`Uploaded ${image.path}`);
  }
}

async function findAuthUserByEmail(email) {
  let page = 1;
  while (true) {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers({
      page,
      perPage: 100,
    });

    if (error) {
      throw error;
    }

    const users = data?.users ?? [];
    const foundUser = users.find(
      (user) => user.email?.toLowerCase() === email.toLowerCase()
    );
    if (foundUser) {
      return foundUser;
    }

    if (!data?.nextPage) {
      break;
    }
    page = data.nextPage;
  }
  return null;
}

async function createUsersAndProfiles() {
  const created = [];
  for (const user of users) {
    const authUser = await findAuthUserByEmail(user.email);
    let userId = authUser?.id;

    const { data: existingProfile } = await supabaseAdmin
      .from("profiles")
      .select("id")
      .eq("email", user.email)
      .maybeSingle();

    if (existingProfile?.id && !userId) {
      console.log(`Found a profile for ${user.email} without a linked auth user.`);
    }

    if (!userId) {
      console.log(`Creating auth user ${user.email}...`);
      const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email: user.email,
        password: user.password,
        email_confirm: true,
        user_metadata: {
          full_name: user.fullName,
          university: user.university,
        },
      });

      if (authError) {
        throw authError;
      }

      userId = authData.user?.id;
      if (!userId) {
        throw new Error(`Failed to read new user id for ${user.email}`);
      }
    }

    if (existingProfile?.id) {
      if (existingProfile.id !== userId) {
        console.log(`Updating profile id for ${user.email} to match auth user.`);
        const { error: updateError } = await supabaseAdmin
          .from("profiles")
          .update({ id: userId })
          .eq("email", user.email);

        if (updateError) {
          throw updateError;
        }
      }
    } else {
      console.log(`Inserting profile for ${user.email}...`);
      const { error: profileError } = await supabaseAdmin.from("profiles").insert([
        {
          id: userId,
          full_name: user.fullName,
          email: user.email,
          university: user.university,
          faculty: user.faculty,
          role: user.role,
          avatar_url: user.avatarUrl,
        },
      ]);

      if (profileError) {
        throw profileError;
      }
    }

    created.push({ ...user, id: userId });
  }
  return created;
}

async function createItems(profiles) {
  const { data: existingItems, error: existingError } = await supabaseAdmin
    .from("items")
    .select("id")
    .limit(1);

  if (existingError) {
    throw existingError;
  }

  if (existingItems && existingItems.length > 0) {
    console.log("Items already exist in the database. Skipping item insertion.");
    return;
  }

  const itemsToInsert = items.map((item, index) => ({
    ...item,
    owner_id: profiles[index % profiles.length].id,
  }));

  console.log("Inserting items...");
  const { error } = await supabaseAdmin.from("items").insert(itemsToInsert);
  if (error) {
    throw error;
  }
  console.log("Items inserted successfully.");
}

async function main() {
  console.log("Starting Supabase seed script...");
  await uploadImages();
  const profiles = await createUsersAndProfiles();
  await createItems(profiles);
  console.log("Seed completed successfully.");
}

main().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
