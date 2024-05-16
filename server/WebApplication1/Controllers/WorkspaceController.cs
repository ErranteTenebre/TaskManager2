﻿using Microsoft.AspNetCore.Mvc;
using WebApplication1.Infrastructure.Entities;
using WebApplication1.Service;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("api")]
    public class WorkspaceController : ControllerBase
    {
        private IWorkspaceService _workspaceService;

        public WorkspaceController(IWorkspaceService workspaceService)
        {
            _workspaceService = workspaceService;
        }

        [HttpGet]
        [Route("workspace")]
        public async Task<IActionResult> Workspace(int userId)
        {
            List<Workspace> workspacesList = await _workspaceService.GetAll(userId);

            return Ok(workspacesList);
        }
    }
}
