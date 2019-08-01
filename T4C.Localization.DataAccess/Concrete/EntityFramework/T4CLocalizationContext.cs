using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using T4C.Localization.Entities.Concrete.LanguageModels;


namespace T4C.Localization.DataAccess.Concrete.EntityFramework
{
    public class T4CLocalizationContext : DbContext
    {
        public T4CLocalizationContext(DbContextOptions options)
            : base(options)
        { }

        public T4CLocalizationContext()
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var configuration = new ConfigurationBuilder()
                .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
                .AddJsonFile("appsettings.json")
                .Build();
            optionsBuilder.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));
        }

        public DbSet<Language> Languages { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
