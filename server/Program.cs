using System.Text;
using Microsoft.AspNetCore.CookiePolicy;
using Microsoft.EntityFrameworkCore;
using TaskManager.EntityFramework;
using TaskManager.RestAPI.Helpers;
using WebApplication1.Middlewares;

namespace TaskManager.RestAPI;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        ConfigureServices(builder);

        var app = builder.Build();

        ConfigureRequestLifetime(app);

        if (!app.Environment.IsDevelopment())
        {
            app.UseHsts();
        }

        app.Run();
    }

    private static void ConfigureServices(WebApplicationBuilder builder)
    {
        builder.Services.AddControllers();
        builder.Services.AddHttpContextAccessor();

        builder.Services.AddSingleton<IConfiguration>(builder.Configuration);

        builder.Services.Configure<CookiePolicyOptions>(options =>
        {
            options.MinimumSameSitePolicy = SameSiteMode.Strict;
            options.HttpOnly = HttpOnlyPolicy.Always;
            options.Secure = CookieSecurePolicy.Always;
        });

        builder.Services.ConfigureRepositories();
        builder.Services.ConfigureServices();
        builder.Services.ConfigureAuthorization();

        builder.Services.AddDbContext<TasksDbContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
                .UseLazyLoadingProxies());
    }


    private static void ConfigureRequestLifetime(WebApplication app)
    {
        app.UseHttpsRedirection();

        app.UseRouting(); // Регистрация маршрутизации

        app.UseCors(options => options
            .WithOrigins(new[] { "http://localhost:3000" })
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials()
        );

        app.UseMiddleware<FingerprintMiddleware>();

        app.Use(async (context, next) =>
        {
            if (context.Request.Path == "/")
            {
                await context.Response.WriteAsync("Server is started", Encoding.UTF8);
                return;
            }

            await next(context);
        });

        app.UseWhen(context =>
        {
            return context.Request.Path == "/api/user";
        }, appBuilder =>
        {
            appBuilder.UseMiddleware<AuthMiddleware>();
        });

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers(); 
        });


 

    }
}