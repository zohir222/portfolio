using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Portfolio.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        [HttpGet("download-zip")]
        public IActionResult DownloadZip()
        {
            var zipPath = "/SQLiteInCSharpDemo.zip";

            if (!System.IO.File.Exists(zipPath))
            {
                return NotFound();
            }

            var bytes = System.IO.File.ReadAllBytes(zipPath);
            return File(bytes, "application/zip", "folder.zip");
        }
    }
}
