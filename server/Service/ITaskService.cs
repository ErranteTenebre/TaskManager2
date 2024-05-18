﻿using Microsoft.Identity.Client;
using WebApplication1.Infrastructure.Entities;

namespace WebApplication1.Service
{
    public interface ITaskService
    {
        public Task<List<TaskEntity>> GetAll(string workspaceId);
        public Task<TaskEntity> Get(int taskId);
        public Task Delete(int taskId);
        public Task<TaskEntity> Update();
        public Task<TaskEntity> Create(string title, string? description, int priorityId, DateTime createdDate, DateTime? startDate, int? projectId, int creatorId, string workspaceId, int[] selectedUsers);
    }
}
