using Microsoft.EntityFrameworkCore;
using AerolineaAPI.Data;

var builder = WebApplication.CreateBuilder(args);

// 1. Registrar DbContext
builder.Services.AddDbContext<AereolineaContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

//  2. Agregar CORS (mejor práctica: política con dominio específico)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular",
        policy => policy.WithOrigins("http://localhost:4200") // tu Angular
                         .AllowAnyHeader()
                         .AllowAnyMethod());
});

// 3. Otros servicios
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();

//  4. Usar la política CORS ANTES de Authorization
app.UseCors("AllowAngular");

app.UseAuthorization();

app.MapControllers();

app.Run();
