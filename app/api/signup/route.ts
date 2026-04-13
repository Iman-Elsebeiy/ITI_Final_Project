import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { publicEnv } from "@/lib/public-env";

export async function POST(request: Request) {
  const formData = await request.formData();

  const fullName = formData.get("fullName");
  const email = formData.get("email");
  const university = formData.get("university");
  const faculty = formData.get("faculty");
  const password = formData.get("password");
  const studentId = formData.get("studentId");

  if (
    !fullName ||
    !email ||
    !university ||
    !faculty ||
    !password ||
    typeof fullName !== "string" ||
    typeof email !== "string" ||
    typeof university !== "string" ||
    typeof faculty !== "string" ||
    typeof password !== "string"
  ) {
    return NextResponse.json(
      {
        error:
          "Missing or invalid signup data. Please fill all fields and try again.",
      },
      { status: 400 }
    );
  }

  let studentIdPath: string | null = null;

  const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      full_name: fullName,
      university,
    },
  });

  if (authError || !authData.user?.id) {
    return NextResponse.json(
      {
        error:
          authError?.message ||
          "Unable to create account. Please check your information and try again.",
      },
      { status: 400 }
    );
  }

  const userId = authData.user.id;

  if (studentId instanceof File) {
    const extension = studentId.name.split(".").pop() || "pdf";
    studentIdPath = `student-ids/${userId}/student-id-${Date.now()}.${extension}`;
    const fileBuffer = Buffer.from(await studentId.arrayBuffer());

    const { error: uploadError } = await supabaseAdmin.storage
      .from(publicEnv.NEXT_PUBLIC_SUPABASE_STUDENT_IDS_BUCKET)
      .upload(studentIdPath, fileBuffer, {
        cacheControl: "3600",
        upsert: true,
        contentType: studentId.type || "application/octet-stream",
      });

    if (uploadError) {
      return NextResponse.json(
        {
          error: `Could not upload student ID: ${uploadError.message}`,
        },
        { status: 500 }
      );
    }
  }

  const { error: profileError } = await supabaseAdmin.from("profiles").upsert(
    {
      id: userId,
      full_name: fullName,
      email,
      university,
      faculty,
      student_id_path: studentIdPath,
      role: "student",
    },
    { onConflict: "id" }
  );

  if (profileError) {
    return NextResponse.json(
      {
        error: `Account created but profile setup failed: ${profileError.message}`,
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "Account created successfully." });
}
