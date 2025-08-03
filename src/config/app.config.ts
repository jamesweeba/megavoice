export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ,
  supabaseUrl: process.env.SUPABASE_URL ,
});




