﻿using TaskManager.Core.Repositories;
using TaskManager.EntityFramework.Repositories;
using WebApplication1.Repositories;
using WebApplication1.Service;

namespace TaskManager.RestAPI.Helpers
{
    public static class DIHelper
    {
      
        public static IServiceCollection ConfigureRepositories(this IServiceCollection services)
        {
            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<IRefreshSessionRepository, RefreshSessionRepository>();
            services.AddTransient<IWorkspaceRepository, WorkspaceRepository>();
            services.AddTransient<IWorkspaceUserRepository, WorkspaceUserRepository>();
            services.AddTransient<ITaskRepository, TaskRepository>();
            services.AddTransient<ITaskResponsibleRepository, TaskResponsibleRepository>();

            return services;
        }

        public static IServiceCollection ConfigureServices(this IServiceCollection services)
        {
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IWorkspaceService, WorkspaceService>();
            services.AddTransient<ITaskService, TaskService>();

            return services;
        }

        public static IServiceCollection ConfigureAuthorization(this IServiceCollection services)
        {
            services.AddAuthentication();
            services.AddTransient<JwtService>();
            services.AddAuthorization();

            services.AddCors();

            return services;
        }
    }
}