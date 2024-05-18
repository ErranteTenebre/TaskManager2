using System.Xml;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Dtos;
using WebApplication1.Service;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("api")]
    public class TaskController(ITaskService taskService) : ControllerBase
    {
        [HttpGet]
        [Route("tasks")]
        public async Task<IActionResult> GetTasks(string workspaceId)
        {
            return Ok(await taskService.GetAll(workspaceId));
        }

        [HttpPost]
        [Route("task")]
        public async Task<IActionResult> CreateTask([FromBody] CreateTaskDto dto)
        {
            return Ok(await taskService.Create(dto.title, dto.description, dto.priorityId, DateTime.Now, dto.startDate, dto.projectId, dto.creatorId, dto.workspaceId, dto.selectedUsers));
        }

        [HttpDelete]
        [Route("task")]
        public async Task<IActionResult> DeleteTask(int taskId)
        {
            await taskService.Delete(taskId);

            return Ok();
        }
    }
}
