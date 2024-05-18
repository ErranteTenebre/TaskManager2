using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace TaskManager.RestAPI.Helpers;

public class JwtService
{
    private readonly string _accessKey;
    private readonly string _refreshKey;
    private readonly string _inviteKey;

    public int _accessTokenExpireTime;
    private IConfiguration _configuration;


    public JwtService(IConfiguration configuration)
    {
        _configuration = configuration;

        _accessKey = configuration["Jwt:AccessKey"];
        _refreshKey = configuration["Jwt:RefreshKey"];
        _inviteKey = configuration["Jwt:InviteKey"];

        _accessTokenExpireTime = int.Parse(configuration["JWT:ExpiresInHours"]) * 60 * 60;
    }

    public string GenerateAccessToken(int userId, string email)
    {
        SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_accessKey));

        //Создаем объект для хранения данных о ключе и алгоритме шифрования
        SigningCredentials credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        //Создаем пользовательскую информацию для добавления в полезную нагрузку
        Claim[] claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, userId.ToString()),
            new Claim(ClaimTypes.Email, email)
        };

        // Создаем JWT токен
        JwtSecurityToken token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(30),
            signingCredentials: credentials
        );

        // Возвращаем строковое представление JWT токена
        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public JwtSecurityToken VerifyAccessToken(string jwt)
    {
        JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
        byte[] key = Encoding.UTF8.GetBytes(_accessKey);

        // Устанавливаем параметры валидации токена
        TokenValidationParameters tokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = false
        };

        // Пытаемся валидировать токен
        tokenHandler.ValidateToken(jwt, tokenValidationParameters, out var validatedToken);

        // Возвращаем валидированный токен
        return (JwtSecurityToken)validatedToken;
    }

    public string GenerateRefreshToken(int userId, string email)
    {
        // Создаем объект Claim с идентификатором пользователя
        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, userId.ToString()),
            new Claim(ClaimTypes.Email, email)
        };

        // Устанавливаем время истечения токена
        var expires = DateTime.UtcNow.AddDays(15); // Токен истечет через 15 дней

        // Устанавливаем ключ для подписи токена
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_refreshKey));

        // Создаем объект JwtSecurityToken
        var token = new JwtSecurityToken(
            claims: claims,
            expires: expires,
            signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
        );

        // Возвращаем строковое представление JWT токена
        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public JwtSecurityToken VerifyRefreshToken(string refreshToken)
    {
        // Создаем токен хендлер
        var tokenHandler = new JwtSecurityTokenHandler();

        // Устанавливаем ключ для валидации токена
        var key = Encoding.UTF8.GetBytes(_refreshKey);

        // Устанавливаем параметры валидации токена
        var tokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = false
        };

        // Пытаемся валидировать токен
        SecurityToken validatedToken;
        tokenHandler.ValidateToken(refreshToken, tokenValidationParameters, out validatedToken);

        // Возвращаем валидированный токен
        return (JwtSecurityToken)validatedToken;
    }

    public (int userId, string email) GetJwtTokenClaims(JwtSecurityToken token)
    {
        try
        {
            Claim userIdClaim = token.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
            Claim emailClaim = token.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email);

            int userId = int.Parse(userIdClaim.Value);
            string email = emailClaim.Value;

            return (userId, email);
        }
        catch
        {
            throw new Exception("Токен не содержит необходимых клаймов");
        }
    }

    public string GenerateInviteToken(string email, string workspaceId)
    {
        SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_inviteKey));

        //Создаем объект для хранения данных о ключе и алгоритме шифрования
        SigningCredentials credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        //Создаем пользовательскую информацию для добавления в полезную нагрузку
        Claim[] claims = new[]
        {
            new Claim(ClaimTypes.Email, email),
            new Claim("WorkspaceId", workspaceId),
        };

        // Создаем JWT токен
        JwtSecurityToken token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(30),
            signingCredentials: credentials
        );

        // Возвращаем строковое представление JWT токена
        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public (string,string) VerifyInviteToken(string refreshToken)
    {
        // Создаем токен хендлер
        var tokenHandler = new JwtSecurityTokenHandler();

        // Устанавливаем ключ для валидации токена
        var key = Encoding.UTF8.GetBytes(_inviteKey);

        // Устанавливаем параметры валидации токена
        var tokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = false
        };

        // Пытаемся валидировать токен
        try
        {
            SecurityToken validatedToken;
            tokenHandler.ValidateToken(refreshToken, tokenValidationParameters, out validatedToken);

            Claim emailClaim =
                ((JwtSecurityToken)validatedToken).Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email);
            Claim workspaceIdClaim =
                ((JwtSecurityToken)validatedToken).Claims.FirstOrDefault(c => c.Type == "WorkspaceId");

            string email = emailClaim.Value;
            string workspaceId = workspaceIdClaim.Value;

            return (email,workspaceId);
        }
        catch
        {
            return (null,null);
        }
    }
}