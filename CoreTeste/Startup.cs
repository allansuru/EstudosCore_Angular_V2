using AutoMapper;
using CoreTeste.Controllers;
using CoreTeste.Core;
using CoreTeste.Core.Models;
using CoreTeste.Persistence;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Swashbuckle.AspNetCore.Swagger;

namespace CoreTeste
{
    public class Startup
    {

        string _testSecret = null;
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            

            services.Configure<PhotoSettings>(Configuration.GetSection("PhotoSettings"));

            services.AddScoped<IPhotoRepository, PhotoRepository>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IVehicleRepository, VehicleRepository>();
            services.AddTransient<IPhotoService, PhotoService>();
            services.AddTransient<IPhotoStorage, FileSystenPhotoStorage>();

            services.AddAutoMapper();

            _testSecret = Configuration["ConnectionStrings:Default"];

           services.AddDbContext<CoreTesteDbContext>(options => options.UseSqlServer(_testSecret));
            //Antes de mudar o appsetings.json já que gerei secrets.json
            //  services.AddDbContext<CoreTesteDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("Default")));



            // 1. Add Authentication Services  //https://manage.auth0.com
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

            }).AddJwtBearer(options =>
            {
                options.Authority = "https://allansuru.auth0.com/";
                options.Audience = "https://allansuru.auth0.com/userinfos";
            });

            services.AddAuthorization(options =>
            {
                options.AddPolicy(Policies.RequireAdminRole, policy => policy.RequireClaim("https://allan.com/roles", "admin"));
            });

            services.AddMvc();

            // Register the Swagger generator, defining one or more Swagger documents
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = "My API", Version = "v1" });
            });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.), specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Estudos Core+Angular2+");
            });

            var builder = new ConfigurationBuilder();

            if (env.IsDevelopment())
            {
             //   builder.AddUserSecrets<Startup>();

                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true
                });
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();

            // 2. Enable authentication middleware
            app.UseAuthentication();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });
        }
    }
}
