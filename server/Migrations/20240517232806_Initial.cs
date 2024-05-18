using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace WebApplication1.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Priorities",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Priorities", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Project",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatorId = table.Column<int>(type: "int", nullable: false),
                    PriorityId = table.Column<int>(type: "int", nullable: true),
                    WorkspaceId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Project", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TasksStages",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TasksStages", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Password = table.Column<string>(type: "nvarchar(60)", maxLength: 60, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Login = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Workspaces",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(60)", maxLength: 60, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Workspaces", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "WorkspacesRoles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkspacesRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RefreshSessions",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    RefreshToken = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FingerPrint = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RefreshSessions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RefreshSessions_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tasks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    PriorityId = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ProjectId = table.Column<int>(type: "int", nullable: true),
                    StageId = table.Column<int>(type: "int", nullable: false),
                    WorkspaceId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    CreatorId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tasks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tasks_Priorities_PriorityId",
                        column: x => x.PriorityId,
                        principalTable: "Priorities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tasks_Project_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Project",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Tasks_TasksStages_StageId",
                        column: x => x.StageId,
                        principalTable: "TasksStages",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tasks_Users_CreatorId",
                        column: x => x.CreatorId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tasks_Workspaces_WorkspaceId",
                        column: x => x.WorkspaceId,
                        principalTable: "Workspaces",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WorkspacesUsers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    WorkSpaceId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    RoleId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkspacesUsers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkspacesUsers_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_WorkspacesUsers_WorkspacesRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "WorkspacesRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_WorkspacesUsers_Workspaces_WorkSpaceId",
                        column: x => x.WorkSpaceId,
                        principalTable: "Workspaces",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TasksResponsibles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TaskId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TasksResponsibles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TasksResponsibles_Tasks_TaskId",
                        column: x => x.TaskId,
                        principalTable: "Tasks",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_TasksResponsibles_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.InsertData(
                table: "Priorities",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Обычный" },
                    { 2, "Низкий" },
                    { 3, "Средний" },
                    { 4, "Высокий" }
                });

            migrationBuilder.InsertData(
                table: "TasksStages",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Для выполнения" },
                    { 2, "В процессе" },
                    { 3, "Выполнена" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "Login", "Password" },
                values: new object[,]
                {
                    { 1, "mrm.aimdar@mail.ru", "Сунгатуллин Айдар", "111111" },
                    { 2, "mrm.aimdari2@mail.ru", "Несущий слово", "111111" },
                    { 3, "mrm.aimdar3@mail.ru", "Царь интернета", "111111" },
                    { 4, "mrm.aimdar4@mail.ru", "Чилипов Семен", "111111" },
                    { 5, "mrm.aimdar5@mail.ru", "Калугина Анна", "111111" }
                });

            migrationBuilder.InsertData(
                table: "Workspaces",
                columns: new[] { "Id", "Title" },
                values: new object[,]
                {
                    { "1c6e5e97-5e3b-43aa-b804-8d5eaf922411", "Команда мечты" },
                    { "1c6e5e97-5e3b-43aa-b804-8d5eaf972440", "Мое рабочее пространство" },
                    { "1c6e5e97-5e3b-56ya-b804-8d5eaf922411", "Неуставающие" }
                });

            migrationBuilder.InsertData(
                table: "WorkspacesRoles",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Участник" },
                    { 2, "Администратор" }
                });

            migrationBuilder.InsertData(
                table: "Tasks",
                columns: new[] { "Id", "CreatedDate", "CreatorId", "Description", "PriorityId", "ProjectId", "StageId", "StartDate", "Title", "WorkspaceId" },
                values: new object[,]
                {
                    { 1, new DateTime(2024, 5, 17, 23, 28, 6, 500, DateTimeKind.Utc).AddTicks(4344), 1, "Разработать схему базы данных в MS Visio", 1, null, 1, null, "Разработать схему базы данных", "1c6e5e97-5e3b-43aa-b804-8d5eaf972440" },
                    { 2, new DateTime(2024, 5, 17, 23, 28, 6, 500, DateTimeKind.Utc).AddTicks(4346), 2, "Составить подробное техническое задание для нового проекта", 2, null, 1, new DateTime(2024, 5, 18, 23, 28, 6, 500, DateTimeKind.Utc).AddTicks(4347), "Написать техническое задание", "1c6e5e97-5e3b-43aa-b804-8d5eaf922411" },
                    { 3, new DateTime(2024, 5, 17, 23, 28, 6, 500, DateTimeKind.Utc).AddTicks(4355), 3, "Создать RESTful API для нового мобильного приложения", 3, null, 2, new DateTime(2024, 5, 19, 23, 28, 6, 500, DateTimeKind.Utc).AddTicks(4355), "Разработать API", "1c6e5e97-5e3b-56ya-b804-8d5eaf922411" },
                    { 4, new DateTime(2024, 5, 17, 23, 28, 6, 500, DateTimeKind.Utc).AddTicks(4357), 4, "Настроить непрерывную интеграцию и доставку с использованием Jenkins", 4, null, 3, new DateTime(2024, 5, 20, 23, 28, 6, 500, DateTimeKind.Utc).AddTicks(4357), "Настроить CI/CD", "1c6e5e97-5e3b-43aa-b804-8d5eaf972440" },
                    { 5, new DateTime(2024, 5, 17, 23, 28, 6, 500, DateTimeKind.Utc).AddTicks(4359), 5, "Произвести оптимизацию запросов и структуры базы данных", 1, null, 1, new DateTime(2024, 5, 21, 23, 28, 6, 500, DateTimeKind.Utc).AddTicks(4359), "Оптимизировать базу данных", "1c6e5e97-5e3b-43aa-b804-8d5eaf922411" },
                    { 6, new DateTime(2024, 5, 17, 23, 28, 6, 500, DateTimeKind.Utc).AddTicks(4361), 1, "Проверить код новой фичи и дать обратную связь", 2, null, 3, new DateTime(2024, 5, 22, 23, 28, 6, 500, DateTimeKind.Utc).AddTicks(4361), "Провести код-ревью", "1c6e5e97-5e3b-56ya-b804-8d5eaf922411" },
                    { 7, new DateTime(2024, 5, 17, 23, 28, 6, 500, DateTimeKind.Utc).AddTicks(4363), 2, "Создать макеты интерфейса в Figma для нового приложения", 3, null, 2, new DateTime(2024, 5, 23, 23, 28, 6, 500, DateTimeKind.Utc).AddTicks(4363), "Разработать интерфейс пользователя", "1c6e5e97-5e3b-43aa-b804-8d5eaf972440" },
                    { 8, new DateTime(2024, 5, 17, 23, 28, 6, 500, DateTimeKind.Utc).AddTicks(4365), 3, "Создать юнит-тесты для нового модуля", 4, null, 2, new DateTime(2024, 5, 24, 23, 28, 6, 500, DateTimeKind.Utc).AddTicks(4365), "Написать юнит-тесты", "1c6e5e97-5e3b-43aa-b804-8d5eaf922411" },
                    { 9, new DateTime(2024, 5, 17, 23, 28, 6, 500, DateTimeKind.Utc).AddTicks(4367), 4, "Подготовить и провести презентацию для заказчика", 1, null, 3, new DateTime(2024, 5, 25, 23, 28, 6, 500, DateTimeKind.Utc).AddTicks(4368), "Провести презентацию проекта", "1c6e5e97-5e3b-56ya-b804-8d5eaf922411" },
                    { 10, new DateTime(2024, 5, 17, 23, 28, 6, 500, DateTimeKind.Utc).AddTicks(4369), 5, "Обновить документацию по проекту на Confluence", 2, null, 2, new DateTime(2024, 5, 26, 23, 28, 6, 500, DateTimeKind.Utc).AddTicks(4369), "Обновить документацию", "1c6e5e97-5e3b-43aa-b804-8d5eaf972440" }
                });

            migrationBuilder.InsertData(
                table: "WorkspacesUsers",
                columns: new[] { "Id", "RoleId", "UserId", "WorkSpaceId" },
                values: new object[,]
                {
                    { 1, 2, 1, "1c6e5e97-5e3b-43aa-b804-8d5eaf972440" },
                    { 2, 2, 1, "1c6e5e97-5e3b-43aa-b804-8d5eaf922411" },
                    { 3, 2, 1, "1c6e5e97-5e3b-56ya-b804-8d5eaf922411" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_RefreshSessions_UserId",
                table: "RefreshSessions",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_CreatorId",
                table: "Tasks",
                column: "CreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_PriorityId",
                table: "Tasks",
                column: "PriorityId");

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_ProjectId",
                table: "Tasks",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_StageId",
                table: "Tasks",
                column: "StageId");

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_WorkspaceId",
                table: "Tasks",
                column: "WorkspaceId");

            migrationBuilder.CreateIndex(
                name: "IX_TasksResponsibles_TaskId",
                table: "TasksResponsibles",
                column: "TaskId");

            migrationBuilder.CreateIndex(
                name: "IX_TasksResponsibles_UserId",
                table: "TasksResponsibles",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkspacesUsers_RoleId",
                table: "WorkspacesUsers",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkspacesUsers_UserId",
                table: "WorkspacesUsers",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkspacesUsers_WorkSpaceId",
                table: "WorkspacesUsers",
                column: "WorkSpaceId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RefreshSessions");

            migrationBuilder.DropTable(
                name: "TasksResponsibles");

            migrationBuilder.DropTable(
                name: "WorkspacesUsers");

            migrationBuilder.DropTable(
                name: "Tasks");

            migrationBuilder.DropTable(
                name: "WorkspacesRoles");

            migrationBuilder.DropTable(
                name: "Priorities");

            migrationBuilder.DropTable(
                name: "Project");

            migrationBuilder.DropTable(
                name: "TasksStages");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Workspaces");
        }
    }
}
