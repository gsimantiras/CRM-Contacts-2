using CRM.Business;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace CRM.Api_Core.Controllers
{
    public class ErrorController : ControllerBase
    {
        public ILogger<ErrorController> Logger { get; }

        public ErrorController(ILogger<ErrorController> logger)
        {
            this.Logger = logger;
        }

        [Route("Error/{statusCode}")]
        public IActionResult HttpStatusCodeHandler(int statusCode)
        {
            var statusCodeResult = HttpContext.Features.Get<IStatusCodeReExecuteFeature>();

            switch (statusCode)
            {
                case 404:
                    this.Logger.LogWarning($"404 Error. Path: {statusCodeResult.OriginalPath} " +
                        $"and query:{statusCodeResult.OriginalQueryString}");
                    break;
            }

            return Ok(ErrorCodes.Error);
        }

        [Route("Error")]
        public IActionResult Error()
        {
            var exceptionDetails = HttpContext.Features.Get<IExceptionHandlerPathFeature>();

            this.Logger.LogError($"An error occured on Path: {exceptionDetails.Path}. Exception thrown: {exceptionDetails.Error}");

            if(exceptionDetails.Error is BusinessException)
            {
                HttpContext.Response.StatusCode = 400;
                HttpContext.Response.WriteAsync(exceptionDetails.Error.Message);
            }
            else
            {
                HttpContext.Response.WriteAsync(ErrorCodes.Error);
            }

            return Ok(ErrorCodes.Error);
        }
    }
}
