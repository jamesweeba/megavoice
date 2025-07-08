export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ,
  supabaseUrl: process.env.SUPABASE_URL || 'https://vbcpnjlzpfcqqfdyilzs.supabase.co',
});


//DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/mydb?schema=public"
//SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZiY3Buamx6cGZjcXFmZHlpbHpzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTcyNjIyMSwiZXhwIjoyMDY1MzAyMjIxfQ.uKzq9WBhTCy6eT7WQCs3lI8HxAJMirvSJxYGtcgm5zU"
// SUPABASE_URL="https://vbcpnjlzpfcqqfdyilzs.supabase.co"

