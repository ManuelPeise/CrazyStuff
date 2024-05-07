using Data.ApplicationContext;
using Logic.Shared.Interfaces;
using Logic.Shared.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Web.Api.bundles
{
    public static class Startup
    {
        public static void ConfigureServices(WebApplicationBuilder builder, string corsPolicy)
        {
            builder.Services.AddDbContext<AppDataContext>(opt =>
            {
                var connection = builder.Configuration.GetConnectionString("AppDbContext") ?? null;

                if (connection == null)
                {
                    throw new Exception("Could not connect to database!");

                }
                opt.UseMySQL(connection);
            });

            // inject the base database repository
            builder.Services.AddScoped(typeof(IRepositoryBase<>), typeof(RepositoryBase<>));
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddCors(opt =>
            {
                opt.AddPolicy(corsPolicy, opt =>
                {
                    opt.AllowAnyMethod();
                    opt.AllowAnyOrigin();
                    opt.AllowAnyHeader();
                });
            });

        }

        public static void ConfigureApp(WebApplication app, string corsPolicy)
        {

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.UseCors(corsPolicy);

        }
    }
}
