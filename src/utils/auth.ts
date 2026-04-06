import { supabase } from "../lib/supabase"

export async function signUp(email: string, password: string, name: string) {
  if (!supabase) {
    return { data: { user: null }, error: { message: "Supabase is not configured. Please check your .env file and ensure variables start with VITE_" } }
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name }
    }
  })

  return { data, error }
}

export async function signIn(email: string, password: string) {
  if (!supabase) {
    return { data: { session: null, user: null }, error: { message: "Supabase is not configured. Please check your .env file and ensure variables start with VITE_" } }
  }
  return await supabase.auth.signInWithPassword({ email, password })
}

export async function signOut() {
  if (!supabase) return { error: null }
  return await supabase.auth.signOut()
}

export async function getSession() {
  if (!supabase) return { data: { session: null }, error: null }
  return await supabase.auth.getSession()
}

export async function ensureProfile(name?: string) {
  if (!supabase) return
  const userRes = await supabase.auth.getUser()
  const user = userRes.data.user
  if (!user) return
  
  const existing = await supabase.from("profiles").select("id").eq("id", user.id).limit(1)
  const hasRow = Array.isArray(existing.data) && existing.data.length > 0
  if (hasRow) return
  
  const profileName = name ?? (user.user_metadata?.name as string | undefined) ?? (user.email ?? "")
  await supabase.from("profiles").insert([
    {
      id: user.id,
      name: profileName,
      email: user.email
    }
  ])
}

export function onAuthStateChange(callback: (hasSession: boolean) => void) {
  if (!supabase) {
    callback(false)
    return { data: { subscription: { unsubscribe: () => {} } } }
  }
  return supabase.auth.onAuthStateChange((_event, session) => {
    callback(!!session)
  })
}

export function parseAuthError(err: { message?: string } | null) {
  const raw = (err?.message || "").toLowerCase()
  if (!raw) return { message: "Unexpected authentication error" }
  if (raw.includes("email rate limit exceeded") || raw.includes("too many requests")) {
    return { message: "Security rate limit reached. Please wait a moment before trying again." }
  }
  if (raw.includes("invalid login credentials")) {
    return { message: "Invalid email or password. Check and try again." }
  }
  if (raw.includes("email not confirmed")) {
    return { message: "Please confirm your email before logging in." }
  }
  if (raw.includes("user already registered")) {
    return { message: "This email is already registered. Please log in or reset your password." }
  }
  if (raw.includes("signups not allowed")) {
    return { message: "Sign-ups are disabled. Enable email sign-ups in Supabase Auth settings." }
  }
  return { message: err!.message! }
}

export async function resendConfirmation(email: string, redirectTo?: string) {
  if (!supabase) return { error: { message: "Supabase not configured" } }
  return await supabase.auth.resend({
    type: "signup",
    email,
    options: redirectTo ? { emailRedirectTo: redirectTo } : undefined,
  })
}

export async function resetPassword(email: string, redirectTo?: string) {
  if (!supabase) return { error: { message: "Supabase not configured" } }
  return await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: redirectTo,
  })
}
