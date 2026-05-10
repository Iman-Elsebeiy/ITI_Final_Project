module.exports = [
"[project]/lib/supabase/server.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClient",
    ()=>createClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/index.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createServerClient.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-rsc] (ecmascript)");
;
;
;
async function createClient() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createServerClient"])(("TURBOPACK compile-time value", "https://tshspojyzvcjzwvjmlhk.supabase.co"), ("TURBOPACK compile-time value", "sb_publishable_Mo-TK0EusbTq8bTJT-QBmQ_tzpFQ6nZ"), {
        cookies: {
            getAll () {
                return cookieStore.getAll();
            },
            setAll (cookiesToSet) {
                try {
                    cookiesToSet.forEach(({ name, value, options })=>cookieStore.set(name, value, options));
                } catch  {
                // setAll called from Server Component — safe to ignore
                }
            }
        }
    });
}
}),
"[project]/lib/supabase/admin.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createAdminClient",
    ()=>createAdminClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-rsc] (ecmascript) <locals>");
;
;
function createAdminClient() {
    const supabaseUrl = ("TURBOPACK compile-time value", "https://tshspojyzvcjzwvjmlhk.supabase.co");
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseUrl || !serviceRoleKey) {
        throw new Error("Missing Supabase admin environment variables");
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, serviceRoleKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    });
}
}),
"[project]/app/auth/actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"007af523e4985981d876af40325db75546bfafc868":{"name":"signInWithGoogle"},"00fce37e290daacfb6b45e94e1a979ed2281554c9a":{"name":"logout"},"4041dcdaae78556a3e456ebdc17a3f7e843bf269ff":{"name":"forgotPassword"},"4057e091afd51699bb68241beac7182e1912e9f788":{"name":"login"},"4060d31e1f08b717a30b0763e3ce36454c088e8f78":{"name":"signup"},"408d74a599e4de54482f88cb18460e2cb7c29f2789":{"name":"resetPassword"}},"app/auth/actions.ts",""] */ __turbopack_context__.s([
    "forgotPassword",
    ()=>forgotPassword,
    "login",
    ()=>login,
    "logout",
    ()=>logout,
    "resetPassword",
    ()=>resetPassword,
    "signInWithGoogle",
    ()=>signInWithGoogle,
    "signup",
    ()=>signup
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/admin.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
async function login(formData) {
    try {
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
        const { error } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password
        });
        if (error) {
            if (error.message === "Invalid login credentials") {
                return {
                    error: "Invalid email or password. If you don't have an account, please sign up first."
                };
            }
            if (error.message === "Email not confirmed") {
                return {
                    error: "Please check your email and confirm your account before signing in."
                };
            }
            return {
                error: error.message
            };
        }
        // Check role to determine redirect
        const { data: { user: loggedInUser } } = await supabase.auth.getUser();
        if (loggedInUser) {
            const admin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAdminClient"])();
            const { data: profile } = await admin.from("profiles").select("role").eq("id", loggedInUser.id).single();
            if (profile?.role === "admin") {
                return {
                    success: true,
                    redirect: "/admin"
                };
            }
        }
        return {
            success: true,
            redirect: "/home"
        };
    } catch  {
        return {
            error: "An unexpected error occurred. Please try again."
        };
    }
}
async function signup(formData) {
    try {
        const admin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$admin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAdminClient"])();
        // Use admin to create user directly — no confirmation email is sent
        const { data: newUser, error: createError } = await admin.auth.admin.createUser({
            email: formData.email,
            password: formData.password,
            email_confirm: true,
            user_metadata: {
                full_name: formData.fullName,
                university: formData.university,
                faculty: formData.faculty
            }
        });
        if (createError) {
            if (createError.message?.includes("already registered") || createError.message?.includes("already been registered")) {
                return {
                    error: "This email is already registered. Please sign in instead."
                };
            }
            return {
                error: createError.message
            };
        }
        if (!newUser.user) {
            return {
                error: "Signup failed. Please try again."
            };
        }
        const userId = newUser.user.id;
        // Create profile and settings
        const { error: profileError } = await admin.from("profiles").insert({
            id: userId,
            email: formData.email,
            full_name: formData.fullName,
            university: formData.university,
            faculty: formData.faculty
        });
        if (profileError) {
            console.error("Profile insert error:", profileError);
            await admin.auth.admin.deleteUser(userId);
            return {
                error: "Failed to create profile. Please try again."
            };
        }
        const { error: settingsError } = await admin.from("user_settings").upsert({
            id: userId
        });
        if (settingsError) {
            console.error("Settings insert error:", settingsError);
        }
        // Sign in the user on the regular client
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
        const { error: signInError } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password
        });
        if (signInError) {
            return {
                error: signInError.message
            };
        }
        return {
            success: true
        };
    } catch  {
        return {
            error: "An unexpected error occurred. Please try again."
        };
    }
}
async function logout() {
    try {
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
        await supabase.auth.signOut();
    } catch  {
    // Sign out failed but we still redirect to login
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])("/login");
}
async function signInWithGoogle() {
    const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
    const appUrl = ("TURBOPACK compile-time value", "http://0.0.0.0:5000") || "http://localhost:5000";
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: `${appUrl}/auth/callback?next=/home`,
            queryParams: {
                access_type: "offline",
                prompt: "consent"
            }
        }
    });
    if (error) {
        return {
            error: error.message
        };
    }
    return {
        url: data.url
    };
}
async function forgotPassword(email) {
    try {
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${("TURBOPACK compile-time value", "http://0.0.0.0:5000") || "http://localhost:5000"}/auth/callback?next=/forgot-password`
        });
        if (error) {
            return {
                error: error.message
            };
        }
        return {
            success: true
        };
    } catch  {
        return {
            error: "An unexpected error occurred. Please try again."
        };
    }
}
async function resetPassword(password) {
    try {
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
        const { error } = await supabase.auth.updateUser({
            password
        });
        if (error) {
            return {
                error: error.message
            };
        }
        return {
            success: true
        };
    } catch  {
        return {
            error: "An unexpected error occurred. Please try again."
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    login,
    signup,
    logout,
    signInWithGoogle,
    forgotPassword,
    resetPassword
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(login, "4057e091afd51699bb68241beac7182e1912e9f788", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(signup, "4060d31e1f08b717a30b0763e3ce36454c088e8f78", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(logout, "00fce37e290daacfb6b45e94e1a979ed2281554c9a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(signInWithGoogle, "007af523e4985981d876af40325db75546bfafc868", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(forgotPassword, "4041dcdaae78556a3e456ebdc17a3f7e843bf269ff", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(resetPassword, "408d74a599e4de54482f88cb18460e2cb7c29f2789", null);
}),
"[project]/lib/data/profile.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"0071b905b8bf98a0ac67a0f949eb4df83a894e1c73":{"name":"getCurrentProfile"},"00d9a27184cb3ab66da035b7a563f3118d2c0018af":{"name":"getUserSettings"},"403d8cb2a8def5767be2187925087a4637825447e4":{"name":"getProfileById"},"40543621337d734582a310d7a639e2f4f58fab62af":{"name":"updateUserSettings"},"40d9297b3921d24319ce5e2ce090562d79d1a1d3ff":{"name":"updateProfile"}},"lib/data/profile.ts",""] */ __turbopack_context__.s([
    "getCurrentProfile",
    ()=>getCurrentProfile,
    "getProfileById",
    ()=>getProfileById,
    "getUserSettings",
    ()=>getUserSettings,
    "updateProfile",
    ()=>updateProfile,
    "updateUserSettings",
    ()=>updateUserSettings
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
async function getCurrentProfile() {
    try {
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return null;
        const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
        return data;
    } catch  {
        return null;
    }
}
async function getProfileById(id) {
    try {
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
        const { data } = await supabase.from("profiles").select("*").eq("id", id).single();
        return data;
    } catch  {
        return null;
    }
}
async function updateProfile(updates) {
    try {
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return {
            error: "Not authenticated"
        };
        const { error } = await supabase.from("profiles").update(updates).eq("id", user.id);
        if (error) return {
            error: error.message
        };
        return {
            success: true
        };
    } catch  {
        return {
            error: "An unexpected error occurred"
        };
    }
}
async function getUserSettings() {
    try {
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return null;
        const { data } = await supabase.from("user_settings").select("*").eq("id", user.id).single();
        return data;
    } catch  {
        return null;
    }
}
async function updateUserSettings(updates) {
    try {
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return {
            error: "Not authenticated"
        };
        const { error } = await supabase.from("user_settings").upsert({
            id: user.id,
            ...updates
        });
        if (error) return {
            error: error.message
        };
        return {
            success: true
        };
    } catch  {
        return {
            error: "An unexpected error occurred"
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getCurrentProfile,
    getProfileById,
    updateProfile,
    getUserSettings,
    updateUserSettings
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getCurrentProfile, "0071b905b8bf98a0ac67a0f949eb4df83a894e1c73", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getProfileById, "403d8cb2a8def5767be2187925087a4637825447e4", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateProfile, "40d9297b3921d24319ce5e2ce090562d79d1a1d3ff", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getUserSettings, "00d9a27184cb3ab66da035b7a563f3118d2c0018af", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateUserSettings, "40543621337d734582a310d7a639e2f4f58fab62af", null);
}),
"[project]/lib/data/messages.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"002fb8268fe628478da62ce9f5846e7e8cdeb53399":{"name":"getConversations"},"00edb273091a2e403ca88a3641cf794d58ebe2920e":{"name":"getUnreadMessageCount"},"40557f2ecc9055f81c1bbe169203ea5db240660816":{"name":"getMessages"},"608d3cc6457ff974e31babae23889bf696d044e625":{"name":"sendMessage"}},"lib/data/messages.ts",""] */ __turbopack_context__.s([
    "getConversations",
    ()=>getConversations,
    "getMessages",
    ()=>getMessages,
    "getUnreadMessageCount",
    ()=>getUnreadMessageCount,
    "sendMessage",
    ()=>sendMessage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
async function getConversations() {
    try {
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return [];
        const { data: participantRows } = await supabase.from("conversation_participants").select("conversation_id").eq("user_id", user.id);
        if (!participantRows || participantRows.length === 0) return [];
        const convIds = participantRows.map((p)=>p.conversation_id);
        const { data: conversations } = await supabase.from("conversations").select("*").in("id", convIds).order("updated_at", {
            ascending: false
        });
        if (!conversations) return [];
        const result = await Promise.all(conversations.map(async (conv)=>{
            const { data: participants } = await supabase.from("conversation_participants").select("user_id, profiles:profiles!user_id(id, full_name, avatar_url)").eq("conversation_id", conv.id);
            const otherParticipant = (participants || []).find((p)=>p.user_id !== user.id);
            const { data: messages } = await supabase.from("messages").select("*").eq("conversation_id", conv.id).order("created_at", {
                ascending: false
            }).limit(1);
            const { count: unreadCount } = await supabase.from("messages").select("*", {
                count: "exact",
                head: true
            }).eq("conversation_id", conv.id).neq("sender_id", user.id).neq("status", "read");
            return {
                ...conv,
                other_user: otherParticipant?.profiles || null,
                last_message: messages?.[0] || null,
                unread_count: unreadCount || 0
            };
        }));
        return result;
    } catch  {
        return [];
    }
}
async function getMessages(conversationId) {
    try {
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return {
            messages: [],
            currentUserId: ""
        };
        const { data } = await supabase.from("messages").select("*, sender:profiles!sender_id(id, full_name, avatar_url)").eq("conversation_id", conversationId).order("created_at", {
            ascending: true
        });
        await supabase.from("messages").update({
            status: "read"
        }).eq("conversation_id", conversationId).neq("sender_id", user.id).neq("status", "read");
        return {
            messages: data || [],
            currentUserId: user.id
        };
    } catch  {
        return {
            messages: [],
            currentUserId: ""
        };
    }
}
async function sendMessage(conversationId, content) {
    try {
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return {
            error: "Not authenticated"
        };
        const { data, error } = await supabase.from("messages").insert({
            conversation_id: conversationId,
            sender_id: user.id,
            content
        }).select("*, sender:profiles!sender_id(id, full_name, avatar_url)").single();
        if (error) return {
            error: error.message
        };
        await supabase.from("conversations").update({
            updated_at: new Date().toISOString()
        }).eq("id", conversationId);
        return {
            success: true,
            data
        };
    } catch  {
        return {
            error: "An unexpected error occurred"
        };
    }
}
async function getUnreadMessageCount() {
    try {
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return 0;
        const { data: participantRows } = await supabase.from("conversation_participants").select("conversation_id").eq("user_id", user.id);
        if (!participantRows || participantRows.length === 0) return 0;
        const convIds = participantRows.map((p)=>p.conversation_id);
        const { count } = await supabase.from("messages").select("*", {
            count: "exact",
            head: true
        }).in("conversation_id", convIds).neq("sender_id", user.id).neq("status", "read");
        return count || 0;
    } catch  {
        return 0;
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getConversations,
    getMessages,
    sendMessage,
    getUnreadMessageCount
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getConversations, "002fb8268fe628478da62ce9f5846e7e8cdeb53399", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getMessages, "40557f2ecc9055f81c1bbe169203ea5db240660816", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(sendMessage, "608d3cc6457ff974e31babae23889bf696d044e625", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getUnreadMessageCount, "00edb273091a2e403ca88a3641cf794d58ebe2920e", null);
}),
"[project]/lib/data/items.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"003f7f5850ae6f72f047cea19e112784a0a4f72db2":{"name":"getItemCount"},"00a180ebcadd47f360d4883010e9d40ac865e2995e":{"name":"getUserItems"},"405084284cda6f32881ae5e08e4e58118efbe44e1f":{"name":"getItemById"},"407e84507b8328200e05ec522c8172ca72d2d37f42":{"name":"uploadItemImage"},"40b347c98756db79c6816fe48808154ed6552e1339":{"name":"getItems"},"40ebc7f5d45f49c7eb033d8c8db42163e4e6c80e66":{"name":"deleteItem"},"40f53c2e36ea1ebac786f0d8ebeaf89d0e7dbb1fc4":{"name":"createItem"},"60ec47477e3ec5c4a76c3b32f4e41a1710fb057bea":{"name":"updateItem"}},"lib/data/items.ts",""] */ __turbopack_context__.s([
    "createItem",
    ()=>createItem,
    "deleteItem",
    ()=>deleteItem,
    "getItemById",
    ()=>getItemById,
    "getItemCount",
    ()=>getItemCount,
    "getItems",
    ()=>getItems,
    "getUserItems",
    ()=>getUserItems,
    "updateItem",
    ()=>updateItem,
    "uploadItemImage",
    ()=>uploadItemImage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
const BUCKET_NAME = "item-images";
async function uploadItemImage(formData) {
    try {
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return {
            error: "Not authenticated"
        };
        const file = formData.get("file");
        if (!file) return {
            error: "No file provided"
        };
        const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
        const fileName = `${user.id}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
        const { error: uploadError } = await supabase.storage.from(BUCKET_NAME).upload(fileName, file, {
            contentType: file.type,
            upsert: false
        });
        if (uploadError) return {
            error: uploadError.message
        };
        const { data: urlData } = supabase.storage.from(BUCKET_NAME).getPublicUrl(fileName);
        return {
            url: urlData.publicUrl
        };
    } catch  {
        return {
            error: "Upload failed"
        };
    }
}
async function getItems(options) {
    try {
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
        const { data: { user } } = await supabase.auth.getUser();
        let query = supabase.from("items").select("*, owner:profiles!owner_id(id, full_name, university, avatar_url)");
        if (options?.category) {
            query = query.eq("category", options.category);
        }
        if (options?.search) {
            query = query.ilike("title", `%${options.search}%`);
        }
        switch(options?.sortBy){
            case "price-low":
                query = query.order("price", {
                    ascending: true
                });
                break;
            case "price-high":
                query = query.order("price", {
                    ascending: false
                });
                break;
            case "newest":
                query = query.order("created_at", {
                    ascending: false
                });
                break;
            default:
                query = query.order("created_at", {
                    ascending: false
                });
        }
        if (options?.limit) {
            query = query.limit(options.limit);
        }
        const { data: items } = await query;
        if (!items) return [];
        if (user) {
            const { data: favorites } = await supabase.from("favorites").select("item_id").eq("user_id", user.id);
            const favIds = new Set((favorites || []).map((f)=>f.item_id));
            return items.map((item)=>({
                    ...item,
                    is_favorite: favIds.has(item.id)
                }));
        }
        return items;
    } catch  {
        return [];
    }
}
async function getItemById(id) {
    try {
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
        const { data } = await supabase.from("items").select("*, owner:profiles!owner_id(id, full_name, university, avatar_url, location)").eq("id", id).single();
        return data;
    } catch  {
        return null;
    }
}
async function getUserItems() {
    try {
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return [];
        const { data } = await supabase.from("items").select("*").eq("owner_id", user.id).order("created_at", {
            ascending: false
        });
        return data || [];
    } catch  {
        return [];
    }
}
async function createItem(itemData) {
    try {
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return {
            error: "Not authenticated"
        };
        const { data, error } = await supabase.from("items").insert({
            ...itemData,
            owner_id: user.id
        }).select().single();
        if (error) return {
            error: error.message
        };
        return {
            success: true,
            data
        };
    } catch  {
        return {
            error: "An unexpected error occurred"
        };
    }
}
async function updateItem(id, updates) {
    try {
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return {
            error: "Not authenticated"
        };
        const { error } = await supabase.from("items").update(updates).eq("id", id).eq("owner_id", user.id);
        if (error) return {
            error: error.message
        };
        return {
            success: true
        };
    } catch  {
        return {
            error: "An unexpected error occurred"
        };
    }
}
async function deleteItem(id) {
    try {
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return {
            error: "Not authenticated"
        };
        const { error } = await supabase.from("items").delete().eq("id", id).eq("owner_id", user.id);
        if (error) return {
            error: error.message
        };
        return {
            success: true
        };
    } catch  {
        return {
            error: "An unexpected error occurred"
        };
    }
}
async function getItemCount() {
    try {
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
        const { count } = await supabase.from("items").select("*", {
            count: "exact",
            head: true
        }).eq("available", true);
        return count || 0;
    } catch  {
        return 0;
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    uploadItemImage,
    getItems,
    getItemById,
    getUserItems,
    createItem,
    updateItem,
    deleteItem,
    getItemCount
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(uploadItemImage, "407e84507b8328200e05ec522c8172ca72d2d37f42", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getItems, "40b347c98756db79c6816fe48808154ed6552e1339", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getItemById, "405084284cda6f32881ae5e08e4e58118efbe44e1f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getUserItems, "00a180ebcadd47f360d4883010e9d40ac865e2995e", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createItem, "40f53c2e36ea1ebac786f0d8ebeaf89d0e7dbb1fc4", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateItem, "60ec47477e3ec5c4a76c3b32f4e41a1710fb057bea", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteItem, "40ebc7f5d45f49c7eb033d8c8db42163e4e6c80e66", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getItemCount, "003f7f5850ae6f72f047cea19e112784a0a4f72db2", null);
}),
"[project]/lib/data/favorites.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"0063e05fbc809e48b8e6a45f177683344364888077":{"name":"getUserFavorites"},"0073b7a9514c8ef673c54dd8074605235f9b0f47dc":{"name":"getFavoriteCount"},"4070b117c7b65bb15e263d22fee6bfa8b531fb8bc8":{"name":"toggleFavorite"}},"lib/data/favorites.ts",""] */ __turbopack_context__.s([
    "getFavoriteCount",
    ()=>getFavoriteCount,
    "getUserFavorites",
    ()=>getUserFavorites,
    "toggleFavorite",
    ()=>toggleFavorite
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
async function getUserFavorites() {
    try {
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return [];
        const { data } = await supabase.from("favorites").select(`
        id,
        created_at,
        item:items(
          *,
          owner:profiles!owner_id(id, full_name, university, avatar_url)
        )
      `).eq("user_id", user.id).order("created_at", {
            ascending: false
        });
        if (!data) return [];
        const results = [];
        for (const f of data){
            const item = Array.isArray(f.item) ? f.item[0] : f.item;
            if (item) {
                results.push({
                    ...item,
                    favorite_id: f.id,
                    added_at: f.created_at,
                    is_favorite: true
                });
            }
        }
        return results;
    } catch  {
        return [];
    }
}
async function toggleFavorite(itemId) {
    try {
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return {
            error: "Not authenticated"
        };
        const { data: existing } = await supabase.from("favorites").select("id").eq("user_id", user.id).eq("item_id", itemId).single();
        if (existing) {
            const { error } = await supabase.from("favorites").delete().eq("id", existing.id);
            if (error) return {
                error: error.message
            };
            return {
                success: true,
                isFavorite: false
            };
        } else {
            const { error } = await supabase.from("favorites").insert({
                user_id: user.id,
                item_id: itemId
            });
            if (error) return {
                error: error.message
            };
            return {
                success: true,
                isFavorite: true
            };
        }
    } catch  {
        return {
            error: "An unexpected error occurred"
        };
    }
}
async function getFavoriteCount() {
    try {
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return 0;
        const { count } = await supabase.from("favorites").select("*", {
            count: "exact",
            head: true
        }).eq("user_id", user.id);
        return count || 0;
    } catch  {
        return 0;
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getUserFavorites,
    toggleFavorite,
    getFavoriteCount
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getUserFavorites, "0063e05fbc809e48b8e6a45f177683344364888077", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(toggleFavorite, "4070b117c7b65bb15e263d22fee6bfa8b531fb8bc8", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getFavoriteCount, "0073b7a9514c8ef673c54dd8074605235f9b0f47dc", null);
}),
"[project]/.next-internal/server/app/browse/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/auth/actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/lib/data/profile.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/lib/data/messages.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE3 => \"[project]/lib/data/items.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE4 => \"[project]/lib/data/favorites.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$auth$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/auth/actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$profile$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/data/profile.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$messages$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/data/messages.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$items$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/data/items.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$favorites$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/data/favorites.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
}),
"[project]/.next-internal/server/app/browse/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/auth/actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/lib/data/profile.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/lib/data/messages.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE3 => \"[project]/lib/data/items.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE4 => \"[project]/lib/data/favorites.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "003f7f5850ae6f72f047cea19e112784a0a4f72db2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$items$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getItemCount"],
    "0071b905b8bf98a0ac67a0f949eb4df83a894e1c73",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$profile$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCurrentProfile"],
    "0073b7a9514c8ef673c54dd8074605235f9b0f47dc",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$favorites$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getFavoriteCount"],
    "00edb273091a2e403ca88a3641cf794d58ebe2920e",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$messages$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUnreadMessageCount"],
    "00fce37e290daacfb6b45e94e1a979ed2281554c9a",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$auth$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logout"],
    "4070b117c7b65bb15e263d22fee6bfa8b531fb8bc8",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$favorites$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toggleFavorite"],
    "40b347c98756db79c6816fe48808154ed6552e1339",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$items$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getItems"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$browse$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$app$2f$auth$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$lib$2f$data$2f$profile$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$lib$2f$data$2f$messages$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE3__$3d3e$__$225b$project$5d2f$lib$2f$data$2f$items$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE4__$3d3e$__$225b$project$5d2f$lib$2f$data$2f$favorites$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/browse/page/actions.js { ACTIONS_MODULE0 => "[project]/app/auth/actions.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/lib/data/profile.ts [app-rsc] (ecmascript)", ACTIONS_MODULE2 => "[project]/lib/data/messages.ts [app-rsc] (ecmascript)", ACTIONS_MODULE3 => "[project]/lib/data/items.ts [app-rsc] (ecmascript)", ACTIONS_MODULE4 => "[project]/lib/data/favorites.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$auth$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/auth/actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$profile$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/data/profile.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$messages$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/data/messages.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$items$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/data/items.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$favorites$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/data/favorites.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=_0yy~ngz._.js.map