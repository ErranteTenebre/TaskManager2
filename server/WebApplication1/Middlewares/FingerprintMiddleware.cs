using System.Security.Cryptography;
using System.Text;

namespace WebApplication1.Middlewares
{
    public class FingerprintMiddleware
    {
        private readonly RequestDelegate _next;

        public FingerprintMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            var userAgent = context.Request.Headers["User-Agent"];
            var acceptHeaders = context.Request.Headers["Accept"];

            var fingerprint = CalculateFingerprint(userAgent, acceptHeaders);

            context.Request.Headers.Add("Fingerprint", fingerprint);

            await _next(context);
        }

        private string CalculateFingerprint(string userAgent, string acceptHeaders)
        {
            // Код для создания fingerprint на основе User-Agent и Accept заголовков
            // Например, можно использовать хэширование SHA256 для создания уникального fingerprint
            var combinedData = userAgent + acceptHeaders;
            using (SHA256 sha256Hash = SHA256.Create())
            {
                byte[] data = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(combinedData));
                StringBuilder stringBuilder = new StringBuilder();
                for (int i = 0; i < data.Length; i++)
                {
                    stringBuilder.Append(data[i].ToString("x2"));
                }
                return stringBuilder.ToString();
            }
        }
    }
}
