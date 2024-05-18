using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Infrastructure.Entities;

namespace WebApplication1.Infrastructure.DataSeeders
{
    public class TaskDataSeeder : IEntityTypeConfiguration<TaskEntity>
    {
        public void Configure(EntityTypeBuilder<TaskEntity> builder)
        {
            builder.HasData(
                  new TaskEntity
                  {
                      Id = 1,
                      CreatorId = 1,
                      Title = "Разработать схему базы данных",
                      Description = "Разработать схему базы данных в MS Visio",
                      PriorityId = 1,
                      StageId = 1,
                      CreatedDate = DateTime.UtcNow,
                      StartDate = null,
                      ProjectId = null,
                      WorkspaceId = "1c6e5e97-5e3b-43aa-b804-8d5eaf972440"
                  },
                  new TaskEntity
                  {
                      Id = 2,
                      CreatorId = 2,
                      Title = "Написать техническое задание",
                      Description = "Составить подробное техническое задание для нового проекта",
                      PriorityId = 2,
                      StageId = 1,
                      CreatedDate = DateTime.UtcNow,
                      StartDate = DateTime.UtcNow.AddDays(1),
                      ProjectId = null,
                      WorkspaceId = "1c6e5e97-5e3b-43aa-b804-8d5eaf922411"
                  },
                  new TaskEntity
                  {
                      Id = 3,
                      CreatorId = 3,
                      Title = "Разработать API",
                      Description = "Создать RESTful API для нового мобильного приложения",
                      PriorityId = 3,
                      StageId = 2,
                      CreatedDate = DateTime.UtcNow,
                      StartDate = DateTime.UtcNow.AddDays(2),
                      ProjectId = null,
                      WorkspaceId = "1c6e5e97-5e3b-56ya-b804-8d5eaf922411"
                  },
                  new TaskEntity
                  {
                      Id = 4,
                      CreatorId = 4,
                      Title = "Настроить CI/CD",
                      Description = "Настроить непрерывную интеграцию и доставку с использованием Jenkins",
                      PriorityId = 4,
                      StageId = 3,
                      CreatedDate = DateTime.UtcNow,
                      StartDate = DateTime.UtcNow.AddDays(3),
                      ProjectId = null,
                      WorkspaceId = "1c6e5e97-5e3b-43aa-b804-8d5eaf972440"
                  },
                  new TaskEntity
                  {
                      Id = 5,
                      CreatorId = 5,
                      Title = "Оптимизировать базу данных",
                      Description = "Произвести оптимизацию запросов и структуры базы данных",
                      PriorityId = 1,
                      StageId = 1,
                      CreatedDate = DateTime.UtcNow,
                      StartDate = DateTime.UtcNow.AddDays(4),
                      ProjectId = null,
                      WorkspaceId = "1c6e5e97-5e3b-43aa-b804-8d5eaf922411"
                  },
                  new TaskEntity
                  {
                      Id = 6,
                      CreatorId = 1,
                      Title = "Провести код-ревью",
                      Description = "Проверить код новой фичи и дать обратную связь",
                      PriorityId = 2,
                      StageId = 3,
                      CreatedDate = DateTime.UtcNow,
                      StartDate = DateTime.UtcNow.AddDays(5),
                      ProjectId = null,
                      WorkspaceId = "1c6e5e97-5e3b-56ya-b804-8d5eaf922411"
                  },
                  new TaskEntity
                  {
                      Id = 7,
                      CreatorId = 2,
                      Title = "Разработать интерфейс пользователя",
                      Description = "Создать макеты интерфейса в Figma для нового приложения",
                      PriorityId = 3,
                      StageId = 2,
                      CreatedDate = DateTime.UtcNow,
                      StartDate = DateTime.UtcNow.AddDays(6),
                      ProjectId = null,
                      WorkspaceId = "1c6e5e97-5e3b-43aa-b804-8d5eaf972440"
                  },
                  new TaskEntity
                  {
                      Id = 8,
                      CreatorId = 3,
                      Title = "Написать юнит-тесты",
                      Description = "Создать юнит-тесты для нового модуля",
                      PriorityId = 4,
                      StageId = 2,
                      CreatedDate = DateTime.UtcNow,
                      StartDate = DateTime.UtcNow.AddDays(7),
                      ProjectId = null,
                      WorkspaceId = "1c6e5e97-5e3b-43aa-b804-8d5eaf922411"
                  },
                  new TaskEntity
                  {
                      Id = 9,
                      CreatorId = 4,
                      Title = "Провести презентацию проекта",
                      Description = "Подготовить и провести презентацию для заказчика",
                      PriorityId = 1,
                      StageId = 3,
                      CreatedDate = DateTime.UtcNow,
                      StartDate = DateTime.UtcNow.AddDays(8),
                      ProjectId = null,
                      WorkspaceId = "1c6e5e97-5e3b-56ya-b804-8d5eaf922411"
                  },
                  new TaskEntity
                  {
                      Id = 10,
                      CreatorId = 5,
                      Title = "Обновить документацию",
                      Description = "Обновить документацию по проекту на Confluence",
                      PriorityId = 2,
                      StageId = 2,
                      CreatedDate = DateTime.UtcNow,
                      StartDate = DateTime.UtcNow.AddDays(9),
                      ProjectId = null,
                      WorkspaceId = "1c6e5e97-5e3b-43aa-b804-8d5eaf972440"
                  }
              );
        }
    }
}
