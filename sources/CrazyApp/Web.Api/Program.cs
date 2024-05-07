using Web.Api.bundles;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var corsPolicy = "crazyPolicy";

Startup.ConfigureServices(builder, corsPolicy);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

Startup.ConfigureApp(app, corsPolicy);

app.Run();
