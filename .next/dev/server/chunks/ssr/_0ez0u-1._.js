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

/* __next_internal_action_entry_do_not_use__ [{"009ac7dcd021dfe4d45fef0f390d67c9cf20f39cc5":{"name":"logout"},"00b49cf22eecd6e481b1c3a40780ffc33519534486":{"name":"signInWithGoogle"},"404cca2a10edad9bf401f8d158510cef04f2006f1f":{"name":"forgotPassword"},"409418f8e57c78bc1580f9f15e1fae1b1f5a6b06b4":{"name":"signup"},"40a11b60a63277d943f4912c09fef9fa63dc4f909c":{"name":"resetPassword"},"40b6c72200f95a4d674cdc90f72d827a3bf93b4376":{"name":"login"}},"app/auth/actions.ts",""] */ __turbopack_context__.s([
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
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(login, "40b6c72200f95a4d674cdc90f72d827a3bf93b4376", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(signup, "409418f8e57c78bc1580f9f15e1fae1b1f5a6b06b4", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(logout, "009ac7dcd021dfe4d45fef0f390d67c9cf20f39cc5", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(signInWithGoogle, "00b49cf22eecd6e481b1c3a40780ffc33519534486", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(forgotPassword, "404cca2a10edad9bf401f8d158510cef04f2006f1f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(resetPassword, "40a11b60a63277d943f4912c09fef9fa63dc4f909c", null);
}),
"[project]/lib/data/profile.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"0098334d90cc01c5f42ffb0c2695bc174addcd2bc7":{"name":"getUserSettings"},"00c5c772726a49140719ae838ca63414ac2eb6cc91":{"name":"getCurrentProfile"},"406ea29b20873b3a6ddfa179d0a9c5ea3f3f0525f9":{"name":"updateProfile"},"4075e24de11ccb1aeb9ae939629195b4a1dc2b5aff":{"name":"getProfileById"},"4090e39238d918df4b40037d452f1fecf7a54b8372":{"name":"updateUserSettings"}},"lib/data/profile.ts",""] */ __turbopack_context__.s([
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
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getCurrentProfile, "00c5c772726a49140719ae838ca63414ac2eb6cc91", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getProfileById, "4075e24de11ccb1aeb9ae939629195b4a1dc2b5aff", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateProfile, "406ea29b20873b3a6ddfa179d0a9c5ea3f3f0525f9", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getUserSettings, "0098334d90cc01c5f42ffb0c2695bc174addcd2bc7", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateUserSettings, "4090e39238d918df4b40037d452f1fecf7a54b8372", null);
}),
"[project]/lib/data/messages.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"008b7ef05a052e3ee397657efbe86e75fa0c85bf04":{"name":"getUnreadMessageCount"},"00c763e0597e386a171bc8a885511b8e1ae08bd664":{"name":"getConversations"},"4079017c7f8261ad4a33ffc2c52cf2d98ecaa49b7d":{"name":"getMessages"},"60a360fa25e2b2adaf9cb00d69ec0cb395c3a223cf":{"name":"sendMessage"}},"lib/data/messages.ts",""] */ __turbopack_context__.s([
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
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getConversations, "00c763e0597e386a171bc8a885511b8e1ae08bd664", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getMessages, "4079017c7f8261ad4a33ffc2c52cf2d98ecaa49b7d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(sendMessage, "60a360fa25e2b2adaf9cb00d69ec0cb395c3a223cf", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getUnreadMessageCount, "008b7ef05a052e3ee397657efbe86e75fa0c85bf04", null);
}),
"[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/auth/actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/lib/data/profile.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/lib/data/messages.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$auth$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/auth/actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$profile$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/data/profile.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$messages$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/data/messages.ts [app-rsc] (ecmascript)");
;
;
;
}),
"[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/auth/actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/lib/data/profile.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/lib/data/messages.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "008b7ef05a052e3ee397657efbe86e75fa0c85bf04",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$messages$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getUnreadMessageCount"],
    "009ac7dcd021dfe4d45fef0f390d67c9cf20f39cc5",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$auth$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logout"],
    "00c5c772726a49140719ae838ca63414ac2eb6cc91",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$profile$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCurrentProfile"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$app$2f$auth$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$lib$2f$data$2f$profile$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$lib$2f$data$2f$messages$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => "[project]/app/auth/actions.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/lib/data/profile.ts [app-rsc] (ecmascript)", ACTIONS_MODULE2 => "[project]/lib/data/messages.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$auth$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/auth/actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$profile$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/data/profile.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2f$messages$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/data/messages.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=_0ez0u-1._.js.map